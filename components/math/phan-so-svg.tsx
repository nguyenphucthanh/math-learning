/** Phân số và dấu bằng vẽ trong SVG của animation. Dùng chung bài 55, 56. */
export function Ps({ x, y, top, bottom, fill = "var(--foreground)" }: { x: number; y: number; top: string; bottom: string; fill?: string }) {
  const half = Math.max(top.length, bottom.length) * 7 + 6;
  return (
    <g fontSize={22} textAnchor="middle" fill={fill}>
      <text x={x} y={y - 6}>{top}</text>
      <line x1={x - half} y1={y} x2={x + half} y2={y} stroke="var(--ink)" strokeWidth={2.5} />
      <text x={x} y={y + 24}>{bottom}</text>
    </g>
  );
}

export const Eq = ({ x, y, text = "=" }: { x: number; y: number; text?: string }) => (
  <text x={x} y={y} fontSize={26} textAnchor="middle" fill="var(--ink)">{text}</text>
);

