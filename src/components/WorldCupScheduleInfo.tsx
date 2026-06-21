import {
  getTeamFlagUrl,
  getTeamPath,
  worldCupTeams,
} from "../lib/teamMeta";

const worldCupWinners = [
  { year: "2022", winner: "Argentina" },
  { year: "2018", winner: "France" },
  { year: "2014", winner: "Germany" },
  { year: "2010", winner: "Spain" },
  { year: "2006", winner: "Italy" },
  { year: "2002", winner: "Brazil" },
  { year: "1998", winner: "France" },
  { year: "1994", winner: "Brazil" },
  { year: "1990", winner: "West Germany" },
  { year: "1986", winner: "Argentina" },
  { year: "1982", winner: "Italy" },
  { year: "1978", winner: "Argentina" },
  { year: "1974", winner: "West Germany" },
  { year: "1970", winner: "Brazil" },
  { year: "1966", winner: "England" },
  { year: "1962", winner: "Brazil" },
  { year: "1958", winner: "Brazil" },
  { year: "1954", winner: "West Germany" },
  { year: "1950", winner: "Uruguay" },
  { year: "1938", winner: "Italy" },
  { year: "1934", winner: "Italy" },
  { year: "1930", winner: "Uruguay" },
];

const titleLeaders = [
  { team: "Brazil", titles: 5 },
  { team: "Germany", titles: 4 },
  { team: "Italy", titles: 4 },
  { team: "Argentina", titles: 3 },
  { team: "France", titles: 2 },
  { team: "Uruguay", titles: 2 },
  { team: "Spain", titles: 1 },
  { team: "England", titles: 1 },
];

const hostVenues = [
  { city: "Mexico City, Mexico", venue: "Estadio Azteca" },
  { city: "Guadalajara, Mexico", venue: "Estadio Akron" },
  { city: "Monterrey, Mexico", venue: "Estadio BBVA" },
  { city: "Toronto, Canada", venue: "BMO Field" },
  { city: "Vancouver, Canada", venue: "BC Place" },
  { city: "New York / New Jersey (East Rutherford, NJ)", venue: "MetLife Stadium" },
  { city: "Dallas (Arlington, TX)", venue: "AT&T Stadium" },
  { city: "Kansas City, Missouri", venue: "GEHA Field at Arrowhead Stadium" },
  { city: "Houston, Texas", venue: "NRG Stadium" },
  { city: "Los Angeles (Inglewood, CA)", venue: "SoFi Stadium" },
  { city: "San Francisco / Santa Clara, CA", venue: "Levi's Stadium" },
  { city: "Seattle, Washington", venue: "Lumen Field" },
  { city: "Atlanta, Georgia", venue: "Mercedes-Benz Stadium" },
  { city: "Miami, Florida", venue: "Hard Rock Stadium" },
  { city: "Philadelphia, Pennsylvania", venue: "Lincoln Financial Field" },
  { city: "Boston (Foxborough), Massachusetts", venue: "Gillette Stadium" },
];

const playersToWatch = [
  {
    name: "Lionel Messi",
    detail:
      "Widely regarded as one of the greatest footballers of all time, Messi led Argentina to the 2022 World Cup title and remains a marquee attraction whenever he appears on the international stage.",
  },
  {
    name: "Kylian Mbappe",
    detail:
      "Mbappe is one of the most explosive forwards in the world and already owns a World Cup winner's medal. His pace, finishing, and big-match presence make him a headline player to watch.",
  },
  {
    name: "Jude Bellingham",
    detail:
      "The England midfielder has become one of the game's standout young stars, blending ball progression, work rate, and end-product in high-pressure matches.",
  },
  {
    name: "Mohamed Salah",
    detail:
      "If Egypt qualifies, Salah would bring world-class experience, elite movement in the final third, and the ability to decide tight matches with a single moment.",
  },
  {
    name: "Christian Pulisic",
    detail:
      "For fans following the United States, Pulisic remains a central figure thanks to his direct running, creativity, and experience in major tournament environments.",
  },
];

