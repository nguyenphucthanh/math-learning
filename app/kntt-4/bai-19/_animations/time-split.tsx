"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const RADIUS = 48;
const CENTER_Y = 88;
const CENTERS = [60, 178, 296];

const captions = [
  "Đổi 2 phút 11 giây sang giây. Đây là 2 vòng đồng hồ và 11 vạch nữa.",
  "Mỗi vòng đủ là 1 phút, tức là 60 giây.",
  "2 phút = 60 + 60 = 120 giây.",
  "Cộng thêm 11 giây nữa: 120 + 11 = 131 giây. Vậy 2 phút 11 giây = 131 giây.",
  "Đừng viết liền 2 và 11 thành 211. 211 giây là hơn 3 vòng, trong khi ở đây chưa đủ 3 vòng.",
];

function Ring({ center, filled, color }: { center: number; filled: number; color: string }) {
  return (
    <>
      {Array.from({ length: 60 }, (_, tick) => {
        const angle = (tick * 6 * Math.PI) / 180;
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        return (
          <line
            key={tick}
            x1={Number((center + RADIUS * sin).toFixed(2))}
            y1={Number((CENTER_Y - RADIUS * cos).toFixed(2))}
            x2={Number((center + (RADIUS - 9) * sin).toFixed(2))}
            y2={Number((CENTER_Y - (RADIUS - 9) * cos).toFixed(2))}
            stroke={tick < filled ? color : "var(--input)"}
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        );
      })}
    </>
  );
}

/** Tách số đo ghép: hai vòng đủ và một phần vòng, đúng tỉ lệ để thấy 11 giây ít thế nào so với 2 phút. */
export function TimeSplit() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 356 214"
        role="img"
        aria-label="Hai vòng đồng hồ đủ 60 vạch và một vòng chỉ có 11 vạch"
        className="block w-full"
      >
        <text x={(CENTERS[0] + CENTERS[1]) / 2} y={22} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--unit-minute)">
          {step >= 2 ? "2 phút = 120 giây" : "2 phút"}
        </text>
        <text x={CENTERS[2]} y={22} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--unit-second)">
          11 giây
        </text>

        <Ring center={CENTERS[0]} filled={60} color="var(--unit-minute)" />
        <Ring center={CENTERS[1]} filled={60} color="var(--unit-minute)" />
        <Ring center={CENTERS[2]} filled={11} color="var(--unit-second)" />

        {step >= 1
          ? [0, 1].map((ring) => (
              <text
                key={ring}
                data-enter={1}
                x={CENTERS[ring]}
                y={CENTER_Y + 6}
                textAnchor="middle"
                fontSize={17}
                fontWeight={800}
                fill="var(--foreground)"
              >
                60
              </text>
            ))
          : null}
        <text x={CENTERS[2]} y={CENTER_Y + 6} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--foreground)">
          11
        </text>

        {step >= 3 ? (
          <text data-enter={3} x={178} y={170} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--foreground)">
            120 + 11 = 131 giây
          </text>
        ) : null}
        {step >= 4 ? (
          <g data-enter={4}>
            <rect x={132} y={182} width={92} height={30} rx={8} fill="var(--oops)" />
            <text x={178} y={203} textAnchor="middle" fontSize={18} fontWeight={800} fill="white">
              211 giây
            </text>
            <line x1={138} y1={197} x2={218} y2={197} stroke="white" strokeWidth={3} strokeLinecap="round" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
