import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { createElement } from "react";
import { AoDat, HinhChiaDoi, KhayOcVit, type MauKhay } from "./_illustrations/hinh";

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
const NB = " ";

/** Số liệu các câu (đổi so với SGK, trừ chỗ gắn với hình). Test tính lại đáp án bằng nhân chéo, không so với số gõ tay. */
// Bài 63: nhân.
export const nhanSpecs: [F, F][] = [[[3, 4], [2, 9]], [[5, 6], [3, 10]], [[4, 1], [5, 8]]];
export const thuanTienA: F[] = [[5, 6], [9, 7], [6, 5]];
/** (a × c) + (b × c) */
export const thuanTienB = { a: [7, 9] as F, b: [2, 9] as F, c: [4, 5] as F };
// Bài 64: chia.
export const chiaSpecs: [F, F][] = [[[7, 10], [3, 5]], [[6, 7], [3, 1]], [[8, 1], [4, 5]]];
/** Tìm phân số thích hợp: "chia-so-bi-chia" là ? : a = c; "chia-so-chia" là a : ? = c; "nhan" là ? × a = 1. */
export const timSpecs: { kind: "so-bi-chia" | "so-chia" | "nhan"; a: F; c: F }[] = [
  { kind: "so-bi-chia", a: [3, 4], c: [2, 9] },
  { kind: "so-chia", a: [5, 6], c: [5, 9] },
  { kind: "nhan", a: [4, 7], c: [1, 1] },
];
/** Nối phép tính với kết quả (SGK tr.99): đổi số liệu. */
export const noiSpecs: { op: "×" | ":"; a: F; b: F }[] = [
  { op: "×", a: [3, 5], b: [2, 1] },
  { op: "×", a: [2, 9], b: [3, 4] },
  { op: ":", a: [5, 7], b: [7, 5] },
  { op: ":", a: [4, 9], b: [2, 1] },
];
// Bài 65: tìm phân số của một số.
export const quangDuong = { total: 36, done: [5, 9] as F };
export const tuoi = { ong: 64, ratio: [1, 8] as F, hon: 4 };
export const hopCoi = { total: 1200, share: [1, 4] as F, weight: [3, 2] as F };
/** Số lọ là số đặt riêng (ảnh sách không đếm chắc được số lọ). */
export const vai = { total: 15, jar: [3, 4] as F, jars: 8 };
/** Hình cố định: 4 hàng × 2 khay, đen 3, vàng 3, trắng 2. */
export const khayHang: [MauKhay, MauKhay][] = [["trang", "trang"], ["vang", "vang"], ["vang", "den"], ["den", "den"]];
export const khay = { total: 800 };
/** Hình cố định (SGK tr.99): mảnh đất 4 m, diện tích 91/2 m², lối đi 1 m. */
export const aoSpec = { width: 4, area: [91, 2] as F, path: 1 };
/** Hình cố định (SGK tr.100): rộng 2 cm, hai hình chữ nhật nhỏ 21/2 và 25 cm². */
export const chiaDoiSpec = { width: 2, small: [21, 2] as F, big: [25, 1] as F };
// Biểu thức.
export const bieuThucC = { a: [5, 4] as F, b: [1, 2] as F, c: [2, 3] as F };
/** Biểu thức nào lớn nhất: A = n × f; B = (a − b) : c; C = (a × b) : n. */
export const lonNhat = {
  A: { n: 10, f: [2, 5] as F },
  B: { a: [5, 6] as F, b: [1, 3] as F, c: [1, 12] as F },
  C: { a: [3, 4] as F, b: [8, 9] as F, n: 3 },
};
/** 1 kg chuối tươi sấy được 1/4 kg chuối khô; mỗi lựa chọn là số đo kèm số kg. */
export const sayChuoi = { ratio: [1, 4] as F, options: [["1/4", "tấn"], ["1/4", "tạ"], ["4", "yến"], ["4", "tạ"]] as [string, string][] };
export const banhChung = { pieces: 8, tiNoi: [1, 5] as F, teoNoi: [1, 4] as F };
export const lanSpec = { n: 20, f: [3, 4] as F };
export const uocLuong = { n: 24, f: [5, 6] as F };

