"use client";

import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import type { Point } from "@/lib/hinh";
import { useRef, useState } from "react";
import { DauBangNhau } from "./dau";

/** Tờ giấy hình chữ nhật 240 × 160, góc trên bên trái ở (50, 40). */
export const paper = { x: 50, y: 40, width: 240, height: 160 };
const cx = paper.x + paper.width / 2;
const cy = paper.y + paper.height / 2;

/** Bốn trung điểm của bốn cạnh tờ giấy: đỉnh của hình thoi khi mở ra. */
export const rhombusPoints: Point[] = [
  { x: cx, y: paper.y },
  { x: paper.x + paper.width, y: cy },
  { x: cx, y: paper.y + paper.height },
  { x: paper.x, y: cy },
];

const captions = [
  "Có một tờ giấy hình chữ nhật.",
  "Gấp đôi tờ giấy theo nét đứt nằm ngang.",
  "Gấp đôi thêm một lần nữa theo nét đứt thẳng đứng. Tờ giấy được chia làm bốn phần bằng nhau.",
  "Cắt theo đường nét đứt đậm. Phần góc bị cắt rời ra (màu xám) bỏ đi.",
  "Mở giấy ra, ta được một hình thoi: bốn cạnh bằng nhau.",
];

const poly = (points: Point[]) => points.map((p) => `${p.x},${p.y}`).join(" ");

/** Gấp giấy hai lần rồi cắt một đường để được hình thoi (SGK tr. 109). Hình vẽ tờ giấy khi mở phẳng. */
export function GapGiay() {
  const [step, setStep] = useState(0);
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);
  const [top, right, bottom, left] = rhombusPoints;
  const corners = [
    [{ x: paper.x, y: paper.y }, top, left],
    [{ x: paper.x + paper.width, y: paper.y }, top, right],
    [{ x: paper.x + paper.width, y: paper.y + paper.height }, right, bottom],
    [{ x: paper.x, y: paper.y + paper.height }, bottom, left],
  ];

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <svg
        viewBox="0 0 340 240"
        role="img"
        aria-label={
          step === 0
            ? "Tờ giấy hình chữ nhật"
            : step === 1
              ? "Tờ giấy có nét đứt nằm ngang ở giữa"
              : step === 2
                ? "Tờ giấy có hai nét đứt ngang và dọc, chia làm bốn phần bằng nhau"
                : step === 3
                  ? "Đường cắt nối hai trung điểm của hai cạnh liền nhau, phần góc bị cắt có màu xám"
                  : "Mở giấy ra được hình thoi có đỉnh là trung điểm bốn cạnh tờ giấy"
        }
        className="block w-full"
        fontWeight={800}
      >
        <rect x={paper.x} y={paper.y} width={paper.width} height={paper.height} fill="var(--unit-ta)" fillOpacity={0.15} stroke="var(--ink)" strokeWidth={3} />
        {step >= 1 ? (
          <line data-enter={1} x1={paper.x} y1={cy} x2={paper.x + paper.width} y2={cy} stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="8 6" />
        ) : null}
        {step >= 2 ? (
          <line data-enter={2} x1={cx} y1={paper.y} x2={cx} y2={paper.y + paper.height} stroke="var(--ink)" strokeWidth={2.5} strokeDasharray="8 6" />
        ) : null}
        {step >= 3 && step < 4
          ? corners.map((corner, i) => <polygon key={i} data-enter={3} points={poly(corner)} fill="var(--foreground)" fillOpacity={0.18} />)
          : null}
        {step >= 3 && step < 4 ? (
          <g data-enter={3} stroke="var(--unit-second)" strokeWidth={4.5} strokeDasharray="3 7" strokeLinecap="round">
            {rhombusPoints.map((point, i) => {
              const next = rhombusPoints[(i + 1) % 4];
              return <line key={i} x1={point.x} y1={point.y} x2={next.x} y2={next.y} />;
            })}
          </g>
        ) : null}
        {step >= 4 ? (
          <g data-enter={4}>
            {corners.map((corner, i) => (
              <polygon key={i} points={poly(corner)} fill="var(--foreground)" fillOpacity={0.1} />
            ))}
            <polygon points={poly(rhombusPoints)} fill="var(--unit-ta)" fillOpacity={0.55} stroke="var(--ink)" strokeWidth={3.5} strokeLinejoin="round" />
            <DauBangNhau seg={[top, right]} color="var(--ink)" />
            <DauBangNhau seg={[right, bottom]} color="var(--ink)" />
            <DauBangNhau seg={[bottom, left]} color="var(--ink)" />
            <DauBangNhau seg={[left, top]} color="var(--ink)" />
          </g>
        ) : null}
      </svg>
      <StepControls step={step} captions={captions} onChange={setStep} />
    </figure>
  );
}
