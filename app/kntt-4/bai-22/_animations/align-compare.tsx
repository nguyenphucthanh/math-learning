"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { columnCenter, PLACE_LABELS, signCenter, VIEW_WIDTH, CELL } from "@/components/math/column-layout";
import { useRef, useState } from "react";

const A = 5839;
const B = 712;
const SIZE = 5;

/** Chữ số theo cột (0 là cột trái nhất). `null` là ô trống. */
function row(value: number | string, shift: number): (string | null)[] {
  const digits = String(value).split("");
  return Array.from({ length: SIZE }, (_, column) => {
    const at = column - (SIZE - digits.length - shift);
    return at >= 0 && at < digits.length ? digits[at] : null;
  });
}

const wrong = { bottom: row(B, 1), result: row(A + B * 10, 0) };
const right = { bottom: row(B, 0), result: row(A + B, 0) };

const captions = [
  "Nếu viết 712 sát bên trái, chữ số 7 (trăm) đứng dưới chữ số 5 (nghìn). Ta cộng nhầm hàng nên được 12 959. Kết quả sai.",
  "Phải viết hàng đơn vị thẳng hàng đơn vị: 2 dưới 9, 1 dưới 3, 7 dưới 8. Chữ số cùng hàng đứng cùng cột, nên được 6 551.",
];

/** So sánh đặt tính lệch cột và đặt tính thẳng hàng với 5 839 + 712. */
export function AlignCompare() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const current = step === 0 ? wrong : right;
  const color = step === 0 ? "var(--oops)" : "var(--good)";
  const top = row(A, 0);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} 236`}
        role="img"
        aria-label={step === 0 ? "5 839 cộng 712, đặt lệch cột, kết quả sai 12 959" : "5 839 cộng 712, đặt thẳng hàng, kết quả đúng 6 551"}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        {Array.from({ length: SIZE }, (_, column) => {
          const [first, second] = PLACE_LABELS[SIZE - 1 - column];
          const x = columnCenter(column, SIZE);
          return (
            <text key={column} x={x} y={22} fontSize={14} fill="var(--ink)" fontWeight={700}>
              <tspan x={x}>{first}</tspan>
              <tspan x={x} dy={17}>
                {second}
              </tspan>
            </text>
          );
        })}
        {top.map((digit, column) =>
          digit ? (
            <text key={column} x={columnCenter(column, SIZE)} y={94} fontSize={30} fill="var(--ink)">
              {digit}
            </text>
          ) : null,
        )}
        <text x={signCenter(SIZE)} y={138} fontSize={30} fill="var(--ink)">
          +
        </text>
        <g key={`bottom-${step}`} data-enter={step} data-scale={0.8}>
          {current.bottom.map((digit, column) =>
            digit ? (
              <text key={column} x={columnCenter(column, SIZE)} y={138} fontSize={30} fill={color}>
                {digit}
              </text>
            ) : null,
          )}
        </g>
        <rect x={signCenter(SIZE) - CELL / 2 + 4} y={152} width={VIEW_WIDTH - 2 * (signCenter(SIZE) - CELL / 2 + 4)} height={3} rx={1.5} fill="var(--ink)" />
        <g key={`result-${step}`} data-enter={step} data-scale={0.8}>
          {current.result.map((digit, column) =>
            digit ? (
              <text key={column} x={columnCenter(column, SIZE)} y={198} fontSize={30} fill={color}>
                {digit}
              </text>
            ) : null,
          )}
        </g>
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
