"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const LEFT = 20;
const BAR_Y = 44;
const BAR_H = 36;
/** Thùng 150 l rộng 320, tức 64 cho 30 l. Làm tròn sẵn để server và client vẽ giống nhau. */
const SEGMENTS = [
  { from: LEFT, width: 64, label: "30 l", enter: 1 },
  { from: LEFT + 64, width: 128, label: "60 l", enter: 2 },
  { from: LEFT + 192, width: 85, label: "40 l", enter: 3 },
];
const REST = { from: LEFT + 277, width: 43, label: "20 l" };

const captions = [
  "Một thùng dầu có 150 l. Ta chia thùng thành các lần bán.",
  "Lần đầu bán 30 l.",
  "Lần thứ hai bán gấp đôi lần đầu. Bước 1: 30 × 2 = 60 (l).",
  "Lần thứ ba bán 40 l.",
  "Bước 2: số lít đã bán. 30 + 60 + 40 = 130 (l).",
  "Bước 3: số lít còn lại. 150 − 130 = 20 (l). Hỏi còn lại thì ta trừ.",
];

/** Bài toán "còn lại": hai bước cộng, nhân rồi một bước trừ. Số liệu riêng, khác bài thùng nước mắm trong SGK. */
export function ThungDau() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 230"
        role="img"
        aria-label={
          step === 0
            ? "Thùng dầu 150 l."
            : step === 1
              ? "Lần đầu bán 30 l."
              : step === 2
                ? "Lần thứ hai bán 60 l, gấp đôi lần đầu."
                : step === 3
                  ? "Lần thứ ba bán 40 l."
                  : step === 4
                    ? "Đã bán 30 + 60 + 40 = 130 l."
                    : "Còn lại 150 − 130 = 20 l."
        }
        className="block w-full"
        fontWeight={800}
      >
        <text x={LEFT} y={30} fontSize={16} fill="var(--ink)">
          Cả thùng: 150 l
        </text>
        <rect x={LEFT} y={BAR_Y} width={320} height={BAR_H} fill="none" stroke="var(--input)" strokeWidth={3} />
        {SEGMENTS.map(
          (segment) =>
            step >= segment.enter && (
              <g key={segment.label} data-enter={segment.enter}>
                <rect x={segment.from} y={BAR_Y} width={segment.width} height={BAR_H} fill="var(--unit-cm2-soft)" stroke="var(--ink)" strokeWidth={3} />
                <text x={segment.from + segment.width / 2} y={BAR_Y + 24} textAnchor="middle" fontSize={16} fill="var(--ink)">
                  {segment.label}
                </text>
              </g>
            ),
        )}
        {step >= 2 ? (
          <text data-enter={2} x={LEFT + 128} y={104} textAnchor="middle" fontSize={14} fill="var(--ink)">
            Lần 2: gấp đôi lần 1
          </text>
        ) : null}
        {step >= 5 ? (
          <g data-enter={5}>
            <rect x={REST.from} y={BAR_Y} width={REST.width} height={BAR_H} fill="var(--sun)" fillOpacity={0.6} stroke="var(--ink)" strokeWidth={3} />
            <text x={REST.from + REST.width / 2} y={BAR_Y + 24} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {REST.label}
            </text>
          </g>
        ) : null}

        {step >= 2 ? (
          <text data-enter={2} x={LEFT} y={142} fontSize={17} fill="var(--ink)">
            Lần 2: 30 × 2 = 60 (l)
          </text>
        ) : null}
        {step >= 4 ? (
          <text data-enter={4} x={LEFT} y={172} fontSize={17} fill="var(--ink)">
            Đã bán: 30 + 60 + 40 = 130 (l)
          </text>
        ) : null}
        {step >= 5 ? (
          <g data-enter={5}>
            <rect x={LEFT - 6} y={186} width={332} height={36} rx={12} fill="var(--sun)" fillOpacity={0.45} />
            <text x={LEFT} y={210} fontSize={17} fill="var(--ink)">
              Còn lại: 150 − 130 = 20 (l)
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
