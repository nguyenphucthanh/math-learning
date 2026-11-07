"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const LONG = 160;
const WIDE = 80;

const captions = [
  "Hình chữ nhật có chu vi 24 cm. Chu vi là tổng bốn cạnh: hai chiều dài và hai chiều rộng.",
  "Một chiều dài cộng một chiều rộng là nửa chu vi: 24 : 2 = 12 cm. Đây chính là tổng của hai số cần tìm.",
  "Đề nói chiều dài hơn chiều rộng 4 cm, đó là hiệu. Bài toán trở thành: tổng 12, hiệu 4.",
];

/** Chu vi cho trước thì nửa chu vi là tổng của chiều dài và chiều rộng. */
export function ChuVi() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 200"
        role="img"
        aria-label={
          step === 0
            ? "Hình chữ nhật có chu vi 24 cm"
            : step === 1
              ? "Chiều dài và chiều rộng nối nhau, tổng là nửa chu vi 12 cm"
              : "Tổng 12 cm, hiệu 4 cm"
        }
        className="block w-full"
        fontWeight={800}
      >
        <rect x={60} y={30} width={LONG} height={WIDE} rx={4} fill="var(--unit-m2-soft)" stroke="var(--ink)" strokeWidth={3} />
        <text x={60 + LONG / 2} y={22} textAnchor="middle" fontSize={16} fill="var(--ink)">
          dài
        </text>
        <text x={60 + LONG + 10} y={30 + WIDE / 2 + 6} fontSize={16} fill="var(--ink)">
          rộng
        </text>
        <text x={60 + LONG / 2} y={30 + WIDE / 2 + 6} textAnchor="middle" fontSize={18} fill="var(--ink)">
          Chu vi 24 cm
        </text>

        {step >= 1 ? (
          <g data-enter={1}>
            <rect x={60} y={134} width={LONG} height={32} rx={6} fill="var(--unit-m2)" stroke="white" strokeWidth={2} />
            <text x={60 + LONG / 2} y={156} textAnchor="middle" fontSize={16} fill="white">
              dài
            </text>
            <rect x={60 + LONG} y={134} width={WIDE} height={32} rx={6} fill="var(--unit-cm2)" stroke="white" strokeWidth={2} />
            <text x={60 + LONG + WIDE / 2} y={156} textAnchor="middle" fontSize={16} fill="white">
              rộng
            </text>
          </g>
        ) : null}
        {step === 1 ? (
          <text data-enter={1} x={170} y={190} textAnchor="middle" fontSize={18} fill="var(--ink)">
            dài + rộng = 24 : 2 = 12 (cm)
          </text>
        ) : null}
        {step >= 2 ? (
          <text data-enter={2} x={170} y={190} textAnchor="middle" fontSize={20} fill="var(--ink)">
            Tổng 12 cm, hiệu 4 cm
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
