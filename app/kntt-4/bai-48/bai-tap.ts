import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnDiv } from "@/lib/column-div";

const n = formatNumber;

const MUL_HINT = "Đặt tính thẳng cột, nhân từ phải sang trái. Nhân với số có hai chữ số thì tích riêng thứ hai viết lùi sang trái một cột.";
const DIV_HINT = "Chia từ hàng cao nhất. Hạ từng chữ số xuống; chưa chia được thì viết 0 ở thương. Số dư luôn bé hơn số chia.";

/** Phép chia: thương, hoặc thương và dư. Tính từ a và b. */
export function divParts(a: number, b: number): Part[] {
  const q = Math.floor(a / b);
  const r = a % b;
  return r ? [`${n(a)} : ${b} =`, { answer: q }, "(dư", { answer: r }, ")"] : [`${n(a)} : ${b} =`, { answer: q }];
}

/** Nhiều phép tính nhẩm, mỗi phép một ô; `op` là nhân hoặc chia. */
function mental(id: string, prompt: string, op: "×" | ":", pairs: [number, number][], hint: string, explanation: string): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: pairs.flatMap(([a, b], index): Part[] => [`${index ? "; " : ""}${n(a)} ${op} ${n(b)} =`, { answer: op === "×" ? a * b : a / b }]),
    hint,
    explanation,
  };
}

