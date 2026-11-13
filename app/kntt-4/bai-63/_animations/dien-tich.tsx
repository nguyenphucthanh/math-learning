"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";

export const dienTichCaptions = [
  "Hình vuông cạnh 1 m có diện tích 1 m². Chia thành 5 hàng, 3 cột: 15 ô bằng nhau, mỗi ô là 1/15 m².",
  "Một cạnh dài 4/5 m: tô 4 hàng trong 5 hàng.",
  "Cạnh kia dài 2/3 m: tô 2 cột trong 3 cột. Phần tô cả hàng lẫn cột là hình chữ nhật cần tính.",
  "Đếm các ô được tô cả hai màu: có 8 ô trong 15 ô. Diện tích hình chữ nhật là 8/15 m².",
  "Viết bằng phép tính: tử số nhân tử số (4 × 2 = 8), mẫu số nhân mẫu số (5 × 3 = 15).",
];

const X = 56;
const Y = 62;
const W = 54;
const H = 34;
const cells = Array.from({ length: 8 }, (_, i) => ({ r: Math.floor(i / 2), c: i % 2, n: i + 1 }));

/** Nhân hai phân số: 4/5 × 2/3 qua diện tích hình chữ nhật trong hình vuông 1 m². */
export function DienTich() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["hình vuông 1 m² chia 15 ô", "tô 4 hàng trong 5 hàng", "tô thêm 2 cột trong 3 cột", "8 ô trong 15 ô, diện tích 8/15 m²", "4/5 × 2/3 = (4 × 2)/(5 × 3) = 8/15"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 300" role="img" aria-label={`Nhân hai phân số: ${label}`} className="block w-full" fontWeight={800}>
        <rect x={X} y={Y} width={3 * W} height={5 * H} fill="white" />
        {step >= 1 ? <rect data-enter={1} x={X} y={Y} width={3 * W} height={4 * H} fill="var(--unit-tan)" fillOpacity={0.35} /> : null}
        {step >= 2 ? <rect data-enter={2} x={X} y={Y} width={2 * W} height={5 * H} fill="var(--unit-mm2)" fillOpacity={0.35} /> : null}
        {Array.from({ length: 15 }, (_, i) => (
          <rect key={i} x={X + (i % 3) * W} y={Y + Math.floor(i / 3) * H} width={W} height={H} fill="none" stroke="var(--ink)" strokeWidth={1.5} />
        ))}
        <rect x={X} y={Y} width={3 * W} height={5 * H} fill="none" stroke="var(--ink)" strokeWidth={3} />
        {step >= 2 ? <rect data-enter={2} x={X} y={Y} width={2 * W} height={4 * H} fill="none" stroke="var(--ink)" strokeWidth={4} /> : null}
        {step >= 3
          ? cells.map(({ r, c, n }) => (
              <text key={n} data-enter={3} x={X + c * W + W / 2} y={Y + r * H + 23} textAnchor="middle" fontSize={16} fill="var(--ink)">{n}</text>
            ))
          : null}
        {step >= 1 ? (
          <g data-enter={1}>
            <Ps x={26} y={Y + 2 * H + 2} top="4" bottom="5" fill="var(--unit-tan)" />
            <text x={42} y={Y + 2 * H + 24} fontSize={14} fill="var(--foreground)">m</text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <Ps x={X + W} y={28} top="2" bottom="3" fill="var(--unit-mm2)" />
            <text x={X + W + 22} y={50} fontSize={14} fill="var(--foreground)">m</text>
          </g>
        ) : null}
        {step < 3 ? (
          <g textAnchor="middle" fill="var(--foreground)">
            <text x={282} y={130} fontSize={18}>15 ô</text>
            <text x={282} y={156} fontSize={14}>mỗi ô</text>
            <Ps x={282} y={188} top="1" bottom="15" />
            <text x={282} y={228} fontSize={14}>m²</text>
          </g>
        ) : (
          <g data-enter={3} textAnchor="middle" fill="var(--foreground)">
            <text x={282} y={108} fontSize={14}>8 ô trong 15 ô</text>
            <Ps x={282} y={150} top="8" bottom="15" fill="var(--good)" />
            <text x={282} y={190} fontSize={14}>m²</text>
          </g>
        )}
        {step >= 4 ? (
          <g data-enter={4}>
            <Ps x={28} y={268} top="4" bottom="5" />
            <Eq x={58} y={268} text="×" />
            <Ps x={88} y={268} top="2" bottom="3" />
            <Eq x={118} y={268} />
            <Ps x={175} y={268} top="4 × 2" bottom="5 × 3" />
            <Eq x={236} y={268} />
            <Ps x={274} y={268} top="8" bottom="15" fill="var(--good)" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={dienTichCaptions} onChange={setStep} />
    </figure>
  );
}
