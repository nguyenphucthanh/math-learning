import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Part, Question } from "@/components/exercises/types";

const f = (a: number, b: number) => `${a}/${b}`;
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

/** Số liệu các câu (đổi so với SGK). Test tính lại mọi đáp án bằng gcd. */
export type Frac = { a: number; b: number };
/** Hoạt động 1a: tối giản hay chưa. */
export const toiGianSpecs: Frac[] = [
  { a: 3, b: 8 },
  { a: 14, b: 35 },
  { a: 7, b: 19 },
  { a: 1, b: 12 },
  { a: 12, b: 18 },
  { a: 9, b: 16 },
];
/** Hoạt động 1b: rút gọn một bước, chia cho k = số chung (ở đây cũng là ước chung lớn nhất). */
export const motBuocSpecs: (Frac & { k: number })[] = [
  { a: 14, b: 35, k: 7 },
  { a: 12, b: 18, k: 6 },
  { a: 21, b: 28, k: 7 },
];
/** Hoạt động 2: bông hoa nối lọ hoa. */
export const hoaLoPairs: [Frac, Frac][] = [
  [{ a: 6, b: 9 }, { a: 2, b: 3 }],
  [{ a: 15, b: 20 }, { a: 3, b: 4 }],
  [{ a: 10, b: 25 }, { a: 2, b: 5 }],
  [{ a: 14, b: 16 }, { a: 7, b: 8 }],
];
/** Luyện tập 1a: 20/30 = 10/? = ?/3. */
export const soSpec = { a: 20, b: 30, tuMid: 10, mauEnd: 3 };
/** Luyện tập 1b: rút gọn đến phân số tối giản. */
export const rutGonSpecs: Frac[] = [
  { a: 18, b: 48 },
  { a: 60, b: 100 },
  { a: 30, b: 125 },
];
/** Luyện tập 2: trắc nghiệm, đáp án là phân số tối giản; chọn ra ở vị trí `answer`. */
export const tracNghiemSpecs: { a: number; b: number; options: string[]; answer: number }[] = [
  { a: 36, b: 60, options: ["18/30", "12/20", "4/5", "3/5"], answer: 3 },
  { a: 48, b: 72, options: ["2/3", "24/36", "3/4", "16/24"], answer: 0 },
];
/** Luyện tập 3: rút gọn tích; thừa số cả hai bên bị bỏ. Mẫu số còn lại ở cuối. */
export const tichSpecs: { top: number[]; bottom: number[] }[] = [
  { top: [8, 13, 17], bottom: [17, 15, 13] },
  { top: [23, 6, 29], bottom: [6, 29, 31] },
];
/** Luyện tập 4: ba phần chia, hai phần bằng nhau. */
export const chiaSpec = { items: [{ ten: "An", a: 6, b: 9 }, { ten: "Bình", a: 4, b: 6 }, { ten: "Chi", a: 3, b: 8 }] };

const prod = (xs: number[]) => xs.reduce((p, x) => p * x, 1);
const times = (xs: number[]) => xs.join(" × ");

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function fill(id: string, prompt: string, parts: Part[], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}

