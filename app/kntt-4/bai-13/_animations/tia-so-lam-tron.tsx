"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const n = formatNumber;

/** Tia số từ 2 600 000 đến 2 800 000: mỗi vạch nhỏ là 10 000. */
const X0 = 40;
const STEP = 13;
const LINE_Y = 100;
const POINT = 2712615;
const xOf = (value: number) => Math.round(X0 + ((value - 2600000) / 10000) * STEP);

const captions = [
  `Số xe bán ra là ${n(POINT)}. Trên tia số, số này nằm giữa hai số tròn trăm nghìn: ${n(2700000)} và ${n(2800000)}.`,
  `${n(POINT)} cách ${n(2700000)} là ${n(12615)}, cách ${n(2800000)} là ${n(87385)}. Số này gần ${n(2700000)} hơn.`,
  `Vạch giữa là ${n(2750000)}. Số nằm bên trái vạch giữa thì làm tròn xuống, nằm bên phải hoặc đúng vạch giữa thì làm tròn lên. ${n(POINT)} ≈ ${n(2700000)}.`,
];

const labels = [
  `Tia số: ${n(POINT)} nằm giữa ${n(2700000)} và ${n(2800000)}`,
  `${n(POINT)} gần ${n(2700000)} hơn ${n(2800000)}`,
  `Vạch giữa ${n(2750000)}: bên trái làm tròn xuống, bên phải làm tròn lên. ${n(POINT)} làm tròn xuống thành ${n(2700000)}`,
];

/** Làm tròn trên tia số: số làm tròn là số tròn trăm nghìn gần nhất. */
export function TiaSoLamTron() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const point = xOf(POINT);
  const low = xOf(2700000);
  const high = xOf(2800000);
  const middle = xOf(2750000);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 200" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {step === 2 ? (
          <g data-enter={2}>
            <rect x={low} y={86} width={middle - low} height={28} fill="var(--sun)" fillOpacity={0.45} />
            <rect x={middle} y={86} width={high - middle} height={28} fill="var(--input)" fillOpacity={0.3} />
          </g>
        ) : null}
        <line x1={X0 - 12} y1={LINE_Y} x2={X0 + 20 * STEP + 12} y2={LINE_Y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        {Array.from({ length: 21 }, (_, index) => {
          const major = index % 10 === 0;
          return (
            <line
              key={index}
              x1={X0 + index * STEP}
              y1={LINE_Y - (major ? 11 : 6)}
              x2={X0 + index * STEP}
              y2={LINE_Y + (major ? 11 : 6)}
              stroke="var(--ink)"
              strokeWidth={major ? 3 : 2}
            />
          );
        })}
        {[2600000, 2700000, 2800000].map((value) => (
          <text key={value} x={xOf(value)} y={128} textAnchor="middle" fontSize={14} fill="var(--ink)" className="tabular-nums">
            {n(value)}
          </text>
        ))}

        <line x1={point} y1={34} x2={point} y2={LINE_Y - 8} stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 3" />
        <text x={point} y={24} textAnchor="middle" fontSize={16} fill="var(--ink)" className="tabular-nums">
          {n(POINT)}
        </text>

        {step === 1 ? (
          <g data-enter={1}>
            <line x1={low} y1={LINE_Y} x2={point} y2={LINE_Y} stroke="var(--good)" strokeWidth={7} strokeLinecap="round" />
            <line x1={point} y1={LINE_Y} x2={high} y2={LINE_Y} stroke="var(--input)" strokeWidth={7} strokeLinecap="round" />
            <path d={`M ${low} 140 v 6 H ${point} v -6`} fill="none" stroke="var(--good)" strokeWidth={3} />
            <path d={`M ${point + 3} 140 v 6 H ${high} v -6`} fill="none" stroke="var(--input)" strokeWidth={3} />
            <text x={low + 8} y={168} textAnchor="middle" fontSize={14} fill="var(--good)" className="tabular-nums">
              {n(12615)}
            </text>
            <text x={(point + high) / 2} y={168} textAnchor="middle" fontSize={14} fill="var(--ink)" className="tabular-nums">
              {n(87385)}
            </text>
          </g>
        ) : null}

        {step === 2 ? (
          <g data-enter={2}>
            <line x1={middle} y1={LINE_Y + 14} x2={middle} y2={148} stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 3" />
            <text x={middle} y={164} textAnchor="middle" fontSize={14} fill="var(--ink)" className="tabular-nums">
              {n(2750000)}
            </text>
            <text x={middle - 6} y={188} textAnchor="end" fontSize={14} fill="var(--ink)">
              làm tròn xuống
            </text>
            <text x={middle + 6} y={188} textAnchor="start" fontSize={14} fill="var(--ink)">
              làm tròn lên
            </text>
          </g>
        ) : null}

        <circle cx={low} cy={LINE_Y} r={step >= 1 ? 8 : 0} fill="var(--good)" stroke="var(--ink)" strokeWidth={2} />
        <circle cx={point} cy={LINE_Y} r={7} fill="var(--sun)" stroke="var(--ink)" strokeWidth={3} />
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
