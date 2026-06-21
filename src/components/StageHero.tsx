import { Heart } from "lucide-react";
import heroBackground from "../public/HeroBackgound.png";
import type { WorldCupStage } from "../data/worldCupStages";

export default function StageHero({ stage }: { stage: WorldCupStage }) {
  return (
    <section className="relative overflow-hidden bg-[#09090b] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.24),rgba(9,9,11,0.78))]" />

      <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-[5.5rem] md:px-12 md:pb-8 md:pt-10 lg:px-16 xl:px-20">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-[38rem]">
            <h1 className="text-[2.35rem] font-bold leading-tight tracking-[-0.03em] text-white md:text-[2.7rem]">
              {stage.heroTitle}
            </h1>
            <p className="mt-2 text-[1.08rem] text-white/72">{stage.title} World Cup games</p>
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

          <div className="relative shrink-0">
            <img
              src={stage.image}
              alt={stage.title}
              className="h-[114px] w-[114px] rounded-[1.4rem] object-cover shadow-2xl shadow-black/35 md:h-[132px] md:w-[132px]"
            />
            <button
              type="button"
              aria-label={`Track ${stage.title}`}
              className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#181818] shadow-md"
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
