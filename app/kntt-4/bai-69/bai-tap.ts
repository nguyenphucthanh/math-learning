import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, Sign, WordQuestion } from "@/components/exercises/types";
import { HinhPhanSo } from "@/components/math/phan-so";
import { NhomHinh } from "@/components/math/nhom-hinh";
import { createElement } from "react";
import { DaiTamGiac } from "./_illustrations/tam-giac";

type Row = { left: string; right: string; answer: Sign };
const r = (left: string, right: string, answer: Sign): Row => ({ left, right, answer });
export const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
const nb = (answer: number) => ({ answer });
const prod = (xs: number[]) => xs.reduce((a, b) => a * b, 1);
const frac = (text: string): [number, number] => {
  const [x, y = "1"] = text.split("/");
  return [Number(x), Number(y)];
};
const equal = (a: string, b: string) => frac(a)[0] * frac(b)[1] === frac(a)[1] * frac(b)[0];
const less = (a: string, b: string) => frac(a)[0] * frac(b)[1] < frac(a)[1] * frac(b)[0];

/**
 * Số liệu các câu (đổi so với SGK, trừ chỗ gắn với hình: đàn ếch, cân nặng con vật, tích rút gọn thứ hai).
 * Hình tam giác tr.107 do app tự vẽ (14 tam giác, tô 9) vì không đếm chắc hình sách. Test tính lại mọi đáp án.
 */
// Bài 53: hình tô màu.
export const tamGiac = { squares: 7, to: [0, 1, 2, 4, 5, 8, 9, 10, 12], options: ["5/14", "5/9", "9/14", "14/9"] };
/** Bốn khung 15 con ếch (SGK tr.107, đọc từ hình): số con tô màu mỗi khung 3, 9, 7, 6. */
export const ech = {
  target: "3/5",
  mau: 15,
  cot: 5,
  items: [
    { label: "A", to: [2, 7, 12] },
    { label: "B", to: [0, 2, 4, 5, 7, 9, 10, 12, 14] },
    { label: "C", to: [0, 1, 2, 5, 6, 10, 11] },
    { label: "D", to: [1, 3, 6, 8, 11, 13] },
  ],
};
// Bài 54: phép chia.
export const chiaSpec = { tu: 9, mau: 4 };
// Bài 55: chuỗi phân số bằng nhau. Mỗi ô cho biết tử số hoặc mẫu số, ô trống là số còn lại.
export const chuoi: { base: [number, number]; items: ({ tu: number } | { mau: number })[] }[] = [
  { base: [24, 36], items: [{ tu: 12 }, { mau: 3 }, { tu: 20 }] },
  { base: [60, 100], items: [{ mau: 20 }, { tu: 3 }, { mau: 50 }] },
];
export const bangPs = { frac: "4/9", options: ["8/16", "12/27", "16/24", "20/30"] };
// Bài 56: rút gọn.
export const rutGon: [number, number][] = [[36, 48], [45, 75]];
export const tich = [
  { tu: [11, 8, 15], mau: [15, 11, 12] },
  { tu: [7, 9, 13], mau: [13, 7, 21] },
];
// Bài 57: quy đồng.
export const quyDongHai: { a: [number, number]; b: [number, number] }[] = [
  { a: [3, 8], b: [17, 40] },
  { a: [7, 25], b: [61, 100] },
];
export const quyDongBa = { mau: 24, a: [3, 4] as [number, number], b: [5, 6] as [number, number], giuNguyen: "7/24" };
// Bài 58: so sánh (có đơn vị).
export const soSanhRows: Row[][] = [
  [r("3/8 kg", "5/8 kg", "<"), r("9/8 kg", "1 kg", ">")],
  [r("7/9 l", "7/12 l", ">"), r("4/3 l", "12/9 l", "=")],
  [r("5/6 m", "11/12 m", "<"), r("15/7 m", "2 m", ">")],
];
export const voi = [
  { name: "Vòi số 1", amount: "3/5" },
  { name: "Vòi số 2", amount: "7/10" },
  { name: "Vòi số 3", amount: "13/20" },
];
/** Cân nặng con vật theo SGK tr.109 (gắn với hình). */
export const conVat = [
  { name: "Gà", amount: "5/2" },
  { name: "Thỏ", amount: "19/4" },
  { name: "Vịt", amount: "9/4" },
  { name: "Mèo", amount: "28/8" },
];
/** Thời gian chạy (phút): ít thời gian hơn thì về đích trước. */
export const chayThi = [
  { name: "Mai", amount: "3/4" },
  { name: "Nam", amount: "5/8" },
  { name: "Việt", amount: "7/12" },
  { name: "Rô-bốt", amount: "2/3" },
];
export const nhoHon1 = { options: ["17/13", "24/36", "45/44", "61/59"] };
export const lonHon = { frac: "2/3", options: ["4/9", "14/21", "8/15", "7/9"] };

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

