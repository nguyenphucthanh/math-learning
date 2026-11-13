import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { BieuDoCot, type BieuDoCotProps, type Cot } from "@/components/math/bieu-do-cot";
import type { KiemDemRow } from "@/components/math/kiem-dem";
import { formatNumber } from "@/lib/area-units";
import { createElement } from "react";
import { BangKiemDemHinh } from "./_illustrations/bang";

const n = formatNumber;
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const chart = (props: BieuDoCotProps) => createElement(BieuDoCot, props);
const tally = (rows: KiemDemRow[]) => createElement(BangKiemDemHinh, { rows });
const hideAll = (data: Cot[]): Cot[] => data.map((d) => ({ ...d, hideValue: true }));
const values = (data: Cot[]) => data.map((d) => d.value!);

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}

/** Số liệu các câu (đổi so với SGK). Đáp án mọi câu đều tính lại từ đây. */

// Bài 1 SGK: số tiền thu mỗi ngày, hỏi nhiều hơn một mức tiền (mức bằng không tính).
export const tienThu = [210000, 90000, 150000, 100000, 120000];
export const mucTien = 120000;
export const soNgayHon = tienThu.filter((t) => t > mucTien).length;

// Bài 3 SGK: số chậu cây mỗi ngày (10 số).
export const chauCay = [4, 6, 6, 7, 8, 9, 10, 12, 14, 14];
// Dãy ngắn cho câu lớn nhất, nhỏ nhất.
export const dayNgan = [3, 4, 4, 6, 7, 9, 9, 12];

// Bài 2 SGK: biểu đồ số bài toán mỗi bạn giải được, vạch cách 3 (có cột nằm giữa hai vạch).
export const giaiToan: BieuDoCotProps = {
  title: "SỐ BÀI TOÁN MỖI BẠN GIẢI ĐƯỢC",
  axisLabel: "Bài",
  step: 3,
  max: 12,
  data: [
    { label: "Hà", value: 8 },
    { label: "Khoa", value: 6 },
    { label: "Linh", value: 12 },
    { label: "Minh", value: 3 },
    { label: "Nga", value: 5 },
    { label: "Phú", value: 8 },
  ],
};
const gt = giaiToan.data;
const extremes = (data: Cot[]) => ({
  most: data.reduce((a, b) => (b.value! > a.value! ? b : a)),
  least: data.reduce((a, b) => (b.value! < a.value! ? b : a)),
});
const best = extremes(gt).most;
const worst = extremes(gt).least;
const names = gt.map((d) => d.label);

// Biểu đồ số quyển sách đã đọc, vạch cách 2.
export const docSach: BieuDoCotProps = {
  title: "SỐ QUYỂN SÁCH CÁC BẠN ĐÃ ĐỌC",
  axisLabel: "Quyển",
  step: 2,
  max: 10,
  data: [
    { label: "Mai", value: 6 },
    { label: "Nam", value: 4 },
    { label: "Lan", value: 10 },
    { label: "Việt", value: 8 },
    { label: "Hà", value: 2 },
  ],
};
const ds = docSach.data;
const tongSach = sum(values(ds));
const tbSach = tongSach / ds.length;

// Bài 4 SGK: 3 hộp, 1 hộp đựng bánh, 2 hộp đựng gôm; chọn 10 lần.
export const chonHop = { banh: 3, gom: 7 };
const hopRows: KiemDemRow[] = [
  { label: "Hộp đựng bánh", count: chonHop.banh, color: "var(--unit-century)" },
  { label: "Hộp đựng gôm", count: chonHop.gom, color: "var(--unit-second)" },
];

