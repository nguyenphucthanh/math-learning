import type { Point, Seg } from "@/lib/hinh";

/** Hình xếp từ 19 que tính (SGK tr. 124): 6 hình nối liền nhau theo hàng ngang. */
export const CELLS = 6;
export const STICK_COUNT = CELLS * 3 + 1;

const W = 52;
const DX = 26;
const DY = 45;
const X0 = 14;
const Y0 = 14;
const f = (n: number) => Math.round(n * 10) / 10;

export type Stick = { id: number; role: "tren" | "duoi" | "nghieng"; index: number; seg: Seg };

const p = (x: number, y: number): Point => ({ x: f(x), y: f(y) });

/** Que 0–5: cạnh trên của ô 1–6. Que 6–11: cạnh dưới. Que 12–18: cạnh nghiêng, từ trái sang phải. */
export const sticks: Stick[] = [
  ...Array.from({ length: CELLS }, (_, i): Stick => ({ id: i, role: "tren", index: i, seg: [p(X0 + i * W + DX, Y0), p(X0 + (i + 1) * W + DX, Y0)] })),
  ...Array.from({ length: CELLS }, (_, i): Stick => ({ id: CELLS + i, role: "duoi", index: i, seg: [p(X0 + i * W, Y0 + DY), p(X0 + (i + 1) * W, Y0 + DY)] })),
  ...Array.from({ length: CELLS + 1 }, (_, i): Stick => ({ id: CELLS * 2 + i, role: "nghieng", index: i, seg: [p(X0 + i * W, Y0 + DY), p(X0 + i * W + DX, Y0)] })),
];

export const VIEW = { width: X0 * 2 + CELLS * W + DX, height: Y0 * 2 + DY };

const top = (i: number) => i;
const bottom = (i: number) => CELLS + i;
const slant = (i: number) => CELLS * 2 + i;

/** Còn hình thoi hoặc hình bình hành không? Một hình gồm các ô liền nhau i..j: đủ cạnh trên, cạnh dưới của các ô đó và hai que nghiêng ở hai đầu. */
export function hasShape(removed: ReadonlySet<number>): boolean {
  for (let i = 0; i < CELLS; i += 1) {
    for (let j = i; j < CELLS; j += 1) {
      let ok = !removed.has(slant(i)) && !removed.has(slant(j + 1));
      for (let k = i; ok && k <= j; k += 1) ok = !removed.has(top(k)) && !removed.has(bottom(k));
      if (ok) return true;
    }
  }
  return false;
}
