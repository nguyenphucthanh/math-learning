import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { createElement } from "react";
import { SoDoChuoi, type MulOp } from "./_illustrations/hinh";

/** Phân số [tử số, mẫu số]. Số tự nhiên n viết [n, 1]. */
export type F = [number, number];

export const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
export const lowest = ([t, m]: F): F => [t / gcd(t, m), m / gcd(t, m)];
const text = ([t, m]: F) => (m === 1 ? `${t}` : `${t}/${m}`);
const fr = ([t, m]: F) => `${t}/${m}`;
const inv = ([t, m]: F): F => [m, t];
const mul = (a: F, b: F): F => lowest([a[0] * b[0], a[1] * b[1]]);
/** Chia hai phân số theo SGK: lấy phân số thứ nhất nhân với phân số đảo ngược của phân số thứ hai. */
export const div = (a: F, b: F): F => mul(a, inv(b));
const add = (a: F, b: F): F => lowest([a[0] * b[1] + b[0] * a[1], a[1] * b[1]]);
const sub = (a: F, b: F): F => lowest([a[0] * b[1] - b[0] * a[1], a[1] * b[1]]);

/** Số liệu các câu (đổi so với SGK, trừ chỗ gắn với hình). Test tính lại đáp án bằng nhân chéo, không so với số gõ tay. */
export const daoNguocSpecs: F[] = [[7, 9], [6, 5], [1, 4]];
export const chiaSpecs: [F, F][] = [[[2, 7], [3, 5]], [[5, 6], [2, 3]], [[1, 4], [1, 3]]];
export const soDoSpec = { start: [4, 5] as F, steps: [{ op: "×" as MulOp, f: [3, 8] as F }, { op: ":" as MulOp, f: [9, 10] as F }, { op: ":" as MulOp, f: [2, 9] as F }] };
export const tranhSpec = { area: [15, 4] as F, width: [5, 6] as F };
export const rutGonSpecs: [F, F][] = [[[4, 9], [2, 3]], [[5, 6], [10, 9]], [[3, 8], [9, 4]], [[7, 10], [14, 5]]];
/** Tìm phân số thích hợp: "nhan" là a × ? = c; "chia" là a : ? = c. */
export const timSpecs: { kind: "nhan" | "chia"; a: F; c: F }[] = [
  { kind: "nhan", a: [3, 4], c: [5, 8] },
  { kind: "nhan", a: [2, 3], c: [5, 12] },
  { kind: "chia", a: [1, 6], c: [1, 4] },
  { kind: "chia", a: [3, 5], c: [9, 10] },
];
/** Biểu thức: (a + b) : c và a : b − c. */
export const bieuThucA = { a: [1, 2] as F, b: [1, 6] as F, c: [4, 9] as F };
export const bieuThucB = { a: [5, 6] as F, b: [5, 9] as F, c: [1, 4] as F };
export const sat = { total: [7, 2] as F, piece: [1, 4] as F };
export const soTuNhienSpecs: [F, F][] = [[[3, 1], [2, 5]], [[5, 1], [1, 4]], [[3, 4], [6, 1]], [[2, 5], [3, 1]]];
export const thap = { shadow: [45, 4] as F, times: 3 };
/** Thẻ anh em: hai thẻ là một cặp khi phân số này là đảo ngược của phân số kia (thẻ trên sách tr.94). */
export const theNoiCap: F[][] = [
  [[4, 5], [13, 22], [100, 101], [1, 7]],
  [[8, 59], [14, 3], [6, 91], [5, 14]],
];
export const theTracNghiem = { card: [28, 9] as F, others: [[5, 4], [22, 13], [3, 14]] as F[] };
export const the7 = { card: [7, 1] as F, others: [[7, 7], [1, 1], [7, 2]] as F[] };
export const loiSpec = { a: [2, 3] as F, b: [4, 5] as F, wrong: [6, 5] as F };
export const uocLuongSpec = { a: [3, 4] as F, b: [1, 8] as F };

