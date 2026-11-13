"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const SO_DO = 9;
export const SO_VANG = 11;

export const soSanhCaptions = [
  "Màu đỏ dừng 9 lần, màu vàng dừng 11 lần. Mỗi chấm là một lần.",
  "Ghép mỗi chấm đỏ với một chấm vàng. Ghép được 9 cặp.",
  `Còn ${SO_VANG - SO_DO} chấm vàng không có cặp. Vậy màu vàng xuất hiện nhiều lần hơn màu đỏ ${SO_VANG - SO_DO} lần: ${SO_VANG} − ${SO_DO} = ${SO_VANG - SO_DO}. Màu đỏ xuất hiện ít lần hơn.`,
];

/** Ghép cặp để thấy sự kiện nào xuất hiện nhiều lần hơn và hơn bao nhiêu lần. */
export function SoSanhLan() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const cx = (i: number) => 20 + i * 30;
  const label = ["màu đỏ 9 chấm, màu vàng 11 chấm", "ghép 9 cặp", "còn 2 chấm vàng, vàng nhiều lần hơn đỏ 2 lần"][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 170" role="img" aria-label={`So sánh số lần: ${label}`} className="block w-full" fontWeight={800}>
        <text x={4} y={20} fontSize={16} fill="var(--unit-mm2)">Màu đỏ: {SO_DO} lần</text>
        <text x={4} y={106} fontSize={16} fill="var(--unit-century)">Màu vàng: {SO_VANG} lần</text>
        {Array.from({ length: SO_DO }, (_, i) => (
          <circle key={`d${i}`} cx={cx(i)} cy={44} r={12} fill="var(--unit-mm2)" stroke="var(--ink)" strokeWidth={2} />
        ))}
        {Array.from({ length: SO_VANG }, (_, i) => (
          <circle key={`v${i}`} cx={cx(i)} cy={130} r={12} fill="var(--sun)" stroke="var(--ink)" strokeWidth={2} />
        ))}
        {step >= 1
          ? Array.from({ length: SO_DO }, (_, i) => (
              <line key={`l${i}`} data-enter={1} x1={cx(i)} y1={58} x2={cx(i)} y2={116} stroke="var(--ink)" strokeWidth={2} strokeDasharray="4 4" />
            ))
          : null}
        {step >= 2
          ? Array.from({ length: SO_VANG - SO_DO }, (_, i) => (
              <circle key={`r${i}`} data-enter={2} cx={cx(SO_DO + i)} cy={130} r={17} fill="none" stroke="var(--ink)" strokeWidth={3.5} />
            ))
          : null}
      </svg>
      <StepControls step={step} captions={soSanhCaptions} onChange={setStep} />
    </figure>
  );
}
