import { Heart } from "lucide-react";
import heroBackground from "../public/HeroBackgound.png";
import { getTeamImageUrl } from "../lib/teamMeta";

export default function TeamHero({ team }: { team: string }) {
  const teamImage = getTeamImageUrl(team, 256);

  return (
    <section className="relative overflow-hidden bg-[#09090b] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.28),rgba(9,9,11,0.82))]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-[5.5rem] md:px-12 md:pb-10 md:pt-9 lg:px-16 xl:px-20">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:gap-8 md:text-left">
          <div className="order-2 flex max-w-[42rem] flex-col items-center md:order-1 md:items-start">
            <h1 className="text-[2.55rem] font-bold leading-[1.02] tracking-[-0.03em] text-white md:text-[2.7rem]">
              {team} National Football Team tickets
            </h1>
            <p className="mt-2 text-[1.15rem] text-white/70 md:text-[1.02rem]">
              {team} World Cup games
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
              <span>Every ticket protected</span>
            </div>
          </div>

          <div className="order-1 shrink-0 md:order-2">
            <div className="relative mx-auto h-[172px] w-[172px] md:mr-2 md:h-[142px] md:w-[142px] lg:h-[156px] lg:w-[156px]">
              <button
                type="button"
                aria-label={`Track ${team}`}
                className="absolute right-0 top-0 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#181818] shadow-[0_12px_30px_rgba(0,0,0,0.28)] md:h-11 md:w-11"
              >
                <Heart size={20} />
              </button>

              <div className="absolute inset-x-0 bottom-0 top-4 overflow-hidden rounded-[1.9rem] bg-white shadow-[0_22px_44px_rgba(0,0,0,0.38)] md:top-2 md:rounded-[1.5rem]">
                {teamImage ? (
                  <img
                    src={teamImage}
                    alt={`${team} National Football Team`}
                    className="h-full w-full object-cover"
                    width={160}
                    height={160}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white text-3xl font-bold uppercase text-[#181818]">
                    {team.slice(0, 2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
