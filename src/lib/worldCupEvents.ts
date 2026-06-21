import { fallbackEvents, type Event } from "../data/events";

export interface WorldCupEventsApiResponse {
  events: Event[];
  source: "live" | "fallback";
  message?: string;
  updatedAt: string;
}

interface WorldCup26Game {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: string;
  away_score: string;
  group: string;
  matchday: string;
  local_date: string;
  stadium_id: string;
  finished: string;
  time_elapsed: string;
  type: string;
  home_team_name_en: string;
  away_team_name_en: string;
}

interface WorldCup26Stadium {
  id: string;
  name_en: string;
  fifa_name: string;
  city_en: string;
  country_en: string;
}

interface WorldCup26GamesResponse {
  games: WorldCup26Game[];
}

interface WorldCup26StadiumsResponse {
  stadiums: WorldCup26Stadium[];
}

interface StadiumMetadata {
  city: string;
  state: string;
  stadium: string;
  timeZone: string;
}

const WORLDCUP26_GAMES_URL = "https://worldcup26.ir/get/games";
const WORLDCUP26_STADIUMS_URL = "https://worldcup26.ir/get/stadiums";
const LIVE_EVENTS_CACHE_TTL_MS = 60_000;
const CLIENT_EVENTS_CACHE_TTL_MS = 30_000;

let cachedLiveEventsResponse: WorldCupEventsApiResponse | null = null;
let cachedLiveEventsAt = 0;
let liveEventsRequest: Promise<WorldCupEventsApiResponse> | null = null;

let cachedClientEventsResponse: WorldCupEventsApiResponse | null = null;
let cachedClientEventsAt = 0;
let clientEventsRequest: Promise<WorldCupEventsApiResponse> | null = null;

const stadiumMetadataById: Record<string, StadiumMetadata> = {
  "1": {
    city: "Mexico City",
    state: "MX",
    stadium: "Estadio Azteca",
    timeZone: "America/Mexico_City",
  },
  "2": {
    city: "Guadalajara",
    state: "MX",
    stadium: "Estadio Akron",
    timeZone: "America/Mexico_City",
  },
  "3": {
    city: "Monterrey",
    state: "MX",
    stadium: "Estadio BBVA",
    timeZone: "America/Monterrey",
  },
  "4": {
    city: "Arlington",
    state: "TX",
    stadium: "AT&T Stadium",
    timeZone: "America/Chicago",
  },
  "5": {
    city: "Houston",
    state: "TX",
    stadium: "NRG Stadium",
    timeZone: "America/Chicago",
  },
  "6": {
    city: "Kansas City",
    state: "MO",
    stadium: "GEHA Field at Arrowhead Stadium",
    timeZone: "America/Chicago",
  },
  "7": {
    city: "Atlanta",
    state: "GA",
    stadium: "Mercedes-Benz Stadium",
    timeZone: "America/New_York",
  },
  "8": {
    city: "Miami Gardens",
    state: "FL",
    stadium: "Hard Rock Stadium",
    timeZone: "America/New_York",
  },
  "9": {
    city: "Foxborough",
    state: "MA",
    stadium: "Gillette Stadium",
    timeZone: "America/New_York",
  },
  "10": {
    city: "Philadelphia",
    state: "PA",
    stadium: "Lincoln Financial Field",
    timeZone: "America/New_York",
  },
  "11": {
    city: "East Rutherford",
    state: "NJ",
    stadium: "MetLife Stadium",
    timeZone: "America/New_York",
  },
  "12": {
    city: "Toronto",
    state: "ON",
    stadium: "BMO Field",
    timeZone: "America/Toronto",
  },
  "13": {
    city: "Vancouver",
    state: "BC",
    stadium: "BC Place",
    timeZone: "America/Vancouver",
  },
  "14": {
    city: "Seattle",
    state: "WA",
    stadium: "Lumen Field",
    timeZone: "America/Los_Angeles",
  },
  "15": {
    city: "Santa Clara",
    state: "CA",
    stadium: "Levi's Stadium",
    timeZone: "America/Los_Angeles",
  },
  "16": {
    city: "Los Angeles",
    state: "CA",
    stadium: "SoFi Stadium",
    timeZone: "America/Los_Angeles",
  },
};

