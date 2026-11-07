"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const captions = [
  "Con có 600 000 đồng, gồm 6 tờ 100 000 đồng. Con cần trả 250 000 đồng: 2 tờ 100 000 đồng và 5 tờ 10 000 đồng.",
  "Nhưng con chưa có tờ 10 000 đồng nào. Không có tờ nào thì không trả được 5 tờ.",
  "Đổi 1 tờ 100 000 đồng thành 10 tờ 10 000 đồng. Còn 5 tờ 100 000 đồng và có 10 tờ 10 000 đồng. Đó là lý do ta nhớ 1: hàng bên trái bớt 1, hàng bên phải có thêm 10.",
  "Trả 5 tờ 10 000 đồng, còn 5 tờ. Trả 2 tờ 100 000 đồng, còn 3 tờ. Con còn 3 tờ 100 000 đồng và 5 tờ 10 000 đồng, tức là 350 000 đồng.",
];

const BIG = { width: 44, height: 28, gap: 6 };
const SMALL = { width: 26, height: 28, gap: 4 };

function startX(count: number, note: { width: number; gap: number }): number {
  return Math.round((340 - (count * note.width + (count - 1) * note.gap)) / 2);
}

/** Phép 600 000 − 250 000 bằng tiền: đổi 1 tờ 100 000 đồng thành 10 tờ 10 000 đồng. */
export function DoiTien() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const exchanged = step >= 2;
  const paid = step >= 3;
  const bigX = startX(6, BIG);
  const smallX = startX(10, SMALL);

  const label = [
    "Có 6 tờ 100 000 đồng, chưa có tờ 10 000 đồng nào.",
    "Chưa có tờ 10 000 đồng nào để trả.",
    "Đã đổi 1 tờ 100 000 đồng thành 10 tờ 10 000 đồng.",
    "Đã trả xong, còn 3 tờ 100 000 đồng và 5 tờ 10 000 đồng, tức là 350 000 đồng.",
  ][step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 214" role="img" aria-label={`600 000 trừ 250 000 bằng tiền. ${label}`} className="block w-full" fontWeight={800}>
        <text x={bigX} y={24} fontSize={15} fill="var(--ink)">
          Tờ 100 000 đồng
        </text>
        {Array.from({ length: 6 }, (_, index) => {
          const ghost = exchanged && index === 5;
          const done = paid && index < 2;
          return (
            <rect
              key={index}
              data-testid={`big-${index}`}
              x={bigX + index * (BIG.width + BIG.gap)}
              y={34}
              width={BIG.width}
              height={BIG.height}
              rx={6}
              fill={ghost ? "none" : "var(--sun)"}
              stroke="var(--ink)"
              strokeWidth={2.5}
              strokeDasharray={ghost ? "5 4" : undefined}
              opacity={done ? 0.25 : 1}
            />
          );
        })}

        <text x={smallX} y={106} fontSize={15} fill="var(--ink)">
          Tờ 10 000 đồng
        </text>
        {exchanged ? (
          Array.from({ length: 10 }, (_, index) => (
            <rect
              key={index}
              data-testid={`small-${index}`}
              data-enter={2}
              data-scale={0.3}
              x={smallX + index * (SMALL.width + SMALL.gap)}
              y={116}
              width={SMALL.width}
              height={SMALL.height}
              rx={5}
              fill="white"
              stroke="var(--ink)"
              strokeWidth={2.5}
              opacity={paid && index < 5 ? 0.25 : 1}
            />
          ))
        ) : (
          <g>
            <rect x={smallX} y={116} width={296} height={SMALL.height} rx={5} fill="none" stroke="var(--ink)" strokeWidth={2} strokeDasharray="5 4" opacity={0.6} />
            <text x={170} y={136} fontSize={15} fill="var(--ink)" textAnchor="middle">
              0 tờ
            </text>
          </g>
        )}

        <text x={170} y={176} fontSize={15} fill="var(--ink)" textAnchor="middle">
          Cần trả: 2 tờ 100 000 và 5 tờ 10 000
        </text>
        {paid ? (
          <text data-enter={3} x={170} y={202} fontSize={20} fill="var(--ink)" textAnchor="middle">
            Còn lại: 350 000 đồng
          </text>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
