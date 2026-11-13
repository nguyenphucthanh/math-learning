"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";
import { BangGiay } from "./bang-giay";

export const cungMauCaptions = [
  "Băng giấy chia 5 phần bằng nhau. Tớ tô đỏ 1 phần: 1/5 băng giấy.",
  "Tớ tô tiếp màu xanh 2 phần: 2/5 băng giấy. Cả hai bạn đã tô 3 phần trên 5 phần.",
  "Viết bằng phép tính: cộng hai tử số, giữ nguyên mẫu số. 1/5 + 2/5 = (1 + 2)/5 = 3/5.",
  "Cẩn thận: không cộng mẫu số. 1/5 + 2/5 = 3/10 là sai, vì băng giấy vẫn chia 5 phần, không phải 10 phần.",
];

/** Cộng hai phân số cùng mẫu số: 1/5 + 2/5 trên băng giấy. */
export function CungMau() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["băng giấy tô đỏ 1 phần trên 5", "tô thêm xanh 2 phần, tổng 3 phần trên 5", "1/5 + 2/5 = 3/5, giữ nguyên mẫu số", "3/10 là sai"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 320 170" role="img" aria-label={`Cộng cùng mẫu số: ${label}`} className="block w-full" fontWeight={800}>
        <BangGiay y={8} parts={5} segs={[{ from: 0, n: 1, color: "var(--unit-tan)" }, ...(step >= 1 ? [{ from: 1, n: 2, color: "var(--unit-mm2)", enter: 1 }] : [])]} />
        {step >= 2 && step < 3 ? (
          <g data-enter={2}>
            <Ps x={30} y={92} top="1" bottom="5" />
            <Eq x={62} y={92} text="+" />
            <Ps x={94} y={92} top="2" bottom="5" />
            <Eq x={128} y={92} />
            <Ps x={182} y={92} top="1 + 2" bottom="5" />
            <Eq x={236} y={92} />
            <Ps x={270} y={92} top="3" bottom="5" fill="var(--good)" />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <text x={160} y={96} textAnchor="middle" fontSize={20} fill="var(--oops)">1/5 + 2/5 = 3/10 ✗</text>
            <text x={160} y={132} textAnchor="middle" fontSize={18} fill="var(--ink)">Không cộng mẫu số: 5 + 5</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={cungMauCaptions} onChange={setStep} />
    </figure>
  );
}
