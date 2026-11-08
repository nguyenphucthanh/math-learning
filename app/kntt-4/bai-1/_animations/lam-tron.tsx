"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const LEFT = 30;
const RIGHT = 330;
const POINT = Math.round(LEFT + 0.72 * (RIGHT - LEFT));
const MID = (LEFT + RIGHT) / 2;

const captions = [
  "Làm tròn 15 720 đến hàng nghìn. Số này nằm giữa hai số tròn nghìn: 15 000 và 16 000. Số 15 500 ở chính giữa.",
  "Đặt 15 720 lên tia số.",
  "Nhìn chữ số hàng trăm: là 7. Từ 5 trở lên thì làm tròn lên, 15 720 gần 16 000 hơn.",
  "Vậy làm tròn 15 720 đến hàng nghìn được 16 000.",
];

/** Làm tròn đến hàng nghìn bằng tia số: số nằm gần số tròn nghìn nào hơn. */
export function LamTron() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 200"
        role="img"
        aria-label={`Tia số từ 15 000 đến 16 000, điểm giữa 15 500. ${step >= 1 ? "Số 15 720 nằm bên phải điểm giữa, gần 16 000 hơn." : ""}${step >= 3 ? " Làm tròn được 16 000." : ""}`}
        className="block w-full"
        fontWeight={800}
      >
        <line x1={LEFT} y1={110} x2={RIGHT} y2={110} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        {[LEFT, MID, RIGHT].map((x) => (
          <line key={x} x1={x} y1={100} x2={x} y2={120} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        ))}
        <text x={LEFT} y={146} textAnchor="middle" fontSize={15} fill="var(--foreground)">
          15 000
        </text>
        <text x={MID} y={146} textAnchor="middle" fontSize={15} fill="var(--foreground)">
          15 500
        </text>
        <text x={RIGHT} y={146} textAnchor="middle" fontSize={15} fill="var(--foreground)">
          16 000
        </text>
        {step >= 1 ? (
          <g data-enter={1}>
            <circle cx={POINT} cy={110} r={9} fill="var(--sun)" stroke="var(--ink)" strokeWidth={3} />
            <text x={POINT} y={84} textAnchor="middle" fontSize={16} fill="var(--ink)">
              15 720
            </text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <path d={`M${POINT + 12} 128 Q${(POINT + RIGHT) / 2} 150 ${RIGHT - 12} 128`} fill="none" stroke="var(--unit-second)" strokeWidth={3} />
            <text x={175} y={30} textAnchor="middle" fontSize={16} fill="var(--foreground)">
              Hàng trăm là 7, mà 7 ≥ 5
            </text>
          </g>
        ) : null}
        {step >= 3 ? (
          <text data-enter={3} x={180} y={186} textAnchor="middle" fontSize={20} fill="var(--ink)">
            Làm tròn được 16 000
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
