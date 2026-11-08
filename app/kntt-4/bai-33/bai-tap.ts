import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

/** Các số hạng của một số khi viết thành tổng, từ hàng cao xuống thấp, bỏ hàng 0. */
export function expand(value: number): number[] {
  const digits = String(value).split("");
  return digits.flatMap((digit, index) => (digit === "0" ? [] : [Number(digit) * 10 ** (digits.length - 1 - index)]));
}

/** Giá trị của một chữ số (xuất hiện một lần) trong số. */
export function digitValue(value: number, digit: number): number {
  const text = String(value);
  const index = text.indexOf(String(digit));
  return digit * 10 ** (text.length - 1 - index);
}

/** Làm tròn số đến hàng `step` (10, 100, 1 000...): nhìn chữ số bên phải, từ 5 trở lên thì lên. */
export function roundTo(value: number, step: number): number {
  const rest = value % step;
  const down = value - rest;
  return rest * 2 >= step ? down + step : down;
}

/** Tổng viết bằng dấu "+", ví dụ "60 000 + 5 000 + 30". */
export function evalSum(text: string): number {
  return text
    .split("+")
    .map((term) => Number(term.replace(/\D/g, "")))
    .reduce((sum, term) => sum + term, 0);
}

const SIGNS = [">", "<", "="];
const signOf = (left: number, right: number) => (left > right ? ">" : left < right ? "<" : "=");

/** Câu so sánh: vế có dấu "+" thì viết thành tổng như SGK. */
function compare(id: string, left: string, right: string, hint: string, explanation: string): ChoiceQuestion {
  const l = evalSum(left);
  const r = evalSum(right);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `${left} ? ${right}`,
    options: SIGNS,
    answerIndex: SIGNS.indexOf(signOf(l, r)),
    hint,
    explanation,
  };
}

/** Câu viết số thành tổng: con điền từng số hạng. */
function expansion(id: string, value: number): FillQuestion {
  const terms = expand(value);
  const parts: FillQuestion["parts"] = [`${n(value)} =`];
  terms.forEach((term, index) => {
    if (index > 0) parts.push("+");
    parts.push({ answer: term });
  });
  return {
    id,
    kind: "dien-so",
    prompt: "Viết số thành tổng các hàng.",
    parts,
    hint: "Đọc từng chữ số từ trái sang phải và nói nó đứng ở hàng nào. Hàng có chữ số 0 thì bỏ qua.",
    explanation: `${n(value)} = ${terms.map(n).join(" + ")}.`,
  };
}

const reading = (id: string, value: number, correct: string, wrong: string[], explanation: string): ChoiceQuestion => ({
  id,
  kind: "trac-nghiem",
  prompt: `Số ${n(value)} đọc là:`,
  options: [correct, ...wrong],
  answerIndex: 0,
  hint: "Đọc từng lớp từ trái sang phải, đọc xong mỗi lớp thì đọc tên lớp. Chữ số 0 vẫn phải đọc.",
  explanation,
});

const roundFill = (id: string, value: number, step: number, place: string, hint: string, why: string): FillQuestion => ({
  id,
  kind: "dien-so",
  prompt: `Làm tròn ${n(value)} đến hàng ${place}.`,
  parts: [`${n(value)} ≈`, { answer: roundTo(value, step) }],
  hint,
  explanation: `${why} Vậy ${n(value)} làm tròn đến hàng ${place} là ${n(roundTo(value, step))}.`,
});

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-gia-tri",
    kind: "dien-so",
    prompt: `Trong số ${n(3407215)}:`,
    parts: ["Giá trị của chữ số 4 là", { answer: digitValue(3407215, 4) }],
    hint: "Chữ số 4 đứng ở hàng nào? Đếm từ hàng đơn vị sang trái.",
    explanation: `Chữ số 4 ở hàng trăm nghìn nên có giá trị ${n(400000)}.`,
  },
  {
    id: "kd-so-sanh",
    kind: "trac-nghiem",
    prompt: "Số nào lớn hơn?",
    options: [n(98765), n(100234)],
    answerIndex: 1,
    hint: "Đếm số chữ số của mỗi số.",
    explanation: `${n(98765)} có 5 chữ số, ${n(100234)} có 6 chữ số. Số có nhiều chữ số hơn thì lớn hơn.`,
  },
  {
    id: "kd-lam-tron",
    kind: "dien-so",
    prompt: `Làm tròn ${n(4628)} đến hàng trăm.`,
    parts: [`${n(4628)} ≈`, { answer: roundTo(4628, 100) }],
    hint: "Nhìn chữ số ở hàng chục, ngay bên phải hàng trăm.",
    explanation: `Hàng chục là 2, bé hơn 5 nên giữ nguyên chữ số hàng trăm. ${n(4628)} ≈ ${n(4600)}.`,
  },
];

