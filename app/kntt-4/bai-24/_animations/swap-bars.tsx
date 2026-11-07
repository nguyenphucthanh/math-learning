"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber as n } from "@/lib/area-units";
import { useRef, useState } from "react";
import { Bar, barColors } from "./bars";

const LEFT = 20;
const WIDTH = 300;
const FIRST = 20000;
const SECOND = 15000;
const FIRST_W = Math.round((WIDTH * FIRST) / (FIRST + SECOND));
const SECOND_W = WIDTH - FIRST_W;

const captions = [
  `Cốc nước cam giá ${n(FIRST)} đồng, cái bánh giá ${n(SECOND)} đồng. Hai thanh nối nhau cho biết tổng tiền.`,
  "Đổi chỗ hai thanh: cái bánh đứng trước, cốc nước đứng sau.",
  `Hai thanh vẫn dài bằng nhau: ${n(FIRST)} + ${n(SECOND)} = ${n(FIRST + SECOND)} và ${n(SECOND)} + ${n(FIRST)} = ${n(FIRST + SECOND)}.`,
  "Đổi chỗ các số hạng trong một tổng thì tổng không thay đổi: a + b = b + a.",
];

/** Giao hoán: hai thanh đổi chỗ, tổng độ dài vẫn thế. */
export function SwapBars() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 176"
        role="img"
        aria-label={
          step === 0
            ? `Hai thanh nối nhau: ${n(FIRST)} rồi ${n(SECOND)}`
            : `Hai hàng thanh: ${n(FIRST)} rồi ${n(SECOND)}, và ${n(SECOND)} rồi ${n(FIRST)}, cùng dài bằng nhau`
        }
        className="block w-full"
      >
        <Bar x={LEFT} y={8} width={FIRST_W} color={barColors.a} label={n(FIRST)} />
        <Bar x={LEFT + FIRST_W} y={8} width={SECOND_W} color={barColors.b} label={n(SECOND)} />
        {step >= 2 ? (
          <text data-enter={2} x={170} y={68} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
            {n(FIRST)} + {n(SECOND)} = {n(FIRST + SECOND)}
          </text>
        ) : null}

        {step >= 1 ? (
          <g data-enter={1}>
            <Bar x={LEFT} y={84} width={SECOND_W} color={barColors.b} label={n(SECOND)} />
            <Bar x={LEFT + SECOND_W} y={84} width={FIRST_W} color={barColors.a} label={n(FIRST)} />
          </g>
        ) : null}
        {step >= 2 ? (
          <text data-enter={2} x={170} y={144} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
            {n(SECOND)} + {n(FIRST)} = {n(FIRST + SECOND)}
          </text>
        ) : null}
        {step >= 3 ? (
          <text data-enter={3} x={170} y={170} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
            a + b = b + a
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
