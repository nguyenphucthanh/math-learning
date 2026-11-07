"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const BASELINE = 186;
const BARS = [
  { name: "kg", x: 14, height: 36, color: "var(--ink)" },
  { name: "yến", x: 94, height: 72, color: "var(--unit-yen)" },
  { name: "tạ", x: 174, height: 108, color: "var(--unit-ta)" },
  { name: "tấn", x: 254, height: 144, color: "var(--unit-tan)" },
];

const captions = [
  "Con đã biết ki-lô-gam. Một túi đường nặng khoảng 1 kg.",
  "Vật nặng hơn thì dùng đơn vị lớn hơn. 10 kg gộp lại là 1 yến.",
  "10 yến gộp lại là 1 tạ. Mỗi bậc gấp 10 lần bậc trước.",
  "10 tạ gộp lại là 1 tấn.",
  `Đi hai bậc thì gấp 10 × 10 = 100 lần. Đi ba bậc thì gấp 1 000 lần. Vậy 1 tạ = 100 kg và 1 tấn = ${formatNumber(1000)} kg.`,
];

/** Thang đơn vị khối lượng: mỗi bậc gấp 10 lần bậc trước. */
export function MassLadder() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const shown = BARS.filter((_, index) => index <= Math.min(step, 3));

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 262"
        role="img"
        aria-label={`Thang đơn vị khối lượng, đã hiện ${shown.map((bar) => bar.name).join(", ")}${step >= 4 ? "; 1 tạ = 100 kg và 1 tấn = 1 000 kg" : ""}`}
        className="block w-full"
      >
        {BARS.map((bar, index) =>
          step >= index ? (
            <g key={bar.name} data-enter={index} data-scale={0.8}>
              <rect x={bar.x} y={BASELINE - bar.height} width={56} height={bar.height} rx={8} fill={bar.color} />
              <text x={bar.x + 28} y={BASELINE - bar.height / 2 + 6} textAnchor="middle" fontSize={20} fontWeight={800} fill="white">
                1
              </text>
              <text x={bar.x + 28} y={BASELINE + 24} textAnchor="middle" fontSize={20} fontWeight={800} fill={bar.color}>
                {bar.name}
              </text>
              {index > 0 ? (
                <text
                  x={bar.x - 12}
                  y={BASELINE - bar.height - 10}
                  textAnchor="middle"
                  fontSize={18}
                  fontWeight={800}
                  fill={bar.color}
                >
                  × 10
                </text>
              ) : null}
            </g>
          ) : null,
        )}

        {step >= 4 ? (
          <g data-enter={4}>
            <text x={170} y={232} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--unit-ta)">
              1 tạ = 100 kg
            </text>
            <text x={170} y={254} textAnchor="middle" fontSize={18} fontWeight={800} fill="var(--unit-tan)">
              1 tấn = {formatNumber(1000)} kg
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