/** Thứ tự từ bé đến lớn (so bằng nhân chéo). */
export const sortAsc = <T extends { amount: string }>(list: T[]): T[] => [...list].sort((a, b) => (less(a.amount, b.amount) ? -1 : equal(a.amount, b.amount) ? 0 : 1));
/** Phương án xếp: đúng ở vị trí 1; sai là xếp theo tử số, đảo hai bạn đầu, và đảo ngược. */
function orderOptions(list: { name: string; amount: string }[]) {
  const right = sortAsc(list);
  const byTu = [...list].sort((a, b) => frac(a.amount)[0] - frac(b.amount)[0]);
  const swapped = [...right];
  [swapped[0], swapped[1]] = [swapped[1], swapped[0]];
  const reversed = [...right].reverse();
  return [byTu, right, swapped, reversed].map((xs) => xs.map((x) => x.name).join(", "));
}

/** Nhắc lại nhanh, cũng là kiểm tra đầu vào. Không tính vào tiến độ. */
export const quickChecks = {
  khaiNiem: choice("thu-khai-niem", "Băng giấy chia thành 9 phần bằng nhau, tô màu 4 phần. Phân số chỉ phần tô màu là:", ["5/9", "4/9", "4/5", "9/4"], 1, "Tử số là số phần tô màu, mẫu số là số phần bằng nhau của cả băng.", "Tô 4 phần trong 9 phần bằng nhau, vậy là 4/9.", createElement(HinhPhanSo, { kieu: "bang", mau: 9, cot: 9, to: 4 })),
  chia: fill("thu-chia", "Chia đều 7 cái bánh cho 3 bạn. Mỗi bạn được bao nhiêu cái bánh?", ["7 : 3 =", nb(7), "/", nb(3)], "Số bị chia là tử số, số chia là mẫu số.", "7 : 3 = 7/3, mỗi bạn được 7/3 cái bánh."),
  tinhChat: fill("thu-tinh-chat", "Số ?", ["3/4 = (3 × 5)/(4 × 5) =", nb(15), "/20"], "Nhân cả tử số và mẫu số với cùng một số, ở đây là 5.", "3 × 5 = 15 và 4 × 5 = 20, vậy 3/4 = 15/20."),
  rutGon: fill("thu-rut-gon", "Rút gọn 20/30: chia cả tử số và mẫu số cho 10.", ["20/30 = (20 : 10)/(30 : 10) =", nb(2), "/", nb(3)], "Chia cả tử số và mẫu số cho cùng một số lớn hơn 1.", "20 : 10 = 2 và 30 : 10 = 3, vậy 20/30 = 2/3. 2/3 là phân số tối giản."),
  quyDong: fill("thu-quy-dong", "Quy đồng mẫu số 2/3 và 5/12: viết 2/3 thành phân số có mẫu số 12.", ["2/3 =", nb(8), "/12"], "12 : 3 = 4. Nhân cả tử số và mẫu số của 2/3 với 4.", "2/3 = (2 × 4)/(3 × 4) = 8/12. Giữ nguyên 5/12."),
  soSanh: compare("thu-so-sanh", [r("5/6", "7/9", ">")], "Hai mẫu số khác nhau, quy đồng về mẫu số 18 rồi so sánh tử số.", "5/6 = 15/18 và 7/9 = 14/18. Cùng mẫu số 18, 15 > 14 nên 5/6 > 7/9."),
} satisfies Record<string, Question>;

const frogs = createElement(NhomHinh, { items: ech.items.map((x) => ({ label: x.label, props: { kieu: "nhom" as const, mau: ech.mau, cot: ech.cot, to: x.to } })) });

