import Link from "next/link";

const PATHS = [
  {
    href: "/pricing/#business-websites",
    label: "Websites",
    detail: "Starter + service",
    position: "left-[5%] top-[13%] sm:left-[8%]",
  },
  {
    href: "/pricing/#ecommerce-stores",
    label: "Stores",
    detail: "Shopify + ecommerce",
    position: "right-[4%] top-[20%] sm:right-[7%]",
  },
  {
    href: "/pricing/#custom-software",
    label: "Software",
    detail: "Apps + automation",
    position: "bottom-[10%] left-[24%] sm:left-[29%]",
  },
];

export function ServiceOrbit() {
  return (
    <div className="signal-panel-strong relative aspect-[1.02/0.86] min-h-[340px] overflow-hidden sm:min-h-[430px]">
      <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] tracking-[0.06em] text-cyan-300">Direct build map</p>
        <p className="text-xs text-slate-500">Every path returns to one builder</p>
      </div>

      <svg
        viewBox="0 0 600 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <path className="orbit-line" d="M298 260 C230 165 135 105 72 118" />
        <path className="orbit-line orbit-line--slow" d="M302 258 C390 165 485 125 551 151" />
        <path className="orbit-line" d="M300 264 C322 340 282 401 190 429" />
        <ellipse
          className="orbit-line orbit-line--slow"
          cx="300"
          cy="260"
          rx="176"
          ry="92"
          transform="rotate(-12 300 260)"
        />
        <circle className="orbit-node" cx="300" cy="260" r="84" fill="rgba(14,165,233,0.035)" stroke="rgba(34,211,238,0.24)" />
        <circle cx="300" cy="260" r="56" fill="rgba(14,165,233,0.05)" stroke="rgba(165,243,252,0.2)" />
      </svg>

      <div className="absolute left-1/2 top-[52%] grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/35 bg-[#07111d]/95 text-center shadow-[0_14px_44px_rgba(0,0,0,0.36)] sm:h-36 sm:w-36">
        <div>
          <span className="signal-node mx-auto mb-3" aria-hidden="true" />
          <p className="text-sm font-extrabold text-white sm:text-base">Anthony</p>
          <p className="mt-1 font-mono text-[9px] leading-4 text-cyan-300 sm:text-[10px]">One builder</p>
        </div>
      </div>

      {PATHS.map((path) => (
        <Link
          key={path.href}
          href={path.href}
          className={`absolute ${path.position} min-w-[8rem] rounded-xl border border-cyan-200/20 bg-[#07111d]/92 px-3 py-2.5 transition-colors hover:border-cyan-200/65 hover:bg-[#0a1725] sm:min-w-[10rem] sm:px-4 sm:py-3`}
        >
          <span className="block text-sm font-extrabold text-white sm:text-base">{path.label}</span>
          <span className="mt-1 hidden font-mono text-[9px] leading-4 text-slate-400 sm:block">
            {path.detail}
          </span>
        </Link>
      ))}

      <p className="absolute bottom-4 right-5 max-w-36 text-right text-xs leading-5 text-slate-500">
        Strategy, design, code, and care stay connected.
      </p>
    </div>
  );
}