const nb = (answer: number) => ({ answer });
/** Ô trống cho phân số: kết quả là số tự nhiên thì chỉ một ô. */
const ans = (f: F, head = ""): FillQuestion["parts"] => (f[1] === 1 ? [head, nb(f[0])] : [head, nb(f[0]), "/", nb(f[1])]);
const expr = (a: F, b: F) => `${text(a)} : ${text(b)}`;

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}
function words(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

/** Giải thích chia: đảo ngược phân số thứ hai, nhân, rồi rút gọn nếu cần. */
function explainDiv(a: F, b: F): string {
  const natural = (f: F) => (f[1] === 1 ? `${f[0]} = ${fr(f)}. ` : "");
  const raw: F = [a[0] * b[1], a[1] * b[0]];
  const r = lowest(raw);
  return `${natural(a)}${natural(b)}Phân số đảo ngược của ${fr(b)} là ${fr(inv(b))}. ${fr(a)} : ${fr(b)} = ${fr(a)} × ${fr(inv(b))} = (${a[0]} × ${b[1]})/(${a[1]} × ${b[0]}) = ${fr(raw)}${r[0] === raw[0] && r[1] === raw[1] ? "" : `, rút gọn được ${text(r)}`}.`;
}
const explainMul = (a: F, b: F) => `${fr(a)} × ${fr(b)} = (${a[0]} × ${b[0]})/(${a[1]} × ${b[1]}) = ${text(mul(a, b))}.`;

/** Chuỗi phép nhân, chia liên tiếp: mỗi dòng dùng kết quả của dòng trên. */
function chain(start: F, steps: { op: MulOp; f: F }[]) {
  const lines: WordQuestion["lines"] = [];
  const values: F[] = [start];
  const notes: string[] = [];
  for (const s of steps) {
    const cur = values[values.length - 1];
    const next = s.op === "×" ? mul(cur, s.f) : div(cur, s.f);
    lines.push(ans(next, `${text(cur)} ${s.op} ${text(s.f)} =`));
    notes.push(s.op === "×" ? explainMul(cur, s.f) : explainDiv(cur, s.f));
    values.push(next);
  }
  return { lines, values, explanation: notes.join(" ") };
}

/** Khởi động: kiểm tra đầu vào, không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("wu-1", "Tính (rút gọn kết quả).", ans(mul([3, 5], [2, 3]), "3/5 × 2/3 ="), "Tử số nhân tử số, mẫu số nhân mẫu số, rồi rút gọn.", `${explainMul([3, 5], [2, 3])} (Bài 63)`),
  fill("wu-2", "Viết số tự nhiên thành phân số có mẫu số 1. Số ?", ["4 =", nb(4), "/1"], "Số tự nhiên n bằng n/1.", "4 chia cho 1 bằng 4, nên 4 = 4/1."),
  fill("wu-3", "Rút gọn phân số. Số ?", ["12/18 =", nb(2), "/", nb(3)], "Chia cả tử số và mẫu số cho 6.", "12 : 6 = 2 và 18 : 6 = 3, vậy 12/18 = 2/3. (Bài 56)"),
];

/** Câu thử trong phần Lý thuyết. Không tính vào tiến độ. */
export const quickChecks = {
  daoNguoc: fill("thu-dao-nguoc", "Viết phân số đảo ngược của 3/5. Số ?", ans(inv([3, 5]), ""), "Đổi chỗ tử số và mẫu số.", "Phân số đảo ngược của 3/5 là 5/3. Thử lại: 3/5 × 5/3 = 15/15 = 1."),
  chia: fill("thu-chia", "Tính 3/4 : 2/5 (theo quy tắc: nhân với phân số đảo ngược của phân số thứ hai).", ans(div([3, 4], [2, 5]), "3/4 : 2/5 = 3/4 × 5/2 ="), "Phân số đảo ngược của 2/5 là 5/2. Nhân 3 × 5 và 4 × 2.", explainDiv([3, 4], [2, 5])),
  soTuNhien: fill("thu-so-tu-nhien", "Tính 4 : 2/3 (viết 4 = 4/1 trước).", ans(div([4, 1], [2, 3]), "4 : 2/3 = 4/1 × 3/2 ="), "Phân số đảo ngược của 2/3 là 3/2.", explainDiv([4, 1], [2, 3])),
  chiaSo: fill("thu-chia-so", "Tính 2/5 : 3 (viết 3 = 3/1 trước).", ans(div([2, 5], [3, 1]), "2/5 : 3 = 2/5 × 1/3 ="), "Phân số đảo ngược của 3/1 là 1/3.", explainDiv([2, 5], [3, 1])),
};

const daoNguocGroup: Question[] = [
  ...daoNguocSpecs.map((f, i) =>
    fill(`dn-${i + 1}`, `Viết phân số đảo ngược của ${fr(f)}${f[0] === 1 ? " (kết quả là số tự nhiên thì viết số đó)" : ""}.`, ans(inv(f), `Đảo ngược của ${fr(f)} là`), "Đổi chỗ tử số và mẫu số cho nhau.", `Đổi chỗ tử số và mẫu số: ${fr(f)} thành ${fr(inv(f))}. Thử lại: ${fr(f)} × ${fr(inv(f))} = ${f[0] * f[1]}/${f[0] * f[1]} = 1.`),
  ),
  ...chiaSpecs.map(([a, b], i) => fill(`cd-${i + 1}`, "Tính (rút gọn kết quả nếu được).", ans(div(a, b), `${expr(a, b)} =`), "Giữ phân số thứ nhất, đảo ngược phân số thứ hai, rồi nhân.", explainDiv(a, b))),
  (() => {
    const c = chain(soDoSpec.start, soDoSpec.steps);
    return words("so-do", "Đi theo mũi tên, tính từng ô (kết quả tối giản).", c.lines, "Kết quả của ô trước là số đầu của phép tính kế tiếp. Dấu : là chia, dấu × là nhân.", c.explanation, createElement(SoDoChuoi, soDoSpec));
  })(),
  fill("tranh", `Một bức tranh hình chữ nhật có diện tích ${fr(tranhSpec.area)} dm² và chiều rộng ${fr(tranhSpec.width)} dm. Chiều dài của bức tranh là bao nhiêu đề-xi-mét?`, ans(div(tranhSpec.area, tranhSpec.width), `${expr(tranhSpec.area, tranhSpec.width)} =`), "Chiều dài bằng diện tích chia cho chiều rộng.", explainDiv(tranhSpec.area, tranhSpec.width)),
];

const tinhGroup: Question[] = [
  ...rutGonSpecs.map(([a, b], i) => fill(`rg-${i + 1}`, "Tính rồi rút gọn (kết quả là phân số tối giản).", ans(div(a, b), `${expr(a, b)} =`), "Nhân với phân số đảo ngược, rồi rút gọn.", explainDiv(a, b))),
  ...timSpecs.map((s, i) => {
    const x = s.kind === "nhan" ? div(s.c, s.a) : div(s.a, s.c);
    const eq = s.kind === "nhan" ? `${text(s.a)} × ? = ${text(s.c)}` : `${text(s.a)} : ? = ${text(s.c)}`;
    return fill(
      `tim-${i + 1}`,
      `Tìm phân số thích hợp: ${eq}.`,
      ans(x, "? ="),
      s.kind === "nhan" ? "Một thừa số bằng tích chia cho thừa số kia." : "Số chia bằng số bị chia chia cho thương.",
      s.kind === "nhan" ? `? = ${text(s.c)} : ${text(s.a)}. ${explainDiv(s.c, s.a)}` : `? = ${text(s.a)} : ${text(s.c)}. ${explainDiv(s.a, s.c)}`,
    );
  }),
  (() => {
    const s = add(bieuThucA.a, bieuThucA.b);
    const r = div(s, bieuThucA.c);
    return words("bt-a", `Tính (${text(bieuThucA.a)} + ${text(bieuThucA.b)}) : ${text(bieuThucA.c)}. Làm phép trong ngoặc trước.`, [ans(s, `${text(bieuThucA.a)} + ${text(bieuThucA.b)} =`), ans(r, `${text(s)} : ${text(bieuThucA.c)} =`)], "Tính trong ngoặc trước (quy đồng mẫu số), rồi chia.", `Quy đồng: ${fr(bieuThucA.a)} + ${fr(bieuThucA.b)} = ${text(s)}. ${explainDiv(s, bieuThucA.c)}`);
  })(),
  (() => {
    const q = div(bieuThucB.a, bieuThucB.b);
    const r = sub(q, bieuThucB.c);
    return words("bt-b", `Tính ${text(bieuThucB.a)} : ${text(bieuThucB.b)} − ${text(bieuThucB.c)}. Chia trước, trừ sau.`, [ans(q, `${expr(bieuThucB.a, bieuThucB.b)} =`), ans(r, `${text(q)} − ${text(bieuThucB.c)} =`)], "Phép chia làm trước phép trừ. Phép trừ khác mẫu số thì quy đồng.", `${explainDiv(bieuThucB.a, bieuThucB.b)} Rồi ${text(q)} − ${text(bieuThucB.c)} = ${text(r)}.`);
  })(),
  fill("sat", `Người ta cắt một thanh sắt dài ${fr(sat.total)} m thành các đoạn, mỗi đoạn dài ${fr(sat.piece)} m. Hỏi cắt được bao nhiêu đoạn như vậy?`, ans(div(sat.total, sat.piece), `${expr(sat.total, sat.piece)} =`), "Số đoạn bằng chiều dài thanh sắt chia cho chiều dài mỗi đoạn.", explainDiv(sat.total, sat.piece)),
];

const soTuNhienGroup: Question[] = [
  ...soTuNhienSpecs.map(([a, b], i) => {
    const hint = a[1] === 1 ? "Viết số tự nhiên thành phân số mẫu số 1, rồi nhân với phân số đảo ngược." : "Viết số tự nhiên thành phân số mẫu số 1. Phân số đảo ngược của n/1 là 1/n.";
    return fill(`tn-${i + 1}`, "Tính (theo mẫu, rút gọn kết quả nếu được).", ans(div(a, b), `${expr(a, b)} =`), hint, explainDiv(a, b));
  }),
  fill("thap", `Vào một buổi chiều, người ta đo được chiều dài cái bóng của ngọn tháp là ${fr(thap.shadow)} m. Biết chiều dài cái bóng gấp ${thap.times} lần chiều cao ngọn tháp. Tính chiều cao ngọn tháp (m).`, ans(div(thap.shadow, [thap.times, 1]), `${fr(thap.shadow)} : ${thap.times} =`), "Chiều cao bằng chiều dài cái bóng chia cho số lần.", explainDiv(thap.shadow, [thap.times, 1])),
];

const theGroup: Question[] = [
  ...theNoiCap.map((cards, i): MatchQuestion => ({
    id: `the-${i + 1}`,
    kind: "noi-cap",
    prompt: "Nối mỗi thẻ ở cột trái với thẻ anh em của nó ở cột phải (thẻ anh em: phân số này là phân số đảo ngược của phân số kia).",
    pairs: cards.map((f) => ({ left: fr(f), right: fr(inv(f)) })),
    rightOrder: i === 0 ? [1, 2, 3, 0] : [2, 3, 0, 1],
    hint: "Đổi chỗ tử số và mẫu số của thẻ bên trái.",
    explanation: cards.map((f) => `${fr(f)} và ${fr(inv(f))}`).join("; ") + ".",
  })),
  choice("the-3", `Thẻ ${fr(theTracNghiem.card)} có thẻ anh em là thẻ nào?`, [fr(inv(theTracNghiem.card)), ...theTracNghiem.others.map(fr)], 0, "Đổi chỗ tử số và mẫu số.", `Đảo ngược của ${fr(theTracNghiem.card)} là ${fr(inv(theTracNghiem.card))}.`),
  choice("the-4", `Thẻ ${fr(the7.card)} (số tự nhiên 7 viết thành phân số) có thẻ anh em là thẻ nào?`, [...the7.others.map(fr).slice(0, 1), fr(inv(the7.card)), ...the7.others.map(fr).slice(1)], 1, "Đổi chỗ tử số và mẫu số của 7/1.", `Đảo ngược của 7/1 là 1/7. Thử lại: 7/1 × 1/7 = 7/7 = 1.`),
];

const suyNghi: Question[] = [
  choice(
    "sn-1",
    `Bình tính ${expr(loiSpec.a, loiSpec.b)} = ${fr(inv(loiSpec.a))} × ${fr(loiSpec.b)} = ${fr(loiSpec.wrong)}. Bình sai ở đâu?`,
    ["Bình đảo ngược phân số thứ nhất, phải đảo ngược phân số thứ hai", "Bình tính đúng", "Phải đảo ngược cả hai phân số"],
    0,
    "Quy tắc: giữ phân số thứ nhất, đảo ngược phân số thứ hai.",
    `Bình đảo ngược nhầm phân số. ${explainDiv(loiSpec.a, loiSpec.b)}`,
  ),
  (() => {
    const r = div(uocLuongSpec.a, uocLuongSpec.b);
    const more = r[0] * uocLuongSpec.a[1] > uocLuongSpec.a[0] * r[1];
    return choice("sn-2", `Chưa tính, ước lượng (vượt SGK): ${expr(uocLuongSpec.a, uocLuongSpec.b)} so với ${fr(uocLuongSpec.a)} thì thế nào?`, ["Lớn hơn", "Bằng", "Bé hơn"], more ? 0 : 1, "Một đoạn 1/8 m ngắn hơn 1 m, nên cắt ra được nhiều đoạn.", `Chia cho phân số bé hơn 1 thì kết quả lớn hơn số bị chia. ${explainDiv(uocLuongSpec.a, uocLuongSpec.b)}`);
  })(),
  fill("sn-3", "Phân số đảo ngược của số tự nhiên 12 (vượt SGK). Số ?", ans(inv([12, 1]), "12 = 12/1, phân số đảo ngược là"), "Viết 12 thành 12/1 rồi đổi chỗ tử số và mẫu số.", "12 = 12/1, đảo ngược là 1/12. Thử lại: 12 × 1/12 = 1. Phân số đảo ngược của số tự nhiên n (khác 0) là 1/n."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "dao-nguoc", title: "Phân số đảo ngược và chia hai phân số", questions: daoNguocGroup },
  { id: "tinh", title: "Tính, tìm phân số thích hợp, bài toán", questions: tinhGroup },
  { id: "so-tu-nhien", title: "Chia số tự nhiên và phân số", questions: soTuNhienGroup },
  { id: "the-anh-em", title: "Tìm cặp thẻ anh em", questions: theGroup },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