function getStadiumMetadata(
  stadiumId: string,
  stadiumLookup: Map<string, WorldCup26Stadium>
) {
  const staticMetadata = stadiumMetadataById[stadiumId];
  const apiStadium = stadiumLookup.get(stadiumId);

  if (staticMetadata) {
    return staticMetadata;
  }

  if (apiStadium) {
    const city = apiStadium.city_en.split(" (")[0];

    return {
      city,
      state: apiStadium.country_en,
      stadium: apiStadium.name_en,
      timeZone: "UTC",
    };
  }

  return {
    city: "TBD",
    state: "TBD",
    stadium: "Venue TBA",
    timeZone: "UTC",
  };
}

function formatLocalDateParts(localDate: string) {
  const [month, day, yearAndTime] = localDate.split("/");
  const [dayPart, yearPartAndTime] = [day, yearAndTime];
  const [year, time] = yearPartAndTime.split(" ");
  const [hourText, minuteText] = time.split(":");

  const monthIndex = Number(month) - 1;
  const dayNumber = Number(dayPart);
  const yearNumber = Number(year);
  const hourNumber = Number(hourText);
  const minuteNumber = Number(minuteText);
  const sortable = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${hourText.padStart(2, "0")}:${minuteText.padStart(2, "0")}:00`;
  const referenceDate = new Date(yearNumber, monthIndex, dayNumber, hourNumber, minuteNumber);

  return {
    date: new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(referenceDate),
    dayOfWeek: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
    }).format(referenceDate),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(referenceDate),
    sortable,
    timestamp: referenceDate.getTime(),
  };
}

function formatRound(type: string) {
  switch (type.toLowerCase()) {
    case "group":
      return "Group Stage";
    case "last_32":
      return "Round of 32";
    case "last_16":
      return "Round of 16";
    case "quarterfinal":
    case "quarter_finals":
      return "Quarterfinal";
    case "semifinal":
    case "semi_finals":
      return "Semifinal";
    case "third_place":
      return "3rd Place";
    case "final":
      return "Final";
    default:
      return type
        .split("_")
        .map((part) => part[0] + part.slice(1).toLowerCase())
        .join(" ");
  }
}

function formatGroupLetter(group: string | null) {
  return group ?? undefined;
}

function estimateMinPrice(type: string, matchId: number) {
  const basePriceByStage: Record<string, number> = {
    group: 280,
    last_32: 520,
    last_16: 690,
    quarterfinal: 980,
    semifinal: 1325,
    third_place: 845,
    final: 2195,
  };

  return (basePriceByStage[type.toLowerCase()] ?? 300) + (matchId % 11) * 37;
}

function estimateTicketCount(type: string, matchId: number) {
  const baseInventoryByStage: Record<string, number> = {
    group: 420,
    last_32: 240,
    last_16: 180,
    quarterfinal: 140,
    semifinal: 105,
    third_place: 125,
    final: 92,
  };

  return Math.max(40, (baseInventoryByStage[type.toLowerCase()] ?? 180) + (matchId % 9) * 14);
}

async function fetchJsonWithRetry<T>(url: string, attempts = 3): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Ticketting/1.0",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`${url} failed with ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error;

      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 400));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(`Unable to fetch ${url}`);
}

function getSafeTeamName(teamName?: string) {
  const trimmedTeamName = teamName?.trim();

  return trimmedTeamName ? trimmedTeamName : "TBD";
}