const nb = (answer: number) => ({ answer });
/** Ô trống cho phân số: kết quả là số tự nhiên thì chỉ một ô. */
const ans = (f: F, head = "", tail = ""): FillQuestion["parts"] => (f[1] === 1 ? [head, nb(f[0]), tail] : [head, nb(f[0]), "/", nb(f[1]), tail]);

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
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
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NB);

/** Câu thử trong phần Nhắc lại nhanh, cũng là kiểm tra đầu vào. Không tính vào tiến độ. */
export const quickChecks = {
  nhan: fill("thu-nhan", "Tính (rút gọn kết quả).", ans(mul([2, 3], [4, 5]), "2/3 × 4/5 ="), "Nhân tử số với tử số, mẫu số với mẫu số.", "2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15. Phân số 8/15 đã tối giản."),
  rutGon: fill("thu-rut-gon", "Rút gọn khi tính. Số ?", ["4/9 × 3/8 = (4 × 3)/(9 × 8) = 12/72 =", nb(1), "/", nb(6)], "Chia cả tử số và mẫu số cho 12. Hoặc rút gọn 4 với 8 và 3 với 9 trước khi nhân.", "12 : 12 = 1 và 72 : 12 = 6, vậy 4/9 × 3/8 = 1/6."),
  chia: fill("thu-chia", "Tính (kết quả viết dưới dạng phân số).", ans(div([3, 4], [2, 5]), "3/4 : 2/5 ="), "Giữ nguyên phân số thứ nhất, nhân với phân số đảo ngược của phân số thứ hai.", explainDiv([3, 4], [2, 5])),
  daoNguoc: fill("thu-dao-nguoc", "Hai phân số có tích bằng 1 là phân số đảo ngược của nhau. Số ?", ["5/9 ×", nb(9), "/", nb(5), "= 1"], "Đổi chỗ tử số và mẫu số của 5/9.", "Phân số đảo ngược của 5/9 là 9/5. Thử lại: 5/9 × 9/5 = 45/45 = 1."),
  timPhanSo: fill("thu-tim-phan-so", "Tìm 5/6 của 24 (nhân số đó với phân số).", ["24 × 5/6 = 120/6 =", nb(20)], "Số đó nhân với phân số: nhân tử số, giữ mẫu số, rồi rút gọn.", "24 × 5/6 = 120/6 = 20. Cũng như chia 24 thành 6 phần (mỗi phần 4) rồi lấy 5 phần."),
  thuTu: fill("thu-thu-tu", "Tính 5/6 − 1/3 : 2. Chia trước, trừ sau.", ["1/3 : 2 =", nb(1), "/", nb(6), "; 5/6 − 1/6 =", nb(2), "/", nb(3)], "Biểu thức có nhân, chia và cộng, trừ thì nhân, chia làm trước.", "1/3 : 2 = 1/3 × 1/2 = 1/6. Rồi 5/6 − 1/6 = 4/6 = 2/3."),
};

const nhanGroup: Question[] = [
  ...nhanSpecs.map(([a, b], i) => fill(`n-${i + 1}`, "Tính (rút gọn kết quả nếu được).", ans(mul(a, b), `${text(a)} × ${text(b)} =`), "Nhân tử số với tử số, mẫu số với mẫu số. Số tự nhiên n viết thành n/1.", explainMul(a, b))),
  fill("tt-1", "Tính bằng cách thuận tiện.", ans(thuanTienA.reduce(mul), `${thuanTienA.map(text).join(" × ")} =`), "Hai phân số 5/6 và 6/5 nhân với nhau được 1. Đổi chỗ các thừa số rồi nhân.", `Đổi chỗ: 5/6 × 6/5 × 9/7. Vì 5/6 × 6/5 = 30/30 = 1 nên kết quả là 1 × 9/7 = 9/7.`),
  (() => {
    const { a, b, c } = thuanTienB;
    return fill("tt-2", "Tính bằng cách thuận tiện.", ans(mul(add(a, b), c), `${text(a)} × ${text(c)} + ${text(b)} × ${text(c)} =`), "Hai tích cùng có thừa số 4/5. Dùng tính chất: (a + b) × c.", `(7/9 + 2/9) × 4/5 = 9/9 × 4/5 = 1 × 4/5 = 4/5.`);
  })(),
];

