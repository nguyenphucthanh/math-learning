import type { DatTinhQuestion, ExerciseGroup, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnSub } from "@/lib/column-sub";

const n = formatNumber;

const SUB_HINT =
  "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.";

/** Câu đặt tính rồi tính: con điền các chữ số của hiệu. Lời giải tính từ `a − b`. */
function sub(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) };
}

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-thang-hang",
    kind: "dien-so",
    parts: [`${n(4765)} − 312 =`, { answer: 4453 }],
    hint: "Đặt tính: chữ số 2 của 312 thẳng với chữ số 5 (hàng đơn vị), rồi trừ từ phải sang trái.",
    explanation: `${n(4765)} − 312 = ${n(4453)}. Hàng nghìn chỉ có số bị trừ nên hạ 4 xuống.`,
  },
  {
    id: "kd-co-nho",
    kind: "dien-so",
    parts: ["524 − 276 =", { answer: 248 }],
    hint: "Hàng đơn vị: 4 không trừ được 6, lấy 14 trừ 6.",
    explanation: "Hàng đơn vị: 14 − 6 = 8, nhớ 1. Hàng chục: 2 − 1 = 1; 11 − 7 = 4, nhớ 1. Hàng trăm: 5 − 1 = 4; 4 − 2 = 2. Vậy 524 − 276 = 248.",
  },
  {
    id: "kd-tim-so",
    kind: "dien-so",
    parts: [{ answer: 700 }, "− 250 = 450"],
    hint: "Số bị trừ bằng hiệu cộng số trừ.",
    explanation: "Số bị trừ = hiệu + số trừ = 450 + 250 = 700.",
  },
];

