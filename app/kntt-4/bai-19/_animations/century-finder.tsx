"use client";

import { centuryOf, centuryRange, toRoman } from "@/lib/time-units";
import { cn } from "@/lib/utils";
import { useState } from "react";

const YEARS = [1228, 1900, 1901, 2000, 2001];
const LEFT = 36;
const WIDTH = 288;

export function describeYear(year: number): string {
  const century = toRoman(centuryOf(year));
  const [start, end] = centuryRange(centuryOf(year));
  if (year === end) return `Năm ${year} là năm cuối của đoạn từ ${start} đến ${end}, nên thuộc thế kỉ ${century}. Chưa sang thế kỉ sau đâu nhé!`;
  if (year === start) return `Năm ${year} là năm đầu của đoạn từ ${start} đến ${end}, nên thuộc thế kỉ ${century}.`;
  return `Năm ${year} nằm giữa năm ${start} và năm ${end}, nên thuộc thế kỉ ${century}.`;
}

/** Chạm chọn một năm để thấy nó nằm ở đoạn nào. Chỉ dùng các năm có lời giải thích đúng. */
export function CenturyFinder() {
  const [year, setYear] = useState(YEARS[0]);
  const [start, end] = centuryRange(centuryOf(year));
  const markerX = LEFT + (WIDTH * (year - start)) / (end - start);

  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <figcaption className="text-lg font-semibold">Con chạm vào một năm nhé.</figcaption>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
        {YEARS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === year}
            onClick={() => setYear(item)}
            className={cn(
              "min-h-13 rounded-2xl border-[3px] text-xl font-extrabold tabular-nums transition-colors",
              item === year ? "border-ink bg-ink text-white" : "border-input bg-white hover:bg-secondary",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 360 108" role="img" aria-label={`Đoạn từ năm ${start} đến năm ${end}, đánh dấu năm ${year}`} className="mt-4 block w-full">
        <line x1={LEFT} y1={58} x2={LEFT + WIDTH} y2={58} stroke="var(--unit-century)" strokeWidth={10} strokeLinecap="round" />
        <text x={LEFT} y={96} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--foreground)">
          {start}
        </text>
        <text x={LEFT + WIDTH} y={96} textAnchor="middle" fontSize={17} fontWeight={800} fill="var(--foreground)">
          {end}
        </text>
        <g
          data-testid="year-marker"
          className="transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${markerX}px)` }}
        >
          <circle cy={58} r={11} fill="var(--sun)" stroke="var(--foreground)" strokeWidth={2.5} />
          <text y={32} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
            {year}
          </text>
        </g>
      </svg>

      <p aria-live="polite" className="mt-3 min-h-[5.25rem] text-lg leading-relaxed font-semibold sm:min-h-[3.5rem]">
        {describeYear(year)}
      </p>
    </figure>
  );
}
