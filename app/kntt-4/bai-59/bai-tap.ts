import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, Sign, WordQuestion } from "@/components/exercises/types";
import type { HinhPhanSoProps } from "@/components/math/phan-so";
import { HinhPhanSo } from "@/components/math/phan-so";
import { createElement } from "react";
import { NhomHinh } from "@/components/math/nhom-hinh";
import { Doan } from "./_illustrations/hinh";

type Row = { left: string; right: string; answer: Sign };
const r = (left: string, right: string, answer: Sign): Row => ({ left, right, answer });
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const frac = (text: string): [number, number] => {
  const [x, y = "1"] = text.split("/");
  return [Number(x), Number(y)];
};
/** Hai phân số bằng nhau khi hai tích chéo bằng nhau (chỉ để tính đáp án trong dữ liệu, không dạy con). */
const equal = (a: string, b: string) => frac(a)[0] * frac(b)[1] === frac(a)[1] * frac(b)[0];
const less = (a: string, b: string) => frac(a)[0] * frac(b)[1] < frac(a)[1] * frac(b)[0];
const product = (xs: number[]) => xs.reduce((a, b) => a * b, 1);

/** Số liệu các câu (đổi so với SGK, trừ hình đoạn thẳng giữ nguyên số của hình). Test tính lại mọi đáp án. */

// Bài 55: chuỗi phân số bằng nhau. `base` là phân số đầu; `others` là các phân số sau (mỗi cặp [tử, mẫu]).
export const chuoi = [
  { base: [48, 36], others: [[24, 18], [4, 3]] },
  { base: [18, 30], others: [[3, 5], [6, 10], [36, 60]] },
];
export const tinhChat = { frac: "3/7", options: ["9/21", "12/30", "6/16", "21/28"] };
// Bài 56: rút gọn.
export const rutGon: [number, number][] = [[45, 30], [35, 84], [54, 90]];
export const tich = [
  { tu: [7, 9, 4], mau: [9, 4, 11] },
  { tu: [6, 10, 13], mau: [13, 6, 15] },
];
// Bài 53, 55: hình tô màu, tìm phân số bằng.
export const hinhNoi: { hinh: HinhPhanSoProps; options: string[] }[] = [
  { hinh: { kieu: "tron", mau: 6, to: 4 }, options: ["1/2", "2/3", "3/4", "5/6"] },
  { hinh: { kieu: "bang", mau: 8, cot: 4, to: 6 }, options: ["1/2", "2/3", "3/4", "6/4"] },
  { hinh: { kieu: "nhom", mau: 12, cot: 4, to: 3 }, options: ["1/3", "1/4", "1/2", "3/4"] },
];
export const chonHinh = { target: "3/5", mau: 10, cot: 5, items: [
  { label: "A", to: [0, 2, 4, 6] },
  { label: "B", to: [0, 3, 4, 7, 8, 9] },
  { label: "C", to: [1, 5, 9] },
  { label: "D", to: [0, 1, 2, 3, 4, 5, 6] },
] };
// Bài 57: quy đồng.
export const quyDongHai: { a: [number, number]; b: [number, number] }[] = [
  { a: [5, 6], b: [7, 24] },
  { a: [2, 5], b: [19, 40] },
  { a: [9, 20], b: [7, 100] },
];
export const quyDongBa = { mau: 36, a: [3, 4], b: [5, 12], giuNguyen: "11/36" };
export const vietMau12 = { so: 3, a: [1, 4], b: [5, 6], mau: 12 };
// Hình SGK tr.71 bài 3 (giữ nguyên số của hình): AC chia 4 phần, B ở vạch 1; HK chia 5 phần, I ở vạch 2.
export const doanSpecs = [
  { parts: 4, at: 1, names: ["A", "B", "C"] },
  { parts: 5, at: 2, names: ["H", "I", "K"] },
] as const;
// Bài 58: so sánh.
export const soSanhRows: Row[][] = [
  [r("17/21", "13/21", ">"), r("7/4", "29/20", ">"), r("15/24", "5/8", "=")],
  [r("9/14", "9/16", ">"), r("34/17", "2", "="), r("4", "23/6", ">")],
  [r("11/12", "1", "<"), r("1", "27/25", "<"), r("7/8", "29/32", "<")],
];
export const bi = { names: ["Rô-bốt", "Việt"], amounts: ["2/5", "3/10"] };
export const banh = { names: ["Việt", "Mi", "Mai"], amounts: ["2/3", "1/2", "5/12"] };
export const sapXepPs = ["11/8", "5/8", "19/32", "3/4", "9/16", "23/32"];
export const cuoi = { buoi: "7/6", thanhLong: "23/24" };

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}
function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}
function words(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}
function compare(id: string, rows: Row[], hint: string, explanation: string): Question {
  return { id, kind: "so-sanh", prompt: "Chọn >, <, = cho mỗi chỗ trống.", rows, hint, explanation };
}
const hinh = (props: HinhPhanSoProps) => createElement(HinhPhanSo, props);

