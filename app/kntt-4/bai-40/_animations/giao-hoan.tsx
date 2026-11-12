"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const COLS = 4;
const ROWS = 3;
const GAP = 64;
const X0 = 52;
const Y0 = 36;
const COLORS = ["var(--unit-second)", "var(--unit-ta)", "var(--unit-cm2)", "var(--unit-dm2)"];

export const giaoHoanCaptions = [
  "Trên bảng có 12 mặt cười xếp thành hàng và cột. Có bao nhiêu mặt cười?",
  "Đếm theo cột: có 4 cột, mỗi cột có 3 mặt cười, nên có 3 × 4 mặt cười.",
  "Đếm theo hàng: có 3 hàng, mỗi hàng có 4 mặt cười, nên có 4 × 3 mặt cười.",
  "Cả hai cách đều đếm đúng 12 mặt cười. Vậy 3 × 4 = 4 × 3.",
];

/** Mặt cười xếp 3 hàng, 4 cột; tô theo cột rồi theo hàng để thấy cùng một số lượng. */
export function GiaoHoan() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const mode = step === 1 ? "cot" : step === 2 ? "hang" : "none";
  const colorOf = (row: number, col: number) => (mode === "cot" ? COLORS[col] : mode === "hang" ? COLORS[row] : "var(--ink)");
  const label = ["Chưa đếm", "Đếm theo 4 cột, mỗi cột 3 mặt cười", "Đếm theo 3 hàng, mỗi hàng 4 mặt cười", "3 × 4 = 4 × 3 = 12"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 190" role="img" aria-label={`12 mặt cười xếp 3 hàng 4 cột. ${label}.`} className="block w-full">
        <rect x={8} y={8} width={324} height={140} rx={14} fill="var(--grid)" opacity={0.5} />
        {Array.from({ length: ROWS }).flatMap((_, row) =>
          Array.from({ length: COLS }).map((__, col) => {
            const cx = X0 + col * GAP;
            const cy = Y0 + row * 44 + 14;
            const color = colorOf(row, col);
            return (
              <g key={`${row}-${col}`}>
                <circle cx={cx} cy={cy} r={17} fill="var(--paper)" stroke={color} strokeWidth={3} />
                <circle cx={cx - 6} cy={cy - 4} r={2.2} fill={color} />
                <circle cx={cx + 6} cy={cy - 4} r={2.2} fill={color} />
                <path d={`M${cx - 7} ${cy + 4} Q${cx} ${cy + 11} ${cx + 7} ${cy + 4}`} stroke={color} strokeWidth={2.5} fill="none" strokeLinecap="round" />
              </g>
            );
          }),
        )}
        {step === 1 ? (
          <g data-enter={1}>
            {Array.from({ length: COLS }).map((_, col) => (
              <text key={col} x={X0 + col * GAP} y={166} textAnchor="middle" fontSize={16} fontWeight={800} fill={COLORS[col]}>
                3
              </text>
            ))}
          </g>
        ) : null}
        {step === 2 ? (
          <g data-enter={2}>
            {Array.from({ length: ROWS }).map((_, row) => (
              <text key={row} x={X0 + COLS * GAP - 14} y={Y0 + row * 44 + 20} fontSize={16} fontWeight={800} fill={COLORS[row]}>
                4
              </text>
            ))}
          </g>
        ) : null}
        {step === 3 ? (
          <text data-enter={3} x={170} y={176} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
            3 × 4 = 4 × 3
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={giaoHoanCaptions} onChange={setStep} />
    </figure>
  );
}
