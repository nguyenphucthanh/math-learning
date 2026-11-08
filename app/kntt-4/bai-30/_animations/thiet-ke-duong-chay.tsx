"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { RightMark } from "@/components/math/khung";
import { useRef, useState } from "react";
import { duongChayGeometry, type DuongChaySpec } from "../_illustrations/duong-chay";

/** Số liệu của SGK (trang 103-104): MN = 2 cm, MP = HK = NQ = 10 cm. */
export const designTrack: DuongChaySpec = { mn: 2, mp: 10, scale: 26, m: { x: 44, y: 50 } };

const captions = [
  "Bước 1: Vẽ vạch xuất phát là đoạn thẳng MN dài 2 cm. Vẽ trung điểm H của đoạn thẳng MN.",
  "Bước 2: Vẽ đoạn thẳng MP vuông góc với đoạn thẳng MN: MP = 10 cm.",
  "Bước 3: Vẽ các đoạn thẳng HK, NQ song song với đoạn thẳng MP: HK = NQ = 10 cm.",
  "Bước 4: Nối điểm P với điểm Q ta được vạch đích.",
  "Bước 5: Chú thích khu vực XUẤT PHÁT, khu vực ĐÍCH và đánh số đường chạy. Ta được đường chạy dành cho 2 người.",
];

const f = (n: number) => Math.round(n * 10) / 10;

/** Thiết kế đường chạy trên giấy: năm bước của SGK. */
export function ThietKeDuongChay() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const { m, h, n, p, k, q } = duongChayGeometry(designTrack);
  const midX = f((m.x + p.x) / 2);
  const stroke = { stroke: "var(--ink)", strokeWidth: 3.5, strokeLinecap: "round" as const };

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 150"
        role="img"
        aria-label={
          step === 0
            ? "Đoạn thẳng MN dài 2 cm với trung điểm H"
            : step === 1
              ? "Đoạn thẳng MP dài 10 cm vuông góc với MN"
              : step === 2
                ? "Các đoạn thẳng HK và NQ song song với MP, mỗi đoạn dài 10 cm"
                : step === 3
                  ? "Nối P với Q được vạch đích"
                  : "Đường chạy dành cho 2 người, có chú thích xuất phát, đích và số đường chạy"
        }
        className="block w-full"
        fontWeight={800}
      >
        {step >= 4 ? (
          <rect data-enter={4} x={m.x} y={m.y} width={p.x - m.x} height={n.y - m.y} fill="var(--unit-ta-soft)" />
        ) : null}
        <line x1={m.x} y1={m.y} x2={n.x} y2={n.y} {...stroke} />
        {step >= 1 ? (
          <g data-enter={1}>
            <line x1={m.x} y1={m.y} x2={p.x} y2={p.y} {...stroke} />
            <RightMark at={m} toward1={n} toward2={p} size={12} />
            <text x={midX} y={m.y - 10} textAnchor="middle" fontSize={15} fill="var(--ink)">
              10 cm
            </text>
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            <line x1={h.x} y1={h.y} x2={k.x} y2={k.y} {...stroke} />
            <line x1={n.x} y1={n.y} x2={q.x} y2={q.y} {...stroke} />
            <text x={midX} y={f(h.y - 8)} textAnchor="middle" fontSize={15} fill="var(--ink)">
              10 cm
            </text>
            <text x={midX} y={f(n.y - 8)} textAnchor="middle" fontSize={15} fill="var(--ink)">
              10 cm
            </text>
          </g>
        ) : null}
        {step >= 3 ? <line data-enter={3} x1={p.x} y1={p.y} x2={q.x} y2={q.y} {...stroke} stroke="var(--unit-ta)" strokeWidth={5} /> : null}
        {step <= 1 ? (
          <g fontSize={15} fill="var(--ink)">
            <text x={m.x + 10} y={f((m.y + h.y) / 2 + 5)}>
              1 cm
            </text>
            <text x={m.x + 10} y={f((h.y + n.y) / 2 + 5)}>
              1 cm
            </text>
          </g>
        ) : null}
        {[
          ["M", m, -14, 5, 0],
          ["H", h, -14, 5, 0],
          ["N", n, -14, 5, 0],
          ["P", p, 14, 5, 1],
          ["K", k, 14, 5, 2],
          ["Q", q, 14, 5, 2],
        ].map(([name, at, dx, dy, from]) =>
          step >= (from as number) && (name !== "P" || step >= 1) ? (
            <g key={name as string} data-enter={from as number}>
              <circle cx={(at as typeof m).x} cy={(at as typeof m).y} r={4.5} fill="var(--ink)" />
              <text x={f((at as typeof m).x + (dx as number))} y={f((at as typeof m).y + (dy as number))} textAnchor="middle" fontSize={17} fill="var(--ink)">
                {name as string}
              </text>
            </g>
          ) : null,
        )}
        {step >= 4 ? (
          <g data-enter={4} fontSize={15} fill="var(--ink)">
            <text x={m.x + 22} y={f((m.y + h.y) / 2 + 6)} textAnchor="middle" fontSize={18}>
              1
            </text>
            <text x={m.x + 22} y={f((h.y + n.y) / 2 + 6)} textAnchor="middle" fontSize={18}>
              2
            </text>
            <text x={m.x} y={f(n.y + 26)}>
              XUẤT PHÁT
            </text>
            <text x={p.x} y={f(n.y + 26)} textAnchor="end">
              ĐÍCH
            </text>
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
