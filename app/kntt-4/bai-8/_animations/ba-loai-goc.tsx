"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "@/components/math/khung";
import { useRef, useState } from "react";

const O = { x: 170, y: 150 };
const ARM = 130;
const WEDGE = 64;

const f = (n: number) => Math.round(n * 10) / 10;
const at = (r: number, deg: number) => ({ x: f(O.x + r * Math.cos((deg * Math.PI) / 180)), y: f(O.y - r * Math.sin((deg * Math.PI) / 180)) });
const sector = (from: number, to: number) => `M ${O.x} ${O.y} L ${at(WEDGE, from).x} ${at(WEDGE, from).y} A ${WEDGE} ${WEDGE} 0 0 0 ${at(WEDGE, to).x} ${at(WEDGE, to).y} Z`;

/** Mỗi bước một góc: số đo của cạnh OB so với ê ke (góc vuông tô nhạt). */
const stages = [
  { degrees: 90, kind: "góc vuông" },
  { degrees: 40, kind: "góc nhọn" },
  { degrees: 130, kind: "góc tù" },
  { degrees: 180, kind: "góc bẹt" },
] as const;

const captions = [
  "Con đã biết góc vuông: đặt ê ke vào đỉnh O, hai cạnh OA và OB khít với hai cạnh của góc vuông ê ke (phần tô màu).",
  "Cạnh OB nằm trong góc vuông của ê ke. Góc đỉnh O bé hơn góc vuông, đây là góc nhọn.",
  "Cạnh OB nằm ngoài góc vuông của ê ke. Góc đỉnh O lớn hơn góc vuông, đây là góc tù. Góc tù vẫn bé hơn góc bẹt.",
  "Hai cạnh OA và OB nằm trên một đường thẳng. Đặt hai ê ke cạnh nhau thì khít: góc bẹt bằng hai góc vuông.",
];

const labels = [
  "Góc vuông đỉnh O, khít với góc vuông của ê ke",
  "Góc nhọn đỉnh O, nằm gọn trong góc vuông của ê ke",
  "Góc tù đỉnh O, lớn hơn góc vuông của ê ke",
  "Góc bẹt đỉnh O, hai cạnh nằm trên một đường thẳng, bằng hai góc vuông của ê ke",
];

/** Góc nhọn, góc tù, góc bẹt so với góc vuông của ê ke (SGK tr. 26). */
export function BaLoaiGoc() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const { degrees, kind } = stages[step];
  const b = at(ARM, degrees);
  const arcR = 30;
  const arcEnd = at(arcR, degrees);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 190" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        <path d={sector(0, 90)} fill="var(--unit-ta-soft)" stroke="var(--unit-ta)" strokeWidth={2} strokeDasharray="6 4" />
        {step === 3 ? <path data-enter={3} d={sector(90, 180)} fill="var(--unit-ta-soft)" stroke="var(--unit-ta)" strokeWidth={2} strokeDasharray="6 4" /> : null}
        <line x1={O.x} y1={O.y} x2={O.x + ARM} y2={O.y} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
        <g key={step} data-enter={step} data-scale={0.9}>
          <line x1={O.x} y1={O.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeWidth={4} strokeLinecap="round" />
          {step === 0 ? (
            <RightMark at={O} toward1={at(ARM, 0)} toward2={b} size={16} />
          ) : (
            <path d={`M ${at(arcR, 0).x} ${at(arcR, 0).y} A ${arcR} ${arcR} 0 0 0 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke="var(--unit-mm2)" strokeWidth={3.5} />
          )}
          <text x={f(b.x + (b.x < O.x ? -8 : 8))} y={f(b.y + (b.y < O.y - 20 ? -8 : 6))} textAnchor={b.x < O.x ? "end" : "start"} fontSize={18} fill="var(--ink)">
            B
          </text>
        </g>
        <circle cx={O.x} cy={O.y} r={4.5} fill="var(--ink)" />
        <text x={O.x + 2} y={O.y + 24} textAnchor="middle" fontSize={18} fill="var(--ink)">
          O
        </text>
        <text x={O.x + ARM + 8} y={O.y + 6} fontSize={18} fill="var(--ink)">
          A
        </text>
        <text x={10} y={26} fontSize={20} fill="var(--unit-mm2)">
          {kind[0].toUpperCase() + kind.slice(1)}
        </text>
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
