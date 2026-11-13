"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";

export const toiGianCaptions = [
  "Rút gọn 48/60. Hai số cùng chia hết cho 2.",
  "Chia cho 2 được 24/30. Chưa dừng được: 24 và 30 vẫn cùng chia hết cho 2 (và 3, 6).",
  "Chia tiếp cho 2 được 12/15. Vẫn chưa dừng: 12 và 15 cùng chia hết cho 3.",
  "Chia cho 3 được 4/5. Không số tự nhiên nào lớn hơn 1 chia hết cả 4 và 5, nên 4/5 là phân số tối giản. Dừng ở đây.",
];

/** Rút gọn từng bước đến phân số tối giản: 48/60 → 24/30 → 12/15 → 4/5. */
export function ToiGian() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["48/60", "48/60 = 24/30, chưa tối giản", "24/30 = 12/15, chưa tối giản", "12/15 = 4/5, phân số tối giản"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 230" role="img" aria-label={`Rút gọn đến phân số tối giản: ${label}`} className="block w-full" fontWeight={800}>
        <Ps x={40} y={34} top="48" bottom="60" fill="var(--unit-tan)" />
        {step >= 1 ? (
          <g data-enter={1}>
            <Eq x={88} y={42} />
            <Ps x={160} y={34} top="48 : 2" bottom="60 : 2" />
            <Eq x={232} y={42} />
            <Ps x={282} y={34} top="24" bottom="30" />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <Ps x={40} y={110} top="24" bottom="30" />
            <Eq x={88} y={118} />
            <Ps x={160} y={110} top="24 : 2" bottom="30 : 2" />
            <Eq x={232} y={118} />
            <Ps x={282} y={110} top="12" bottom="15" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <Ps x={40} y={186} top="12" bottom="15" />
            <Eq x={88} y={194} />
            <Ps x={160} y={186} top="12 : 3" bottom="15 : 3" />
            <Eq x={232} y={194} />
            <Ps x={282} y={186} top="4" bottom="5" fill="var(--good)" />
            <text x={326} y={196} fontSize={26} fill="var(--good)" textAnchor="end">✓</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={toiGianCaptions} onChange={setStep} />
    </figure>
  );
}
