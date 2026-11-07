"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";
import { SoDo } from "./so-do";

const captions = [
  "Vẫn là 25 cái kẹo, Mi hơn Mai 5 cái. Lần này ta không bớt của Mi mà thêm cho Mai.",
  "Thêm 5 cái kẹo vào phần của Mai. Hai phần bây giờ bằng nhau, cả hai có 25 + 5 = 30 cái kẹo.",
  "Chia 30 cái kẹo thành hai phần bằng nhau: 30 : 2 = 15. Mi có 15 cái kẹo.",
  "Mai có 25 − 15 = 10 cái kẹo. Thử lại: 15 − 10 = 5, đúng là Mi hơn Mai 5 cái kẹo.",
];

const miLabels = ["? cái kẹo", "? cái kẹo", "15 cái kẹo", "15 cái kẹo"];
const maiLabels = ["? cái kẹo", "? cái kẹo", "15 cái kẹo", "10 cái kẹo"];
const braceLabels = ["25 cái kẹo", "30 cái kẹo", "30 cái kẹo", "25 cái kẹo"];
const equations = ["Tổng 25, hiệu 5", "25 + 5 = 30", "30 : 2 = 15", "25 − 15 = 10"];
const ariaLabels = [
  "Hai đoạn: Mi dài hơn Mai một đoạn 5 cái kẹo, tổng 25 cái kẹo",
  "Thêm đoạn 5 cái kẹo vào Mai, hai đoạn bằng nhau, tổng 30 cái kẹo",
  "Hai đoạn bằng nhau, mỗi đoạn 15 cái kẹo",
  "Mi 15 cái kẹo, Mai 10 cái kẹo, tổng 25 cái kẹo",
];

/** Cách 2: thêm phần kém vào số bé, chia đôi để ra số lớn. */
export function ThemPhanKem() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const added = step === 1 || step === 2;

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <SoDo
        step={step}
        miExtra="solid"
        maiExtra={added ? "solid" : "none"}
        extraEnter={1}
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
