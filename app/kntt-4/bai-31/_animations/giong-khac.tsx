"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import type { Point, Seg } from "@/lib/hinh";
import { useRef, useState } from "react";
import { DauBangNhau, DauSongSong } from "@/components/math/dau";

const CELL = 10;
const GAP = 165;

/** Hai hình cạnh nhau, tọa độ tính bằng ô trong nửa hình của chúng (trục y hướng xuống). */
export const hinhBinhHanhNho: Point[] = [
  { x: 5, y: 1 },
  { x: 15, y: 1 },
  { x: 12, y: 6 },
  { x: 2, y: 6 },
];
export const hinhThoiNho: Point[] = [
  { x: 8, y: 0 },
  { x: 15, y: 3.5 },
  { x: 8, y: 7 },
  { x: 1, y: 3.5 },
];

const place = (points: Point[], column: 0 | 1) => points.map((p) => ({ x: 8 + column * GAP + p.x * CELL, y: 24 + p.y * CELL }));

const captions = [
  "Hai hình: hình bình hành và hình thoi. Con so sánh các cạnh của chúng.",
  "Giống nhau: cả hai hình đều có hai cặp cạnh đối diện song song.",
  "Khác nhau: hình bình hành có các cạnh đối diện bằng nhau. Hình thoi có cả bốn cạnh bằng nhau.",
];

/** So sánh hình bình hành và hình thoi: song song (giống nhau), độ dài cạnh (khác nhau). */
export function GiongKhac() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const shapes = [
    { name: "Hình bình hành", points: place(hinhBinhHanhNho, 0), fill: "var(--unit-yen-soft)", ticks: [1, 2, 1, 2] },
    { name: "Hình thoi", points: place(hinhThoiNho, 1), fill: "var(--unit-yen-soft)", ticks: [1, 1, 1, 1] },
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 130"
        role="img"
        aria-label={
          step === 0
            ? "Hình bình hành bên trái và hình thoi bên phải"
            : step === 1
              ? "Cả hai hình có dấu song song ở hai cặp cạnh đối diện"
              : "Hình bình hành có hai cặp cạnh đối diện bằng nhau, hình thoi có bốn cạnh bằng nhau"
        }
        className="block w-full"
        fontWeight={800}
      >
        {shapes.map((shape, column) => {
          const sides: Seg[] = shape.points.map((p, i) => [p, shape.points[(i + 1) % 4]]);
          return (
            <g key={shape.name}>
              <polygon points={shape.points.map((p) => `${p.x},${p.y}`).join(" ")} fill={shape.fill} stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
              {step >= 1 ? (
                <g data-enter={1}>
                  <DauSongSong seg={sides[0]} color="var(--unit-ta)" />
                  <DauSongSong seg={sides[2]} color="var(--unit-ta)" />
                  <DauSongSong seg={sides[1]} count={2} color="var(--unit-second)" />
                  <DauSongSong seg={sides[3]} count={2} color="var(--unit-second)" />
                </g>
              ) : null}
              {step >= 2 ? (
                <g data-enter={2}>
                  {sides.map((side, i) => (
                    <DauBangNhau key={i} seg={side} count={shape.ticks[i]} color="var(--ink)" />
                  ))}
                </g>
              ) : null}
              <text x={8 + column * GAP + 80} y={118} textAnchor="middle" fontSize={16} fill="var(--ink)">
                {shape.name}
              </text>
            </g>
          );
        })}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
