import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnDiv } from "@/lib/column-div";

const n = formatNumber;

const DIV2_HINT =
  "Lấy số đủ lớn để chia cho số chia. Ước lượng thương bằng cách làm tròn số chia, rồi thử: nhân, trừ, và kiểm tra số dư bé hơn số chia. Hạ chữ số tiếp theo xuống và làm lại.";

/** Thương và số dư của a : b. */
export function divide(a: number, b: number): { q: number; r: number } {
  return { q: Math.floor(a / b), r: a % b };
}

function explainDiv(a: number, b: number): string {
  const { r } = divide(a, b);
  return `${explainColumnDiv(a, b)}${r ? ` Số dư ${r} bé hơn số chia ${b}.` : ""}`;
}

/** Đặt tính rồi tính a : b: con làm ra vở ô li, điền thương (và số dư nếu có). */
function div(id: string, a: number, b: number): FillQuestion {
  const { q, r } = divide(a, b);
  return {
    id,
    kind: "dien-so",
    prompt: "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
    parts: r ? [`${n(a)} : ${b} =`, { answer: q }, "(dư", { answer: r }, ")"] : [`${n(a)} : ${b} =`, { answer: q }],
    hint: DIV2_HINT,
    explanation: explainDiv(a, b),
  };
}

/** Nhiều phép chia nhẩm, mỗi phép một ô: cùng xoá các chữ số 0 ở tận cùng của số bị chia và số chia. */
function nham(id: string, prompt: string, pairs: [number, number][]): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: pairs.flatMap(([a, b], index): FillQuestion["parts"] => [`${index ? "; " : ""}${n(a)} : ${n(b)} =`, { answer: a / b }]),
    hint: "Cùng xoá chữ số 0 ở tận cùng của cả số bị chia và số chia (mỗi số bớt cùng số chữ số 0), rồi chia.",
    explanation: pairs
      .map(([a, b]) => {
        let zeros = 0;
        while (a % 10 ** (zeros + 1) === 0 && b % 10 ** (zeros + 1) === 0) zeros++;
        return `${n(a)} : ${n(b)} = ${n(a / 10 ** zeros)} : ${n(b / 10 ** zeros)} = ${n(a / b)}.`;
      })
      .join(" "),
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function word(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

/** Khởi động: chia cho số có một chữ số, nhân với số có hai chữ số, số dư. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-chia-mot",
    kind: "dien-so",
    prompt: "Đặt tính ra giấy nháp, rồi điền kết quả.",
    parts: ["864 : 4 =", { answer: 864 / 4 }],
    hint: "8 chia 4 được 2. Hạ 6, 6 chia 4 được 1 dư 2. Hạ 4, 24 chia 4 được 6.",
    explanation: explainColumnDiv(864, 4),
  },
  {
    id: "kd-nhan-hai",
    kind: "dien-so",
    prompt: "Khi thử thương, ta nhân thương với số chia hai chữ số. Tính 6 × 18.",
    parts: ["6 × 18 =", { answer: 6 * 18 }],
    hint: "6 nhân 8 bằng 48, viết 8 nhớ 4. 6 nhân 1 bằng 6, thêm 4 bằng 10.",
    explanation: "6 × 18 = 108.",
  },
  choice(
    "kd-so-du",
    "Chia một số cho 12, số dư có thể là số nào?",
    ["3", "12", "15"],
    0,
    "Số dư luôn bé hơn số chia.",
    "Số dư phải bé hơn số chia 12. Vì 12 và 15 không bé hơn 12 nên chỉ có số dư 3 là hợp lí.",
  ),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  uocLuong: {
    id: "thu-uoc-luong",
    kind: "trac-nghiem",
    prompt: "Chia 148 : 24. Làm tròn 24 thành 20, 148 : 20 gần 7. Thử 7 × 24 = 168. Thương 7 như thế nào?",
    options: ["Quá lớn, vì 168 lớn hơn 148", "Quá bé, vì số dư lớn hơn 24", "Vừa đúng"],
    answerIndex: 0,
    hint: "So sánh 168 với số bị chia 148.",
    explanation: "168 lớn hơn 148 nên thương 7 quá lớn. Thử 6: 6 × 24 = 144, 148 − 144 = 4, bé hơn 24. Vậy 148 : 24 = 6 (dư 4).",
  },
  du: {
    id: "thu-du",
    kind: "dien-so",
    prompt: "Điền thương và số dư của 218 : 18.",
    parts: ["218 : 18 =", { answer: 12 }, "(dư", { answer: 2 }, ")"],
    hint: "21 chia 18 được 1. Hạ 8, được 38; 38 chia 18 được 2.",
    explanation: explainDiv(218, 18),
  },
  thuongKhong: {
    id: "thu-thuong-0",
    kind: "dien-so",
    prompt: "Chia 2 436 : 12. Chú ý bước hạ 3: 3 chia 12 được mấy?",
    parts: ["2 436 : 12 =", { answer: 203 }],
    hint: "24 chia 12 được 2. Hạ 3; 3 chia 12 được 0, viết 0. Hạ 6, được 36; 36 chia 12 được 3.",
    explanation: explainDiv(2436, 12),
  },
  nham: {
    id: "thu-nham",
    kind: "dien-so",
    prompt: "Cùng xoá 2 chữ số 0 ở tận cùng của số bị chia và số chia, rồi chia.",
    parts: ["5 600 : 700 = 56 : 7 =", { answer: 8 }],
    hint: "Xoá 2 chữ số 0 của cả hai số.",
    explanation: "5 600 : 700 = 56 : 7 = 8.",
  },
} satisfies Record<string, Question>;

const hoatDongQuestions: Question[] = [
  div("hd-1a", 336, 14),
  div("hd-1b", 340, 14),
  div("hd-1c", 1628, 37),
  div("hd-1d", 1631, 42),
  nham("hd-2a", "Tính nhẩm theo mẫu: 450 : 90 = 45 : 9 = 5.", [
    [480, 60],
    [630, 90],
    [540, 60],
  ]),
  nham("hd-2b", "Tính nhẩm theo mẫu: 45 000 : 900 = 450 : 9 = 50.", [
    [36000, 900],
    [54800, 200],
    [7000, 500],
  ]),
  word(
    "hd-3",
    "Trong một hội trường, người ta xếp 432 cái ghế vào các dãy, mỗi dãy 18 ghế. Hỏi xếp được bao nhiêu dãy ghế như vậy?",
    [["Số dãy ghế: 432 : 18 =", { answer: 432 / 18 }, "(dãy)"]],
    "Số ghế chia cho số ghế của mỗi dãy.",
    `${explainDiv(432, 18)} Xếp được 24 dãy ghế.`,
  ),
];

const luyenTap1Questions: Question[] = [
  div("lt1-1a", 3354, 43),
  div("lt1-1b", 3375, 45),
  div("lt1-1c", 31680, 44),
  div("lt1-1d", 6036, 12),
  div("lt1-1e", 2530, 23),
  div("lt1-1f", 4140, 23),
  {
    id: "lt1-2a",
    kind: "dien-so",
    prompt: "Tính giá trị rồi so sánh các biểu thức: 72 : (3 × 4); 72 : 3 : 4; 72 : 4 : 3.",
    parts: ["72 : (3 × 4) =", { answer: 72 / 12 }, "; 72 : 3 : 4 =", { answer: 72 / 3 / 4 }, "; 72 : 4 : 3 =", { answer: 72 / 4 / 3 }],
    hint: "Làm phép tính trong ngoặc trước; không có ngoặc thì tính từ trái sang phải.",
    explanation: "72 : (3 × 4) = 72 : 12 = 6. 72 : 3 : 4 = 24 : 4 = 6. 72 : 4 : 3 = 18 : 3 = 6. Cả ba biểu thức bằng nhau: chia một số cho một tích bằng chia lần lượt cho từng thừa số.",
  },
  {
    id: "lt1-2b",
    kind: "dien-so",
    prompt: "Tính giá trị rồi so sánh các biểu thức: (24 × 60) : 12; (24 : 12) × 60; 24 × (60 : 12).",
    parts: ["(24 × 60) : 12 =", { answer: (24 * 60) / 12 }, "; (24 : 12) × 60 =", { answer: (24 / 12) * 60 }, "; 24 × (60 : 12) =", { answer: 24 * (60 / 12) }],
    hint: "Làm phép tính trong ngoặc trước.",
    explanation: `(24 × 60) : 12 = ${n(1440)} : 12 = 120. (24 : 12) × 60 = 2 × 60 = 120. 24 × (60 : 12) = 24 × 5 = 120. Cả ba biểu thức bằng nhau.`,
  },
  word(
    "lt1-3",
    "Một sân bóng hình chữ nhật có diện tích 5 040 m², chiều rộng 56 m. Tính chu vi của sân bóng đó.",
    [
      ["Chiều dài: 5 040 : 56 =", { answer: 5040 / 56 }, "(m)"],
      ["Chu vi: (", { answer: 5040 / 56 }, "+ 56) × 2 =", { answer: (5040 / 56 + 56) * 2 }, "(m)"],
    ],
    "Diện tích bằng chiều dài nhân chiều rộng, nên chiều dài là diện tích chia chiều rộng. Chu vi bằng (dài + rộng) × 2.",
    `Chiều dài: ${n(5040)} : 56 = 90 (m). Chu vi: (90 + 56) × 2 = 292 (m).`,
  ),
];

const luyenTapQuestions: Question[] = [
  {
    id: "lt-1a",
    kind: "dien-so",
    prompt: "Số?  Thừa số 72, thừa số 35. Tích là:",
    parts: ["72 × 35 =", { answer: 72 * 35 }],
    hint: "Tích là kết quả của phép nhân.",
    explanation: "72 × 35 = 2 520.",
  },
  {
    id: "lt-1b",
    kind: "dien-so",
    prompt: "Số?  Thừa số 45, tích 1 755. Thừa số còn lại là:",
    parts: ["1 755 : 45 =", { answer: 1755 / 45 }],
    hint: "Thừa số chưa biết bằng tích chia cho thừa số đã biết.",
    explanation: "Thừa số chưa biết = tích : thừa số đã biết = 1 755 : 45 = 39. Thử lại: 45 × 39 = 1 755.",
  },
  {
    id: "lt-1c",
    kind: "dien-so",
    prompt: "Số?  Thừa số 64, tích 6 400. Thừa số còn lại là:",
    parts: ["6 400 : 64 =", { answer: 6400 / 64 }],
    hint: "Thừa số chưa biết bằng tích chia cho thừa số đã biết.",
    explanation: "6 400 : 64 = 100. Thử lại: 64 × 100 = 6 400.",
  },
  {
    id: "lt-2a",
    kind: "dien-so",
    prompt: "Số?  Số bị chia 4 218, số chia 53. Điền thương và số dư.",
    parts: ["4 218 : 53 =", { answer: 79 }, "(dư", { answer: 31 }, ")"],
    hint: DIV2_HINT,
    explanation: explainDiv(4218, 53),
  },
  {
    id: "lt-2b",
    kind: "dien-so",
    prompt: "Số?  Số bị chia 2 998, số chia 64. Điền thương và số dư.",
    parts: ["2 998 : 64 =", { answer: 46 }, "(dư", { answer: 54 }, ")"],
    hint: DIV2_HINT,
    explanation: explainDiv(2998, 64),
  },
  choice(
    "lt-3",
    "Một đội đồng diễn xếp thành 24 hàng, mỗi hàng có 15 người. Nếu đội đồng diễn đó xếp mỗi hàng 20 người thì xếp được bao nhiêu hàng như vậy?",
    ["15 hàng", "18 hàng", "20 hàng", "24 hàng"],
    1,
    "Tính số người của cả đội trước, rồi chia cho 20 người mỗi hàng.",
    `Cả đội có 24 × 15 = 360 (người). Xếp mỗi hàng 20 người: 360 : 20 = 18 (hàng).`,
  ),
  word(
    "lt-4",
    "Mỗi bánh xe đạp cần có 32 nan hoa. Hỏi có 2 000 nan hoa thì lắp được nhiều nhất cho bao nhiêu chiếc xe đạp hai bánh và còn thừa bao nhiêu nan hoa?",
    [
      ["Mỗi xe cần: 32 × 2 =", { answer: 64 }, "(nan hoa)"],
      ["2 000 : 64 =", { answer: 31 }, "(dư", { answer: 16 }, ")"],
    ],
    "Xe đạp hai bánh cần nan hoa của hai bánh. Chia số nan hoa cho số nan hoa của một xe.",
    `Mỗi xe cần 32 × 2 = 64 nan hoa. ${explainDiv(2000, 64)} Lắp được nhiều nhất 31 chiếc xe, còn thừa 16 nan hoa.`,
  ),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Không đặt tính. Kết quả của 3 584 : 62 gần nhất với số nào?",
    ["6", "60", "600"],
    1,
    "62 gần 60, 3 584 gần 3 600. Nhẩm 3 600 : 60.",
    `3 600 : 60 = 360 : 6 = 60, nên thương gần 60 (thật ra ${n(3584)} : 62 = 57 dư 50).`,
  ),
  choice(
    "sn-2",
    "Chia 148 : 24. Làm tròn 24 thành 20, ước lượng 148 : 20 gần 7. Thương đúng là số nào?",
    ["5", "6", "7"],
    1,
    "Thử 7 × 24 và 6 × 24, so với 148.",
    "7 × 24 = 168 lớn hơn 148, nên 7 quá lớn. 6 × 24 = 144, 148 − 144 = 4 bé hơn 24. Vậy thương là 6, dư 4.",
  ),
  choice(
    "sn-3",
    "Mai tính 218 : 18 được thương 11, dư 20. Mai sai ở đâu?",
    ["Số dư 20 lớn hơn số chia 18, thương phải là 12", "Thương 11 quá lớn", "Mai làm đúng"],
    0,
    "Số dư phải bé hơn số chia.",
    "Số dư 20 không bé hơn 18, nên thương 11 quá bé. Thử 12: 12 × 18 = 216, 218 − 216 = 2. Vậy 218 : 18 = 12 (dư 2).",
  ),
  choice(
    "sn-4",
    "Kết quả của 6 036 : 12 là số nào?",
    ["53", "503", "5 003"],
    1,
    "60 chia 12 được 5. Hạ 3; 3 chia 12 được mấy? Rồi hạ 6.",
    "60 : 12 = 5. Hạ 3, 3 chia 12 được 0, viết 0. Hạ 6, được 36, 36 chia 12 được 3. Vậy thương 503. Thử lại: 503 × 12 = 6 036.",
  ),
  choice(
    "sn-5",
    "Bạn Nam tính 4 500 : 90 bằng cách xoá một chữ số 0 ở số bị chia thành 450 : 90. Nam làm đúng hay sai?",
    ["Đúng", "Sai"],
    1,
    "Phải xoá cùng số chữ số 0 ở cả hai số.",
    "Sai. Phải cùng xoá một chữ số 0 ở cả hai số: 4 500 : 90 = 450 : 9 = 50.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 24)", questions: hoatDongQuestions },
  { id: "luyen-tap-1", title: "Luyện tập 1 (trang 25-26)", questions: luyenTap1Questions },
  { id: "luyen-tap-2", title: "Luyện tập (trang 26)", questions: luyenTapQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];