const noiQuestion: MatchQuestion = {
  id: "noi",
  kind: "noi-cap",
  prompt: "Nối mỗi phép tính ở cột trái với kết quả ở cột phải (kết quả đã rút gọn).",
  pairs: noiSpecs.map(({ op, a, b }) => ({ left: `${text(a)} ${op} ${text(b)}`, right: text(op === "×" ? mul(a, b) : div(a, b)) })),
  rightOrder: [1, 2, 3, 0],
  hint: "Tính từng phép tính, rồi tìm kết quả trùng. Phép chia thì nhân với phân số đảo ngược.",
  explanation: noiSpecs.map(({ op, a, b }) => `${text(a)} ${op} ${text(b)} = ${text(op === "×" ? mul(a, b) : div(a, b))}`).join("; ") + ".",
};

const chiaGroup: Question[] = [
  ...chiaSpecs.map(([a, b], i) => fill(`ch-${i + 1}`, "Tính (rút gọn kết quả nếu được).", ans(div(a, b), `${text(a)} : ${text(b)} =`), "Giữ phân số thứ nhất, nhân với phân số đảo ngược của phân số thứ hai. Số tự nhiên n viết thành n/1.", explainDiv(a, b))),
  ...timSpecs.map((s, i) => {
    const hint = ["Muốn tìm số bị chia, lấy thương nhân với số chia.", "Muốn tìm số chia, lấy số bị chia chia cho thương.", "Tích của hai phân số bằng 1 thì chúng đảo ngược của nhau."][i];
    if (s.kind === "so-bi-chia") {
      const r = mul(s.c, s.a);
      return fill(`tim-${i + 1}`, "Tìm phân số thích hợp.", ans(r, `? : ${fr(s.a)} = ${fr(s.c)}, vậy ? =`), hint, `Số bị chia = thương × số chia: ${explainMul(s.c, s.a)} Thử lại: ${text(r)} : ${fr(s.a)} = ${fr(s.c)}.`);
    }
    if (s.kind === "so-chia") {
      const r = div(s.a, s.c);
      return fill(`tim-${i + 1}`, "Tìm phân số thích hợp.", ans(r, `${fr(s.a)} : ? = ${fr(s.c)}, vậy ? =`), hint, `Số chia = số bị chia : thương: ${explainDiv(s.a, s.c)} Thử lại: ${fr(s.a)} : ${text(r)} = ${fr(s.c)}.`);
    }
    const r = inv(s.a);
    return fill(`tim-${i + 1}`, "Tìm phân số thích hợp.", ans(r, `? × ${fr(s.a)} = 1, vậy ? =`), hint, `Phân số đảo ngược của ${fr(s.a)} là ${fr(r)}. Thử lại: ${fr(r)} × ${fr(s.a)} = ${r[0] * s.a[0]}/${r[1] * s.a[1]} = 1.`);
  }),
  noiQuestion,
];

