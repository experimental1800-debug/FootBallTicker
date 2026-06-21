import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import type { Event } from "../data/events";
import { CalendarX } from "lucide-react";

interface EventListProps {
  events: Event[];
  onPurchase?: (event: Event) => void;
}

const INITIAL_VISIBLE_EVENTS = 25;

export default function EventList({ events, onPurchase }: EventListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_EVENTS);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_EVENTS);
  }, [events]);

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)]/70 px-4 py-24 text-center">
        <CalendarX size={48} className="mb-4 text-[var(--theme-icon-color-tertiary)]" />
        <h3 className="mb-1 text-lg font-bold text-[var(--theme-text-color-secondary)]">No events found</h3>
        <p className="max-w-xs text-sm text-[var(--theme-text-color-tertiary)]">
          Try adjusting your filters to find available tickets.
        </p>
      </div>
    );
  }

  const visibleEvents = events.slice(0, visibleCount);
  const hasMoreEvents = visibleCount < events.length;

  return (
    <div className="space-y-3 md:space-y-2">
      {visibleEvents.map((event) => (
        <EventCard key={event.id} event={event} onPurchase={onPurchase} />
      ))}
      {hasMoreEvents && (
        <button
          type="button"
          onClick={() => setVisibleCount(events.length)}
          className="flex w-full items-center justify-center rounded-[1rem] border border-[var(--theme-border-color-primary)] bg-[var(--theme-background-color-primary)] px-6 py-4 text-[1.05rem] font-semibold text-[var(--theme-text-color-primary)] transition-colors hover:bg-[var(--theme-background-color-control-hover)]"
        >
          Show more
        </button>
      )}
    </div>
  );
}
