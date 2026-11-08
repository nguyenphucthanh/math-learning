/** Bảng thống kê huy chương (bài 4 tr. 129), số liệu tự đặt để luyện tập. `null` là ô trống: môn đó không có huy chương loại ấy. */
export type MonThi = { mon: string; vang: number | null; bac: number | null; dong: number | null };

export const monThi: MonThi[] = [
  { mon: "Bơi", vang: 18, bac: 16, dong: 9 },
  { mon: "Điền kinh", vang: 12, bac: 20, dong: 14 },
  { mon: "Cử tạ", vang: 7, bac: 5, dong: 4 },
  { mon: "Cầu lông", vang: null, bac: null, dong: 2 },
  { mon: "Bóng bàn", vang: null, bac: 3, dong: 8 },
  { mon: "Cờ vua", vang: 10, bac: 4, dong: 6 },
];

const sum = (values: (number | null)[]) => values.reduce<number>((total, value) => total + (value ?? 0), 0);
export const tongVang = sum(monThi.map((item) => item.vang));
export const tongBac = sum(monThi.map((item) => item.bac));
export const tongDong = sum(monThi.map((item) => item.dong));
