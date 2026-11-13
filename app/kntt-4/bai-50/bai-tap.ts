import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { BieuDoCot, type BieuDoCotProps, type Cot } from "@/components/math/bieu-do-cot";
import { formatNumber } from "@/lib/area-units";
import { createElement, type ReactNode } from "react";

const n = formatNumber;
const chart = (props: BieuDoCotProps): ReactNode => createElement(BieuDoCot, props);
const hideAll = (data: Cot[]): Cot[] => data.map((d) => ({ ...d, hideValue: true }));
const hideSome = (data: Cot[], unknown: string[]): Cot[] => data.map((d) => (unknown.includes(d.label) ? { ...d, value: null } : d));
const sum = (data: Cot[]) => data.reduce((total, d) => total + (d.value ?? 0), 0);
const maxCot = (data: Cot[]) => data.reduce((a, b) => (b.value! > a.value! ? b : a));
const minCot = (data: Cot[]) => data.reduce((a, b) => (b.value! < a.value! ? b : a));

type Chart = Omit<BieuDoCotProps, "data" | "stage"> & { data: Cot[] };

/** Số liệu các biểu đồ (đổi so với SGK). Đáp án mọi câu đều tính lại từ đây. */
export const lop: Chart = {
  title: "SỐ CÂY CÁC LỚP ĐÃ TRỒNG",
  axisLabel: "Cây",
  step: 10,
  max: 80,
  data: [
    { label: "Lớp 4A", value: 30 },
    { label: "Lớp 4B", value: 70 },
    { label: "Lớp 4C", value: 50 },
    { label: "Lớp 4D", value: 60 },
    { label: "Lớp 4E", value: 55 },
  ],
};

export const xeDap: Chart = {
  title: "SỐ HỌC SINH ĐI XE ĐẠP ĐẾN TRƯỜNG",
  axisLabel: "Học sinh",
  step: 20,
  max: 140,
  data: [
    { label: "Thứ Hai", value: 45 },
    { label: "Thứ Ba", value: 60 },
    { label: "Thứ Tư", value: 60 },
    { label: "Thứ Năm", value: 85 },
    { label: "Thứ Sáu", value: 120 },
  ],
};

export const mua: Chart = {
  title: "SỐ NGÀY CÓ MƯA TRONG BA THÁNG HÈ",
  axisLabel: "Ngày",
  step: 5,
  max: 25,
  data: [
    { label: "Tháng 6", value: 10 },
    { label: "Tháng 7", value: 25 },
    { label: "Tháng 8", value: 22 },
  ],
};

export const chay: Chart = {
  title: "ĐỘ DÀI QUÃNG ĐƯỜNG CHẠY CỦA MI",
  axisLabel: "m",
  step: 200,
  max: 1800,
  data: [
    { label: "Ngày 1", value: 600 },
    { label: "Ngày 2", value: 900 },
    { label: "Ngày 3", value: 1200 },
    { label: "Ngày 4", value: 1100 },
    { label: "Ngày 5", value: 1500 },
  ],
};

export const ve: Chart = {
  title: "SỐ VÉ XEM PHIM BÁN ĐƯỢC TRONG TUẦN",
  axisLabel: "Vé",
  step: 200,
  max: 2000,
  data: [
    { label: "Thứ Hai", value: 310 },
    { label: "Thứ Ba", value: 460 },
    { label: "Thứ Tư", value: 1980 },
    { label: "Thứ Năm", value: 520 },
    { label: "Thứ Sáu", value: 1250 },
    { label: "Thứ Bảy", value: 1380 },
    { label: "Chủ nhật", value: 1740 },
  ],
};

export const monThe: Chart = {
  title: "SỐ BẠN YÊU THÍCH MỖI MÔN",
  axisLabel: "Bạn",
  step: 2,
  max: 8,
  data: [
    { label: "Bóng đá", value: 8 },
    { label: "Bơi", value: 3 },
    { label: "Cờ vua", value: 5 },
    { label: "Cầu lông", value: 3 },
  ],
};

export const toTrong: Chart = {
  title: "SỐ CÂY CÁC TỔ ĐÃ TRỒNG",
  axisLabel: "Cây",
  step: 20,
  max: 100,
  data: [
    { label: "Tổ 1", value: 40 },
    { label: "Tổ 2", value: 70 },
    { label: "Tổ 3", value: 100 },
  ],
};

