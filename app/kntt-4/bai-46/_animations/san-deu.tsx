"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const BASE = 170;
const HEIGHT = 120;
const BAR_W = 50;
const GAP = 24;
const COLORS = ["var(--unit-second)", "var(--unit-ta)", "var(--unit-cm2)", "var(--unit-dm2)"];

export function meanOf(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

export function sanDeuCaptions(values: number[]): string[] {
  const sum = values.reduce((s, v) => s + v, 0);
  const mean = meanOf(values);
  return [
    `Có ${values.length} cột, cao ${values.join(", ")}. Các cột chưa bằng nhau.`,
    `Cộng các số: ${values.join(" + ")} = ${sum}. Cột cao có phần thừa (màu vàng), cột thấp còn thiếu (nét đứt).`,
    `Chia đều ${sum} cho ${values.length} cột: lấy phần thừa bù vào phần thiếu, các cột bằng nhau, mỗi cột cao ${mean}.`,
    `(${values.join(" + ")}) : ${values.length} = ${mean}. ${mean} là số trung bình cộng của ${values.length} số ${values.join(", ")}.`,
  ];
}

/** Các cột được san đều: số trung bình cộng là chiều cao chung sau khi chia đều tổng. */
export function SanDeu({ values }: { values: number[] }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const count = values.length;
  const mean = meanOf(values);
  const sum = values.reduce((s, v) => s + v, 0);
  const k = HEIGHT / Math.max(...values);
  const total = count * BAR_W + (count - 1) * GAP;
  const x0 = (340 - total) / 2;
  const levelled = step >= 2;
  const lineY = BASE - mean * k;
  const label = ["các cột chưa bằng nhau", "đã cộng, thấy phần thừa và phần thiếu", `đã san đều, mỗi cột ${mean}`, `số trung bình cộng là ${mean}`][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 215" role="img" aria-label={`${count} cột cao ${values.join(", ")}: ${label}.`} className="block w-full">
        <line x1={10} x2={330} y1={BASE} y2={BASE} stroke="var(--ink)" strokeWidth={2} />
        {values.map((v, i) => {
          const x = x0 + i * (BAR_W + GAP);
          const h = (levelled ? mean : v) * k;
          const color = COLORS[i % COLORS.length];
          return (
            <g key={i}>
              <rect
                x={x}
                y={BASE - h}
                width={BAR_W}
                height={h}
                rx={4}
                fill={color}
                fillOpacity={step === 1 ? 0.45 : 1}
                stroke="var(--ink)"
                strokeWidth={2}
                className="transition-all duration-500 motion-reduce:transition-none"
              />
              {step === 1 && v > mean ? <rect data-enter={1} x={x} y={BASE - v * k} width={BAR_W} height={(v - mean) * k} rx={4} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2} /> : null}
              {step === 1 && v < mean ? <rect data-enter={1} x={x} y={lineY} width={BAR_W} height={(mean - v) * k} rx={4} fill="none" stroke="var(--ink)" strokeWidth={2} strokeDasharray="5 4" /> : null}
              <text data-testid={`v-${i}`} x={x + BAR_W / 2} y={(levelled ? lineY : BASE - v * k) - 8} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
                {levelled ? mean : v}
              </text>
            </g>
          );
        })}
        {step >= 1 ? <line data-enter={1} x1={10} x2={330} y1={lineY} y2={lineY} stroke="var(--ink)" strokeWidth={2} strokeDasharray="6 4" /> : null}
        {step === 1 ? (
          <text data-enter={1} x={170} y={BASE + 26} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
            {values.join(" + ")} = {sum}
          </text>
        ) : null}
        {step === 2 ? (
          <text data-enter={2} x={170} y={BASE + 26} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
            {sum} : {count} = {mean}
          </text>
        ) : null}
        {step === 3 ? (
          <text data-enter={3} x={170} y={BASE + 26} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
            ({values.join(" + ")}) : {count} = {mean}
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={sanDeuCaptions(values)} onChange={setStep} />
    </figure>
  );
}
