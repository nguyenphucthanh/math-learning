import { Khung, RightMark } from "@/components/math/khung";
import { polar, round1, type Point } from "@/lib/hinh";

/** Bốn loại góc: số đo minh họa và lời nhắc. */
export const loaiGoc = [
  { name: "Góc nhọn", degrees: 40, notes: ["bé hơn 90°"] },
  { name: "Góc vuông", degrees: 90, notes: ["bằng 90°"] },
  { name: "Góc tù", degrees: 130, notes: ["lớn hơn 90°", "bé hơn 180°"] },
  { name: "Góc bẹt", degrees: 180, notes: ["bằng 180°"] },
];

const CELL_W = 180;
const CELL_H = 160;

function Cell({ index, name, degrees, notes }: (typeof loaiGoc)[number] & { index: number }) {
  const ox = (index % 2) * CELL_W;
  const oy = Math.floor(index / 2) * CELL_H;
  const vertex: Point = { x: ox + (degrees > 90 ? 95 : 28), y: oy + 84 };
  const base = polar(vertex, 76, 0);
  const arm = polar(vertex, degrees === 180 ? 76 : 66, degrees);
  const arcStart = polar(vertex, 24, 0);
  const arcEnd = polar(vertex, 24, degrees);
  return (
    <g>
      <path d={`M ${base.x} ${base.y} L ${vertex.x} ${vertex.y} L ${arm.x} ${arm.y}`} fill="none" stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      {degrees === 90 ? (
        <RightMark at={vertex} toward1={base} toward2={arm} size={16} />
      ) : degrees < 180 ? (
        <path d={`M ${arcStart.x} ${arcStart.y} A 24 24 0 0 0 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke="var(--unit-ta)" strokeWidth={2.5} />
      ) : null}
      <circle cx={vertex.x} cy={vertex.y} r={4} fill="var(--ink)" />
      <text x={round1(ox + CELL_W / 2)} y={oy + 118} textAnchor="middle" fontSize={16} fill="var(--ink)">
        {name}
      </text>
      {notes.map((note, line) => (
        <text key={note} x={round1(ox + CELL_W / 2)} y={oy + 136 + line * 18} textAnchor="middle" fontSize={14} fill="var(--unit-ta)">
          {note}
        </text>
      ))}
    </g>
  );
}

/** Góc nhọn, góc vuông, góc tù, góc bẹt cạnh nhau. */
export function PhanLoaiGoc() {
  return (
    <Khung maxWidth={420}>
      <svg viewBox={`0 0 ${CELL_W * 2} ${CELL_H * 2}`} role="img" aria-label="Bốn loại góc: góc nhọn bé hơn 90 độ, góc vuông bằng 90 độ, góc tù lớn hơn 90 độ và bé hơn 180 độ, góc bẹt bằng 180 độ" className="block w-full" fontWeight={800}>
        {loaiGoc.map((item, index) => (
          <Cell key={item.name} index={index} {...item} />
        ))}
      </svg>
    </Khung>
  );
}
