"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { CELL, columnCenter, signCenter, viewWidth } from "@/components/math/column-layout";
import { formatNumber } from "@/lib/area-units";
import { digitsOf } from "@/lib/column-add";
import { columnMul, readMulColumn } from "@/lib/column-mul";
import { useRef, useState } from "react";

const n = formatNumber;

/** Lời đọc nhân a với một chữ số, theo mẫu SGK: "2 nhân 4 bằng 8, viết 8; 2 nhân 3 bằng 6, viết 6". */
function readRow(a: number, digit: number): string {
  return columnMul(a, digit)
    .filter((column) => column.digit !== null)
    .map((column, index, all) => readMulColumn(column, digit, index === all.length - 1).replace(`${column.digit} nhân ${digit} bằng`, `${digit} nhân ${column.digit} bằng`))
    .join("; ");
}

/** Lời cho từng bước; b có hai chữ số, chữ số hàng đơn vị và hàng chục đều khác 0. */
export function nhanHaiCaptions(a: number, b: number): string[] {
  const units = b % 10;
  const tens = Math.floor(b / 10);
  const first = a * units;
  const second = a * tens;
  return [
    `Đặt tính: hàng đơn vị thẳng hàng đơn vị. Con nhân ${n(a)} lần lượt với chữ số hàng đơn vị, rồi chữ số hàng chục của ${b}.`,
    `Nhân ${n(a)} với ${units}: ${readRow(a, units)}. Tích riêng thứ nhất là ${n(first)} (${n(first)} đơn vị).`,
    `Nhân ${n(a)} với ${tens} (${tens} chục): ${readRow(a, tens)}. Tích riêng thứ hai là ${n(second)} (${n(second)} chục, hay ${n(second * 10)} đơn vị). Viết lùi sang trái một cột.`,
    `Cộng hai tích riêng: ${n(first)} + ${n(second * 10)} = ${n(a * b)}. Vậy ${n(a)} × ${b} = ${n(a * b)}.`,
  ];
}

/** Nhân với số có hai chữ số: hai tích riêng, tích riêng thứ hai lùi sang trái một cột. */
export function NhanHaiChuSo({ a, b }: { a: number; b: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const units = b % 10;
  const tens = Math.floor(b / 10);
  const first = a * units;
  const second = a * tens;
  const result = a * b;
  const size = digitsOf(result).length;
  const width = viewWidth(size);
  const captions = nhanHaiCaptions(a, b);
  const x = (position: number) => columnCenter(size - 1 - position, size);

  const yA = 78;
  const yB = 122;
  const lineY = 146;
  const yFirst = 184;
  const ySecond = 228;
  const sumLineY = 252;
  const yResult = 290;

  const rowY = step === 1 ? yFirst : ySecond;
  const activeDigit = step === 1 ? 0 : 1;
  const partial = step < 1 ? "chưa nhân" : step === 1 ? `tích riêng thứ nhất ${first}` : step === 2 ? `hai tích riêng ${first} và ${second}` : `kết quả ${result}`;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${width} 326`}
        role="img"
        aria-label={`Phép nhân ${n(a)} × ${b}. ${step === 0 ? "Đã đặt tính, chưa nhân." : `Đến lúc này: ${partial}.`}`}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <text x={width / 2} y={30} fontSize={22} fill="var(--ink)">
          {n(a)} × {b} = {step === 3 ? n(result) : "?"}
        </text>

        {step === 1 || step === 2 ? (
          <g key={step} data-enter={step}>
            <rect x={signCenter(size) - CELL / 2} y={rowY - 28} width={width - 2 * (signCenter(size) - CELL / 2)} height={40} rx={12} fill="var(--sun)" opacity={0.4} />
            <rect x={x(activeDigit) - CELL / 2 + 4} y={yB - 28} width={CELL - 8} height={40} rx={12} fill="var(--sun)" opacity={0.7} />
          </g>
        ) : null}

        {digitsOf(a).map((digit, position) => (
          <text key={position} x={x(position)} y={yA} fontSize={30} fill="var(--ink)">
            {digit}
          </text>
        ))}
        <text x={signCenter(size)} y={yB} fontSize={30} fill="var(--ink)">
          ×
        </text>
        {digitsOf(b).map((digit, position) => (
          <text key={position} x={x(position)} y={yB} fontSize={30} fill="var(--ink)">
            {digit}
          </text>
        ))}
        <rect x={signCenter(size) - CELL / 2 + 4} y={lineY} width={width - 2 * (signCenter(size) - CELL / 2 + 4)} height={3} rx={1.5} fill="var(--ink)" />

        {step >= 1
          ? digitsOf(first).map((digit, position) => (
              <text key={`p1-${position}`} data-testid={`p1-${position}`} data-enter={1} x={x(position)} y={yFirst} fontSize={30} fill="var(--ink)">
                {digit}
              </text>
            ))
          : null}

        {step >= 2 ? (
          <g data-enter={2}>
            <rect data-testid="empty-cell" x={x(0) - CELL / 2 + 6} y={ySecond - 28} width={CELL - 12} height={38} rx={8} fill="none" stroke="var(--input)" strokeWidth={2.5} strokeDasharray="5 5" />
            {digitsOf(second).map((digit, position) => (
              <text key={`p2-${position}`} data-testid={`p2-${position}`} x={x(position + 1)} y={ySecond} fontSize={30} fill="var(--ink)">
                {digit}
              </text>
            ))}
          </g>
        ) : null}

        {step >= 3 ? (
          <g data-enter={3}>
            <rect x={signCenter(size) - CELL / 2 + 4} y={sumLineY} width={width - 2 * (signCenter(size) - CELL / 2 + 4)} height={3} rx={1.5} fill="var(--ink)" />
            {digitsOf(result).map((digit, position) => (
              <text key={`r-${position}`} data-testid={`r-${position}`} x={x(position)} y={yResult} fontSize={30} fill="var(--ink)">
                {digit}
              </text>
            ))}
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
