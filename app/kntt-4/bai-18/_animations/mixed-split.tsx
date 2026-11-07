"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const SQUARE = 90;
const GAP = 8;
const CELL = SQUARE / 10;
const TOP = 34;
const SMALL_LEFT = (SQUARE + GAP) * 3 + 12;

const captions = [
  "Đổi 3 m² 9 dm² sang đề-xi-mét vuông. Đây là 3 ô mét vuông và 9 ô đề-xi-mét vuông, vẽ đúng tỉ lệ.",
  "Mỗi ô mét vuông có 100 ô đề-xi-mét vuông bên trong.",
  "3 m² = 3 × 100 = 300 dm².",
  "Cộng thêm 9 dm² nữa: 300 + 9 = 309 dm². Vậy 3 m² 9 dm² = 309 dm².",
  "Đừng viết liền 3 và 9 thành 39. 39 dm² còn chưa đủ 1 m², trong khi hình có tận 3 m².",
];

/** Tách số đo ghép, vẽ đúng tỉ lệ để thấy 9 dm² nhỏ thế nào so với 3 m². */
export function MixedSplit() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 356 170" role="img" aria-label="3 ô mét vuông và 9 ô đề-xi-mét vuông vẽ đúng tỉ lệ" className="block w-full">
        <text x={(SQUARE * 3 + GAP * 2) / 2} y={22} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--unit-m2)">
          {step >= 2 ? "3 m² = 300 dm²" : "3 m²"}
        </text>
        <text x={SMALL_LEFT + CELL * 1.5} y={22} textAnchor="middle" fontSize={15} fontWeight={800} fill="var(--unit-dm2)">
          9 dm²
        </text>

        {[0, 1, 2].map((square) => (
          <g key={square}>
            <rect x={square * (SQUARE + GAP)} y={TOP} width={SQUARE} height={SQUARE} fill="var(--unit-m2)" rx={2} />
            {step >= 1
              ? Array.from({ length: 9 }, (_, line) => (
                  <g key={line} data-enter={1} data-scale={1}>
                    <line
                      x1={square * (SQUARE + GAP) + (line + 1) * CELL}
                      x2={square * (SQUARE + GAP) + (line + 1) * CELL}
                      y1={TOP}
                      y2={TOP + SQUARE}
                      stroke="white"
                      strokeOpacity={0.7}
                    />
                    <line
                      x1={square * (SQUARE + GAP)}
                      x2={square * (SQUARE + GAP) + SQUARE}
                      y1={TOP + (line + 1) * CELL}
                      y2={TOP + (line + 1) * CELL}
                      stroke="white"
                      strokeOpacity={0.7}
                    />
                  </g>
                ))
              : null}
          </g>
        ))}

        {Array.from({ length: 9 }, (_, index) => (
          <rect
            key={index}
            x={SMALL_LEFT + (index % 3) * CELL + 0.5}
            y={TOP + Math.floor(index / 3) * CELL + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            fill="var(--unit-dm2)"
          />
        ))}

        {step >= 3 ? (
          <text data-enter={3} x={178} y={158} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--foreground)">
            300 + 9 = 309 dm²
          </text>
        ) : null}
        {step >= 4 ? (
          <g data-enter={4}>
            <rect x={SMALL_LEFT - 2} y={TOP + 40} width={48} height={32} rx={8} fill="var(--oops)" />
            <text x={SMALL_LEFT + 22} y={TOP + 62} textAnchor="middle" fontSize={18} fontWeight={800} fill="white">
              39
            </text>
            <line
              x1={SMALL_LEFT + 6}
              y1={TOP + 66}
              x2={SMALL_LEFT + 38}
              y2={TOP + 46}
              stroke="white"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
