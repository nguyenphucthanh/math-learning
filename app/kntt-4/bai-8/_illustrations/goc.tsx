import { Khung } from "@/components/math/khung";
import { banhPizza, haiCaiKeo, type Goc } from "./du-lieu";

const f = (n: number) => Math.round(n * 10) / 10;
const rad = (deg: number) => (deg * Math.PI) / 180;
/** Điểm cách `center` một khoảng `r` theo hướng `deg` (ngược chiều kim đồng hồ, trục y hướng xuống). */
const polar = (center: { x: number; y: number }, r: number, deg: number) => ({ x: f(center.x + r * Math.cos(rad(deg))), y: f(center.y - r * Math.sin(rad(deg))) });
const arc = (v: { x: number; y: number }, r: number, from: number, to: number) => {
  const a = polar(v, r, from);
  const b = polar(v, r, to);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${to - from > 180 ? 1 : 0} 0 ${b.x} ${b.y}`;
};

const ARM = 50;

/** Lưới các góc, mỗi góc có tên đỉnh, 3 góc một hàng. Không vẽ dấu góc vuông để con tự xếp loại. */
export function NhieuGoc({ angles, label }: { angles: Goc[]; label: string }) {
  const rows = Math.ceil(angles.length / 3);
  const cols = Math.min(3, angles.length);
  return (
    <Khung maxWidth={cols * 150}>
      <svg viewBox={`0 0 ${cols * 120} ${rows * 120}`} role="img" aria-label={label} className="block w-full" fontWeight={800}>
        {angles.map((goc, index) => {
          const cell = { x: 60 + (index % 3) * 120, y: 60 + Math.floor(index / 3) * 120 };
          const arms = [goc.rot, goc.rot + goc.degrees];
          const tips = arms.map((deg) => polar({ x: 0, y: 0 }, ARM, deg));
          const xs = [0, ...tips.map((p) => p.x)];
          const ys = [0, ...tips.map((p) => p.y)];
          const v = { x: f(cell.x - (Math.min(...xs) + Math.max(...xs)) / 2), y: f(cell.y - (Math.min(...ys) + Math.max(...ys)) / 2) };
          const end = arms.map((deg) => polar(v, ARM, deg));
          const label = polar(v, 17, goc.rot + goc.degrees / 2 + 180);
          return (
            <g key={goc.name}>
              <line x1={v.x} y1={v.y} x2={end[0].x} y2={end[0].y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
              <line x1={v.x} y1={v.y} x2={end[1].x} y2={end[1].y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
              <path d={arc(v, 16, goc.rot, goc.rot + goc.degrees)} fill="none" stroke="var(--unit-ta)" strokeWidth={2.5} />
              <circle cx={v.x} cy={v.y} r={3.5} fill="var(--ink)" />
              <text x={label.x} y={f(label.y + 5)} textAnchor="middle" fontSize={16} fill="var(--ink)">
                {goc.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

/** Hai cái kéo: hai lưỡi kéo tạo thành góc, tay cầm ở phía đối diện. */
export function HaiCaiKeo() {
  const colors = ["var(--unit-second)", "var(--unit-mm2)"];
  return (
    <Khung maxWidth={440}>
      <svg viewBox="0 0 360 150" role="img" aria-label="Hai cái kéo. Kéo xanh có hai lưỡi mở hẹp, kéo đỏ có hai lưỡi mở rộng" className="block w-full" fontWeight={800}>
        {haiCaiKeo.map((keo, index) => {
          const pivot = { x: 100 + index * 170, y: 75 };
          const heading = index === 0 ? 0 : 20;
          const blades = [heading + keo.degrees / 2, heading - keo.degrees / 2];
          return (
            <g key={keo.name}>
              {blades.map((deg) => {
                const tip = polar(pivot, 70, deg);
                const handle = polar(pivot, 38, deg + 180);
                return (
                  <g key={deg}>
                    <line x1={pivot.x} y1={pivot.y} x2={tip.x} y2={tip.y} stroke="var(--ink)" strokeWidth={5} strokeLinecap="round" />
                    <line x1={pivot.x} y1={pivot.y} x2={handle.x} y2={handle.y} stroke={colors[index]} strokeWidth={5} strokeLinecap="round" />
                    <circle cx={handle.x} cy={handle.y} r={9} fill="none" stroke={colors[index]} strokeWidth={4} />
                  </g>
                );
              })}
              <circle cx={pivot.x} cy={pivot.y} r={5} fill="var(--ink)" />
              <text x={pivot.x} y={142} textAnchor="middle" fontSize={16} fill={colors[index]}>
                {keo.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}

/** Chiếc bánh chia thành ba miếng đánh số 1, 2, 3 bởi đường thẳng CB và tia OA. */
export function BanhPizza() {
  const O = { x: 150, y: 100 };
  const R = 80;
  const huong = banhPizza.huongOA;
  const sector = (from: number, to: number) => `M ${O.x} ${O.y} L ${polar(O, R, from).x} ${polar(O, R, from).y} A ${R} ${R} 0 ${to - from > 180 ? 1 : 0} 0 ${polar(O, R, to).x} ${polar(O, R, to).y} Z`;
  const pieces = [
    { id: 1, from: huong, to: 180, fill: "var(--unit-cm2-soft)" },
    { id: 2, from: 0, to: huong, fill: "var(--unit-century-soft)" },
    { id: 3, from: 180, to: 360, fill: "var(--unit-mm2-soft)" },
  ];
  const a = polar(O, R + 18, huong);
  return (
    <Khung maxWidth={340}>
      <svg viewBox="0 0 300 210" role="img" aria-label="Chiếc bánh chia thành ba miếng: miếng 1 và miếng 2 nằm nửa trên, miếng 3 là nửa dưới. O là tâm bánh, A, B, C nằm trên các đường chia" className="block w-full" fontWeight={800}>
        {pieces.map((piece) => {
          const mid = polar(O, 46, (piece.from + piece.to) / 2);
          return (
            <g key={piece.id}>
              <path d={sector(piece.from, piece.to)} fill={piece.fill} stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
              <circle cx={mid.x} cy={mid.y} r={13} fill="var(--ink)" />
              <text x={mid.x} y={f(mid.y + 6)} textAnchor="middle" fontSize={17} fill="white">
                {piece.id}
              </text>
            </g>
          );
        })}
        <circle cx={O.x} cy={O.y} r={4} fill="var(--ink)" />
        <text x={f(O.x + 14)} y={f(O.y + 22)} textAnchor="middle" fontSize={16} fill="var(--ink)">
          O
        </text>
        <text x={a.x} y={f(a.y - 2)} textAnchor="middle" fontSize={16} fill="var(--ink)">
          A
        </text>
        <text x={f(O.x + R + 14)} y={f(O.y + 5)} textAnchor="middle" fontSize={16} fill="var(--ink)">
          B
        </text>
        <text x={f(O.x - R - 14)} y={f(O.y + 5)} textAnchor="middle" fontSize={16} fill="var(--ink)">
          C
        </text>
      </svg>
    </Khung>
  );
}
