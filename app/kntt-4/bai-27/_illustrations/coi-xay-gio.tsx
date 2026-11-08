import { lineThrough, type Point, type Seg } from "@/lib/hinh";
import { Khung } from "@/components/math/khung";

const HUB: Point = { x: 160, y: 84 };

/** Các đường trong tranh, dùng để vẽ và để test kiểm tra lại bằng tọa độ. */
export const windmill = {
  sailAC: lineThrough(HUB, 45, 62) as Seg,
  sailBD: lineThrough(HUB, 135, 62) as Seg,
  ground: [{ x: 10, y: 190 }, { x: 310, y: 190 }] as Seg,
  towerLeft: [{ x: 122, y: 190 }, { x: 146, y: 100 }] as Seg,
  towerRight: [{ x: 198, y: 190 }, { x: 174, y: 100 }] as Seg,
};

/** Tranh cối xay gió: hai thanh cánh quạt AC và BD cắt nhau tại tâm. */
export function CoiXayGio() {
  const { sailAC, sailBD, ground, towerLeft, towerRight } = windmill;
  const f = (n: number) => Math.round(n);
  return (
    <Khung maxWidth={400}>
      <svg viewBox="0 0 320 210" role="img" aria-label="Tranh cối xay gió: hai thanh cánh quạt AC và BD cắt nhau, tháp có hai cạnh bên, dưới là mặt đất" className="block w-full">
        <rect x={0} y={0} width={320} height={190} fill="var(--unit-second-soft)" />
        <polygon points="122,190 198,190 174,100 146,100" fill="var(--unit-century-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <line x1={ground[0].x} y1={ground[0].y} x2={ground[1].x} y2={ground[1].y} stroke="var(--ink)" strokeWidth={4} />
        <line x1={towerLeft[0].x} y1={towerLeft[0].y} x2={towerLeft[1].x} y2={towerLeft[1].y} stroke="var(--ink)" strokeWidth={3} />
        <line x1={towerRight[0].x} y1={towerRight[0].y} x2={towerRight[1].x} y2={towerRight[1].y} stroke="var(--ink)" strokeWidth={3} />
        {[sailAC, sailBD].map((seg, index) => (
          <line key={index} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--unit-cm2)" strokeWidth={7} strokeLinecap="round" />
        ))}
        <circle cx={HUB.x} cy={HUB.y} r={6} fill="var(--ink)" />
        {[
          ["A", sailAC[0]],
          ["C", sailAC[1]],
          ["B", sailBD[0]],
          ["D", sailBD[1]],
        ].map(([name, p]) => {
          const point = p as Point;
          return (
            <text key={name as string} x={f(point.x + (point.x < HUB.x ? -12 : 12))} y={f(point.y + (point.y < HUB.y ? -6 : 16))} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
              {name as string}
            </text>
          );
        })}
      </svg>
    </Khung>
  );
}
