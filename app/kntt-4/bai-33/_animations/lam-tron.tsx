"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

/** Số làm tròn đến hàng trăm nghìn: chữ số hàng trăm nghìn là 4, chữ số bên phải nó (hàng chục nghìn) là 8. */
export const LAM_TRON_SO = 6482931;
export const LAM_TRON_KET_QUA = 6500000;

const W = 40;
const xOf = (index: number) => 24 + index * W + (index >= 1 ? 10 : 0) + (index >= 4 ? 10 : 0);

const captions = [
  `Làm tròn ${formatNumber(LAM_TRON_SO)} đến hàng trăm nghìn. Chữ số ở hàng trăm nghìn là 4.`,
  "Nhìn chữ số ngay bên phải nó, ở hàng chục nghìn: đó là 8.",
  "8 là từ 5 trở lên, nên làm tròn lên: chữ số 4 tăng thêm 1, thành 5.",
  `Các chữ số bên phải đều thành 0. Vậy ${formatNumber(LAM_TRON_SO)} làm tròn đến hàng trăm nghìn là ${formatNumber(LAM_TRON_KET_QUA)}.`,
];

const labels = [
  "Số 6 482 931, chữ số hàng trăm nghìn là 4 được tô vàng",
  "Chữ số hàng chục nghìn là 8 được khoanh để nhìn",
  "8 từ 5 trở lên, chữ số 4 tăng thêm 1 thành 5",
  "Kết quả làm tròn đến hàng trăm nghìn là 6 500 000",
];

/** Làm tròn đến hàng trăm nghìn: nhìn chữ số bên phải, từ 5 trở lên thì lên. */
export function LamTron() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const original = String(LAM_TRON_SO).split("");
  const rounded = String(LAM_TRON_KET_QUA).split("");

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 200" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {original.map((digit, index) => (
          <g key={index}>
            <rect
              x={xOf(index)}
              y={44}
              width={W - 4}
              height={48}
              rx={6}
              fill={index === 1 ? "var(--sun)" : "white"}
              stroke="var(--ink)"
              strokeWidth={index === 2 && step >= 1 ? 6 : 3}
            />
            <text x={xOf(index) + (W - 4) / 2} y={78} textAnchor="middle" fontSize={26} fill="var(--ink)" className="tabular-nums">
              {digit}
            </text>
          </g>
        ))}
        <text x={xOf(1) + (W - 4) / 2} y={112} textAnchor="middle" fontSize={14} fill="var(--ink)">
          trăm nghìn
        </text>
        {step >= 1 ? (
          <text data-enter={1} x={xOf(2) + (W - 4) / 2 + 16} y={132} textAnchor="middle" fontSize={14} fill="var(--ink)">
            chục nghìn
          </text>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={xOf(1) + (W - 4) / 2} y={34} textAnchor="middle" fontSize={20} fill="var(--ink)">
              +1
            </text>
            <text x={xOf(4) + 10} y={34} textAnchor="middle" fontSize={20} fill="var(--ink)">
              8 ≥ 5
            </text>
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            {rounded.map((digit, index) => (
              <g key={index}>
                <rect
                  x={xOf(index)}
                  y={146}
                  width={W - 4}
                  height={48}
                  rx={6}
                  fill={index === 1 ? "var(--sun)" : "white"}
                  stroke="var(--ink)"
                  strokeWidth={3}
                />
                <text x={xOf(index) + (W - 4) / 2} y={180} textAnchor="middle" fontSize={26} fill="var(--ink)" className="tabular-nums">
                  {digit}
                </text>
              </g>
            ))}
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
