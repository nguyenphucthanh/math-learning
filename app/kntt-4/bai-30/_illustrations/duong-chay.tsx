import { Khung, RightMark } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

export type DuongChaySpec = { mn: number; mp: number; scale: number; m: Point };

/**
 * Bản thiết kế đường chạy: MN là vạch xuất phát (H là trung điểm), MP, HK, NQ vuông góc với MN,
 * PQ là vạch đích. Độ dài tính bằng cm, `scale` là số đơn vị vẽ cho mỗi cm.
 */
export function duongChayGeometry({ mn, mp, scale, m }: DuongChaySpec) {
  const half = (mn / 2) * scale;
  return {
    m,
    h: { x: m.x, y: f(m.y + half) },
    n: { x: m.x, y: f(m.y + 2 * half) },
    p: { x: f(m.x + mp * scale), y: m.y },
    k: { x: f(m.x + mp * scale), y: f(m.y + half) },
    q: { x: f(m.x + mp * scale), y: f(m.y + 2 * half) },
  };
}

/** Số liệu đường chạy trong bài tập (đã đổi khác SGK): MN = 4 cm, MP = 12 cm. */
export const exerciseTrack: DuongChaySpec = { mn: 4, mp: 12, scale: 20, m: { x: 40, y: 34 } };

export function DuongChay({ spec = exerciseTrack }: { spec?: DuongChaySpec }) {
  const { m, h, n, p, k, q } = duongChayGeometry(spec);
  const rows = [
    [m, p],
    [h, k],
    [n, q],
  ];
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 340 150" role="img" aria-label="Bản thiết kế đường chạy: ba đoạn thẳng MP, HK, NQ nằm ngang, vạch xuất phát MN và vạch đích PQ" className="block w-full" fontWeight={800}>
        {rows.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        ))}
        <line x1={m.x} y1={m.y} x2={n.x} y2={n.y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        <line x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        <RightMark at={m} toward1={n} toward2={p} size={12} />
        {[
          ["M", m, -14, 5],
          ["H", h, -14, 5],
          ["N", n, -14, 5],
          ["P", p, 14, 5],
          ["K", k, 14, 5],
          ["Q", q, 14, 5],
        ].map(([name, at, dx, dy]) => (
          <g key={name as string}>
            <circle cx={(at as Point).x} cy={(at as Point).y} r={4} fill="var(--ink)" />
            <text x={f((at as Point).x + (dx as number))} y={f((at as Point).y + (dy as number))} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {name as string}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
