import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** a × (b + c) tính bằng hai cách, như mẫu của sách. */
function timesSum(id: string, a: number, b: number, c: number): WordQuestion {
  const total = a * (b + c);
  return {
    id,
    kind: "loi-van",
    prompt: `Tính ${a} × (${b} + ${c}) bằng hai cách.`,
    lines: [
      [`Cách 1: ${a} × (${b} + ${c}) = ${a} ×`, { answer: b + c }, "=", { answer: total }],
      [`Cách 2: ${a} × (${b} + ${c}) = ${a} × ${b} + ${a} × ${c} =`, { answer: a * b }, "+", { answer: a * c }, "=", { answer: total }],
    ],
    hint: "Cách 1: cộng trong ngoặc trước. Cách 2: nhân số đó với từng số hạng rồi cộng lại. Hai cách phải ra cùng kết quả.",
    explanation: `Cách 1: ${a} × ${b + c} = ${total}. Cách 2: ${a} × ${b} + ${a} × ${c} = ${a * b} + ${a * c} = ${total}. Hai cách bằng nhau.`,
  };
}

/** (a + b) × c tính bằng hai cách. */
function sumTimes(id: string, a: number, b: number, c: number): WordQuestion {
  const total = (a + b) * c;
  return {
    id,
    kind: "loi-van",
    prompt: `Tính (${a} + ${b}) × ${c} bằng hai cách.`,
    lines: [
      [`Cách 1: (${a} + ${b}) × ${c} =`, { answer: a + b }, `× ${c} =`, { answer: total }],
      [`Cách 2: (${a} + ${b}) × ${c} = ${a} × ${c} + ${b} × ${c} =`, { answer: a * c }, "+", { answer: b * c }, "=", { answer: total }],
    ],
    hint: "Cách 1: cộng trong ngoặc trước. Cách 2: nhân từng số hạng với số ngoài ngoặc rồi cộng lại.",
    explanation: `Cách 1: ${a + b} × ${c} = ${total}. Cách 2: ${a} × ${c} + ${b} × ${c} = ${a * c} + ${b * c} = ${total}. Hai cách bằng nhau.`,
  };
}

/** a × b + a × c tính bằng hai cách: tính từng tích, hoặc gộp thành a × (b + c). */
function twoWaysSum(id: string, a: number, b: number, c: number): WordQuestion {
  const total = a * (b + c);
  return {
    id,
    kind: "loi-van",
    prompt: `Tính ${a} × ${b} + ${a} × ${c} bằng hai cách.`,
    lines: [
      [`Cách 1: ${a} × ${b} + ${a} × ${c} =`, { answer: a * b }, "+", { answer: a * c }, "=", { answer: total }],
      [`Cách 2: ${a} × ${b} + ${a} × ${c} = ${a} × (${b} + ${c}) = ${a} ×`, { answer: b + c }, "=", { answer: total }],
    ],
    hint: "Hai tích có chung một thừa số. Cách 2: viết thừa số chung ra ngoài, cộng hai số còn lại trong ngoặc.",
    explanation: `Cách 1: ${a * b} + ${a * c} = ${total}. Cách 2: ${a} × (${b} + ${c}) = ${a} × ${b + c} = ${total}. Cách 2 thuận tiện hơn.`,
  };
}

/** Tính thuận tiện: gộp rồi nhân. `shared` là thừa số chung, `left` / `right` là hai số còn lại. */
function handy(id: string, parts: FillQuestion["parts"], explanation: string): FillQuestion {
  return fill(id, "Tính bằng cách thuận tiện.", parts, "Tìm thừa số chung. Viết nó ra ngoài ngoặc, cộng hai số còn lại trước.", explanation);
}

