"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const X0 = 30;
const GAP = 60;

const captions = [
  "Nhìn hai vạch đầu tiên: từ 52 400 đến 52 401, số tăng thêm 1.",
  "Mỗi vạch thêm 1. Số liền sau hơn 1, số liền trước kém 1.",
  "Tia số này khác: mỗi vạch thêm 10 000. Con luôn tìm bước nhảy trước rồi mới điền số.",
];

function Line({ y, values, step, visible }: { y: number; values: number[]; step: number; visible: number }) {
  return (
    <g>
      <line x1={8} y1={y} x2={346} y2={y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      <path
        d={`M338 ${y - 8} L350 ${y} L338 ${y + 8}`}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {values.map((value, index) => {
        const x = X0 + index * GAP;
        return (
          <g key={value}>
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
            {step >= visible || index < 2 ? (
              <text
                data-enter={index < 2 ? undefined : visible}
                x={x}
                y={y + 30}
                textAnchor="middle"
                fontSize={14}
                fontWeight={800}
                fill="var(--foreground)"
              >
                {formatNumber(value)}
              </text>
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

function Jumps({ y, count, label, step, visible }: { y: number; count: number; label: string; step: number; visible: number }) {
  if (step < visible) return null;
  return (
    <g data-enter={visible}>
      {Array.from({ length: count }, (_, index) => {
        const x1 = X0 + index * GAP + 4;
        const x2 = X0 + (index + 1) * GAP - 4;
        const mid = (x1 + x2) / 2;
        return (
          <g key={index}>
            <path d={`M${x1} ${y - 10} Q${mid} ${y - 36} ${x2} ${y - 10}`} fill="none" stroke="var(--unit-second)" strokeWidth={3} />
            <text x={mid} y={y - 24} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--unit-second)">
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/** Tia số: tìm bước nhảy giữa hai vạch, bước 1 rồi bước 10 000. */
export function TiaSo() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const small = [52400, 52401, 52402, 52403, 52404, 52405];
  const big = [20000, 30000, 40000, 50000, 60000, 70000];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 210"
        role="img"
        aria-label={
          step < 2
            ? `Tia số bước nhảy 1, từ 52 400 đến 52 405. ${step >= 1 ? "Mỗi vạch thêm 1." : "Hai vạch đầu: 52 400 và 52 401."}`
            : "Tia số bước nhảy 1, từ 52 400 đến 52 405, và tia số bước nhảy 10 000, từ 20 000 đến 70 000."
        }
        className="block w-full"
      >
        <Line y={60} values={small} step={step} visible={1} />
        <Jumps y={60} count={5} label="+1" step={step} visible={1} />
        {step >= 2 ? (
          <g data-enter={2}>
            <Line y={160} values={big} step={step} visible={2} />
            {Array.from({ length: 5 }, (_, index) => {
              const x1 = X0 + index * GAP + 4;
              const x2 = X0 + (index + 1) * GAP - 4;
              const mid = (x1 + x2) / 2;
              return (
                <g key={index}>
                  <path d={`M${x1} 150 Q${mid} 124 ${x2} 150`} fill="none" stroke="var(--unit-second)" strokeWidth={3} />
                  <text x={mid} y={136} textAnchor="middle" fontSize={13} fontWeight={800} fill="var(--unit-second)">
                    +10 000
                  </text>
                </g>
              );
            })}
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
