"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";

export const truCungMauCaptions = [
  "Tớ có 7/8 cái bánh: cái bánh chia 8 phần bằng nhau, tô màu 7 phần.",
  "Tớ ăn 2/8 cái bánh: lấy đi 2 phần (gạch chéo). Mẫu số vẫn là 8 vì cái bánh vẫn chia 8 phần.",
  "Còn lại 5 phần: 7 − 2 = 5. Ta trừ tử số và giữ nguyên mẫu số: 7/8 − 2/8 = 5/8.",
];

const CELL = 38;
const X0 = 18;

/** Băng 8 ô: 7/8 trừ đi 2/8. */
export function TruCungMau() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["băng 8 ô, tô màu 7 ô", "lấy đi 2 ô tô màu, còn 5 ô", "7/8 trừ 2/8 bằng 5/8"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 170" role="img" aria-label={`Trừ cùng mẫu số 7/8 − 2/8: ${label}`} className="block w-full" fontWeight={800}>
        <g stroke="var(--ink)" strokeWidth={2.5}>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={X0 + i * CELL} y={12} width={CELL} height={CELL + 6} rx={4} fill={i < 7 ? "var(--unit-tan)" : "white"} fillOpacity={i < 7 ? (step >= 1 && i >= 5 ? 0.2 : 0.6) : 1} />
          ))}
        </g>
        {step >= 1 ? (
          <g data-enter={1} stroke="var(--oops)" strokeWidth={4} strokeLinecap="round">
            {[5, 6].map((i) => (
              <g key={i}>
                <line x1={X0 + i * CELL + 8} y1={20} x2={X0 + (i + 1) * CELL - 8} y2={44} />
                <line x1={X0 + (i + 1) * CELL - 8} y1={20} x2={X0 + i * CELL + 8} y2={44} />
              </g>
            ))}
          </g>
        ) : null}
        <Ps x={44} y={112} top="7" bottom="8" fill="var(--unit-tan)" />
        {step >= 1 ? (
          <g data-enter={1}>
            <Eq x={84} y={118} text="−" />
            <Ps x={124} y={112} top="2" bottom="8" fill="var(--oops)" />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <Eq x={164} y={118} />
            <Ps x={214} y={112} top="7 − 2" bottom="8" />
            <Eq x={264} y={118} />
            <Ps x={304} y={112} top="5" bottom="8" fill="var(--good)" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={truCungMauCaptions} onChange={setStep} />
    </figure>
  );
}
