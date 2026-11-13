"use client";

import { BangKiemDem } from "@/components/math/kiem-dem";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

/** 20 lần quay: D là mũi tên dừng ở phần màu đỏ, V là ở phần màu vàng (SGK trang 43: 9 đỏ, 11 vàng). */
export const ketQuaQuay = "VDVVDVDDVVDVDVVDDVDV".split("");
export const demQuay = (lan: number) => ({
  do: ketQuaQuay.slice(0, lan).filter((x) => x === "D").length,
  vang: ketQuaQuay.slice(0, lan).filter((x) => x === "V").length,
});

export const ghiKiemDemCaptions = [
  "Hai bạn sẽ quay 20 lần. Mỗi lần quay, mũi tên dừng ở màu đỏ hoặc màu vàng. Mỗi lần ghi một nét vào bảng kiểm đếm.",
  "Sau 5 lần quay: ghi 5 nét. Con đếm được số lần dừng ở mỗi màu.",
  "Sau 10 lần quay. Hễ đủ 4 nét đứng, nét thứ 5 gạch chéo qua thành một nhóm 5.",
  "Sau 15 lần quay.",
  "Sau 20 lần quay. Con đếm theo nhóm 5 cho nhanh.",
  "Phần màu đỏ: 9 = 5 + 4, tức 1 nhóm đủ và 4 nét. Phần màu vàng: 11 = 5 + 5 + 1, tức 2 nhóm đủ và 1 nét. 9 + 11 = 20 lần quay.",
];

const chipColor = (x: string) => (x === "D" ? "var(--unit-mm2)" : "var(--sun)");

/** Quay 20 lần, ghi nét kiểm đếm theo nhóm 5, rồi đọc số lần. */
export function GhiKiemDem() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const lan = Math.min(step, 4) * 5;
  const { do: soDo, vang: soVang } = demQuay(lan);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 76" role="img" aria-label={`Đã quay ${lan} lần: ${soDo} lần đỏ, ${soVang} lần vàng`} className="block w-full" fontWeight={800}>
        {ketQuaQuay.slice(0, lan).map((x, i) => (
          <circle
            key={i}
            data-enter={Math.floor(i / 5) + 1}
            cx={20 + (i % 10) * 33}
            cy={20 + Math.floor(i / 10) * 36}
            r={13}
            fill={chipColor(x)}
            stroke="var(--ink)"
            strokeWidth={2}
          />
        ))}
      </svg>
      <div className="mt-3">
        <BangKiemDem
          maxCount={11}
          rows={[
            { label: "Phần màu đỏ", count: soDo, color: "var(--unit-mm2)" },
            { label: "Phần màu vàng", count: soVang, color: "var(--unit-century)" },
          ]}
        />
      </div>
      <StepControls step={step} captions={ghiKiemDemCaptions} onChange={setStep} />
    </figure>
  );
}
