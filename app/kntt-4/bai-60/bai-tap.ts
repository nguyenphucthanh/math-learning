import type { ChoiceQuestion, CompareQuestion, ExerciseGroup, FillQuestion, Part, Question, Sign, WordQuestion } from "@/components/exercises/types";

/** Phân số [tử số, mẫu số]. */
export type P = [number, number];
const f = ([a, b]: P) => `${a}/${b}`;
const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
/** Rút gọn như SGK: chia cả tử số và mẫu số cho số lớn nhất mà cả hai cùng chia hết. */
export const rutGon = ([a, b]: P): P => {
  const g = gcd(a, b);
  return [a / g, b / g];
};
/** Tổng các phân số. Mẫu số lớn nhất chia hết cho các mẫu số còn lại (như SGK), nên lấy nó làm mẫu số chung. */
export const tong = (terms: P[]): P => {
  const m = Math.max(...terms.map(([, b]) => b));
  return [terms.reduce((s, [a, b]) => s + a * (m / b), 0), m];
};
const sumText = (terms: P[]) => terms.map(f).join(" + ");

export type Kind = "cung" | "khac" | "rutgon" | "ba" | "ba-khac";
export type CalcSpec = { id: string; kind: Kind; terms: P[]; story?: string; tuTim?: boolean; unit?: string };

/** Nhóm 1: Hoạt động 1 trang 74, cùng mẫu số (đổi số). */
const tr74: CalcSpec[] = [
  { id: "c1-1", kind: "cung", terms: [[4, 7], [5, 7]] },
  { id: "c1-2", kind: "cung", terms: [[16, 13], [8, 13]] },
  { id: "c1-3", kind: "cung", terms: [[21, 125], [18, 125]] },
];
/** Bài toán trang 75 và Luyện tập 4 trang 76. */
const bt75: CalcSpec[] = [{ id: "c2-bt", kind: "cung", terms: [[3, 8], [2, 8]], story: "Buổi sáng Lan đọc được 3/8 quyển truyện, buổi chiều Lan đọc thêm 2/8 quyển truyện. Hỏi cả hai buổi Lan đọc được bao nhiêu phần của quyển truyện?" }];
const tr76: CalcSpec[] = [
  { id: "c3-1", kind: "ba", terms: [[2, 7], [3, 7], [6, 7]] },
  { id: "c3-2", kind: "ba", terms: [[1, 12], [4, 12], [2, 12]] },
  { id: "c3-bt", kind: "ba", terms: [[4, 19], [7, 19], [6, 19]], story: "Bác Hai có một tấm vải. Bác dùng 4/19 tấm vải để may áo, 7/19 tấm vải để may váy và 6/19 tấm vải để may túi. Hỏi bác Hai đã dùng tất cả bao nhiêu phần tấm vải?" },
];
/** Trang 78: khác mẫu số (quy đồng có hệ số), rút gọn rồi tính. */
const tr78: CalcSpec[] = [
  { id: "k1-1", kind: "khac", terms: [[1, 9], [1, 3]] },
  { id: "k1-2", kind: "khac", terms: [[2, 5], [3, 10]] },
  { id: "k1-3", kind: "khac", terms: [[7, 9], [1, 3]] },
  { id: "k1-4", kind: "khac", terms: [[1, 2], [3, 8]] },
  { id: "k1-5", kind: "khac", terms: [[7, 12], [1, 6]] },
  { id: "k2-1", kind: "rutgon", terms: [[15, 9], [2, 3]] },
  { id: "k2-2", kind: "rutgon", terms: [[4, 10], [1, 5]] },
  { id: "k2-3", kind: "rutgon", terms: [[9, 24], [1, 8]] },
  { id: "k3-bt", kind: "khac", terms: [[2, 9], [1, 3]], story: "Hai nhóm công nhân cùng sửa một đoạn đường. Nhóm thứ nhất sửa được 2/9 đoạn đường, nhóm thứ hai sửa được 1/3 đoạn đường. Hỏi hai nhóm đã sửa được tất cả bao nhiêu phần đoạn đường?" },
];
/** Trang 79: luyện tập. Con tự tìm hệ số quy đồng. */
const tr79: CalcSpec[] = [
  { id: "l1-1", kind: "cung", terms: [[9, 19], [12, 19]] },
  { id: "l1-2", kind: "khac", terms: [[3, 16], [1, 4]], tuTim: true },
  { id: "l1-3", kind: "khac", terms: [[4, 20], [3, 10]], tuTim: true },
  { id: "l3-1", kind: "ba", terms: [[2, 9], [5, 9], [4, 9]] },
  { id: "l3-2", kind: "ba", terms: [[8, 17], [3, 17], [5, 17]] },
  { id: "l4-bt", kind: "khac", terms: [[1, 3], [1, 6]], tuTim: true, story: "Nam dùng 1/3 số tiền của mình để mua một quyển vở. Sau đó, bạn ấy dùng thêm 1/6 số tiền của mình để mua bút. Hỏi Nam đã dùng bao nhiêu phần số tiền của mình để mua vở và bút?" },
  { id: "l5-bt", kind: "ba-khac", terms: [[1, 2], [3, 4], [5, 8]], story: "Ba bạn pha nước cam cho buổi liên hoan. Mai pha được 1/2 lít, Việt pha được 3/4 lít, còn Nam pha được 5/8 lít. Tính số lít nước cam cả ba bạn pha được." },
];
export const calcSpecs: CalcSpec[] = [...tr74, ...bt75, ...tr76, ...tr78, ...tr79];

