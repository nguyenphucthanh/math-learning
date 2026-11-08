import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

export type DieuSpec = { ab: number; hc: number; hd: number; scale: number; h: Point };

/** Bản thiết kế con diều: AB nằm ngang, H là trung điểm AB, CD đi qua H vuông góc với AB (C ở trên, D ở dưới). Độ dài tính bằng cm. */
export function dieuGeometry({ ab, hc, hd, scale, h }: DieuSpec) {
  return {
    h,
    a: { x: f(h.x - (ab / 2) * scale), y: h.y },
    b: { x: f(h.x + (ab / 2) * scale), y: h.y },
    c: { x: h.x, y: f(h.y - hc * scale) },
    d: { x: h.x, y: f(h.y + hd * scale) },
  };
}

/** Số liệu của hình diều trong bài tập (đã đổi khác SGK). */
export const exerciseKite: DieuSpec = { ab: 16, hc: 5, hd: 12, scale: 10, h: { x: 170, y: 76 } };

export function Dieu({ spec = exerciseKite }: { spec?: DieuSpec }) {
  const { h, a, b, c, d } = dieuGeometry(spec);
  const point = (p: Point) => `${p.x},${p.y}`;
  return (
    <Khung maxWidth={340}>
      <svg viewBox="0 0 340 228" role="img" aria-label="Bản thiết kế con diều ACBD: AB nằm ngang, CD đi qua H, H là trung điểm của AB" className="block w-full" fontWeight={800}>
        <polygon points={[a, c, b, d].map(point).join(" ")} fill="var(--unit-ta-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeWidth={3} />
        <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="var(--ink)" strokeWidth={3} />
        <circle cx={h.x} cy={h.y} r={4} fill="var(--ink)" />
        {[
          ["A", a.x - 14, a.y + 5],
          ["B", b.x + 14, b.y + 5],
          ["C", c.x, c.y - 10],
          ["D", d.x, d.y + 20],
          ["H", h.x + 14, h.y - 8],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={16} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
    </Khung>
  );
}