const khaiNiemQs: Question[] = [
  choice("kn-1", "Phân số chỉ phần đã tô màu của hình bên là:", tamGiac.options, tamGiac.options.findIndex((o) => equal(o, `${tamGiac.to.length}/${tamGiac.squares * 2}`)), "Đếm tất cả các tam giác nhỏ (mẫu số), rồi đếm các tam giác đã tô màu (tử số).", "Hình có 14 tam giác nhỏ bằng nhau, tô màu 9 tam giác nên phần tô màu là 9/14.", createElement(DaiTamGiac, tamGiac)),
  choice("kn-2", `Đã tô màu ${ech.target} số con ếch của hình nào?`, ech.items.map((x) => x.label), ech.items.findIndex((x) => equal(`${x.to.length}/${ech.mau}`, ech.target)), "Mỗi khung có 15 con ếch. 3/5 của 15 con là mấy con? Đổi 3/5 thành phân số có mẫu số 15.", "3/5 = 9/15, nên phải tô 9 con trong 15 con. Khung B tô 9 con.", frogs),
  fill("kn-3", "Chia đều 9 cái bánh cho 4 bạn. Mỗi bạn được bao nhiêu cái bánh? Phân số này lớn hơn 1 hay bé hơn 1?", [`${chiaSpec.tu} : ${chiaSpec.mau} =`, nb(chiaSpec.tu), "/", nb(chiaSpec.mau)], "Số bị chia là tử số, số chia là mẫu số.", "9 : 4 = 9/4. Tử số 9 lớn hơn mẫu số 4 nên 9/4 lớn hơn 1: mỗi bạn được nhiều hơn 1 cái bánh."),
];

function chuoiParts(base: [number, number], items: (typeof chuoi)[number]["items"]): FillQuestion["parts"] {
  const out: FillQuestion["parts"] = [];
  let text = `${base.join("/")} =`;
  items.forEach((it, i) => {
    if ("tu" in it) {
      out.push(`${text} ${it.tu}/`, nb((base[1] * it.tu) / base[0]));
      text = i < items.length - 1 ? " =" : "";
    } else {
      out.push(`${text} `, nb((base[0] * it.mau) / base[1]), `/${it.mau}`);
      text = " =";
    }
  });
  return out;
}

const tinhChatQs: Question[] = [
  fill("tc-1", "Số ?", chuoiParts(chuoi[0].base, chuoi[0].items), "Tìm số mà tử số hoặc mẫu số đã cho được nhân hoặc chia với, rồi làm giống vậy với số còn lại.", "24/36 = 12/18 (chia cả hai cho 2); 24/36 = 2/3 (chia cả hai cho 12); 24/36 = 2/3 và 2/3 = 20/30 (nhân cả hai với 10), nên 24/36 = 20/30."),
  fill("tc-2", "Số ?", chuoiParts(chuoi[1].base, chuoi[1].items), "Rút gọn 60/100 trước: chia cả hai cho 20 được 3/5. Rồi nhân lên.", "60/100 = 12/20 (chia cho 5); 60/100 = 3/5 (chia cho 20); 60/100 = 30/50 (chia cho 2)."),
  choice("tc-3", `Phân số nào bằng ${bangPs.frac}?`, bangPs.options, bangPs.options.findIndex((o) => equal(o, bangPs.frac)), "Rút gọn từng phân số xem phân số nào ra 4/9.", "12/27 = (12 : 3)/(27 : 3) = 4/9. Các phân số còn lại rút gọn ra 1/2, 2/3, 2/3."),
];

const rutGonQs: Question[] = [
  words("rg-1", "Rút gọn các phân số (đến phân số tối giản).", rutGon.map(([a, b]) => [`${a}/${b} =`, nb(a / gcd(a, b)), "/", nb(b / gcd(a, b))]), "Tìm số lớn hơn 1 chia hết cả tử số và mẫu số. Rút gọn đến khi không còn rút được.", "36/48 = 3/4 (chia cho 12); 45/75 = 3/5 (chia cho 15). Cả hai đều là phân số tối giản."),
  words("rg-2", "Tính (rút gọn bằng cách bỏ các thừa số giống nhau ở tử số và mẫu số).", tich.map(({ tu, mau }) => [`(${tu.join(" × ")})/(${mau.join(" × ")}) =`, nb(prod(tu) / gcd(prod(tu), prod(mau))), "/", nb(prod(mau) / gcd(prod(tu), prod(mau)))]), "Gạch các thừa số có ở cả tử số và mẫu số, rồi tính phần còn lại. Đừng nhân hết ra.", "(11 × 8 × 15)/(15 × 11 × 12): bỏ 11 và 15, còn 8/12 = 2/3. (7 × 9 × 13)/(13 × 7 × 21): bỏ 7 và 13, còn 9/21 = 3/7."),
];

