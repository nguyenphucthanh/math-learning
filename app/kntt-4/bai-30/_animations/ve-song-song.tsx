"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const O = { x: 170, y: 150 };

export type Tilt = "ngang" | "nghieng";
export const tiltDeg: Record<Tilt, number> = { ngang: 0, nghieng: -20 };

/** Điểm (dx, dy) trong hệ trục của hình (AB nằm trên trục dx, dy hướng xuống), sau khi nghiêng cả hình `deg` độ quanh O. */
export function place(deg: number, dx: number, dy: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: Math.round((O.x + dx * Math.cos(rad) - dy * Math.sin(rad)) * 10) / 10,
    y: Math.round((O.y + dx * Math.sin(rad) + dy * Math.cos(rad)) * 10) / 10,
  };
}

/** Điểm H nằm ngoài AB, cách AB 70 đơn vị. */
export const H_LOCAL = { dx: 40, dy: -70 };

/** Các điểm của hình: AB, MN qua H vuông góc AB, CD qua H vuông góc MN. */
export function songSongGeometry(deg: number) {
  const at = (dx: number, dy: number) => place(deg, dx, dy);
  return {
    h: at(H_LOCAL.dx, H_LOCAL.dy),
    a: at(-135, 0),
    b: at(135, 0),
    foot: at(H_LOCAL.dx, 0),
    m: at(H_LOCAL.dx, H_LOCAL.dy - 42),
    n: at(H_LOCAL.dx, 48),
    c: at(-120, H_LOCAL.dy),
    d: at(125, H_LOCAL.dy),
  };
}

const captions = [
  "Cho đường thẳng AB và điểm H nằm ngoài đường thẳng AB. Ta cần vẽ đường thẳng CD đi qua H và song song với AB.",
  "Bước 1: Vẽ đường thẳng MN đi qua H và vuông góc với AB. Đặt một cạnh góc vuông của ê ke trùng với AB, cạnh góc vuông thứ hai gặp H, rồi vạch.",
  "Bước 2: Vẽ đường thẳng CD đi qua H và vuông góc với MN. Đặt một cạnh góc vuông của ê ke trùng với MN, cạnh góc vuông thứ hai đi qua H, rồi vạch.",
  "Ta được đường thẳng CD đi qua H và song song với AB, vì AB và CD cùng vuông góc với MN.",
];

