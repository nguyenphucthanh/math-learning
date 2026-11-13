import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";

export const sumOf = (values: number[]) => values.reduce((s, v) => s + v, 0);
export const meanOf = (values: number[]) => sumOf(values) / values.length;
export const sortedAsc = (values: number[]) => [...values].sort((a, b) => a - b);
export const sortedDesc = (values: number[]) => [...values].sort((a, b) => b - a);
export const countMoreThan = (values: number[], x: number) => values.filter((v) => v > x).length;
export const countBetween = (values: number[], lo: number, hi: number) => values.filter((v) => v >= lo && v <= hi).length;
/** Số chữ cái của một tên, tính theo từng chữ cái tiếng Việt (ê, ư, ơ... là một chữ cái). */
export const letters = (name: string) => [...name.normalize("NFC")].filter((c) => c !== " ").length;

const list = (values: number[]) => values.join(", ");

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** Khởi động: ôn số trung bình cộng và so sánh số. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-lon-nhat",
    kind: "dien-so",
    prompt: "Trong ba số 7, 12 và 9, số lớn nhất là số nào?",
    parts: [{ answer: Math.max(7, 12, 9) }],
    hint: "So sánh từng cặp số.",
    explanation: "12 lớn hơn 7 và lớn hơn 9, nên 12 là số lớn nhất.",
  },
  {
    id: "kd-be-nhat",
    kind: "dien-so",
    prompt: "Trong ba số 15, 8 và 11, số bé nhất là số nào?",
    parts: [{ answer: Math.min(15, 8, 11) }],
    hint: "So sánh từng cặp số.",
    explanation: "8 bé hơn 15 và bé hơn 11, nên 8 là số bé nhất.",
  },
  {
    id: "kd-trung-binh",
    kind: "dien-so",
    prompt: "Tìm số trung bình cộng của 2, 4 và 6.",
    parts: ["2 + 4 + 6 =", { answer: sumOf([2, 4, 6]) }, "; 12 : 3 =", { answer: meanOf([2, 4, 6]) }],
    hint: "Cộng các số, rồi chia tổng cho số các số hạng.",
    explanation: "2 + 4 + 6 = 12, có 3 số, 12 : 3 = 4.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  dem: choice(
    "thu-dem",
    `Dãy số liệu ${list([2, 2, 5, 5, 5])} có bao nhiêu số?`,
    ["2", "3", "5"],
    2,
    "Đếm từng số trong dãy, kể cả các số giống nhau.",
    "Dãy có 5 số: hai số 2 và ba số 5. Chỉ có 2 giá trị khác nhau, nhưng vẫn là 5 số.",
  ),
  thuN: choice(
    "thu-thu-n",
    `Cho dãy số liệu ${list([4, 9, 6, 7])}. Số thứ ba trong dãy là số nào?`,
    ["3", "6", "9"],
    1,
    "Đếm từ đầu dãy: số thứ nhất, số thứ hai, số thứ ba.",
    "Số thứ nhất là 4, số thứ hai là 9, số thứ ba là 6. Số thứ ba là 6, không phải 3.",
  ),
  nhieuHon: {
    id: "thu-nhieu-hon",
    kind: "dien-so",
    prompt: `Dãy số liệu ${list([3, 5, 6, 8, 5])}: có bao nhiêu số lớn hơn 5?`,
    parts: [{ answer: countMoreThan([3, 5, 6, 8, 5], 5) }, "số"],
    hint: "Lớn hơn 5 thì không tính số 5.",
    explanation: "Chỉ có 6 và 8 lớn hơn 5. Số 5 không lớn hơn 5, nên có 2 số.",
  },
} satisfies Record<string, Question>;

/** Câu hỏi đọc dãy: số thứ n, nhiều nhất, đếm số lớn hơn x. */
function readSeq(id: string, prompt: string, values: number[], nth: number, over: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: [`a) Số thứ ${nth} trong dãy là`, { answer: values[nth - 1] }, `; b) số nhiều nhất là`, { answer: Math.max(...values) }, `; c) số lớn hơn ${over} là`, { answer: countMoreThan(values, over) }, "số"],
    hint: "Số thứ n là số ở vị trí thứ n tính từ đầu dãy. Lớn hơn nghĩa là không tính số bằng.",
    explanation: `Dãy ${list(values)}. Số thứ ${nth} là ${values[nth - 1]}. Nhiều nhất là ${Math.max(...values)}. Các số lớn hơn ${over}: ${list(values.filter((v) => v > over))}, tức ${countMoreThan(values, over)} số.`,
  };
}

