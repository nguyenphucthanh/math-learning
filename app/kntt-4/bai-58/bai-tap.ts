import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, Sign, WordQuestion } from "@/components/exercises/types";
import { createElement } from "react";
import { HaiHinh } from "./_illustrations/hai-hinh";

type Row = { left: string; right: string; answer: Sign };
const r = (left: string, right: string, answer: Sign): Row => ({ left, right, answer });

/** Số liệu các câu (đổi so với SGK). Test tính lại mọi dấu và đáp án bằng phép nhân, không so với số gõ tay. */
export const cungMauRows = [r("5/9", "7/9", "<"), r("14/23", "11/23", ">"), r("17/30", "19/30", "<")];
export const hinhSpecs = [
  { a: { kieu: "tron", mau: 6, to: 2 }, b: { kieu: "tron", mau: 6, to: 5 }, answer: "<" },
  { a: { kieu: "bang", mau: 8, to: 6, cot: 4 }, b: { kieu: "bang", mau: 8, to: 3, cot: 4 }, answer: ">" },
] as const;
/** Sắp xếp phân số cùng mẫu số: tử số theo đề, mẫu số chung, thứ tự đúng (tử số). */
export const sapXepSpecs = [
  { tus: [13, 4, 9, 15], mau: 17, order: "bé đến lớn", answer: [4, 9, 13, 15] },
  { tus: [11, 20, 6, 17], mau: 21, order: "lớn đến bé", answer: [20, 17, 11, 6] },
] as const;
export const voiMotRows = [r("9/13", "1", "<"), r("11/8", "1", ">"), r("5/5", "1", "="), r("100/101", "1", "<")];
export const lonHon1 = { options: ["4/9", "9/9", "10/9", "1/9"], answerIndex: 2 };
/** Khác mẫu số, mẫu lớn chia hết cho mẫu bé. */
export const khacMauRows = [
  [r("5/6", "2/3", ">"), r("3/5", "7/10", "<"), r("9/16", "5/8", "<")],
  [r("36/48", "3/4", "="), r("17/18", "8/9", ">"), r("5/12", "1/3", ">")],
];
export const quyDongSpec = { a: 2, b: 3, k: 4, mau: 12, other: "7/12" };
export const ocSen = { names: ["nâu", "vàng", "đen"], lengths: ["5/6", "2/3", "7/12"], answerIndex: 0 };
export const binhNuoc = { names: ["A", "B", "C", "D"], amounts: ["3/4", "7/4", "5/8", "7/8"], answerIndex: 2 };
/** Cân nặng ba bạn thỏ (kg), theo thứ tự đề bài. Bập bênh: nâu > trắng, đen < trắng. */
export const thoSpec = { weights: ["13/2", "21/6", "37/6"], answerIndex: 2 };
export const cungTuRows = [r("4/7", "4/9", ">"), r("7/20", "7/10", "<"), r("5/8", "5/6", "<")];
export const cungTuBay = { options: ["3/8 lớn hơn vì mẫu số 8 lớn hơn", "3/4 lớn hơn vì mẫu số 4 bé hơn", "Hai phân số bằng nhau vì cùng tử số"], answerIndex: 1 };
export const beNhat = { options: ["3/4", "3/8", "3/5"], answerIndex: 1 };

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}