/** Câu thử trong phần Lý thuyết, mỗi chặng một câu. Không tính vào tiến độ. */
export const quickChecks = {
  noBorrow: sub("qc-khong-nho", 576438, 25316),
  exchange: {
    id: "qc-doi-tien",
    kind: "dien-so",
    prompt: "Con có 6 tờ 100 000 đồng và cần trả 250 000 đồng. Còn lại bao nhiêu tiền?",
    parts: [`${n(600000)} − ${n(250000)} =`, { answer: 350000 }, "đồng"],
    hint: "Đổi 1 tờ 100 000 đồng thành 10 tờ 10 000 đồng, hoặc nhẩm 60 chục nghìn − 25 chục nghìn.",
    explanation: `${n(600000)} − ${n(250000)} = ${n(350000)}. Đổi 1 tờ 100 000 đồng thành 10 tờ 10 000 đồng thì còn 5 tờ 100 000 và 10 tờ 10 000. Trả 2 tờ 100 000 và 5 tờ 10 000, còn 3 tờ 100 000 và 5 tờ 10 000.`,
  },
  borrow: sub("qc-co-nho", 725436, 289158),
  shortSubtrahend: sub("qc-so-tru-ngan", 52340, 3475),
  findMinuend: {
    id: "qc-tim-so-bi-tru",
    kind: "dien-so",
    parts: [{ answer: 470000 }, `− ${n(150000)} = ${n(320000)}`],
    hint: "Số bị trừ bằng hiệu cộng số trừ.",
    explanation: `Số bị trừ = hiệu + số trừ = ${n(320000)} + ${n(150000)} = ${n(470000)}.`,
  },
  compare: {
    id: "qc-nhieu-hon",
    kind: "dien-so",
    prompt: `Trường A có ${n(12750)} học sinh, trường B có ${n(9480)} học sinh. Trường A nhiều hơn trường B bao nhiêu học sinh?`,
    parts: [`${n(12750)} − ${n(9480)} =`, { answer: 3270 }, "học sinh"],
    hint: "Nhiều hơn bao nhiêu thì lấy số lớn trừ số bé.",
    explanation: `${n(12750)} − ${n(9480)} = ${n(3270)}. Trường A nhiều hơn trường B ${n(3270)} học sinh.`,
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Hoạt động",
    questions: [
      sub("hd-1a", 48615, 7392),
      sub("hd-1b", 758964, 326521),
      sub("hd-1c", 786354, 241539),
      {
        id: "hd-video",
        kind: "loi-van",
        prompt: `Video A có ${n(350000)} lượt xem, video B có ${n(90000)} lượt xem. Video A nhiều hơn video B bao nhiêu lượt xem?`,
        lines: [[`${n(350000)} − ${n(90000)} =`, { answer: 260000 }, "(lượt xem)"]],
        hint: "Nhiều hơn bao nhiêu thì lấy số lớn trừ số bé. Nhẩm: 35 chục nghìn − 9 chục nghìn.",
        explanation: `${n(350000)} − ${n(90000)} = ${n(260000)}. Video A nhiều hơn video B ${n(260000)} lượt xem.`,
      },
      {
        id: "hd-be-nao",
        kind: "trac-nghiem",
        prompt: `Bể A chứa ${n(42380)} l nước, bể B chứa ${n(318465)} l nước. Bể nào chứa nhiều nước hơn?`,
        options: ["Bể A", "Bể B"],
        answerIndex: 1,
        hint: "Số nào có nhiều chữ số hơn thì lớn hơn.",
        explanation: `${n(318465)} có 6 chữ số, ${n(42380)} có 5 chữ số, nên ${n(318465)} > ${n(42380)}. Bể B chứa nhiều nước hơn.`,
      },
      {
        id: "hd-be-bao-nhieu",
        kind: "loi-van",
        prompt: "Bể có nhiều nước hơn chứa nhiều hơn bể kia bao nhiêu lít?",
        lines: [[`${n(318465)} − ${n(42380)} =`, { answer: 276085 }, "(l)"]],
        hint: "Lấy số lớn trừ số bé. Đặt tính thẳng hàng: 42 380 có ít chữ số hơn.",
        explanation: explainColumnSub(318465, 42380),
      },
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      {
        id: "lt-1a",
        kind: "dien-so",
        prompt: "Tìm hiệu.",
        parts: [`${n(625417)} − ${n(38205)} =`, { answer: 587212 }],
        hint: SUB_HINT,
        explanation: explainColumnSub(625417, 38205),
      },
      {
        id: "lt-1b",
        kind: "dien-so",
        prompt: "Tìm hiệu.",
        parts: [`${n(408356)} − ${n(30042)} =`, { answer: 378314 }],
        hint: SUB_HINT,
        explanation: explainColumnSub(408356, 30042),
      },
      {
        id: "lt-1c",
        kind: "dien-so",
        prompt: "Tìm số trừ.",
        parts: [`${n(512000)} −`, { answer: 205000 }, `= ${n(307000)}`],
        hint: "Số trừ bằng số bị trừ trừ hiệu.",
        explanation: `Số trừ = số bị trừ − hiệu = ${n(512000)} − ${n(307000)} = ${n(205000)}.`,
      },
      {
        id: "lt-1d",
        kind: "dien-so",
        prompt: "Tìm số bị trừ.",
        parts: [{ answer: 702000 }, `− ${n(134000)} = ${n(568000)}`],
        hint: "Số bị trừ bằng hiệu cộng số trừ.",
        explanation: `Số bị trừ = hiệu + số trừ = ${n(568000)} + ${n(134000)} = ${n(702000)}.`,
      },
      {
        id: "lt-thieu-1",
        kind: "dat-tinh",
        op: "-",
        prompt: "Tìm chữ số thích hợp ở các ô trống.",
        a: 734258,
        b: 215673,
        hide: { a: [4], b: [2], sum: [3, 0] },
        hint: "Làm từng cột, từ hàng đơn vị sang trái. Hàng đơn vị: 8 − 3 bằng bao nhiêu?",
        explanation:
          "Hàng đơn vị: 8 − 3 = 5. Hàng chục: 5 không trừ được 7, lấy 15 trừ 7 bằng 8, nhớ 1. Hàng trăm: 2 − 1 = 1; 11 trừ 6 bằng 5, nên ô trống là 6, nhớ 1. Hàng nghìn: 4 − 1 = 3; 13 − 5 = 8, nhớ 1. Hàng chục nghìn: ô trống trừ 1 rồi trừ 1 bằng 1, nên ô trống là 3. Hàng trăm nghìn: 7 − 2 = 5. Vậy 734 258 − 215 673 = 518 585.",
      },
      {
        id: "lt-thieu-2",
        kind: "dat-tinh",
        op: "-",
        prompt: "Tìm chữ số thích hợp ở các ô trống.",
        a: 806450,
        b: 372168,
        hide: { a: [1], b: [3], sum: [5, 0] },
        hint: "Làm từng cột, từ hàng đơn vị sang trái. Hàng đơn vị: 0 không trừ được 8, lấy 10 trừ 8.",
        explanation:
          "Hàng đơn vị: lấy 10 trừ 8 bằng 2, nhớ 1. Hàng chục: kết quả là 8, mà 14 − 6 = 8 nên sau khi trừ 1 còn 4, ô trống là 5, nhớ 1. Hàng trăm: 4 − 1 = 3; 3 − 1 = 2. Hàng nghìn: 6 trừ ô trống bằng 4 nên ô trống là 2. Hàng chục nghìn: 0 không trừ được 7, lấy 10 trừ 7 bằng 3, nhớ 1. Hàng trăm nghìn: 8 − 1 = 7; 7 − 3 = 4. Vậy 806 450 − 372 168 = 434 282.",
      },
      {
        id: "lt-tien",
        kind: "loi-van",
        prompt: `Hà mua một bộ sách giá ${n(175000)} đồng và một hộp bút giá ${n(85000)} đồng. Hà đưa cô bán hàng tờ ${n(500000)} đồng. Cô bán hàng phải trả lại Hà bao nhiêu tiền?`,
        lines: [
          [`Số tiền Hà mua: ${n(175000)} + ${n(85000)} =`, { answer: 260000 }, "(đồng)"],
          [`Số tiền trả lại: ${n(500000)} − ${n(260000)} =`, { answer: 240000 }, "(đồng)"],
        ],
        hint: "Tính tổng số tiền Hà phải trả trước, rồi lấy 500 000 đồng trừ đi tổng đó.",
        explanation: `Hà phải trả ${n(175000)} + ${n(85000)} = ${n(260000)} đồng. Cô bán hàng trả lại ${n(500000)} − ${n(260000)} = ${n(240000)} đồng.`,
      },
      {
        id: "lt-xoa-so",
        kind: "dien-so",
        prompt: `Nam viết số ${n(3205618)} lên bảng. Nam xoá đi đúng một chữ số bất kì để được số có sáu chữ số. Số lớn nhất và số bé nhất Nam có thể nhận được là số nào?`,
        parts: ["Số lớn nhất:", { answer: 325618 }, "; số bé nhất:", { answer: 205618 }],
        hint: "Viết ra từng số có được khi xoá lần lượt từng chữ số, rồi so sánh từ hàng cao nhất.",
        explanation: `Xoá lần lượt từng chữ số được 205 618; 305 618; 325 618; 320 618; 320 518; 320 568; 320 561. Số lớn nhất là ${n(325618)} (xoá chữ số 0), số bé nhất là ${n(205618)} (xoá chữ số 3).`,
      },
      {
        id: "lt-xoa-hieu",
        kind: "dien-so",
        prompt: "Tính hiệu của số lớn nhất và số bé nhất vừa tìm được.",
        parts: [`${n(325618)} − ${n(205618)} =`, { answer: 120000 }],
        hint: "Hai số này giống nhau ở các hàng bên phải, chỉ khác ở hai hàng đầu.",
        explanation: `${n(325618)} − ${n(205618)} = ${n(120000)}.`,
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
        prompt: `An tính ${n(648390)} − ${n(382547)} = ${n(366853)}. An làm sai đầu tiên ở hàng nào?`,
        options: ["Hàng đơn vị", "Hàng chục", "Hàng trăm", "Hàng nghìn"],
        answerIndex: 1,
        hint: "Tính lại từng cột từ hàng đơn vị và so với bài của An. Sau khi nhớ 1, hàng bên trái phải làm gì?",
        explanation: `Đúng là ${n(265843)}. Hàng đơn vị: lấy 10 trừ 7 bằng 3, nhớ 1 (An làm đúng). Hàng chục phải là 9 − 1 = 8; 8 − 4 = 4, nhưng An quên trừ 1 nên viết 9 − 4 = 5.`,
      },
      {
        id: "tn-thu-lai",
        kind: "dien-so",
        prompt: `Bình tính ${n(648390)} − ${n(382547)} = ${n(265843)}. Con thử lại bằng phép cộng: hiệu cộng số trừ phải bằng số bị trừ.`,
        parts: [`${n(265843)} + ${n(382547)} =`, { answer: 648390 }],
        hint: "Đặt tính cộng, nhớ cộng cả số nhớ.",
        explanation: `${n(265843)} + ${n(382547)} = ${n(648390)}, bằng số bị trừ. Vậy Bình tính đúng.`,
      },
      {
        id: "tn-nho-day-chuyen",
        kind: "dien-so",
        parts: [`${n(800000)} − ${n(345678)} =`, { answer: 454322 }],
        hint: "Hàng đơn vị: lấy 10 trừ 8. Các hàng có chữ số 0 phải trừ 1 rồi vẫn không trừ được, nên lại lấy 10 trừ. Con thử lại bằng phép cộng nhé.",
        explanation: `${n(800000)} − ${n(345678)} = ${n(454322)}. Năm hàng đầu đều là chữ số 0: mỗi hàng lấy 10 trừ và nhớ 1 sang hàng bên trái. Thử lại: ${n(454322)} + ${n(345678)} = ${n(800000)}.`,
      },
    ],
  },
];
