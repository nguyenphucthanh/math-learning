"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { largestFrom, smallestFrom } from "@/lib/so-sanh";
import { useRef, useState } from "react";

const n = formatNumber;
const VIEW = 340;
const W = 44;
const GAP = 6;

const xs = (count: number) => {
  const total = count * W + (count - 1) * GAP;
  return Array.from({ length: count }, (_, index) => (VIEW - total) / 2 + index * (W + GAP));
};

function Card({ x, y, digit, tone }: { x: number; y: number; digit: number; tone?: "sun" | "good" }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={W}
        height={52}
        rx={8}
        fill={tone === "sun" ? "var(--sun)" : "white"}
        stroke="var(--ink)"
        strokeWidth={tone ? 5 : 3}
      />
      <text x={x + W / 2} y={y + 36} textAnchor="middle" fontSize={28} fill="var(--ink)" className="tabular-nums">
        {digit}
      </text>
    </g>
  );
}

/** Lập số lớn nhất và bé nhất từ các tấm thẻ chữ số, dùng hết các thẻ. */
export function XepThe({ cards }: { cards: number[] }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const count = cards.length;
  const positions = xs(count);
  const largest = largestFrom(cards);
  const smallest = smallestFrom(cards);
  const largestDigits = String(largest).split("").map(Number);
  const smallestDigits = String(smallest).split("").map(Number);
  const lowestNonZero = Math.min(...cards.filter((digit) => digit !== 0));
  const list = cards.join(", ");

  const captions = [
    `Có ${count} tấm thẻ: ${list}. Con dùng hết các thẻ để lập số có ${count} chữ số.`,
    `Số lớn nhất: chữ số lớn đứng hàng cao nhất. Xếp các thẻ từ lớn đến bé, ta được ${n(largest)}.`,
    `Số bé nhất: chữ số đầu phải khác 0, nên chọn thẻ ${lowestNonZero} (bé nhất, khác 0) đứng đầu. Các thẻ còn lại xếp từ bé đến lớn, ta được ${n(smallest)}.`,
  ];
  const labels = [`${count} tấm thẻ: ${list}`, `Số lớn nhất là ${n(largest)}`, `Số bé nhất là ${n(smallest)}, chữ số 0 không đứng đầu`];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 262" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {cards.map((digit, index) => (
          <Card key={index} x={positions[index]} y={8} digit={digit} />
        ))}

        {step >= 1 ? (
          <g data-enter={1}>
            <text x={VIEW / 2} y={92} textAnchor="middle" fontSize={16} fill="var(--ink)">
              Lớn nhất: xếp từ lớn đến bé
            </text>
            {largestDigits.map((digit, index) => (
              <Card key={index} x={positions[index]} y={102} digit={digit} tone={index === 0 ? "sun" : undefined} />
            ))}
          </g>
        ) : null}

        {step >= 2 ? (
          <g data-enter={2}>
            <text x={VIEW / 2} y={188} textAnchor="middle" fontSize={16} fill="var(--ink)">
              Bé nhất: đầu khác 0, rồi xếp từ bé đến lớn
            </text>
            {smallestDigits.map((digit, index) => (
              <Card key={index} x={positions[index]} y={198} digit={digit} tone={index === 0 ? "sun" : undefined} />
            ))}
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
