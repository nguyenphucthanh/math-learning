"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { RightMark } from "../_illustrations/khung";
import { useState } from "react";

const O = { x: 150, y: 150 };
const ANGLES = [60, 90, 120];

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Con chọn góc giữa hai đường thẳng. Ê ke cố định, chỉ khi góc là 90° thì cạnh ê ke mới khít với đường thẳng b. */
export function XoayDuong() {
  const [angle, setAngle] = useState(60);
  const right = angle === 90;
  const end = { x: Math.round((O.x + 130 * Math.cos(rad(angle))) * 10) / 10, y: Math.round((O.y - 130 * Math.sin(rad(angle))) * 10) / 10 };

  return (
    <figure className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <p className="text-lg font-semibold">Chọn góc giữa hai đường thẳng a và b, rồi xem ê ke có khít với đường b không.</p>
      <svg
        viewBox="0 0 300 220"
        role="img"
        aria-label={`Đường thẳng a nằm ngang, đường thẳng b nghiêng ${angle} độ so với a. ${right ? "Cạnh ê ke khít với đường b." : "Cạnh ê ke không khít với đường b."}`}
        className="mt-3 block w-full"
        fontWeight={800}
      >
        <line x1={14} y1={O.y} x2={286} y2={O.y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
        <polygon points={`${O.x},${O.y} ${O.x + 90},${O.y} ${O.x},${O.y - 90}`} fill="var(--unit-yen)" fillOpacity={0.3} stroke="var(--unit-yen)" strokeWidth={3} strokeLinejoin="round" />
        <g
          style={{ transform: `rotate(${90 - angle}deg)`, transformOrigin: `${O.x}px ${O.y}px` }}
          className="transition-transform duration-500 motion-reduce:transition-none"
        >
          <line x1={O.x} y1={O.y + 130} x2={O.x} y2={O.y - 130} stroke={right ? "var(--unit-ta)" : "var(--ink)"} strokeWidth={right ? 5 : 3.5} strokeLinecap="round" />
        </g>
        <circle cx={O.x} cy={O.y} r={4.5} fill="var(--ink)" />
        {right ? <RightMark at={O} toward1={{ x: O.x + 90, y: O.y }} toward2={{ x: O.x, y: O.y - 90 }} size={16} /> : null}
        <text x={278} y={O.y - 10} textAnchor="end" fontSize={18} fill="var(--ink)">
          a
        </text>
        <text x={end.x + (angle < 90 ? 10 : -10)} y={end.y + 2} textAnchor="middle" fontSize={18} fill="var(--ink)">
          b
        </text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Chọn góc giữa hai đường thẳng">
        {ANGLES.map((value) => (
          <ActionButton key={value} variant={value === angle ? "primary" : "soft"} aria-pressed={value === angle} className="min-w-20" onClick={() => setAngle(value)}>
            {value}°
          </ActionButton>
        ))}
      </div>
      <p role="status" className="mt-3 min-h-[5.25rem] text-lg leading-relaxed font-semibold sm:min-h-[3.5rem]">
        {right
          ? "Cạnh ê ke khít với đường thẳng b. Hai đường thẳng a và b vuông góc với nhau."
          : "Hai đường thẳng a và b cắt nhau, nhưng cạnh ê ke không khít với đường b. Cắt nhau chưa chắc đã vuông góc."}
      </p>
    </figure>
  );
}
