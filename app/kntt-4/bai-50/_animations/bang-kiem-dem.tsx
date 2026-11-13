"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { useRef, useState } from "react";

export const sports = [
  { name: "Bóng đá", count: 4 },
  { name: "Bóng rổ", count: 6 },
  { name: "Bơi", count: 2 },
];

export const kiemDemCaptions = [
  "Mai hỏi mỗi bạn môn thể thao yêu thích nhất, rồi ghi vào bảng số liệu.",
  "Mỗi bạn chọn môn nào, Mai kẻ một nét ở hàng của môn đó. Đủ 4 nét thì nét thứ 5 gạch chéo. Đây là kiểm đếm.",
  "Đếm các nét: Bóng đá 4, Bóng rổ 5 + 1 = 6, Bơi 2. Ghi vào cột Số bạn.",
];

const ROW_Y = (i: number) => 62 + i * 46;

/** Các vạch kiểm đếm của một hàng: nhóm 5 (4 nét và một nét chéo). */
function Tally({ count, x, y }: { count: number; x: number; y: number }) {
  const groups = Math.ceil(count / 5);
  return (
    <g stroke="var(--ink)" strokeWidth={3} strokeLinecap="round">
      {Array.from({ length: groups }).map((_, g) => {
        const n = Math.min(5, count - g * 5);
        const gx = x + g * 50;
        return (
          <g key={g}>
            {Array.from({ length: Math.min(n, 4) }).map((__, k) => (
              <line key={k} x1={gx + k * 9} x2={gx + k * 9} y1={y - 12} y2={y + 12} />
            ))}
            {n === 5 ? <line x1={gx - 5} x2={gx + 35} y1={y + 9} y2={y - 9} /> : null}
          </g>
        );
      })}
    </g>
  );
}

/** Bảng số liệu có kiểm đếm: Bóng đá 4, Bóng rổ 6, Bơi 2. */
export function BangKiemDem() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 200"
        role="img"
        aria-label={`Bảng số liệu môn thể thao yêu thích. ${step === 0 ? "Có tên ba môn." : step === 1 ? "Đã kiểm đếm: bóng đá 4 nét, bóng rổ 5 nét và 1 nét, bơi 2 nét." : "Số bạn: bóng đá 4, bóng rổ 6, bơi 2."}`}
        className="block w-full"
      >
        <rect x={4} y={4} width={332} height={192} rx={10} fill="var(--paper)" stroke="var(--ink)" strokeWidth={2} />
        <text x={12} y={34} fontSize={14} fontWeight={800} fill="var(--ink)">Môn thể thao</text>
        <text x={150} y={34} fontSize={14} fontWeight={800} fill="var(--ink)">Kiểm đếm</text>
        <text x={262} y={34} fontSize={14} fontWeight={800} fill="var(--ink)">Số bạn</text>
        <line x1={4} x2={336} y1={44} y2={44} stroke="var(--ink)" strokeWidth={2} />
        {sports.map((s, i) => (
          <g key={s.name}>
            <line x1={4} x2={336} y1={ROW_Y(i) + 23} y2={ROW_Y(i) + 23} stroke="var(--input)" strokeWidth={1} />
            <text x={12} y={ROW_Y(i) + 6} fontSize={16} fontWeight={800} fill="var(--ink)">{s.name}</text>
            {step >= 1 ? (
              <g data-enter={1}>
                <Tally count={s.count} x={152} y={ROW_Y(i)} />
              </g>
            ) : null}
            {step >= 2 ? (
              <text data-enter={2} x={290} y={ROW_Y(i) + 7} textAnchor="middle" fontSize={20} fontWeight={800} fill="var(--unit-second)">
                {s.count}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
      <StepControls step={step} captions={kiemDemCaptions} onChange={setStep} />
    </figure>
  );
}