function times(id: string, a: number, b: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
    parts: [`${n(a)} × ${b} =`, { answer: a * b }],
    hint: MUL_HINT,
    explanation: `${n(a)} × ${b} = ${n(a * b)}.`,
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

const TF = ["Đúng", "Sai"];

/** Đ, S: kết quả `shown` của phép nhân a × b. Đáp án tính lại từ a × b. */
export function mulClaim(id: string, a: number, b: number, shown: number): ChoiceQuestion {
  const ok = a * b === shown;
  return choice(
    id,
    `Đúng hay sai? ${n(a)} × ${b} = ${n(shown)}`,
    TF,
    ok ? 0 : 1,
    "Đặt tính ra vở rồi so với kết quả đã cho. Ước lượng trước cũng giúp: nhân số tròn gần nhất.",
    ok ? `${n(a)} × ${b} = ${n(a * b)}. Kết quả đã cho đúng.` : `Sai. ${n(a)} × ${b} = ${n(a * b)}, không phải ${n(shown)}.`,
  );
}

/** Đ, S: kết quả phép chia, kể cả số dư (số dư phải bé hơn số chia). */
export function divClaim(id: string, a: number, b: number, shownQ: number, shownR: number): ChoiceQuestion {
  const q = Math.floor(a / b);
  const r = a % b;
  const ok = q === shownQ && r === shownR;
  return choice(
    id,
    `Đúng hay sai? ${n(a)} : ${b} = ${n(shownQ)} (dư ${shownR})`,
    TF,
    ok ? 0 : 1,
    "Số dư phải bé hơn số chia. Thử lại: thương × số chia + số dư phải bằng số bị chia.",
    ok ? `Đúng. ${n(shownQ)} × ${b} + ${shownR} = ${n(a)}.` : `Sai. ${explainColumnDiv(a, b)}`,
  );
}

/** Đ, S về hai mảnh vườn: chữ nhật d × r và hình vuông cạnh c. */
function gardenClaim(id: string, kind: "chuVi" | "dienTichBang" | "dienTichBe", d: number, r: number, c: number): ChoiceQuestion {
  const pr = (d + r) * 2;
  const pc = c * 4;
  const ar = d * r;
  const ac = c * c;
  const text = {
    chuVi: "Chu vi của hai mảnh vườn bằng nhau.",
    dienTichBang: "Diện tích mảnh vườn hình chữ nhật bằng diện tích mảnh vườn hình vuông.",
    dienTichBe: "Diện tích mảnh vườn hình chữ nhật bé hơn diện tích mảnh vườn hình vuông.",
  }[kind];
  const ok = kind === "chuVi" ? pr === pc : kind === "dienTichBang" ? ar === ac : ar < ac;
  return choice(
    id,
    `Mảnh vườn hình chữ nhật dài ${d} m, rộng ${r} m. Mảnh vườn hình vuông có cạnh ${c} m. Đúng hay sai? ${text}`,
    TF,
    ok ? 0 : 1,
    "Chu vi hình chữ nhật là (dài + rộng) × 2, chu vi hình vuông là cạnh × 4. Diện tích là dài × rộng, hoặc cạnh × cạnh.",
    `Chu vi: (${d} + ${r}) × 2 = ${pr} m và ${c} × 4 = ${pc} m. Diện tích: ${d} × ${r} = ${ar} m² và ${c} × ${c} = ${ac} m². ${ok ? "Câu này đúng." : "Câu này sai."}`,
  );
}

/** Nhắc lại nhanh: mỗi câu thử một ý. Không tính vào tiến độ. */
export const quickChecks = {
  nhan10: mental("thu-nhan-10", "Nhân một số với 10, 100, 1 000: viết thêm một, hai, ba chữ số 0 vào bên phải.", "×", [[4752, 100]], "100 có hai chữ số 0.", "4 752 × 100 = 475 200."),
  chia10: mental("thu-chia-10", "Chia cho 10, 100, 1 000: bỏ bớt một, hai, ba chữ số 0 ở bên phải.", ":", [[360000, 1000]], "1 000 có ba chữ số 0.", "360 000 : 1 000 = 360."),
  tronChuc: mental("thu-tron-chuc", "Nhẩm theo mẫu: 600 × 40 = (6 × 4) × 1 000.", "×", [[500, 60]], "5 × 6 = 30, rồi thêm 3 chữ số 0.", "500 × 60 = (5 × 6) × 1 000 = 30 000."),
  chiaTronChuc: mental("thu-chia-tron-chuc", "Nhẩm theo mẫu: 400 : 20 = 40 : 2.", ":", [[3200, 80]], "Cùng bỏ một chữ số 0 ở số bị chia và số chia: 320 : 8.", "3 200 : 80 = 320 : 8 = 40."),
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
    "Phép chia 100 : 7 = 14 dư 2. Số dư nào không thể có khi chia cho 7?",
    ["Dư 6", "Dư 7", "Dư 0"],
    1,
    "Số dư phải bé hơn số chia.",
    "Chia cho 7 thì số dư chỉ có thể là 0, 1, 2, 3, 4, 5 hoặc 6. Dư 7 thì còn chia thêm được.",
  ),
  thuanTien: {
    id: "thu-thuan-tien",
    kind: "dien-so",
    prompt: "Tính thuận tiện: 25 × 36 × 4. Đổi chỗ để nhân 25 với 4 trước.",
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
} satisfies Record<string, Question>;

const nhan10Questions: Question[] = [
  mental("nh-1a", "Tính nhẩm.", "×", [[36475, 10], [8204, 100], [5619, 1000]], "Viết thêm một, hai, ba chữ số 0 vào bên phải.", "Nhân với 10, 100, 1 000 thì viết thêm 1, 2, 3 chữ số 0 vào bên phải số bị nhân."),
  mental("nh-1b", "Tính nhẩm.", ":", [[724500, 100], [480300, 10], [350000, 1000]], "Bỏ bớt một, hai, ba chữ số 0 ở bên phải. Số bị chia phải đủ chữ số 0.", "Chia cho 10, 100, 1 000 thì bỏ bớt 1, 2, 3 chữ số 0 ở bên phải số bị chia."),
  mental("nh-2a", "Tính nhẩm theo mẫu: 30 × 20 = (3 × 2) × 100.", "×", [[50, 60], [80, 30], [700, 20], [600, 50]], "Nhân hai số khác 0 trước, rồi thêm tất cả các chữ số 0 còn lại.", "50 × 60 = 3 000; 80 × 30 = 2 400; 700 × 20 = 14 000; 600 × 50 = 30 000."),
  mental("nh-2b", "Tính nhẩm theo mẫu: 400 : 20 = 40 : 2.", ":", [[800, 40], [2400, 600], [560, 70], [42000, 700]], "Cùng bỏ bấy nhiêu chữ số 0 ở số bị chia và số chia rồi chia.", "800 : 40 = 80 : 4 = 20; 2 400 : 600 = 24 : 6 = 4; 560 : 70 = 56 : 7 = 8; 42 000 : 700 = 420 : 7 = 60."),
];

const datTinhQuestions: Question[] = [
  times("dt-1a", 83406, 7),
  divide("dt-1b", 52718, 8),
  times("dt-1c", 3407, 52),
  divide("dt-1d", 183546, 36),
  {
    id: "dt-2a",
    kind: "dien-so",
    prompt: "Số?",
    parts: [{ answer: 3042 }, "× 8 = 24 336"],
    hint: "Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.",
    explanation: "24 336 : 8 = 3 042.",
  },
  {
    id: "dt-2b",
    kind: "dien-so",
    prompt: "Số?",
    parts: [{ answer: 7344 }, ": 36 = 204"],
    hint: "Muốn tìm số bị chia, lấy thương nhân với số chia.",
    explanation: "204 × 36 = 7 344.",
  },
];

const tinhChatQuestions: Question[] = [
  {
    id: "tc-1a",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: 250 × 36 × 4.",
    parts: ["250 × 4 =", { answer: 1000 }, "; 1 000 × 36 =", { answer: 36000 }],
    hint: "Đổi chỗ các thừa số để được tích tròn trăm, tròn nghìn.",
    explanation: `250 × 36 × 4 = 250 × 4 × 36 = ${n(1000)} × 36 = ${n(36000)}.`,
  },
  {
    id: "tc-1b",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: 125 × 24 × 8.",
    parts: ["125 × 8 =", { answer: 1000 }, "; 1 000 × 24 =", { answer: 24000 }],
    hint: "125 × 8 = 1 000.",
    explanation: `125 × 24 × 8 = 125 × 8 × 24 = ${n(1000)} × 24 = ${n(24000)}.`,
  },
  {
    id: "tc-2",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: 78 × 25 + 25 × 22.",
    parts: ["78 + 22 =", { answer: 100 }, "; 25 × 100 =", { answer: 2500 }],
    hint: "Hai tích đều có thừa số 25: 25 × (78 + 22).",
    explanation: `78 × 25 + 25 × 22 = 25 × (78 + 22) = 25 × 100 = ${n(2500)}.`,
  },
];

const loiVanQuestions: Question[] = [
  word(
    "lv-1",
    "Một cửa hàng nhập về 18 thùng cam nặng như nhau, cân nặng tất cả 576 kg. Cửa hàng đã bán 11 thùng. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam cam?",
    [
      ["Mỗi thùng nặng: 576 : 18 =", { answer: 576 / 18 }, "(kg)"],
      ["Còn lại số thùng: 18 − 11 =", { answer: 7 }, "(thùng)"],
      ["Còn lại: 32 × 7 =", { answer: 224 }, "(kg)"],
    ],
    "Tìm cân nặng của một thùng bằng phép chia, rồi nhân với số thùng còn lại.",
    "Mỗi thùng 576 : 18 = 32 kg. Còn 18 − 11 = 7 thùng, nặng 32 × 7 = 224 kg.",
  ),
  word(
    "lv-2",
    "Có 54 cái bút chì xếp đều vào 9 hộp. Hỏi có 500 cái bút chì cùng loại thì xếp được nhiều nhất bao nhiêu hộp như thế và còn thừa mấy cái?",
    [
      ["Mỗi hộp có: 54 : 9 =", { answer: 6 }, "(cái)"],
      ["500 : 6 =", { answer: 83 }, "(dư", { answer: 2 }, ")"],
    ],
    "Tìm số bút trong một hộp, rồi lấy 500 chia cho số đó. Thương là số hộp, số dư là số bút thừa.",
    "Mỗi hộp 6 cái. 500 : 6 = 83 dư 2, nên xếp được 83 hộp và thừa 2 cái bút chì.",
  ),
  word(
    "lv-3",
    "Khối 4 của một trường tiểu học gồm 1 lớp có 30 học sinh và 5 lớp, mỗi lớp có 36 học sinh. Hỏi trung bình mỗi lớp khối 4 có bao nhiêu học sinh?",
    [
      ["5 lớp có: 36 × 5 =", { answer: 180 }, "(học sinh)"],
      ["Cả khối: 180 + 30 =", { answer: 210 }, "(học sinh)"],
      ["Trung bình mỗi lớp: 210 : (5 + 1) =", { answer: 35 }, "(học sinh)"],
    ],
    "Tìm tổng số học sinh cả khối, rồi chia cho số lớp (nhớ đếm cả lớp thứ nhất).",
    "Tổng số học sinh 36 × 5 + 30 = 210. Số lớp là 5 + 1 = 6. Trung bình mỗi lớp 210 : 6 = 35 học sinh.",
  ),
];

const cuaA = 540000 / 9;
const cuaB = 2500 * 30;
const cuaC = 784000 / 80;
const cuaD = 600 * 90;
const cuaKq = [cuaA, cuaB, cuaC, cuaD];
const cuaLon = cuaKq.indexOf(Math.max(...cuaKq));

const dungSaiQuestions: Question[] = [
  mulClaim("ds-1a", 128305, 3, 384915),
  mulClaim("ds-1b", 3214, 53, 33442),
  divClaim("ds-1c", 54320, 25, 2172, 20),
  divClaim("ds-1d", 54320, 25, 2171, 45),
  gardenClaim("ds-2a", "chuVi", 18, 8, 13),
  gardenClaim("ds-2b", "dienTichBang", 18, 8, 13),
  gardenClaim("ds-2c", "dienTichBe", 18, 8, 13),
  choice(
    "ds-3",
    "Bốn cửa ghi các phép tính: A: 540 000 : 9; B: 2 500 × 30; C: 784 000 : 80; D: 600 × 90. Cửa nào ghi phép tính có kết quả lớn nhất?",
    ["Cửa A", "Cửa B", "Cửa C", "Cửa D"],
    cuaLon,
    "Tính kết quả của từng cửa rồi so sánh.",
    `A: ${n(cuaA)}; B: ${n(cuaB)}; C: ${n(cuaC)}; D: ${n(cuaD)}. Lớn nhất là cửa ${"ABCD"[cuaLon]}.`,
  ),
  choice(
    "ds-4",
    "Rô-bốt đi theo các đoạn đường ghi phép tính có kết quả là số lẻ. Phép tính nào dưới đây ghi trên một đoạn đường của Rô-bốt?",
    ["45 × 30", "12 000 : 1 000", "305 × 17", "900 900 : 30"],
    2,
    "Tính từng phép, nhìn chữ số tận cùng của kết quả: số lẻ tận cùng là 1, 3, 5, 7, 9.",
    `45 × 30 = ${n(1350)} (chẵn, tận cùng 0); 12 000 : 1 000 = 12 (chẵn); 305 × 17 = ${n(5185)} (lẻ); 900 900 : 30 = ${n(30030)} (chẵn). Chỉ 305 × 17 cho kết quả lẻ.`,
  ),
  {
    id: "ds-5",
    kind: "dien-so",
    prompt: "Trong 6 phép tính: 36 × 25; 17 × 13; 1 500 : 50; 40 404 : 4; 3 000 × 7; 85 × 11, có bao nhiêu phép có kết quả là số lẻ?",
    parts: ["Có", { answer: [36 * 25, 17 * 13, 1500 / 50, 40404 / 4, 3000 * 7, 85 * 11].filter((value) => value % 2 === 1).length }, "phép"],
    hint: "Tính từng phép, xem chữ số tận cùng.",
    explanation: `36 × 25 = ${n(900)}; 17 × 13 = 221 (lẻ); 1 500 : 50 = 30; 40 404 : 4 = ${n(10101)} (lẻ); 3 000 × 7 = ${n(21000)}; 85 × 11 = 935 (lẻ). Có 3 phép.`,
  },
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
    "Không đặt tính. Thương của 98 765 : 25 có bao nhiêu chữ số?",
    ["3 chữ số", "4 chữ số", "5 chữ số"],
    1,
    "25 × 1 000 = 25 000 và 25 × 10 000 = 250 000. So với 98 765.",
    `25 × 1 000 = ${n(25000)} bé hơn ${n(98765)}, còn 25 × 10 000 = ${n(250000)} lớn hơn. Thương ở giữa 1 000 và 10 000 nên có 4 chữ số (thật ra ${n(Math.floor(98765 / 25))}).`,
  ),
  {
    id: "sn-3",
    kind: "dien-so",
    prompt: "Một số chia cho 36 được thương 19 và số dư lớn nhất có thể. Hỏi số bị chia là bao nhiêu?",
    parts: ["Số dư lớn nhất là", { answer: 35 }, "; số bị chia là", { answer: 19 * 36 + 35 }],
    hint: "Số dư bé hơn số chia, nên số dư lớn nhất bằng số chia trừ 1. Số bị chia = thương × số chia + số dư.",
    explanation: "Số dư lớn nhất là 36 − 1 = 35. Số bị chia là 19 × 36 + 35 = 684 + 35 = 719.",
  },
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "nhan-chia-10", title: "Nhân, chia với 10, 100, 1 000 và số tròn chục", questions: nhan10Questions },
  { id: "dat-tinh", title: "Đặt tính nhân, chia", questions: datTinhQuestions },
  { id: "tinh-chat", title: "Tính chất của phép nhân", questions: tinhChatQuestions },
  { id: "bai-toan", title: "Bài toán có lời văn", questions: loiVanQuestions },
  { id: "dung-sai", title: "Đúng sai và chọn đáp án", questions: dungSaiQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
