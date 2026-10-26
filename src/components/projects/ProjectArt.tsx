import type { ReactNode } from "react";

/**
 * Small authored illustrations, one per project. They draw in the tile's ink
 * colour (currentColor) and animate only on the compositor.
 */

const frame = "h-full w-full";

function Svg({ children, viewBox = "0 0 400 240", bleed = false }: { children: ReactNode; viewBox?: string; bleed?: boolean }) {
  return (
    <svg
      viewBox={viewBox}
      className={frame}
      preserveAspectRatio={bleed ? "xMidYMid slice" : "xMidYMid meet"}
      fill="none"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Marketplace on a map: roads, a search radius, pins that answer. */
function Skillance() {
  const pins: [number, number, number][] = [
    [128, 92, 0],
    [236, 70, 0.6],
    [284, 150, 1.2],
    [170, 168, 1.8],
    [334, 84, 2.4],
  ];
  return (
    <Svg bleed>
      <g stroke="currentColor" strokeOpacity="0.14" strokeWidth="1">
        {[40, 80, 120, 160, 200].map((y) => (
          <path key={y} d={`M0 ${y}H400`} />
        ))}
        {[50, 110, 170, 230, 290, 350].map((x) => (
          <path key={x} d={`M${x} 0V240`} />
        ))}
      </g>
      <g stroke="currentColor" strokeOpacity="0.32" strokeWidth="2.5" strokeLinecap="round">
        <path d="M-10 190C80 170 120 110 210 120S330 60 410 40" />
        <path d="M60 250C100 190 190 190 230 140S300 40 330 -10" />
      </g>
      <circle
        cx="206"
        cy="120"
        r="86"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        data-loop
        style={{ animation: "dash 3s linear infinite" }}
      />
      <circle cx="206" cy="120" r="86" fill="currentColor" fillOpacity="0.06" />
      {pins.map(([x, y, d]) => (
        <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
          <circle
            r="16"
            fill="currentColor"
            fillOpacity="0.35"
            data-loop
            style={{
              transformOrigin: "center",
              transformBox: "fill-box",
              animation: `pulse-ring 2.8s ${d}s ease-out infinite`,
            }}
          />
          <circle r="6" fill="currentColor" />
          <circle r="2.4" fill="var(--surface)" />
        </g>
      ))}
      <circle cx="206" cy="120" r="9" fill="currentColor" />
      <circle cx="206" cy="120" r="3.5" fill="var(--surface)" />
    </Svg>
  );
}

/** A customer table with one selected row. */
function Crm() {
  const rows = [34, 76, 118, 160];
  return (
    <Svg>
      <rect x="40" y="22" width="320" height="196" rx="16" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.25" />
      {rows.map((y, i) => (
        <g key={y}>
          {i === 1 && <rect x="48" y={y - 6} width="304" height="38" rx="10" fill="currentColor" fillOpacity="0.16" />}
          <circle cx="72" cy={y + 13} r="10" fill="currentColor" fillOpacity={i === 1 ? 0.9 : 0.35} />
          <rect x="94" y={y + 6} width={96 - i * 8} height="7" rx="3.5" fill="currentColor" fillOpacity="0.7" />
          <rect x="94" y={y + 18} width="58" height="5" rx="2.5" fill="currentColor" fillOpacity="0.28" />
          <rect x="232" y={y + 10} width="52" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
          <circle
            cx="326"
            cy={y + 13}
            r="5"
            fill="currentColor"
            data-loop
            style={i === 1 ? { animation: "blink 2s ease-in-out infinite" } : { opacity: 0.4 }}
          />
        </g>
      ))}
    </Svg>
  );
}

/** A route with a vehicle on it and a driver tag changing hands. */
function Tagging() {
  const d = "M30 180C90 180 100 90 170 100S250 190 320 120S370 60 380 56";
  return (
    <Svg>
      <path d={d} stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 8" />
      <path d={d} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" pathLength="1" strokeDasharray="0.62 1" strokeOpacity="0.8" />
      <g
        data-loop
        style={{
          offsetPath: `path("${d}")`,
          animation: "route 6s cubic-bezier(.45,0,.2,1) infinite",
        }}
      >
        <circle r="13" fill="currentColor" fillOpacity="0.25" />
        <circle r="6.5" fill="currentColor" />
      </g>
      <g transform="translate(236 28)">
        <rect width="120" height="34" rx="17" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.5" />
        <circle cx="17" cy="17" r="7" fill="currentColor" />
        <rect x="32" y="12" width="64" height="6" rx="3" fill="currentColor" fillOpacity="0.7" />
        <rect x="32" y="22" width="36" height="4" rx="2" fill="currentColor" fillOpacity="0.3" />
      </g>
    </Svg>
  );
}

/** A live alarm: ripples from a source and a stream of rows. */
function Afrisist() {
  return (
    <Svg>
      <g transform="translate(110 120)">
        {[0, 0.9, 1.8].map((d) => (
          <circle
            key={d}
            r="60"
            stroke="currentColor"
            strokeWidth="2"
            data-loop
            style={{
              transformOrigin: "center",
              transformBox: "fill-box",
              animation: `pulse-ring 2.7s ${d}s ease-out infinite`,
            }}
          />
        ))}
        <circle r="26" fill="currentColor" fillOpacity="0.18" />
        <circle r="10" fill="currentColor" />
      </g>
      <g transform="translate(206 44)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 56})`} opacity={1 - i * 0.28}>
            <rect width="170" height="44" rx="12" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.3" />
            <circle cx="22" cy="22" r="6" fill="currentColor" data-loop style={i === 0 ? { animation: "blink 1.4s ease-in-out infinite" } : undefined} />
            <rect x="40" y="13" width="84" height="7" rx="3.5" fill="currentColor" fillOpacity="0.7" />
            <rect x="40" y="26" width="52" height="5" rx="2.5" fill="currentColor" fillOpacity="0.28" />
          </g>
        ))}
      </g>
    </Svg>
  );
}

