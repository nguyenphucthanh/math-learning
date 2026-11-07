import { formatNumber } from "@/lib/area-units";
import { digitsOf, PLACE_NAMES } from "@/lib/column-add";

export type SubColumn = {
  /** 0 là hàng đơn vị. */
  position: number;
  /** Chữ số của số bị trừ ở hàng này. */
  top: number;
  /** Chữ số của số trừ, null nếu số trừ không có hàng này. */
  bottom: number | null;
  /** 1 nếu cột bên phải đã nhớ 1 sang cột này. */
  borrowIn: 0 | 1;
  /** Chữ số số bị trừ sau khi bớt nhớ. Âm (−1) khi 0 phải bớt 1. */
  after: number;
  /** Chữ số viết xuống. */
  write: number;
  /** 1 nếu cột này phải lấy 10 trừ và nhớ 1 sang cột bên trái. */
  borrowOut: 0 | 1;
};

/** Trừ theo cột từ phải sang trái, giữ lại từng bước. Cần a >= b. */
export function columnSub(a: number, b: number): SubColumn[] {
  if (b > a) throw new Error("Số bị trừ phải không nhỏ hơn số trừ");
  const top = digitsOf(a);
  const bottom = digitsOf(b);
  const columns: SubColumn[] = [];
  let borrow: 0 | 1 = 0;
  for (let position = 0; position < top.length; position++) {
    const y = bottom[position] ?? null;
    const after: number = top[position] - borrow;
    const diff: number = after - (y ?? 0);
    const borrowOut: 0 | 1 = diff < 0 ? 1 : 0;
    columns.push({ position, top: top[position], bottom: y, borrowIn: borrow, after, write: diff + borrowOut * 10, borrowOut });
    borrow = borrowOut;
  }
  return columns;
}

/** Lời đọc một cột theo mẫu của SGK: "9 trừ 1 bằng 8; 8 trừ 4 bằng 4, viết 4". */
export function readSubColumn(column: SubColumn): string {
  const { top, bottom, borrowIn, after, write, borrowOut } = column;
  const ending = `viết ${write}${borrowOut ? " nhớ 1" : ""}`;
  if (bottom === null) {
    if (!borrowIn) return `Chỉ có ${top}, viết ${top}`;
    if (after >= 0) return `${top} trừ 1 bằng ${after}, ${ending}`;
    return `0 không trừ được 1, lấy 10 trừ 1 bằng 9, ${ending}`;
  }
  if (!borrowIn) {
    return borrowOut
      ? `${top} không trừ được ${bottom}, lấy ${top + 10} trừ ${bottom} bằng ${write}, ${ending}`
      : `${top} trừ ${bottom} bằng ${write}, ${ending}`;
  }
  if (after < 0) return `0 không trừ được 1, lấy 10 trừ 1 bằng 9; 9 trừ ${bottom} bằng ${write}, ${ending}`;
  return borrowOut
    ? `${top} trừ 1 bằng ${after}; ${after} không trừ được ${bottom}, lấy ${after + 10} trừ ${bottom} bằng ${write}, ${ending}`
    : `${top} trừ 1 bằng ${after}; ${after} trừ ${bottom} bằng ${write}, ${ending}`;
}

/** Lời giải ngắn cho một phép trừ: kết quả và những hàng phải nhớ. */
export function explainColumnSub(a: number, b: number): string {
  const result = `${formatNumber(a)} − ${formatNumber(b)} = ${formatNumber(a - b)}.`;
  const borrowed = columnSub(a, b)
    .filter((column) => column.borrowOut)
    .map((column) => PLACE_NAMES[column.position]);
  if (borrowed.length === 0) return `${result} Không hàng nào bị trừ quá số có, nên không phải nhớ.`;
  return `${result} Hàng ${borrowed.join(", ")} không trừ được nên lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.`;
}
