"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { columnDiv } from "@/lib/column-div";
import { useRef, useState } from "react";

const WIDTH = 360;
const CELL = 30;
const QCELL = 24;
const X0 = 20;
const Y0 = 66;
const ROW = 36;

/** Lời đọc theo SGK: "Hạ 5, được 25; 25 chia 5 được 5, viết 5. 5 nhân 5 bằng 25; 25 trừ 25 bằng 0, viết 0." */
export function chiaCaptions(a: number, divisor: number): string[] {
  const { steps, quotient, remainder } = columnDiv(a, divisor);
  const result = `${formatNumber(a)} : ${divisor} = ${formatNumber(quotient)}${remainder ? ` (dư ${remainder})` : ""}`;
  return [
    `Đặt tính: số bị chia ${formatNumber(a)} bên trái, số chia ${divisor} bên phải. Chia từ hàng cao nhất, hạ từng chữ số xuống.`,
    ...steps.map((step, index) => {
      const head =
        index === 0
          ? `${step.current} chia ${divisor}`
          : steps[index - 1].remainder === 0
            ? `Hạ ${step.current}; ${step.current} chia ${divisor}`
            : `Hạ ${step.current % 10}, được ${step.current}; ${step.current} chia ${divisor}`;
      const text = `${head} được ${step.quotientDigit}, viết ${step.quotientDigit}. ${step.quotientDigit} nhân ${divisor} bằng ${step.product}; ${step.current} trừ ${step.product} bằng ${step.remainder}, viết ${step.remainder}.`;
      return index === steps.length - 1 ? `${text} Vậy ${result}.` : text;
    }),
  ];
}

/** Chia số nhiều chữ số cho số có một chữ số, từng bước hạ chữ số xuống (chia viết như SGK). */
export function ChiaDatTinh({ a, divisor }: { a: number; divisor: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const { steps, quotient, remainder } = columnDiv(a, divisor);
  const digits = String(a).split("");
  const count = steps.length;
  const captions = chiaCaptions(a, divisor);
  const barX = X0 + CELL * digits.length + 8;
  const digitX = (column: number) => X0 + CELL * column + CELL / 2;
  const height = Y0 + ROW * count + 30;
  const finished = step === count;
  const quotientSoFar = steps
    .slice(0, step)
    .map((item) => item.quotientDigit)
    .join("");
  const active = step > 0 ? steps[step - 1] : null;
  const from = active && step === 1 ? 0 : (active?.column ?? 0);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={`Phép chia ${formatNumber(a)} : ${divisor}. ${quotientSoFar ? `Đã chia ${step} bước, thương đến lúc này ${quotientSoFar}${finished && remainder ? `, dư ${remainder}` : ""}.` : "Đã đặt tính, chưa chia."}`}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <text x={WIDTH / 2} y={30} fontSize={22} fill="var(--ink)">
          {formatNumber(a)} : {divisor} = {finished ? `${formatNumber(quotient)}${remainder ? ` (dư ${remainder})` : ""}` : "?"}
        </text>

        {active ? (
          <rect
            key={step}
            data-enter={step}
            x={X0 + CELL * from + 2}
            y={Y0 - 28}
            width={CELL * (active.column - from + 1) - 4}
            height={32}
            rx={10}
            fill="var(--sun)"
            opacity={0.4}
          />
        ) : null}

        {digits.map((digit, column) => (
          <text key={column} x={digitX(column)} y={Y0} fontSize={26} fill="var(--ink)">
            {digit}
          </text>
        ))}
        <rect x={barX} y={Y0 - 28} width={3} height={78} rx={1.5} fill="var(--ink)" />
        <rect x={barX} y={Y0 + 12} width={WIDTH - 8 - barX} height={3} rx={1.5} fill="var(--ink)" />
        <text x={barX + 24} y={Y0} fontSize={26} fill="var(--ink)">
          {divisor}
        </text>

        {steps.slice(0, step).map((item, index) => (
          <text
            key={`q-${index}`}
            data-testid={`q-${index}`}
            data-enter={index + 1}
            x={barX + 14 + QCELL * index}
            y={Y0 + 42}
            fontSize={26}
            fill="var(--ink)"
          >
            {item.quotientDigit}
          </text>
        ))}

        {steps.map((item, index) => {
          const y = Y0 + ROW * (index + 1);
          const next = steps[index + 1];
          return (
            <g key={`row-${index}`}>
              {step >= index + 1 ? (
                <text data-testid={`rem-${index}`} data-enter={index + 1} x={digitX(item.column)} y={y} fontSize={26} fill="var(--ink)">
                  {item.remainder}
                </text>
              ) : null}
              {next && step >= index + 2 ? (
                <text data-testid={`down-${index}`} data-enter={index + 2} x={digitX(next.column)} y={y} fontSize={26} fill="var(--ink)">
                  {digits[next.column]}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
