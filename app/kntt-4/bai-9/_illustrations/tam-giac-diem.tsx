import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

/** Tam giác ABC, điểm D nằm giữa B và C. */
export const tamGiacDiem: Record<"A" | "B" | "C" | "D", Point> = {
  A: { x: 110, y: 25 },
  B: { x: 40, y: 115 },
  C: { x: 270, y: 115 },
  D: { x: 150, y: 115 },
};

const offsets: Record<string, Point> = { A: { x: 0, y: -10 }, B: { x: -14, y: 6 }, C: { x: 14, y: 6 }, D: { x: 0, y: 24 } };

export function TamGiacDiem() {
  const { A, B, C, D } = tamGiacDiem;
  const line = (p: Point, q: Point, key: string) => <line key={key} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />;
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 310 150" role="img" aria-label="Tam giác ABC. Điểm D nằm giữa B và C, nối A với D" className="block w-full" fontWeight={800}>
        {line(A, B, "ab")}
        {line(A, C, "ac")}
        {line(B, C, "bc")}
        {line(A, D, "ad")}
        {Object.entries(tamGiacDiem).map(([name, p]) => (
          <g key={name}>
            <circle cx={p.x} cy={p.y} r={4} fill="var(--ink)" />
            <text x={p.x + offsets[name].x} y={p.y + offsets[name].y + 5} textAnchor="middle" fontSize={18} fill="var(--ink)">
              {name}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
