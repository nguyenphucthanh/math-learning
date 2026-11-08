"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "@/components/math/khung";
import { useRef, useState } from "react";

const captions = [
  "Bước 1: Đặt một que gỗ dọc theo đường thẳng HK. Đường thẳng CD đã vuông góc với HK.",
  "Bước 2: Đặt một que gỗ khác dọc theo đường thẳng CD rồi dán hai que lại. Hai que gỗ vuông góc với nhau.",
  "Bước 3: Tạo thêm hai que gỗ vuông góc với nhau theo cách tương tự.",
  "Bước 4: Đặt rồi dán các que gỗ thành khung tranh, buộc thêm dây cho chắc. Mỗi góc của khung là hai que vuông góc.",
];

const WOOD = { fill: "var(--sun)", stroke: "var(--ink)", strokeWidth: 2, rx: 9 } as const;

/** Các góc trong của khung: điểm đặt dấu góc vuông và hai hướng dọc theo que. */
const corners = [
  { at: { x: 78, y: 78 }, h: { x: 79, y: 78 }, v: { x: 78, y: 79 } },
  { at: { x: 182, y: 78 }, h: { x: 181, y: 78 }, v: { x: 182, y: 79 } },
  { at: { x: 78, y: 182 }, h: { x: 79, y: 182 }, v: { x: 78, y: 181 } },
  { at: { x: 182, y: 182 }, h: { x: 181, y: 182 }, v: { x: 182, y: 181 } },
];

/** Làm khung tranh bằng que gỗ: mỗi chỗ ghép là hai que vuông góc. */
export function KhungTranh() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 260 260"
        role="img"
        aria-label={
          step === 0
            ? "Một que gỗ đặt dọc theo đường thẳng HK, đường thẳng CD vuông góc với HK"
            : step === 1
              ? "Hai que gỗ vuông góc với nhau, dán lại ở một góc"
              : step === 2
                ? "Bốn que gỗ: hai cặp que vuông góc"
                : "Khung tranh làm từ bốn que gỗ, bốn góc vuông, buộc dây ở mỗi góc"
        }
        className="mx-auto block w-full max-w-sm"
        fontWeight={800}
      >
        {step <= 1 ? (
          <g stroke="var(--input)" strokeWidth={2} strokeDasharray="5 5">
            <line x1={69} y1={14} x2={69} y2={248} />
            <line x1={14} y1={69} x2={248} y2={69} />
          </g>
        ) : null}
        <rect x={60} y={40} width={18} height={180} {...WOOD} />
        {step >= 1 ? <rect data-enter={1} x={40} y={60} width={180} height={18} {...WOOD} /> : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <rect x={182} y={40} width={18} height={180} {...WOOD} />
            <rect x={40} y={182} width={180} height={18} {...WOOD} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-enter={3}>
            <g fill="none" stroke="var(--unit-ta)" strokeWidth={2.5}>
              {corners.map((corner) => (
                <RightMark key={`${corner.at.x}-${corner.at.y}`} at={corner.at} toward1={corner.h} toward2={corner.v} size={12} />
              ))}
            </g>
            <g stroke="var(--ink)" strokeWidth={2} strokeLinecap="round">
              {[69, 191].flatMap((x) => [69, 191].map((y) => <path key={`${x}-${y}`} d={`M ${x - 7} ${y - 7} L ${x + 7} ${y + 7} M ${x + 7} ${y - 7} L ${x - 7} ${y + 7}`} />))}
            </g>
          </g>
        ) : null}
        {step <= 1 ? (
          <g fontSize={16} fill="var(--ink)" textAnchor="middle">
            <text x={69} y={11}>H</text>
            <text x={69} y={258}>K</text>
            <text x={8} y={75}>C</text>
            <text x={252} y={75}>D</text>
            <text x={89} y={91}>M</text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
