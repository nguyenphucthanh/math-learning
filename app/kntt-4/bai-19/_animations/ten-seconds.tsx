"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { cn } from "@/lib/utils";
import { Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

const TOTAL = 10;

/** Chạy thật 10 giây để con cảm nhận độ dài. Chỉ chạy khi con bấm, xong thì tự dừng. */
export function TenSeconds() {
  const [elapsed, setElapsed] = useState<number | null>(null);
  const running = elapsed !== null && elapsed < TOTAL;
  const finished = elapsed === TOTAL;

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setElapsed((value) => Math.min((value ?? 0) + 1, TOTAL)), 1000);
    return () => clearInterval(timer);
  }, [running]);

  return (
    <figure className="my-6 rounded-3xl bg-unit-second-soft p-4 sm:p-6">
      <figcaption className="text-lg font-semibold">
        Bấm nút rồi đếm thầm theo. Mỗi chấm sáng lên là 1 giây thật.
      </figcaption>

      <p aria-hidden className="mt-3 text-center font-heading text-5xl font-bold text-unit-second tabular-nums">
        {elapsed ?? 0} giây
      </p>
      <div aria-hidden className="mt-3 grid grid-cols-10 gap-1.5">
        {Array.from({ length: TOTAL }, (_, index) => (
          <span
            key={index}
            data-lit={(elapsed ?? 0) > index}
            className={cn("aspect-square rounded-full", (elapsed ?? 0) > index ? "bg-unit-second" : "bg-white")}
          />
        ))}
      </div>

      <div role="status" className="mt-3 min-h-14 text-lg leading-relaxed font-semibold">
        {finished ? "Đó là 10 giây. Một bạn nhỏ chạy nhanh có thể chạy được khoảng 50 m đấy!" : null}
      </div>

      <ActionButton className="w-full sm:w-auto" disabled={running} onClick={() => setElapsed(0)}>
        {finished ? <RotateCcw aria-hidden /> : <Play aria-hidden />}
        {running ? "Đang đếm…" : finished ? "Thử lại" : "Bắt đầu đếm 10 giây"}
      </ActionButton>
    </figure>
  );
}
