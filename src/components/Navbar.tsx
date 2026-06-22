import { useState } from "react";
import { Search, Menu, User, X } from "lucide-react";
import type { AccountProfile } from "./AuthDialog";

const navLinks = [
  { label: "Sports", href: "/", external: false },
  { label: "Music", href: "https://seatgeek.com/concert-tickets", external: true },
  { label: "Shows", href: "https://seatgeek.com/theater-tickets", external: true },
  { label: "Cities", href: "/#world-cup-cities", external: false },
];

export default function Navbar({
  onNavigate,
  onOpenAuth,
  signedInAccount,
}: {
  onNavigate?: (path: string) => void;
  onOpenAuth?: () => void;
  signedInAccount?: AccountProfile | null;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const accountInitials = signedInAccount
    ? `${signedInAccount.firstName.charAt(0)}${signedInAccount.lastName.charAt(0)}`.trim().toUpperCase() ||
      signedInAccount.email.slice(0, 2).toUpperCase()
    : "";

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string, external: boolean) => {
    setMobileOpen(false);

    if (external || !onNavigate) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  };

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
            setMobileOpen(false);
            if (!onNavigate) return;
            event.preventDefault();
            onNavigate("/");
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
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => handleNavClick(event, link.href, link.external)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          <button
            aria-label="Set your language and currency"
            title="Language and currency"
            className="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <img
              src="/us-flag.svg"
              alt="USA flag"
              className="h-[14px] w-[20px] rounded-[3px] border border-white/20 object-cover shadow-[0_1px_3px_rgba(0,0,0,0.25)]"
            />
            <span>USD</span>
          </button>
          <a href="#" className="text-sm text-white/80 transition-colors hover:text-white">
            Sell
          </a>
          <a href="#" className="text-sm text-white/80 transition-colors hover:text-white">
            Support
          </a>
          {signedInAccount ? (
            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/16"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f4] text-[0.78rem] font-black tracking-[0.08em] text-[#151515]">
                {accountInitials}
              </span>
              <span className="hidden lg:inline-flex items-center gap-2">
                <User size={14} />
                Account
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="rounded-xl bg-white/12 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              Sign in
            </button>
          )}
        </div>

        <div className="ml-auto flex items-center gap-3 md:hidden">
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
            <Search size={20} />
          </button>
          {signedInAccount ? (
            <button
              type="button"
              className="flex h-11 min-w-[50px] items-center justify-center rounded-full bg-white px-3 text-sm font-black tracking-[0.08em] text-black"
            >
              {accountInitials}
            </button>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="rounded-xl bg-white px-5 py-3 text-base font-semibold text-black"
            >
              Sign in
            </button>
          )}
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
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href, link.external)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="block text-sm font-medium text-white/85"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 flex gap-3 border-t border-white/10 pt-4">
            <button className="flex-1 rounded-full border border-white/15 py-2 text-sm font-medium text-white">
              Support
            </button>
            {signedInAccount ? (
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/12 py-2 text-sm font-semibold text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[0.7rem] font-black tracking-[0.08em] text-black">
                  {accountInitials}
                </span>
                Account
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenAuth?.();
                }}
                className="flex-1 rounded-full bg-white/12 py-2 text-sm font-semibold text-white"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
