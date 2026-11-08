"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { arrowHead } from "@/lib/hinh";
import { useRef, useState } from "react";

const A = { x: 130, y: 70 };
const B = { x: 250, y: 70 };
const C = { x: 250, y: 150 };
const D = { x: 130, y: 150 };

const captions = [
  "Đây là hình chữ nhật ABCD, giống hai thanh ray của đường tàu: hai cạnh AB và DC nằm đối diện nhau.",
  "Kéo dài cạnh AB về hai phía, ta được một đường thẳng.",
  "Kéo dài cạnh DC về hai phía, ta được đường thẳng thứ hai.",
  "Hai đường thẳng này đi mãi mà không bao giờ cắt nhau. Ta nói: hai đường thẳng AB và DC song song với nhau.",
];

/** Kéo dài hai cạnh đối AB và DC của hình chữ nhật để thấy hai đường thẳng song song. */
export function KeoDaiSongSong() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 360 220"
        role="img"
        aria-label={
          step === 0
            ? "Hình chữ nhật ABCD"
            : step === 1
              ? "Hình chữ nhật ABCD, cạnh AB được kéo dài thành một đường thẳng"
              : step === 2
                ? "Hình chữ nhật ABCD, cạnh AB và cạnh DC đều được kéo dài thành hai đường thẳng"
                : "Hai đường thẳng AB và DC song song, kéo dài mãi mà không cắt nhau"
        }
        className="block w-full"
        fontWeight={800}
      >
        <rect x={A.x} y={A.y} width={B.x - A.x} height={D.y - A.y} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} />
        {step >= 1 ? <line data-enter={1} x1={24} y1={A.y} x2={336} y2={A.y} stroke="var(--unit-yen)" strokeWidth={4} strokeLinecap="round" /> : null}
        {step >= 2 ? <line data-enter={2} x1={24} y1={D.y} x2={336} y2={D.y} stroke="var(--unit-ta)" strokeWidth={4} strokeLinecap="round" /> : null}
        {step >= 3 ? (
          <g data-enter={3}>
            {[A.y, D.y].flatMap((y, row) => [
              <polygon key={`l${row}`} points={arrowHead({ x: 12, y }, { x: 60, y })} fill={row === 0 ? "var(--unit-yen)" : "var(--unit-ta)"} />,
              <polygon key={`r${row}`} points={arrowHead({ x: 348, y }, { x: 300, y })} fill={row === 0 ? "var(--unit-yen)" : "var(--unit-ta)"} />,
            ])}
          </g>
        ) : null}
        {[
          ["A", A.x - 16, A.y - 10],
          ["B", B.x + 16, B.y - 10],
          ["C", C.x + 16, C.y + 22],
          ["D", D.x - 16, D.y + 22],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
