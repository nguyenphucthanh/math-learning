import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";

const fill = (id: string, prompt: string, parts: Part[], hint: string, explanation: string): FillQuestion => ({ id, kind: "dien-so", prompt, parts, hint, explanation });
const choice = (id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion => ({ id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation });

/** Tìm phân số của một số: n × a/b, n chia hết cho b nên kết quả là số tự nhiên. Test tính lại, không so với số gõ tay. */
export type Spec = { n: number; a: number; b: number };
const result = ({ n, a, b }: Spec) => (n * a) / b;
/** Một dòng bài giải: "n × a/b = (n × a)/b = kết quả". */
const calcParts = (label: string, { n, a, b }: Spec, unit = ""): Part[] => [`${label}${n} × ${a}/${b} =`, { answer: n * a }, "/", { answer: b }, "=", { answer: result({ n, a, b }) }, ...(unit ? [unit] : [])];
const nbsp = (value: number) => value.toLocaleString("vi-VN").replace(/\./g, " ");

// Tiết 1: trang 95-96.
export const timSpecs: Spec[] = [
  { n: 15, a: 2, b: 5 },
  { n: 24, a: 3, b: 8 },
  { n: 18, a: 5, b: 6 },
  { n: 36, a: 3, b: 4 },
];
export const lopSpec: Spec = { n: 28, a: 3, b: 4 }; // học sinh nữ
export const nuocSpec: Spec = { n: 120, a: 5, b: 4 }; // li thứ hai (ml)
export const giaySpec: Spec = { n: 2400, a: 3, b: 4 }; // đôi giày tháng Hai
export const chimSpec: Spec = { n: 25, a: 3, b: 5 }; // chim sẻ
// Tiết 2: trang 97.
export const tauSpec = { century: 1, whole: { n: 100, a: 3, b: 4 }, atlantic: { a: 1, b: 3 }, pacific: { a: 2, b: 5 } };
export const baoSpec = { meters: 360, minute: { n: 60, a: 1, b: 5 } }; // 1/5 phút = 12 giây
export const chaoSpec = { n: 24, first: { a: 1, b: 2 }, second: { a: 1, b: 2 } };
export const gaoSpec = { n: 40, morning: { a: 2, b: 5 }, afternoon: { a: 3, b: 8 } };
export const gioSpec = { a: 1, b: 6 }; // 1/6 giờ bằng bao nhiêu phút

const tauWhole = result(tauSpec.whole);
const tauAtlantic: Spec = { n: tauWhole, ...tauSpec.atlantic };
const tauPacific: Spec = { n: tauWhole, ...tauSpec.pacific };
const baoSeconds = result(baoSpec.minute);
const chaoFirst: Spec = { n: chaoSpec.n, ...chaoSpec.first };
const chaoSecond: Spec = { n: result(chaoFirst), ...chaoSpec.second };
const gaoMorning: Spec = { n: gaoSpec.n, ...gaoSpec.morning };
const gaoAfternoon: Spec = { n: gaoSpec.n, ...gaoSpec.afternoon };

/** Khởi động: kiến thức nền. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-1", "Chia 12 cái bánh thành 3 phần bằng nhau. Mỗi phần có bao nhiêu cái bánh?", [{ answer: 4 }, "cái bánh."], "Lấy 12 chia cho 3.", "12 : 3 = 4. Mỗi phần có 4 cái bánh."),
  fill("kd-2", "Tính 4 × 3/5 (nhân số tự nhiên với phân số).", ["4 × 3/5 =", { answer: 12 }, "/", { answer: 5 }], "Nhân số tự nhiên với tử số, giữ nguyên mẫu số.", "4 × 3/5 = (4 × 3)/5 = 12/5."),
  fill("kd-3", "Rút gọn 24/3 thành số tự nhiên.", ["24/3 =", { answer: 8 }], "24 chia cho 3 được bao nhiêu?", "24 : 3 = 8 nên 24/3 = 8."),
];

export const quickChecks = {
  baPhanTu: fill("thu-3-4", "Tìm 3/4 của 20 (viết 20 × 3/4 rồi rút gọn).", [`${20} × 3/4 =`, { answer: 60 }, "/", { answer: 4 }, "=", { answer: 15 }], "Nhân 20 với 3/4: nhân tử số, giữ mẫu số, rồi rút gọn.", "20 × 3/4 = 60/4 = 15. Cũng có thể nghĩ: 20 chia 4 phần, mỗi phần 5, lấy 3 phần được 15."),
  gioPhut: fill("thu-1-6", "1/6 giờ bằng bao nhiêu phút? Nhớ 1 giờ = 60 phút.", ["60 × 1/6 =", { answer: 60 }, "/", { answer: 6 }, "=", { answer: 10 }, "(phút)"], "Đổi 1 giờ ra phút trước, rồi tìm 1/6 của số phút đó.", "1 giờ = 60 phút. 60 × 1/6 = 60/6 = 10. Vậy 1/6 giờ = 10 phút."),
  conLai: fill("thu-con-lai", "Có 30 viên bi. 1/3 số bi màu đỏ, 1/2 số bi màu xanh. Còn lại bao nhiêu viên bi?", ["30 × 1/3 =", { answer: 10 }, "; 30 × 1/2 =", { answer: 15 }, "; còn lại", { answer: 30 - 10 - 15 }, "viên."], "Tìm số bi đỏ, số bi xanh, rồi lấy tổng số bi trừ cả hai.", "Bi đỏ: 30 × 1/3 = 10. Bi xanh: 30 × 1/2 = 15. Còn lại: 30 − 10 − 15 = 5 viên bi."),
};

const timRows: Question[] = timSpecs.map((s, i) =>
  fill(`tim-${i + 1}`, `Tìm ${s.a}/${s.b} của ${s.n}.`, calcParts("", s), "Nhân số đó với phân số, rồi rút gọn kết quả.", `${s.n} × ${s.a}/${s.b} = ${s.n * s.a}/${s.b} = ${result(s)}. Cũng như chia ${s.n} thành ${s.b} phần (mỗi phần ${s.n / s.b}) rồi lấy ${s.a} phần.`),
);

const loiVan = (id: string, prompt: string, lines: Part[][], hint: string, explanation: string): WordQuestion => ({ id, kind: "loi-van", prompt, lines, hint, explanation });

const tiet1: Question[] = [
  ...timRows,
  loiVan("lop", `Lớp 4A có ${lopSpec.n} học sinh, ${lopSpec.a}/${lopSpec.b} số học sinh là nữ. Lớp có bao nhiêu học sinh nữ?`, [calcParts("Số học sinh nữ: ", lopSpec, "(học sinh)")], `Tìm ${lopSpec.a}/${lopSpec.b} của ${lopSpec.n}: lấy ${lopSpec.n} nhân với ${lopSpec.a}/${lopSpec.b}.`, `Số học sinh nữ là ${lopSpec.n} × ${lopSpec.a}/${lopSpec.b} = ${lopSpec.n * lopSpec.a}/${lopSpec.b} = ${result(lopSpec)} (học sinh).`),
  loiVan("nuoc", `Li nước thứ nhất có ${nuocSpec.n} ml. Li thứ hai có lượng nước bằng ${nuocSpec.a}/${nuocSpec.b} lượng nước ở li thứ nhất. Li thứ hai có bao nhiêu mi-li-lít nước?`, [calcParts("Li thứ hai: ", nuocSpec, "(ml)")], "“Bằng 5/4 li thứ nhất” nghĩa là lấy 5/4 của lượng nước li thứ nhất.", `Li thứ hai có ${nuocSpec.n} × ${nuocSpec.a}/${nuocSpec.b} = ${nuocSpec.n * nuocSpec.a}/${nuocSpec.b} = ${result(nuocSpec)} ml. Phân số lớn hơn 1 nên li thứ hai nhiều hơn li thứ nhất.`),
  loiVan("giay", `Một công ty sản xuất ${nbsp(giaySpec.n)} đôi giày trong tháng Một. Tháng Hai công ty sản xuất được số đôi giày bằng ${giaySpec.a}/${giaySpec.b} số đôi giày tháng Một. Tháng Hai sản xuất bao nhiêu đôi giày?`, [calcParts("Tháng Hai: ", giaySpec, "(đôi)")], "Tìm 3/4 của số đôi giày tháng Một.", `Tháng Hai: ${nbsp(giaySpec.n)} × ${giaySpec.a}/${giaySpec.b} = ${nbsp(giaySpec.n * giaySpec.a)}/${giaySpec.b} = ${nbsp(result(giaySpec))} đôi giày.`),
  loiVan("chim", `Trên cành cây có ${chimSpec.n} con chim đậu, ${chimSpec.a}/${chimSpec.b} số chim là chim sẻ. Có bao nhiêu con chim sẻ?`, [calcParts("Số chim sẻ: ", chimSpec, "(con)")], `Tìm ${chimSpec.a}/${chimSpec.b} của ${chimSpec.n}.`, `${chimSpec.n} × ${chimSpec.a}/${chimSpec.b} = ${chimSpec.n * chimSpec.a}/${chimSpec.b} = ${result(chimSpec)} con chim sẻ.`),
  choice("tn-1", `Tìm ${timSpecs[0].a}/${timSpecs[0].b} của ${timSpecs[0].n}. Kết quả nào đúng?`, [`${result(timSpecs[0])}`, `${timSpecs[0].n - result(timSpecs[0])}`, `${timSpecs[0].n * timSpecs[0].a}/${timSpecs[0].n * timSpecs[0].b}`], 0, "Nhân 15 với 2/5, rồi rút gọn. Kết quả phải là số tự nhiên bé hơn 15.", `15 × 2/5 = 30/5 = 6. Đáp án 9 là 3/5 của 15, phần còn lại, không phải 2/5. Phân số 30/75 là nhân cả tử số và mẫu số, cách đó sai.`),
];

const tiet2: Question[] = [
  loiVan(
    "tau",
    `Một con tàu thuỷ hoạt động được ${tauSpec.whole.a}/${tauSpec.whole.b} thế kỉ. Trong thời gian đó, ${tauSpec.atlantic.a}/${tauSpec.atlantic.b} thời gian tàu chạy ở Đại Tây Dương, ${tauSpec.pacific.a}/${tauSpec.pacific.b} thời gian tàu chạy ở Thái Bình Dương, còn lại chạy ở Ấn Độ Dương. Hỏi tàu chạy ở Ấn Độ Dương bao nhiêu năm?`,
    [
      calcParts(`${tauSpec.whole.a}/${tauSpec.whole.b} thế kỉ = `, tauSpec.whole, "(năm)"),
      calcParts("Đại Tây Dương: ", tauAtlantic, "(năm)"),
      calcParts("Thái Bình Dương: ", tauPacific, "(năm)"),
      [`Ấn Độ Dương: ${tauWhole} − ${result(tauAtlantic)} − ${result(tauPacific)} =`, { answer: tauWhole - result(tauAtlantic) - result(tauPacific) }, "(năm)"],
    ],
    "1 thế kỉ = 100 năm. Đổi ra năm trước, rồi tìm từng phần. Phần còn lại là tổng trừ các phần đã biết.",
    `1 thế kỉ = 100 năm nên ${tauSpec.whole.a}/${tauSpec.whole.b} thế kỉ = ${tauWhole} năm. Đại Tây Dương ${result(tauAtlantic)} năm, Thái Bình Dương ${result(tauPacific)} năm. Ấn Độ Dương: ${tauWhole} − ${result(tauAtlantic)} − ${result(tauPacific)} = ${tauWhole - result(tauAtlantic) - result(tauPacific)} năm.`,
  ),
  loiVan(
    "bao",
    `Một con báo săn chạy ${baoSpec.meters} m hết ${baoSpec.minute.a}/${baoSpec.minute.b} phút. Hỏi trung bình mỗi giây con báo chạy được bao nhiêu mét?`,
    [calcParts(`${baoSpec.minute.a}/${baoSpec.minute.b} phút = `, baoSpec.minute, "(giây)"), [`${baoSpec.meters} : ${baoSeconds} =`, { answer: baoSpec.meters / baoSeconds }, "(m)"]],
    "Đổi thời gian ra giây trước: 1 phút = 60 giây. Rồi lấy quãng đường chia cho số giây.",
    `1 phút = 60 giây nên ${baoSpec.minute.a}/${baoSpec.minute.b} phút = ${baoSeconds} giây. Mỗi giây báo chạy ${baoSpec.meters} : ${baoSeconds} = ${baoSpec.meters / baoSeconds} m.`,
  ),
  loiVan(
    "chao",
    `Chim chào mào có ${chaoSpec.n} quả hồng. Chúng ăn hết một nửa của một nửa số quả hồng đó. Chim chào mào đã ăn bao nhiêu quả hồng?`,
    [calcParts("Một nửa số quả: ", chaoFirst, "(quả)"), calcParts("Một nửa của một nửa: ", chaoSecond, "(quả)")],
    "Hai bước: tìm một nửa của 24, rồi tìm một nửa của kết quả đó.",
    `Một nửa của ${chaoSpec.n} là ${result(chaoFirst)} quả. Một nửa của ${result(chaoFirst)} là ${result(chaoSecond)} quả. Chim đã ăn ${result(chaoSecond)} quả hồng.`,
  ),
  loiVan(
    "gao",
    `Cửa hàng có ${gaoSpec.n} kg gạo. Buổi sáng bán ${gaoSpec.morning.a}/${gaoSpec.morning.b} số gạo, buổi chiều bán ${gaoSpec.afternoon.a}/${gaoSpec.afternoon.b} số gạo. Cửa hàng còn lại bao nhiêu ki-lô-gam gạo?`,
    [
      calcParts("Buổi sáng: ", gaoMorning, "(kg)"),
      calcParts("Buổi chiều: ", gaoAfternoon, "(kg)"),
      [`Còn lại: ${gaoSpec.n} − ${result(gaoMorning)} − ${result(gaoAfternoon)} =`, { answer: gaoSpec.n - result(gaoMorning) - result(gaoAfternoon) }, "(kg)"],
    ],
    "Cả hai buổi đều là phân số của 40 kg. Tính từng buổi rồi trừ khỏi 40.",
    `Buổi sáng bán ${result(gaoMorning)} kg, buổi chiều bán ${result(gaoAfternoon)} kg. Còn lại ${gaoSpec.n} − ${result(gaoMorning)} − ${result(gaoAfternoon)} = ${gaoSpec.n - result(gaoMorning) - result(gaoAfternoon)} kg.`,
  ),
  fill("gio", `${gioSpec.a}/${gioSpec.b} giờ bằng bao nhiêu phút?`, ["60 × 1/6 =", { answer: 60 }, "/", { answer: 6 }, "=", { answer: 60 * gioSpec.a / gioSpec.b }, "(phút)"], "Quên đổi đơn vị là lỗi hay gặp: 1 giờ = 60 phút.", "1 giờ = 60 phút. 60 × 1/6 = 60/6 = 10. Vậy 1/6 giờ = 10 phút."),
];

const suyNghi: Question[] = [
  choice("sn-1", "Nam tính 12 × 2/3 = 24/36. Nam sai ở đâu?", ["Nam nhân cả mẫu số với 12. Chỉ nhân số tự nhiên với tử số, giữ nguyên mẫu số", "Nam tính đúng", "Nam phải lấy 12 chia cho 2/3"], 0, "Tìm 2/3 của 12 phải ra số bé hơn 12. 24/36 có bé hơn 12 không, và có ra số tự nhiên không?", "12 × 2/3 = (12 × 2)/3 = 24/3 = 8. Mẫu số giữ nguyên là 3, không nhân với 12."),
  fill("sn-2", "Trong 12 cái bánh có 8 cái phủ kem. Số bánh phủ kem bằng bao nhiêu phần số bánh? (Viết phân số tối giản.)", ["8 : 12 =", { answer: 2 }, "/", { answer: 3 }], "Lấy số bánh có kem chia cho tổng số bánh, rồi rút gọn.", "8 : 12 = 8/12 = 2/3. Đây là ngược lại của bài học: biết số, tìm phân số."),
  fill("sn-3", "Tính 1/2 của 1/2 của 40, rồi tính 1/4 của 40. So sánh hai kết quả.", ["1/2 của 1/2 của 40 =", { answer: 10 }, "; 1/4 của 40 =", { answer: 10 }], "Làm từng bước: 40 × 1/2 = 20, rồi 20 × 1/2.", "40 × 1/2 = 20, 20 × 1/2 = 10. Và 40 × 1/4 = 10. Một nửa của một nửa là một phần tư."),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "tim-phan-so", title: "Tiết 1: Tìm phân số của một số", questions: tiet1 },
  { id: "nhieu-buoc", title: "Tiết 2: Bài toán nhiều bước", questions: tiet2 },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm (vượt SGK)", questions: suyNghi },
];
