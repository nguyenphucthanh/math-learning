import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { hangName } from "@/lib/hang-lop";
import { explainRound, roundHint } from "@/lib/round-numbers";

const n = formatNumber;

/** Câu làm tròn: `value` làm tròn đến hàng ở vị trí `position` thì được `answer`. Test tính lại bằng `roundToPlace`. */
export type Rounding = { id: string; value: number; position: number; answer: number; /** Thứ tự ô trống chứa đáp án. */ blank?: number };

export const roundings: Rounding[] = [];

function rd(id: string, value: number, position: number, answer: number, options: { prompt?: string; unit?: string } = {}): FillQuestion {
  roundings.push({ id, value, position, answer });
  const { prompt = `Làm tròn đến ${hangName(position)}.`, unit } = options;
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: unit ? [`${n(value)} ${unit} ≈`, { answer }, unit] : [`${n(value)} ≈`, { answer }],
    hint: roundHint(position),
    explanation: explainRound(value, position),
  };
}

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-hang",
    kind: "trac-nghiem",
    prompt: `Trong số ${n(2712615)}, chữ số 7 thuộc hàng nào?`,
    options: ["Hàng triệu", "Hàng trăm nghìn", "Hàng chục nghìn", "Hàng nghìn"],
    answerIndex: 1,
    hint: "Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn.",
    explanation: "Từ phải sang trái là 5, 1, 6, 2, 1, 7, 2. Chữ số 7 đứng thứ sáu, ở hàng trăm nghìn.",
  },
  rd("kd-tron", 5826, 3, 6000, { prompt: "Con nhớ lại lớp 3: làm tròn đến hàng nghìn." }),
  {
    id: "kd-dem",
    kind: "dien-so",
    prompt: "Đếm theo trăm nghìn rồi điền số còn thiếu.",
    parts: [`${n(100000)}, ${n(200000)},`, { answer: 300000 }, `, ${n(400000)}`],
    hint: "Mỗi lần đếm, số tăng thêm 100 000.",
    explanation: `${n(200000)} thêm ${n(100000)} là ${n(300000)}.`,
  },
];