function words(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

function compare(id: string, rows: Row[], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): Question {
  return { id, kind: "so-sanh", prompt: "Chọn >, <, = cho mỗi chỗ trống.", rows, hint, explanation, illustration };
}

/** Khởi động: nhắc tính chất cơ bản của phân số (Bài 55) và đọc phân số. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-1", "Số ?", ["3/4 = (3 × 2)/(4 × 2) =", { answer: 6 }, "/8"], "Nhân cả tử số và mẫu số với 2.", "3 × 2 = 6 và 4 × 2 = 8, vậy 3/4 = 6/8."),
  fill("kd-2", "Số ?", ["5/6 = (5 × 2)/(6 × 2) =", { answer: 10 }, "/12"], "Nhân cả tử số và mẫu số với 2.", "5 × 2 = 10 và 6 × 2 = 12, vậy 5/6 = 10/12."),
  fill("kd-3", "Băng giấy chia 8 phần bằng nhau, tô màu 5 phần. Phân số chỉ phần tô màu là", ["Phân số:", { answer: 5 }, "/", { answer: 8 }], "Tử số là số phần tô màu, mẫu số là số phần bằng nhau của cả băng.", "Tô 5 trong 8 phần bằng nhau, vậy là 5/8."),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  cungMau: compare("thu-cung-mau", [r("7/12", "5/12", ">")], "Hai phân số cùng mẫu số 12. Nhìn tử số.", "Cùng mẫu số, tử số 7 lớn hơn tử số 5 nên 7/12 > 5/12."),
  voiMot: compare("thu-voi-mot", [r("8/9", "1", "<"), r("9/9", "1", "="), r("10/9", "1", ">")], "So tử số với mẫu số.", "8 < 9 nên 8/9 < 1. 9 = 9 nên 9/9 = 1. 10 > 9 nên 10/9 > 1."),
  quyDong: fill("thu-quy-dong", "Quy đồng mẫu số để so sánh 3/5 và 7/10. Số ?", ["3/5 = (3 × 2)/(5 × 2) =", { answer: 6 }, "/10"], "Mẫu số lớn là 10. 5 nhân với mấy thì được 10?", "3/5 = 6/10. So sánh 6/10 và 7/10: 6 < 7 nên 3/5 < 7/10."),
  cungTu: choice("thu-cung-tu", "2/5 và 2/3 có cùng tử số 2. Phân số nào lớn hơn?", ["2/5", "2/3"], 1, "Mẫu số bé hơn thì mỗi phần to hơn. Con nhớ hình thanh phân số.", "Cùng tử số, mẫu số 3 bé hơn mẫu số 5 nên 2/3 > 2/5."),
};

const sapXep = (spec: (typeof sapXepSpecs)[number], id: string): FillQuestion => {
  const asc = spec.order === "bé đến lớn";
  const parts: FillQuestion["parts"] = [];
  spec.answer.forEach((tu, i) => parts.push(i === 0 ? "" : asc ? `/${spec.mau} <` : `/${spec.mau} >`, { answer: tu }));
  parts.push(`/${spec.mau}`);
  return fill(
    id,
    `Sắp xếp các phân số ${spec.tus.map((tu) => `${tu}/${spec.mau}`).join("; ")} theo thứ tự từ ${spec.order}.`,
    parts,
    "Các phân số cùng mẫu số, chỉ cần so các tử số với nhau.",
    `Cùng mẫu số ${spec.mau}, so các tử số: ${spec.answer.join(asc ? " < " : " > ")}. Vậy ${spec.answer.map((tu) => `${tu}/${spec.mau}`).join(asc ? " < " : " > ")}.`,
  );
};

const hinhQs = hinhSpecs.map((s, i) =>
  compare(
    `h-${i + 1}`,
    [r(`${s.a.to}/${s.a.mau}`, `${s.b.to}/${s.b.mau}`, s.answer)],
    "Nhìn hai hình như nhau: hình nào tô nhiều phần hơn?",
    `${s.a.to}/${s.a.mau} ${s.answer} ${s.b.to}/${s.b.mau}: hai hình chia cùng số phần, hình tô nhiều phần hơn thì phân số lớn hơn.`,
    createElement(HaiHinh, { a: s.a, b: s.b }),
  ),
);

const cungMauGroup: Question[] = [
  ...hinhQs,
  compare("cm-1", cungMauRows, "Cùng mẫu số, phân số nào có tử số lớn hơn thì lớn hơn.", "Mỗi hàng cùng mẫu số, ta so tử số: 5 < 7, 14 > 11, 17 < 19."),
  ...sapXepSpecs.map((s, i) => sapXep(s, `sx-${i + 1}`)),
];

const voiMotGroup: Question[] = [
  compare("v-1", voiMotRows, "So tử số với mẫu số. Tử số bé hơn mẫu số thì phân số bé hơn 1.", "9 < 13 nên 9/13 < 1. 11 > 8 nên 11/8 > 1. 5/5 = 1 vì 5 : 5 = 1. 100 < 101 nên 100/101 < 1."),
  choice("v-2", "Phân số nào lớn hơn 1?", lonHon1.options, lonHon1.answerIndex, "Phân số lớn hơn 1 có tử số lớn hơn mẫu số.", "Chỉ 10/9 có tử số 10 lớn hơn mẫu số 9, nên 10/9 > 1. 9/9 = 1; 4/9 và 1/9 bé hơn 1."),
];

const khacMauQs: Question[] = [
  words(
    "q-1",
    "Quy đồng mẫu số để so sánh 2/3 và 7/12.",
    [["2/3 = (2 × 4)/(3 × 4) =", { answer: quyDongSpec.a * quyDongSpec.k }, "/12"]],
    "Mẫu số lớn là 12. 3 nhân với mấy thì được 12? Nhân cả tử số với số đó.",
    "2/3 = 8/12. So sánh 8/12 và 7/12: 8 > 7 nên 2/3 > 7/12.",
  ),
  ...khacMauRows.map((rows, i) =>
    compare(`km-${i + 1}`, rows, "Quy đồng mẫu số: đổi phân số có mẫu số bé về mẫu số của phân số kia, rồi so sánh tử số.", i === 0 ? "5/6 so với 4/6: 5/6 > 2/3. 3/5 = 6/10 < 7/10. 5/8 = 10/16 nên 9/16 < 5/8." : "3/4 = 36/48 nên hai phân số bằng nhau. 8/9 = 16/18 < 17/18. 1/3 = 4/12 < 5/12."),
  ),
  choice(
    "km-3",
    `Ba ốc sên bò tới cây hoa: ốc sên nâu ${ocSen.lengths[0]} m, ốc sên vàng ${ocSen.lengths[1]} m, ốc sên đen ${ocSen.lengths[2]} m. Ốc sên nào bò đoạn đường dài nhất?`,
    ocSen.names.map((name, i) => `Ốc sên ${name} (${ocSen.lengths[i]} m)`),
    ocSen.answerIndex,
    "Quy đồng ba phân số về mẫu số 12.",
    "5/6 = 10/12; 2/3 = 8/12; 7/12. Ta có 10/12 > 8/12 > 7/12. Ốc sên nâu bò dài nhất.",
  ),
  choice(
    "km-4",
    `Lượng nước trong bốn bình (lít): A ${binhNuoc.amounts[0]}; B ${binhNuoc.amounts[1]}; C ${binhNuoc.amounts[2]}; D ${binhNuoc.amounts[3]}. Bình nào có lượng nước ít nhất?`,
    binhNuoc.names.map((name) => `Bình ${name}`),
    binhNuoc.answerIndex,
    "Quy đồng các phân số về mẫu số 8.",
    "3/4 = 6/8; 7/4 = 14/8; 5/8; 7/8. Số bé nhất là 5/8, nên bình C ít nước nhất.",
  ),
  choice(
    "km-5",
    `Thỏ đen, thỏ nâu, thỏ trắng cân nặng là một trong ba số ${thoSpec.weights.join(" kg; ")} kg. Trên bập bênh, thỏ nâu nặng hơn thỏ trắng, thỏ đen nhẹ hơn thỏ trắng. Thỏ trắng cân nặng là:`,
    thoSpec.weights.map((w) => `${w} kg`),
    thoSpec.answerIndex,
    "Quy đồng ba phân số về mẫu số 6 rồi sắp xếp. Thỏ trắng ở giữa.",
    "13/2 = 39/6, nên 21/6 < 37/6 < 39/6. Thỏ nâu nặng nhất (39/6), thỏ đen nhẹ nhất (21/6), thỏ trắng ở giữa: 37/6 kg.",
  ),
];

const cungTuGroup: Question[] = [
  compare("ct-1", cungTuRows, "Cùng tử số, phân số nào có mẫu số bé hơn thì lớn hơn.", "4/7 > 4/9 (mẫu 7 < 9). 7/20 < 7/10 (mẫu 20 > 10). 5/8 < 5/6 (mẫu 8 > 6)."),
  choice("ct-2", "3/8 và 3/4 có cùng tử số 3. Phân số nào lớn hơn?", cungTuBay.options, cungTuBay.answerIndex, "Chia một hình thành 4 phần hay 8 phần thì mỗi phần to hơn?", "Cùng tử số, mẫu số bé hơn thì phân số lớn hơn. Mẫu số 4 bé hơn 8 nên 3/4 > 3/8. Kiểm tra: 3/4 = 6/8 > 3/8."),
];

const suyNghi: Question[] = [
  choice("sn-1", "Hà nói: “2/3 bé hơn 5/12 vì 2 bé hơn 5”. Hà sai ở đâu?", ["Hai phân số khác mẫu số, phải quy đồng trước: 2/3 = 8/12 lớn hơn 5/12", "Hà nói đúng", "Phải so sánh mẫu số 3 và 12"], 0, "Quy đồng 2/3 về mẫu số 12 rồi so sánh tử số.", "2/3 = 8/12 và 8 > 5 nên 2/3 > 5/12. Chỉ so tử số khi hai phân số cùng mẫu số."),
  fill("sn-2", "Số ? (tử số của phân số ở giữa)", ["5/9 <", { answer: 6 }, "/9 < 7/9"], "Các phân số cùng mẫu số 9. Số nào nằm giữa 5 và 7?", "Cùng mẫu số 9, tử số nằm giữa 5 và 7 là 6. Vậy 5/9 < 6/9 < 7/9."),
  choice("sn-3", "Trong ba phân số 3/4, 3/8, 3/5, phân số nào bé nhất?", beNhat.options, beNhat.answerIndex, "Cùng tử số 3. Mẫu số lớn nhất cho phân số bé nhất.", "Cùng tử số, mẫu số lớn hơn thì phân số bé hơn. Mẫu số 8 lớn nhất nên 3/8 bé nhất."),
  compare("sn-4", [r("27/25", "25/27", ">")], "Phân số lớn hơn 1 và phân số bé hơn 1: so với 1 xem sao.", "27 > 25 nên 27/25 > 1. 25 < 27 nên 25/27 < 1. Vậy 27/25 > 1 > 25/27. (Câu vượt SGK: dùng số 1 làm mốc.)"),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "cung-mau", title: "So sánh hai phân số cùng mẫu số", questions: cungMauGroup },
  { id: "voi-1", title: "So sánh phân số với 1", questions: voiMotGroup },
  { id: "khac-mau", title: "So sánh hai phân số khác mẫu số", questions: khacMauQs },
  { id: "cung-tu", title: "Hai phân số cùng tử số", questions: cungTuGroup },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
