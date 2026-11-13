import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { docPhanSo, HinhPhanSo, phanTo, type HinhPhanSoProps } from "@/components/math/phan-so";
import { createElement } from "react";

const hinh = (props: HinhPhanSoProps) => createElement(HinhPhanSo, props);
/** Tử số = số phần đã tô, mẫu số = số phần bằng nhau: lấy thẳng từ dữ liệu hình. */
const tuMau = (p: HinhPhanSoProps) => ({ tu: phanTo(p.to).size, mau: p.mau });

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}

/** Câu "viết phân số chỉ phần đã tô": hai ô trống là tử số và mẫu số. */
function vietPhanSo(id: string, p: HinhPhanSoProps, hint: string, explanation: string) {
  const { tu, mau } = tuMau(p);
  return fill(id, "Viết phân số chỉ phần đã tô màu.", ["Phân số:", { answer: tu }, "/", { answer: mau }], hint, explanation, hinh(p));
}

// Hình dùng trong bài: số phần tô và tổng số phần lấy từ đây.
export const hinhs = {
  kd1: { kieu: "tron", mau: 6, to: 2 },
  kd2: { kieu: "bang", mau: 5, to: 3 },
  kd3: { kieu: "nhom", mau: 8, cot: 4, to: 5 },
  doc: { kieu: "tron", mau: 8, to: 3 },
  khongDeu: { kieu: "tron", mau: 3, to: 1, chia: [4, 1, 1] },
  tuMau: { kieu: "bang", mau: 7, to: 4 },
  v1: { kieu: "tron", mau: 8, to: 3 },
  v2: { kieu: "bang", mau: 6, to: 5 },
  v3: { kieu: "nhom", mau: 7, cot: 4, to: [0, 2, 5] },
  v4: { kieu: "bang", mau: 9, cot: 3, to: [0, 4, 5, 8] },
  v5: { kieu: "tron", mau: 10, to: 7 },
  tuong: { kieu: "bang", mau: 12, cot: 4, to: [0, 1, 4, 5, 6] },
  banh: { kieu: "tron", mau: 9, to: 4 },
  lech: { kieu: "tron", mau: 3, to: 1, chia: [4, 1, 1] },
  sn2: { kieu: "bang", mau: 8, cot: 4, to: 3 },
  sn4: { kieu: "bang", mau: 10, cot: 5, to: 7 },
  sn5: { kieu: "nhom", mau: 5, cot: 5, to: 2 },
} satisfies Record<string, HinhPhanSoProps>;

/** Khởi động: đếm phần bằng nhau và phần đã tô. Không tính vào tiến độ. */
export const warmUps: Question[] = (["kd1", "kd2", "kd3"] as const).map((key, i) => {
  const { tu, mau } = tuMau(hinhs[key]);
  return fill(`kd-${i + 1}`, "Đếm số phần bằng nhau của cả hình và số phần đã tô màu.", ["Cả hình có", { answer: mau }, "phần bằng nhau, đã tô", { answer: tu }, "phần."], "Đếm tất cả các phần trước, rồi đếm riêng các phần có màu.", `Cả hình có ${mau} phần bằng nhau, trong đó ${tu} phần đã tô màu.`, hinh(hinhs[key]));
});

