import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { SoDoLan } from "@/components/math/so-do-lan";
import { formatNumber } from "@/lib/area-units";
import { explainColumnMul } from "@/lib/column-mul";
import { createElement } from "react";

const n = formatNumber;

const MUL_HINT =
  "Nhân từng chữ số với số nhân, từ hàng đơn vị sang trái. Viết chữ số đơn vị, nhớ phần chục sang hàng bên trái. Chữ số 0 vẫn nhân, rồi cộng số nhớ.";

/** Đặt tính rồi tính nhân với số có một chữ số: con làm ra vở ô li, điền kết quả. Đáp án là a × b. */
function times(id: string, a: number, b: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
    parts: [`${n(a)} × ${b} =`, { answer: a * b }],
    hint: MUL_HINT,
    explanation: explainColumnMul(a, b),
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** Câu Đ, S: phép nhân đã có kết quả `shown`; đáp án tính lại từ a × b. */
export function trueFalse(id: string, a: number, b: number, shown: number): ChoiceQuestion {
  const correct = a * b === shown;
  return choice(
    id,
    `Đúng hay sai? ${n(a)} × ${b} = ${n(shown)}`,
    ["Đúng", "Sai"],
    correct ? 0 : 1,
    "Con tách theo hàng rồi nhân, hoặc đặt tính ra vở và so với kết quả đã cho.",
    correct
      ? `${n(a)} × ${b} = ${n(a * b)}. Kết quả đã cho đúng, dù có nhiều chữ số 0.`
      : `${n(a)} × ${b} = ${n(a * b)}, không phải ${n(shown)}. ${explainColumnMul(a, b)}`,
  );
}

function word(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

/** Khởi động đầu bài: bảng nhân có nhớ, nhân trong phạm vi 100 000, đọc số sáu chữ số. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-bang-nhan",
    kind: "dien-so",
    prompt: "Bảng nhân 7: 7 nhân 6 bằng 42. Viết chữ số đơn vị và số nhớ.",
    parts: ["7 × 6 =", { answer: 42 }, "; viết", { answer: 2 }, ", nhớ", { answer: 4 }],
    hint: "42 gồm 4 chục và 2 đơn vị. Chữ số đơn vị viết xuống, chục thì nhớ.",
    explanation: "7 × 6 = 42, viết 2 nhớ 4.",
  },
  {
    id: "kd-nhan-nho",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp, rồi điền kết quả.",
    parts: ["4 108 × 6 =", { answer: 4108 * 6 }],
    hint: "Chữ số 0 ở hàng chục vẫn phải cộng số nhớ.",
    explanation: explainColumnMul(4108, 6),
  },
  {
    id: "kd-doc-so",
    kind: "trac-nghiem",
    prompt: "Số 160 140 đọc là:",
    options: [
      "một trăm sáu mươi nghìn bốn mươi",
      "một trăm sáu mươi nghìn một trăm bốn mươi",
      "mười sáu nghìn một trăm bốn mươi",
      "một trăm sáu mươi nghìn một trăm linh bốn",
    ],
    answerIndex: 1,
    hint: "Đọc lớp nghìn trước: 160 nghìn. Rồi đọc lớp đơn vị: 140.",
    explanation: "Lớp nghìn là 160, lớp đơn vị là 140. Đọc: một trăm sáu mươi nghìn một trăm bốn mươi.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  ngay: {
    id: "thu-ngay",
    kind: "dien-so",
    prompt: "Mỗi ngày làm 25 140 sản phẩm. Hỏi 5 ngày làm được bao nhiêu sản phẩm? (Đặt tính ra giấy nháp.)",
    parts: ["25 140 × 5 =", { answer: 25140 * 5 }, "(sản phẩm)"],
    hint: "5 ngày, mỗi ngày như nhau: nhân với 5.",
    explanation: explainColumnMul(25140, 5),
  },
  chuSoKhong: {
    id: "thu-chu-so-khong",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp, rồi điền kết quả. Chú ý chữ số 0 và số nhớ.",
    parts: ["20 906 × 5 =", { answer: 20906 * 5 }],
    hint: MUL_HINT,
    explanation: explainColumnMul(20906, 5),
  },
} satisfies Record<string, Question>;

const hoatDongQuestions: Question[] = [
  times("hd-1a", 18296, 3),
  times("hd-1b", 50407, 6),
  times("hd-1c", 213645, 2),
  trueFalse("hd-2a", 21070, 4, 48280),
  trueFalse("hd-2b", 36400, 5, 182000),
  trueFalse("hd-2c", 150000, 4, 500000),
  word(
    "hd-3",
    "Quạt trong nhà có tuổi thọ 18 250 giờ. Quạt công nghiệp có tuổi thọ gấp 3 lần quạt trong nhà. Hỏi tuổi thọ của quạt công nghiệp là bao nhiêu giờ?",
    [["Quạt công nghiệp: 18 250 × 3 =", { answer: 18250 * 3 }, "(giờ)"]],
    "“Gấp 3 lần” nghĩa là nhân với 3, không phải cộng thêm 3.",
    `Gấp 3 lần là nhân với 3: ${n(18250)} × 3 = ${n(54750)} giờ.`,
    createElement(SoDoLan, { smallName: "Quạt trong nhà", bigName: "Quạt công nghiệp", smallText: "18 250 giờ", bigText: "? giờ", times: 3 }),
  ),
];

const luyenTapQuestions: Question[] = [
  times("lt-1a", 36208, 5),
  times("lt-1b", 47315, 4),
  times("lt-1c", 182436, 3),
  choice(
    "lt-2",
    "Nam có 150 000 đồng. Nam mua 3 quyển truyện, mỗi quyển 45 000 đồng. Hỏi Nam còn lại bao nhiêu tiền?",
    [`${n(105000)} đồng`, `${n(15000)} đồng`, `${n(135000)} đồng`],
    1,
    "Tìm số tiền mua 3 quyển trước (nhân), rồi lấy số tiền Nam có trừ đi.",
    `3 quyển hết ${n(45000)} × 3 = ${n(135000)} đồng. Còn lại: ${n(150000)} − ${n(135000)} = ${n(15000)} đồng. ${n(135000)} là số tiền đã tiêu; ${n(105000)} là mới trừ một quyển.`,
  ),
  {
    id: "lt-3a",
    kind: "dien-so",
    prompt: "Tính giá trị của biểu thức.",
    parts: [`${n(350126)} + ${n(41305)} × 2 =`, { answer: 350126 + 41305 * 2 }],
    hint: "Nhân làm trước, cộng làm sau.",
    explanation: `${n(41305)} × 2 = ${n(82610)}. Rồi ${n(350126)} + ${n(82610)} = ${n(432736)}.`,
  },
  {
    id: "lt-3b",
    kind: "dien-so",
    prompt: "Tính giá trị của biểu thức.",
    parts: [`${n(705400)} − ${n(32150)} × 5 =`, { answer: 705400 - 32150 * 5 }],
    hint: "Nhân làm trước, trừ làm sau.",
    explanation: `${n(32150)} × 5 = ${n(160750)}. Rồi ${n(705400)} − ${n(160750)} = ${n(544650)}.`,
  },
  {
    id: "lt-4",
    kind: "dien-so",
    prompt:
      "Rô-bốt đặt hạt thóc vào bàn cờ: mỗi ô gấp đôi ô trước đó. Ô thứ 15 đặt 16 384 hạt. Hỏi ô thứ 17 đặt bao nhiêu hạt?",
    parts: ["Ô thứ 17:", { answer: 16384 * 4 }, "hạt"],
    hint: "Từ ô thứ 15 đến ô thứ 17 là hai ô. Mỗi ô gấp đôi ô trước. Gấp đôi hai lần là gấp mấy lần?",
    explanation: `Ô thứ 16: ${n(16384)} × 2 = ${n(32768)}. Ô thứ 17: ${n(32768)} × 2 = ${n(65536)}. Cũng là ${n(16384)} × 4 = ${n(65536)}.`,
  },
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Mai tính 50 806 × 4 = 203 204. Mai sai ở đâu?",
    [
      "Quên cộng số nhớ 2 ở hàng chục; đúng là 203 224",
      "Quên cộng số nhớ 3 ở hàng nghìn; đúng là 203 234",
      "Mai tính đúng",
      "Nhân sai ở hàng đơn vị; đúng là 203 214",
    ],
    0,
    "Chữ số 0 ở hàng chục: 0 × 4 = 0, nhưng hàng đơn vị đã cho nhớ bao nhiêu?",
    `6 × 4 = 24, viết 4 nhớ 2. Ở hàng chục: 0 × 4 = 0, thêm 2 bằng 2, viết 2. Mai đã viết 0 nên ra ${n(203204)}. Đúng là ${n(50806 * 4)}.`,
  ),
  choice(
    "sn-2",
    "Không đặt tính. Kết quả của 30 906 × 7 gần nhất với số nào?",
    ["21 000", "210 000", "2 100 000"],
    1,
    "30 906 gần với 30 000. Con nhẩm 30 nghìn × 7.",
    `30 906 ≈ 30 000 và 30 000 × 7 = ${n(210000)}, nên kết quả gần ${n(210000)} (thật ra ${n(30906 * 7)}). Ước lượng giúp con phát hiện kết quả sai nhiều bậc.`,
  ),
  choice(
    "sn-3",
    "Khi nhân 70 305 × 6, ở hàng nghìn (chữ số 0) con viết chữ số nào?",
    ["0", "1", "6"],
    1,
    "0 × 6 = 0. Nhưng hàng trăm nhân xong có nhớ bao nhiêu?",
    `3 × 6 = 18, viết 8 nhớ 1. Ở hàng nghìn: 0 × 6 = 0, thêm số nhớ 1 bằng 1, viết 1. Tích là ${n(70305 * 6)}.`,
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 4, 5)", questions: hoatDongQuestions },
  { id: "luyen-tap", title: "Luyện tập (trang 5)", questions: luyenTapQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
