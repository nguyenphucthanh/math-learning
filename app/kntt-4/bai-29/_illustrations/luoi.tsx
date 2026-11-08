import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const CELL = 28;
const PAD = 26;

/** Hình thang vuông ABCD vẽ trên lưới ô vuông (tọa độ ô, trục y hướng lên). AB và DC nằm ngang, AD thẳng đứng, BC nghiêng. */
export const luoiHinh = {
  cols: 8,
  rows: 6,
  names: ["A", "B", "C", "D"],
  points: [
    { x: 1, y: 1 },
    { x: 7, y: 1 },
    { x: 4, y: 5 },
    { x: 1, y: 5 },
  ] satisfies Point[],
};

const f = (n: number) => Math.round(n * 10) / 10;

/** Đa giác vẽ trên lưới ô vuông, có tên đỉnh. */
export function HinhLuoi({ cols, rows, points, names, label }: { cols: number; rows: number; points: Point[]; names: string[]; label: string }) {
  const toX = (x: number) => PAD + x * CELL;
  const toY = (y: number) => PAD + (rows - y) * CELL;
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  return (
    <Khung maxWidth={360}>
      <svg viewBox={`0 0 ${cols * CELL + PAD * 2} ${rows * CELL + PAD * 2}`} role="img" aria-label={label} className="block w-full">
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={toX(i)} y1={toY(0)} x2={toX(i)} y2={toY(rows)} stroke="var(--input)" strokeWidth={1.5} />
        ))}
        {Array.from({ length: rows + 1 }, (_, i) => (
          <line key={`h${i}`} x1={toX(0)} y1={toY(i)} x2={toX(cols)} y2={toY(i)} stroke="var(--input)" strokeWidth={1.5} />
        ))}
        <polygon points={points.map((p) => `${toX(p.x)},${toY(p.y)}`).join(" ")} fill="var(--unit-yen-soft)" fillOpacity={0.7} stroke="var(--ink)" strokeWidth={3.5} strokeLinejoin="round" />
        {points.map((p, index) => {
          const dx = p.x - cx;
          const dy = cy - p.y;
          const length = Math.hypot(dx, dy);
          return (
            <text key={names[index]} x={f(toX(p.x) + (dx / length) * 17)} y={f(toY(p.y) + (dy / length) * 17 + 5)} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
              {names[index]}
            </text>
          );
        })}
      </svg>
    </Khung>
  );
}

/** Hình thang vuông ABCD trên lưới, dùng cho bài luyện tập. */
export function LuoiHinhThang() {
  return <HinhLuoi {...luoiHinh} label="Hình ABCD vẽ trên lưới ô vuông: AB và DC nằm ngang, AD thẳng đứng, BC nghiêng" />;
}