export const quickChecks = {
  doc: choice("thu-doc", "Phân số nào chỉ phần đã tô màu của hình tròn?", ["3/8", "8/3", "5/8", "3/5"], 0, "Tử số là số phần đã tô, mẫu số là số phần bằng nhau của cả hình.", `Hình chia thành ${hinhs.doc.mau} phần bằng nhau, đã tô ${hinhs.doc.to} phần. Phân số là ${hinhs.doc.to}/${hinhs.doc.mau}.`, hinh(hinhs.doc)),
  khongDeu: choice("thu-khong-deu", "Hình tròn chia thành 3 phần, đã tô 1 phần. Con có viết được 1/3 không?", ["Được, vì hình có 3 phần", "Không, vì 3 phần không bằng nhau"], 1, "Nhìn kĩ: ba phần có to bằng nhau không?", "Phân số chỉ dùng khi hình chia thành các phần **bằng nhau**. Ở đây một phần to hơn hẳn hai phần còn lại nên không viết được 1/3.", hinh(hinhs.khongDeu)),
  tuMau: fill("thu-tu-mau", "Điền tử số và mẫu số của phân số chỉ phần đã tô màu.", ["Tử số:", { answer: tuMau(hinhs.tuMau).tu }, "; mẫu số:", { answer: tuMau(hinhs.tuMau).mau }], "Tử số: đếm ô có màu. Mẫu số: đếm tất cả các ô.", `Có ${tuMau(hinhs.tuMau).tu} ô đã tô trong tất cả ${tuMau(hinhs.tuMau).mau} ô bằng nhau. Phân số là 4/7: tử số 4, mẫu số 7.`, hinh(hinhs.tuMau)),
  doc2: choice("thu-doc-phan-so", "Phân số 5/9 đọc là gì?", ["Năm phần chín", "Chín phần năm", "Năm chín phần", "Năm phần mười"], 0, "Đọc tử số trước, rồi đọc “phần” và mẫu số.", `Tử số 5 đọc là “năm”, mẫu số 9 đọc là “phần chín”. Vậy 5/9 đọc là “${docPhanSo(5, 9).toLowerCase()}”.`),
};

const vietHinh: Question[] = [
  vietPhanSo("vh-1", hinhs.v1, "Đếm các phần bằng nhau của cả hình, rồi đếm các phần có màu.", `Cả hình có ${hinhs.v1.mau} phần bằng nhau, đã tô ${tuMau(hinhs.v1).tu} phần. Phân số là ${tuMau(hinhs.v1).tu}/${hinhs.v1.mau}.`),
  vietPhanSo("vh-2", hinhs.v2, "Mẫu số là số ô của cả băng, kể cả ô chưa tô.", `Băng có ${hinhs.v2.mau} ô bằng nhau, đã tô ${tuMau(hinhs.v2).tu} ô. Phân số là ${tuMau(hinhs.v2).tu}/${hinhs.v2.mau}.`),
  vietPhanSo("vh-3", hinhs.v3, "Đếm cả những hình đã tô và chưa tô để tìm mẫu số.", `Có ${hinhs.v3.mau} hình tròn, đã tô ${tuMau(hinhs.v3).tu} hình. Phân số là ${tuMau(hinhs.v3).tu}/${hinhs.v3.mau}.`),
  vietPhanSo("vh-4", hinhs.v4, "Hình có 3 hàng, mỗi hàng 3 ô. Đếm từng hàng để khỏi sót ô.", `Hình có 3 hàng × 3 ô = ${hinhs.v4.mau} ô, đã tô ${tuMau(hinhs.v4).tu} ô. Phân số là ${tuMau(hinhs.v4).tu}/${hinhs.v4.mau}.`),
  vietPhanSo("vh-5", hinhs.v5, "Đếm cả mười múi, kể cả múi trắng.", `Hình tròn chia ${hinhs.v5.mau} phần bằng nhau, đã tô ${tuMau(hinhs.v5).tu} phần. Phân số là ${tuMau(hinhs.v5).tu}/${hinhs.v5.mau}.`),
];

const tuMauDeBai: Question[] = [
  fill("tm-1", "Điền tử số và mẫu số của phân số 5/9.", ["Tử số:", { answer: 5 }, "; mẫu số:", { answer: 9 }], "Số trên gạch ngang là tử số, số dưới gạch ngang là mẫu số.", "Trong 5/9, số 5 ở trên gạch ngang là tử số, số 9 ở dưới gạch ngang là mẫu số."),
  fill("tm-2", "Điền tử số và mẫu số của phân số 8/11.", ["Tử số:", { answer: 8 }, "; mẫu số:", { answer: 11 }], "Số trên gạch ngang là tử số.", "Tử số là 8, mẫu số là 11."),
  fill("tm-3", "Tử số là 4, mẫu số là 15. Viết phân số.", ["Phân số:", { answer: 4 }, "/", { answer: 15 }], "Tử số viết trên gạch ngang, mẫu số viết dưới.", "Tử số 4 viết trên, mẫu số 15 viết dưới gạch ngang: 4/15."),
  fill("tm-4", "Tử số là 13, mẫu số là 20. Viết phân số.", ["Phân số:", { answer: 13 }, "/", { answer: 20 }], "Đừng viết ngược: mẫu số ở dưới gạch ngang.", "Phân số là 13/20: tử số 13 ở trên, mẫu số 20 ở dưới."),
];