const qualifiedTeams = [
  { team: "USA", path: "Host nation" },
  { team: "Canada", path: "Host nation" },
  { team: "Mexico", path: "Host nation" },
  { team: "Argentina", path: "CONMEBOL qualification" },
  { team: "Brazil", path: "CONMEBOL qualification" },
  { team: "Ecuador", path: "CONMEBOL qualification" },
  { team: "Japan", path: "AFC qualification" },
  { team: "Iran", path: "AFC qualification" },
  { team: "Uzbekistan", path: "AFC qualification" },
  { team: "South Korea", path: "AFC qualification" },
  { team: "Australia", path: "AFC qualification" },
  { team: "Jordan", path: "AFC qualification" },
  { team: "New Zealand", path: "OFC qualification" },
];

const scheduleAndPrices = [
  { date: "06/11/2026", location: "Mexico City", venue: "Estadio Azteca", lowestPrice: "$474" },
  { date: "06/12/2026", location: "Santa Clara", venue: "Levi's Stadium", lowestPrice: "$182" },
  { date: "06/13/2026", location: "Inglewood", venue: "SoFi Stadium", lowestPrice: "$389" },
  { date: "06/13/2026", location: "Seattle", venue: "Lumen Field", lowestPrice: "$219" },
  { date: "06/14/2026", location: "Mexico City", venue: "Estadio Azteca", lowestPrice: "$247" },
  { date: "06/17/2026", location: "Houston", venue: "NRG Stadium", lowestPrice: "$526" },
  {
    date: "06/18/2026",
    location: "Miami Gardens",
    venue: "Hard Rock Stadium",
    lowestPrice: "$610",
  },
  {
    date: "06/19/2026",
    location: "East Rutherford",
    venue: "MetLife Stadium",
    lowestPrice: "$400",
  },
  { date: "06/20/2026", location: "Atlanta", venue: "Mercedes-Benz Stadium", lowestPrice: "$308" },
  {
    date: "06/20/2026",
    location: "Philadelphia",
    venue: "Lincoln Financial Field",
    lowestPrice: "$398",
  },
  {
    date: "06/21/2026",
    location: "Kansas City",
    venue: "GEHA Field at Arrowhead Stadium",
    lowestPrice: "$504",
  },
  { date: "06/23/2026", location: "Foxborough", venue: "Gillette Stadium", lowestPrice: "$473" },
  { date: "06/24/2026", location: "Seattle", venue: "Lumen Field", lowestPrice: "$195" },
  { date: "06/24/2026", location: "Guadalajara", venue: "Estadio Akron", lowestPrice: "$190" },
  { date: "06/26/2026", location: "Atlanta", venue: "Mercedes-Benz Stadium", lowestPrice: "$394" },
  { date: "06/27/2026", location: "Boston", venue: "Gillette Stadium", lowestPrice: "$289" },
  { date: "06/30/2026", location: "Los Angeles", venue: "SoFi Stadium", lowestPrice: "$900" },
  { date: "07/11/2026", location: "Arlington", venue: "AT&T Stadium", lowestPrice: "$799" },
];

const seatingChartVenues = [
  "Reliant Stadium",
  "BMO Field",
  "GEHA Field at Arrowhead Stadium",
  "Estadio BBVA Bancomer",
  "Mercedes-Benz Stadium",
  "SoFi Stadium",
  "Hard Rock Stadium",
  "BC Place Stadium",
  "AT&T Stadium",
  "Lincoln Financial Field",
  "MetLife Stadium",
  "Levi's Stadium",
  "Gillette Stadium",
  "Estadio Akron",
  "Lumen Field",
];

const sportsTicketsCities = [
  "Philadelphia",
  "San Jose",
  "Houston",
  "Toronto",
  "Kansas City",
  "Monterrey",
  "Atlanta",
  "Los Angeles",
  "Miami",
  "Vancouver",
];

