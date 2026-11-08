import { Khung } from "@/components/math/khung";
import { isParallel, isPerpendicular, type Point, type Seg } from "@/lib/hinh";

const p = (x: number, y: number): Point => ({ x, y });

/** Bốn chữ cái xếp bằng que tính, mỗi que là một đoạn thẳng. Tọa độ trong khung 40 x 60. */
export const letters: { name: string; sticks: Seg[] }[] = [
  { name: "Z", sticks: [[p(0, 0), p(40, 0)], [p(40, 0), p(0, 60)], [p(0, 60), p(40, 60)]] },
  { name: "L", sticks: [[p(0, 0), p(0, 60)], [p(0, 60), p(40, 60)]] },
  { name: "H", sticks: [[p(0, 0), p(0, 60)], [p(40, 0), p(40, 60)], [p(0, 30), p(40, 30)]] },
  { name: "V", sticks: [[p(0, 0), p(20, 60)], [p(40, 0), p(20, 60)]] },
];

/** Chữ cái có cặp que song song, có cặp que vuông góc không (tính từ tọa độ). */
export function letterFlags(sticks: Seg[]) {
  const pairs = sticks.flatMap((a, i) => sticks.slice(i + 1).map((b) => [a, b] as const));
  return { parallel: pairs.some(([a, b]) => isParallel(a, b)), perpendicular: pairs.some(([a, b]) => isPerpendicular(a, b)) };
}

/** Bốn chữ cái xếp bằng que tính. */
export function QueTinh() {
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 340 120" role="img" aria-label="Bốn chữ cái Z, L, H, V xếp bằng que tính" className="block w-full">
        {letters.map((letter, index) => {
          const x0 = 30 + index * 78;
          return (
            <g key={letter.name}>
              {letter.sticks.map((stick, i) => (
                <line key={i} x1={x0 + stick[0].x} y1={14 + stick[0].y} x2={x0 + stick[1].x} y2={14 + stick[1].y} stroke="var(--unit-ta)" strokeWidth={7} strokeLinecap="round" />
              ))}
              <text x={x0 + 20} y={106} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
                {letter.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
