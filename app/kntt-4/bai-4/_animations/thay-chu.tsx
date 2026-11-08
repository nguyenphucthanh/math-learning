"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;

const captions = [
  "40 − b là biểu thức chứa chữ b. Chữ b thay cho một số.",
  "Muốn tính, con thay chữ b bằng một số. Nếu b = 15 thì 40 − b = 40 − 15.",
  "40 − 15 = 25. Vậy khi b = 15, giá trị của biểu thức 40 − b là 25.",
  "Đổi số khác thì giá trị khác. Nếu b = 10 thì 40 − b = 40 − 10 = 30.",
];

/** Ô chứa một vế của biểu thức, rộng `width`, giữa tại `cx`. */
function Tile({ cx, y, width, text, fill, enter }: { cx: number; y: number; width: number; text: string; fill?: string; enter?: number }) {
  return (
    <g data-enter={enter}>
      <rect x={cx - width / 2} y={y} width={width} height={44} rx={12} fill={fill ?? "none"} fillOpacity={fill ? 0.5 : undefined} stroke="var(--ink)" strokeWidth={2} />
      <text x={cx} y={y + 31} fontSize={26} fill="var(--ink)" textAnchor="middle">{text}</text>
    </g>
  );
}

/** Thay chữ b bằng số trong 40 − b, rồi tính. */
export function ThayChu() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} 250`}
        role="img"
        aria-label={
          step === 0
            ? "Biểu thức 40 − b chứa chữ b."
            : step === 1
              ? "Thay b bằng 15: 40 − 15."
              : step === 2
                ? "40 − 15 = 25."
                : "Với b = 10: 40 − 10 = 30."
        }
        className="block w-full"
        fontWeight={800}
      >
        <Tile cx={110} y={10} width={64} text="40" />
        <text x={160} y={42} fontSize={28} fill="var(--ink)" textAnchor="middle">−</text>
        <Tile cx={210} y={10} width={64} text="b" fill="var(--sun)" />

        {step >= 1 ? (
          <g data-enter={1}>
            <text x={180} y={78} fontSize={16} fill="var(--ink)" textAnchor="middle">Thay b = 15</text>
            <Tile cx={110} y={90} width={64} text="40" />
            <text x={160} y={122} fontSize={28} fill="var(--ink)" textAnchor="middle">−</text>
            <Tile cx={210} y={90} width={64} text="15" fill="var(--sun)" />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={262} y={122} fontSize={28} fill="var(--ink)" textAnchor="middle">=</text>
            <Tile cx={316} y={90} width={56} text="25" fill="var(--good)" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <text x={180} y={178} fontSize={16} fill="var(--ink)" textAnchor="middle">Thay b = 10</text>
            <text x={180} y={218} fontSize={26} fill="var(--ink)" textAnchor="middle">
              40 − 10 = <tspan fill="var(--good)">30</tspan>
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
