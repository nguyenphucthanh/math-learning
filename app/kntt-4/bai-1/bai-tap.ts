import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { createElement } from "react";
import { QueTinh } from "./_illustrations/que-tinh";
import { TiaSoHinh } from "./_illustrations/tia-so-hinh";

/** Tia số có `count` vạch cách đều `step`; `unknown` là vị trí các vạch để trống (đếm từ 0). */
export function tiaSoTicks(start: number, step: number, count: number, unknown: number[]): (number | null)[] {
  return Array.from({ length: count }, (_, index) => (unknown.includes(index) ? null : start + index * step));
}

function tiaSo(id: string, start: number, step: number, unknown: number[], hint: string, explanation: string): FillQuestion {
  const parts: FillQuestion["parts"] = [];
  unknown.forEach((position, index) => {
    parts.push(`${["①", "②", "③"][index]} =`, { answer: start + position * step });
    if (index < unknown.length - 1) parts.push(";");
  });
  return {
    id,
    kind: "dien-so",
    prompt: "Điền số còn thiếu vào các vạch ①, ②, ③ của tia số.",
    illustration: createElement(TiaSoHinh, { ticks: tiaSoTicks(start, step, 7, unknown) }),
    parts,
    hint,
    explanation,
  };
}

/** Khởi động đầu bài: nhớ lại số trong phạm vi 10 000 (Toán 3), không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-viet",
    kind: "dien-so",
    prompt: "Viết số: 3 nghìn, 4 trăm, 2 chục và 7 đơn vị.",
    parts: ["Số đó là", { answer: 3427 }],
    hint: "Viết lần lượt chữ số của hàng nghìn, trăm, chục, đơn vị.",
    explanation: "3 nghìn, 4 trăm, 2 chục, 7 đơn vị viết là 3 427.",
  },
  {
    id: "kd-lien-sau",
    kind: "dien-so",
    parts: ["Số liền sau của 2 999 là", { answer: 3000 }],
    hint: "Số liền sau hơn số đã cho 1 đơn vị.",
    explanation: "2 999 thêm 1 là 3 000.",
  },
  {
    id: "kd-so-sanh",
    kind: "trac-nghiem",
    prompt: "Số nào lớn hơn?",
    options: ["4 506", "4 560"],
    answerIndex: 1,
    hint: "Hai số cùng có 4 chữ số. So từ hàng nghìn, rồi hàng trăm, rồi hàng chục.",
    explanation: "Hàng nghìn và hàng trăm giống nhau. Hàng chục: 6 lớn hơn 0, nên 4 560 > 4 506.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  viet: {
    id: "thu-viet",
    kind: "dien-so",
    prompt: "Viết số: bốn mươi nghìn bảy trăm linh hai.",
    parts: ["Số đó là", { answer: 40702 }],
    hint: "Không có chục, nên ở hàng chục viết chữ số 0.",
    explanation: "40 nghìn, 7 trăm, 0 chục, 2 đơn vị: 40 702.",
  },
  giaTri: {
    id: "thu-gia-tri",
    kind: "dien-so",
    parts: ["Chữ số 5 trong số 35 260 có giá trị là", { answer: 5000 }],
    hint: "Chữ số 5 đứng ở hàng nghìn.",
    explanation: "35 260 = 30 000 + 5 000 + 200 + 60. Chữ số 5 ở hàng nghìn, giá trị là 5 000.",
  },
  phanTich: {
    id: "thu-phan-tich",
    kind: "dien-so",
    parts: ["71 308 = 70 000 + 1 000 + 300 +", { answer: 8 }],
    hint: "Hàng chục là 0, nên không có số hạng chục. Còn lại hàng đơn vị.",
    explanation: "71 308 = 70 000 + 1 000 + 300 + 8. Hàng chục là 0 nên bỏ qua.",
  },
  lienTruoc: {
    id: "thu-lien-truoc",
    kind: "dien-so",
    parts: ["Số liền trước của 20 000 là", { answer: 19999 }],
    hint: "Số liền trước kém số đã cho 1 đơn vị. Con bớt 1 từ 20 000.",
    explanation: "20 000 bớt 1 là 19 999.",
  },
  soSanh: {
    id: "thu-so-sanh",
    kind: "so-sanh",
    prompt: "Chọn dấu thích hợp.",
    rows: [{ left: "99 099", right: "99 909", answer: "<" }],
    hint: "Hai số cùng có 5 chữ số. Chữ số hàng chục nghìn, nghìn giống nhau, hãy so hàng trăm.",
    explanation: "Hàng trăm: 0 bé hơn 9, nên 99 099 < 99 909.",
  },
  lamTron: {
    id: "thu-lam-tron",
    kind: "dien-so",
    parts: ["Làm tròn 15 280 đến hàng nghìn được", { answer: 15000 }],
    hint: "Nhìn chữ số hàng trăm: là 2, bé hơn 5.",
    explanation: "Hàng trăm là 2, bé hơn 5, nên giữ nguyên hàng nghìn: 15 000.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "doc-viet",
    title: "Đọc và viết số",
    questions: [
      {
        id: "dv-1",
        kind: "dien-so",
        prompt: "Số 52 076 có các chữ số ở từng hàng là:",
        parts: ["Hàng chục nghìn", { answer: 5 }, ", nghìn", { answer: 2 }, ", trăm", { answer: 0 }, ", chục", { answer: 7 }, ", đơn vị", { answer: 6 }],
        hint: "Đọc các chữ số của 52 076 từ trái sang phải, tương ứng từ hàng chục nghìn đến hàng đơn vị.",
        explanation: "52 076: 5 chục nghìn, 2 nghìn, 0 trăm, 7 chục, 6 đơn vị.",
      },
      {
        id: "dv-2",
        kind: "dien-so",
        prompt: "Hàng chục nghìn là 9, hàng nghìn là 1, hàng trăm là 0, hàng chục là 3, hàng đơn vị là 5.",
        parts: ["Viết số:", { answer: 91035 }],
        hint: "Viết lần lượt các chữ số từ hàng chục nghìn đến hàng đơn vị. Hàng trăm là 0 nên cũng viết 0.",
        explanation: "9, 1, 0, 3, 5 viết liền nhau là 91 035.",
      },
      {
        id: "dv-3",
        kind: "trac-nghiem",
        prompt: "Số 52 076 đọc là:",
        options: [
          "năm mươi hai nghìn bảy mươi sáu",
          "năm mươi hai nghìn không trăm bảy mươi sáu",
          "năm mươi hai nghìn bảy trăm sáu mươi",
          "năm mươi hai nghìn không trăm linh sáu",
        ],
        answerIndex: 1,
        hint: "Hàng trăm là 0, phải đọc là “không trăm”. Hàng chục là 7 nên đọc “bảy mươi sáu”.",
        explanation: "Đọc theo lớp nghìn rồi lớp đơn vị: năm mươi hai nghìn, không trăm bảy mươi sáu.",
      },
      {
        id: "dv-4",
        kind: "dien-so",
        prompt: "Viết số: ba mươi nghìn bốn trăm linh bảy.",
        parts: ["Số đó là", { answer: 30407 }],
        hint: "“Linh bảy” nghĩa là hàng chục là 0 và hàng đơn vị là 7. Không có nghìn, nên hàng nghìn cũng là 0.",
        explanation: "30 nghìn, 4 trăm, 0 chục, 7 đơn vị: 30 407. Hàng nghìn ở đây là 0.",
      },
      {
        id: "dv-5",
        kind: "dien-so",
        prompt: "Viết số, biết số đó gồm: 6 chục nghìn, 4 trăm, 8 chục và 2 đơn vị.",
        parts: ["Số đó là", { answer: 60482 }],
        hint: "Không nói đến nghìn, nghĩa là hàng nghìn là 0.",
        explanation: "Chục nghìn 6, nghìn 0, trăm 4, chục 8, đơn vị 2: 60 482.",
      },
      {
        id: "dv-6",
        kind: "dien-so",
        prompt: "Viết số, biết số đó gồm: 9 chục nghìn, 4 nghìn và 6 đơn vị.",
        parts: ["Số đó là", { answer: 94006 }],
        hint: "Không nói đến trăm và chục, nghĩa là hai hàng đó đều là 0.",
        explanation: "Chục nghìn 9, nghìn 4, trăm 0, chục 0, đơn vị 6: 94 006.",
      },
      {
        id: "dv-7",
        kind: "noi-cap",
        prompt: "Nối mỗi số với cách đọc của số đó.",
        pairs: [
          { left: "6 504", right: "sáu nghìn năm trăm linh bốn" },
          { left: "65 004", right: "sáu mươi lăm nghìn không trăm linh bốn" },
          { left: "65 040", right: "sáu mươi lăm nghìn không trăm bốn mươi" },
          { left: "60 540", right: "sáu mươi nghìn năm trăm bốn mươi" },
        ],
        rightOrder: [2, 0, 3, 1],
        hint: "Số có 4 chữ số đọc nghìn là “sáu nghìn”. Chữ số 0 ở hàng trăm thì đọc “không trăm”, ở hàng chục thì đọc “linh” (khi có số đơn vị).",
        explanation: "6 504: sáu nghìn năm trăm linh bốn. 65 004: sáu mươi lăm nghìn không trăm linh bốn. 65 040: sáu mươi lăm nghìn không trăm bốn mươi. 60 540: sáu mươi nghìn năm trăm bốn mươi.",
      },
    ],
  },
  {
    id: "phan-tich",
    title: "Phân tích số thành tổng",
    questions: [
      {
        id: "pt-1",
        kind: "dien-so",
        parts: ["7 394 = 7 000 + 300 + 90 +", { answer: 4 }],
        hint: "Chữ số hàng đơn vị của 7 394 là mấy?",
        explanation: "7 394 = 7 000 + 300 + 90 + 4.",
      },
      {
        id: "pt-2",
        kind: "dien-so",
        parts: ["45 218 = 40 000 + 5 000 +", { answer: 200 }, "+ 10 + 8"],
        hint: "Tìm chữ số hàng trăm của 45 218, rồi viết giá trị của nó.",
        explanation: "Chữ số hàng trăm là 2, giá trị là 200. 45 218 = 40 000 + 5 000 + 200 + 10 + 8.",
      },
      {
        id: "pt-3",
        kind: "dien-so",
        parts: ["63 750 = 60 000 + 3 000 + 700 +", { answer: 50 }],
        hint: "Chữ số hàng chục là 5. Hàng đơn vị là 0, nên không có số hạng đơn vị.",
        explanation: "63 750 = 60 000 + 3 000 + 700 + 50. Hàng đơn vị là 0 nên bỏ qua.",
      },
      {
        id: "pt-4",
        kind: "dien-so",
        parts: ["80 906 = 80 000 +", { answer: 900 }, "+ 6"],
        hint: "Tìm chữ số hàng trăm của 80 906. Giá trị của nó không phải 9 mà là 9 trăm.",
        explanation: "80 906 = 80 000 + 900 + 6. Hàng nghìn và hàng chục đều là 0 nên bỏ qua.",
      },
      {
        id: "pt-5",
        kind: "noi-cap",
        prompt: "Tìm số còn thiếu ở mỗi biểu thức, rồi nối biểu thức với số bằng nó.",
        pairs: [
          { left: "5 000 + ? + 80 + 2", right: "5 482" },
          { left: "50 000 + 4 000 + 20 + ?", right: "54 028" },
          { left: "? + 500 + 80 + 6", right: "40 586" },
          { left: "8 000 + 900 + ?", right: "8 905" },
        ],
        rightOrder: [1, 3, 0, 2],
        hint: "Nhìn các số hạng đã cho để thấy số nào hợp. Số hạng thiếu là giá trị của hàng còn lại.",
        explanation: "5 000 + 400 + 80 + 2 = 5 482. 50 000 + 4 000 + 20 + 8 = 54 028. 40 000 + 500 + 80 + 6 = 40 586. 8 000 + 900 + 5 = 8 905.",
      },
    ],
  },
  {
    id: "tia-so",
    title: "Tia số, số liền trước và liền sau",
    questions: [
      tiaSo(
        "ts-1",
        24391,
        1,
        [2, 4, 5],
        "Hai vạch liên tiếp hơn kém nhau 1. Điền từng vạch, bắt đầu từ vạch có số bên cạnh.",
        "Mỗi vạch thêm 1: 24 391, 24 392, 24 393, 24 394, 24 395, 24 396, 24 397.",
      ),
      tiaSo(
        "ts-2",
        20000,
        10000,
        [2, 4, 5],
        "Từ 20 000 đến 30 000 thêm 10 000. Mỗi vạch thêm 10 000.",
        "Mỗi vạch thêm 10 000: 20 000, 30 000, 40 000, 50 000, 60 000, 70 000, 80 000.",
      ),
      {
        id: "ts-3",
        kind: "dien-so",
        parts: ["Số liền trước của 63 280 là", { answer: 63279 }, "; số liền sau là", { answer: 63281 }],
        hint: "Số liền trước kém 1, số liền sau hơn 1.",
        explanation: "63 280 − 1 = 63 279 và 63 280 + 1 = 63 281.",
      },
      {
        id: "ts-4",
        kind: "dien-so",
        parts: ["Số liền trước của 70 000 là", { answer: 69999 }, "; số liền sau là", { answer: 70001 }],
        hint: "70 000 bớt 1: hàng đơn vị là 0 nên phải mượn từ hàng cao hơn, các hàng bên phải thành chữ số 9.",
        explanation: "70 000 − 1 = 69 999 và 70 000 + 1 = 70 001.",
      },
      {
        id: "ts-5",
        kind: "dien-so",
        parts: ["Số liền trước của 99 999 là", { answer: 99998 }, "; số liền sau là", { answer: 100000 }],
        hint: "99 999 là số lớn nhất có 5 chữ số. Thêm 1 thì được số tròn một trăm nghìn.",
        explanation: "99 999 − 1 = 99 998 và 99 999 + 1 = 100 000. Đây là số có sáu chữ số.",
      },
      {
        id: "ts-6",
        kind: "trac-nghiem",
        prompt: "Số liền trước của 40 000 là:",
        options: ["39 999", "39 000", "30 999", "40 001"],
        answerIndex: 0,
        hint: "Số liền trước kém 40 000 đúng 1 đơn vị.",
        explanation: "40 000 − 1 = 39 999.",
      },
    ],
  },
  {
    id: "so-sanh-lam-tron",
    title: "So sánh và làm tròn",
    questions: [
      {
        id: "ss-1",
        kind: "so-sanh",
        prompt: "Chọn dấu >, < hoặc = thích hợp.",
        rows: [
          { left: "9 764", right: "10 000", answer: "<" },
          { left: "74 215", right: "74 189", answer: ">" },
          { left: "45 000", right: "44 986", answer: ">" },
          { left: "6 372", right: "6 000 + 300 + 70 + 2", answer: "=" },
          { left: "53 026", right: "50 000 + 3 000 + 200 + 60", answer: "<" },
          { left: "80 107", right: "70 000 + 9 000 + 900 + 9", answer: ">" },
        ],
        hint: "Số có ít chữ số hơn thì bé hơn. Cùng số chữ số thì so từ hàng cao nhất. Với tổng, hãy viết thành số trước.",
        explanation:
          "9 764 < 10 000 (ít chữ số hơn). 74 215 > 74 189 (hàng trăm 2 > 1). 45 000 > 44 986 (hàng nghìn 5 > 4). 6 372 = 6 000 + 300 + 70 + 2. 50 000 + 3 000 + 200 + 60 = 53 260, mà 53 026 < 53 260. 70 000 + 9 000 + 900 + 9 = 79 909, mà 80 107 > 79 909.",
      },
      {
        id: "ss-2",
        kind: "trac-nghiem",
        prompt: "Số bé nhất trong các số 31 509, 29 874, 30 998, 29 784 là:",
        options: ["31 509", "29 874", "30 998", "29 784"],
        answerIndex: 3,
        hint: "So hàng nghìn trước. Hai số có hàng nghìn bé nhất thì so tiếp hàng trăm.",
        explanation: "Hai số bé hơn 30 000 là 29 874 và 29 784. Hàng trăm: 7 bé hơn 8, nên 29 784 bé nhất.",
      },
      {
        id: "ss-3",
        kind: "trac-nghiem",
        prompt: "Số nào dưới đây có chữ số hàng trăm là 6?",
        options: ["76 340", "45 962", "90 613", "28 156"],
        answerIndex: 2,
        hint: "Hàng trăm là chữ số thứ ba từ phải sang.",
        explanation: "90 613 có hàng trăm là 6. Ở 76 340 chữ số 6 là hàng nghìn, ở 45 962 là hàng chục, ở 28 156 là hàng đơn vị.",
      },
      {
        id: "ss-4",
        kind: "trac-nghiem",
        prompt: "Số dân của một xã là 24 618 người. Số dân của xã đó làm tròn đến hàng nghìn là:",
        options: ["24 000", "25 000", "24 600", "24 700"],
        answerIndex: 1,
        hint: "Nhìn chữ số hàng trăm của 24 618. So với 5.",
        explanation: "Hàng trăm là 6, lớn hơn 5, nên làm tròn lên: 25 000.",
      },
      {
        id: "ss-5",
        kind: "dien-so",
        parts: ["Làm tròn 38 472 đến hàng nghìn được", { answer: 38000 }],
        hint: "Nhìn chữ số hàng trăm của 38 472.",
        explanation: "Hàng trăm là 4, bé hơn 5, nên giữ nguyên hàng nghìn: 38 000.",
      },
      {
        id: "ss-6",
        kind: "trac-nghiem",
        prompt:
          "Trong bốn ngày đầu của đợt tiêm chủng, thành phố B tiêm được: Thứ Hai 41 305 liều, Thứ Ba 39 872 liều, Thứ Tư 40 960 liều, Thứ Năm 38 456 liều. Ngày nào tiêm được nhiều liều nhất?",
        options: ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm"],
        answerIndex: 0,
        hint: "Số lớn nhất là số có hàng chục nghìn lớn nhất, nếu bằng nhau thì xét hàng nghìn.",
        explanation: "Hàng chục nghìn đều là 3 hoặc 4. Các số 41 305 và 40 960 có hàng chục nghìn 4; hàng nghìn 1 lớn hơn 0 nên 41 305 lớn nhất, đó là Thứ Hai.",
      },
      {
        id: "ss-7",
        kind: "trac-nghiem",
        prompt: "Viết tên các ngày theo thứ tự có số liều đã tiêm từ ít nhất đến nhiều nhất:",
        options: [
          "Thứ Năm, Thứ Ba, Thứ Tư, Thứ Hai",
          "Thứ Hai, Thứ Tư, Thứ Ba, Thứ Năm",
          "Thứ Năm, Thứ Ba, Thứ Hai, Thứ Tư",
          "Thứ Ba, Thứ Năm, Thứ Tư, Thứ Hai",
        ],
        answerIndex: 0,
        hint: "Sắp xếp các số 38 456, 39 872, 40 960, 41 305 từ bé đến lớn, rồi đổi sang tên ngày.",
        explanation: "38 456 < 39 872 < 40 960 < 41 305: Thứ Năm, Thứ Ba, Thứ Tư, Thứ Hai.",
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-que-tinh",
        kind: "dien-so",
        prompt: "Đố em! Số 48 369 được xếp bằng que tính như hình. Hãy chuyển chỗ một que tính để tạo thành số bé nhất (số vẫn có năm chữ số).",
        illustration: createElement(QueTinh, { digits: "48369" }),
        parts: ["Số bé nhất là", { answer: 40368 }],
        hint: "Chữ số đầu tiên bé nhất có thể là 4. Hãy thử lấy một que của chữ số ở hàng nghìn để được chữ số bé nhất, rồi đặt que đó vào chữ số khác.",
        explanation:
          "Lấy que ở giữa của chữ số 8 thì 8 thành 0. Đặt que đó vào góc dưới bên trái của chữ số 9 thì 9 thành 8. Ta được 40 368.",
      },
      {
        id: "sn-tim-loi",
        kind: "dien-so",
        prompt: "Bạn An viết “ba mươi nghìn năm trăm” thành 3 500. Bạn An viết sai rồi.",
        parts: ["Số đúng là", { answer: 30500 }],
        hint: "Đọc “ba mươi nghìn”: 3 ở hàng chục nghìn. Hàng nghìn không có, nên viết chữ số 0.",
        explanation: "3 chục nghìn, 0 nghìn, 5 trăm: 30 500. An bỏ mất chữ số 0 ở hàng nghìn, nên chỉ được 3 500.",
      },
      {
        id: "sn-lap-so",
        kind: "dien-so",
        prompt: "Vượt sách: dùng các chữ số 3, 0, 7, 5, 9, mỗi chữ số dùng đúng một lần, lập số có năm chữ số.",
        parts: ["Số lớn nhất:", { answer: 97530 }, "; số bé nhất:", { answer: 30579 }],
        hint: "Số lớn nhất: xếp chữ số lớn nhất ở hàng cao nhất. Số bé nhất: chữ số 0 không đứng đầu, vì khi đó số không còn năm chữ số.",
        explanation: "Lớn nhất: 9, 7, 5, 3, 0 là 97 530. Bé nhất: lấy chữ số bé nhất khác 0 là 3 đứng đầu, rồi 0, 5, 7, 9: 30 579.",
      },
    ],
  },
];
