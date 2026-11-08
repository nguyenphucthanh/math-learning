import { Khung } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

export type Manh = { name: string; color: string; points: Point[] };

/**
 * Hình vuông ABCD cạnh `n` ô (n chia hết cho 4), A ở góc trên bên trái, trục y hướng xuống.
 * M, N, O, P là trung điểm của AB, BC, AC, AO; PQ song song với AM, Q nằm trên MN.
 * Tọa độ tính bằng ô.
 */
export function hinhVuongGeometry(n: number) {
  const q = n / 4;
  const A: Point = { x: 0, y: 0 };
  const B: Point = { x: n, y: 0 };
  const C: Point = { x: n, y: n };
  const D: Point = { x: 0, y: n };
  const M: Point = { x: 2 * q, y: 0 };
  const N: Point = { x: n, y: 2 * q };
  const O: Point = { x: 2 * q, y: 2 * q };
  const P: Point = { x: q, y: q };
  const Q: Point = { x: 3 * q, y: q };
  const segs = { AB: [A, B], AC: [A, C], DO: [D, O], MN: [M, N], ON: [O, N], PQ: [P, Q], AM: [A, M], DC: [D, C] } satisfies Record<string, Seg>;
  const pieces: Manh[] = [
    { name: "MBN", color: "var(--unit-cm2)", points: [M, B, N] },
    { name: "AMQP", color: "var(--unit-mm2)", points: [A, M, Q, P] },
    { name: "PQNO", color: "var(--unit-tan)", points: [P, Q, N, O] },
    { name: "ONC", color: "var(--unit-century)", points: [O, N, C] },
    { name: "ADO", color: "var(--unit-m2)", points: [A, D, O] },
    { name: "DCO", color: "var(--unit-second)", points: [D, C, O] },
  ];
  return { A, B, C, D, M, N, O, P, Q, segs, pieces };
}

const SIZE = 264;
const OX = 38;
const OY = 30;

/** Đổi từ ô sang tọa độ vẽ. */
export const toPx = (n: number, p: Point): Point => ({ x: f(OX + (p.x * SIZE) / n), y: f(OY + (p.y * SIZE) / n) });

const labelOffset: Record<string, [number, number]> = {
  A: [-14, -6],
  B: [14, -6],
  C: [14, 20],
  D: [-14, 20],
  M: [0, -10],
  N: [15, 6],
  O: [0, 23],
  P: [-14, 17],
  Q: [13, -9],
};

/**
 * Hình vuông trên giấy ô và các đoạn thẳng của bộ đồ chơi ghép hình.
 * `step`: 0 = hình vuông và AC; 1 = thêm M, N, O, P, DO, ON, MN; 2 = thêm Q, PQ; 3 = tô sáu mảnh.
 * Phần tử của bước k có `data-enter={k}`.
 */
export function HinhVuongSvg({ n, step, label }: { n: number; step: number; label: string }) {
  const g = hinhVuongGeometry(n);
  const px = (p: Point) => toPx(n, p);
  const line = (seg: Seg, stroke: string, width = 3.5) => {
    const [a, b] = [px(seg[0]), px(seg[1])];
    return <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={stroke} strokeWidth={width} strokeLinecap="round" />;
  };
  const named = (names: string[]) =>
    names.map((name) => {
      const p = px(g[name as "M"]);
      const [dx, dy] = labelOffset[name];
      return (
        <g key={name}>
          {"MNOPQ".includes(name) ? <circle cx={p.x} cy={p.y} r={4.5} fill="var(--ink)" /> : null}
          <text x={f(p.x + dx)} y={f(p.y + dy)} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--ink)">
            {name}
          </text>
        </g>
      );
    });
  const tl = px(g.A);

  return (
    <svg viewBox="0 0 340 330" role="img" aria-label={label} className="block w-full">
      {Array.from({ length: n + 1 }, (_, i) => {
        const at = f(OX + (i * SIZE) / n);
        const end = f(OY + SIZE);
        return (
          <g key={i} stroke="var(--input)" strokeWidth={1}>
            <line x1={at} y1={OY} x2={at} y2={end} />
            <line x1={OX} y1={at - OX + OY} x2={OX + SIZE} y2={at - OX + OY} />
          </g>
        );
      })}
      {step >= 3 ? (
        <g data-enter={3}>
          {g.pieces.map((piece) => (
            <polygon key={piece.name} points={piece.points.map((p) => `${px(p).x},${px(p).y}`).join(" ")} fill={piece.color} fillOpacity={0.55} stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" />
          ))}
        </g>
      ) : null}
      <rect x={tl.x} y={tl.y} width={SIZE} height={SIZE} fill="none" stroke="var(--ink)" strokeWidth={3.5} />
      {line(g.segs.AC, "var(--ink)")}
      {step >= 1 ? (
        <g data-enter={1}>
          {line(g.segs.DO, "var(--unit-ta)")}
          {line(g.segs.ON, "var(--unit-ta)")}
          {line(g.segs.MN, "var(--unit-ta)")}
        </g>
      ) : null}
      {step >= 2 ? <g data-enter={2}>{line(g.segs.PQ, "var(--unit-yen)", 4)}</g> : null}
      {named(["A", "B", "C", "D"])}
      {step >= 1 ? <g data-enter={1}>{named(["M", "N", "O", "P"])}</g> : null}
      {step >= 2 ? <g data-enter={2}>{named(["Q"])}</g> : null}
    </svg>
  );
}

/** Hình vuông đã chia sáu mảnh, dùng trong bài tập. */
export function HinhVuong({ n = 12 }: { n?: number }) {
  return (
    <Khung maxWidth={360}>
      <HinhVuongSvg n={n} step={3} label={`Hình vuông ABCD cạnh ${n} ô, chia thành sáu mảnh theo các đoạn thẳng AC, DO, MN, ON, PQ`} />
    </Khung>
  );
}
