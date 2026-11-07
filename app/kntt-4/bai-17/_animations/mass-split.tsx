"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const captions = [
  "Đổi 4 yến 5 kg sang ki-lô-gam. Đây là 4 yến và 5 kg nữa.",
  "Mỗi yến là 10 kg.",
  "4 yến = 10 + 10 + 10 + 10 = 40 kg.",
  "Cộng thêm 5 kg: 40 + 5 = 45 kg. Vậy 4 yến 5 kg = 45 kg.",
  "Đừng viết liền 4 và 5, cũng đừng viết 405 kg. 4 yến chỉ là 40 kg, không phải 400 kg.",
];

const SMALL = [0, 1, 2, 3, 4].map((index) => ({ x: 284 + (index % 3) * 17, y: 52 + Math.floor(index / 3) * 17 }));

/** Tách số đo ghép: 4 yến 5 kg = 40 kg + 5 kg. */
export function MassSplit() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 214"
        role="img"
        aria-label={`4 hộp yến và 5 ô ki-lô-gam${step >= 2 ? "; 4 yến = 40 kg" : ""}${step >= 3 ? "; 40 + 5 = 45 kg" : ""}${step >= 4 ? "; không phải 405 kg" : ""}`}
        className="block w-full"
      >
        <text x={143} y={30} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--unit-yen)">
          4 yến
        </text>
        <text x={306} y={30} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
          5 kg
        </text>

        {[0, 1, 2, 3].map((index) => (
          <g key={index}>
            <rect x={14 + index * 66} y={42} width={60} height={72} rx={8} fill="var(--unit-yen)" />
            <text x={44 + index * 66} y={72} textAnchor="middle" fontSize={18} fontWeight={800} fill="white">
              1 yến
            </text>
            {step >= 1 ? (
              <text data-enter={1} x={44 + index * 66} y={98} textAnchor="middle" fontSize={18} fontWeight={800} fill="white">
                10 kg
              </text>
            ) : null}
          </g>
        ))}
        {SMALL.map((cell) => (
          <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width={14} height={14} rx={3} fill="var(--ink)" />
        ))}

        {step >= 2 ? (
          <text data-enter={2} x={143} y={146} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--unit-yen)">
            4 yến = 40 kg
          </text>
        ) : null}
        {step >= 3 ? (
          <text data-enter={3} x={170} y={178} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--foreground)">
            40 + 5 = 45 kg
          </text>
        ) : null}
        {step >= 4 ? (
          <g data-enter={4}>
            <rect x={238} y={188} width={86} height={26} rx={8} fill="var(--oops)" />
            <text x={281} y={207} textAnchor="middle" fontSize={16} fontWeight={800} fill="white">
              405 kg
            </text>
            <line x1={244} y1={201} x2={318} y2={201} stroke="white" strokeWidth={3} strokeLinecap="round" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
