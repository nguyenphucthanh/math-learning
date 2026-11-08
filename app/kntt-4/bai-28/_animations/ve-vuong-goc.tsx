"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const O = { x: 170, y: 150 };
const TILT = -20;

export type Where = "tren" | "ngoai";

/** Điểm (dx, dy) trong hệ trục của hình (AB nằm trên trục dx), sau khi nghiêng cả hình một góc TILT quanh O. */
export function place(dx: number, dy: number) {
  const rad = (TILT * Math.PI) / 180;
  return {
    x: Math.round((O.x + dx * Math.cos(rad) - dy * Math.sin(rad)) * 10) / 10,
    y: Math.round((O.y + dx * Math.sin(rad) + dy * Math.cos(rad)) * 10) / 10,
  };
}

/** Vị trí điểm H trong hệ trục của hình: trên AB, hoặc cách AB 70 đơn vị. */
export const hLocal: Record<Where, { dx: number; dy: number }> = {
  tren: { dx: 25, dy: 0 },
  ngoai: { dx: 25, dy: -70 },
};

const captions = (where: Where) => [
  where === "tren" ? "Cho đường thẳng AB và điểm H nằm trên đường thẳng AB." : "Cho đường thẳng AB và điểm H nằm ngoài đường thẳng AB.",
  "Bước 1: Đặt một cạnh góc vuông của ê ke trùng với đường thẳng AB, cạnh góc vuông thứ hai gặp điểm H.",
  "Bước 2: Vạch một đường thẳng theo cạnh góc vuông thứ hai của ê ke. Ta được đường thẳng CD đi qua điểm H.",
  "Đường thẳng CD đi qua H và vuông góc với đường thẳng AB: hai đường thẳng tạo thành bốn góc vuông.",
];

/** Vẽ đường thẳng CD đi qua H, vuông góc với AB bằng ê ke. Con chọn H nằm trên hay ngoài AB. Cả hình nghiêng 20°. */
export function VeVuongGoc() {
  const [step, setStep] = useState(0);
  const [where, setWhere] = useState<Where>("ngoai");
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const { dx: hx, dy: hy } = hLocal[where];
  const h = place(hx, hy);
  const a = place(-135, 0);
  const b = place(135, 0);
  const foot = place(hx, 0);
  const triangle = [foot, place(hx + 85, 0), place(hx, -100)];
  const c = place(hx, -112);
  const d = place(hx, 85);
  const mark = (sx: number, sy: number) => {
    const s = 14;
    const p = place(hx + sx * s, 0);
    const q = place(hx + sx * s, sy * s);
    const r = place(hx, sy * s);
    return `M ${p.x} ${p.y} L ${q.x} ${q.y} L ${r.x} ${r.y}`;
  };
  const text = [
    ["A", place(-148, 18)],
    ["B", place(150, -4)],
  ] as const;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn vị trí điểm H">
        <ActionButton variant={where === "tren" ? "primary" : "soft"} aria-pressed={where === "tren"} onClick={() => setWhere("tren")}>
          H nằm trên AB
        </ActionButton>
        <ActionButton variant={where === "ngoai" ? "primary" : "soft"} aria-pressed={where === "ngoai"} onClick={() => setWhere("ngoai")}>
          H nằm ngoài AB
        </ActionButton>
      </div>
      <svg
        viewBox="0 0 340 250"
        role="img"
        aria-label={
          step === 0
            ? `Đường thẳng AB và điểm H nằm ${where === "tren" ? "trên" : "ngoài"} đường thẳng AB`
            : step === 1
              ? "Ê ke có một cạnh góc vuông trùng với AB, cạnh góc vuông thứ hai gặp điểm H"
              : step === 2
                ? "Đường thẳng CD vạch theo cạnh góc vuông thứ hai của ê ke, đi qua điểm H"
                : "Đường thẳng CD vuông góc với AB, có bốn góc vuông chung đỉnh"
        }
        className="mt-3 block w-full"
        fontWeight={800}
      >
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
        {step >= 1 ? (
          <polygon
            data-enter={1}
            points={triangle.map((p) => `${p.x},${p.y}`).join(" ")}
            fill="var(--unit-yen)"
            fillOpacity={0.3}
            stroke="var(--unit-yen)"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <line x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke="var(--unit-ta)" strokeWidth={4.5} strokeLinecap="round" />
            <text x={c.x - 2} y={c.y - 8} textAnchor="middle" fontSize={18} fill="var(--ink)">
              C
            </text>
            <text x={d.x + 2} y={d.y + 22} textAnchor="middle" fontSize={18} fill="var(--ink)">
              D
            </text>
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3} fill="none" stroke="var(--unit-ta)" strokeWidth={2.5}>
            <path d={mark(1, -1)} />
            <path d={mark(-1, -1)} />
            <path d={mark(1, 1)} />
            <path d={mark(-1, 1)} />
          </g>
        ) : null}
        <circle cx={h.x} cy={h.y} r={5} fill="var(--ink)" />
        <text x={place(hx - 18, hy + (where === "tren" ? 18 : 0)).x} y={place(hx - 18, hy + (where === "tren" ? 18 : 0)).y + 5} textAnchor="middle" fontSize={18} fill="var(--ink)">
          H
        </text>
        {text.map(([name, p]) => (
          <text key={name} x={p.x} y={p.y + 5} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions(where)} onChange={setStep} />
    </figure>
  );
}
