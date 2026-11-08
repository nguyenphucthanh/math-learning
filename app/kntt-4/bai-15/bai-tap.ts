import type { ChoiceQuestion, ExerciseGroup, Part, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

/** Câu Đúng/Sai: lựa chọn cố định ["Đúng", "Sai"]. */
function trueFalse(id: string, prompt: string, answer: boolean, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options: ["Đúng", "Sai"], answerIndex: answer ? 0 : 1, hint, explanation };
}

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-dem",
    kind: "dien-so",
    prompt: "Đếm thêm 2 rồi điền số còn thiếu.",
    parts: ["2, 4, 6,", { answer: 8 }],
    hint: "Mỗi lần đếm, số tăng thêm 2.",
    explanation: "6 thêm 2 là 8.",
  },
  {
    id: "kd-sau",
    kind: "dien-so",
    prompt: "Số liền sau của 99 là số nào?",
    parts: ["Số liền sau của 99 là", { answer: 100 }],
    hint: "Thêm 1 vào 99. Chữ số 9 thêm 1 thành 10, nhớ sang hàng trên.",
    explanation: "99 + 1 = 100.",
  },
  {
    id: "kd-lon",
    kind: "dien-so",
    prompt: "Số lớn nhất có ba chữ số là số nào?",
    parts: ["Số đó là", { answer: 999 }],
    hint: "Số lớn nhất thì mỗi hàng đều là chữ số lớn nhất.",
    explanation: "Chữ số lớn nhất là 9, nên số lớn nhất có ba chữ số là 999.",
  },
];

export const quickChecks = {
  beNhat: {
    id: "thu-be-nhat",
    kind: "trac-nghiem",
    prompt: "Số tự nhiên bé nhất là số nào?",
    options: ["0", "1", "10", "Không có số bé nhất"],
    answerIndex: 0,
    hint: "Nhìn tia số: số nào đứng đầu tiên, bên trái không còn số tự nhiên?",
    explanation: "Dãy số tự nhiên bắt đầu từ 0, nên 0 là số tự nhiên bé nhất.",
  },
  lonNhat: {
    id: "thu-lon-nhat",
    kind: "trac-nghiem",
    prompt: "Có số tự nhiên lớn nhất không?",
    options: ["Có, đó là một số rất lớn", "Không, vì thêm 1 luôn được số lớn hơn"],
    answerIndex: 1,
    hint: "Chọn một số tự nhiên rất lớn, rồi thêm 1. Được số lớn hơn hay bé hơn?",
    explanation: "Với bất kì số tự nhiên nào, thêm 1 vào thì được số lớn hơn. Vì vậy không có số tự nhiên lớn nhất.",
  },
  sau: {
    id: "thu-sau",
    kind: "dien-so",
    prompt: `Số liền sau của ${n(9999)} là số nào?`,
    parts: [`Số liền sau của ${n(9999)} là`, { answer: 10000 }],
    hint: "Thêm 1 vào 9 999. Mỗi chữ số 9 thêm 1 thành 10, nhớ sang hàng bên trái.",
    explanation: `${n(9999)} + 1 = ${n(10000)}. Số liền sau của ${n(9999)} là ${n(10000)}.`,
  },
  truoc: {
    id: "thu-truoc",
    kind: "dien-so",
    prompt: `Số liền trước của ${n(10000)} là số nào?`,
    parts: [`Số liền trước của ${n(10000)} là`, { answer: 9999 }],
    hint: "Bớt 1 ở 10 000. Số liền trước là số mà thêm 1 thì được 10 000.",
    explanation: `${n(9999)} + 1 = ${n(10000)}, nên số liền trước của ${n(10000)} là ${n(9999)}.`,
  },
  khong: {
    id: "thu-khong",
    kind: "trac-nghiem",
    prompt: "Số 0 có số tự nhiên liền trước không?",
    options: ["Có, đó là số 1", "Không có, vì 0 là số tự nhiên bé nhất", "Có, đó là số 10"],
    answerIndex: 1,
    hint: "Nhìn tia số: bên trái số 0 có số tự nhiên nào không?",
    explanation: "Số 0 là số tự nhiên bé nhất, bên trái 0 không còn số tự nhiên. Vì vậy 0 không có số tự nhiên liền trước.",
  },
  quyLuat: {
    id: "thu-quy-luat",
    kind: "dien-so",
    prompt: "Tìm quy luật rồi điền hai số tiếp theo.",
    parts: ["5, 10, 15, 20,", { answer: 25 }, ",", { answer: 30 }],
    hint: "Hai số liền nhau hơn kém nhau mấy đơn vị?",
    explanation: "Mỗi số hơn số liền trước 5 đơn vị. 20 + 5 = 25, 25 + 5 = 30.",
  },
} satisfies Record<string, Question>;