function sortSeq(id: string, prompt: string, values: number[]): FillQuestion {
  const asc = sortedAsc(values);
  const desc = sortedDesc(values);
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: ["a) Từ bé đến lớn:", ...asc.flatMap((v, i) => [{ answer: v }, i < asc.length - 1 ? "," : ""]), "b) Từ lớn đến bé:", ...desc.flatMap((v, i) => [{ answer: v }, i < desc.length - 1 ? "," : ""])],
    hint: `Dãy có ${values.length} số, viết lại đủ ${values.length} số, số giống nhau viết nhiều lần. Gạch từng số khi đã viết.`,
    explanation: `Từ bé đến lớn: ${list(asc)}. Từ lớn đến bé: ${list(desc)}. Cả hai dãy đều đủ ${values.length} số.`,
  };
}

const goals = [3, 8, 5, 1, 6];
const books = [7, 2, 9, 2, 5, 9];
const names = [5, 3, 4, 3, 5, 4, 3];
const berries = [3, 4, 6, 7, 9, 12];
const exercise = [15, 25, 45, 20, 30];
const sleep = [9, 7, 10, 8, 11, 9, 6, 10];

const hoatDong: Question[] = [
  readSeq("hd-1", "Năm bạn Hà, Lan, Minh, Nam, Tú ghi số bàn thắng lần lượt là 3, 8, 5, 1, 6. Hỏi:", goals, 3, 4),
  sortSeq("hd-2", "Số cuốn sách 6 bạn đọc tháng qua theo thứ tự: 7, 2, 9, 2, 5, 9. Viết dãy số liệu:", books),
  {
    id: "hd-3a",
    kind: "dien-so",
    prompt: "Rô-bốt ghi số chữ cái trong tên các bạn tổ 2: 5, 3, 4, 3, 5, 4, 3.",
    parts: ["a) Dãy có", { answer: names.length }, "số, số đầu tiên là", { answer: names[0] }, "; b) nhiều nhất", { answer: Math.max(...names) }, "chữ cái, ít nhất", { answer: Math.min(...names) }, "chữ cái"],
    hint: "Đếm cả các số giống nhau. Số đầu tiên là số thứ nhất.",
    explanation: `Dãy ${list(names)} có ${names.length} số. Số đầu tiên là ${names[0]}. Nhiều nhất ${Math.max(...names)}, ít nhất ${Math.min(...names)}.`,
  },
  choice(
    "hd-3b",
    "Trong tổ 2 có bạn nào tên là Khuyên (K-h-u-y-ê-n) không?",
    ["Có", "Không, vì tên Khuyên có 6 chữ cái mà nhiều nhất chỉ có 5", "Không, vì không có số 6 ở đầu dãy"],
    1,
    "Đếm số chữ cái của tên Khuyên, rồi so với số lớn nhất của dãy.",
    `Khuyên có ${letters("Khuyên")} chữ cái, lớn hơn số nhiều nhất của dãy là ${Math.max(...names)}. Nên tổ 2 không có bạn tên Khuyên.`,
  ),
];

