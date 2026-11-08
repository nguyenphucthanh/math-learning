import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

export const isEven = (value: number) => value % 2 === 0;

/** Các số trong khoảng [from, to], gồm cả hai đầu. */
export const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** Mọi số có hai chữ số lập từ hai thẻ khác nhau trong `cards`. */
export function twoDigitNumbers(cards: number[]): number[] {
  return cards.flatMap((tens, i) => cards.flatMap((ones, j) => (i === j ? [] : [tens * 10 + ones])));
}

const CHIA_2_HINT = "Số chẵn chia hết cho 2. Con nhìn chữ số tận cùng: 0, 2, 4, 6, 8 là số chẵn; 1, 3, 5, 7, 9 là số lẻ.";
const DAY_HINT = "Hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị. Con đếm thêm 2 từ số đã cho.";

/** Câu chọn đáp án; `answerIndex` là vị trí đáp án đúng trong `options`. */
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** Điền dãy số: `parts` đã xen kẽ chuỗi và ô trống. */
function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}

/** Đếm số chẵn và số lẻ trong khoảng [from, to]; đáp án tính từ khoảng. */
function countParity(id: string, from: number, to: number): FillQuestion {
  const numbers = range(from, to);
  const evens = numbers.filter(isEven).length;
  const odds = numbers.length - evens;
  return fill(
    id,
    `Từ ${from} đến ${to} có bao nhiêu số chẵn, bao nhiêu số lẻ? (Tính cả ${from} và ${to}.)`,
    ["Số chẵn:", { answer: evens }, "; số lẻ:", { answer: odds }],
    "Liệt kê số chẵn đầu tiên, số chẵn cuối cùng rồi đếm thêm 2. Làm tương tự với số lẻ.",
    `Từ ${from} đến ${to} có ${numbers.length} số. Số chẵn: ${numbers.filter(isEven).join(", ")} (${evens} số). Số lẻ: ${numbers.filter((v) => !isEven(v)).join(", ")} (${odds} số).`,
  );
}

