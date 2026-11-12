import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

/** Giá trị của một đơn vị: total chia đều cho groups. Ném lỗi nếu không chia hết. */
export function unitValue(total: number, groups: number): number {
  if (groups <= 0 || total % groups !== 0) throw new Error(`${total} không chia hết cho ${groups}`);
  return total / groups;
}

const STEP1 = "Bước 1: tìm giá trị của một đơn vị bằng phép chia.";

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function word(id: string, prompt: string, lines: WordQuestion["lines"], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

/** Dạng 1: tìm một phần (chia) rồi nhân với k phần. */
function mulWord(id: string, prompt: string, total: number, groups: number, k: number, one: string, many: string, unit: string): WordQuestion {
  const u = unitValue(total, groups);
  return word(
    id,
    prompt,
    [
      [`${one}:`, { answer: u }, `(${unit})`],
      [`${many}:`, { answer: u * k }, `(${unit})`],
    ],
    `${STEP1} Rồi lấy kết quả nhân với số phần cần tìm.`,
    `${one}: ${n(total)} : ${groups} = ${n(u)} (${unit}). ${many}: ${n(u)} × ${k} = ${n(u * k)} (${unit}).`,
  );
}

/** Dạng 2: tìm một phần (chia) rồi chia tiếp để tìm số phần. */
function divWord(id: string, prompt: string, total: number, groups: number, amount: number, one: string, unit: string, count: string, countUnit: string): WordQuestion {
  const u = unitValue(total, groups);
  const c = unitValue(amount, u);
  return word(
    id,
    prompt,
    [
      [`${one}:`, { answer: u }, `(${unit})`],
      [`${count}:`, { answer: c }, `(${countUnit})`],
    ],
    `${STEP1} Rồi lấy số cần chia cho giá trị của một đơn vị.`,
    `${one}: ${n(total)} : ${groups} = ${n(u)} (${unit}). ${count}: ${n(amount)} : ${n(u)} = ${n(c)} (${countUnit}).`,
  );
}

/** Khởi động: chia và nhân trong bảng. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  { id: "kd-chia", kind: "dien-so", prompt: "Chia đều.", parts: ["42 : 6 =", { answer: 7 }], hint: "6 nhân mấy bằng 42?", explanation: "42 : 6 = 7 vì 6 × 7 = 42." },
  { id: "kd-nhan", kind: "dien-so", prompt: "Nhân.", parts: ["7 × 4 =", { answer: 28 }], hint: "4 lần của 7.", explanation: "7 × 4 = 28." },
  { id: "kd-chia-2", kind: "dien-so", prompt: "Chia để tìm số nhóm.", parts: ["24 : 3 =", { answer: 8 }], hint: "3 nhân mấy bằng 24?", explanation: "24 : 3 = 8 vì 3 × 8 = 24." },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  nhan: mulWord("thu-dang-1", "Có 28 quả cam xếp đều vào 4 túi. Hỏi 3 túi như vậy có bao nhiêu quả cam?", 28, 4, 3, "Số cam trong 1 túi", "Số cam trong 3 túi", "quả"),
  chia: divWord("thu-dang-2", "Có 24 kg gạo đựng đều vào 4 bao. Hỏi 18 kg gạo như vậy đựng được mấy bao?", 24, 4, 18, "Số ki-lô-gam gạo trong 1 bao", "kg", "Số bao", "bao"),
  chonPhep: choice(
    "thu-chon-phep",
    "42 quả trứng xếp đều vào 6 khay. Muốn biết 4 khay có bao nhiêu quả, sau khi tính 42 : 6 = 7 ta làm phép tính nào?",
    ["7 × 4", "28 : 7", "42 : 4"],
    0,
    "Mỗi khay 7 quả, có 4 khay. Biết một khay rồi tìm nhiều khay thì nhân.",
    `7 × 4 = 28 (quả). Phép chia 28 : 7 dùng khi biết tổng và muốn tìm số khay.`,
  ),
} satisfies Record<string, Question>;

const salt: FillQuestion = {
  id: "hd-3",
  kind: "dien-so",
  prompt: "Bảng giá muối: 3 kg giá 12 000 đồng. Tìm số tiền mua 1 kg và 5 kg muối.",
  parts: ["1 kg:", { answer: unitValue(12000, 3) }, "đồng; 5 kg:", { answer: unitValue(12000, 3) * 5 }, "đồng"],
  hint: "Tìm tiền 1 kg bằng phép chia, rồi nhân với 5.",
  explanation: `1 kg: ${n(12000)} : 3 = ${n(4000)} (đồng). 5 kg: ${n(4000)} × 5 = ${n(20000)} (đồng).`,
};

const hoatDongQuestions: Question[] = [
  mulWord("hd-1", "Có 24 kg đường chia đều vào 8 túi. Hỏi 3 túi như vậy có bao nhiêu ki-lô-gam đường?", 24, 8, 3, "Số đường trong 1 túi", "Số đường trong 3 túi", "kg"),
  mulWord("hd-2", "Xếp đều 72 quả trứng vào 6 khay. Hỏi 4 khay trứng như vậy có bao nhiêu quả?", 72, 6, 4, "Số trứng trong 1 khay", "Số trứng trong 4 khay", "quả"),
  salt,
  divWord("hd-4", "Việt mua 4 chiếc thước đo góc cùng loại phải trả 32 000 đồng. Hỏi Mai có 24 000 đồng thì mua được mấy chiếc thước đo góc loại đó?", 32000, 4, 24000, "Giá tiền 1 chiếc thước", "đồng", "Số thước Mai mua được", "chiếc"),
  divWord("hd-5", "30 hộp sữa chua đóng đều được vào 6 vỉ. Hỏi 20 hộp sữa chua cùng loại sẽ đóng được mấy vỉ như vậy?", 30, 6, 20, "Số hộp trong 1 vỉ", "hộp", "Số vỉ", "vỉ"),
];

const SIDES = { "hình tam giác": 3, "hình chữ nhật": 6, "hình thang": 7 } as const; // đếm que theo ảnh SGK
const STICKS = 4;
const SQUARE = 40;
const stick = unitValue(SQUARE, STICKS);

const luyenTapQuestions: Question[] = [
  divWord("lt-1", "Việt đổi 8 kg giấy để được 2 cây. Hỏi Mai đổi 20 kg giấy cùng loại thì được mấy cây?", 8, 2, 20, "Số ki-lô-gam giấy đổi 1 cây", "kg", "Số cây Mai được", "cây"),
  word(
    "lt-2",
    `Việt xếp 4 que tính để được hình vuông có chu vi ${SQUARE} cm. Mai dùng que tính loại đó xếp hình tam giác (3 que), hình chữ nhật (6 que) và hình thang (7 que). Tính chu vi mỗi hình.`,
    [
      ["Một que:", { answer: stick }, "cm"],
      ["Hình tam giác:", { answer: stick * SIDES["hình tam giác"] }, "cm"],
      ["Hình chữ nhật:", { answer: stick * SIDES["hình chữ nhật"] }, "cm"],
      ["Hình thang:", { answer: stick * SIDES["hình thang"] }, "cm"],
    ],
    "Chu vi hình vuông là tổng 4 que. Tìm độ dài một que, rồi nhân với số que của từng hình.",
    `Một que: ${SQUARE} : 4 = ${stick} (cm). Tam giác: ${stick} × 3 = 30 cm. Chữ nhật: ${stick} × 6 = 60 cm. Hình thang: ${stick} × 7 = 70 cm.`,
  ),
  choice(
    "lt-3",
    "9 kg giấy đổi được 3 cây. Muốn biết 15 kg giấy đổi được mấy cây, ta tính 9 : 3 = 3 (kg), rồi làm phép tính nào?",
    ["15 : 3", "15 × 3", "9 × 15"],
    0,
    "Mỗi cây cần 3 kg. Có 15 kg, hỏi được mấy cây: chia.",
    "15 : 3 = 5 (cây). Hỏi số cây (số phần) thì chia; hỏi số kg của nhiều cây thì nhân.",
  ),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "48 cái bánh xếp đều vào 8 hộp. Không tính, số bánh trong 5 hộp như vậy là nhiều hơn hay ít hơn 48?",
    ["Nhiều hơn 48", "Ít hơn 48", "Đúng bằng 48"],
    1,
    "5 hộp ít hơn 8 hộp.",
    `5 hộp ít hơn 8 hộp nên bánh ít hơn 48. Tính: 48 : 8 = 6, 6 × 5 = 30 (cái).`,
  ),
  choice(
    "sn-2",
    "18 l mật ong đựng đều vào 6 can. 12 l mật ong như vậy đựng được nhiều hơn hay ít hơn 6 can?",
    ["Nhiều hơn 6 can", "Ít hơn 6 can", "Đúng 6 can"],
    1,
    "12 l ít hơn 18 l.",
    "12 l ít hơn 18 l nên cần ít can hơn 6. Tính: 18 : 6 = 3 (l), 12 : 3 = 4 (can).",
  ),
  choice(
    "sn-3",
    "Nam giải: “18 l mật ong đựng đều vào 6 can. 12 l đựng được 12 : 6 = 2 can”. Nam làm đúng hay sai?",
    ["Đúng", "Sai, phải tìm số lít trong 1 can trước"],
    1,
    "6 là số can của 18 l, không phải số lít trong một can.",
    "Sai. Phải tìm số lít trong 1 can: 18 : 6 = 3 (l). Rồi 12 : 3 = 4 (can). Đúng là 4 can, không phải 2 can.",
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Hoạt động (trang 31-32)", questions: hoatDongQuestions },
  { id: "luyen-tap", title: "Luyện tập (trang 32)", questions: luyenTapQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
