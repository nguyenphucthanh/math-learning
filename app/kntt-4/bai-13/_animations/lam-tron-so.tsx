"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { digitAt, hangName } from "@/lib/hang-lop";
import { decidingDigit, roundToPlace } from "@/lib/round-numbers";
import { useRef, useState } from "react";

const n = formatNumber;
const W = 30;
const GAP = 10;
const VIEW = 340;

/** Vị trí x của từng chữ số, có chừa khoảng giữa các lớp, canh giữa hình. */
function columns(length: number): number[] {
  const total = length * W + Math.floor((length - 1) / 3) * GAP;
  const start = (VIEW - total) / 2;
  return Array.from({ length }, (_, index) => {
    const position = length - 1 - index;
    return start + index * W + (Math.floor((length - 1) / 3) - Math.floor(position / 3)) * GAP;
  });
}

const clampX = (x: number) => Math.min(Math.max(x, 70), VIEW - 70);

/** Quy tắc làm tròn từng bước: tô hàng làm tròn, tô chữ số bên phải nó, so với 5. */
export function LamTronSo({ value, position }: { value: number; position: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const result = roundToPlace(value, position);
  const digits = String(value).split("");
  const resultDigits = String(result).split("");
  const xs = columns(digits.length);
  const resultXs = columns(resultDigits.length);
  const roundIndex = digits.length - 1 - position;
  const decideIndex = roundIndex + 1;
  const resultRoundIndex = resultDigits.length - 1 - position;
  const decide = decidingDigit(value, position);
  const up = decide >= 5;
  const carry = up && digitAt(value, position) === 9;
  const place = hangName(position);
  const next = hangName(position - 1);

  const verdict = decide < 5 ? `${decide} bé hơn 5, nên làm tròn xuống.` : decide === 5 ? "5 không bé hơn 5, nên làm tròn lên." : `${decide} lớn hơn 5, nên làm tròn lên.`;
  const captions = [
    `Số ${n(value)}. Con làm tròn số này đến ${place}.`,
    `Tìm ${place}: đó là chữ số ${digits[roundIndex]}. Chữ số này là hàng được giữ lại.`,
    `Nhìn chữ số ngay bên phải, ở ${next}: đó là ${decide}. ${verdict}`,
    `${up ? (carry ? `Làm tròn lên: chữ số ${digits[roundIndex]} thêm 1 thành 10, viết 0 và nhớ 1 sang hàng bên trái.` : `Làm tròn lên: chữ số ${digits[roundIndex]} thêm 1.`) : "Làm tròn xuống: giữ nguyên các chữ số bên trái."} Các chữ số bên phải thành 0. ${n(value)} ≈ ${n(result)}.`,
  ];
  const labels = [
    `Số ${n(value)}`,
    `Số ${n(value)}, hàng làm tròn là ${place}, chữ số ${digits[roundIndex]}`,
    `Chữ số ở ${next} là ${decide}, ${decide < 5 ? "bé hơn 5, làm tròn xuống" : "không bé hơn 5, làm tròn lên"}`,
    `${n(value)} làm tròn đến ${place} là ${n(result)}`,
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 214" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {digits.map((digit, index) => {
          const isRound = step >= 1 && index === roundIndex;
          const isDecide = step >= 2 && index === decideIndex;
          return (
            <g key={index}>
              <rect
                x={xs[index]}
                y={14}
                width={W - 2}
                height={44}
                rx={6}
                fill={isRound ? "var(--sun)" : isDecide ? "var(--sun)" : "white"}
                fillOpacity={isDecide && !isRound ? 0.35 : 1}
                stroke="var(--ink)"
                strokeWidth={isRound || isDecide ? 5 : 3}
              />
              <text x={xs[index] + (W - 2) / 2} y={46} textAnchor="middle" fontSize={24} fill="var(--ink)" className="tabular-nums">
                {digit}
              </text>
            </g>
          );
        })}

        {step === 1 ? (
          <g data-enter={1}>
            <text x={clampX(xs[roundIndex] + (W - 2) / 2)} y={84} textAnchor="middle" fontSize={14} fill="var(--ink)">
              ↑ {place}
            </text>
          </g>
        ) : null}
        {step === 2 ? (
          <g data-enter={2}>
            <text x={clampX(xs[decideIndex] + (W - 2) / 2)} y={84} textAnchor="middle" fontSize={14} fill="var(--ink)">
              ↑ {next}: {decide} {decide < 5 ? "< 5" : decide === 5 ? "= 5" : "> 5"}
            </text>
          </g>
        ) : null}

        {step >= 3 ? (
          <g data-enter={3}>
            <text x={VIEW / 2} y={104} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {up ? "Làm tròn lên ↓" : "Làm tròn xuống ↓"}
            </text>
            {resultDigits.map((digit, index) => (
              <g key={index}>
                <rect
                  x={resultXs[index]}
                  y={118}
                  width={W - 2}
                  height={44}
                  rx={6}
                  fill={index === resultRoundIndex ? "var(--sun)" : "white"}
                  stroke="var(--ink)"
                  strokeWidth={index === resultRoundIndex ? 5 : 3}
                />
                <text
                  x={resultXs[index] + (W - 2) / 2}
                  y={150}
                  textAnchor="middle"
                  fontSize={24}
                  fill="var(--ink)"
                  fillOpacity={index > resultRoundIndex ? 0.55 : 1}
                  className="tabular-nums"
                >
                  {digit}
                </text>
              </g>
            ))}
            <text x={VIEW / 2} y={196} textAnchor="middle" fontSize={18} fill="var(--ink)" className="tabular-nums">
              {n(value)} ≈ {n(result)}
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