/** Nhắc lại nhanh: mỗi câu thử một ý. Không tính vào tiến độ. */
export const quickChecks = {
  day: fill("thu-day", "Dãy số liệu: 5, 8, 8, 12, 15. Điền theo dãy.", ["Dãy có", { answer: 5 }, "số; số lớn nhất là", { answer: 15 }, "; số nhỏ nhất là", { answer: 5 }], "Đếm từng số, kể cả hai số 8. Lớn nhất, nhỏ nhất là hai số ở hai đầu dãy xếp theo thứ tự.", "Có 5 số (hai số 8 đếm hai lần). Lớn nhất là 15, nhỏ nhất là 5."),
  trungBinh: fill("thu-trung-binh", "Trung bình cộng của 6, 8 và 10 là mấy?", ["(6 + 8 + 10) :", { answer: 3 }, "=", { answer: 8 }], "Cộng các số rồi chia cho số các số hạng. Có 3 số thì chia cho 3.", "Tổng 6 + 8 + 10 = 24. Có 3 số nên 24 : 3 = 8."),
  hon: choice("thu-hon", "Số tiền thu mỗi ngày: 90 000 đồng; 100 000 đồng; 130 000 đồng. Có mấy ngày thu được nhiều hơn 100 000 đồng?", ["1 ngày", "2 ngày", "3 ngày"], 0, "“Nhiều hơn 100 000” không gồm đúng 100 000.", "Chỉ có 130 000 đồng là nhiều hơn 100 000 đồng. Ngày thu đúng 100 000 đồng không tính. Đáp án 1 ngày."),
  dinhCot: choice(
    "thu-dinh-cot",
    "Mỗi vạch cách nhau 3. Đỉnh cột của Lan nằm trên vạch 6 và dưới vạch 9, cách vạch 6 một ô nhỏ. Lan giải được mấy bài?",
    ["6 bài", "7 bài", "8 bài", "9 bài"],
    1,
    "Từ vạch 6 lên vạch 9 là 3 đơn vị, chia thành 3 ô nhỏ. Cột cách vạch 6 một ô nhỏ.",
    "Cao hơn vạch 6 một ô nhỏ (mỗi ô là 1 bài): 6 + 1 = 7 bài.",
    chart({ title: "SỐ BÀI TOÁN MỖI BẠN GIẢI ĐƯỢC", axisLabel: "Bài", step: 3, max: 9, data: hideAll([{ label: "Lan", value: 7 }, { label: "Việt", value: 3 }, { label: "Mai", value: 9 }]) }),
  ),
  kiemDem: fill("thu-kiem-dem", "Đếm nét kiểm đếm rồi điền số lần.", ["Hộp gôm xuất hiện", { answer: 7 }, "lần."], "Mỗi nhóm có nét chéo là 5 nét. Đếm 5 rồi đếm tiếp các nét lẻ.", "Có 1 nhóm đủ là 5 nét và 2 nét lẻ: 5 + 2 = 7.", tally([{ label: "Hộp gôm", count: 7 }])),
  tongLan: fill("thu-tong-lan", "Bạn chọn hộp 10 lần. Hộp bánh xuất hiện 3 lần. Hộp gôm xuất hiện mấy lần?", ["10 − 3 =", { answer: 7 }, "lần."], "Tổng số lần của các sự kiện bằng số lần thực hiện.", "3 + 7 = 10, nên hộp gôm xuất hiện 10 − 3 = 7 lần."),
} satisfies Record<string, Question>;

