"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const C = 110;

const f = (n: number) => Math.round(n * 10) / 10;
/** Điểm trên đồng hồ: `deg` đo từ số 12 theo chiều kim đồng hồ. */
const at = (r: number, deg: number) => ({ x: f(C + r * Math.sin((deg * Math.PI) / 180)), y: f(C - r * Math.cos((deg * Math.PI) / 180)) });

const stages = [
  { hour: 3, kind: "góc vuông" },
  { hour: 2, kind: "góc nhọn" },
  { hour: 4, kind: "góc tù" },
  { hour: 6, kind: "góc bẹt" },
] as const;

const captions = [
  "Lúc 3 giờ, kim phút chỉ số 12, kim giờ chỉ số 3. Hai kim tạo thành góc vuông.",
  "Lúc 2 giờ, kim giờ chỉ số 2. Hai kim tạo thành góc bé hơn góc vuông, đó là góc nhọn.",
  "Lúc 4 giờ, kim giờ chỉ số 4. Hai kim tạo thành góc lớn hơn góc vuông, đó là góc tù.",
  "Lúc 6 giờ, kim giờ chỉ số 6. Hai kim nằm trên một đường thẳng, tạo thành góc bẹt.",
];

/** Góc tạo bởi kim giờ và kim phút lúc 3, 2, 4, 6 giờ (SGK tr. 28, bài 3). */
export function GocDongHo() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const { hour, kind } = stages[step];
  const hourDeg = hour * 30;
  const minuteTip = at(76, 0);
  const hourTip = at(48, hourDeg);
  const wedgeFrom = at(34, 0);
  const wedgeTo = at(34, hourDeg);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 220 220" role="img" aria-label={`Đồng hồ chỉ ${hour} giờ, hai kim tạo thành ${kind}`} className="mx-auto block w-full max-w-[280px]" fontWeight={800}>
        <circle cx={C} cy={C} r={104} fill="var(--paper)" stroke="var(--ink)" strokeWidth={5} />
        {Array.from({ length: 12 }, (_, k) => {
          const n = k === 0 ? 12 : k;
          const p = at(86, k * 30);
          return (
            <text key={n} x={p.x} y={p.y + 6} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {n}
            </text>
          );
        })}
        <g key={step} data-enter={step} data-scale={0.9}>
          <path d={`M ${C} ${C} L ${wedgeFrom.x} ${wedgeFrom.y} A 34 34 0 0 1 ${wedgeTo.x} ${wedgeTo.y} Z`} fill="var(--unit-mm2)" fillOpacity={0.22} />
          <line x1={C} y1={C} x2={hourTip.x} y2={hourTip.y} stroke="var(--unit-ta)" strokeWidth={7} strokeLinecap="round" />
          <line x1={C} y1={C} x2={minuteTip.x} y2={minuteTip.y} stroke="var(--unit-second)" strokeWidth={4.5} strokeLinecap="round" />
        </g>
        <circle cx={C} cy={C} r={5.5} fill="var(--ink)" />
      </svg>
      <p className="mt-2 text-center font-heading text-2xl font-bold text-unit-mm2">
        {hour} giờ: {kind}
      </p>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