const phanSoLoi = [
  [5, 12],
  [11, 20],
  [23, 45],
  [16, 31],
] as const;
const noiPairs = [
  [2, 5],
  [3, 8],
  [5, 6],
  [4, 9],
] as const;
const matchQuestion = (id: string, list: readonly (readonly [number, number])[], prompt: string): MatchQuestion => ({
  id,
  kind: "noi-cap",
  prompt,
  pairs: list.map(([a, b]) => ({ left: docPhanSo(a, b), right: `${a}/${b}` })),
  rightOrder: [1, 2, 3, 0], // hoán vị, không số nào đứng đúng vị trí của nó
  hint: "Tử số đọc trước, mẫu số đọc sau chữ “phần”.",
  explanation: "Số đứng trước chữ “phần” là tử số, số đứng sau chữ “phần” là mẫu số.",
});

const docViet: Question[] = [
  matchQuestion("dv-1", noiPairs, "Nối cách đọc với phân số."),
  matchQuestion("dv-2", [[1, 7], [7, 10], [3, 4], [6, 11]], "Nối cách đọc với phân số."),
  ...phanSoLoi.map(([a, b], i) =>
    fill(`dv-${i + 3}`, `Viết phân số: ${docPhanSo(a, b)}.`, ["Phân số:", { answer: a }, "/", { answer: b }], "Số trước chữ “phần” viết trên gạch ngang, số sau chữ “phần” viết dưới.", `${docPhanSo(a, b)} viết là ${a}/${b}: tử số ${a}, mẫu số ${b}.`),
  ),
  choice("dv-7", "Phân số 7/12 đọc là gì?", ["Bảy phần mười hai", "Mười hai phần bảy", "Bảy phần mười", "Bảy mười hai"], 0, "Đọc tử số 7 trước, rồi đọc “phần mười hai”.", `Tử số 7 đọc là “bảy”, mẫu số 12 đọc là “phần mười hai”: ${docPhanSo(7, 12)}.`),
];

const tuong = tuMau(hinhs.tuong);
const chuaTo = tuong.mau - tuong.tu;
const banh = tuMau(hinhs.banh);
const banhChua = banh.mau - banh.tu;
const phanTuChon = (tu: number, mau: number, ds: [number, number][]) => ds.map(([a, b]) => `${a}/${b}`).indexOf(`${tu}/${mau}`);
const optionsOf = (ds: [number, number][]) => ds.map(([a, b]) => `${a}/${b}`);

const toChuaTo: Question[] = (() => {
  const o1: [number, number][] = [[tuong.tu, tuong.mau], [chuaTo, tuong.mau], [tuong.mau, chuaTo], [chuaTo, tuong.tu]];
  const o2: [number, number][] = [[tuong.mau, tuong.tu], [chuaTo, tuong.mau], [tuong.tu, tuong.mau], [tuong.tu, chuaTo]];
  const o3: [number, number][] = [[banh.tu, banhChua], [banhChua, banh.mau], [banh.mau, banhChua], [banh.tu, banh.mau]];
  return [
    choice("tc-1", "Một bức tường chia thành các phần bằng nhau, đã sơn các phần màu vàng. Phân số chỉ phần bức tường chưa sơn là", optionsOf(o1), phanTuChon(chuaTo, tuong.mau, o1), "Đếm số phần chưa sơn. Mẫu số vẫn là số phần bằng nhau của cả bức tường.", `Cả bức tường có ${tuong.mau} phần, đã sơn ${tuong.tu} phần nên chưa sơn ${tuong.mau} − ${tuong.tu} = ${chuaTo} phần. Phân số là ${chuaTo}/${tuong.mau}.`, hinh(hinhs.tuong)),
    choice("tc-2", "Phân số chỉ phần bức tường đã sơn (phần màu vàng) là", optionsOf(o2), phanTuChon(tuong.tu, tuong.mau, o2), "Tử số là số phần đã sơn, mẫu số là số phần của cả bức tường.", `Đã sơn ${tuong.tu} phần trong ${tuong.mau} phần bằng nhau: ${tuong.tu}/${tuong.mau}.`, hinh(hinhs.tuong)),
    choice("tc-3", "Chiếc bánh chia thành các phần bằng nhau, đã ăn các phần màu vàng. Phân số chỉ phần bánh chưa ăn là", optionsOf(o3), phanTuChon(banhChua, banh.mau, o3), "Chưa ăn là các phần trắng. Đếm các phần trắng.", `Bánh có ${banh.mau} phần, đã ăn ${banh.tu} phần nên còn ${banhChua} phần chưa ăn: ${banhChua}/${banh.mau}.`, hinh(hinhs.banh)),
    fill("tc-4", "Chiếc bánh ở câu trên: điền số phần chưa ăn và phân số chỉ phần chưa ăn.", ["Chưa ăn:", { answer: banhChua }, "phần; phân số:", { answer: banhChua }, "/", { answer: banh.mau }], "Số phần chưa ăn = số phần của cả bánh trừ số phần đã ăn.", `${banh.mau} − ${banh.tu} = ${banhChua} phần chưa ăn. Phân số là ${banhChua}/${banh.mau}.`, hinh(hinhs.banh)),
  ];
})();

