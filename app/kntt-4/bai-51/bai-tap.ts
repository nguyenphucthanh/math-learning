import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import type { KiemDemRow } from "@/components/math/kiem-dem";
import { createElement } from "react";
import { BangKiemDemHinh } from "./_illustrations/bang";

const tally = (rows: KiemDemRow[]) => createElement(BangKiemDemHinh, { rows });
const sum = (numbers: number[]) => numbers.reduce((a, b) => a + b, 0);
const countOf = <T>(items: T[], value: T) => items.filter((item) => item === value).length;

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}

// Luyện tập 1 (đổi số liệu): Nam gieo một xúc xắc nhiều lần.
export const matXucXac = [3, 6, 4, 5, 8, 2];
const xucXacRows: KiemDemRow[] = matXucXac.map((count, i) => ({ label: `Mặt ${i + 1} chấm`, count }));

// Hoạt động 1 (đổi số liệu): lấy 1 bóng từ hộp 3 bóng xanh, 1 bóng vàng, 20 lần. X là xanh, V là vàng.
export const dayBong = "XXVXXXVXXXXVXXXXXVXX".split("");
const bongXanh = countOf(dayBong, "X");
const bongVang = countOf(dayBong, "V");
const bongRows: KiemDemRow[] = [
  { label: "Bóng xanh", count: bongXanh, color: "var(--unit-second)" },
  { label: "Bóng vàng", count: bongVang, color: "var(--unit-century)" },
];

// Gieo xúc xắc 12 lần, ghi số chấm.
export const dayXucXac = [3, 5, 2, 5, 6, 1, 5, 4, 2, 5, 3, 6];

// Vòng quay ba màu.
export const vongQuayBaMau = { do: 12, vang: 7, xanh: 6 };
const baMauRows: KiemDemRow[] = [
  { label: "Màu đỏ", count: vongQuayBaMau.do, color: "var(--unit-mm2)" },
  { label: "Màu vàng", count: vongQuayBaMau.vang, color: "var(--unit-century)" },
  { label: "Màu xanh", count: vongQuayBaMau.xanh, color: "var(--unit-second)" },
];

