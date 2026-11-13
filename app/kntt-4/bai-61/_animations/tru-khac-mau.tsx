"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const truKhacMauCaptions = [
  "Tớ có 7/8 cái bánh (băng trên). Tớ ăn 1/4 cái bánh (băng dưới chia 4 phần, tô 1 phần). Hai phân số khác mẫu số.",
  "Quy đồng mẫu số: chia mỗi phần của băng dưới thành 2 phần nhỏ (nét đứt). 1/4 = (1 × 2)/(4 × 2) = 2/8.",
  "Bây giờ cùng mẫu số 8: 7/8 − 2/8 = (7 − 2)/8 = 5/8.",
];

/** Hai băng: 7/8 và 1/4. Chia đôi mỗi phần của băng 1/4 để thấy 1/4 = 2/8. */
export function TruKhacMau() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["băng 7/8 và băng 1/4", "chia đôi mỗi phần băng 1/4 thì 1/4 bằng 2/8", "7/8 trừ 2/8 bằng 5/8"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 250" role="img" aria-label={`Trừ khác mẫu số 7/8 − 1/4: ${label}`} className="block w-full" fontWeight={800}>
        <text x={18} y={16} fontSize={16} fill="var(--foreground)">7/8</text>
        <g stroke="var(--ink)" strokeWidth={2.5}>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={18 + i * 38} y={24} width={38} height={40} rx={4} fill={i < 7 ? "var(--unit-tan)" : "white"} fillOpacity={i < 7 ? 0.6 : 1} />
          ))}
        </g>
        <text x={18} y={96} fontSize={16} fill="var(--foreground)">1/4</text>
        <g stroke="var(--ink)" strokeWidth={2.5}>
          {Array.from({ length: 4 }, (_, i) => (
            <rect key={i} x={18 + i * 76} y={104} width={76} height={40} rx={4} fill={i < 1 ? "var(--unit-mm2)" : "white"} fillOpacity={i < 1 ? 0.6 : 1} />
          ))}
        </g>
        {step >= 1 ? (
          <g data-enter={1}>
            <g stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="5 4">
              {Array.from({ length: 4 }, (_, i) => (
                <line key={i} x1={18 + i * 76 + 38} y1={104} x2={18 + i * 76 + 38} y2={144} />
              ))}
            </g>
            <text x={170} y={176} fontSize={18} textAnchor="middle" fill="var(--unit-mm2)">1/4 = (1 × 2)/(4 × 2) = 2/8</text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={170} y={218} fontSize={20} textAnchor="middle" fill="var(--ink)">7/8 − 2/8 = (7 − 2)/8 = 5/8</text>
          </g>
        ) : null}
        {step === 0 ? <text x={170} y={218} fontSize={20} textAnchor="middle" fill="var(--ink)">7/8 − 1/4 = ?</text> : null}
      </svg>
      <StepControls step={step} captions={truKhacMauCaptions} onChange={setStep} />
    </figure>
  );
}
