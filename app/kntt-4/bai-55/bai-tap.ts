import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { createElement } from "react";
import { HaiBang } from "./_illustrations/bang-giay";

const f = (a: number, b: number) => `${a}/${b}`;

/** Số liệu các câu (đổi so với SGK). Test tính lại mọi đáp án từ các bảng này. */
export type Spec = { a: number; b: number; k: number };
/** a/b nhân cả tử và mẫu với k. */
export const nhanSpecs: Spec[] = [
  { a: 3, b: 4, k: 2 },
  { a: 5, b: 6, k: 3 },
  { a: 11, b: 25, k: 4 },
];
/** a/b chia cả tử và mẫu cho k (a và b đều chia hết cho k). */
export const chiaSpecs: Spec[] = [
  { a: 12, b: 18, k: 6 },
  { a: 15, b: 20, k: 5 },
  { a: 35, b: 56, k: 7 },
];
/** Ô hệ số: a/b = c/d, cùng một hệ số k ở tử và mẫu. */
export const heSoSpecs = [
  { a: 3, b: 5, c: 21, d: 35, k: 7, op: "×" },
  { a: 6, b: 7, c: 18, d: 21, k: 3, op: "×" },
  { a: 48, b: 56, c: 6, d: 7, k: 8, op: ":" },
] as const;
/** a/b = c/d, con tìm một thành phần còn thiếu. */
export const thieuSpecs: { a: number; b: number; c: number; d: number; missing: "c" | "d" }[] = [
  { a: 3, b: 4, c: 9, d: 12, missing: "c" },
  { a: 10, b: 15, c: 2, d: 3, missing: "d" },
  { a: 8, b: 20, c: 2, d: 5, missing: "c" },
  { a: 5, b: 9, c: 35, d: 63, missing: "d" },
];
export const noiPairs: [string, string][] = [
  [f(1, 2), f(5, 10)],
  [f(2, 3), f(12, 18)],
  [f(3, 5), f(12, 20)],
  [f(4, 7), f(8, 14)],
];
/** Hai băng giấy như nhau: [tô, tổng số phần] của băng trên và băng dưới. */
export const bangSpecs: { top: [number, number]; bottom: [number, number] }[] = [
  { top: [3, 4], bottom: [6, 8] },
  { top: [2, 5], bottom: [4, 10] },
  { top: [2, 3], bottom: [8, 12] },
];
export const thuongSpec = { a: 18, b: 6, nhan: 4, chia: 3 };
/** Câu che số: 3/4 = 6/A = B/20 = C/36. */
export const cheSpec = { a: 3, b: 4, tu1: 6, mau2: 20, mau3: 36 };
/** Một phân số viết thành chuỗi hai chiều: 12/16 = ?/4 = 9/?. */
export const cheHaiSpec = { a: 12, b: 16, mau: 4, tu: 6 };

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}

function fill(id: string, prompt: string, parts: Part[], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}