function mapGameToEvent(
  game: WorldCup26Game,
  stadiumLookup: Map<string, WorldCup26Stadium>
): Event {
  const stadiumMetadata = getStadiumMetadata(game.stadium_id, stadiumLookup);
  const kickoff = formatLocalDateParts(game.local_date);
  const numericId = Number(game.id);

  return {
    id: numericId,
    date: kickoff.date,
    dayOfWeek: kickoff.dayOfWeek,
    time: kickoff.time,
    homeTeam: getSafeTeamName(game.home_team_name_en),
    awayTeam: getSafeTeamName(game.away_team_name_en),
    venue: stadiumMetadata.stadium,
    city: stadiumMetadata.city,
    state: stadiumMetadata.state,
    minPrice: estimateMinPrice(game.type, numericId),
    ticketCount: estimateTicketCount(game.type, numericId),
    groupLetter: formatGroupLetter(game.group),
    round: formatRound(game.type),
    stadium: stadiumMetadata.stadium,
    kickoffUtc: kickoff.sortable,
  };
}

function isUpcomingAvailableGame(game: WorldCup26Game) {
  const kickoff = formatLocalDateParts(game.local_date);
  const isFinished = game.finished.toUpperCase() === "TRUE";
  const isStarted = game.time_elapsed.toLowerCase() !== "notstarted";

  return (
    !isFinished &&
    !isStarted &&
    kickoff.timestamp >= Date.now()
  );
}

export function getFallbackWorldCupEvents(
  message = "Unable to load the live World Cup 2026 schedule right now, so the built-in schedule is shown instead."
): WorldCupEventsApiResponse {
  return {
    events: fallbackEvents,
    source: "fallback",
    message,
    updatedAt: new Date().toISOString(),
  };
}

export function normalizeEventsForDisplay(events: Event[]) {
  return events;
}

export async function fetchWorldCupEventsFromWorldCup26(): Promise<WorldCupEventsApiResponse> {
  const [gamesPayload, stadiumsPayload] = await Promise.all([
    fetchJsonWithRetry<WorldCup26GamesResponse>(WORLDCUP26_GAMES_URL),
    fetchJsonWithRetry<WorldCup26StadiumsResponse>(WORLDCUP26_STADIUMS_URL),
  ]);
  const stadiumLookup = new Map(
    stadiumsPayload.stadiums.map((stadium) => [stadium.id, stadium])
  );

  const mappedEvents = gamesPayload.games
    .filter(isUpcomingAvailableGame)
    .map((game) => mapGameToEvent(game, stadiumLookup))
    .sort((left, right) => left.kickoffUtc!.localeCompare(right.kickoffUtc!));

  return {
    events: mappedEvents,
    source: "live",
    message:
      mappedEvents.length === 0
        ? "No upcoming pre-match World Cup fixtures are available right now, so the list is empty until the next scheduled match."
        : undefined,
    updatedAt: new Date().toISOString(),
  };
}

function isCacheFresh(cachedAt: number, ttlMs: number) {
  return cachedAt > 0 && Date.now() - cachedAt < ttlMs;
}

export async function fetchCachedWorldCupEventsFromWorldCup26() {
  if (cachedLiveEventsResponse && isCacheFresh(cachedLiveEventsAt, LIVE_EVENTS_CACHE_TTL_MS)) {
    return cachedLiveEventsResponse;
  }

  if (liveEventsRequest) {
    return liveEventsRequest;
  }

  liveEventsRequest = fetchWorldCupEventsFromWorldCup26()
    .then((payload) => {
      cachedLiveEventsResponse = payload;
      cachedLiveEventsAt = Date.now();
      return payload;
    })
    .finally(() => {
      liveEventsRequest = null;
    });

  return liveEventsRequest;
}

export async function fetchWorldCupEvents(
  signal?: AbortSignal
): Promise<WorldCupEventsApiResponse> {
  void signal;

  if (
    cachedClientEventsResponse &&
    isCacheFresh(cachedClientEventsAt, CLIENT_EVENTS_CACHE_TTL_MS)
  ) {
    return cachedClientEventsResponse;
  }

  if (clientEventsRequest) {
    return clientEventsRequest;
  }

  clientEventsRequest = fetch("/api/world-cup-events")
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Local World Cup API failed with ${response.status}`);
      }

      return (await response.json()) as WorldCupEventsApiResponse;
    })
    .then((payload) => {
      cachedClientEventsResponse = payload;
      cachedClientEventsAt = Date.now();
      return payload;
    })
    .finally(() => {
      clientEventsRequest = null;
    });

  return clientEventsRequest;
}
