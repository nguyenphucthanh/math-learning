import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { roundToPlace } from "@/lib/round-numbers";

const n = formatNumber;
const NGHIN = 3;
const CHUC_NGHIN = 4;
const hangName = (position: number) => (position === NGHIN ? "hàng nghìn" : "hàng chục nghìn");

/** Ước lượng a + b hoặc a − b: làm tròn từng số đến hàng ở vị trí `position`, rồi tính. */
function estimate(id: string, a: number, op: "+" | "−", b: number, position: number): FillQuestion {
  const ra = roundToPlace(a, position);
  const rb = roundToPlace(b, position);
  const result = op === "+" ? ra + rb : ra - rb;
  return {
    id,
    kind: "dien-so",
    prompt: `Ước lượng ${n(a)} ${op} ${n(b)} bằng cách làm tròn đến ${hangName(position)}.`,
    parts: [`${n(a)} ≈`, { answer: ra }, `; ${n(b)} ≈`, { answer: rb }, `; ${n(a)} ${op} ${n(b)} ≈`, { answer: result }],
    hint: `Làm tròn mỗi số đến ${hangName(position)}: nhìn chữ số bên phải hàng đó, bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên. Rồi cộng hoặc trừ hai số tròn.`,
    explanation: `${n(a)} ≈ ${n(ra)}; ${n(b)} ≈ ${n(rb)}. ${n(ra)} ${op} ${n(rb)} = ${n(result)}. Vậy ${n(a)} ${op} ${n(b)} khoảng ${n(result)}.`,
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function word(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

/** Câu Đ, S về một khẳng định so sánh; `holds` là kết quả tính thật của khẳng định. */
function claim(id: string, statement: string, holds: boolean, hint: string, explanation: string): ChoiceQuestion {
  return choice(id, `Dựa vào cách ước lượng, khẳng định “${statement}” đúng hay sai?`, ["Đúng", "Sai"], holds ? 0 : 1, hint, explanation);
}

/** Khởi động: làm tròn đến hàng nghìn và hàng chục nghìn. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-nghin-1",
    kind: "dien-so",
    prompt: "Làm tròn 5 978 đến hàng nghìn.",
    parts: ["5 978 ≈", { answer: roundToPlace(5978, NGHIN) }],
    hint: "Nhìn chữ số hàng trăm: 9, lớn hơn 5.",
    explanation: "Chữ số hàng trăm là 9, lớn hơn 5 nên làm tròn lên: 5 978 ≈ 6 000.",
  },
  {
    id: "kd-nghin-2",
    kind: "dien-so",
    prompt: "Làm tròn 2 467 đến hàng nghìn.",
    parts: ["2 467 ≈", { answer: roundToPlace(2467, NGHIN) }],
    hint: "Nhìn chữ số hàng trăm: 4, bé hơn 5.",
    explanation: "Chữ số hàng trăm là 4, bé hơn 5 nên làm tròn xuống: 2 467 ≈ 2 000.",
  },
  {
    id: "kd-chuc-nghin",
    kind: "dien-so",
    prompt: "Làm tròn 49 870 đến hàng chục nghìn.",
    parts: ["49 870 ≈", { answer: roundToPlace(49870, CHUC_NGHIN) }],
    hint: "Nhìn chữ số hàng nghìn: 9, lớn hơn 5.",
    explanation: "Chữ số hàng nghìn là 9, lớn hơn 5 nên làm tròn lên: 49 870 ≈ 50 000.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  tron: {
    id: "thu-lam-tron",
    kind: "dien-so",
    prompt: "Khoảng mấy nghìn? Làm tròn từng số đến hàng nghìn rồi cộng.",
    parts: ["7 960 ≈", { answer: roundToPlace(7960, NGHIN) }, "; 1 980 ≈", { answer: roundToPlace(1980, NGHIN) }, "; tổng ≈", { answer: roundToPlace(7960, NGHIN) + roundToPlace(1980, NGHIN) }],
    hint: "7 960 có chữ số hàng trăm là 9; 1 980 cũng vậy.",
    explanation: "7 960 ≈ 8 000, 1 980 ≈ 2 000. 8 000 + 2 000 = 10 000. Vậy tổng khoảng 10 000.",
  },
  hang: {
    id: "thu-chon-hang",
    kind: "trac-nghiem",
    prompt: "Ước lượng 50 217 − 21 052 khoảng mấy chục nghìn?",
    options: ["50 000 − 21 000 = 29 000", "50 000 − 20 000 = 30 000", "50 200 − 21 100 = 29 100"],
    answerIndex: 1,
    hint: "Chục nghìn nghĩa là làm tròn đến hàng chục nghìn: kết quả chỉ còn các chữ số 0 sau chữ số hàng chục nghìn.",
    explanation: "50 217 ≈ 50 000 và 21 052 ≈ 20 000 (làm tròn đến hàng chục nghìn). 50 000 − 20 000 = 30 000.",
  },
  chieu: {
    id: "thu-lon-be",
    kind: "trac-nghiem",
    prompt: "Làm tròn 39 lên 40 và 19 lên 20 được 40 × 20 = 800. Diện tích 39 × 19 so với 800 thế nào?",
    options: ["Bé hơn 800", "Lớn hơn 800", "Bằng 800"],
    answerIndex: 0,
    hint: "Hình 39 × 19 nằm gọn trong hình 40 × 20.",
    explanation: "Hai số đều làm tròn lên nên tích đã làm tròn lớn hơn tích thật. Vậy 39 × 19 bé hơn 800 (thật ra là 741).",
  },
} satisfies Record<string, Question>;

const hoatDong1: Question[] = [
  estimate("hd1-a", 6240, "+", 2790, NGHIN),
  estimate("hd1-b", 8070, "−", 3960, NGHIN),
  estimate("hd1-c", 29870, "+", 40120, CHUC_NGHIN),
  estimate("hd1-d", 80340, "−", 39650, CHUC_NGHIN),
  choice(
    "hd1-e",
    "Muốn biết 24 960 + 15 030 khoảng mấy chục nghìn, con làm tròn mỗi số đến hàng nào?",
    ["Hàng nghìn", "Hàng chục nghìn", "Hàng trăm"],
    1,
    "Câu hỏi nói khoảng mấy chục nghìn thì làm tròn đến hàng chục nghìn.",
    `Làm tròn đến hàng chục nghìn: ${n(24960)} ≈ ${n(roundToPlace(24960, CHUC_NGHIN))}, ${n(15030)} ≈ ${n(roundToPlace(15030, CHUC_NGHIN))}. Tổng ≈ ${n(roundToPlace(24960, CHUC_NGHIN) + roundToPlace(15030, CHUC_NGHIN))}.`,
  ),
  word(
    "hd1-f",
    "Hôm qua một cửa hàng bán được 4 120 chiếc bánh buổi sáng và 3 890 chiếc buổi chiều. Hỏi cả ngày bán được khoảng mấy nghìn chiếc bánh?",
    [["Khoảng:", { answer: roundToPlace(4120, NGHIN) + roundToPlace(3890, NGHIN) }, "chiếc bánh"]],
    "Làm tròn từng số đến hàng nghìn rồi cộng.",
    `${n(4120)} ≈ ${n(4000)}, ${n(3890)} ≈ ${n(4000)}. ${n(4000)} + ${n(4000)} = ${n(8000)}. Cả ngày bán khoảng ${n(8000)} chiếc.`,
  ),
];

const hoatDong2: Question[] = [
  claim(
    "hd2-a",
    "38 × 19 > 800",
    38 * 19 > 800,
    "Làm tròn 38 lên 40 và 19 lên 20.",
    `Làm tròn lên: 40 × 20 = 800. Tích thật bé hơn 800 (38 × 19 = ${n(722)}), nên khẳng định sai.`,
  ),
  claim(
    "hd2-b",
    "61 × 42 > 2 400",
    61 * 42 > 2400,
    "Làm tròn 61 xuống 60 và 42 xuống 40.",
    `Làm tròn xuống: 60 × 40 = ${n(2400)}. Tích thật lớn hơn ${n(2400)} (61 × 42 = ${n(2562)}), nên khẳng định đúng.`,
  ),
  claim(
    "hd2-c",
    "7 960 : 40 < 200",
    7960 / 40 < 200,
    "Làm tròn 7 960 lên 8 000.",
    `Làm tròn lên: 8 000 : 40 = 200. Số bị chia thật bé hơn 8 000 nên thương bé hơn 200 (7 960 : 40 = 199). Khẳng định đúng.`,
  ),
  claim(
    "hd2-d",
    "mảnh vườn 2 040 m², dài 40 m, thì chiều rộng bé hơn 50 m",
    2040 / 40 < 50,
    "Làm tròn 2 040 xuống 2 000, rồi chia cho 40.",
    "Làm tròn xuống: 2 000 : 40 = 50. Diện tích thật lớn hơn 2 000 nên chiều rộng không thể bé hơn 50 m (thật ra là 51 m). Khẳng định sai.",
  ),
];

const suyNghi: Question[] = [
  choice(
    "sn-1",
    "Rô-bốt nói hôm qua có khoảng 9 000 lượt khách (5 978 + 2 967). Số lượt khách đúng là 9 000, phải không?",
    ["Phải, khoảng 9 000 tức là đúng 9 000", "Không, số thật gần 9 000 chứ chưa chắc bằng 9 000"],
    1,
    "Ước lượng chỉ cho biết số thật gần số nào.",
    `5 978 + 2 967 = ${n(5978 + 2967)}, gần ${n(9000)} nhưng không bằng. Ước lượng để biết đại khái, không thay cho kết quả chính xác.`,
  ),
  choice(
    "sn-2",
    "Nam làm tròn 8 920 lên 9 000, làm tròn 1 170 xuống 1 000 rồi nói 8 920 − 1 170 lớn hơn 8 000. Nam nói đúng hay sai?",
    ["Đúng", "Sai"],
    8920 - 1170 > 8000 ? 0 : 1,
    "Số bị trừ làm tròn lên thì hiệu to ra, số trừ làm tròn xuống thì hiệu cũng to ra. Vậy 8 000 to hơn hay bé hơn hiệu thật?",
    `9 000 − 1 000 = ${n(8000)} là kết quả khi số bị trừ được cộng thêm 80 và số trừ bị bớt 170, nên lớn hơn hiệu thật. Hiệu thật 8 920 − 1 170 = ${n(7750)}, bé hơn 8 000. Nam sai.`,
  ),
  choice(
    "sn-3",
    "Bìa ghi 4 980 + 2 970 = 8 350. Chỉ nhìn chữ số tận cùng (0 + 0 = 0, kết quả tận cùng 0) có phát hiện được bìa sai không?",
    ["Có, vì tận cùng khác nhau", "Không, vì tận cùng vẫn đều là 0, phải ước lượng"],
    1,
    "Tính chữ số tận cùng của kết quả đúng và của kết quả trên bìa.",
    `Kết quả đúng là ${n(4980 + 2970)}, bìa ghi ${n(8350)}, cả hai tận cùng 0. Làm tròn lên 5 000 + 3 000 = 8 000 thì thấy 8 350 lớn hơn, vô lý.`,
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong-1", title: "Hoạt động 1: ước lượng bằng làm tròn (trang 27)", questions: hoatDong1 },
  { id: "hoat-dong-2", title: "Hoạt động 2: đúng hay sai (trang 27)", questions: hoatDong2 },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghi },
];
