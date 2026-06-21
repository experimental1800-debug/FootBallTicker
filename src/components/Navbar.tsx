import { useState } from "react";
import { Search, Menu, X, ChevronDown } from "lucide-react";

const navLinks = ["Sports", "Music", "Shows", "Cities"];

export default function Navbar({
  onNavigateHome,
}: {
  onNavigateHome?: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white md:sticky md:border-b md:border-white/10 md:bg-[#09090b]/95 md:backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-10 lg:px-14">
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white text-black md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <a
          href="/"
          onClick={(event) => {
            if (!onNavigateHome) return;
            event.preventDefault();
            setMobileOpen(false);
            onNavigateHome();
          }}
          className="mr-2 flex-shrink-0 text-[11px] font-black leading-[0.9] tracking-tight text-white"
        >
          <span className="block">SEAT</span>
          <span className="block">GEEK</span>
        </a>

        <div className="relative hidden max-w-xs flex-1 md:block lg:max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="What do you want to see live?"
              className="w-full rounded-full border border-white/10 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/55 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a key={link} href="#" className="text-sm text-white/80 transition-colors hover:text-white">
              {link}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <button className="flex items-center gap-1 text-sm text-white/80 transition-colors hover:text-white">
            <span>USD</span>
            <ChevronDown size={13} />
          </button>
          <a href="#" className="text-sm text-white/80 transition-colors hover:text-white">
            Sell
          </a>
          <a href="#" className="text-sm text-white/80 transition-colors hover:text-white">
            Support
          </a>
          <button className="rounded-xl bg-white/12 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20">
            Sign in
          </button>
        </div>

        <div className="ml-auto flex items-center gap-3 md:hidden">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
            <Search size={20} />
          </button>
          <button className="rounded-xl bg-white px-5 py-3 text-base font-semibold text-black">
            Sign in
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#09090b] px-4 py-4 md:hidden">
          <div className="relative mb-4">
            <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="What do you want to see live?"
              className="w-full rounded-full border border-white/10 bg-white/10 py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-white/55 focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {navLinks.map((link) => (
              <a key={link} href="#" className="block text-sm font-medium text-white/85">
                {link}
              </a>
            ))}
          </div>

          <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
            <button className="flex-1 rounded-full border border-white/15 py-2 text-sm font-medium text-white">
              Support
            </button>
            <button className="flex-1 rounded-full bg-white/12 py-2 text-sm font-semibold text-white">
              Sign in
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
