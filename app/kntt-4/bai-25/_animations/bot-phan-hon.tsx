"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";
import { SoDo } from "./so-do";

const captions = [
  "Mi có nhiều hơn Mai 5 cái kẹo, cả hai có 25 cái kẹo. Đoạn màu vàng là 5 cái kẹo Mi có hơn.",
  "Bớt 5 cái kẹo của Mi. Hai bạn còn 25 − 5 = 20 cái kẹo, và hai phần bây giờ bằng nhau.",
  "Chia 20 cái kẹo thành hai phần bằng nhau: 20 : 2 = 10. Mai có 10 cái kẹo.",
  "Trả lại 5 cái kẹo cho Mi: 10 + 5 = 15. Mi có 15 cái kẹo, Mai có 10 cái kẹo. Thử lại: 10 + 15 = 25.",
];

const miLabels = ["? cái kẹo", "? cái kẹo", "10 cái kẹo", "15 cái kẹo"];
const maiLabels = ["? cái kẹo", "? cái kẹo", "10 cái kẹo", "10 cái kẹo"];
const braceLabels = ["25 cái kẹo", "20 cái kẹo", "20 cái kẹo", "25 cái kẹo"];
const equations = ["Tổng 25, hiệu 5", "25 − 5 = 20", "20 : 2 = 10", "10 + 5 = 15"];
const ariaLabels = [
  "Hai đoạn: Mi dài hơn Mai một đoạn 5 cái kẹo, tổng 25 cái kẹo",
  "Đoạn 5 cái kẹo của Mi bị bớt đi, còn hai đoạn bằng nhau, tổng 20 cái kẹo",
  "Hai đoạn bằng nhau, mỗi đoạn 10 cái kẹo",
  "Mi 15 cái kẹo, Mai 10 cái kẹo, tổng 25 cái kẹo",
];

/** Cách 1: bớt phần hơn đi, chia đôi phần còn lại để ra số bé. */
export function BotPhanHon() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const cut = step === 1 || step === 2;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <SoDo
        step={step}
        miExtra={cut ? "ghost" : "solid"}
        maiExtra="none"
        extraEnter={3}
        miLabel={miLabels[step]}
        maiLabel={maiLabels[step]}
        braceLabel={braceLabels[step]}
        equation={equations[step]}
        ariaLabel={ariaLabels[step]}
      />
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
