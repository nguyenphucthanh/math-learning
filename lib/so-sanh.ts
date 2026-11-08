import { formatNumber } from "./area-units";
import { digitAt, hangName } from "./hang-lop";

export type CompareSign = ">" | "<" | "=";

export type CompareResult = {
  sign: CompareSign;
  /** `so-chu-so`: khác số chữ số. `hang`: cùng số chữ số, khác nhau ở một hàng. `bang`: hai số bằng nhau. */
  by: "so-chu-so" | "hang" | "bang";
  /** Hàng đầu tiên (từ trái sang) mà hai chữ số khác nhau, đếm từ hàng đơn vị (0). Chỉ có khi `by` là `hang`. */
  position?: number;
};

const n = formatNumber;
const digitCount = (value: number) => String(value).length;

/** So sánh hai số tự nhiên theo cách của SGK: nhiều chữ số hơn thì lớn hơn; cùng số chữ số thì so từng cặp từ trái sang phải. */
export function compareNumbers(a: number, b: number): CompareResult {
  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 0 || b < 0) throw new Error(`${a}, ${b} không phải số tự nhiên`);
  const la = digitCount(a);
  const lb = digitCount(b);
  if (la !== lb) return { sign: la > lb ? ">" : "<", by: "so-chu-so" };
  for (let position = la - 1; position >= 0; position -= 1) {
    const da = digitAt(a, position);
    const db = digitAt(b, position);
    if (da !== db) return { sign: da > db ? ">" : "<", by: "hang", position };
  }
  return { sign: "=", by: "bang" };
}

/** Lời giải của một phép so sánh, dùng làm `explanation`. */
export function explainCompare(a: number, b: number): string {
  const { sign, by, position } = compareNumbers(a, b);
  const result = `${n(a)} ${sign} ${n(b)}.`;
  if (by === "bang") return `Hai số giống hệt nhau: ${result}`;
  if (by === "so-chu-so") {
    return `${n(a)} có ${digitCount(a)} chữ số, ${n(b)} có ${digitCount(b)} chữ số. Số có nhiều chữ số hơn thì lớn hơn: ${result}`;
  }
  const length = digitCount(a);
  const same = length - 1 - position! === 0 ? "" : " Các hàng bên trái giống nhau.";
  return `Cùng ${length} chữ số, so từng cặp từ trái sang phải.${same} Đến ${hangName(position!)}: ${digitAt(a, position!)} ${sign} ${digitAt(b, position!)}, nên ${result}`;
}

/** Gợi ý chung cho câu so sánh. */
export const compareHint = "Đếm chữ số trước. Cùng số chữ số thì so từng cặp chữ số từ trái sang phải, dừng ở cặp đầu tiên khác nhau.";

/** Số lớn nhất lập được từ các thẻ chữ số, dùng hết các thẻ: chữ số lớn đứng hàng cao. */
export function largestFrom(cards: number[]): number {
  return Number([...cards].sort((x, y) => y - x).join(""));
}

/** Số bé nhất lập được từ các thẻ chữ số, dùng hết các thẻ: chữ số đầu phải khác 0. */
export function smallestFrom(cards: number[]): number {
  const sorted = [...cards].sort((x, y) => x - y);
  const first = sorted.findIndex((digit) => digit !== 0);
  if (first < 0) return 0;
  const [head] = sorted.splice(first, 1);
  return Number([head, ...sorted].join(""));
}

/** Các số chữ số khi bỏ đi đúng một thẻ: dùng để kiểm tra bằng cách thử hết. */
export function withoutOneCard(cards: number[]): number[][] {
  return cards.map((_, index) => cards.filter((__, other) => other !== index));
}
