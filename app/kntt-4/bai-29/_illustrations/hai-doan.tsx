import { Khung } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";

const p = (x: number, y: number): Point => ({ x, y });

/** Hai đoạn thẳng AB và CD không chạm nhau, nhưng đang chụm lại về bên phải: kéo dài sẽ cắt nhau. */
export const haiDoan: { ab: Seg; cd: Seg } = {
  ab: [p(40, 60), p(150, 90)],
  cd: [p(40, 180), p(150, 160)],
};

/** Hai đoạn thẳng AB và CD, chưa kéo dài. */
export function HaiDoan() {
  const { ab, cd } = haiDoan;
  return (
    <Khung maxWidth={360}>
      <svg viewBox="0 0 340 230" role="img" aria-label="Hai đoạn thẳng AB và CD ở bên trái, không chạm nhau, đầu bên phải gần nhau hơn đầu bên trái" className="block w-full">
        {[ab, cd].map((seg, index) => (
          <line key={index} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
        ))}
        {[
          ["A", ab[0].x - 16, ab[0].y + 5],
          ["B", ab[1].x + 16, ab[1].y + 5],
          ["C", cd[0].x - 16, cd[0].y + 5],
          ["D", cd[1].x + 16, cd[1].y + 5],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
    </Khung>
  );
}
