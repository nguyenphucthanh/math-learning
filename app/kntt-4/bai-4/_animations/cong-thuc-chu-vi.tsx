"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;
const LEFT = 36;
const TOP = 56;
const SIDE = 96;

const captions = [
  "Hình vuông có bốn cạnh bằng nhau. Mỗi cạnh dài a.",
  "Chu vi P là tổng bốn cạnh: P = a × 4. a × 4 là biểu thức chứa một chữ.",
  "Muốn tính chu vi, thay a bằng số đo. Với a = 5 cm: P = 5 × 4 = 20 (cm).",
  "Đổi số đo thì chu vi đổi. Với a = 9 cm: P = 9 × 4 = 36 (cm).",
];

/** Hình vuông cạnh a và công thức chu vi P = a × 4. */
export function CongThucChuVi() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const side = step === 2 ? "5" : step === 3 ? "9" : "a";
  const mid = LEFT + SIDE / 2;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} 230`}
        role="img"
        aria-label={
          step === 0
            ? "Hình vuông có cạnh dài a."
            : step === 1
              ? "Chu vi hình vuông P = a × 4."
              : step === 2
                ? "Với a = 5 cm, P = 5 × 4 = 20 cm."
                : "Với a = 9 cm, P = 9 × 4 = 36 cm."
        }
        className="block w-full"
        fontWeight={800}
      >
        <rect x={LEFT} y={TOP} width={SIDE} height={SIDE} fill="var(--sun)" fillOpacity={0.45} stroke="var(--ink)" strokeWidth={3} />
        <text x={mid} y={TOP - 10} fontSize={20} fill="var(--ink)" textAnchor="middle">{side}</text>
        <text x={mid} y={TOP + SIDE + 26} fontSize={20} fill="var(--ink)" textAnchor="middle">{side}</text>
        <text x={LEFT - 12} y={TOP + SIDE / 2 + 7} fontSize={20} fill="var(--ink)" textAnchor="middle">{side}</text>
        <text x={LEFT + SIDE + 12} y={TOP + SIDE / 2 + 7} fontSize={20} fill="var(--ink)" textAnchor="middle">{side}</text>

        {step >= 1 ? (
          <text data-enter={1} x={170} y={78} fontSize={24} fill="var(--ink)">P = a × 4</text>
        ) : null}
        {step === 2 ? (
          <g data-enter={2}>
            <text x={170} y={122} fontSize={16} fill="var(--ink)">a = 5 cm</text>
            <text x={170} y={152} fontSize={22} fill="var(--ink)">P = 5 × 4 = <tspan fill="var(--good)">20</tspan></text>
          </g>
        ) : null}
        {step === 3 ? (
          <g data-enter={3}>
            <text x={170} y={122} fontSize={16} fill="var(--ink)">a = 9 cm</text>
            <text x={170} y={152} fontSize={22} fill="var(--ink)">P = 9 × 4 = <tspan fill="var(--good)">36</tspan></text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
