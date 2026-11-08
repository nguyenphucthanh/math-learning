"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const LEFT = 64;
const SCALE = 2.6;
const BAR = 28;
const rows = [14, 58, 102];

const captions = [
  "Đội Một trồng được 60 cây. Ta vẽ một đoạn thẳng cho đội Một.",
  "Đội Hai trồng hơn đội Một 20 cây. Đoạn của đội Hai dài hơn đoạn của đội Một một khúc 20 cây.",
  "Đội Ba trồng ít hơn đội Hai 10 cây. Đoạn của đội Ba ngắn hơn đoạn của đội Hai (không phải đội Một) một khúc 10 cây. Ngoặc hỏi cả ba đội.",
  "Bước 1: tìm số cây của đội Hai. 60 + 20 = 80 (cây).",
  "Bước 2: tìm số cây của đội Ba. Đội Ba ít hơn đội Hai nên lấy 80 − 10 = 70 (cây).",
  "Bước 3: tìm cả ba đội. 60 + 80 + 70 = 210 (cây). Đáp số: 210 cây.",
];

const x = (trees: number) => LEFT + Math.round(trees * SCALE);

const labels = ["Đội 1:", "Đội 2:", "Đội 3:"];

/** Sơ đồ ba đội trồng cây (SGK trang 19): vẽ từng đoạn, rồi giải ba bước. */
export function SoDoBaDoi() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 270"
        role="img"
        aria-label={
          step === 0
            ? "Đội Một trồng 60 cây."
            : step === 1
              ? "Đội Hai trồng hơn đội Một 20 cây."
              : step === 2
                ? "Đội Ba trồng ít hơn đội Hai 10 cây. Hỏi cả ba đội trồng bao nhiêu cây."
                : step === 3
                  ? "Đội Hai trồng 60 + 20 = 80 cây."
                  : step === 4
                    ? "Đội Ba trồng 80 − 10 = 70 cây."
                    : "Cả ba đội trồng 60 + 80 + 70 = 210 cây."
        }
        className="block w-full"
        fontWeight={800}
      >
        {labels.map((label, index) => (
          <text key={label} x={LEFT - 8} y={rows[index] + 20} textAnchor="end" fontSize={14} fill="var(--ink)">
            {label}
          </text>
        ))}

        <rect x={LEFT} y={rows[0]} width={x(60) - LEFT} height={BAR} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <text x={(LEFT + x(60)) / 2} y={rows[0] + 20} textAnchor="middle" fontSize={16} fill="var(--ink)">
          {step >= 3 ? "60" : "60 cây"}
        </text>

        {step >= 1 ? (
          <g data-enter={1}>
            <rect x={LEFT} y={rows[1]} width={x(60) - LEFT} height={BAR} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
            <rect x={x(60)} y={rows[1]} width={x(80) - x(60)} height={BAR} fill="var(--sun)" fillOpacity={0.45} stroke="var(--ink)" strokeWidth={3} strokeDasharray="6 4" />
            <text x={(x(60) + x(80)) / 2} y={rows[1] + 20} textAnchor="middle" fontSize={14} fill="var(--ink)">
              20 cây
            </text>
            {step >= 3 ? (
              <text x={(LEFT + x(60)) / 2} y={rows[1] + 20} textAnchor="middle" fontSize={16} fill="var(--ink)">
                60
              </text>
            ) : null}
          </g>
        ) : null}

        {step >= 2 ? (
          <g data-enter={2}>
            <rect x={LEFT} y={rows[2]} width={x(70) - LEFT} height={BAR} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
            <rect x={x(70)} y={rows[2]} width={x(80) - x(70)} height={BAR} fill="none" stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 4" />
            <text x={(x(70) + x(80)) / 2} y={rows[2] + 48} textAnchor="middle" fontSize={14} fill="var(--ink)">
              10 cây
            </text>
            <path d="M296 14 Q308 14 308 28 L308 70 Q308 80 318 80 Q308 80 308 90 L308 116 Q308 130 296 130" fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
            <text x={322} y={86} fontSize={16} fill="var(--ink)">
              ?
            </text>
          </g>
        ) : null}

        {step >= 3 ? (
          <text data-enter={3} x={20} y={176} fontSize={17} fill="var(--ink)">
            Đội Hai: 60 + 20 = 80 (cây)
          </text>
        ) : null}
        {step >= 4 ? (
          <text data-enter={4} x={20} y={208} fontSize={17} fill="var(--ink)">
            Đội Ba: 80 − 10 = 70 (cây)
          </text>
        ) : null}
        {step >= 5 ? (
          <g data-enter={5}>
            <rect x={14} y={222} width={332} height={36} rx={12} fill="var(--sun)" fillOpacity={0.45} />
            <text x={20} y={246} fontSize={17} fill="var(--ink)">
              Cả ba đội: 60 + 80 + 70 = 210 (cây)
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
