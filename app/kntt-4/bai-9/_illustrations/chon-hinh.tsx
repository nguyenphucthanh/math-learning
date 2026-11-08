import { Khung } from "@/components/math/khung";
import { polar, round1, type Point } from "@/lib/hinh";

export type HinhName = "A" | "B" | "C";

/** Ba hình của câu chọn hình: đỉnh O và hướng (độ, từ bên phải ngược chiều kim đồng hồ) của ba tia OM, ON, OP. */
export const chonHinh: Record<HinhName, { vertex: Point; rays: { M: number; N: number; P: number } }> = {
  A: { vertex: { x: 64, y: 100 }, rays: { M: 180, N: 90, P: 0 } },
  B: { vertex: { x: 165, y: 100 }, rays: { M: 130, N: 90, P: 0 } },
  C: { vertex: { x: 300, y: 100 }, rays: { M: 180, N: 50, P: 90 } },
};

/** Hình Rô-bốt cần vẽ: góc MON = 40°, góc NOP = 90°. */
export const hinhDung: HinhName = "B";

/** Ba hình A, B, C; `only` chỉ vẽ một hình. */
export function ChonHinh({ only }: { only?: HinhName }) {
  const names = (only ? [only] : ["A", "B", "C"]) as HinhName[];
  const box = only ? 120 : 360;
  const shift = only ? chonHinh[only].vertex.x - 60 : 0;
  return (
    <Khung maxWidth={only ? 260 : 420}>
      <svg viewBox={`${shift} 0 ${box} 150`} role="img" aria-label={only ? `Hình ${only}: góc đỉnh O với ba tia OM, ON, OP` : "Ba hình A, B, C, mỗi hình có góc đỉnh O với ba tia OM, ON, OP"} className="block w-full" fontWeight={800}>
        {names.map((name) => {
          const { vertex, rays } = chonHinh[name];
          return (
            <g key={name}>
              {(Object.keys(rays) as (keyof typeof rays)[]).map((ray) => {
                const tip = polar(vertex, 44, rays[ray]);
                const label = polar(vertex, 58, rays[ray]);
                return (
                  <g key={ray}>
                    <line x1={vertex.x} y1={vertex.y} x2={tip.x} y2={tip.y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
                    <text x={label.x} y={round1(label.y + 5)} textAnchor="middle" fontSize={16} fill="var(--ink)">
                      {ray}
                    </text>
                  </g>
                );
              })}
              <circle cx={vertex.x} cy={vertex.y} r={4} fill="var(--ink)" />
              <text x={vertex.x} y={vertex.y + 20} textAnchor="middle" fontSize={16} fill="var(--ink)">
                O
              </text>
              <text x={vertex.x} y={144} textAnchor="middle" fontSize={16} fill="var(--unit-ta)">
                Hình {name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
