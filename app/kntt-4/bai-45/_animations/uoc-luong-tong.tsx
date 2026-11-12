"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { roundToPlace } from "@/lib/round-numbers";
import { useRef, useState } from "react";

const n = formatNumber;

export function uocLuongCaptions(a: number, b: number, position: number): string[] {
  const ra = roundToPlace(a, position);
  const rb = roundToPlace(b, position);
  return [
    `Cả ngày có bao nhiêu lượt khách? Hai số là ${n(a)} và ${n(b)}. Con chỉ cần biết khoảng mấy nghìn.`,
    `Làm tròn ${n(a)} thành ${n(ra)}; làm tròn ${n(b)} thành ${n(rb)}.`,
    `Cộng hai số đã làm tròn: ${n(ra)} + ${n(rb)} = ${n(ra + rb)}. Vậy cả ngày có khoảng ${n(ra + rb)} lượt. Số thật là ${n(a + b)}, gần ${n(ra + rb)} chứ chưa bằng.`,
  ];
}

/** Ước lượng a + b bằng cách làm tròn đến hàng ở vị trí `position` rồi cộng. */
export function UocLuongTong({ a, b, position }: { a: number; b: number; position: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const ra = roundToPlace(a, position);
  const rb = roundToPlace(b, position);
  const captions = uocLuongCaptions(a, b, position);
  const label = ["chưa làm tròn", `làm tròn thành ${ra} và ${rb}`, `khoảng ${ra + rb}`][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 200" role="img" aria-label={`${a} cộng ${b}: ${label}`} className="block w-full" fontWeight={800}>
        <text x={85} y={40} fontSize={28} textAnchor="middle" fill="var(--ink)">{n(a)}</text>
        <text x={170} y={40} fontSize={28} textAnchor="middle" fill="var(--ink)">+</text>
        <text x={255} y={40} fontSize={28} textAnchor="middle" fill="var(--ink)">{n(b)}</text>
        {step >= 1 ? (
          <g data-enter={1}>
            <text x={85} y={90} fontSize={26} textAnchor="middle" fill="var(--unit-m2)">≈ {n(ra)}</text>
            <text x={255} y={90} fontSize={26} textAnchor="middle" fill="var(--unit-m2)">≈ {n(rb)}</text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <text x={170} y={145} fontSize={26} textAnchor="middle" fill="var(--ink)">{n(ra)} + {n(rb)} = {n(ra + rb)}</text>
            <text x={170} y={182} fontSize={20} textAnchor="middle" fill="var(--ink)">khoảng {n(ra + rb)}</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
