"use client";

import { HinhPhanSo, PhanSo } from "@/components/math/phan-so";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const quyDongCaptions = [
  "Hai chiếc bánh như nhau: 1/4 và 3/8. Mẫu số khác nhau.",
  "Chia mỗi phần của bánh thứ nhất làm đôi: được 8 phần, tô 2 phần. 2/8 bằng 1/4 và cùng mẫu số 8 với 3/8.",
  "Viết bằng phép tính: 8 : 4 = 2, nhân cả tử số và mẫu số của 1/4 với 2. Quy đồng mẫu số 1/4 và 3/8, ta được 2/8 và 3/8.",
  "Cẩn thận: chỉ nhân tử số với 2 mà giữ mẫu số thì được 2/4. 2/4 không bằng 1/4. Phải nhân cả tử số và mẫu số.",
];

/** Quy đồng 1/4 và 3/8: chia nhỏ phần của bánh thứ nhất, rồi viết phép nhân. */
export function QuyDong() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="mx-auto grid max-w-md grid-cols-2 items-end gap-4 text-center text-2xl">
        <div>
          {step === 0 ? <HinhPhanSo kieu="tron" mau={4} to={1} /> : <HinhPhanSo kieu="tron" mau={8} to={2} />}
          <PhanSo tu={step === 0 ? 1 : 2} mau={step === 0 ? 4 : 8} />
        </div>
        <div>
          <HinhPhanSo kieu="tron" mau={8} to={3} />
          <PhanSo tu={3} mau={8} />
        </div>
      </div>
      {step >= 2 ? (
        <p data-enter={2} className="mt-3 text-center text-lg font-extrabold tabular-nums">
          <PhanSo tu={1} mau={4} /> = (1 × 2)/(4 × 2) = <PhanSo tu={2} mau={8} />
        </p>
      ) : null}
      {step >= 3 ? (
        <p data-enter={3} className="mt-2 text-center text-lg font-extrabold tabular-nums" style={{ color: "var(--oops)" }}>
          (1 × 2)/4 = 2/4 ✗ (không bằng 1/4)
        </p>
      ) : null}
      <StepControls step={step} captions={quyDongCaptions} onChange={setStep} />
    </figure>
  );
}
