import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainMass, massHint, type MassUnit } from "@/lib/mass-units";

const n = formatNumber;

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

const zerosOf = (power: number) => Math.round(Math.log10(power));

/** Dòng tính nhẩm `a × p = ?` hoặc `a : p = ?`, p là 10, 100, 1 000. */
function mulParts(a: number, power: number): FillQuestion["parts"] {
  return [`${n(a)} × ${n(power)} =`, { answer: a * power }];
}
function divParts(a: number, power: number): FillQuestion["parts"] {
  return [`${n(a)} : ${n(power)} =`, { answer: a / power }];
}

const mulHint = "Nhân với 10, 100, 1 000: viết thêm một, hai, ba chữ số 0 vào bên phải số đó.";
const divHint = "Chia số tròn chục, tròn trăm, tròn nghìn cho 10, 100, 1 000: bỏ bớt một, hai, ba chữ số 0 ở bên phải.";

function mulExplain(a: number, power: number) {
  return `${n(a)} × ${n(power)}: viết thêm ${zerosOf(power)} chữ số 0 vào bên phải ${n(a)}, được ${n(a * power)}.`;
}
function divExplain(a: number, power: number) {
  return `${n(a)} : ${n(power)}: bỏ bớt ${zerosOf(power)} chữ số 0 ở bên phải ${n(a)}, được ${n(a / power)}.`;
}

function mulFill(id: string, a: number, power: number): FillQuestion {
  return { id, kind: "dien-so", prompt: "Tính nhẩm.", parts: mulParts(a, power), hint: mulHint, explanation: mulExplain(a, power) };
}

/** Bảng số bị chia, số chia, thương: ẩn đúng một ô (null). */
function divTable(id: string, dividend: number | null, divisor: number | null, quotient: number | null): FillQuestion {
  const d = dividend ?? divisor! * quotient!;
  const s = divisor ?? d / quotient!;
  const q = quotient ?? d / s;
  const parts: FillQuestion["parts"] =
    dividend === null ? [{ answer: d }, `: ${n(s)} = ${n(q)}`] : divisor === null ? [`${n(d)} :`, { answer: s }, `= ${n(q)}`] : [`${n(d)} : ${n(s)} =`, { answer: q }];
  return {
    id,
    kind: "dien-so",
    prompt: "Số bị chia : số chia = thương. Tìm số còn thiếu.",
    parts,
    hint:
      dividend === null
        ? "Số bị chia bằng thương nhân với số chia."
        : divisor === null
          ? "Số chia bằng số bị chia chia cho thương. Dùng cách bỏ bớt chữ số 0."
          : divHint,
    explanation:
      dividend === null
        ? `Số bị chia = thương × số chia = ${n(q)} × ${n(s)} = ${n(d)}. Kiểm tra: ${n(d)} : ${n(s)} = ${n(q)}.`
        : divisor === null
          ? `Số chia = ${n(d)} : ${n(q)} = ${n(s)}.`
          : divExplain(d, s),
  };
}

/** Câu đổi đơn vị khối lượng. */
function conv(id: string, source: string, to: MassUnit, answer: number): FillQuestion {
  return { id, kind: "dien-so", parts: [`${source} =`, { answer }, to], conversion: { source, to }, hint: massHint(source, to), explanation: explainMass(source, to) };
}