/** Webhook in, siren out. */
function Siren() {
  return (
    <Svg>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 7" strokeOpacity="0.7">
        <path d="M92 120H156" data-loop style={{ animation: "dash 1.2s linear infinite" }} />
        <path d="M244 120H308" data-loop style={{ animation: "dash 1.2s linear infinite" }} />
      </g>
      {[
        { x: 60, label: "{ }" },
        { x: 200, label: "SQL" },
      ].map((n) => (
        <g key={n.x} transform={`translate(${n.x} 120)`}>
          <rect x="-32" y="-32" width="64" height="64" rx="18" fill="var(--surface)" stroke="currentColor" strokeOpacity="0.5" />
          <text textAnchor="middle" y="6" fontSize="17" fontWeight="600" fill="currentColor" style={{ letterSpacing: "-0.02em" }}>
            {n.label}
          </text>
        </g>
      ))}
      <g transform="translate(340 120)">
        {[0, 1.1].map((d) => (
          <circle
            key={d}
            r="44"
            stroke="currentColor"
            strokeWidth="2"
            data-loop
            style={{
              transformOrigin: "center",
              transformBox: "fill-box",
              animation: `pulse-ring 2.2s ${d}s ease-out infinite`,
            }}
          />
        ))}
        <rect x="-32" y="-32" width="64" height="64" rx="18" fill="currentColor" fillOpacity="0.9" />
        <path d="M-12 12V-2a12 12 0 0 1 24 0V12M-16 12H16" stroke="var(--surface)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Svg>
  );
}

/** A quiz question with one chosen answer. */
function Portal() {
  return (
    <Svg>
      <rect x="64" y="30" width="272" height="14" rx="7" fill="currentColor" fillOpacity="0.75" />
      <rect x="64" y="54" width="180" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
      {[92, 130, 168].map((y, i) => (
        <g key={y}>
          <rect
            x="64"
            y={y}
            width="272"
            height="30"
            rx="15"
            fill={i === 1 ? "currentColor" : "var(--surface)"}
            fillOpacity={i === 1 ? 0.2 : 1}
            stroke="currentColor"
            strokeOpacity={i === 1 ? 0.9 : 0.3}
          />
          <circle cx="82" cy={y + 15} r="6" stroke="currentColor" strokeOpacity="0.7" fill={i === 1 ? "currentColor" : "none"} />
          <rect x="100" y={y + 12} width={120 + i * 14} height="6" rx="3" fill="currentColor" fillOpacity={i === 1 ? 0.8 : 0.4} />
        </g>
      ))}
      <rect x="64" y="208" width="272" height="4" rx="2" fill="currentColor" fillOpacity="0.15" />
      <rect x="64" y="208" width="170" height="4" rx="2" fill="currentColor" />
    </Svg>
  );
}

/** A maze whose solution draws itself. */
function Maze() {
  const walls =
    "M60 40H340V200H60V40M60 80H140M180 40V120M220 80H300M260 80V160M100 120H180M100 160V200M140 160H220M300 120V200M180 160V200M300 120H340";
  const path = "M60 60H160V100H80V140H160V180H240V140H280V100H320V60H340";
  return (
    <Svg>
      <path d={walls} stroke="currentColor" strokeOpacity="0.45" strokeWidth="3" strokeLinecap="square" />
      <path
        d={path}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength="1"
        strokeDasharray="1"
        data-loop
        style={{ animation: "solve 6s cubic-bezier(.6,0,.2,1) infinite" }}
      />
      <circle cx="60" cy="60" r="6" fill="currentColor" />
    </Svg>
  );
}

const ART = { skillance: Skillance, crm: Crm, tagging: Tagging, afrisist: Afrisist, siren: Siren, portal: Portal, maze: Maze };
export type ArtKey = keyof typeof ART;

export function ProjectArt({ name }: { name: ArtKey }) {
  const Art = ART[name];
  return <Art />;
}
