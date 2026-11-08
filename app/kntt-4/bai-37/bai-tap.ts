import type { ChoiceQuestion, DatTinhQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { BangHangLop } from "@/components/math/bang-hang-lop";
import { convertArea, conversionHint, explainConversion, formatNumber, type AreaUnit } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { explainColumnSub } from "@/lib/column-sub";
import { docSo } from "@/lib/doc-so";
import { explainMass, massHint, toKg, type MassUnit } from "@/lib/mass-units";
import { createElement } from "react";
import { BangGiay, bangGiay, hiddenValues } from "./_illustrations/bang-giay";
import { BangThongKe } from "./_illustrations/bang-thong-ke";
import { HinhThoiBinhHanh } from "./_illustrations/hinh-thoi";
import { monThi, tongBac, tongDong, tongVang } from "./_illustrations/thong-ke";

const n = formatNumber;
const AREA_UNITS: string[] = ["m²", "dm²", "cm²", "mm²"];

/** Đặt đáp án đúng vào vị trí `at` trong danh sách lựa chọn, để đáp án không luôn đứng đầu. */
function withCorrect(correct: string, wrong: string[], at: number): { options: string[]; answerIndex: number } {
  const options = [...wrong];
  options.splice(at, 0, correct);
  return { options, answerIndex: at };
}

/* ------------------------------------------------------------------ số có nhiều chữ số */

const PLACES = [
  "hàng đơn vị, lớp đơn vị",
  "hàng chục, lớp đơn vị",
  "hàng trăm, lớp đơn vị",
  "hàng nghìn, lớp nghìn",
  "hàng chục nghìn, lớp nghìn",
  "hàng trăm nghìn, lớp nghìn",
  "hàng triệu, lớp triệu",
  "hàng chục triệu, lớp triệu",
  "hàng trăm triệu, lớp triệu",
];
const cap = (text: string) => text[0].toUpperCase() + text.slice(1);

/** Vị trí của chữ số (xuất hiện đúng một lần), đếm từ hàng đơn vị là 0. */
export function placeOf(value: number, digit: number): number {
  const text = String(value);
  return text.length - 1 - text.indexOf(String(digit));
}

/** Giá trị của chữ số (xuất hiện đúng một lần) trong số. */
export const digitValue = (value: number, digit: number): number => digit * 10 ** placeOf(value, digit);

function viet(id: string, value: number): FillQuestion {
  const digits = String(value).split("");
  const names = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu"];
  return {
    id,
    kind: "dien-so",
    prompt: "Nhìn bảng hàng và lớp, viết số.",
    parts: ["Số đó là", { answer: value }],
    hint: "Đọc các chữ số từ trái sang phải. Hàng nào trống thì không có chữ số. Viết liền rồi tách lớp, mỗi lớp ba chữ số.",
    explanation: `Các chữ số từ hàng cao xuống thấp là ${digits.join(", ")} (hàng ${names[digits.length - 1]} đến hàng đơn vị), nên số đó là ${n(value)}.`,
    illustration: createElement(BangHangLop, { value }),
  };
}

function doc(id: string, value: number, wrong: string[], at: number): ChoiceQuestion {
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Số ${n(value)} đọc là:`,
    ...withCorrect(docSo(value), wrong, at),
    hint: "Đọc từng lớp từ trái sang phải, đọc xong mỗi lớp thì đọc tên lớp. Hàng có chữ số 0 vẫn phải đọc.",
    explanation: `${n(value)} đọc là: ${docSo(value)}.`,
  };
}

function hangLop(id: string, value: number, digit: number, at: number): ChoiceQuestion {
  const p = placeOf(value, digit);
  const wrong = [p + 1, p - 1, p + 3, p - 2, p + 2].filter((index) => index >= 0 && index < PLACES.length).slice(0, 3);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Trong số ${n(value)}, chữ số ${digit} ở hàng nào, lớp nào?`,
    ...withCorrect(cap(PLACES[p]), wrong.map((index) => cap(PLACES[index])), at),
    hint: "Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu.",
    explanation: `Chữ số ${digit} đứng ở ${PLACES[p]}, nên giá trị của nó là ${n(digitValue(value, digit))}.`,
  };
}

