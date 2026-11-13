import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { HinhPhanSo } from "@/components/math/phan-so";
import { createElement } from "react";

/** Phân số [tử số, mẫu số]. Phép trừ luôn có số bị trừ lớn hơn hoặc bằng số trừ (SGK chưa dạy kết quả âm). */
export type F = [number, number];
export type Sub = { a: F; b: F };

const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const lcm = (x: number, y: number) => (x / gcd(x, y)) * y;
const lowest = ([t, m]: F): F => [t / gcd(t, m), m / gcd(t, m)];
const text = ([t, m]: F) => `${t}/${m}`;
const over = (a: F, b: F, sign: 1 | -1): F => {
  const l = lcm(a[1], b[1]);
  return lowest([(a[0] * l) / a[1] + (sign * b[0] * l) / b[1], l]);
};
export const sub = (a: F, b: F) => over(a, b, -1);
export const add = (a: F, b: F) => over(a, b, 1);

/** Số liệu các câu (đổi so với SGK). Test tính lại đáp án bằng phép nhân chéo, không so với số gõ tay. */
export const cungMauSpecs: Sub[] = [
  { a: [8, 13], b: [3, 13] },
  { a: [11, 6], b: [4, 6] },
  { a: [27, 16], b: [8, 16] },
];
export const hinhSpecs = [
  { kieu: "tron", mau: 7, to: 5, bot: 2 },
  { kieu: "bang", mau: 8, to: 6, bot: 3, cot: 4 },
] as const;
export const banhSpec: Sub = { a: [11, 12], b: [4, 12] };
export const khacMauSpecs: Sub[] = [
  { a: [3, 4], b: [1, 8] },
  { a: [2, 3], b: [5, 18] },
  { a: [4, 5], b: [7, 20] },
  { a: [11, 12], b: [1, 3] },
];
/** Rút gọn từng phân số rồi mới trừ. */
export const rutGonSpecs: Sub[] = [
  { a: [4, 6], b: [3, 9] },
  { a: [6, 10], b: [1, 5] },
  { a: [15, 20], b: [3, 12] },
  { a: [10, 16], b: [1, 4] },
];
/** Hai câu dây và gậy: `longer` là vật dài hơn, `a` là chiều dài vật dài hơn, `b` là vật ngắn hơn. */
export const dayGaySpecs = [
  { gay: [5, 6] as F, day: [7, 12] as F, longer: "gậy" as const },
  { gay: [7, 12] as F, day: [11, 6] as F, longer: "dây" as const },
];
export const tanSpec: Sub = { a: [7, 9], b: [1, 3] };
/** Chuỗi phép tính trên vòng tròn như sơ đồ ao ếch: đi một vòng thì về số đầu. */
export const chuoiSpec = {
  start: [5, 6] as F,
  steps: [
    { op: "-" as const, f: [1, 3] as F },
    { op: "+" as const, f: [1, 4] as F },
    { op: "-" as const, f: [5, 12] as F },
    { op: "+" as const, f: [1, 2] as F },
  ],
};
export const noiCapSpecs: Sub[] = [
  { a: [9, 10], b: [3, 5] },
  { a: [5, 6], b: [1, 3] },
  { a: [7, 8], b: [3, 4] },
  { a: [5, 6], b: [7, 12] },
];
export const noiCapOrder = [2, 0, 3, 1];
export const thuLaiSpec: Sub = { a: [7, 8], b: [1, 4] };
export const choPhepTru = { options: ["1/3 − 1/2", "5/6 − 1/2", "1/4 − 3/4"], answerIndex: 1 };

