import { Khung } from "@/components/math/khung";

const f = (n: number) => Math.round(n * 10) / 10;

/** Góc của kim giờ và kim phút, tính bằng độ, từ số 12 theo chiều kim đồng hồ. */
export function handAngles(hour: number, minute = 0) {
  return { hour: (hour % 12) * 30 + minute * 0.5, minute: minute * 6 };
}

/** Góc nhỏ hơn hoặc bằng 180 độ giữa hai kim. */
export function angleBetweenHands(hour: number, minute = 0): number {
  const { hour: h, minute: m } = handAngles(hour, minute);
  const diff = Math.abs(h - m) % 360;
  return diff > 180 ? 360 - diff : diff;
}

const C = 100;
const at = (angle: number, r: number) => ({ x: f(C + r * Math.sin((angle * Math.PI) / 180)), y: f(C - r * Math.cos((angle * Math.PI) / 180)) });

/** Đồng hồ kim chỉ `hour` giờ `minute` phút. */
export function DongHo({ hour, minute = 0 }: { hour: number; minute?: number }) {
  const angles = handAngles(hour, minute);
  const hourTip = at(angles.hour, 46);
  const minuteTip = at(angles.minute, 70);
  return (
    <Khung maxWidth={240}>
      <svg viewBox="0 0 200 200" role="img" aria-label={`Đồng hồ chỉ ${hour} giờ${minute ? ` ${minute} phút` : ""}`} className="block w-full" fontWeight={800}>
        <circle cx={C} cy={C} r={94} fill="var(--paper)" stroke="var(--ink)" strokeWidth={5} />
        {Array.from({ length: 12 }, (_, k) => {
          const n = k === 0 ? 12 : k;
          const p = at(k * 30, 76);
          return (
            <text key={n} x={p.x} y={p.y + 6} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {n}
            </text>
          );
        })}
        <line x1={C} y1={C} x2={hourTip.x} y2={hourTip.y} stroke="var(--unit-ta)" strokeWidth={7} strokeLinecap="round" />
        <line x1={C} y1={C} x2={minuteTip.x} y2={minuteTip.y} stroke="var(--unit-second)" strokeWidth={4.5} strokeLinecap="round" />
        <circle cx={C} cy={C} r={5} fill="var(--ink)" />
      </svg>
    </Khung>
  );
}
