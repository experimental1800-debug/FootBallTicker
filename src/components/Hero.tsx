import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import type { Event } from "../data/events";
import { getTeamImageUrl, getTeamPath } from "../lib/teamMeta";
import heroBackground from "../public/HeroBackgound.png";

interface Team {
  name: string;
  matches: number;
  logo: string;
}

const curatedFallbackTeams: Team[] = [
  {
    name: "Argentina",
    matches: 2,
    logo: getTeamImageUrl("Argentina") ?? "",
  },
  {
    name: "Portugal",
    matches: 2,
    logo: getTeamImageUrl("Portugal") ?? "",
  },
  {
    name: "Algeria",
    matches: 2,
    logo: getTeamImageUrl("Algeria") ?? "",
  },
];

function getPopularTeams(events: Event[]) {
  const teamStats = new Map<
    string,
    {
      name: string;
      matches: number;
      ticketDemand: number;
    }
  >();

  for (const event of events) {
    for (const team of [event.homeTeam, event.awayTeam]) {
      const safeTeam = team?.trim();

      if (!safeTeam || safeTeam === "TBD") {
        continue;
      }

      const existing = teamStats.get(safeTeam);
      if (existing) {
        existing.matches += 1;
        existing.ticketDemand += event.ticketCount;
      } else {
        teamStats.set(safeTeam, {
          name: safeTeam,
          matches: 1,
          ticketDemand: event.ticketCount,
        });
      }
    }
  }

  const dynamicTeams = Array.from(teamStats.values())
    .sort((a, b) => {
      if (b.matches !== a.matches) {
        return b.matches - a.matches;
      }

      if (b.ticketDemand !== a.ticketDemand) {
        return b.ticketDemand - a.ticketDemand;
      }

      return a.name.localeCompare(b.name);
    })
    .slice(0, 3)
    .map((team) => ({
      name: team.name,
      matches: team.matches,
      logo: getTeamImageUrl(team.name) ?? "",
    }))
    .filter((team) => Boolean(team.logo));

  if (dynamicTeams.length === 3) {
    return dynamicTeams;
  }

  const seen = new Set(dynamicTeams.map((team) => team.name));
  const fallbackTeams = curatedFallbackTeams.filter((team) => {
    if (seen.has(team.name)) {
      return false;
    }

    seen.add(team.name);
    return true;
  });

  return [...dynamicTeams, ...fallbackTeams].slice(0, 3);
}

export default function Hero({
  events,
  onNavigate,
}: {
  events: Event[];
  onNavigate?: (path: string) => void;
}) {
  const teams = useMemo(() => getPopularTeams(events), [events]);

  return (
    <section className="relative overflow-hidden bg-[#09090b] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.28),rgba(9,9,11,0.78))]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-[5.5rem] md:px-10 md:pb-6 md:pt-9 lg:px-14 lg:pt-10">
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="mx-auto max-w-[44rem] text-center md:mx-0 md:max-w-[36rem] md:text-left">
            <div>
              <h1 className="mx-auto max-w-[12ch] text-[3rem] font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-[3.35rem] md:mx-0 md:max-w-none md:text-[2.55rem] md:leading-[1.02] lg:text-[2.95rem]">
                World Cup 2026 tickets
              </h1>
              <div className="h-1" />
              <h2 className="text-[1.15rem] font-normal text-white/70 md:text-[1rem] lg:text-[1.1rem]">
                World Cup games and teams
              </h2>
              <div className="h-4" />
              <div>
                <button className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-base font-bold text-white backdrop-blur md:gap-2 md:px-3 md:py-1.5 md:text-[0.875rem]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 2C7 2 4 5 4 5v7c0 6 8 10 8 10s8-4 8-10V5s-3-3-8-3zm3.232 5.36l-4.3 5.159-2.225-2.226-1.414 1.414 3 3a1 1 0 001.475-.067l5-6-1.536-1.28z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>Every ticket protected</p>
                </button>
              </div>
            </div>
          </div>

          <div className="self-center md:mr-1 md:self-start">
            <img
              alt="World Cup"
              width="152"
              height="152"
              decoding="async"
              src="https://seatgeekimages.com/image_uploads/7e9f61dc-c7c9-4d89-89a1-9a0d30b4112d/WC-logo.png?auto=webp&width=384&quality=20"
              srcSet="https://seatgeekimages.com/image_uploads/7e9f61dc-c7c9-4d89-89a1-9a0d30b4112d/WC-logo.png?auto=webp&width=256&quality=20 1x, https://seatgeekimages.com/image_uploads/7e9f61dc-c7c9-4d89-89a1-9a0d30b4112d/WC-logo.png?auto=webp&width=384&quality=20 2x"
              className="h-[152px] w-[152px] rounded-[24px] object-cover object-center shadow-2xl shadow-black/40 md:h-[108px] md:w-[108px] lg:h-[118px] lg:w-[118px]"
            />
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8 md:mt-8 md:pt-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white">Popular teams</h2>
            <a
              href="/#world-cup-teams"
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              View all
            </a>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
            {teams.map((team) => (
            <a
              key={team.name}
              href={getTeamPath(team.name)}
              onClick={(event) => {
                if (!onNavigate) {
                  return;
                }

                event.preventDefault();
                onNavigate(getTeamPath(team.name));
              }}
              className="group flex min-w-[18.25rem] snap-start items-center justify-between rounded-2xl bg-white/15 px-5 py-4 backdrop-blur transition duration-200 hover:bg-white/20 md:min-w-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white">
                    <img
                        src={team.logo}
                        alt={team.name}
                        className="h-full w-full object-contain"
                    />
                </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {team.name}
                    </h3>

                    <p className="text-sm text-white/60">
                      {team.matches} matches
                    </p>
                  </div>
                </div>
                  <ChevronRight
                    size={20}
                    className="text-white/40 transition group-hover:text-white"
                  />
                </a>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
