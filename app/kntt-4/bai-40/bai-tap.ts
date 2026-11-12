import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;
const times = (...numbers: number[]) => numbers.reduce((product, value) => product * value, 1);

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** Điền số hạng còn thiếu trong đẳng thức giao hoán, kết hợp. */
function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}

/** Một dòng số: `Số ?` giao hoán, `left × right = ? × ...`. */
function swap(id: string, a: number, b: number, side: "right" | "left"): FillQuestion {
  const parts = side === "right" ? [`${n(a)} × ${n(b)} = ${n(b)} ×`, { answer: a }] : [`${n(a)} × ${n(b)} =`, { answer: b }, `× ${n(a)}`];
  return fill(
    id,
    "Điền số thích hợp vào ô trống.",
    parts,
    "Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi.",
    `Đổi chỗ hai thừa số: ${n(a)} × ${n(b)} = ${n(b)} × ${n(a)}. Số cần điền là ${n(side === "right" ? a : b)}.`,
  );
}

/** Tính một tích ba thừa số bằng hai cách, như mẫu của sách. */
function twoWays(id: string, a: number, b: number, c: number): WordQuestion {
  return {
    id,
    kind: "loi-van",
    prompt: `Tính ${a} × ${b} × ${c} bằng hai cách.`,
    lines: [
      [`Cách 1: (${a} × ${b}) × ${c} =`, { answer: a * b }, `× ${c} =`, { answer: times(a, b, c) }],
      [`Cách 2: ${a} × (${b} × ${c}) = ${a} ×`, { answer: b * c }, "=", { answer: times(a, b, c) }],
    ],
    hint: "Cách 1: nhân hai thừa số đầu trước. Cách 2: nhân hai thừa số sau trước. Hai cách phải ra cùng kết quả.",
    explanation: `(${a} × ${b}) × ${c} = ${a * b} × ${c} = ${times(a, b, c)}. ${a} × (${b} × ${c}) = ${a} × ${b * c} = ${times(a, b, c)}. Hai cách bằng nhau.`,
  };
}

/** Một hàng của bảng: a × b, b × a, (a × b) × c, a × (b × c). */
function tableRow(id: string, a: number, b: number, c: number): FillQuestion {
  return fill(
    id,
    `Tính khi a = ${a}, b = ${b}, c = ${c}.`,
    [
      "a × b =",
      { answer: a * b },
      "; b × a =",
      { answer: b * a },
      "; (a × b) × c =",
      { answer: times(a, b, c) },
      "; a × (b × c) =",
      { answer: times(a, b, c) },
    ],
    "Tính từng biểu thức. Cặp giá trị nào sẽ bằng nhau?",
    `a × b = ${a} × ${b} = ${a * b}; b × a = ${b} × ${a} = ${b * a}. (a × b) × c = ${a * b} × ${c} = ${times(a, b, c)}; a × (b × c) = ${a} × ${b * c} = ${times(a, b, c)}. Từng cặp bằng nhau.`,
  );
}

