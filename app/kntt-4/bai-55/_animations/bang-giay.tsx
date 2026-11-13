"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";
import { Bang } from "../_illustrations/bang-giay";

export const bangGiayCaptions = [
  "Việt chia băng giấy thành 3 phần bằng nhau, rồi tô màu 2 phần. Việt tô màu 2/3 băng giấy.",
  "Mai có băng giấy như thế. Mai chia mỗi phần thành 2 phần nhỏ bằng nhau (nét đứt). Băng giấy có 6 phần bằng nhau, Mai tô màu 4 phần: 4/6 băng giấy.",
  "Đặt hai băng cạnh nhau: phần tô màu dài bằng nhau. Vậy 2/3 băng giấy bằng 4/6 băng giấy: 2/3 = 4/6.",
];

/** Hai băng giấy như nhau: 2/3 và 4/6 cùng chỉ một phần của băng giấy. */
export function BangGiay() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = [
    "Băng của Việt chia 3 phần, tô 2 phần",
    "Băng của Mai chia 6 phần, tô 4 phần, mỗi phần của băng Việt chia đôi bằng nét đứt",
    "Hai phần tô màu dài bằng nhau, 2/3 bằng 4/6",
  ][step];
  const end = 10 + (240 * 2) / 3;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 190" role="img" aria-label={`Hai băng giấy: ${label}`} className="block w-full" fontWeight={800}>
        <text x={4} y={20} fontSize={16} fill="var(--foreground)">Băng của Việt</text>
        <Bang x={10} y={28} w={240} h={36} parts={3} filled={2} color="var(--unit-tan)" dashed={step >= 1 ? 1 : 0} />
        <text x={262} y={54} fontSize={22} fill="var(--unit-tan)">2/3</text>
        <text x={4} y={104} fontSize={16} fill="var(--foreground)">Băng của Mai</text>
        {step >= 1 ? (
          <g data-enter={1} data-scale={0.9}>
            <Bang x={10} y={112} w={240} h={36} parts={6} filled={4} color="var(--unit-mm2)" />
            <text x={262} y={138} fontSize={22} fill="var(--unit-mm2)">4/6</text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <line x1={end} y1={20} x2={end} y2={160} stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="6 4" />
            <text x={170} y={182} textAnchor="middle" fontSize={18} fill="var(--ink)">2/3 = 4/6</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={bangGiayCaptions} onChange={setStep} />
    </figure>
  );
}
