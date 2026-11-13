import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { createElement } from "react";
import { TamBia } from "./_illustrations/hinh";

/** Phân số [tử số, mẫu số]. Số tự nhiên n viết [n, 1]. */
export type F = [number, number];

export const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
export const lowest = ([t, m]: F): F => [t / gcd(t, m), m / gcd(t, m)];
const text = ([t, m]: F) => (m === 1 ? `${t}` : `${t}/${m}`);
const fr = ([t, m]: F) => `${t}/${m}`;
const inv = ([t, m]: F): F => [m, t];
export const mul = (a: F, b: F): F => lowest([a[0] * b[0], a[1] * b[1]]);
export const div = (a: F, b: F): F => mul(a, inv(b));
export const add = (a: F, b: F): F => lowest([a[0] * b[1] + b[0] * a[1], a[1] * b[1]]);
export const sub = (a: F, b: F): F => lowest([a[0] * b[1] - b[0] * a[1], a[1] * b[1]]);
const nat = (n: number): F => [n, 1];
const NB = " ";
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NB);

/** Số liệu các câu (đổi so với SGK). Test tính lại đáp án bằng nhân chéo, không so với số gõ tay. */
// Cộng, trừ (Bài 57, 60, 61, 62).
export const congTruSpecs: { op: "+" | "−"; a: F; b: F }[] = [
  { op: "+", a: [5, 12], b: [7, 4] },
  { op: "+", a: [4, 1], b: [3, 10] },
  { op: "−", a: [17, 20], b: [3, 5] },
  { op: "−", a: [41, 15], b: [1, 1] },
];
// Nhân, chia (Bài 63, 64).
export const nhanChiaSpecs: { op: "×" | ":"; a: F; b: F }[] = [
  { op: "×", a: [3, 8], b: [4, 9] },
  { op: "×", a: [10, 21], b: [3, 1] },
  { op: ":", a: [18, 11], b: [6, 11] },
  { op: ":", a: [28, 3], b: [7, 1] },
];
// Biểu thức (SGK tr.110 LT2, tr.111 LT2).
/** a + b − c */
export const bieuThucA = { a: [7, 9] as F, b: [4, 9] as F, c: [5, 18] as F };
/** n − a + b */
export const bieuThucB = { n: 2, a: [3, 4] as F, b: [5, 12] as F };
/** a − (b − c) */
export const bieuThucC = { a: [11, 6] as F, b: [5, 6] as F, c: [7, 18] as F };
/** x + n × y, phân số x chưa tối giản. */
export const bieuThucD = { x: [18, 48] as F, n: 6, y: [1, 8] as F };
/** p × (n : q), p chưa tối giản. */
export const bieuThucE = { p: [14, 6] as F, n: 8, q: [16, 3] as F };
// Bài toán lời văn.
export const khuDat = { nha: [1, 3] as F, cay: [1, 4] as F };
export const tienNam = { total: 600000, spend: [2, 5] as F };
/** Tấm bìa: diện tích và chiều rộng. */
export const tamBia = { area: [9, 20] as F, width: [3, 5] as F };
// Tính thuận tiện.
/** a × b × (1/a) × n */
export const thuanTienA = { a: [4, 7] as F, b: [9, 5] as F, n: 5 };
/** (p × a) + (b × p) với a + b = 1 */
export const thuanTienB = { p: [5, 6] as F, a: [2, 9] as F, b: [7, 9] as F };
/** x + y + z − n, với y + z = n */
export const thuanTienC = { x: [5, 18] as F, y: [7, 6] as F, z: [11, 6] as F, n: 3 };
// Đố em: viết phân số thành tổng hai phân số có tử số 1, mẫu khác nhau.
export const doEm: { target: F; options: string[]; answer: string }[] = [
  { target: [5, 6], options: ["1/3 + 1/3", "1/2 + 1/3", "1/4 + 1/2", "1/5 + 1/6"], answer: "1/2 + 1/3" },
  { target: [7, 12], options: ["1/6 + 1/6", "1/4 + 1/4", "1/3 + 1/4", "1/5 + 1/7"], answer: "1/3 + 1/4" },
];
// Suy nghĩ thêm: các phép tính sai.
export const loiSai = {
  congTuMau: { a: [2, 5] as F, b: [3, 7] as F, saiKetQua: [5, 12] as F },
  nhanQuyDong: { a: [2, 3] as F, b: [3, 4] as F },
  chiaNguoc: { a: [2, 3] as F, b: [4, 5] as F },
  quenRutGon: { a: [6, 8] as F, b: [4, 9] as F },
};

