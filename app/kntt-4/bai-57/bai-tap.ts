import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";

const f = (a: number, b: number) => `${a}/${b}`;

/** Hai phân số a/b và c/d, mẫu số lớn d chia hết cho mẫu số bé b. Test tính lại mọi đáp án từ các bảng này. */
export type Cap = { a: number; b: number; c: number; d: number };

/** Khám phá và Hoạt động 1: hệ số d : b cho sẵn trong đề. */
export const hd1Specs: Cap[] = [
  { a: 3, b: 5, c: 7, d: 10 },
  { a: 5, b: 8, c: 13, d: 40 },
  { a: 4, b: 9, c: 11, d: 27 },
];
/** Hoạt động 2: tìm hai phân số lần lượt bằng a/b, c/d và có mẫu số chung m. */
export const timHaiSpecs = [
  { a: 3, b: 4, c: 5, d: 6, m: 12 },
  { a: 2, b: 5, c: 3, d: 10, m: 20 },
];
/** Luyện tập 1: con tự tìm d : b. */
export const lt1Specs: Cap[] = [
  { a: 7, b: 10, c: 31, d: 50 },
  { a: 4, b: 15, c: 11, d: 45 },
  { a: 5, b: 7, c: 23, d: 70 },
];
/** Luyện tập 2: rút gọn rồi quy đồng. */
export const lt2Specs: Cap[] = [
  { a: 6, b: 9, c: 5, d: 18 },
  { a: 12, b: 30, c: 14, d: 20 },
  { a: 3, b: 36, c: 8, d: 12 },
];
/** Luyện tập 3: ba phân số, mẫu số chung m chia hết cho cả ba mẫu số. */
export const lt3Specs = [
  { fr: [[1, 4], [5, 8], [13, 24]], m: 24 },
  { fr: [[2, 5], [3, 10], [17, 20]], m: 20 },
] as const;
/** Luyện tập 4: phân số nào có mẫu số là m và bằng a/b. */
export const lt4Specs = [
  { a: 2, b: 9, m: 72, options: ["18/72", "4/18", "16/72", "14/72"], answer: 2 },
  { a: 7, b: 12, m: 60, options: ["35/60", "42/60", "14/60", "7/12"], answer: 0 },
] as const;
/** Suy nghĩ thêm. */
export const quenSpec = { a: 1, b: 4, c: 3, d: 8 };
export const khacSpec = { a: 2, b: 3, c: 5, d: 6 };
export const baSpec = { fr: [[1, 2], [1, 4], [1, 8]], m: 8 } as const;

