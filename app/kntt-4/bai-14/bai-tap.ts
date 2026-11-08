import type { ExerciseGroup, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { compareHint, explainCompare } from "@/lib/so-sanh";

const n = formatNumber;

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-chu-so",
    kind: "dien-so",
    prompt: `Số ${n(480000000)} có mấy chữ số?`,
    parts: ["Số chữ số:", { answer: 9 }],
    hint: "Chia số thành từng lớp ba chữ số: 480, 000, 000. Mỗi lớp có ba chữ số.",
    explanation: "Ba lớp, mỗi lớp ba chữ số, nên số này có 9 chữ số.",
  },
  {
    id: "kd-so-sanh",
    kind: "trac-nghiem",
    prompt: `Số nào lớn hơn: ${n(7458)} hay ${n(7548)}?`,
    options: [n(7458), n(7548)],
    answerIndex: 1,
    hint: "Hai số cùng bốn chữ số. So từng cặp chữ số từ trái sang phải.",
    explanation: `Hàng nghìn đều là 7. Hàng trăm: 4 bé hơn 5, nên ${n(7458)} < ${n(7548)}.`,
  },
  {
    id: "kd-hang",
    kind: "trac-nghiem",
    prompt: `Trong số ${n(37338449)}, chữ số 3 đứng đầu tiên (từ trái sang phải) thuộc hàng nào?`,
    options: ["Hàng triệu", "Hàng chục triệu", "Hàng trăm nghìn", "Hàng chục nghìn"],
    answerIndex: 1,
    hint: "Chia thành lớp: 37, 338, 449. Chữ số 3 đầu tiên nằm ở lớp triệu.",
    explanation: "Lớp triệu là 37: chữ số 3 ở hàng chục triệu, chữ số 7 ở hàng triệu.",
  },
];