const quyDongQs: Question[] = [
  words("qd-1", "Quy đồng mẫu số hai phân số (giữ nguyên phân số có mẫu số lớn).", quyDongHai.map(({ a, b }) => [`${a.join("/")} và ${b.join("/")}: ${a.join("/")} =`, nb((a[0] * b[1]) / a[1]), `/${b[1]}`]), "Mẫu số lớn chia cho mẫu số bé được thương bao nhiêu thì nhân cả tử số và mẫu số của phân số có mẫu số bé với số đó.", "40 : 8 = 5 nên 3/8 = 15/40. 100 : 25 = 4 nên 7/25 = 28/100."),
  words("qd-2", `Quy đồng mẫu số ${quyDongBa.a.join("/")}; ${quyDongBa.b.join("/")} và ${quyDongBa.giuNguyen} (giữ nguyên ${quyDongBa.giuNguyen}).`, [quyDongBa.a, quyDongBa.b].map((x) => [`${x.join("/")} =`, nb((x[0] * quyDongBa.mau) / x[1]), `/${quyDongBa.mau}`]), "Mẫu số chung là 24. Tìm số nhân mỗi mẫu số để được 24.", "24 : 4 = 6 nên 3/4 = 18/24. 24 : 6 = 4 nên 5/6 = 20/24."),
];

const soSanhQs: Question[] = [
  compare("ss-1", soSanhRows[0], "Cùng mẫu số thì so tử số. So với 1 thì so tử số với mẫu số.", "3 < 5 nên 3/8 kg < 5/8 kg. 9/8 có tử số lớn hơn mẫu số nên 9/8 > 1."),
  compare("ss-2", soSanhRows[1], "Cùng tử số thì mẫu số bé hơn, phân số lớn hơn. 12/9 rút gọn được.", "7/9 > 7/12 vì 9 < 12. 12/9 = 4/3 nên hai phân số bằng nhau."),
  compare("ss-3", soSanhRows[2], "Quy đồng 5/6 và 11/12 về mẫu số 12. Viết 2 m thành phân số mẫu số 7.", "5/6 = 10/12 < 11/12. 2 = 14/7 và 15/7 > 14/7."),
  choice("so-1", "Ba vòi nước cùng chảy vào một bể. Trong 1 giờ, vòi số 1 chảy được 3/5 bể, vòi số 2 chảy được 7/10 bể, vòi số 3 chảy được 13/20 bể. Vòi nào chảy được nhiều nước nhất?", voi.map((v) => v.name), voi.indexOf(sortAsc(voi)[2]), "Quy đồng ba phân số về mẫu số 20.", "3/5 = 12/20; 7/10 = 14/20; 13/20. Lớn nhất là 14/20 nên vòi số 2 chảy được nhiều nhất."),
  choice("so-2", "Cũng ba vòi nước đó: vòi nào chảy được ít nước nhất?", voi.map((v) => v.name), voi.indexOf(sortAsc(voi)[0]), "Dùng các phân số cùng mẫu số 20 vừa quy đồng. Chọn số bé nhất.", "12/20 là bé nhất nên vòi số 1 chảy được ít nước nhất."),
  choice("so-3", "Cân nặng: gà 5/2 kg, thỏ 19/4 kg, vịt 9/4 kg, mèo 28/8 kg. Viết tên các con vật theo thứ tự cân nặng từ bé đến lớn.", orderOptions(conVat), 1, "Quy đồng về mẫu số 4: 28/8 rút gọn được.", "5/2 = 10/4; 28/8 = 14/4; 9/4; 19/4. So tử số: 9 < 10 < 14 < 19, nên từ bé đến lớn: vịt, gà, mèo, thỏ."),
  choice("so-4", "Mai chạy hết 3/4 phút, Nam chạy hết 5/8 phút, Việt chạy hết 7/12 phút, Rô-bốt chạy hết 2/3 phút. Ai về đích đầu tiên?", chayThi.map((v) => v.name), chayThi.indexOf(sortAsc(chayThi)[0]), "Về đích đầu tiên là chạy hết ít thời gian nhất. Quy đồng về mẫu số 24.", "3/4 = 18/24; 5/8 = 15/24; 7/12 = 14/24; 2/3 = 16/24. Việt chạy hết ít thời gian nhất (14/24) nên về đích đầu tiên."),
  choice("so-5", "Vẫn bốn bạn đó: ai về đích cuối cùng?", chayThi.map((v) => v.name), chayThi.indexOf(sortAsc(chayThi)[3]), "Về cuối cùng là chạy hết nhiều thời gian nhất.", "Thời gian nhiều nhất là 18/24 phút của Mai, nên Mai về đích cuối cùng."),
  choice("so-6", "Phân số nào dưới đây bé hơn 1?", nhoHon1.options, nhoHon1.options.findIndex((o) => frac(o)[0] < frac(o)[1]), "Phân số bé hơn 1 có tử số bé hơn mẫu số.", "24/36 có tử số 24 bé hơn mẫu số 36 nên bé hơn 1. Ba phân số còn lại có tử số lớn hơn mẫu số."),
  choice("so-7", `Phân số nào dưới đây lớn hơn ${lonHon.frac}?`, lonHon.options, lonHon.options.findIndex((o) => less(lonHon.frac, o)), "Rút gọn hoặc quy đồng rồi so sánh với 2/3.", "7/9 = 21/27 và 2/3 = 18/27 nên 7/9 > 2/3. 14/21 = 2/3, còn 4/9 và 8/15 bé hơn 2/3."),
];

