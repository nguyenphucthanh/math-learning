"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

const COL_W = 62;
const X0 = 15;
const TOP = 56;
const HEADERS = [["chục", "nghìn"], ["nghìn"], ["trăm"], ["chục"], ["đơn vị"]];
/** Số chữ số 0 thêm vào bên phải ở mỗi bước. */
const SHIFTS = [0, 1, 2, 3, 0];
const EXPRESSIONS = ["Số 36", "36 × 10", "36 × 100", "36 × 1 000", "36 000 : 1 000"];
const RESULTS = ["36", "360", "3 600", "36 000", "36"];

export const themSoKhongCaptions = [
  "Số 36 gồm 3 chục và 6 đơn vị. Chữ số 3 ở hàng chục, chữ số 6 ở hàng đơn vị.",
  "Nhân với 10: mỗi chữ số dời sang trái một hàng. Hàng đơn vị trống, ta viết chữ số 0. Vậy 36 × 10 = 360.",
  "Nhân với 100: dời sang trái hai hàng, viết thêm hai chữ số 0. Vậy 36 × 100 = 3 600.",
  "Nhân với 1 000: dời sang trái ba hàng, viết thêm ba chữ số 0. Vậy 36 × 1 000 = 36 000.",
  "Ngược lại, chia 36 000 cho 1 000: bỏ bớt ba chữ số 0 ở bên phải. Vậy 36 000 : 1 000 = 36.",
];

/** Bảng hàng: nhân dời chữ số sang trái và viết thêm 0, chia thì bỏ bớt 0. */
export function ThemSoKhong() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const shift = SHIFTS[step];
  const xOf = (col: number) => X0 + col * COL_W;
  const digits: [string, number][] = [["3", 3], ["6", 4]];
  const result = RESULTS[step];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 190" role="img" aria-label={`Bảng hàng. ${EXPRESSIONS[step]} = ${result}.`} className="block w-full">
        <text x={170} y={24} textAnchor="middle" fontSize={22} fontWeight={800} fill="var(--ink)">
          {step === 0 ? EXPRESSIONS[0] : `${EXPRESSIONS[step]} = ${result}`}
        </text>
        {HEADERS.map((lines, col) => (
          <g key={col}>
            <rect x={xOf(col) + 3} y={TOP - 4} width={COL_W - 6} height={84} rx={10} fill="var(--grid)" opacity={0.5} />
            <text x={xOf(col) + COL_W / 2} y={TOP + 104} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--ink)">
              {lines.map((line, i) => (
                <tspan key={line} x={xOf(col) + COL_W / 2} dy={i === 0 ? 0 : 16}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
        {digits.map(([digit, col]) => (
          <g key={digit} className="transition-transform duration-500 motion-reduce:transition-none" style={{ transform: `translateX(${-shift * COL_W}px)` }}>
            <text x={xOf(col) + COL_W / 2} y={TOP + 52} textAnchor="middle" fontSize={44} fontWeight={800} fill="var(--unit-second)">
              {digit}
            </text>
          </g>
        ))}
        {shift > 0 ? (
          <g key={step} data-enter={step}>
            {Array.from({ length: shift }).map((_, i) => (
              <text key={i} x={xOf(4 - i) + COL_W / 2} y={TOP + 52} textAnchor="middle" fontSize={44} fontWeight={800} fill="var(--unit-ta)">
                0
              </text>
            ))}
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={themSoKhongCaptions} onChange={setStep} />
    </figure>
  );
}
