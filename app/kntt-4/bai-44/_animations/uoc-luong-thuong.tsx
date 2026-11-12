"use client";

import { StepControls } from "@/components/lesson/step-player";
import { formatNumber } from "@/lib/area-units";
import { useState } from "react";

export type Verdict = "lon" | "nho" | "vua";

/** Thử thương q: lớn hơn số đang chia thì quá lớn; số dư không nhỏ hơn số chia thì quá nhỏ; còn lại là vừa. */
export function judge(current: number, divisor: number, q: number): Verdict {
  const product = q * divisor;
  if (product > current) return "lon";
  return current - product >= divisor ? "nho" : "vua";
}

/** Ước lượng thương bằng cách làm tròn số chia đến chục, rồi thử từng thương. */
export function uocLuongSteps(current: number, divisor: number, tries: number[]) {
  const rounded = Math.round(divisor / 10) * 10;
  const estimate = Math.floor(current / rounded);
  const rows = tries.map((q) => {
    const product = q * divisor;
    const verdict = judge(current, divisor, q);
    const text =
      verdict === "lon"
        ? `Thử ${q}: ${q} × ${divisor} = ${formatNumber(product)}, lớn hơn ${formatNumber(current)}. Thương quá lớn, giảm đi 1.`
        : verdict === "nho"
          ? `Thử ${q}: ${q} × ${divisor} = ${formatNumber(product)}; ${formatNumber(current)} − ${formatNumber(product)} = ${current - product}, không bé hơn ${divisor}. Thương quá bé, tăng lên 1.`
          : `Thử ${q}: ${q} × ${divisor} = ${formatNumber(product)}; ${formatNumber(current)} − ${formatNumber(product)} = ${current - product}, bé hơn ${divisor}. Thương vừa đúng.`;
    return { q, verdict, text };
  });
  return { rounded, estimate, rows };
}

const tones: Record<Verdict, string> = { lon: "var(--oops)", nho: "var(--oops)", vua: "var(--good)" };
const labels: Record<Verdict, string> = { lon: "quá lớn", nho: "quá bé", vua: "vừa đúng" };

/** Ước lượng thương: làm tròn số chia, thử, rồi chỉnh thương cho đến khi số dư bé hơn số chia. */
export function UocLuongThuong({ current, divisor, tries }: { current: number; divisor: number; tries: number[] }) {
  const [step, setStep] = useState(0);
  const { rounded, estimate, rows } = uocLuongSteps(current, divisor, tries);
  const captions = [
    `Chia ${formatNumber(current)} cho ${divisor}. Chưa biết thương là bao nhiêu, ta ước lượng.`,
    `Làm tròn ${divisor} thành ${rounded}. ${formatNumber(current)} : ${rounded} gần ${estimate}. Thử thương ${estimate}.`,
    ...rows.map((row) => row.text),
  ];
  const shown = Math.max(0, step - 1);

  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <p
        role="img"
        aria-label={`Ước lượng thương ${formatNumber(current)} : ${divisor}. Đã thử ${shown} lần${shown > 0 ? `, thương ${rows[shown - 1].q} ${labels[rows[shown - 1].verdict]}` : ""}.`}
        className="text-center font-heading text-2xl font-extrabold text-ink tabular-nums"
      >
        {formatNumber(current)} : {divisor} ≈ {formatNumber(current)} : {rounded} ≈ {step >= 1 ? estimate : "?"}
      </p>
      <ul className="mt-4 space-y-2">
        {rows.map((row, index) => (
          <li
            key={row.q}
            className={`flex min-h-11 items-center justify-between rounded-2xl border-2 px-4 text-lg font-bold tabular-nums ${index < shown ? "" : "invisible"}`}
            style={{ borderColor: index < shown ? tones[row.verdict] : "transparent" }}
            data-testid={`try-${index}`}
          >
            <span>
              {row.q} × {divisor} = {formatNumber(row.q * divisor)}
            </span>
            <span style={{ color: tones[row.verdict] }}>{labels[row.verdict]}</span>
          </li>
        ))}
      </ul>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
