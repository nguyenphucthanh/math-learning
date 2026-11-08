import { Khung } from "@/components/math/khung";
import { fourthVertex, type Point } from "@/lib/hinh";
import { NenLuoi } from "@/components/math/dau";

const CELL = 12;
const MARGIN = 14;
const f = (n: number) => Math.round(n * 10) / 10;
const px = (p: Point): Point => ({ x: f(MARGIN + p.x * CELL), y: f(MARGIN + p.y * CELL) });

export type HinhTrenLuoi = { name: string; points: Point[] };

const centroid = (points: Point[]): Point => ({
  x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
  y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
});

function Luoi({ cols, rows, label, children, maxWidth = 400 }: { cols: number; rows: number; label: string; children: React.ReactNode; maxWidth?: number }) {
  const width = MARGIN * 2 + cols * CELL;
  const height = MARGIN * 2 + rows * CELL;
  return (
    <Khung maxWidth={maxWidth}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className="block w-full" fontWeight={800}>
        <NenLuoi cols={cols} rows={rows} cell={CELL} x={MARGIN} y={MARGIN} />
        {children}
      </svg>
    </Khung>
  );
}

function Hinh({ shape }: { shape: HinhTrenLuoi }) {
  const pts = shape.points.map(px);
  const c = px(centroid(shape.points));
  return (
    <g>
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
      <text x={c.x} y={c.y + 6} textAnchor="middle" fontSize={18} fill="var(--unit-ta)">
        {shape.name}
      </text>
    </g>
  );
}

/** Năm hình trên giấy ô: A, C, E là hình bình hành; B chỉ có một cặp cạnh song song; D không có cặp cạnh song song. Tọa độ tính bằng ô. */
export const hinhBinhHanhCuaBai: HinhTrenLuoi[] = [
  { name: "A", points: [{ x: 3, y: 1 }, { x: 9, y: 1 }, { x: 7, y: 5 }, { x: 1, y: 5 }] },
  { name: "B", points: [{ x: 12, y: 1 }, { x: 17, y: 1 }, { x: 19, y: 5 }, { x: 10, y: 5 }] },
  { name: "C", points: [{ x: 21, y: 1 }, { x: 25, y: 1 }, { x: 24, y: 6 }, { x: 20, y: 6 }] },
  { name: "D", points: [{ x: 4, y: 8 }, { x: 11, y: 7 }, { x: 9, y: 13 }, { x: 1, y: 13 }] },
  { name: "E", points: [{ x: 13, y: 9 }, { x: 19, y: 8 }, { x: 21, y: 13 }, { x: 15, y: 14 }] },
];
export const luoiBinhHanh = { cols: 26, rows: 15 };

export function NhanDienBinhHanh() {
  return (
    <Luoi {...luoiBinhHanh} label="Năm hình A, B, C, D, E vẽ trên giấy ô vuông">
      {hinhBinhHanhCuaBai.map((shape) => (
        <Hinh key={shape.name} shape={shape} />
      ))}
    </Luoi>
  );
}

/** Năm hình trên giấy ô: A, C là hình thoi; B, D là hình bình hành có hai cạnh kề không bằng nhau; E có hai cặp cạnh kề bằng nhau nhưng không có cạnh song song. */
export const hinhThoiCuaBai: HinhTrenLuoi[] = [
  { name: "A", points: [{ x: 5, y: 1 }, { x: 8, y: 5 }, { x: 5, y: 9 }, { x: 2, y: 5 }] },
  { name: "B", points: [{ x: 11, y: 1 }, { x: 18, y: 1 }, { x: 15, y: 5 }, { x: 8, y: 5 }] },
  { name: "C", points: [{ x: 23, y: 2 }, { x: 27, y: 5 }, { x: 23, y: 8 }, { x: 19, y: 5 }] },
  { name: "D", points: [{ x: 5, y: 10 }, { x: 10, y: 10 }, { x: 8, y: 15 }, { x: 3, y: 15 }] },
  { name: "E", points: [{ x: 19, y: 10 }, { x: 23, y: 12 }, { x: 19, y: 15 }, { x: 15, y: 12 }] },
];
export const luoiHinhThoi = { cols: 28, rows: 16 };

