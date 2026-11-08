"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;
const BOAT = 26;

const captions = [
  "Nam gấp được 2 cái thuyền. Mai cũng gấp một số thuyền, nhưng con chưa biết là bao nhiêu.",
  "Ta dùng chữ a thay cho số thuyền của Mai. Cả hai bạn gấp được 2 + a cái thuyền. 2 + a là biểu thức chứa chữ.",
  "Nếu a = 4 thì 2 + a = 2 + 4 = 6. Số 6 là một giá trị của biểu thức 2 + a.",
  "Nếu a = 12 thì 2 + a = 2 + 12 = 14. Mỗi lần thay chữ a bằng một số, con tính được một giá trị của biểu thức.",
];

/** Một cái thuyền giấy, góc trên trái tại (x, y). */
function Boat({ x, y, enter }: { x: number; y: number; enter?: number }) {
  return (
    <g data-enter={enter} transform={`translate(${x} ${y})`}>
      <path d="M12 0 V10 H22 Z" fill="var(--sun)" stroke="var(--ink)" strokeWidth={1.5} strokeLinejoin="round" />
      <path d="M0 10 H24 L19 19 H5 Z" fill="var(--unit-second)" stroke="var(--ink)" strokeWidth={1.5} strokeLinejoin="round" />
    </g>
  );
}

/** Số thuyền của Mai: hộp "?", chữ a, rồi a = 4 và a = 12. */
export function ChuThayCho() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const count = step === 2 ? 4 : step === 3 ? 12 : 0;
  const total = step === 2 ? "2 + a = 2 + 4 = 6" : step === 3 ? "2 + a = 2 + 12 = 14" : "2 + a";

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} 190`}
        role="img"
        aria-label={
          step === 0
            ? "Nam có 2 cái thuyền. Mai có một số thuyền chưa biết."
            : step === 1
              ? "Số thuyền của Mai là a. Cả hai bạn có 2 + a cái thuyền."
              : step === 2
                ? "a bằng 4: Mai có 4 thuyền, cả hai bạn có 6 thuyền."
                : "a bằng 12: Mai có 12 thuyền, cả hai bạn có 14 thuyền."
        }
        className="block w-full"
        fontWeight={800}
      >
        <text x={20} y={26} fontSize={18} fill="var(--ink)">Nam</text>
        <rect x={20} y={36} width={84} height={56} rx={14} fill="none" stroke="var(--input)" strokeWidth={2} />
        <Boat x={30} y={54} />
        <Boat x={30 + BOAT + 8} y={54} />

        <text x={130} y={26} fontSize={18} fill="var(--ink)">
          Mai{step >= 1 ? ": a" : ""}
        </text>
        <rect x={130} y={36} width={210} height={84} rx={14} fill={step >= 1 ? "var(--sun)" : "none"} fillOpacity={0.25} stroke="var(--ink)" strokeWidth={2} strokeDasharray={step === 0 ? "6 4" : undefined} />
        {step === 0 ? (
          <text x={235} y={92} fontSize={40} fill="var(--ink)" textAnchor="middle">?</text>
        ) : null}
        {step === 1 ? (
          <text data-enter={1} x={235} y={92} fontSize={40} fill="var(--ink)" textAnchor="middle">a</text>
        ) : null}
        {Array.from({ length: count }, (_, index) => {
          const perRow = count > 6 ? 6 : count;
          const row = Math.floor(index / perRow);
          const column = index % perRow;
          const rowWidth = perRow * (BOAT + 6) - 6;
          const left = 235 - rowWidth / 2;
          const top = count > 6 ? 46 + row * 36 : 66;
          return <Boat key={index} x={left + column * (BOAT + 6)} y={top} enter={step} />;
        })}

        {step >= 1 ? (
          <text data-enter={1} x={20} y={160} fontSize={14} fill="var(--ink)">
            Cả hai bạn:
          </text>
        ) : null}
        {step >= 1 ? (
          <text key={step} data-enter={step} x={20} y={184} fontSize={step >= 2 ? 24 : 26} fill={step >= 2 ? "var(--good)" : "var(--ink)"}>
            {total}
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