const dayLieu: Question[] = [
  choice(
    "ds-1",
    `Các bạn làm đồ chơi tái chế bán ủng hộ. Số tiền thu mỗi ngày (đồng): ${tienThu.map(n).join("; ")}. Có mấy ngày thu được nhiều hơn ${n(mucTien)} đồng?`,
    ["1 ngày", "2 ngày", "3 ngày", "4 ngày"],
    soNgayHon - 1,
    "So từng số với mức tiền. Số bằng đúng mức tiền thì không phải “nhiều hơn”.",
    `Nhiều hơn ${n(mucTien)}: ${tienThu.filter((t) => t > mucTien).map(n).join(" và ")}. Có ${soNgayHon} ngày. Số ${n(mucTien)} bằng mức tiền, không tính.`,
  ),
  fill("ds-2", `Số chậu cây làm mỗi ngày: ${dayNgan.join(", ")}.`, ["Dãy có", { answer: dayNgan.length }, "số; ngày làm nhiều nhất được", { answer: Math.max(...dayNgan) }, "chậu; ngày làm ít nhất được", { answer: Math.min(...dayNgan) }, "chậu."], "Đếm từng số một, kể cả số lặp lại. Tìm số lớn nhất và số bé nhất trong dãy.", `Có ${dayNgan.length} số. Lớn nhất là ${Math.max(...dayNgan)}, nhỏ nhất là ${Math.min(...dayNgan)}.`),
  fill("ds-3", `Số chậu cây Mai và Mi làm mỗi ngày: ${chauCay.join(", ")}. Tính tổng số chậu, rồi tìm trung bình mỗi ngày.`, ["Tổng:", { answer: sum(chauCay) }, "chậu; trung bình:", { answer: sum(chauCay) / chauCay.length }, "chậu mỗi ngày."], `Cộng cả ${chauCay.length} số rồi chia cho ${chauCay.length}, vì dãy có ${chauCay.length} số.`, `${chauCay.join(" + ")} = ${sum(chauCay)}. Dãy có ${chauCay.length} số nên ${sum(chauCay)} : ${chauCay.length} = ${sum(chauCay) / chauCay.length}.`),
  choice("ds-4", `Trong dãy ${dayNgan.join(", ")}, số thứ năm (đếm từ trái sang) là số nào?`, ["6", "7", "9", "12"], ["6", "7", "9", "12"].indexOf(String(dayNgan[4])), "Đếm từ trái sang: số thứ nhất, thứ hai,...", `Số thứ năm là ${dayNgan[4]}.`),
];

const bieuDo: Question[] = [
  choice("bd-1", "Nga giải được bao nhiêu bài toán? Mỗi vạch cách 3, đỉnh cột của Nga nằm giữa hai vạch.", ["3 bài", "4 bài", "5 bài", "6 bài"], gt[4].value! - 3, "Đỉnh cột Nga nằm giữa vạch 3 và vạch 6, cao hơn vạch 3 hai ô nhỏ.", `Mỗi ô nhỏ là 1 bài. Cao hơn vạch 3 hai ô nhỏ: 3 + 2 = ${gt[4].value}.`, chart({ ...giaiToan, data: hideAll(gt) })),
  choice("bd-2", "Bạn nào giải được nhiều bài nhất?", names, names.indexOf(best.label), "Tìm cột cao nhất rồi đọc tên bạn ở dưới cột đó.", `Cột của ${best.label} cao nhất, ${best.value} bài.`, chart({ ...giaiToan, data: hideAll(gt) })),
  choice("bd-3", "Bạn nào giải được ít bài nhất?", names, names.indexOf(worst.label), "Tìm cột thấp nhất.", `Cột của ${worst.label} thấp nhất, ${worst.value} bài.`, chart({ ...giaiToan, data: hideAll(gt) })),
  fill("bd-4", "Hà giải được nhiều hơn Nga bao nhiêu bài toán?", ["Nhiều hơn", { answer: gt[0].value! - gt[4].value! }, "bài."], "Đọc số bài của Hà và của Nga, rồi lấy số lớn trừ số bé.", `Hà ${gt[0].value} bài, Nga ${gt[4].value} bài: ${gt[0].value} − ${gt[4].value} = ${gt[0].value! - gt[4].value!}.`, chart(giaiToan)),
  fill("bd-5", "Cột của Nga chưa vẽ. Biết Nga giải ít hơn Hà 3 bài. Nga giải được mấy bài?", [`${gt[0].value} − 3 =`, { answer: gt[0].value! - 3 }, "bài."], "Số bài của Nga bằng số bài của Hà trừ 3. Đỉnh cột Nga sẽ ở giữa hai vạch.", `${gt[0].value} − 3 = ${gt[0].value! - 3}. Cột Nga cao tới giữa vạch 3 và vạch 6, hai ô nhỏ trên vạch 3.`, chart({ ...giaiToan, data: gt.map((d) => (d.label === "Nga" ? { ...d, value: null } : d)) })),
];