const timGroup: Question[] = [
  (() => {
    const done = mul(nat(quangDuong.total), quangDuong.done);
    const left = sub(nat(quangDuong.total), done);
    return words("qd", `Quãng đường từ nhà bạn Hoa đến chợ dài ${quangDuong.total} km. Bạn Hoa đã đi được ${fr(quangDuong.done)} quãng đường thì nghỉ. Hỏi bạn Hoa phải đi tiếp bao nhiêu ki-lô-mét nữa thì đến chợ?`, [ans(done, `${quangDuong.total} × ${fr(quangDuong.done)} =`, "km đã đi"), ans(left, `${quangDuong.total} − ${text(done)} =`, "km")], "Tìm quãng đường đã đi (phân số của cả quãng đường), rồi lấy cả quãng đường trừ đi.", `${explainMul(nat(quangDuong.total), quangDuong.done)} Còn lại ${quangDuong.total} − ${text(done)} = ${text(left)} km.`);
  })(),
  (() => {
    const viet = mul(nat(tuoi.ong), tuoi.ratio);
    const anh = add(viet, nat(tuoi.hon));
    return words("tuoi", `Năm nay, ông nội của Nam ${tuoi.ong} tuổi, tuổi của Nam bằng ${fr(tuoi.ratio)} tuổi của ông nội. Chị Mai lớn hơn Nam ${tuoi.hon} tuổi. Hỏi năm nay chị Mai bao nhiêu tuổi?`, [ans(viet, `${tuoi.ong} × ${fr(tuoi.ratio)} =`, "tuổi (Nam)"), ans(anh, `${text(viet)} + ${tuoi.hon} =`, "tuổi (chị Mai)")], "Tìm tuổi của Nam trước (phân số của tuổi ông), rồi cộng với số tuổi chị lớn hơn.", `${explainMul(nat(tuoi.ong), tuoi.ratio)} Chị Mai: ${text(viet)} + ${tuoi.hon} = ${text(anh)} tuổi.`);
  })(),
  (() => {
    const hop = mul(nat(hopCoi.total), hopCoi.share);
    const kg = mul(hop, hopCoi.weight);
    return words("hop", `Một công ty nhận đơn hàng làm ${fmt(hopCoi.total)} chiếc hộp cói, trong đó một tổ nhận ${fr(hopCoi.share)} đơn hàng. Mỗi hộp cói nặng ${fr(hopCoi.weight)} kg.`, [ans(hop, `${fmt(hopCoi.total)} × ${fr(hopCoi.share)} =`, "chiếc hộp (của tổ)"), ans(kg, `${text(hop)} × ${fr(hopCoi.weight)} =`, "kg")], "a) Tìm phân số của cả đơn hàng. b) Số hộp nhân với cân nặng mỗi hộp.", `Số hộp: ${fmt(hopCoi.total)} × ${fr(hopCoi.share)} = ${fmt(hopCoi.total)}/4 = ${text(hop)}. Cân nặng: ${text(hop)} × ${fr(hopCoi.weight)} = ${text(hop)}×3/2 = ${text(kg)} kg.`);
  })(),
  (() => {
    const rot = mul(nat(vai.jars), vai.jar);
    const con = sub(nat(vai.total), rot);
    return words("vai", `Một vại tương đựng ${vai.total} l. Người ta rót vào ${vai.jars} lọ nhỏ, mỗi lọ ${fr(vai.jar)} l. Trong vại còn lại bao nhiêu lít tương?`, [ans(rot, `${vai.jars} × ${fr(vai.jar)} =`, "l đã rót"), ans(con, `${vai.total} − ${text(rot)} =`, "l")], "Số lít đã rót bằng số lọ nhân với số lít mỗi lọ. Rồi lấy cả vại trừ đi.", `${explainMul(nat(vai.jars), vai.jar)} Còn lại ${vai.total} − ${text(rot)} = ${text(con)} l.`);
  })(),
  (() => {
    const den = khayHang.flat().filter((c) => c === "den").length;
    const trang = khayHang.flat().filter((c) => c === "trang").length;
    const total = khayHang.length * 2;
    const slTrang = mul(nat(khay.total), [trang, total]);
    return words("khay", `Một cửa hàng có ${total} khay đựng ốc vít theo từng loại màu trắng, vàng, đen (xem hình), số ốc vít ở mỗi khay là như nhau. Biết tổng số ốc vít là ${khay.total} cái.`, [ans([den, total], "Số ốc vít màu đen chiếm", "tổng số ốc vít"), ans(slTrang, "Số ốc vít màu trắng là", "cái")], "Đếm số khay mỗi màu trong hình. Mỗi khay là 1/8 tổng số ốc vít.", `Hình có 8 khay: 3 đen, 3 vàng, 2 trắng. Màu đen chiếm 3/8 tổng số. Màu trắng chiếm 2/8 = 1/4: ${khay.total} × 2/8 = ${text(slTrang)} cái.`, createElement(KhayOcVit, { hang: khayHang }));
  })(),
];

