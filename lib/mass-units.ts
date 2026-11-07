import { formatNumber } from "./area-units";

export type MassUnit = "kg" | "yến" | "tạ" | "tấn";

/** Mỗi bậc gấp 10 lần bậc liền trước: kg → yến → tạ → tấn. */
export const MASS_LADDER: MassUnit[] = ["kg", "yến", "tạ", "tấn"];

const SIZE_IN_KG: Record<MassUnit, number> = {
  kg: 1,
  yến: 10,
  tạ: 100,
  tấn: 1000,
};

/** Tách "4 yến 5 kg" thành [4, "yến"], [5, "kg"]. */
export function parseMass(text: string): [number, MassUnit][] {
  const parts = [...text.matchAll(/([\d\s]*\d)\s*(kg|yến|tạ|tấn)/g)];
  const consumed = parts.map((part) => part[0].trim()).join(" ").replace(/\s+/g, " ");
  if (parts.length === 0 || consumed !== text.replace(/\s+/g, " ").trim()) {
    throw new Error(`Số đo không hợp lệ: ${text}`);
  }
  return parts.map((part) => [Number(part[1].replace(/\s/g, "")), part[2] as MassUnit]);
}

/** Số kg của một số đo, kể cả số đo ghép. */
export function toKg(text: string): number {
  return parseMass(text).reduce((sum, [value, unit]) => sum + value * SIZE_IN_KG[unit], 0);
}

/** Đổi một số đo về đơn vị `to`. Báo lỗi nếu kết quả không phải số tự nhiên. */
export function convertMass(text: string, to: MassUnit): number {
  const result = toKg(text) / SIZE_IN_KG[to];
  if (!Number.isInteger(result)) throw new Error(`${text} không đổi được thành số tự nhiên ${to}`);
  return result;
}

/** Đẳng thức cần nhớ, ví dụ "1 tấn = 100 yến". */
export function massHint(text: string, to: MassUnit): string {
  const [[, first]] = parseMass(text);
  const bigger = SIZE_IN_KG[first] >= SIZE_IN_KG[to] ? first : to;
  const smaller = bigger === first ? to : first;
  if (bigger === smaller) throw new Error(`Không có đẳng thức cho ${text} → ${to}`);
  return `Nhớ lại: 1 ${bigger} = ${SIZE_IN_KG[bigger] / SIZE_IN_KG[smaller]} ${smaller}.`;
}

/** Lời giải từng bước cho một phép đổi. */
export function explainMass(text: string, to: MassUnit): string {
  const parts = parseMass(text);
  const [firstValue, firstUnit] = parts[0];
  const answer = formatNumber(convertMass(text, to));

  if (parts.length > 1) {
    const whole = convertMass(`${firstValue} ${firstUnit}`, to);
    const [restValue, restUnit] = parts[1];
    const rest = convertMass(`${restValue} ${restUnit}`, to);
    return `${firstValue} ${firstUnit} = ${formatNumber(whole)} ${to}. Cộng thêm ${formatNumber(rest)} ${to}: ${formatNumber(whole)} + ${formatNumber(rest)} = ${answer} ${to}.`;
  }

  if (SIZE_IN_KG[firstUnit] > SIZE_IN_KG[to]) {
    const factor = SIZE_IN_KG[firstUnit] / SIZE_IN_KG[to];
    if (firstValue === 1) return `1 ${firstUnit} = ${answer} ${to}.`;
    return `${firstValue} × ${formatNumber(factor)} = ${answer}, nên ${text} = ${answer} ${to}.`;
  }
  const factor = SIZE_IN_KG[to] / SIZE_IN_KG[firstUnit];
  return `${formatNumber(firstValue)} : ${formatNumber(factor)} = ${answer}, nên ${text} = ${answer} ${to}.`;
}
