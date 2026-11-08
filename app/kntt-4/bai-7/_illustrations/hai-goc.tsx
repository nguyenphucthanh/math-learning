import { Khung } from "@/components/math/khung";
import { polar, type Point } from "@/lib/hinh";

/** Hai góc cạnh dài ngắn khác nhau: góc đỉnh O (30°, cạnh dài) và góc đỉnh P (50°, cạnh ngắn). */
export const haiGoc = {
  o: { vertex: { x: 20, y: 120 }, degrees: 30, arm: 130 },
  p: { vertex: { x: 215, y: 120 }, degrees: 50, arm: 70 },
};

function Goc({ vertex, degrees, arm, names }: { vertex: Point; degrees: number; arm: number; names: [string, string, string] }) {
  const base = polar(vertex, arm, 0);
  const tip = polar(vertex, arm, degrees);
  const [v, a, b] = names;
  return (
    <g>
      <path d={`M ${base.x} ${base.y} L ${vertex.x} ${vertex.y} L ${tip.x} ${tip.y}`} fill="none" stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={vertex.x} cy={vertex.y} r={4} fill="var(--ink)" />
      <text x={vertex.x} y={vertex.y + 22} textAnchor="middle" fontSize={18} fill="var(--ink)">
        {v}
      </text>
      <text x={tip.x + 8} y={tip.y - 6} textAnchor="middle" fontSize={18} fill="var(--ink)">
        {a}
      </text>
      <text x={base.x + 4} y={base.y + 22} textAnchor="middle" fontSize={18} fill="var(--ink)">
        {b}
      </text>
    </g>
  );
}

export function HaiGoc() {
  return (
    <Khung maxWidth={420}>
      <svg viewBox="0 0 340 150" role="img" aria-label="Hai góc: góc đỉnh O có hai cạnh dài, góc đỉnh P có hai cạnh ngắn hơn" className="block w-full" fontWeight={800}>
        <Goc {...haiGoc.o} names={["O", "A", "B"]} />
        <Goc {...haiGoc.p} names={["P", "M", "N"]} />
      </svg>
    </Khung>
  );
}
