import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { createElement, type ReactNode } from "react";
import { DoanThang } from "./_illustrations/doan-thang";

const fill = (id: string, prompt: string, parts: Part[], hint: string, explanation: string, illustration?: ReactNode): FillQuestion => ({ id, kind: "dien-so", prompt, parts, hint, explanation, illustration });
const choice = (id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion => ({ id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation });

/** Câu "a : b = ?/?" : tử số là số bị chia, mẫu số là số chia. */
const frac = (id: string, a: number, b: number, extra = ""): FillQuestion =>
  fill(id, `${extra}Viết thương của phép chia ${a} : ${b} dưới dạng phân số.`, [`${a} : ${b} =`, { answer: a }, "/", { answer: b }], "Tử số là số bị chia, mẫu số là số chia.", `${a} : ${b} = ${a}/${b}. Số bị chia ${a} là tử số, số chia ${b} là mẫu số.`);

/** Hai phép chia trong một câu. */
const frac2 = (id: string, [a, b]: [number, number], [c, d]: [number, number]): FillQuestion =>
  fill(id, "Viết thương của mỗi phép chia dưới dạng phân số.", [`${a} : ${b} =`, { answer: a }, "/", { answer: b }, `    ${c} : ${d} =`, { answer: c }, "/", { answer: d }], "Tử số là số bị chia, mẫu số là số chia. Đừng viết ngược.", `${a} : ${b} = ${a}/${b} và ${c} : ${d} = ${c}/${d}. Số bị chia làm tử số, số chia làm mẫu số.`);

/** Phép chia hết: a : b = a/b = thương. */
const natural = (id: string, a: number, b: number): FillQuestion =>
  fill(id, `Viết thương của ${a} : ${b} dưới dạng phân số, rồi cho biết thương là số tự nhiên nào.`, [`${a} : ${b} =`, { answer: a }, "/", { answer: b }, "=", { answer: a / b }], `Viết a : b = a/b trước. Rồi tính ${a} : ${b}.`, `${a} : ${b} = ${a / b} nên ${a}/${b} = ${a / b}.`);

const toOne = (id: string, a: number): FillQuestion =>
  fill(id, `Viết số tự nhiên ${a} thành phân số có mẫu số bằng 1.`, [`${a} =`, { answer: a }, "/", { answer: 1 }], "Số tự nhiên viết thành phân số: tử số là chính số đó, mẫu số là 1.", `${a} : 1 = ${a} nên ${a} = ${a}/1.`);

/** Số liệu bài toán lời văn, test tính lại từ đây. */
export const gao = { weights: [3, 2], bags: 4 };
export const nuoc = { liters: 6, cups: 5 };
export const ruot = { liters: 3, cups: 4 };
export const doanThang = { labels: ["A", "C", "D", "E", "G", "H", "B"] };
export const readings = [
  { read: "Hai phần ba ki-lô-gam", value: "2/3 kg" },
  { read: "Năm phần tám mét vuông", value: "5/8 m²" },
  { read: "Sáu phần năm tấn", value: "6/5 tấn" },
  { read: "Bảy phần mười lít", value: "7/10 l" },
];
export const divisionPairs = [
  { left: "5 : 8", right: "5/8" },
  { left: "9 : 4", right: "9/4" },
  { left: "12 : 7", right: "12/7" },
  { left: "7 : 12", right: "7/12" },
];

const segment = (): ReactNode => createElement(DoanThang, { labels: doanThang.labels });
const sumGao = gao.weights.reduce((a, b) => a + b, 0);

/** Khởi động: nhắc lại Bài 53. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-1", "Một cái bánh chia thành 4 phần bằng nhau. Con ăn 3 phần. Con ăn bao nhiêu phần cái bánh?", [{ answer: 3 }, "/", { answer: 4 }, "cái bánh."], "Tử số là số phần lấy, mẫu số là số phần bằng nhau của cả cái bánh.", "Cái bánh chia 4 phần bằng nhau nên mẫu số là 4. Con ăn 3 phần nên tử số là 3. Con ăn 3/4 cái bánh."),
  fill("kd-2", "Phân số 5/8 có tử số và mẫu số là bao nhiêu?", ["Tử số", { answer: 5 }, "; mẫu số", { answer: 8 }, "."], "Số ở trên gạch ngang là tử số, số ở dưới là mẫu số.", "Trong 5/8, tử số là 5 (trên gạch ngang), mẫu số là 8 (dưới gạch ngang)."),
  choice("kd-3", "Phân số 3/7 đọc là gì?", ["ba phần bảy", "bảy phần ba", "ba chia bảy"], 0, "Đọc tử số trước, rồi chữ “phần”, rồi mẫu số.", "Đọc tử số (ba), “phần”, mẫu số (bảy): ba phần bảy."),
];

export const quickChecks = {
  haiBaBan: fill("thu-2-3", "Chia đều 2 cái bánh cho 3 bạn. Mỗi bạn được bao nhiêu phần cái bánh?", ["2 : 3 =", { answer: 2 }, "/", { answer: 3 }, "cái bánh."], "Số bánh là số bị chia, số bạn là số chia.", "Chia mỗi cái bánh thành 3 phần, mỗi bạn lấy 1 phần của mỗi bánh: 2 phần, mỗi phần 1/3. Vậy 2 : 3 = 2/3 cái bánh."),
  baySau: choice("thu-7-5", "Chia đều 7 cái bánh cho 5 bạn. Mỗi bạn được bao nhiêu cái bánh?", ["5/7 cái bánh", "7/5 cái bánh", "7/12 cái bánh"], 1, "Tử số là số bị chia (số bánh), mẫu số là số chia (số bạn).", "7 : 5 = 7/5. Tử số 7 lớn hơn mẫu số 5, nên mỗi bạn được nhiều hơn 1 cái bánh."),
  bangMot: fill("thu-24", "Viết 24 : 24 dưới dạng phân số, rồi cho biết thương.", ["24 : 24 =", { answer: 24 }, "/", { answer: 24 }, "=", { answer: 24 / 24 }], "Chia 24 cái bánh cho 24 bạn thì mỗi bạn được mấy cái?", "24 : 24 = 24/24. Mỗi bạn được 1 cái, nên 24/24 = 1."),
  motMau: toOne("thu-40", 40),
  doanThang: fill("thu-ad", "Đoạn thẳng AB chia thành 6 đoạn bằng nhau (như hình). Đoạn AD bằng bao nhiêu phần đoạn AB?", ["AD =", { answer: 2 }, "/", { answer: 6 }, "AB."], "Đếm các đoạn từ A đến D, không đếm các điểm.", "Từ A đến D có 2 đoạn (AC và CD), đoạn AB có 6 đoạn. AD = 2/6 AB.", segment()),
};

const thuong: Question[] = [
  frac2("th-1", [8, 15], [27, 40]),
  frac2("th-2", [19, 6], [53, 12]),
  frac2("th-3", [14, 25], [3, 100]),
  frac("th-4", 64, 9, "Tử số lớn hơn mẫu số. "),
];

const soTuNhien: Question[] = [
  natural("tn-1", 48, 16),
  natural("tn-2", 35, 7),
  natural("tn-3", 29, 29),
  natural("tn-4", 0, 8),
  toOne("tn-5", 25),
  toOne("tn-6", 63),
  toOne("tn-7", 0),
];

const baiToan: Question[] = [
  choice("bt-1", "3 thùng như nhau đựng đầy nước. Lấy hết nước của 3 thùng chia đều vào 4 can. Nước ở mỗi can bằng mấy phần lượng nước của một thùng?", ["4/3 thùng", "3/7 thùng", "3/4 thùng"], 2, "Số thùng là số bị chia, số can là số chia.", "3 thùng chia đều vào 4 can: 3 : 4 = 3/4. Mỗi can có 3/4 thùng nước."),
  choice("bt-2", "Chia đều 4 cái bánh cho 3 bạn. Mỗi bạn được bao nhiêu phần cái bánh?", ["3/4 cái bánh", "4/3 cái bánh", "4/7 cái bánh"], 1, "Số bánh là số bị chia, số bạn là số chia.", "4 : 3 = 4/3. Mỗi bạn được nhiều hơn 1 cái bánh."),
  {
    kind: "noi-cap",
    id: "bt-3",
    prompt: "Nối mỗi phép chia với phân số là thương của nó.",
    pairs: divisionPairs,
    rightOrder: [1, 3, 0, 2],
    hint: "Số bị chia làm tử số, số chia làm mẫu số. Cẩn thận 9 : 4 và 7 : 12.",
    explanation: "5 : 8 = 5/8; 9 : 4 = 9/4; 12 : 7 = 12/7; 7 : 12 = 7/12.",
  } satisfies MatchQuestion,
  {
    kind: "noi-cap",
    id: "bt-4",
    prompt: "Nối cách đọc với số đo thích hợp.",
    pairs: readings.map((item) => ({ left: item.read, right: item.value })),
    rightOrder: [2, 3, 1, 0],
    hint: "Đọc tử số trước, rồi “phần”, rồi mẫu số, rồi đơn vị. m² đọc là mét vuông.",
    explanation: "hai phần ba ki-lô-gam là 2/3 kg; năm phần tám mét vuông là 5/8 m²; sáu phần năm tấn là 6/5 tấn; bảy phần mười lít là 7/10 l.",
  } satisfies MatchQuestion,
  {
    kind: "loi-van",
    id: "bt-5",
    prompt: `Cân 4 túi gạo như nhau bằng hai quả cân ${gao.weights[0]} kg và ${gao.weights[1]} kg. Một túi gạo cân bao nhiêu ki-lô-gam?`,
    lines: [
      [`${gao.weights[0]} + ${gao.weights[1]} =`, { answer: sumGao }, "(kg)"],
      [`${sumGao} : ${gao.bags} =`, { answer: sumGao }, "/", { answer: gao.bags }, "(kg)"],
    ],
    hint: "Cộng hai quả cân để biết 4 túi nặng bao nhiêu, rồi chia cho 4.",
    explanation: `4 túi gạo nặng ${gao.weights[0]} + ${gao.weights[1]} = ${sumGao} kg. Một túi: ${sumGao} : ${gao.bags} = ${sumGao}/${gao.bags} kg.`,
  } satisfies WordQuestion,
  {
    kind: "loi-van",
    id: "bt-6",
    prompt: `Rót hết ${nuoc.liters} l nước vào ${nuoc.cups} ca như nhau, vừa đầy. Mỗi ca có bao nhiêu lít nước?`,
    lines: [[`${nuoc.liters} : ${nuoc.cups} =`, { answer: nuoc.liters }, "/", { answer: nuoc.cups }, "(l)"]],
    hint: "Số lít là số bị chia, số ca là số chia.",
    explanation: `${nuoc.liters} : ${nuoc.cups} = ${nuoc.liters}/${nuoc.cups}. Mỗi ca có ${nuoc.liters}/${nuoc.cups} l nước, nhiều hơn 1 l.`,
  } satisfies WordQuestion,
  {
    kind: "loi-van",
    id: "bt-7",
    prompt: `Rót hết ${ruot.liters} l nước vào ${ruot.cups} ca như nhau, vừa đầy. Mỗi ca có bao nhiêu lít nước?`,
    lines: [[`${ruot.liters} : ${ruot.cups} =`, { answer: ruot.liters }, "/", { answer: ruot.cups }, "(l)"]],
    hint: "Số lít là số bị chia, số ca là số chia.",
    explanation: `${ruot.liters} : ${ruot.cups} = ${ruot.liters}/${ruot.cups}. Mỗi ca có ${ruot.liters}/${ruot.cups} l nước, ít hơn 1 l.`,
  } satisfies WordQuestion,
];

const doan: Question[] = [
  fill("dt-1", "Đoạn thẳng AB chia thành 6 đoạn bằng nhau. Mẫu: AC = 1/6 AB. Tìm AD.", ["AD =", { answer: 2 }, "/", { answer: 6 }, "AB."], "Đếm số đoạn từ A đến D.", "Từ A đến D có 2 đoạn (AC, CD). AD = 2/6 AB.", segment()),
  fill("dt-2", "Tìm AG.", ["AG =", { answer: 4 }, "/", { answer: 6 }, "AB."], "Đếm các đoạn từ A đến G: AC, CD, DE, EG.", "Từ A đến G có 4 đoạn. AG = 4/6 AB.", segment()),
  fill("dt-3", "Tìm AH.", ["AH =", { answer: 5 }, "/", { answer: 6 }, "AB."], "Đếm các đoạn từ A đến H, không đếm điểm.", "Từ A đến H có 5 đoạn. AH = 5/6 AB.", segment()),
  fill("dt-4", "Nếu AB = 1 m thì AE bằng bao nhiêu mét?", ["AE =", { answer: 3 }, "/", { answer: 6 }, "m."], "Đoạn AB là 1 m, chia thành 6 đoạn bằng nhau. AE gồm mấy đoạn?", "Từ A đến E có 3 đoạn. AE = 3/6 AB, mà AB = 1 m nên AE = 3/6 m.", segment()),
];

/** Vượt SGK: phát hiện lỗi và dự đoán hơn/kém 1, chỉ dựa vào tử số và mẫu số. */
export const duDoan = [
  { id: "sn-4", cakes: 5, friends: 6 },
  { id: "sn-5", cakes: 9, friends: 7 },
];

const suyNghi: Question[] = [
  choice("sn-1", "Nam viết 3 : 5 = 5/3. Nam sai ở đâu?", ["Viết ngược: tử số phải là số bị chia 3, mẫu số là số chia 5", "Nam viết đúng", "Phải viết 3/8"], 0, "Số bị chia là tử số, số chia là mẫu số.", "3 : 5 = 3/5. Chia 3 cái bánh cho 5 bạn thì mỗi bạn được 3 phần (mỗi phần 1/5), không phải 5 phần 1/3."),
  choice("sn-2", "Vì sao 0 : 6 = 0/6 = 0?", ["Chia 0 cái bánh cho 6 bạn thì mỗi bạn được 0 cái", "Vì không chia được cho 0", "Vì 6 : 0 = 0"], 0, "Nghĩ đến 6 bạn, nhưng không có cái bánh nào.", "0 : 6 = 0/6. Không có bánh thì mỗi bạn được 0 cái, nên 0/6 = 0. Số chia là 6, không phải 0."),
  choice("sn-3", "Vì sao 3 : 4 = 3/4?", ["Mỗi bánh chia 4 phần; mỗi bạn lấy 1 phần của cả 3 bánh, được 3 phần, mỗi phần 1/4", "Vì 3 + 4 = 7", "Vì phải viết số nhỏ ở trên"], 0, "Nhớ cách chia từng bánh thành 4 phần.", "Mỗi bạn được 3 phần, mỗi phần là 1/4 cái bánh, nên 3 : 4 = 3/4 cái bánh."),
  choice("sn-4", `${duDoan[0].cakes} cái bánh chia đều cho ${duDoan[0].friends} bạn. Chưa tính, đoán xem mỗi bạn được nhiều hơn hay ít hơn 1 cái bánh?`, ["Ít hơn 1 cái", "Nhiều hơn 1 cái", "Đúng 1 cái"], 0, "Có đủ bánh cho mỗi bạn 1 cái nguyên không?", `${duDoan[0].cakes} : ${duDoan[0].friends} = ${duDoan[0].cakes}/${duDoan[0].friends}. Tử số bé hơn mẫu số nên mỗi bạn được ít hơn 1 cái.`),
  choice("sn-5", `${duDoan[1].cakes} cái bánh chia đều cho ${duDoan[1].friends} bạn. Mỗi bạn được nhiều hơn hay ít hơn 1 cái bánh?`, ["Ít hơn 1 cái", "Nhiều hơn 1 cái", "Đúng 1 cái"], 1, "Có đủ bánh cho mỗi bạn 1 cái nguyên và còn dư không?", `${duDoan[1].cakes} : ${duDoan[1].friends} = ${duDoan[1].cakes}/${duDoan[1].friends}. Tử số lớn hơn mẫu số nên mỗi bạn được nhiều hơn 1 cái.`),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "viet-thuong", title: "Viết thương dưới dạng phân số", questions: thuong },
  { id: "so-tu-nhien", title: "Phân số và số tự nhiên", questions: soTuNhien },
  { id: "bai-toan", title: "Bài toán chia đều và số đo", questions: baiToan },
  { id: "doan-thang", title: "Phân số chỉ phần của đoạn thẳng", questions: doan },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm (vượt SGK)", questions: suyNghi },
];
