import type { Point } from "@/lib/hinh";
import { Khung, RightMark } from "./khung";

const f = (n: number) => Math.round(n * 10) / 10;

/** Đỉnh `index` có góc vuông không (tính từ tọa độ). */
export function isRightAt(points: Point[], index: number): boolean {
  const n = points.length;
  const v = points[index];
  const p = points[(index + n - 1) % n];
  const q = points[(index + 1) % n];
  const dot = (p.x - v.x) * (q.x - v.x) + (p.y - v.y) * (q.y - v.y);
  return Math.abs(dot) < 1e-6;
}

/** Đa giác có tên đỉnh. `marks` vẽ dấu góc vuông ở những đỉnh vuông (dùng khi đề đã cho biết). */
export function DaGiac({ points, names, marks = false, label }: { points: Point[]; names: string[]; marks?: boolean; label: string }) {
  const n = points.length;
  const cx = points.reduce((sum, p) => sum + p.x, 0) / n;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / n;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const pad = 34;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) + pad - minX;
  const height = Math.max(...ys) + pad - minY;
  return (
    <Khung maxWidth={Math.max(260, Math.min(width * 1.8, 380))}>
      <svg viewBox={`${minX} ${minY} ${width} ${height}`} role="img" aria-label={label} className="block w-full">
        <polygon points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        {marks
          ? points.map((p, index) =>
              isRightAt(points, index) ? <RightMark key={index} at={p} toward1={points[(index + n - 1) % n]} toward2={points[(index + 1) % n]} /> : null,
            )
          : null}
        {points.map((p, index) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const length = Math.hypot(dx, dy);
          return (
            <text key={names[index]} x={f(p.x + (dx / length) * 16)} y={f(p.y + (dy / length) * 16 + 5)} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
              {names[index]}
            </text>
          );
        })}
      </svg>
    </Khung>
  );
}
