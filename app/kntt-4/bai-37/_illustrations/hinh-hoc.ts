import type { Point, Seg } from "@/lib/hinh";

/**
 * Hình ở bài 4 tr. 130 (vẽ lại, đổi tỉ lệ). Toạ độ tính bằng ô vuông, trục y hướng xuống.
 * Mọi đáp án trong bai-tap.ts được test tính lại từ đây.
 */
export const CELL = 20;
export const COLS = 19;
export const ROWS = 8;

export const diem = {
  L: { x: 6, y: 1 },
  D: { x: 13, y: 1 },
  K: { x: 2, y: 4 },
  E: { x: 9, y: 4 },
  G: { x: 17, y: 4 },
  I: { x: 6, y: 7 },
  H: { x: 13, y: 7 },
} satisfies Record<string, Point>;

type Name = keyof typeof diem;

/** Các đoạn thẳng có trong hình, tên theo thứ tự hai đầu. */
export const doan: { name: string; seg: Seg }[] = (["LD", "DE", "KE", "KL", "LI", "KI", "EH", "DG", "GH", "IH"] as const).map((name) => ({
  name,
  seg: [diem[name[0] as Name], diem[name[1] as Name]],
}));

export const doanByName = (name: string): Seg => {
  const found = doan.find((item) => item.name === name || item.name === name.split("").reverse().join(""));
  if (!found) throw new Error(`Không có đoạn ${name}`);
  return found.seg;
};
