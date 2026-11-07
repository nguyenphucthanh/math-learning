"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { CELL, columnCenter, PLACE_LABELS, signCenter, VIEW_WIDTH } from "@/components/math/column-layout";
import { formatNumber } from "@/lib/area-units";
import { columnSub, readSubColumn } from "@/lib/column-sub";
import { useRef, useState } from "react";

type Props = {
  a: number;
  b: number;
  /** Có thì bước đầu chỉ hiện đề bài, bước hai mới hiện cột. */
  intro?: string;
  /** Lời của bước đặt tính. */
  setup: string;
  /** Hiện tên hàng phía trên cột. */
  labels?: boolean;
};

export function columnSubCaptions({ a, b, intro, setup }: Props): string[] {
  return [...(intro ? [intro] : []), setup, ...columnSub(a, b).map((column) => `${readSubColumn(column)}.`)];
}

/** Trừ từng cột, từ phải sang trái. React vẽ sẵn trạng thái của bước hiện tại, GSAP chỉ thêm chuyển động. */
export function ColumnSub(props: Props) {
  const { a, b, intro, labels = false } = props;
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const columns = columnSub(a, b);
  const size = columns.length;
  const captions = columnSubCaptions(props);
  const gridStep = intro ? 1 : 0;
  const stepOf = (position: number) => gridStep + 1 + position;
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

  const index = (position: number) => size - 1 - position;
  const bottomDigits = String(b).split("").reverse();

  const current = columns.find((column) => stepOf(column.position) === step);
  const highlight = current
    ? { left: columnCenter(index(current.position), size) - CELL / 2 + 2, right: columnCenter(index(current.position), size) + CELL / 2 - 2 }
    : null;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${height}`}
        role="img"
        aria-label={`Phép trừ ${formatNumber(a)} − ${formatNumber(b)}. ${
          showGrid ? (partial ? `Đã trừ ${doneColumns.length} cột, kết quả đến lúc này ${partial}.` : "Đã đặt tính, chưa trừ.") : "Mới có đề bài."
        }`}
        className="block w-full"
        fontWeight={800}
        textAnchor="middle"
      >
        <text x={VIEW_WIDTH / 2} y={30} fontSize={22} fill="var(--ink)">
          {formatNumber(a)} − {formatNumber(b)} = {finished ? formatNumber(a - b) : "?"}
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
                  <text x={x} y={topY + 10} fontSize={30} fill="var(--ink)">
                    {column.top}
                  </text>
                  {column.bottom !== null ? (
                    <text x={x} y={bottomY + 10} fontSize={30} fill="var(--ink)">
                      {bottomDigits[column.position]}
                    </text>
                  ) : null}
                </g>
              );
            })}
            <text x={signCenter(size)} y={bottomY + 10} fontSize={30} fill="var(--ink)">
              −
            </text>
            <rect x={signCenter(size) - CELL / 2 + 4} y={lineY} width={VIEW_WIDTH - 2 * (signCenter(size) - CELL / 2 + 4)} height={3} rx={1.5} fill="var(--ink)" />
          </g>
        ) : null}

        {columns.map((column) => {
          if (!column.borrowOut || step < stepOf(column.position)) return null;
          const x = columnCenter(index(column.position), size);
          return (
            <g key={`ten-${column.position}`} data-enter={stepOf(column.position)} data-scale={0.3}>
              <circle cx={x - 19} cy={topY + 2} r={10} fill="var(--sun)" />
              <text x={x - 19} y={topY + 8} fontSize={16} fill="var(--ink)">
                1
              </text>
            </g>
          );
        })}

        {columns.map((column) => {
          if (!column.borrowOut || step < stepOf(column.position)) return null;
          const x = columnCenter(index(column.position + 1), size);
          return (
            <g key={`borrow-${column.position}`} data-enter={stepOf(column.position)} data-scale={0.3}>
              <circle cx={x} cy={carryY} r={15} fill="var(--sun)" />
              <text x={x} y={carryY + 6} fontSize={17} fill="var(--ink)">
                −1
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
