import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

const MUL2_HINT =
  "Nhân với chữ số hàng đơn vị được tích riêng thứ nhất. Nhân với chữ số hàng chục được tích riêng thứ hai, viết lùi sang trái một cột. Rồi cộng hai tích riêng.";

/** Tích riêng thứ nhất, tích riêng thứ hai (tính theo đơn vị) và kết quả của a × b, b có hai chữ số. */
export function partials(a: number, b: number): { first: number; second: number; result: number } {
  return { first: a * (b % 10), second: a * Math.floor(b / 10) * 10, result: a * b };
}

export function explainMul2(a: number, b: number): string {
  const { first, second, result } = partials(a, b);
  return `${n(a)} × ${b}: tích riêng thứ nhất ${n(a)} × ${b % 10} = ${n(first)}; tích riêng thứ hai ${n(a)} × ${Math.floor(b / 10)} chục = ${n(second / 10)} chục, tức ${n(second)}. Cộng lại: ${n(first)} + ${n(second)} = ${n(result)}.`;
}

/** Đặt tính rồi tính a × b (b có hai chữ số): con làm ra vở ô li, điền kết quả. */
function times(id: string, a: number, b: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
    parts: [`${n(a)} × ${b} =`, { answer: a * b }],
    hint: MUL2_HINT,
    explanation: explainMul2(a, b),
  };
}

