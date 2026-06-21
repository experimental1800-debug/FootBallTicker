import { BadgeCheck, CheckCircle2, ShieldCheck } from "lucide-react";
import { getHostCityHref, hostCities, type HostCityVariant } from "../data/hostCities";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "SeatGeek is the trusted ticket of over 30 international clubs",
    tone: "text-amber-500",
  },
  {
    icon: ShieldCheck,
    title: "Every ticket protected",
    description: "If something comes up with your event, we've got you covered.",
    tone: "text-emerald-500",
  },
  {
    icon: CheckCircle2,
    title: "Over 110 Million tickets sold",
    description: "You're in safe hands. Millions of happy fans since 2009.",
    tone: "text-amber-500",
  },
];

export function HostCityAvatar({
  code,
  fill,
  stroke,
  variant,
}: {
  code: string;
  fill: string;
  stroke: string;
  variant: HostCityVariant;
}) {
  const compactCode = code.length <= 3 ? code : code === "NYNJ" ? "NY/NJ" : code;
  const glowId = `cityGlow-${code}`;
  const clip0Id = `cityClip0-${code}`;
  const clip1Id = `cityClip1-${code}`;
  const mask0Id = `cityMask0-${code}`;
  const mask1Id = `cityMask1-${code}`;
  const mask2Id = `cityMask2-${code}`;
  const mask3Id = `cityMask3-${code}`;
  const mask4Id = `cityMask4-${code}`;
  const filterId = `cityFilter-${code}`;
  const fontFamily = "Arial Black, RoobertVF, RoobertVF Fallback, Helvetica Neue, Arial, Helvetica, sans-serif";
  const fontSize = compactCode.length >= 5 ? "7.6" : compactCode.length === 4 ? "8.6" : compactCode.length === 3 ? "10.7" : "12.1";
  const letterSpacing = compactCode.length >= 5 ? "0.04" : compactCode.length === 4 ? "0.12" : "0.22";
  const fontWeight = "900";
  const roundedBadgeRadius = 10;

  if (variant === "star") {
    return (
      <div className="h-10 w-10 shrink-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath={`url(#${clip0Id})`}>
            <g clipPath={`url(#${clip1Id})`}>
              <rect width="93.3333" height="80" transform="translate(-26.667 -20)" fill={fill} />
              <mask id={mask0Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-27" y="-20" width="94" height="80">
                <path d="M66.6663 -20H-26.667V60H66.6663V-20Z" fill="white" />
              </mask>
              <g mask={`url(#${mask0Id})`}>
                <mask id={mask1Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="20" y="-143" width="94" height="161">
                  <path d="M113.513 -142.089H20.1792V17.9111H113.513V-142.089Z" fill="white" />
                </mask>
                <g mask={`url(#${mask1Id})`}>
                  <path d="M-26.4878 1.90562L6.94607 1.67543L20.1789 -38.5566L33.4117 1.67543L66.8455 1.90562" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M-1.43339 26.9659L-1.23179 27.115L-13.9214 67.5244L20.1789 42.8395L54.2791 67.5244L41.5895 27.115L66.8455 8.30176L91.8383 26.9206" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1791 38.1987L-6.96597 57.8496L3.13644 25.6817L-23.7417 5.66096L9.6455 5.43078L20.1791 -26.5938L30.7127 5.43078L64.0999 5.66096L37.2218 25.6817L47.3242 57.8496L20.1791 38.1987Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1789 33.5568L-0.0109922 48.1719L7.50234 24.2473L-12.4878 9.35678L12.3445 9.18508L20.1789 -14.6338L28.0133 9.18508L52.8455 9.35678L32.8554 24.2473L40.3669 48.1719L20.1789 33.5568Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1786 -2.67188L25.3138 12.9394L41.5893 13.0527L28.4872 22.813L33.4114 38.4942L20.1786 28.9149L6.94585 38.4942L11.8701 22.813L-1.23389 13.0527L15.0434 12.9394L20.1786 -2.67188Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
                <mask id={mask2Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="20" y="17" width="94" height="161">
                  <path d="M113.513 17.9111H20.1792V177.911H113.513V17.9111Z" fill="white" />
                </mask>
                <g mask={`url(#${mask2Id})`}>
                  <path d="M20.1792 81.9056L53.6131 81.6754L66.8459 41.4434L80.0787 81.6754L113.513 81.9056" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M-73.1543 81.9056L-39.7204 81.6754L-26.4876 41.4434L-13.2548 81.6754L20.179 81.9056" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M-1.43339 26.9659L-1.23179 27.115L-13.9214 67.5244L20.1789 42.8395L54.2791 67.5244L41.5895 27.115L66.8455 8.30176L91.8383 26.9206" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1791 38.1977L-6.96597 57.8487L3.13644 25.6807L-23.7417 5.65999L9.6455 5.4298L20.1791 -26.5947L30.7127 5.4298L64.0999 5.65999L37.2218 25.6807L47.3242 57.8487L20.1791 38.1977Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1789 33.5568L-0.0109922 48.1719L7.50234 24.2473L-12.4878 9.35678L12.3445 9.18508L20.1789 -14.6338L28.0133 9.18508L52.8455 9.35678L32.8554 24.2473L40.3669 48.1719L20.1789 33.5568Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1791 -2.67188L25.3143 12.9394L41.5898 13.0527L28.4877 22.813L33.4119 38.4942L20.1791 28.9149L6.94634 38.4942L11.8706 22.813L-1.2334 13.0527L15.0439 12.9394L20.1791 -2.67188Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
                <mask id={mask3Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-74" y="-143" width="95" height="161">
                  <path d="M20.179 -142.089H-73.1543V17.9111H20.179V-142.089Z" fill="white" />
                </mask>
                <g mask={`url(#${mask3Id})`}>
                  <path d="M-26.4873 1.90562L6.94656 1.67543L20.1794 -38.5566L33.4122 1.67543L66.846 1.90562" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M-1.4329 26.9659L-1.2313 27.115L-13.9209 67.5244L20.1794 42.8395L54.2796 67.5244L41.59 27.115L66.846 8.30176L91.8388 26.9206" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1796 38.1987L-6.96548 57.8496L3.13692 25.6817L-23.7412 5.66096L9.64599 5.43078L20.1796 -26.5938L30.7132 5.43078L64.1004 5.66096L37.2223 25.6817L47.3247 57.8496L20.1796 38.1987Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1794 33.5568L-0.0105039 48.1719L7.50283 24.2473L-12.4873 9.35678L12.345 9.18508L20.1794 -14.6338L28.0138 9.18508L52.846 9.35678L32.8559 24.2473L40.3674 48.1719L20.1794 33.5568Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1791 -2.67188L25.3143 12.9394L41.5898 13.0527L28.4877 22.813L33.4119 38.4942L20.1791 28.9149L6.94634 38.4942L11.8706 22.813L-1.2334 13.0527L15.0439 12.9394L20.1791 -2.67188Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
                <mask id={mask4Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-74" y="17" width="95" height="161">
                  <path d="M20.179 17.9111H-73.1543V177.911H20.179V17.9111Z" fill="white" />
                </mask>
                <g mask={`url(#${mask4Id})`}>
                  <path d="M20.1792 81.9056L53.6131 81.6754L66.8459 41.4434L80.0787 81.6754L113.513 81.9056" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M-73.1543 81.9056L-39.7204 81.6754L-26.4876 41.4434L-13.2548 81.6754L20.179 81.9056" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M-1.43339 26.9659L-1.23179 27.115L-13.9214 67.5244L20.1789 42.8395L54.2791 67.5244L41.5895 27.115L66.8455 8.30176L91.8383 26.9206" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1791 38.1977L-6.96597 57.8487L3.13644 25.6807L-23.7417 5.65999L9.6455 5.4298L20.1791 -26.5947L30.7127 5.4298L64.0999 5.65999L37.2218 25.6807L47.3242 57.8487L20.1791 38.1977Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1789 33.5568L-0.0109922 48.1719L7.50234 24.2473L-12.4878 9.35678L12.3445 9.18508L20.1789 -14.6338L28.0133 9.18508L52.8455 9.35678L32.8554 24.2473L40.3669 48.1719L20.1789 33.5568Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M20.1791 -2.67188L25.3143 12.9394L41.5898 13.0527L28.4877 22.813L33.4119 38.4942L20.1791 28.9149L6.94634 38.4942L11.8706 22.813L-1.2334 13.0527L15.0439 12.9394L20.1791 -2.67188Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
              </g>
            </g>
            <circle opacity="0.8" cx="19.7909" cy="19.9999" r="28.2264" fill={`url(#${glowId})`} />
            <g filter={`url(#${filterId})`}>
              <text
                x="20"
                y="23.6"
                textAnchor="middle"
                fill="white"
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                letterSpacing={letterSpacing}
                style={{ fontFeatureSettings: '"ss01" 1' }}
              >
                {compactCode}
              </text>
            </g>
          </g>
          <defs>
            <filter id={filterId} x="3.63623" y="9.19727" width="33.2812" height="25.8027" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.7909 19.9999) rotate(90) scale(28.2264)">
              <stop stopColor={fill} stopOpacity="0.4" />
              <stop offset="0.8" stopColor={fill} />
            </radialGradient>
            <clipPath id={clip0Id}>
              <rect width="40" height="40" rx={roundedBadgeRadius} ry={roundedBadgeRadius} fill="white" />
            </clipPath>
            <clipPath id={clip1Id}>
              <rect width="93.3333" height="80" fill="white" transform="translate(-26.667 -20)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === "sun") {
    return (
      <div className="h-10 w-10 shrink-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath={`url(#${clip0Id})`}>
            <g clipPath={`url(#${clip1Id})`}>
              <rect width="93.3333" height="80" transform="translate(-26.667 -20)" fill={fill} />
              <mask id={mask0Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-27" y="-20" width="94" height="80">
                <path d="M66.6663 -20H-26.667V60H66.6663V-20Z" fill="white" />
              </mask>
              <g mask={`url(#${mask0Id})`}>
                <mask id={mask1Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="20" y="-139" width="94" height="161">
                  <path d="M113.513 -138.881H20.1792V21.1191H113.513V-138.881Z" fill="white" />
                </mask>
                <g mask={`url(#${mask1Id})`}>
                  <path d="M20.1795 31.1149C26.2836 31.1149 31.232 26.1131 31.232 19.9432C31.232 13.7732 26.2836 8.77148 20.1795 8.77148C14.0753 8.77148 9.12695 13.7732 9.12695 19.9432C9.12695 26.1131 14.0753 31.1149 20.1795 31.1149Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M0.474898 44.9737L-5.0467 45.7397L-4.41577 39.0926H-20.3291L-7.86164 19.9435L-20.3291 0.796345H-4.41577L-5.0467 -5.85083L0.474898 -5.0829V-19.2188L20.1794 -7.29611L39.884 -19.2169V-5.0829L45.4056 -5.85083L44.7746 0.796345H60.688L48.2205 19.9435L60.688 39.0926H44.7746L45.4056 45.7397L39.884 45.3435V59.1058L20.1794 47.185L0.474898 59.1077V44.9737Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M4.13551 40.7284L-0.960485 41.4378L-0.385554 35.3925H-13.5381L-3.48049 19.9435L-13.5381 4.4963H-0.385554L-0.960485 -1.5471L4.13551 -0.839552V-12.6924L20.1795 -2.98484L36.2235 -12.6905V-0.839552L41.3195 -1.5471L40.7446 4.4963H53.8971L43.8395 19.9435L53.8971 35.3925H40.7446L41.3195 41.4378L36.2235 40.7284V52.5793L20.1795 42.8737L4.13551 52.5812V40.7284Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M7.79613 36.485L3.12573 37.1341L3.6428 31.6925H-6.74707L0.902531 19.9435L-6.74707 8.19632H3.6428L3.12573 2.7548L7.79613 3.40386V-6.16406L20.1796 1.32839L32.5631 -6.16406V3.40386L37.2335 2.7548L36.7145 8.19632H47.1063L39.4567 19.9435L47.1063 31.6925H36.7145L37.2335 37.1341L32.5631 36.485V46.0529L20.1796 38.5605L7.79613 46.0529V36.485Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M40.3131 27.9925H32.6859L33.1451 32.8302L28.9022 32.2416V39.5265L20.1793 34.2491L11.4563 39.5265V32.2416L7.21341 32.8302L7.67261 27.9925H0.0454102L5.28514 19.9434L0.0454102 11.8963H7.67261L7.21341 7.05853L11.4563 7.64721V0.362305L20.1793 5.63966L28.9022 0.362305V7.64721L33.1451 7.05853L32.6859 11.8963H40.3131L35.0734 19.9434L40.3131 27.9925Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
                <mask id={mask2Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="20" y="21" width="94" height="161">
                  <path d="M113.513 21.1191H20.1792V181.119H113.513V21.1191Z" fill="white" />
                </mask>
                <g mask={`url(#${mask2Id})`}>
                  <path d="M20.1795 31.1149C26.2836 31.1149 31.232 26.1131 31.232 19.9432C31.232 13.7732 26.2836 8.77148 20.1795 8.77148C14.0753 8.77148 9.12695 13.7732 9.12695 19.9432C9.12695 26.1131 14.0753 31.1149 20.1795 31.1149Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M0.474898 44.9737L-5.0467 45.7397L-4.41577 39.0926H-20.3291L-7.86164 19.9435L-20.3291 0.796345H-4.41577L-5.0467 -5.85083L0.474898 -5.0829V-19.2188L20.1794 -7.29611L39.884 -19.2169V-5.0829L45.4056 -5.85083L44.7746 0.796345H60.688L48.2205 19.9435L60.688 39.0926H44.7746L45.4056 45.7397L39.884 45.3435V59.1058L20.1794 47.185L0.474898 59.1077V44.9737Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M4.13551 40.7284L-0.960485 41.4378L-0.385554 35.3925H-13.5381L-3.48049 19.9435L-13.5381 4.4963H-0.385554L-0.960485 -1.5471L4.13551 -0.839552V-12.6924L20.1795 -2.98484L36.2235 -12.6905V-0.839552L41.3195 -1.5471L40.7446 4.4963H53.8971L43.8395 19.9435L53.8971 35.3925H40.7446L41.3195 41.4378L36.2235 40.7284V52.5793L20.1795 42.8737L4.13551 52.5812V40.7284Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M7.79613 36.485L3.12573 37.1341L3.6428 31.6925H-6.74707L0.902531 19.9435L-6.74707 8.19632H3.6428L3.12573 2.7548L7.79613 3.40386V-6.16406L20.1796 1.32839L32.5631 -6.16406V3.40386L37.2335 2.7548L36.7145 8.19632H47.1063L39.4567 19.9435L47.1063 31.6925H36.7145L37.2335 37.1341L32.5631 36.485V46.0529L20.1796 38.5605L7.79613 46.0529V36.485Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M40.3131 27.9925H32.6859L33.1451 32.8302L28.9022 32.2416V39.5265L20.1793 34.2491L11.4563 39.5265V32.2416L7.21341 32.8302L7.67261 27.9925H0.0454102L5.28514 19.9434L0.0454102 11.8963H7.67261L7.21341 7.05853L11.4563 7.64721V0.362305L20.1793 5.63966L28.9022 0.362305V7.64721L33.1451 7.05853L32.6859 11.8963H40.3131L35.0734 19.9434L40.3131 27.9925Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
                <mask id={mask3Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-74" y="-139" width="95" height="161">
                  <path d="M20.179 -138.881H-73.1543V21.1191H20.179V-138.881Z" fill="white" />
                </mask>
                <g mask={`url(#${mask3Id})`}>
                  <path d="M20.179 31.1149C26.2831 31.1149 31.2315 26.1131 31.2315 19.9432C31.2315 13.7732 26.2831 8.77148 20.179 8.77148C14.0749 8.77148 9.12646 13.7732 9.12646 19.9432C9.12646 26.1131 14.0749 31.1149 20.179 31.1149Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M0.47441 44.9737L-5.04719 45.7397L-4.41626 39.0926H-20.3296L-7.86212 19.9435L-20.3296 0.796345H-4.41626L-5.04719 -5.85083L0.47441 -5.0829V-19.2188L20.1789 -7.29611L39.8835 -19.2169V-5.0829L45.4051 -5.85083L44.7741 0.796345H60.6875L48.22 19.9435L60.6875 39.0926H44.7741L45.4051 45.7397L39.8835 45.3435V59.1058L20.1789 47.185L0.47441 59.1077V44.9737Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M4.13502 40.7284L-0.960973 41.4378L-0.386042 35.3925H-13.5386L-3.48097 19.9435L-13.5386 4.4963H-0.386042L-0.960973 -1.5471L4.13502 -0.839552V-12.6924L20.179 -2.98484L36.223 -12.6905V-0.839552L41.319 -1.5471L40.7441 4.4963H53.8966L43.839 19.9435L53.8966 35.3925H40.7441L41.319 41.4378L36.223 40.7284V52.5793L20.179 42.8737L4.13502 52.5812V40.7284Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M7.79564 36.485L3.12524 37.1341L3.64231 31.6925H-6.74756L0.902043 19.9435L-6.74756 8.19632H3.64231L3.12524 2.7548L7.79564 3.40386V-6.16406L20.1791 1.32839L32.5626 -6.16406V3.40386L37.233 2.7548L36.714 8.19632H47.1058L39.4562 19.9435L47.1058 31.6925H36.714L37.233 37.1341L32.5626 36.485V46.0529L20.1791 38.5605L7.79564 46.0529V36.485Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M40.3127 27.9925H32.6855L33.1447 32.8302L28.9017 32.2416V39.5265L20.1788 34.2491L11.4559 39.5265V32.2416L7.21292 32.8302L7.67212 27.9925H0.0449219L5.28465 19.9434L0.0449219 11.8963H7.67212L7.21292 7.05853L11.4559 7.64721V0.362305L20.1788 5.63966L28.9017 0.362305V7.64721L33.1447 7.05853L32.6855 11.8963H40.3127L35.0729 19.9434L40.3127 27.9925Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
                <mask id={mask4Id} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="-74" y="21" width="95" height="161">
                  <path d="M20.179 21.1191H-73.1543V181.119H20.179V21.1191Z" fill="white" />
                </mask>
                <g mask={`url(#${mask4Id})`}>
                  <path d="M20.179 31.1149C26.2831 31.1149 31.2315 26.1131 31.2315 19.9432C31.2315 13.7732 26.2831 8.77148 20.179 8.77148C14.0749 8.77148 9.12646 13.7732 9.12646 19.9432C9.12646 26.1131 14.0749 31.1149 20.179 31.1149Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M0.47441 44.9737L-5.04719 45.7397L-4.41626 39.0926H-20.3296L-7.86212 19.9435L-20.3296 0.796345H-4.41626L-5.04719 -5.85083L0.47441 -5.0829V-19.2188L20.1789 -7.29611L39.8835 -19.2169V-5.0829L45.4051 -5.85083L44.7741 0.796345H60.6875L48.22 19.9435L60.6875 39.0926H44.7741L45.4051 45.7397L39.8835 45.3435V59.1058L20.1789 47.185L0.47441 59.1077V44.9737Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M4.13502 40.7284L-0.960973 41.4378L-0.386042 35.3925H-13.5386L-3.48097 19.9435L-13.5386 4.4963H-0.386042L-0.960973 -1.5471L4.13502 -0.839552V-12.6924L20.179 -2.98484L36.223 -12.6905V-0.839552L41.319 -1.5471L40.7441 4.4963H53.8966L43.839 19.9435L53.8966 35.3925H40.7441L41.319 41.4378L36.223 40.7284V52.5793L20.179 42.8737L4.13502 52.5812V40.7284Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M7.79564 36.485L3.12524 37.1341L3.64231 31.6925H-6.74756L0.902043 19.9435L-6.74756 8.19632H3.64231L3.12524 2.7548L7.79564 3.40386V-6.16406L20.1791 1.32839L32.5626 -6.16406V3.40386L37.233 2.7548L36.714 8.19632H47.1058L39.4562 19.9435L47.1058 31.6925H36.714L37.233 37.1341L32.5626 36.485V46.0529L20.1791 38.5605L7.79564 46.0529V36.485Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                  <path d="M40.3127 27.9925H32.6855L33.1447 32.8302L28.9017 32.2416V39.5265L20.1788 34.2491L11.4559 39.5265V32.2416L7.21292 32.8302L7.67212 27.9925H0.0449219L5.28465 19.9434L0.0449219 11.8963H7.67212L7.21292 7.05853L11.4559 7.64721V0.362305L20.1788 5.63966L28.9017 0.362305V7.64721L33.1447 7.05853L32.6855 11.8963H40.3127L35.0729 19.9434L40.3127 27.9925Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
                </g>
              </g>
            </g>
            <circle opacity="0.8" cx="19.7909" cy="19.9999" r="28.2264" fill={`url(#${glowId})`} />
            <g filter={`url(#${filterId})`}>
              <text
                x="20"
                y="23.6"
                textAnchor="middle"
                fill="white"
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                letterSpacing={letterSpacing}
                style={{ fontFeatureSettings: '"ss01" 1' }}
              >
                {compactCode}
              </text>
            </g>
          </g>
          <defs>
            <filter id={filterId} x="-1.81483" y="8.664" width="44.8604" height="28.5616" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="0.615385" dy="1.84615" />
              <feGaussianBlur stdDeviation="3.07692" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.7909 19.9999) rotate(90) scale(28.2264)">
              <stop stopColor={fill} stopOpacity="0" />
              <stop offset="0.9" stopColor={fill} />
            </radialGradient>
            <clipPath id={clip0Id}>
              <rect width="40" height="40" rx={roundedBadgeRadius} ry={roundedBadgeRadius} fill="white" />
            </clipPath>
            <clipPath id={clip1Id}>
              <rect width="93.3333" height="80" fill="white" transform="translate(-26.667 -20)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }

  if (variant === "burst") {
    return (
      <div className="h-10 w-10 shrink-0">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath={`url(#${clip0Id})`}>
            <g clipPath={`url(#${clip1Id})`}>
              <rect width="93.3333" height="80" transform="translate(-26.667 -22)" fill={fill} />
              <path d="M-26.1743 15.2223L-15.4223 10.3015L-21.6887 -6.41735L-3.19938 -3.39282L-2.82418 -4.63433L-4.72258 -20.9117L11.1852 -14.2645L20.5222 -28.2607L29.8611 -14.2645L45.7689 -20.9117L43.8686 -4.63433L44.2438 -3.39282L62.735 -6.41735L56.4686 10.3015L67.1627 15.1959" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M67.187 19.8503L51.2531 31.1521L65.1169 48.8993L37.2009 46.7559L37.3259 54.5635H3.71846L3.84539 46.7559L-24.0725 48.8993L-10.2069 31.1521L-26.1538 19.8408" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M7.51348 50.7902L7.64415 42.6807L-15.8665 44.4864L-4.82892 30.3562L-22.6201 17.7373L-10.6884 12.277L-15.9095 -1.64945L-0.578518 0.858094L0.976416 -4.29096L-0.270516 -14.9664L12.5759 -9.6004L20.5223 -21.5117L28.4706 -9.6004L41.317 -14.9664L40.07 -4.29096L41.6231 0.858094L56.9559 -1.64945L51.7348 12.277L63.6647 17.7373L45.8754 30.3562L56.913 44.4864L33.4023 42.6807L33.5311 50.7902H7.51348Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M11.3082 47.0165L11.4426 38.6052L-7.66092 40.0713L0.548685 29.5599L-15.1201 18.4467L-5.95665 14.2524L-10.1305 3.11844L2.04202 5.109L4.77482 -3.94571L4.18122 -9.02307L13.9663 -4.93628L20.522 -14.7627L27.0796 -4.93628L36.8628 -9.02307L36.2711 -3.94571L39.0039 5.109L51.1746 3.11844L47.0007 14.2524L56.1642 18.4467L40.4972 29.5599L48.7068 40.0713L29.6034 38.6052L29.7378 47.0165H11.3082Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M15.1014 43.2439L15.2414 34.5288L0.543306 35.6571L5.92677 28.7665L-7.61963 19.1571L-1.22256 16.2307L-4.35109 7.8873L4.66117 9.36089L6.79851 2.27787L9.61717 5.34391L8.6353 -3.07873L15.3572 -0.269299L20.5222 -8.0127L25.6892 -0.269299L32.411 -3.07873L31.4273 5.34391L34.246 2.27787L36.3833 9.36089L45.3956 7.8873L42.2689 16.2307L48.666 19.1571L35.1177 28.7665L40.5012 35.6571L25.803 34.5288L25.943 43.2439H15.1014Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M22.1478 39.4693L22.0041 30.4523L32.2969 31.2429L29.7396 27.9693L41.1654 19.8655L37.5348 18.2052L39.6161 12.6542L33.7641 13.6108L32.5676 9.64479L26.3814 16.3712L27.9569 2.86365L24.2982 4.39384L20.522 -1.26465L16.7476 4.39384L13.087 2.86365L14.6644 16.3712L8.47824 9.64479L7.2817 13.6108L1.42784 12.6542L3.50917 18.2052L-0.119629 19.8655L11.3044 27.9693L8.7489 31.2429L19.0417 30.4523L18.8961 39.4693H22.1478Z" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
              <path d="M67.187 19.8503L51.2531 31.1521L65.1169 48.8993L37.2009 46.7559L37.3259 54.5635H3.71846L3.84539 46.7559L-24.0725 48.8993L-10.2069 31.1521L-26.1538 19.8408" stroke={stroke} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
            </g>
            <circle opacity="0.8" cx="19.7909" cy="19.9999" r="28.2264" fill={`url(#${glowId})`} />
            <g filter={`url(#${filterId})`}>
              <text
                x="20"
                y="23.6"
                textAnchor="middle"
                fill="white"
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontFamily={fontFamily}
                letterSpacing={letterSpacing}
                style={{ fontFeatureSettings: '"ss01" 1' }}
              >
                {compactCode}
              </text>
            </g>
          </g>
          <defs>
            <filter id={filterId} x="1.17687" y="10.9716" width="39.9796" height="22.5616" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="0.615385" dy="1.84615" />
              <feGaussianBlur stdDeviation="3.07692" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
            <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(19.7909 19.9999) rotate(90) scale(28.2264)">
              <stop stopColor={fill} stopOpacity="0" />
              <stop offset="0.9" stopColor={fill} />
            </radialGradient>
            <clipPath id={clip0Id}>
              <rect width="40" height="40" rx={roundedBadgeRadius} ry={roundedBadgeRadius} fill="white" />
            </clipPath>
            <clipPath id={clip1Id}>
              <rect width="93.3333" height="80" fill="white" transform="translate(-26.667 -22)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }

  const pattern = (() => {
    return (
      <>
        <path
          d="M20 4L23.8 12.2L32.8 11.2L26.1 17.3L30.4 25.5L22.1 21.3L13.9 25.5L18.1 17.3L11.4 11.2L20.4 12.2L20 4Z"
          stroke={stroke}
          strokeWidth="1.9"
          strokeLinejoin="round"
          opacity="0.24"
        />
        <path
          d="M20 -6L23.8 2.2L32.8 1.2L26.1 7.3L30.4 15.5L22.1 11.3L13.9 15.5L18.1 7.3L11.4 1.2L20.4 2.2L20 -6Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.16"
        />
        <path
          d="M48 12L51.8 20.2L60.8 19.2L54.1 25.3L58.4 33.5L50.1 29.3L41.9 33.5L46.1 25.3L39.4 19.2L48.4 20.2L48 12Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          opacity="0.16"
        />
      </>
    );
  })();

  return (
    <div className="h-10 w-10 shrink-0">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill={fill} />
        <rect x="2" y="2" width="36" height="36" rx="8.5" fill="white" fillOpacity="0.04" />
        {pattern}
        <circle cx="20" cy="20" r="14" fill={`url(#${glowId})`} fillOpacity="0.65" />
        <text
          x="20"
          y="23.6"
          textAnchor="middle"
          fill="white"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          letterSpacing={letterSpacing}
          style={{ fontFeatureSettings: '"ss01" 1' }}
        >
          {compactCode}
        </text>
        <defs>
          <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(14)">
            <stop stopColor="white" stopOpacity="0.28" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export function HostCitiesList({
  variant = "list",
  onNavigate,
}: {
  variant?: "list" | "grid";
  onNavigate?: (href: string) => void;
}) {
  const isGrid = variant === "grid";

  return (
    <section className="rounded-[1.5rem] bg-[var(--theme-background-color-secondary)] px-1">
      <h3 className="text-[1.05rem] font-bold text-[var(--theme-text-color-primary)]">
        World Cup host cities
      </h3>
      <ul
        className={
          isGrid
            ? "mt-5 grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mt-4 space-y-2.5"
        }
      >
        {hostCities.map((city) => (
          <li key={city.code}>
            <a
              href={getHostCityHref(city.slug)}
              onClick={(event) => {
                if (!onNavigate) return;
                event.preventDefault();
                onNavigate(getHostCityHref(city.slug));
              }}
              className={`flex items-center gap-3 text-[var(--theme-text-color-primary)] transition-colors ${
                isGrid ? "rounded-2xl px-1 py-1.5 hover:bg-white/50" : "rounded-xl px-1 py-1 hover:bg-white/60"
              }`}
            >
              <HostCityAvatar
                code={city.code}
                fill={city.fill}
                stroke={city.stroke}
                variant={city.variant}
              />
              <p
                className={`font-inherit font-[650] leading-5 text-[var(--theme-text-color-primary)] ${
                  isGrid ? "text-[1rem]" : "text-[0.95rem]"
                }`}
              >
                {city.label}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TicketTrustPanel({
  bordered = true,
}: {
  bordered?: boolean;
}) {
  return (
    <section className={bordered ? "border-t border-[var(--theme-divider-color)] pt-6" : ""}>
      <div className="space-y-5">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-start gap-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${item.tone}`} />
              <div>
                <p className="text-[0.94rem] font-semibold leading-5 text-[var(--theme-text-color-primary)]">
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-1 text-[0.82rem] leading-5 text-[var(--theme-text-color-secondary)]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function HostCitiesSidebar({
  sticky = true,
  onNavigate,
}: {
  sticky?: boolean;
  onNavigate?: (href: string) => void;
}) {
  return (
    <aside className={sticky ? "space-y-6 lg:sticky lg:top-24" : "space-y-6"}>
      <HostCitiesList onNavigate={onNavigate} />
      <TicketTrustPanel />
    </aside>
  );
}
