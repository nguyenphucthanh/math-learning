import type { ChoiceQuestion, DatTinhQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { explainColumnDiv } from "@/lib/column-div";
import { explainColumnMul } from "@/lib/column-mul";
import { explainColumnSub } from "@/lib/column-sub";
import { createElement } from "react";
import { SoDoLan } from "./_illustrations/so-do-lan";

const n = formatNumber;

/**
 * Tính giá trị biểu thức chỉ có số nguyên, + − × : và ngoặc.
 * Nhân, chia làm trước cộng, trừ; cùng cấp thì từ trái sang phải; ngoặc làm trước.
 */
export function evalExpr(text: string): number {
  const tokens = text.replace(/(?<=\d)[\s ](?=\d)/g, "").match(/\d+|[+\-−×x:÷()]/g) ?? [];
  let at = 0;
  const factor = (): number => {
    const token = tokens[at++];
    if (token === "(") {
      const value = expr();
      at++;
      return value;
    }
    return Number(token);
  };
  const term = (): number => {
    let value = factor();
    while (tokens[at] === "×" || tokens[at] === "x" || tokens[at] === ":" || tokens[at] === "÷") {
      const op = tokens[at++];
      const right = factor();
      value = op === ":" || op === "÷" ? value / right : value * right;
    }
    return value;
  };
  const expr = (): number => {
    let value = term();
    while (tokens[at] === "+" || tokens[at] === "−" || tokens[at] === "-") {
      const op = tokens[at++];
      const right = term();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  };
  return expr();
}

const ADD_HINT = "Cộng từ hàng đơn vị sang trái. Hàng nào cộng được từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng bên trái.";
const SUB_HINT =
  "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.";
const MUL_HINT = "Nhân từng chữ số với số nhân, từ hàng đơn vị sang trái. Viết chữ số đơn vị của tích, nhớ phần chục sang hàng bên trái, nhớ cộng thêm vào tích hàng đó.";
const DIV_HINT = "Chia từ hàng cao nhất. Mỗi lần: chia, nhân, trừ, rồi hạ chữ số tiếp theo. Chưa chia được thì viết 0 ở thương.";

function add(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) };
}

function sub(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) };
}

/** Tính nhẩm: đáp án tính từ biểu thức, không gõ tay. */
function mental(id: string, text: string, hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt: "Tính nhẩm.", parts: [`${text} =`, { answer: evalExpr(text) }], hint, explanation };
}

/** Tính giá trị biểu thức, đáp án tính từ biểu thức. */
function expression(id: string, text: string, hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt: "Tính giá trị của biểu thức.", parts: [`${text} =`, { answer: evalExpr(text) }], hint, explanation };
}

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

function divide(id: string, a: number, d: number): FillQuestion {
  const remainder = a % d;
  return {
    id,
    kind: "dien-so",
    prompt: remainder
      ? "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền thương và số dư."
      : "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
    parts: remainder
      ? [`${n(a)} : ${d} =`, { answer: Math.floor(a / d) }, "dư", { answer: remainder }]
      : [`${n(a)} : ${d} =`, { answer: a / d }],
    hint: DIV_HINT,
    explanation: explainColumnDiv(a, d),
  };
}

