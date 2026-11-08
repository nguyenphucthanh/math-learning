import { Khung } from "@/components/math/khung";
import type { Point, Seg } from "@/lib/hinh";

const W = 30;
const H = 52;
const f = (n: number) => Math.round(n * 10) / 10;
const at = (x: number, y: number): Point => ({ x: f(20 + x * W), y: f(20 + y * H) });

/** Sáu đỉnh của hình tam giác lớn gồm 4 tam giác nhỏ: T (đỉnh), L, R (hàng giữa), BL, BM, BR (hàng dưới). */
export const dinh: Record<"T" | "L" | "R" | "BL" | "BM" | "BR", Point> = {
  T: at(2, 0),
  L: at(1, 1),
  R: at(3, 1),
  BL: at(0, 2),
  BM: at(2, 2),
  BR: at(4, 2),
};

export type Que = { color: string; name: string; seg: Seg };

/** Chín que tính: màu hiển thị và tên màu (cho câu hỏi). Que đen có bốn que. */
export const queTam: Que[] = [
  { name: "Nâu", color: "#8a5a2b", seg: [dinh.L, dinh.T] },
  { name: "Tím", color: "#7c3aed", seg: [dinh.T, dinh.R] },
  { name: "Đỏ", color: "#e11d48", seg: [dinh.L, dinh.R] },
  { name: "Đen", color: "#111827", seg: [dinh.BL, dinh.L] },
  { name: "Đen", color: "#111827", seg: [dinh.L, dinh.BM] },
  { name: "Xanh", color: "#16a34a", seg: [dinh.BL, dinh.BM] },
  { name: "Đen", color: "#111827", seg: [dinh.R, dinh.BM] },
  { name: "Da cam", color: "#f97316", seg: [dinh.R, dinh.BR] },
  { name: "Đen", color: "#111827", seg: [dinh.BM, dinh.BR] },
];

/** Hình tam giác lớn xếp từ 9 que tính. */
export function QueTamGiac() {
  return (
    <Khung maxWidth={360}>
      <svg viewBox="0 0 260 144" role="img" aria-label="Hình tam giác lớn xếp từ chín que tính: que nâu và que tím ở hai bên đỉnh, que đỏ nằm ngang ở giữa, que xanh nằm ngang ở đáy bên trái, que da cam ở bên phải, các que còn lại màu đen" className="block w-full">
        {queTam.map((que, index) => (
          <line key={index} x1={que.seg[0].x} y1={que.seg[0].y} x2={que.seg[1].x} y2={que.seg[1].y} stroke={que.color} strokeWidth={7} strokeLinecap="round" />
        ))}
      </svg>
    </Khung>
  );
}
