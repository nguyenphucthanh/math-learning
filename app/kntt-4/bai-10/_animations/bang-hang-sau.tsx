"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const HEADERS = [["Trăm", "nghìn"], ["Chục", "nghìn"], ["Nghìn"], ["Trăm"], ["Chục"], ["Đơn", "vị"]];
const NAMES = ["trăm nghìn", "chục nghìn", "nghìn", "trăm", "chục", "đơn vị"];
const COL = 58;
const X0 = 8;

/** Các chữ số của số có sáu chữ số, từ hàng trăm nghìn đến hàng đơn vị. */
export function sixDigits(value: number): number[] {
  return String(value).padStart(6, "0").split("").map(Number);
}

/** Bảng 6 hàng: xếp thẻ vào từng hàng, ghi chữ số, rồi viết và đọc số. Số cần có đúng sáu chữ số. */
export function BangHangSau({ value, reading }: { value: number; reading: string }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const digits = sixDigits(value);
  const text = formatNumber(value);
  const hasZero = digits.includes(0);
  const list = digits.flatMap((digit, index) => (digit > 0 ? [`${digit} ${NAMES[index]}`] : []));
  const listText = `${list.slice(0, -1).join(", ")} và ${list[list.length - 1]}`;

  const captions = [
    "Bảng hàng có 6 hàng. Từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn.",
    `Xếp thẻ vào bảng. Số ${text} gồm: ${listText}.`,
    `Ghi số thẻ của mỗi hàng.${hasZero ? " Hàng không có thẻ thì ghi 0." : ""}`,
    `Viết là: ${text}. Đọc là: ${reading}.`,
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 254"
        role="img"
        aria-label={`Bảng hàng của số ${text}. ${step >= 1 ? `Số thẻ ở từng hàng từ trăm nghìn đến đơn vị: ${digits.join(", ")}.` : "Chưa có thẻ nào."}${step >= 3 ? ` Đọc là ${reading}.` : ""}`}
        className="block w-full"
        fontWeight={800}
      >
        {HEADERS.map((lines, index) => {
          const x = X0 + index * COL;
          const w = COL - 4;
          return (
            <g key={index}>
              <rect x={x} y={4} width={w} height={44} rx={8} fill="var(--ink)" />
              {lines.map((line, row) => (
                <text key={line} x={x + w / 2} y={lines.length === 1 ? 32 : 24 + row * 16} textAnchor="middle" fontSize={14} fill="white">
                  {line}
                </text>
              ))}
              <rect x={x} y={54} width={w} height={100} rx={8} fill="var(--paper)" stroke="var(--input)" strokeWidth={3} />
              {step >= 1 ? (
                <g data-enter={1}>
                  {Array.from({ length: digits[index] }, (_, chip) => (
                    <rect key={chip} x={x + 7} y={142 - chip * 10} width={w - 14} height={8} rx={2} fill="var(--sun)" stroke="var(--ink)" strokeWidth={1.5} />
                  ))}
                </g>
              ) : null}
              <rect x={x} y={160} width={w} height={50} rx={8} fill="var(--paper)" stroke="var(--input)" strokeWidth={3} />
              {step >= 2 ? (
                <text data-enter={2} x={x + w / 2} y={197} textAnchor="middle" fontSize={34} fill="var(--ink)">
                  {digits[index]}
                </text>
              ) : null}
            </g>
          );
        })}
        {step >= 3 ? (
          <text data-enter={3} x={180} y={242} textAnchor="middle" fontSize={26} fill="var(--ink)" className="tabular-nums">
            {text}
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