function giaTri(id: string, digit: number, values: number[]): WordQuestion {
  return {
    id,
    kind: "loi-van",
    prompt: `Nêu giá trị của chữ số ${digit} trong mỗi số sau.`,
    lines: values.map((value) => [`${n(value)}:`, { answer: digitValue(value, digit) }]),
    hint: "Chữ số đó đứng ở hàng nào? Giá trị của nó là chữ số nhân với giá trị của hàng.",
    explanation: values.map((value) => `Trong ${n(value)}, chữ số ${digit} ở ${PLACES[placeOf(value, digit)].split(",")[0]} nên có giá trị ${n(digitValue(value, digit))}.`).join(" "),
  };
}

function sapXep(id: string, values: number[], order: "tang" | "giam"): FillQuestion {
  const sorted = [...values].sort((a, b) => (order === "tang" ? a - b : b - a));
  const sign = order === "tang" ? "<" : ">";
  const parts: FillQuestion["parts"] = [];
  sorted.forEach((value, index) => {
    if (index > 0) parts.push(sign);
    parts.push({ answer: value });
  });
  return {
    id,
    kind: "dien-so",
    prompt: `Sắp xếp các số ${values.map(n).join("; ")} theo thứ tự từ ${order === "tang" ? "bé đến lớn" : "lớn đến bé"}.`,
    parts,
    hint: "Số có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từng hàng từ trái sang phải. Tìm số đứng đầu trước rồi tìm tiếp.",
    explanation: `Thứ tự từ ${order === "tang" ? "bé đến lớn" : "lớn đến bé"}: ${sorted.map(n).join(` ${sign} `)}.`,
  };
}

/* ------------------------------------------------------------------ phép tính */

const ADD_HINT = "Cộng từ hàng đơn vị sang trái. Hàng nào cộng được từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng bên trái.";
const SUB_HINT =
  "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.";

const add = (id: string, a: number, b: number): DatTinhQuestion => ({ id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) });
const sub = (id: string, a: number, b: number): DatTinhQuestion => ({ id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) });

/** Nhân hoặc chia số có nhiều chữ số với số có một chữ số. Phép chia phải chia hết. Đáp án tính từ hai số. */
export function mulDiv(id: string, a: number, op: "×" | ":", b: number): FillQuestion {
  const result = op === "×" ? a * b : a / b;
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính (con đặt tính trên giấy, rồi điền kết quả).",
    parts: [`${n(a)} ${op} ${b} =`, { answer: result }],
    hint:
      op === "×"
        ? "Nhân từ hàng đơn vị sang trái. Nhớ cộng số nhớ vào tích của hàng kế tiếp."
        : "Chia từ hàng cao nhất. Mỗi lần: chia, nhân, trừ, rồi hạ chữ số kế tiếp xuống.",
    explanation: `${n(a)} ${op} ${b} = ${n(result)}.`,
  };
}

/** Biểu thức 1: a : (b − c) + d. */
export const bieuThuc1 = { a: 64080, b: 9, c: 5, d: 200037 };
/** Biểu thức 2: a + b × c. */
export const bieuThuc2 = { a: 35000, b: 8025, c: 4 };

const e1 = bieuThuc1;
const e1Result = e1.a / (e1.b - e1.c) + e1.d;
const e2 = bieuThuc2;
const e2Result = e2.a + e2.b * e2.c;

/* ------------------------------------------------------------------ đo lường */

const SIGNS = [">", "<", "="];
const signOf = (left: number, right: number) => (left > right ? ">" : left < right ? "<" : "=");

/** So sánh hai số đo: `lv` và `rv` là hai số đo đã đổi về cùng một đơn vị `unit`. */
export function cmp(id: string, left: string, right: string, lv: number, rv: number, unit: string, hint: string): ChoiceQuestion {
  return {
    id,
    kind: "trac-nghiem",
    prompt: `${left} ? ${right}`,
    options: SIGNS,
    answerIndex: SIGNS.indexOf(signOf(lv, rv)),
    hint,
    explanation: `Đổi về cùng đơn vị ${unit}: ${left} = ${n(lv)} ${unit}, ${right} = ${n(rv)} ${unit}. Vì ${n(lv)} ${signOf(lv, rv)} ${n(rv)} nên dấu cần điền là ${signOf(lv, rv)}.`,
  };
}

const SAME_UNIT_HINT = "Tính vế có phép tính trước, rồi đổi cả hai vế về cùng một đơn vị.";

