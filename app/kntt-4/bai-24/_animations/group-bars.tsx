"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber as n } from "@/lib/area-units";
import { useRef, useState } from "react";
import { Bar, barColors } from "./bars";

const LEFT = 20;
const VALUES = [45000, 75000, 25000];
const TOTAL = VALUES.reduce((sum, value) => sum + value, 0);
const WIDTHS = [93, 155, 52];
const STARTS = [LEFT, LEFT + WIDTHS[0], LEFT + WIDTHS[0] + WIDTHS[1]];
const END = LEFT + WIDTHS[0] + WIDTHS[1] + WIDTHS[2];
const COLORS = [barColors.a, barColors.b, barColors.c];
const LETTERS = ["a", "b", "c"];

const captions = [
  `Ba đồ uống giá ${n(VALUES[0])}, ${n(VALUES[1])} và ${n(VALUES[2])} đồng. Tính tổng tiền.`,
  `Cách 1: cộng hai thanh đầu trước. (${n(VALUES[0])} + ${n(VALUES[1])}) + ${n(VALUES[2])} = ${n(VALUES[0] + VALUES[1])} + ${n(VALUES[2])} = ${n(TOTAL)}.`,
  `Cách 2: cộng hai thanh sau trước. ${n(VALUES[0])} + (${n(VALUES[1])} + ${n(VALUES[2])}) = ${n(VALUES[0])} + ${n(VALUES[1] + VALUES[2])} = ${n(TOTAL)}.`,
  "Hai cách nhóm cho cùng một tổng. Thứ tự ba số vẫn giữ nguyên, chỉ đổi cặp cộng trước.",
];

function Bracket({ from, to, label }: { from: number; to: number; label: string }) {
  return (
    <g>
      <path d={`M${from} 86 V92 H${to} V86`} fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
      <text x={(from + to) / 2} y={114} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--ink)">
        {label}
      </text>
    </g>
  );
}

/** Kết hợp: cùng ba thanh, ngoặc ôm hai cặp khác nhau, tổng vẫn thế. */
export function GroupBars() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const label = [
    "Ba thanh a, b, c",
    "ngoặc ôm hai thanh đầu, cộng được 120 000",
    "ngoặc ôm hai thanh sau, cộng được 100 000",
    "hai cách nhóm cùng cho 145 000",
  ][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 200" role="img" aria-label={label} className="block w-full">
        {VALUES.map((value, index) => (
          <g key={value}>
            <text x={STARTS[index] + WIDTHS[index] / 2} y={32} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--foreground)">
              {n(value)}
            </text>
            <Bar x={STARTS[index]} y={40} width={WIDTHS[index]} color={COLORS[index]} label={LETTERS[index]} />
          </g>
        ))}

        {step === 1 ? (
          <g data-enter={1}>
            <Bracket from={STARTS[0] + 2} to={STARTS[2] - 2} label={n(VALUES[0] + VALUES[1])} />
            <text x={170} y={144} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--foreground)">
              ({n(VALUES[0])} + {n(VALUES[1])}) + {n(VALUES[2])}
            </text>
            <text x={170} y={168} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--foreground)">
              = {n(VALUES[0] + VALUES[1])} + {n(VALUES[2])} = {n(TOTAL)}
            </text>
          </g>
        ) : null}
        {step === 2 ? (
          <g data-enter={2}>
            <Bracket from={STARTS[1] + 2} to={END - 2} label={n(VALUES[1] + VALUES[2])} />
            <text x={170} y={144} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--foreground)">
              {n(VALUES[0])} + ({n(VALUES[1])} + {n(VALUES[2])})
            </text>
            <text x={170} y={168} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--foreground)">
              = {n(VALUES[0])} + {n(VALUES[1] + VALUES[2])} = {n(TOTAL)}
            </text>
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <text x={170} y={108} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--foreground)">
              (a + b) + c = {n(TOTAL)}
            </text>
            <text x={170} y={136} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--foreground)">
              a + (b + c) = {n(TOTAL)}
            </text>
            <text x={170} y={174} textAnchor="middle" fontSize={21} fontWeight={800} fill="var(--ink)">
              (a + b) + c = a + (b + c)
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
