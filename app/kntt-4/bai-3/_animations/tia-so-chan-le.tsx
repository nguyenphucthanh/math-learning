"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;
const LEFT = 24;
const SPACING = 26;
const LINE_Y = 80;

const captions = [
  "Đây là tia số từ 0 đến 12.",
  "Các số chẵn: 0, 2, 4, 6, 8, 10, 12. Số 0 cũng là số chẵn vì 0 : 2 = 0.",
  "Các số lẻ: 1, 3, 5, 7, 9, 11. Số chẵn và số lẻ đứng xen kẽ nhau.",
  "Từ số chẵn này sang số chẵn liền sau, con nhảy 2 đơn vị. Hai số chẵn liên tiếp hơn kém nhau 2. Số lẻ cũng vậy.",
];

const points = Array.from({ length: 13 }, (_, value) => value);
const x = (value: number) => LEFT + value * SPACING;

/** Tia số 0-12: số chẵn, số lẻ và bước nhảy 2. */
export function TiaSoChanLe() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} 130`}
        role="img"
        aria-label={
          step === 0
            ? "Tia số từ 0 đến 12."
            : step === 1
              ? "Số chẵn trên tia số: 0, 2, 4, 6, 8, 10, 12."
              : step === 2
                ? "Số lẻ trên tia số: 1, 3, 5, 7, 9, 11."
                : "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị."
        }
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <line x1={LEFT - 10} y1={LINE_Y} x2={WIDTH - 6} y2={LINE_Y} stroke="var(--ink)" strokeWidth={3} />
        <polygon points={`${WIDTH - 2},${LINE_Y} ${WIDTH - 12},${LINE_Y - 6} ${WIDTH - 12},${LINE_Y + 6}`} fill="var(--ink)" />
        {step >= 3
          ? [0, 2, 4, 6, 8, 10].map((value) => (
              <g key={value} data-enter={3}>
                <path d={`M ${x(value)} ${LINE_Y - 14} Q ${x(value) + SPACING} ${LINE_Y - 46} ${x(value + 2)} ${LINE_Y - 14}`} fill="none" stroke="var(--ink)" strokeWidth={2} />
                <text x={x(value) + SPACING} y={LINE_Y - 42} fontSize={14} fill="var(--ink)">
                  +2
                </text>
              </g>
            ))
          : null}
        {points.map((value) => {
          const even = value % 2 === 0;
          const shown = (even && step >= 1) || (!even && step >= 2);
          return (
            <g key={value}>
              <circle
                cx={x(value)}
                cy={LINE_Y}
                r={shown ? 9 : 4}
                fill={shown ? (even ? "var(--ink)" : "var(--sun)") : "var(--input)"}
                stroke={shown && !even ? "var(--ink)" : "none"}
                strokeWidth={2}
              />
              <text x={x(value)} y={LINE_Y + 32} fontSize={14} fill="var(--ink)">
                {value}
              </text>
            </g>
          );
        })}
        {step >= 1 ? (
          <g fontSize={14} textAnchor="start">
            <circle cx={LEFT} cy={118} r={6} fill="var(--ink)" />
            <text x={LEFT + 12} y={123} fill="var(--ink)">
              số chẵn
            </text>
            {step >= 2 ? (
              <g data-enter={2}>
                <circle cx={LEFT + 100} cy={118} r={6} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2} />
                <text x={LEFT + 112} y={123} fill="var(--ink)">
                  số lẻ
                </text>
              </g>
            ) : null}
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
