"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const ROWS = [44, 100, 156, 212];
const X = [90, 180, 270];

const captions = [
  "Tính 30 + 89 + 70. Cộng từ trái sang phải cũng được, nhưng có cách nhanh hơn.",
  "Tìm hai số cộng ra số tròn: 30 + 70 = 100.",
  "Đổi chỗ 89 và 70 (tính chất giao hoán): 30 + 70 + 89. Vẫn đủ ba số.",
  "Cộng hai số tròn trước, được 100. Còn lại 100 + 89.",
  "100 + 89 = 189. Vậy 30 + 89 + 70 = 189.",
];

function Token({ x, y, text, hot }: { x: number; y: number; text: string; hot?: boolean }) {
  return (
    <g>
      {hot ? <rect x={x - 32} y={y - 26} width={64} height={38} rx={10} fill="var(--sun)" /> : null}
      <text x={x} y={y} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--ink)">
        {text}
      </text>
    </g>
  );
}

function Plus({ x, y }: { x: number; y: number }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--foreground)">
      +
    </text>
  );
}

/** Tính thuận tiện: ghép hai số ra số tròn, mỗi dòng giữ đủ các số. */
export function PairUp() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const mid = (a: number, b: number) => (a + b) / 2;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 240"
        role="img"
        aria-label={["30 + 89 + 70", "30 và 70 được tô sáng", "30 + 70 + 89", "100 + 89", "bằng 189"][step]}
        className="block w-full"
      >
        <Token x={X[0]} y={ROWS[0]} text="30" hot={step >= 1} />
        <Plus x={mid(X[0], X[1])} y={ROWS[0]} />
        <Token x={X[1]} y={ROWS[0]} text="89" />
        <Plus x={mid(X[1], X[2])} y={ROWS[0]} />
        <Token x={X[2]} y={ROWS[0]} text="70" hot={step >= 1} />

        {step >= 2 ? (
          <g data-enter={2}>
            <text x={34} y={ROWS[1]} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--foreground)">
              =
            </text>
            <Token x={X[0]} y={ROWS[1]} text="30" hot />
            <Plus x={mid(X[0], X[1])} y={ROWS[1]} />
            <Token x={X[1]} y={ROWS[1]} text="70" hot />
            <Plus x={mid(X[1], X[2])} y={ROWS[1]} />
            <Token x={X[2]} y={ROWS[1]} text="89" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <text x={34} y={ROWS[2]} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--foreground)">
              =
            </text>
            <Token x={X[0]} y={ROWS[2]} text="100" />
            <Plus x={mid(X[0], X[1])} y={ROWS[2]} />
            <Token x={X[1]} y={ROWS[2]} text="89" />
          </g>
        ) : null}
        {step >= 4 ? (
          <g data-enter={4}>
            <text x={34} y={ROWS[3]} textAnchor="middle" fontSize={26} fontWeight={800} fill="var(--foreground)">
              =
            </text>
            <Token x={X[0]} y={ROWS[3]} text="189" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