const luyenTap: Question[] = [
  {
    id: "lt-1a",
    kind: "dien-so",
    prompt: "Từ Chủ nhật, mỗi tối bố ghi số quả dâu hái được trong ngày: 3, 4, 6, 7, 9, 12.",
    parts: ["a) Hái trong", { answer: berries.length }, "ngày; b) ít nhất", { answer: Math.min(...berries) }, "quả, vào ngày thứ", { answer: berries.indexOf(Math.min(...berries)) + 1 }],
    hint: "Số ngày là số các số trong dãy. Ngày thứ nhất ứng với số thứ nhất.",
    explanation: `Dãy ${list(berries)} có ${berries.length} số nên hái ${berries.length} ngày. Ít nhất là ${Math.min(...berries)} quả, là số thứ nhất, tức ngày đầu (Chủ nhật).`,
  },
  choice(
    "lt-1c",
    "Số quả dâu hái được sau mỗi ngày tăng hay giảm?",
    ["Tăng", "Giảm", "Lúc tăng lúc giảm"],
    berries.every((v, i) => i === 0 || v > berries[i - 1]) ? 0 : 2,
    "So sánh từng số với số đứng ngay trước nó.",
    `Dãy ${list(berries)}: mỗi số lớn hơn số đứng trước nó, nên số quả tăng dần.`,
  ),
  {
    id: "lt-2",
    kind: "loi-van",
    prompt: "Thời gian tập thể dục mỗi ngày của các thành viên nhà Mai là 15 phút, 25 phút, 45 phút, 20 phút, 30 phút. Hỏi nhà Mai có mấy thành viên, và trung bình mỗi thành viên tập bao nhiêu phút?",
    lines: [
      ["Số thành viên:", { answer: exercise.length }, "(người)"],
      [`Tổng: ${exercise.join(" + ")} =`, { answer: sumOf(exercise) }, "(phút)"],
      [`Trung bình mỗi người: ${sumOf(exercise)} : ${exercise.length} =`, { answer: meanOf(exercise) }, "(phút)"],
    ],
    hint: "Đếm số các số trong dãy, rồi cộng tất cả và chia cho số đó.",
    explanation: `Dãy có ${exercise.length} số. Tổng ${sumOf(exercise)} phút. ${sumOf(exercise)} : ${exercise.length} = ${meanOf(exercise)}.`,
  },
  {
    id: "lt-3",
    kind: "dien-so",
    prompt: "Giờ ngủ trong ngày của các bạn trong nhóm (giờ): 9, 7, 10, 8, 11, 9, 6, 10. Trẻ từ 6 đến 12 tuổi cần ngủ đủ từ 9 đến 12 giờ mỗi ngày.",
    parts: ["Có", { answer: sleep.length }, "bạn; ngủ ít nhất", { answer: Math.min(...sleep) }, "giờ; ngủ đủ giờ có", { answer: countBetween(sleep, 9, 12) }, "bạn"],
    hint: "Ngủ đủ giờ là từ 9 giờ đến 12 giờ, tính cả 9 và 12. Gạch từng số đủ giờ để khỏi đếm sót số lặp.",
    explanation: `Có ${sleep.length} số. Ít nhất ${Math.min(...sleep)} giờ. Các số từ 9 đến 12: ${list(sleep.filter((v) => v >= 9 && v <= 12))}, tức ${countBetween(sleep, 9, 12)} bạn.`,
  },
];

const tuDuy: Question[] = [
  {
    id: "sn-1",
    kind: "dien-so",
    prompt: "Dãy số liệu 4, 4, 7, 4, 7, 7 có bao nhiêu số? Có bao nhiêu giá trị khác nhau?",
    parts: ["Có", { answer: 6 }, "số; có", { answer: new Set([4, 4, 7, 4, 7, 7]).size }, "giá trị khác nhau"],
    hint: "Số các số là đếm mọi số trong dãy. Giá trị khác nhau là các số không giống nhau.",
    explanation: "Dãy có 6 số, nhưng chỉ có hai giá trị là 4 và 7. Hỏi dãy có bao nhiêu số thì phải đếm cả số giống nhau.",
  },
  choice(
    "sn-2",
    "Mai sắp xếp dãy 8, 3, 5, 3, 9 từ bé đến lớn và viết: 3, 5, 8, 9. Mai sai ở đâu?",
    ["Viết thiếu một số 3, dãy phải có 5 số", "Viết sai thứ tự", "Không sai"],
    0,
    "Đếm số các số của dãy mới, so với dãy ban đầu.",
    `Dãy ban đầu có 5 số, dãy của Mai chỉ có 4 số. Đúng là ${list(sortedAsc([8, 3, 5, 3, 9]))}.`,
  ),
  {
    id: "sn-3",
    kind: "dien-so",
    prompt: "Việt tìm trung bình của dãy 3, 6, 6, 9 như sau: 3 + 6 + 6 + 9 = 24, rồi chia cho 3 (vì có ba giá trị khác nhau). Chia cho số nào mới đúng, và trung bình là bao nhiêu?",
    parts: ["Chia cho", { answer: 4 }, "; trung bình là", { answer: meanOf([3, 6, 6, 9]) }],
    hint: "Chia cho số các số hạng, đếm cả số lặp.",
    explanation: "Dãy có 4 số nên chia cho 4: 24 : 4 = 6. Việt chia cho 3 là sai vì chỉ đếm giá trị khác nhau.",
  },
  choice(
    "sn-4",
    "Trong dãy số liệu 2, 5, 5, 7, 9, bạn nào đúng?",
    ["Hà: có 3 số lớn hơn 5", "Lan: có 4 số từ 5 trở lên", "Cả hai bạn đều đúng"],
    1,
    "Lớn hơn 5 không tính số 5. Từ 5 trở lên thì tính cả số 5.",
    "Lớn hơn 5 chỉ có 7 và 9, tức 2 số. Từ 5 trở lên có 5, 5, 7, 9, tức 4 số. Lan đúng, Hà sai.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 37)", questions: hoatDong },
  { id: "luyen-tap", title: "Luyện tập (trang 38)", questions: luyenTap },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: tuDuy },
];