/** Khởi động đầu bài: nhân 10 theo chục, số tròn chục, đổi đơn vị gấp 10. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-chuc",
    kind: "dien-so",
    prompt: "Điền số thích hợp.",
    parts: ["5 chục =", { answer: 50 }, "; 12 chục =", { answer: 120 }],
    hint: "1 chục là 10. 5 chục là 5 lần 10.",
    explanation: "5 chục = 50. 12 chục = 120.",
  },
  {
    id: "kd-bang-nhan",
    kind: "dien-so",
    prompt: "Dùng bảng nhân, điền kết quả.",
    parts: ["4 × 9 =", { answer: 36 }, "; 7 × 6 =", { answer: 42 }],
    hint: "Nhớ bảng nhân 4, 6, 7, 9.",
    explanation: "4 × 9 = 36. 7 × 6 = 42.",
  },
  {
    id: "kd-hang",
    kind: "trac-nghiem",
    prompt: "Trong số 4 205, chữ số 2 ở hàng nào?",
    options: ["Hàng đơn vị", "Hàng chục", "Hàng trăm", "Hàng nghìn"],
    answerIndex: 2,
    hint: "Đọc từ phải sang trái: đơn vị, chục, trăm, nghìn.",
    explanation: "4 205: chữ số 5 ở hàng đơn vị, 0 hàng chục, 2 hàng trăm, 4 hàng nghìn.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  nhan: mulFill("thu-nhan", 47, 100),
  chia: { id: "thu-chia", kind: "dien-so", prompt: "Tính nhẩm.", parts: divParts(8_300, 100), hint: divHint, explanation: divExplain(8_300, 100) } satisfies FillQuestion,
  suyNguoc: {
    id: "thu-suy-nguoc",
    kind: "dien-so",
    prompt: "Biết 25 × 10 = 250. Điền số thích hợp.",
    parts: ["250 : 10 =", { answer: 25 }],
    hint: "Phép chia là phép tính ngược của phép nhân.",
    explanation: "Vì 25 × 10 = 250 nên 250 : 10 = 25.",
  } satisfies FillQuestion,
} satisfies Record<string, Question>;

const hoatDong: Question[] = [
  { id: "hd-1a", kind: "dien-so", prompt: "Tính nhẩm.", parts: ["23 × 10 =", { answer: 230 }, `; ${n(2417)} × 100 =`, { answer: 241_700 }, `; ${n(4805)} × ${n(1000)} =`, { answer: 4_805_000 }], hint: mulHint, explanation: [mulExplain(23, 10), mulExplain(2417, 100), mulExplain(4805, 1000)].join(" ") },
  { id: "hd-1b", kind: "dien-so", prompt: "Tính nhẩm.", parts: [`${n(27640)} : 10 =`, { answer: 2764 }, `; ${n(531000)} : 100 =`, { answer: 5310 }, `; ${n(692000)} : ${n(1000)} =`, { answer: 692 }], hint: divHint, explanation: [divExplain(27640, 10), divExplain(531000, 100), divExplain(692000, 1000)].join(" ") },
  {
    id: "hd-2",
    kind: "loi-van",
    prompt: "Rô-bốt chạy 10 vòng quanh sân vận động. Mỗi vòng quanh sân dài 285 m. Hỏi Rô-bốt đã chạy bao nhiêu mét?",
    lines: [["Số mét đã chạy: 285 × 10 =", { answer: 2850 }, "(m)"]],
    hint: "10 vòng, mỗi vòng 285 m: lấy 285 nhân 10.",
    explanation: "285 × 10 = 2 850. Rô-bốt đã chạy 2 850 m.",
  } satisfies WordQuestion,
  {
    id: "hd-3",
    kind: "loi-van",
    prompt: "Trong hội trường, mỗi bên lối đi có 10 hàng ghế, mỗi hàng có 9 chỗ ngồi. Hỏi hội trường có tất cả bao nhiêu chỗ ngồi?",
    lines: [["Số chỗ ngồi ở một bên: 9 × 10 =", { answer: 90 }, "(chỗ)"], ["Số chỗ ngồi cả hai bên: 90 × 2 =", { answer: 180 }, "(chỗ)"]],
    hint: "Tìm số chỗ ở một bên lối đi trước, rồi nhân với 2 vì có hai bên.",
    explanation: "Một bên: 9 × 10 = 90 chỗ. Hai bên: 90 × 2 = 180 chỗ. Hội trường có 180 chỗ ngồi.",
  } satisfies WordQuestion,
];

const luyenTap: Question[] = [
  divTable("lt-1a", 450, 10, null),
  divTable("lt-1b", 6_300, 100, null),
  divTable("lt-1c", 84_000, null, 1_000),
  divTable("lt-1d", 8_140, null, 10),
  divTable("lt-1e", null, 45, 1_000),
  divTable("lt-1f", null, 130, 100),
  conv("lt-2a1", "700 kg", "tạ", 7),
  conv("lt-2a2", "600 yến", "tạ", 60),
  conv("lt-2a3", "9 000 kg", "tấn", 9),
  conv("lt-2b1", "90 kg", "yến", 9),
  conv("lt-2b2", "300 kg", "tạ", 3),
  conv("lt-2b3", "7 000 kg", "tấn", 7),
  {
    id: "lt-3",
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện: nhóm 5 × 2 = 10 trước.",
    parts: [`${n(3574)} × 5 × 2 =`, { answer: 35_740 }, `; 5 × 2 × ${n(41287)} =`, { answer: 412_870 }, `; 2 × 718 × 5 =`, { answer: 7_180 }, `; 5 × ${n(6249)} × 2 =`, { answer: 62_490 }],
    hint: "5 × 2 = 10. Đổi chỗ các thừa số để 5 và 2 đứng cạnh nhau, rồi nhân với 10.",
    explanation: `${n(3574)} × 5 × 2 = ${n(3574)} × 10 = ${n(35740)}. 5 × 2 × ${n(41287)} = 10 × ${n(41287)} = ${n(412870)}. 2 × 718 × 5 = 718 × 10 = ${n(7180)}. 5 × ${n(6249)} × 2 = ${n(6249)} × 10 = ${n(62490)}.`,
  } satisfies FillQuestion,
  {
    id: "lt-4",
    kind: "loi-van",
    prompt: "Một đoàn tàu hoả có 24 toa. Người ta dùng các toa từ toa 15 đến toa 24 để chở hàng. Mỗi toa chở 15 tấn hàng. Hỏi đoàn tàu chở tất cả bao nhiêu tấn hàng?",
    lines: [["Số toa chở hàng: 24 − 15 + 1 =", { answer: 10 }, "(toa)"], ["Số tấn hàng: 15 × 10 =", { answer: 150 }, "(tấn)"]],
    hint: "Đếm số toa từ toa 15 đến toa 24: nhớ tính cả toa 15 và toa 24. Rồi nhân với 15 tấn.",
    explanation: "Các toa 15, 16, …, 24 có 24 − 15 + 1 = 10 toa. Chở 15 × 10 = 150 tấn hàng.",
  } satisfies WordQuestion,
  {
    id: "lt-5",
    kind: "loi-van",
    prompt: "Trên đoạn đường dài 400 m, cứ 10 m có một cột đèn. Cả hai đầu đoạn đường đều có cột đèn. Hỏi đoạn đường đó có bao nhiêu cột đèn?",
    lines: [["Số khoảng cách giữa hai cột đèn: 400 : 10 =", { answer: 40 }, "(khoảng)"], ["Số cột đèn: 40 + 1 =", { answer: 41 }, "(cột)"]],
    hint: "Vẽ đoạn đường ngắn, như 30 m. Có 3 khoảng cách mà có 4 cột. Số cột nhiều hơn số khoảng cách 1.",
    explanation: "400 : 10 = 40 khoảng cách. Có cột ở cả hai đầu nên số cột nhiều hơn số khoảng cách 1: 40 + 1 = 41 cột đèn.",
  } satisfies WordQuestion,
];

const suyNghi: Question[] = [
  choice(
    "sn-1",
    "Nam tính 47 × 100 = 470. Nam sai ở đâu?",
    ["Nam chỉ thêm một chữ số 0, phải thêm hai: 4 700", "Nam phải thêm ba chữ số 0: 47 000", "Nam tính đúng", "Phải bỏ bớt chữ số 0: 4,7"],
    0,
    "100 có mấy chữ số 0? Phải viết thêm bấy nhiêu chữ số 0.",
    "100 có hai chữ số 0 nên 47 × 100 = 4 700. 470 là kết quả của 47 × 10.",
  ),
  choice(
    "sn-2",
    "Mai nói: “3 000 : 100 = 3”. Mai đúng hay sai?",
    ["Sai: bỏ hai chữ số 0 thì được 30", "Đúng: bỏ hết các chữ số 0", "Sai: phải bằng 300", "Sai: phải bằng 3 000"],
    0,
    "Chia cho 100 chỉ bỏ hai chữ số 0. Kiểm tra lại: 30 × 100 = ?",
    "3 000 : 100: bỏ hai chữ số 0 ở bên phải, còn 30. Kiểm tra: 30 × 100 = 3 000.",
  ),
  {
    id: "sn-3",
    kind: "dien-so",
    prompt: "Số 5 400 gấp số 54 bao nhiêu lần?",
    parts: ["5 400 : 54 =", { answer: 100 }],
    hint: "Số 54 viết thêm bao nhiêu chữ số 0 để được 5 400?",
    explanation: "54 viết thêm hai chữ số 0 được 5 400, tức 54 × 100 = 5 400. Vậy 5 400 gấp 54 là 100 lần.",
  } satisfies FillQuestion,
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 15)", questions: hoatDong },
  { id: "luyen-tap", title: "Luyện tập (trang 16)", questions: luyenTap },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