/** Câu chọn đáp án; `answerIndex` là vị trí đáp án đúng trong `options`. */
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** Bài toán hai bước đã có lời giải: `lines` là các dòng "phép tính = ô trống". */
function word(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

/** Khởi động đầu bài: nhẩm theo nghìn, bảng nhân, chia có dư, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-nham",
    kind: "dien-so",
    prompt: "Tính nhẩm: coi 6 000 là 6 nghìn.",
    parts: ["6 000 + 7 000 =", { answer: 6000 + 7000 }],
    hint: "6 nghìn + 7 nghìn là bao nhiêu nghìn?",
    explanation: "6 nghìn + 7 nghìn = 13 nghìn, tức là 13 000.",
  },
  {
    id: "kd-nhan",
    kind: "dien-so",
    parts: ["4 × 8 =", { answer: 32 }, "; 3 × 7 =", { answer: 21 }],
    hint: "Con nhớ lại bảng nhân 4 và bảng nhân 3.",
    explanation: "4 × 8 = 32 và 3 × 7 = 21.",
  },
  {
    id: "kd-chia-du",
    kind: "dien-so",
    prompt: "Chia có dư: 23 chia 4.",
    parts: ["23 : 4 =", { answer: 5 }, "dư", { answer: 3 }],
    hint: "4 nhân mấy gần 23 nhất mà không vượt quá 23? Phần còn lại là số dư.",
    explanation: "4 × 5 = 20; 23 − 20 = 3. Vậy 23 : 4 = 5 dư 3. Số dư 3 bé hơn số chia 4.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  congTru: {
    id: "thu-cong-tru",
    kind: "dien-so",
    prompt: "Tính: 6 428 + 3 795.",
    parts: ["6 428 + 3 795 =", { answer: 6428 + 3795 }],
    hint: "Cộng từ hàng đơn vị: 8 + 5 = 13, viết 3 nhớ 1.",
    explanation: explainColumnAdd(6428, 3795),
  },
  nhan: {
    id: "thu-nhan",
    kind: "dien-so",
    prompt: "Đặt tính rồi tính (ra giấy nháp, rồi điền kết quả).",
    parts: ["2 305 × 4 =", { answer: 2305 * 4 }],
    hint: MUL_HINT,
    explanation: explainColumnMul(2305, 4),
  },
  chia: {
    id: "thu-chia",
    kind: "dien-so",
    prompt: "Đặt tính rồi tính (ra giấy nháp, rồi điền thương và số dư).",
    parts: ["7 018 : 3 =", { answer: Math.floor(7018 / 3) }, "dư", { answer: 7018 % 3 }],
    hint: DIV_HINT,
    explanation: explainColumnDiv(7018, 3),
  },
  thuTu: {
    id: "thu-thu-tu",
    kind: "dien-so",
    parts: ["5 000 + 6 000 × 2 =", { answer: evalExpr("5 000 + 6 000 × 2") }],
    hint: "Nhân, chia làm trước cộng, trừ. Con tính 6 000 × 2 trước.",
    explanation: "6 000 × 2 = 12 000; 5 000 + 12 000 = 17 000.",
  },
  giamLan: {
    id: "thu-giam-lan",
    kind: "trac-nghiem",
    prompt: "Số bánh giảm đi 3 lần. Con làm phép tính nào?",
    options: ["Chia cho 3", "Trừ đi 3", "Nhân với 3", "Cộng thêm 3"],
    answerIndex: 0,
    hint: "“Gấp lên 3 lần” là nhân với 3. “Giảm đi 3 lần” là phép ngược lại.",
    explanation: "Giảm đi 3 lần nghĩa là chia thành 3 phần bằng nhau, nên ta chia cho 3. Trừ đi 3 là “bớt 3 đơn vị”, khác với giảm đi 3 lần.",
  },
} satisfies Record<string, Question>;

const tinhNhamQuestions: Question[] = [
  mental("nham-1", "7 000 + 6 000", "Coi 7 000 là 7 nghìn, 6 000 là 6 nghìn.", "7 nghìn + 6 nghìn = 13 nghìn, tức 13 000."),
  mental("nham-2", "15 000 − 8 000", "15 nghìn trừ 8 nghìn.", "15 nghìn − 8 nghìn = 7 nghìn, tức 7 000."),
  mental("nham-3", "24 000 + 40 000", "Coi là 24 nghìn cộng 40 nghìn.", "24 nghìn + 40 nghìn = 64 nghìn, tức 64 000."),
  mental("nham-4", "38 000 + 2 000 + 9 000", "Làm từ trái sang phải. 38 nghìn thêm 2 nghìn được số tròn chục nghìn.", "38 000 + 2 000 = 40 000; 40 000 + 9 000 = 49 000."),
  mental("nham-5", "82 000 − 2 000 − 60 000", "Từ trái sang phải: trừ 2 nghìn trước, rồi trừ 60 nghìn.", "82 000 − 2 000 = 80 000; 80 000 − 60 000 = 20 000."),
  mental("nham-6", "41 000 + 6 000 − 18 000", "Cộng trước, trừ sau (từ trái sang phải).", "41 000 + 6 000 = 47 000; 47 000 − 18 000 = 29 000."),
];

const bieuThucQuestions: Question[] = [
  expression("bt-1", "63 480 − (35 420 − 5 420)", "Làm trong ngoặc trước: 35 420 − 5 420 là số tròn.", "Trong ngoặc: 35 420 − 5 420 = 30 000. Rồi 63 480 − 30 000 = 33 480."),
  expression("bt-2", "18 000 + 7 250 + 3 640", "Chỉ có cộng, tính từ trái sang phải.", "18 000 + 7 250 = 25 250; 25 250 + 3 640 = 28 890."),
  expression("bt-3", "7 000 × 4 : 2", "Có nhân và chia, tính từ trái sang phải.", "7 000 × 4 = 28 000; 28 000 : 2 = 14 000."),
  expression("bt-4", "12 304 × (45 : 9)", "Làm trong ngoặc trước: 45 : 9.", "Trong ngoặc: 45 : 9 = 5. Rồi 12 304 × 5 = 61 520."),
  expression("bt-5", "(63 000 − 7 000) : 8", "Làm trong ngoặc trước.", "Trong ngoặc: 63 000 − 7 000 = 56 000. Rồi 56 000 : 8 = 7 000."),
  expression("bt-6", "52 340 − 6 130 × 5", "Nhân làm trước trừ. Con tính 6 130 × 5 trước.", "6 130 × 5 = 30 650. Rồi 52 340 − 30 650 = 21 690."),
];

const matchLeft = ["3 000 × 6", "72 000 : 8", "40 000 × 2", "50 000 : 5"];
const noiPhep: MatchQuestion = {
  id: "nc-1",
  kind: "noi-cap",
  prompt: "Nối mỗi phép tính với kết quả của nó.",
  pairs: matchLeft.map((left) => ({ left, right: n(evalExpr(left)) })),
  rightOrder: [2, 3, 1, 0],
  hint: "Con nhẩm theo nghìn: 3 nghìn × 6 là bao nhiêu nghìn?",
  explanation: `${matchLeft.map((left) => `${left} = ${n(evalExpr(left))}`).join("; ")}.`,
};

const nhanChiaQuestions: Question[] = [
  noiPhep,
  times("nc-2", 4062, 8),
  times("nc-3", 16428, 5),
  divide("nc-4", 72056, 8),
  divide("nc-5", 83927, 4),
];

const tracNghiemQuestions: Question[] = [
  choice(
    "tn-1",
    "Tổng của 47 350 và 9 480 là:",
    ["56 830", "56 730", "46 830", "55 830"],
    0,
    ADD_HINT,
    `47 350 + 9 480 = 56 830. ${explainColumnAdd(47350, 9480)}`,
  ),
  choice(
    "tn-2",
    "Hiệu của 71 304 và 28 659 là:",
    ["43 645", "42 745", "42 645", "43 755"],
    2,
    SUB_HINT,
    explainColumnSub(71304, 28659),
  ),
  choice(
    "tn-3",
    "Tích của 18 094 và 4 là:",
    ["72 296", "72 476", "72 367", "72 376"],
    3,
    MUL_HINT,
    explainColumnMul(18094, 4),
  ),
  choice(
    "tn-4",
    "Thực hiện phép tính 62 835 : 7 được:",
    ["Thương là 8 975 và số dư là 10", "Thương là 8 976 và số dư là 3", "Thương là 897 và số dư là 3", "Thương là 8 976 và số dư là 4"],
    1,
    "Số dư luôn bé hơn số chia. Thử lại: thương × 7 + số dư phải bằng 62 835.",
    explainColumnDiv(62835, 7),
  ),
];

const baiToanQuestions: Question[] = [
  word(
    "bt-but",
    "Giá một hộp bút là 14 500 đồng, giá một ba lô học sinh nhiều hơn giá một hộp bút là 58 000 đồng. Mẹ mua cho An một hộp bút và một ba lô học sinh. Hỏi mẹ của An phải trả người bán hàng bao nhiêu tiền?",
    [
      ["Giá một ba lô: 14 500 + 58 000 =", { answer: 14500 + 58000 }, "(đồng)"],
      ["Mẹ phải trả: 14 500 + giá ba lô =", { answer: 14500 + 14500 + 58000 }, "(đồng)"],
    ],
    "“Nhiều hơn” thì cộng. Tìm giá ba lô trước, rồi cộng thêm giá hộp bút.",
    `Ba lô: ${n(14500)} + ${n(58000)} = ${n(72500)} đồng. Cả hai món: ${n(14500)} + ${n(72500)} = ${n(87000)} đồng.`,
  ),
  word(
    "bt-gao",
    "Có 3 xe ô tô, mỗi xe chở 6 400 kg gạo đến giúp đỡ đồng bào vùng bị lũ lụt. Dự kiến tất cả số gạo đó được chia đều cho 4 xã. Hỏi mỗi xã sẽ nhận được bao nhiêu ki-lô-gam gạo?",
    [
      ["Số gạo của 3 xe: 6 400 × 3 =", { answer: 6400 * 3 }, "(kg)"],
      ["Mỗi xã nhận: số gạo của 3 xe : 4 =", { answer: (6400 * 3) / 4 }, "(kg)"],
    ],
    "Tìm tổng số gạo (nhân) trước, rồi chia đều cho 4 xã (chia).",
    `Tổng số gạo: ${n(6400)} × 3 = ${n(19200)} kg. Mỗi xã: ${n(19200)} : 4 = ${n(4800)} kg.`,
  ),
  word(
    "bt-do-choi",
    "Ở một nhà máy sản xuất đồ chơi trẻ em, tháng Ba sản xuất được 14 760 sản phẩm. Số sản phẩm sản xuất được trong tháng Tư giảm đi 3 lần so với tháng Ba. Hỏi tháng Tư nhà máy đó sản xuất được bao nhiêu sản phẩm?",
    [["Tháng Tư: 14 760 : 3 =", { answer: 14760 / 3 }, "(sản phẩm)"]],
    "“Giảm đi 3 lần” nghĩa là chia cho 3, không phải trừ đi 3.",
    `Giảm đi 3 lần là chia cho 3: ${n(14760)} : 3 = ${n(4920)} sản phẩm.`,
    createElement(SoDoLan, { smallName: "Tháng Tư", bigName: "Tháng Ba", smallText: "?", bigText: "14 760 sản phẩm", times: 3 }),
  ),
  word(
    "bt-sach",
    "Để phục vụ năm học mới, một cửa hàng nhập về 3 060 quyển sách tham khảo. Số sách giáo khoa nhập về gấp 4 lần số sách tham khảo. Hỏi cửa hàng đó nhập về tất cả bao nhiêu quyển sách giáo khoa và sách tham khảo?",
    [
      ["Sách giáo khoa: 3 060 × 4 =", { answer: 3060 * 4 }, "(quyển)"],
      ["Tất cả: sách giáo khoa + 3 060 =", { answer: 3060 * 4 + 3060 }, "(quyển)"],
    ],
    "“Gấp 4 lần” là nhân với 4. Câu hỏi là “tất cả” nên phải cộng cả sách tham khảo.",
    `Sách giáo khoa: ${n(3060)} × 4 = ${n(12240)} quyển. Tất cả: ${n(12240)} + ${n(3060)} = ${n(15300)} quyển.`,
    createElement(SoDoLan, { smallName: "Sách tham khảo", bigName: "Sách giáo khoa", smallText: "3 060 quyển", bigText: "?", times: 4 }),
  ),
];

/** Suy nghĩ thêm, vượt SGK: tìm lỗi sai, ước lượng, nhận ra phép tính khác biệt. */
const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Phép tính nào có kết quả khác ba phép tính còn lại?",
    ["60 000 : 2", "5 000 × 6", "10 000 × 3", "8 000 × 4"],
    3,
    "Tính kết quả từng phép rồi so sánh. Ba phép giống nhau, một phép khác.",
    "60 000 : 2 = 30 000; 5 000 × 6 = 30 000; 10 000 × 3 = 30 000; còn 8 000 × 4 = 32 000. Vậy phép 8 000 × 4 khác ba phép còn lại.",
  ),
  choice(
    "sn-2",
    "Nam tính 24 000 − 4 000 × 3 = 60 000. Nam sai ở đâu?",
    ["Phải nhân trước: 4 000 × 3 = 12 000, rồi 24 000 − 12 000 = 12 000", "Phải cộng 4 000 với 3 trước", "Nam tính đúng", "Phải chia 24 000 cho 4 000 trước"],
    0,
    "Biểu thức có trừ và nhân. Phép nào phải làm trước?",
    "Nhân, chia làm trước cộng, trừ. 4 000 × 3 = 12 000; 24 000 − 12 000 = 12 000. Nam đã trừ trước (24 000 − 4 000 = 20 000) rồi mới nhân 3 nên ra 60 000.",
  ),
  choice(
    "sn-3",
    "Ước lượng: kết quả của 4 987 × 6 gần nhất với số nào?",
    ["300 000", "3 000", "30 000", "24 000"],
    2,
    "4 987 gần với 5 000. Con nhẩm 5 000 × 6 xem được bao nhiêu.",
    "4 987 ≈ 5 000 và 5 000 × 6 = 30 000, nên kết quả gần 30 000 (thật ra 4 987 × 6 = 29 922). Ước lượng giúp con phát hiện kết quả sai nhiều bậc.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "tinh-nham", title: "Tính nhẩm (trang 9)", questions: tinhNhamQuestions },
  {
    id: "cong-tru",
    title: "Đặt tính cộng, trừ (trang 9)",
    questions: [add("ct-1", 7365, 5487), add("ct-2", 47538, 36094), sub("ct-3", 42061, 953), sub("ct-4", 83417, 25169)],
  },
  { id: "bieu-thuc", title: "Tính giá trị của biểu thức (trang 9, 10, 11)", questions: bieuThucQuestions },
  { id: "nhan-chia", title: "Nhân, chia (trang 10)", questions: nhanChiaQuestions },
  { id: "trac-nghiem", title: "Chọn câu trả lời đúng (trang 11)", questions: tracNghiemQuestions },
  { id: "bai-toan", title: "Giải bài toán (trang 9, 10, 11)", questions: baiToanQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