/** Dòng điền: `head` rồi các ô trống cách nhau bằng dấu phẩy. */
const blanks = (values: number[], head: string): Part[] => [head, ...values.flatMap((value, index): Part[] => (index === 0 ? [{ answer: value }] : [",", { answer: value }]))];

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "day-so-tu-nhien",
    title: "Dãy số tự nhiên",
    questions: [
      trueFalse(
        "dt-1",
        `Số ${n(5000000000)} là số tự nhiên lớn nhất.`,
        false,
        "Thêm 1 vào một số tự nhiên thì được số lớn hơn hay bé hơn?",
        `Thêm 1 vào ${n(5000000000)} được ${n(5000000001)}, lớn hơn. Không có số tự nhiên lớn nhất nên câu này sai.`,
      ),
      trueFalse(
        "dt-2",
        "Số 0 là số tự nhiên.",
        true,
        "Dãy số tự nhiên bắt đầu từ số nào?",
        "Dãy số tự nhiên là 0, 1, 2, 3, … Số 0 là số tự nhiên bé nhất, nên câu này đúng.",
      ),
      trueFalse(
        "dt-3",
        "Dãy số 2, 3, 4, 5, … là dãy số tự nhiên.",
        false,
        "Dãy số tự nhiên có bắt đầu từ 2 không? Còn thiếu những số nào ở đầu?",
        "Dãy số tự nhiên bắt đầu từ 0, rồi 1, 2, 3, … Dãy 2, 3, 4, 5, … thiếu 0 và 1, nên không phải dãy số tự nhiên.",
      ),
      trueFalse(
        "dt-4",
        "Số liền sau của một số lớn hơn số liền trước của số đó 2 đơn vị.",
        true,
        "Lấy số 7: liền trước là 6, liền sau là 8. Hai số đó hơn kém nhau mấy?",
        "Số liền trước kém số đó 1 đơn vị, số liền sau hơn số đó 1 đơn vị, nên số liền sau lớn hơn số liền trước 2 đơn vị. Ví dụ 6, 7, 8: 8 − 6 = 2.",
      ),
      {
        id: "dt-5",
        kind: "loi-van",
        prompt: "Tìm số liền trước của mỗi số.",
        lines: [
          ["Số liền trước của 270 là", { answer: 269 }],
          [`Số liền trước của ${n(3000)} là`, { answer: 2999 }],
          [`Số liền trước của ${n(54321)} là`, { answer: 54320 }],
          [`Số liền trước của ${n(1000000)} là`, { answer: 999999 }],
        ],
        hint: "Số liền trước thì bớt 1. Khi hàng đơn vị là 0, con mượn từ hàng bên trái.",
        explanation: `270 − 1 = 269. ${n(3000)} − 1 = ${n(2999)}. ${n(54321)} − 1 = ${n(54320)}. ${n(1000000)} − 1 = ${n(999999)}.`,
      },
      {
        id: "dt-6",
        kind: "dien-so",
        prompt: `Sắp xếp các số ${n(100000)}; ${n(99990)}; ${n(99909)}; ${n(100100)} theo thứ tự từ bé đến lớn.`,
        parts: [{ answer: 99909 }, "<", { answer: 99990 }, "<", { answer: 100000 }, "<", { answer: 100100 }],
        hint: "Số có 5 chữ số bé hơn số có 6 chữ số. Trong mỗi cặp cùng số chữ số, so từ trái sang phải.",
        explanation: `${n(99909)} và ${n(99990)} có 5 chữ số: hàng chục 0 < 9 nên ${n(99909)} < ${n(99990)}. ${n(100000)} và ${n(100100)} có 6 chữ số: hàng trăm 0 < 1. Vậy ${n(99909)} < ${n(99990)} < ${n(100000)} < ${n(100100)}.`,
      },
    ],
  },
  {
    id: "lien-truoc-sau",
    title: "Số liền sau và dãy số",
    questions: [
      {
        id: "lt-1",
        kind: "loi-van",
        prompt: "Tìm số liền sau của mỗi số.",
        lines: [
          ["Số liền sau của 38 là", { answer: 39 }],
          ["Số liền sau của 99 là", { answer: 100 }],
          [`Số liền sau của ${n(8999)} là`, { answer: 9000 }],
          [`Số liền sau của ${n(999999)} là`, { answer: 1000000 }],
        ],
        hint: "Số liền sau thì thêm 1. Chữ số 9 thêm 1 thành 10, nhớ sang hàng bên trái.",
        explanation: `38 + 1 = 39. 99 + 1 = 100. ${n(8999)} + 1 = ${n(9000)}. ${n(999999)} + 1 = ${n(1000000)}.`,
      },
      {
        id: "lt-2",
        kind: "loi-van",
        prompt: "Tìm số thích hợp để được ba số tự nhiên liên tiếp.",
        lines: [
          ["a) 24, 25,", { answer: 26 }],
          [`b) ${n(1998)},`, { answer: 1999 }, `, ${n(2000)}`],
          ["c)", { answer: 999999 }, `, ${n(1000000)},`, { answer: 1000001 }],
        ],
        hint: "Ba số liên tiếp, mỗi số hơn số đứng trước nó 1 đơn vị.",
        explanation: `a) 25 + 1 = 26. b) ${n(1998)} + 1 = ${n(1999)}, rồi ${n(1999)} + 1 = ${n(2000)}. c) Số liền trước của ${n(1000000)} là ${n(999999)}, số liền sau là ${n(1000001)}.`,
      },
      {
        id: "lt-3",
        kind: "loi-van",
        prompt: "Tìm quy luật rồi điền ba số tiếp theo.",
        lines: [
          blanks([2024, 2025, 2026], `a) ${n(2021)}, ${n(2022)}, ${n(2023)},`),
          blanks([15, 18, 21], "b) 3, 6, 9, 12,"),
          blanks([50, 60, 70], "c) 10, 20, 30, 40,"),
          blanks([15, 17, 19], "d) 7, 9, 11, 13,"),
        ],
        hint: "Tìm xem hai số liền nhau hơn kém nhau bao nhiêu, rồi cộng tiếp từ số cuối.",
        explanation: `a) Mỗi số hơn số trước 1 đơn vị: ${n(2024)}, ${n(2025)}, ${n(2026)}. b) Mỗi số hơn số trước 3 đơn vị: 15, 18, 21. c) Mỗi số hơn số trước 10 đơn vị: 50, 60, 70. d) Mỗi số hơn số trước 2 đơn vị: 15, 17, 19.`,
      },
    ],
  },
  {
    id: "the-so",
    title: "Lập số từ các tấm thẻ",
    questions: [
      {
        id: "th-1",
        kind: "dien-so",
        prompt: `Trên bàn có các tấm thẻ 2, 6, 0, 4, 7, 1, 3 ghép được số ${n(2604713)}.`,
        parts: ["a) Lấy ra một tấm thẻ để được số sáu chữ số lớn nhất:", { answer: 764321 }, "b) Lấy ra một tấm thẻ để được số sáu chữ số bé nhất:", { answer: 102346 }],
        hint: "Mỗi lần lấy ra một thẻ. Số lớn nhất: bỏ thẻ bé nhất, xếp từ lớn đến bé. Số bé nhất: chữ số đầu phải khác 0.",
        explanation: `a) Bỏ thẻ 0, xếp 7, 6, 4, 3, 2, 1 được ${n(764321)}. b) Bỏ thẻ 7 (thẻ lớn nhất), chữ số đầu là thẻ 1 (bé nhất khác 0), rồi 0, 2, 3, 4, 6 được ${n(102346)}. Nếu bỏ thẻ 0 thì số bé nhất là ${n(123467)}, lớn hơn ${n(102346)}.`,
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
        prompt: "Từ 98 đến 104 (kể cả hai số 98 và 104) có tất cả bao nhiêu số tự nhiên?",
        parts: ["Có", { answer: 7 }, "số tự nhiên."],
        hint: "Viết ra từng số: 98, 99, 100, … rồi đếm. Hiệu 104 − 98 có bằng số các số không?",
        explanation: "Các số là 98, 99, 100, 101, 102, 103, 104: có 7 số. Hiệu 104 − 98 = 6 chỉ đếm số bước nhảy, còn số các số nhiều hơn 1.",
      },
      {
        id: "st-2",
        kind: "trac-nghiem",
        prompt: `Số liền trước của ${n(40000)} là số nào?`,
        options: [n(39999), n(40001), n(3999), n(399999)],
        answerIndex: 0,
        hint: "Số liền trước là số mà thêm 1 thì được 40 000. Bớt 1 ở hàng đơn vị phải mượn từ hàng bên trái.",
        explanation: `${n(39999)} + 1 = ${n(40000)}, nên số liền trước của ${n(40000)} là ${n(39999)}. ${n(40001)} là số liền sau.`,
      },
      {
        id: "st-3",
        kind: "trac-nghiem",
        prompt: "Bạn Nam nói: “Số 1 000 000 000 000 rất lớn, đó là số tự nhiên lớn nhất.” Em nghĩ thế nào?",
        options: [
          "Nam nói đúng, vì số đó có rất nhiều chữ số 0",
          "Nam nói sai, vì thêm 1 vào số đó luôn được số lớn hơn",
          "Nam nói sai, vì số tự nhiên lớn nhất là 999 999 999",
        ],
        answerIndex: 1,
        hint: "Thêm 1 vào số Nam nói thì được số lớn hơn hay bé hơn?",
        explanation: `Thêm 1 vào ${n(1000000000000)} được ${n(1000000000001)}, lớn hơn. Số nào cũng thêm 1 được số lớn hơn, nên không có số tự nhiên lớn nhất.`,
      },
      {
        id: "st-4",
        kind: "dien-so",
        prompt: "Cho dãy số 5, 10, 15, 20, … Số thứ 10 của dãy là số nào?",
        parts: ["Số thứ 10 là", { answer: 50 }],
        hint: "Số thứ nhất là 5. Mỗi số tiếp theo hơn 5 đơn vị. Số thứ 10 hơn số thứ nhất mấy lần 5?",
        explanation: "Số thứ 10 hơn số thứ nhất 9 lần nhảy 5: 5 + 9 × 5 = 50. Cũng có thể thấy các số 5, 10, 15, … là 5 × 1, 5 × 2, 5 × 3, …, nên số thứ 10 là 5 × 10 = 50.",
      },
    ],
  },
];
