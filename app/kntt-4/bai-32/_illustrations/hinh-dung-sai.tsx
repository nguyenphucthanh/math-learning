import { NenLuoi } from "@/components/math/dau";
import { Khung } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";

const CELL = 24;
const MARGIN = 20;
const f = (n: number) => Math.round(n * 10) / 10;
const px = (p: Point): Point => ({ x: MARGIN + p.x * CELL, y: MARGIN + p.y * CELL });

/** Hình ABCD (AB dài, DC ngắn, cùng nằm ngang) và các đoạn GH, NM, EG, NP. E, H, M, P nằm trên AB. Tọa độ tính bằng ô (trục y hướng xuống). */
export const diem: Record<string, Point> = {
  A: { x: 1, y: 5 },
  B: { x: 9, y: 5 },
  C: { x: 7, y: 7 },
  D: { x: 3, y: 7 },
  E: { x: 2, y: 5 },
  H: { x: 4, y: 5 },
  M: { x: 5, y: 5 },
  P: { x: 8, y: 5 },
  G: { x: 4, y: 1 },
  N: { x: 5, y: 1 },
};

export const doan = (name: string): Seg => [diem[name[0]], diem[name[1]]];

/** Nhãn đặt lệch khỏi điểm: [dx, dy] tính bằng đơn vị SVG. */
const offsets: Record<string, [number, number]> = {
  A: [-12, 4],
  B: [12, 4],
  C: [12, 10],
  D: [-12, 10],
  E: [0, 20],
  H: [-3, 20],
  M: [4, 20],
  P: [0, 20],
  G: [-4, -9],
  N: [4, -9],
};

/** Hình dùng cho nhóm câu Đúng hay Sai: không có dấu góc vuông, dấu song song. */
export function HinhDungSai() {
  const lines: [string, string, string?][] = [
    ["G", "H"],
    ["N", "M"],
    ["E", "G"],
    ["N", "P"],
  ];
  const trapezoid = ["A", "B", "C", "D"].map((name) => px(diem[name]));
  return (
    <Khung maxWidth={340}>
      <svg viewBox={`0 0 ${MARGIN * 2 + 10 * CELL} ${MARGIN * 2 + 8 * CELL}`} role="img" aria-label="Hình ABCD, có thêm các đoạn thẳng GH, NM, EG và NP. E, H, M, P nằm trên đoạn thẳng AB" className="block w-full" fontWeight={800}>
        <NenLuoi cols={10} rows={8} cell={CELL} x={MARGIN} y={MARGIN} />
        <polygon points={trapezoid.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" fillOpacity={0.7} stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        {lines.map(([a, b]) => (
          <line key={a + b} x1={px(diem[a]).x} y1={px(diem[a]).y} x2={px(diem[b]).x} y2={px(diem[b]).y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        ))}
        {Object.keys(diem).map((name) => {
          const p = px(diem[name]);
          const [dx, dy] = offsets[name];
          return (
            <g key={name}>
              <circle cx={p.x} cy={p.y} r={3.5} fill="var(--ink)" />
              <text x={f(p.x + dx)} y={f(p.y + dy)} textAnchor="middle" fontSize={16} fill="var(--ink)">
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