/** Khởi động: đếm nét kiểm đếm theo nhóm 5. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-1", "Đếm số nét kiểm đếm. Mỗi nhóm 4 nét đứng và 1 nét chéo là 5 nét.", ["Có", { answer: 8 }, "nét."], "Một nhóm có nét chéo là 5 nét. Đếm 5 rồi đếm tiếp các nét lẻ.", "Có 1 nhóm đủ là 5 nét, thêm 3 nét lẻ: 5 + 3 = 8.", tally([{ label: "Số nét", count: 8 }])),
  fill("kd-2", "Đếm số nét kiểm đếm.", ["Có", { answer: 13 }, "nét."], "Đếm theo nhóm 5: 5, 10, rồi đếm nét lẻ.", "Có 2 nhóm đủ là 10 nét, thêm 3 nét lẻ: 10 + 3 = 13.", tally([{ label: "Số nét", count: 13 }])),
  fill("kd-3", "Nam ghi 3 nhóm đủ 5 nét và thêm 2 nét lẻ. Nam ghi tất cả mấy nét?", ["3 × 5 + 2 =", { answer: 3 * 5 + 2 }], "Mỗi nhóm đủ là 5 nét.", `3 nhóm là 3 × 5 = ${3 * 5} nét, thêm 2 nét lẻ: ${3 * 5} + 2 = ${3 * 5 + 2}.`),
];

export const quickChecks = {
  doc: choice("thu-doc", "Con đọc bảng: màu xanh xuất hiện bao nhiêu lần?", ["9 lần", "12 lần", "14 lần", "15 lần"], 2, "Đếm nhóm 5 trước, rồi đếm các nét lẻ.", "Có 2 nhóm đủ là 10 nét và 4 nét lẻ: 10 + 4 = 14. Màu xanh xuất hiện 14 lần.", tally([{ label: "Màu xanh", count: 14 }])),
  suKien: choice("thu-su-kien", "Hộp có 2 quả bóng đỏ và 1 quả bóng trắng. Lấy 1 quả, xem màu. Có mấy sự kiện có thể xảy ra?", ["1 sự kiện", "2 sự kiện", "3 sự kiện"], 1, "Mỗi màu bóng lấy được là một sự kiện.", "Hai sự kiện: lấy được bóng đỏ; lấy được bóng trắng. Số sự kiện là 2, không phải số quả bóng."),
  soSanh: fill("thu-so-sanh", "Bóng trắng xuất hiện nhiều lần hơn bóng đỏ bao nhiêu lần?", ["Nhiều hơn", { answer: 11 - 8 }, "lần."], "Đọc số lần của từng màu, rồi lấy số lớn trừ số bé.", `Bóng trắng 11 lần, bóng đỏ 8 lần: 11 − 8 = ${11 - 8}.`, tally([{ label: "Bóng đỏ", count: 8, color: "var(--unit-mm2)" }, { label: "Bóng trắng", count: 11 }])),
};

const docBang: Question[] = [
  choice("db-1", "Nam gieo một xúc xắc nhiều lần và ghi bảng kiểm đếm. Mặt 5 chấm xuất hiện bao nhiêu lần?", ["5 lần", "6 lần", "8 lần", "9 lần"], ["5 lần", "6 lần", "8 lần", "9 lần"].indexOf(`${matXucXac[4]} lần`), "Mỗi nhóm có nét chéo là 5 nét. Đừng đếm mỗi nhóm là 1.", `Hàng mặt 5 chấm có 1 nhóm đủ 5 nét và 3 nét lẻ: 5 + 3 = ${matXucXac[4]}. Mặt 5 chấm xuất hiện ${matXucXac[4]} lần.`, tally(xucXacRows)),
  fill("db-2", "Nam gieo xúc xắc tất cả bao nhiêu lần?", ["Tất cả:", { answer: sum(matXucXac) }, "lần."], "Đọc số lần của từng mặt, rồi cộng cả sáu số.", `${matXucXac.join(" + ")} = ${sum(matXucXac)}. Nam gieo ${sum(matXucXac)} lần.`, tally(xucXacRows)),
  choice("db-3", "Mặt nào xuất hiện ít lần nhất?", ["Mặt 1 chấm", "Mặt 3 chấm", "Mặt 5 chấm", "Mặt 6 chấm"], 3, "Đọc số lần của từng mặt rồi tìm số bé nhất.", `Mặt 6 chấm có ${matXucXac[5]} lần, ít hơn mọi mặt khác (mặt 1 chấm: ${matXucXac[0]}, mặt 3 chấm: ${matXucXac[2]}, mặt 5 chấm: ${matXucXac[4]}).`, tally(xucXacRows)),
  fill("db-4", "Mai lấy 1 bóng từ hộp, ghi màu vào bảng kiểm đếm rồi trả bóng vào hộp. Mai làm 10 lần. Điền số lần và tổng số lần.", ["Bóng xanh:", { answer: 8 }, "lần; bóng vàng:", { answer: 2 }, "lần. Tổng:", { answer: 8 + 2 }, "lần."], "Đếm từng hàng, rồi cộng hai số. Tổng phải bằng số lần Mai làm.", `Bóng xanh 5 + 3 = 8 lần, bóng vàng 2 lần. 8 + 2 = ${8 + 2}, đúng bằng 10 lần Mai làm.`, tally([{ label: "Bóng xanh", count: 8, color: "var(--unit-second)" }, { label: "Bóng vàng", count: 2, color: "var(--unit-century)" }])),
];

const suKien: Question[] = [
  choice("sk-1", "Trong túi có 2 bút xanh và 1 bút đỏ. Mai lấy 1 bút, xem màu. Các sự kiện có thể xảy ra là gì?", ["Lấy được bút xanh; lấy được bút đỏ", "Chỉ lấy được bút xanh", "Lấy được bút đỏ; lấy được bút vàng", "Lấy được 1 bút xanh và 1 bút đỏ"], 0, "Hỏi mình: lấy 1 bút thì thấy những màu nào?", "Túi có bút xanh và bút đỏ. Lấy 1 bút thì có thể xảy ra: lấy được bút xanh; lấy được bút đỏ. Trong túi không có bút vàng."),
  choice("sk-2", "Trong túi có 3 bút xanh và 1 bút đỏ. Mai lấy 2 bút ra, xem màu. Các sự kiện có thể xảy ra là gì?", ["Lấy được 2 bút đỏ; lấy được 2 bút xanh", "Lấy được 1 bút đỏ và 1 bút xanh; lấy được 2 bút xanh", "Chỉ lấy được 2 bút xanh", "Lấy được 1 bút xanh; lấy được 1 bút đỏ"], 1, "Túi chỉ có 1 bút đỏ. Hai bút lấy ra có thể là những màu nào?", "Vì chỉ có 1 bút đỏ nên không có 2 bút đỏ. Hai bút lấy ra là: 1 bút đỏ và 1 bút xanh, hoặc 2 bút xanh. Có 2 sự kiện."),
  fill("sk-3", "Hộp có 1 quả bóng đỏ, 1 quả bóng xanh và 1 quả bóng vàng. Lấy 1 quả, xem màu. Có mấy sự kiện có thể xảy ra?", [{ answer: 3 }, "sự kiện."], "Mỗi màu bóng lấy được là một sự kiện.", "Lấy được bóng đỏ; lấy được bóng xanh; lấy được bóng vàng. Có 3 sự kiện."),
];

const dayBongText = dayBong.join(" ");
const nhieuHon = bongXanh > bongVang ? "Bóng xanh" : "Bóng vàng";
const dienBang: Question[] = [
  fill("kq-1", `Mai lấy 1 bóng từ hộp, xem màu rồi trả lại, làm 20 lần. Kết quả (X là bóng xanh, V là bóng vàng): ${dayBongText}. Điền bảng kiểm đếm.`, ["Bóng xanh:", { answer: bongXanh }, "lần; bóng vàng:", { answer: bongVang }, "lần."], "Đếm riêng chữ X, rồi đếm riêng chữ V. Chạm từng chữ để khỏi sót.", `Có ${bongXanh} chữ X và ${bongVang} chữ V. Nhóm 5: ${bongXanh} = 5 + 5 + 5 + ${bongXanh - 15}.`),
  fill("kq-2", "Cộng số lần của hai sự kiện. Tổng có bằng 20 lần Mai đã làm không?", [`${bongXanh} + ${bongVang} =`, { answer: bongXanh + bongVang }], "Tổng số lần của các sự kiện bằng số lần thực hiện.", `${bongXanh} + ${bongVang} = ${bongXanh + bongVang}, đúng bằng 20 lần. Nếu không bằng 20 là con đếm sót hoặc đếm trùng.`),
  choice("kq-3", "Sự kiện nào xuất hiện nhiều lần hơn?", ["Lấy được bóng xanh", "Lấy được bóng vàng"], bongXanh > bongVang ? 0 : 1, "So hai số lần trong bảng kiểm đếm.", `${nhieuHon} ${nhieuHon === "Bóng xanh" ? bongXanh : bongVang} lần, nhiều hơn ${nhieuHon === "Bóng xanh" ? bongVang : bongXanh} lần.`, tally(bongRows)),
  fill("kq-4", "Sự kiện lấy được bóng xanh xuất hiện nhiều lần hơn sự kiện lấy được bóng vàng bao nhiêu lần?", ["Nhiều hơn", { answer: bongXanh - bongVang }, "lần."], "Lấy số lần lớn trừ số lần bé.", `${bongXanh} − ${bongVang} = ${bongXanh - bongVang}.`, tally(bongRows)),
  fill("kq-5", `Nam gieo một xúc xắc 12 lần, ghi số chấm: ${dayXucXac.join(", ")}. Điền số lần xuất hiện.`, ["Mặt 5 chấm:", { answer: countOf(dayXucXac, 5) }, "lần; mặt 6 chấm:", { answer: countOf(dayXucXac, 6) }, "lần."], "Đếm riêng từng số 5, rồi từng số 6 trong dãy.", `Số 5 xuất hiện ${countOf(dayXucXac, 5)} lần, số 6 xuất hiện ${countOf(dayXucXac, 6)} lần.`),
];

const soSanh: Question[] = [
  choice("ss-1", "Một vòng quay có 3 màu. Bạn quay nhiều lần và ghi bảng kiểm đếm. Mũi tên dừng ở màu nào nhiều lần nhất?", ["Màu đỏ", "Màu vàng", "Màu xanh"], 0, "Đọc số lần của từng màu rồi so sánh.", `Màu đỏ ${vongQuayBaMau.do} lần, màu vàng ${vongQuayBaMau.vang} lần, màu xanh ${vongQuayBaMau.xanh} lần. ${vongQuayBaMau.do} là lớn nhất.`, tally(baMauRows)),
  fill("ss-2", "Màu đỏ xuất hiện nhiều hơn màu vàng bao nhiêu lần?", ["Nhiều hơn", { answer: vongQuayBaMau.do - vongQuayBaMau.vang }, "lần."], "Lấy số lần của màu đỏ trừ số lần của màu vàng.", `${vongQuayBaMau.do} − ${vongQuayBaMau.vang} = ${vongQuayBaMau.do - vongQuayBaMau.vang}.`, tally(baMauRows)),
  fill("ss-3", "Bạn đã quay vòng quay tất cả bao nhiêu lần?", ["Tất cả:", { answer: vongQuayBaMau.do + vongQuayBaMau.vang + vongQuayBaMau.xanh }, "lần."], "Cộng số lần của cả ba màu.", `${vongQuayBaMau.do} + ${vongQuayBaMau.vang} + ${vongQuayBaMau.xanh} = ${vongQuayBaMau.do + vongQuayBaMau.vang + vongQuayBaMau.xanh}.`, tally(baMauRows)),
  choice("ss-4", "Màu nào xuất hiện ít lần nhất?", ["Màu đỏ", "Màu vàng", "Màu xanh"], 2, "Tìm số lần bé nhất.", `Màu xanh ${vongQuayBaMau.xanh} lần, ít hơn màu vàng (${vongQuayBaMau.vang} lần) và màu đỏ (${vongQuayBaMau.do} lần).`, tally(baMauRows)),
];

const suyNghi: Question[] = [
  choice("sn-1", "Nam chưa quay lần nào mà nói: “Màu vàng sẽ xuất hiện nhiều lần hơn”. Muốn biết sự kiện nào xuất hiện nhiều lần hơn, con nên làm gì?", ["Tin lời Nam vì Nam đoán", "Quay nhiều lần, ghi bảng kiểm đếm rồi so sánh số lần", "Chọn màu mình thích"], 1, "Muốn biết thì phải có số liệu.", "Đoán chưa đủ. Con quay nhiều lần, ghi kiểm đếm, rồi so sánh số lần của từng sự kiện."),
  choice("sn-2", "Hai bạn quay 20 lần. Bảng kiểm đếm ghi màu đỏ 9 lần, màu vàng 8 lần. Bảng này có hợp lí không?", ["Hợp lí, vì cả hai số đều bé hơn 10", "Chưa hợp lí, vì 9 + 8 = 17, không bằng 20", "Hợp lí, vì 9 lớn hơn 8"], 1, "Cộng số lần của hai màu rồi so với số lần quay.", `9 + 8 = ${9 + 8}, mà các bạn quay 20 lần. Còn thiếu ${20 - (9 + 8)} lần chưa ghi. Tổng các lần phải bằng số lần thực hiện.`),
  choice("sn-3", "Bảng kiểm đếm có hai hàng: màu đỏ 9 lần, màu vàng 11 lần. Bạn Mai nói có 11 sự kiện. Bạn Mai nói đúng không?", ["Đúng", "Sai: có 2 sự kiện, còn 9 và 11 là số lần xuất hiện của từng sự kiện"], 1, "Hai hàng của bảng là hai sự kiện nào?", "Hai sự kiện: mũi tên dừng ở màu đỏ; mũi tên dừng ở màu vàng. 9 và 11 là số lần xuất hiện, không phải số sự kiện."),
  choice("sn-4", "Mai đếm hàng này được 4 lần vì thấy “1 nhóm và 3 nét”. Mai sai ở đâu?", ["Mai đếm một nhóm đủ 5 nét là 1; đúng là 5 + 3 = 8", "Mai đếm đúng", "Mai phải cộng 5 + 3 + 1"], 0, "Nét chéo gạch qua 4 nét đứng, cả nhóm có mấy nét?", "Một nhóm có nét chéo là 4 nét đứng và 1 nét chéo, tức 5 nét. Cả hàng có 5 + 3 = 8 nét.", tally([{ label: "Số nét", count: 8 }])),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "doc-bang", title: "Đọc bảng kiểm đếm (Khám phá, Luyện tập 1)", questions: docBang },
  { id: "su-kien", title: "Các sự kiện có thể xảy ra (Hoạt động 1, Luyện tập 2)", questions: suKien },
  { id: "dien-bang", title: "Hoàn thành bảng kiểm đếm", questions: dienBang },
  { id: "so-sanh", title: "So sánh số lần xuất hiện", questions: soSanh },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