/** Nhắc lại nhanh: mỗi câu thử một ý. Không tính vào tiến độ. */
export const quickChecks = {
  khaiNiem: choice("thu-khai-niem", "Băng giấy chia thành 8 phần bằng nhau, tô màu 5 phần. Phân số chỉ phần tô màu là:", ["3/8", "5/8", "5/3", "8/5"], 1, "Tử số là số phần tô màu, mẫu số là số phần bằng nhau của cả băng.", "Tô 5 phần trong 8 phần bằng nhau, vậy là 5/8.", hinh({ kieu: "bang", mau: 8, cot: 8, to: 5 })),
  chia: fill("thu-chia", "Chia đều 8 cái bánh cho 5 bạn. Mỗi bạn được bao nhiêu cái bánh?", ["8 : 5 =", { answer: 8 }, "/", { answer: 5 }], "Thương của phép chia số tự nhiên cho số tự nhiên (khác 0) viết được thành phân số: số bị chia là tử số, số chia là mẫu số.", "8 : 5 = 8/5, mỗi bạn được 8/5 cái bánh."),
  tinhChat: fill("thu-tinh-chat", "Số ?", ["2/5 = (2 × 3)/(5 × 3) =", { answer: 6 }, "/15"], "Nhân cả tử số và mẫu số với cùng một số, ở đây là 3.", "2 × 3 = 6 và 5 × 3 = 15, vậy 2/5 = 6/15."),
  rutGon: fill("thu-rut-gon", "Rút gọn 18/24: chia cả tử số và mẫu số cho 6.", ["18/24 = (18 : 6)/(24 : 6) =", { answer: 3 }, "/", { answer: 4 }], "Chia cả tử số và mẫu số cho cùng một số lớn hơn 1.", "18 : 6 = 3 và 24 : 6 = 4, vậy 18/24 = 3/4. 3/4 không rút gọn được nữa."),
  quyDong: fill("thu-quy-dong", "Quy đồng mẫu số 1/4 và 5/12: viết 1/4 thành phân số có mẫu số 12.", ["1/4 =", { answer: 3 }, "/12"], "12 : 4 = 3. Nhân cả tử số và mẫu số của 1/4 với 3.", "1/4 = (1 × 3)/(4 × 3) = 3/12. Giữ nguyên 5/12."),
  soSanh: compare("thu-so-sanh", [r("3/4", "7/12", ">")], "Hai mẫu số khác nhau, quy đồng về mẫu số 12 rồi so sánh tử số.", "3/4 = 9/12. Cùng mẫu số 12, 9 > 7 nên 3/4 > 7/12."),
} satisfies Record<string, Question>;

const chuoiQs: Question[] = [
  fill("pc-1", "Số ?", [`${chuoi[0].base.join("/")} = ${chuoi[0].others[0][0]}/`, { answer: chuoi[0].others[0][1] }, " = ", { answer: chuoi[0].others[1][0] }, `/${chuoi[0].others[1][1]}`], "Nhìn hai phân số đã biết cả tử số lẫn mẫu số để tìm cả tử số và mẫu số được nhân hoặc chia với số nào.", "48/36 = 24/18 (chia cả hai cho 2) và 48/36 = 4/3 (chia cả hai cho 12)."),
  fill("pc-2", "Số ?", [`${chuoi[1].base.join("/")} = ${chuoi[1].others[0][0]}/`, { answer: chuoi[1].others[0][1] }, " = ", { answer: chuoi[1].others[1][0] }, `/${chuoi[1].others[1][1]} = ${chuoi[1].others[2][0]}/`, { answer: chuoi[1].others[2][1] }], "Tìm số chia cả tử số và mẫu số của 18/30 để được 3/?, rồi nhân lên.", "18/30 = 3/5 (chia cho 6); 3/5 = 6/10 (nhân 2); 3/5 = 36/60 (nhân 12)."),
  choice("tc-1", `Phân số nào bằng ${tinhChat.frac}?`, tinhChat.options, tinhChat.options.findIndex((o) => equal(o, tinhChat.frac)), "Cả tử số và mẫu số của 3/7 cùng nhân với một số. Thử 3 × 3.", "9/21 = (3 × 3)/(7 × 3) = 3/7. Các phân số còn lại không có tử số và mẫu số cùng nhân với một số."),
  words("rg-1", "Rút gọn các phân số.", rutGon.map(([a, b]) => [`${a}/${b} =`, { answer: a / gcd(a, b) }, "/", { answer: b / gcd(a, b) }]), "Tìm số lớn hơn 1 chia hết cả tử số và mẫu số. Rút gọn đến khi không còn rút được.", "45/30 = 3/2 (chia 15); 35/84 = 5/12 (chia 7); 54/90 = 3/5 (chia 18). Cả ba đều là phân số tối giản."),
  words("rg-2", "Rút gọn bằng cách bỏ các thừa số giống nhau ở tử số và mẫu số.", tich.map(({ tu, mau }) => [`(${tu.join(" × ")})/(${mau.join(" × ")}) =`, { answer: product(tu) / gcd(product(tu), product(mau)) }, "/", { answer: product(mau) / gcd(product(tu), product(mau)) }]), "Gạch các thừa số có ở cả tử số và mẫu số, rồi tính phần còn lại. Đừng nhân hết ra.", "(7 × 9 × 4)/(9 × 4 × 11): bỏ 9 và 4, còn 7/11. (6 × 10 × 13)/(13 × 6 × 15): bỏ 13 và 6, còn 10/15 = 2/3."),
];