export const quickChecks = {
  hangLop: {
    id: "thu-hang-lop",
    kind: "trac-nghiem",
    prompt: `Trong số ${n(4197305)}, chữ số 9 thuộc hàng nào, lớp nào?`,
    options: ["Hàng chục nghìn, lớp nghìn", "Hàng nghìn, lớp nghìn", "Hàng trăm nghìn, lớp nghìn", "Hàng chục nghìn, lớp triệu"],
    answerIndex: 0,
    hint: "Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.",
    explanation: "Chữ số 9 ở hàng chục nghìn, và hàng chục nghìn thuộc lớp nghìn (nghìn, chục nghìn, trăm nghìn).",
  },
  doc: {
    id: "thu-doc",
    kind: "trac-nghiem",
    prompt: `Số ${n(2050300)} đọc là:`,
    options: [
      "hai triệu không trăm năm mươi nghìn ba trăm",
      "hai triệu năm trăm nghìn ba trăm",
      "hai triệu không trăm năm mươi nghìn ba mươi",
      "hai mươi triệu năm mươi nghìn ba trăm",
    ],
    answerIndex: 0,
    hint: "Lớp triệu là 2, lớp nghìn là 050, lớp đơn vị là 300.",
    explanation: "Lớp nghìn là 050, đọc là không trăm năm mươi nghìn. Lớp đơn vị là 300, đọc là ba trăm.",
  },
  soSanh: compare(
    "thu-so-sanh",
    n(480270),
    n(480720),
    "Hai số cùng 6 chữ số. So từng hàng từ trái sang phải.",
    `Hai số giống nhau ở hàng trăm nghìn, chục nghìn và nghìn. Hàng trăm: 2 < 7 nên ${n(480270)} < ${n(480720)}.`,
  ),
  lamTron: {
    id: "thu-lam-tron",
    kind: "dien-so",
    prompt: `Làm tròn ${n(3962)} đến hàng trăm.`,
    parts: [`${n(3962)} ≈`, { answer: roundTo(3962, 100) }],
    hint: "Hàng chục là 6, từ 5 trở lên thì chữ số hàng trăm tăng 1.",
    explanation: `Hàng chục là 6, từ 5 trở lên nên 9 trăm tăng thêm 1 trăm thành 10 trăm. ${n(3962)} ≈ ${n(4000)}.`,
  },
} satisfies Record<string, Question>;

