"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useRef, useState } from "react";

const n = formatNumber;
const W = 44;
const GAP = 4;
const VIEW = 340;
const BOX_Y = 74;

/**
 * Dãy số có quy luật: `terms` là cả dãy, `given` số đầu đã cho, các số sau hiện ra ở bước cuối.
 * Hai số liền nhau hơn kém `diff`.
 */
export function QuyLuatDay({ terms, given }: { terms: number[]; given: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const diff = terms[1] - terms[0];
  const total = terms.length * W + (terms.length - 1) * GAP;
  const start = (VIEW - total) / 2;
  const cx = (index: number) => start + index * (W + GAP) + W / 2;
  const shown = terms.slice(0, given).map(n).join(", ");
  const rest = terms.slice(given).map(n).join(", ");

  const captions = [
    `Dãy số: ${shown}, … Con tìm các số còn thiếu.`,
    `Hai số liền nhau hơn kém nhau ${diff} đơn vị: mỗi bước nhảy là +${diff}.`,
    `Cứ thêm ${diff} lại được số tiếp theo. Các số còn thiếu là ${rest}.`,
  ];
  const labels = [
    `Dãy số ${shown} và các ô trống`,
    `Hai số liền nhau hơn kém nhau ${diff} đơn vị`,
    `Dãy số đầy đủ: ${terms.map(n).join(", ")}`,
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 130" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {terms.map((value, index) => {
          const hidden = index >= given && step < 2;
          const isGiven = index < given;
          return (
            <g key={index}>
              <rect
                x={cx(index) - W / 2}
                y={BOX_Y}
                width={W}
                height={44}
                rx={8}
                fill={hidden ? "var(--paper)" : isGiven ? "white" : "var(--sun)"}
                stroke="var(--ink)"
                strokeWidth={3}
                strokeDasharray={hidden ? "5 3" : undefined}
              />
              <text
                x={cx(index)}
                y={BOX_Y + 29}
                textAnchor="middle"
                fontSize={n(value).length > 3 ? 14 : 18}
                fill="var(--ink)"
                className="tabular-nums"
              >
                {hidden ? "?" : n(value)}
              </text>
            </g>
          );
        })}

        {step >= 1
          ? terms.slice(0, -1).map((_, index) => {
              const inFirst = index + 1 < given;
              const visible = step === 1 ? inFirst : true;
              if (!visible) return null;
              const mid = (cx(index) + cx(index + 1)) / 2;
              return (
                <g key={index} data-enter={step === 1 || !inFirst ? step : undefined}>
                  <path d={`M ${cx(index)} ${BOX_Y - 4} Q ${mid} ${BOX_Y - 40} ${cx(index + 1)} ${BOX_Y - 4}`} fill="none" stroke="var(--good)" strokeWidth={3} />
                  <text x={mid} y={BOX_Y - 30} textAnchor="middle" fontSize={14} fill="var(--ink)">
                    +{n(diff)}
                  </text>
                </g>
              );
            })
          : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
