"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const X0 = 40;
const GAP = 70;
const LABELS = ["999 996", "999 997", "999 998", "999 999", "1 000 000"];

/** Tia số quanh 1 000 000: số liền sau của 999 999, rồi đếm chữ số. */
export function LienSauTrieu() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const captions = [
    "Trên tia số, mỗi vạch hơn vạch trước 1 đơn vị: 999 996, 999 997, 999 998, 999 999.",
    "Vạch tiếp theo hơn 999 999 là 1 đơn vị. Đó là số nào?",
    "Số liền sau của 999 999 là 1 000 000. Đọc là: một triệu.",
    "999 999 có 6 chữ số. 1 000 000 có 7 chữ số: chữ số 1 và sáu chữ số 0.",
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 170"
        role="img"
        aria-label={`Tia số các số 999 996, 999 997, 999 998, 999 999${step >= 1 ? " và vạch liền sau" : ""}. ${step >= 2 ? "Vạch cuối là 1 000 000, đọc là một triệu." : "Vạch cuối chưa ghi số."}${step >= 3 ? " 1 000 000 có 7 chữ số." : ""}`}
        className="block w-full"
        fontWeight={800}
      >
        <line x1={14} y1={60} x2={346} y2={60} stroke="var(--ink)" strokeWidth={3} />
        <path d="M346 60 l-8 -5 v10 z" fill="var(--ink)" />
        {LABELS.map((label, index) => {
          const x = X0 + index * GAP;
          const last = index === LABELS.length - 1;
          return (
            <g key={label}>
              <line x1={x} y1={52} x2={x} y2={68} stroke="var(--ink)" strokeWidth={3} />
              {last && step === 1 ? (
                <rect x={x - 16} y={76} width={32} height={30} rx={6} fill="white" stroke="var(--sun)" strokeWidth={3} />
              ) : null}
              {last && step === 1 ? (
                <text x={x} y={98} textAnchor="middle" fontSize={16} fill="var(--ink)">
                  ?
                </text>
              ) : null}
              {!last || step >= 2 ? (
                <text
                  data-enter={last ? 2 : undefined}
                  x={x}
                  y={96}
                  textAnchor="middle"
                  fontSize={14}
                  fill={last ? "var(--ink)" : "var(--foreground)"}
                >
                  {label}
                </text>
              ) : null}
              {last && step >= 2 ? <rect data-enter={2} x={x - 36} y={78} width={72} height={26} rx={8} fill="var(--sun)" opacity={0.35} /> : null}
            </g>
          );
        })}
        {step >= 1
          ? [0, 1, 2, 3].map((index) => (
              <text key={index} data-enter={1} x={X0 + index * GAP + GAP / 2} y={42} textAnchor="middle" fontSize={14} fill="var(--ink)">
                +1
              </text>
            ))
          : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <text x={14} y={138} fontSize={14} fill="var(--foreground)">
              999 999: 6 chữ số
            </text>
            <text x={14} y={160} fontSize={14} fill="var(--ink)">
              1 000 000: 7 chữ số (một chữ số 1, sáu chữ số 0)
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