/** Khởi động đầu bài: chia cho 2, chữ số tận cùng, đếm thêm 2. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-chia",
    kind: "dien-so",
    prompt: "Chia cho 2.",
    parts: ["14 : 2 =", { answer: 7 }, "; 15 : 2 =", { answer: 7 }, "dư", { answer: 1 }],
    hint: "Con nhớ lại bảng chia 2. 15 chia 2 thì còn thừa mấy?",
    explanation: "14 : 2 = 7 (chia hết). 15 : 2 = 7 dư 1, vì 2 × 7 = 14 và 15 − 14 = 1.",
  },
  {
    id: "kd-tan-cung",
    kind: "dien-so",
    prompt: "Chữ số tận cùng (hàng đơn vị) của số 2 318 là mấy?",
    parts: ["Chữ số tận cùng là", { answer: 8 }],
    hint: "Chữ số tận cùng là chữ số cuối cùng bên phải.",
    explanation: "2 318 có chữ số hàng đơn vị là 8, nên chữ số tận cùng là 8.",
  },
  {
    id: "kd-dem-2",
    kind: "dien-so",
    prompt: "Đếm thêm 2.",
    parts: ["6, 8,", { answer: 10 }, ",", { answer: 12 }],
    hint: "Mỗi lần thêm 2: 8 thêm 2 là mấy?",
    explanation: "6, 8, 10, 12. Mỗi số hơn số trước 2 đơn vị.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  chiaHet: {
    id: "thu-chia-het",
    kind: "trac-nghiem",
    prompt: "15 chia 2 được 7 và dư 1. Vậy 15 là số:",
    options: ["Chẵn", "Lẻ"],
    answerIndex: 1,
    hint: "Chia hết cho 2 là số chẵn. Chia còn dư thì sao?",
    explanation: "15 không chia hết cho 2 (dư 1), nên 15 là số lẻ.",
  },
  tanCung: {
    id: "thu-tan-cung",
    kind: "trac-nghiem",
    prompt: "Số nào là số lẻ?",
    options: ["4 210", "6 408", "1 965", "1 954"],
    answerIndex: 2,
    hint: "Chỉ nhìn chữ số tận cùng của từng số.",
    explanation: "1 965 có chữ số tận cùng là 5, nên là số lẻ. Các số còn lại tận cùng là 0, 8, 4: số chẵn.",
  },
  lienTiep: {
    id: "thu-lien-tiep",
    kind: "dien-so",
    prompt: "Điền số chẵn liên tiếp.",
    parts: ["124, 126,", { answer: 128 }],
    hint: "Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.",
    explanation: "126 + 2 = 128. Số chẵn tiếp theo là 128.",
  },
} satisfies Record<string, Question>;

const nhanBietQuestions: Question[] = [
  choice("nb-1", "Số nào là số chẵn?", ["315", "108", "71", "649"], 1, CHIA_2_HINT, "108 có chữ số tận cùng là 8 nên là số chẵn. 315, 71, 649 tận cùng là 5, 1, 9: số lẻ."),
  choice("nb-2", "Số nào là số lẻ?", ["214", "96", "1 909", "2 318"], 2, CHIA_2_HINT, "1 909 có chữ số tận cùng là 9 nên là số lẻ. 214, 96, 2 318 tận cùng là 4, 6, 8: số chẵn."),
  (() => {
    const list = [24, 53, 780, 4691, 5026, 3105, 8];
    const evens = list.filter(isEven);
    const odds = list.filter((v) => !isEven(v));
    return fill(
      "nb-3",
      `Trong các số ${list.map(n).join("; ")}, có bao nhiêu số chẵn, bao nhiêu số lẻ?`,
      ["Số chẵn:", { answer: evens.length }, "; số lẻ:", { answer: odds.length }],
      CHIA_2_HINT,
      `Số chẵn: ${evens.map(n).join(", ")} (${evens.length} số). Số lẻ: ${odds.map(n).join(", ")} (${odds.length} số).`,
    );
  })(),
  choice(
    "nb-4",
    "Con ong chỉ bay theo đường ghi các số chẵn. Bông hoa nào ong bay đến được?",
    ["Bông hoa ghi 3 475", "Bông hoa ghi 5 862", "Bông hoa ghi 7 019", "Bông hoa ghi 1 301"],
    1,
    CHIA_2_HINT,
    "Chỉ 5 862 có chữ số tận cùng là 2 nên là số chẵn. 3 475, 7 019 và 1 301 là số lẻ.",
  ),
];

const diaySoQuestions: Question[] = [
  fill(
    "ts-1",
    "Điền số nhà còn thiếu ở dãy số chẵn.",
    ["216, 218,", { answer: 220 }, ",", { answer: 222 }, ",", { answer: 224 }, ", 226"],
    DAY_HINT,
    "216, 218, 220, 222, 224, 226. Mỗi số hơn số trước 2 đơn vị.",
  ),
  fill(
    "ts-2",
    "Điền số nhà còn thiếu ở dãy số lẻ.",
    ["307, 309,", { answer: 311 }, ",", { answer: 313 }, ",", { answer: 315 }, ", 317"],
    DAY_HINT,
    "307, 309, 311, 313, 315, 317. Mỗi số hơn số trước 2 đơn vị.",
  ),
  fill(
    "ts-3",
    "Biết 246 và 248 là hai số chẵn liên tiếp; 531 và 533 là hai số lẻ liên tiếp.",
    ["Hai số chẵn liên tiếp hơn kém nhau", { answer: 248 - 246 }, "đơn vị. Hai số lẻ liên tiếp hơn kém nhau", { answer: 533 - 531 }, "đơn vị."],
    "Lấy số lớn trừ số bé: 248 − 246.",
    "248 − 246 = 2 và 533 − 531 = 2. Hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị.",
  ),
  fill(
    "ts-4",
    "Nêu tiếp để được ba số chẵn liên tiếp, và ba số lẻ liên tiếp.",
    ["94,", { answer: 96 }, ",", { answer: 98 }, "; 83,", { answer: 85 }, ",", { answer: 87 }],
    DAY_HINT,
    "94, 96, 98 (thêm 2 mỗi lần) và 83, 85, 87 (thêm 2 mỗi lần).",
  ),
  choice(
    "ts-5",
    "Trên tia số, số 0 là số chẵn hay số lẻ?",
    ["Số chẵn, vì 0 chia hết cho 2", "Số lẻ", "Không chẵn, không lẻ"],
    0,
    "Thử chia 0 cho 2. Chia hết cho 2 là số gì?",
    "0 : 2 = 0, chia hết cho 2 và tận cùng là 0, nên 0 là số chẵn.",
  ),
  countParity("ts-6", 0, 20),
  countParity("ts-7", 20, 41),
];

const lapSoQuestions: Question[] = [
  (() => {
    const numbers = twoDigitNumbers([3, 6, 8]);
    const evens = numbers.filter(isEven);
    const odds = numbers.filter((v) => !isEven(v));
    return fill(
      "ls-1",
      "Từ hai trong ba thẻ số 3, 6, 8, lập tất cả các số có hai chữ số. Có bao nhiêu số chẵn, bao nhiêu số lẻ?",
      ["Số chẵn:", { answer: evens.length }, "; số lẻ:", { answer: odds.length }],
      "Viết lần lượt từng số: chữ số hàng chục khác chữ số hàng đơn vị. Số chẵn hay lẻ do chữ số tận cùng quyết định.",
      `Lập được ${[...numbers].sort((a, b) => a - b).join(", ")}. Số chẵn: ${evens.sort((a, b) => a - b).join(", ")} (${evens.length} số). Số lẻ: ${odds.sort((a, b) => a - b).join(", ")} (${odds.length} số).`,
    );
  })(),
  choice(
    "ls-2",
    "Từ hai trong ba thẻ số 2, 5, 9, số nào lập được và là số lẻ?",
    ["52", "92", "29", "22"],
    2,
    "Số lẻ phải có chữ số tận cùng là 5 hoặc 9. Mỗi thẻ chỉ dùng một lần.",
    "29 lập được (thẻ 2 và 9) và tận cùng 9: số lẻ. 52, 92 là số chẵn; 22 là số chẵn và cần hai thẻ 2.",
  ),
  (() => {
    const largest = Math.max(...twoDigitNumbers([1, 4, 7]).filter((v) => !isEven(v)));
    return fill(
      "ls-3",
      "Từ hai trong ba thẻ số 1, 4, 7, số lẻ lớn nhất có hai chữ số là số nào?",
      ["Số lẻ lớn nhất:", { answer: largest }],
      "Chữ số tận cùng phải là 1 hoặc 7. Chữ số hàng chục nên lớn nhất có thể.",
      "Chữ số tận cùng là 1 hoặc 7. Hàng chục lớn nhất là 7 (khi tận cùng là 1), nên được 71. Còn 47, 41, 17 đều bé hơn.",
    );
  })(),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Nam nói: “2 107 là số chẵn vì chữ số đầu tiên là 2”. Nam nói đúng hay sai?",
    [
      "Sai: phải nhìn chữ số tận cùng là 7, nên 2 107 là số lẻ",
      "Đúng: số bắt đầu bằng 2 là số chẵn",
      "Sai: 2 107 chia hết cho 2",
    ],
    0,
    "Số chẵn hay lẻ do chữ số nào quyết định?",
    "Chỉ chữ số tận cùng quyết định. 2 107 tận cùng là 7, không chia hết cho 2, nên là số lẻ.",
  ),
  choice(
    "sn-2",
    "Vì sao chỉ cần nhìn chữ số tận cùng của 4 306 là biết 4 306 là số chẵn?",
    [
      "Vì 4 306 = 4 300 + 6; 4 300 chia hết cho 2 nên chỉ cần xét 6",
      "Vì 6 là chữ số lớn nhất",
      "Vì số nào cũng tận cùng là 0",
    ],
    0,
    "Tách 4 306 thành số tròn trăm cộng với chữ số hàng đơn vị.",
    "4 300 = 43 trăm, mà một trăm chia hết cho 2 nên 4 300 chia hết cho 2. Chỉ còn 6 quyết định, và 6 chia hết cho 2.",
  ),
  countParity("sn-3", 1, 100),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "nhan-biet", title: "Nhận biết số chẵn, số lẻ (trang 12, 13)", questions: nhanBietQuestions },
  { id: "day-so", title: "Dãy số và tia số (trang 12, 13)", questions: diaySoQuestions },
  { id: "lap-so", title: "Lập số từ các thẻ số (trang 13)", questions: lapSoQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
