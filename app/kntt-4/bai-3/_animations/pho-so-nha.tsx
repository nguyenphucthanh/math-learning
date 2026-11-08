"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;
const HOUSE = 56;
const GAP = 12;
const START_X = (WIDTH - (5 * HOUSE + 4 * GAP)) / 2;

const captions = [
  "Một phố có hai dãy nhà. Dãy trên đánh số 10, 12, 14, 16, 18. Dãy dưới đánh số 11, 13, 15, 17, 19.",
  "Các số ở dãy trên đều chia hết cho 2. Đó là các số chẵn.",
  "Các số ở dãy dưới đều không chia hết cho 2. Đó là các số lẻ.",
  "Chỉ cần nhìn chữ số tận cùng. Tận cùng là 0, 2, 4, 6, 8 thì là số chẵn. Tận cùng là 1, 3, 5, 7, 9 thì là số lẻ.",
];

const evens = [10, 12, 14, 16, 18];
const odds = [11, 13, 15, 17, 19];

function House({ x, y, value, tint, lastDigit }: { x: number; y: number; value: number; tint: string; lastDigit: boolean }) {
  const text = String(value);
  return (
    <g>
      <polygon points={`${x - 4},${y + 20} ${x + HOUSE / 2},${y} ${x + HOUSE + 4},${y + 20}`} fill="var(--ink)" />
      <rect x={x} y={y + 20} width={HOUSE} height={44} fill={tint} stroke="var(--ink)" strokeWidth={2} />
      <text x={x + HOUSE / 2} y={y + 50} fontSize={22} textAnchor="middle" fill="var(--ink)">
        {text.slice(0, -1)}
        <tspan fill={lastDigit ? "var(--oops)" : "var(--ink)"} textDecoration={lastDigit ? "underline" : undefined}>
          {text.slice(-1)}
        </tspan>
      </text>
    </g>
  );
}

/** Hai dãy nhà: số chẵn một bên, số lẻ một bên; nhận biết bằng chữ số tận cùng. */
export function PhoSoNha() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const houseX = (index: number) => START_X + index * (HOUSE + GAP);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} 230`}
        role="img"
        aria-label={
          step === 0
            ? "Hai dãy nhà: dãy trên 10, 12, 14, 16, 18; dãy dưới 11, 13, 15, 17, 19."
            : step === 1
              ? "Dãy trên là các số chẵn."
              : step === 2
                ? "Dãy dưới là các số lẻ."
                : "Chữ số tận cùng 0, 2, 4, 6, 8 là số chẵn; 1, 3, 5, 7, 9 là số lẻ."
        }
        className="block w-full"
        fontWeight={800}
      >
        {step >= 1 ? (
          <text x={WIDTH / 2} y={16} fontSize={18} textAnchor="middle" fill="var(--good)" data-enter={1}>
            Số chẵn: chia hết cho 2
          </text>
        ) : null}
        {evens.map((value, index) => (
          <House key={value} x={houseX(index)} y={26} value={value} tint={step >= 1 ? "var(--sun)" : "white"} lastDigit={step >= 3} />
        ))}
        {step >= 2 ? (
          <text x={WIDTH / 2} y={122} fontSize={18} textAnchor="middle" fill="var(--oops)" data-enter={2}>
            Số lẻ: không chia hết cho 2
          </text>
        ) : null}
        {odds.map((value, index) => (
          <House key={value} x={houseX(index)} y={132} value={value} tint={step >= 2 ? "var(--paper)" : "white"} lastDigit={step >= 3} />
        ))}
        {step >= 3 ? (
          <g data-enter={3} fontSize={16} textAnchor="middle" fill="var(--ink)">
            <text x={WIDTH / 2} y={102}>
              tận cùng 0, 2, 4, 6, 8
            </text>
            <text x={WIDTH / 2} y={222}>
              tận cùng 1, 3, 5, 7, 9
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