const nb = (answer: number) => ({ answer });
/** Ô trống cho phân số: kết quả là số tự nhiên thì chỉ một ô. */
const ans = (f: F, head = "", tail = ""): FillQuestion["parts"] => (f[1] === 1 ? [head, nb(f[0]), tail] : [head, nb(f[0]), "/", nb(f[1]), tail]);

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}
function words(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

function explainMul(a: F, b: F): string {
  const raw: F = [a[0] * b[0], a[1] * b[1]];
  const r = lowest(raw);
  return `${text(a)} × ${text(b)} = (${a[0]} × ${b[0]})/(${a[1]} × ${b[1]}) = ${fr(raw)}${r[0] === raw[0] && r[1] === raw[1] ? "" : ` = ${text(r)}`}.`;
}
function explainDiv(a: F, b: F): string {
  return `${text(a)} : ${text(b)} = ${text(a)} × ${fr(inv(b))}. ${explainMul(a, inv(b))}`;
}
function explainAddSub(op: "+" | "−", a: F, b: F): string {
  const m = (a[1] * b[1]) / gcd(a[1], b[1]);
  const x = (a[0] * m) / a[1];
  const y = (b[0] * m) / b[1];
  const raw: F = [op === "+" ? x + y : x - y, m];
  const r = lowest(raw);
  return `Quy đồng mẫu số ${m}: ${text(a)} = ${x}/${m}, ${text(b)} = ${y}/${m}. ${x}/${m} ${op} ${y}/${m} = ${fr(raw)}${r[0] === raw[0] && r[1] === raw[1] ? "" : ` = ${text(r)}`}.`;
}
const calc = (op: "+" | "−" | "×" | ":", a: F, b: F) => (op === "+" ? add(a, b) : op === "−" ? sub(a, b) : op === "×" ? mul(a, b) : div(a, b));

/** Câu thử trong phần Nhắc lại nhanh, cũng là kiểm tra đầu vào. Không tính vào tiến độ. */
export const quickChecks = {
  rutGon: fill("thu-rut-gon", "Rút gọn phân số. Số ?", ["18/48 =", nb(3), "/", nb(8)], "Chia cả tử số và mẫu số cho cùng một số (ở đây là 6).", "18 : 6 = 3 và 48 : 6 = 8, nên 18/48 = 3/8. Phân số 3/8 đã tối giản."),
  cong: fill("thu-cong", "Tính (rút gọn kết quả).", ans(add([3, 4], [1, 6]), "3/4 + 1/6 ="), "Khác mẫu số thì quy đồng trước: mẫu số chung là 12.", explainAddSub("+", [3, 4], [1, 6])),
  tru: fill("thu-tru", "Tính (rút gọn kết quả).", ans(sub([5, 6], [1, 4]), "5/6 − 1/4 ="), "Quy đồng mẫu số rồi trừ hai tử số, giữ nguyên mẫu số.", explainAddSub("−", [5, 6], [1, 4])),
  soTuNhien: fill("thu-so-tu-nhien", "Viết số tự nhiên thành phân số cùng mẫu số rồi cộng. Số ?", ["2 + 3/5 = 10/5 + 3/5 =", nb(13), "/", nb(5)], "2 = 10/5 vì 2 × 5 = 10.", "2 = 10/5. Vậy 2 + 3/5 = 10/5 + 3/5 = 13/5. Kết quả lớn hơn 1 vẫn viết dạng phân số."),
  nhan: fill("thu-nhan", "Tính (rút gọn kết quả).", ans(mul([2, 3], [9, 10]), "2/3 × 9/10 ="), "Nhân tử số với tử số, mẫu số với mẫu số. Rút gọn khi có thể.", explainMul([2, 3], [9, 10])),
  chia: fill("thu-chia", "Tính (kết quả viết dưới dạng phân số).", ans(div([3, 5], [9, 10]), "3/5 : 9/10 ="), "Giữ nguyên phân số thứ nhất, nhân với phân số đảo ngược của phân số thứ hai.", explainDiv([3, 5], [9, 10])),
  chiaSoTuNhien: fill("thu-chia-so-tu-nhien", "Số tự nhiên n viết thành n/1. Số ?", ["24/5 : 6 = 24/5 × 1/6 =", nb(4), "/", nb(5)], "6 = 6/1, phân số đảo ngược của 6/1 là 1/6.", "24/5 × 1/6 = 24/30 = 4/5. Chia một phân số cho số tự nhiên: mẫu số nhân với số đó."),
  thuTu: fill("thu-thu-tu", "Tính 1/2 + 3/4 × 2/3. Nhân trước, cộng sau.", ["3/4 × 2/3 =", nb(1), "/", nb(2), "; 1/2 + 1/2 =", nb(1)], "Biểu thức có nhân và cộng thì làm phép nhân trước.", "3/4 × 2/3 = 6/12 = 1/2. Rồi 1/2 + 1/2 = 1."),
};

const congTruGroup: Question[] = congTruSpecs.map(({ op, a, b }, i) =>
  fill(`ct-${i + 1}`, "Tính (rút gọn kết quả nếu được).", ans(calc(op, a, b), `${text(a)} ${op} ${text(b)} =`), a[1] === 1 || b[1] === 1 ? "Viết số tự nhiên thành phân số có cùng mẫu số với phân số còn lại, rồi cộng hoặc trừ." : "Khác mẫu số thì quy đồng trước. Rồi cộng hoặc trừ hai tử số, giữ nguyên mẫu số.", a[1] === 1 || b[1] === 1 ? `${explainAddSub(op, a, b)} Kết quả lớn hơn 1 vẫn viết dạng phân số.` : explainAddSub(op, a, b)),
);

const nhanChiaGroup: Question[] = nhanChiaSpecs.map(({ op, a, b }, i) =>
  fill(`nc-${i + 1}`, "Tính (rút gọn kết quả nếu được).", ans(calc(op, a, b), `${text(a)} ${op} ${text(b)} =`), op === "×" ? "Nhân tử số với tử số, mẫu số với mẫu số. Số tự nhiên n viết thành n/1." : "Giữ phân số thứ nhất, nhân với phân số đảo ngược của phân số thứ hai. Số tự nhiên n viết thành n/1.", op === "×" ? explainMul(a, b) : explainDiv(a, b)),
);

const bieuThucGroup: Question[] = [
  (() => {
    const { a, b, c } = bieuThucA;
    const s = add(a, b);
    const r = sub(s, c);
    return words("bt-a", `Tính giá trị của biểu thức ${fr(a)} + ${fr(b)} − ${fr(c)}. Làm từ trái sang phải.`, [ans(s, `${fr(a)} + ${fr(b)} =`), ans(r, `${text(s)} − ${fr(c)} =`)], "Cộng hai phân số cùng mẫu số trước, rồi trừ. Phép trừ khác mẫu số thì quy đồng.", `${fr(a)} + ${fr(b)} = ${text(s)}. ${explainAddSub("−", s, c)}`);
  })(),
  (() => {
    const { n, a, b } = bieuThucB;
    const t = sub(nat(n), a);
    const r = add(t, b);
    return words("bt-b", `Tính giá trị của biểu thức ${n} − ${fr(a)} + ${fr(b)}. Làm từ trái sang phải.`, [ans(t, `${n} − ${fr(a)} =`), ans(r, `${text(t)} + ${fr(b)} =`)], "Viết 2 thành phân số có mẫu số 4: 2 = 8/4. Rồi làm từ trái sang phải.", `${explainAddSub("−", nat(n), a)} ${explainAddSub("+", t, b)}`);
  })(),
  (() => {
    const { a, b, c } = bieuThucC;
    const t = sub(b, c);
    const r = sub(a, t);
    return words("bt-c", `Tính giá trị của biểu thức ${fr(a)} − (${fr(b)} − ${fr(c)}). Trong ngoặc trước.`, [ans(t, `${fr(b)} − ${fr(c)} =`), ans(r, `${fr(a)} − ${text(t)} =`)], "Tính phần trong ngoặc trước, rồi lấy phân số đầu trừ đi kết quả đó.", `${explainAddSub("−", b, c)} ${explainAddSub("−", a, t)}`);
  })(),
  (() => {
    const { x, n, y } = bieuThucD;
    const rx = lowest(x);
    const p = mul(nat(n), y);
    const r = add(rx, p);
    return words("bt-d", `Rút gọn rồi tính giá trị của biểu thức ${fr(x)} + ${n} × ${fr(y)}. Nhân trước, cộng sau.`, [ans(rx, `${fr(x)} =`), ans(p, `${n} × ${fr(y)} =`), ans(r, `${text(rx)} + ${text(p)} =`)], "Rút gọn phân số trước. Phép nhân làm trước phép cộng.", `${fr(x)} = ${text(rx)}. ${explainMul(nat(n), y)} ${explainAddSub("+", rx, p)}`);
  })(),
  (() => {
    const { p, n, q } = bieuThucE;
    const rp = lowest(p);
    const t = div(nat(n), q);
    const r = mul(rp, t);
    return words("bt-e", `Rút gọn rồi tính giá trị của biểu thức ${fr(p)} × (${n} : ${fr(q)}). Trong ngoặc trước.`, [ans(rp, `${fr(p)} =`), ans(t, `${n} : ${fr(q)} =`), ans(r, `${text(rp)} × ${text(t)} =`)], "Rút gọn phân số đầu. Tính phép chia trong ngoặc, rồi nhân.", `${fr(p)} = ${text(rp)}. ${explainDiv(nat(n), q)} ${explainMul(rp, t)}`);
  })(),
];

const loiVanGroup: Question[] = [
  (() => {
    const { nha, cay } = khuDat;
    const used = add(nha, cay);
    const left = sub(nat(1), used);
    return words("dat", `Bác Tư có một khu đất. Bác dùng ${fr(nha)} diện tích để xây nhà và ${fr(cay)} diện tích để trồng cây, phần còn lại làm sân và lối đi. Hỏi bác dành bao nhiêu phần diện tích khu đất để làm sân và lối đi?`, [ans(used, `${fr(nha)} + ${fr(cay)} =`, "(nhà và cây)"), ans(left, `1 − ${text(used)} =`, "(sân và lối đi)")], "Cả khu đất là 1. Cộng hai phần đã dùng, rồi lấy 1 trừ đi.", `${explainAddSub("+", nha, cay)} Phần còn lại: 1 − ${text(used)} = ${fr([used[1], used[1]])} − ${text(used)} = ${text(left)} khu đất.`);
  })(),
  (() => {
    const spent = mul(nat(tienNam.total), tienNam.spend);
    const left = sub(nat(tienNam.total), spent);
    return words("tien", `Nam có ${fmt(tienNam.total)} đồng tiền tiết kiệm. Nam dùng ${fr(tienNam.spend)} số tiền đó để mua sách vở, số tiền còn lại Nam góp vào quỹ giúp đỡ các bạn khó khăn. Hỏi Nam góp bao nhiêu đồng?`, [ans(spent, `${fmt(tienNam.total)} × ${fr(tienNam.spend)} =`, "đồng mua sách vở"), ans(left, `${fmt(tienNam.total)} − ${fmt(spent[0])} =`, "đồng góp quỹ")], "Tìm số tiền mua sách vở bằng cách nhân số tiền với phân số. Rồi lấy cả số tiền trừ đi.", `${fmt(tienNam.total)} × ${fr(tienNam.spend)} = ${fmt(spent[0])} đồng. Còn lại ${fmt(tienNam.total)} − ${fmt(spent[0])} = ${fmt(left[0])} đồng. Cách khác: còn lại là ${text(sub(nat(1), tienNam.spend))} số tiền.`);
  })(),
  (() => {
    const length = div(tamBia.area, tamBia.width);
    const half = add(length, tamBia.width);
    const p = mul(half, nat(2));
    return words("bia", `Một tấm bìa hình chữ nhật có diện tích ${fr(tamBia.area)} m² và chiều rộng ${fr(tamBia.width)} m. Tính chu vi của tấm bìa đó.`, [ans(length, `Chiều dài = ${fr(tamBia.area)} : ${fr(tamBia.width)} =`, "m"), ans(half, `Nửa chu vi = ${text(length)} + ${fr(tamBia.width)} =`, "m"), ans(p, `Chu vi = ${text(half)} × 2 =`, "m")], "Diện tích = dài × rộng, nên dài = diện tích : rộng. Chu vi = (dài + rộng) × 2.", `${explainDiv(tamBia.area, tamBia.width)} ${explainAddSub("+", length, tamBia.width)} Chu vi: ${explainMul(half, nat(2))}`, createElement(TamBia, { area: fr(tamBia.area), width: fr(tamBia.width) }));
  })(),
];

const thuanTienGroup: Question[] = [
  (() => {
    const { a, b, n } = thuanTienA;
    const r = mul(mul(mul(a, b), inv(a)), nat(n));
    return fill("tt-1", "Tính bằng cách thuận tiện.", ans(r, `${fr(a)} × ${fr(b)} × ${fr(inv(a))} × ${n} =`), "Đổi chỗ các thừa số: 4/7 × 7/4 = 1, và 9/5 × 5 = 9.", `Đổi chỗ: (${fr(a)} × ${fr(inv(a))}) × (${fr(b)} × ${n}). Vì ${fr(a)} × ${fr(inv(a))} = 1 và ${fr(b)} × ${n} = ${text(mul(b, nat(n)))} nên kết quả là ${text(r)}.`);
  })(),
  (() => {
    const { p, a, b } = thuanTienB;
    const r = mul(p, add(a, b));
    return fill("tt-2", "Tính bằng cách thuận tiện.", ans(r, `${fr(p)} × ${fr(a)} + ${fr(b)} × ${fr(p)} =`), "Hai tích cùng có thừa số 5/6. Dùng tính chất: p × a + b × p = (a + b) × p.", `(${fr(a)} + ${fr(b)}) × ${fr(p)} = ${text(add(a, b))} × ${fr(p)} = ${text(r)}.`);
  })(),
  (() => {
    const { x, y, z, n } = thuanTienC;
    const r = sub(add(x, add(y, z)), nat(n));
    return fill("tt-3", "Tính bằng cách thuận tiện.", ans(r, `${fr(x)} + ${fr(y)} + ${fr(z)} − ${n} =`), "Hai phân số 7/6 và 11/6 cùng mẫu số, cộng lại được số tự nhiên. Rồi trừ 3.", `${fr(x)} + (${fr(y)} + ${fr(z)}) − ${n} = ${fr(x)} + ${text(add(y, z))} − ${n} = ${text(r)}.`);
  })(),
  ...doEm.map(({ target, options, answer }, i) =>
    choice(`do-em-${i + 1}`, `Đố em: viết phân số ${fr(target)} thành tổng của hai phân số có tử số là 1 và mẫu số khác nhau.`, options.map((o) => `${fr(target)} = ${o}`), options.indexOf(answer), "Thử cộng từng cặp phân số có tử số 1. Quy đồng mẫu số rồi xem tổng có bằng phân số đã cho không.", `${answer}: quy đồng mẫu số rồi cộng được ${text(options[options.indexOf(answer)].split(" + ").map((x) => x.split("/").map(Number) as F).reduce(add))}. Vậy ${fr(target)} = ${answer}. Các cách khác không cho tổng ${fr(target)}, hoặc có hai mẫu số bằng nhau.`),
  ),
];

const suyNghi: Question[] = [
  (() => {
    const { a, b, saiKetQua } = loiSai.congTuMau;
    return choice("sn-1", `Vượt SGK, tìm lỗi sai. Nam tính ${fr(a)} + ${fr(b)} = ${fr(saiKetQua)} (cộng tử với tử, mẫu với mẫu). Nam sai ở đâu?`, ["Khác mẫu số phải quy đồng rồi mới cộng, không cộng mẫu số", "Nam tính đúng", "Phải nhân hai phân số với nhau"], 0, "Thử so sánh: 2/5 và 3/7 đều gần 1/2, tổng phải gần 1. Kết quả 5/12 bé hơn 1/2 thì có đúng không?", `Cộng phân số thì giữ mẫu số chung, không cộng mẫu số. ${explainAddSub("+", a, b)} Kết quả đúng là ${text(add(a, b))}. Kết quả của Nam là 5/12 còn bé hơn riêng ${fr(b)}, mà tổng không thể bé hơn một số hạng.`);
  })(),
  (() => {
    const { a, b } = loiSai.nhanQuyDong;
    const m = a[1] * b[1];
    return choice("sn-2", `Vượt SGK, tìm lỗi sai. Hà tính ${fr(a)} × ${fr(b)}: quy đồng được ${(a[0] * b[1])}/${m} × ${(b[0] * a[1])}/${m}, giữ mẫu số ${m} và nhân tử số: ${(a[0] * b[1]) * (b[0] * a[1])}/${m}. Hà sai ở đâu?`, ["Nhân phân số không cần quy đồng, chỉ cần tử nhân tử, mẫu nhân mẫu", "Hà tính đúng", "Phải cộng hai tử số"], 0, "Khi nhân, ta có quy đồng mẫu số không?", `Quy đồng chỉ dùng khi cộng, trừ, so sánh. Nhân: ${explainMul(a, b)} Kết quả của Hà là ${(a[0] * b[1]) * (b[0] * a[1])}/${m}, lớn hơn 1, vô lý vì cả hai thừa số đều bé hơn 1.`);
  })(),
  (() => {
    const { a, b } = loiSai.chiaNguoc;
    return choice("sn-3", `Vượt SGK, tìm lỗi sai. Bình tính ${fr(a)} : ${fr(b)} = ${fr(inv(a))} × ${fr(b)} = ${text(mul(inv(a), b))}. Bình sai ở đâu?`, ["Phải đảo ngược phân số thứ hai (số chia), không phải phân số thứ nhất", "Bình tính đúng", "Phải đảo ngược cả hai phân số"], 0, "Giữ nguyên phân số nào, đảo ngược phân số nào?", `Giữ nguyên số bị chia, đảo ngược số chia. ${explainDiv(a, b)}`);
  })(),
  (() => {
    const { a, b } = loiSai.quenRutGon;
    const raw: F = [a[0] * b[0], a[1] * b[1]];
    return choice("sn-4", `Vượt SGK, tìm lỗi sai. Tuấn tính ${fr(a)} × ${fr(b)} = ${fr(raw)} rồi dừng lại. Bài của Tuấn còn thiếu gì?`, [`${fr(raw)} chưa tối giản, phải rút gọn thành ${text(lowest(raw))}`, "Bài đã xong", "Phải nhân thêm với 2"], 0, "Kiểm tra xem tử số và mẫu số của kết quả còn chia hết cho số nào chung không.", `${fr(raw)} còn rút gọn được: chia tử và mẫu cho ${gcd(raw[0], raw[1])} được ${text(lowest(raw))}. ${explainMul(a, b)}`);
  })(),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "cong-tru", title: "Cộng, trừ phân số (Bài 60, 61, 62)", questions: congTruGroup },
  { id: "nhan-chia", title: "Nhân, chia phân số (Bài 63, 64, 66)", questions: nhanChiaGroup },
  { id: "bieu-thuc", title: "Tính giá trị biểu thức", questions: bieuThucGroup },
  { id: "loi-van", title: "Bài toán có lời văn", questions: loiVanGroup },
  { id: "thuan-tien", title: "Tính thuận tiện và đố em", questions: thuanTienGroup },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
