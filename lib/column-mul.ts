import { formatNumber } from "@/lib/area-units";
import { digitsOf } from "@/lib/column-add";

export type MulColumn = {
  /** 0 là hàng đơn vị. */
  position: number;
  /** Chữ số của thừa số thứ nhất ở hàng này; null ở cột chỉ có số nhớ hạ xuống. */
  digit: number | null;
  /** Số nhớ từ cột bên phải. */
  carryIn: number;
  /** Chữ số nhân với thừa số thứ hai, cộng số nhớ. */
  total: number;
  /** Chữ số viết xuống. */
  write: number;
  /** Số nhớ sang cột bên trái. */
  carryOut: number;
};

/** Nhân số nhiều chữ số với số có một chữ số, từng cột từ phải sang trái. Số nhớ cuối cùng thành một cột riêng. */
export function columnMul(a: number, b: number): MulColumn[] {
  if (!Number.isInteger(b) || b < 1 || b > 9) throw new Error("Thừa số thứ hai phải có một chữ số");
  const digits = digitsOf(a);
  const columns: MulColumn[] = [];
  let carry = 0;
  for (let position = 0; position < digits.length; position++) {
    const total = digits[position] * b + carry;
    columns.push({ position, digit: digits[position], carryIn: carry, total, write: total % 10, carryOut: Math.floor(total / 10) });
    carry = Math.floor(total / 10);
  }
  if (carry > 0) columns.push({ position: digits.length, digit: null, carryIn: carry, total: carry, write: carry, carryOut: 0 });
  return columns;
}

/** Lời đọc một cột theo mẫu SGK: "8 nhân 6 bằng 48, thêm 4 bằng 52, viết 2 nhớ 5". */
export function readMulColumn(column: MulColumn, b: number): string {
  if (column.digit === null) return `Hạ số nhớ ${column.carryIn}, viết ${column.write}`;
  const ending = `viết ${column.write}${column.carryOut ? ` nhớ ${column.carryOut}` : ""}`;
  const product = column.digit * b;
  return column.carryIn
    ? `${column.digit} nhân ${b} bằng ${product}, thêm ${column.carryIn} bằng ${column.total}, ${ending}`
    : `${column.digit} nhân ${b} bằng ${product}, ${ending}`;
}

/** Lời giải ngắn cho một phép nhân đặt tính. */
export function explainColumnMul(a: number, b: number): string {
  const result = `${formatNumber(a)} × ${b} = ${formatNumber(a * b)}.`;
  const carried = columnMul(a, b).filter((column) => column.digit !== null && column.carryOut > 0);
  if (carried.length === 0) return `${result} Không hàng nào nhân được từ 10 trở lên, nên không phải nhớ.`;
  return `${result} Nhân từng chữ số từ hàng đơn vị, viết chữ số đơn vị của kết quả và nhớ phần chục sang hàng bên trái, rồi nhớ cộng thêm vào tích của hàng đó.`;
}
