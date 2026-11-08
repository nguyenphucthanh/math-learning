import type { Point, Seg } from "@/lib/hinh";

/** Toạ độ các hình của Bài 35 (đơn vị điểm ảnh của SVG, trục y hướng xuống). Mọi đáp án trong bai-tap.ts được test tính lại từ đây. */

/** Tứ giác EFGH (bài 2 tr. 121): hai góc nhọn ở E, F; góc tù ở G; góc vuông ở H. */
export const tuGiac = {
  names: ["E", "F", "G", "H"],
  points: [
    { x: 0, y: 0 },
    { x: 240, y: 40 },
    { x: 160, y: 160 },
    { x: 0, y: 160 },
  ] satisfies Point[],
};

/** Hình thang cân MNPQ (bài 3 tr. 121): góc M = góc N = 135°, góc P = góc Q = 45°. */
export const hinhThang = {
  names: ["M", "N", "P", "Q"],
  points: [
    { x: 80, y: 0 },
    { x: 160, y: 0 },
    { x: 240, y: 80 },
    { x: 0, y: 80 },
  ] satisfies Point[],
};

/** Ngôi nhà (bài 4 tr. 121): mái là tam giác cân, thân là hình vuông. Mỗi hình đếm góc riêng. */
export const nha = {
  mai: [
    { x: 120, y: 0 },
    { x: 200, y: 40 },
    { x: 40, y: 40 },
  ] satisfies Point[],
  than: [
    { x: 40, y: 40 },
    { x: 200, y: 40 },
    { x: 200, y: 200 },
    { x: 40, y: 200 },
  ] satisfies Point[],
};

/** Hai góc trên giấy ô (bài 3 tr. 123): đỉnh, hai điểm trên hai cạnh. Tọa độ tính bằng ô. */
export const haiGoc = {
  O: { vertex: { x: 3, y: 5 }, arms: [{ x: 7, y: 5 }, { x: 4, y: 2 }] satisfies Point[] },
  P: { vertex: { x: 11, y: 5 }, arms: [{ x: 15, y: 5 }, { x: 10, y: 2 }] satisfies Point[] },
};

/** Tứ giác ABCD hình cái diều (bài 1 tr. 122): góc A và góc C vuông. */
export const dieu = {
  names: ["A", "B", "C", "D"],
  points: [
    { x: -80, y: 60 },
    { x: 0, y: -100 },
    { x: 80, y: 60 },
    { x: 0, y: 100 },
  ] satisfies Point[],
};

/** Hình chữ nhật ABCD (B, C ở trên; A, D ở dưới), M trên AB, N trên CD, MN song song AD (bài 2 tr. 122). */
export const chuNhat = {
  A: { x: 0, y: 120 },
  B: { x: 0, y: 0 },
  C: { x: 200, y: 0 },
  D: { x: 200, y: 120 },
  M: { x: 0, y: 80 },
  N: { x: 200, y: 80 },
};

export const doanChuNhat: Record<string, Seg> = {
  AB: [chuNhat.A, chuNhat.B],
  BC: [chuNhat.B, chuNhat.C],
  CD: [chuNhat.C, chuNhat.D],
  AD: [chuNhat.A, chuNhat.D],
  MN: [chuNhat.M, chuNhat.N],
};

/** Bốn hình để chọn hình bình hành (bài 1a tr. 123), tọa độ trong ô 140 × 90. Đáp án là C. */
export const hinhChonBinhHanh: Point[][] = [
  [{ x: 30, y: 80 }, { x: 110, y: 80 }, { x: 90, y: 10 }, { x: 50, y: 10 }],
  [{ x: 20, y: 80 }, { x: 120, y: 80 }, { x: 120, y: 30 }, { x: 20, y: 10 }],
  [{ x: 10, y: 80 }, { x: 90, y: 80 }, { x: 130, y: 10 }, { x: 50, y: 10 }],
  [{ x: 20, y: 10 }, { x: 130, y: 10 }, { x: 100, y: 80 }, { x: 50, y: 80 }],
];

/** Bốn hình để chọn hình vừa có cạnh song song vừa có cạnh vuông góc (bài 1b tr. 123). Đáp án là D. */
export const hinhChonSongVuong: Point[][] = [
  [{ x: 50, y: 80 }, { x: 130, y: 80 }, { x: 90, y: 10 }, { x: 10, y: 10 }],
  [{ x: 30, y: 80 }, { x: 110, y: 80 }, { x: 90, y: 10 }, { x: 50, y: 10 }],
  [{ x: 20, y: 75 }, { x: 125, y: 60 }, { x: 95, y: 10 }, { x: 30, y: 25 }],
  [{ x: 20, y: 75 }, { x: 120, y: 75 }, { x: 120, y: 15 }, { x: 20, y: 40 }],
];

/** Hình bình hành ABCD (A trên trái, B trên phải) vẽ theo tỉ lệ 20 px = 1 cm: AB = 7 cm, AD = 4 cm. */
export const binhHanh = {
  names: ["A", "B", "C", "D"],
  points: [
    { x: 40, y: 0 },
    { x: 180, y: 0 },
    { x: 140, y: 69.3 },
    { x: 0, y: 69.3 },
  ] satisfies Point[],
  ab: 7,
  ad: 4,
};

/** Hình thoi MNPQ (N trên, P phải, Q dưới, M trái) theo tỉ lệ 20 px = 1 cm: cạnh 6 cm. */
export const thoi = {
  names: ["M", "N", "P", "Q"],
  points: [
    { x: 0, y: 72 },
    { x: 96, y: 0 },
    { x: 192, y: 72 },
    { x: 96, y: 144 },
  ] satisfies Point[],
  canh: 6,
};

/** Dải ba hình thoi liền nhau (bài 4 tr. 122). */
export const daiThoi: Point[][] = [0, 1, 2].map((i) => [
  { x: i * 80, y: 30 },
  { x: i * 80 + 40, y: 0 },
  { x: (i + 1) * 80, y: 30 },
  { x: i * 80 + 40, y: 60 },
]);
