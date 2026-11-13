"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";

export const chiaDoanCaptions = [
  "Thanh sắt dài 3/2 m, gồm 1 m và 1/2 m. Cắt thành các đoạn, mỗi đoạn dài 1/8 m.",
  "Mỗi 1 m cắt được 8 đoạn 1/8 m. Vậy 1 m có 8 đoạn.",
  "1/2 m cắt được 4 đoạn (nửa của 8). Cả thanh có 8 + 4 = 12 đoạn.",
  "Mỗi 1 m có 8 đoạn, tức là nhân với 8. Số 8 chính là 8/1, phân số đảo ngược của 1/8. Vậy 3/2 : 1/8 = 3/2 × 8/1 = 12.",
];

const X = 20;
const PW = 25;
const Y = 62;
const H = 44;

/** Chia phân số: 3/2 m cắt thành các đoạn 1/8 m. Đếm 12 đoạn, từ đó chia cho 1/8 là nhân với 8/1. */
export function ChiaDoan() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const now = ["thanh sắt 3/2 m", "1 m cắt được 8 đoạn", "1/2 m cắt được 4 đoạn, cả thanh 12 đoạn", "3/2 : 1/8 = 3/2 × 8/1 = 12"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 240" role="img" aria-label={`Chia phân số: ${now}`} className="block w-full" fontWeight={800}>
        <text x={X + 150} y={44} textAnchor="middle" fontSize={18} fill="var(--foreground)">3/2 m</text>
        <rect x={X} y={Y} width={12 * PW} height={H} fill="white" stroke="var(--ink)" strokeWidth={3} />
        {step === 0 ? <rect x={X} y={Y} width={12 * PW} height={H} fill="var(--sun)" fillOpacity={0.5} stroke="var(--ink)" strokeWidth={3} /> : null}
        {Array.from({ length: 12 }, (_, i) => {
          const first = i < 8;
          const n = first ? 1 : 2;
          return step >= n ? (
            <g key={i} data-enter={n}>
              <rect x={X + i * PW} y={Y} width={PW} height={H} fill={first ? "var(--unit-tan)" : "var(--unit-mm2)"} fillOpacity={0.35} stroke="var(--ink)" strokeWidth={1.5} />
              <text x={X + i * PW + PW / 2} y={Y + 28} textAnchor="middle" fontSize={14} fill="var(--ink)">{i + 1}</text>
            </g>
          ) : null;
        })}
        <line x1={X + 8 * PW} y1={Y - 6} x2={X + 8 * PW} y2={Y + H + 8} stroke="var(--ink)" strokeWidth={3} />
        <text x={X + 4 * PW} y={Y + H + 28} textAnchor="middle" fontSize={16} fill="var(--foreground)">1 m</text>
        <text x={X + 10 * PW} y={Y + H + 28} textAnchor="middle" fontSize={16} fill="var(--foreground)">1/2 m</text>
        {step >= 1 ? <text data-enter={1} x={X + 4 * PW} y={Y - 12} textAnchor="middle" fontSize={16} fill="var(--unit-tan)">8 đoạn</text> : null}
        {step >= 2 ? <text data-enter={2} x={X + 10 * PW} y={Y - 12} textAnchor="middle" fontSize={16} fill="var(--unit-mm2)">4 đoạn</text> : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <Ps x={30} y={186} top="3" bottom="2" />
            <Eq x={62} y={186} text=":" />
            <Ps x={94} y={186} top="1" bottom="8" />
            <Eq x={126} y={186} />
            <Ps x={158} y={186} top="3" bottom="2" />
            <Eq x={190} y={186} text="×" />
            <Ps x={222} y={186} top="8" bottom="1" fill="var(--unit-tan)" />
            <Eq x={254} y={186} />
            <text x={292} y={194} fontSize={28} textAnchor="middle" fill="var(--good)">12</text>
            <text x={222} y={226} textAnchor="middle" fontSize={14} fill="var(--foreground)">đảo ngược của 1/8</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={chiaDoanCaptions} onChange={setStep} />
    </figure>
  );
}
