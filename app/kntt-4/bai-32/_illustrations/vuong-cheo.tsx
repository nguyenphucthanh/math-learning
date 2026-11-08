import { NenLuoi } from "@/components/math/dau";
import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";

const CELL = 28;
const MARGIN = 26;

/** Hình vuông ABCD cạnh 6 ô, đường chéo AC. Tọa độ tính bằng ô (trục y hướng xuống). */
export const vuong: Record<"A" | "B" | "C" | "D", Point> = {
  A: { x: 1, y: 1 },
  B: { x: 7, y: 1 },
  C: { x: 7, y: 7 },
  D: { x: 1, y: 7 },
};

const px = (p: Point): Point => ({ x: MARGIN + p.x * CELL, y: MARGIN + p.y * CELL });
const OFFSETS = { A: [-12, -6], B: [12, -6], C: [12, 18], D: [-12, 18] } as const;

/** Hình vuông ABCD có đường chéo AC trên giấy ô. */
export function VuongCheo() {
  const [a, b, c, d] = (["A", "B", "C", "D"] as const).map((name) => px(vuong[name]));
  return (
    <Khung maxWidth={300}>
      <svg viewBox={`0 0 ${MARGIN * 2 + 8 * CELL} ${MARGIN * 2 + 8 * CELL}`} role="img" aria-label="Hình vuông ABCD vẽ trên giấy ô, có đường chéo AC" className="block w-full" fontWeight={800}>
        <NenLuoi cols={8} rows={8} cell={CELL} x={MARGIN} y={MARGIN} />
        <polygon points={[a, b, c, d].map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <line x1={a.x} y1={a.y} x2={c.x} y2={c.y} stroke="var(--unit-century)" strokeWidth={4} strokeLinecap="round" />
        {(["A", "B", "C", "D"] as const).map((name, index) => {
          const p = [a, b, c, d][index];
          return (
            <text key={name} x={p.x + OFFSETS[name][0]} y={p.y + OFFSETS[name][1]} textAnchor="middle" fontSize={17} fill="var(--ink)">
              {name}
            </text>
          );
        })}
      </svg>
    </Khung>
  );
}
