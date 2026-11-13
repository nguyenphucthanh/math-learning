"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";

export const rutGonCaptions = [
  "Lớp có 35 bạn, trong đó có 20 bạn nữ. Số bạn nữ bằng 20/35 số học sinh cả lớp.",
  "Nhận xét: 20 và 35 cùng chia hết cho 5.",
  "Chia cả tử số và mẫu số cho 5: 20 : 5 = 4 và 35 : 5 = 7.",
  "Được 4/7. Ta nói phân số 20/35 đã được rút gọn thành phân số 4/7. Tử số và mẫu số bé hơn, giá trị vẫn như cũ.",
];

/** Rút gọn 20/35 = (20 : 5)/(35 : 5) = 4/7. */
export function RutGon() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["20/35", "20 và 35 cùng chia hết cho 5", "20/35 = (20 : 5)/(35 : 5)", "20/35 = (20 : 5)/(35 : 5) = 4/7"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 130" role="img" aria-label={`Rút gọn phân số 20/35: ${label}`} className="block w-full" fontWeight={800}>
        <Ps x={40} y={34} top="20" bottom="35" fill="var(--unit-tan)" />
        {step >= 2 ? (
          <g data-enter={2}>
            <Eq x={88} y={42} />
            <Ps x={160} y={34} top="20 : 5" bottom="35 : 5" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <Eq x={232} y={42} />
            <Ps x={282} y={34} top="4" bottom="7" fill="var(--unit-mm2)" />
          </g>
        ) : null}
        {step >= 1 ? (
          <text data-enter={1} x={170} y={116} fontSize={16} textAnchor="middle" fill="var(--ink)">
            20 và 35 cùng chia hết cho 5
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={rutGonCaptions} onChange={setStep} />
    </figure>
  );
}
