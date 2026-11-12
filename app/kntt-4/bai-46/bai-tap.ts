import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

const MEAN_HINT = "Cộng tất cả các số lại, rồi chia tổng cho số các số hạng (đếm xem có bao nhiêu số).";

export const sumOf = (values: number[]) => values.reduce((s, v) => s + v, 0);
export const meanOf = (values: number[]) => sumOf(values) / values.length;

export function explainMean(values: number[]): string {
  return `Tổng: ${values.map(n).join(" + ")} = ${n(sumOf(values))}. Có ${values.length} số, nên ${n(sumOf(values))} : ${values.length} = ${n(meanOf(values))}.`;
}

/** Tìm số trung bình cộng: một ô cho tổng, một ô cho kết quả. */
function mean(id: string, prompt: string, values: number[]): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: [`${values.map(n).join(" + ")} =`, { answer: sumOf(values) }, `; ${n(sumOf(values))} : ${values.length} =`, { answer: meanOf(values) }],
    hint: MEAN_HINT,
    explanation: explainMean(values),
  };
}

/** Bài toán lời văn tìm số trung bình cộng của các số (mỗi số một đối tượng). */
function meanWord(id: string, prompt: string, values: number[], unit: string, unitPer: string): WordQuestion {
  return {
    id,
    kind: "loi-van",
    prompt,
    lines: [
      [`Tổng: ${values.map(n).join(" + ")} =`, { answer: sumOf(values) }, `(${unit})`],
      [`Trung bình ${unitPer}: ${n(sumOf(values))} : ${values.length} =`, { answer: meanOf(values) }, `(${unit})`],
    ],
    hint: MEAN_HINT,
    explanation: explainMean(values),
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

/** Khởi động: cộng nhiều số, chia cho số có một chữ số, chia đều. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-cong",
    kind: "dien-so",
    prompt: "Cộng ba số.",
    parts: ["24 + 36 + 30 =", { answer: 24 + 36 + 30 }],
    hint: "Cộng hai số đầu trước, rồi cộng số thứ ba.",
    explanation: "24 + 36 = 60, 60 + 30 = 90.",
  },
  {
    id: "kd-chia",
    kind: "dien-so",
    prompt: "Chia cho số có một chữ số.",
    parts: ["90 : 3 =", { answer: 90 / 3 }],
    hint: "9 chục chia 3 được 3 chục.",
    explanation: "90 : 3 = 30.",
  },
  {
    id: "kd-chia-deu",
    kind: "dien-so",
    prompt: "12 cái kẹo chia đều cho 4 bạn. Mỗi bạn được mấy cái?",
    parts: ["12 : 4 =", { answer: 12 / 4 }, "cái"],
    hint: "Chia đều là chia cho mỗi bạn bằng nhau.",
    explanation: "12 : 4 = 3. Mỗi bạn được 3 cái kẹo.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  tinh: {
    id: "thu-tinh",
    kind: "dien-so",
    prompt: "Tìm số trung bình cộng của 6, 8 và 10.",
    parts: ["6 + 8 + 10 =", { answer: 6 + 8 + 10 }, "; 24 : 3 =", { answer: 24 / 3 }],
    hint: MEAN_HINT,
    explanation: explainMean([6, 8, 10]),
  },
  giua: {
    id: "thu-giua",
    kind: "trac-nghiem",
    prompt: "Số trung bình cộng của 12, 20 và 28 là số nào?",
    options: ["10", "20", "60"],
    answerIndex: 1,
    hint: "Số trung bình cộng không bé hơn số bé nhất và không lớn hơn số lớn nhất.",
    explanation: "(12 + 20 + 28) : 3 = 60 : 3 = 20. 60 là tổng, chưa chia. 10 bé hơn cả số bé nhất (12).",
  },
  soHang: {
    id: "thu-so-hang",
    kind: "trac-nghiem",
    prompt: "Số học sinh của 4 lớp là 35, 37, 43 và 45. Muốn tìm trung bình mỗi lớp, ta chia tổng cho mấy?",
    options: ["2", "4", "160"],
    answerIndex: 1,
    hint: "Chia cho số các số hạng: đếm xem có mấy lớp.",
    explanation: "Có 4 lớp, nên chia tổng cho 4: (35 + 37 + 43 + 45) : 4 = 160 : 4 = 40.",
  },
  nguoc: {
    id: "thu-nguoc",
    kind: "dien-so",
    prompt: "Trung bình cộng của 3 số là 10. Tổng của 3 số đó là bao nhiêu?",
    parts: ["10 × 3 =", { answer: 30 }],
    hint: "Chia đều tổng cho 3 số được 10, nên tổng là 3 lần của 10.",
    explanation: "Tổng : 3 = 10, nên tổng = 10 × 3 = 30.",
  },
} satisfies Record<string, Question>;

const hoatDongQuestions: Question[] = [
  mean("hd-1a", "Tìm số trung bình cộng của 30 và 50.", [30, 50]),
  mean("hd-1b", "Tìm số trung bình cộng của 20, 30 và 40.", [20, 30, 40]),
  mean("hd-1c", "Tìm số trung bình cộng của 6, 11 và 19.", [6, 11, 19]),
  meanWord("hd-2a", "Số cây trồng được của 3 đội lần lượt là 18, 24 và 27. Hỏi trung bình mỗi đội trồng được bao nhiêu cây?", [18, 24, 27], "cây", "mỗi đội"),
  meanWord("hd-2b", "Số học sinh của 4 lớp lần lượt là 32, 36, 38 và 42. Hỏi trung bình mỗi lớp có bao nhiêu học sinh?", [32, 36, 38, 42], "học sinh", "mỗi lớp"),
  meanWord("hd-3", "Một giải đua xe đạp có 4 chặng dài lần lượt 80 km, 120 km, 64 km và 176 km. Hỏi trung bình mỗi chặng dài bao nhiêu ki-lô-mét?", [80, 120, 64, 176], "km", "mỗi chặng"),
];

const luyenTapQuestions: Question[] = [
  mean("lt-1a", "Số ghi ở nhụy hoa bằng trung bình cộng các số ghi ở cánh hoa: 32, 28 và 30. Tìm số ở nhụy.", [32, 28, 30]),
  mean("lt-1b", "Số ghi ở nhụy hoa bằng trung bình cộng các số ghi ở cánh hoa: 21, 23, 19, 17 và 25. Tìm số ở nhụy.", [21, 23, 19, 17, 25]),
  {
    id: "lt-2",
    kind: "loi-van",
    prompt: "Nhà bác Vân có 5 bao thóc tẻ cân nặng 250 kg và 3 bao thóc nếp cân nặng 134 kg. Hỏi trung bình mỗi bao thóc nhà bác Vân cân nặng bao nhiêu ki-lô-gam?",
    lines: [
      ["Số bao thóc: 5 + 3 =", { answer: 8 }, "(bao)"],
      ["Số ki-lô-gam thóc: 250 + 134 =", { answer: 384 }, "(kg)"],
      ["Trung bình mỗi bao: 384 : 8 =", { answer: 48 }, "(kg)"],
    ],
    hint: "Tìm tổng số bao và tổng số ki-lô-gam trước. Chia tổng ki-lô-gam cho tổng số bao, không chia cho 2 loại thóc.",
    explanation: "Có 5 + 3 = 8 bao, nặng 250 + 134 = 384 kg. Trung bình mỗi bao nặng 384 : 8 = 48 kg.",
  },
  {
    id: "lt-3",
    kind: "loi-van",
    prompt: "Ngày thứ nhất, Rô-bốt làm được 30 cái bánh giấy. Ngày thứ hai làm được nhiều hơn ngày thứ nhất 6 cái bánh. Hỏi trung bình mỗi ngày Rô-bốt làm được bao nhiêu cái bánh giấy?",
    lines: [
      ["Ngày thứ hai: 30 + 6 =", { answer: 36 }, "(cái)"],
      ["Trung bình mỗi ngày: (30 + 36) : 2 =", { answer: 33 }, "(cái)"],
    ],
    hint: "Tính số bánh ngày thứ hai trước, rồi mới tìm trung bình của hai ngày.",
    explanation: "Ngày thứ hai làm 30 + 6 = 36 cái. Trung bình mỗi ngày: (30 + 36) : 2 = 66 : 2 = 33 cái.",
  },
  {
    id: "lt-4",
    kind: "dien-so",
    prompt: "Lan nói: “Trung bình cộng của số tớ viết và số Hà viết bằng 16.” Hà viết số 20. Hỏi Lan viết số nào?",
    parts: ["Tổng hai số: 16 × 2 =", { answer: 32 }, "; số của Lan: 32 − 20 =", { answer: 12 }],
    hint: "Trung bình cộng của 2 số là 16, nên tổng hai số là 16 × 2. Rồi bớt số của Hà.",
    explanation: "Tổng hai số là 16 × 2 = 32. Số của Lan là 32 − 20 = 12. Thử lại: (12 + 20) : 2 = 16.",
  },
];

/** Vượt SGK: ước lượng, tìm lỗi sai, tìm số còn lại với 3 số. */
const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "Không cần tính tổng. Số nào có thể là số trung bình cộng của 14, 22 và 30?",
    ["10", "22", "35"],
    1,
    "Số trung bình cộng nằm giữa số bé nhất và số lớn nhất.",
    "10 bé hơn số bé nhất (14), 35 lớn hơn số lớn nhất (30), nên không đúng. Thật vậy, (14 + 22 + 30) : 3 = 66 : 3 = 22.",
  ),
  choice(
    "sn-2",
    "Nam tìm số trung bình cộng của 12, 18 và 30 như sau: (12 + 18 + 30) : 2 = 30. Nam sai ở đâu?",
    ["Chia cho 2 thay vì chia cho 3", "Cộng sai tổng", "Phải chia cho số lớn nhất"],
    0,
    "Có mấy số hạng thì chia cho mấy. Kiểm tra kết quả có nằm giữa số bé nhất và số lớn nhất không.",
    "Có 3 số nên phải chia cho 3: (12 + 18 + 30) : 3 = 60 : 3 = 20. Kết quả 30 của Nam không bé hơn số lớn nhất (30), nên đáng ngờ.",
  ),
  {
    id: "sn-3",
    kind: "dien-so",
    prompt: "Trung bình cộng của ba số là 20. Hai trong ba số là 15 và 18. Tìm số còn lại.",
    parts: ["Tổng ba số: 20 × 3 =", { answer: 60 }, "; số còn lại: 60 − 15 − 18 =", { answer: 27 }],
    hint: "Tổng ba số bằng 20 × 3. Rồi bớt hai số đã biết.",
    explanation: "Tổng ba số là 20 × 3 = 60. Số còn lại là 60 − 15 − 18 = 27. Thử lại: (15 + 18 + 27) : 3 = 20.",
  },
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 29 đến 30)", questions: hoatDongQuestions },
  { id: "luyen-tap", title: "Luyện tập (trang 30)", questions: luyenTapQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