export const veNgan: Chart = {
  title: "SỐ VÉ BÁN CUỐI TUẦN",
  axisLabel: "Vé",
  step: 200,
  max: 800,
  data: [
    { label: "Thứ Bảy", value: 400 },
    { label: "Chủ nhật", value: 600 },
  ],
};

const show = (c: Chart, data = c.data): ReactNode => chart({ ...c, data });
const word = (c: Chart, i: number) => c.data[i].label;

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ReactNode): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, illustration };
}

function fill(id: string, prompt: string, parts: Part[], hint: string, explanation: string, illustration?: ReactNode): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, illustration };
}

function words(id: string, prompt: string, lines: Part[][], hint: string, explanation: string, illustration?: ReactNode): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation, illustration };
}

/** Đọc số ở đỉnh cột của mọi cột: một ô cho mỗi cột. */
function readAll(id: string, c: Chart, unit: string, illustration: ReactNode): FillQuestion {
  return fill(
    id,
    `Đọc số ghi ở đỉnh mỗi cột (đơn vị: ${unit}).`,
    c.data.flatMap((d, i): Part[] => [`${i ? "; " : ""}${d.label}:`, { answer: d.value! }]),
    "Nhìn tên ở hàng dưới của cột, rồi đọc số ghi ở đỉnh cột đó.",
    c.data.map((d) => `${d.label}: ${n(d.value!)}`).join("; ") + ".",
    illustration,
  );
}

/** Chọn tên cột có số lớn nhất hoặc nhỏ nhất. */
function extreme(id: string, c: Chart, which: "max" | "min", prompt: string, illustration: ReactNode): ChoiceQuestion {
  const target = which === "max" ? maxCot(c.data) : minCot(c.data);
  return choice(
    id,
    prompt,
    c.data.map((d) => d.label),
    c.data.findIndex((d) => d.label === target.label),
    which === "max" ? "Cột cao nhất ứng với số lớn nhất. Đọc tên ở hàng dưới của cột đó." : "Cột thấp nhất ứng với số bé nhất. Đọc tên ở hàng dưới của cột đó.",
    `${which === "max" ? "Cột cao nhất" : "Cột thấp nhất"} là ${target.label}, ${n(target.value!)}.`,
    illustration,
  );
}

/** Vị trí số v so với các vạch chia. Chỉ số: 0 đúng vạch dưới, 1 gần vạch dưới, 2 chính giữa, 3 gần vạch trên. */
export function placement(v: number, step: number): { lo: number; hi: number; index: number } {
  const lo = Math.floor(v / step) * step;
  const r = v - lo;
  const index = r === 0 ? 0 : r * 2 < step ? 1 : r * 2 === step ? 2 : 3;
  return { lo, hi: lo + step, index };
}

/** Hoàn thành biểu đồ: cột của số v nằm ở đâu so với các vạch. Chọn đáp án, không có dạng bài mới. */
function place(id: string, c: Chart, label: string, partial: ReactNode): ChoiceQuestion {
  const v = c.data.find((d) => d.label === label)!.value!;
  const { lo, hi, index } = placement(v, c.step);
  const explanation =
    index === 0
      ? `${n(v)} đúng vạch ${n(lo)}, nên đỉnh cột chạm vạch ${n(lo)}.`
      : `${n(v)} nằm giữa vạch ${n(lo)} và vạch ${n(hi)}. ${n(v)} − ${n(lo)} = ${n(v - lo)}, nửa khoảng cách là ${n(c.step / 2)}, nên ${index === 1 ? `gần vạch ${n(lo)} hơn` : index === 2 ? "đúng chính giữa" : `gần vạch ${n(hi)} hơn`}.`;
  return choice(
    id,
    `Cột ${label} biểu diễn ${n(v)} ${c.axisLabel === "m" ? "m" : c.axisLabel.toLowerCase()}. Đỉnh cột phải nằm ở đâu?`,
    [`Đúng vạch ${n(lo)}`, `Giữa vạch ${n(lo)} và ${n(hi)}, gần vạch ${n(lo)} hơn`, `Chính giữa hai vạch ${n(lo)} và ${n(hi)}`, `Giữa vạch ${n(lo)} và ${n(hi)}, gần vạch ${n(hi)} hơn`, `Đúng vạch ${n(hi)}`],
    index,
    "Tìm hai vạch kẹp số đó. So số đó với số ở chính giữa hai vạch.",
    explanation,
    partial,
  );
}

