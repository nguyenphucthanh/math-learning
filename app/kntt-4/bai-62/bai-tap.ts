import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { HinhPhanSo } from "@/components/math/phan-so";
import { createElement } from "react";
import { SoDoChuoi, ThanhGo } from "./_illustrations/hinh";

/** Phân số [tử số, mẫu số]. Số tự nhiên n viết [n, 1]. Phép trừ luôn có số bị trừ lớn hơn hoặc bằng số trừ. */
export type F = [number, number];
export type Op = "+" | "-";
export type Calc = { a: F; op: Op; b: F };

export const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
const lcm = (x: number, y: number) => (x / gcd(x, y)) * y;
export const lowest = ([t, m]: F): F => [t / gcd(t, m), m / gcd(t, m)];
const text = ([t, m]: F) => (m === 1 ? `${t}` : `${t}/${m}`);
const sign = (op: Op) => (op === "+" ? "+" : "−");
export const calc = (a: F, op: Op, b: F): F => {
  const l = lcm(a[1], b[1]);
  return lowest([(a[0] * l) / a[1] + (op === "+" ? 1 : -1) * ((b[0] * l) / b[1]), l]);
};
const sum = (list: F[]): F => list.reduce((acc, f) => calc(acc, "+", f), [0, 1] as F);

/** Số liệu các câu (đổi so với SGK, trừ chỗ gắn với hình). Test tính lại đáp án bằng nhân chéo, không so với số gõ tay. */
// Bài 60: cộng.
export const congSpecs: Calc[] = [
  { a: [3, 4], op: "+", b: [5, 12] },
  { a: [1, 6], op: "+", b: [5, 12] },
  { a: [4, 9], op: "+", b: [2, 3] },
  { a: [3, 20], op: "+", b: [2, 5] },
];
/** Tính thuận tiện: gom các phân số cùng mẫu số hoặc cặp cho tổng tròn trước. */
export const thuanTienSpecs: F[][] = [
  [[698, 1000], [251, 1000], [2, 1000]],
  [[9, 4], [5, 12], [7, 12]],
];
export const xeSpec: Calc = { a: [3, 10], op: "+", b: [2, 5] };
export const cafeSpec: F[] = [[1, 4], [3, 8], [5, 16]];
// Bài 61: trừ.
/** Đ/S: `claim` là kết quả viết sẵn trong đề (có đúng, có sai). */
export const dungSaiSpecs: (Calc & { claim: F })[] = [
  { a: [5, 6], op: "-", b: [1, 3], claim: [1, 2] },
  { a: [3, 5], op: "-", b: [1, 10], claim: [2, 5] },
  { a: [2, 3], op: "+", b: [1, 6], claim: [3, 9] },
  { a: [7, 8], op: "-", b: [3, 4], claim: [1, 8] },
];
export const goSpec = { total: [21, 4] as F, parts: [[5, 2], [7, 8]] as F[] };
export const chaiSpec = { start: [5, 6] as F, uses: [[1, 3], [1, 6]] as F[] };
// Bài 56 + 60, 61: rút gọn rồi tính.
export const rutGonSpecs: Calc[] = [
  { a: [6, 18], op: "+", b: [5, 9] },
  { a: [14, 21], op: "-", b: [2, 9] },
  { a: [12, 16], op: "-", b: [1, 2] },
  { a: [18, 30], op: "+", b: [7, 10] },
];
// Bài này: số tự nhiên với phân số.
export const soTuNhienSpecs: Calc[] = [
  { a: [1, 1], op: "+", b: [3, 7] },
  { a: [4, 1], op: "+", b: [1, 3] },
  { a: [2, 1], op: "-", b: [3, 4] },
  { a: [19, 5], op: "-", b: [3, 1] },
];
// Sơ đồ và thanh gỗ (gắn với hình).
export const butSpec = {
  start: [1, 3] as F,
  steps: [
    { op: "+" as Op, f: [1, 6] as F },
    { op: "-" as Op, f: [1, 4] as F },
    { op: "+" as Op, f: [5, 12] as F },
    { op: "-" as Op, f: [1, 6] as F },
  ],
};
export const soDoSpecs = [
  { start: [3, 20] as F, steps: [{ op: "+" as Op, f: [1, 4] as F }, { op: "+" as Op, f: [1, 1] as F }] },
  { start: [4, 15] as F, steps: [{ op: "+" as Op, f: [2, 5] as F }, { op: "-" as Op, f: [2, 5] as F }] },
];
export const thanhGoA = { total: [19, 3] as F, a: [7, 2] as F };
export const thanhGoB = { total: [17, 6] as F, a: [5, 3] as F, b: [11, 6] as F };
export const thuLaiSpec: Calc = { a: [7, 12], op: "+", b: [1, 4] };
export const uocLuong = { a: [3, 4] as F, b: [5, 6] as F };

