"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";
import { HinhVuongSvg } from "../_illustrations/hinh-vuong";

/** Hình vuông của phần Lý thuyết: cạnh 8 ô, như trên giấy kẻ ô vuông của SGK. */
export const GHEP_N = 8;

const captions = [
  "Bước 1: Vẽ hình vuông ABCD trên giấy kẻ ô vuông. Vẽ đường chéo AC.",
  "Bước 2: Xác định điểm M, N, O, P lần lượt là trung điểm của AB, BC, AC, AO. Vẽ các đoạn thẳng DO, ON, MN.",
  "Bước 3: Vẽ đoạn thẳng PQ song song với đoạn thẳng AM, điểm Q ở trên đoạn thẳng MN.",
  "Bước 4: Cắt hình vuông thành 6 phần theo các đoạn thẳng AC, DO, MN, ON, PQ và tô mỗi phần một màu.",
];

const labels = [
  "Hình vuông ABCD trên giấy kẻ ô vuông và đường chéo AC",
  "Hình vuông ABCD có thêm các điểm M, N, O, P và các đoạn thẳng DO, ON, MN",
  "Hình vuông ABCD có thêm đoạn thẳng PQ song song với AM, điểm Q trên MN",
  "Hình vuông ABCD được chia thành sáu phần, mỗi phần một màu",
];

/** Làm bộ đồ chơi ghép hình: bốn bước của SGK. */
export function GhepHinh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="mx-auto max-w-[380px]">
        <HinhVuongSvg n={GHEP_N} step={step} label={labels[step]} />
      </div>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