export const quickChecks = {
  chuSo: {
    id: "thu-chu-so",
    kind: "trac-nghiem",
    prompt: `Số nào lớn hơn: ${n(99999999)} hay ${n(100000000)}?`,
    options: [n(99999999), n(100000000)],
    answerIndex: 1,
    hint: "Đếm chữ số của mỗi số trước. Đừng nhìn chữ số đầu.",
    explanation: `${n(99999999)} có 8 chữ số, ${n(100000000)} có 9 chữ số. Số có nhiều chữ số hơn thì lớn hơn.`,
  },
  cung: {
    id: "thu-cung",
    kind: "so-sanh",
    prompt: "Chọn dấu thích hợp.",
    rows: [{ left: n(52316000), right: n(52361000), answer: "<" }],
    hint: "Cùng 8 chữ số. So từng cặp từ trái sang phải, dừng ở cặp đầu tiên khác nhau.",
    explanation: explainCompare(52316000, 52361000),
  },
  tong: {
    id: "thu-tong",
    kind: "so-sanh",
    prompt: "Chọn dấu thích hợp.",
    rows: [{ left: n(5090000), right: `${n(5000000)} + ${n(100000)} + ${n(90000)}`, answer: "<" }],
    hint: "Viết vế tổng thành số trước, rồi mới so sánh.",
    explanation: `${n(5000000)} + ${n(100000)} + ${n(90000)} = ${n(5190000)}. ${explainCompare(5090000, 5190000)}`,
  },
  xep: {
    id: "thu-xep",
    kind: "dien-so",
    prompt: `Sắp xếp các số ${n(4205000)}; ${n(420500)}; ${n(42050000)} theo thứ tự từ bé đến lớn.`,
    parts: [{ answer: 420500 }, "<", { answer: 4205000 }, "<", { answer: 42050000 }],
    hint: "Đếm chữ số của từng số. Số ít chữ số nhất là số bé nhất.",
    explanation: `${n(420500)} có 6 chữ số, ${n(4205000)} có 7 chữ số, ${n(42050000)} có 8 chữ số. Vậy ${n(420500)} < ${n(4205000)} < ${n(42050000)}.`,
  },
  theLon: {
    id: "thu-the-lon",
    kind: "dien-so",
    prompt: "Lập số lớn nhất có sáu chữ số từ các tấm thẻ 4, 0, 6, 0, 2, 9. Dùng hết các thẻ.",
    parts: ["Số lớn nhất:", { answer: 964200 }],
    hint: "Chữ số lớn đứng hàng cao nhất. Xếp các thẻ từ lớn đến bé.",
    explanation: `Xếp từ lớn đến bé: 9, 6, 4, 2, 0, 0. Số lớn nhất là ${n(964200)}.`,
  },
  theBe: {
    id: "thu-the-be",
    kind: "dien-so",
    prompt: "Lập số bé nhất có sáu chữ số từ các tấm thẻ 4, 0, 6, 0, 2, 9. Dùng hết các thẻ.",
    parts: ["Số bé nhất:", { answer: 200469 }],
    hint: "Số có sáu chữ số thì chữ số đầu phải khác 0. Chọn thẻ bé nhất khác 0 đứng đầu.",
    explanation: `Thẻ bé nhất khác 0 là 2, đứng đầu. Các thẻ còn lại 0, 0, 4, 6, 9 xếp từ bé đến lớn. Số bé nhất là ${n(200469)}.`,
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "so-sanh",
    title: "So sánh các số",
    questions: [
      {
        id: "ss-1",
        kind: "so-sanh",
        prompt: "Chọn dấu >, < hoặc = thích hợp.",
        rows: [
          { left: n(412760000), right: n(412976), answer: ">" },
          { left: n(58427316), right: n(58472316), answer: "<" },
          { left: n(6015000), right: n(6150000), answer: "<" },
          { left: n(100000000), right: n(98765432), answer: ">" },
          { left: n(7208000), right: `${n(7000000)} + ${n(200000)} + ${n(8000)}`, answer: "=" },
          { left: n(480900), right: `${n(4000000)} + ${n(800000)} + 900`, answer: "<" },
        ],
        hint: compareHint + " Với tổng, hãy viết thành số trước.",
        explanation: [
          explainCompare(412760000, 412976),
          explainCompare(58427316, 58472316),
          explainCompare(6015000, 6150000),
          explainCompare(100000000, 98765432),
          `${n(7000000)} + ${n(200000)} + ${n(8000)} = ${n(7208000)}, nên hai vế bằng nhau.`,
          `${n(4000000)} + ${n(800000)} + 900 = ${n(4800900)}. ${explainCompare(480900, 4800900)}`,
        ].join(" "),
      },
      {
        id: "ss-2",
        kind: "trac-nghiem",
        prompt: `Căn hộ A giá ${n(999000000)} đồng, căn hộ B giá ${n(1000000000)} đồng. Căn hộ nào đắt hơn?`,
        options: ["Căn hộ A, vì chữ số đầu 9 lớn hơn 1", "Căn hộ B, vì có nhiều chữ số hơn", "Hai căn hộ giá bằng nhau"],
        answerIndex: 1,
        hint: "Đếm chữ số của hai giá tiền trước khi so.",
        explanation: `${n(999000000)} có 9 chữ số, ${n(1000000000)} có 10 chữ số. Số có nhiều chữ số hơn thì lớn hơn, nên căn hộ B đắt hơn.`,
      },
      {
        id: "ss-3",
        kind: "trac-nghiem",
        prompt: `Một bạn nói: "Hai số ${n(64003912)} và ${n(51872495)} có cùng số chữ số. Chữ số tận cùng của ${n(51872495)} là 5, của ${n(64003912)} là 2. Mà 5 lớn hơn 2 nên ${n(51872495)} lớn hơn." Bạn đã nói sai ở đâu?`,
        options: [
          `Bạn so chữ số tận cùng. Phải so từ trái sang phải: 6 > 5 nên ${n(64003912)} lớn hơn`,
          `Bạn nói đúng, ${n(51872495)} lớn hơn`,
          "Phải cộng các chữ số của mỗi số rồi so",
          "Hai số có số chữ số khác nhau",
        ],
        answerIndex: 0,
        hint: "Hai số cùng số chữ số thì so từ hàng nào trước?",
        explanation: explainCompare(64003912, 51872495),
      },
    ],
  },
  {
    id: "sap-xep",
    title: "Sắp xếp và lập số",
    questions: [
      {
        id: "xt-1",
        kind: "trac-nghiem",
        prompt: `Lượt xem ba video: video A ${n(2450300)}, video B ${n(24503000)}, video C ${n(9870000)}. Video nào có nhiều lượt xem nhất?`,
        options: ["Video A", "Video B", "Video C"],
        answerIndex: 1,
        hint: "Đếm chữ số của ba số trước.",
        explanation: `${n(24503000)} có 8 chữ số, còn hai số kia có 7 chữ số. Vậy video B nhiều lượt xem nhất.`,
      },
      {
        id: "xt-2",
        kind: "trac-nghiem",
        prompt: `Với ba video ở câu trước (A ${n(2450300)}, B ${n(24503000)}, C ${n(9870000)}), video nào có ít lượt xem nhất?`,
        options: ["Video A", "Video B", "Video C"],
        answerIndex: 0,
        hint: "Loại số có 8 chữ số. Hai số còn lại cùng 7 chữ số, so từ hàng triệu.",
        explanation: `Video A và C cùng 7 chữ số. ${explainCompare(2450300, 9870000)} Vậy video A ít lượt xem nhất.`,
      },
      {
        id: "xt-3",
        kind: "trac-nghiem",
        prompt: `Sắp xếp các số ${n(1000000)}; ${n(750000001)}; ${n(75999999)}; ${n(750000100)} theo thứ tự từ lớn đến bé. Chọn dãy đúng.`,
        options: [
          `${n(750000001)} > ${n(750000100)} > ${n(75999999)} > ${n(1000000)}`,
          `${n(750000100)} > ${n(750000001)} > ${n(75999999)} > ${n(1000000)}`,
          `${n(75999999)} > ${n(750000100)} > ${n(750000001)} > ${n(1000000)}`,
        ],
        answerIndex: 1,
        hint: "Số có 9 chữ số lớn hơn số có 8 chữ số. Hai số 9 chữ số giống nhau nhiều hàng đầu, hãy so đến hàng khác nhau.",
        explanation: `${explainCompare(750000100, 750000001)} Số có 8 chữ số ${n(75999999)} bé hơn hai số trên, số có 7 chữ số ${n(1000000)} bé nhất.`,
      },
      {
        id: "xt-4",
        kind: "dien-so",
        prompt: `Sắp xếp các số ${n(100001)}; ${n(99099)}; ${n(100000)}; ${n(99999)} theo thứ tự từ bé đến lớn.`,
        parts: [{ answer: 99099 }, "<", { answer: 99999 }, "<", { answer: 100000 }, "<", { answer: 100001 }],
        hint: "Hai số 5 chữ số bé hơn hai số 6 chữ số. Trong mỗi cặp, so từng chữ số từ trái sang phải.",
        explanation: `${n(99099)} và ${n(99999)} có 5 chữ số: hàng trăm 0 < 9 nên ${n(99099)} < ${n(99999)}. ${n(100000)} và ${n(100001)} có 6 chữ số: hàng đơn vị 0 < 1. Vậy ${n(99099)} < ${n(99999)} < ${n(100000)} < ${n(100001)}.`,
      },
      {
        id: "xt-5",
        kind: "dien-so",
        prompt: "Có 9 tấm thẻ: 5, 0, 0, 7, 2, 4, 0, 6, 9. Dùng hết các thẻ để lập số có chín chữ số.",
        parts: ["a) Số lớn nhất:", { answer: 976542000 }, "b) Số bé nhất:", { answer: 200045679 }],
        hint: "Số lớn nhất: xếp từ lớn đến bé. Số bé nhất: chữ số đầu phải khác 0, các thẻ còn lại xếp từ bé đến lớn.",
        explanation: `Số lớn nhất xếp từ lớn đến bé: 9, 7, 6, 5, 4, 2, 0, 0, 0 là ${n(976542000)}. Số bé nhất: thẻ bé nhất khác 0 là 2 đứng đầu, rồi 0, 0, 0, 4, 5, 6, 7, 9 là ${n(200045679)}.`,
      },
      {
        id: "xt-6",
        kind: "dien-so",
        prompt: "Bàn tính có chín cột, số vòng ở mỗi cột là chữ số của hàng đó, mỗi cột có từ 0 đến 9 vòng. Xếp hết 14 chiếc vòng, số lớn nhất lập được là số nào?",
        parts: ["Số lớn nhất:", { answer: 950000000 }],
        hint: "Muốn số lớn thì đặt nhiều vòng ở hàng cao nhất. Mỗi cột nhiều nhất bao nhiêu vòng?",
        explanation: `Hàng trăm triệu đặt nhiều nhất 9 vòng. Còn 14 − 9 = 5 vòng đặt ở hàng chục triệu. Số lớn nhất là ${n(950000000)}.`,
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "st-1",
        kind: "dien-so",
        prompt: "Tìm số bé nhất có chín chữ số và số lớn nhất có tám chữ số.",
        parts: ["Số bé nhất có chín chữ số:", { answer: 100000000 }, "Số lớn nhất có tám chữ số:", { answer: 99999999 }],
        hint: "Chữ số đầu của số chín chữ số phải khác 0, nên bé nhất là 1. Số lớn nhất có tám chữ số toàn chữ số 9.",
        explanation: `Số bé nhất có chín chữ số là ${n(100000000)}. Số lớn nhất có tám chữ số là ${n(99999999)}. Hai số hơn kém nhau 1 đơn vị.`,
      },
      {
        id: "st-2",
        kind: "dien-so",
        prompt: `Tìm chữ số lớn nhất có thể điền vào ô □ để 7□0 000 < ${n(745000)}.`,
        parts: ["Chữ số đó là", { answer: 4 }],
        hint: "Hai số cùng sáu chữ số, hàng trăm nghìn cùng là 7. So hàng chục nghìn: ô □ so với 4.",
        explanation: `Nếu □ là 4 thì ${n(740000)} < ${n(745000)} (đúng). Nếu □ là 5 thì ${n(750000)} > ${n(745000)} (sai). Vậy chữ số lớn nhất là 4.`,
      },
      {
        id: "st-3",
        kind: "trac-nghiem",
        prompt: `Một bạn so ${n(3050000)} với ${n(350000)}: "3 = 3, rồi 0 bé hơn 5 nên ${n(3050000)} bé hơn ${n(350000)}." Bạn đó sai ở đâu?`,
        options: [
          `Phải đếm chữ số trước: ${n(3050000)} có 7 chữ số, ${n(350000)} có 6 chữ số, nên ${n(3050000)} lớn hơn`,
          "Bạn nói đúng vì 0 bé hơn 5",
          "Phải so từ phải sang trái",
          "Hai số bằng nhau",
        ],
        answerIndex: 0,
        hint: "Hai số này có cùng số chữ số không? Chỉ so từng cặp khi cùng số chữ số.",
        explanation: explainCompare(3050000, 350000),
      },
    ],
  },
];
