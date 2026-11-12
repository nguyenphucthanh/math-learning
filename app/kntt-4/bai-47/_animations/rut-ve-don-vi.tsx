"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

type Config = {
  /** Số nhóm (hộp, can) và số chấm trong mỗi nhóm. */
  groups: number;
  per: number;
  /** Số nhóm được chọn ở bước hai. */
  take: number;
  labels: [string, string, string];
  aria: string;
  captions: string[];
};

const BOX_W = 48;
const GAP = 6;
const X0 = (340 - (6 * BOX_W + 5 * GAP)) / 2;
const BOX_Y = 20;
const BOX_H = 60;

function Groups({ cfg }: { cfg: Config }) {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const rows = Math.ceil(cfg.per / 3);
  const x = (i: number) => X0 + i * (BOX_W + GAP);
  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg viewBox="0 0 340 130" role="img" aria-label={`${cfg.aria}. ${cfg.labels[step]}.`} className="block w-full">
        {Array.from({ length: cfg.groups }).map((_, i) => (
          <g key={i} opacity={step === 2 && i >= cfg.take ? 0.3 : 1}>
            <rect x={x(i)} y={BOX_Y} width={BOX_W} height={BOX_H} rx={8} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2} />
            {Array.from({ length: cfg.per }).map((__, d) => (
              <circle key={d} cx={x(i) + 10 + (d % 3) * 14} cy={BOX_Y + BOX_H / 2 - ((rows - 1) * 7) + Math.floor(d / 3) * 14} r={5.5} fill="var(--sun)" stroke="var(--ink)" strokeWidth={1.5} />
            ))}
          </g>
        ))}
        {step === 1 ? <rect data-enter={1} x={x(0) - 4} y={BOX_Y - 4} width={BOX_W + 8} height={BOX_H + 8} rx={10} fill="none" stroke="var(--unit-second)" strokeWidth={3.5} /> : null}
        {step === 2 ? <rect data-enter={2} x={x(0) - 4} y={BOX_Y - 4} width={cfg.take * (BOX_W + GAP) - GAP + 8} height={BOX_H + 8} rx={10} fill="none" stroke="var(--unit-second)" strokeWidth={3.5} strokeDasharray="8 4" /> : null}
        <text x={170} y={BOX_Y + BOX_H + 36} textAnchor="middle" fontSize={step === 0 ? 17 : 20} fontWeight={800} fill="var(--ink)" data-enter={step === 0 ? undefined : step}>
          {cfg.labels[step]}
        </text>
      </svg>
      <StepControls step={step} captions={cfg.captions} onChange={setStep} />
    </figure>
  );
}

export const rutVeNhanCaptions = [
  "Có 36 cái bánh xếp đều vào 6 hộp. Hỏi 4 hộp có bao nhiêu cái bánh?",
  "Bước 1, tìm số bánh trong 1 hộp: 36 : 6 = 6. Mỗi hộp có 6 cái bánh.",
  "Bước 2, 4 hộp, mỗi hộp 6 cái bánh: 6 × 4 = 24. Vậy 4 hộp có 24 cái bánh.",
];

export const rutVeChiaCaptions = [
  "Có 18 l mật ong đựng đều vào 6 can. Hỏi 12 l mật ong đựng được mấy can?",
  "Bước 1, tìm số lít trong 1 can: 18 : 6 = 3. Mỗi can đựng 3 l.",
  "Bước 2, 12 l, mỗi can đựng 3 l: 12 : 3 = 4. Vậy cần 4 can.",
];

/** Dạng 1: tìm một hộp bằng phép chia, rồi nhân. */
export function RutVeNhan() {
  return (
    <Groups
      cfg={{
        groups: 6, per: 6, take: 4,
        labels: ["6 hộp: 36 cái bánh", "1 hộp: 36 : 6 = 6 (cái)", "4 hộp: 6 × 4 = 24 (cái)"],
        aria: "6 hộp, mỗi hộp 6 cái bánh, tất cả 36 cái bánh",
        captions: rutVeNhanCaptions,
      }}
    />
  );
}

/** Dạng 2: tìm một can bằng phép chia, rồi chia tiếp để tìm số can. */
export function RutVeChia() {
  return (
    <Groups
      cfg={{
        groups: 6, per: 3, take: 4,
        labels: ["18 l: 6 can", "1 can: 18 : 6 = 3 (l)", "12 l: 12 : 3 = 4 (can)"],
        aria: "6 can, mỗi can 3 l mật ong, tất cả 18 l",
        captions: rutVeChiaCaptions,
      }}
    />
  );
}
