"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const TOP = "52361".split("");
const BOTTOM = "52348".split("");
const BOX = 50;
const X0 = 50;

const captions = [
  "So sánh 52 361 và 52 348. Cả hai số đều có 5 chữ số, nên ta so từng hàng.",
  "Đi từ trái sang phải, bắt đầu ở hàng cao nhất. Chữ số 5, 2, 3 đều giống nhau, ta đi tiếp.",
  "Đến hàng chục thì khác nhau: 6 lớn hơn 4. Vậy 52 361 lớn hơn 52 348.",
];

/** So sánh hai số cùng số chữ số: đi từ hàng cao nhất, dừng ở chữ số khác nhau đầu tiên. */
export function SoSanh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 320 210"
        role="img"
        aria-label={`So sánh 52 361 và 52 348. ${step === 1 ? "Ba chữ số đầu giống nhau." : ""}${step >= 2 ? "Hàng chục khác nhau, 6 lớn hơn 4, nên 52 361 lớn hơn 52 348." : ""}`}
        className="block w-full"
        fontWeight={800}
      >
        {[TOP, BOTTOM].map((digits, row) =>
          digits.map((digit, col) => {
            const x = X0 + col * (BOX + 2);
            const y = 10 + row * 90;
            const decisive = step >= 2 && col === 3;
            return (
              <g key={`${row}-${col}`}>
                <rect
                  x={x}
                  y={y}
                  width={BOX - 4}
                  height={56}
                  rx={8}
                  fill={decisive ? "var(--sun)" : "var(--paper)"}
                  stroke={decisive ? "var(--ink)" : "var(--input)"}
                  strokeWidth={3}
                />
                <text x={x + (BOX - 4) / 2} y={y + 40} textAnchor="middle" fontSize={34} fill="var(--ink)">
                  {digit}
                </text>
              </g>
            );
          }),
        )}
        {step >= 1
          ? [0, 1, 2].map((col) => (
              <text
                key={col}
                data-enter={1}
                x={X0 + col * (BOX + 2) + (BOX - 4) / 2}
                y={88}
                textAnchor="middle"
                fontSize={26}
                fill="var(--good)"
              >
                =
              </text>
            ))
          : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={X0 + 3 * (BOX + 2) + (BOX - 4) / 2} y={88} textAnchor="middle" fontSize={26} fill="var(--ink)">
              &gt;
            </text>
            <text x={160} y={196} textAnchor="middle" fontSize={22} fill="var(--ink)">
              52 361 &gt; 52 348
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
