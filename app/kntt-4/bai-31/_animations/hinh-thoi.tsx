"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";
import { useRef, useState } from "react";
import { DauBangNhau, DauSongSong, NenLuoi } from "./dau";

const CELL = 20;
const OFFSET = 10;

/** Hình thoi ABCD trên giấy ô (trục y hướng xuống): AC = 12 ô nằm ngang, BD = 6 ô thẳng đứng, O là giao điểm hai đường chéo. */
export const hinhThoi: Record<"A" | "B" | "C" | "D" | "O", Point> = {
  A: { x: 2, y: 5 },
  B: { x: 8, y: 2 },
  C: { x: 14, y: 5 },
  D: { x: 8, y: 8 },
  O: { x: 8, y: 5 },
};

type Name = keyof typeof hinhThoi;
const px = (p: Point): Point => ({ x: OFFSET + p.x * CELL, y: OFFSET + p.y * CELL });
const at = (name: Name) => px(hinhThoi[name]);
const seg = (a: Name, b: Name): Seg => [at(a), at(b)];

const captions = [
  "Đây là hình thoi ABCD, giống hình kim nam châm của la bàn. Con nhìn kĩ bốn cạnh của hình.",
  "Cạnh AB song song với cạnh DC, cạnh AD song song với cạnh BC. Hai cặp cạnh đối diện song song.",
  "Hình thoi có bốn cạnh bằng nhau: AB = BC = CD = DA.",
  "Hai đường chéo AC và BD cắt nhau tại O. Con dùng ê ke kiểm tra: hai đường chéo vuông góc với nhau.",
];

const labels = [
  ["A", -15, 6],
  ["B", 0, -10],
  ["C", 15, 6],
  ["D", 0, 24],
] as const;

/** Hình thoi ABCD: hai cặp cạnh đối diện song song, bốn cạnh bằng nhau, rồi hai đường chéo. */
export function HinhThoi() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const points = (["A", "B", "C", "D"] as const).map(at);
  const sides = [seg("A", "B"), seg("B", "C"), seg("C", "D"), seg("D", "A")];
  const o = at("O");

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 220"
        role="img"
        aria-label={
          step === 0
            ? "Hình thoi ABCD trên giấy ô vuông"
            : step === 1
              ? "Hình thoi ABCD, cạnh AB song song DC và cạnh AD song song BC có dấu song song"
              : step === 2
                ? "Hình thoi ABCD, bốn cạnh có cùng một gạch, nghĩa là bằng nhau"
                : "Hình thoi ABCD có hai đường chéo AC và BD cắt nhau tại O, vuông góc với nhau"
        }
        className="block w-full"
        fontWeight={800}
      >
        <NenLuoi cols={16} rows={10} cell={CELL} x={OFFSET} y={OFFSET} />
        <polygon points={points.map((p) => `${p.x},${p.y}`).join(" ")} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3.5} strokeLinejoin="round" />
        {step >= 1 ? (
          <g data-enter={1}>
            {[sides[0], sides[2]].map((s, i) => (
              <g key={i}>
                <line x1={s[0].x} y1={s[0].y} x2={s[1].x} y2={s[1].y} stroke="var(--unit-ta)" strokeWidth={5} strokeLinecap="round" />
                <DauSongSong seg={s} color="var(--unit-ta)" />
              </g>
            ))}
            {[sides[1], sides[3]].map((s, i) => (
              <g key={i}>
                <line x1={s[0].x} y1={s[0].y} x2={s[1].x} y2={s[1].y} stroke="var(--unit-second)" strokeWidth={5} strokeLinecap="round" />
                <DauSongSong seg={s} count={2} color="var(--unit-second)" />
              </g>
            ))}
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            {sides.map((s, i) => (
              <DauBangNhau key={i} seg={s} color="var(--ink)" />
            ))}
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <line x1={at("A").x} y1={at("A").y} x2={at("C").x} y2={at("C").y} stroke="var(--unit-century)" strokeWidth={3.5} strokeDasharray="8 5" strokeLinecap="round" />
            <line x1={at("B").x} y1={at("B").y} x2={at("D").x} y2={at("D").y} stroke="var(--unit-century)" strokeWidth={3.5} strokeDasharray="8 5" strokeLinecap="round" />
            <RightMark at={o} toward1={at("C")} toward2={at("B")} size={14} />
            <circle cx={o.x} cy={o.y} r={4} fill="var(--ink)" />
            <text x={o.x + 14} y={o.y + 20} textAnchor="middle" fontSize={18} fill="var(--ink)">
              O
            </text>
          </g>
        ) : null}
        {labels.map(([name, dx, dy]) => (
          <text key={name} x={at(name).x + dx} y={at(name).y + dy} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