/** Hoạt động 3 trang 75: tìm số còn thiếu. */
export const soSpecs = [
  { id: "s-1", a: 5, b: 12, c: 6, hide: "tu" },
  { id: "s-2", a: 13, b: 9, c: 4, hide: "mau" },
  { id: "s-3", a: 8, b: 17, c: 7, hide: "kq" },
] as const;

/** Luyện tập 1 trang 75: Đ, S. `shown` là kết quả bạn viết. */
export const dsSpecs = [
  { id: "ds-1", a: 5, c: 2, m: 9, shown: [7, 18] as P, cach: "cộng cả mẫu số" },
  { id: "ds-2", a: 5, c: 5, m: 6, shown: [5, 12] as P, cach: "cộng cả mẫu số" },
  { id: "ds-3", a: 6, c: 4, m: 13, shown: [10, 13] as P, cach: "" },
];

/** Luyện tập 2 trang 76 và Luyện tập 2 trang 79: tính rồi so sánh. */
export const ssSpecs = [
  { id: "ss-1", rows: [["3/11 + 6/11", "6/11 + 3/11"], ["4/25 + 9/25 + 6/25", "4/25 + 6/25 + 9/25"], ["3/10 + 4/10", "3/10 + 5/10"]] },
  { id: "ss-2", rows: [["(2/7 + 3/7) + 1/7", "2/7 + (3/7 + 1/7)"], ["(5/12 + 1/12) + 2/12", "5/12 + 1/12 + 2/12"]] },
] as const;
/** Giá trị biểu thức chỉ gồm phép cộng các phân số cùng mẫu số (bỏ ngoặc). */
const value = (expr: string): P => tong(Array.from(expr.matchAll(/(\d+)\/(\d+)/g), (m): P => [Number(m[1]), Number(m[2])]));
const compare = (l: string, r: string): Sign => {
  const [a, b] = value(l);
  const [c, d] = value(r);
  return a * d === c * b ? "=" : a * d > c * b ? ">" : "<";
};

