import { formatNumber } from "@/lib/area-units";

/** Tên hàng, từ hàng đơn vị (vị trí 0) trở lên. */
export const PLACE_NAMES = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu"];

export type Column = {
  /** 0 là hàng đơn vị. */
  position: number;
  /** Chữ số của số thứ nhất ở hàng này, null nếu số đó không có hàng này. */
  top: number | null;
  bottom: number | null;
  carryIn: 0 | 1;
  /** Tổng chữ số của cột và số nhớ. */
  total: number;
  /** Chữ số viết xuống. */
  write: number;
  carryOut: 0 | 1;
};

/** Các chữ số của một số, bắt đầu từ hàng đơn vị. */
export function digitsOf(value: number): number[] {
  return String(value).split("").reverse().map(Number);
}

/** Cộng theo cột từ phải sang trái, giữ lại từng bước. */
export function columnAdd(a: number, b: number): Column[] {
  const top = digitsOf(a);
  const bottom = digitsOf(b);
  const size = digitsOf(a + b).length;
  const columns: Column[] = [];
  let carry: 0 | 1 = 0;
  for (let position = 0; position < size; position++) {
    const x = top[position] ?? null;
    const y = bottom[position] ?? null;
    const total: number = (x ?? 0) + (y ?? 0) + carry;
    const carryOut: 0 | 1 = total >= 10 ? 1 : 0;
    columns.push({ position, top: x, bottom: y, carryIn: carry, total, write: total % 10, carryOut });
    carry = carryOut;
  }
  return columns;
}

/** Lời đọc một cột theo mẫu của SGK: "5 thêm 1 bằng 6; 6 cộng 3 bằng 9, viết 9". */
export function readColumn(column: Column): string {
  const { top, bottom, carryIn, total, write, carryOut } = column;
  const ending = `viết ${write}${carryOut ? " nhớ 1" : ""}`;
  if (top !== null && bottom !== null) {
    return carryIn
      ? `${top} thêm 1 bằng ${top + 1}; ${top + 1} cộng ${bottom} bằng ${total}, ${ending}`
      : `${top} cộng ${bottom} bằng ${total}, ${ending}`;
  }
  const only = top ?? bottom;
  if (only === null) return `Hạ số nhớ 1, viết 1`;
  return carryIn ? `${only} thêm 1 bằng ${total}, ${ending}` : `Chỉ có ${only}, viết ${only}`;
}

/** Lời giải ngắn cho một phép cộng: kết quả và những hàng phải nhớ. */
export function explainColumnAdd(a: number, b: number): string {
  const result = `${formatNumber(a)} + ${formatNumber(b)} = ${formatNumber(a + b)}.`;
  const carried = columnAdd(a, b)
    .filter((column) => column.carryOut)
    .map((column) => PLACE_NAMES[column.position]);
  if (carried.length === 0) return `${result} Không hàng nào cộng được từ 10 trở lên, nên không phải nhớ.`;
  return `${result} Hàng ${carried.join(", ")} cộng được từ 10 trở lên, nên viết chữ số đơn vị và nhớ 1 sang hàng bên trái.`;
}
