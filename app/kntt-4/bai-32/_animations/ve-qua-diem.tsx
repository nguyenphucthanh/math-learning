"use client";

import { DauSongSong } from "@/components/math/dau";
import { RightMark } from "@/components/math/khung";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import type { Point, Seg } from "@/lib/hinh";
import { useRef, useState } from "react";

/** Đường thẳng AB nằm ngang, điểm H nằm ngoài AB. Ê ke có góc vuông tại F, một cạnh góc vuông trên AB, cạnh kia đi qua H. */
export const hinh: Record<"A" | "B" | "H" | "F" | "C" | "D" | "E" | "G", Point> = {
  A: { x: 30, y: 170 },
  B: { x: 310, y: 170 },
  H: { x: 190, y: 70 },
  F: { x: 190, y: 170 },
  C: { x: 190, y: 20 },
  D: { x: 190, y: 200 },
  E: { x: 30, y: 70 },
  G: { x: 310, y: 70 },
};

/** Ê ke: tam giác vuông có đỉnh góc vuông tại F. */
export const eKe: Point[] = [hinh.F, { x: 270, y: 170 }, { x: 190, y: 40 }];

export const duongAB: Seg = [hinh.A, hinh.B];
export const duongCD: Seg = [hinh.C, hinh.D];
export const duongEG: Seg = [hinh.E, hinh.G];

const captions = [
  "Cho đường thẳng AB và điểm H nằm ngoài đường thẳng AB. Ta vẽ hai đường thẳng đi qua H.",
  "Đặt ê ke: một cạnh góc vuông nằm trên đường thẳng AB, cạnh góc vuông kia đi qua điểm H.",
  "Vẽ theo cạnh góc vuông đi qua H, được đường thẳng CD đi qua H và vuông góc với AB.",
  "Đường thẳng EG đi qua H, nằm ngang như AB. EG song song với AB: hai đường kéo dài mãi cũng không cắt nhau.",
];

const labels: [keyof typeof hinh, number, number][] = [
  ["A", -14, 6],
  ["B", 14, 6],
  ["H", 14, -4],
  ["C", 14, 6],
  ["D", 14, 6],
  ["E", -14, 6],
  ["G", 14, 6],
];

/** Vẽ đường thẳng qua điểm H: vuông góc với AB bằng ê ke, rồi song song với AB. */
export function VeQuaDiem() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const showLabel = (name: keyof typeof hinh) => (name === "C" || name === "D" ? step >= 2 : name === "E" || name === "G" ? step >= 3 : true);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 230"
        role="img"
        aria-label={
          step === 0
            ? "Đường thẳng AB nằm ngang và điểm H phía trên"
            : step === 1
              ? "Ê ke đặt một cạnh góc vuông trên AB, cạnh góc vuông kia đi qua H"
              : step === 2
                ? "Đường thẳng CD đi qua H, vuông góc với AB, có dấu góc vuông"
                : "Thêm đường thẳng EG đi qua H, song song với AB, có dấu mũi tên song song"
        }
        className="block w-full"
        fontWeight={800}
      >
        <line x1={hinh.A.x} y1={hinh.A.y} x2={hinh.B.x} y2={hinh.B.y} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
        {step === 1 ? (
          <polygon data-enter={1} points={eKe.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--sun)" fillOpacity={0.45} stroke="var(--ink)" strokeWidth={2.5} strokeLinejoin="round" />
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <line x1={hinh.C.x} y1={hinh.C.y} x2={hinh.D.x} y2={hinh.D.y} stroke="var(--unit-second)" strokeWidth={4} strokeLinecap="round" />
            <RightMark at={hinh.F} toward1={hinh.B} toward2={hinh.C} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <line x1={hinh.E.x} y1={hinh.E.y} x2={hinh.G.x} y2={hinh.G.y} stroke="var(--unit-ta)" strokeWidth={4} strokeLinecap="round" />
            <DauSongSong seg={[{ x: 100, y: 70 }, { x: 140, y: 70 }]} color="var(--unit-ta)" />
            <DauSongSong seg={[{ x: 100, y: 170 }, { x: 140, y: 170 }]} color="var(--unit-ta)" />
          </g>
        ) : null}
        <circle cx={hinh.H.x} cy={hinh.H.y} r={5} fill="var(--ink)" />
        {labels.filter(([name]) => showLabel(name)).map(([name, dx, dy]) => (
          <text key={name} x={hinh[name].x + dx} y={hinh[name].y + dy} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
