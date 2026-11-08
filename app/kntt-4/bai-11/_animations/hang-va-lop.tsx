"use client";

import { StepControls } from "@/components/lesson/step-player";
import { BangHangLop } from "@/components/math/bang-hang-lop";
import { useState } from "react";

const captions = [
  "Rô-bốt lập số 514 293. Mỗi chữ số đứng trong một hàng.",
  "Hàng đơn vị, hàng chục, hàng trăm hợp thành lớp đơn vị. Các chữ số 3, 9 và 2 thuộc lớp đơn vị.",
  "Hàng nghìn, hàng chục nghìn, hàng trăm nghìn hợp thành lớp nghìn. Các chữ số 4, 1 và 5 thuộc lớp nghìn.",
  "Đọc từng lớp, từ trái sang phải: năm trăm mười bốn nghìn, hai trăm chín mươi ba.",
];
const marks: number[][] = [[], [0, 1, 2], [3, 4, 5], []];

/** Ba hàng liền nhau hợp thành một lớp: tô vàng từng lớp của số 514 293. */
export function HangVaLop() {
  const [step, setStep] = useState(0);

  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="mx-auto max-w-md">
        <BangHangLop value={514293} classes={2} mark={marks[step]} />
      </div>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