const hinhQs: Question[] = [
  ...hinhNoi.map(({ hinh: h, options }, i) => {
    const target = `${h.to}/${h.mau}`;
    return choice(`hn-${i + 1}`, "Phân số nào bằng phân số chỉ phần đã tô màu của hình?", options, options.findIndex((o) => equal(o, target)), "Viết phân số chỉ phần tô màu, rồi rút gọn.", `Phần tô màu là ${target}. Rút gọn được ${options.find((o) => equal(o, target))}.`, hinh(h));
  }),
  choice(
    "hn-4",
    `Hình nào đã tô màu ${chonHinh.target} số hình tròn?`,
    chonHinh.items.map((x) => x.label),
    chonHinh.items.findIndex((x) => equal(`${x.to.length}/${chonHinh.mau}`, chonHinh.target)),
    "Đếm số hình tròn đã tô trên 10 hình, rồi so 3/5 với phân số đó.",
    "3/5 = 6/10, nên phải tô 6 hình trong 10 hình. Hình B tô 6 hình.",
    createElement(NhomHinh, { items: chonHinh.items.map((x) => ({ label: x.label, props: { kieu: "nhom" as const, mau: chonHinh.mau, cot: chonHinh.cot, to: x.to } })) }),
  ),
];

const quyDongQs: Question[] = [
  words("qd-1", "Quy đồng mẫu số hai phân số (giữ nguyên phân số có mẫu số lớn).", quyDongHai.map(({ a, b }) => [`${a.join("/")} và ${b.join("/")}: ${a.join("/")} =`, { answer: (a[0] * b[1]) / a[1] }, `/${b[1]}`]), "Mẫu số lớn chia cho mẫu số bé được thương bao nhiêu thì nhân cả tử số và mẫu số của phân số có mẫu số bé với số đó.", "24 : 6 = 4 nên 5/6 = 20/24. 40 : 5 = 8 nên 2/5 = 16/40. 100 : 20 = 5 nên 9/20 = 45/100."),
  words("qd-2", `Quy đồng mẫu số ${quyDongBa.a.join("/")}; ${quyDongBa.b.join("/")} và ${quyDongBa.giuNguyen} (giữ nguyên ${quyDongBa.giuNguyen}).`, [[`${quyDongBa.a.join("/")} =`, { answer: (quyDongBa.a[0] * quyDongBa.mau) / quyDongBa.a[1] }, `/${quyDongBa.mau}`], [`${quyDongBa.b.join("/")} =`, { answer: (quyDongBa.b[0] * quyDongBa.mau) / quyDongBa.b[1] }, `/${quyDongBa.mau}`]], "Mẫu số chung là 36. Tìm số nhân mỗi mẫu số để được 36.", "36 : 4 = 9 nên 3/4 = 27/36. 36 : 12 = 3 nên 5/12 = 15/36."),
  words("qd-3", `Viết ${vietMau12.so}; ${vietMau12.a.join("/")}; ${vietMau12.b.join("/")} thành ba phân số đều có mẫu số là ${vietMau12.mau}.`, [[`${vietMau12.so} =`, { answer: vietMau12.so * vietMau12.mau }, `/${vietMau12.mau}`], [`${vietMau12.a.join("/")} =`, { answer: (vietMau12.a[0] * vietMau12.mau) / vietMau12.a[1] }, `/${vietMau12.mau}`], [`${vietMau12.b.join("/")} =`, { answer: (vietMau12.b[0] * vietMau12.mau) / vietMau12.b[1] }, `/${vietMau12.mau}`]], "Số tự nhiên 3 viết được thành 3/1. Rồi nhân tử số và mẫu số với 12.", "3 = 3/1 = 36/12. 12 : 4 = 3 nên 1/4 = 3/12. 12 : 6 = 2 nên 5/6 = 10/12."),
];

