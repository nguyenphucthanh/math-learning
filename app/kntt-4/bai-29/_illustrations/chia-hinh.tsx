import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const p = (x: number, y: number): Point => ({ x, y });

/** Hình chữ nhật PQRS, đoạn EF nối E trên PQ với F trên SR và thẳng đứng. */
export const chiaHinh = { P: p(30, 30), Q: p(250, 30), R: p(250, 120), S: p(30, 120), E: p(120, 30), F: p(120, 120) };

/** Hình chữ nhật PQRS được đoạn EF chia thành hai hình chữ nhật. */
export function ChiaHinh() {
  const { P, Q, R, S, E, F } = chiaHinh;
  return (
    <Khung maxWidth={400}>
      <svg viewBox="0 0 280 160" role="img" aria-label="Hình chữ nhật PQRS, đoạn thẳng EF chia hình thành hai hình chữ nhật PEFS và EQRF" className="block w-full">
        <polygon points={[P, Q, R, S].map((q) => `${q.x},${q.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3.5} strokeLinejoin="round" />
        <line x1={E.x} y1={E.y} x2={F.x} y2={F.y} stroke="var(--unit-ta)" strokeWidth={4} strokeLinecap="round" />
        {[
          ["P", P.x - 14, P.y - 8],
          ["Q", Q.x + 14, Q.y - 8],
          ["R", R.x + 14, R.y + 22],
          ["S", S.x - 14, S.y + 22],
          ["E", E.x, E.y - 10],
          ["F", F.x, F.y + 24],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
    </Khung>
  );
}
