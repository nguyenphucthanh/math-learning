import { formatNumber } from "./area-units";
import { digitAt, hangName, MAX_POSITION } from "./hang-lop";

function check(value: number, position: number) {
  if (!Number.isInteger(value) || value < 0) throw new Error(`${value} không phải số tự nhiên`);
  if (!Number.isInteger(position) || position < 1 || position > MAX_POSITION) {
    throw new Error(`Không làm tròn đến hàng ở vị trí ${position}`);
  }
}

/**
 * Làm tròn đến hàng ở vị trí `position` (0 là hàng đơn vị, 5 là hàng trăm nghìn).
 * Chữ số ngay bên phải hàng đó bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên.
 */
export function roundToPlace(value: number, position: number): number {
  check(value, position);
  const unit = 10 ** position;
  const rest = value % unit;
  const down = value - rest;
  return rest * 2 >= unit ? down + unit : down;
}

/** Chữ số quyết định: chữ số ở hàng ngay bên phải hàng làm tròn. */
export function decidingDigit(value: number, position: number): number {
  check(value, position);
  return digitAt(value, position - 1);
}

/** Làm tròn lên hay xuống. */
export function roundDirection(value: number, position: number): "lên" | "xuống" {
  return decidingDigit(value, position) < 5 ? "xuống" : "lên";
}

export function roundHint(position: number): string {
  check(1, position);
  return `Làm tròn đến ${hangName(position)}: nhìn chữ số ở ${hangName(position - 1)}, ngay bên phải, rồi so với 5.`;
}

export function explainRound(value: number, position: number): string {
  const digit = decidingDigit(value, position);
  const verdict = digit < 5 ? "bé hơn 5 nên làm tròn xuống" : digit === 5 ? "bằng 5 nên làm tròn lên" : "lớn hơn 5 nên làm tròn lên";
  const text = formatNumber(value);
  return `Chữ số ${hangName(position - 1)} của ${text} là ${digit}, ${verdict}: ${text} ≈ ${formatNumber(roundToPlace(value, position))}.`;
}