export function NhanDienHinhThoi() {
  return (
    <Luoi {...luoiHinhThoi} label="Năm hình A, B, C, D, E vẽ trên giấy ô vuông" maxWidth={440}>
      {hinhThoiCuaBai.map((shape) => (
        <Hinh key={shape.name} shape={shape} />
      ))}
    </Luoi>
  );
}

export type DiemTrenLuoi = { name: string; at: Point };

function Diem({ point, dx = 0, dy = -10 }: { point: DiemTrenLuoi; dx?: number; dy?: number }) {
  const p = px(point.at);
  return (
    <g>
      <circle cx={p.x} cy={p.y} r={4.5} fill="var(--ink)" />
      <text x={f(p.x + dx)} y={f(p.y + dy)} textAnchor="middle" fontSize={17} fill="var(--ink)">
        {point.name}
      </text>
    </g>
  );
}

/**
 * Ba đỉnh A, B, D của hình bình hành ABCD và ba điểm đánh số 1, 2, 3.
 * C = B + D − A nằm ở điểm 3.
 */
export const timDinhC = {
  grid: { cols: 18, rows: 10 },
  A: { x: 5, y: 2 },
  B: { x: 15, y: 2 },
  D: { x: 2, y: 8 },
  candidates: [
    { name: "1", at: { x: 15, y: 8 } },
    { name: "2", at: { x: 9, y: 8 } },
    { name: "3", at: { x: 12, y: 8 } },
  ] satisfies DiemTrenLuoi[],
};
export const dinhC: Point = fourthVertex(timDinhC.B, timDinhC.A, timDinhC.D);

export function TimDinhC() {
  const [a, b, d] = [timDinhC.A, timDinhC.B, timDinhC.D].map(px);
  return (
    <Luoi {...timDinhC.grid} label="Ba đỉnh A, B, D của một hình bình hành và ba điểm đánh số 1, 2, 3 nằm cùng hàng với D">
      <polyline points={`${d.x},${d.y} ${a.x},${a.y} ${b.x},${b.y}`} fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
      <Diem point={{ name: "A", at: timDinhC.A }} dx={-12} dy={-8} />
      <Diem point={{ name: "B", at: timDinhC.B }} dx={12} dy={-8} />
      <Diem point={{ name: "D", at: timDinhC.D }} dx={-12} dy={18} />
      {timDinhC.candidates.map((candidate) => (
        <Diem key={candidate.name} point={{ name: candidate.name, at: candidate.at }} dy={20} />
      ))}
    </Luoi>
  );
}

/**
 * Ba điểm M, N, P nối thành hai cạnh MN, NP bằng nhau; ba điểm S, Q, R nằm cùng hàng.
 * Điểm thứ tư của hình thoi là M + P − N, nằm ở Q.
 */
export const bonDiem = {
  grid: { cols: 16, rows: 10 },
  M: { x: 2, y: 5 },
  N: { x: 8, y: 2 },
  P: { x: 14, y: 5 },
  candidates: [
    { name: "S", at: { x: 5, y: 8 } },
    { name: "Q", at: { x: 8, y: 8 } },
    { name: "R", at: { x: 11, y: 8 } },
  ] satisfies DiemTrenLuoi[],
};

export function BonDiem() {
  const [m, n, p] = [bonDiem.M, bonDiem.N, bonDiem.P].map(px);
  return (
    <Luoi {...bonDiem.grid} label="Ba điểm M, N, P nối với nhau bằng hai đoạn thẳng, và ba điểm S, Q, R ở hàng dưới" maxWidth={380}>
      <polyline points={`${m.x},${m.y} ${n.x},${n.y} ${p.x},${p.y}`} fill="none" stroke="var(--unit-dm2)" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
      <Diem point={{ name: "M", at: bonDiem.M }} dx={-12} dy={4} />
      <Diem point={{ name: "N", at: bonDiem.N }} dy={-10} />
      <Diem point={{ name: "P", at: bonDiem.P }} dx={13} dy={4} />
      {bonDiem.candidates.map((candidate) => (
        <Diem key={candidate.name} point={candidate} dy={20} />
      ))}
    </Luoi>
  );
}
