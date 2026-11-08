"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const X0 = 24;
const DX = 29;
const LINE_Y = 90;
const VIEW_CENTER = 170;
const xOf = (value: number) => X0 + value * DX;

const captions = [
  "Các số 0, 1, 2, 3, … sắp xếp từ bé đến lớn tạo thành dãy số tự nhiên. Trên tia số, mỗi vạch là một số.",
  "Số 0 là số tự nhiên bé nhất. Bên trái số 0 không còn số tự nhiên nào.",
  "Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị. Số liền trước của 7 là 6, số liền sau của 7 là 8. Hai số đó hơn kém nhau 2 đơn vị.",
  "Cứ thêm 1 đơn vị lại được một số tự nhiên lớn hơn. Vì vậy không có số tự nhiên lớn nhất.",
];
const labels = [
  "Tia số từ 0 đến 10 với mũi tên đi tiếp về bên phải",
  "Số 0 là số tự nhiên bé nhất, bên trái không có số tự nhiên",
  "Số 7 có số liền trước là 6 và số liền sau là 8",
  "Dãy số tự nhiên đi mãi về bên phải, không có số tự nhiên lớn nhất",
];

/** Dãy số tự nhiên trên tia số: số bé nhất là 0, liền trước và liền sau, không có số lớn nhất. */
export function DayTuNhien() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 190" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        <line x1={X0 - 10} y1={LINE_Y} x2={332} y2={LINE_Y} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        <path d={`M 322 ${LINE_Y - 8} L 334 ${LINE_Y} L 322 ${LINE_Y + 8}`} fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        {Array.from({ length: 11 }, (_, value) => (
          <g key={value}>
            <line x1={xOf(value)} y1={LINE_Y - 8} x2={xOf(value)} y2={LINE_Y + 8} stroke="var(--ink)" strokeWidth={3} />
            <text x={xOf(value)} y={LINE_Y + 30} textAnchor="middle" fontSize={16} fill="var(--ink)" className="tabular-nums">
              {value}
            </text>
          </g>
        ))}

        {step === 1 ? (
          <g data-enter={1}>
            <text x={xOf(0) + 4} y={44} textAnchor="start" fontSize={16} fill="var(--ink)">
              0: số bé nhất
            </text>
            <path d={`M ${xOf(0)} ${LINE_Y - 14} v -28`} stroke="var(--ink)" strokeWidth={2} fill="none" />
            <text x={xOf(0) + 4} y={150} textAnchor="start" fontSize={14} fill="var(--oops)">
              ← không có số tự nhiên nào bé hơn 0
            </text>
          </g>
        ) : null}

        {step === 2 ? (
          <g data-enter={2}>
            <path d={`M ${xOf(6)} ${LINE_Y - 14} Q ${(xOf(6) + xOf(7)) / 2} ${LINE_Y - 44} ${xOf(7)} ${LINE_Y - 14}`} fill="none" stroke="var(--good)" strokeWidth={3} />
            <path d={`M ${xOf(7)} ${LINE_Y - 14} Q ${(xOf(7) + xOf(8)) / 2} ${LINE_Y - 44} ${xOf(8)} ${LINE_Y - 14}`} fill="none" stroke="var(--good)" strokeWidth={3} />
            <text x={(xOf(6) + xOf(7)) / 2} y={LINE_Y - 52} textAnchor="middle" fontSize={16} fill="var(--ink)">
              +1
            </text>
            <text x={(xOf(7) + xOf(8)) / 2} y={LINE_Y - 52} textAnchor="middle" fontSize={16} fill="var(--ink)">
              +1
            </text>
            <text x={xOf(6)} y={34} textAnchor="middle" fontSize={14} fill="var(--ink)">
              liền trước
            </text>
            <text x={xOf(8)} y={34} textAnchor="middle" fontSize={14} fill="var(--ink)">
              liền sau
            </text>
            <path d={`M ${xOf(6)} 138 v 6 H ${xOf(8)} v -6`} fill="none" stroke="var(--ink)" strokeWidth={3} />
            <text x={xOf(7)} y={166} textAnchor="middle" fontSize={14} fill="var(--ink)">
              hơn kém nhau 2 đơn vị
            </text>
          </g>
        ) : null}

        {step === 3 ? (
          <g data-enter={3}>
            <text x={xOf(10) + 14} y={LINE_Y - 12} textAnchor="start" fontSize={20} fill="var(--ink)">
              …
            </text>
            <text x={VIEW_CENTER} y={150} textAnchor="middle" fontSize={16} fill="var(--ink)">
              Không có số tự nhiên lớn nhất
            </text>
          </g>
        ) : null}

        <circle cx={xOf(0)} cy={LINE_Y} r={step === 1 ? 9 : 6} fill={step === 1 ? "var(--sun)" : "var(--ink)"} stroke="var(--ink)" strokeWidth={3} />
        {step === 2 ? <circle cx={xOf(7)} cy={LINE_Y} r={9} fill="var(--sun)" stroke="var(--ink)" strokeWidth={3} /> : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
