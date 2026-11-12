"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

// 3 hàng áo đỏ và 2 hàng áo vàng, mỗi hàng 15 người.
const COLS = 15;
const RED_ROWS = 3;
const ROWS = 5;
const STEP_X = 20;
const STEP_Y = 24;
const X0 = (340 - COLS * STEP_X) / 2 + STEP_X / 2;
const Y0 = 28;
const RED = "var(--unit-second)";
const YELLOW = "var(--sun)";
const BOTTOM = Y0 + (ROWS - 1) * STEP_Y + 20;

export const nhanVoiTongCaptions = [
  "Đội đồng diễn có 3 hàng mặc áo đỏ và 2 hàng mặc áo vàng. Mỗi hàng có 15 người.",
  "Cách 1: tính tổng số hàng trước. 3 + 2 = 5 hàng, mỗi hàng 15 người. 15 × (3 + 2) = 15 × 5 = 75 người.",
  "Cách 2: tính riêng từng màu áo rồi cộng lại. Áo đỏ: 15 × 3 = 45. Áo vàng: 15 × 2 = 30. 45 + 30 = 75 người.",
  "Cùng một đội, cùng 75 người. Vậy 15 × (3 + 2) = 15 × 3 + 15 × 2.",
];

const labels = ["Chưa nhóm", "Nhóm cả 5 hàng: 15 × (3 + 2) = 75", "Nhóm theo màu áo: 15 × 3 + 15 × 2 = 75", "15 × (3 + 2) = 15 × 3 + 15 × 2"];

/** Cùng 75 người: nhóm cả 5 hàng, hoặc nhóm theo màu áo. */
export function NhanVoiTong() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const top = Y0 - 14;
  const redBottom = Y0 + (RED_ROWS - 1) * STEP_Y + 14;
  const yellowTop = Y0 + RED_ROWS * STEP_Y - 14;
  const left = X0 - 14;
  const width = (COLS - 1) * STEP_X + 28;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 210" role="img" aria-label={`3 hàng áo đỏ và 2 hàng áo vàng, mỗi hàng 15 người. ${labels[step]}.`} className="block w-full">
        {Array.from({ length: ROWS }).flatMap((_, row) =>
          Array.from({ length: COLS }).map((__, col) => (
            <circle key={`${row}-${col}`} cx={X0 + col * STEP_X} cy={Y0 + row * STEP_Y} r={7} fill={row < RED_ROWS ? RED : YELLOW} stroke="var(--ink)" strokeWidth={1.5} />
          )),
        )}
        {step === 1 || step === 3 ? <rect data-enter={1} x={left} y={top} width={width} height={ROWS * STEP_Y + 4} rx={8} fill="none" stroke="var(--ink)" strokeWidth={3} /> : null}
        {step === 2 || step === 3 ? (
          <g data-enter={2}>
            <rect x={left + 2} y={top + 2} width={width - 4} height={redBottom - top - 2} rx={8} fill="none" stroke={RED} strokeWidth={3} strokeDasharray="7 4" />
            <rect x={left + 2} y={yellowTop + 2} width={width - 4} height={top + ROWS * STEP_Y + 4 - yellowTop - 4} rx={8} fill="none" stroke="var(--ink)" strokeWidth={3} strokeDasharray="7 4" />
          </g>
        ) : null}
        <text x={170} y={BOTTOM + 24} textAnchor="middle" fontSize={step === 3 ? 18 : 20} fontWeight={800} fill="var(--ink)" data-enter={step === 0 ? undefined : step}>
          {step === 0 ? "3 hàng đỏ, 2 hàng vàng" : null}
          {step === 1 ? "15 × (3 + 2) = 15 × 5 = 75" : null}
          {step === 2 ? "15 × 3 + 15 × 2 = 45 + 30 = 75" : null}
          {step === 3 ? "15 × (3 + 2) = 15 × 3 + 15 × 2" : null}
        </text>
      </svg>
      <StepControls step={step} captions={nhanVoiTongCaptions} onChange={setStep} />
    </figure>
  );
}
