"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "@/components/math/khung";
import { useRef, useState } from "react";
import { dieuGeometry, type DieuSpec } from "../_illustrations/dieu";

/** Số liệu của SGK (trang 96): AB = 20 cm, HC = 6 cm, HD = 18 cm. */
export const designKite: DieuSpec = { ab: 20, hc: 6, hd: 18, scale: 8, h: { x: 170, y: 70 } };

const captions = [
  "Bước 1: Vẽ đoạn thẳng AB dài 20 cm. Vẽ trung điểm H của đoạn thẳng AB: AH = HB = 10 cm.",
  "Bước 2: Vẽ đoạn thẳng CD đi qua điểm H và vuông góc với đoạn thẳng AB: HC = 6 cm, HD = 18 cm.",
  "Bước 3: Nối A với C, C với B, B với D, D với A. Ta được bản thiết kế con diều.",
  "Hai thanh tre của con diều ứng với AB và CD. Hai thanh tre vuông góc với nhau tại H.",
];

/** Thiết kế con diều trên giấy: ba bước của SGK, rồi nhìn lại hai đoạn vuông góc. */
export function ThietKeDieu() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const { h, a, b, c, d } = dieuGeometry(designKite);
  const point = (p: { x: number; y: number }) => `${p.x},${p.y}`;
  const axis = step >= 3 ? "var(--unit-ta)" : "var(--ink)";

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 250"
        role="img"
        aria-label={
          step === 0
            ? "Đoạn thẳng AB dài 20 cm với trung điểm H"
            : step === 1
              ? "Đoạn thẳng CD đi qua H và vuông góc với AB, HC bằng 6 cm, HD bằng 18 cm"
              : step === 2
                ? "Bản thiết kế con diều ACBD"
                : "Hai thanh tre AB và CD vuông góc với nhau tại H"
        }
        className="block w-full"
        fontWeight={800}
      >
        {step >= 2 ? <polygon data-enter={2} points={[a, c, b, d].map(point).join(" ")} fill="var(--unit-ta-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" /> : null}
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={axis} strokeWidth={step >= 3 ? 5 : 3.5} strokeLinecap="round" />
        {step >= 1 ? <line data-enter={1} x1={c.x} y1={c.y} x2={d.x} y2={d.y} stroke={axis} strokeWidth={step >= 3 ? 5 : 3.5} strokeLinecap="round" /> : null}
        {step >= 1 ? (
          <g data-enter={1}>
            <RightMark at={h} toward1={b} toward2={c} size={14} />
            <text x={h.x + 12} y={h.y - 16} fontSize={15} fill="var(--ink)">
              6 cm
            </text>
            <text x={h.x + 12} y={h.y + 80} fontSize={15} fill="var(--ink)">
              18 cm
            </text>
          </g>
        ) : null}
        <text x={(a.x + h.x) / 2} y={h.y + 22} textAnchor="middle" fontSize={15} fill="var(--ink)">
          10 cm
        </text>
        <text x={(b.x + h.x) / 2} y={h.y + 22} textAnchor="middle" fontSize={15} fill="var(--ink)">
          10 cm
        </text>
        <circle cx={h.x} cy={h.y} r={5} fill="var(--ink)" />
        {[
          ["A", a.x - 14, a.y + 5],
          ["B", b.x + 14, b.y + 5],
          ["H", h.x - 14, h.y - 8],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name as string}
          </text>
        ))}
        {step >= 1 ? (
          <g data-enter={1} fontSize={18} fill="var(--ink)" textAnchor="middle">
            <text x={c.x} y={c.y - 10}>
              C
            </text>
            <text x={d.x} y={d.y + 22}>
              D
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