const nb = (answer: number) => ({ answer });
const pair = ([t, m]: F, id = ""): FillQuestion["parts"] => [id, nb(t), "/", nb(m)];

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}
function words(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

/** Giải thích cho phép trừ: quy đồng nếu khác mẫu số, rồi trừ tử số, rồi rút gọn nếu cần. */
function explain({ a, b }: Sub): string {
  const l = lcm(a[1], b[1]);
  const ta: F = [(a[0] * l) / a[1], l];
  const tb: F = [(b[0] * l) / b[1], l];
  const head = a[1] === b[1] ? "" : `Quy đồng mẫu số: ${a[1] === l ? "" : `${text(a)} = ${text(ta)}; `}${b[1] === l ? "" : `${text(b)} = ${text(tb)}. `}`;
  const raw: F = [ta[0] - tb[0], l];
  const tail = `${text(ta)} − ${text(tb)} = (${ta[0]} − ${tb[0]})/${l} = ${text(raw)}`;
  const r = lowest(raw);
  return `${head}${tail}${r[0] === raw[0] ? "." : `, rút gọn được ${text(r)}.`}`;
}

/** Hàng "a − b =" kèm hai ô trống cho kết quả (phân số tối giản). */
const subParts = ({ a, b }: Sub): FillQuestion["parts"] => pair(sub(a, b), `${text(a)} − ${text(b)} =`);
const subFill = (id: string, spec: Sub, hint: string, prompt = "Tính (kết quả viết dưới dạng phân số tối giản).") => fill(id, prompt, subParts(spec), hint, explain(spec));

/** Khởi động: tính chất cơ bản, quy đồng, rút gọn. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-1", "Số ?", ["1/4 = (1 × 2)/(4 × 2) =", nb(2), "/8"], "Nhân cả tử số và mẫu số với 2.", "1 × 2 = 2 và 4 × 2 = 8, vậy 1/4 = 2/8."),
  fill("kd-2", "Số ?", ["1/3 = (1 × 4)/(3 × 4) =", nb(4), "/12"], "3 nhân với mấy thì được 12?", "3 × 4 = 12 nên nhân cả tử số và mẫu số với 4: 1/3 = 4/12."),
  fill("kd-3", "Rút gọn. Số ?", ["6/8 = (6 : 2)/(8 : 2) =", nb(3), "/4"], "Chia cả tử số và mẫu số cho 2.", "6 : 2 = 3 và 8 : 2 = 4, vậy 6/8 = 3/4."),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  cungMau: fill("thu-cung-mau", "Tính.", ["8/9 − 3/9 =", nb(5), "/", nb(9)], "Trừ tử số 8 − 3, giữ nguyên mẫu số 9.", "8 − 3 = 5, giữ nguyên mẫu số 9, vậy 8/9 − 3/9 = 5/9."),
  quyDong: fill("thu-quy-dong", "Quy đồng để tính 7/10 − 1/5. Số ?", ["1/5 = (1 × 2)/(5 × 2) =", nb(2), "/10"], "Mẫu số lớn là 10. 5 nhân với mấy thì được 10?", "1/5 = 2/10. Vậy 7/10 − 1/5 = 7/10 − 2/10 = 5/10."),
  rutGon: fill("thu-rut-gon", "Kết quả 5/10 chưa tối giản. Rút gọn. Số ?", ["5/10 = (5 : 5)/(10 : 5) =", nb(1), "/", nb(2)], "Chia cả tử số và mẫu số cho 5.", "5 : 5 = 1 và 10 : 5 = 2, vậy 5/10 = 1/2."),
};

const cungMauGroup: Question[] = [
  ...cungMauSpecs.map((spec, i) => subFill(`cm-${i + 1}`, spec, "Trừ tử số của phân số thứ nhất cho tử số của phân số thứ hai, giữ nguyên mẫu số.")),
  ...hinhSpecs.map((s, i) =>
    fill(
      `h-${i + 1}`,
      `${s.kieu === "tron" ? "Hình tròn" : "Băng ô"} chia thành ${s.mau} phần bằng nhau, tô màu ${s.to} phần. Cắt bỏ ${s.bot} phần đã tô. Viết phép tính tìm phần tô còn lại.`,
      [`${s.to}/${s.mau} − ${s.bot}/${s.mau} =`, nb(s.to - s.bot), `/${s.mau}`],
      "Phần tô lúc đầu trừ phần bị cắt bỏ. Mẫu số vẫn là số phần bằng nhau của cả hình.",
      `${s.to} − ${s.bot} = ${s.to - s.bot}, giữ nguyên mẫu số ${s.mau}: ${s.to}/${s.mau} − ${s.bot}/${s.mau} = ${s.to - s.bot}/${s.mau}.`,
      createElement(HinhPhanSo, { kieu: s.kieu, mau: s.mau, to: s.to, cot: "cot" in s ? s.cot : undefined }),
    ),
  ),
  words(
    "l-1",
    `Mai có ${text(banhSpec.a)} chiếc bánh. Mai ăn ${text(banhSpec.b)} chiếc bánh. Hỏi Mai còn lại mấy phần của chiếc bánh?`,
    [[`${text(banhSpec.a)} − ${text(banhSpec.b)} =`, nb(sub(banhSpec.a, banhSpec.b)[0]), "/", nb(sub(banhSpec.a, banhSpec.b)[1])]],
    "Còn lại là phép trừ. Hai phân số cùng mẫu số.",
    explain(banhSpec),
  ),
];

const khacMauGroup: Question[] = [
  words(
    "km-1",
    "Quy đồng rồi trừ: 3/4 − 1/8.",
    [
      ["3/4 = (3 × 2)/(4 × 2) =", nb(6), "/8"],
      ["3/4 − 1/8 = 6/8 − 1/8 =", ...pair(sub(khacMauSpecs[0].a, khacMauSpecs[0].b))],
    ],
    "Mẫu số lớn là 8. 4 nhân với mấy thì được 8? Quy đồng xong thì trừ như cùng mẫu số.",
    explain(khacMauSpecs[0]),
  ),
  ...khacMauSpecs.slice(1).map((spec, i) => subFill(`km-${i + 2}`, spec, "Quy đồng mẫu số hai phân số (đổi về mẫu số lớn hơn), rồi trừ hai phân số cùng mẫu số.")),
  ...rutGonSpecs.map((spec, i) =>
    fill(
      `rg-${i + 1}`,
      "Rút gọn rồi tính (kết quả viết dưới dạng phân số tối giản).",
      subParts(spec),
      "Rút gọn từng phân số trước. Sau đó trừ hai phân số vừa rút gọn.",
      `Rút gọn: ${text(spec.a)} = ${text(lowest(spec.a))}; ${text(spec.b)} = ${text(lowest(spec.b))}. ${explain({ a: lowest(spec.a), b: lowest(spec.b) })}`,
    ),
  ),
];

const lowestOver = (f: F) => text(lowest(f));
const dayGayQs: Question[] = dayGaySpecs.flatMap((s, i) => {
  const longer = s.longer === "gậy" ? s.gay : s.day;
  const shorter = s.longer === "gậy" ? s.day : s.gay;
  return [
    choice(
      `dg-${i + 1}a`,
      `Cây gậy dài ${text(s.gay)} m, sợi dây dài ${text(s.day)} m. Vật nào dài hơn?`,
      ["Cây gậy", "Sợi dây"],
      s.longer === "gậy" ? 0 : 1,
      "Quy đồng hai phân số về cùng mẫu số rồi so sánh tử số (Bài 58).",
      `Quy đồng về mẫu số ${lcm(s.gay[1], s.day[1])}: ${text(s.gay)} = ${text([(s.gay[0] * lcm(s.gay[1], s.day[1])) / s.gay[1], lcm(s.gay[1], s.day[1])])}; ${text(s.day)} = ${text([(s.day[0] * lcm(s.gay[1], s.day[1])) / s.day[1], lcm(s.gay[1], s.day[1])])}. Vậy ${s.longer === "gậy" ? "cây gậy" : "sợi dây"} dài hơn.`,
    ),
    words(
      `dg-${i + 1}b`,
      `${s.longer === "gậy" ? "Cây gậy" : "Sợi dây"} dài hơn bao nhiêu mét?`,
      [[`${text(longer)} − ${text(shorter)} =`, ...pair(sub(longer, shorter)), " m"]],
      "Lấy số đo của vật dài hơn trừ số đo của vật ngắn hơn.",
      `${explain({ a: longer, b: shorter })} Vậy dài hơn ${lowestOver(sub(longer, shorter))} m.`,
    ),
  ];
});

const chuoiLines = (): { lines: WordQuestion["lines"]; values: F[] } => {
  const lines: WordQuestion["lines"] = [];
  const values: F[] = [chuoiSpec.start];
  for (const step of chuoiSpec.steps) {
    const cur = values[values.length - 1];
    const next = step.op === "-" ? sub(cur, step.f) : add(cur, step.f);
    lines.push([`${text(cur)} ${step.op === "-" ? "−" : "+"} ${text(step.f)} =`, ...pair(next)]);
    values.push(next);
  }
  return { lines, values };
};
const chuoi = chuoiLines();

const noiCapQ: MatchQuestion = {
  id: "noi-1",
  kind: "noi-cap",
  prompt: "Nối phép tính với kết quả (tối giản).",
  pairs: noiCapSpecs.map((s) => ({ left: `${text(s.a)} − ${text(s.b)}`, right: text(sub(s.a, s.b)) })),
  rightOrder: noiCapOrder,
  hint: "Quy đồng rồi trừ từng phép tính, nhớ rút gọn kết quả.",
  explanation: noiCapSpecs.map((s) => `${text(s.a)} − ${text(s.b)} = ${text(sub(s.a, s.b))}`).join("; ") + ".",
};

const tanQ = words(
  "t-1",
  `Bác Tân dùng ${text(tanSpec.a)} diện tích mảnh đất để trồng rau và hoa. Phần trồng rau chiếm ${text(tanSpec.b)} diện tích. Hỏi bác Tân còn lại bao nhiêu phần diện tích để trồng hoa?`,
  [[`${text(tanSpec.a)} − ${text(tanSpec.b)} =`, ...pair(sub(tanSpec.a, tanSpec.b))]],
  "Phần trồng hoa là phần trồng cả rau và hoa trừ phần trồng rau. Hai mẫu số khác nhau nên quy đồng.",
  explain(tanSpec),
);

const khacMauWord: Question[] = [
  ...dayGayQs,
  words("ao-1", "Ao ếch: bắt đầu từ 5/6, làm lần lượt từng phép tính (kết quả tối giản).", chuoi.lines, "Làm từng bước. Kết quả bước trước là số bị trừ hoặc số hạng của bước sau.", `${chuoi.lines.length} phép tính liên tiếp, đi một vòng thì quay về ${text(chuoiSpec.start)}.`),
  noiCapQ,
  tanQ,
];

const suyNghi: Question[] = [
  choice("sn-1", "Nam tính 7/8 − 2/8 = 5/0. Nam sai ở đâu?", ["Phải giữ nguyên mẫu số 8, chỉ trừ tử số: 7/8 − 2/8 = 5/8", "Nam tính đúng", "Phải trừ cả mẫu số: 8 − 8 = 0 và cộng tử số"], 0, "Mẫu số cho biết số phần bằng nhau của cả hình, trừ đi thì số phần đó không đổi.", "Bánh vẫn chia thành 8 phần bằng nhau. Chỉ số phần lấy đi thay đổi, nên chỉ trừ tử số và giữ nguyên mẫu số."),
  choice("sn-2", "Hà tính 3/4 − 1/8 = 2/4 (lấy 3 − 1 = 2, giữ mẫu số 4). Hà sai ở đâu?", ["Hà quên quy đồng mẫu số trước khi trừ", "Hà tính đúng", "Hà phải cộng hai phân số"], 0, "Hai phân số khác mẫu số thì làm gì trước?", "3/4 và 1/8 khác mẫu số nên phải quy đồng: 3/4 = 6/8. Rồi 6/8 − 1/8 = 5/8."),
  fill(
    "sn-3",
    "Tính rồi cộng lại để thử (vượt SGK). Số ?",
    [`${text(thuLaiSpec.a)} − ${text(thuLaiSpec.b)} = ${text(sub(thuLaiSpec.a, thuLaiSpec.b))}. Thử: ${text(sub(thuLaiSpec.a, thuLaiSpec.b))} + ${text(thuLaiSpec.b)} = ${text(sub(thuLaiSpec.a, thuLaiSpec.b))} + 2/8 =`, nb(7), "/8"],
    "Hiệu cộng số trừ phải ra số bị trừ. Đổi 1/4 = 2/8 rồi cộng.",
    "5/8 + 2/8 = 7/8, đúng bằng số bị trừ. Vậy phép trừ 7/8 − 1/4 = 5/8 đúng.",
  ),
  choice("sn-4", "Phép trừ nào làm được khi con chưa học số âm? (vượt SGK)", choPhepTru.options, choPhepTru.answerIndex, "Số bị trừ phải lớn hơn hoặc bằng số trừ. So sánh trước như Bài 58.", "5/6 = 10/12 lớn hơn 1/2 = 6/12 nên làm được. Hai phép kia có số bị trừ bé hơn số trừ, con chưa học."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "cung-mau", title: "Trừ hai phân số cùng mẫu số", questions: cungMauGroup },
  { id: "khac-mau", title: "Trừ hai phân số khác mẫu số", questions: khacMauGroup },
  { id: "luyen-tap", title: "Luyện tập: dây, gậy, ao ếch, ô nối", questions: khacMauWord },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
