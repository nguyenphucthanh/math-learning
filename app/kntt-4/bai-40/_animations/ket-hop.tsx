"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

// Khối 3 × 2 × 4: 4 lớp, mỗi lớp 3 cột 2 hàng khối lập phương nhỏ.
const A = 3;
const B = 2;
const C = 4;
const CELL = 22;
const PANEL = A * CELL;
const GAP = 14;
const X0 = (340 - (C * PANEL + (C - 1) * GAP)) / 2;
const Y0 = 34;
const COLORS = ["var(--unit-second)", "var(--unit-ta)", "var(--unit-cm2)", "var(--unit-dm2)"];

export const ketHopCaptions = [
  "Khối hộp chữ nhật xếp từ các khối lập phương nhỏ: 3 khối chiều dài, 2 khối chiều rộng, 4 khối chiều cao. Ta tách thành 4 lớp để nhìn.",
  "Cách 1: mỗi lớp có 3 × 2 = 6 khối. Có 4 lớp, nên có (3 × 2) × 4 = 24 khối.",
  "Cách 2: tô lại theo cột. Mỗi cột có 2 × 4 = 8 khối. Có 3 cột, nên có 3 × (2 × 4) = 24 khối.",
  "Cùng một khối, cùng 24 khối lập phương. Vậy (3 × 2) × 4 = 3 × (2 × 4).",
];

/** Cùng 24 khối: tô theo lớp (3 × 2) × 4, rồi tô theo cột 3 × (2 × 4). */
export function KetHop() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const label = ["Chưa nhóm", "Nhóm theo 4 lớp: (3 × 2) × 4 = 24", "Nhóm theo 3 cột: 3 × (2 × 4) = 24", "(3 × 2) × 4 = 3 × (2 × 4)"][step];
  const colorOf = (layer: number, col: number) => (step === 1 ? COLORS[layer] : step === 2 ? COLORS[col] : "var(--paper)");

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 170" role="img" aria-label={`24 khối lập phương nhỏ, chia thành 4 lớp, mỗi lớp 3 cột 2 hàng. ${label}.`} className="block w-full">
        {Array.from({ length: C }).map((_, layer) => (
          <g key={layer}>
            <text x={X0 + layer * (PANEL + GAP) + PANEL / 2} y={22} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
              Lớp {layer + 1}
            </text>
            {Array.from({ length: B }).flatMap((__, row) =>
              Array.from({ length: A }).map((___, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={X0 + layer * (PANEL + GAP) + col * CELL + 1}
                  y={Y0 + row * CELL + 1}
                  width={CELL - 2}
                  height={CELL - 2}
                  rx={4}
                  fill={colorOf(layer, col)}
                  fillOpacity={step === 0 || step === 3 ? 1 : 0.35}
                  stroke={step === 1 ? COLORS[layer] : step === 2 ? COLORS[col] : "var(--ink)"}
                  strokeWidth={2}
                />
              )),
            )}
          </g>
        ))}
        {step === 1 ? (
          <text data-enter={1} x={170} y={Y0 + B * CELL + 36} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
            (3 × 2) × 4 = 6 × 4 = 24
          </text>
        ) : null}
        {step === 2 ? (
          <text data-enter={2} x={170} y={Y0 + B * CELL + 36} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--ink)">
            3 × (2 × 4) = 3 × 8 = 24
          </text>
        ) : null}
        {step === 3 ? (
          <text data-enter={3} x={170} y={Y0 + B * CELL + 36} textAnchor="middle" fontSize={19} fontWeight={800} fill="var(--ink)">
            (3 × 2) × 4 = 3 × (2 × 4)
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={ketHopCaptions} onChange={setStep} />
    </figure>
  );
}
