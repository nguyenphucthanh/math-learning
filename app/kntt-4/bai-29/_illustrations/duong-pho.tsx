import { Khung } from "@/components/math/khung";
import { lineThrough, polar, type Point, type Seg } from "@/lib/hinh";

export type Street = { name: string; seg: Seg; house: Point };

const street = (name: string, center: Point, deg: number, half: number, t: number): Street => ({
  name,
  seg: lineThrough(center, deg, half),
  house: polar(center, t, deg),
});

/** Năm con đường. R là đường nhà Rô-bốt. A song song với R; B vuông góc với R; C và D cắt R mà không vuông góc. */
export const streets: Street[] = [
  street("R", { x: 170, y: 120 }, 20, 110, 40),
  street("A", { x: 170, y: 205 }, 20, 110, -30),
  street("B", { x: 60, y: 150 }, 110, 95, -20),
  street("C", { x: 290, y: 150 }, 65, 95, -10),
  street("D", { x: 150, y: 45 }, 160, 100, -30),
];

const f = (n: number) => Math.round(n * 10) / 10;

/** Bản đồ khu phố: nhà Rô-bốt (màu vàng) và bốn ngôi nhà A, B, C, D, mỗi nhà nằm bên một con đường. */
export function DuongPho() {
  return (
    <Khung maxWidth={400}>
      <svg viewBox="0 0 340 260" role="img" aria-label="Bản đồ khu phố có năm con đường thẳng. Nhà Rô-bốt màu vàng, các nhà A, B, C, D mỗi nhà nằm trên một con đường" className="block w-full">
        {streets.map((item) => (
          <line key={item.name} x1={item.seg[0].x} y1={item.seg[0].y} x2={item.seg[1].x} y2={item.seg[1].y} stroke="var(--input)" strokeWidth={14} strokeLinecap="round" />
        ))}
        {streets.map((item) => {
          const { x, y } = item.house;
          const robot = item.name === "R";
          return (
            <g key={item.name}>
              <polygon
                points={`${f(x - 12)},${f(y - 2)} ${f(x)},${f(y - 14)} ${f(x + 12)},${f(y - 2)} ${f(x + 12)},${f(y + 11)} ${f(x - 12)},${f(y + 11)}`}
                fill={robot ? "var(--sun)" : "white"}
                stroke="var(--ink)"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
              <text x={f(x)} y={f(y + 31)} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
                {robot ? "Rô-bốt" : item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
