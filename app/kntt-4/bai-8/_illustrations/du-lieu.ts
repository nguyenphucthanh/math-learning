import type { Point } from "@/lib/hinh";

/** Một góc vẽ trên hình: đỉnh `name`, cạnh thứ nhất hướng `rot` độ (ngược chiều kim đồng hồ từ trục ngang), cạnh thứ hai quay thêm `degrees` độ. */
export type Goc = { name: string; rot: number; degrees: number };

/** Sáu góc ở phần Hoạt động: 3 nhọn, 1 vuông, 1 tù, 1 bẹt. */
export const sauGocMot: Goc[] = [
  { name: "O", rot: 10, degrees: 30 },
  { name: "B", rot: 20, degrees: 130 },
  { name: "C", rot: 0, degrees: 90 },
  { name: "E", rot: 0, degrees: 180 },
  { name: "D", rot: 150, degrees: 65 },
  { name: "A", rot: 200, degrees: 50 },
];

/** Sáu góc ở phần Luyện tập: 2 nhọn, 1 vuông, 2 tù, 1 bẹt. */
export const sauGocHai: Goc[] = [
  { name: "M", rot: 330, degrees: 150 },
  { name: "P", rot: 80, degrees: 60 },
  { name: "R", rot: 0, degrees: 35 },
  { name: "N", rot: 90, degrees: 90 },
  { name: "S", rot: 330, degrees: 125 },
  { name: "U", rot: 90, degrees: 180 },
];

/** Hai cái kéo: số đo góc giữa hai lưỡi kéo. */
export const haiCaiKeo = [
  { name: "Kéo xanh", degrees: 30 },
  { name: "Kéo đỏ", degrees: 130 },
];

/** Chiếc bánh chia bởi đường thẳng CB và tia OA. Góc đo từ tia OB, ngược chiều kim đồng hồ. */
export const banhPizza = {
  /** Hướng tia OA tính từ tia OB. */
  huongOA: 110,
  /** Số đo góc đỉnh O của từng miếng: miếng 1 (giữa OA và OC), miếng 2 (giữa OB và OA), miếng 3 (nửa dưới). */
  miengs: [70, 110, 180],
};

/** Bánh xe 12 nan, hướng mỗi nan tính bằng độ từ nan chỉ lên trên, theo chiều kim đồng hồ. */
export const banhXe = {
  xanh: [0, 150],
  do: { A: 60, B: 120 },
};

/** Góc nhỏ (không quá 180°) giữa hai nan xe. */
export function gocGiuaHaiNan(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/** Chín chiếc quạt: số đo góc xòe ra. */
export const chinQuat = [125, 45, 180, 90, 30, 150, 60, 180, 120];

/** Biểu đồ của Nga: số chấm ở mỗi cột (nhọn, vuông, tù, bẹt). Một cột bị nhầm. */
export const bieuDoNga = { nhon: 3, vuong: 2, tu: 3, bet: 2 };

/** Tam giác ABC có AH vuông góc với BC, H nằm giữa B và C (trục y hướng xuống). */
export const tamGiacAH: Record<"A" | "B" | "C" | "H", Point> = {
  A: { x: 70, y: 0 },
  B: { x: 0, y: 50 },
  C: { x: 150, y: 50 },
  H: { x: 70, y: 50 },
};

/** Hai đường đi của con nhện (trục y hướng xuống): đường xanh có một góc tù. */
export const duongNhen: Record<"do" | "xanh", Point[]> = {
  do: [
    { x: 10, y: 20 },
    { x: 110, y: 20 },
    { x: 110, y: 80 },
    { x: 50, y: 80 },
    { x: 80, y: 40 },
  ],
  xanh: [
    { x: 10, y: 60 },
    { x: 80, y: 60 },
    { x: 120, y: 20 },
    { x: 120, y: 90 },
  ],
};
