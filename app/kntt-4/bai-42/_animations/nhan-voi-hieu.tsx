"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

// 4 hàng, mỗi hàng 6 chấm. Bớt 2 cột cuối: còn 4 × (6 − 2).
const ROWS = 4;
const COLS = 6;
const KEEP = 4;
const STEP = 38;
const X0 = (340 - COLS * STEP) / 2 + STEP / 2;
const Y0 = 28;
const COLOR = "var(--unit-cm2)";

export const nhanVoiHieuCaptions = [
  "Có 4 hàng, mỗi hàng 6 chấm. Cả thảy 4 × 6 = 24 chấm.",
  "Bớt đi 2 cột cuối. Mỗi cột có 4 chấm, nên bớt 4 × 2 = 8 chấm.",
  "Còn 4 hàng, mỗi hàng 6 − 2 = 4 chấm. 4 × (6 − 2) = 4 × 4 = 16 chấm.",
  "Đếm cách nào cũng còn 16 chấm. Vậy 4 × (6 − 2) = 4 × 6 − 4 × 2.",
];

const labels = ["Chưa bớt", "Bớt 2 cột: 4 × 6 − 4 × 2 = 24 − 8 = 16", "Còn lại: 4 × (6 − 2) = 16", "4 × (6 − 2) = 4 × 6 − 4 × 2"];

/** 4 × (6 − 2) = 4 × 6 − 4 × 2: bớt 2 cột khỏi 6 cột. */
export function NhanVoiHieu() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const removed = (col: number) => step >= 1 && col >= KEEP;
  const bottom = Y0 + (ROWS - 1) * STEP + 30;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 220" role="img" aria-label={`4 hàng, mỗi hàng 6 chấm. ${labels[step]}.`} className="block w-full">
        {Array.from({ length: ROWS }).flatMap((_, row) =>
          Array.from({ length: COLS }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={X0 + col * STEP}
              cy={Y0 + row * STEP}
              r={13}
              fill={removed(col) ? "var(--paper)" : COLOR}
              fillOpacity={removed(col) ? 1 : 0.9}
              stroke={removed(col) ? "var(--input)" : "var(--ink)"}
              strokeWidth={2}
              strokeDasharray={removed(col) ? "4 3" : undefined}
            />
          )),
        )}
        {step === 0 ? (
          <text x={170} y={bottom + 12} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
            4 × 6 = 24
          </text>
        ) : null}
        {step === 1 ? (
          <text data-enter={1} x={170} y={bottom + 12} textAnchor="middle" fontSize={19} fontWeight={800} fill="var(--ink)">
            Bớt 4 × 2 = 8: 24 − 8 = 16
          </text>
        ) : null}
        {step === 2 ? (
          <text data-enter={2} x={170} y={bottom + 12} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
            4 × (6 − 2) = 4 × 4 = 16
          </text>
        ) : null}
        {step === 3 ? (
          <text data-enter={3} x={170} y={bottom + 12} textAnchor="middle" fontSize={19} fontWeight={800} fill="var(--ink)">
            4 × (6 − 2) = 4 × 6 − 4 × 2
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={nhanVoiHieuCaptions} onChange={setStep} />
    </figure>
  );
}