const worldCupNews = [
  {
    date: "June 17, 2026",
    title: "USMNT vs. Australia ticket demand soars after USA's opening World Cup win over Paraguay",
    excerpt:
      "When the U.S. Men's National Team beat Paraguay 4-1 at SoFi Stadium last Friday, it was a major statement. The vibes are back, their form looked much better than expected, and a fan base that has waited...",
  },
  {
    date: "June 8, 2026",
    title: "San Francisco 2026 summer events guide: top sports, concerts, theater and more",
    excerpt:
      "A massive summer is coming to the San Francisco Bay Area. The World Cup brings six matches to Levi's Stadium in Santa Clara, while Oracle Park anchors the season with Giants baseball and one of the summer's...",
  },
  {
    date: "June 8, 2026",
    title: "Philadelphia 2026 summer events guide: top sports, concerts, theater and more",
    excerpt:
      "A once-in-a-generation summer is coming to Philadelphia. The World Cup lands six matches at Lincoln Financial Field, America's 250th birthday puts Philly at the center of the national celebration and...",
  },
];

function TeamListItem({
  team,
  onNavigate,
}: {
  team: string;
  onNavigate?: (path: string) => void;
}) {
  const flagUrl = getTeamFlagUrl(team, 80);
  const teamPath = getTeamPath(team);

  return (
    <a
      href={teamPath}
      onClick={(event) => {
        if (!onNavigate) {
          return;
        }

        event.preventDefault();
        onNavigate(teamPath);
      }}
      className="flex items-center gap-4"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[0.5rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]">
        {flagUrl ? (
          <img
            src={flagUrl}
            alt={`${team} flag`}
            className="h-full w-full object-cover"
            loading="lazy"
            width={32}
            height={32}
          />
        ) : (
          <span className="text-[0.7rem] font-bold uppercase text-[var(--theme-text-color-tertiary)]">
            {team.slice(0, 2)}
          </span>
        )}
      </div>
      <span className="text-[0.96rem] font-semibold leading-5 text-[var(--theme-text-color-primary)]">
        {team}
      </span>
    </a>
  );
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: [string, string];
  rows: Array<{ left: string; right: string }>;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-[1rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(140px,0.9fr)] border-b border-[var(--theme-divider-color)] px-4 py-3 text-[0.8rem] font-bold text-[var(--theme-text-color-primary)]">
        <div>{headers[0]}</div>
        <div>{headers[1]}</div>
      </div>
      {rows.map((row, index) => (
        <div
          key={`${row.left}-${row.right}`}
          className={`grid grid-cols-[minmax(0,1fr)_minmax(140px,0.9fr)] px-4 py-3 text-[0.9rem] text-[var(--theme-text-color-secondary)] ${
            index < rows.length - 1 ? "border-b border-[var(--theme-divider-color)]" : ""
          }`}
        >
          <div className="pr-4">{row.left}</div>
          <div>{row.right}</div>
        </div>
      ))}
    </div>
  );
}

function ThreeColumnTable({
  headers,
  rows,
}: {
  headers: [string, string, string];
  rows: Array<{ first: string; second: string; third: string; detail?: string }>;
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-[1rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]">
      <div className="grid grid-cols-[110px_minmax(0,1fr)_110px] border-b border-[var(--theme-divider-color)] px-4 py-3 text-[0.75rem] font-bold text-[var(--theme-text-color-primary)] sm:grid-cols-[120px_minmax(0,1fr)_120px] sm:text-[0.8rem]">
        <div>{headers[0]}</div>
        <div className="pr-4">{headers[1]}</div>
        <div>{headers[2]}</div>
      </div>
      {rows.map((row, index) => (
        <div
          key={`${row.first}-${row.second}-${row.third}-${row.detail ?? ""}`}
          className={`grid grid-cols-[110px_minmax(0,1fr)_110px] px-4 py-3 text-[0.82rem] text-[var(--theme-text-color-secondary)] sm:grid-cols-[120px_minmax(0,1fr)_120px] sm:text-[0.9rem] ${
            index < rows.length - 1 ? "border-b border-[var(--theme-divider-color)]" : ""
          }`}
        >
          <div>{row.first}</div>
          <div className="pr-4">
            <div className="font-medium text-[var(--theme-text-color-primary)]">{row.second}</div>
            {row.detail ? (
              <div className="text-[0.78rem] text-[var(--theme-text-color-tertiary)] sm:text-[0.82rem]">
                {row.detail}
              </div>
            ) : null}
          </div>
          <div className="font-medium text-[var(--theme-text-color-primary)]">{row.third}</div>
        </div>
      ))}
    </div>
  );
}

