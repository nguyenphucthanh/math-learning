/** Tọa độ chung cho các hình cộng, trừ theo cột: viewBox rộng 340, ô rộng 44, khe 8 giữa các lớp. */
export const VIEW_WIDTH = 340;
export const CELL = 44;
const GAP = 8;

function hasGap(index: number, columns: number): boolean {
  return index > 0 && (columns - 1 - index) % 3 === 2;
}

/** Tổng bề rộng của dấu phép tính và `columns` cột. */
function gridWidth(columns: number): number {
  const gaps = Array.from({ length: columns }, (_, index) => index).filter((index) => hasGap(index, columns)).length;
  return CELL * (columns + 1) + GAP * gaps;
}

/** Tâm ngang của cột thứ `index` tính từ bên trái (0 là cột hàng cao nhất). */
export function columnCenter(index: number, columns: number): number {
  const start = (VIEW_WIDTH - gridWidth(columns)) / 2;
  let x = start + CELL;
  for (let i = 0; i <= index; i++) {
    if (hasGap(i, columns)) x += GAP;
    if (i < index) x += CELL;
  }
  return Math.round(x + CELL / 2);
}

/** Tâm ngang của cột dấu phép tính. */
export function signCenter(columns: number): number {
  return Math.round((VIEW_WIDTH - gridWidth(columns)) / 2 + CELL / 2);
}

export const PLACE_LABELS: Record<number, [string, string]> = {
  0: ["đơn", "vị"],
  1: ["chục", ""],
  2: ["trăm", ""],
  3: ["nghìn", ""],
  4: ["chục", "nghìn"],
  5: ["trăm", "nghìn"],
};