/** Câu đổi đơn vị diện tích hoặc khối lượng. */
function conv(id: string, source: string, to: AreaUnit | MassUnit, answer: number): FillQuestion {
  const area = AREA_UNITS.includes(to);
  return {
    id,
    kind: "dien-so",
    parts: [`${source} =`, { answer }, to],
    conversion: { source, to },
    hint: area ? conversionHint(source, to as AreaUnit) : massHint(source, to as MassUnit),
    explanation: area ? explainConversion(source, to as AreaUnit) : explainMass(source, to as MassUnit),
  };
}

/** Chọn số đo lớn nhất hoặc bé nhất. `values` đã đổi về cùng đơn vị, theo thứ tự A, B, C. */
function pick(id: string, prompt: string, measures: string[], values: number[], unit: string, which: "lon" | "be"): ChoiceQuestion {
  const target = which === "lon" ? Math.max(...values) : Math.min(...values);
  const letters = ["A", "B", "C"];
  return {
    id,
    kind: "trac-nghiem",
    prompt: `${prompt} ${measures.map((measure, index) => `${letters[index]}. ${measure}`).join("; ")}.`,
    options: letters.slice(0, measures.length).map((letter, index) => `${letter}. ${measures[index]}`),
    answerIndex: values.indexOf(target),
    hint: "Số đo ghi bằng nhiều đơn vị khác nhau. Đổi tất cả về cùng một đơn vị rồi so sánh.",
    explanation: `Đổi về ${unit}: ${measures.map((measure, index) => `${measure} = ${n(values[index])} ${unit}`).join("; ")}. Số ${which === "lon" ? "lớn" : "bé"} nhất là ${n(target)} ${unit}, ứng với ${letters[values.indexOf(target)]}.`,
  };
}

/** Ba hình có diện tích ghi bằng đơn vị khác nhau (bài 2a tr. 128, đổi số liệu). */
export const dienTichBa = ["1 m² 9 cm²", "100 dm² 500 mm²", "1 m² 700 mm²"];
/** Ba ô tô chở hàng (bài 2b tr. 128, đổi số liệu). */
export const khoiLuongBa = ["290 yến", "2 tấn 8 tạ", "27 tạ 9 yến"];

/* ------------------------------------------------------------------ bài toán lời văn */

export const vuon = { rong: 30, gap: 3, cua: 5 };
export const lopHoc = { boi: 180, bong: 72, lop: 6 };
export const muoi = { tan: 6, hon: 6 };
export const caySo = { tong: 840, hon: 60 };

const vuonDai = vuon.rong * vuon.gap;
const vuonChuVi = (vuon.rong + vuonDai) * 2;
const muoiTa = muoi.tan * 10;
const muoiXe2 = (muoiTa - muoi.hon) / 2;
const chuoi = (caySo.tong - caySo.hon) / 2;

/* ------------------------------------------------------------------ thống kê, số chẵn lẻ */

const monVang = [...monThi].sort((a, b) => (b.vang ?? 0) - (a.vang ?? 0))[0];
const dienKinh = monThi.find((item) => item.mon === "Điền kinh")!;
const dienKinhTong = (dienKinh.vang ?? 0) + (dienKinh.bac ?? 0) + (dienKinh.dong ?? 0);
const hiddenNumbers = hiddenValues(bangGiay);
const evenCount = hiddenNumbers.filter((value) => value % 2 === 0).length;

/* ------------------------------------------------------------------ hình học */

const trueFalse = (id: string, statement: string, correct: boolean, hint: string, explanation: string): ChoiceQuestion => ({
  id,
  kind: "trac-nghiem",
  prompt: statement,
  options: ["Đúng", "Sai"],
  answerIndex: correct ? 0 : 1,
  hint,
  explanation,
  illustration: createElement(HinhThoiBinhHanh),
});

