import { NenLuoi } from "@/components/math/dau";
import { Khung } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";

const CELL = 24;
const MARGIN = 20;
const f = (n: number) => Math.round(n * 10) / 10;
const px = (p: Point): Point => ({ x: MARGIN + p.x * CELL, y: MARGIN + p.y * CELL });

/** Đường gấp khúc A-B-C-D-E-G-H-K trên giấy ô. Tọa độ tính bằng ô (trục y hướng xuống). */
export const gapKhuc = {
  cols: 13,
  rows: 6,
  names: ["A", "B", "C", "D", "E", "G", "H", "K"],
  points: [
    { x: 0, y: 1 },
    { x: 2, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 1 },
    { x: 7, y: 3 },
    { x: 9, y: 2 },
    { x: 10, y: 3 },
    { x: 12, y: 2 },
  ] satisfies Point[],
};

/** Các đoạn thẳng của đường gấp khúc, theo tên như "AB", "BC". */
export const doanGapKhuc: Record<string, Seg> = Object.fromEntries(
  gapKhuc.names.slice(0, -1).map((name, index) => [name + gapKhuc.names[index + 1], [gapKhuc.points[index], gapKhuc.points[index + 1]] as Seg]),
);

/** Đường gấp khúc trên giấy ô. */
export function GapKhuc() {
  const pts = gapKhuc.points.map(px);
  const last = pts.length - 1;
  return (
    <Khung maxWidth={420}>
      <svg
        viewBox={`0 0 ${MARGIN * 2 + gapKhuc.cols * CELL} ${MARGIN * 2 + gapKhuc.rows * CELL}`}
        role="img"
        aria-label="Đường gấp khúc A, B, C, D, E, G, H, K vẽ trên giấy ô vuông"
        className="block w-full"
        fontWeight={800}
      >
        <NenLuoi cols={gapKhuc.cols} rows={gapKhuc.rows} cell={CELL} x={MARGIN} y={MARGIN} />
        <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="var(--unit-dm2)" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, index) => {
          const neighbours = [pts[index - 1], pts[index + 1]].filter(Boolean);
          const mx = neighbours.reduce((sum, q) => sum + q.x, 0) / neighbours.length;
          const my = neighbours.reduce((sum, q) => sum + q.y, 0) / neighbours.length;
          const length = Math.hypot(p.x - mx, p.y - my) || 1;
          return (
            <g key={gapKhuc.names[index]}>
              <circle cx={p.x} cy={p.y} r={3.5} fill="var(--ink)" />
              <text x={f(p.x + ((p.x - mx) / length) * (index === 0 || index === last ? 13 : 14))} y={f(p.y + ((p.y - my) / length) * 14 + 6)} textAnchor="middle" fontSize={16} fill="var(--ink)">
                {gapKhuc.names[index]}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