const doanQs: Question[] = [
  { id: "dt-1", kind: "dien-so", prompt: "Đoạn thẳng AC chia thành các phần bằng nhau. AB = 1/4 AC. Tìm phân số thích hợp.", parts: ["BC =", { answer: doanSpecs[0].parts - doanSpecs[0].at }, "/", { answer: doanSpecs[0].parts }, "AC"], hint: "AC có mấy phần bằng nhau? BC gồm mấy phần?", explanation: "AC chia thành 4 phần bằng nhau. AB là 1 phần nên BC là 3 phần: BC = 3/4 AC.", illustration: createElement(Doan, doanSpecs[0]) },
  { id: "dt-2", kind: "dien-so", prompt: "Đoạn thẳng HK chia thành các phần bằng nhau. Tìm phân số thích hợp.", parts: ["HI =", { answer: doanSpecs[1].at }, "/", { answer: doanSpecs[1].parts }, "HK; IK =", { answer: doanSpecs[1].parts - doanSpecs[1].at }, "/", { answer: doanSpecs[1].parts }, "HK"], hint: "Đếm số phần bằng nhau của HK, rồi đếm số phần của HI và IK.", explanation: "HK chia thành 5 phần bằng nhau. HI gồm 2 phần, IK gồm 3 phần: HI = 2/5 HK; IK = 3/5 HK.", illustration: createElement(Doan, doanSpecs[1]) },
  choice("do-day", "Đố em: làm thế nào lấy được đoạn dây dài 1/4 m từ đoạn dây dài 1 m mà không dùng thước?", ["Gấp đôi sợi dây một lần rồi cắt, lấy một nửa", "Gấp đôi sợi dây, rồi lại gấp đôi một lần nữa, cắt lấy một phần", "Gấp sợi dây làm ba phần bằng nhau, lấy một phần"], 1, "1/4 là một trong 4 phần bằng nhau. Gấp đôi mấy lần thì được 4 phần?", "Gấp đôi lần một được 2 phần bằng nhau, gấp đôi lần hai được 4 phần bằng nhau. Mỗi phần dài 1/4 m."),
];

const soSanhQs: Question[] = [
  compare("ss-1", soSanhRows[0], "Cùng mẫu số thì so tử số. Khác mẫu số, mẫu lớn chia hết mẫu bé thì quy đồng.", "17 > 13. 7/4 = 35/20 > 29/20. 15/24 = 5/8, hai phân số bằng nhau."),
  compare("ss-2", soSanhRows[1], "Cùng tử số thì mẫu số bé hơn, phân số lớn hơn. Số tự nhiên viết thành phân số cùng mẫu số.", "9/14 > 9/16 (mẫu 14 bé hơn 16). 34/17 = 2. 4 = 24/6 > 23/6."),
  compare("ss-3", soSanhRows[2], "So với 1: tử số bé hơn mẫu số thì bé hơn 1, lớn hơn mẫu số thì lớn hơn 1. 7/8 = 28/32.", "11/12 < 1. 1 < 27/25. 7/8 = 28/32 < 29/32."),
  choice("bi", `Mai cho Rô-bốt ${bi.amounts[0]} số viên bi và cho Việt ${bi.amounts[1]} số viên bi. Ai được Mai cho nhiều bi hơn?`, ["Rô-bốt", "Việt", "Hai bạn bằng nhau"], less(bi.amounts[1], bi.amounts[0]) ? 0 : 1, "Quy đồng 2/5 và 3/10 về mẫu số 10.", "2/5 = 4/10. Mà 4/10 > 3/10 nên Rô-bốt được cho nhiều bi hơn Việt."),
  choice("banh", `Một cái bánh pi-da: Việt ăn ${banh.amounts[0]} cái, Mi ăn ${banh.amounts[1]} cái, Mai ăn ${banh.amounts[2]} cái. Bạn nào ăn ít bánh nhất?`, banh.names, banh.amounts.reduce((best, x, i) => (less(x, banh.amounts[best]) ? i : best), 0), "Quy đồng ba phân số về mẫu số 12.", "2/3 = 8/12; 1/2 = 6/12; 5/12. Số bé nhất là 5/12, nên Mai ăn ít bánh nhất."),
  choice("sx", `Sắp xếp các phân số ${sapXepPs.join("; ")} theo thứ tự từ bé đến lớn.`, sapOptions(), 1, "Quy đồng về mẫu số 32 rồi so các tử số.", "Quy đồng mẫu số 32: 11/8 = 44/32; 5/8 = 20/32; 19/32; 3/4 = 24/32; 9/16 = 18/32; 23/32. Từ bé đến lớn: 18, 19, 20, 23, 24, 44."),
  choice("cuoi", `Đố em: Bờm có quả bưởi cân nặng ${cuoi.buoi} kg, Cuội có quả thanh long cân nặng ${cuoi.thanhLong} kg. Cuội khoe quả của mình nặng hơn. Không quy đồng mẫu số, Cuội nói đúng hay sai?`, ["Đúng", "Sai: quả của Bờm lớn hơn 1 kg còn quả của Cuội bé hơn 1 kg"], less(cuoi.buoi, cuoi.thanhLong) ? 0 : 1, "So từng phân số với 1: tử số lớn hơn hay bé hơn mẫu số?", "7/6 có tử số 7 lớn hơn mẫu số 6 nên 7/6 > 1. 23/24 có tử số bé hơn mẫu số nên 23/24 < 1. Vậy 7/6 > 23/24, Cuội nói sai."),
];

