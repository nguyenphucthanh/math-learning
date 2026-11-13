"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const thanhCaptions = [
  "Hai thanh như nhau, đều chia 8 phần bằng nhau. Thanh trên tô 3 phần: 3/8. Thanh dưới tô 5 phần: 5/8.",
  "Cùng mẫu số 8, tử số 5 lớn hơn 3 nên 5/8 > 3/8. Cùng mẫu số: tử số lớn hơn thì phân số lớn hơn.",
  "Thanh thứ ba chia 4 phần bằng nhau, tô 3 phần: 3/4. Cùng tử số 3, nhưng mẫu số 4 bé hơn 8 nên mỗi phần to hơn. Vậy 3/4 > 3/8.",
];

function Thanh({ y, parts, filled, color, label }: { y: number; parts: number; filled: number; color: string; label: string }) {
  const w = 240;
  const cell = w / parts;
  return (
    <g>
      {Array.from({ length: parts }, (_, i) => (
        <rect key={i} x={10 + i * cell} y={y} width={cell} height={32} fill={i < filled ? color : "white"} fillOpacity={i < filled ? 0.6 : 1} stroke="var(--ink)" strokeWidth={2} />
      ))}
      <text x={264} y={y + 24} fontSize={22} fill={color}>{label}</text>
    </g>
  );
}

/** Thanh phân số: cùng mẫu số so tử số; cùng tử số thì mẫu số bé hơn là lớn hơn. */
export function ThanhPhanSo() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = [
    "Hai thanh chia 8 phần, tô 3 phần và 5 phần",
    "5/8 lớn hơn 3/8 vì cùng mẫu số, tử số lớn hơn",
    "3/4 lớn hơn 3/8 vì cùng tử số, mẫu số bé hơn",
  ][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 230" role="img" aria-label={`Thanh phân số: ${label}`} className="block w-full" fontWeight={800}>
        <Thanh y={12} parts={8} filled={3} color="var(--unit-tan)" label="3/8" />
        <Thanh y={56} parts={8} filled={5} color="var(--unit-mm2)" label="5/8" />
        {step >= 1 ? (
          <text data-enter={1} x={170} y={118} textAnchor="middle" fontSize={20} fill="var(--ink)">5/8 &gt; 3/8 (cùng mẫu số)</text>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <Thanh y={140} parts={4} filled={3} color="var(--unit-yen)" label="3/4" />
            <text x={170} y={208} textAnchor="middle" fontSize={20} fill="var(--ink)">3/4 &gt; 3/8 (cùng tử số)</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={thanhCaptions} onChange={setStep} />
    </figure>
  );
}