const tronNoiCap: MatchQuestion = {
  id: "tron-2",
  kind: "noi-cap",
  prompt: `Mỗi bạn làm tròn số ${n(5372649)} đến hàng nào? Nối câu của bạn với hàng.`,
  pairs: [
    { left: `khoảng ${n(5400000)}`, right: "hàng trăm nghìn" },
    { left: `khoảng ${n(5373000)}`, right: "hàng nghìn" },
    { left: `khoảng ${n(5370000)}`, right: "hàng chục nghìn" },
  ],
  rightOrder: [1, 2, 0],
  hint: "Các chữ số bên phải hàng được làm tròn đều thành 0. Nhìn xem số nào có từng ấy chữ số 0 ở cuối.",
  explanation: `${n(5400000)} có 5 chữ số 0 ở cuối: hàng trăm nghìn. ${n(5373000)} có 3 chữ số 0: hàng nghìn. ${n(5370000)} có 4 chữ số 0: hàng chục nghìn.`,
};

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "doc-so",
    title: "Đọc số, hàng và lớp (Bài 11, 12)",
    questions: [
      reading(
        "doc-1",
        7060215,
        "bảy triệu không trăm sáu mươi nghìn hai trăm mười lăm",
        ["bảy triệu sáu trăm nghìn hai trăm mười lăm", "bảy trăm linh sáu nghìn hai trăm mười lăm", "bảy triệu không trăm sáu mươi nghìn hai trăm năm mươi mốt"],
        `Lớp triệu: 7. Lớp nghìn: 060, đọc là không trăm sáu mươi nghìn. Lớp đơn vị: 215, đọc là hai trăm mười lăm.`,
      ),
      reading(
        "doc-2",
        640205718,
        "sáu trăm bốn mươi triệu hai trăm linh năm nghìn bảy trăm mười tám",
        [
          "sáu trăm bốn mươi triệu hai trăm năm mươi nghìn bảy trăm mười tám",
          "sáu mươi bốn triệu hai trăm linh năm nghìn bảy trăm mười tám",
          "sáu trăm bốn mươi nghìn hai trăm linh năm triệu bảy trăm mười tám",
        ],
        `Lớp triệu: 640. Lớp nghìn: 205, hàng chục là 0 nên đọc "linh năm". Lớp đơn vị: 718.`,
      ),
      {
        id: "lop-1",
        kind: "dien-so",
        prompt: `Cho số ${n(864530297)}. Viết các chữ số của từng lớp.`,
        parts: ["Lớp triệu:", { answer: 864 }, ". Lớp nghìn:", { answer: 530 }, ". Lớp đơn vị:", { answer: 297 }],
        hint: "Mỗi lớp có ba chữ số. Chia số thành ba nhóm, từ phải sang trái.",
        explanation: `${n(864530297)}: lớp đơn vị là 297, lớp nghìn là 530, lớp triệu là 864.`,
      },
      {
        id: "lop-2",
        kind: "trac-nghiem",
        prompt: `Trong số ${n(3070650)}, chữ số 7 thuộc hàng nào, lớp nào?`,
        options: ["Hàng chục nghìn, lớp nghìn", "Hàng nghìn, lớp nghìn", "Hàng chục nghìn, lớp triệu", "Hàng trăm, lớp đơn vị"],
        answerIndex: 0,
        hint: "Đếm từ phải sang trái và đừng bỏ qua các chữ số 0.",
        explanation: "Từ phải sang trái: 0 đơn vị, 5 chục, 6 trăm, 0 nghìn, 7 chục nghìn. Hàng chục nghìn thuộc lớp nghìn.",
      },
    ],
  },
  {
    id: "viet-tong",
    title: "Viết thành tổng, giá trị của chữ số (Bài 11, 12)",
    questions: [
      expansion("tong-1", 72053),
      expansion("tong-2", 3140206),
      {
        id: "thieu-1",
        kind: "dien-so",
        prompt: "Số ?",
        parts: [`${n(40000)} + ${n(8000)} + 500 + 30 +`, { answer: 7 }, `= ${n(48537)}`],
        hint: "Hàng nào chưa có trong tổng? Nhìn chữ số ở hàng đó của số 48 537.",
        explanation: `${n(48537)} có chữ số hàng đơn vị là 7 nên số cần điền là 7.`,
      },
      {
        id: "thieu-2",
        kind: "dien-so",
        prompt: "Số ?",
        parts: [`${n(600000)} + ${n(5000)} +`, { answer: 200 }, `+ 60 + 1 = ${n(605261)}`],
        hint: "Tổng thiếu hàng trăm. Chữ số hàng trăm của 605 261 là mấy?",
        explanation: `${n(605261)} có chữ số hàng trăm là 2, tức là 200.`,
      },
      {
        id: "thieu-3",
        kind: "dien-so",
        prompt: "Số ?",
        parts: [`${n(2000000)} + ${n(900000)} + ${n(40000)} +`, { answer: 80 }, `= ${n(2940080)}`],
        hint: "Tổng đã có đến hàng chục nghìn. Hàng nghìn và hàng trăm thế nào? Hàng chục là mấy?",
        explanation: `${n(2940080)} có chữ số hàng chục là 8, tức là 80. Hàng nghìn và hàng trăm là 0 nên không có số hạng.`,
      },
      {
        id: "gt-1",
        kind: "dien-so",
        prompt: `Cho số ${n(2835714)}.`,
        parts: ["Chữ số 5 có giá trị", { answer: digitValue(2835714, 5) }, ". Chữ số 8 có giá trị", { answer: digitValue(2835714, 8) }],
        hint: "Chữ số đó đứng ở hàng nào? Giá trị bằng chữ số nhân với giá trị của hàng.",
        explanation: `Chữ số 5 ở hàng nghìn: ${n(5000)}. Chữ số 8 ở hàng trăm nghìn: ${n(800000)}.`,
      },
      {
        id: "gt-2",
        kind: "dien-so",
        prompt: `Cho số ${n(640295)}.`,
        parts: ["Chữ số 4 có giá trị", { answer: digitValue(640295, 4) }, ". Chữ số 9 có giá trị", { answer: digitValue(640295, 9) }],
        hint: "Đếm từ hàng đơn vị: đơn vị, chục, trăm, nghìn, chục nghìn.",
        explanation: `Chữ số 4 ở hàng chục nghìn: ${n(40000)}. Chữ số 9 ở hàng chục: 90.`,
      },
    ],
  },
  {
    id: "so-sanh",
    title: "So sánh số (Bài 14)",
    questions: [
      compare("ss-1", n(87925), n(410006), "Đếm số chữ số của mỗi số trước.", `${n(87925)} có 5 chữ số, ${n(410006)} có 6 chữ số, nên ${n(87925)} < ${n(410006)}.`),
      compare("ss-2", n(702318), n(698999), "Hai số cùng 6 chữ số. So hàng trăm nghìn trước.", `Hàng trăm nghìn: 7 > 6 nên ${n(702318)} > ${n(698999)}.`),
      compare("ss-3", n(3906214), n(3960214), "Hai số cùng 7 chữ số. So lần lượt từng hàng từ trái sang phải.", `Giống nhau ở hàng triệu và hàng trăm nghìn. Hàng chục nghìn: 0 < 6 nên ${n(3906214)} < ${n(3960214)}.`),
      compare(
        "ss-4",
        `${n(60000)} + ${n(5000)} + 30`,
        n(65030),
        "Viết tổng thành một số trước khi so.",
        `${n(60000)} + ${n(5000)} + 30 = ${n(65030)}, nên hai bên bằng nhau.`,
      ),
      compare(
        "ss-5",
        n(410070),
        `${n(400000)} + ${n(10000)} + 700`,
        "Viết tổng thành một số: chú ý hàng chục và hàng trăm.",
        `${n(400000)} + ${n(10000)} + 700 = ${n(410700)}. Hàng trăm: 0 < 7 nên ${n(410070)} < ${n(410700)}.`,
      ),
      compare(
        "ss-6",
        n(7300900),
        `${n(7000000)} + ${n(300000)} + 90`,
        "Viết tổng thành một số, chú ý số 90 ở hàng chục.",
        `${n(7000000)} + ${n(300000)} + 90 = ${n(7300090)}. Hàng trăm: 9 > 0 nên ${n(7300900)} > ${n(7300090)}.`,
      ),
      {
        id: "ss-7",
        kind: "trac-nghiem",
        prompt: `Số sách thư viện của bốn trường: Trường A ${n(318400)} quyển, Trường B ${n(76900)} quyển, Trường C ${n(402650)} quyển, Trường D ${n(129500)} quyển. Trường nào có nhiều sách nhất?`,
        options: ["Trường A", "Trường B", "Trường C", "Trường D"],
        answerIndex: 2,
        hint: "Số nào có nhiều chữ số nhất? Nếu bằng nhau thì so hàng trăm nghìn.",
        explanation: `Trường B có 5 chữ số nên bé nhất. Ba trường còn lại có 6 chữ số, hàng trăm nghìn là 3, 1, 4. Trường C có ${n(402650)} nhiều nhất.`,
      },
      {
        id: "ss-8",
        kind: "dien-so",
        prompt: `Xếp số sách của bốn trường (${n(318400)}; ${n(76900)}; ${n(402650)}; ${n(129500)}) theo thứ tự từ bé đến lớn.`,
        parts: [{ answer: 76900 }, "<", { answer: 129500 }, "<", { answer: 318400 }, "<", { answer: 402650 }],
        hint: "Tìm số bé nhất trước (ít chữ số nhất), rồi so tiếp hàng trăm nghìn.",
        explanation: `${n(76900)} < ${n(129500)} < ${n(318400)} < ${n(402650)}.`,
      },
      {
        id: "ss-9",
        kind: "trac-nghiem",
        prompt: "Trường D có ít sách hơn những trường nào?",
        options: ["Trường A và Trường C", "Chỉ Trường C", "Trường B và Trường C", "Cả ba trường A, B, C"],
        answerIndex: 0,
        hint: `Trường D có ${n(129500)} quyển. Trường nào có nhiều hơn số đó?`,
        explanation: `${n(129500)} < ${n(318400)} (Trường A) và ${n(129500)} < ${n(402650)} (Trường C). Trường B có ${n(76900)} nhỏ hơn ${n(129500)}.`,
      },
    ],
  },
  {
    id: "lam-tron",
    title: "Làm tròn số (Bài 13)",
    questions: [
      {
        id: "tron-1",
        kind: "trac-nghiem",
        prompt: `Số lượt xem một video là ${n(5372649)}. Làm tròn đến hàng trăm được:`,
        options: [n(5372600), n(5372700), n(5373000), n(5372650)],
        answerIndex: 0,
        hint: "Nhìn chữ số hàng chục, ngay bên phải hàng trăm. Chỉ nhìn một chữ số đó.",
        explanation: `Hàng chục là 4, bé hơn 5 nên giữ nguyên hàng trăm, các chữ số bên phải thành 0. ${n(5372649)} ≈ ${n(5372600)}.`,
      },
      tronNoiCap,
      roundFill(
        "tron-3",
        3468215,
        10000,
        "chục nghìn",
        "Nhìn chữ số hàng nghìn, bên phải hàng chục nghìn.",
        "Hàng nghìn là 8, từ 5 trở lên nên chữ số hàng chục nghìn tăng 1: 6 thành 7.",
      ),
      roundFill(
        "tron-4",
        906480,
        100000,
        "trăm nghìn",
        "Nhìn chữ số hàng chục nghìn, bên phải hàng trăm nghìn.",
        "Hàng chục nghìn là 0, bé hơn 5 nên giữ nguyên chữ số 9 ở hàng trăm nghìn.",
      ),
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "do-em",
        kind: "dien-so",
        prompt: "Đố em! Cho một số có ba chữ số. Khi viết thêm chữ số 3 vào trước số đó thì được số mới có bốn chữ số. Số mới lớn hơn số đã cho bao nhiêu đơn vị?",
        parts: ["Lớn hơn", { answer: 3000 }, "đơn vị"],
        hint: "Thử một số cụ thể, như 245. Viết thêm 3 vào trước thì được số nào?",
        explanation: `Chữ số 3 mới viết đứng ở hàng nghìn nên có giá trị ${n(3000)}. Ví dụ ${n(3245)} − 245 = ${n(3000)}.`,
      },
      {
        id: "gan-gia",
        kind: "dien-so",
        prompt: `Cô bán hàng đặt nhầm biển giá của bốn món đồ: ${n(9800000)} đồng, ${n(10600000)} đồng, ${n(11300000)} đồng, ${n(12400000)} đồng. Biết món C có giá thấp nhất, món B có giá thấp hơn món D nhưng cao hơn món A. Tìm giá đúng của mỗi món.`,
        parts: [
          "A:",
          { answer: 10600000 },
          "đồng. B:",
          { answer: 11300000 },
          "đồng. C:",
          { answer: 9800000 },
          "đồng. D:",
          { answer: 12400000 },
          "đồng",
        ],
        hint: "Sắp xếp bốn giá từ bé đến lớn. C đứng đầu, rồi A, B, D.",
        explanation: `Từ bé đến lớn: ${n(9800000)} < ${n(10600000)} < ${n(11300000)} < ${n(12400000)}. C thấp nhất nên C là ${n(9800000)}. Còn lại A < B < D nên A là ${n(10600000)}, B là ${n(11300000)}, D là ${n(12400000)}.`,
      },
      {
        id: "tim-loi",
        kind: "dien-so",
        prompt: `Mi làm tròn ${n(7249618)} đến hàng trăm nghìn và được ${n(7250000)}. Bạn Mi sai rồi. Kết quả đúng là bao nhiêu?`,
        parts: [`${n(7249618)} ≈`, { answer: roundTo(7249618, 100000) }],
        hint: "Chỉ nhìn chữ số hàng chục nghìn, ngay bên phải hàng trăm nghìn.",
        explanation: `Hàng chục nghìn là 4, bé hơn 5 nên giữ nguyên chữ số 2 ở hàng trăm nghìn: ${n(7200000)}. Kết quả của Mi là số làm tròn đến hàng chục nghìn, chưa phải hàng trăm nghìn.`,
      },
      {
        id: "vi-sao",
        kind: "trac-nghiem",
        prompt: `${n(603450)} và ${n(599990)}, số nào lớn hơn? Vì sao?`,
        options: [
          `${n(603450)} lớn hơn, vì ở hàng trăm nghìn có 6 > 5.`,
          `${n(599990)} lớn hơn, vì có nhiều chữ số 9 hơn.`,
          "Hai số bằng nhau, vì cùng có sáu chữ số.",
          `${n(603450)} lớn hơn, vì chữ số tận cùng là 0.`,
        ],
        answerIndex: 0,
        hint: "Hai số cùng sáu chữ số. So từ hàng cao nhất.",
        explanation: `Cùng sáu chữ số thì so từ trái sang phải. Hàng trăm nghìn: 6 > 5 nên ${n(603450)} > ${n(599990)}, không cần so các hàng sau.`,
      },
    ],
  },
];
