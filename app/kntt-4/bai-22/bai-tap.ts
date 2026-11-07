import type { DatTinhQuestion, ExerciseGroup, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { createElement } from "react";
import { AlignOptions } from "./_illustrations/align-options";
import { Bamboo } from "./_illustrations/bamboo";
import { Buckets, type Bucket } from "./_illustrations/buckets";

const n = formatNumber;

const ADD_HINT = "Cộng từ hàng đơn vị sang trái. Hàng nào cộng được từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng bên trái.";

/** Câu đặt tính rồi tính: con điền các chữ số của tổng. Lời giải tính từ `a + b`. */
function dat(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) };
}

/** Ba xô sữa của nhóm "Hoạt động". Số hạng đầu giảm dần (A > C > B), tổng thì B > C > A. */
export const buckets: Bucket[] = [
  { label: "A", first: 12000, second: 3000 },
  { label: "B", first: 7450, second: 8060 },
  { label: "C", first: 11028, second: 4290 },
];

/** Cành tre của bài cào cào: các đốt cách nhau 50, cào cào nhảy hai bước, mỗi bước qua hai đốt. */
export const bambooValues = [52100, 52150, 52200, 52250, 52300, 52350, 52400];

const bucketIllustration = () => createElement(Buckets, { buckets });

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-hang",
    kind: "trac-nghiem",
    prompt: "Trong số 180 510, chữ số 8 ở hàng nào?",
    options: ["Hàng nghìn", "Hàng chục nghìn", "Hàng trăm nghìn"],
    answerIndex: 1,
    hint: "Đọc số từ trái sang: trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị.",
    explanation: "180 510 có 1 trăm nghìn, 8 chục nghìn, 0 nghìn, 5 trăm, 1 chục và 0 đơn vị. Chữ số 8 ở hàng chục nghìn.",
  },
  dat("kd-cong", 4768, 1575),
  {
    id: "kd-doi",
    kind: "dien-so",
    parts: [`${n(201)} km =`, { answer: 201000 }, "m"],
    hint: "1 km = 1 000 m.",
    explanation: `1 km = 1 000 m nên 201 km = ${n(201 * 1000)} m.`,
  },
];

