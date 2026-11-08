import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const p = (x: number, y: number): Point => ({ x, y });

/** Bốn hình của câu nối. Tọa độ trong khung 80 x 60; tên đỉnh theo thứ tự đi vòng quanh. */
export const bonHinh: { points: Point[]; names: string[] }[] = [
  { points: [p(0, 10), p(80, 10), p(80, 60), p(0, 60)], names: ["A", "B", "C", "D"] },
  { points: [p(18, 10), p(62, 10), p(80, 60), p(0, 60)], names: ["A", "B", "C", "D"] },
  { points: [p(0, 10), p(0, 60), p(80, 60)], names: ["A", "B", "C"] },
  { points: [p(10, 10), p(75, 35), p(0, 60)], names: ["A", "B", "C"] },
];

/** Bốn hình đánh số 1, 2, 3, 4. */
export function BonHinh() {
  return (
    <Khung maxWidth={440}>
      <svg viewBox="0 0 410 110" role="img" aria-label="Bốn hình đánh số: 1 là hình chữ nhật, 2 là hình thang cân, 3 là tam giác có một góc vuông, 4 là tam giác thường" className="block w-full">
        {bonHinh.map((shape, index) => {
          const x0 = 10 + index * 100;
          return (
            <g key={index}>
              <polygon points={shape.points.map((q) => `${x0 + q.x},${q.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3.5} strokeLinejoin="round" />
              <text x={x0 + 40} y={96} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
                {index + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
