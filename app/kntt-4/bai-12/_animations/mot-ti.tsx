"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const W = 30;
/** Cột 0 là hàng thứ mười (hàng tỉ), cột 1-9 là chín hàng của số có chín chữ số. */
const xOf = (col: number) => 5 + col * W + Math.floor((col + 2) / 3) * 10;

const captions = [
  "999 999 999 là số lớn nhất có chín chữ số: cả chín hàng đều là chữ số 9.",
  "Thêm 1 đơn vị: hàng đơn vị đầy, nhớ sang hàng chục, cứ thế nhớ sang mãi, cho đến hàng trăm triệu.",
  "Số liền sau là 1 000 000 000, đọc là một tỉ. Số này có 10 chữ số: một chữ số 1 và chín chữ số 0.",
];

const labels = [
  "Số 999 999 999, chín chữ số 9",
  "Thêm 1 vào 999 999 999",
  "Kết quả là 1 000 000 000, đọc là một tỉ, có 10 chữ số",
];

/** 999 999 999 thêm 1 là 1 000 000 000: xuất hiện hàng thứ mười. */
export function MotTi() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 200" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {Array.from({ length: 9 }, (_, index) => (
          <g key={index}>
            <rect x={xOf(index + 1)} y={10} width={W - 2} height={44} rx={6} fill="white" stroke="var(--ink)" strokeWidth={3} />
            <text x={xOf(index + 1) + (W - 2) / 2} y={42} textAnchor="middle" fontSize={24} fill="var(--ink)" className="tabular-nums">
              9
            </text>
          </g>
        ))}
        {step >= 1 ? (
          <g data-enter={1}>
            <text x={170} y={84} textAnchor="middle" fontSize={20} fill="var(--ink)">
              + 1
            </text>
            {Array.from({ length: 10 }, (_, col) => (
              <g key={col}>
                <rect
                  x={xOf(col)}
                  y={100}
                  width={W - 2}
                  height={44}
                  rx={6}
                  fill={step >= 2 && col === 0 ? "var(--sun)" : "white"}
                  stroke="var(--ink)"
                  strokeWidth={3}
                />
                <text x={xOf(col) + (W - 2) / 2} y={132} textAnchor="middle" fontSize={24} fill="var(--ink)" className="tabular-nums">
                  {col === 0 ? 1 : 0}
                </text>
              </g>
            ))}
          </g>
        ) : null}
        {step >= 2 ? (
          <text data-enter={2} x={170} y={182} textAnchor="middle" fontSize={20} fill="var(--ink)">
            Một tỉ
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
