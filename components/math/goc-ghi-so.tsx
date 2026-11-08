import { Khung, RightMark } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

/** Đa giác có tên đỉnh; `labels[i]` là số đo góc ghi ở đỉnh i (null thì không ghi). Số "90°" có thêm dấu góc vuông. */
export function GocGhiSo({ points, names, labels, label }: { points: Point[]; names: string[]; labels: (string | null)[]; label: string }) {
  const n = points.length;
  const cx = points.reduce((sum, p) => sum + p.x, 0) / n;
  const cy = points.reduce((sum, p) => sum + p.y, 0) / n;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const pad = 40;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) + pad - minX;
  const height = Math.max(...ys) + pad - minY;
  return (
    <Khung maxWidth={Math.max(280, Math.min(width * 1.9, 400))}>
      <svg viewBox={`${f(minX)} ${f(minY)} ${f(width)} ${f(height)}`} role="img" aria-label={label} className="block w-full" fontWeight={800}>
        <polygon points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        {points.map((p, index) =>
          labels[index] === "90°" ? <RightMark key={`r${index}`} at={p} toward1={points[(index + n - 1) % n]} toward2={points[(index + 1) % n]} size={11} /> : null,
        )}
        {points.map((p, index) => {
          const dx = p.x - cx;
          const dy = p.y - cy;
          const length = Math.hypot(dx, dy);
          const ux = dx / length;
          const uy = dy / length;
          const value = labels[index];
          return (
            <g key={names[index]}>
              <text x={f(p.x + ux * 17)} y={f(p.y + uy * 17 + 6)} textAnchor="middle" fontSize={18} fill="var(--ink)">
                {names[index]}
              </text>
              {value ? (
                <text x={f(p.x - ux * 34)} y={f(p.y - uy * 34 + 5)} textAnchor="middle" fontSize={15} fill="var(--unit-ta)">
                  {value}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
