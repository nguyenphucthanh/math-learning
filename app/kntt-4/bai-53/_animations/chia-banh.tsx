"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { sectorPath } from "@/components/math/phan-so";
import { useRef, useState } from "react";

export const chiaBanhCaptions = [
  "Các bạn có một chiếc bánh pizza hình tròn.",
  "Các bạn chia bánh thành 6 phần bằng nhau. Mỗi phần to bằng nhau.",
  "Tô màu 1 phần: đã tô màu một phần sáu hình tròn. Một phần sáu viết là 1/6.",
  "Tô thêm 1 phần nữa: đã tô màu hai phần sáu hình tròn. Hai phần sáu viết là 2/6.",
  "Phân số 2/6: số 2 ở trên gạch ngang là tử số. Tử số chỉ số phần đã tô màu.",
  "Số 6 ở dưới gạch ngang là mẫu số. Mẫu số chỉ số phần bằng nhau của cả hình tròn.",
];

const r2 = (n: number) => Math.round(n * 100) / 100;
const angle = (i: number) => (i / 6) * 2 * Math.PI;
const doc = ["", "một phần sáu", "hai phần sáu"];

/** Chia hình tròn thành 6 phần bằng nhau, tô 1 rồi 2 phần, đọc và viết 1/6, 2/6. */
export function ChiaBanh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const to = step >= 3 ? 2 : step >= 2 ? 1 : 0;
  const label = ["Chiếc bánh hình tròn chưa chia", "Hình tròn chia 6 phần bằng nhau, chưa tô", "Đã tô 1 phần: một phần sáu, viết 1/6", "Đã tô 2 phần: hai phần sáu, viết 2/6", "Tử số 2 chỉ số phần đã tô", "Mẫu số 6 chỉ số phần bằng nhau của cả hình"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 220" role="img" aria-label={label} className="block w-full" fontWeight={800}>
        <circle cx={90} cy={110} r={80} fill="white" stroke="var(--ink)" strokeWidth={3} />
        {step >= 1 &&
          Array.from({ length: 6 }, (_, i) => (
            <line key={i} data-enter={1} data-scale={0.2} x1={90} y1={110} x2={r2(90 + 80 * Math.sin(angle(i)))} y2={r2(110 - 80 * Math.cos(angle(i)))} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
          ))}
        {Array.from({ length: to }, (_, i) => (
          <path key={i} data-enter={i + 2} data-scale={0.7} d={sectorPath(90, 110, 80, angle(i), angle(i + 1))} fill="var(--sun)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        ))}
        {step >= 2 && (
          <g data-enter={2}>
            <text x={235} y={96} fontSize={44} textAnchor="middle" fill={step === 4 ? "var(--unit-mm2)" : "var(--ink)"}>{to}</text>
            <line x1={208} y1={108} x2={262} y2={108} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
            <text x={235} y={152} fontSize={44} textAnchor="middle" fill={step === 5 ? "var(--unit-second)" : "var(--ink)"}>6</text>
            <text x={235} y={196} fontSize={16} textAnchor="middle" fill="var(--ink)">{doc[to]}</text>
          </g>
        )}
        {step === 4 && (
          <text data-enter={4} x={272} y={92} fontSize={16} fill="var(--unit-mm2)">tử số</text>
        )}
        {step === 5 && (
          <text data-enter={5} x={272} y={146} fontSize={16} fill="var(--unit-second)">mẫu số</text>
        )}
      </svg>
      <StepControls step={step} captions={chiaBanhCaptions} onChange={setStep} />
    </figure>
  );
}
