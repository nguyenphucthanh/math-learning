import type { ChoiceQuestion, DatTinhQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { explainColumnDiv } from "@/lib/column-div";
import { explainColumnMul } from "@/lib/column-mul";
import { explainColumnSub } from "@/lib/column-sub";

const n = formatNumber;

const ADD_HINT = "Đặt tính thẳng cột, cộng từ hàng đơn vị sang trái. Đủ 10 thì viết hàng này, nhớ 1 sang hàng bên trái.";
const SUB_HINT = "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì mượn 1 ở hàng bên trái.";
const MUL_HINT = "Đặt tính thẳng cột, nhân từ phải sang trái. Nhân với số có hai chữ số thì tích riêng thứ hai viết lùi sang trái một cột.";
const DIV_HINT = "Chia từ hàng cao nhất. Hạ từng chữ số xuống; chưa chia được thì viết 0 ở thương. Số dư luôn bé hơn số chia.";

/** Phép chia: thương, hoặc thương và dư. Tính từ a và b. */
export function divParts(a: number, b: number): Part[] {
  const q = Math.floor(a / b);
  const r = a % b;
  return r ? [`${n(a)} : ${b} =`, { answer: q }, "(dư", { answer: r }, ")"] : [`${n(a)} : ${b} =`, { answer: q }];
}

function add(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) };
}

function sub(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) };
}

function times(id: string, a: number, b: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
    parts: [`${n(a)} × ${b} =`, { answer: a * b }],
    hint: MUL_HINT,
    explanation: b < 10 ? explainColumnMul(a, b) : `${n(a)} × ${b} = ${n(a * (b % 10))} + ${n(a * (b - (b % 10)))} = ${n(a * b)}. Tích riêng thứ hai viết lùi sang trái một cột.`,
  };
}