/** Vẽ CD đi qua H và song song với AB bằng ê ke: hai lần vẽ đường thẳng vuông góc. Con chọn AB nằm ngang hay nghiêng. */
export function VeSongSong() {
  const [step, setStep] = useState(0);
  const [tilt, setTilt] = useState<Tilt>("ngang");
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const deg = tiltDeg[tilt];
  const at = (dx: number, dy: number) => place(deg, dx, dy);
  const { h, a, b, foot, m, n, c, d } = songSongGeometry(deg);
  const pts = (list: { x: number; y: number }[]) => list.map((p) => `${p.x},${p.y}`).join(" ");
  const triangleOne = [foot, at(H_LOCAL.dx + 85, 0), at(H_LOCAL.dx, -100)];
  const triangleTwo = [h, at(H_LOCAL.dx + 90, H_LOCAL.dy), at(H_LOCAL.dx, H_LOCAL.dy + 60)];
  const right = (vx: number, vy: number, ux: number, uy: number, wx: number, wy: number) => {
    const s = 14;
    const p = at(vx + ux * s, vy + uy * s);
    const q = at(vx + ux * s + wx * s, vy + uy * s + wy * s);
    const r = at(vx + wx * s, vy + wy * s);
    return `M ${p.x} ${p.y} L ${q.x} ${q.y} L ${r.x} ${r.y}`;
  };
  const chevron = (dy: number) => {
    const x = -92;
    const p = at(x - 7, dy - 8);
    const q = at(x + 3, dy);
    const r = at(x - 7, dy + 8);
    return `M ${p.x} ${p.y} L ${q.x} ${q.y} L ${r.x} ${r.y}`;
  };
  const ends = [
    ["A", at(-150, 16)],
    ["B", at(152, 16)],
    ["M", at(H_LOCAL.dx + 16, H_LOCAL.dy - 48)],
    ["N", at(H_LOCAL.dx + 16, 56)],
    ["C", at(-136, H_LOCAL.dy + 4)],
    ["D", at(139, H_LOCAL.dy + 4)],
  ] as const;
  const visible = (name: string) => (name === "A" || name === "B" ? true : name === "M" || name === "N" ? step >= 1 : step >= 2);
  const enter = (name: string) => (name === "M" || name === "N" ? 1 : 2);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn cách đặt đường thẳng AB">
        <ActionButton variant={tilt === "ngang" ? "primary" : "soft"} aria-pressed={tilt === "ngang"} onClick={() => setTilt("ngang")}>
          AB nằm ngang
        </ActionButton>
        <ActionButton variant={tilt === "nghieng" ? "primary" : "soft"} aria-pressed={tilt === "nghieng"} onClick={() => setTilt("nghieng")}>
          AB nằm nghiêng
        </ActionButton>
      </div>
      <svg
        viewBox="0 0 340 250"
        role="img"
        aria-label={
          step === 0
            ? "Đường thẳng AB và điểm H nằm ngoài đường thẳng AB"
            : step === 1
              ? "Ê ke có một cạnh góc vuông trùng với AB, đường thẳng MN đi qua H vuông góc với AB"
              : step === 2
                ? "Ê ke có một cạnh góc vuông trùng với MN, đường thẳng CD đi qua H vuông góc với MN"
                : "Đường thẳng CD đi qua H và song song với đường thẳng AB, cùng vuông góc với MN"
        }
        className="mt-3 block w-full"
        fontWeight={800}
      >
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
        {step === 1 ? <polygon data-enter={1} points={pts(triangleOne)} fill="var(--unit-yen)" fillOpacity={0.3} stroke="var(--unit-yen)" strokeWidth={3} strokeLinejoin="round" /> : null}
        {step === 2 ? <polygon data-enter={2} points={pts(triangleTwo)} fill="var(--unit-yen)" fillOpacity={0.3} stroke="var(--unit-yen)" strokeWidth={3} strokeLinejoin="round" /> : null}
        {step >= 1 ? (
          <g data-enter={1}>
            <line x1={m.x} y1={m.y} x2={n.x} y2={n.y} stroke="var(--unit-ta)" strokeWidth={4.5} strokeLinecap="round" />
            <path d={right(H_LOCAL.dx, 0, 1, 0, 0, -1)} fill="none" stroke="var(--unit-ta)" strokeWidth={2.5} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="var(--unit-second)" strokeWidth={4.5} strokeLinecap="round" />
            <path d={right(H_LOCAL.dx, H_LOCAL.dy, 1, 0, 0, 1)} fill="none" stroke="var(--unit-second)" strokeWidth={2.5} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3} fill="none" stroke="var(--unit-ta)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
            <path d={chevron(0)} />
            <path d={chevron(H_LOCAL.dy)} />
          </g>
        ) : null}
        <circle cx={h.x} cy={h.y} r={5} fill="var(--ink)" />
        <text x={at(H_LOCAL.dx - 18, H_LOCAL.dy - 4).x} y={at(H_LOCAL.dx - 18, H_LOCAL.dy - 4).y + 5} textAnchor="middle" fontSize={18} fill="var(--ink)">
          H
        </text>
        {ends.map(([name, p]) =>
          visible(name) ? (
            <text key={name} data-enter={name === "A" || name === "B" ? undefined : enter(name)} x={p.x} y={p.y + 5} textAnchor="middle" fontSize={18} fill="var(--ink)">
              {name}
            </text>
          ) : null,
        )}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
