const DIGITS = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];

/** Đọc một nhóm ba chữ số (0-999). `full` là đọc đủ "không trăm" khi nhóm có hàng trăm bằng 0 (nhóm không đứng đầu). */
function readGroup(value: number, full: boolean): string {
  const hundreds = Math.floor(value / 100);
  const tens = Math.floor((value % 100) / 10);
  const units = value % 10;
  const words: string[] = [];
  if (hundreds > 0 || full) words.push(`${DIGITS[hundreds]} trăm`);
  if (tens === 0) {
    if (units > 0) words.push(`${hundreds > 0 || full ? "linh " : ""}${DIGITS[units]}`);
  } else {
    words.push(tens === 1 ? "mười" : `${DIGITS[tens]} mươi`);
    if (units === 1 && tens > 1) words.push("mốt");
    else if (units === 5) words.push("lăm");
    else if (units === 4 && tens > 1) words.push("tư");
    else if (units > 0) words.push(DIGITS[units]);
  }
  return words.join(" ");
}

/** Đọc số tự nhiên đến lớp tỉ theo cách của SGK, ví dụ 7 060 215 là "bảy triệu không trăm sáu mươi nghìn hai trăm mười lăm". */
export function docSo(value: number): string {
  if (!Number.isInteger(value) || value < 0) throw new Error(`Không đọc được ${value}`);
  if (value === 0) return DIGITS[0];
  const names = ["", "nghìn", "triệu", "tỉ"];
  const groups: number[] = [];
  for (let rest = value; rest > 0; rest = Math.floor(rest / 1000)) groups.unshift(rest % 1000);
  const words: string[] = [];
  groups.forEach((group, index) => {
    if (group === 0) return;
    const name = names[groups.length - 1 - index];
    words.push(`${readGroup(group, index > 0)}${name ? ` ${name}` : ""}`);
  });
  return words.join(" ");
}
