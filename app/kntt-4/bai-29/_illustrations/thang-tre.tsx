import { Khung } from "@/components/math/khung";
import { polar, type Point, type Seg } from "@/lib/hinh";

const BASE: Point = { x: 70, y: 215 };
const RAIL_DEG = 80;
const RUNG_DEG = RAIL_DEG - 90;

/** Cái thang dựa nghiêng: hai thanh dọc song song, ba bậc song song, bậc thang vuông góc với thanh dọc. */
export const thang = (() => {
  const rail1Start = BASE;
  const rail2Start = polar(BASE, 88, RUNG_DEG);
  const rails: [Seg, Seg] = [
    [rail1Start, polar(rail1Start, 185, RAIL_DEG)],
    [rail2Start, polar(rail2Start, 185, RAIL_DEG)],
  ];
  const rungs: Seg[] = [40, 95, 150].map((t) => {
    const a = polar(rail1Start, t, RAIL_DEG);
    return [a, polar(a, 88, RUNG_DEG)] as Seg;
  });
  return { rails, rungs };
})();

/** Cái thang dựa nghiêng, nhìn từ phía trước. */
export function ThangTre() {
  return (
    <Khung maxWidth={320}>
      <svg viewBox="0 0 300 250" role="img" aria-label="Cái thang dựa nghiêng gồm hai thanh dọc hai bên và ba bậc thang ngang" className="block w-full">
        {thang.rails.map((seg, index) => (
          <line key={`r${index}`} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--ink)" strokeWidth={7} strokeLinecap="round" />
        ))}
        {thang.rungs.map((seg, index) => (
          <line key={`b${index}`} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--unit-yen)" strokeWidth={6} strokeLinecap="round" />
        ))}
      </svg>
    </Khung>
  );
}