/** Câu thử trong phần Nhắc lại nhanh, mỗi điểm một câu. Không tính vào tiến độ. */
export const quickChecks = {
  hangLop: hangLop("qc-hang-lop", 5270316, 7, 0),
  doc: doc(
    "qc-doc",
    1400080,
    ["một triệu bốn mươi nghìn không trăm tám mươi", "một triệu bốn trăm nghìn tám trăm", "một triệu bốn trăm nghìn không trăm linh tám"],
    1,
  ),
  soSanh: {
    id: "qc-so-sanh",
    kind: "trac-nghiem",
    prompt: "Số nào lớn nhất?",
    options: [n(9999), n(10001), n(9899)],
    answerIndex: [9999, 10001, 9899].indexOf(Math.max(9999, 10001, 9899)),
    hint: "Đếm số chữ số của mỗi số trước. Số có nhiều chữ số hơn thì lớn hơn.",
    explanation: `${n(10001)} có 5 chữ số, hai số kia chỉ có 4 chữ số, nên ${n(10001)} lớn nhất.`,
  },
  catTru: sub("qc-cat-tru", 6004, 2587),
  bieuThuc: {
    id: "qc-bieu-thuc",
    kind: "dien-so",
    prompt: "Tính giá trị của biểu thức.",
    parts: ["20 + 4 × 5 =", { answer: 20 + 4 * 5 }],
    hint: "Biểu thức có cộng và nhân: nhân trước, cộng sau.",
    explanation: "4 × 5 = 20, rồi 20 + 20 = 40.",
  },
  khoiLuong: conv("qc-khoi-luong", "3 tấn", "tạ", 30),
  dienTich: conv("qc-dien-tich", "2 m²", "dm²", 200),
  hinhThoi: {
    id: "qc-hinh-thoi",
    kind: "trac-nghiem",
    prompt: "Hình thoi có đặc điểm nào?",
    options: ["Có bốn góc vuông", "Có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau", "Chỉ có một cặp cạnh song song"],
    answerIndex: 1,
    hint: "Hình thoi là hình bình hành đặc biệt. Nhớ hình có hai cặp cạnh đối song song, rồi nghĩ thêm về độ dài cạnh.",
    explanation: "Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau. Bốn góc vuông là đặc điểm của hình chữ nhật.",
  },
  tongHieu: {
    id: "qc-tong-hieu",
    kind: "dien-so",
    prompt: "Tổng của hai số là 20, hiệu của hai số là 4.",
    parts: ["Số bé là", { answer: (20 - 4) / 2 }],
    hint: "Số bé = (tổng − hiệu) : 2.",
    explanation: "(20 − 4) : 2 = 8. Số lớn là 8 + 4 = 12.",
  },
  chuVi: {
    id: "qc-chu-vi",
    kind: "dien-so",
    prompt: "Hình chữ nhật có chiều dài 8 m, chiều rộng 5 m.",
    parts: ["Chu vi là", { answer: (8 + 5) * 2 }, "m"],
    hint: "Chu vi = (chiều dài + chiều rộng) × 2.",
    explanation: "(8 + 5) × 2 = 26 m.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "so-lop-trieu",
    title: "Số đến lớp triệu (trang 127)",
    questions: [
      viet("sl-viet-1", 4352781),
      viet("sl-viet-2", 2090506),
      viet("sl-viet-3", 183047),
      doc(
        "sl-doc-1",
        3080215,
        ["ba triệu tám trăm nghìn hai trăm mười lăm", "ba triệu không trăm tám mươi nghìn hai trăm năm mươi mốt", "ba trăm linh tám nghìn hai trăm mười lăm"],
        2,
      ),
      doc(
        "sl-doc-2",
        906054,
        ["chín trăm sáu mươi nghìn không trăm năm mươi tư", "chín trăm linh sáu nghìn năm trăm linh tư", "chín mươi nghìn sáu trăm năm mươi tư"],
        0,
      ),
      hangLop("sl-hang-1", 6387214, 7, 1),
      hangLop("sl-hang-2", 7301650, 7, 3),
      hangLop("sl-hang-3", 925740, 7, 2),
      giaTri("sl-gia-tri", 8, [12805, 1580342, 38674, 8215970, 270081]),
      sapXep("sl-xep-1", [4371, 3417, 4173, 3741], "tang"),
      sapXep("sl-xep-2", [31205, 9999, 30512, 13250], "giam"),
    ],
  },
  {
    id: "phep-tinh",
    title: "Cộng, trừ, nhân, chia (trang 127, 128, 130)",
    questions: [
      add("pt-1", 4586, 3947),
      add("pt-2", 52394, 38716),
      sub("pt-3", 8203, 3548),
      sub("pt-4", 71305, 46829),
      mulDiv("pt-5", 31245, "×", 3),
      mulDiv("pt-6", 7082, "×", 4),
      mulDiv("pt-7", 36915, ":", 5),
      mulDiv("pt-8", 6128, ":", 4),
      {
        id: "pt-bt-1",
        kind: "dien-so",
        prompt: "Tính giá trị của biểu thức.",
        parts: [`${n(e1.a)} : (${e1.b} − ${e1.c}) + ${n(e1.d)} =`, { answer: e1Result }],
        hint: "Có ngoặc thì tính trong ngoặc trước. Sau đó chia, cuối cùng mới cộng.",
        explanation: `Trong ngoặc: ${e1.b} − ${e1.c} = ${e1.b - e1.c}. Chia: ${n(e1.a)} : ${e1.b - e1.c} = ${n(e1.a / (e1.b - e1.c))}. Cộng: ${n(e1.a / (e1.b - e1.c))} + ${n(e1.d)} = ${n(e1Result)}.`,
      },
      {
        id: "pt-bt-2",
        kind: "dien-so",
        prompt: "Tính giá trị của biểu thức.",
        parts: [`${n(e2.a)} + ${n(e2.b)} × ${e2.c} =`, { answer: e2Result }],
        hint: "Biểu thức có cộng và nhân: nhân trước, cộng sau.",
        explanation: `Nhân: ${n(e2.b)} × ${e2.c} = ${n(e2.b * e2.c)}. Cộng: ${n(e2.a)} + ${n(e2.b * e2.c)} = ${n(e2Result)}.`,
      },
    ],
  },
  {
    id: "do-luong",
    title: "Đo lường (trang 128, 130)",
    unit: "m2",
    questions: [
      pick("dl-1", "Số đo diện tích của ba hình là:", dienTichBa, dienTichBa.map((measure) => convertArea(measure, "mm²")), "mm²", "lon"),
      pick("dl-2", "Ba ô tô chở số cân nặng hàng hoá lần lượt là:", khoiLuongBa, khoiLuongBa.map(toKg), "kg", "be"),
      cmp("dl-3", "1 m² 24 dm²", "38 dm² + 76 dm²", convertArea("1 m² 24 dm²", "dm²"), 38 + 76, "dm²", SAME_UNIT_HINT),
      cmp("dl-4", "120 mm² × 3", "4 cm²", 120 * 3, convertArea("4 cm²", "mm²"), "mm²", SAME_UNIT_HINT),
      cmp("dl-5", "7 tạ + 5 tạ", "120 yến", toKg("7 tạ") + toKg("5 tạ"), toKg("120 yến"), "kg", SAME_UNIT_HINT),
      cmp("dl-6", "3 tấn 400 kg", "7 000 kg : 2", toKg("3 tấn 400 kg"), 7000 / 2, "kg", SAME_UNIT_HINT),
    ],
  },
  {
    id: "so-chan-le",
    title: "Số chẵn, số lẻ (trang 129)",
    questions: [
      {
        id: "sc-1",
        kind: "trac-nghiem",
        prompt: "Trên các băng giấy có 6 ô có dấu “?”. Trong các ô đó có:",
        options: ["1 số chẵn", "2 số chẵn", "3 số chẵn", "4 số chẵn"],
        answerIndex: evenCount - 1,
        hint: "Các số trên mỗi băng giấy liền nhau, mỗi ô hơn hoặc kém ô bên cạnh 1. Tìm số ở mỗi ô “?”, rồi xem chữ số tận cùng.",
        explanation: `Các số ở ô “?” là ${hiddenNumbers.join(", ")}. Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8, nên có ${evenCount} số chẵn.`,
        illustration: createElement(BangGiay),
      },
      {
        id: "sc-2",
        kind: "dien-so",
        prompt: "Băng giấy dưới cùng có ba ô “?” liền nhau.",
        parts: ["Ba số đó là", { answer: hiddenNumbers[3] }, ",", { answer: hiddenNumbers[4] }, ",", { answer: hiddenNumbers[5] }],
        hint: "Băng này đi lên: mỗi ô hơn ô bên trái 1.",
        explanation: `Sau 798 là ${hiddenNumbers[3]}, rồi ${hiddenNumbers[4]}, rồi ${hiddenNumbers[5]}.`,
        illustration: createElement(BangGiay),
      },
    ],
  },
  {
    id: "thong-ke",
    title: "Bảng thống kê (trang 129)",
    questions: [
      {
        id: "tk-1",
        kind: "dien-so",
        prompt: "Dựa vào bảng, cho biết tổng số mỗi loại huy chương.",
        parts: ["Vàng:", { answer: tongVang }, "chiếc. Bạc:", { answer: tongBac }, "chiếc. Đồng:", { answer: tongDong }, "chiếc."],
        hint: "Cộng từng cột. Ô trống là không có huy chương, không cộng.",
        explanation: `HCV: ${monThi.map((item) => item.vang ?? 0).filter(Boolean).join(" + ")} = ${tongVang}. HCB: ${monThi.map((item) => item.bac ?? 0).filter(Boolean).join(" + ")} = ${tongBac}. HCĐ: ${monThi.map((item) => item.dong ?? 0).filter(Boolean).join(" + ")} = ${tongDong}.`,
        illustration: createElement(BangThongKe),
      },
      {
        id: "tk-2",
        kind: "trac-nghiem",
        prompt: "Trong các môn thi đấu, môn nào có huy chương vàng nhiều nhất?",
        ...withCorrect(monVang.mon, monThi.filter((item) => item.mon !== monVang.mon && (item.vang ?? 0) > 0).slice(0, 3).map((item) => item.mon), 1),
        hint: "Nhìn cột HCV, tìm số lớn nhất rồi đọc tên môn ở hàng đó.",
        explanation: `Cột HCV có số lớn nhất là ${monVang.vang}, ở môn ${monVang.mon}.`,
        illustration: createElement(BangThongKe),
      },
      {
        id: "tk-3",
        kind: "dien-so",
        prompt: "Môn Điền kinh được tất cả bao nhiêu huy chương?",
        parts: ["Tất cả có", { answer: dienKinhTong }, "huy chương."],
        hint: "Cộng ba số ở hàng Điền kinh: vàng, bạc, đồng.",
        explanation: `${dienKinh.vang} + ${dienKinh.bac} + ${dienKinh.dong} = ${dienKinhTong}.`,
        illustration: createElement(BangThongKe),
      },
    ],
  },
  {
    id: "hinh-hoc",
    title: "Hình học (trang 130)",
    questions: [
      trueFalse(
        "hh-1",
        "EDGH là hình thoi.",
        true,
        "Hình thoi có hai cặp cạnh đối song song và bốn cạnh bằng nhau. Đếm ô để so các cạnh ED, DG, GH, HE.",
        "ED, DG, GH, HE đều đi sang 4 ô và lên hoặc xuống 3 ô, nên bốn cạnh bằng nhau và các cạnh đối song song. EDGH là hình thoi.",
      ),
      trueFalse(
        "hh-2",
        "LDEK là hình bình hành.",
        true,
        "Hình bình hành có hai cặp cạnh đối song song và bằng nhau. So LD với KE, rồi KL với ED.",
        "LD và KE cùng dài 7 ô và nằm ngang. KL và ED cùng đi sang 4 ô, lên 3 ô. Hai cặp cạnh đối song song và bằng nhau, nên LDEK là hình bình hành.",
      ),
      trueFalse(
        "hh-3",
        "KEHI là hình thoi.",
        false,
        "KEHI có hai cặp cạnh đối song song. Còn bốn cạnh có bằng nhau không? So KE với EH.",
        "KE dài 7 ô, còn EH chỉ dài 5 ô (đi sang 4, xuống 3). Bốn cạnh không bằng nhau nên KEHI là hình bình hành, không phải hình thoi.",
      ),
      trueFalse(
        "hh-4",
        "Có 3 đoạn thẳng song song với đoạn thẳng DE.",
        false,
        "Đoạn song song với DE cũng đi sang 4 ô và lên 3 ô (hoặc ngược lại). Tìm các đoạn như vậy trong hình.",
        "Chỉ có KL và HG song song với DE, tức là 2 đoạn thẳng, không phải 3.",
      ),
      {
        id: "hh-5",
        kind: "trac-nghiem",
        prompt: "Đoạn thẳng nào vuông góc với đoạn thẳng LI?",
        options: ["KL", "DE", "LD", "DG"],
        answerIndex: 2,
        hint: "LI đứng thẳng. Đoạn vuông góc với nó nằm ngang. Đoạn nào trong bốn đoạn này nằm ngang?",
        explanation: "LD nằm ngang trên đường ô li, còn LI đứng thẳng, nên LD vuông góc với LI. KL, DE, DG đều nằm nghiêng.",
        illustration: createElement(HinhThoiBinhHanh),
      },
      {
        id: "hh-6",
        kind: "dien-so",
        prompt: "Trong hình, tìm các đoạn thẳng vuông góc với LI.",
        parts: ["Có", { answer: 3 }, "đoạn thẳng vuông góc với LI."],
        hint: "Đoạn vuông góc với LI nằm ngang. Đếm các đoạn nằm ngang, kể cả đoạn cắt qua LI.",
        explanation: "Các đoạn nằm ngang là LD, KE và IH. KE cắt LI ở giữa nhưng vẫn vuông góc với LI. Vậy có 3 đoạn thẳng.",
        illustration: createElement(HinhThoiBinhHanh),
      },
    ],
  },
  {
    id: "bai-toan",
    title: "Giải toán (trang 127, 128, 129, 130)",
    questions: [
      {
        id: "bt-vuon",
        kind: "loi-van",
        prompt: `Một khu vườn hình chữ nhật có chiều rộng ${vuon.rong} m, chiều dài gấp ${vuon.gap} lần chiều rộng. Người ta làm hàng rào xung quanh khu vườn và để cửa vào rộng ${vuon.cua} m. Hỏi hàng rào dài bao nhiêu mét?`,
        lines: [
          [`Chiều dài: ${vuon.rong} × ${vuon.gap} =`, { answer: vuonDai }, "(m)"],
          [`Chu vi: (${vuon.rong} + ${vuonDai}) × 2 =`, { answer: vuonChuVi }, "(m)"],
          [`Hàng rào: ${vuonChuVi} − ${vuon.cua} =`, { answer: vuonChuVi - vuon.cua }, "(m)"],
        ],
        hint: "Tìm chiều dài trước. Chu vi hình chữ nhật là (dài + rộng) × 2. Chỗ để cửa không làm hàng rào nên trừ đi.",
        explanation: `Chiều dài ${vuon.rong} × ${vuon.gap} = ${vuonDai} m. Chu vi (${vuon.rong} + ${vuonDai}) × 2 = ${vuonChuVi} m. Trừ cửa: ${vuonChuVi} − ${vuon.cua} = ${vuonChuVi - vuon.cua} m.`,
      },
      {
        id: "bt-lop",
        kind: "loi-van",
        prompt: `Trong kì nghỉ hè, trường có ${lopHoc.boi} học sinh học bơi và ${lopHoc.bong} học sinh học bóng đá. Cô giáo chia đều số học sinh của mỗi môn vào ${lopHoc.lop} lớp. Hỏi một lớp học bơi nhiều hơn một lớp học bóng đá bao nhiêu học sinh?`,
        lines: [
          [`Một lớp học bơi: ${lopHoc.boi} : ${lopHoc.lop} =`, { answer: lopHoc.boi / lopHoc.lop }, "(học sinh)"],
          [`Một lớp học bóng đá: ${lopHoc.bong} : ${lopHoc.lop} =`, { answer: lopHoc.bong / lopHoc.lop }, "(học sinh)"],
          [`Hơn nhau: ${lopHoc.boi / lopHoc.lop} − ${lopHoc.bong / lopHoc.lop} =`, { answer: lopHoc.boi / lopHoc.lop - lopHoc.bong / lopHoc.lop }, "(học sinh)"],
        ],
        hint: "Tính số học sinh một lớp của từng môn bằng phép chia, rồi lấy hai số trừ nhau.",
        explanation: `Một lớp học bơi ${lopHoc.boi / lopHoc.lop} học sinh, một lớp học bóng đá ${lopHoc.bong / lopHoc.lop} học sinh. Hơn nhau ${lopHoc.boi / lopHoc.lop - lopHoc.bong / lopHoc.lop} học sinh.`,
      },
      {
        id: "bt-muoi",
        kind: "loi-van",
        prompt: `Một cánh đồng muối thu hoạch được ${muoi.tan} tấn muối. Người ta dùng hai ô tô để chở hết số muối đó về kho. Biết ô tô thứ nhất chở nhiều hơn ô tô thứ hai ${muoi.hon} tạ muối. Hỏi mỗi ô tô chở bao nhiêu tạ muối?`,
        lines: [
          [`Đổi: ${muoi.tan} tấn =`, { answer: muoiTa }, "(tạ)"],
          [`Ô tô thứ hai: (${muoiTa} − ${muoi.hon}) : 2 =`, { answer: muoiXe2 }, "(tạ)"],
          [`Ô tô thứ nhất: ${muoiXe2} + ${muoi.hon} =`, { answer: muoiXe2 + muoi.hon }, "(tạ)"],
        ],
        hint: "Đổi tấn ra tạ trước (1 tấn = 10 tạ). Đây là bài toán biết tổng và hiệu: số bé = (tổng − hiệu) : 2.",
        explanation: `${muoi.tan} tấn = ${muoiTa} tạ. Ô tô thứ hai chở (${muoiTa} − ${muoi.hon}) : 2 = ${muoiXe2} tạ. Ô tô thứ nhất chở ${muoiXe2} + ${muoi.hon} = ${muoiXe2 + muoi.hon} tạ.`,
      },
      {
        id: "bt-cay",
        kind: "loi-van",
        prompt: `Ở bãi đất ven sông, người ta trồng tổng cộng ${caySo.tong} cây ổi và cây chuối. Biết số cây ổi nhiều hơn số cây chuối ${caySo.hon} cây. Hỏi có bao nhiêu cây chuối và bao nhiêu cây ổi?`,
        lines: [
          [`Số cây chuối: (${caySo.tong} − ${caySo.hon}) : 2 =`, { answer: chuoi }, "(cây)"],
          [`Số cây ổi: ${chuoi} + ${caySo.hon} =`, { answer: chuoi + caySo.hon }, "(cây)"],
        ],
        hint: "Biết tổng và hiệu: số bé = (tổng − hiệu) : 2, số lớn = số bé + hiệu. Cây nào là số bé?",
        explanation: `Số cây chuối (số bé) là (${caySo.tong} − ${caySo.hon}) : 2 = ${chuoi}. Số cây ổi là ${chuoi} + ${caySo.hon} = ${chuoi + caySo.hon}. Thử lại: ${chuoi} + ${chuoi + caySo.hon} = ${caySo.tong}.`,
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-1",
        kind: "trac-nghiem",
        prompt: "Bình tính: 35 000 + 8 025 × 4 = 43 025 × 4 = 172 100. Bình sai ở đâu?",
        ...withCorrect("Phải nhân 8 025 × 4 trước, rồi mới cộng với 35 000", ["Phải cộng trước rồi mới nhân, Bình chỉ sai phép nhân", "Phải trừ trước rồi mới nhân"], 1),
        hint: "Biểu thức có cộng và nhân, không có ngoặc. Phép nào được làm trước?",
        explanation: "Biểu thức không có ngoặc thì nhân, chia trước; cộng, trừ sau. Đúng là 8 025 × 4 = 32 100, rồi 35 000 + 32 100 = 67 100.",
      },
      {
        id: "sn-2",
        kind: "trac-nghiem",
        prompt: `Không đặt tính, ước lượng ${n(48960)} + ${n(31080)} gần nhất với số nào?`,
        options: [n(60000), n(80000), n(100000)],
        answerIndex: 1,
        hint: "Làm tròn từng số đến hàng nghìn gần nhất, rồi cộng hai số tròn.",
        explanation: `${n(48960)} gần ${n(49000)}, ${n(31080)} gần ${n(31000)}. Cộng được khoảng ${n(80000)}. Kết quả thật là ${n(48960 + 31080)}.`,
      },
      {
        id: "sn-3",
        kind: "trac-nghiem",
        prompt: `Nam đọc số ${n(3040502)} là “ba triệu bốn trăm nghìn năm trăm linh hai”. Cách đọc đúng là:`,
        ...withCorrect(docSo(3040502), ["ba triệu bốn trăm nghìn năm trăm linh hai", "ba triệu bốn mươi nghìn năm trăm hai mươi"], 2),
        hint: "Lớp nghìn của số này là 040. Đọc nó là bao nhiêu nghìn?",
        explanation: `Lớp triệu là 3, lớp nghìn là 040, lớp đơn vị là 502. Đọc là: ${docSo(3040502)}. Nam đã bỏ sót chữ số 0 ở hàng trăm nghìn.`,
      },
    ],
  },
];
