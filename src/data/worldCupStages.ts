export interface WorldCupStage {
  title: string;
  matches: string;
  href: string;
  image: string;
  scheduleTitle: string;
  heroTitle: string;
  rounds: string[];
  aliases?: string[];
}

export const worldCupStages: WorldCupStage[] = [
  {
    title: "World Cup Group Stage",
    matches: "50 matches",
    href: "/fifa-world-cup-group-stage-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-group-stage-a1eadf/1966733/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Group Stage games",
    heroTitle: "World Cup Group Stage tickets",
    rounds: ["Group Stage"],
    aliases: ["group", "group stage"],
  },
  {
    title: "World Cup Round of 32",
    matches: "16 matches",
    href: "/fifa-world-cup-round-of-32-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-round-of-32-06894c/1966734/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Round of 32 games",
    heroTitle: "World Cup Round of 32 tickets",
    rounds: ["Round of 32"],
    aliases: ["round of 32", "last 32", "last32", "r32"],
  },
  {
    title: "World Cup Round of 16",
    matches: "8 matches",
    href: "/fifa-world-cup-round-of-16-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-round-of-16-c0384f/1966735/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Round of 16 games",
    heroTitle: "World Cup Round of 16 tickets",
    rounds: ["Round of 16"],
    aliases: ["round of 16", "last 16", "last16", "r16"],
  },
  {
    title: "World Cup Quarterfinals",
    matches: "4 matches",
    href: "/fifa-world-cup-quarterfinals-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-quarterfinals-986e86/1966736/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Quarterfinal games",
    heroTitle: "World Cup Quarterfinal tickets",
    rounds: ["Quarterfinal"],
    aliases: ["quarterfinal", "quarter final", "quarterfinals", "qf"],
  },
  {
    title: "World Cup Semifinals",
    matches: "2 matches",
    href: "/fifa-world-cup-semifinals-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-semifinals-d73e93/1966737/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Semifinal games",
    heroTitle: "World Cup Semifinal tickets",
    rounds: ["Semifinal"],
    aliases: ["semifinal", "semi final", "semifinals", "sf"],
  },
  {
    title: "World Cup Third Place",
    matches: "1 match",
    href: "/fifa-world-cup-third-place-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-third-place-9bf6a8/1966738/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Third Place game",
    heroTitle: "World Cup Third Place tickets",
    rounds: ["3rd Place"],
    aliases: ["3rd place", "third place", "3rd", "third"],
  },
  {
    title: "World Cup Final",
    matches: "1 match",
    href: "/fifa-world-cup-final-tickets",
    image:
      "https://seatgeekimages.com/performers-landscape/fifa-world-cup-final-57852b/1966739/1100x700.jpg?auto=webp&width=1200&quality=75",
    scheduleTitle: "World Cup Final game",
    heroTitle: "World Cup Final tickets",
    rounds: ["Final"],
    aliases: ["final"],
  },
];

export function getWorldCupStageByPath(pathname: string) {
  return worldCupStages.find((stage) => stage.href === pathname);
}

function normalizeStageValue(value?: string) {
  return (value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

export function eventMatchesStage(
  stage: WorldCupStage,
  event: {
    round?: string;
    groupLetter?: string;
  }
) {
  const stageTokens = new Set(
    [...stage.rounds, ...(stage.aliases ?? [])].map((value) => normalizeStageValue(value))
  );
  const eventTokens = [
    normalizeStageValue(event.round),
    normalizeStageValue(event.groupLetter),
  ].filter(Boolean);

  return eventTokens.some((token) => stageTokens.has(token));
}
