"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { docSo } from "@/lib/doc-so";
import { useRef, useState } from "react";

export const DOC_SO = 149597876;

const W = 34;
const xOf = (index: number) => 3 + index * W + Math.floor(index / 3) * 14;
const CLASS_NAMES = ["Lớp triệu", "Lớp nghìn", "Lớp đơn vị"];
const GROUPS = [149, 597, 876];
/** Câu đọc của từng lớp, tạo bằng `docSo` để khỏi gõ tay. */
export const readings = [`${docSo(149)} triệu`, `${docSo(597)} nghìn`, docSo(876)];

const captions = [
  "Số 149 597 876 có chín chữ số. Chia từ phải sang trái, mỗi nhóm ba chữ số là một lớp.",
  `Đọc lớp triệu trước: 149 là "${docSo(149)}", rồi đọc tên lớp: triệu.`,
  `Đọc lớp nghìn: 597 là "${docSo(597)}", rồi đọc tên lớp: nghìn.`,
  `Đọc lớp đơn vị: 876 là "${docSo(876)}". Lớp đơn vị không đọc tên lớp.`,
];

const labels = [
  "Số 149 597 876 chia thành ba lớp: triệu, nghìn, đơn vị",
  "Lớp triệu 149 được tô vàng, đọc là một trăm bốn mươi chín triệu",
  "Lớp nghìn 597 được tô vàng, đọc là năm trăm chín mươi bảy nghìn",
  "Lớp đơn vị 876 được tô vàng, đọc là tám trăm bảy mươi sáu",
];

/** Đọc số 149 597 876 theo từng lớp. */
export function DocSoLopTrieu() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const digits = String(DOC_SO).split("");

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 230" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {digits.map((digit, index) => (
          <g key={index}>
            <rect
              x={xOf(index)}
              y={10}
              width={W - 2}
              height={46}
              rx={6}
              fill={step >= 1 && Math.floor(index / 3) === step - 1 ? "var(--sun)" : "white"}
              stroke="var(--ink)"
              strokeWidth={3}
            />
            <text x={xOf(index) + (W - 2) / 2} y={43} textAnchor="middle" fontSize={26} fill="var(--ink)" className="tabular-nums">
              {digit}
            </text>
          </g>
        ))}
        {CLASS_NAMES.map((name, c) => (
          <text key={name} x={xOf(c * 3) + (3 * W - 2) / 2} y={78} textAnchor="middle" fontSize={14} fill="var(--ink)">
            {name}
          </text>
        ))}
        {readings.map((text, c) =>
          step >= c + 1 ? (
            <g key={text} data-enter={c + 1}>
              <text x={8} y={116 + c * 36} fontSize={14} fill="var(--ink)">
                {GROUPS[c]}
              </text>
              <text x={44} y={116 + c * 36} fontSize={14} fill="var(--ink)">
                {text}
              </text>
            </g>
          ) : null,
        )}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
