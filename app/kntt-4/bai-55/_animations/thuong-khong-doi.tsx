"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

/** Mỗi hàng là một phép chia cùng thương 3: [số bị chia, số chia, ghi chú]. */
export const thuongRows: [number, number, string][] = [
  [12, 4, ""],
  [36, 12, "nhân cả hai số với 3"],
  [6, 2, "chia cả hai số cho 2"],
];

export const thuongCaptions = [
  "12 : 4 = 3.",
  "Nhân số bị chia và số chia với 3: 12 × 3 = 36 và 4 × 3 = 12. Thương vẫn là 3: 36 : 12 = 3.",
  "Chia số bị chia và số chia cho 2: 12 : 2 = 6 và 4 : 2 = 2. Thương vẫn là 3: 6 : 2 = 3.",
];

/** Luyện tập 2: nhân (chia) số bị chia và số chia với (cho) cùng một số tự nhiên khác 0 thì thương không đổi. */
export function ThuongKhongDoi() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 150" role="img" aria-label={`Thương không đổi: ${thuongRows.slice(0, step + 1).map(([a, b]) => `${a} chia ${b} bằng ${a / b}`).join(", ")}`} className="block w-full" fontWeight={800}>
        {thuongRows.map(([a, b, note], i) =>
          step >= i ? (
            <g key={i} data-enter={i || undefined}>
              <text x={12} y={30 + i * 50} fontSize={28} fill="var(--ink)">{a} : {b} = {a / b}</text>
              {note ? <text x={12} y={48 + i * 50} fontSize={15} fill="var(--unit-ta)">{note}</text> : null}
            </g>
          ) : null,
        )}
      </svg>
      <StepControls step={step} captions={thuongCaptions} onChange={setStep} />
    </figure>
  );
}
