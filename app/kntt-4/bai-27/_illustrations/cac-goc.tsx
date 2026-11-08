import { polar, type Point } from "@/lib/hinh";
import { Khung } from "@/components/math/khung";

export type GocSpec = { name: string; /** Hướng cạnh thứ nhất, độ. */ rotation: number; /** Số đo góc, độ. */ degrees: number };

const ARM = 42;

export function gocArms(spec: GocSpec, vertex: Point): [Point, Point] {
  return [polar(vertex, ARM, spec.rotation), polar(vertex, ARM, spec.rotation + spec.degrees)];
}

/** Ba góc đặt cạnh nhau, mỗi góc xoay một hướng khác nhau. */
export function CacGoc({ angles }: { angles: GocSpec[] }) {
  const width = angles.length * 100;
  return (
    <Khung maxWidth={380}>
      <svg viewBox={`0 0 ${width} 130`} role="img" aria-label={`${angles.length} góc: ${angles.map((a) => a.name).join(", ")}`} className="block w-full">
        {angles.map((spec, index) => {
          const vertex = { x: index * 100 + 50, y: 62 };
          const [p, q] = gocArms(spec, vertex);
          return (
            <g key={spec.name}>
              <path d={`M ${p.x} ${p.y} L ${vertex.x} ${vertex.y} L ${q.x} ${q.y}`} fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              <circle cx={vertex.x} cy={vertex.y} r={3.5} fill="var(--ink)" />
              <text x={vertex.x} y={122} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
                {spec.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