/** Nhiều phép nhân với số tròn chục, mỗi phép một ô: tách a × (c × 10) = (a × c) × 10. */
function round10(id: string, prompt: string, pairs: [number, number][]): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: pairs.flatMap(([a, b], index): FillQuestion["parts"] => [`${index ? "; " : ""}${n(a)} × ${n(b)} =`, { answer: a * b }]),
    hint: "Nhân với số chục trước (bỏ chữ số 0), rồi viết thêm các chữ số 0 còn lại ở cuối kết quả.",
    explanation: pairs.map(([a, b]) => `${n(a)} × ${n(b)} = (${n(a)} × ${n(b / 10)}) × 10 = ${n(a * (b / 10))} × 10 = ${n(a * b)}.`).join(" "),
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function word(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

/** Câu Đ, S về cách viết tích riêng thứ hai: `aligned` là viết lùi sang trái một cột (đúng) hay thẳng cột (sai). */
export function placement(id: string, a: number, b: number, aligned: boolean): ChoiceQuestion {
  const { first, second } = partials(a, b);
  const shown = aligned ? first + second : first + second / 10;
  const where = aligned ? "lùi sang trái một cột" : "thẳng cột với tích riêng thứ nhất";
  return choice(
    id,
    `Nam đặt tính ${a} × ${b}, được hai tích riêng ${n(first)} và ${n(second / 10)}. Nam viết tích riêng thứ hai ${where}, cộng được ${n(shown)}. Nam làm đúng hay sai?`,
    ["Đúng", "Sai"],
    shown === a * b ? 0 : 1,
    "Tích riêng thứ hai là số chục, nên phải viết lùi sang trái một cột.",
    shown === a * b
      ? `Đúng. Tích riêng thứ hai ${n(second / 10)} chục = ${n(second)}, viết lùi sang trái một cột, nên ${n(first)} + ${n(second)} = ${n(a * b)}.`
      : `Sai. Viết thẳng cột là coi ${n(second / 10)} chục như ${n(second / 10)} đơn vị, nên ra ${n(shown)}. Đúng phải lùi sang trái một cột: ${n(first)} + ${n(second)} = ${n(a * b)}.`,
  );
}

/** Khởi động: nhân với số có một chữ số, nhân với 10, tính chất phân phối. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-mot-chu-so",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp, rồi điền kết quả.",
    parts: ["34 × 2 =", { answer: 68 }],
    hint: "2 nhân 4 bằng 8, viết 8. 2 nhân 3 bằng 6, viết 6.",
    explanation: "34 × 2 = 68.",
  },
  {
    id: "kd-nhan-10",
    kind: "dien-so",
    prompt: "Nhân một số với 10: viết thêm một chữ số 0 vào bên phải.",
    parts: ["34 × 10 =", { answer: 340 }],
    hint: "10 lần của 34 là 34 chục.",
    explanation: "34 × 10 = 340.",
  },
  {
    id: "kd-phan-phoi",
    kind: "dien-so",
    prompt: "Tính 34 × (10 + 2) bằng cách nhân 34 với từng số hạng rồi cộng lại.",
    parts: ["34 × 10 + 34 × 2 =", { answer: 340 }, "+", { answer: 68 }, "=", { answer: 408 }],
    hint: "Nhân 34 với 10 và với 2, rồi cộng hai kết quả.",
    explanation: "34 × 10 = 340, 34 × 2 = 68, 340 + 68 = 408.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  tong: {
    id: "thu-tich-rieng",
    kind: "dien-so",
    prompt: "Tính 45 × 13. Điền hai tích riêng (tích riêng thứ hai tính theo đơn vị) rồi kết quả.",
    parts: ["45 × 3 =", { answer: 135 }, "; 45 × 10 =", { answer: 450 }, "; 135 + 450 =", { answer: 585 }],
    hint: "13 = 3 + 10. Nhân 45 với 3, rồi với 10, rồi cộng.",
    explanation: explainMul2(45, 13),
  },
  lui: {
    id: "thu-lui-cot",
    kind: "trac-nghiem",
    prompt: "Khi đặt tính 34 × 12, tích riêng thứ hai (34) viết thế nào?",
    options: ["Thẳng cột với tích riêng thứ nhất (68)", "Lùi sang trái một cột so với tích riêng thứ nhất", "Lùi sang phải một cột"],
    answerIndex: 1,
    hint: "Tích riêng thứ hai là 34 chục, tức 340 đơn vị.",
    explanation: "34 chục là 340. Chữ số 4 đứng ở hàng chục, nên viết lùi sang trái một cột so với tích riêng thứ nhất.",
  },
  tronChuc: {
    id: "thu-tron-chuc",
    kind: "dien-so",
    prompt: "Tính nhẩm theo mẫu: 24 × 30 = (24 × 3) × 10.",
    parts: ["36 × 40 = (36 × 4) × 10 =", { answer: 1440 }],
    hint: "36 × 4 = 144, rồi nhân 10.",
    explanation: "36 × 4 = 144, 144 × 10 = 1 440.",
  },
} satisfies Record<string, Question>;

const shirtPairs: MatchQuestion = {
  id: "hd-2",
  kind: "noi-cap",
  prompt: "Nối phép nhân với kết quả của nó.",
  pairs: [
    { left: "26 × 15", right: n(26 * 15) },
    { left: "35 × 12", right: n(35 * 12) },
    { left: "48 × 11", right: n(48 * 11) },
  ],
  rightOrder: [1, 2, 0],
  hint: "Tính từng phép, rồi tìm kết quả. Có thể nhìn chữ số tận cùng để loại bớt.",
  explanation: `26 × 15 = ${n(390)}, 35 × 12 = ${n(420)}, 48 × 11 = ${n(528)}.`,
};

const hoatDongQuestions: Question[] = [
  times("hd-1a", 65, 28),
  times("hd-1b", 152, 34),
  times("hd-1c", 3014, 27),
  shirtPairs,
  word(
    "hd-3",
    "Cửa hàng có 16 bao gạo, mỗi bao cân nặng 45 kg. Hỏi cửa hàng có tất cả bao nhiêu ki-lô-gam gạo?",
    [["Số gạo: 16 × 45 =", { answer: 16 * 45 }, "(kg)"]],
    "Mỗi bao như nhau, có 16 bao: nhân số bao với số ki-lô-gam của mỗi bao.",
    `${explainMul2(45, 16)} Cửa hàng có ${n(720)} kg gạo.`,
  ),
];

const luyenTap1Questions: Question[] = [
  times("lt1-1a", 360, 15),
  times("lt1-1b", 58, 37),
  times("lt1-1c", 72, 45),
  round10("lt1-2a", "Tính nhẩm theo mẫu: 24 × 30 = (24 × 3) × 10.", [
    [35, 40],
    [64, 30],
    [82, 60],
  ]),
  round10("lt1-2b", "Tính nhẩm theo mẫu: 130 × 20 = (13 × 2) × 100.", [
    [150, 20],
    [380, 70],
    [2400, 50],
  ]),
  {
    id: "lt1-3a",
    kind: "dien-so",
    prompt: "Diện tích S của hình chữ nhật có chiều dài a và chiều rộng b: S = a × b. Với a = 40 cm, b = 26 cm.",
    parts: ["S = 40 × 26 =", { answer: 40 * 26 }, "cm²"],
    hint: "Nhân hai số đo, rồi viết đơn vị diện tích (cm²).",
    explanation: `S = 40 × 26 = ${n(1040)} (cm²).`,
  },
  {
    id: "lt1-3b",
    kind: "dien-so",
    prompt: "Diện tích S của hình chữ nhật có chiều dài a và chiều rộng b: S = a × b. Với a = 35 m, b = 24 m.",
    parts: ["S = 35 × 24 =", { answer: 35 * 24 }, "m²"],
    hint: "Nhân hai số đo, rồi viết đơn vị diện tích (m²).",
    explanation: `S = 35 × 24 = ${n(840)} (m²).`,
  },
  word(
    "lt1-4",
    "Một cửa hàng hoa quả bán được 15 kg xoài và 20 kg cam. Biết 1 kg xoài giá 35 000 đồng, 1 kg cam giá 24 000 đồng. Hỏi cửa hàng bán xoài và cam được bao nhiêu tiền?",
    [
      ["Tiền xoài: 15 × 35 000 =", { answer: 15 * 35000 }, "(đồng)"],
      ["Tiền cam: 20 × 24 000 =", { answer: 20 * 24000 }, "(đồng)"],
      ["Tất cả:", { answer: 15 * 35000 + 20 * 24000 }, "(đồng)"],
    ],
    "Tính tiền xoài và tiền cam riêng, rồi cộng lại.",
    `Xoài: ${n(35000)} × 15 = ${n(525000)} đồng. Cam: ${n(24000)} × 20 = ${n(480000)} đồng. Tổng: ${n(525000)} + ${n(480000)} = ${n(1005000)} đồng.`,
  ),
];

const luyenTap2Questions: Question[] = [
  times("lt2-1a", 45, 36),
  times("lt2-1b", 73, 18),
  times("lt2-1c", 506, 27),
  {
    id: "lt2-1d",
    kind: "dien-so",
    prompt: "Số?  54 → (× 11) → ? → (− 275) → ?",
    parts: ["54 × 11 =", { answer: 54 * 11 }, "; rồi 594 − 275 =", { answer: 54 * 11 - 275 }],
    hint: "Làm từng mũi tên một: nhân 11 trước, rồi trừ 275.",
    explanation: `54 × 11 = ${n(594)}. Rồi ${n(594)} − 275 = ${n(319)}.`,
  },
  choice(
    "lt2-2",
    "Từ các thừa số 35 và 64; 12 và 40, và các tích 420; 2 560, phép nhân nào đúng?",
    ["35 × 12 = 420", "35 × 40 = 2 560", "64 × 12 = 420"],
    0,
    "Tính thử từng phép, hoặc nhìn chữ số tận cùng.",
    `35 × 12 = ${n(420)}. Còn 35 × 40 = ${n(1400)} và 64 × 12 = ${n(768)}. Phép đúng còn lại là 64 × 40 = ${n(2560)}.`,
  ),
  word(
    "lt2-3",
    "Hộp A đựng 16 gói kẹo, mỗi gói có 24 cái kẹo. Hộp B đựng 25 gói kẹo, mỗi gói có 15 cái kẹo. Hỏi số kẹo ở hai hộp hơn kém nhau bao nhiêu cái?",
    [
      ["Hộp A:", { answer: 16 * 24 }, "cái"],
      ["Hộp B:", { answer: 25 * 15 }, "cái"],
      ["Hơn kém nhau:", { answer: 16 * 24 - 25 * 15 }, "cái"],
    ],
    "Tính số kẹo mỗi hộp bằng phép nhân, rồi lấy số lớn trừ số bé.",
    `Hộp A: 16 × 24 = ${n(384)}. Hộp B: 25 × 15 = ${n(375)}. Hộp A nhiều hơn hộp B ${n(384)} − ${n(375)} = 9 cái.`,
  ),
  placement("lt2-4a", 36, 12, true),
  placement("lt2-4b", 36, 12, false),
  {
    id: "lt2-4c",
    kind: "dien-so",
    prompt: "Khi nhân một số với 12, Nam đặt hai tích riêng thẳng cột nên kết quả là 48. Hỏi số đó là số nào?",
    parts: ["Số đó là", { answer: 16 }],
    hint: "Thẳng cột nghĩa là Nam cộng số đó × 2 với số đó × 1, tức là 3 lần số đó.",
    explanation: "Nam được số × 2 + số × 1 = số × 3 = 48. Vậy số đó là 48 : 3 = 16. (Phép đúng: 16 × 12 = 192.)",
  },
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Không đặt tính. Kết quả của 48 × 21 gần nhất với số nào?",
    ["100", "1 000", "10 000"],
    1,
    "48 gần 50, 21 gần 20. Nhẩm 50 × 20.",
    `50 × 20 = ${n(1000)}, nên kết quả gần ${n(1000)} (thật ra ${n(48 * 21)}). Ước lượng giúp phát hiện khi quên lùi một cột.`,
  ),
  choice(
    "sn-2",
    "Khi tính 43 × 25, tích riêng thứ hai là 43 × 2 = 86. Số đó là bao nhiêu đơn vị?",
    ["86 đơn vị", "860 đơn vị", "215 đơn vị"],
    1,
    "Chữ số 2 của 25 đứng ở hàng chục, nên là 2 chục.",
    `43 × 2 chục = 86 chục = ${n(860)} đơn vị. Vì thế 86 viết lùi sang trái một cột. Kết quả: 43 × 5 + ${n(860)} = 215 + 860 = ${n(1075)}.`,
  ),
  choice(
    "sn-3",
    "Không đặt tính. Kết quả của 37 × 23 tận cùng bằng chữ số nào?",
    ["1", "7", "3"],
    0,
    "Chữ số tận cùng của kết quả chỉ phụ thuộc chữ số hàng đơn vị của hai số: 7 × 3.",
    `7 × 3 = 21, tận cùng là 1. Đúng: 37 × 23 = ${n(851)}.`,
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 21)", questions: hoatDongQuestions },
  { id: "luyen-tap-1", title: "Luyện tập 1 (trang 21)", questions: luyenTap1Questions },
  { id: "luyen-tap-2", title: "Luyện tập 2 (trang 22)", questions: luyenTap2Questions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