function LinkListSection({
  title,
  label,
  items,
}: {
  title: string;
  label: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-[2rem] font-bold tracking-tight text-[var(--theme-text-color-primary)]">
        {title}
      </h3>
      <p className="mt-6 text-[0.95rem] text-[var(--theme-text-color-secondary)]">{label}</p>
      <div className="mt-4 rounded-[1rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]">
        {items.map((item, index) => (
          <a
            key={item}
            href="#"
            className={`block px-4 py-4 text-[0.92rem] font-medium text-[var(--theme-text-color-primary)] underline decoration-[var(--theme-text-color-primary)]/60 underline-offset-2 transition-colors hover:text-[var(--theme-accent-color)] ${
              index < items.length - 1 ? "border-b border-[var(--theme-divider-color)]" : ""
            }`}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function WorldCupScheduleInfo({
  onNavigate,
}: {
  onNavigate?: (path: string) => void;
}) {
  return (
    <section className="mt-14 w-full space-y-12">
      <div id="world-cup-teams" className="w-full scroll-mt-28">
        <h3 className="text-[1.35rem] font-bold tracking-tight text-[var(--theme-text-color-primary)] md:text-[1.5rem]">
          World Cup teams
        </h3>
        <div className="mt-7 grid grid-cols-2 gap-x-9 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-12">
          {worldCupTeams.map((team) => (
            <TeamListItem key={team} team={team} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      <div className="w-full space-y-8 text-[0.92rem] leading-6 text-[var(--theme-text-color-secondary)]">
        <div>
          <h3 className="text-[2rem] font-bold tracking-tight text-[var(--theme-text-color-primary)]">
            2026 World Cup tickets
          </h3>
          <div className="mt-4 space-y-4">
            <p>
              The World Cup is the most-watched sporting event in the world, and the 2026 tournament
              brings that energy to the United States, Canada, and Mexico. With 48 teams and 104
              matches, demand is expected to be high across the group stage and the knockout rounds.
            </p>
            <p>
              This expanded format means more marquee matchups, more cities hosting matches, and more
              opportunities to find tickets that fit your travel plans and budget. Whether you are
              following one national team or planning around the host cities, it helps to compare
              matches early.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            How much are 2026 World Cup tickets?
          </h4>
          <p className="mt-3">
            Ticket prices for the 2026 World Cup can vary widely based on the match, the stage, and
            the host city. Premium knockout games typically cost more than early group-stage fixtures,
            while demand also rises when top teams or marquee venues are involved.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Match stage:</span>{" "}
              Group-stage games are usually more affordable than Round of 16, quarterfinals,
              semifinals, and the final.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Team draw:</span>{" "}
              Prices often rise for matches featuring teams with large traveling fan bases or strong
              title expectations.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Venue and location:</span>{" "}
              Major host cities and iconic stadiums can carry higher prices than smaller markets.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Seat category:</span>{" "}
              Lower-bowl and midfield sections usually cost more than upper-level options.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Timing and availability:</span>{" "}
              Prices can change as inventory moves, especially closer to matchday.
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Looking to compare World Cup prices?
          </h4>
          <p className="mt-3">
            Comparing cities, stadiums, and stages can help you spot better value before demand
            spikes. If you are flexible on location or matchup, there are often more affordable
            options available earlier in the schedule.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              Explore different host cities to compare price ranges across the tournament.
            </li>
            <li>
              Review seating sections and venue layouts before choosing between lower and upper bowl
              options.
            </li>
            <li>
              Compare knockout-round pricing against premium group-stage matches to find the best fit
              for your budget.
            </li>
            <li>
              Use filters and sorting to quickly narrow the schedule by city, team, and date.
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            What are the different ticket categories for the 2026 World Cup?
          </h4>
          <p className="mt-3">
            FIFA typically organizes tickets into several categories based on seating location and
            hospitality level. For 2026, the most premium seats are closest to midfield, while lower
            categories usually sit behind the goals or higher in the bowl.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Category 1:</span>{" "}
              Premium midfield seating near the touchline and closest to the halfway line.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Category 2:</span>{" "}
              Excellent sideline seats that often extend toward the corners of the stadium.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Category 3:</span>{" "}
              Mid-range options behind the goals or in upper-tier sections.
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Category 4:</span>{" "}
              Budget-friendly seats, often reserved for upper-level or behind-the-goal areas.
            </li>
          </ul>
          <p className="mt-4">
            Each listing can vary by city and venue, so comparing seat maps and ticket sections is
            one of the easiest ways to understand the value of each option.
          </p>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            When is the 2026 World Cup and what is the 2026 World Cup schedule?
          </h4>
          <p className="mt-3">
            The 2026 World Cup kicks off on June 11, 2026, and runs through July 19, 2026. The
            tournament spans 39 days across the United States, Canada, and Mexico, with the opening
            match in Mexico City and the final at MetLife Stadium in New Jersey.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Group Stage:</span>{" "}
              June 11 to June 27
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Round of 32:</span>{" "}
              June 28 to July 3
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Round of 16:</span>{" "}
              July 4 to July 7
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Quarterfinals:</span>{" "}
              July 9 to July 11
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Semifinals:</span>{" "}
              July 14 to July 15
            </li>
            <li>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Final:</span>{" "}
              July 19
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            How does the 2026 World Cup work?
          </h4>
          <p className="mt-3">
            The 2026 edition uses an expanded 48-team format. Teams are split into 12 groups of four,
            each team plays three group-stage matches, and the top two teams from each group plus the
            eight best third-place teams advance to the knockout rounds.
          </p>
          <div className="mt-4 space-y-2">
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Group Stage:</span>{" "}
              Teams compete within their group for three matches each.
            </p>
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Round of 32:</span>{" "}
              The expanded bracket begins with 32 teams in single-elimination play.
            </p>
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Round of 16:</span>{" "}
              Winners advance to the second knockout round.
            </p>
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Quarterfinals:</span>{" "}
              Eight teams remain with a place in the semifinals at stake.
            </p>
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Semifinals:</span>{" "}
              The final four compete for a place in the championship match.
            </p>
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Third-Place Match:</span>{" "}
              The two semifinal losers meet one last time.
            </p>
            <p>
              <span className="font-semibold text-[var(--theme-text-color-primary)]">Final:</span>{" "}
              The last two teams play for the World Cup title.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Which teams have won the World Cup?
          </h4>
          <p className="mt-3">
            Brazil has won the most World Cups with five titles, followed by Germany and Italy with
            four each. Here is the list of champions by year.
          </p>
          <SimpleTable
            headers={["Year", "Winner"]}
            rows={worldCupWinners.map((item) => ({ left: item.year, right: item.winner }))}
          />
        </div>

        <div>
          <p className="font-semibold text-[var(--theme-text-color-primary)]">Most titles overall:</p>
          <div className="mt-3 space-y-2">
            {titleLeaders.map((entry) => (
              <p key={entry.team}>
                <span className="font-semibold text-[var(--theme-text-color-primary)]">
                  {entry.team}
                </span>{" "}
                - {entry.titles}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Where will the 2026 World Cup be played?
          </h4>
          <p className="mt-3">
            The 2026 World Cup will be hosted across the United States, Canada, and Mexico. Matches
            will be played in 16 stadiums spread across the three host countries.
          </p>
          <p className="mt-3">
            The host cities below are where matches will be played throughout the tournament, from the
            opening stages through the final.
          </p>
          <SimpleTable
            headers={["Host City", "Venue"]}
            rows={hostVenues.map((item) => ({ left: item.city, right: item.venue }))}
          />
          <p className="mt-4">
            Fans can use the host-city list to compare venues and decide which destination best fits
            their travel plans and match preferences.
          </p>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            How can I find 2026 World Cup tickets by city?
          </h4>
          <p className="mt-3">
            Finding tickets by city is one of the easiest ways to narrow your options. Once you know
            which host city or stadium you want, you can compare dates, matchups, and pricing much
            faster.
          </p>
          <h4 className="mt-6 text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Where can I find 2026 World Cup seating charts?
          </h4>
          <p className="mt-3">
            Seating charts help you compare viewing angles, section locations, and price ranges before
            choosing seats. Each of the 16 host stadiums has its own layout, so it is helpful to look
            at the venue map for the specific match you want.
          </p>
          <p className="mt-3">
            Here are each of the 16 stadiums that will host 2026 World Cup matches and the city they
            are in.
          </p>
          <SimpleTable
            headers={["Host City", "Venue"]}
            rows={hostVenues.map((item) => ({ left: item.city, right: item.venue }))}
          />
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            How many 2026 World Cup teams are there?
          </h4>
          <div className="mt-3 space-y-4">
            <p>
              The 2026 World Cup expands from 32 teams to 48 teams, marking the largest World Cup in
              history. The tournament also grows from 64 matches to 104 matches, spread across host
              cities in the United States, Canada, and Mexico.
            </p>
            <p>
              The expanded format creates 12 groups of four teams. After the group stage, the top two
              teams in each group plus the eight best third-place teams advance to the Round of 32,
              creating a bigger knockout bracket than any previous edition.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Who are the top players to watch at the 2026 World Cup?
          </h4>
          <p className="mt-3">
            Several star players are expected to shape the biggest matches of the tournament. The
            final list depends on form, fitness, and qualification, but these names are among the
            most followed heading into World Cup play.
          </p>
          <div className="mt-4 space-y-4">
            {playersToWatch.map((player) => (
              <p key={player.name}>
                <span className="font-semibold text-[var(--theme-text-color-primary)]">
                  {player.name}
                </span>{" "}
                {player.detail}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Which teams have already qualified for the 2026 World Cup?
          </h4>
          <p className="mt-3">
            The final field is completed through regional qualifying, but a number of teams secured
            their places early, including the three co-hosts and several nations that advanced through
            CONMEBOL, AFC, and OFC qualification.
          </p>
          <SimpleTable
            headers={["Team", "Qualification Path"]}
            rows={qualifiedTeams.map((item) => ({ left: item.team, right: item.path }))}
          />
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Is it better to buy 2026 World Cup tickets in advance?
          </h4>
          <p className="mt-3">
            Purchasing earlier can give you the widest selection of matches, sections, and price
            points. While prices can still move over time, early shopping usually makes it easier to
            compare listings before the most popular fixtures tighten up.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Secure better seat locations before the most desirable inventory is picked over.</li>
            <li>Compare multiple host cities and matchdays while more options remain available.</li>
            <li>Plan travel, hotels, and transportation with more certainty around your match date.</li>
            <li>Reduce the stress of last-minute buying once knockout-round demand starts to rise.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            How will my 2026 World Cup tickets be delivered?
          </h4>
          <div className="mt-3 space-y-4">
            <p>
              Most World Cup ticketing on major marketplaces is handled digitally. Delivery timing can
              vary by seller, event organizer, and mobile transfer rules, so each listing should show
              the expected delivery window before checkout.
            </p>
            <p>
              If tickets are not available for instant transfer right away, sellers typically deliver
              them as soon as the tickets are released or transferred by the event organizer. Keeping
              an eye on the listing details and confirmation email is the best way to know when your
              tickets will arrive.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            Is it safe to buy 2026 World Cup resale tickets?
          </h4>
          <p className="mt-3">
            Resale tickets can be a practical option when primary inventory is limited or sold out.
            Buying through an established marketplace with buyer protections helps reduce risk and
            gives you clearer support options if an issue comes up with the order.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Review the listing details carefully, including section, row, and delivery timing.</li>
            <li>Use trusted platforms that verify sellers and provide order support when needed.</li>
            <li>Check whether the tickets are mobile transfer, account surrender, or another format.</li>
            <li>Keep your confirmation email and order information accessible until matchday.</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            What happens if a 2026 World Cup match is postponed or rescheduled?
          </h4>
          <div className="mt-3 space-y-4">
            <p>
              If a match is moved to a new date, tickets are often still valid for the rescheduled
              event, subject to the event organizer's policy. Marketplace support pages normally
              explain whether you should hold the tickets or expect updated delivery instructions.
            </p>
            <p>
              Because the exact policy can vary by organizer and venue, it is best to check the order
              details and the marketplace's support guidance if a scheduling change is announced.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            What happens if a 2026 World Cup match is cancelled?
          </h4>
          <div className="mt-3 space-y-4">
            <p>
              If a match is officially cancelled and not rescheduled, eligible orders are typically
              handled under the marketplace's cancellation policy. That may include a refund or a
              credit, depending on the platform and the circumstances of the event.
            </p>
            <p>
              Refund timing and method can differ, so fans should look at the marketplace policy tied
              to their purchase and watch for post-cancellation updates sent to the email associated
              with the order.
            </p>
          </div>
        </div>

        <div>
          <h4 className="text-[1.12rem] font-bold text-[var(--theme-text-color-primary)]">
            World Cup Schedule and Ticket Prices
          </h4>
          <ThreeColumnTable
            headers={["Date", "Location", "Lowest Price"]}
            rows={scheduleAndPrices.map((item) => ({
              first: item.date,
              second: item.location,
              third: item.lowestPrice,
              detail: item.venue,
            }))}
          />
        </div>

        <LinkListSection
          title="World Cup game Seating Charts"
          label="Venue Seating"
          items={seatingChartVenues}
        />

        <LinkListSection
          title="Sports Tickets By City"
          label="City"
          items={sportsTicketsCities}
        />

      </div>

      <section className="border-t border-[var(--theme-divider-color)] pt-10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[1.6rem] font-bold tracking-tight text-[var(--theme-text-color-primary)]">
            World Cup News
          </h3>
          <div className="flex items-center gap-3 rounded-full border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)] px-4 py-2 text-[0.82rem] text-[var(--theme-text-color-secondary)]">
            <button
              type="button"
              aria-label="Previous news"
              className="text-[1rem] leading-none text-[var(--theme-text-color-secondary)]"
            >
              &#8249;
            </button>
            <span>1 of 5</span>
            <button
              type="button"
              aria-label="Next news"
              className="text-[1rem] leading-none text-[var(--theme-text-color-secondary)]"
            >
              &#8250;
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max snap-x snap-mandatory gap-5">
            {worldCupNews.map((item) => (
              <article
                key={`${item.date}-${item.title}`}
                className="flex min-h-[21.5rem] w-[21.5rem] shrink-0 snap-start flex-col rounded-[1.6rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)] p-7 md:min-h-[23rem] md:w-[23rem] md:p-8"
              >
                <p className="text-[0.8rem] text-[var(--theme-text-color-tertiary)]">{item.date}</p>
                <h4 className="mt-5 text-[1rem] font-bold leading-[1.45] text-[var(--theme-text-color-primary)] md:text-[1.08rem]">
                  {item.title}
                </h4>
                <p className="mt-5 text-[0.94rem] leading-[1.95] text-[var(--theme-text-color-secondary)] md:text-[1rem]">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
