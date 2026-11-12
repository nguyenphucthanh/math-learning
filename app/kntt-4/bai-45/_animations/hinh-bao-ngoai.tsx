"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const baoNgoaiCaptions = [
  "Mảnh vườn A dài 39 m, rộng 19 m. Nam nói diện tích A lớn hơn 800 m². Có đúng không?",
  "Làm tròn 39 lên 40, làm tròn 19 lên 20. Mảnh vườn 40 m × 20 m bao ngoài mảnh vườn A, vì cả hai cạnh đều dài hơn.",
  "Diện tích hình bao ngoài là 40 × 20 = 800 (m²). A nằm gọn trong đó nên diện tích A bé hơn 800 m². Nam sai.",
];

const U = 6;

/** Làm tròn lên cả hai cạnh thì hình mới bao ngoài hình cũ, nên diện tích thật bé hơn. */
export function HinhBaoNgoai() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["chưa làm tròn", "hình 40 m × 20 m bao ngoài", "diện tích A bé hơn 800 m²"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 220" role="img" aria-label={`Mảnh vườn A 39 m × 19 m: ${label}`} className="block w-full" fontWeight={800}>
        <rect x={50} y={50} width={39 * U} height={19 * U} fill="var(--unit-m2-soft)" stroke="var(--unit-m2)" strokeWidth={3} />
        <text x={50 + (39 * U) / 2} y={196} fontSize={18} textAnchor="middle" fill="var(--ink)">39 m</text>
        <text x={316} y={50 + (19 * U) / 2 + 6} fontSize={18} textAnchor="middle" fill="var(--ink)">19 m</text>
        <text x={170} y={95} fontSize={22} textAnchor="middle" fill="var(--ink)">A</text>
        {step >= 1 ? (
          <g data-enter={1}>
            <rect x={50} y={50} width={40 * U} height={20 * U} fill="none" stroke="var(--sun)" strokeWidth={4} strokeDasharray="10 6" />
            <text x={50 + (40 * U) / 2} y={36} fontSize={18} textAnchor="middle" fill="var(--ink)">40 m</text>
            <text x={24} y={50 + (20 * U) / 2 + 6} fontSize={18} textAnchor="middle" fill="var(--ink)">20 m</text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={170} y={135} fontSize={22} textAnchor="middle" fill="var(--ink)">40 × 20 = 800</text>
            <text x={170} y={160} fontSize={20} textAnchor="middle" fill="var(--ink)">A bé hơn 800</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={baoNgoaiCaptions} onChange={setStep} />
    </figure>
  );
}
