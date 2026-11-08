"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;
const ROW = 62;
const DOT = 7;
const STEP_X = 18;
const PAIR_GAP = 12;
const START_X = 20;

const captions = [
  "Có các nhóm chấm: 8, 9, 12 và 13. Con thử ghép các chấm thành từng cặp nhé.",
  "Ghép từng cặp hai chấm. 8 và 12 ghép vừa đủ. 9 và 13 còn thừa một chấm vàng.",
  "Ghép vừa đủ, không thừa, là chia hết cho 2: số chẵn. Còn thừa một chấm là chia cho 2 dư 1: số lẻ.",
];

/** Vị trí ngang của chấm thứ `index`: cách thêm một khoảng sau mỗi cặp để thấy cặp. */
function dotX(index: number) {
  return START_X + DOT + index * STEP_X + Math.floor(index / 2) * PAIR_GAP;
}

/** Ghép cặp các chấm: số chẵn ghép vừa đủ, số lẻ còn thừa một chấm. */
export function GhepCap() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const rows = [8, 9, 12, 13];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} ${rows.length * ROW + 8}`}
        role="img"
        aria-label={
          step === 0
            ? "Bốn nhóm chấm: 8, 9, 12 và 13, chưa ghép cặp."
            : step === 1
              ? "Đã ghép cặp: 8 và 12 vừa đủ; 9 và 13 thừa một chấm."
              : "8 và 12 là số chẵn, 9 và 13 là số lẻ."
        }
        className="block w-full"
        fontWeight={800}
      >
        {rows.map((count, row) => {
          const top = row * ROW + 4;
          const cy = top + 40;
          const pairs = Math.floor(count / 2);
          const odd = count % 2 === 1;
          return (
            <g key={count}>
              <text x={START_X} y={top + 18} fontSize={18} fill="var(--ink)">
                {count}
              </text>
              {step >= 2 ? (
                <text x={START_X + 38} y={top + 18} fontSize={16} fill={odd ? "var(--oops)" : "var(--good)"} data-enter={2}>
                  {count} : 2 = {pairs}
                  {odd ? " dư 1: số lẻ" : ": số chẵn"}
                </text>
              ) : null}
              {step >= 1
                ? Array.from({ length: pairs }, (_, pair) => (
                    <rect
                      key={pair}
                      data-enter={1}
                      x={dotX(pair * 2) - DOT - 4}
                      y={cy - DOT - 4}
                      width={STEP_X + 2 * DOT + 8}
                      height={2 * DOT + 8}
                      rx={DOT + 4}
                      fill="none"
                      stroke="var(--ink)"
                      strokeWidth={2}
                    />
                  ))
                : null}
              {Array.from({ length: count }, (_, index) => {
                const leftover = odd && index === count - 1;
                return (
                  <circle
                    key={index}
                    cx={dotX(index)}
                    cy={cy}
                    r={DOT}
                    fill={step >= 1 && leftover ? "var(--sun)" : "var(--ink)"}
                    stroke={step >= 1 && leftover ? "var(--ink)" : "none"}
                    strokeWidth={2}
                  />
                );
              })}
              {step >= 1 && odd ? (
                <circle data-enter={1} cx={dotX(count - 1)} cy={cy} r={DOT + 5} fill="none" stroke="var(--oops)" strokeWidth={2} strokeDasharray="3 3" />
              ) : null}
            </g>
          );
        })}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
