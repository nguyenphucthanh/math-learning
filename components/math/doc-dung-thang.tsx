"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";
import { ThuocDoSvg, type Base, type Scale } from "@/components/math/thuoc-do";

type Frame = { base: Base; scale: Scale | "ca-hai"; marks: Scale[]; rightLine: boolean; label: string; caption: string };

const frames: Frame[] = [
  {
    base: "right",
    scale: "ca-hai",
    marks: ["xanh", "vang"],
    rightLine: false,
    label: "Cạnh OB bên phải. Cạnh OA đi qua hai số: 40 ở vòng xanh và 140 ở vòng vàng",
    caption: "Cạnh OA đi qua hai vạch: 40 và 140. Con đọc số nào? Ta nhìn cạnh còn lại, cạnh OB.",
  },
  {
    base: "right",
    scale: "xanh",
    marks: ["xanh"],
    rightLine: false,
    label: "Cạnh OB sát vạch 0 của vòng xanh, đọc vòng xanh: 40",
    caption: "Cạnh OB nằm bên phải, sát vạch 0 của vòng số xanh. Ta đọc vòng xanh: 40°.",
  },
  {
    base: "left",
    scale: "vang",
    marks: ["vang"],
    rightLine: false,
    label: "Cạnh OB bên trái, sát vạch 0 của vòng vàng, đọc vòng vàng: 40",
    caption: "Quay thước lại: cạnh OB nằm bên trái, sát vạch 0 của vòng số vàng. Ta đọc vòng vàng: vẫn là 40°.",
  },
  {
    base: "right",
    scale: "xanh",
    marks: ["xanh"],
    rightLine: true,
    label: "Góc bé hơn góc vuông, nên số đo bé hơn 90: đọc 40, không đọc 140",
    caption: "Kiểm tra lại: góc này bé hơn góc vuông, nên số đo phải bé hơn 90. Vậy là 40°, không phải 140°.",
  },
];

/** Thước có hai vòng số: cạnh còn lại sát vạch 0 ở vòng nào thì đọc vòng đó. */
export function DocDungThang() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const frame = frames[step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <ThuocDoSvg label={frame.label} angle={40} base={frame.base} scale={frame.scale} marks={frame.marks} rightLine={frame.rightLine} enter={{ rightLine: 3 }} sector={step >= 1} />
      <StepControls step={step} captions={frames.map((item) => item.caption)} onChange={setStep} />
    </figure>
  );
}
