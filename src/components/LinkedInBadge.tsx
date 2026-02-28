"use client";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/anthony-barbaro-a3b542296";

export function LinkedInBadge() {
  return (
    <div
      role="link"
      tabIndex={0}
      aria-label="View LinkedIn profile"
      onClick={() => window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer");
        }
      }}
      className="
        group relative cursor-pointer
        rounded-2xl border border-white/10
        bg-zinc-950 shadow-2xl
        transition
        hover:-translate-y-1 hover:shadow-sky-500/20
        focus:outline-none focus:ring-2 focus:ring-sky-400
      "
    >
      {/* Header */}
      <div className="relative flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-gradient-to-r from-sky-600/20 to-black">
        <span className="h-2 w-2 rounded-full bg-sky-400" />
        <span className="text-xs font-medium text-white/80">
          View LinkedIn profile
        </span>
        <span className="ml-auto text-xs text-white/50 group-hover:text-white">
          →
        </span>
      </div>

      {/* Badge */}
      <div className="relative p-4 flex justify-center pointer-events-none">
        <div
          className="badge-base LI-profile-badge"
          data-locale="en_US"
          data-size="large"
          data-theme="dark"
          data-type="VERTICAL"
          data-vanity="anthony-barbaro-a3b542296"
          data-version="v1"
        />
      </div>
    </div>
  );
}
