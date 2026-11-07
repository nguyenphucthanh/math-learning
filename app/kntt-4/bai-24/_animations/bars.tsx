import type { SVGProps } from "react";

/** Màu cố định cho ba đoạn a, b, c ở mọi hình của bài. */
export const barColors = {
  a: "var(--unit-m2)",
  b: "var(--unit-cm2)",
  c: "var(--unit-dm2)",
} as const;

export type BarProps = {
  x: number;
  y: number;
  width: number;
  height?: number;
  color: string;
  label: string;
} & Omit<SVGProps<SVGGElement>, "x" | "y" | "width" | "height" | "color">;

/** Một thanh màu có chữ ở giữa. Server Component, dùng được cả trong hình bài tập. */
export function Bar({ x, y, width, height = 36, color, label, ...rest }: BarProps) {
  return (
    <g {...rest}>
      <rect x={x} y={y} width={width} height={height} rx={6} fill={color} stroke="white" strokeWidth={2} />
      <text x={x + width / 2} y={y + height / 2 + 6} textAnchor="middle" fontSize={17} fontWeight={800} fill="white">
        {label}
      </text>
    </g>
  );
}