/** Khởi động: nhắc tính chất cơ bản (Bài 55) và chia hết. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-bai55", "Số ?", ["2/3 = (2 × 2)/(3 × 2) =", { answer: 4 }, "/", { answer: 6 }], "Nhân cả tử số và mẫu số với 2.", "2 × 2 = 4 và 3 × 2 = 6, vậy 2/3 = 4/6."),
  fill("kd-chia", "Số ?", ["12/20 = (12 : 4)/(20 : 4) =", { answer: 3 }, "/", { answer: 5 }], "Chia cả tử số và mẫu số cho 4.", "12 : 4 = 3 và 20 : 4 = 5, vậy 12/20 = 3/5."),
  choice("kd-chung", "15 và 25 cùng chia hết cho số nào?", ["2", "3", "5", "10"], 2, "Thử từng số: 15 : 2 có dư không?", "15 : 5 = 3 và 25 : 5 = 5, chia hết cả hai. 15 không chia hết cho 2 và 10, 25 không chia hết cho 3."),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  toiGian: choice("thu-toi-gian", "Phân số nào là phân số tối giản?", ["6/9", "5/8", "10/15"], 1, "Tìm số lớn hơn 1 mà cả tử số và mẫu số cùng chia hết.", "6 và 9 cùng chia hết cho 3; 10 và 15 cùng chia hết cho 5. 5 và 8 không cùng chia hết cho số nào lớn hơn 1."),
  rutGon: fill("thu-rut-gon", "Số ?", ["18/27 = (18 : 9)/(27 : 9) =", { answer: 2 }, "/", { answer: 3 }], "Chia cả tử số và mẫu số cho 9.", "18 : 9 = 2 và 27 : 9 = 3, vậy 18/27 = 2/3."),
  dung: choice("thu-dung", "Con rút gọn 12/30 được 6/15. Con dừng ở đây được chưa?", ["Được rồi", "Chưa, 6 và 15 còn cùng chia hết cho 3"], 1, "6/15 đã là phân số tối giản chưa?", "6 : 3 = 2 và 15 : 3 = 5, còn rút gọn tiếp được 2/5. Phải rút gọn đến phân số tối giản."),
  tich: fill("thu-tich", "Số ?", ["(3 × 5 × 7)/(5 × 7 × 8) =", { answer: 3 }, "/", { answer: 8 }], "Cùng bỏ 5 và 7 ở trên và ở dưới.", "Tích trên và tích dưới cùng chia cho 5, rồi cùng chia cho 7, còn lại 3/8."),
};

const toiGianQs = toiGianSpecs.map(({ a, b }, i) => {
  const tg = gcd(a, b) === 1;
  return choice(
    `tg-${i + 1}`,
    `Phân số ${f(a, b)} là`,
    ["Phân số tối giản", "Phân số chưa tối giản"],
    tg ? 0 : 1,
    "Có số tự nhiên nào lớn hơn 1 mà cả tử số và mẫu số cùng chia hết không?",
    tg ? `${a} và ${b} không cùng chia hết cho số tự nhiên nào lớn hơn 1, nên ${f(a, b)} là phân số tối giản.` : `${a} và ${b} cùng chia hết cho ${gcd(a, b)}, nên ${f(a, b)} chưa tối giản.`,
  );
});

const motBuocQs = motBuocSpecs.map(({ a, b, k }, i) =>
  fill(
    `mb-${i + 1}`,
    "Rút gọn (theo mẫu)",
    [`${f(a, b)} = (${a} : ${k})/(${b} : ${k}) =`, { answer: a / k }, "/", { answer: b / k }],
    `Chia cả tử số và mẫu số cho ${k}.`,
    `${a} : ${k} = ${a / k} và ${b} : ${k} = ${b / k}. Vậy ${f(a, b)} = ${f(a / k, b / k)}.`,
  ),
);

const hoaLo: MatchQuestion = {
  id: "hl-1",
  kind: "noi-cap",
  prompt: "Rút gọn phân số ở bông hoa, rồi nối với lọ hoa ghi phân số đó.",
  pairs: hoaLoPairs.map(([l, r]) => ({ left: f(l.a, l.b), right: f(r.a, r.b) })),
  rightOrder: [1, 2, 3, 0],
  hint: "Rút gọn từng phân số ở bông hoa đến phân số tối giản.",
  explanation: hoaLoPairs.map(([l, r]) => `${f(l.a, l.b)} = ${f(r.a, r.b)}`).join("; ") + ".",
};

const soQ = fill(
  "so-1",
  "Số ?",
  [`${f(soSpec.a, soSpec.b)} = ${soSpec.tuMid}/`, { answer: soSpec.b / (soSpec.a / soSpec.tuMid) }, "=", { answer: soSpec.a / gcd(soSpec.a, soSpec.b) }, `/${soSpec.mauEnd}`],
  `Ô thứ nhất: ${soSpec.a} chia cho mấy thì được ${soSpec.tuMid}? Mẫu số cũng chia cho số đó. Ô thứ hai: ${soSpec.b} chia cho mấy thì được ${soSpec.mauEnd}?`,
  `${soSpec.a} : ${soSpec.a / soSpec.tuMid} = ${soSpec.tuMid} nên ${soSpec.b} : ${soSpec.a / soSpec.tuMid} = ${soSpec.b / (soSpec.a / soSpec.tuMid)}. ${soSpec.b} : ${soSpec.b / soSpec.mauEnd} = ${soSpec.mauEnd} nên ${soSpec.a} : ${soSpec.b / soSpec.mauEnd} = ${soSpec.a / (soSpec.b / soSpec.mauEnd)}.`,
);

const rutGonQs = rutGonSpecs.map(({ a, b }, i) => {
  const g = gcd(a, b);
  return fill(
    `rg-${i + 1}`,
    "Rút gọn đến phân số tối giản",
    [`${f(a, b)} =`, { answer: a / g }, "/", { answer: b / g }],
    "Chia cả tử số và mẫu số cho một số chung. Rồi xem phân số mới đã tối giản chưa, chưa thì chia tiếp.",
    `${a} : ${g} = ${a / g} và ${b} : ${g} = ${b / g}. Vậy ${f(a, b)} = ${f(a / g, b / g)}, là phân số tối giản. (Con có thể chia nhiều bước, kết quả cuối vẫn vậy.)`,
  );
});

const tracNghiemQs = tracNghiemSpecs.map(({ a, b, options, answer }, i) =>
  choice(
    `tn-${i + 1}`,
    `Rút gọn phân số ${f(a, b)} được phân số tối giản là`,
    options,
    answer,
    "Phân số tối giản là phân số không còn rút gọn được nữa.",
    `${f(a, b)} = ${options[answer]}, và ${options[answer]} là phân số tối giản. Các phân số còn lại bằng ${f(a, b)} nhưng còn rút gọn được, hoặc không bằng ${f(a, b)}.`,
  ),
);

const tichQs = tichSpecs.map(({ top, bottom }, i) => {
  const g = gcd(prod(top), prod(bottom));
  return fill(
    `ti-${i + 1}`,
    "Tính (theo mẫu: cùng chia tích trên và tích dưới cho các thừa số giống nhau)",
    [`(${times(top)})/(${times(bottom)}) =`, { answer: prod(top) / g }, "/", { answer: prod(bottom) / g }],
    "Tìm hai số giống nhau ở trên và ở dưới, cùng bỏ đi.",
    `Cùng bỏ các thừa số giống nhau ở trên và ở dưới, còn lại ${f(prod(top) / g, prod(bottom) / g)}.`,
  );
});

const chiaQ = choice(
  "bt-1",
  `Mẹ chia một rổ cam cho ba bạn: ${chiaSpec.items.map((x) => `${x.ten} được ${f(x.a, x.b)} rổ`).join(", ")}. Hai bạn nào được chia cho số phần rổ cam bằng nhau?`,
  ["An và Bình", "An và Chi", "Bình và Chi"],
  0,
  "Rút gọn từng phân số đến phân số tối giản rồi so sánh.",
  "6/9 = 2/3, 4/6 = 2/3 và 3/8 đã tối giản. Vậy An và Bình được chia số phần bằng nhau.",
);

const sn: Question[] = [
  choice("sn-1", "Con rút gọn 48/60 được 24/30. Con đã làm xong chưa?", ["Rồi, vì 24 và 30 bé hơn 48 và 60", "Chưa, vì 24 và 30 còn cùng chia hết cho 2 (và 3, 6)"], 1, "Phải rút gọn đến phân số tối giản. 24/30 đã tối giản chưa?", "24 : 6 = 4 và 30 : 6 = 5, nên 48/60 = 4/5. Chỉ dừng khi hai số không còn cùng chia hết cho số nào lớn hơn 1."),
  choice("sn-2", "Phân số 1/9 có phải là phân số tối giản không?", ["Có", "Không, vì 1 chia hết cho 1"], 0, "Chỉ xét các số tự nhiên lớn hơn 1.", "1 chỉ chia hết cho 1, mà 1 không lớn hơn 1. Không có số tự nhiên nào lớn hơn 1 chia hết cả 1 và 9, nên 1/9 tối giản."),
  fill("sn-3", "Rút gọn đến phân số tối giản", ["7/14 =", { answer: 1 }, "/", { answer: 2 }], "7 chia cho 7 bằng mấy?", "7 : 7 = 1 và 14 : 7 = 2. Tử số là 1, không phải 0."),
  choice("sn-4", "Nam rút gọn (2 + 5)/(2 + 7) bằng cách bỏ hai số 2, được 5/7. Nam đúng hay sai?", ["Đúng", "Sai, vì ở đây là phép cộng, không được bỏ số 2"], 1, "Tính (2 + 5) và (2 + 7) trước.", "(2 + 5)/(2 + 7) = 7/9, và 7/9 đã tối giản. Chỉ được cùng bỏ thừa số giống nhau khi trên và dưới là tích (phép nhân), như (3 × 5)/(5 × 8). (Vượt SGK: nhắc để con không nhầm.)"),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "toi-gian", title: "Phân số tối giản", questions: toiGianQs },
  { id: "mot-buoc", title: "Rút gọn theo mẫu", questions: [...motBuocQs, hoaLo] },
  { id: "luyen-tap-1", title: "Rút gọn đến phân số tối giản", questions: [soQ, ...rutGonQs, ...tracNghiemQs] },
  { id: "tich", title: "Rút gọn tích", questions: tichQs },
  { id: "bai-toan", title: "Bài toán", questions: [chiaQ] },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: sn },
];

