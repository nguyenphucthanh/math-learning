"use client";

import { StepControls } from "@/components/lesson/step-player";
import { BangHangLop } from "@/components/math/bang-hang-lop";
import { useState } from "react";

const steps = [
  { value: 1000000, mark: [6], caption: "Một triệu là 1 000 000. Chữ số 1 ở hàng triệu, đứng sau lớp nghìn." },
  { value: 10000000, mark: [7], caption: "Mười triệu hay một chục triệu viết là 10 000 000. Chữ số 1 ở hàng chục triệu." },
  { value: 100000000, mark: [8], caption: "Một trăm triệu viết là 100 000 000. Chữ số 1 ở hàng trăm triệu." },
  {
    value: 531000000,
    mark: [6, 7, 8],
    caption: "Hàng triệu, hàng chục triệu, hàng trăm triệu hợp thành lớp triệu. Số 531 000 000 đọc là năm trăm ba mươi mốt triệu. Các chữ số 5, 3 và 1 thuộc lớp triệu.",
  },
];

/** Từ 1 triệu đến 100 triệu rồi đến lớp triệu, trên bảng hàng và lớp đủ ba lớp. */
export function LopTrieu() {
  const [step, setStep] = useState(0);
  const current = steps[step];

  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <BangHangLop value={current.value} mark={current.mark} />
      <StepControls step={step} captions={steps.map((item) => item.caption)} onChange={setStep} />
    </figure>
  );
}
