import type { Point } from "@/lib/hinh";

/** Tam giác ABC, M nằm trên BC (bài 4 tr. 126). Đơn vị điểm ảnh của SVG (1 cm = 30 px), trục y hướng xuống. Mọi đáp án được test tính lại từ đây. */
export const PX_PER_CM = 30;
export const tamGiac = {
  A: { x: 60, y: 16 } satisfies Point,
  B: { x: 0, y: 120 } satisfies Point,
  M: { x: 90, y: 120 } satisfies Point,
  C: { x: 240, y: 120 } satisfies Point,
};
