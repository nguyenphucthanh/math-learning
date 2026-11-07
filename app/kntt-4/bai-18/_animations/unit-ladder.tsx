"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRef, useState } from "react";

const rungs = [
  { unit: "m²", name: "mét vuông", color: "bg-unit-m2", soft: "bg-unit-m2-soft", text: "text-unit-m2", swatch: "size-16 sm:size-20" },
  { unit: "dm²", name: "đề-xi-mét vuông", color: "bg-unit-dm2", soft: "bg-unit-dm2-soft", text: "text-unit-dm2", swatch: "size-11 sm:size-14" },
  { unit: "cm²", name: "xăng-ti-mét vuông", color: "bg-unit-cm2", soft: "bg-unit-cm2-soft", text: "text-unit-cm2", swatch: "size-7 sm:size-9" },
  { unit: "mm²", name: "mi-li-mét vuông", color: "bg-unit-mm2", soft: "bg-unit-mm2-soft", text: "text-unit-mm2", swatch: "size-4 sm:size-5" },
];

const captions = [
  "Bốn đơn vị đo diện tích, xếp từ lớn đến bé. Mét vuông lớn nhất.",
  "Đi xuống một bậc: 1 m² = 100 dm². Đổi từ lớn sang bé thì nhân với 100.",
  "Xuống tiếp: 1 dm² = 100 cm².",
  "Xuống bậc cuối: 1 cm² = 100 mm². Mỗi bậc đều là 100, không phải 10.",
  "Đi ngược lên thì chia cho 100. Ví dụ 500 dm² = 5 m², vì 500 : 100 = 5.",
];

/** Thang đơn vị: mỗi bậc gấp 100 lần, đi xuống nhân, đi lên chia. */
export function UnitLadder() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const goingUp = step === captions.length - 1;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <ol className="space-y-1">
        {rungs.map((rung, index) => (
          <li key={rung.unit}>
            {index > 0 ? (
              <div className="flex h-10 items-center pl-[3.25rem] sm:pl-[3.75rem]">
                {step >= index ? (
                  <span
                    data-enter={index}
                    className="inline-flex items-center gap-1 rounded-full bg-sun px-4 py-1 text-lg font-extrabold tabular-nums"
                  >
                    {goingUp ? <ArrowUp aria-hidden className="size-5" /> : <ArrowDown aria-hidden className="size-5" />}
                    {goingUp ? ": 100" : "× 100"}
                  </span>
                ) : null}
              </div>
            ) : null}
            <div className={`flex min-h-20 items-center gap-3 rounded-2xl px-3 py-2 sm:gap-4 sm:px-4 ${rung.soft}`}>
              <span className="flex w-16 shrink-0 items-center justify-center sm:w-20">
                <span aria-hidden className={`block rounded-[3px] ${rung.color} ${rung.swatch}`} />
              </span>
              <span>
                <span className={`block font-heading text-3xl leading-none font-bold ${rung.text}`}>{rung.unit}</span>
                <span className="text-base font-semibold">{rung.name}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
