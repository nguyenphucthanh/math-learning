import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnDiv } from "@/lib/column-div";

const n = formatNumber;

const DIV_HINT =
  "Chia từ hàng cao nhất. Hạ từng chữ số xuống; chưa chia được thì viết 0 ở thương. Số dư luôn bé hơn số chia.";

/** Kết quả phép chia: thương, hoặc thương và dư. Đáp án tính từ a và b, không gõ tay. */
function divParts(a: number, b: number): Part[] {
  const q = Math.floor(a / b);
  const r = a % b;
  return r ? [`${n(a)} : ${b} =`, { answer: q }, "(dư", { answer: r }, ")"] : [`${n(a)} : ${b} =`, { answer: q }];
}

/** Đặt tính rồi tính chia: con làm ra vở ô li, điền thương (và số dư nếu có). */
function divide(id: string, a: number, b: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
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

/** Câu Đ, S: phép chia đã có kết quả (`shownQ`, dư `shownR`); đáp án tính lại từ a : b. */
export function trueFalse(id: string, a: number, b: number, shownQ: number, shownR = 0): ChoiceQuestion {
  const q = Math.floor(a / b);
  const r = a % b;
  const correct = q === shownQ && r === shownR;
  const shown = `${n(shownQ)}${shownR ? ` (dư ${shownR})` : ""}`;
  return choice(
    id,
    `Đúng hay sai? ${n(a)} : ${b} = ${shown}`,
    ["Đúng", "Sai"],
    correct ? 0 : 1,
    "Con đặt tính ra vở rồi so với kết quả đã cho. Nhớ số dư phải bé hơn số chia và thương không được thiếu chữ số 0.",
    correct ? `${explainColumnDiv(a, b)} Kết quả đã cho đúng.` : `Sai. ${explainColumnDiv(a, b)}`,
  );
}

/** Khởi động đầu bài: bảng chia, chia có dư, chia có chữ số 0 ở thương. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-bang-chia",
    kind: "dien-so",
    prompt: "Dùng bảng chia, điền kết quả.",
    parts: ["56 : 7 =", { answer: 8 }, "; 42 : 6 =", { answer: 7 }],
    hint: "Nghĩ bảng nhân: 7 nhân mấy bằng 56?",
    explanation: "7 × 8 = 56 nên 56 : 7 = 8. 6 × 7 = 42 nên 42 : 6 = 7.",
  },
  {
    id: "kd-chia-du",
    kind: "dien-so",
    prompt: "Điền thương và số dư.",
    parts: divParts(38, 5),
    hint: "5 nhân mấy gần 38 nhất mà không vượt quá 38?",
    explanation: "5 × 7 = 35, 38 − 35 = 3. Vậy 38 : 5 = 7 (dư 3). Số dư 3 bé hơn số chia 5.",
  },
  {
    id: "kd-chia-0",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp, rồi điền kết quả.",
    parts: divParts(7280, 8),
    hint: "72 : 8 = 9. Hạ 8 được 8, rồi hạ 0 thì sao?",
    explanation: explainColumnDiv(7280, 8),
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  chiaDeu: {
    id: "thu-chia-deu",
    kind: "dien-so",
    prompt: "Có 84 000 viên gạch xếp đều vào 3 xe. Hỏi mỗi xe chở bao nhiêu viên gạch? (Đặt tính ra giấy nháp.)",
    parts: ["84 000 : 3 =", { answer: 84000 / 3 }, "(viên gạch)"],
    hint: "Chia đều thành 3 phần bằng nhau: chia cho 3.",
    explanation: explainColumnDiv(84000, 3),
  },
  du: {
    id: "thu-du",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp, rồi điền thương và số dư.",
    parts: divParts(94817, 4),
    hint: DIV_HINT,
    explanation: explainColumnDiv(94817, 4),
  },
  chuSoKhong: {
    id: "thu-chu-so-khong",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp. Chú ý khi chưa chia được thì viết 0 ở thương.",
    parts: divParts(48072, 8),
    hint: DIV_HINT,
    explanation: explainColumnDiv(48072, 8),
  },
} satisfies Record<string, Question>;

const hoatDongQuestions: Question[] = [
  divide("hd-1a", 47235, 3),
  divide("hd-1b", 538412, 4),
  divide("hd-1c", 693508, 7),
  trueFalse("hd-2a", 28035, 6, 467, 33),
  trueFalse("hd-2b", 124806, 6, 2134),
  trueFalse("hd-2c", 90546, 9, 10060, 6),
  word(
    "hd-3",
    `Cô Hoa có ${n(300000)} đồng. Sau khi mua 3 kg thịt thì cô còn ${n(45000)} đồng. Hỏi mỗi ki-lô-gam thịt giá bao nhiêu tiền?`,
    [
      [`Tiền mua 3 kg thịt: ${n(300000)} − ${n(45000)} =`, { answer: 300000 - 45000 }, "(đồng)"],
      [`Giá 1 kg thịt: ${n(255000)} : 3 =`, { answer: 255000 / 3 }, "(đồng)"],
    ],
    "Tìm số tiền đã mua thịt (trừ) rồi chia cho 3 kg.",
    `Số tiền mua 3 kg thịt: ${n(300000)} − ${n(45000)} = ${n(255000)} đồng. Mỗi ki-lô-gam: ${n(255000)} : 3 = ${n(85000)} đồng.`,
  ),
];

const luyenTapQuestions: Question[] = [
  divide("lt-1a", 586240, 8),
  divide("lt-1b", 761904, 6),
  divide("lt-1c", 412905, 6),
  {
    id: "lt-2",
    kind: "dien-so",
    prompt: "Tìm hai số biết tổng và hiệu của chúng lần lượt là 52 600 và 6 800.",
    parts: ["Số lớn:", { answer: (52600 + 6800) / 2 }, "; số bé:", { answer: (52600 - 6800) / 2 }],
    hint: "Số lớn = (tổng + hiệu) : 2. Số bé = (tổng − hiệu) : 2.",
    explanation: `Số lớn: (${n(52600)} + ${n(6800)}) : 2 = ${n(59400)} : 2 = ${n(29700)}. Số bé: (${n(52600)} − ${n(6800)}) : 2 = ${n(45800)} : 2 = ${n(22900)}. Thử lại: ${n(29700)} + ${n(22900)} = ${n(52600)}.`,
  },
  {
    id: "lt-3",
    kind: "dien-so",
    prompt: `Cứ 6 hộp bút đóng thành một thùng. Hỏi ${n(513428)} hộp bút đóng được nhiều nhất bao nhiêu thùng và còn thừa mấy hộp?`,
    parts: [`${n(513428)} : 6 =`, { answer: Math.floor(513428 / 6) }, "(thùng), dư", { answer: 513428 % 6 }, "(hộp)"],
    hint: "Thương là số thùng, số dư là số hộp còn thừa.",
    explanation: explainColumnDiv(513428, 6),
  },
  choice(
    "lt-4",
    `Chị Lan có ${n(360000)} đồng. Chị chia số tiền thành 6 phần bằng nhau rồi cho đi một phần. Hỏi chị Lan còn lại bao nhiêu tiền?`,
    [`${n(60000)} đồng`, `${n(300000)} đồng`, `${n(180000)} đồng`],
    1,
    "Tìm một phần (chia cho 6), rồi lấy tổng số tiền trừ đi một phần đó.",
    `Một phần: ${n(360000)} : 6 = ${n(60000)} đồng. Còn lại: ${n(360000)} − ${n(60000)} = ${n(300000)} đồng. ${n(60000)} chỉ là số tiền đã cho đi.`,
  ),
  choice(
    "lt-5",
    "Cầu chỉ cho xe nặng không quá 15 tấn đi qua (15 tấn = 15 000 kg). Kết quả phép tính ghi trên mỗi xe là cân nặng của xe và hàng, tính theo ki-lô-gam. Xe nào đi qua được cầu?",
    ["Xe A: 61 000 : 4", "Xe B: 98 400 : 6", "Xe C: 112 560 : 8"],
    2,
    "Tính từng phép chia, rồi so với 15 000.",
    `A: ${n(61000)} : 4 = ${n(15250)}. B: ${n(98400)} : 6 = ${n(16400)}. C: ${n(112560)} : 8 = ${n(14070)}. Chỉ có ${n(14070)} nhỏ hơn ${n(15000)}, nên xe C đi qua được.`,
  ),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Nam tính 24 036 : 4 = 609. Nam sai ở đâu?",
    ["Thiếu một chữ số 0 ở thương; đúng là 6 009", "Quên số dư; đúng là 609 (dư 3)", "Nam tính đúng", "Sai ở bảng chia; đúng là 6 090"],
    0,
    "Sau khi chia 24 : 4 = 6, hạ 0 và hạ 3: mỗi lần hạ xuống con phải viết một chữ số vào thương.",
    `24 : 4 = 6. Hạ 0: 0 : 4 được 0, viết 0. Hạ 3: 3 : 4 được 0, viết 0. Hạ 6: 36 : 4 được 9. Thương ${n(6009)}. Mỗi chữ số được hạ xuống thì thương có thêm một chữ số, kể cả 0.`,
  ),
  choice(
    "sn-2",
    "Không đặt tính. Kết quả của 412 905 : 6 gần nhất với số nào?",
    ["6 800", "68 000", "680 000"],
    1,
    "412 905 gần 420 000. Con nhẩm 42 chục nghìn : 6.",
    `420 000 : 6 = 70 000, nên kết quả gần 70 000. Số 68 000 gần nhất (thật ra ${n(68817)} dư 3). Ước lượng giúp con phát hiện thương có thiếu hoặc thừa chữ số.`,
  ),
  choice(
    "sn-3",
    "Khi chia một số cho 8, số dư không thể là số nào?",
    ["0", "7", "8", "3"],
    2,
    "Số dư phải bé hơn số chia.",
    "Số dư luôn bé hơn số chia. Chia cho 8 thì số dư chỉ có thể là 0, 1, 2, 3, 4, 5, 6, 7. Dư 8 thì còn chia thêm được một lần nữa.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 7)", questions: hoatDongQuestions },
  { id: "luyen-tap", title: "Luyện tập (trang 8)", questions: luyenTapQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
