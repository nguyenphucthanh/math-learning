"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const FRIENDS = 4;
const R = 28;
const GAP = 64;
/** Màu phần bánh của từng bạn; bạn đầu tiên (màu xanh) là bạn được đếm ở bước cuối. */
const colors = ["var(--unit-second)", "var(--sun)", "var(--unit-century)", "var(--unit-mm2)"];

export const chiaBanhCaptions = (cakes: number) => [
  `Có ${cakes} cái bánh, chia đều cho 4 bạn. Mỗi bạn được mấy phần cái bánh?`,
  "Chia mỗi cái bánh thành 4 phần bằng nhau.",
  "Mỗi bạn lấy 1 phần của mỗi cái bánh. Mỗi màu là phần của một bạn.",
  cakes < FRIENDS
    ? `Bạn màu xanh có ${cakes} phần, mỗi phần là 1/4 cái bánh. Vậy mỗi bạn được ${cakes}/4 cái bánh: ${cakes} : 4 = ${cakes}/4.`
    : `Bạn màu xanh có ${cakes} phần, mỗi phần là 1/4 cái bánh. Mỗi bạn được ${cakes}/4 cái bánh, nhiều hơn 1 cái bánh vì 4 phần đã đủ 1 cái: ${cakes} : 4 = ${cakes}/4.`,
];

/** Quarter k của bánh tâm (cx, cy): các điểm nằm trên trục nên không cần lượng giác. */
function quarter(cx: number, cy: number, k: number) {
  const pts = [[cx, cy - R], [cx + R, cy], [cx, cy + R], [cx - R, cy]];
  const [a, b] = [pts[k], pts[(k + 1) % 4]];
  return `M${cx} ${cy} L${a[0]} ${a[1]} A${R} ${R} 0 0 1 ${b[0]} ${b[1]} Z`;
}

/** Chia đều `cakes` cái bánh cho 4 bạn: từng bánh chia 4 phần, mỗi bạn lấy 1 phần của mỗi bánh. */
export function ChiaBanh({ cakes }: { cakes: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const captions = chiaBanhCaptions(cakes);
  const left = (340 - cakes * GAP) / 2 + GAP / 2;
  const state = ["Có " + cakes + " cái bánh chưa chia.", "Mỗi cái bánh đã chia thành 4 phần bằng nhau.", "Mỗi bạn một màu, lấy 1 phần của mỗi cái bánh.", `Bạn màu xanh có ${cakes} phần, bằng ${cakes}/4 cái bánh.`][step];
  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 150" role="img" aria-label={`Chia ${cakes} cái bánh cho 4 bạn. ${state}`} className="block w-full" fontWeight={800}>
        {Array.from({ length: cakes }).map((_, i) => {
          const cx = left + i * GAP;
          return (
            <g key={i}>
              <circle cx={cx} cy={48} r={R} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
              {step >= 1 ? (
                <g data-enter={1} stroke="var(--ink)" strokeWidth={2}>
                  <line x1={cx - R} x2={cx + R} y1={48} y2={48} />
                  <line x1={cx} x2={cx} y1={48 - R} y2={48 + R} />
                </g>
              ) : null}
              {step >= 2
                ? Array.from({ length: FRIENDS }).map((__, k) => (
                    <path
                      key={k}
                      data-enter={2}
                      data-scale={0.9}
                      d={quarter(cx, 48, k)}
                      fill={colors[k]}
                      opacity={step >= 3 && k > 0 ? 0.25 : 1}
                      stroke="var(--ink)"
                      strokeWidth={2}
                    />
                  ))
                : null}
            </g>
          );
        })}
        {step >= 3 ? (
          <g data-enter={3}>
            <text x={170} y={110} textAnchor="middle" fontSize={16} fill="var(--ink)">Bạn màu xanh: {cakes} phần</text>
            <text x={170} y={136} textAnchor="middle" fontSize={20} fill="var(--unit-second)">{cakes} : 4 = {cakes}/4 cái bánh</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
