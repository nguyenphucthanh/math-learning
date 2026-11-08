"use client";

import { RightMark } from "@/components/math/khung";
import { NenLuoi } from "@/components/math/dau";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import type { Point } from "@/lib/hinh";
import { useRef, useState } from "react";

const CELL = 20;
const OFFSET = 10;

/** Hình bình hành ABCD trên giấy ô, tọa độ tính bằng ô (trục y hướng xuống). H nằm trên DC, AH vuông góc DC. DC = 6 ô, AH = 4 ô. */
export const hinhBinhHanh: Record<"A" | "B" | "C" | "D" | "H", Point> = {
  A: { x: 3, y: 1 },
  B: { x: 9, y: 1 },
  C: { x: 7, y: 5 },
  D: { x: 1, y: 5 },
  H: { x: 3, y: 5 },
};

/** Tam giác ADH bị cắt, dịch sang phải DC = 6 ô thì A trùng B, D trùng C. */
export const DICH_SANG_PHAI = 6;

const px = (p: Point): Point => ({ x: OFFSET + p.x * CELL, y: OFFSET + p.y * CELL });
const toStr = (points: Point[]) => points.map((p) => `${p.x},${p.y}`).join(" ");

const captions = [
  "Đây là hình bình hành ABCD vẽ trên giấy ô. Ta muốn cắt rồi ghép lại thành hình chữ nhật.",
  "Từ đỉnh A, vẽ đường thẳng AH vuông góc với cạnh DC. Dùng ê ke để vẽ góc vuông tại H.",
  "Cắt theo AH. Hình bình hành chia thành hai phần: tam giác ADH (màu cam) và phần còn lại.",
  "Dịch tam giác ADH sang bên phải, cạnh AD trùng với cạnh BC. Ta được hình chữ nhật, có bốn góc vuông.",
];

/** Cắt hình bình hành thành hai phần rồi ghép thành hình chữ nhật. */
export function CatGhep() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const [a, b, c, d, h] = (["A", "B", "C", "D", "H"] as const).map((name) => px(hinhBinhHanh[name]));
  const labels = [
    ["A", a, -12, -6],
    ["B", b, 12, -6],
    ["C", c, 12, 18],
    ["D", d, -12, 18],
    ["H", h, 0, 20],
  ] as const;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 140"
        role="img"
        aria-label={
          step === 0
            ? "Hình bình hành ABCD trên giấy ô vuông"
            : step === 1
              ? "Hình bình hành ABCD có đoạn thẳng AH vuông góc với DC"
              : step === 2
                ? "Hình bình hành được cắt theo AH, tam giác ADH tô màu cam"
                : "Tam giác ADH đã dịch sang bên phải, ghép với phần còn lại thành hình chữ nhật"
        }
        className="block w-full"
        fontWeight={800}
      >
        <NenLuoi cols={16} rows={6} cell={CELL} x={OFFSET} y={OFFSET} />
        <polygon points={toStr(step >= 2 ? [a, b, c, h] : [a, b, c, d])} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        {step >= 1 ? (
          <g data-enter={1}>
            <line x1={a.x} y1={a.y} x2={h.x} y2={h.y} stroke="var(--unit-century)" strokeWidth={4} strokeLinecap="round" />
            <RightMark at={h} toward1={d} toward2={a} size={10} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g className="transition-transform duration-700 motion-reduce:transition-none" style={{ transform: step >= 3 ? `translateX(${DICH_SANG_PHAI * CELL}px)` : "translateX(0px)" }}>
            <polygon data-enter={2} points={toStr([a, h, d])} fill="var(--sun)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
          </g>
        ) : null}
        {labels.map(([name, p, dx, dy]) => (
          <text key={name} x={p.x + dx} y={p.y + dy} textAnchor="middle" fontSize={17} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
