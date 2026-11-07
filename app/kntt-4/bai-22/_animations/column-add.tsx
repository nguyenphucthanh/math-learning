"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { columnAdd, digitsOf, readColumn } from "@/lib/column-add";
import { useRef, useState } from "react";
import { CELL, columnCenter, PLACE_LABELS, signCenter, VIEW_WIDTH } from "./layout";

type Props = {
  a: number;
  b: number;
  /** Có thì bước đầu chỉ hiện đề bài, bước hai mới hiện cột. */
  intro?: string;
  /** Lời của bước đặt tính. */
  setup: string;
  /** Số cột cộng trong mỗi bước. */
  perStep?: number;
  /** Hiện tên hàng phía trên cột. */
  labels?: boolean;
};

export function columnAddCaptions({ a, b, intro, setup, perStep = 1 }: Props): string[] {
  const columns = columnAdd(a, b);
  const groups: string[] = [];
  for (let index = 0; index < columns.length; index += perStep) {
    groups.push(
      columns
        .slice(index, index + perStep)
        .map((column) => `${readColumn(column)}.`)
        .join(" "),
    );
  }
  return [...(intro ? [intro] : []), setup, ...groups];
}

/** Cộng từng cột, từ phải sang trái. React vẽ sẵn trạng thái của bước hiện tại, GSAP chỉ thêm chuyển động. */
export function ColumnAdd(props: Props) {
  const { a, b, intro, perStep = 1, labels = false } = props;
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const columns = columnAdd(a, b);
  const size = columns.length;
  const captions = columnAddCaptions(props);
  const gridStep = intro ? 1 : 0;
  const firstColumnStep = gridStep + 1;
  const stepOf = (position: number) => firstColumnStep + Math.floor(position / perStep);
  const lastStep = captions.length - 1;
  const showGrid = step >= gridStep;
  const enterGrid = intro && step === gridStep ? { "data-enter": gridStep, "data-scale": 0.9 } : {};

  const doneColumns = columns.filter((column) => step >= stepOf(column.position));
  const partial = doneColumns
    .map((column) => column.write)
    .reverse()
    .join("");
  const finished = step === lastStep;

  const carryY = labels ? 112 : 76;
  const topY = carryY + 40;
  const bottomY = topY + 44;
  const lineY = bottomY + 24;
  const resultY = lineY + 38;
  const height = resultY + 30;

  const topDigits = digitsOf(a);
  const bottomDigits = digitsOf(b);
  const index = (position: number) => size - 1 - position;

  const current = columns.filter((column) => stepOf(column.position) === step);
  const highlight =
    current.length > 0
      ? {
          left: columnCenter(index(current[current.length - 1].position), size) - CELL / 2 + 2,
          right: columnCenter(index(current[0].position), size) + CELL / 2 - 2,
        }
      : null;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
        role="img"
        aria-label={`Phép cộng ${formatNumber(a)} + ${formatNumber(b)}. ${
          showGrid ? (partial ? `Đã cộng ${doneColumns.length} cột, kết quả đến lúc này ${partial}.` : "Đã đặt tính, chưa cộng.") : "Mới có đề bài."
        }`}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <text x={VIEW_WIDTH / 2} y={30} fontSize={22} fill="var(--ink)">
          {formatNumber(a)} + {formatNumber(b)} = {finished ? formatNumber(a + b) : "?"}
        </text>

        {showGrid ? (
          <g {...enterGrid}>
            {labels
              ? columns.map((column) => {
                  const [first, second] = PLACE_LABELS[column.position];
                  const x = columnCenter(index(column.position), size);
                  return (
                    <text key={column.position} x={x} y={62} fontSize={14} fill="var(--ink)" fontWeight={700}>
                      <tspan x={x}>{first}</tspan>
                      <tspan x={x} dy={17}>
                        {second}
                      </tspan>
                    </text>
                  );
                })
              : null}
            {highlight ? (
              <rect
                key={step}
                data-enter={step}
                x={highlight.left}
                y={carryY - 20}
                width={highlight.right - highlight.left}
                height={resultY + 26 - (carryY - 20)}
                rx={12}
                fill="var(--sun)"
                opacity={0.4}
              />
            ) : null}
            {columns.map((column) => {
              const x = columnCenter(index(column.position), size);
              return (
                <g key={column.position}>
                  {column.top !== null ? (
                    <text x={x} y={topY + 10} fontSize={30} fill="var(--ink)">
                      {topDigits[column.position]}
                    </text>
                  ) : null}
                  {column.bottom !== null ? (
                    <text x={x} y={bottomY + 10} fontSize={30} fill="var(--ink)">
                      {bottomDigits[column.position]}
                    </text>
                  ) : null}
                </g>
              );
            })}
            <text x={signCenter(size)} y={bottomY + 10} fontSize={30} fill="var(--ink)">
              +
            </text>
            <rect x={signCenter(size) - CELL / 2 + 4} y={lineY} width={VIEW_WIDTH - 2 * (signCenter(size) - CELL / 2 + 4)} height={3} rx={1.5} fill="var(--ink)" />
          </g>
        ) : null}

        {columns.map((column) => {
          if (!column.carryOut || step < stepOf(column.position)) return null;
          const x = columnCenter(index(column.position + 1), size);
          return (
            <g key={`carry-${column.position}`} data-enter={stepOf(column.position)} data-scale={0.3}>
              <circle cx={x} cy={carryY} r={13} fill="var(--sun)" />
              <text x={x} y={carryY + 6} fontSize={18} fill="var(--ink)">
                1
              </text>
            </g>
          );
        })}

        {doneColumns.map((column) => (
          <text
            key={`write-${column.position}`}
            data-testid={`write-${column.position}`}
            data-enter={stepOf(column.position)}
            x={columnCenter(index(column.position), size)}
            y={resultY + 10}
            fontSize={30}
            fill="var(--ink)"
          >
            {column.write}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