const suKien: Question[] = [
  choice("sk-1", "Việt có 3 hộp: 1 hộp đựng bánh và 2 hộp đựng gôm. Việt chọn 1 hộp rồi mở ra xem. Các sự kiện có thể xảy ra là gì?", ["Chọn được hộp đựng bánh; chọn được hộp đựng gôm", "Chỉ chọn được hộp đựng gôm", "Chọn được 2 hộp đựng gôm"], 0, "Hỏi mình: chọn 1 hộp thì thấy những gì bên trong?", "Có hộp đựng bánh và hộp đựng gôm. Chọn 1 hộp thì có hai sự kiện: chọn được hộp đựng bánh; chọn được hộp đựng gôm."),
  fill("sk-2", "Việt chọn 1 hộp, ghi bảng kiểm đếm rồi đóng lại, đảo vị trí. Việt làm 10 lần. Điền số lần và tổng số lần.", ["Hộp bánh:", { answer: chonHop.banh }, "lần; hộp gôm:", { answer: chonHop.gom }, "lần. Tổng:", { answer: chonHop.banh + chonHop.gom }, "lần."], "Đếm từng hàng, rồi cộng hai số. Tổng phải bằng 10.", `Hộp bánh ${chonHop.banh} lần, hộp gôm ${chonHop.gom} lần. ${chonHop.banh} + ${chonHop.gom} = ${chonHop.banh + chonHop.gom}, đúng bằng 10 lần.`, tally(hopRows)),
  choice("sk-3", "Sự kiện nào xuất hiện nhiều lần hơn?", ["Chọn được hộp đựng bánh", "Chọn được hộp đựng gôm"], chonHop.banh > chonHop.gom ? 0 : 1, "So hai số lần trong bảng kiểm đếm.", `Hộp gôm ${chonHop.gom} lần, nhiều hơn hộp bánh ${chonHop.banh} lần.`, tally(hopRows)),
  fill("sk-4", "Hộp đựng gôm xuất hiện nhiều hơn hộp đựng bánh bao nhiêu lần?", ["Nhiều hơn", { answer: chonHop.gom - chonHop.banh }, "lần."], "Lấy số lần lớn trừ số lần bé.", `Hộp gôm ${chonHop.gom} lần, hộp bánh ${chonHop.banh} lần: ${chonHop.gom} − ${chonHop.banh} = ${chonHop.gom - chonHop.banh}.`, tally(hopRows)),
];

const ketHop: Question[] = [
  choice("kh-1", "Bạn nào đọc được nhiều quyển sách nhất?", ds.map((d) => d.label), ds.indexOf(ds.reduce((a, b) => (b.value! > a.value! ? b : a))), "Tìm cột cao nhất rồi đọc tên bạn, không phải số quyển.", `Cột của Lan cao nhất, 10 quyển. Câu hỏi “bạn nào” nên trả lời bằng tên.`, chart({ ...docSach, data: hideAll(ds) })),
  fill("kh-2", "Biết các bạn đọc các quyển sách khác nhau. Cả 5 bạn đọc tất cả bao nhiêu quyển?", ["Tất cả:", { answer: tongSach }, "quyển."], "Đọc số quyển của từng bạn rồi cộng cả năm số.", `${values(ds).join(" + ")} = ${tongSach}.`, chart(docSach)),
  fill("kh-3", "Trung bình mỗi bạn đọc được bao nhiêu quyển sách?", [`${tongSach} :`, { answer: ds.length }, "=", { answer: tbSach }, "quyển."], `Chia tổng cho số bạn, có ${ds.length} bạn nên chia cho ${ds.length}.`, `Tổng ${tongSach} quyển, ${ds.length} bạn: ${tongSach} : ${ds.length} = ${tbSach}.`, chart(docSach)),
  choice("kh-4", `Có mấy bạn đọc được nhiều hơn mức trung bình (${tbSach} quyển)?`, ["1 bạn", "2 bạn", "3 bạn", "4 bạn"], ds.filter((d) => d.value! > tbSach).length - 1, "So số quyển của từng bạn với trung bình. Bạn đọc đúng bằng trung bình thì không tính.", `Nhiều hơn ${tbSach}: ${ds.filter((d) => d.value! > tbSach).map((d) => `${d.label} (${d.value})`).join(", ")}. Mai đọc đúng ${tbSach} quyển, không tính.`, chart(docSach)),
];

