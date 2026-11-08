"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "@/components/math/khung";
import { useRef, useState } from "react";

const A = { x: 100, y: 60 };
const B = { x: 260, y: 60 };
const C = { x: 260, y: 150 };
const D = { x: 100, y: 150 };

const captions = [
  "Đây là hình chữ nhật ABCD. Ta tìm các cặp cạnh song song.",
  "AB và DC là một cặp cạnh song song: hai cạnh đối diện nhau, kéo dài không bao giờ cắt nhau.",
  "AD và BC là cặp cạnh song song thứ hai. Vậy hình chữ nhật có 2 cặp cạnh song song.",
  "Còn hai cạnh liền nhau, như AB và AD, thì cắt nhau tại A và vuông góc với nhau. Cạnh đối song song, cạnh liền nhau vuông góc.",
];

/** Hình chữ nhật có hai cặp cạnh song song (cạnh đối); cạnh liền nhau vuông góc. */
export function CapCanhSongSong() {
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
              ? "Cạnh AB và cạnh DC được tô cùng một màu: một cặp cạnh song song"
              : step === 2
                ? "Cạnh AB và DC tô màu vàng, cạnh AD và BC tô màu cam: hai cặp cạnh song song"
                : "Hai cặp cạnh song song, góc A là góc vuông giữa hai cạnh liền nhau AB và AD"
        }
        className="block w-full"
        fontWeight={800}
      >
        <rect x={A.x} y={A.y} width={B.x - A.x} height={D.y - A.y} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} />
        {step >= 1 ? (
          <g data-enter={1} stroke="var(--unit-yen)" strokeWidth={6} strokeLinecap="round">
            <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} />
            <line x1={D.x} y1={D.y} x2={C.x} y2={C.y} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2} stroke="var(--unit-ta)" strokeWidth={6} strokeLinecap="round">
            <line x1={A.x} y1={A.y} x2={D.x} y2={D.y} />
            <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <RightMark at={A} toward1={B} toward2={D} size={16} />
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
