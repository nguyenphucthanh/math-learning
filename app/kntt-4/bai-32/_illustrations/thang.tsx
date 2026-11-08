import { Khung } from "@/components/math/khung";
import type { Seg } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

/** Cái thang: hai thanh bên nghiêng, xa nhau dần khi đi xuống; hai bậc nằm ngang, song song với nhau. */
export const thanhTrai: Seg = [{ x: 120, y: 10 }, { x: 70, y: 230 }];
export const thanhPhai: Seg = [{ x: 220, y: 10 }, { x: 270, y: 230 }];

const xAt = (seg: Seg, y: number): number => f(seg[0].x + ((y - seg[0].y) * (seg[1].x - seg[0].x)) / (seg[1].y - seg[0].y));

/** Bậc thang ở độ cao y: đoạn nằm ngang nối hai thanh bên. */
export const bac = (y: number): Seg => [
  { x: xAt(thanhTrai, y), y },
  { x: xAt(thanhPhai, y), y },
];

export const bacTren: Seg = bac(80);
export const bacDuoi: Seg = bac(170);

/** Hai bậc thang song song nhưng không bằng nhau. */
export function Thang() {
  return (
    <Khung maxWidth={320}>
      <svg viewBox="0 0 340 240" role="img" aria-label="Cái thang có hai thanh bên nghiêng và hai bậc nằm ngang, song song với nhau" className="block w-full" fontWeight={800}>
        {[thanhTrai, thanhPhai].map((seg, index) => (
          <line key={index} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--ink)" strokeWidth={5} strokeLinecap="round" />
        ))}
        {[bacTren, bacDuoi].map((seg, index) => (
          <g key={index}>
            <line x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--unit-ta)" strokeWidth={5} strokeLinecap="round" />
            <text x={f(seg[1].x + 18)} y={seg[1].y + 6} fontSize={16} fill="var(--unit-ta)">
              {index === 0 ? "a" : "b"}
            </text>
          </g>
        ))}
      </svg>
    </Khung>
  );
}