function divide(id: string, a: number, b: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền thương (và số dư nếu có).",
    parts: divParts(a, b),
    hint: DIV_HINT,
    explanation: explainColumnDiv(a, b),
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function word(id: string, prompt: string, lines: Part[][], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

/** Điền một số còn thiếu của đẳng thức tính chất. Đáp án nhập tay, test kiểm tra hai vế bằng nhau. */
function missing(id: string, prompt: string, before: string, answer: number, after: string, hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts: [before, { answer }, after], hint, explanation };
}

/** Nhắc lại nhanh: mỗi câu thử một ý. Không tính vào tiến độ. */
export const quickChecks = {
  cong: {
    id: "thu-cong",
    kind: "dien-so",
    prompt: "Cộng từ phải sang trái, đủ 10 thì nhớ 1. Tính: 4 786 + 5 214.",
    parts: ["4 786 + 5 214 =", { answer: 4786 + 5214 }],
    hint: "6 + 4 = 10, viết 0 nhớ 1.",
    explanation: `4 786 + 5 214 = ${n(10000)}.`,
  },
  tru: {
    id: "thu-tru",
    kind: "dien-so",
    prompt: "Muốn thử lại phép trừ, lấy hiệu cộng số trừ. Tính: 7 000 − 2 485.",
    parts: ["7 000 − 2 485 =", { answer: 7000 - 2485 }],
    hint: "Hàng đơn vị không trừ được thì mượn, lần lượt sang trái.",
    explanation: "7 000 − 2 485 = 4 515. Thử lại: 4 515 + 2 485 = 7 000.",
  },
  tongHieu: {
    id: "thu-tong-hieu",
    kind: "dien-so",
    prompt: "Hai số có tổng 10 và hiệu 4. Số lớn = (tổng + hiệu) : 2, số bé = (tổng − hiệu) : 2.",
    parts: ["Số lớn:", { answer: (10 + 4) / 2 }, "; số bé:", { answer: (10 - 4) / 2 }],
    hint: "Lấy tổng cộng hiệu rồi chia 2 được số lớn.",
    explanation: "Số lớn (10 + 4) : 2 = 7; số bé (10 − 4) : 2 = 3. Thử: 7 + 3 = 10 và 7 − 3 = 4.",
  },
  giaoHoan: {
    id: "thu-giao-hoan",
    kind: "dien-so",
    prompt: "Đổi chỗ các số hạng thì tổng không đổi: 319 + 425 = 425 + ?",
    parts: ["425 +", { answer: 319 }],
    hint: "a + b = b + a.",
    explanation: "319 + 425 = 425 + 319.",
  },
  lui: choice(
    "thu-lui-cot",
    "Khi đặt tính 215 × 34, tích riêng thứ hai (215 × 3) viết thế nào?",
    ["Thẳng cột với tích riêng thứ nhất", "Lùi sang trái một cột"],
    1,
    "Chữ số 3 của 34 là 3 chục.",
    "215 × 3 chục = 645 chục = 6 450, nên viết lùi sang trái một cột.",
  ),
  du: choice(
    "thu-du",
    "Chia cho 7 thì số dư nào không thể có?",
    ["Dư 6", "Dư 7", "Dư 0"],
    1,
    "Số dư phải bé hơn số chia.",
    "Chia cho 7 thì số dư chỉ là 0, 1, 2, 3, 4, 5 hoặc 6. Dư 7 thì còn chia thêm được.",
  ),
  thuanTien: {
    id: "thu-thuan-tien",
    kind: "dien-so",
    prompt: "Tính thuận tiện: 25 × 36 × 4. Nhân 25 với 4 trước.",
    parts: ["25 × 4 =", { answer: 100 }, "; 100 × 36 =", { answer: 3600 }],
    hint: "Tính chất giao hoán và kết hợp: 25 × 36 × 4 = 25 × 4 × 36.",
    explanation: "25 × 4 = 100, 100 × 36 = 3 600.",
  },
  phanPhoi: {
    id: "thu-phan-phoi",
    kind: "dien-so",
    prompt: "Tính thuận tiện: 47 × 8 + 47 × 2. Đặt 47 làm thừa số chung.",
    parts: ["8 + 2 =", { answer: 10 }, "; 47 × 10 =", { answer: 470 }],
    hint: "a × b + a × c = a × (b + c).",
    explanation: "47 × 8 + 47 × 2 = 47 × (8 + 2) = 47 × 10 = 470.",
  },
  thuTu: choice(
    "thu-thu-tu",
    "Biểu thức 20 + 6 × 5, làm phép tính nào trước?",
    ["20 + 6", "6 × 5"],
    1,
    "Có cộng và nhân, không có dấu ngoặc.",
    "Nhân, chia trước; cộng, trừ sau. 6 × 5 = 30 rồi 20 + 30 = 50.",
  ),
} satisfies Record<string, Question>;

const congTruQuestions: Question[] = [
  add("ct-1a", 6358, 947),
  add("ct-1b", 48635, 9372),
  sub("ct-1c", 71204, 45688),
  sub("ct-1d", 1530200, 718450),
  add("ct-1e", 574306, 428795),
];

const nhanChiaQuestions: Question[] = [
  times("nc-1a", 917, 6),
  times("nc-1b", 408, 35),
  times("nc-1c", 2765, 48),
  divide("nc-2a", 7546, 24),
  divide("nc-2b", 354126, 42),
  divide("nc-2c", 96048, 6),
];

const tinhChatQuestions: Question[] = [
  missing("tc-1a", "Không thực hiện phép tính, tìm số thích hợp.", "258 + 476 = 476 +", 258, "", "Đổi chỗ hai số hạng thì tổng không đổi.", "Tính chất giao hoán: 258 + 476 = 476 + 258."),
  missing("tc-1b", "Không thực hiện phép tính, tìm số thích hợp.", "(135 + 287) + 413 =", 135, "+ (287 + 413)", "Nhóm hai số hạng sau lại với nhau.", "Tính chất kết hợp: (135 + 287) + 413 = 135 + (287 + 413)."),
  missing("tc-1c", "Không thực hiện phép tính, tìm số thích hợp.", "36 × 58 = 58 ×", 36, "", "Đổi chỗ hai thừa số thì tích không đổi.", "Tính chất giao hoán: 36 × 58 = 58 × 36."),
  missing("tc-1d", "Không thực hiện phép tính, tìm số thích hợp.", "(127 × 25) × 4 =", 127, "× (25 × 4)", "Nhóm 25 và 4 lại với nhau.", "Tính chất kết hợp: (127 × 25) × 4 = 127 × (25 × 4)."),
  missing("tc-1e", "Không thực hiện phép tính, tìm số thích hợp.", "205 × 17 + 205 × 13 = 205 × (17 +", 13, ")", "Hai tích có chung thừa số 205: a × b + a × c = a × (b + c).", "Tính chất phân phối: 205 × 17 + 205 × 13 = 205 × (17 + 13)."),
  {
    id: "tc-2a",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: 7 350 + 6 428 + 2 650 − 6 400.",
    parts: ["7 350 + 2 650 =", { answer: 7350 + 2650 }, "; 6 428 − 6 400 =", { answer: 6428 - 6400 }, "; kết quả:", { answer: 7350 + 6428 + 2650 - 6400 }],
    hint: "Ghép 7 350 với 2 650 được số tròn nghìn; ghép 6 428 với 6 400 để trừ.",
    explanation: `7 350 + 2 650 = ${n(10000)}; 6 428 − 6 400 = 28; ${n(10000)} + 28 = ${n(10028)}.`,
  },
  {
    id: "tc-2b",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: 2 804 × 25 × 4.",
    parts: ["25 × 4 =", { answer: 100 }, "; 2 804 × 100 =", { answer: 2804 * 25 * 4 }],
    hint: "Nhân 25 với 4 trước.",
    explanation: `2 804 × 25 × 4 = 2 804 × (25 × 4) = 2 804 × 100 = ${n(280400)}.`,
  },
  {
    id: "tc-2c",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: 356 × 38 + 356 × 62.",
    parts: ["38 + 62 =", { answer: 100 }, "; 356 × 100 =", { answer: 356 * 38 + 356 * 62 }],
    hint: "Đặt 356 làm thừa số chung.",
    explanation: `356 × 38 + 356 × 62 = 356 × (38 + 62) = 356 × 100 = ${n(35600)}.`,
  },
];

const bieuThucQuestions: Question[] = [
  {
    id: "bt-1a",
    kind: "dien-so",
    prompt: "Tính giá trị của biểu thức 7 246 + 215 × 36. Nhân trước, cộng sau.",
    parts: ["215 × 36 =", { answer: 215 * 36 }, "; 7 246 +", { answer: 215 * 36 }, "=", { answer: 7246 + 215 * 36 }],
    hint: "Biểu thức có cộng và nhân, không có ngoặc: làm phép nhân trước.",
    explanation: `215 × 36 = ${n(7740)}; 7 246 + ${n(7740)} = ${n(14986)}.`,
  },
  {
    id: "bt-1b",
    kind: "dien-so",
    prompt: "Tính giá trị của biểu thức 5 138 − (8 465 − 4 565) : 15. Ngoặc trước, rồi chia, rồi trừ.",
    parts: ["8 465 − 4 565 =", { answer: 8465 - 4565 }, "; 3 900 : 15 =", { answer: (8465 - 4565) / 15 }, "; 5 138 − 260 =", { answer: 5138 - (8465 - 4565) / 15 }],
    hint: "Làm trong ngoặc trước. Sau đó chia, cuối cùng mới trừ.",
    explanation: `(8 465 − 4 565) = ${n(3900)}; ${n(3900)} : 15 = 260; 5 138 − 260 = ${n(4878)}.`,
  },
  choice(
    "bt-2",
    "Giá trị của 120 − 8 × 6 + 4 là bao nhiêu?",
    ["76", "676", "52", "72"],
    0,
    "Nhân trước, rồi làm cộng, trừ từ trái sang phải.",
    "8 × 6 = 48; 120 − 48 = 72; 72 + 4 = 76.",
  ),
];

const baiToanQuestions: Question[] = [
  word(
    "bt-lv-1",
    "Hai xe bồn chở tất cả 47 000 l xăng. Xe thứ nhất chở nhiều hơn xe thứ hai 5 000 l. Hỏi mỗi xe chở bao nhiêu lít xăng?",
    [
      ["Xe thứ nhất chở: (47 000 + 5 000) : 2 =", { answer: (47000 + 5000) / 2 }, "(l)"],
      ["Xe thứ hai chở: (47 000 − 5 000) : 2 =", { answer: (47000 - 5000) / 2 }, "(l)"],
    ],
    "Bài toán tìm hai số biết tổng và hiệu. Số lớn = (tổng + hiệu) : 2, số bé = (tổng − hiệu) : 2.",
    `Xe thứ nhất ${n(26000)} l, xe thứ hai ${n(21000)} l. Thử: ${n(26000)} + ${n(21000)} = ${n(47000)} và ${n(26000)} − ${n(21000)} = ${n(5000)}.`,
  ),
  word(
    "bt-lv-2",
    "Một đoàn tàu có 12 toa: 7 toa mỗi toa chở 16 400 kg và 5 toa mỗi toa chở 14 600 kg. Hỏi trung bình mỗi toa chở bao nhiêu ki-lô-gam?",
    [
      ["7 toa chở:", { answer: 7 * 16400 }, "(kg)"],
      ["5 toa chở:", { answer: 5 * 14600 }, "(kg)"],
      ["Trung bình mỗi toa: (114 800 + 73 000) : (7 + 5) =", { answer: (7 * 16400 + 5 * 14600) / 12 }, "(kg)"],
    ],
    "Tìm tổng số ki-lô-gam của cả đoàn tàu, rồi chia cho số toa (7 + 5).",
    `Cả đoàn tàu chở ${n(114800)} + ${n(73000)} = ${n(187800)} kg. Trung bình mỗi toa ${n(187800)} : 12 = ${n(15650)} kg.`,
  ),
  word(
    "bt-lv-3",
    "Chú Hùng lái xe đi 400 km. Cứ đi 100 km thì xe tiêu hao 7 l xăng, mỗi lít xăng giá 24 000 đồng. Hỏi chú Hùng phải trả bao nhiêu tiền xăng cho cả quãng đường?",
    [
      ["400 km gấp 100 km số lần:", { answer: 400 / 100 }, "(lần)"],
      ["Số lít xăng:", { answer: (400 / 100) * 7 }, "(l)"],
      ["Tiền xăng:", { answer: (400 / 100) * 7 * 24000 }, "(đồng)"],
    ],
    "Tìm số lít xăng đã dùng (quãng đường gấp 100 km mấy lần, nhân với 7 l), rồi nhân với giá một lít.",
    `400 : 100 = 4; 4 × 7 = 28 l; 28 × ${n(24000)} = ${n(672000)} đồng.`,
  ),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Không đặt tính. Kết quả của 612 × 49 gần nhất với số nào?",
    ["3 000", "30 000", "300 000"],
    1,
    "612 gần 600, 49 gần 50. Nhẩm 600 × 50.",
    `600 × 50 = ${n(30000)}, nên kết quả gần ${n(30000)} (thật ra ${n(612 * 49)}).`,
  ),
  choice(
    "sn-2",
    "Không đặt tính. Thương của 7 846 : 38 gần nhất với số nào?",
    ["20", "200", "2 000"],
    1,
    "7 846 gần 8 000, 38 gần 40. Nhẩm 8 000 : 40.",
    `8 000 : 40 = 200, nên thương gần 200 (thật ra ${Math.floor(7846 / 38)} dư ${7846 % 38}).`,
  ),
  choice(
    "sn-3",
    "Bạn An đặt tính 306 × 24 rồi viết tích riêng thứ nhất 1 224, tích riêng thứ hai 612 thẳng cột với 1 224 và cộng được 1 836. Bạn An sai ở đâu?",
    ["Tích riêng thứ nhất tính sai", "Tích riêng thứ hai phải viết lùi sang trái một cột", "Phải cộng ba tích riêng"],
    1,
    "Chữ số 2 trong 24 là 2 chục. Tích riêng thứ hai là 306 × 2 chục.",
    `306 × 4 = ${n(1224)} đúng. 306 × 2 chục = ${n(6120)}, phải viết lùi một cột. ${n(1224)} + ${n(6120)} = ${n(7344)} = 306 × 24.`,
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "cong-tru", title: "Cộng, trừ số nhiều chữ số", questions: congTruQuestions },
  { id: "nhan-chia", title: "Nhân, chia số nhiều chữ số", questions: nhanChiaQuestions },
  { id: "tinh-chat", title: "Tính chất và tính thuận tiện", questions: tinhChatQuestions },
  { id: "bieu-thuc", title: "Tính giá trị biểu thức", questions: bieuThucQuestions },
  { id: "bai-toan", title: "Bài toán có lời văn", questions: baiToanQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