export const quickChecks = {
  tia: {
    id: "thu-tia",
    kind: "trac-nghiem",
    prompt: `Trên tia số, số ${n(5280000)} nằm giữa ${n(5200000)} và ${n(5300000)}. Số này gần mốc nào hơn?`,
    options: [n(5200000), n(5300000)],
    answerIndex: 1,
    hint: `Tính xem ${n(5280000)} cách mỗi mốc bao nhiêu.`,
    explanation: `${n(5280000)} cách ${n(5300000)} là ${n(20000)}, cách ${n(5200000)} là ${n(80000)}. Số này gần ${n(5300000)} hơn.`,
  },
  xuong: rd("thu-xuong", 3428000, 5, 3400000),
  len: rd("thu-len", 1867340, 5, 1900000),
  bangNam: {
    id: "thu-bang-5",
    kind: "trac-nghiem",
    prompt: `Làm tròn ${n(4350000)} đến hàng trăm nghìn được:`,
    options: [n(4300000), n(4400000), n(4350000)],
    answerIndex: 1,
    hint: "Chữ số hàng chục nghìn là 5. Quy tắc nói gì với chữ số 5?",
    explanation: `Chữ số hàng chục nghìn là 5, không bé hơn 5 nên làm tròn lên: ${n(4350000)} ≈ ${n(4400000)}.`,
  },
  chucNghin: rd("thu-chuc-nghin", 5122381, 4, 5120000),
  nhoSang: rd("thu-nho-sang", 1960000, 5, 2000000),
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "tram-nghin",
    title: "Làm tròn đến hàng trăm nghìn",
    questions: [
      rd("tn-1", 21390000, 5, 21400000, { unit: "đồng", prompt: "Làm tròn giá tiền một chiếc xe máy đến hàng trăm nghìn." }),
      rd("tn-2", 3245000, 5, 3200000, { unit: "đồng", prompt: "Làm tròn giá tiền một chiếc xe đạp đến hàng trăm nghìn." }),
      rd("tn-3", 4850000, 5, 4900000, { unit: "đồng", prompt: "Làm tròn giá tiền một chiếc điện thoại đến hàng trăm nghìn." }),
      (() => {
        const sales = [
          { year: 2016, value: 4138205, answer: 4100000 },
          { year: 2017, value: 4267910, answer: 4300000 },
          { year: 2018, value: 4352118, answer: 4400000 },
          { year: 2019, value: 4249764, answer: 4200000 },
        ];
        sales.forEach(({ value, answer }, index) => roundings.push({ id: "tn-4", value, position: 5, answer, blank: index }));
        return {
          id: "tn-4",
          kind: "loi-van",
          prompt: "Một công ty ghi số xe máy bán ra mỗi năm từ năm 2016 đến năm 2019. Làm tròn số xe mỗi năm đến hàng trăm nghìn.",
          lines: sales.map(({ year, value, answer }): FillQuestion["parts"] => [`Năm ${year}: ${n(value)} ≈`, { answer }]),
          hint: roundHint(5),
          explanation: sales.map(({ value }) => explainRound(value, 5)).join(" "),
        } satisfies Question;
      })(),
      {
        id: "tn-5",
        kind: "noi-cap",
        prompt: "Nối số dân của mỗi tỉnh với số dân đã làm tròn đến hàng trăm nghìn.",
        pairs: [
          { left: `Tỉnh A: ${n(2531400)} người`, right: `${n(2500000)} người` },
          { left: `Tỉnh B: ${n(1084700)} người`, right: `${n(1100000)} người` },
          { left: `Tỉnh C: ${n(3650900)} người`, right: `${n(3700000)} người` },
        ],
        rightOrder: [1, 2, 0],
        hint: "Với mỗi số, tìm chữ số hàng chục nghìn rồi so với 5.",
        explanation: [2531400, 1084700, 3650900].map((value) => explainRound(value, 5)).join(" "),
      },
      {
        id: "tn-6",
        kind: "trac-nghiem",
        prompt: "Số nào dưới đây làm tròn đến hàng trăm nghìn thì được ba trăm nghìn?",
        options: [n(249999), n(350000), n(349999), n(450001)],
        answerIndex: 2,
        hint: "Làm tròn từng số đến hàng trăm nghìn, xem số nào ra 300 000.",
        explanation: `${n(249999)} ≈ ${n(200000)}; ${n(350000)} ≈ ${n(400000)} (chữ số 5 làm tròn lên); ${n(349999)} ≈ ${n(300000)}; ${n(450001)} ≈ ${n(500000)}. Chỉ ${n(349999)} ra ${n(300000)}.`,
      },
    ],
  },
  {
    id: "chuc-nghin",
    title: "Hàng, lớp và làm tròn đến hàng chục nghìn",
    questions: [
      {
        id: "cn-1",
        kind: "trac-nghiem",
        prompt: `Chữ số 5 trong số ${n(25640713)} thuộc hàng nào, lớp nào?`,
        options: ["Hàng triệu, lớp triệu", "Hàng chục triệu, lớp triệu", "Hàng trăm nghìn, lớp nghìn", "Hàng triệu, lớp nghìn"],
        answerIndex: 0,
        hint: "Chia số thành từng lớp ba chữ số: 25, 640, 713. Chữ số 5 nằm ở lớp nào?",
        explanation: "Lớp triệu là 25: chữ số 2 ở hàng chục triệu, chữ số 5 ở hàng triệu. Vậy chữ số 5 thuộc hàng triệu, lớp triệu.",
      },
      {
        id: "cn-2",
        kind: "trac-nghiem",
        prompt: `Chữ số 5 trong số ${n(4305120)} thuộc hàng nào, lớp nào?`,
        options: ["Hàng nghìn, lớp nghìn", "Hàng trăm, lớp đơn vị", "Hàng nghìn, lớp triệu", "Hàng chục nghìn, lớp nghìn"],
        answerIndex: 0,
        hint: "Chia số thành từng lớp: 4, 305, 120. Chữ số 5 ở lớp 305, là chữ số cuối của lớp đó.",
        explanation: "Lớp nghìn là 305: chữ số 3 ở hàng trăm nghìn, chữ số 0 ở hàng chục nghìn, chữ số 5 ở hàng nghìn. Vậy chữ số 5 thuộc hàng nghìn, lớp nghìn.",
      },
      {
        id: "cn-3",
        kind: "trac-nghiem",
        prompt: `Chữ số 5 trong số ${n(512806000)} thuộc hàng nào, lớp nào?`,
        options: ["Hàng chục triệu, lớp triệu", "Hàng trăm triệu, lớp triệu", "Hàng trăm nghìn, lớp nghìn", "Hàng triệu, lớp triệu"],
        answerIndex: 1,
        hint: "Chia số thành từng lớp: 512, 806, 000. Chữ số 5 là chữ số đầu của lớp triệu.",
        explanation: "Lớp triệu là 512: chữ số 5 ở hàng trăm triệu, chữ số 1 ở hàng chục triệu, chữ số 2 ở hàng triệu. Vậy chữ số 5 thuộc hàng trăm triệu, lớp triệu.",
      },
      rd("cn-4", 274618520, 4, 274620000),
      rd("cn-5", 3047215, 4, 3050000),
      rd("cn-6", 618304000, 4, 618300000),
      (() => {
        roundings.push(
          { id: "cn-7", value: 2463900, position: 4, answer: 2460000, blank: 0 },
          { id: "cn-7", value: 2463900, position: 5, answer: 2500000, blank: 1 },
        );
        return {
          id: "cn-7",
          kind: "dien-so",
          prompt: `Làm tròn số ${n(2463900)} đến hàng chục nghìn và đến hàng trăm nghìn.`,
          parts: ["Đến hàng chục nghìn ≈", { answer: 2460000 }, "Đến hàng trăm nghìn ≈", { answer: 2500000 }],
          hint: "Hàng làm tròn khác nhau thì chữ số cần so với 5 cũng khác nhau. Làm riêng từng hàng.",
          explanation: `${explainRound(2463900, 4)} ${explainRound(2463900, 5)}`,
        } satisfies Question;
      })(),
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "st-1",
        kind: "trac-nghiem",
        prompt: `Nam làm tròn ${n(3450000)} đến hàng trăm nghìn và viết ${n(3400000)}. Nam sai ở đâu?`,
        options: [
          `Chữ số hàng chục nghìn là 5 nên phải làm tròn lên: ${n(3500000)}`,
          "Phải làm tròn đến hàng chục nghìn",
          `Nam làm đúng, ${n(3400000)} là kết quả`,
          "Phải nhìn chữ số hàng trăm nghìn để so với 5",
        ],
        answerIndex: 0,
        hint: "Chữ số hàng chục nghìn của 3 450 000 là chữ số nào? Quy tắc nói gì khi chữ số đó là 5?",
        explanation: explainRound(3450000, 5),
      },
      (() => {
        return {
          id: "st-2",
          kind: "dien-so",
          prompt: `Những số tự nhiên làm tròn đến hàng trăm nghìn được ${n(500000)} thì bé nhất là số nào, lớn nhất là số nào?`,
          parts: ["Số bé nhất:", { answer: 450000 }, "Số lớn nhất:", { answer: 549999 }],
          hint: `Thử từng số quanh ${n(500000)}: số đầu tiên làm tròn lên được ${n(500000)} là số bé nhất, số cuối cùng làm tròn xuống được ${n(500000)} là số lớn nhất.`,
          explanation: `${n(450000)} có chữ số hàng chục nghìn là 5 nên làm tròn lên ${n(500000)}, còn ${n(449999)} làm tròn xuống ${n(400000)}. ${n(549999)} có chữ số hàng chục nghìn là 4 nên làm tròn xuống ${n(500000)}, còn ${n(550000)} làm tròn lên ${n(600000)}.`,
        } satisfies Question;
      })(),
      {
        id: "st-3",
        kind: "trac-nghiem",
        prompt: `Làm tròn ${n(1960000)} đến hàng trăm nghìn được:`,
        options: [n(1900000), n(2000000), n(1000000), n(2100000)],
        answerIndex: 1,
        hint: "Chữ số hàng chục nghìn là 6, vậy làm tròn lên. Hàng trăm nghìn đang là chữ số 9, thêm 1 thì sao?",
        explanation: `Làm tròn lên thì chữ số 9 ở hàng trăm nghìn thêm 1 thành 10: nhớ 1 sang hàng triệu. ${n(1960000)} ≈ ${n(2000000)}.`,
      },
      {
        id: "st-4",
        kind: "trac-nghiem",
        prompt: `Bản tin viết "khoảng ${n(3200000)} xe" cho số xe bán ra thật là ${n(3248000)}. Bản tin đã làm tròn đến hàng nào?`,
        options: ["Hàng nghìn", "Hàng chục nghìn", "Hàng trăm nghìn", "Hàng triệu"],
        answerIndex: 2,
        hint: "Thử làm tròn 3 248 000 đến từng hàng, xem hàng nào ra 3 200 000.",
        explanation: `Đến hàng chục nghìn: ${n(3250000)}. Đến hàng trăm nghìn: ${n(3200000)}. Đến hàng triệu: ${n(3000000)}. Chỉ làm tròn đến hàng trăm nghìn mới ra ${n(3200000)}.`,
      },
    ],
  },
];