const nb = (answer: number) => ({ answer });
const pair = (f: F, head = ""): FillQuestion["parts"] => [head, nb(f[0]), "/", nb(f[1])];
const expr = ({ a, op, b }: Calc) => `${text(a)} ${sign(op)} ${text(b)}`;
const line = (spec: Calc): FillQuestion["parts"] => pair(calc(spec.a, spec.op, spec.b), `${expr(spec)} =`);

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}
function words(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

/** Giải thích: quy đồng nếu khác mẫu số (số tự nhiên viết thành phân số), rồi cộng hoặc trừ tử số, rồi rút gọn nếu cần. */
function explain({ a, op, b }: Calc): string {
  const l = lcm(a[1], b[1]);
  const ta: F = [(a[0] * l) / a[1], l];
  const tb: F = [(b[0] * l) / b[1], l];
  const head = a[1] === b[1] ? "" : `Quy đồng mẫu số: ${a[1] === l ? "" : `${text(a)} = ${text(ta)}; `}${b[1] === l ? "" : `${text(b)} = ${text(tb)}. `}`;
  const raw: F = [op === "+" ? ta[0] + tb[0] : ta[0] - tb[0], l];
  const tail = `${text(ta)} ${sign(op)} ${text(tb)} = (${ta[0]} ${sign(op)} ${tb[0]})/${l} = ${text(raw)}`;
  const r = lowest(raw);
  return `${head}${tail}${r[0] === raw[0] ? "." : `, rút gọn được ${text(r)}.`}`;
}

/** Chuỗi phép tính liên tiếp: mỗi dòng dùng kết quả của dòng trên. */
function chain(start: F, steps: { op: Op; f: F }[]): { lines: WordQuestion["lines"]; values: F[] } {
  const lines: WordQuestion["lines"] = [];
  const values: F[] = [start];
  for (const step of steps) {
    const cur = values[values.length - 1];
    const next = calc(cur, step.op, step.f);
    lines.push(pair(next, `${text(cur)} ${sign(step.op)} ${text(step.f)} =`));
    values.push(next);
  }
  return { lines, values };
}
const chainExplain = (c: { values: F[] }, steps: { op: Op; f: F }[]) =>
  steps.map((s, i) => `${text(c.values[i])} ${sign(s.op)} ${text(s.f)} = ${text(c.values[i + 1])}`).join("; ") + ".";

/** Câu thử trong phần Nhắc lại nhanh, cũng là kiểm tra đầu vào. Không tính vào tiến độ. */
export const quickChecks = {
  cungMau: fill("thu-cung-mau", "Tính (kết quả lớn hơn 1 vẫn viết là phân số).", ["3/5 + 4/5 =", nb(7), "/", nb(5)], "Cộng tử số 3 + 4, giữ nguyên mẫu số 5.", "3 + 4 = 7, giữ nguyên mẫu số 5, vậy 3/5 + 4/5 = 7/5."),
  quyDong: fill("thu-quy-dong", "Quy đồng để tính 2/3 + 1/6. Số ?", ["2/3 = (2 × 2)/(3 × 2) =", nb(4), "/6"], "Mẫu số lớn là 6. 3 nhân với mấy thì được 6?", "2/3 = 4/6. Vậy 2/3 + 1/6 = 4/6 + 1/6 = 5/6."),
  rutGon: fill("thu-rut-gon", "Rút gọn trước khi tính. Số ?", ["6/10 = (6 : 2)/(10 : 2) =", nb(3), "/", nb(5)], "Chia cả tử số và mẫu số cho 2.", "6 : 2 = 3 và 10 : 2 = 5, vậy 6/10 = 3/5."),
  thuanTien: fill("thu-thuan-tien", "Tính bằng cách thuận tiện.", ["2/7 + 3/5 + 5/7 = (2/7 + 5/7) + 3/5 = 1 + 3/5 =", nb(8), "/", nb(5)], "Cộng hai phân số cùng mẫu số 7 trước.", "2/7 + 5/7 = 7/7 = 1. Rồi 1 = 5/5, 5/5 + 3/5 = 8/5."),
  soTuNhien: fill("thu-so-tu-nhien", "Viết số tự nhiên thành phân số. Số ?", ["3 =", nb(12), "/4"], "Mỗi 1 là 4/4. Có 3 cái 4/4.", "1 = 4/4 nên 3 = 4/4 + 4/4 + 4/4 = 12/4."),
  soTuNhienTru: fill("thu-so-tu-nhien-tru", "Tính (theo mẫu).", pair(calc([1, 1], "-", [3, 5]), "1 − 3/5 = 5/5 − 3/5 ="), "Viết 1 thành phân số có mẫu số 5, rồi trừ.", "1 = 5/5. 5/5 − 3/5 = 2/5."),
};

const congGroup: Question[] = [
  ...congSpecs.map((s, i) => fill(`c-${i + 1}`, "Tính (kết quả viết dưới dạng phân số tối giản).", line(s), "Cùng mẫu số thì cộng tử số. Khác mẫu số thì quy đồng trước (đổi về mẫu số lớn hơn).", explain(s))),
  ...thuanTienSpecs.map((list, i) => {
    const total = sum(list);
    return fill(
      `tt-${i + 1}`,
      "Tính bằng cách thuận tiện.",
      pair(total, `${list.map(text).join(" + ")} =`),
      i === 0 ? "Cộng hai phân số có tử số cộng lại tròn trăm trước." : "Cộng hai phân số cùng mẫu số 12 trước, được 1.",
      `Đổi chỗ, nhóm lại các số hạng: ${i === 0 ? "698 + 2 = 700; 700 + 251 = 951, giữ nguyên mẫu số 1 000" : "5/12 + 7/12 = 12/12 = 1; 9/4 + 1 = 9/4 + 4/4 = 13/4"}. Tổng là ${text(total)}.`,
    );
  }),
  fill("c-xe", `Một xe máy chạy được ${text(xeSpec.a)} quãng đường trong giờ đầu, giờ sau chạy thêm ${text(xeSpec.b)} quãng đường. Sau hai giờ xe chạy được mấy phần của quãng đường?`, line(xeSpec), "Chạy thêm là phép cộng. Hai mẫu số khác nhau nên quy đồng.", explain(xeSpec)),
  (() => {
    const first = calc(cafeSpec[0], "+", cafeSpec[1]);
    const all = sum(cafeSpec);
    return words(
      "c-cafe",
      `Ba người cùng thu hoạch một rẫy cà phê. Người thứ nhất thu hoạch ${text(cafeSpec[0])} rẫy, người thứ hai ${text(cafeSpec[1])} rẫy, người thứ ba ${text(cafeSpec[2])} rẫy. Hỏi cả ba người thu hoạch được mấy phần của rẫy?`,
      [pair(first, `${text(cafeSpec[0])} + ${text(cafeSpec[1])} =`), pair(all, `${text(first)} + ${text(cafeSpec[2])} =`)],
      "Cộng hai số đầu trước, rồi cộng với số còn lại.",
      `${explain({ a: cafeSpec[0], op: "+", b: cafeSpec[1] })} ${explain({ a: first, op: "+", b: cafeSpec[2] })}`,
    );
  })(),
];

const truGroup: Question[] = [
  ...dungSaiSpecs.map((s, i) => {
    const right = calc(s.a, s.op, s.b);
    const ok = right[0] * s.claim[1] === right[1] * s.claim[0];
    return choice(
      `ds-${i + 1}`,
      `${expr(s)} = ${text(s.claim)}. Đúng hay sai?`,
      ["Đúng", "Sai"],
      ok ? 0 : 1,
      "Tự tính lại phép tính, nhớ quy đồng nếu khác mẫu số.",
      `${explain(s)} Vậy phép tính trên ${ok ? "đúng" : `sai, kết quả đúng là ${text(right)}`}.`,
    );
  }),
  (() => {
    const c = chain(goSpec.total, goSpec.parts.map((f) => ({ op: "-" as Op, f })));
    return words(
      "go",
      `Một cây gỗ dài ${text(goSpec.total)} m được cưa thành ba khúc. Khúc thứ nhất dài ${text(goSpec.parts[0])} m, khúc thứ hai dài ${text(goSpec.parts[1])} m. Tính chiều dài khúc gỗ còn lại (m).`,
      [...c.lines, ],
      "Khúc còn lại bằng cả cây gỗ trừ hai khúc đã cưa. Trừ lần lượt từng khúc.",
      chainExplain(c, goSpec.parts.map((f) => ({ op: "-" as Op, f }))),
    );
  })(),
  (() => {
    const steps = chaiSpec.uses.map((f) => ({ op: "-" as Op, f }));
    const c = chain(chaiSpec.start, steps);
    return words(
      "chai",
      `Rô-bốt còn ${text(chaiSpec.start)} chai nước giặt. Rô-bốt dùng ${text(chaiSpec.uses[0])} chai để giặt chăn, rồi dùng thêm ${text(chaiSpec.uses[1])} chai để giặt quần áo. Hỏi khi ấy chai nước giặt còn lại mấy phần?`,
      c.lines,
      "Dùng đi là trừ. Trừ lần lượt từng lần dùng.",
      chainExplain(c, steps),
    );
  })(),
];

const rutGonGroup: Question[] = rutGonSpecs.map((s, i) => {
  const a = lowest(s.a);
  const b = lowest(s.b);
  return fill(
    `rg-${i + 1}`,
    "Rút gọn rồi tính (kết quả viết dưới dạng phân số tối giản).",
    line(s),
    "Rút gọn từng phân số trước. Sau đó cộng hoặc trừ hai phân số vừa rút gọn.",
    `Rút gọn: ${text(s.a)} = ${text(a)}; ${text(s.b)} = ${text(b)}. ${explain({ a, op: s.op, b })}`,
  );
});

const soTuNhienGroup: Question[] = [
  fill(
    "tn-0",
    "Số tự nhiên viết thành phân số. Hình có 12 ô, mỗi hàng 6 ô là 1 hình. Số ?",
    ["2 =", nb(12), "/6"],
    "Một hàng 6 ô là 1, tức là 6/6. Có 2 hàng.",
    "Mỗi hàng là 6/6 = 1. Hai hàng là 12/6, vậy 2 = 12/6.",
    createElement(HinhPhanSo, { kieu: "bang", mau: 12, cot: 6, to: 12 }),
  ),
  ...soTuNhienSpecs.map((s, i) =>
    fill(
      `tn-${i + 1}`,
      "Tính (theo mẫu, kết quả viết dưới dạng phân số, chưa dùng hỗn số).",
      line(s),
      s.a[1] === 1 && s.a[0] === 1 ? "Viết 1 thành phân số có cùng mẫu số với phân số kia." : "Viết số tự nhiên thành phân số có cùng mẫu số với phân số kia, rồi tính.",
      explain(s),
    ),
  ),
];

const soDoGroup: Question[] = [
  (() => {
    const steps = butSpec.steps;
    const c = chain(butSpec.start, steps);
    return words("sd-but", "Sơ đồ bướm: đi theo mũi tên, tính từng ô (kết quả tối giản).", c.lines, "Kết quả của ô trước là số đầu của phép tính kế tiếp.", chainExplain(c, steps), createElement(SoDoChuoi, { start: butSpec.start, steps }));
  })(),
  ...soDoSpecs.map((s, i) => {
    const c = chain(s.start, s.steps);
    return words(`sd-${i + 1}`, "Tìm phân số thích hợp ở hai ô ? (kết quả tối giản).", c.lines, i === 0 ? "Cộng với 1 thì cộng với 1/1, hoặc viết 1 thành phân số cùng mẫu số." : "Cộng rồi trừ cùng một số thì được kết quả như thế nào?", chainExplain(c, s.steps), createElement(SoDoChuoi, { start: s.start, steps: s.steps }));
  }),
  fill(
    "go-a",
    "Thanh gỗ dài 19/3 m, một phần dài 7/2 m. Tìm phân số thích hợp ở ô ?",
    pair(calc(thanhGoA.total, "-", thanhGoA.a), `${text(thanhGoA.total)} − ${text(thanhGoA.a)} =`),
    "Phần ? bằng cả thanh trừ phần đã biết.",
    explain({ a: thanhGoA.total, op: "-", b: thanhGoA.a }),
    createElement(ThanhGo, thanhGoA),
  ),
  (() => {
    const both = calc(thanhGoB.a, "+", thanhGoB.b);
    return words(
      "go-b",
      "Hai thanh gỗ nhỏ đặt chồng lên nhau trên thanh gỗ dài 17/6 m. Tìm đoạn chồng ở ô ?",
      [pair(both, `${text(thanhGoB.a)} + ${text(thanhGoB.b)} =`), pair(calc(both, "-", thanhGoB.total), `${text(both)} − ${text(thanhGoB.total)} =`)],
      "Hai thanh nhỏ cộng lại dài hơn thanh lớn. Phần dài hơn là đoạn bị đếm hai lần, chính là đoạn chồng.",
      `${explain({ a: thanhGoB.a, op: "+", b: thanhGoB.b })} Rồi ${explain({ a: both, op: "-", b: thanhGoB.total })}`,
      createElement(ThanhGo, thanhGoB),
    );
  })(),
];

const suyNghi: Question[] = [
  choice("sn-1", "Nam tính 3 − 1/4 = 2/4 (lấy 3 − 1 = 2, giữ mẫu số 4). Nam sai ở đâu?", ["Nam chưa viết 3 thành phân số mẫu số 4: 3 = 12/4, rồi 12/4 − 1/4 = 11/4", "Nam tính đúng", "Phải cộng chứ không trừ"], 0, "Số tự nhiên 3 và phân số 1/4 chưa cùng mẫu số.", "3 = 12/4 nên 3 − 1/4 = 12/4 − 1/4 = 11/4."),
  (() => {
    const right = calc(uocLuong.a, "+", uocLuong.b);
    return choice("sn-2", `Chưa tính, ước lượng: ${text(uocLuong.a)} + ${text(uocLuong.b)} so với 1 thì thế nào?`, ["Lớn hơn 1", "Bằng 1", "Bé hơn 1"], right[0] > right[1] ? 0 : right[0] === right[1] ? 1 : 2, "Mỗi phân số có lớn hơn 1/2 không?", `Cả hai phân số đều lớn hơn 1/2 (vì 3/4 và 5/6 đều hơn một nửa) nên tổng lớn hơn 1. Tính ra ${explain({ a: uocLuong.a, op: "+", b: uocLuong.b })}`);
  })(),
  fill("sn-3", "Tính rồi trừ lại để thử (vượt SGK). Số ?", [`${expr(thuLaiSpec)} = ${text(calc(thuLaiSpec.a, "+", thuLaiSpec.b))}. Thử: ${text(calc(thuLaiSpec.a, "+", thuLaiSpec.b))} − ${text(thuLaiSpec.b)} =`, nb(thuLaiSpec.a[0]), "/", nb(thuLaiSpec.a[1])], "Tổng trừ một số hạng phải ra số hạng còn lại.", `${explain({ a: calc(thuLaiSpec.a, "+", thuLaiSpec.b), op: "-", b: thuLaiSpec.b })} Đúng bằng ${text(thuLaiSpec.a)}, vậy phép cộng đúng.`),
];
export const exerciseGroups: ExerciseGroup[] = [
  { id: "cong", title: "Phép cộng phân số (Bài 60)", questions: congGroup },
  { id: "tru", title: "Phép trừ phân số (Bài 61)", questions: truGroup },
  { id: "rut-gon", title: "Rút gọn rồi tính (Bài 56, 60, 61)", questions: rutGonGroup },
  { id: "so-tu-nhien", title: "Số tự nhiên và phân số", questions: soTuNhienGroup },
  { id: "so-do", title: "Sơ đồ bướm, sơ đồ hình và thanh gỗ", questions: soDoGroup },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