const suyNghi: Question[] = [
  choice("sn-1", "Việt chạy hết 7/12 phút, Mai chạy hết 3/4 phút. Bạn An nói: “3/4 lớn hơn nên Mai về đích đầu tiên.” An sai ở đâu?", ["An nói đúng", "Phân số lớn hơn nghĩa là chạy hết nhiều thời gian hơn, nên Mai về sau Việt. Việt về đích đầu tiên", "Phải so tử số: 7 > 3 nên Việt về sau"], 1, "Về đích đầu tiên là chạy hết ít thời gian hơn, khác với “nhiều hơn”.", "3/4 = 9/12 lớn hơn 7/12, tức Mai chạy hết nhiều thời gian hơn. Ít thời gian hơn thì về trước, nên Việt về đích đầu tiên."),
  choice("sn-2", "Nam nói: “3/7 lớn hơn 3/5 vì 7 lớn hơn 5.” Nam nói đúng không?", ["Đúng", "Sai: tử số bằng nhau thì mẫu số lớn hơn, phân số lại bé hơn. 3/7 < 3/5"], 1, "Chia một cái bánh thành 7 phần và thành 5 phần: phần nào to hơn?", "Cùng lấy 3 phần nhưng chia thành 7 phần thì mỗi phần nhỏ hơn chia thành 5 phần. Vậy 3/7 < 3/5."),
  fill("sn-3", "Tìm phân số bằng 2/3 mà tổng của tử số và mẫu số là 35 (vượt SGK). Số ?", ["2/3 =", nb(14), "/", nb(21)], "Phân số bằng 2/3 có dạng (2 × k)/(3 × k). Tổng tử số và mẫu số là 5 × k.", "5 × k = 35 nên k = 7. 2/3 = (2 × 7)/(3 × 7) = 14/21 và 14 + 21 = 35."),
  choice("sn-4", "Phân số nào gần 1 nhất trong ba phân số 7/8; 9/10; 11/12 (vượt SGK)?", ["7/8", "9/10", "11/12"], 2, "Mỗi phân số còn thiếu bao nhiêu để đủ 1? 7/8 thiếu 1/8.", "7/8 thiếu 1/8; 9/10 thiếu 1/10; 11/12 thiếu 1/12. 1/12 bé nhất nên 11/12 gần 1 nhất."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "khai-niem", title: "Phân số và phép chia (Bài 53, 54)", questions: khaiNiemQs },
  { id: "tinh-chat", title: "Phân số bằng nhau (Bài 55)", questions: tinhChatQs },
  { id: "rut-gon", title: "Rút gọn phân số (Bài 56)", questions: rutGonQs },
  { id: "quy-dong", title: "Quy đồng mẫu số (Bài 57)", questions: quyDongQs },
  { id: "so-sanh", title: "So sánh và sắp xếp phân số (Bài 58, 59)", questions: soSanhQs },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
