const resourceLinks = [
  { label: "About", href: "https://seatgeek.com/about" },
  { label: "Press", href: "https://seatgeek.com/newsroom" },
  { label: "Jobs", href: "https://seatgeek.com/jobs" },
  { label: "Inclusion", href: "https://seatgeek.com/about#inclusion" },
  { label: "Why Trust SeatGeek", href: "https://seatgeek.com/" },
  { label: "Digital Accessibility", href: "https://seatgeek.com/accessibility" },
  { label: "SeatGeek Blog", href: "https://seatgeek.com/blog" },
  { label: "Help & Support", href: "https://support.seatgeek.com/" },
  { label: "Sell on SeatGeek", href: "https://seatgeek.com/sell" },
  { label: "SeatGeek Enterprise", href: "https://enterprise.seatgeek.com/" },
  { label: "SeatGeek Creators", href: "https://seatgeek.com/creators" },
];

const socialLinks = [
  { label: "Twitter", href: "https://x.com/seatgeek" },
  { label: "Facebook", href: "https://www.facebook.com/SeatGeek" },
  { label: "Instagram", href: "https://www.instagram.com/seatgeek/" },
  { label: "TikTok", href: "https://www.tiktok.com/@seatgeek" },
];

const developerLinks = [
  { label: "Platform", href: "https://platform.seatgeek.com/" },
  { label: "Developer Blog", href: "https://seatgeek.com/blog" },
];

function StoreBadge({
  upper,
  lower,
}: {
  upper: string;
  lower: string;
}) {
  return (
    <a
      href="#"
      className="flex h-11 min-w-[104px] items-center gap-2 rounded-[0.55rem] bg-black px-3 text-white"
    >
      <div className="h-6 w-6 rounded-full border border-white/35" />
      <div className="leading-tight">
        <div className="text-[0.5rem] uppercase tracking-wide text-white/80">{upper}</div>
        <div className="text-[0.95rem] font-semibold">{lower}</div>
      </div>
    </a>
  );
}

function SeatGeekWordmark() {
  return (
    <div className="grid leading-[0.8] text-[#1f1f1f]">
      <span className="text-[1.05rem] font-black tracking-[-0.08em]">SEAT</span>
      <span className="text-[1.05rem] font-black tracking-[-0.08em]">GEEK</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--theme-divider-color)] bg-[var(--theme-background-color-secondary)]">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-10 md:py-14 lg:px-14">
        <div className="text-[0.92rem] text-[var(--theme-text-color-secondary)]">
          <a href="https://seatgeek.com/" className="hover:text-[var(--theme-text-color-primary)]">
            SeatGeek
          </a>{" "}
          /{" "}
          <a
            href="https://seatgeek.com/sports-tickets/international-soccer"
            className="hover:text-[var(--theme-text-color-primary)]"
          >
            International Soccer
          </a>{" "}
          /{" "}
          <span className="text-[var(--theme-text-color-primary)]">World Cup Tickets</span>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)_minmax(0,0.55fr)_minmax(0,0.7fr)]">
          <div>
            <h4 className="text-[1.15rem] font-bold text-[var(--theme-text-color-primary)]">
              Download the App
            </h4>
            <div className="mt-5 flex max-w-[290px] items-center justify-between rounded-[0.55rem] border border-[var(--theme-divider-color)] bg-[var(--theme-background-color-primary)] px-4 py-3 text-[0.92rem] text-[var(--theme-text-color-tertiary)]">
              <span>Enter your phone number</span>
              <span className="text-[1rem] text-[var(--theme-text-color-primary)]">&#8594;</span>
            </div>
            <p className="mt-3 text-[0.8rem] text-[var(--theme-text-color-tertiary)]">
              Message and data rates may apply.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <StoreBadge upper="Download on the" lower="App Store" />
              <StoreBadge upper="Get it on" lower="Google Play" />
            </div>
            <a
              href="https://www.trustpilot.com/review/seatgeek.com"
              className="mt-6 inline-block text-[1rem] text-[var(--theme-text-color-primary)] hover:underline"
            >
              Trustpilot
            </a>
          </div>

          <div>
            <h4 className="text-[1.15rem] font-bold text-[var(--theme-text-color-primary)]">
              Resources
            </h4>
            <div className="mt-5 space-y-3 text-[0.98rem] text-[var(--theme-text-color-secondary)]">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block hover:text-[var(--theme-text-color-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[1.15rem] font-bold text-[var(--theme-text-color-primary)]">
              Social
            </h4>
            <div className="mt-5 space-y-3 text-[0.98rem] text-[var(--theme-text-color-secondary)]">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:text-[var(--theme-text-color-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[1.15rem] font-bold text-[var(--theme-text-color-primary)]">
              Developers
            </h4>
            <div className="mt-5 space-y-3 text-[0.98rem] text-[var(--theme-text-color-secondary)]">
              {developerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block hover:text-[var(--theme-text-color-primary)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-transparent pt-2 md:flex-row md:items-end md:justify-between">
          <div className="flex items-end gap-5">
            <SeatGeekWordmark />
            <p className="text-[0.92rem] text-[var(--theme-text-color-secondary)]">
              © {new Date().getFullYear()} SeatGeek. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.92rem] text-[var(--theme-text-color-secondary)]">
            <span className="flex items-center gap-2">
              <span className="text-[1rem]">🇺🇸</span>
              <span>USD</span>
            </span>
            <a href="#" className="hover:text-[var(--theme-text-color-primary)]">
              Your privacy choices
            </a>
            <a href="#" className="hover:text-[var(--theme-text-color-primary)]">
              Terms
            </a>
            <a href="#" className="hover:text-[var(--theme-text-color-primary)]">
              Privacy
            </a>
            <a href="#" className="hover:text-[var(--theme-text-color-primary)]">
              Site map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
