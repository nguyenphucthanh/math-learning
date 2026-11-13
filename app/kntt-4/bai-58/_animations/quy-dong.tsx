"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { sectorPath } from "@/components/math/phan-so";
import { useRef, useState } from "react";

export const quyDongCaptions = [
  "Nam tô màu 7/8 hình tròn (8 phần bằng nhau, tô 7 phần). Mai tô màu 3/4 hình tròn (4 phần bằng nhau, tô 3 phần). Hai hình tròn như nhau. Ai tô nhiều hơn?",
  "Hai phân số khác mẫu số. Chia mỗi phần của hình Mai thành 2 phần nhỏ (nét đứt): quy đồng mẫu số, 3/4 = (3 × 2)/(4 × 2) = 6/8.",
  "Bây giờ cùng mẫu số 8: 7/8 > 6/8 vì 7 > 6. Vậy 7/8 > 3/4: Nam tô nhiều hơn.",
];

const r2 = (n: number) => Math.round(n * 100) / 100;

function Tron({ cx, cy, r, parts, filled, color }: { cx: number; cy: number; r: number; parts: number; filled: number; color: string }) {
  return (
    <g stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round">
      {Array.from({ length: parts }, (_, i) => (
        <path key={i} d={sectorPath(cx, cy, r, (i / parts) * 2 * Math.PI, ((i + 1) / parts) * 2 * Math.PI)} fill={i < filled ? color : "white"} fillOpacity={i < filled ? 0.6 : 1} />
      ))}
    </g>
  );
}

/** 7/8 và 3/4: quy đồng 3/4 = 6/8 rồi so sánh cùng mẫu số. */
export function QuyDongSoSanh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = [
    "Hình tròn của Nam chia 8 phần, tô 7 phần. Hình tròn của Mai chia 4 phần, tô 3 phần",
    "Chia đôi mỗi phần của hình Mai bằng nét đứt, 3/4 bằng 6/8",
    "7/8 lớn hơn 6/8 nên 7/8 lớn hơn 3/4",
  ][step];
  const cy = 80;
  const r = 66;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 250" role="img" aria-label={`So sánh 7/8 và 3/4: ${label}`} className="block w-full" fontWeight={800}>
        <text x={90} y={14} fontSize={16} textAnchor="middle" fill="var(--foreground)">Nam</text>
        <text x={250} y={14} fontSize={16} textAnchor="middle" fill="var(--foreground)">Mai</text>
        <Tron cx={90} cy={cy + 8} r={r} parts={8} filled={7} color="var(--unit-tan)" />
        <Tron cx={250} cy={cy + 8} r={r} parts={4} filled={3} color="var(--unit-mm2)" />
        {step >= 1 ? (
          <g data-enter={1} stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="5 4">
            {Array.from({ length: 4 }, (_, i) => {
              const a = ((i + 0.5) / 4) * 2 * Math.PI;
              return <line key={i} x1={250} y1={cy + 8} x2={r2(250 + r * Math.sin(a))} y2={r2(cy + 8 - r * Math.cos(a))} />;
            })}
          </g>
        ) : null}
        <Ps x={90} y={186} top="7" bottom="8" fill="var(--unit-tan)" />
        <Ps x={215} y={186} top="3" bottom="4" fill="var(--unit-mm2)" />
        {step >= 1 ? (
          <g data-enter={1}>
            <Eq x={248} y={194} />
            <Ps x={282} y={186} top="6" bottom="8" fill="var(--unit-mm2)" />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={170} y={242} textAnchor="middle" fontSize={20} fill="var(--ink)">7/8 &gt; 6/8 nên 7/8 &gt; 3/4</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={quyDongCaptions} onChange={setStep} />
    </figure>
  );
}
