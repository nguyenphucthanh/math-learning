import { NenLuoi } from "@/components/math/dau";
import { Khung, RightMark } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";
import { binhHanh, chuNhat, daiThoi, haiGoc, nha, thoi } from "./hinh-hoc";

const f = (n: number) => Math.round(n * 10) / 10;
const pts = (points: Point[]) => points.map((p) => `${f(p.x)},${f(p.y)}`).join(" ");
const centroid = (points: Point[]): Point => ({
  x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
  y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
});

/** Đa giác có tên đỉnh, có thể ghi số đo góc ở một số đỉnh (`angleLabels`: chỉ số đỉnh → chữ). */
export function DaGiacGoc({ points, names, angleLabels = {}, label }: { points: Point[]; names: string[]; angleLabels?: Record<number, string>; label: string }) {
  const c = centroid(points);
  const pad = 34;
  const minX = Math.min(...points.map((p) => p.x)) - pad;
  const minY = Math.min(...points.map((p) => p.y)) - pad;
  const width = Math.max(...points.map((p) => p.x)) + pad - minX;
  const height = Math.max(...points.map((p) => p.y)) + pad - minY;
  return (
    <Khung maxWidth={Math.max(280, Math.min(width * 1.6, 400))}>
      <svg viewBox={`${minX} ${minY} ${width} ${height}`} role="img" aria-label={label} className="block w-full" fontWeight={800}>
        <polygon points={pts(points)} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        {points.map((p, index) => {
          const length = Math.hypot(p.x - c.x, p.y - c.y);
          const ux = (p.x - c.x) / length;
          const uy = (p.y - c.y) / length;
          return (
            <g key={names[index]}>
              <text x={f(p.x + ux * 17)} y={f(p.y + uy * 17 + 6)} textAnchor="middle" fontSize={16} fill="var(--ink)">
                {names[index]}
              </text>
              {angleLabels[index] ? (
                <text x={f(p.x - ux * 34)} y={f(p.y - uy * 30 + 5)} textAnchor="middle" fontSize={14} fill="var(--unit-ta)">
                  {angleLabels[index]}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

/** Ngôi nhà: mái tam giác (vàng) và thân hình vuông. */
export function NhaMaiTu() {
  return (
    <Khung maxWidth={300}>
      <svg viewBox="-20 -20 280 260" role="img" aria-label="Ngôi nhà gồm mái là một hình tam giác cân và thân là một hình vuông" className="block w-full">
        <polygon points={pts(nha.than)} fill="var(--unit-dm2-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <polygon points={pts(nha.mai)} fill="var(--sun)" fillOpacity={0.55} stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
      </svg>
    </Khung>
  );
}

/** Hình chữ nhật ABCD, điểm M trên AB, N trên CD và đoạn thẳng MN. */
export function ChuNhatMN() {
  const { A, B, C, D, M, N } = chuNhat;
  const label = (name: string, p: Point, dx: number, dy: number) => (
    <text key={name} x={p.x + dx} y={p.y + dy} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--ink)">
      {name}
    </text>
  );
  return (
    <Khung maxWidth={340}>
      <svg viewBox="-30 -25 260 175" role="img" aria-label="Hình chữ nhật ABCD, điểm M trên cạnh AB, điểm N trên cạnh CD, đoạn thẳng MN nằm ngang" className="block w-full">
        <polygon points={pts([A, B, C, D])} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <line x1={M.x} y1={M.y} x2={N.x} y2={N.y} stroke="var(--unit-second)" strokeWidth={3.5} strokeLinecap="round" />
        <circle cx={M.x} cy={M.y} r={4} fill="var(--ink)" />
        <circle cx={N.x} cy={N.y} r={4} fill="var(--ink)" />
        {label("A", A, -14, 6)}
        {label("B", B, -14, 2)}
        {label("C", C, 14, 2)}
        {label("D", D, 14, 6)}
        {label("M", M, -15, 6)}
        {label("N", N, 15, 6)}
      </svg>
    </Khung>
  );
}

/** Bốn hình A, B, C, D trong lưới 2 × 2 (mỗi ô 140 × 90 và nhãn ở góc trái). */
export function BonHinh({ shapes, color, label }: { shapes: Point[][]; color: string; label: string }) {
  const letters = ["A", "B", "C", "D"];
  return (
    <Khung maxWidth={420}>
      <svg viewBox="0 0 330 230" role="img" aria-label={label} className="block w-full" fontWeight={800}>
        {shapes.map((shape, index) => {
          const ox = 10 + (index % 2) * 165;
          const oy = 10 + Math.floor(index / 2) * 112;
          return (
            <g key={letters[index]} transform={`translate(${ox + 14} ${oy + 18})`}>
              <text x={-14} y={0} fontSize={18} fill="var(--unit-ta)">
                {letters[index]}.
              </text>
              <polygon points={pts(shape)} fill={color} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

function Canh({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--unit-ta)">
      {children}
    </text>
  );
}

/** Hình bình hành ABCD, ghi AB = 7 cm và AD = 4 cm. */
export function BinhHanhCanh() {
  const [A, B, C, D] = binhHanh.points;
  return (
    <Khung maxWidth={340}>
      <svg viewBox="-50 -35 290 135" role="img" aria-label={`Hình bình hành ABCD, cạnh AB dài ${binhHanh.ab} cm, cạnh AD dài ${binhHanh.ad} cm`} className="block w-full" fontWeight={800}>
        <polygon points={pts([A, B, C, D])} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <Canh x={110} y={-10}>{`${binhHanh.ab} cm`}</Canh>
        <Canh x={4} y={36}>{`${binhHanh.ad} cm`}</Canh>
        {[
          ["A", A, -4, -10],
          ["B", B, 10, -8],
          ["C", C, 14, 18],
          ["D", D, -12, 18],
        ].map(([name, p, dx, dy]) => (
          <text key={name as string} x={(p as Point).x + (dx as number)} y={(p as Point).y + (dy as number)} textAnchor="middle" fontSize={17} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
    </Khung>
  );
}

/** Hình thoi MNPQ, ghi NM = 6 cm. */
export function ThoiCanh() {
  const [M, N, P, Q] = thoi.points;
  return (
    <Khung maxWidth={300}>
      <svg viewBox="-30 -30 252 204" role="img" aria-label={`Hình thoi MNPQ, cạnh NM dài ${thoi.canh} cm`} className="block w-full" fontWeight={800}>
        <polygon points={pts([M, N, P, Q])} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <Canh x={36} y={26}>{`${thoi.canh} cm`}</Canh>
        {[
          ["M", M, -14, 6],
          ["N", N, 0, -10],
          ["P", P, 15, 6],
          ["Q", Q, 0, 24],
        ].map(([name, p, dx, dy]) => (
          <text key={name as string} x={(p as Point).x + (dx as number)} y={(p as Point).y + (dy as number)} textAnchor="middle" fontSize={17} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
    </Khung>
  );
}

/** Dải ba hình thoi liền nhau, mỗi hình một màu. */
export function DaiHinhThoi() {
  const colors = ["var(--unit-yen)", "var(--unit-ta)", "var(--unit-dm2)"];
  return (
    <Khung maxWidth={400}>
      <svg viewBox="-10 -10 260 80" role="img" aria-label="Ba hình thoi nối liền nhau theo hàng ngang, mỗi hình một màu" className="block w-full">
        {daiThoi.map((shape, index) => (
          <polygon key={index} points={pts(shape)} fill={colors[index]} fillOpacity={0.45} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
        ))}
      </svg>
    </Khung>
  );
}

const CELL = 24;
const MARGIN = 14;
const cell = (p: Point): Point => ({ x: MARGIN + p.x * CELL, y: MARGIN + p.y * CELL });

/** Hai góc vẽ trên giấy ô: góc đỉnh O và góc đỉnh P. */
export function HaiGocLuoi() {
  return (
    <Khung maxWidth={420}>
      <svg viewBox={`0 0 ${MARGIN * 2 + 17 * CELL} ${MARGIN * 2 + 7 * CELL}`} role="img" aria-label="Hai góc vẽ trên giấy ô vuông: góc đỉnh O ở bên trái và góc đỉnh P ở bên phải" className="block w-full" fontWeight={800}>
        <NenLuoi cols={17} rows={7} cell={CELL} x={MARGIN} y={MARGIN} />
        {(["O", "P"] as const).map((name) => {
          const { vertex, arms } = haiGoc[name];
          const v = cell(vertex);
          return (
            <g key={name}>
              {arms.map((arm, index) => {
                const a = cell(arm);
                return <line key={index} x1={v.x} y1={v.y} x2={a.x} y2={a.y} stroke="var(--unit-dm2)" strokeWidth={4} strokeLinecap="round" />;
              })}
              <circle cx={v.x} cy={v.y} r={4} fill="var(--ink)" />
              <text x={v.x - 4} y={v.y + 26} textAnchor="middle" fontSize={17} fill="var(--ink)">
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

/** Bốn loại góc cho phần Nhắc lại nhanh: nhọn 40°, vuông 90°, tù 130°, bẹt 180°. */
export const bonGoc = [
  { kind: "nhọn", degrees: 40 },
  { kind: "vuông", degrees: 90 },
  { kind: "tù", degrees: 130 },
  { kind: "bẹt", degrees: 180 },
] as const;

export function BonGoc() {
  const R = 52;
  return (
    <Khung maxWidth={440}>
      <svg viewBox="0 0 360 200" role="img" aria-label="Bốn loại góc: góc nhọn 40 độ, góc vuông 90 độ, góc tù 130 độ, góc bẹt 180 độ" className="block w-full" fontWeight={800}>
        {bonGoc.map((item, index) => {
          const ox = 18 + (index % 2) * 175;
          const oy = 60 + Math.floor(index / 2) * 100;
          const rad = (item.degrees * Math.PI) / 180;
          const v = { x: ox + 18, y: oy };
          const first = { x: v.x + R, y: v.y };
          const second = { x: f(v.x + R * Math.cos(rad)), y: f(v.y - R * Math.sin(rad)) };
          const arc = item.degrees === 180 ? null : `M ${v.x + 20} ${v.y} A 20 20 0 0 0 ${f(v.x + 20 * Math.cos(rad))} ${f(v.y - 20 * Math.sin(rad))}`;
          const flat = item.degrees === 180;
          return (
            <g key={item.kind}>
              <line x1={v.x} y1={v.y} x2={first.x} y2={first.y} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
              <line x1={v.x} y1={v.y} x2={second.x} y2={second.y} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
              {item.degrees === 90 ? <RightMark at={v} toward1={first} toward2={second} size={14} /> : arc ? <path d={arc} fill="none" stroke="var(--unit-ta)" strokeWidth={3} /> : null}
              {flat ? <path d={`M ${v.x + 16} ${v.y} A 16 16 0 0 0 ${v.x - 16} ${v.y}`} fill="none" stroke="var(--unit-ta)" strokeWidth={3} /> : null}
              <circle cx={v.x} cy={v.y} r={4} fill="var(--ink)" />
              <text x={v.x + 40} y={v.y + 32} textAnchor="middle" fontSize={15} fill="var(--unit-ta)">
                {`Góc ${item.kind}: ${item.degrees}°`}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