/** Trung bình cộng: hai dòng, tổng rồi chia cho số cột. */
function average(id: string, c: Chart, unitOfSum: string, illustration: ReactNode): WordQuestion {
  const total = sum(c.data);
  const k = c.data.length;
  return words(
    id,
    "Tính trung bình cộng. Con làm ra vở ô li, rồi điền kết quả.",
    [
      [`Tổng các số (${unitOfSum}):`, { answer: total }],
      [`Chia cho ${k} cột:`, { answer: total / k }],
    ],
    "Cộng các số ở đỉnh cột, rồi chia tổng cho số cột.",
    `${c.data.map((d) => n(d.value!)).join(" + ")} = ${n(total)}; ${n(total)} : ${k} = ${n(total / k)}.`,
    illustration,
  );
}

function claim(id: string, text: string, truth: boolean, hint: string, explanation: string, illustration: ReactNode): ChoiceQuestion {
  return choice(id, `Đúng hay sai? ${text}`, ["Đúng", "Sai"], truth ? 0 : 1, hint, explanation, illustration);
}

const xeDapFull = show(xeDap);
const xeDapPartial = show(xeDap, hideSome(xeDap.data, ["Thứ Hai", "Thứ Tư", "Thứ Năm"]));
const vePartial = show(ve, hideSome(ve.data, ["Thứ Hai", "Thứ Ba", "Thứ Bảy", "Chủ nhật"]));
const lopFull = show(lop);
const muaFull = show(mua);
const chayFull = show(chay);
const veFull = show(ve);

const equalPairs = xeDap.data.slice(0, -1).map((d, i) => [d.label, xeDap.data[i + 1].label]);
const equalIndex = equalPairs.findIndex(([a, b]) => xeDap.data.find((d) => d.label === a)!.value === xeDap.data.find((d) => d.label === b)!.value);