const sn2 = tuMau(hinhs.sn2);
const sn4 = tuMau(hinhs.sn4);
const sn5 = tuMau(hinhs.sn5);
const suyNghi: Question[] = [
  choice("sn-1", "Hình tròn chia thành 3 phần như hình, đã tô 1 phần. Nam viết 1/3. Nam đúng hay sai?", ["Đúng, vì hình có 3 phần", "Sai, vì 3 phần không bằng nhau nên không viết được phân số"], 1, "Hỏi mình: các phần có bằng nhau không?", "Muốn viết phân số thì hình phải chia thành các phần bằng nhau. Ba phần ở đây không bằng nhau nên 1/3 chưa đúng.", hinh(hinhs.lech)),
  fill("sn-2", "Hình chia thành các phần bằng nhau, đã tô một số phần. Điền số phần chưa tô, rồi cộng với số phần đã tô.", ["Chưa tô:", { answer: sn2.mau - sn2.tu }, "phần; ", `${sn2.tu} +`, { answer: sn2.mau - sn2.tu }, "=", { answer: sn2.mau }], "Số phần chưa tô là các ô trắng.", `${sn2.mau - sn2.tu} ô chưa tô. ${sn2.tu} + ${sn2.mau - sn2.tu} = ${sn2.mau}, đúng bằng mẫu số (số phần của cả hình).`, hinh(hinhs.sn2)),
  choice("sn-3", `Hình có ${sn4.mau} phần bằng nhau, đã tô ${sn4.tu} phần. Mai viết ${sn4.mau - sn4.tu}/${sn4.tu}. Hãy tìm lỗi của Mai.`, ["Mai lấy số phần chưa tô làm tử số, lấy số phần đã tô làm mẫu số", "Mai viết đúng", "Mai quên viết gạch ngang"], 0, "Tử số chỉ phần đã tô, mẫu số chỉ cả hình.", `Phân số đúng là ${sn4.tu}/${sn4.mau}: tử số là ${sn4.tu} phần đã tô, mẫu số là ${sn4.mau} phần của cả hình.`, hinh(hinhs.sn4)),
  choice("sn-4", `Hình có ${sn5.mau} phần bằng nhau, đã tô ${sn5.tu} phần. Lan viết ${sn5.mau}/${sn5.tu}. Lan sai ở đâu?`, ["Lan viết ngược tử số và mẫu số", "Lan viết đúng", "Lan đếm thiếu một phần"], 0, "Tử số ở trên gạch ngang chỉ số phần đã tô.", `Tử số là số phần đã tô (${sn5.tu}), mẫu số là số phần của cả hình (${sn5.mau}). Phân số đúng là ${sn5.tu}/${sn5.mau}.`, hinh(hinhs.sn5)),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "viet-hinh", title: "Viết phân số chỉ phần đã tô (Hoạt động 1, Luyện tập 1)", questions: vietHinh },
  { id: "tu-mau", title: "Tử số và mẫu số (Hoạt động 2)", questions: tuMauDeBai },
  { id: "doc-viet", title: "Đọc và viết phân số (Hoạt động 3, Luyện tập 2)", questions: docViet },
  { id: "to-chua-to", title: "Phần đã tô và phần chưa tô (Luyện tập 4)", questions: toChuaTo },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
