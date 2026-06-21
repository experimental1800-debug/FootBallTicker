import { ChevronDown } from "lucide-react";

interface FiltersProps {
  selectedCity: string;
  selectedDate: string;
  selectedTeam: string;
  cities: string[];
  dates: string[];
  teams: string[];
  onCityChange: (city: string) => void;
  onDateChange: (date: string) => void;
  onTeamChange: (team: string) => void;
}

function Select({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[88px] appearance-none rounded-full border border-[var(--theme-border-color-primary)] bg-[var(--theme-background-color-control-base)] px-5 py-3 pr-10 text-[1.04rem] font-medium text-[var(--theme-text-color-primary)] shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-colors hover:border-[var(--theme-border-color-primaryHover)] focus:outline-none focus:ring-2 focus:ring-black/5"
      >
        {options.map((opt, index) => (
          <option key={`${opt}-${index}`} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--theme-icon-color-secondary)]"
      />
    </div>
  );
}

export default function Filters({
  selectedCity,
  selectedDate,
  selectedTeam,
  cities,
  dates,
  teams,
  onCityChange,
  onDateChange,
  onTeamChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={selectedCity} options={cities} onChange={onCityChange} />
      <Select value={selectedDate} options={dates} onChange={onDateChange} />
      <Select value={selectedTeam} options={teams} onChange={onTeamChange} />
    </div>
  );
}