/** Khởi động: dãy số liệu và kiểm đếm. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill("kd-lon-nhat", "Dãy số liệu: 8, 3, 5. Số lớn nhất là", ["Số lớn nhất:", { answer: Math.max(8, 3, 5) }], "So sánh từng số với nhau.", "Trong 8, 3, 5 số lớn nhất là 8."),
  fill("kd-kiem-dem", "Ô kiểm đếm có 4 nét thẳng và 1 nét gạch chéo. Đó là mấy?", ["Số lần:", { answer: 4 + 1 }], "Nét gạch chéo là nét thứ 5.", "4 nét thẳng và 1 nét chéo là 5."),
  fill("kd-trung-binh", "Trung bình cộng của 4, 6 và 2 là", ["(4 + 6 + 2) : 3 =", { answer: (4 + 6 + 2) / 3 }], "Cộng ba số rồi chia cho 3.", "4 + 6 + 2 = 12; 12 : 3 = 4."),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  caoHon: choice("thu-cao-hon", "Cột Bóng rổ cao hơn cột Bơi. Số bạn yêu thích bóng rổ so với bơi thế nào?", ["Nhiều hơn", "Ít hơn", "Bằng nhau"], 0, "Cột cao hơn biểu diễn số lớn hơn.", "Cột cao hơn biểu diễn số bạn nhiều hơn."),
  truc: choice("thu-truc", "Trên biểu đồ cột, hàng dưới (trục ngang) ghi gì?", ["Tên các môn thể thao", "Số bạn"], 0, "Số bạn nằm ở bên trái.", "Hàng dưới ghi tên các môn, các số bên trái chỉ số bạn."),
  docDinh: fill(
    "thu-doc-dinh",
    "Đọc số ghi ở đỉnh cột Bóng rổ.",
    ["Bóng rổ:", { answer: 6 }],
    "Số ghi ở đỉnh cột chỉ số bạn.",
    "Số ghi ở đỉnh cột Bóng rổ là 6.",
    show({ title: "SỐ BẠN YÊU THÍCH MỖI MÔN THỂ THAO", axisLabel: "Bạn", step: 1, max: 6, data: [{ label: "Bóng đá", value: 4 }, { label: "Bóng rổ", value: 6 }, { label: "Bơi", value: 2 }] }),
  ),
  docVach: fill("thu-doc-vach", "Cột Tổ 2 cao đến chính giữa vạch 60 và vạch 80. Cột đó biểu diễn bao nhiêu cây?", ["Tổ 2:", { answer: (60 + 80) / 2 }], "Số ở chính giữa 60 và 80 là (60 + 80) : 2.", "Chính giữa 60 và 80 là 70.", show(toTrong, hideAll(toTrong.data))),
};

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "doc-bieu-do",
    title: "Đọc biểu đồ cột",
    questions: [
      readAll("dc-1a", lop, "cây", lopFull),
      extreme("dc-1b", lop, "max", "Lớp nào trồng nhiều cây nhất?", lopFull),
      extreme("dc-1c", lop, "min", "Lớp nào trồng ít cây nhất?", lopFull),
      fill(
        "dc-1d",
        "Có bao nhiêu lớp trồng nhiều hơn 50 cây? (Nhiều hơn 50 thì không gồm 50.)",
        ["Số lớp:", { answer: lop.data.filter((d) => d.value! > 50).length }],
        "Đếm các cột có số lớn hơn 50. Cột đúng 50 thì không tính.",
        `Các số lớn hơn 50: ${lop.data.filter((d) => d.value! > 50).map((d) => n(d.value!)).join(", ")}. Lớp 4C đúng 50 nên không tính.`,
        lopFull,
      ),
      fill(
        "dc-1e",
        "Lớp 4B trồng nhiều hơn lớp 4A bao nhiêu cây?",
        ["Nhiều hơn:", { answer: lop.data[1].value! - lop.data[0].value! }, "cây"],
        "Lấy số cây của lớp 4B trừ số cây của lớp 4A.",
        `${lop.data[1].value} − ${lop.data[0].value} = ${lop.data[1].value! - lop.data[0].value!}.`,
        lopFull,
      ),
    ],
  },
  {
    id: "hoan-thanh",
    title: "Hoàn thành biểu đồ",
    questions: [
      place("ht-1", xeDap, "Thứ Hai", xeDapPartial),
      place("ht-2", xeDap, "Thứ Năm", xeDapPartial),
      choice(
        "ht-3",
        "Biểu đồ đã vẽ xong. Hai ngày nào có số học sinh đi xe đạp bằng nhau?",
        equalPairs.map(([a, b]) => `${a} và ${b}`),
        equalIndex,
        "Tìm hai cột cao bằng nhau, hai cột đó có cùng số ở đỉnh.",
        `${equalPairs[equalIndex][0]} và ${equalPairs[equalIndex][1]} cùng là ${xeDap.data[equalIndex].value} học sinh.`,
        xeDapFull,
      ),
      average("ht-4", xeDap, "học sinh", xeDapFull),
    ],
  },
  {
    id: "mua",
    title: "Số ngày mưa",
    questions: [
      readAll("mu-1a", mua, "ngày", muaFull),
      fill(
        "mu-1b",
        "Tháng 7 mưa nhiều hơn tháng 6 bao nhiêu ngày?",
        ["Nhiều hơn:", { answer: mua.data[1].value! - mua.data[0].value! }, "ngày"],
        "Lấy số ngày mưa của tháng 7 trừ số ngày mưa của tháng 6.",
        `${mua.data[1].value} − ${mua.data[0].value} = ${mua.data[1].value! - mua.data[0].value!}.`,
        muaFull,
      ),
      average("mu-1c", mua, "ngày", muaFull),
    ],
  },
  {
    id: "chay",
    title: "Quãng đường chạy",
    questions: [
      readAll("ch-1a", chay, "m", chayFull),
      average("ch-1b", chay, "m", chayFull),
      choice(
        "ch-1c",
        "Ngày nào Mi chạy ít hơn ngày trước đó?",
        chay.data.slice(1).map((d) => d.label),
        chay.data.slice(1).findIndex((d, i) => d.value! < chay.data[i].value!),
        "So mỗi cột với cột bên trái nó: cột nào thấp hơn?",
        `Ngày 4: ${n(chay.data[3].value!)} m, ít hơn ngày 3 (${n(chay.data[2].value!)} m). Các ngày khác đều nhiều hơn ngày trước.`,
        chayFull,
      ),
      fill(
        "ch-1d",
        "Ngày 5 Mi chạy nhiều hơn ngày 1 bao nhiêu mét?",
        ["Nhiều hơn:", { answer: chay.data[4].value! - chay.data[0].value! }, "m"],
        "Lấy số ở đỉnh cột ngày 5 trừ số ở đỉnh cột ngày 1.",
        `${n(chay.data[4].value!)} − ${n(chay.data[0].value!)} = ${n(chay.data[4].value! - chay.data[0].value!)}.`,
        chayFull,
      ),
    ],
  },
  {
    id: "ve",
    title: "Số vé xem phim",
    questions: [
      place("ve-1a", ve, "Thứ Hai", vePartial),
      place("ve-1b", ve, "Thứ Bảy", vePartial),
      fill(
        "ve-1c",
        "Biểu đồ đã vẽ xong. Có bao nhiêu ngày bán hơn 1 000 vé?",
        ["Số ngày:", { answer: ve.data.filter((d) => d.value! > 1000).length }],
        "Đếm các cột có số lớn hơn 1 000 (cao hơn vạch 1 000).",
        `Hơn 1 000 vé: ${ve.data.filter((d) => d.value! > 1000).map((d) => `${d.label} ${n(d.value!)}`).join("; ")}.`,
        veFull,
      ),
      extreme("ve-1d", ve, "max", "Ngày nào bán được nhiều vé nhất?", veFull),
      fill(
        "ve-1e",
        "Cả tuần bán được bao nhiêu vé?",
        ["Tổng:", { answer: sum(ve.data) }, "vé"],
        "Cộng các số ở đỉnh bảy cột.",
        `${ve.data.map((d) => n(d.value!)).join(" + ")} = ${n(sum(ve.data))}.`,
        veFull,
      ),
    ],
  },
  {
    id: "dung-sai",
    title: "Đúng hay sai?",
    questions: [
      claim("ds-1", "Cột cao nhất là cột của lớp trồng nhiều cây nhất.", true, "Cột cao hơn biểu diễn số lớn hơn.", "Đúng. Cột cao nhất là Lớp 4B, 70 cây.", lopFull),
      claim("ds-2", "Lớp 4C trồng nhiều hơn 50 cây.", lop.data[2].value! > 50, "Nhiều hơn 50 thì phải lớn hơn 50, không gồm 50.", `Sai. Lớp 4C trồng đúng ${lop.data[2].value} cây, không nhiều hơn 50.`, lopFull),
      claim("ds-3", "Tháng 7 mưa nhiều gấp đôi tháng 6.", mua.data[1].value === 2 * mua.data[0].value!, "Gấp đôi 10 là bao nhiêu? So với số ngày mưa tháng 7.", `Sai. Gấp đôi ${mua.data[0].value} là ${2 * mua.data[0].value!}, mà tháng 7 có ${mua.data[1].value} ngày mưa.`, muaFull),
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      claim(
        "sn-1a",
        `Biểu đồ có ${monThe.data.length} cột, nên có ${monThe.data.length} bạn.`,
        false,
        "Mỗi cột biểu diễn số bạn yêu thích một môn, không phải một bạn.",
        "Sai. Mỗi cột cho biết số bạn của một môn. Số bạn nằm ở độ cao của cột.",
        show(monThe),
      ),
      fill("sn-1b", "Có tất cả bao nhiêu bạn được hỏi? (Mỗi bạn chọn một môn.)", ["Tổng:", { answer: sum(monThe.data) }, "bạn"], "Cộng các số ở đỉnh cả bốn cột.", `${monThe.data.map((d) => d.value).join(" + ")} = ${sum(monThe.data)}.`, show(monThe)),
      fill(
        "sn-2",
        `Cột ${word(toTrong, 1)} cao đến chính giữa vạch 60 và vạch 80. Nó biểu diễn bao nhiêu cây?`,
        [`${word(toTrong, 1)}:`, { answer: toTrong.data[1].value! }, "cây"],
        "Số ở chính giữa hai vạch là (60 + 80) : 2.",
        "Chính giữa 60 và 80 là (60 + 80) : 2 = 70.",
        show(toTrong, hideAll(toTrong.data)),
      ),
      fill(
        "sn-3",
        "Nam nhìn thấy cột Chủ nhật cao đến vạch thứ 3 kể từ số 0 và nói là 3 vé. Mỗi vạch cách nhau 200 vé. Cột đó thật sự biểu diễn bao nhiêu vé?",
        ["Chủ nhật:", { answer: 3 * veNgan.step }, "vé"],
        "Mỗi vạch không phải một vé. Vạch thứ 3 ghi số nào?",
        `Vạch thứ 3 kể từ 0 là 3 × 200 = ${3 * veNgan.step}. Phải đọc số ghi ở bên trái, không đếm số vạch.`,
        show(veNgan, hideAll(veNgan.data)),
      ),
    ],
  },
];
