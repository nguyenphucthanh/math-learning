const ROWS = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];

/** Vị trí đếm từ hàng đơn vị (0) đến hàng trăm triệu (8). */
export const MAX_POSITION = ROWS.length - 1;

/** Tên hàng: 0 là "hàng đơn vị", 3 là "hàng nghìn", 6 là "hàng triệu". */
export function hangName(position: number): string {
  if (!(position in ROWS)) throw new Error(`Không có hàng ở vị trí ${position}`);
  return `hàng ${ROWS[position]}`;
}

/** Tên lớp của một hàng: ba hàng liền nhau hợp thành một lớp. */
export function lopName(position: number): string {
  if (!(position in ROWS)) throw new Error(`Không có lớp ở vị trí ${position}`);
  return ["lớp đơn vị", "lớp nghìn", "lớp triệu"][Math.floor(position / 3)];
}

/** Vị trí của chữ số thứ `index` (đếm từ trái, 0 là chữ số đầu tiên) trong `value`. */
export function positionOfIndex(value: number, index: number): number {
  return String(value).length - 1 - index;
}

/** Giá trị theo vị trí của chữ số: chữ số 2 ở hàng nghìn có giá trị 2 000. */
export function positionValue(digit: number, position: number): number {
  return digit * 10 ** position;
}

/** Chữ số ở một hàng của số, 0 nếu số không có hàng đó. */
export function digitAt(value: number, position: number): number {
  return Math.floor(value / 10 ** position) % 10;
}
