import type { Point, Seg } from "@/lib/hinh";
import { Khung } from "@/components/math/khung";

export type Pipe = { name: "M" | "N" | "P"; seg: Seg };

const p = (x: number, y: number): Point => ({ x, y });

/** Ba cách nối, tọa độ trong từng ô 110 × 110. Ống M xanh lá, N vàng, P tím. */
export const pipePlans: { label: string; pipes: Pipe[] }[] = [
  {
    label: "A",
    pipes: [
      { name: "M", seg: [p(8, 54), p(52, 54)] },
      { name: "N", seg: [p(52, 54), p(100, 54)] },
      { name: "P", seg: [p(100, 54), p(100, 104)] },
    ],
  },
  {
    label: "B",
    pipes: [
      { name: "M", seg: [p(8, 22), p(66, 22)] },
      { name: "N", seg: [p(66, 22), p(66, 88)] },
      { name: "P", seg: [p(66, 88), p(104, 88)] },
    ],
  },
  {
    label: "C",
    pipes: [
      { name: "M", seg: [p(8, 22), p(66, 22)] },
      { name: "N", seg: [p(66, 22), p(66, 88)] },
      { name: "P", seg: [p(66, 88), p(104, 58)] },
    ],
  },
];

const colors = { M: "var(--unit-minute)", N: "var(--sun)", P: "var(--unit-ta)" };

/** Ba phương án nối ba ống nước M, N, P. */
export function OngNuoc() {
  return (
    <Khung maxWidth={420}>
      <svg viewBox="0 0 340 170" role="img" aria-label="Ba phương án nối ống nước M, N, P: phương án A, B và C" className="block w-full" fontWeight={800}>
        {(["M", "N", "P"] as const).map((name, index) => (
          <g key={name}>
            <line x1={80 + index * 62} y1={16} x2={104 + index * 62} y2={16} stroke={colors[name]} strokeWidth={9} strokeLinecap="round" />
            <text x={112 + index * 62} y={22} fontSize={16} fill="var(--ink)">
              {name}
            </text>
          </g>
        ))}
        {pipePlans.map((plan, index) => (
          <g key={plan.label} transform={`translate(${index * 112} 36)`}>
            {plan.pipes.map((pipe) => (
              <line key={pipe.name} x1={pipe.seg[0].x} y1={pipe.seg[0].y} x2={pipe.seg[1].x} y2={pipe.seg[1].y} stroke={colors[pipe.name]} strokeWidth={9} strokeLinecap="round" />
            ))}
            {plan.pipes.slice(1).map((pipe) => (
              <circle key={pipe.name} cx={pipe.seg[0].x} cy={pipe.seg[0].y} r={6} fill="var(--ink)" />
            ))}
            <text x={8} y={128} fontSize={18} fill="var(--ink)">
              {plan.label}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