/** Khởi động đầu bài: bảng nhân, nhân số tròn chục, nhân nhẩm với 4 và 25. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-bang-nhan",
    kind: "dien-so",
    prompt: "Dùng bảng nhân, điền kết quả.",
    parts: ["7 × 8 =", { answer: 56 }, "; 6 × 9 =", { answer: 54 }],
    hint: "Nhớ bảng nhân 6, 7, 8, 9.",
    explanation: "7 × 8 = 56. 6 × 9 = 54.",
  },
  {
    id: "kd-nhan-tron",
    kind: "dien-so",
    prompt: "Điền kết quả.",
    parts: ["30 × 4 =", { answer: 120 }, "; 120 × 7 =", { answer: 840 }],
    hint: "Nhân 3 × 4 rồi viết thêm một chữ số 0. 12 × 7 rồi viết thêm một chữ số 0.",
    explanation: "30 × 4: 3 × 4 = 12, thêm một chữ số 0 được 120. 120 × 7: 12 × 7 = 84, thêm một chữ số 0 được 840.",
  },
  {
    id: "kd-nhan-nham",
    kind: "dien-so",
    prompt: "Điền kết quả.",
    parts: ["25 × 4 =", { answer: 100 }, "; 2 × 5 =", { answer: 10 }],
    hint: "4 phần tư là 100: 25 + 25 + 25 + 25.",
    explanation: "25 × 4 = 100 vì 25 + 25 + 25 + 25 = 100. 2 × 5 = 10.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  giaoHoan: fill(
    "thu-giao-hoan",
    "Điền số thích hợp vào ô trống.",
    ["9 × 6 =", { answer: 6 }, "× 9"],
    "Đổi chỗ hai thừa số.",
    "9 × 6 = 6 × 9. Cả hai đều bằng 54.",
  ),
  ketHop: fill(
    "thu-ket-hop",
    "Điền số thích hợp vào ô trống.",
    ["(5 × 4) × 3 = 5 × (", { answer: 4 }, "× 3)"],
    "Số thứ hai đứng giữa, nhân với số thứ ba trong ngoặc.",
    "(5 × 4) × 3 = 20 × 3 = 60 và 5 × (4 × 3) = 5 × 12 = 60. Số cần điền là 4.",
  ),
  nhomNham: fill(
    "thu-nhom-nham",
    "Nhẩm: nhóm hai số có tích tròn chục trước. Điền kết quả.",
    ["2 × 7 × 5 = 7 × (2 × 5) = 7 × 10 =", { answer: 70 }],
    "2 × 5 = 10 nên nhóm 2 và 5.",
    "2 × 7 × 5 = 7 × (2 × 5) = 7 × 10 = 70.",
  ),
} satisfies Record<string, Question>;

const matchPairs: MatchQuestion = {
  id: "hd-1",
  kind: "noi-cap",
  prompt: "Nối các phép tính có cùng kết quả.",
  pairs: [
    { left: "8 × 420", right: "420 × 8" },
    { left: "63 × 7", right: "7 × 63" },
    { left: "150 × 6", right: "6 × 150" },
    { left: `5 × ${n(1300)}`, right: `${n(1300)} × 5` },
  ],
  rightOrder: [2, 0, 3, 1],
  hint: "Hai phép tính có cùng các thừa số, chỉ đổi chỗ, thì có cùng kết quả. Con không cần tính.",
  explanation: "Đổi chỗ các thừa số trong một tích thì tích không thay đổi: 8 × 420 = 420 × 8, 63 × 7 = 7 × 63, 150 × 6 = 6 × 150, 5 × 1 300 = 1 300 × 5.",
};

const hoatDongGiaoHoan: Question[] = [
  matchPairs,
  swap("hd-2a", 7, 6, "right"),
  swap("hd-2b", 4, 10, "left"),
  swap("hd-2c", 2415, 9, "left"),
  swap("hd-2d", 30520, 4, "right"),
  {
    id: "hd-3",
    kind: "loi-van",
    prompt: "Bữa tiệc có 8 bàn, mỗi bàn có đủ 15 người. Dùng tính chất giao hoán để tìm số người dự tiệc.",
    lines: [
      ["Số người: 8 × 15 = 15 ×", { answer: 8 }],
      ["15 × 8 =", { answer: times(15, 8) }, "(người)"],
    ],
    hint: "Đổi chỗ để thừa số lớn đứng trước: 15 × 8 dễ nhẩm hơn.",
    explanation: "8 × 15 = 15 × 8. 15 × 8 = 10 × 8 + 5 × 8 = 80 + 40 = 120. Có 120 người.",
  },
];

const hoatDongKetHop: Question[] = [
  twoWays("hd-4a", 5, 2, 6),
  twoWays("hd-4b", 8, 3, 2),
  twoWays("hd-4c", 4, 3, 3),
  twoWays("hd-4d", 9, 2, 5),
  choice(
    "hd-5a",
    "Hai đội cầm thẻ có giá trị bằng nhau. Thẻ 6 × 5 × 4 cùng đội với thẻ nào?",
    ["12 × 10", "30 × 3", "24 × 6"],
    0,
    "Tính 6 × 5 × 4 rồi tính từng thẻ.",
    "6 × 5 × 4 = 30 × 4 = 120. 12 × 10 = 120 (cùng đội). 30 × 3 = 90. 24 × 6 = 144.",
  ),
  choice(
    "hd-5b",
    "Thẻ 9 × 4 × 2 cùng đội với thẻ nào?",
    ["7 × 10", "8 × 9", "36 × 3"],
    1,
    "Tính 9 × 4 × 2. Mẹo: 4 × 2 = 8, rồi 9 × 8.",
    "9 × 4 × 2 = 9 × 8 = 72. 8 × 9 = 72 (cùng đội). 7 × 10 = 70. 36 × 3 = 108.",
  ),
  {
    id: "hd-6",
    kind: "loi-van",
    prompt: "Bạn Mai có 5 hộp kẹo. Mỗi hộp có 4 ngăn, mỗi ngăn có 5 viên kẹo. Hỏi Mai có tất cả bao nhiêu viên kẹo?",
    lines: [
      ["Số ngăn kẹo: 5 × 4 =", { answer: times(5, 4) }, "(ngăn)"],
      ["Số viên kẹo: 20 × 5 =", { answer: times(5, 4, 5) }, "(viên)"],
    ],
    hint: "Tìm số ngăn của cả 5 hộp trước, rồi nhân với số viên kẹo trong mỗi ngăn.",
    explanation: "5 hộp, mỗi hộp 4 ngăn: 5 × 4 = 20 ngăn. Mỗi ngăn 5 viên: 20 × 5 = 100 viên. Cũng là (5 × 4) × 5 = 5 × (4 × 5) = 100.",
  },
];

const luyenTapQuestions: Question[] = [
  tableRow("lt-1a", 6, 5, 3),
  tableRow("lt-1b", 9, 2, 4),
  tableRow("lt-1c", 5, 4, 5),
  fill(
    "lt-2",
    `Biết ${n(42150)} × 7 = ${n(295050)} và ${n(295050)} × 4 = ${n(1180200)}. Không thực hiện phép tính, cho biết giá trị của mỗi biểu thức.`,
    [`7 × ${n(42150)} =`, { answer: 42150 * 7 }, `; 4 × ${n(295050)} =`, { answer: 295050 * 4 }, `; ${n(42150)} × 7 × 4 =`, { answer: 42150 * 7 * 4 }],
    "Đổi chỗ thừa số thì tích không đổi. Tích ba thừa số: nhân hai thừa số đầu trước, rồi nhân với số còn lại.",
    `7 × ${n(42150)} = ${n(42150)} × 7 = ${n(295050)}. 4 × ${n(295050)} = ${n(295050)} × 4 = ${n(1180200)}. ${n(42150)} × 7 × 4 = (${n(42150)} × 7) × 4 = ${n(295050)} × 4 = ${n(1180200)}.`,
  ),
  {
    id: "lt-3",
    kind: "noi-cap",
    prompt: "Nối mỗi phép tính với kết quả. Nhóm hai thừa số cho dễ nhẩm.",
    pairs: [
      { left: "25 × 4 × 6", right: "600" },
      { left: "2 × 40 × 3", right: "240" },
      { left: "5 × 20 × 4", right: "400" },
      { left: "2 × 50 × 3", right: "300" },
    ],
    rightOrder: [1, 2, 3, 0],
    hint: "Tìm hai thừa số có tích tròn: 25 × 4 = 100, 5 × 20 = 100, 2 × 50 = 100.",
    explanation: "25 × 4 × 6 = 100 × 6 = 600. 2 × 40 × 3 = 80 × 3 = 240. 5 × 20 × 4 = 100 × 4 = 400. 2 × 50 × 3 = 100 × 3 = 300.",
  },
  fill(
    "lt-4a",
    "Điền số thích hợp vào ô trống.",
    [`${n(215)} × 9 = 9 ×`, { answer: 215 }],
    "Đổi chỗ hai thừa số.",
    `${n(215)} × 9 = 9 × ${n(215)}.`,
  ),
  fill(
    "lt-4b",
    "Điền số thích hợp vào ô trống.",
    ["7 × 40 = (", { answer: 30 }, "+ 10) × 7"],
    "Đổi chỗ: 7 × 40 = 40 × 7. Trong ngoặc phải ra 40.",
    "7 × 40 = 40 × 7. Trong ngoặc phải là 40, mà 30 + 10 = 40, nên điền 30.",
  ),
  fill(
    "lt-4c",
    "Điền số thích hợp vào ô trống.",
    ["(8 × 12) × 15 = 8 × (", { answer: 12 }, "× 15)"],
    "Số thứ hai (12) đứng giữa, nhân với số thứ ba (15) trong ngoặc.",
    "(8 × 12) × 15 = 8 × (12 × 15). Số cần điền là 12.",
  ),
  fill(
    "lt-4d",
    "Điền số thích hợp vào ô trống.",
    ["17 × 4 × 5 = 5 ×", { answer: 17 * 4 }, "= 20 ×", { answer: 17 }],
    "17 × 4 = 68 rồi đổi chỗ 5 × 68. Hoặc 4 × 5 = 20 rồi nhân với 17.",
    "17 × 4 × 5 = 5 × (17 × 4) = 5 × 68 = 340. Cũng là 17 × (4 × 5) = 17 × 20 = 20 × 17 = 340.",
  ),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Hà nhẩm 5 × 8 × 2 = 5 × (8 × 2) = 5 × 10 = 50. Hà sai ở đâu?",
    ["8 × 2 = 16, không phải 10; đúng là 80", "Không được nhóm 8 và 2 lại với nhau", "Hà tính đúng", "Phải tính 5 × 8 trước rồi cộng 2"],
    0,
    "Tính lại 8 × 2 trong ngoặc.",
    "Được nhóm 8 và 2: 5 × (8 × 2) = 5 × 16 = 80. Hà nhầm 8 × 2 = 10. Cách nhẩm hay hơn: 5 × 8 × 2 = 5 × 2 × 8 = 10 × 8 = 80.",
  ),
  choice(
    "sn-2",
    "Mai nói: “Đổi chỗ hai số thì phép chia cũng không đổi: 8 : 2 = 2 : 8”. Mai đúng hay sai?",
    ["Sai: 8 : 2 = 4 còn 2 : 8 = 0 (dư 2)", "Đúng: cả hai đều bằng 4", "Đúng: cả hai đều bằng 16", "Sai: 8 : 2 = 2 còn 2 : 8 = 4"],
    0,
    "Tính từng phép chia xem có bằng nhau không.",
    "8 : 2 = 4, còn 2 : 8 = 0 (dư 2). Tính chất giao hoán chỉ dùng cho phép nhân (và phép cộng), không dùng cho phép chia.",
  ),
  fill(
    "sn-3",
    "Nhẩm cho nhanh: nhóm hai thừa số có tích tròn trăm rồi tính.",
    ["25 × 9 × 4 = 25 × 4 × 9 = 100 × 9 =", { answer: times(25, 9, 4) }],
    "Đổi chỗ để 25 và 4 đứng cạnh nhau: 25 × 4 = 100.",
    "25 × 9 × 4 = 25 × 4 × 9 = 100 × 9 = 900.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "giao-hoan", title: "Hoạt động: tính chất giao hoán (trang 10)", questions: hoatDongGiaoHoan },
  { id: "ket-hop", title: "Hoạt động: tính chất kết hợp (trang 12)", questions: hoatDongKetHop },
  { id: "luyen-tap", title: "Luyện tập (trang 13)", questions: luyenTapQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