const fill = (id: string, prompt: string, parts: Part[], hint: string, explanation: string): FillQuestion => ({ id, kind: "dien-so", prompt, parts, hint, explanation });
const words = (id: string, prompt: string, lines: Part[][], hint: string, explanation: string): WordQuestion => ({ id, kind: "loi-van", prompt, lines, hint, explanation });
const choice = (id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion => ({ id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation });

/** Kết quả: dòng tổng, rồi dòng rút gọn nếu rút gọn được. Hai ô cuối cùng luôn là kết quả cuối. */
const ketQua = (terms: P[], head: string): { lines: Part[][]; text: string } => {
  const [t, m] = tong(terms);
  const [r, s] = rutGon([t, m]);
  const lines: Part[][] = [[head, { answer: t }, "/", { answer: m }]];
  if (s !== m) lines.push([`${t}/${m} có thể rút gọn: ${t}/${m} =`, { answer: r }, "/", { answer: s }]);
  return { lines, text: s !== m ? `${t}/${m} = ${r}/${s}` : `${t}/${m}` };
};

const build = ({ id, kind, terms, story, tuTim }: CalcSpec): WordQuestion => {
  const expr = sumText(terms);
  const m = Math.max(...terms.map(([, b]) => b));
  const kq = (head: string) => ketQua(terms, head);
  const prompt = story ?? (kind === "rutgon" ? `Rút gọn rồi tính: ${expr}.` : `Tính: ${expr}.`);
  const ask = story ? [`Phép tính: ${expr} =`] : [];
  if (kind === "cung" || kind === "ba") {
    const tu = terms.map(([a]) => a).join(" + ");
    const k = kq(`${expr} = (${tu})/${m} =`);
    return words(id, prompt, [...(story ? [ask] : []), ...k.lines], "Cùng mẫu số: cộng các tử số với nhau và giữ nguyên mẫu số.", `Giữ nguyên mẫu số ${m}, cộng các tử số: ${tu} = ${tong(terms)[0]}. Vậy ${expr} = ${k.text}.`);
  }
  if (kind === "khac") {
    const small = terms.find(([, b]) => b < m)!;
    const other = terms.find(([, b]) => b === m)!;
    const k = m / small[1];
    const conv: Part[] = tuTim
      ? [`${m} : ${small[1]} = `, { answer: k }, `. ${f(small)} =`, { answer: small[0] * k }, "/", { answer: m }]
      : [`${f(small)} = (${small[0]} × ${k})/(${small[1]} × ${k}) =`, { answer: small[0] * k }, "/", { answer: m }];
    const res = kq("Cộng hai phân số cùng mẫu số:");
    return words(id, prompt, [...(story ? [ask] : []), conv, ...res.lines], `Khác mẫu số thì quy đồng trước. ${m} : ${small[1]} = ${k}, nhân cả tử số và mẫu số của ${f(small)} với ${k}; giữ nguyên ${f(other)}.`, `${f(small)} = ${f([small[0] * k, m])}. ${f([small[0] * k, m])} + ${f(other)} = ${res.text}.`);
  }
  if (kind === "rutgon") {
    const [x, y] = terms.map(rutGon);
    const res = kq("Cộng hai phân số cùng mẫu số:");
    return words(id, prompt, [[`${f(terms[0])} =`, { answer: x[0] }, "/", { answer: x[1] }, `; ${f(terms[1])} =`, { answer: y[0] }, "/", { answer: y[1] }], ...res.lines], "Rút gọn từng phân số trước, rồi cộng. Chia cả tử số và mẫu số cho cùng một số.", `${f(terms[0])} = ${f(x)}, ${f(terms[1])} = ${f(y)}. Hai phân số cùng mẫu số ${x[1]}, cộng lại được ${res.text}.`);
  }
  const res = kq("Cộng ba phân số đã quy đồng:");
  const conv = terms.filter(([, b]) => b < m).map(([a, b]) => `${f([a, b])} = ${f([a * (m / b), m])}`).join("; ");
  return words(id, prompt, [...(story ? [ask] : []), ["Mẫu số chung là", { answer: m }], ...res.lines], `Chọn mẫu số lớn nhất làm mẫu số chung, kiểm tra nó chia hết cho các mẫu số còn lại. Quy đồng từng phân số rồi cộng ba tử số.`, `Mẫu số chung là ${m}: ${conv}. Cộng ba phân số cùng mẫu số được ${res.text}.`);
};

const so = ({ id, a, b, c, hide }: (typeof soSpecs)[number]) => {
  const t = a + c;
  if (hide === "tu") return fill(id, "Số ?", [`${a}/${b} +`, { answer: c }, `/${b} = ${t}/${b}`], `Cùng mẫu số ${b}: tử số ${a} cộng với số nào để được ${t}?`, `${t} − ${a} = ${c}. Vậy ${a}/${b} + ${c}/${b} = ${t}/${b}.`);
  if (hide === "mau") return fill(id, "Số ?", [`${a}/${b} + ${c}/`, { answer: b }, ` = ${t}/${b}`], `Khi cộng, mẫu số giữ nguyên. Mẫu số của hai phân số đầu và tổng phải bằng nhau.`, `Giữ nguyên mẫu số, nên mẫu số ở ô trống là ${b}. ${a} + ${c} = ${t}.`);
  return fill(id, "Số ?", [`${a}/${b} + ${c}/${b} = ${t}/`, { answer: b }], "Mẫu số của tổng là mẫu số chung, giữ nguyên.", `${a} + ${c} = ${t}, mẫu số vẫn là ${b}. Vậy ${a}/${b} + ${c}/${b} = ${t}/${b}.`);
};

const ds = ({ id, a, c, m, shown, cach }: (typeof dsSpecs)[number]) => {
  const dung = shown[0] * m === (a + c) * shown[1];
  const text = cach ? `${a}/${m} + ${c}/${m} = (${a} + ${c})/(${m} + ${m}) = ${f(shown)}` : `${a}/${m} + ${c}/${m} = (${a} + ${c})/${m} = ${f(shown)}`;
  return choice(id, `Bạn viết: ${text}. Bạn làm đúng hay sai?`, ["Đúng", "Sai"], dung ? 0 : 1, "Cùng mẫu số thì mẫu số giữ nguyên hay đem cộng lại?", dung ? `Đúng: giữ nguyên mẫu số ${m}, cộng tử số ${a} + ${c} = ${a + c}.` : `Sai vì ${cach}. Phải giữ nguyên mẫu số ${m}: ${a}/${m} + ${c}/${m} = ${f([a + c, m])}.`);
};

const compareQ = ({ id, rows }: (typeof ssSpecs)[number]): CompareQuestion => ({
  id,
  kind: "so-sanh",
  prompt: "Tính rồi so sánh.",
  rows: rows.map(([left, right]) => ({ left, right, answer: compare(left, right) })),
  hint: "Tính giá trị từng biểu thức rồi so sánh. Đổi chỗ các số hạng hay nhóm lại thì tổng có đổi không?",
  explanation: "Đổi chỗ các số hạng (giao hoán) hoặc nhóm các số hạng khác đi (kết hợp) thì tổng không đổi. Nếu đổi số hạng thì tổng đổi.",
});

/** Khởi động: nhắc rút gọn (Bài 56), quy đồng (Bài 57), cùng mẫu số. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-rut", "Rút gọn 6/8.", ["6/8 = (6 : 2)/(8 : 2) =", { answer: 3 }, "/", { answer: 4 }], "Chia cả tử số và mẫu số cho 2.", "6 : 2 = 3 và 8 : 2 = 4, nên 6/8 = 3/4."),
  fill("kd-quy", "Quy đồng 1/2 về mẫu số 8.", ["1/2 = (1 × 4)/(2 × 4) =", { answer: 4 }, "/", { answer: 8 }], "8 : 2 = 4. Nhân cả tử số và mẫu số với 4.", "1 × 4 = 4 và 2 × 4 = 8, nên 1/2 = 4/8."),
  choice("kd-mau", "3/7 và 2/7 có cùng mẫu số không?", ["Có, cùng mẫu số 7", "Không"], 0, "Nhìn số ở dưới gạch ngang.", "Cả hai đều có mẫu số 7."),
];

export const quickChecks = {
  cung: fill("thu-cung", "Tính 3/7 + 2/7. Số ?", ["3/7 + 2/7 = (3 + 2)/7 =", { answer: 5 }, "/", { answer: 7 }], "Cộng tử số, giữ nguyên mẫu số.", "3 + 2 = 5, mẫu số vẫn là 7. Vậy 3/7 + 2/7 = 5/7."),
  nham: choice("thu-nham", "Con viết 2/9 + 5/9 = 7/18. Đúng hay sai?", ["Sai", "Đúng"], 0, "Mẫu số có đem cộng không?", "Sai. Mẫu số giữ nguyên là 9: 2/9 + 5/9 = 7/9."),
  quy: fill("thu-quy", "Muốn tính 1/6 + 1/3, quy đồng 1/3 về mẫu số 6. Số ?", ["1/3 = (1 × 2)/(3 × 2) =", { answer: 2 }, "/", { answer: 6 }], "6 : 3 = 2. Nhân cả tử số và mẫu số của 1/3 với 2.", "1/3 = 2/6. Vậy 1/6 + 1/3 = 1/6 + 2/6 = 3/6."),
  rutgon: fill("thu-rut", "5/12 + 3/12 = 8/12. Rút gọn 8/12.", ["8/12 = (8 : 4)/(12 : 4) =", { answer: 2 }, "/", { answer: 3 }], "Chia cả tử số và mẫu số cho 4.", "8 : 4 = 2 và 12 : 4 = 3. Vậy 5/12 + 3/12 = 2/3."),
};

/** Suy nghĩ thêm. Câu sn-3 vượt SGK (ước lượng so với 1). */
const sn: Question[] = [
  choice("sn-1", "Bình tính 1/8 + 1/2 = (1 + 1)/(8 + 2) = 2/10. Bình sai ở đâu?", ["Cộng cả tử số và mẫu số khi hai phân số khác mẫu số", "Phải nhân hai phân số với nhau", "Bình không sai"], 0, "Hai phân số khác mẫu số thì làm bước nào trước khi cộng?", "Phải quy đồng mẫu số trước: 1/2 = 4/8. Rồi 1/8 + 4/8 = 5/8."),
  choice("sn-2", "Mai tính 5/12 + 3/12 = 8/12 rồi dừng lại. Kết quả 8/12 có thể viết gọn hơn không?", ["Có, rút gọn 8/12 = 2/3", "Không, 8/12 là gọn nhất", "Có, 8/12 = 8/6"], 0, "8 và 12 cùng chia hết cho số nào?", "8 và 12 cùng chia hết cho 4: 8/12 = 2/3."),
  choice("sn-3", "Vượt SGK: không tính cụ thể, con đoán xem 5/8 + 6/8 lớn hơn 1 hay bé hơn 1?", ["Lớn hơn 1", "Bé hơn 1"], 0, "1 = 8/8. Tử số của tổng so với 8 thì thế nào?", "5/8 + 6/8 = 11/8. Tử số 11 lớn hơn mẫu số 8, nên tổng lớn hơn 1. Vẫn viết 11/8, chưa đổi hỗn số."),
];

const groupOf = (specs: CalcSpec[], ids: string[]) => specs.filter((s) => ids.includes(s.id)).map(build);

export const exerciseGroups: ExerciseGroup[] = [
  { id: "cung-mau-74", title: "Tiết 1: Cộng hai phân số cùng mẫu số (trang 74)", questions: tr74.map(build) },
  { id: "cung-mau-75", title: "Tiết 1: Số còn thiếu, bài toán, Đ/S (trang 75)", questions: [...soSpecs.map(so), ...bt75.map(build), ...dsSpecs.map(ds)] },
  { id: "cung-mau-76", title: "Tiết 2: Luyện tập cùng mẫu số (trang 76)", questions: [compareQ(ssSpecs[0]), ...tr76.map(build)] },
  { id: "khac-mau-78", title: "Tiết 3: Cộng hai phân số khác mẫu số (trang 78)", questions: tr78.map(build) },
  {
    id: "luyen-tap-79",
    title: "Tiết 4: Luyện tập (trang 79)",
    questions: [...groupOf(tr79, ["l1-1", "l1-2", "l1-3"]), compareQ(ssSpecs[1]), ...groupOf(tr79, ["l3-1", "l3-2", "l4-bt", "l5-bt"])],
  },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: sn },
];
