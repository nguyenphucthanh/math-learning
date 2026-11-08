"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { digitAt, hangName } from "@/lib/hang-lop";
import { compareNumbers } from "@/lib/so-sanh";
import { useRef, useState } from "react";

const n = formatNumber;
const W = 28;
const GAP = 8;
const VIEW = 340;
const ROW_A = 12;
const ROW_B = 92;
const H = 42;

/** Vị trí x của cột `position` (0 là hàng đơn vị) khi lưới có `length` cột, canh giữa hình. */
function columnX(length: number, position: number): number {
  const total = length * W + Math.floor((length - 1) / 3) * GAP;
  const start = (VIEW - total) / 2;
  const index = length - 1 - position;
  return start + index * W + (Math.floor((length - 1) / 3) - Math.floor(position / 3)) * GAP;
}

/**
 * So sánh hai số từng bước. Khác số chữ số: đếm chữ số rồi kết luận.
 * Cùng số chữ số: so từng cặp từ trái sang phải, dừng ở cặp đầu tiên khác nhau.
 */
export function SoSanhSo({ a, b }: { a: number; b: number }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const { sign, by, position } = compareNumbers(a, b);
  const digitsA = String(a).split("");
  const digitsB = String(b).split("");
  const length = Math.max(digitsA.length, digitsB.length);
  const sameLength = by !== "so-chu-so";
  const last = sameLength ? 3 : 2;
  const decide = last; // bước kết luận
  const compareStep = 2; // so từng cặp, chỉ có khi cùng số chữ số
  const bigger = n(sign === ">" ? a : b);

  const captions = sameLength
    ? [
        `Hai số cần so sánh: ${n(a)} và ${n(b)}. Con xếp thẳng hàng, mỗi chữ số đứng đúng hàng của nó.`,
        `${n(a)} có ${digitsA.length} chữ số, ${n(b)} có ${digitsB.length} chữ số. Hai số có cùng số chữ số, nên ta so từng cặp chữ số.`,
        by === "bang"
          ? "So từng cặp từ trái sang phải: mọi cặp đều bằng nhau."
          : `So từng cặp từ trái sang phải. ${position === digitsA.length - 1 ? "" : "Các cặp đầu bằng nhau, đi tiếp. "}Đến ${hangName(position!)}: ${digitAt(a, position!)} ${sign} ${digitAt(b, position!)}. Dừng ở cặp khác nhau đầu tiên.`,
        by === "bang" ? `Hai số bằng nhau: ${n(a)} = ${n(b)}.` : `Vậy ${n(a)} ${sign} ${n(b)}: số ${bigger} lớn hơn.`,
      ]
    : [
        `Hai số cần so sánh: ${n(a)} và ${n(b)}. Con xếp thẳng hàng, mỗi chữ số đứng đúng hàng của nó.`,
        `${n(a)} có ${digitsA.length} chữ số, ${n(b)} có ${digitsB.length} chữ số. Ô gạch nét đứt là hàng mà số bé hơn không có.`,
        `Số nào có nhiều chữ số hơn thì lớn hơn. Vậy ${n(a)} ${sign} ${n(b)} (số ${bigger} lớn hơn).`,
      ];
  const labels = sameLength
    ? [
        `Hai số ${n(a)} và ${n(b)} xếp thẳng hàng`,
        `Cả hai đều có ${digitsA.length} chữ số`,
        by === "bang" ? "Mọi cặp chữ số bằng nhau" : `Cặp khác nhau đầu tiên ở ${hangName(position!)}: ${digitAt(a, position!)} ${sign} ${digitAt(b, position!)}`,
        `${n(a)} ${sign} ${n(b)}`,
      ]
    : [
        `Hai số ${n(a)} và ${n(b)} xếp thẳng hàng`,
        `${n(a)} có ${digitsA.length} chữ số, ${n(b)} có ${digitsB.length} chữ số`,
        `${n(a)} ${sign} ${n(b)} vì số có nhiều chữ số hơn thì lớn hơn`,
      ];

  const row = (digits: string[], y: number, id: "a" | "b") => {
    const missing = length - digits.length;
    return (
      <g>
        {Array.from({ length: missing }, (_, k) => {
          const pos = length - 1 - k;
          return (
            <rect
              key={`m${k}`}
              x={columnX(length, pos)}
              y={y}
              width={W - 2}
              height={H}
              rx={6}
              fill="none"
              stroke="var(--input)"
              strokeWidth={2}
              strokeDasharray="4 3"
            />
          );
        })}
        {digits.map((digit, index) => {
          const pos = digits.length - 1 - index;
          const x = columnX(length, pos);
          const leading = index === 0;
          const highlightCount = step >= 1 && !sameLength && leading;
          const comparing = sameLength && step >= compareStep && by !== "bang" && pos >= position!;
          const decidingCell = sameLength && step >= compareStep && pos === position;
          const equalCell = comparing && !decidingCell;
          return (
            <g key={`${id}${index}`}>
              <rect
                x={x}
                y={y}
                width={W - 2}
                height={H}
                rx={6}
                fill={decidingCell || highlightCount ? "var(--sun)" : equalCell ? "var(--good)" : "white"}
                fillOpacity={equalCell ? 0.22 : 1}
                stroke="var(--ink)"
                strokeWidth={decidingCell || highlightCount ? 5 : 3}
              />
              <text x={x + (W - 2) / 2} y={y + 30} textAnchor="middle" fontSize={22} fill="var(--ink)" className="tabular-nums">
                {digit}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  const resultSign = (
    <text x={VIEW / 2} y={190} textAnchor="middle" fontSize={22} fill="var(--ink)" className="tabular-nums">
      {n(a)} {sign} {n(b)}
    </text>
  );

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 204" role="img" aria-label={labels[step]} className="block w-full" fontWeight={800}>
        {row(digitsA, ROW_A, "a")}
        {row(digitsB, ROW_B, "b")}

        {sameLength && step >= compareStep && by !== "bang"
          ? Array.from({ length: digitsA.length - position! }, (_, k) => {
              const pos = digitsA.length - 1 - k;
              const x = columnX(length, pos) + (W - 2) / 2;
              const mark = pos === position ? (digitAt(a, pos) > digitAt(b, pos) ? ">" : "<") : "=";
              return (
                <text key={pos} x={x} y={80} textAnchor="middle" fontSize={20} fill="var(--ink)" data-enter={compareStep}>
                  {mark}
                </text>
              );
            })
          : null}

        {step >= 1 ? (
          <g data-enter={1}>
            <text x={VIEW / 2} y={156} textAnchor="middle" fontSize={16} fill="var(--ink)">
              {sameLength ? `Cùng ${digitsA.length} chữ số` : `${digitsA.length} chữ số ${sign} ${digitsB.length} chữ số`}
            </text>
          </g>
        ) : null}

        {step >= decide ? <g data-enter={decide}>{resultSign}</g> : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
