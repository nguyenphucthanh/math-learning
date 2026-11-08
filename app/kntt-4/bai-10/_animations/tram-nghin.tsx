"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const X0 = 20;
const GAP = 60;
const ROW_A = [0, 100000, 200000, 300000, 400000, 500000];
const ROW_B = [500000, 600000, 700000, 800000, 900000, 1000000];

function Ruler({ y, values, hideLast, enterLast }: { y: number; values: number[]; hideLast?: boolean; enterLast?: number }) {
  return (
    <g>
      <line x1={X0 - 14} y1={y} x2={X0 + 5 * GAP + 20} y2={y} stroke="var(--ink)" strokeWidth={3} />
      <path d={`M${X0 + 5 * GAP + 20} ${y} l-8 -5 v10 z`} fill="var(--ink)" />
      {values.map((value, index) => {
        const x = X0 + index * GAP;
        const last = index === values.length - 1;
        const label = last && hideLast ? "?" : formatNumber(value);
        return (
          <g key={value} data-enter={last && enterLast ? enterLast : undefined}>
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="var(--ink)" strokeWidth={3} />
            {last && hideLast ? (
              <rect x={x - 16} y={y + 14} width={32} height={30} rx={6} fill="white" stroke="var(--sun)" strokeWidth={3} />
            ) : null}
            <text x={x} y={y + 36} textAnchor="middle" fontSize={14} fill={last && !hideLast && value === 1000000 ? "var(--ink)" : "var(--foreground)"}>
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Đếm thêm từng 100 000 trên hai tia số nối nhau, đến 1 000 000. */
export function TramNghin() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const captions = [
    "Đếm thêm từng 100 000: 100 000, 200 000, 300 000, 400 000, 500 000.",
    "Đếm tiếp: 600 000, 700 000, 800 000, 900 000. Vạch cuối là số nào?",
    "900 000 thêm 100 000 là 1 000 000. Mười lần 100 000 là một triệu.",
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 190"
        role="img"
        aria-label={`Hai tia số đếm thêm 100 000. ${step === 0 ? "Hàng trên từ 0 đến 500 000." : step === 1 ? "Hàng dưới từ 500 000 đến 900 000, vạch cuối chưa biết." : "Hàng dưới kết thúc ở 1 000 000."}`}
        className="block w-full"
        fontWeight={800}
      >
        <Ruler y={34} values={ROW_A} />
        {step >= 1 ? (
          <g data-enter={1}>
            <Ruler y={124} values={ROW_B} hideLast={step === 1} />
          </g>
        ) : null}
        {step >= 2 ? (
          <text data-enter={2} x={X0 + 5 * GAP} y={178} textAnchor="middle" fontSize={14} fill="var(--ink)">
            Một triệu
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
