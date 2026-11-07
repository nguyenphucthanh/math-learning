export type AreaUnit = "m²" | "dm²" | "cm²" | "mm²";

const SIZE_IN_MM2: Record<AreaUnit, number> = {
  "m²": 1_000_000,
  "dm²": 10_000,
  "cm²": 100,
  "mm²": 1,
};

const LADDER: AreaUnit[] = ["m²", "dm²", "cm²", "mm²"];

/** Viết số có khoảng trắng phân lớp như SGK: 70 000. */
export function formatNumber(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** "70 000", "70.000" và "70000" đều là 70000. Trả về null nếu không phải số. */
export function parseAnswer(raw: string): number | null {
  const cleaned = raw.replace(/[\s .,]/g, "");
  return /^\d+$/.test(cleaned) ? Number(cleaned) : null;
}

/** Tách "3 m² 9 dm²" thành các phần [3, "m²"], [9, "dm²"]. */
export function parseMeasure(text: string): [number, AreaUnit][] {
  const parts = [...text.matchAll(/([\d\s ]*\d)\s*(m²|dm²|cm²|mm²)/g)];
  const consumed = parts.map((part) => part[0]).join(" ").replace(/\s+/g, " ");
  if (parts.length === 0 || consumed !== text.replace(/\s+/g, " ").trim()) {
    throw new Error(`Số đo không hợp lệ: ${text}`);
  }
  return parts.map((part) => [Number(part[1].replace(/[\s ]/g, "")), part[2] as AreaUnit]);
}

/** Đổi một số đo về đơn vị `to`. Báo lỗi nếu kết quả không phải số tự nhiên. */
export function convertArea(text: string, to: AreaUnit): number {
  const totalMm2 = parseMeasure(text).reduce((sum, [value, unit]) => sum + value * SIZE_IN_MM2[unit], 0);
  const result = totalMm2 / SIZE_IN_MM2[to];
  if (!Number.isInteger(result)) throw new Error(`${text} không đổi được thành số tự nhiên ${to}`);
  return result;
}

function bigger(unit: AreaUnit): AreaUnit {
  return LADDER[LADDER.indexOf(unit) - 1];
}

function smaller(unit: AreaUnit): AreaUnit {
  return LADDER[LADDER.indexOf(unit) + 1];
}

/** Đẳng thức cần nhớ, ví dụ "1 m² = 100 dm²". */
export function conversionHint(text: string, to: AreaUnit): string {
  const [[, first]] = parseMeasure(text);
  if (SIZE_IN_MM2[first] < SIZE_IN_MM2[to]) {
    return `Nhớ lại: 100 ${first} = 1 ${bigger(first)}.`;
  }
  return `Nhớ lại: 1 ${first} = 100 ${smaller(first)}.`;
}

/** Lời giải từng bước cho một phép đổi. */
export function explainConversion(text: string, to: AreaUnit): string {
  const parts = parseMeasure(text);
  const [firstValue, firstUnit] = parts[0];

  if (SIZE_IN_MM2[firstUnit] < SIZE_IN_MM2[to]) {
    return `${formatNumber(firstValue)} : 100 = ${formatNumber(convertArea(text, to))}, nên ${text} = ${formatNumber(convertArea(text, to))} ${to}.`;
  }

  if (parts.length === 1) {
    const chain: string[] = [text];
    let unit = firstUnit;
    let value = firstValue;
    while (unit !== to) {
      value *= 100;
      unit = smaller(unit);
      chain.push(`${formatNumber(value)} ${unit}`);
    }
    return chain.length > 2 ? `Đổi từng bậc: ${chain.join(" = ")}.` : `${chain.join(" = ")}.`;
  }

  const whole = convertArea(`${firstValue} ${firstUnit}`, to);
  const [restValue] = parts[1];
  return `${firstValue} ${firstUnit} = ${formatNumber(whole)} ${to}. Cộng thêm ${formatNumber(restValue)} ${to}: ${formatNumber(whole)} + ${formatNumber(restValue)} = ${formatNumber(whole + restValue)} ${to}.`;
}
