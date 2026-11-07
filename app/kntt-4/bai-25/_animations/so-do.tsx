import type { SVGProps } from "react";

/** Bài toán của SGK: 25 cái kẹo, Mi nhiều hơn Mai 5 cái. Mai 10, Mi 15. */
export const SMALL = 10;
export const DIFF = 5;
export const BIG = SMALL + DIFF;
export const TOTAL = SMALL + BIG;

const UNIT = 11;
const BASE_W = SMALL * UNIT;
const EXTRA_W = DIFF * UNIT;
const X0 = 52;
const MI_Y = 40;
const MAI_Y = 100;
const ROW_H = 36;

export const segmentColors = {
  mi: "var(--unit-cm2)",
  mai: "var(--unit-m2)",
  extra: "var(--sun)",
} as const;

type SegProps = { x: number; y: number; width: number; color: string; label?: string; ghost?: boolean; ink?: boolean } & Omit<
  SVGProps<SVGGElement>,
  "x" | "y" | "width" | "color"
>;

function Seg({ x, y, width, color, label = "", ghost = false, ink = false, ...rest }: SegProps) {
  return (
    <g {...rest}>
      <rect
        x={x}
        y={y}
        width={width}
        height={ROW_H}
        rx={6}
        fill={ghost ? "white" : color}
        stroke={ghost ? color : "white"}
        strokeWidth={ghost ? 3 : 2}
        strokeDasharray={ghost ? "6 4" : undefined}
      />
      <text
        x={x + width / 2}
        y={y + ROW_H / 2 + 6}
        textAnchor="middle"
        fontSize={17}
        fontWeight={800}
        fill={ghost ? color : ink ? "var(--ink)" : "white"}
      >
        {label}
      </text>
    </g>
  );
}

export type Extra = "solid" | "ghost" | "none";

export type SoDoProps = {
  /** Phần Mi hơn Mai: hiện đặc, gạch bỏ (nét đứt) hoặc không có. */
  miExtra: Extra;
  /** Phần thêm vào Mai (cách 2). */
  maiExtra: Extra;
  /** Bước mà phần "solid" mới xuất hiện, để GSAP làm hiệu ứng. */
  extraEnter?: number;
  miLabel: string;
  maiLabel: string;
  braceLabel: string;
  equation: string;
  step: number;
  ariaLabel: string;
};

/** Sơ đồ đoạn thẳng hai hàng dùng chung cho hai cách giải. Server Component. */
export function SoDo({ miExtra, maiExtra, extraEnter, miLabel, maiLabel, braceLabel, equation, step, ariaLabel }: SoDoProps) {
  const miWidth = BASE_W + (miExtra === "solid" ? EXTRA_W : 0);
  const maiWidth = BASE_W + (maiExtra === "solid" ? EXTRA_W : 0);
  const extraX = X0 + BASE_W;

  return (
    <svg viewBox="0 0 340 196" role="img" aria-label={ariaLabel} className="block w-full" fontWeight={800}>
      <text x={8} y={MI_Y + 24} fontSize={17} fill="var(--ink)">
        Mi
      </text>
      <text x={8} y={MAI_Y + 24} fontSize={17} fill="var(--ink)">
        Mai
      </text>

      <Seg x={X0} y={MI_Y} width={BASE_W} color={segmentColors.mi} />
      {miExtra !== "none" ? (
        <Seg
          x={extraX}
          y={MI_Y}
          width={EXTRA_W}
          color={segmentColors.extra}
          label={String(DIFF)}
          ink
          ghost={miExtra === "ghost"}
          data-enter={miExtra === "solid" ? extraEnter : undefined}
        />
      ) : null}
      <Seg x={X0} y={MAI_Y} width={BASE_W} color={segmentColors.mai} />
      {maiExtra !== "none" ? (
        <Seg
          x={extraX}
          y={MAI_Y}
          width={EXTRA_W}
          color={segmentColors.extra}
          label={String(DIFF)}
          ink
          ghost={maiExtra === "ghost"}
          data-enter={maiExtra === "solid" ? extraEnter : undefined}
        />
      ) : null}

      <text x={X0 + miWidth / 2} y={MI_Y - 10} textAnchor="middle" fontSize={15} fill="var(--foreground)">
        {miLabel}
      </text>
      <text x={X0 + maiWidth / 2} y={MAI_Y + ROW_H + 22} textAnchor="middle" fontSize={15} fill="var(--foreground)">
        {maiLabel}
      </text>

      <path
        d={`M226 ${MI_Y} Q236 ${MI_Y} 236 ${MI_Y + 10} L236 78 Q236 88 244 88 Q236 88 236 98 L236 ${MAI_Y + ROW_H - 10} Q236 ${MAI_Y + ROW_H} 226 ${MAI_Y + ROW_H}`}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={3}
        strokeLinecap="round"
      />
      <text x={250} y={93} fontSize={15} fill="var(--ink)">
        {braceLabel}
      </text>

      <text key={step} data-enter={step} x={170} y={186} textAnchor="middle" fontSize={20} fill="var(--ink)">
        {equation}
      </text>
    </svg>
  );
}