/** Một hàng của bảng: a × (b − c) và a × b − a × c. */
function minusRow(id: string, a: number, b: number, c: number): FillQuestion {
  return fill(
    id,
    `Tính khi a = ${a}, b = ${b}, c = ${c}.`,
    ["a × (b − c) =", { answer: a * (b - c) }, "; a × b − a × c =", { answer: a * b - a * c }],
    "Tính từng biểu thức. Trong ngoặc tính trước. Hai giá trị có bằng nhau không?",
    `a × (b − c) = ${a} × (${b} − ${c}) = ${a} × ${b - c} = ${a * (b - c)}. a × b − a × c = ${a * b} − ${a * c} = ${a * b - a * c}. Hai giá trị bằng nhau.`,
  );
}

/** Khởi động đầu bài: nhân nhẩm, cộng trong ngoặc. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-bang-nhan",
    kind: "dien-so",
    prompt: "Điền kết quả.",
    parts: ["8 × 7 =", { answer: 56 }, "; 15 × 4 =", { answer: 60 }],
    hint: "15 × 4: 10 × 4 = 40 và 5 × 4 = 20, rồi cộng lại.",
    explanation: "8 × 7 = 56. 15 × 4 = 40 + 20 = 60.",
  },
  {
    id: "kd-nhan-tron",
    kind: "dien-so",
    prompt: "Điền kết quả.",
    parts: ["20 × 3 =", { answer: 60 }, "; 45 × 2 =", { answer: 90 }],
    hint: "2 × 3 = 6 rồi viết thêm một chữ số 0. 45 × 2: 40 × 2 = 80 và 5 × 2 = 10.",
    explanation: "20 × 3 = 60. 45 × 2 = 80 + 10 = 90.",
  },
  {
    id: "kd-ngoac",
    kind: "dien-so",
    prompt: "Trong ngoặc tính trước. Điền kết quả.",
    parts: ["(4 + 6) × 3 =", { answer: 30 }, "; 3 × (9 − 4) =", { answer: 15 }],
    hint: "Tính phép trong ngoặc trước: 4 + 6 = 10, 9 − 4 = 5.",
    explanation: "(4 + 6) × 3 = 10 × 3 = 30. 3 × (9 − 4) = 3 × 5 = 15.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  nhanVoiTong: fill(
    "thu-nhan-tong",
    "Điền số thích hợp vào ô trống.",
    ["5 × (3 + 4) = 5 × 3 + 5 ×", { answer: 4 }],
    "Nhân 5 với từng số hạng: số hạng thứ nhất là 3, số hạng thứ hai là 4.",
    "5 × (3 + 4) = 5 × 7 = 35 và 5 × 3 + 5 × 4 = 15 + 20 = 35. Số cần điền là 4.",
  ),
  tongNhanVoi: fill(
    "thu-tong-nhan",
    "Điền số thích hợp vào ô trống.",
    ["(2 + 6) × 7 = 2 × 7 +", { answer: 6 }, "× 7"],
    "Nhân từng số hạng của tổng với 7.",
    "(2 + 6) × 7 = 8 × 7 = 56 và 2 × 7 + 6 × 7 = 14 + 42 = 56. Số cần điền là 6.",
  ),
  thuanTien: fill(
    "thu-thuan-tien",
    "Tính thuận tiện. Điền kết quả.",
    ["38 × 6 + 38 × 4 = 38 × (6 + 4) = 38 × 10 =", { answer: 380 }],
    "6 + 4 = 10, mà nhân với 10 rất dễ.",
    "38 × 6 + 38 × 4 = 38 × (6 + 4) = 38 × 10 = 380.",
  ),
  nhanVoiHieu: fill(
    "thu-nhan-hieu",
    "Điền số thích hợp vào ô trống.",
    ["6 × (5 − 2) = 6 × 5 − 6 ×", { answer: 2 }],
    "Nhân 6 với số bị trừ, rồi trừ đi 6 nhân với số trừ.",
    "6 × (5 − 2) = 6 × 3 = 18 và 6 × 5 − 6 × 2 = 30 − 12 = 18. Số cần điền là 2.",
  ),
} satisfies Record<string, Question>;

const hoatDong: Question[] = [
  timesSum("hd-1a", 52, 3, 4),
  sumTimes("hd-1b", 14, 26, 6),
  timesSum("hd-1c", 35, 6, 2),
  sumTimes("hd-1d", 18, 13, 5),
  fill(
    "hd-2a",
    "Tính giá trị của các biểu thức khi m = 3, n = 6, p = 4.",
    ["m × (n + p) =", { answer: 30 }, "; (m + n) × p =", { answer: 36 }, "; m × n + m × p =", { answer: 30 }, "; m × p + n × p =", { answer: 36 }],
    "Thay chữ bằng số. Trong ngoặc tính trước, nhân trước rồi mới cộng.",
    "m × (n + p) = 3 × 10 = 30. (m + n) × p = 9 × 4 = 36. m × n + m × p = 18 + 12 = 30. m × p + n × p = 12 + 24 = 36.",
  ),
  choice(
    "hd-2b",
    "Ở câu trên, hai biểu thức nào có giá trị bằng nhau?",
    ["m × (n + p) và m × n + m × p", "m × (n + p) và (m + n) × p", "(m + n) × p và m × n + m × p", "m × (n + p) và m × p + n × p"],
    0,
    "So sánh các giá trị vừa tính: 30, 36, 30, 36.",
    "m × (n + p) = 30 và m × n + m × p = 30. Đây là tính chất phân phối: m × (n + p) = m × n + m × p. Các cặp còn lại là 30 và 36 nên khác nhau.",
  ),
  {
    id: "hd-3",
    kind: "loi-van",
    prompt: "Khối lớp Bốn có 3 lớp học vẽ, khối lớp Ba có 4 lớp học vẽ, mỗi lớp có 15 bạn. Hỏi cả hai khối có bao nhiêu bạn học vẽ? Giải bằng hai cách.",
    lines: [
      ["Cách 1: (3 + 4) × 15 =", { answer: 7 }, "× 15 =", { answer: 105 }, "(bạn)"],
      ["Cách 2: 3 × 15 + 4 × 15 =", { answer: 45 }, "+", { answer: 60 }, "=", { answer: 105 }, "(bạn)"],
    ],
    hint: "Cách 1: tìm tổng số lớp trước. Cách 2: tìm số bạn của từng khối rồi cộng.",
    explanation: "Cách 1: 7 lớp, mỗi lớp 15 bạn: 7 × 15 = 105. Cách 2: khối Bốn 3 × 15 = 45 bạn, khối Ba 4 × 15 = 60 bạn, 45 + 60 = 105. Cả hai cách đều ra 105 bạn.",
  },
];

const luyenTapCong: Question[] = [
  twoWaysSum("lt-1a", 73, 3, 6),
  twoWaysSum("lt-1b", 125, 4, 2),
  handy("lt-2a", ["58 × 7 + 58 × 3 = 58 × (7 + 3) = 58 ×", { answer: 10 }, "=", { answer: 580 }], "58 × 7 + 58 × 3 = 58 × (7 + 3) = 58 × 10 = 580."),
  handy("lt-2b", ["24 × 8 + 24 × 2 = 24 × (8 + 2) = 24 ×", { answer: 10 }, "=", { answer: 240 }], "24 × 8 + 24 × 2 = 24 × (8 + 2) = 24 × 10 = 240."),
  handy(
    "lt-2c",
    ["34 × 4 + 66 × 4 = (34 + 66) × 4 =", { answer: 100 }, "× 4 =", { answer: 400 }],
    "34 × 4 + 66 × 4 = (34 + 66) × 4 = 100 × 4 = 400. Thừa số chung là 4, đứng sau.",
  ),
  fill(
    "lt-3",
    "Tính bằng cách thuận tiện.",
    [`241 × 3 + 241 × 5 + 241 × 2 = 241 × (3 + 5 + 2) = 241 ×`, { answer: 10 }, "=", { answer: 2410 }],
    "Có ba tích cùng thừa số 241. Cộng ba số còn lại trong ngoặc.",
    `241 × 3 + 241 × 5 + 241 × 2 = 241 × (3 + 5 + 2) = 241 × 10 = ${n(2410)}.`,
  ),
  {
    id: "lt-4",
    kind: "loi-van",
    prompt: "Đợt một chuyển được 3 chuyến, mỗi chuyến có 42 thùng hàng. Đợt hai chuyển được 3 chuyến, mỗi chuyến có 58 thùng hàng. Hỏi cả hai đợt chuyển được bao nhiêu thùng hàng?",
    lines: [
      ["Một chuyến của đợt một cộng một chuyến của đợt hai: 42 + 58 =", { answer: 100 }, "(thùng)"],
      ["Cả hai đợt: (42 + 58) × 3 =", { answer: 300 }, "(thùng)"],
    ],
    hint: "Cả hai đợt đều đi 3 chuyến. Cộng số thùng hai đợt rồi nhân với 3, hoặc 3 × 42 + 3 × 58.",
    explanation: "(42 + 58) × 3 = 100 × 3 = 300. Cách khác: 42 × 3 + 58 × 3 = 126 + 174 = 300. Cả hai đợt chuyển được 300 thùng hàng.",
  },
];

const luyenTapTru: Question[] = [
  fill(
    "lt-5a",
    "Tính rồi so sánh giá trị của hai biểu thức.",
    ["31 × (8 − 5) =", { answer: 93 }, "; 31 × 8 − 31 × 5 =", { answer: 93 }],
    "Một bên tính trong ngoặc trước. Bên kia nhân hai lần rồi trừ.",
    "31 × (8 − 5) = 31 × 3 = 93. 31 × 8 − 31 × 5 = 248 − 155 = 93. Hai biểu thức bằng nhau.",
  ),
  fill(
    "lt-5b",
    "Tính rồi so sánh giá trị của hai biểu thức.",
    ["(9 − 4) × 7 =", { answer: 35 }, "; 9 × 7 − 4 × 7 =", { answer: 35 }],
    "Một bên tính trong ngoặc trước. Bên kia nhân hai lần rồi trừ.",
    "(9 − 4) × 7 = 5 × 7 = 35. 9 × 7 − 4 × 7 = 63 − 28 = 35. Hai biểu thức bằng nhau.",
  ),
  minusRow("lt-6a", 6, 9, 4),
  minusRow("lt-6b", 12, 10, 3),
  minusRow("lt-6c", 15, 8, 5),
  choice(
    "lt-7",
    "Chọn dấu thích hợp: a × (b − c) ? a × b − a × c",
    [">", "<", "="],
    2,
    "Nhìn lại các hàng trong bảng: hai giá trị luôn như thế nào?",
    "Ở mọi hàng, a × (b − c) và a × b − a × c đều bằng nhau. Đây là tính chất phân phối của phép nhân đối với phép trừ: a × (b − c) = a × b − a × c.",
  ),
  fill(
    "lt-8a",
    "Tính bằng cách thuận tiện.",
    ["57 × 9 − 57 × 8 = 57 × (9 − 8) = 57 ×", { answer: 1 }, "=", { answer: 57 }],
    "Có thừa số chung 57. Trừ hai số còn lại trong ngoặc.",
    "57 × 9 − 57 × 8 = 57 × (9 − 8) = 57 × 1 = 57.",
  ),
  fill(
    "lt-8b",
    "Tính bằng cách thuận tiện.",
    ["129 × 7 − 129 × 2 = 129 × (7 − 2) = 129 ×", { answer: 5 }, "=", { answer: 645 }],
    "Có thừa số chung 129. Trừ hai số còn lại trong ngoặc.",
    "129 × 7 − 129 × 2 = 129 × (7 − 2) = 129 × 5 = 645.",
  ),
  {
    id: "lt-9",
    kind: "loi-van",
    prompt: "Một cửa hàng có 8 tấm vải hoa, mỗi tấm dài 25 m. Cửa hàng đã bán 3 tấm vải hoa như vậy. Hỏi cửa hàng còn lại bao nhiêu mét vải hoa?",
    lines: [
      ["Số tấm vải còn lại: 8 − 3 =", { answer: 5 }, "(tấm)"],
      ["Số mét vải còn lại: 5 × 25 =", { answer: 125 }, "(m)"],
    ],
    hint: "Tìm số tấm còn lại trước, rồi nhân với 25. Hoặc 8 × 25 − 3 × 25.",
    explanation: "(8 − 3) × 25 = 5 × 25 = 125. Cách khác: 8 × 25 − 3 × 25 = 200 − 75 = 125. Còn lại 125 m vải hoa.",
  },
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Nam tính 4 × (3 + 5) = 4 × 3 + 5 = 17. Nam sai ở đâu?",
    ["Phải nhân 4 với cả 5: 4 × 3 + 4 × 5 = 32", "Phải cộng 4 + 3 + 5 = 12", "Nam tính đúng", "Phải tính 4 × 3 × 5 = 60"],
    0,
    "Tính 4 × (3 + 5) bằng cách cộng trong ngoặc trước, rồi so với kết quả của Nam.",
    "4 × (3 + 5) = 4 × 8 = 32. Khi phân phối, số ngoài ngoặc nhân với từng số hạng: 4 × 3 + 4 × 5 = 12 + 20 = 32. Nam quên nhân 4 với 5.",
  ),
  fill(
    "sn-2",
    "Nhẩm: tách 12 = 10 + 2 rồi dùng tính chất phân phối.",
    ["25 × 12 = 25 × (10 + 2) = 25 × 10 + 25 × 2 =", { answer: 250 }, "+", { answer: 50 }, "=", { answer: 300 }],
    "25 × 10 là viết thêm một chữ số 0. 25 × 2 = 50.",
    "25 × 12 = 25 × 10 + 25 × 2 = 250 + 50 = 300.",
  ),
  fill(
    "sn-3",
    "Nhẩm: 99 = 100 − 1. Điền số thích hợp.",
    ["99 × 7 = (100 − 1) × 7 = 100 × 7 − 1 × 7 =", { answer: 700 }, "−", { answer: 7 }, "=", { answer: 693 }],
    "Nhân từng số với 7 rồi trừ: 100 × 7 là 700, 1 × 7 là 7.",
    "99 × 7 = (100 − 1) × 7 = 700 − 7 = 693.",
  ),
  choice(
    "sn-4",
    "Lan viết 5 × (2 × 3) = 5 × 2 × 5 × 3. Lan đúng hay sai?",
    ["Sai: 5 × (2 × 3) = 30 còn 5 × 2 × 5 × 3 = 150", "Đúng: cả hai đều bằng 30", "Đúng: cả hai đều bằng 150", "Sai: vế phải bằng 15"],
    0,
    "Tính từng vế xem có bằng nhau không.",
    "5 × (2 × 3) = 5 × 6 = 30, còn 5 × 2 × 5 × 3 = 10 × 15 = 150. Phân phối chỉ dùng khi trong ngoặc là phép cộng (hoặc trừ). Phép nhân trong ngoặc thì dùng tính chất kết hợp: 5 × (2 × 3) = (5 × 2) × 3 = 30.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 17 và 18)", questions: hoatDong },
  { id: "luyen-tap-cong", title: "Luyện tập: phép cộng (trang 18)", questions: luyenTapCong },
  { id: "luyen-tap-tru", title: "Luyện tập: phép trừ (trang 19)", questions: luyenTapTru },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
