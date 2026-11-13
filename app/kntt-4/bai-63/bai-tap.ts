import type { ChoiceQuestion, CompareQuestion, ExerciseGroup, FillQuestion, Part, Question, Sign, WordQuestion } from "@/components/exercises/types";
import { createElement } from "react";
import { Tre } from "./_illustrations/tre";

/** Phân số [tử số, mẫu số]. Số tự nhiên n là [n, 1]. */
export type P = [number, number];
const f = ([a, b]: P) => (b === 1 ? `${a}` : `${a}/${b}`);
const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
export const rutGon = ([a, b]: P): P => {
  const g = gcd(a, b);
  return [a / g, b / g];
};
const mul = (a: P, b: P): P => [a[0] * b[0], a[1] * b[1]];
const prod = (fs: P[]): P => fs.reduce(mul, [1, 1] as P);
/** Tổng các phân số mà mẫu số lớn nhất chia hết các mẫu số còn lại (như SGK). */
const tong = (terms: P[]): P => {
  const m = Math.max(...terms.map(([, b]) => b));
  return [terms.reduce((s, [a, b]) => s + a * (m / b), 0), m];
};

const fill = (id: string, prompt: string, parts: Part[], hint: string, explanation: string): FillQuestion => ({ id, kind: "dien-so", prompt, parts, hint, explanation });
const words = (id: string, prompt: string, lines: Part[][], hint: string, explanation: string, illustration?: WordQuestion["illustration"]): WordQuestion => ({ id, kind: "loi-van", prompt, lines, hint, explanation, illustration });
const choice = (id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion => ({ id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration });

/** Dòng kết quả: tích chưa rút gọn, rồi dòng rút gọn nếu rút gọn được. Hai ô (hoặc một ô nếu kết quả là số tự nhiên) cuối cùng là kết quả cuối. */
const ketQua = ([t, m]: P, head: string): { lines: Part[][]; text: string } => {
  const [r, s] = rutGon([t, m]);
  const lines: Part[][] = [[head, { answer: t }, "/", { answer: m }]];
  if (s === m) return { lines, text: `${t}/${m}` };
  lines.push(s === 1 ? [`${t}/${m} rút gọn được: ${t}/${m} =`, { answer: r }] : [`${t}/${m} rút gọn được: ${t}/${m} =`, { answer: r }, "/", { answer: s }]);
  return { lines, text: `${t}/${m} = ${f([r, s])}` };
};

export type MulSpec = { id: string; factors: P[]; /** Rút gọn từng phân số trước khi nhân (Hoạt động 2). */ truoc?: boolean };

/** Nhóm 1 (trang 87): Hoạt động 1 và 2, đổi số. Rồi hai câu nhân xong mới rút gọn (trang 90). */
const hd1: MulSpec[] = [
  { id: "h1-1", factors: [[3, 7], [2, 5]] },
  { id: "h1-2", factors: [[1, 4], [7, 9]] },
  { id: "h1-3", factors: [[1, 5], [1, 8]] },
];
const hd2: MulSpec[] = [
  { id: "h2-1", factors: [[4, 6], [7, 5]], truoc: true },
  { id: "h2-2", factors: [[11, 8], [3, 9]], truoc: true },
  { id: "h2-3", factors: [[2, 6], [3, 12]], truoc: true },
];
const nr: MulSpec[] = [
  { id: "nr-1", factors: [[4, 9], [3, 8]] },
  { id: "nr-2", factors: [[7, 10], [5, 14]] },
];
/** Nhóm 2 (trang 87, 88, 90): với số tự nhiên, gồm ×1 và ×0. */
const stn: MulSpec[] = [
  { id: "n-1", factors: [[5, 7], [4, 1]] },
  { id: "n-2", factors: [[3, 8], [1, 1]] },
  { id: "n-3", factors: [[12, 5], [0, 1]] },
  { id: "n-4", factors: [[4, 1], [3, 7]] },
  { id: "n-5", factors: [[1, 1], [5, 6]] },
  { id: "n-6", factors: [[0, 1], [2, 9]] },
  { id: "n-7", factors: [[6, 1], [5, 8]] },
  { id: "n-8", factors: [[9, 1], [4, 15]] },
];
/** Trang 89: nhân ba thừa số, có một thừa số là số tự nhiên bằng mẫu số. */
const ba: MulSpec = { id: "b-1", factors: [[5, 18], [3, 7], [18, 1]] };
export const mulSpecs: MulSpec[] = [...hd1, ...hd2, ...nr, ...stn, ba];

const buildMul = ({ id, factors, truoc }: MulSpec): WordQuestion => {
  const expr = factors.map(f).join(" × ");
  const hasInt = factors.some(([, b]) => b === 1);
  if (truoc) {
    const [a, b] = factors;
    const [x, y] = [rutGon(a), rutGon(b)];
    const k = ketQua(mul(x, y), `${f(x)} × ${f(y)} = (${x[0]} × ${y[0]})/(${x[1]} × ${y[1]}) =`);
    return words(id, `Rút gọn rồi tính: ${expr}.`, [[`${f(a)} =`, { answer: x[0] }, "/", { answer: x[1] }, `; ${f(b)} =`, { answer: y[0] }, "/", { answer: y[1] }], ...k.lines], "Rút gọn từng phân số trước (chia cả tử số và mẫu số cho cùng một số), rồi nhân tử số với tử số, mẫu số với mẫu số.", `${f(a)} = ${f(x)} và ${f(b)} = ${f(y)}. Nhân: ${expr.replace(f(a), f(x)).replace(f(b), f(y))} = ${k.text}.`);
  }
  const nums = factors.map(([a]) => a).join(" × ");
  const dens = factors.map(([, b]) => b).join(" × ");
  const k = ketQua(prod(factors), `${expr} = (${nums})/(${dens}) =`);
  const hint = hasInt ? "Viết số tự nhiên thành phân số có mẫu số 1 (ví dụ 3 = 3/1). Tử số nhân tử số, mẫu số nhân mẫu số." : "Tử số nhân với tử số, mẫu số nhân với mẫu số. Nếu kết quả rút gọn được thì rút gọn.";
  return words(id, `Tính: ${expr}.`, k.lines, hint, `${expr} = (${nums})/(${dens}) = ${k.text}.`);
};

/** Nhân hai phân số tại chỗ, dùng cho `ngoac` và `thuan tien`. */
const tinhNgoac = ({ id, x, y, c }: { id: string; x: P; y: P; c: P }): WordQuestion => {
  const [t, m] = tong([x, y]);
  const k = ketQua(mul([t, m], c), `${t}/${m} × ${f(c)} = (${t} × ${c[0]})/(${m} × ${c[1]}) =`);
  return words(id, `Tính: (${f(x)} + ${f(y)}) × ${f(c)}.`, [[`Trong ngoặc: ${f(x)} + ${f(y)} =`, { answer: t }, "/", { answer: m }], ...k.lines], "Tính phần trong ngoặc trước (quy đồng nếu cần), rồi nhân với phân số còn lại.", `${f(x)} + ${f(y)} = ${t}/${m}. ${t}/${m} × ${f(c)} = ${k.text}.`);
};
export const ngoac = { id: "ng-1", x: [1, 2] as P, y: [1, 4] as P, c: [4, 9] as P };

/** Tính thuận tiện (trang 90): a × c + b × c = (a + b) × c, a và b cùng mẫu số. `trai` nghĩa là thừa số chung đứng bên trái. */
export const thuanTien = [
  { id: "tt-1", x: [7, 9] as P, y: [2, 9] as P, c: [4, 13] as P, trai: false },
  { id: "tt-2", x: [3, 8] as P, y: [5, 8] as P, c: [5, 11] as P, trai: true },
];
const buildTT = ({ id, x, y, c, trai }: (typeof thuanTien)[number]) => {
  const side = (p: P) => (trai ? `${f(c)} × ${f(p)}` : `${f(p)} × ${f(c)}`);
  const [t, m] = tong([x, y]);
  const final = rutGon(mul([t, m], c));
  return words(id, `Tính bằng cách thuận tiện: ${side(x)} + ${side(y)}.`, [[`Tổng hai phân số có chung thừa số: ${f(x)} + ${f(y)} =`, { answer: t }, "/", { answer: m }], [`${t}/${m} = 1, nên kết quả bằng thừa số chung:`, { answer: final[0] }, "/", { answer: final[1] }]], "Hai tích có chung một thừa số. Gộp lại: (a + b) × c. Cộng hai phân số cùng mẫu số trước.", `${side(x)} + ${side(y)} = (${f(x)} + ${f(y)}) × ${f(c)} = ${t}/${m} × ${f(c)} = ${f(c)}.`);
};

/** Các bài toán lời văn và hình học: chỉ chứa dữ kiện, đáp án do code tính. */
export const stories = {
  nhom: { dai: [5, 6] as P, rong: [3, 7] as P },
  vuong: { canh: [4, 9] as P },
  tau: { vong: 8, moi: [15, 4] as P },
  be: { dai: [17, 2] as P, rong: [9, 2] as P },
  lon: { chuong: 2, con: 6, an: [1, 4] as P },
  xe: { dai: [9, 2] as P, rong: [5, 2] as P, so: 3 },
  hiep: { n: 6, a: [1, 3] as P, b: [1, 6] as P },
};

const buildNhom = () => {
  const { dai, rong } = stories.nhom;
  const k = ketQua(mul(dai, rong), `${f(dai)} × ${f(rong)} = (${dai[0]} × ${rong[0]})/(${dai[1]} × ${rong[1]}) =`);
  return words("nhom", `Một tấm nhôm hình chữ nhật có chiều dài ${f(dai)} m và chiều rộng ${f(rong)} m. Tính diện tích tấm nhôm (m²).`, k.lines, "Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.", `Diện tích: ${f(dai)} × ${f(rong)} = ${k.text} (m²).`);
};
const buildVuong = () => {
  const { canh } = stories.vuong;
  const k = ketQua(mul([4, 1], canh), `Chu vi = 4 × ${f(canh)} = (4 × ${canh[0]})/(1 × ${canh[1]}) =`);
  return words("vuong", `Tính chu vi của hình vuông có cạnh ${f(canh)} dm.`, k.lines, "Chu vi hình vuông bằng cạnh nhân 4. Viết 4 = 4/1.", `Chu vi: 4 × ${f(canh)} = ${k.text} (dm).`);
};
const buildTau = () => {
  const { vong, moi } = stories.tau;
  const k = ketQua(mul([vong, 1], moi), `${vong} × ${f(moi)} = (${vong} × ${moi[0]})/(1 × ${moi[1]}) =`);
  return words("tau", `Một tàu vũ trụ bay vòng quanh một thiên thể ${vong} vòng rồi mới đáp xuống. Mỗi vòng tàu bay được ${f(moi)} km. Hỏi tàu đã bay tất cả bao nhiêu ki-lô-mét?`, k.lines, "Số vòng nhân với quãng đường mỗi vòng.", `${vong} × ${f(moi)} = ${k.text} (km).`);
};
const buildBe = () => {
  const { dai, rong } = stories.be;
  const [t, m] = tong([dai, rong]);
  const [r, s] = rutGon(mul([t, m], [2, 1]));
  return words("be", `Một bè nuôi cá hình chữ nhật có chiều dài ${f(dai)} m, chiều rộng ${f(rong)} m. Chu vi của bè cá là bao nhiêu mét?`, [[`Nửa chu vi: ${f(dai)} + ${f(rong)} =`, { answer: t }, "/", { answer: m }], [`Chu vi: ${t}/${m} × 2 = ${t * 2}/${m} =`, { answer: r }]], "Chu vi hình chữ nhật bằng (chiều dài + chiều rộng) × 2. Cộng hai phân số cùng mẫu số trước.", `(${f(dai)} + ${f(rong)}) × 2 = ${t}/${m} × 2 = ${t * 2}/${m} = ${f([r, s])} (m).`);
};
const buildLon = () => {
  const { chuong, con, an } = stories.lon;
  const soCon = chuong * con;
  const [t, m] = mul([soCon, 1], an);
  const [r] = rutGon([t, m]);
  return words("lon", `Nhà cô Sáu có ${chuong} chuồng lợn, mỗi chuồng nuôi ${con} con. Mỗi ngày, một con lợn ăn hết ${f(an)} yến cám. Mỗi ngày các con lợn nhà cô Sáu ăn hết bao nhiêu ki-lô-gam cám?`, [[`Số con lợn: ${chuong} × ${con} =`, { answer: soCon }], [`Số yến cám: ${soCon} × ${f(an)} = ${t}/${m} =`, { answer: r }, "yến"], [`${r} yến =`, { answer: r * 10 }, "kg"]], "Tìm số con lợn trước, rồi nhân với số yến cám của một con. Đổi: 1 yến = 10 kg.", `${chuong} × ${con} = ${soCon} con. ${soCon} × ${f(an)} = ${t}/${m} = ${r} yến = ${r * 10} kg.`);
};
const buildXe = () => {
  const { dai, rong, so } = stories.xe;
  const a = mul(dai, rong);
  const b = mul([so, 1], a);
  return words("xe", `Mỗi ô đỗ xe ô tô có dạng hình chữ nhật với chiều dài ${f(dai)} m và chiều rộng ${f(rong)} m. a) Tính diện tích mỗi ô đỗ xe. b) Tính tổng diện tích của ${so} ô đỗ xe đó.`, [[`a) ${f(dai)} × ${f(rong)} =`, { answer: a[0] }, "/", { answer: a[1] }, "m²"], [`b) ${so} × ${a[0]}/${a[1]} =`, { answer: b[0] }, "/", { answer: b[1] }, "m²"]], "Diện tích bằng chiều dài nhân chiều rộng. Tổng diện tích của nhiều ô bằng diện tích một ô nhân với số ô.", `a) ${f(dai)} × ${f(rong)} = ${f(a)} (m²). b) ${so} × ${f(a)} = ${f(b)} (m²).`);
};
const buildHiep = () => {
  const { n, a, b } = stories.hiep;
  const [t, m] = tong([a, b]);
  const all = mul([n, 1], [t, m]);
  const [r] = rutGon(all);
  return words("hiep", `Trong bữa tiệc, nhà vua chia bánh cho ${n} hiệp sĩ. Mỗi hiệp sĩ được chia ${f(a)} cái bánh pi-da bò và ${f(b)} cái bánh pi-da gà. Hỏi ${n} hiệp sĩ được chia tất cả bao nhiêu cái bánh?`, [[`Mỗi hiệp sĩ: ${f(a)} + ${f(b)} =`, { answer: t }, "/", { answer: m }], [`${n} hiệp sĩ: ${n} × ${t}/${m} = ${all[0]}/${all[1]} =`, { answer: r }, "cái bánh"]], "Tìm số bánh của một hiệp sĩ (cộng hai phân số), rồi nhân với số hiệp sĩ.", `Mỗi hiệp sĩ: ${f(a)} + ${f(b)} = ${t}/${m}. ${n} × ${t}/${m} = ${all[0]}/${all[1]} = ${r} (cái bánh).`);
};

/** Ba đoạn tre: A dài 1 m, 3 đốt; B bằng 2 đốt của A; C có 2 đốt bằng nhau, đốt dưới bằng B. */
export const tre = { a: [1, 1] as P, dotA: 3, bDotA: 2 };
const treB = (): P => rutGon([tre.bDotA, tre.dotA]);
const treC = (): P => rutGon(mul([2, 1], treB()));
const buildTre = (): ChoiceQuestion[] => {
  const b = treB();
  const c = treC();
  const ill = createElement(Tre);
  return [
    choice("tre-a", "Đoạn tre A dài 1 m, có 3 đốt dài bằng nhau; đoạn tre C có 2 đốt dài bằng nhau. Đoạn tre B có độ dài là 2/3 m. Đúng hay sai?", ["Đúng", "Sai"], f(b) === "2/3" ? 0 : 1, "Mỗi đốt của A dài bao nhiêu mét? B cao bằng mấy đốt của A?", `Mỗi đốt của A dài 1/3 m. B cao bằng 2 đốt của A nên B dài 2 × 1/3 = ${f(b)} m. Vậy ${f(b)} m: Đúng.`, ill),
    choice("tre-b", "Cũng hình trên: đoạn tre dài nhất (đoạn C) có độ dài là 3/2 m. Đúng hay sai?", ["Đúng", "Sai"], f(c) === "3/2" ? 0 : 1, "Nhìn đường nét đứt: đốt dưới của C cao bằng đoạn nào? C có 2 đốt bằng nhau.", `Đốt dưới của C cao bằng B, tức ${f(b)} m. C có 2 đốt bằng nhau nên C dài 2 × ${f(b)} = ${f(c)} m, không phải 3/2 m. Vậy: Sai.`, ill),
  ];
};

/** Tính chất: so sánh hai biểu thức, đáp án do code tính từng vế. Biểu thức gồm phân số, ×, +, ngoặc. */
type Frac = [number, number];
const norm = ([a, b]: Frac): Frac => rutGon([a, b]);
export const evalExpr = (src: string): P => {
  const tokens = src.match(/\d+\/\d+|[()+×]/g)!;
  let i = 0;
  const atom = (): Frac => {
    const t = tokens[i++];
    if (t === "(") {
      const v = expr();
      i++;
      return v;
    }
    const [a, b] = t.split("/").map(Number);
    return [a, b];
  };
  const term = (): Frac => {
    let v = atom();
    while (tokens[i] === "×") {
      i++;
      v = norm(mul(v, atom()));
    }
    return v;
  };
  const expr = (): Frac => {
    let v = term();
    while (tokens[i] === "+") {
      i++;
      const w = term();
      v = norm([v[0] * w[1] + w[0] * v[1], v[1] * w[1]]);
    }
    return v;
  };
  return expr();
};
const compare = (l: string, r: string): Sign => {
  const [a, b] = evalExpr(l);
  const [c, d] = evalExpr(r);
  return a * d === c * b ? "=" : a * d > c * b ? ">" : "<";
};
export const ssSpecs = [
  { id: "ss-1", rows: [["2/5 × 3/4", "3/4 × 2/5"], ["(1/2 × 3/5) × 2/3", "1/2 × (3/5 × 2/3)"], ["(1/4 + 3/8) × 1/2", "1/4 × 1/2 + 3/8 × 1/2"]] },
  { id: "ss-2", rows: [["2/3 × 4/5", "2/3 × 5/4"], ["3/4 × 2/3", "3/4 × 1/3"], ["(1/2 + 1/3) × 3/5", "1/2 × 3/5 + 1/3"]] },
] as const;
const compareQ = ({ id, rows }: (typeof ssSpecs)[number], prompt: string, hint: string, explanation: string): CompareQuestion => ({
  id,
  kind: "so-sanh",
  prompt,
  rows: rows.map(([left, right]) => ({ left, right, answer: compare(left, right) })),
  hint,
  explanation,
});

/** Khởi động: nhắc rút gọn (Bài 56), số tự nhiên là phân số mẫu 1 (Bài 53), diện tích hình chữ nhật. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-rut", "Rút gọn 10/15.", ["10/15 = (10 : 5)/(15 : 5) =", { answer: 2 }, "/", { answer: 3 }], "Chia cả tử số và mẫu số cho 5.", "10 : 5 = 2 và 15 : 5 = 3, nên 10/15 = 2/3."),
  fill("kd-mot", "Viết số tự nhiên thành phân số có mẫu số 1: 3 = ?/1.", ["3 =", { answer: 3 }, "/1"], "Phân số có mẫu số 1 bằng chính tử số của nó.", "3/1 nghĩa là 3 : 1 = 3, nên 3 = 3/1."),
  choice("kd-dt", "Hình chữ nhật dài 4 m, rộng 3 m. Diện tích là bao nhiêu?", ["12 m²", "7 m²", "14 m²"], 0, "Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.", "4 × 3 = 12, nên diện tích là 12 m²."),
];

export const quickChecks = {
  nhan: fill("thu-nhan", "Tính 2/3 × 1/5. Số ?", ["2/3 × 1/5 = (2 × 1)/(3 × 5) =", { answer: 2 }, "/", { answer: 15 }], "Tử số nhân tử số, mẫu số nhân mẫu số.", "2 × 1 = 2 và 3 × 5 = 15. Vậy 2/3 × 1/5 = 2/15."),
  nham: choice("thu-nham", "Con viết 2/5 × 3/5 = 6/5. Đúng hay sai?", ["Sai", "Đúng"], 0, "Khi nhân, mẫu số có giữ nguyên không?", "Sai. Mẫu số cũng nhân với nhau: 5 × 5 = 25. Đúng là 2/5 × 3/5 = 6/25."),
  rutgon: fill("thu-rut", "Nhân xong được 3/4 × 2/5 = 6/20. Rút gọn 6/20.", ["6/20 = (6 : 2)/(20 : 2) =", { answer: 3 }, "/", { answer: 10 }], "Chia cả tử số và mẫu số cho 2.", "6 : 2 = 3 và 20 : 2 = 10. Vậy 3/4 × 2/5 = 3/10."),
  stn: fill("thu-stn", "Tính 3/7 × 2. Số ?", ["3/7 × 2 = (3 × 2)/(7 × 1) =", { answer: 6 }, "/", { answer: 7 }], "Viết 2 = 2/1. Mẫu số 7 × 1 vẫn là 7.", "3 × 2 = 6 và 7 × 1 = 7. Vậy 3/7 × 2 = 6/7."),
  stnSai: choice("thu-stn-sai", "Con viết 2/7 × 3 = 6/21. Đúng hay sai?", ["Sai", "Đúng"], 0, "3 = 3/1. Mẫu số 7 nhân với số nào?", "Sai. 3 = 3/1 nên mẫu số là 7 × 1 = 7. Đúng là 2/7 × 3 = 6/7."),
  khong: fill("thu-khong", "Tính 5/9 × 0. Số ?", ["5/9 × 0 =", { answer: 0 }], "Số nào nhân với 0 cũng bằng 0.", "5/9 × 0 = (5 × 0)/9 = 0/9 = 0."),
  doiCho: choice("thu-doi", "3/4 × 2/5 và 2/5 × 3/4 so với nhau thế nào?", ["Bằng nhau", "Khác nhau"], 0, "Đổi chỗ hai thừa số trong phép nhân thì tích có đổi không?", "Tích không đổi: cả hai đều bằng 6/20 = 3/10."),
};

const buildSn = (): Question[] => [
  choice("sn-1", "Hà tính 3/5 × 2/3 = (3 × 3)/(5 × 2) = 9/10. Hà sai ở đâu?", ["Nhân chéo: lấy tử số nhân với mẫu số của phân số kia", "Phải cộng hai phân số", "Hà không sai"], 0, "Tử số nhân với tử số hay nhân với mẫu số?", "Tử số nhân tử số: 3 × 2 = 6. Mẫu số nhân mẫu số: 5 × 3 = 15. Đúng là 3/5 × 2/3 = 6/15 = 2/5."),
  choice("sn-2", "Nam tính 1/2 × 1/3 = (1 + 1)/(2 + 3) = 2/5. Nam sai ở đâu?", ["Cộng tử số và cộng mẫu số, trong khi phải nhân", "Phải quy đồng mẫu số trước", "Nam không sai"], 0, "Phép tính là phép nhân hay phép cộng?", "Phép nhân thì nhân tử số với tử số và mẫu số với mẫu số: 1 × 1 = 1, 2 × 3 = 6. Đúng là 1/6."),
  compareQ(ssSpecs[1], "Vượt SGK: tính rồi so sánh. Không phải hàng nào cũng bằng nhau.", "Tính từng vế rồi so sánh. Đổi 1/3 thành 4/5 hay thay một thừa số khác thì tích có đổi không?", "Đổi chỗ các thừa số thì tích không đổi. Nhưng đổi một thừa số thành số khác (hoặc nhân tổng với một số rồi cộng sai) thì tích thay đổi. Phải tính từng vế."),
  choice("sn-4", "Vượt SGK: không tính cụ thể, 4/5 × 2/3 lớn hơn hay bé hơn 4/5?", ["Bé hơn 4/5", "Lớn hơn 4/5"], 0, "Lấy 2/3 của một số thì được nhiều hơn hay ít hơn số đó?", "2/3 bé hơn 1, nên lấy 2/3 của 4/5 thì ít hơn 4/5. Thật vậy 4/5 × 2/3 = 8/15 và 8/15 < 12/15 = 4/5."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "nhan-hai", title: "Tiết 1: Nhân hai phân số (trang 87, 90)", questions: [...hd1.map(buildMul), ...hd2.map(buildMul), ...nr.map(buildMul), buildNhom()] },
  { id: "so-tu-nhien", title: "Tiết 2: Nhân phân số với số tự nhiên (trang 87)", questions: stn.map(buildMul) },
  {
    id: "tinh-chat",
    title: "Tiết 3: Tính chất của phép nhân (trang 88, 89, 90)",
    questions: [compareQ(ssSpecs[0], "Tính rồi so sánh (>, <, =).", "Tính giá trị từng vế rồi so sánh. Đổi chỗ, nhóm lại hay nhân một tổng với một số thì kết quả có đổi không?", "Phép nhân phân số cũng có tính chất giao hoán, kết hợp, và nhân một tổng với một số: (a + b) × c = a × c + b × c. Nên các cặp đều bằng nhau."), buildMul(ba), tinhNgoac(ngoac), ...thuanTien.map(buildTT)],
  },
  { id: "bai-toan", title: "Tiết 4: Bài toán có lời văn và hình học (trang 87 đến 90)", questions: [buildVuong(), buildTau(), buildBe(), buildLon(), buildXe(), buildHiep(), ...buildTre()] },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: buildSn() },
];
