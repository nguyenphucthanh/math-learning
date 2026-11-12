"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { CELL, columnCenter, signCenter, viewWidth } from "@/components/math/column-layout";
import { formatNumber } from "@/lib/area-units";
import { digitsOf } from "@/lib/column-add";
import { columnMul, readMulColumn } from "@/lib/column-mul";
import { useRef, useState } from "react";

export function nhanCaptions(a: number, b: number): string[] {
  const digitColumns = columnMul(a, b).filter((column) => column.digit !== null);
  return [
    `Đặt tính: hàng đơn vị thẳng hàng đơn vị. Con nhân ${b} lần lượt với từng chữ số của ${formatNumber(a)}, từ phải sang trái.`,
    ...digitColumns.map((column, index) =>
      index === digitColumns.length - 1
        ? `${readMulColumn(column, b, true)}. Vậy ${formatNumber(a)} × ${b} = ${formatNumber(a * b)}.`
        : `${readMulColumn(column, b)}.`,
    ),
  ];
}

/** Nhân số nhiều chữ số với số có một chữ số, từng cột từ phải sang trái. */
export function NhanDatTinh({ a, b }: { a: number; b: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const columns = columnMul(a, b);
  const size = columns.length;
  const digitCount = digitsOf(a).length;
  const width = viewWidth(size);
  /** Cột số nhớ cuối hiện cùng bước với cột chữ số cuối, vì SGK viết cả hai chữ số một lần. */
  const stepOf = (position: number) => Math.min(position + 1, digitCount);
  const captions = nhanCaptions(a, b);
  const index = (position: number) => size - 1 - position;
  const topDigits = digitsOf(a);
  const done = columns.filter((column) => step >= stepOf(column.position));
  const finished = step === captions.length - 1;
  const partial = done
    .map((column) => column.write)
    .reverse()
    .join("");
  const current = columns.find((column) => column.digit !== null && column.position + 1 === step);

  const carryY = 76;
  const topY = 116;
  const bottomY = 160;
  const lineY = 184;
  const resultY = 222;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${width} 262`}
        role="img"
        aria-label={`Phép nhân ${formatNumber(a)} × ${b}. ${partial ? `Đã nhân ${done.length} cột, kết quả đến lúc này ${partial}.` : "Đã đặt tính, chưa nhân."}`}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <text x={width / 2} y={30} fontSize={22} fill="var(--ink)">
          {formatNumber(a)} × {b} = {finished ? formatNumber(a * b) : "?"}
        </text>

        {current ? (
          <rect
            key={step}
            data-enter={step}
            x={columnCenter(index(current.position), size) - CELL / 2 + 2}
            y={carryY - 20}
            width={CELL - 4}
            height={resultY + 26 - (carryY - 20)}
            rx={12}
            fill="var(--sun)"
            opacity={0.4}
          />
        ) : null}

        {topDigits.map((digit, position) => (
          <text key={position} x={columnCenter(index(position), size)} y={topY + 10} fontSize={30} fill="var(--ink)">
            {digit}
          </text>
        ))}
        <text x={signCenter(size)} y={bottomY + 10} fontSize={30} fill="var(--ink)">
          ×
        </text>
        <text x={columnCenter(size - 1, size)} y={bottomY + 10} fontSize={30} fill="var(--ink)">
          {b}
        </text>
        <rect x={signCenter(size) - CELL / 2 + 4} y={lineY} width={width - 2 * (signCenter(size) - CELL / 2 + 4)} height={3} rx={1.5} fill="var(--ink)" />

        {columns.map((column) =>
          column.digit !== null && column.position < digitCount - 1 && column.carryOut > 0 && step >= column.position + 1 ? (
            <g key={`carry-${column.position}`} data-enter={column.position + 1} data-scale={0.3}>
              <circle cx={columnCenter(index(column.position + 1), size)} cy={carryY} r={13} fill="var(--sun)" />
              <text x={columnCenter(index(column.position + 1), size)} y={carryY + 6} fontSize={18} fill="var(--ink)">
                {column.carryOut}
              </text>
            </g>
          ) : null,
        )}

        {done.map((column) => (
          <text
            key={`write-${column.position}`}
            data-testid={`write-${column.position}`}
            data-enter={stepOf(column.position)}
            x={columnCenter(index(column.position), size)}
            y={resultY + 10}
            fontSize={30}
            fill="var(--ink)"
          >
            {column.write}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