/** Ba cách xếp sai và một cách xếp đúng (đặt ở vị trí 1) cho câu sắp xếp. */
function sapOptions(): string[] {
  const right = [...sapXepPs].sort((a, b) => (less(a, b) ? -1 : equal(a, b) ? 0 : 1));
  const byTu = [...sapXepPs].sort((a, b) => frac(a)[0] - frac(b)[0]);
  const swapped = [...right];
  [swapped[1], swapped[4]] = [swapped[4], swapped[1]];
  const reversed = [...right].reverse();
  return [byTu, right, swapped, reversed].map((xs) => xs.join("; "));
}

const suyNghi: Question[] = [
  choice("sn-1", "Nam rút gọn: 12/18 = (12 − 6)/(18 − 6) = 6/12. Nam sai ở đâu?", ["Nam làm đúng", "Rút gọn phải chia cả tử số và mẫu số cho cùng một số, không phải trừ. 12/18 = 2/3 còn 6/12 = 1/2", "Phải cộng 6 vào cả tử số và mẫu số"], 1, "Tính chất cơ bản: nhân hoặc chia cả tử số và mẫu số với cùng một số khác 0.", "Trừ cả hai đi 6 làm giá trị phân số đổi. Chia cho 6: 12/18 = 2/3, còn 6/12 = 1/2, hai phân số khác nhau."),
  choice("sn-2", "Mai rút gọn 24/36 = 12/18 rồi nói đã xong. Mai nói đúng không?", ["Đúng, đã rút gọn rồi", "Chưa xong: 12/18 còn rút gọn được, 12/18 = 2/3 mới là phân số tối giản"], 1, "Tử số và mẫu số của 12/18 còn cùng chia hết cho số nào lớn hơn 1?", "12 và 18 cùng chia hết cho 6, nên 12/18 = 2/3. 2 và 3 không còn số chung lớn hơn 1, nên 2/3 là phân số tối giản."),
  fill("sn-3", "Số ?", ["3/5 <", { answer: 7 }, "/10 < 4/5"], "Quy đồng 3/5 và 4/5 về mẫu số 10 rồi tìm tử số nằm giữa.", "3/5 = 6/10 và 4/5 = 8/10. Số nằm giữa 6 và 8 là 7, vậy 6/10 < 7/10 < 8/10."),
  compare("sn-4", [r("15/14", "14/15", ">")], "So từng phân số với 1.", "15 > 14 nên 15/14 > 1. 14 < 15 nên 14/15 < 1. Vậy 15/14 > 14/15."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "bang-nhau-rut-gon", title: "Phân số bằng nhau và rút gọn (Bài 55, 56)", questions: chuoiQs },
  { id: "hinh-to-mau", title: "Hình tô màu và phân số bằng nhau (Bài 53, 55)", questions: hinhQs },
  { id: "quy-dong", title: "Quy đồng mẫu số và đoạn thẳng (Bài 57)", questions: [...quyDongQs, ...doanQs] },
  { id: "so-sanh", title: "So sánh phân số (Bài 58)", questions: soSanhQs },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