const fill = (id: string, prompt: string, parts: Part[], hint: string, explanation: string): FillQuestion => ({ id, kind: "dien-so", prompt, parts, hint, explanation });
const words = (id: string, prompt: string, lines: Part[][], hint: string, explanation: string): WordQuestion => ({ id, kind: "loi-van", prompt, lines, hint, explanation });
const choice = (id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion => ({ id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation });

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
/** Rút gọn như SGK: chia cả tử số và mẫu số cho số lớn nhất mà cả hai cùng chia hết. */
export const rutGon = (a: number, b: number): [number, number] => {
  const g = gcd(a, b);
  return [a / g, b / g];
};

/** Hoạt động 1: hệ số hiện sẵn trong đề (theo mẫu SGK). */
const hd1 = ({ a, b, c, d }: Cap, id: string) => {
  const k = d / b;
  return fill(
    id,
    `Quy đồng mẫu số hai phân số ${f(a, b)} và ${f(c, d)}. Mẫu số chung là ${d}.`,
    [`${f(a, b)} = (${a} × ${k})/(${b} × ${k}) =`, { answer: a * k }, "/", { answer: d }, `. Giữ nguyên ${f(c, d)}.`],
    `${d} : ${b} = ${k}. Nhân cả tử số và mẫu số của ${f(a, b)} với ${k}.`,
    `${d} : ${b} = ${k}, nên ${f(a, b)} = ${f(a * k, d)}. Hai phân số là ${f(a * k, d)} và ${f(c, d)}, cùng mẫu số ${d}.`,
  );
};

const timHai = ({ a, b, c, d, m }: (typeof timHaiSpecs)[number], id: string) =>
  words(
    id,
    `Tìm hai phân số lần lượt bằng ${f(a, b)}; ${f(c, d)} và có mẫu số chung là ${m}.`,
    [
      [`${f(a, b)} =`, { answer: (a * m) / b }, `/${m}`],
      [`${f(c, d)} =`, { answer: (c * m) / d }, `/${m}`],
    ],
    `${m} : ${b} = ? và ${m} : ${d} = ?. Nhân cả tử số và mẫu số với số đó.`,
    `${m} : ${b} = ${m / b} nên ${f(a, b)} = ${f(a * (m / b), m)}. ${m} : ${d} = ${m / d} nên ${f(c, d)} = ${f(c * (m / d), m)}.`,
  );

/** Luyện tập 1: con tự tìm hệ số. */
const lt1 = ({ a, b, c, d }: Cap, id: string) => {
  const k = d / b;
  return words(
    id,
    `Quy đồng mẫu số hai phân số ${f(a, b)} và ${f(c, d)}.`,
    [
      [`${d} : ${b} =`, { answer: k }],
      [`${f(a, b)} = (${a} × ${k})/(${b} × ${k}) =`, { answer: a * k }, "/", { answer: d }, `. Giữ nguyên ${f(c, d)}.`],
    ],
    `Mẫu số lớn chia hết cho mẫu số bé. Lấy ${d} : ${b} để biết nhân với số nào.`,
    `${d} : ${b} = ${k}. ${a} × ${k} = ${a * k}, ${b} × ${k} = ${d}. Ta được ${f(a * k, d)} và ${f(c, d)}.`,
  );
};

/** Luyện tập 2: rút gọn rồi quy đồng. Mẫu số chung là mẫu số lớn hơn sau khi rút gọn. */
export const lt2Answer = ({ a, b, c, d }: Cap) => {
  const [a1, b1] = rutGon(a, b);
  const [c1, d1] = rutGon(c, d);
  const m = Math.max(b1, d1);
  return { a1, b1, c1, d1, m, tu1: (a1 * m) / b1, tu2: (c1 * m) / d1 };
};
const lt2 = (spec: Cap, id: string) => {
  const { a, b, c, d } = spec;
  const r = lt2Answer(spec);
  return words(
    id,
    `Rút gọn rồi quy đồng mẫu số hai phân số ${f(a, b)} và ${f(c, d)}.`,
    [
      [`${f(a, b)} =`, { answer: r.a1 }, "/", { answer: r.b1 }, `; ${f(c, d)} =`, { answer: r.c1 }, "/", { answer: r.d1 }],
      ["Quy đồng mẫu số, ta được", { answer: r.tu1 }, "/", { answer: r.m }, "và", { answer: r.tu2 }, "/", { answer: r.m }],
    ],
    "Rút gọn từng phân số trước, rồi mới quy đồng. Chia cả tử số và mẫu số cho cùng một số.",
    `${f(a, b)} = ${f(r.a1, r.b1)} và ${f(c, d)} = ${f(r.c1, r.d1)}. Mẫu số chung là ${r.m}: ${f(r.a1, r.b1)} = ${f(r.tu1, r.m)}, ${f(r.c1, r.d1)} = ${f(r.tu2, r.m)}.`,
  );
};

/** Luyện tập 3: quy đồng ba phân số. */
const lt3 = ({ fr, m }: (typeof lt3Specs)[number], id: string) =>
  words(
    id,
    `Quy đồng mẫu số ba phân số ${fr.map(([x, y]) => f(x, y)).join("; ")}.`,
    [
      ["Mẫu số chung là", { answer: m }],
      ...fr.map(([x, y]): Part[] => [`${f(x, y)} =`, { answer: (x * m) / y }, `/${m}`]),
    ],
    `Chọn mẫu số lớn nhất, kiểm tra nó chia hết cho hai mẫu số còn lại. Với mỗi phân số, tính ${m} chia mẫu số rồi nhân cả tử số và mẫu số.`,
    fr.map(([x, y]) => `${m} : ${y} = ${m / y}, nên ${f(x, y)} = ${f((x * m) / y, m)}`).join("; ") + ".",
  );

const lt4 = (s: (typeof lt4Specs)[number], id: string) =>
  choice(
    id,
    `Phân số nào sau đây có mẫu số là ${s.m} và bằng ${f(s.a, s.b)}?`,
    [...s.options],
    s.answer,
    `${s.m} : ${s.b} = ? Rồi nhân cả tử số và mẫu số của ${f(s.a, s.b)} với số đó.`,
    `${s.m} : ${s.b} = ${s.m / s.b}, ${s.a} × ${s.m / s.b} = ${s.a * (s.m / s.b)}. Vậy ${f(s.a, s.b)} = ${s.options[s.answer]}.`,
  );

/** Khởi động: nhắc bảng nhân, bảng chia và tính chất cơ bản (Bài 55). Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-nhan", "4 × 3 =", ["4 × 3 =", { answer: 4 * 3 }], "Nhẩm bảng nhân 4.", "4 × 3 = 12."),
  fill("kd-chia", "12 : 4 =", ["12 : 4 =", { answer: 12 / 4 }], "Nhẩm bảng chia 4.", "12 : 4 = 3."),
  fill("kd-tcb", "3/4 = (3 × 2)/(4 × 2) =", ["3/4 = (3 × 2)/(4 × 2) =", { answer: 6 }, "/", { answer: 8 }], "Nhân cả tử số và mẫu số với 2.", "3 × 2 = 6 và 4 × 2 = 8, vậy 3/4 = 6/8."),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  quy: fill("thu-quy", "Quy đồng mẫu số 2/5 và 7/10. Số ?", ["2/5 = (2 × 2)/(5 × 2) =", { answer: 4 }, "/", { answer: 10 }], "10 : 5 = 2. Nhân cả tử số và mẫu số của 2/5 với 2.", "10 : 5 = 2, nên 2/5 = 4/10. Hai phân số là 4/10 và 7/10."),
  quen: choice("thu-quen", "Con nhân tử số của 1/4 với 2 nhưng giữ nguyên mẫu số, được 2/4. 2/4 có bằng 1/4 không?", ["Không bằng", "Bằng"], 0, "Có nhân cả tử số và mẫu số không?", "Mẫu số vẫn là 4, chưa nhân với 2. Phải nhân cả hai số: 1/4 = 2/8."),
  mauChung: choice("thu-mau-chung", "Quy đồng 1/3 và 5/9. Mẫu số chung là số nào?", ["9", "3", "27"], 0, "Mẫu số lớn có chia hết cho mẫu số bé không?", "9 : 3 = 3, nên giữ phân số 5/9 và đổi 1/3 = 3/9. Mẫu số chung là 9."),
};

/** Suy nghĩ thêm (vượt SGK: tìm lỗi, nhiều tử số chia hết). */
const sn: Question[] = [
  choice("sn-1", "Nam quy đồng 1/4 và 3/8 như sau: 1/4 = (1 × 2)/4 = 2/4. Nam sai ở đâu?", ["Chỉ nhân tử số, chưa nhân mẫu số", "Nhân với 2 là sai, phải nhân với 4", "Nam không sai"], 0, "Muốn được phân số bằng 1/4 thì phải làm gì với mẫu số?", "Phải nhân cả tử số và mẫu số với 2: 1/4 = (1 × 2)/(4 × 2) = 2/8. Khi đó 2/8 và 3/8 cùng mẫu số 8."),
  choice("sn-2", "Mai viết 2/3 = (2 × 4)/(3 × 5) = 8/15 để quy đồng. Mai sai ở đâu?", ["Nhân tử số và mẫu số với hai số khác nhau", "Phải cộng chứ không nhân", "Mai không sai"], 0, "Hai số nhân phải như thế nào?", "Phải nhân cả tử số và mẫu số với cùng một số. 2/3 = (2 × 4)/(3 × 4) = 8/12."),
  choice("sn-3", "Có thể đổi 5/12 thành phân số có mẫu số 4 bằng cách chia cả tử số và mẫu số cho 3 không?", ["Không, vì 5 không chia hết cho 3", "Được, ta được 5/4", "Được, ta được 2/4"], 0, "Chia hết là chia mà không còn dư. 5 : 3 có dư không?", "12 : 3 = 4 nhưng 5 : 3 có dư. Vì vậy ta quy đồng bằng cách nhân phân số có mẫu bé: 3/4 = 9/12."),
  fill("sn-4", "Quy đồng 1/2; 1/4; 1/8 với mẫu số chung 8. Tổng ba tử số mới là bao nhiêu?", ["Tổng:", { answer: baSpec.fr.reduce((s, [x, y]) => s + (x * baSpec.m) / y, 0) }], "Tìm từng tử số mới: 8 : 2 = 4, 8 : 4 = 2, 8 : 8 = 1. Rồi cộng ba tử số.", "1/2 = 4/8, 1/4 = 2/8, 1/8 giữ nguyên. Tử số: 4 + 2 + 1 = 7."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong-1", title: "Quy đồng hai phân số (có hệ số)", questions: hd1Specs.map((s, i) => hd1(s, `hd-${i + 1}`)) },
  { id: "hoat-dong-2", title: "Tìm hai phân số có mẫu số chung", questions: timHaiSpecs.map((s, i) => timHai(s, `th-${i + 1}`)) },
  { id: "lt-1", title: "Luyện tập: tự tìm hệ số", questions: lt1Specs.map((s, i) => lt1(s, `l1-${i + 1}`)) },
  { id: "lt-2", title: "Luyện tập: rút gọn rồi quy đồng", questions: lt2Specs.map((s, i) => lt2(s, `l2-${i + 1}`)) },
  { id: "lt-3", title: "Luyện tập: ba phân số", questions: lt3Specs.map((s, i) => lt3(s, `l3-${i + 1}`)) },
  { id: "lt-4", title: "Luyện tập: chọn câu trả lời đúng", questions: lt4Specs.map((s, i) => lt4(s, `l4-${i + 1}`)) },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: sn },
];
