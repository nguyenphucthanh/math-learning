import { Khung } from "@/components/math/khung";
import type { Seg } from "@/lib/hinh";

/** Hai hình thoi chung một cạnh, xếp bằng 7 que tính cùng độ dài 60. Que thứ hai (BC) là cạnh chung. */
const a = { x: 40, y: 20 };
const b = { x: 100, y: 20 };
const c = { x: 70, y: 72 };
const d = { x: 10, y: 72 };
const e = { x: 130, y: 72 };
const g = { x: 160, y: 20 };

export const queTinh: Seg[] = [
  [a, b],
  [b, c],
  [c, d],
  [d, a],
  [b, g],
  [g, e],
  [e, c],
];

/** Hai hình thoi chung một cạnh xếp bằng que tính. */
export function QueThoi() {
  return (
    <Khung maxWidth={320}>
      <svg viewBox="0 0 200 92" role="img" aria-label="Hai hình thoi chung một cạnh, xếp bằng bảy que tính" className="block w-full">
        {queTinh.map((seg, index) => (
          <line key={index} x1={seg[0].x + 10} y1={seg[0].y} x2={seg[1].x + 10} y2={seg[1].y} stroke="var(--unit-ta)" strokeWidth={6} strokeLinecap="round" />
        ))}
      </svg>
    </Khung>
  );
}
