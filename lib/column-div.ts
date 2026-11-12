import { formatNumber } from "@/lib/area-units";
import { digitsOf } from "@/lib/column-add";

export type DivStep = {
  /** Chỉ số cột (từ trái, 0 là chữ số đầu tiên của số bị chia) của chữ số cuối cùng được dùng ở bước này. */
  column: number;
  /** Số đang chia ở bước này: số dư trước đó cùng chữ số vừa hạ xuống. */
  current: number;
  /** Chữ số của thương. */
  quotientDigit: number;
  /** Thương nhân số chia. */
  product: number;
  /** Số dư sau bước này. */
  remainder: number;
};

export type Division = { steps: DivStep[]; quotient: number; remainder: number };

/**
 * Chia số nhiều chữ số cho số có một hoặc hai chữ số theo cột (chia viết). Bắt đầu từ nhóm chữ số đầu tiên
 * đủ lớn để chia được, rồi hạ từng chữ số xuống; bước nào chưa chia được thì thương viết 0.
 */
export function columnDiv(a: number, divisor: number): Division {
  if (!Number.isInteger(divisor) || divisor < 1) throw new Error("Số chia phải là số nguyên dương");
  const digits = digitsOf(a).reverse();
  let start = 0;
  let current = digits[0];
  while (current < divisor && start < digits.length - 1) {
    start++;
    current = current * 10 + digits[start];
  }
  const steps: DivStep[] = [];
  let quotient = 0;
  for (let column = start; column < digits.length; column++) {
    if (column > start) current = steps[steps.length - 1].remainder * 10 + digits[column];
    const quotientDigit = Math.floor(current / divisor);
    const product = quotientDigit * divisor;
    steps.push({ column, current, quotientDigit, product, remainder: current - product });
    quotient = quotient * 10 + quotientDigit;
  }
  return { steps, quotient, remainder: steps[steps.length - 1].remainder };
}

/** Lời đọc một bước: "Hạ 3, được 3; 3 chia 4 được 0, viết 0; 0 nhân 4 bằng 0; 3 trừ 0 bằng 3". */
export function readDivStep(step: DivStep, divisor: number, first: boolean): string {
  const intro = first ? `Lấy ${step.current}` : `Hạ chữ số xuống, được ${step.current}`;
  return `${intro}; ${step.current} chia ${divisor} được ${step.quotientDigit}, viết ${step.quotientDigit}; ${step.quotientDigit} nhân ${divisor} bằng ${step.product}; ${step.current} trừ ${step.product} bằng ${step.remainder}.`;
}

/** Lời giải ngắn cho một phép chia có hoặc không có dư. */
export function explainColumnDiv(a: number, divisor: number): string {
  const { quotient, remainder } = columnDiv(a, divisor);
  const result = remainder
    ? `${formatNumber(a)} : ${divisor} = ${formatNumber(quotient)} (dư ${remainder}).`
    : `${formatNumber(a)} : ${divisor} = ${formatNumber(quotient)}.`;
  return `${result} Chia từ hàng cao nhất, hạ từng chữ số xuống; chưa chia được thì viết 0 ở thương. Thử lại: ${formatNumber(quotient)} × ${divisor}${remainder ? ` + ${remainder}` : ""} = ${formatNumber(a)}.`;
}
