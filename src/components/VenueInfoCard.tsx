import { MapPinned } from "lucide-react";
import type { HostCity } from "../data/hostCities";

export default function VenueInfoCard({ city }: { city: HostCity }) {
  return (
    <section className="rounded-[1.25rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)] p-5">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--theme-background-color-secondary)] text-[var(--theme-text-color-primary)]">
          <MapPinned size={16} />
        </div>
        <div>
          <a
            href="#"
            className="text-[1rem] font-medium text-[var(--theme-text-color-primary)] underline decoration-[var(--theme-text-color-primary)]/60 underline-offset-2"
          >
            {city.stadium}
          </a>
          <p className="mt-2 text-[0.95rem] leading-7 text-[var(--theme-text-color-secondary)]">
            {city.addressLine1}
            <br />
            {city.addressLine2}
          </p>
        </div>
      </div>
    </section>
  );
}
