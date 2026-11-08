"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const HEADERS = [["Chục", "nghìn"], ["Nghìn"], ["Trăm"], ["Chục"], ["Đơn", "vị"]];
const COL = 66;
const X0 = 10;

/** Số hạng của từng hàng, như 36 515 → 30 000, 6 000, 500, 10, 5. */
export function placeValues(value: number): number[] {
  return String(value)
    .padStart(5, "0")
    .split("")
    .map((digit, index) => Number(digit) * 10 ** (4 - index));
}

/** Bảng 5 hàng: viết từng chữ số vào hàng, rồi thấy giá trị của nó. Hàng không có chữ số thì ghi 0. */
export function BangHang({ value, reading }: { value: number; reading: string }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const digits = String(value).padStart(5, "0").split("");
  const values = placeValues(value);
  const hasZero = digits.some((digit) => digit === "0");
  const terms = values.filter((term) => term > 0).map(formatNumber);
  const text = formatNumber(value);

  const captions = [
    "Bảng hàng có 5 hàng. Đọc từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.",
    `Viết từng chữ số của ${text} vào đúng hàng.${hasZero ? " Hàng nào không có chữ số thì ghi 0." : ""}`,
    "Mỗi chữ số có giá trị theo hàng của nó. Chữ số 0 thì giá trị là 0.",
    `Đọc số: ${reading}. Viết thành tổng: ${text} = ${terms.join(" + ")}.`,
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 350 214"
        role="img"
        aria-label={`Bảng hàng của số ${text}. ${step >= 1 ? `Chữ số từ hàng chục nghìn đến hàng đơn vị: ${digits.join(", ")}.` : "Chưa có chữ số nào."}${step >= 2 ? ` Giá trị các hàng: ${values.map(formatNumber).join(", ")}.` : ""}`}
        className="block w-full"
        fontWeight={800}
      >
        {HEADERS.map((lines, index) => {
          const x = X0 + index * COL;
          return (
            <g key={index}>
              <rect x={x} y={4} width={COL - 4} height={44} rx={8} fill="var(--ink)" />
              {lines.map((line, row) => (
                <text
                  key={line}
                  x={x + (COL - 4) / 2}
                  y={lines.length === 1 ? 32 : 24 + row * 16}
                  textAnchor="middle"
                  fontSize={14}
                  fill="white"
                >
                  {line}
                </text>
              ))}
              <rect x={x} y={54} width={COL - 4} height={56} rx={8} fill="var(--paper)" stroke="var(--input)" strokeWidth={3} />
              {step >= 1 ? (
                <text data-enter={1} x={x + (COL - 4) / 2} y={94} textAnchor="middle" fontSize={36} fill="var(--ink)">
                  {digits[index]}
                </text>
              ) : null}
            </g>
          );
        })}
        <text x={X0} y={134} fontSize={14} fill="var(--foreground)">
          Giá trị của chữ số:
        </text>
        {step >= 2
          ? values.map((term, index) => (
              <g key={index} data-enter={2}>
                <rect
                  x={X0 + index * COL}
                  y={142}
                  width={COL - 4}
                  height={32}
                  rx={8}
                  fill={term > 0 ? "var(--sun)" : "var(--secondary)"}
                />
                <text
                  x={X0 + index * COL + (COL - 4) / 2}
                  y={164}
                  textAnchor="middle"
                  fontSize={16}
                  fill="var(--foreground)"
                >
                  {formatNumber(term)}
                </text>
              </g>
            ))
          : null}
        {step >= 3 ? (
          <text data-enter={3} x={175} y={204} textAnchor="middle" fontSize={15} fill="var(--ink)">
            {`${text} = ${terms.join(" + ")}`}
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
