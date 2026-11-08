"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";
import { CENTER, ThuocDoSvg } from "@/components/math/thuoc-do";

const captions = [
  "Góc đỉnh O; cạnh OA, OB. Góc này bằng bao nhiêu? Ta đo bằng thước đo góc. Đơn vị đo góc là độ, kí hiệu °.",
  "Đặt thước đo góc sao cho tâm của thước trùng với đỉnh O của góc.",
  "Cạnh OB nằm trên đường kính của nửa hình tròn của thước.",
  "Cạnh OA đi qua một vạch của thước, chẳng hạn vạch ghi số 30.",
  "Số đo góc đỉnh O; cạnh OA, OB bằng 30°. Đọc là ba mươi độ.",
];

const labels = [
  "Góc đỉnh O; cạnh OA, OB, chưa đặt thước",
  "Tâm của thước trùng với đỉnh O",
  "Cạnh OB nằm trên đường kính của thước",
  "Cạnh OA đi qua vạch số 30",
  "Số đo góc là 30 độ",
];

/** Cách đo góc bằng thước đo góc, năm bước theo SGK. */
export function DoGoc() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
        <ThuocDoSvg
          angle={30}
          base="right"
          scale="xanh"
          label={labels[step]}
          showScale={step >= 1}
          marks={step >= 3 ? ["xanh"] : []}
          sector={step >= 4}
          enter={{ scale: 1, mark: 3, sector: 4 }}
        >
          {step >= 1 ? <circle data-enter={1} cx={CENTER.x} cy={CENTER.y} r={9} fill="none" stroke="var(--unit-ta)" strokeWidth={3} /> : null}
          {step >= 2 ? (
            <line data-enter={2} x1={CENTER.x - 140} y1={CENTER.y} x2={CENTER.x + 160} y2={CENTER.y} stroke="var(--unit-ta)" strokeWidth={6} strokeLinecap="round" strokeOpacity={0.6} />
          ) : null}
          {step >= 4 ? (
            <text data-enter={4} x={CENTER.x + 34} y={CENTER.y - 20} fontSize={20} fontWeight={800} fill="var(--unit-ta)">
              30°
            </text>
          ) : null}
        </ThuocDoSvg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
