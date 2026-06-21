import { useRef } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { worldCupStages } from "../data/worldCupStages";

interface WorldCupStagesProps {
  onNavigate?: (href: string) => void;
  embedded?: boolean;
}

export default function WorldCupStages({
  onNavigate,
  embedded = false,
}: WorldCupStagesProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollCards = (direction: "left" | "right") => {
    if (!listRef.current) return;

    const amount = Math.round(listRef.current.clientWidth * 0.8);
    listRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={embedded ? "" : "bg-[#f5f5f4] py-5 md:py-7"}>
      <div className={embedded ? "" : "mx-auto max-w-7xl px-4 md:px-10 lg:px-14"}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-[1.75rem] font-bold tracking-tight text-[#181818]">
            World Cup stages
          </h2>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              type="button"
              onClick={() => scrollCards("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#181818] transition-colors hover:bg-[#f5f5f4]"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              aria-label="Next"
              type="button"
              onClick={() => scrollCards("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#181818] transition-colors hover:bg-[#f5f5f4]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <ul
          ref={listRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {worldCupStages.map((stage) => (
            <li
              key={stage.title}
              className="min-w-[78%] snap-start md:min-w-[calc((100%-16px)/2.2)] lg:min-w-[calc((100%-32px)/4)]"
            >
              <div className="group relative overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-black/5">
                <a
                  href={stage.href}
                  onClick={(event) => {
                    if (!onNavigate) return;
                    event.preventDefault();
                    onNavigate(stage.href);
                  }}
                  className="block"
                >
                  <div className="aspect-[560/325] overflow-hidden">
                    <img
                      src={stage.image}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="px-4 pb-4 pt-3">
                    <p className="line-clamp-2 text-[1.02rem] font-bold text-[#181818]">
                      {stage.title}
                    </p>
                    <p className="mt-1 text-sm text-[#525252]">{stage.matches}</p>
                  </div>
                </a>

                <button
                  aria-label={`Add ${stage.title} to your tracking list`}
                  className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black/70 shadow-sm backdrop-blur transition-colors hover:text-black"
                >
                  <Heart size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
