"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { columnDiv, type DivStep } from "@/lib/column-div";
import { useRef, useState } from "react";

const WIDTH = 360;
const CELL = 30;
const QCELL = 24;
const X0 = 20;
const Y0 = 66;
const ROW = 34;

/** Lời đọc phép nhân thương với số chia hai chữ số, theo SGK: "8 nhân 2 bằng 16, viết 6 nhớ 1; 8 nhân 1 bằng 8, thêm 1 bằng 9, viết 9". */
function readMultiply(q: number, divisor: number): string {
  const unit = divisor % 10;
  const ten = Math.floor(divisor / 10);
  const low = q * unit;
  const carry = Math.floor(low / 10);
  const high = q * ten + carry;
  const first = `${q} nhân ${unit} bằng ${low}, viết ${low % 10}${carry ? ` nhớ ${carry}` : ""}`;
  const second = `${q} nhân ${ten} bằng ${q * ten}${carry ? `, thêm ${carry} bằng ${high}` : ""}, viết ${high}`;
  return `${first}. ${second}.`;
}

function readStep(step: DivStep, divisor: number, index: number, previous: DivStep | undefined): string {
  const head =
    index === 0
      ? `${formatNumber(step.current)} chia ${divisor}`
      : previous && previous.remainder === 0 && step.current < 10
        ? `Hạ ${step.current}; ${step.current} chia ${divisor}`
        : `Hạ ${step.current % 10}, được ${formatNumber(step.current)}; ${formatNumber(step.current)} chia ${divisor}`;
  const said = `${head} được ${step.quotientDigit}, viết ${step.quotientDigit}.`;
  if (step.quotientDigit === 0) return said;
  return `${said} ${readMultiply(step.quotientDigit, divisor)} ${formatNumber(step.current)} trừ ${formatNumber(step.product)} bằng ${step.remainder}, viết ${step.remainder}.`;
}

/** Lời đọc từng bước, bước đầu là đặt tính. */
export function chiaHaiCaptions(a: number, divisor: number): string[] {
  const { steps, quotient, remainder } = columnDiv(a, divisor);
  const result = `${formatNumber(a)} : ${divisor} = ${formatNumber(quotient)}${remainder ? ` (dư ${remainder})` : ""}`;
  return [
    `Đặt tính: số bị chia ${formatNumber(a)} bên trái, số chia ${divisor} bên phải. Lấy từ trái sang phải số đủ lớn để chia cho ${divisor}.`,
    ...steps.map((step, index) => {
      const text = readStep(step, divisor, index, steps[index - 1]);
      return index === steps.length - 1 ? `${text} Vậy ${result}.` : text;
    }),
  ];
}

/** Chia cho số có hai chữ số theo cột: mỗi bước một lần "chia, nhân, trừ, hạ". */
export function ChiaHaiChuSo({ a, divisor }: { a: number; divisor: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const { steps, quotient, remainder } = columnDiv(a, divisor);
  const digits = String(a).split("");
  const count = steps.length;
  const captions = chiaHaiCaptions(a, divisor);
  const barX = X0 + CELL * digits.length + 8;
  const digitX = (column: number) => X0 + CELL * column + CELL / 2;
  const edgeX = (column: number) => X0 + CELL * (column + 1) - 7;
  const height = Y0 + ROW * (2 * count) + 30;
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
        <rect x={barX} y={Y0 - 28} width={3} height={2 * ROW * count + 42} rx={1.5} fill="var(--ink)" />
        <rect x={barX} y={Y0 + 12} width={WIDTH - 8 - barX} height={3} rx={1.5} fill="var(--ink)" />
        <text x={barX + 8 + 13 * String(divisor).length} y={Y0} fontSize={26} fill="var(--ink)">
          {divisor}
        </text>

        {steps.slice(0, step).map((item, index) => (
          <text key={`q-${index}`} data-testid={`q-${index}`} data-enter={index + 1} x={barX + 14 + QCELL * index} y={Y0 + 42} fontSize={26} fill="var(--ink)">
            {item.quotientDigit}
          </text>
        ))}

        {steps.map((item, index) => {
          const productY = Y0 + ROW * (2 * index + 1);
          const remY = productY + ROW;
          const next = steps[index + 1];
          const width = String(item.current).length;
          return (
            <g key={`row-${index}`}>
              {step >= index + 1 ? (
                <g data-enter={index + 1}>
                  <text data-testid={`prod-${index}`} x={edgeX(item.column)} y={productY} textAnchor="end" fontSize={26} fill="var(--ink)">
                    {item.product}
                  </text>
                  <rect x={X0 + CELL * (item.column + 1 - width) + 2} y={productY + 8} width={CELL * width - 6} height={2.5} rx={1.25} fill="var(--ink)" />
                  <text data-testid={`rem-${index}`} x={edgeX(item.column)} y={remY} textAnchor="end" fontSize={26} fill="var(--ink)">
                    {item.remainder}
                  </text>
                </g>
              ) : null}
              {next && step >= index + 2 ? (
                <text data-testid={`down-${index}`} data-enter={index + 2} x={digitX(next.column)} y={remY} fontSize={26} fill="var(--ink)">
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