/** Câu thử trong phần Lý thuyết, mỗi chặng một câu. Không tính vào tiến độ. */
export const quickChecks = {
  sameColumn: dat("qc-cung-hang", 243125, 51462),
  align: {
    id: "qc-thang-hang",
    kind: "trac-nghiem",
    prompt: `Cách nào đặt tính đúng cho ${n(46215)} + 893?`,
    options: ["Cách A", "Cách B", "Cách C"],
    answerIndex: 1,
    hint: "Hàng đơn vị phải thẳng hàng đơn vị. Chữ số 3 của 893 đứng dưới chữ số nào của 46 215?",
    explanation: "Ở cách B, 3 đứng dưới 5 (đơn vị), 9 dưới 1 (chục), 8 dưới 2 (trăm). Các chữ số cùng hàng đứng cùng cột.",
    illustration: createElement(AlignOptions),
  },
  carry: dat("qc-co-nho", 248576, 135849),
  estimate: {
    id: "qc-uoc-luong",
    kind: "trac-nghiem",
    prompt: `Không đặt tính, ${n(412360)} + ${n(289540)} gần số nào nhất?`,
    options: [n(600000), n(800000), n(700000)],
    answerIndex: 2,
    hint: "Làm tròn từng số đến hàng trăm nghìn rồi cộng.",
    explanation: `${n(412360)} làm tròn thành ${n(400000)}, ${n(289540)} làm tròn thành ${n(300000)}. ${n(400000)} + ${n(300000)} = ${n(700000)}.`,
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Hoạt động",
    questions: [
      {
        id: "xo-tinh",
        kind: "dien-so",
        prompt: "Kết quả của phép tính ghi trên mỗi xô là số mi-li-lít sữa bò trong xô đó. Tính số mi-li-lít sữa trong mỗi xô.",
        parts: ["Xô A:", { answer: 15000 }, "ml;", "xô B:", { answer: 15510 }, "ml;", "xô C:", { answer: 15318 }, "ml"],
        hint: "Tính riêng từng xô: số trên cộng số dưới.",
        explanation: `A: ${n(12000)} + ${n(3000)} = ${n(15000)}. B: ${n(7450)} + ${n(8060)} = ${n(15510)}. C: ${n(11028)} + ${n(4290)} = ${n(15318)}.`,
        illustration: bucketIllustration(),
      },
      {
        id: "xo-nhieu",
        kind: "trac-nghiem",
        prompt: "Xô nào chứa nhiều sữa bò nhất?",
        options: ["Xô A", "Xô B", "Xô C"],
        answerIndex: 1,
        hint: "So sánh ba tổng con vừa tính, không so sánh số hạng đầu.",
        explanation: `${n(15510)} > ${n(15318)} > ${n(15000)}. Xô B có tổng lớn nhất, dù số hạng đầu của xô B nhỏ nhất.`,
        illustration: bucketIllustration(),
      },
      {
        id: "xo-it",
        kind: "trac-nghiem",
        prompt: "Xô nào chứa ít sữa bò nhất?",
        options: ["Xô A", "Xô B", "Xô C"],
        answerIndex: 0,
        hint: "Tìm tổng nhỏ nhất trong ba tổng.",
        explanation: `${n(15000)} < ${n(15318)} < ${n(15510)}. Xô A có tổng nhỏ nhất, dù số hạng đầu của xô A lớn nhất.`,
        illustration: bucketIllustration(),
      },
      dat("dt-1", 5128, 3641),
      dat("dt-2", 53164, 2635),
      dat("dt-3", 214530, 365248),
      dat("dt-4", 371845, 258976),
      {
        id: "vt-km",
        kind: "loi-van",
        prompt: `Trong 1 phút, vệ tinh A bay được quãng đường dài ${n(362000)} m. Vệ tinh B bay được quãng đường dài hơn vệ tinh A là 148 km. Hỏi trong 1 phút, vệ tinh B bay được quãng đường dài bao nhiêu mét?`,
        lines: [
          ["Đổi: 148 km =", { answer: 148000 }, "m"],
          [`Vệ tinh B bay được: ${n(362000)} + ${n(148000)} =`, { answer: 510000 }, "(m)"],
        ],
        hint: "Hai quãng đường đang viết bằng hai đơn vị khác nhau. Đổi km ra m trước khi cộng.",
        explanation: `148 km = ${n(148000)} m. ${n(362000)} + ${n(148000)} = ${n(510000)}. Vệ tinh B bay được ${n(510000)} m.`,
      },
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      dat("lt-1a", 4957, 865),
      dat("lt-1b", 463285, 37940),
      dat("lt-1c", 426357, 285604),
      {
        id: "lt-tien",
        kind: "trac-nghiem",
        prompt: "Cặp sách giá 85 000 đồng. Với 100 000 đồng, có thể mua cặp sách và đồ dùng nào sau đây? Bộ bút màu giá 18 500 đồng, hộp bút giá 12 000 đồng, bộ thước kẻ giá 16 000 đồng.",
        options: ["Bộ bút màu", "Hộp bút", "Bộ thước kẻ"],
        answerIndex: 1,
        hint: "Cộng giá cặp sách với giá từng đồ dùng, rồi so với 100 000 đồng.",
        explanation: `${n(85000)} + ${n(12000)} = ${n(97000)}, chưa tới ${n(100000)}. Bộ bút màu: ${n(85000)} + ${n(18500)} = ${n(103500)}. Bộ thước kẻ: ${n(85000)} + ${n(16000)} = ${n(101000)}. Hai tổng này đều quá ${n(100000)}.`,
      },
      {
        id: "lt-thieu-1",
        kind: "dat-tinh",
        prompt: "Tìm chữ số thích hợp ở các ô trống.",
        a: 34586,
        b: 5247,
        hide: { a: [2, 0], b: [3, 1] },
        hint: "Làm ngược từng cột, từ hàng đơn vị sang trái. Hàng đơn vị: ? + 7 có chữ số tận cùng là 3.",
        explanation:
          "Hàng đơn vị: 6 + 7 = 13, viết 3 nhớ 1. Hàng chục: 8 + 4 + 1 = 13, viết 3 nhớ 1. Hàng trăm: 5 + 2 + 1 = 8. Hàng nghìn: 4 + 5 = 9. Vậy 34 586 + 5 247 = 39 833.",
      },
      {
        id: "lt-thieu-2",
        kind: "dat-tinh",
        prompt: "Tìm chữ số thích hợp ở các ô trống.",
        a: 64382,
        b: 27549,
        hide: { a: [3, 1], b: [2], sum: [0] },
        hint: "Làm ngược từng cột, từ hàng đơn vị sang trái. Hàng đơn vị: 2 + 9 bằng bao nhiêu?",
        explanation:
          "Hàng đơn vị: 2 + 9 = 11, viết 1 nhớ 1. Hàng chục: 8 + 4 + 1 = 13, viết 3 nhớ 1. Hàng trăm: 3 + 5 + 1 = 9. Hàng nghìn: 4 + 7 = 11, viết 1 nhớ 1. Hàng chục nghìn: 6 + 2 + 1 = 9. Vậy 64 382 + 27 549 = 91 931.",
      },
      {
        id: "lt-cao-cao",
        kind: "loi-van",
        prompt: `Cào cào đứng ở đốt tre ghi ${n(52100)}, nhảy hai bước, mỗi bước nhảy qua hai đốt tre. Tính tổng các số ghi trên đốt tre mà cào cào nhảy đến.`,
        lines: [
          ["Bước 1 nhảy đến đốt ghi", { answer: 52250 }],
          ["Bước 2 nhảy đến đốt ghi", { answer: 52400 }],
          ["Tổng hai số là", { answer: 104650 }],
        ],
        hint: "Mỗi bước nhảy qua hai đốt rồi đáp xuống đốt kế tiếp, tức là đếm tiếp ba đốt. Đốt cào cào đứng lúc đầu không tính.",
        explanation: `Bước 1: qua ${n(52150)} và ${n(52200)}, đáp xuống ${n(52250)}. Bước 2: qua ${n(52300)} và ${n(52350)}, đáp xuống ${n(52400)}. ${n(52250)} + ${n(52400)} = ${n(104650)}.`,
        illustration: createElement(Bamboo, { values: bambooValues }),
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "tn-tim-loi",
        kind: "trac-nghiem",
        prompt: `Lan tính ${n(6748)} + 395 = ${n(7133)}. Lan sai ở đâu?`,
        options: ["Đặt tính lệch cột", "Quên cộng số nhớ ở hàng chục", "Cộng sai 8 + 5"],
        answerIndex: 1,
        hint: "Tính lại từng cột và so với bài của Lan. Chữ số hàng đơn vị của Lan có đúng không?",
        explanation: `Đúng là ${n(7143)}. Hàng đơn vị: 8 + 5 = 13, viết 3 nhớ 1. Hàng chục phải là 4 + 9 + 1 = 14, viết 4, nhưng Lan quên cộng số nhớ 1 nên viết 3.`,
      },
      {
        id: "tn-vi-sao",
        kind: "trac-nghiem",
        prompt: "Vì sao khi đặt tính phải viết các chữ số cùng hàng thẳng cột?",
        options: ["Để bài làm nhìn cho đẹp", "Để cộng các chữ số cùng hàng với nhau", "Để cộng bắt đầu từ bên trái"],
        answerIndex: 1,
        hint: "Mỗi cột là một hàng. Ta chỉ cộng đơn vị với đơn vị, chục với chục.",
        explanation: "Mỗi cột ứng với một hàng. Chỉ có thể cộng các chữ số cùng hàng với nhau, nên chúng phải đứng cùng cột.",
      },
      {
        id: "tn-nham",
        kind: "trac-nghiem",
        prompt: `Không đặt tính, nhẩm xem phép nào có tổng lớn hơn: ${n(9800)} + ${n(5300)} hay ${n(10100)} + ${n(4900)}?`,
        options: [`${n(9800)} + ${n(5300)}`, `${n(10100)} + ${n(4900)}`, "Hai tổng bằng nhau"],
        answerIndex: 0,
        hint: "Tính nhẩm từng tổng. Đừng chỉ nhìn số hạng đầu.",
        explanation: `${n(9800)} + ${n(5300)} = ${n(15100)} còn ${n(10100)} + ${n(4900)} = ${n(15000)}. Số hạng đầu lớn hơn chưa chắc làm tổng lớn hơn.`,
      },
      {
        id: "tn-uoc-luong",
        kind: "trac-nghiem",
        prompt: `Không đặt tính, ${n(238410)} + ${n(351290)} gần số nào nhất?`,
        options: [n(500000), n(600000), n(700000)],
        answerIndex: 1,
        hint: "Làm tròn từng số đến hàng trăm nghìn rồi cộng.",
        explanation: `${n(238410)} làm tròn thành ${n(200000)}, ${n(351290)} làm tròn thành ${n(400000)}. ${n(200000)} + ${n(400000)} = ${n(600000)}. Đặt tính được ${n(589700)}, gần ${n(600000)}.`,
      },
    ],
  },
];