function words(id: string, prompt: string, lines: Part[][], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

const nhan = ({ a, b, k }: Spec, id: string): FillQuestion =>
  fill(
    id,
    "Số ?",
    [`${f(a, b)} = (${a} × ${k})/(${b} × ${k}) =`, { answer: a * k }, "/", { answer: b * k }],
    "Nhân cả tử số và mẫu số với cùng một số.",
    `${a} × ${k} = ${a * k} và ${b} × ${k} = ${b * k}. Vậy ${f(a, b)} = ${f(a * k, b * k)}.`,
  );

const chia = ({ a, b, k }: Spec, id: string): FillQuestion =>
  fill(
    id,
    "Số ?",
    [`${f(a, b)} = (${a} : ${k})/(${b} : ${k}) =`, { answer: a / k }, "/", { answer: b / k }],
    "Chia cả tử số và mẫu số cho cùng một số. Cả hai số đều chia hết cho số đó.",
    `${a} : ${k} = ${a / k} và ${b} : ${k} = ${b / k}. Vậy ${f(a, b)} = ${f(a / k, b / k)}.`,
  );

const heSo = (s: (typeof heSoSpecs)[number], id: string): FillQuestion => {
  const tuNhan = s.op === "×";
  const mid = tuNhan ? "nhân" : "chia";
  return fill(
    id,
    "Số ? (hai ô là cùng một số)",
    [`${f(s.a, s.b)} = (${s.a} ${s.op}`, { answer: s.k }, `)/(${s.b} ${s.op}`, { answer: s.k }, `) = ${f(s.c, s.d)}`],
    `Hỏi: ${s.a} ${tuNhan ? "nhân với" : "chia cho"} mấy thì được ${s.c}?`,
    `${s.a} ${s.op} ${s.k} = ${s.c} và ${s.b} ${s.op} ${s.k} = ${s.d}. Ta ${mid} cả tử số và mẫu số với cùng số ${s.k}.`,
  );
};

const thieu = (s: (typeof thieuSpecs)[number], id: string): FillQuestion => {
  const left = f(s.a, s.b);
  const blankIsTu = s.missing === "c";
  const answer = blankIsTu ? s.c : s.d;
  const known = blankIsTu ? s.d : s.c;
  const knownOf = blankIsTu ? s.b : s.a;
  const up = known > knownOf;
  return fill(
    id,
    "Số ?",
    blankIsTu ? [`${left} =`, { answer }, `/${s.d}`] : [`${left} = ${s.c}/`, { answer }],
    `Nhìn cặp số đã biết: ${knownOf} và ${known}. ${up ? "Nhân" : "Chia"} thế nào để từ ${knownOf} ra ${known}? Làm đúng như vậy với số kia.`,
    `${knownOf} ${up ? "×" : ":"} ${up ? known / knownOf : knownOf / known} = ${known}, nên ta cũng ${up ? "nhân" : "chia"} ${blankIsTu ? s.a : s.b} với ${up ? known / knownOf : knownOf / known}: được ${answer}. Vậy ${left} = ${f(s.c, s.d)}.`,
  );
};

const bang = (spec: (typeof bangSpecs)[number], id: string): FillQuestion =>
  fill(
    id,
    "Hai băng giấy như nhau, phần tô màu dài bằng nhau. Viết phân số chỉ phần tô màu của mỗi băng.",
    ["Băng trên:", { answer: spec.top[0] }, "/", { answer: spec.top[1] }, "; băng dưới:", { answer: spec.bottom[0] }, "/", { answer: spec.bottom[1] }],
    "Đếm số phần tô màu và đếm tất cả các phần của từng băng.",
    `Băng trên: ${f(spec.top[0], spec.top[1])}. Băng dưới: ${f(spec.bottom[0], spec.bottom[1])}. Hai phân số bằng nhau: ${f(spec.top[0], spec.top[1])} = ${f(spec.bottom[0], spec.bottom[1])}.`,
    createElement(HaiBang, { top: spec.top, bottom: spec.bottom }),
  );

const bang3 = bangSpecs[2];
const bangTo = fill(
  "bg-3",
  "Băng trên chia 3 phần bằng nhau, tô màu 2 phần. Băng dưới như băng trên, chia 12 phần bằng nhau. Phải tô màu mấy phần của băng dưới để phần tô hai băng bằng nhau?",
  ["Tô", { answer: bang3.bottom[0] }, "phần"],
  "Mỗi phần của băng trên được chia thành bao nhiêu phần nhỏ?",
  `12 : 3 = 4, mỗi phần của băng trên chia thành 4 phần nhỏ. Tô 2 × 4 = 8 phần. ${f(2, 3)} = ${f(8, 12)}.`,
  createElement(HaiBang, { top: bang3.top, bottom: [0, 12] }),
);

/** Khởi động: nhắc bảng nhân, bảng chia và đọc phân số. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-nhan", "6 × 4 =", ["6 × 4 =", { answer: 6 * 4 }], "Nhẩm bảng nhân 6.", "6 × 4 = 24."),
  fill("kd-chia", "35 : 5 =", ["35 : 5 =", { answer: 35 / 5 }], "Nhẩm bảng chia 5.", "35 : 5 = 7."),
  fill("kd-phan-so", "Băng giấy chia 5 phần bằng nhau, tô màu 3 phần. Phân số chỉ phần tô màu là", ["Phân số:", { answer: 3 }, "/", { answer: 5 }], "Tử số là số phần tô màu, mẫu số là số phần bằng nhau của cả băng.", "Tô 3 trong 5 phần bằng nhau, vậy là 3/5."),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  nhan: fill("thu-nhan", "Số ?", ["2/5 = (2 × 3)/(5 × 3) =", { answer: 6 }, "/", { answer: 15 }], "Nhân cả tử số và mẫu số với 3.", "2 × 3 = 6 và 5 × 3 = 15, vậy 2/5 = 6/15."),
  mot: choice("thu-mot", "Con nhân tử số của 2/3 với 2 nhưng giữ nguyên mẫu số, được 4/3. 4/3 có bằng 2/3 không?", ["Không bằng", "Bằng"], 0, "Có làm cùng một phép với cả tử số và mẫu số không?", "Mẫu số vẫn là 3, chưa nhân với 2. Phải nhân cả hai số thì mới được phân số bằng 2/3."),
  chia: fill("thu-chia", "Số ?", ["8/12 = (8 : 4)/(12 : 4) =", { answer: 2 }, "/", { answer: 3 }], "Chia cả tử số và mẫu số cho 4.", "8 : 4 = 2 và 12 : 4 = 3, vậy 8/12 = 2/3."),
  thuong: fill("thu-thuong", "Số ?", ["24 : 6 = 4. (24 : 2) : (6 : 2) = 12 : 3 =", { answer: 4 }], "Chia 12 cho 3.", "12 : 3 = 4. Thương không đổi."),
};

const nhanQs = nhanSpecs.map((s, i) => nhan(s, `nh-${i + 1}`));
const chiaQs = chiaSpecs.map((s, i) => chia(s, `ch-${i + 1}`));
const heSoQs = heSoSpecs.map((s, i) => heSo(s, `hs-${i + 1}`));
const thieuQs = thieuSpecs.map((s, i) => thieu(s, `tt-${i + 1}`));
const bangQs = [bang(bangSpecs[0], "bg-1"), bang(bangSpecs[1], "bg-2"), bangTo];

/** Câu "giảm/gấp lên lần": đáp án là phân số bằng phân số đã cho. */
export const lanSpecs = [
  { a: 8, b: 12, k: 4, op: "giảm", options: ["2/12", "8/3", "2/3", "3/2"], answer: 2 },
  { a: 2, b: 5, k: 3, op: "gấp", options: ["6/5", "2/15", "6/15", "15/6"], answer: 2 },
] as const;
const lanQs = lanSpecs.map((s, i) =>
  choice(
    `tn-${i + 1}`,
    `Cùng ${s.op} ${s.k} lần tử số và mẫu số của phân số ${f(s.a, s.b)}, ta được phân số nào bằng phân số đó?`,
    [...s.options],
    s.answer,
    `${s.op === "giảm" ? "Giảm" : "Gấp"} ${s.k} lần là ${s.op === "giảm" ? "chia" : "nhân"} cho ${s.k}. Làm với cả tử số và mẫu số.`,
    `${s.a} ${s.op === "giảm" ? ":" : "×"} ${s.k} = ${s.op === "giảm" ? s.a / s.k : s.a * s.k} và ${s.b} ${s.op === "giảm" ? ":" : "×"} ${s.k} = ${s.op === "giảm" ? s.b / s.k : s.b * s.k}. Đáp án ${s.options[s.answer]}.`,
  ),
);

const noiCap: MatchQuestion = {
  id: "noi-1",
  kind: "noi-cap",
  prompt: "Nối mỗi phân số với phân số bằng nó.",
  pairs: noiPairs.map(([left, right]) => ({ left, right })),
  rightOrder: [1, 2, 3, 0],
  hint: "Xem tử số mới gấp mấy lần tử số cũ, rồi xem mẫu số có gấp lên đúng bấy nhiêu lần không.",
  explanation: `${f(1, 2)} = ${f(5, 10)} (nhân 5), ${f(2, 3)} = ${f(12, 18)} (nhân 6), ${f(3, 5)} = ${f(12, 20)} (nhân 4), ${f(4, 7)} = ${f(8, 14)} (nhân 2).`,
};

const thuongQ = words(
  "th-1",
  "Số ? (a = 18, b = 6)",
  [
    ["a : b = 18 : 6 =", { answer: thuongSpec.a / thuongSpec.b }],
    [`(a × ${thuongSpec.nhan}) : (b × ${thuongSpec.nhan}) = ${thuongSpec.a * thuongSpec.nhan} : ${thuongSpec.b * thuongSpec.nhan} =`, { answer: (thuongSpec.a * thuongSpec.nhan) / (thuongSpec.b * thuongSpec.nhan) }],
    [`(a : ${thuongSpec.chia}) : (b : ${thuongSpec.chia}) = ${thuongSpec.a / thuongSpec.chia} : ${thuongSpec.b / thuongSpec.chia} =`, { answer: thuongSpec.a / thuongSpec.chia / (thuongSpec.b / thuongSpec.chia) }],
  ],
  "Tính từng phép chia. Con có nhận ra điều gì về ba kết quả?",
  "18 : 6 = 3; 72 : 24 = 3; 6 : 2 = 3. Nhân (chia) số bị chia và số chia với (cho) cùng một số tự nhiên khác 0 thì thương không thay đổi.",
);

export const soSanhRows = [
  { left: "20 : 5", right: "(20 × 3) : (5 × 3)" },
  { left: "20 : 5", right: "(20 : 5) : (5 : 5)" },
  { left: "36 : 9", right: "(36 : 3) : (9 : 3)" },
];
const soSanhQ: Question = {
  id: "th-2",
  kind: "so-sanh",
  prompt: "Chọn >, <, = cho mỗi chỗ trống.",
  rows: soSanhRows.map((r) => ({ ...r, answer: "=" as const })),
  hint: "Tính từng vế rồi so sánh. Nhớ: nhân (chia) cả số bị chia và số chia với (cho) cùng một số thì thương không đổi.",
  explanation: "20 : 5 = 4 và 60 : 15 = 4; 20 : 5 = 4 và 4 : 1 = 4; 36 : 9 = 4 và 12 : 3 = 4. Các thương bằng nhau nên điền dấu =.",
};

const cheQ = words(
  "ck-1",
  "Các số bị che lấp: số thứ nhất, số thứ hai, số thứ ba, rồi cộng ba số lại.",
  [
    [`3/4 = 6/`, { answer: cheSpec.b * (cheSpec.tu1 / cheSpec.a) }, "(số thứ nhất)"],
    [`3/4 =`, { answer: cheSpec.a * (cheSpec.mau2 / cheSpec.b) }, `/${cheSpec.mau2} (số thứ hai)`],
    [`3/4 =`, { answer: cheSpec.a * (cheSpec.mau3 / cheSpec.b) }, `/${cheSpec.mau3} (số thứ ba)`],
    ["Tổng ba số bị che lấp:", { answer: cheSpec.b * (cheSpec.tu1 / cheSpec.a) + cheSpec.a * (cheSpec.mau2 / cheSpec.b) + cheSpec.a * (cheSpec.mau3 / cheSpec.b) }],
  ],
  "Với mỗi phân số, xem số đã biết nhân (chia) với mấy, rồi làm đúng vậy với số còn lại. Cộng đủ cả ba số bị che, đừng cộng thêm số khác.",
  "3/4 = 6/8; 3/4 = 15/20; 3/4 = 27/36. Ba số bị che là 8, 15, 27: 8 + 15 + 27 = 50.",
);

const cheHaiQ = words(
  "ck-2",
  "Số ?",
  [
    [`${cheHaiSpec.a}/${cheHaiSpec.b} =`, { answer: (cheHaiSpec.a * cheHaiSpec.mau) / cheHaiSpec.b }, `/${cheHaiSpec.mau}`],
    [`${cheHaiSpec.a}/${cheHaiSpec.b} = ${cheHaiSpec.tu}/`, { answer: (cheHaiSpec.b * cheHaiSpec.tu) / cheHaiSpec.a }],
  ],
  "Câu đầu: 16 chia cho mấy thì được 4? Làm đúng vậy với 12. Câu hai: 12 chia cho mấy thì được 6? Mẫu số 16 cũng làm vậy.",
  "16 : 4 = 4 và 12 : 4 = 3, vậy 12/16 = 3/4. 12 : 2 = 6 và 16 : 2 = 8, vậy 12/16 = 6/8.",
);

const sn: Question[] = [
  choice("sn-1", "Nam viết 2/3 = 4/5 vì cùng cộng thêm 2 vào tử số và mẫu số. Nam sai ở đâu?", ["Phải nhân (hoặc chia) cả tử số và mẫu số với (cho) cùng một số, không phải cộng", "Phải chỉ nhân tử số", "Nam không sai"], 0, "Thử so hai băng giấy: tô 2/3 và 4/5.", "Cộng cùng một số vào tử số và mẫu số không cho phân số bằng nó. 2/3 = 4/6 (nhân 2), không phải 4/5."),
  choice("sn-2", "Chia mỗi phần của băng giấy thành 2 phần nhỏ bằng nhau thì số phần tô màu và tổng số phần đều gấp đôi. Vì sao phần tô màu vẫn không đổi?", ["Vì mỗi phần nhỏ chỉ bằng một nửa phần cũ", "Vì băng giấy dài ra", "Vì ta tô thêm màu"], 0, "Nhìn hình hai băng giấy: có thêm giấy hay thêm màu không?", "Ta chỉ chia nhỏ phần cũ ra, không thêm giấy và không tô thêm. Nhiều phần hơn nhưng mỗi phần nhỏ hơn, phần tô màu vẫn dài như cũ."),
  fill("sn-3", "Số ? (một phân số, nhiều cách viết)", ["1/2 =", { answer: 2 }, "/4 =", { answer: 3 }, "/6 =", { answer: 4 }, "/8"], "Nhân cả tử số và mẫu số với 2, 3, 4.", "1/2 = 2/4 = 3/6 = 4/8: nhân với 2, 3, 4."),
  choice("sn-4", "Có thể chia cả tử số và mẫu số của 7/9 cho 2 để được phân số bằng 7/9 không?", ["Được, ta được 3/4", "Không được, vì 7 và 9 không chia hết cho 2", "Được, ta được 8/10"], 1, "Chia hết là chia mà không còn dư. 7 : 2 có dư không?", "7 : 2 và 9 : 2 đều có dư, nên không chia hết cho 2. Còn 3/4 và 8/10 đều không bằng 7/9."),
  choice("sn-5", "3/5 và 12/20 có tử số và mẫu số đều khác nhau. Hai phân số này có bằng nhau không?", ["Bằng nhau", "Không bằng nhau"], 0, "Xem 12/20 chia cả tử số và mẫu số cho 4 được gì.", "12 : 4 = 3 và 20 : 4 = 5, nên 12/20 = 3/5. Phân số bằng nhau có thể có tử số và mẫu số khác nhau."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "nhan", title: "Nhân cả tử số và mẫu số", questions: nhanQs },
  { id: "chia", title: "Chia cả tử số và mẫu số", questions: chiaQs },
  { id: "he-so", title: "Tìm số nhân hoặc số chia", questions: heSoQs },
  { id: "lan", title: "Gấp, giảm một số lần", questions: lanQs },
  { id: "thieu", title: "Tìm số còn thiếu", questions: [...thieuQs, noiCap] },
  { id: "bang", title: "Hai băng giấy", questions: bangQs },
  { id: "thuong", title: "Thương không đổi", questions: [thuongQ, soSanhQ] },
  { id: "che", title: "Số bị che lấp", questions: [cheQ, cheHaiQ] },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: sn },
];