const suyNghi: Question[] = [
  choice("sn-1", "Mai tính trung bình cộng của 4, 6 và 8 như sau: (4 + 6 + 8) : 2 = 9. Mai sai ở đâu?", ["Cộng sai, tổng phải là 20", "Dãy có 3 số nên phải chia cho 3: 18 : 3 = 6", "Mai tính đúng"], 1, "Chia cho mấy? Đếm xem dãy có bao nhiêu số.", `4 + 6 + 8 = ${4 + 6 + 8}. Dãy có 3 số nên chia cho 3: ${4 + 6 + 8} : 3 = ${(4 + 6 + 8) / 3}. Mai đã chia cho 2.`),
  choice("sn-2", "Mỗi vạch cách nhau 3. Đỉnh cột của An nằm trên vạch 6 và dưới vạch 9. Số bài An giải được có thể là số nào?", ["6", "7", "9", "10"], 1, "Số đó phải lớn hơn 6 và bé hơn 9.", "Cột cao hơn vạch 6 nhưng chưa tới vạch 9, nên số bài lớn hơn 6 và bé hơn 9. Trong các số đã cho chỉ có 7. Số 6 và 9 nằm đúng trên vạch."),
  choice("sn-3", "Hỏi: “Bạn nào giải được nhiều bài nhất?” Việt trả lời: “12”. Việt trả lời có đúng câu hỏi không?", ["Đúng", "Chưa đúng: câu hỏi “bạn nào” phải trả lời bằng tên bạn, 12 là số bài"], 1, "Câu hỏi hỏi ai, hay hỏi bao nhiêu?", "“Bạn nào” hỏi tên. “Bao nhiêu bài” mới hỏi số. Nhiều nhất là Linh, giải được 12 bài."),
  fill("sn-4", "Trung bình cộng của 3 số là 6. Tổng của 3 số đó là bao nhiêu?", ["6 × 3 =", { answer: 6 * 3 }], "Trung bình = tổng : số số hạng, nên tổng = trung bình × số số hạng.", "Trung bình bằng 6, có 3 số nên tổng là 6 × 3 = 18. Thử lại: 18 : 3 = 6."),
  choice("sn-5", "Việt chọn hộp 10 lần và ghi: hộp bánh 4 lần, hộp gôm 5 lần. Bảng ghi có hợp lí không?", ["Hợp lí", "Chưa hợp lí: 4 + 5 = 9, mà Việt chọn 10 lần, còn thiếu 1 lần", "Hợp lí vì hộp gôm nhiều hơn"], 1, "Cộng số lần của hai sự kiện rồi so với số lần thực hiện.", `4 + 5 = ${4 + 5}, không bằng 10. Tổng số lần của các sự kiện phải bằng số lần thực hiện.`),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "day-so-lieu", title: "Dãy số liệu (Bài 49)", questions: dayLieu },
  { id: "bieu-do-cot", title: "Biểu đồ cột (Bài 50)", questions: bieuDo },
  { id: "su-kien", title: "Số lần xuất hiện của sự kiện (Bài 51)", questions: suKien },
  { id: "ket-hop", title: "Kết hợp: đọc biểu đồ, trung bình, so sánh", questions: ketHop },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
