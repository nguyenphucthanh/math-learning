"use client";

import { Eq, Ps } from "@/components/math/phan-so-svg";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const chiaBanhCaptions = [
  "Có 12 cái bánh.",
  "Chia 12 cái bánh thành 3 phần bằng nhau. Mỗi phần có 12 : 3 = 4 cái bánh.",
  "2/3 số bánh là 2 phần trong 3 phần: 4 + 4 = 8 cái bánh. Những cái bánh phủ kem là 2/3 của 12.",
  "Viết bằng phép tính: 12 × 2/3 = 24/3 = 8. Muốn tìm 2/3 của 12, ta lấy 12 nhân với 2/3. Cũng ra 8 nếu chia trước: 12 : 3 × 2 = 8.",
];

const groups = [0, 1, 2];
const cakes = [0, 1, 2, 3];
const gx = (g: number) => 10 + g * 110;
const cx = (g: number, i: number) => gx(g) + 26 + (i % 2) * 48;
const cy = (i: number) => 32 + Math.floor(i / 2) * 44;

/** Tìm 2/3 của 12: 12 cái bánh xếp thành 3 phần × 4 cái, lấy 2 phần. */
export function ChiaBanh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["12 cái bánh", "12 cái bánh chia thành 3 phần, mỗi phần 4 cái", "2 phần trong 3 phần được phủ kem, là 8 cái bánh", "12 × 2/3 = 24/3 = 8"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 270" role="img" aria-label={`Tìm 2/3 của 12: ${label}`} className="block w-full" fontWeight={800}>
        {groups.map((g) => cakes.map((i) => <circle key={`${g}-${i}`} cx={cx(g, i)} cy={cy(i)} r={18} fill="var(--paper)" stroke="var(--input)" strokeWidth={2.5} />))}
        {step >= 1
          ? groups.map((g) => (
              <g key={g} data-enter={1}>
                <rect x={gx(g)} y={6} width={100} height={96} rx={14} fill="none" stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="6 5" />
                <text x={gx(g) + 50} y={124} fontSize={16} textAnchor="middle" fill="var(--ink)">4 cái</text>
              </g>
            ))
          : null}
        {step >= 2 ? (
          <g data-enter={2}>
            {[0, 1].map((g) => cakes.map((i) => <circle key={`${g}-${i}`} cx={cx(g, i)} cy={cy(i)} r={18} fill="var(--unit-tan)" stroke="var(--ink)" strokeWidth={2.5} />))}
            <text x={165} y={156} fontSize={18} textAnchor="middle" fill="var(--unit-tan)">2 phần = 4 + 4 = 8 cái</text>
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <g fontSize={24} fill="var(--foreground)" textAnchor="middle">
              <text x={38} y={214}>12 ×</text>
            </g>
            <Ps x={92} y={206} top="2" bottom="3" fill="var(--unit-tan)" />
            <Eq x={128} y={214} />
            <Ps x={168} y={206} top="24" bottom="3" />
            <Eq x={208} y={214} />
            <text x={240} y={214} fontSize={28} textAnchor="middle" fill="var(--unit-tan)">8</text>
            <text x={170} y={258} fontSize={16} textAnchor="middle" fill="var(--ink)">Chia trước: 12 : 3 × 2 = 4 × 2 = 8</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={chiaBanhCaptions} onChange={setStep} />
    </figure>
  );
}
