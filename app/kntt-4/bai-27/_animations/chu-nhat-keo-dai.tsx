"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "../_illustrations/khung";
import { useRef, useState } from "react";

const A = { x: 130, y: 70 };
const B = { x: 250, y: 70 };
const C = { x: 250, y: 150 };
const D = { x: 130, y: 150 };

const captions = [
  "Đây là hình chữ nhật ABCD. Con nhớ hình chữ nhật có bốn góc vuông.",
  "Kéo dài cạnh AB về hai phía, ta được một đường thẳng. Đường này đi qua A và B.",
  "Kéo dài cạnh AD về hai phía, ta được đường thẳng thứ hai, đi qua A và D.",
  "Hai đường thẳng này cắt nhau tại A và tạo ra góc vuông. Ta nói: hai đường thẳng AB và AD vuông góc với nhau.",
];

/** Kéo dài hai cạnh liền nhau của hình chữ nhật để thấy hai đường thẳng vuông góc. */
export function ChuNhatKeoDai() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 220"
        role="img"
        aria-label={
          step === 0
            ? "Hình chữ nhật ABCD"
            : step === 1
              ? "Hình chữ nhật ABCD, cạnh AB được kéo dài thành một đường thẳng"
              : step === 2
                ? "Hình chữ nhật ABCD, cạnh AB và cạnh AD đều được kéo dài thành hai đường thẳng"
                : "Hai đường thẳng AB và AD cắt nhau tại A, tạo thành góc vuông"
        }
        className="block w-full"
        fontWeight={800}
      >
        <rect x={A.x} y={A.y} width={B.x - A.x} height={D.y - A.y} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} />
        {step >= 1 ? (
          <line data-enter={1} x1={30} y1={A.y} x2={340} y2={A.y} stroke="var(--unit-yen)" strokeWidth={4} strokeLinecap="round" />
        ) : null}
        {step >= 2 ? (
          <line data-enter={2} x1={A.x} y1={14} x2={A.x} y2={206} stroke="var(--unit-ta)" strokeWidth={4} strokeLinecap="round" />
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <RightMark at={A} toward1={B} toward2={D} size={16} />
          </g>
        ) : null}
        {[
          ["A", A.x - 18, A.y - 10],
          ["B", B.x + 14, B.y - 10],
          ["C", C.x + 14, C.y + 20],
          ["D", D.x - 18, D.y + 20],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
