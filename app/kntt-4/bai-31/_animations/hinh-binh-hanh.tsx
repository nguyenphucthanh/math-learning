"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import type { Point, Seg } from "@/lib/hinh";
import { useRef, useState } from "react";
import { DauBangNhau, DauSongSong, NenLuoi } from "@/components/math/dau";

const CELL = 20;
const OFFSET = 10;

/** Hình bình hành ABCD trên giấy ô, tọa độ tính bằng ô (trục y hướng xuống). AB = DC = 8 ô. */
export const binhHanh: Record<"A" | "B" | "C" | "D", Point> = { A: { x: 5, y: 2 }, B: { x: 13, y: 2 }, C: { x: 11, y: 8 }, D: { x: 3, y: 8 } };

const px = (p: Point): Point => ({ x: OFFSET + p.x * CELL, y: OFFSET + p.y * CELL });
const seg = (a: "A" | "B" | "C" | "D", b: "A" | "B" | "C" | "D"): Seg => [px(binhHanh[a]), px(binhHanh[b])];

const captions = [
  "Đây là hình bình hành ABCD, giống chiếc đuôi con gà xếp từ các mảnh ghép. Con nhìn kĩ bốn cạnh của hình.",
  "AB và DC là hai cạnh đối diện. Cạnh AB song song với cạnh DC.",
  "AD và BC cũng là hai cạnh đối diện. Cạnh AD song song với cạnh BC.",
  "Hai cạnh đối diện còn bằng nhau: AB = DC và AD = BC. Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.",
];

const labels = [
  ["A", -14, -6],
  ["B", 14, -6],
  ["C", 14, 20],
  ["D", -14, 20],
] as const;

/** Hình bình hành ABCD: cặp cạnh đối diện song song, rồi bằng nhau. */
export function HinhBinhHanh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const points = (["A", "B", "C", "D"] as const).map((name) => px(binhHanh[name]));
  const ab = seg("A", "B");
  const dc = seg("D", "C");
  const ad = seg("A", "D");
  const bc = seg("B", "C");

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 220"
        role="img"
        aria-label={
          step === 0
            ? "Hình bình hành ABCD trên giấy ô vuông"
            : step === 1
              ? "Hình bình hành ABCD, cặp cạnh AB và DC được tô màu và có dấu song song"
              : step === 2
                ? "Hình bình hành ABCD, thêm cặp cạnh AD và BC có dấu song song"
                : "Hình bình hành ABCD, các cạnh đối diện song song và có gạch bằng nhau"
        }
        className="block w-full"
        fontWeight={800}
      >
        <NenLuoi cols={16} rows={10} cell={CELL} x={OFFSET} y={OFFSET} />
        <polygon points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3.5} strokeLinejoin="round" />
        {step >= 1 ? (
          <g data-enter={1}>
            {[ab, dc].map((s, i) => (
              <line key={i} x1={s[0].x} y1={s[0].y} x2={s[1].x} y2={s[1].y} stroke="var(--unit-ta)" strokeWidth={5} strokeLinecap="round" />
            ))}
            <DauSongSong seg={ab} color="var(--unit-ta)" />
            <DauSongSong seg={dc} color="var(--unit-ta)" />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            {[ad, bc].map((s, i) => (
              <line key={i} x1={s[0].x} y1={s[0].y} x2={s[1].x} y2={s[1].y} stroke="var(--unit-second)" strokeWidth={5} strokeLinecap="round" />
            ))}
            <DauSongSong seg={ad} count={2} color="var(--unit-second)" />
            <DauSongSong seg={bc} count={2} color="var(--unit-second)" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <DauBangNhau seg={ab} color="var(--ink)" />
            <DauBangNhau seg={dc} color="var(--ink)" />
            <DauBangNhau seg={ad} count={2} color="var(--ink)" />
            <DauBangNhau seg={bc} count={2} color="var(--ink)" />
          </g>
        ) : null}
        {labels.map(([name, dx, dy]) => {
          const p = px(binhHanh[name]);
          return (
            <text key={name} x={p.x + dx} y={p.y + dy} textAnchor="middle" fontSize={18} fill="var(--ink)">
              {name}
            </text>
          );
        })}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
