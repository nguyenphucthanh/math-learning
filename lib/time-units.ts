import { formatNumber } from "./area-units";

export type TimeUnit = "giây" | "phút" | "giờ" | "ngày" | "tuần" | "năm" | "thế kỉ";

/**
 * Hai họ đơn vị không đổi lẫn được: một năm có 365 hoặc 366 ngày.
 * Mỗi đơn vị trỏ tới đơn vị nhỏ liền dưới và số lần gấp.
 */
const STEPS: Partial<Record<TimeUnit, { smaller: TimeUnit; factor: number }>> = {
  phút: { smaller: "giây", factor: 60 },
  giờ: { smaller: "phút", factor: 60 },
  ngày: { smaller: "giờ", factor: 24 },
  tuần: { smaller: "ngày", factor: 7 },
  "thế kỉ": { smaller: "năm", factor: 100 },
};

/** Số lần `unit` gấp `base`, hoặc null nếu `base` không nhỏ hơn hay khác họ với `unit`. */
function ratio(unit: TimeUnit, base: TimeUnit): number | null {
  let current = unit;
  let result = 1;
  while (current !== base) {
    const step = STEPS[current];
    if (!step) return null;
    result *= step.factor;
    current = step.smaller;
  }
  return result;
}

/** Tách "2 phút 11 giây" thành [2, "phút"], [11, "giây"]. */
export function parseTime(text: string): [number, TimeUnit][] {
  const parts = [...text.matchAll(/([\d\s]*\d)\s*(giây|phút|giờ|ngày|tuần|năm|thế kỉ)/g)];
  const consumed = parts.map((part) => part[0].trim()).join(" ").replace(/\s+/g, " ");
  if (parts.length === 0 || consumed !== text.replace(/\s+/g, " ").trim()) {
    throw new Error(`Số đo không hợp lệ: ${text}`);
  }
  return parts.map((part) => [Number(part[1].replace(/\s/g, "")), part[2] as TimeUnit]);
}

/** Đổi một số đo về đơn vị `to`. Báo lỗi nếu khác họ hoặc kết quả không phải số tự nhiên. */
export function convertTime(text: string, to: TimeUnit): number {
  const total = parseTime(text).reduce((sum, [value, unit]) => {
    const down = ratio(unit, to);
    if (down !== null) return sum + value * down;
    const up = ratio(to, unit);
    if (up === null) throw new Error(`Không đổi được ${unit} sang ${to}`);
    return sum + value / up;
  }, 0);
  if (!Number.isInteger(total)) throw new Error(`${text} không đổi được thành số tự nhiên ${to}`);
  return total;
}

/** Đẳng thức cần nhớ, ví dụ "1 phút = 60 giây". */
export function timeHint(text: string, to: TimeUnit): string {
  const [[, first]] = parseTime(text);
  const bigger = ratio(first, to) !== null ? first : to;
  const step = STEPS[bigger];
  if (!step) throw new Error(`Không có đẳng thức cho ${bigger}`);
  return `Nhớ lại: 1 ${bigger} = ${step.factor} ${step.smaller}.`;
}

/** Lời giải từng bước cho một phép đổi. */
export function explainTime(text: string, to: TimeUnit): string {
  const parts = parseTime(text);
  const [firstValue, firstUnit] = parts[0];
  const answer = formatNumber(convertTime(text, to));

  if (parts.length > 1) {
    const whole = convertTime(`${firstValue} ${firstUnit}`, to);
    const rest = parts[1][0];
    return `${firstValue} ${firstUnit} = ${formatNumber(whole)} ${to}. Cộng thêm ${rest} ${to}: ${formatNumber(whole)} + ${rest} = ${answer} ${to}.`;
  }

  const down = ratio(firstUnit, to);
  if (down === null) {
    return `${formatNumber(firstValue)} : ${ratio(to, firstUnit)} = ${answer}, nên ${text} = ${answer} ${to}.`;
  }
  if (firstValue === 1) return `1 ${firstUnit} = ${answer} ${to}.`;
  return `${firstValue} × ${down} = ${answer}, nên ${text} = ${answer} ${to}.`;
}

/** Thế kỉ của một năm. Năm tròn trăm là năm cuối của thế kỉ: 2000 thuộc thế kỉ 20. */
export function centuryOf(year: number): number {
  if (!Number.isInteger(year) || year < 1) throw new Error(`Năm không hợp lệ: ${year}`);
  return Math.ceil(year / 100);
}

/** Năm đầu và năm cuối của một thế kỉ: thế kỉ 20 là [1901, 2000]. */
export function centuryRange(century: number): [number, number] {
  return [(century - 1) * 100 + 1, century * 100];
}

/** Số La Mã theo cách viết của SGK. Bài này chỉ cần đến thế kỉ XXI. */
export function toRoman(value: number): string {
  if (!Number.isInteger(value) || value < 1 || value > 39) throw new Error(`Ngoài phạm vi: ${value}`);
  const tens = "X".repeat(Math.floor(value / 10));
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"][value % 10];
  return tens + ones;
}

/** Số năm từ đầu năm `from` đến hết năm `to`, tính cả hai đầu. */
export function countYears(from: number, to: number): number {
  return to - from + 1;
}
