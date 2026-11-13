"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const DAYS = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];
export const SHORT = ["T2", "T3", "T4", "T5", "T6"];
const BASE = 130;
const K = 30;
const BAR_W = 40;
const GAP = 20;
const X0 = 30;

export function nhatKyCaptions(values: number[]): string[] {
  const max = Math.max(...values);
  const min = Math.min(...values);
  return [
    `${DAYS[0]}, Rô-bốt đạp xe ${values[0]} km. Cột cao ${values[0]}.`,
    ...values.slice(1).map((v, i) => `${DAYS[i + 1]}, Rô-bốt đạp xe ${v} km.`),
    `Ghi các số theo thứ tự các ngày: ${values.join(", ")}. Đây là dãy số liệu. Dãy có ${values.length} số, kể cả các số giống nhau.`,
    `Số thứ nhất là ${values[0]}, số thứ ba là ${values[2]}, số thứ năm là ${values[4]}. Số thứ n là số ở vị trí thứ n, không phải giá trị n. Nhiều nhất là ${max} km, ít nhất là ${min} km.`,
  ];
}

/** Ghi từng ngày thành cột rồi thành dãy số liệu. Mặc định là số liệu của sách: 1, 2, 2, 2, 3. */
export function NhatKy({ values = [1, 2, 2, 2, 3] }: { values?: number[] }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const last = values.length + 1;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const label = step === 0 ? "đã ghi ngày đầu" : step < values.length ? `đã ghi ${step + 1} ngày` : step === values.length ? "đã thành dãy số liệu" : "đã đọc số thứ n, nhiều nhất, ít nhất";

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 240" role="img" aria-label={`Quãng đường đạp xe: ${values.join(", ")} km, ${label}.`} className="block w-full">
        <line x1={10} x2={330} y1={BASE} y2={BASE} stroke="var(--ink)" strokeWidth={2} />
        {values.map((v, i) => {
          const x = X0 + i * (BAR_W + GAP);
          const shown = step >= i;
          const mark = step === last && (v === max || v === min);
          return shown ? (
            <g key={i} data-enter={i} data-testid={`cot-${i}`}>
              <rect x={x} y={BASE - v * K} width={BAR_W} height={v * K} rx={4} fill="var(--unit-second)" stroke={mark ? "var(--sun)" : "var(--ink)"} strokeWidth={mark ? 5 : 2} />
              <text x={x + BAR_W / 2} y={BASE - v * K - 8} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
                {v}
              </text>
              <text x={x + BAR_W / 2} y={BASE + 20} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
                {SHORT[i]}
              </text>
              {step >= last ? (
                <text data-enter={last} x={x + BAR_W / 2} y={BASE + 62} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
                  thứ {i + 1}
                </text>
              ) : null}
            </g>
          ) : null;
        })}
        {step >= values.length ? (
          <text data-enter={values.length} data-testid="day-so" x={170} y={BASE + 44} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
            {values.join(", ")}
          </text>
        ) : null}
        {step === last ? (
          <text data-enter={last} x={170} y={BASE + 92} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
            nhiều nhất {max} km, ít nhất {min} km
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={nhatKyCaptions(values)} onChange={setStep} />
    </figure>
  );
}
