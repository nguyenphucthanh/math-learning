"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { columnDiv, readDivStep } from "@/lib/column-div";
import { useRef, useState } from "react";

const WIDTH = 360;
const MARGIN = 24;
const CELL = 34;
const QUOTIENT_CELL = 28;
const ROW = 36;
const TOP = 56;

export function chiaCaptions(a: number, divisor: number): string[] {
  const { steps, quotient, remainder } = columnDiv(a, divisor);
  const result = remainder ? `${formatNumber(quotient)} (dư ${remainder})` : formatNumber(quotient);
  return [
    `Đặt tính: số bị chia ${formatNumber(a)} bên trái, số chia ${divisor} bên phải. Con chia từ hàng cao nhất, từ trái sang phải.`,
    ...steps.map((step, index) => readDivStep(step, divisor, index === 0)),
    remainder
      ? `Vậy ${formatNumber(a)} : ${divisor} = ${result}. Số dư ${remainder} bé hơn số chia ${divisor}. Thử lại: ${formatNumber(quotient)} × ${divisor} + ${remainder} = ${formatNumber(a)}.`
      : `Vậy ${formatNumber(a)} : ${divisor} = ${result}. Thử lại: ${formatNumber(quotient)} × ${divisor} = ${formatNumber(a)}.`,
  ];
}

/** Chia số nhiều chữ số cho số có một chữ số, từng bước: chia, nhân, trừ, hạ. */
export function ChiaDatTinh({ a, divisor }: { a: number; divisor: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const { steps, quotient, remainder } = columnDiv(a, divisor);
  const digits = String(a).split("");
  const captions = chiaCaptions(a, divisor);
  const finished = step === captions.length - 1;
  const shown = steps.filter((_, index) => step >= index + 1);
  const x = (column: number) => MARGIN + CELL * column + CELL / 2;
  const rowY = (row: number) => TOP + ROW * row + 10;
  const barX = MARGIN + CELL * digits.length + 4;
  const height = TOP + ROW * (2 * steps.length + 1) + 20;
  const quotientText = shown.map((item) => item.quotientDigit).join("");

  function digitsAt(value: number, column: number) {
    return String(value)
      .split("")
      .map((digit, i, all) => ({ digit, column: column - (all.length - 1 - i) }));
  }

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-label={`Phép chia ${formatNumber(a)} : ${divisor}. ${
          shown.length
            ? `Đã chia ${shown.length} bước, thương đến lúc này là ${quotientText}${finished && remainder ? `, dư ${remainder}` : ""}.`
            : "Đã đặt tính, chưa chia."
        }`}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <text x={WIDTH / 2} y={30} fontSize={22} fill="var(--ink)">
          {formatNumber(a)} : {divisor} = {finished ? (remainder ? `${formatNumber(quotient)} (dư ${remainder})` : formatNumber(quotient)) : "?"}
        </text>

        {digits.map((digit, column) => (
          <text key={column} x={x(column)} y={rowY(0)} fontSize={30} fill="var(--ink)">
            {digit}
          </text>
        ))}
        <rect x={barX} y={TOP - 10} width={3} height={ROW + 6} rx={1.5} fill="var(--ink)" />
        <text x={barX + 22} y={rowY(0)} fontSize={30} fill="var(--ink)">
          {divisor}
        </text>
        <rect x={barX} y={TOP + ROW - 4} width={WIDTH - barX - 12} height={3} rx={1.5} fill="var(--ink)" />

        {shown.map((item, index) => {
          const last = index === steps.length - 1;
          const next = steps[index + 1];
          const enter = index + 1;
          const productRow = 2 * index + 1;
          const remainderRow = 2 * index + 2;
          const showRemainder = last || item.remainder > 0;
          return (
            <g key={item.column}>
              <text x={barX + 20 + QUOTIENT_CELL * index} y={rowY(1) - 6} data-enter={enter} fontSize={30} fill="var(--ink)">
                {item.quotientDigit}
              </text>
              <g data-enter={enter}>
                <text x={MARGIN - 8} y={rowY(productRow)} fontSize={26} fill="var(--ink)">
                  −
                </text>
                {digitsAt(item.product, item.column).map(({ digit, column }) => (
                  <text key={column} x={x(column)} y={rowY(productRow)} fontSize={30} fill="var(--ink)">
                    {digit}
                  </text>
                ))}
                <rect
                  x={x(item.column - String(item.product).length + 1) - CELL / 2}
                  y={rowY(productRow) + 8}
                  width={CELL * String(item.product).length}
                  height={3}
                  rx={1.5}
                  fill="var(--ink)"
                />
                {showRemainder ? (
                  <text x={x(item.column)} y={rowY(remainderRow)} fontSize={30} fill="var(--ink)">
                    {item.remainder}
                  </text>
                ) : null}
              </g>
              {next && step >= index + 2 ? (
                <text x={x(next.column)} y={rowY(remainderRow)} data-enter={index + 2} fontSize={30} fill="var(--ink)">
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
