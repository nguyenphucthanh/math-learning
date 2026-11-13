"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const nhanChiaCaptions = [
  "Bắt đầu với phân số 2/3.",
  "Nhân cả tử số và mẫu số với 2: 2 × 2 = 4 và 3 × 2 = 6. Được 4/6, bằng 2/3.",
  "Làm ngược lại: chia cả tử số và mẫu số của 4/6 cho 2. 4 : 2 = 2 và 6 : 2 = 3. Lại được 2/3.",
  "Cẩn thận: chỉ nhân tử số với 2 mà giữ mẫu số thì được 4/3. 4/3 không bằng 2/3. Phải làm cùng một phép với cả tử số và mẫu số.",
];

function Ps({ x, y, top, bottom, fill = "var(--foreground)" }: { x: number; y: number; top: string; bottom: string; fill?: string }) {
  const half = Math.max(top.length, bottom.length) * 7 + 6;
  return (
    <g fontSize={22} textAnchor="middle" fill={fill}>
      <text x={x} y={y - 6}>{top}</text>
      <line x1={x - half} y1={y} x2={x + half} y2={y} stroke="var(--ink)" strokeWidth={2.5} />
      <text x={x} y={y + 24}>{bottom}</text>
    </g>
  );
}

const Eq = ({ x, y, text = "=" }: { x: number; y: number; text?: string }) => (
  <text x={x} y={y} fontSize={26} textAnchor="middle" fill="var(--ink)">{text}</text>
);

/** Nhân hoặc chia cả tử số và mẫu số với cùng một số: 2/3 = (2 × 2)/(3 × 2) = 4/6. */
export function NhanChia() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["2/3", "2/3 = (2 × 2)/(3 × 2) = 4/6", "4/6 = (4 : 2)/(6 : 2) = 2/3", "2/3 không bằng 4/3"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 220" role="img" aria-label={`Nhân hoặc chia cả tử số và mẫu số: ${label}`} className="block w-full" fontWeight={800}>
        <Ps x={40} y={34} top="2" bottom="3" fill="var(--unit-tan)" />
        {step >= 1 ? (
          <g data-enter={1}>
            <Eq x={88} y={42} />
            <Ps x={160} y={34} top="2 × 2" bottom="3 × 2" />
            <Eq x={232} y={42} />
            <Ps x={282} y={34} top="4" bottom="6" fill="var(--unit-mm2)" />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <Ps x={40} y={110} top="4" bottom="6" fill="var(--unit-mm2)" />
            <Eq x={88} y={118} />
            <Ps x={160} y={110} top="4 : 2" bottom="6 : 2" />
            <Eq x={232} y={118} />
            <Ps x={282} y={110} top="2" bottom="3" fill="var(--unit-tan)" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <Ps x={40} y={186} top="2" bottom="3" fill="var(--unit-tan)" />
            <Eq x={88} y={194} text="→" />
            <Ps x={160} y={186} top="2 × 2" bottom="3" />
            <Eq x={232} y={194} text="=" />
            <Ps x={282} y={186} top="4" bottom="3" fill="var(--oops)" />
            <text x={326} y={196} fontSize={26} fill="var(--oops)" textAnchor="end">✗</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={nhanChiaCaptions} onChange={setStep} />
    </figure>
  );
}
