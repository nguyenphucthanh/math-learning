import { Khung } from "@/components/math/khung";
import type { Point } from "@/lib/hinh";
import { banhXe, bieuDoNga, chinQuat, duongNhen, tamGiacAH } from "./du-lieu";

const f = (n: number) => Math.round(n * 10) / 10;
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Bánh xe gỗ: nan xanh, nan đỏ A và B, các nan còn lại màu nâu nhạt. Hướng đo từ nan chỉ lên, theo chiều kim đồng hồ. */
export function BanhXe() {
  const C = { x: 130, y: 110 };
  const R = 90;
  const end = (deg: number, r = R) => ({ x: f(C.x + r * Math.sin(rad(deg))), y: f(C.y - r * Math.cos(rad(deg))) });
  const special = new Set<number>([...banhXe.xanh, banhXe.do.A, banhXe.do.B]);
  return (
    <Khung maxWidth={300}>
      <svg viewBox="0 0 260 220" role="img" aria-label="Bánh xe gỗ có 12 nan. Hai nan xanh: một nan chỉ lên trên, một nan chỉ xuống phía dưới bên phải. Hai nan đỏ A và B nằm bên phải, A ở phía trên B" className="block w-full" fontWeight={800}>
        <circle cx={C.x} cy={C.y} r={R + 6} fill="var(--unit-century-soft)" stroke="var(--ink)" strokeWidth={4} />
        {Array.from({ length: 12 }, (_, k) => k * 30)
          .filter((deg) => !special.has(deg))
          .map((deg) => (
            <line key={deg} x1={C.x} y1={C.y} x2={end(deg).x} y2={end(deg).y} stroke="var(--input)" strokeWidth={4} strokeLinecap="round" />
          ))}
        {banhXe.xanh.map((deg) => (
          <line key={deg} x1={C.x} y1={C.y} x2={end(deg).x} y2={end(deg).y} stroke="var(--unit-second)" strokeWidth={8} strokeLinecap="round" />
        ))}
        {Object.entries(banhXe.do).map(([name, deg]) => (
          <g key={name}>
            <line x1={C.x} y1={C.y} x2={end(deg).x} y2={end(deg).y} stroke="var(--unit-mm2)" strokeWidth={8} strokeLinecap="round" />
            <text x={end(deg, R + 24).x} y={f(end(deg, R + 24).y + 6)} textAnchor="middle" fontSize={18} fill="var(--unit-mm2)">
              {name}
            </text>
          </g>
        ))}
        <circle cx={C.x} cy={C.y} r={9} fill="var(--ink)" />
      </svg>
    </Khung>
  );
}

/** Chín chiếc quạt xòe ra và biểu đồ chấm của Nga (bốn cột). */
export function QuatVaBieuDo() {
  const loai = [
    ["Góc nhọn", bieuDoNga.nhon],
    ["Góc vuông", bieuDoNga.vuong],
    ["Góc tù", bieuDoNga.tu],
    ["Góc bẹt", bieuDoNga.bet],
  ] as const;
  return (
    <Khung maxWidth={440}>
      <svg viewBox="0 0 360 330" role="img" aria-label="Chín chiếc quạt xòe ra tạo thành các góc khác nhau và biểu đồ chấm của Nga có bốn cột: góc nhọn 3 chấm, góc vuông 2 chấm, góc tù 3 chấm, góc bẹt 2 chấm" className="block w-full" fontWeight={800}>
        {chinQuat.map((degrees, index) => {
          const x = index < 5 ? 40 + index * 70 : 75 + (index - 5) * 70;
          const cy = index < 5 ? 62 : 128;
          const half = degrees / 2;
          const a = { x: f(x - 42 * Math.sin(rad(half))), y: f(cy - 42 * Math.cos(rad(half))) };
          const b = { x: f(x + 42 * Math.sin(rad(half))), y: f(cy - 42 * Math.cos(rad(half))) };
          const apex = { x, y: cy };
          return (
            <g key={index}>
              <path d={`M ${apex.x} ${apex.y} L ${a.x} ${a.y} A 42 42 0 0 1 ${b.x} ${b.y} Z`} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
            </g>
          );
        })}
        {loai.map(([name, count], column) => {
          const x = 60 + column * 80;
          return (
            <g key={name}>
              <line x1={x - 30} y1={290} x2={x + 30} y2={290} stroke="var(--ink)" strokeWidth={2.5} />
              {Array.from({ length: count }, (_, k) => (
                <circle key={k} cx={x} cy={270 - k * 22} r={9} fill="var(--unit-second)" />
              ))}
              <text x={x} y={312} textAnchor="middle" fontSize={15} fill="var(--ink)">
                {name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

/** Tam giác ABC với AH vuông góc với BC. */
export function TamGiacAH() {
  const { A, B, C, H } = tamGiacAH;
  const at = (p: Point) => ({ x: p.x + 40, y: p.y + 30 });
  const label = (name: string, p: Point, dx: number, dy: number) => (
    <text key={name} x={at(p).x + dx} y={at(p).y + dy} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--ink)">
      {name}
    </text>
  );
  return (
    <Khung maxWidth={340}>
      <svg viewBox="0 0 230 120" role="img" aria-label="Tam giác ABC, đường thẳng AH từ đỉnh A xuống cạnh BC, H nằm giữa B và C" className="block w-full">
        <polygon points={[A, B, C].map((p) => `${at(p).x},${at(p).y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <line x1={at(A).x} y1={at(A).y} x2={at(H).x} y2={at(H).y} stroke="var(--ink)" strokeWidth={3} />
        {label("A", A, 0, -9)}
        {label("B", B, -14, 6)}
        {label("C", C, 14, 6)}
        {label("H", H, 0, 22)}
      </svg>
    </Khung>
  );
}

/** Hai đường đi của con nhện: đường đỏ và đường xanh. */
export function HaiDuongNhen() {
  const colors = { do: "var(--unit-mm2)", xanh: "var(--unit-second)" };
  const names = { do: "Đường đỏ", xanh: "Đường xanh" };
  return (
    <Khung maxWidth={440}>
      <svg viewBox="0 0 360 140" role="img" aria-label="Hai đường đi của con nhện. mỗi đường là một đường gấp khúc có nhiều chỗ gấp" className="block w-full" fontWeight={800}>
        {(["do", "xanh"] as const).map((key, index) => (
          <g key={key} transform={`translate(${index * 180 + 12} 4)`}>
            <polyline points={duongNhen[key].map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={colors[key]} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={duongNhen[key][0].x} cy={duongNhen[key][0].y} r={6} fill="var(--ink)" />
            <text x={70} y={128} textAnchor="middle" fontSize={16} fill={colors[key]}>
              {names[key]}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
