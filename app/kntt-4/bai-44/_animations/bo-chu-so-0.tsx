"use client";

import { StepControls } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useState } from "react";

/** Số 0 ở tận cùng một số. */
function zerosOf(n: number): number {
  let count = 0;
  for (let v = n; v > 0 && v % 10 === 0; v = v / 10) count++;
  return count;
}

export function chiaNham(a: number, b: number, zeros: number) {
  const scale = 10 ** zeros;
  if (zeros > Math.min(zerosOf(a), zerosOf(b))) throw new Error("Không đủ chữ số 0 để cùng xoá");
  return { a: a / scale, b: b / scale, quotient: a / b };
}

function Struck({ value, zeros, strike }: { value: number; zeros: number; strike: boolean }) {
  const text = String(value);
  const head = text.slice(0, text.length - zeros);
  const tail = text.slice(text.length - zeros);
  return (
    <span>
      {head}
      {zeros > 0 ? (
        <span className={strike ? "text-(--oops) line-through decoration-4" : ""} style={{ textDecorationSkipInk: "none" }}>
          {tail}
        </span>
      ) : null}
    </span>
  );
}

/** Chia nhẩm: cùng xoá một số chữ số 0 ở tận cùng của số bị chia và số chia, rồi chia. */
export function BoChuSo0({ a, b, zeros }: { a: number; b: number; zeros: number }) {
  const [step, setStep] = useState(0);
  const small = chiaNham(a, b, zeros);
  const captions = [
    `${formatNumber(a)} : ${formatNumber(b)} = ? Số bị chia có ${zerosOf(a)} chữ số 0 ở cuối, số chia có ${zerosOf(b)} chữ số 0 ở cuối.`,
    `Cùng xoá ${zeros} chữ số 0 ở tận cùng của số bị chia và số chia. Phải xoá cả hai số, mỗi số bớt đúng ${zeros} chữ số 0.`,
    `Thực hiện phép chia ${formatNumber(small.a)} : ${formatNumber(small.b)} = ${formatNumber(small.quotient)}. Vậy ${formatNumber(a)} : ${formatNumber(b)} = ${formatNumber(small.quotient)}.`,
  ];
  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <p
        role="img"
        aria-label={step === 0 ? `${formatNumber(a)} : ${formatNumber(b)}, chưa xoá chữ số 0` : step === 1 ? `Cùng xoá ${zeros} chữ số 0 ở cuối hai số` : `${formatNumber(a)} : ${formatNumber(b)} = ${formatNumber(small.a)} : ${formatNumber(small.b)} = ${formatNumber(small.quotient)}`}
        className="text-center font-heading text-3xl font-extrabold text-ink tabular-nums"
      >
        {step < 2 ? (
          <>
            <Struck value={a} zeros={zeros} strike={step === 1} /> : <Struck value={b} zeros={zeros} strike={step === 1} />
          </>
        ) : (
          <>
            {formatNumber(small.a)} : {formatNumber(small.b)} = {formatNumber(small.quotient)}
          </>
        )}
      </p>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