const tongHopGroup: Question[] = [
  (() => {
    const { a, b, c } = bieuThucC;
    const q = div(b, c);
    const r = sub(a, q);
    return words("bt", `Tính ${fr(a)} − ${fr(b)} : ${fr(c)}. Chia trước, trừ sau.`, [ans(q, `${fr(b)} : ${fr(c)} =`), ans(r, `${fr(a)} − ${text(q)} =`)], "Phép chia làm trước phép trừ. Phép trừ khác mẫu số thì quy đồng.", `${explainDiv(b, c)} Rồi ${fr(a)} − ${text(q)} = ${text(r)}.`);
  })(),
  (() => {
    const { A, B, C } = lonNhat;
    const va = mul(nat(A.n), A.f);
    const vb = div(sub(B.a, B.b), B.c);
    const vc = div(mul(C.a, C.b), nat(C.n));
    const vals = [va, vb, vc];
    const best = vals.reduce((m, v, i) => (v[0] * vals[m][1] > vals[m][0] * v[1] ? i : m), 0);
    return choice("lon-nhat", "Biểu thức nào sau đây có giá trị lớn nhất?", [`A. ${A.n} × ${fr(A.f)}`, `B. (${fr(B.a)} − ${fr(B.b)}) : ${fr(B.c)}`, `C. (${fr(C.a)} × ${fr(C.b)}) : ${C.n}`], best, "Tính giá trị từng biểu thức (trong ngoặc trước), rồi so sánh.", `A = ${text(va)}; B = ${fr(B.a)} − ${fr(B.b)} = ${text(sub(B.a, B.b))}, rồi ${text(sub(B.a, B.b))} : ${fr(B.c)} = ${text(vb)}; C = ${text(mul(C.a, C.b))} : ${C.n} = ${text(vc)}. Giá trị lớn nhất là ${text(vals[best])}.`);
  })(),
  (() => {
    const length = div(aoSpec.area, nat(aoSpec.width));
    const rong = aoSpec.width - aoSpec.path;
    const ao = mul(length, nat(rong));
    return words("ao", `Một mảnh đất hình chữ nhật ABCD có chiều rộng ${aoSpec.width} m và diện tích ${fr(aoSpec.area)} m². Người ta đào một cái ao hình chữ nhật trên mảnh đất, phần đất còn lại làm một lối đi rộng ${aoSpec.path} m dọc cạnh DC (như hình). Tính diện tích cái ao.`, [ans(length, `Chiều dài AB = ${fr(aoSpec.area)} : ${aoSpec.width} =`, "m"), ans(nat(rong), `Chiều rộng ao = ${aoSpec.width} − ${aoSpec.path} =`, "m"), ans(ao, `Diện tích ao = ${text(length)} × ${rong} =`, "m²")], "Chiều dài = diện tích : chiều rộng. Ao có chiều dài bằng mảnh đất, chiều rộng bớt đi bề rộng lối đi.", `Chiều dài ${explainDiv(aoSpec.area, nat(aoSpec.width))} Ao rộng ${aoSpec.width} − ${aoSpec.path} = ${rong} m. Diện tích ao: ${explainMul(length, nat(rong))}`, createElement(AoDat));
  })(),
  (() => {
    const l1 = div(chiaDoiSpec.small, nat(chiaDoiSpec.width));
    const l2 = div(chiaDoiSpec.big, nat(chiaDoiSpec.width));
    const all = add(l1, l2);
    return words("chia-doi", "Hình chữ nhật AEGD được chia thành hai hình chữ nhật nhỏ ABCD và BEGC như hình. Chiều rộng là 2 cm, diện tích hai hình nhỏ là 21/2 cm² và 25 cm². Chiều dài của hình chữ nhật lớn nhất (AEGD) là bao nhiêu xăng-ti-mét?", [ans(l1, `AB = ${fr(chiaDoiSpec.small)} : ${chiaDoiSpec.width} =`, "cm"), ans(l2, `BE = ${chiaDoiSpec.big[0]} : ${chiaDoiSpec.width} =`, "cm"), ans(all, `AE = ${text(l1)} + ${text(l2)} =`, "cm")], "Chiều dài mỗi hình nhỏ bằng diện tích chia cho chiều rộng. Chiều dài hình lớn là tổng hai chiều dài nhỏ.", `${explainDiv(chiaDoiSpec.small, nat(chiaDoiSpec.width))} BE = 25 : 2 = 25/2. AE = 21/4 + 25/2 = 21/4 + 50/4 = ${text(all)} cm.`, createElement(HinhChiaDoi));
  })(),
  (() => {
    // 1 tạ = 100 kg, nên số kg chuối khô là 100 × 1/4 = 25. Mỗi lựa chọn đổi ra kg để đối chiếu.
    const kg = (n: [string, string]) => {
      const unit = { tấn: 1000, tạ: 100, yến: 10 }[n[1] as "tấn" | "tạ" | "yến"];
      return n[0] === "1/4" ? unit / 4 : Number(n[0]) * unit;
    };
    const want = mul(nat(100), sayChuoi.ratio)[0];
    const idx = sayChuoi.options.findIndex((o) => kg(o) === want);
    return choice("chuoi", `Một rô-bốt sấy chuối: cứ 1 kg chuối tươi sấy được ${fr(sayChuoi.ratio)} kg chuối khô. Nếu rô-bốt thu hoạch 1 tạ chuối tươi thì sấy được lượng chuối khô là bao nhiêu?`, sayChuoi.options.map(([n, u], i) => `${"ABCD"[i]}. ${n} ${u}`), idx, "Đổi 1 tạ ra ki-lô-gam, tìm 1/4 của số đó, rồi đổi các lựa chọn ra ki-lô-gam để so.", `1 tạ = 100 kg. 100 × 1/4 = 25 kg. Đổi các lựa chọn: 1/4 tấn = 250 kg; 1/4 tạ = 25 kg; 4 yến = 40 kg; 4 tạ = 400 kg. Chỉ 1/4 tạ bằng 25 kg.`);
  })(),
];

