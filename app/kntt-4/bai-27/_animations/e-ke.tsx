"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const O = { x: 170, y: 120 };
const TILT = -20;

/** Điểm (dx, dy) trong hệ trục của hình, sau khi nghiêng cả hình một góc TILT quanh O. */
function place(dx: number, dy: number) {
  const rad = (TILT * Math.PI) / 180;
  return {
    x: Math.round((O.x + dx * Math.cos(rad) - dy * Math.sin(rad)) * 10) / 10,
    y: Math.round((O.y + dx * Math.sin(rad) + dy * Math.cos(rad)) * 10) / 10,
  };
}

const captions = [
  "Hai đường thẳng OM và ON cắt nhau tại O. Chúng có vuông góc với nhau không? Ta dùng ê ke để kiểm tra.",
  "Đặt đỉnh góc vuông của ê ke vào điểm O, một cạnh góc vuông của ê ke nằm sát đường thẳng OM.",
  "Cạnh góc vuông còn lại của ê ke nằm sát đường thẳng ON. Vậy OM và ON vuông góc với nhau.",
  "Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông, có chung đỉnh O.",
];

/** Dùng ê ke kiểm tra hai đường thẳng vuông góc. Cả hình nghiêng 20° để con không nhìn "ngang, dọc" mà đoán. */
export function EKe() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const m = place(120, 0);
  const n = place(0, 100);
  const lineM = [place(-120, 0), m];
  const lineN = [place(0, -100), n];
  const triangle = [place(0, 0), place(100, 0), place(0, 100)];
  const mark = (dx: number, dy: number) => {
    const s = 14;
    const a = place(dx * s, 0);
    const b = place(dx * s, dy * s);
    const c = place(0, dy * s);
    return `M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`;
  };

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 250"
        role="img"
        aria-label={
          step === 0
            ? "Hai đường thẳng OM và ON cắt nhau tại O"
            : step === 1
              ? "Ê ke đặt đỉnh góc vuông vào O, một cạnh góc vuông sát OM"
              : step === 2
                ? "Cạnh góc vuông còn lại của ê ke sát ON: OM và ON vuông góc"
                : "Bốn góc vuông chung đỉnh O"
        }
        className="block w-full"
        fontWeight={800}
      >
        <line x1={lineM[0].x} y1={lineM[0].y} x2={lineM[1].x} y2={lineM[1].y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
        <line x1={lineN[0].x} y1={lineN[0].y} x2={lineN[1].x} y2={lineN[1].y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
        {step >= 1 ? (
          <polygon
            data-enter={1}
            points={triangle.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="var(--unit-yen)"
            fillOpacity={0.3}
            stroke="var(--unit-yen)"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <line x1={O.x} y1={O.y} x2={triangle[2].x} y2={triangle[2].y} stroke="var(--unit-ta)" strokeWidth={5} strokeLinecap="round" />
            <line x1={O.x} y1={O.y} x2={triangle[1].x} y2={triangle[1].y} stroke="var(--unit-ta)" strokeWidth={5} strokeLinecap="round" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3} fill="none" stroke="var(--unit-ta)" strokeWidth={2.5}>
            <path d={mark(1, 1)} />
            <path d={mark(-1, 1)} />
            <path d={mark(1, -1)} />
            <path d={mark(-1, -1)} />
          </g>
        ) : null}
        <circle cx={O.x} cy={O.y} r={4.5} fill="var(--ink)" />
        {[
          ["O", place(-16, -12)],
          ["M", place(136, 6)],
          ["N", place(-2, 120)],
        ].map(([name, p]) => {
          const point = p as { x: number; y: number };
          return (
            <text key={name as string} x={point.x} y={point.y + 5} textAnchor="middle" fontSize={18} fill="var(--ink)">
              {name as string}
            </text>
          );
        })}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
