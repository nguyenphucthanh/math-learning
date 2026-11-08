"use client";

import { BangHangLop } from "@/components/math/bang-hang-lop";
import { formatNumber } from "@/lib/area-units";
import { hangName, lopName, positionOfIndex, positionValue } from "@/lib/hang-lop";
import { cn } from "@/lib/utils";
import { useState } from "react";

/** Con chạm vào một chữ số để xem nó ở hàng nào, lớp nào và có giá trị bao nhiêu. */
export function ChonChuSo({ value = 362820 }: { value?: number }) {
  const [index, setIndex] = useState<number | null>(null);
  const digits = String(value).split("");
  const position = index === null ? null : positionOfIndex(value, index);
  const digit = index === null ? 0 : Number(digits[index]);

  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <figcaption className="text-lg font-semibold">Chạm vào một chữ số của số {formatNumber(value)}.</figcaption>
      <div className="mt-3 flex justify-center gap-1.5" role="group" aria-label={`Các chữ số của ${formatNumber(value)}`}>
        {digits.map((char, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={index === i}
            aria-label={`Chữ số ${char}, thứ ${i + 1} từ trái sang`}
            onClick={() => setIndex(i)}
            className={cn(
              "size-12 rounded-xl border-[3px] border-ink font-heading text-2xl font-bold tabular-nums",
              index === i ? "bg-sun" : "bg-white",
              i === digits.length - 3 || i === digits.length - 6 ? "ml-2" : "",
            )}
          >
            {char}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-3 max-w-md">
        <BangHangLop value={value} classes={2} mark={position === null ? [] : [position]} />
      </div>
      <p role="status" className="mt-3 min-h-[5.25rem] text-lg leading-relaxed font-semibold sm:min-h-[3.5rem]">
        {position === null
          ? "Chữ số nào cũng có một chỗ đứng. Con chạm thử nhé."
          : `Chữ số ${digit} ở ${hangName(position)}, thuộc ${lopName(position)}. Giá trị của nó là ${formatNumber(positionValue(digit, position))}.`}
      </p>
    </figure>
  );
}
