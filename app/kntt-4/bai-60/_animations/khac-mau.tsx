"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { Eq, Ps } from "@/components/math/phan-so-svg";
import { useRef, useState } from "react";
import { BangGiay } from "./bang-giay";

export const khacMauCaptions = [
  "Tớ tô đỏ 1/8 băng giấy rồi tô tiếp xanh 1/2 băng giấy. Mẫu số khác nhau: 8 và 2, chưa cộng ngay được.",
  "Quy đồng mẫu số: 8 : 2 = 4. Chia mỗi nửa thành 4 phần, được 1/2 = (1 × 4)/(2 × 4) = 4/8.",
  "Bây giờ cùng mẫu số 8: 1/8 + 4/8 = (1 + 4)/8 = 5/8.",
  "Cẩn thận: 1/8 + 1/2 = 2/10 là sai. Khác mẫu số thì phải quy đồng trước, không cộng tử với tử, mẫu với mẫu.",
];

/** Cộng hai phân số khác mẫu số: 1/8 + 1/2, quy đồng 1/2 = 4/8 rồi cộng. */
export function KhacMau() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const label = ["1/8 và 1/2, mẫu số khác nhau", "1/2 bằng 4/8", "1/8 + 4/8 = 5/8", "2/10 là sai"][step];
  const red = "var(--unit-tan)";
  const blue = "var(--unit-mm2)";

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 320 230" role="img" aria-label={`Cộng khác mẫu số: ${label}`} className="block w-full" fontWeight={800}>
        <BangGiay y={8} parts={8} segs={[{ from: 0, n: 1, color: red }]} />
        <text x={10} y={56} fontSize={16} fill="var(--ink)">1/8</text>
        <BangGiay y={66} parts={2} segs={[{ from: 0, n: 1, color: blue }]} />
        <text x={10} y={114} fontSize={16} fill="var(--ink)">1/2</text>
        {step >= 1 ? (
          <g data-enter={1}>
            <BangGiay y={124} parts={8} segs={[{ from: 0, n: 4, color: blue }]} />
            <text x={160} y={174} textAnchor="middle" fontSize={16} fill="var(--ink)">1/2 = (1 × 4)/(2 × 4) = 4/8</text>
          </g>
        ) : null}
        {step >= 2 && step < 3 ? (
          <g data-enter={2}>
            <Ps x={30} y={208} top="1" bottom="8" />
            <Eq x={62} y={208} text="+" />
            <Ps x={94} y={208} top="4" bottom="8" />
            <Eq x={128} y={208} />
            <Ps x={182} y={208} top="1 + 4" bottom="8" />
            <Eq x={236} y={208} />
            <Ps x={270} y={208} top="5" bottom="8" fill="var(--good)" />
          </g>
        ) : null}
        {step >= 3 ? (
          <text data-enter={3} x={160} y={212} textAnchor="middle" fontSize={20} fill="var(--oops)">1/8 + 1/2 = 2/10 ✗</text>
        ) : null}
      </svg>
      <StepControls step={step} captions={khacMauCaptions} onChange={setStep} />
    </figure>
  );
}
