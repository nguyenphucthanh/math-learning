import type { Point } from "../hinh";
import { Khung } from "./khung";

const CENTER: Point = { x: 160, y: 130 };
const RADIUS = 98;
const f = (n: number) => Math.round(n * 10) / 10;

/** 8 ca-bin cách đều 45°, ca-bin đầu tiên lệch trái đỉnh 22,5° (như sách). Góc đo theo chiều kim đồng hồ từ đỉnh. */
export const CABIN_ANGLES = Array.from({ length: 8 }, (_, k) => -22.5 + 45 * k);

export function cabinPosition(theta: number): Point {
  const rad = (theta * Math.PI) / 180;
  return { x: f(CENTER.x + RADIUS * Math.sin(rad)), y: f(CENTER.y - RADIUS * Math.cos(rad)) };
}

/** Số ghi trên các ca-bin thường: đánh số theo chiều kim đồng hồ, bỏ qua ca-bin vàng. */
export function cabinNumbers(yellowIndex: number): Record<number, number> {
  const result: Record<number, number> = {};
  let next = 1;
  for (let k = 0; k < 8; k += 1) {
    if (k === yellowIndex) continue;
    result[k] = next;
    next += 1;
  }
  return result;
}

/** Hai nan hoa vuông góc khi hai ca-bin lệch nhau 90° quanh tâm. */
export function spokesPerpendicular(thetaA: number, thetaB: number): boolean {
  return Math.abs((((thetaA - thetaB) % 180) + 180) % 180 - 90) < 1e-9;
}

/** Đu quay có 8 ca-bin, một ca-bin màu vàng. */
export function DuQuay({ yellowIndex }: { yellowIndex: number }) {
  const numbers = cabinNumbers(yellowIndex);
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 320 270" role="img" aria-label={`Đu quay có 8 ca-bin: 7 ca-bin đánh số từ 1 đến 7 theo chiều kim đồng hồ và 1 ca-bin màu vàng`} className="block w-full" fontWeight={800}>
        <polygon points="160,130 118,252 202,252" fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={2} />
        <line x1={96} y1={254} x2={224} y2={254} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
        <circle cx={CENTER.x} cy={CENTER.y} r={RADIUS} fill="none" stroke="var(--ink)" strokeWidth={2.5} />
        {CABIN_ANGLES.map((theta, k) => {
          const pos = cabinPosition(theta);
          return <line key={k} x1={CENTER.x} y1={CENTER.y} x2={pos.x} y2={pos.y} stroke="var(--ink)" strokeWidth={2.5} />;
        })}
        <circle cx={CENTER.x} cy={CENTER.y} r={6} fill="var(--ink)" />
        {CABIN_ANGLES.map((theta, k) => {
          const pos = cabinPosition(theta);
          const yellow = k === yellowIndex;
          return (
            <g key={k}>
              <rect x={f(pos.x - 17)} y={f(pos.y - 13)} width={34} height={26} rx={5} fill={yellow ? "var(--sun)" : "white"} stroke="var(--ink)" strokeWidth={2.5} />
              {yellow ? null : (
                <text x={pos.x} y={f(pos.y + 6)} textAnchor="middle" fontSize={16} fill="var(--ink)">
                  {numbers[k]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Khung>
  );
}
