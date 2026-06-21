import { useEffect, useMemo, useState } from "react";
import type { Event } from "../data/events";
import {
  getTeamFlagUrl,
  getTeamLogoUrl,
} from "../lib/teamMeta";

interface EventCardProps {
  event: Event;
}

function TeamBadge({
  team,
  logoUrl,
  index,
}: {
  team?: string;
  logoUrl?: string;
  index: number;
}) {
  const safeTeam = team?.trim() || "TBD";
  const sources = useMemo(() => {
    const preferredLogoUrl = logoUrl ?? getTeamLogoUrl(safeTeam);
    const flagUrl = getTeamFlagUrl(safeTeam, 80);

    return [preferredLogoUrl, flagUrl].filter((value): value is string => Boolean(value));
  }, [logoUrl, safeTeam]);

  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => {
    setSourceIndex(0);
  }, [sources]);

  const imageSrc = sources[sourceIndex];

  return (
    <div
      className={`absolute flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.7rem] border-[1.5px] border-white bg-[var(--theme-background-color-tertiary)] shadow-[0_1px_4px_rgba(36,63,97,0.1),0_0_1px_rgba(36,63,97,0.16)] ${
        index === 0
          ? "left-0 top-0 z-0 -rotate-[4deg]"
          : "left-[18px] top-[11px] z-10 rotate-[6deg]"
      }`}
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={`${safeTeam} National Football Team`}
          className="h-full w-full object-cover"
          width={28}
          height={28}
          loading="lazy"
          onError={() => {
            setSourceIndex((current) =>
              current < sources.length - 1 ? current + 1 : sources.length
            );
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[var(--theme-background-color-tertiary)] text-[0.62rem] font-bold uppercase text-[var(--theme-text-color-tertiary)]">
          {safeTeam === "TBD" ? "?" : safeTeam.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

export default function EventCard({ event }: EventCardProps) {
  const teams = [event.homeTeam?.trim() || "TBD", event.awayTeam?.trim() || "TBD"];
  const matchup =
    event.homeTeam === "TBD" && event.awayTeam === "TBD"
      ? `${event.round} Match`
      : `${event.homeTeam} vs ${event.awayTeam}`;
  const timeLabel = `${event.dayOfWeek}, ${event.time.replace(" ", "").toLowerCase()}`;
  const knockoutLabels: Record<string, string> = {
    R32: "Round of 32",
    R16: "Round of 16",
    QF: "Quarterfinals",
    SF: "Semifinals",
    "3RD": "Third Place",
    FINAL: "Final",
  };
  const groupLabel = event.groupLetter
    ? knockoutLabels[event.groupLetter] ?? `Group ${event.groupLetter}`
    : event.round;

  return (
    <a
      href="#"
      className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 gap-y-2 rounded-[1.3rem] px-2 py-3 transition-colors hover:bg-[var(--theme-background-color-primary)]/60 md:grid-cols-[56px_118px_minmax(0,1fr)_152px] md:grid-rows-[auto_auto] md:items-center md:gap-x-6 md:gap-y-1 md:px-0 md:py-4"
    >
      <p className="col-span-full text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--theme-text-color-tertiary)] md:col-start-3 md:col-span-1 md:row-start-1">
        {groupLabel}
      </p>

      <div className="row-span-2 flex items-center md:col-start-1 md:row-start-1 md:row-span-2">
        <div className="relative flex h-12 w-[58px] items-start">
          {teams.map((team, index) => {
            return (
              <TeamBadge
                key={`${event.id}-${team}-${index}`}
                team={team}
                logoUrl={index === 0 ? event.homeTeamLogo : event.awayTeamLogo}
                index={index}
              />
            );
          })}
        </div>
      </div>

      <div className="self-center md:col-start-2 md:row-start-2 md:self-auto">
        <p className="text-[1rem] font-bold leading-tight text-[var(--theme-text-color-primary)] md:text-[1.04rem]">
          {event.date}
        </p>
        <p className="mt-1 text-[0.92rem] text-[var(--theme-text-color-secondary)] md:text-[0.95rem]">
          {timeLabel}
        </p>
      </div>

      <div className="col-span-full min-w-0 md:col-start-3 md:row-start-2">
        <h3 className="text-[1.12rem] font-bold leading-tight text-[var(--theme-text-color-primary)] md:text-[1.06rem] lg:text-[1.15rem]">
          {matchup}
        </h3>
        <p className="mt-1 text-[1rem] text-[var(--theme-text-color-secondary)] md:text-[0.98rem]">
          {event.city}, {event.state} · {event.stadium}
        </p>
      </div>

      <div className="col-span-full flex justify-start md:col-start-4 md:row-start-1 md:row-span-2 md:justify-end">
        <div className="inline-flex min-w-[135px] items-center justify-center rounded-[0.85rem] bg-[var(--theme-background-color-button-primary-base)] px-5 py-3.5 text-center text-[1rem] font-bold text-[var(--theme-text-color-primary-alt)] shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] md:min-w-[135px] md:px-4 md:py-3">
          From ${event.minPrice.toLocaleString()}
        </div>
      </div>
    </a>
  );
}
