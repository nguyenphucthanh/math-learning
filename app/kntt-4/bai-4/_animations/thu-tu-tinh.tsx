"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const WIDTH = 360;
const COLUMN = 64;
const LEFT = 20;
const TILE = 52;

const captions = [
  "35 + 5 × a có phép cộng và phép nhân. Ta sẽ tính khi a = 6.",
  "Thay chữ a bằng số 6: 35 + 5 × 6.",
  "Nhân làm trước cộng. 5 × 6 = 30, nên 35 + 5 × 6 = 35 + 30.",
  "35 + 30 = 65. Giá trị của biểu thức 35 + 5 × a khi a = 6 là 65. Thay số xong, con vẫn tính nhân, chia trước; cộng, trừ sau.",
];

const cx = (column: number) => LEFT + column * COLUMN + TILE / 2;

function Tile({ column, span = 1, y, text, fill, enter, bold }: { column: number; span?: number; y: number; text: string; fill?: string; enter?: number; bold?: boolean }) {
  const width = TILE + (span - 1) * COLUMN;
  return (
    <g data-enter={enter}>
      <rect x={LEFT + column * COLUMN} y={y} width={width} height={44} rx={12} fill={fill ?? "none"} fillOpacity={fill ? 0.5 : undefined} stroke={bold ? "var(--ink)" : "var(--input)"} strokeWidth={bold ? 3 : 2} />
      <text x={LEFT + column * COLUMN + width / 2} y={y + 31} fontSize={26} fill="var(--ink)" textAnchor="middle">{text}</text>
    </g>
  );
}

function Sign({ column, y, text }: { column: number; y: number; text: string }) {
  return (
    <text x={cx(column)} y={y + 31} fontSize={26} fill="var(--ink)" textAnchor="middle">{text}</text>
  );
}

/** Tính 35 + 5 × a với a = 6: thay số, nhân trước, cộng sau. */
export function ThuTuTinh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${WIDTH} 250`}
        role="img"
        aria-label={
          step === 0
            ? "Biểu thức 35 + 5 × a."
            : step === 1
              ? "Thay a = 6: 35 + 5 × 6."
              : step === 2
                ? "Nhân trước: 5 × 6 = 30, được 35 + 30."
                : "35 + 30 = 65."
        }
        className="block w-full"
        fontWeight={800}
      >
        <Tile column={0} y={8} text="35" />
        <Sign column={1} y={8} text="+" />
        <Tile column={2} y={8} text="5" />
        <Sign column={3} y={8} text="×" />
        <Tile column={4} y={8} text="a" fill="var(--sun)" />

        {step >= 1 ? (
          <g data-enter={1}>
            <Tile column={0} y={68} text="35" />
            <Sign column={1} y={68} text="+" />
            <Tile column={2} y={68} text="5" bold={step === 2} />
            <Sign column={3} y={68} text="×" />
            <Tile column={4} y={68} text="6" fill="var(--sun)" bold={step === 2} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <Tile column={0} y={128} text="35" />
            <Sign column={1} y={128} text="+" />
            <Tile column={2} span={3} y={128} text="30" fill="var(--unit-second)" />
            <text x={LEFT + 3 * COLUMN} y={120} fontSize={14} fill="var(--ink)" textAnchor="middle">5 × 6</text>
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <Tile column={0} span={5} y={188} text="65" fill="var(--good)" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
