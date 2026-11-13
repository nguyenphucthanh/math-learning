"use client";

import { BieuDoCot } from "@/components/math/bieu-do-cot";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const bieuDoData = [
  { label: "Bóng đá", value: 4 },
  { label: "Bóng rổ", value: 6 },
  { label: "Bơi", value: 2 },
];

export const veBieuDoCaptions = [
  "Rô-bốt vẽ biểu đồ cột từ bảng số liệu. Tên biểu đồ ghi ở trên cùng.",
  "Trục đứng ghi số bạn: 0, 1, 2, ... 6. Mỗi vạch ứng với một bạn.",
  "Hàng dưới ghi tên các môn thể thao: Bóng đá, Bóng rổ, Bơi.",
  "Mỗi môn có một cột. Số bạn càng nhiều thì cột càng cao.",
  "Số ghi ở đỉnh cột cho biết số bạn: Bóng đá 4, Bóng rổ 6, Bơi 2.",
];

/** Vẽ biểu đồ cột từng bước: tên, trục, hàng dưới, cột, số ở đỉnh cột. */
export function VeBieuDo() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <BieuDoCot title="SỐ BẠN YÊU THÍCH MỖI MÔN THỂ THAO" axisLabel="Bạn" step={1} max={6} data={bieuDoData} stage={step} />
      <StepControls step={step} captions={veBieuDoCaptions} onChange={setStep} />
    </figure>
  );
}