const suyNghi: Question[] = [
  choice(
    "sn-1",
    `Lan tìm ${fr(lanSpec.f)} của ${lanSpec.n} bằng phép tính ${lanSpec.n} : ${fr(lanSpec.f)} = ${text(div(nat(lanSpec.n), lanSpec.f))}. Lan sai ở đâu?`,
    ["Tìm phân số của một số thì phải nhân, không phải chia", "Lan tính đúng", "Phải lấy 20 trừ đi 3/4"],
    0,
    "Tìm 3/4 của 20 nghĩa là chia 20 thành 4 phần bằng nhau rồi lấy 3 phần.",
    `Phân số của một số là phép nhân: ${explainMul(nat(lanSpec.n), lanSpec.f)} Kết quả 15 bé hơn 20, còn kết quả của Lan lớn hơn 20 nên không thể là 3/4 của 20.`,
  ),
  (() => {
    const r = mul(nat(uocLuong.n), uocLuong.f);
    const less = r[0] < uocLuong.n * r[1];
    return choice("sn-2", `Chưa tính, ước lượng (vượt SGK): ${uocLuong.n} × ${fr(uocLuong.f)} so với ${uocLuong.n} thì thế nào?`, ["Lớn hơn", "Bằng", "Bé hơn"], less ? 2 : 0, "Phân số 5/6 bé hơn 1 hay lớn hơn 1?", `Nhân với phân số bé hơn 1 thì kết quả bé đi. ${explainMul(nat(uocLuong.n), uocLuong.f)}`);
  })(),
  (() => {
    const { pieces, tiNoi, teoNoi } = banhChung;
    const ok = (f: F) => (pieces * f[0]) % f[1] === 0;
    return choice("sn-3", `Một cái bánh chưng được cắt thành ${pieces} miếng bằng nhau. Tí và Tèo lấy ra một số miếng rồi nói chuyện. Tí nói: “Tèo đã lấy ${fr(tiNoi)} số miếng bánh.” Tèo nói: “Tí đã lấy ${fr(teoNoi)} số miếng bánh.” Biết chỉ có một bạn nói sai. Hỏi ai nói sai?`, ["Tí nói sai", "Tèo nói sai"], ok(tiNoi) ? 1 : 0, "Số miếng là số tự nhiên. Thử tìm 1/5 và 1/4 của 8 xem có ra số tự nhiên không.", `1/4 của 8 miếng là 8 : 4 = 2 miếng, hợp lý. 1/5 của 8 miếng là 8/5, không phải số miếng nguyên, nên Tèo không thể lấy 1/5 số miếng. Vậy Tí nói sai.`);
  })(),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "nhan", title: "Nhân phân số (Bài 63)", questions: nhanGroup },
  { id: "chia", title: "Chia phân số (Bài 64)", questions: chiaGroup },
  { id: "tim-phan-so", title: "Tìm phân số của một số (Bài 65)", questions: timGroup },
  { id: "tong-hop", title: "Biểu thức, hình và đơn vị", questions: tongHopGroup },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
