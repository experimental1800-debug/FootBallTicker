import { Heart } from "lucide-react";
import heroBackground from "../public/HeroBackgound.png";
import type { HostCity } from "../data/hostCities";
import { HostCityAvatar } from "./HostCitiesSidebar";

export default function CityHero({ city }: { city: HostCity }) {
  return (
    <section className="relative overflow-hidden bg-[#09090b] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.24),rgba(9,9,11,0.78))]" />

      <div className="relative mx-auto max-w-7xl px-7 pb-8 pt-[5.5rem] md:px-16 md:pb-8 md:pt-10 lg:px-20 xl:px-24">
        <div className="flex flex-col items-center gap-7 text-center md:flex-row md:items-start md:justify-between md:gap-6 md:text-left">
          <div className="order-2 flex max-w-[42rem] flex-col items-center md:order-1 md:items-start">
            <h1 className="text-[2.35rem] font-bold leading-tight tracking-[-0.03em] text-white md:text-[2.7rem]">
              World Cup 2026 tickets in {city.heroName}
            </h1>
            <div className="mt-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-[0.9rem] font-semibold text-white backdrop-blur">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
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
          </div>

          <div className="order-1 relative shrink-0 md:order-2">
            <div className="relative mx-auto h-[132px] w-[220px] md:mr-9 md:mt-1 md:h-[188px] md:w-[276px]">
              {city.coverImageUrl ? (
                <div className="relative z-10 h-full w-full">
                  {city.photoImageUrl ? (
                    <div className="absolute right-[20px] top-[8px] h-[104px] w-[104px] md:right-[26px] md:top-[10px] md:h-[140px] md:w-[140px]">
                      <div className="relative h-full w-full rotate-[8deg] overflow-hidden rounded-[1.1rem] border border-white/10 bg-white shadow-[0_16px_30px_rgba(0,0,0,0.34)] md:rounded-[1.35rem] md:shadow-[0_18px_34px_rgba(0,0,0,0.36)]">
                        <img
                          src={city.photoImageUrl}
                          alt={city.photoImageAlt ?? `view of ${city.heroName}`}
                          loading="eager"
                          width={140}
                          height={140}
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.18))]" />
                      </div>
                    </div>
                  ) : null}

                  <div className="absolute left-[10px] top-[16px] z-10 h-[104px] w-[104px] md:left-[12px] md:top-[22px] md:h-[140px] md:w-[140px]">
                    <div className="h-full w-full -rotate-[7deg] overflow-hidden rounded-[1.1rem] bg-white shadow-[0_16px_30px_rgba(0,0,0,0.36)] md:rounded-[1.35rem] md:shadow-[0_18px_34px_rgba(0,0,0,0.4)]">
                      <img
                        src={city.coverImageUrl}
                        alt={city.coverImageAlt ?? `${city.heroName} word mark world cup 2026 logo`}
                        loading="eager"
                        width={140}
                        height={140}
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute left-[82px] top-1 h-[90px] w-[108px] rotate-[4deg] overflow-hidden rounded-[1rem] border border-white/10 shadow-2xl shadow-black/35 md:left-20 md:top-2 md:h-[110px] md:w-[132px] md:rounded-[1.2rem]">
                    <div
                      className="h-full w-full"
                      style={{
                        background: `linear-gradient(135deg, ${city.cardAccentFrom}, ${city.cardAccentTo})`,
                      }}
                    >
                      <div className="flex h-full items-end p-4">
                        <span className="text-sm font-semibold tracking-wide text-white/92">
                          {city.heroName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 h-[96px] w-[112px] -rotate-[5deg] rounded-[1.05rem] bg-white p-3 shadow-2xl shadow-black/35 md:h-[114px] md:w-[132px] md:rounded-[1.25rem] md:p-4">
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.05em] text-[#c18a3b]">
                      World Cup 26
                    </p>
                    <div className="mt-2 flex items-center gap-2 md:mt-3 md:gap-3">
                      <div className="scale-[1.35] origin-top-left md:scale-[1.65]">
                        <HostCityAvatar
                          code={city.code}
                          fill={city.fill}
                          stroke={city.stroke}
                          variant={city.variant}
                        />
                      </div>
                      <div className="pt-1 text-[1.4rem] font-black leading-none tracking-tight text-[#181818] md:text-[1.75rem]">
                        {city.code === "NYNJ" ? "NY/NJ" : city.code}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <button
                type="button"
                aria-label={`Track ${city.heroName}`}
                className={`absolute z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181818] shadow-md ${
                  city.coverImageUrl
                    ? "left-[84px] top-0 h-[34px] w-[34px] border border-[#DEDDDB] shadow-[0_10px_24px_rgba(0,0,0,0.2)] md:left-[112px] md:top-[2px] md:h-[36px] md:w-[36px]"
                    : "right-0 top-0"
                }`}
              >
                <Heart size={city.coverImageUrl ? 20 : 18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
