"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const CELL = 30;
const GRID = CELL * 10;
const LEFT = 34;
const TOP = 34;
const SIZE = LEFT + GRID + 6;
const CENTER_X = LEFT + GRID / 2;
const CENTER_Y = TOP + GRID / 2;

const tones = {
  m2: { strong: "var(--unit-m2)", soft: "var(--unit-m2-soft)" },
  dm2: { strong: "var(--unit-dm2)", soft: "var(--unit-dm2-soft)" },
  cm2: { strong: "var(--unit-cm2)", soft: "var(--unit-cm2-soft)" },
  mm2: { strong: "var(--unit-mm2)", soft: "var(--unit-mm2-soft)" },
};

type Stage = "cell" | "tiny" | "frame" | "row" | "all" | "whole";

const TILING: Stage[] = ["cell", "row", "all", "whole"];
const ZOOMING: Stage[] = ["tiny", "frame", "row", "all", "whole"];

type TileGridProps = {
  /** Màu của đơn vị lớn (cả hình) và đơn vị nhỏ (mỗi ô). */
  whole: keyof typeof tones;
  cell: keyof typeof tones;
  wholeLabel: string;
  sideLabel: string;
  /** Mỗi giai đoạn một câu: 4 câu, hoặc 5 câu nếu có `zoomIntro`. */
  captions: string[];
  /** Mở đầu bằng một ô rất nhỏ nhìn qua kính lúp, rồi phóng to. */
  zoomIntro?: boolean;
};

/** Lát 100 ô nhỏ vào hình vuông lớn, cho thấy vì sao đổi diện tích gấp 100 chứ không phải 10. */
export function TileGrid({ whole, cell, wholeLabel, sideLabel, captions, zoomIntro = false }: TileGridProps) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const stages = zoomIntro ? ZOOMING : TILING;
  const stepOf = (stage: Stage) => stages.indexOf(stage);
  const reached = (stage: Stage) => stepOf(stage) !== -1 && step >= stepOf(stage);

  const cells: { row: number; column: number; enter: number }[] = [];
  if (!zoomIntro) cells.push({ row: 0, column: 0, enter: 0 });
  if (reached("row")) {
    for (let column = zoomIntro ? 0 : 1; column < 10; column += 1) {
      cells.push({ row: 0, column, enter: stepOf("row") });
    }
  }
  if (reached("all")) {
    for (let row = 1; row < 10; row += 1) {
      for (let column = 0; column < 10; column += 1) {
        cells.push({ row, column, enter: stepOf("all") });
      }
    }
  }

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label={`Hình vuông ${wholeLabel} được lát bởi các ô nhỏ`}
        className="mx-auto block w-full max-w-md"
      >
        {step === stepOf("tiny") ? (
          <g>
            <circle cx={CENTER_X} cy={CENTER_Y} r={92} fill="white" stroke="var(--foreground)" strokeWidth={7} />
            <line
              x1={CENTER_X + 66}
              y1={CENTER_Y + 66}
              x2={CENTER_X + 128}
              y2={CENTER_Y + 128}
              stroke="var(--foreground)"
              strokeWidth={15}
              strokeLinecap="round"
            />
            <rect x={CENTER_X - 15} y={CENTER_Y - 15} width={30} height={30} rx={2} fill={tones[whole].strong} />
          </g>
        ) : null}

        {!zoomIntro || reached("frame") ? (
          <rect
            data-enter={zoomIntro ? stepOf("frame") : undefined}
            data-scale={0.1}
            x={LEFT}
            y={TOP}
            width={GRID}
            height={GRID}
            fill={tones[whole].soft}
            stroke={tones[whole].strong}
            strokeWidth={2.5}
            strokeDasharray="8 6"
          />
        ) : null}

        {cells.map(({ row, column, enter }) => (
          <rect
            key={`${row}-${column}`}
            data-enter={enter}
            x={LEFT + column * CELL + 1}
            y={TOP + row * CELL + 1}
            width={CELL - 2}
            height={CELL - 2}
            rx={3}
            fill={tones[cell].strong}
          />
        ))}

        {reached("whole") ? (
          <g data-enter={stepOf("whole")} data-scale={0.96}>
            <rect x={LEFT} y={TOP} width={GRID} height={GRID} rx={3} fill={tones[whole].strong} fillOpacity={0.92} />
            <text
              x={CENTER_X}
              y={CENTER_Y + 22}
              textAnchor="middle"
              fontSize={66}
              fontWeight={800}
              fill="white"
              fontFamily="var(--font-heading)"
            >
              {wholeLabel}
            </text>
          </g>
        ) : null}

        {reached("row") ? (
          <text
            data-enter={stepOf("row")}
            x={CENTER_X}
            y={22}
            textAnchor="middle"
            fontSize={20}
            fontWeight={800}
            fill="var(--foreground)"
          >
            {sideLabel}
          </text>
        ) : null}

        {reached("all") ? (
          <text
            data-enter={stepOf("all")}
            transform={`translate(22 ${CENTER_Y}) rotate(-90)`}
            textAnchor="middle"
            fontSize={20}
            fontWeight={800}
            fill="var(--foreground)"
          >
            {sideLabel}
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
