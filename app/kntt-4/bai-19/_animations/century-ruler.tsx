"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { centuryRange, toRoman } from "@/lib/time-units";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const rows = [
  { century: 1, name: "thế kỉ một", step: 0 },
  { century: 2, name: "thế kỉ hai", step: 1 },
  { century: 3, name: "thế kỉ ba", step: 2 },
  { century: 20, name: "thế kỉ hai mươi", step: 3 },
  { century: 21, name: "thế kỉ hai mươi mốt", step: 4 },
];

const captions = [
  "Thế kỉ đầu tiên bắt đầu từ năm 1. Đếm đủ 100 năm thì hết năm 100. Đó là thế kỉ một, viết là thế kỉ I.",
  "Năm 101 mới sang thế kỉ mới. Từ năm 101 đến năm 200 là thế kỉ hai, viết là thế kỉ II.",
  "Từ năm 201 đến năm 300 là thế kỉ ba, viết là thế kỉ III.",
  "Cứ đếm tiếp như vậy. Từ năm 1901 đến năm 2000 là thế kỉ hai mươi, viết là thế kỉ XX.",
  "Từ năm 2001 đến năm 2100 là thế kỉ hai mươi mốt, viết là thế kỉ XXI. Chúng ta đang sống ở thế kỉ này.",
  "Con nhìn cột năm cuối: 100, 200, 300, …, 2000, 2100. Năm tròn trăm luôn là năm cuối của một thế kỉ.",
];

/** Dựng dần các đoạn 100 năm. Mọi hàng luôn chiếm chỗ để nút không nhảy khi con bấm Tiếp. */
export function CenturyRuler() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="grid grid-cols-[6.5rem_1fr] gap-x-2 border-b-2 border-dotted border-input pb-2 text-base font-bold text-muted-foreground">
        <span>Thế kỉ</span>
        <span className="flex justify-between">
          <span>Năm đầu</span>
          <span>Năm cuối</span>
        </span>
      </div>
      <ol className="mt-2 space-y-2">
        {rows.flatMap((row) => {
          const [start, end] = centuryRange(row.century);
          const shown = step >= row.step;
          const enter = shown ? { "data-enter": row.step, "data-scale": 0.92 } : {};
          const item = (
            <li
              key={row.century}
              {...enter}
              data-testid={`century-${row.century}`}
              className={cn("grid grid-cols-[6.5rem_1fr] items-center gap-x-2", !shown && "invisible")}
            >
              <span className="leading-tight">
                <span className="block font-heading text-2xl font-bold text-unit-century">{toRoman(row.century)}</span>
                <span className="block text-sm font-semibold text-muted-foreground">{row.name}</span>
              </span>
              <span className="flex items-center gap-1.5 text-lg font-extrabold tabular-nums">
                <span>{start}</span>
                <span aria-hidden className="h-2.5 flex-1 rounded-full bg-unit-century-soft" />
                <span aria-label="năm cuối" className={cn("rounded-lg bg-sun/60 px-2 py-0.5", step === 5 && "ring-3 ring-unit-century")}>
                  {end}
                </span>
              </span>
            </li>
          );
          if (row.century !== 20) return [item];
          const dots = (
            <li
              key="dots"
              {...enter}
              aria-hidden
              className={cn("pl-2 font-heading text-2xl leading-none font-bold text-unit-century", !shown && "invisible")}
            >
              …
            </li>
          );
          return [dots, item];
        })}
      </ol>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
