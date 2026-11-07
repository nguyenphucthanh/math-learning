import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";

const n = formatNumber;

/** Số bé và số lớn từ tổng và hiệu. Tổng và hiệu phải cùng chẵn hoặc cùng lẻ. */
function solve(total: number, diff: number) {
  const small = (total - diff) / 2;
  return { small, big: small + diff };
}

/** Lời giải theo cách "tìm số bé trước", đúng khuôn SGK. */
function explain(total: number, diff: number, smallName: string, bigName: string, unit: string) {
  const { small, big } = solve(total, diff);
  return (
    `Hai lần số ${smallName} là: ${n(total)} − ${n(diff)} = ${n(total - diff)} (${unit}). ` +
    `Số ${smallName} là: ${n(total - diff)} : 2 = ${n(small)} (${unit}). ` +
    `Số ${bigName} là: ${n(small)} + ${n(diff)} = ${n(big)} (${unit}). ` +
    `Thử lại: ${n(small)} + ${n(big)} = ${n(total)} và ${n(big)} − ${n(small)} = ${n(diff)}.`
  );
}

type FindPair = {
  id: string;
  prompt: string;
  total: number;
  diff: number;
  /** Tên và đơn vị của số bé, số lớn. `label` là chữ ngắn đứng trước ô trống. */
  small: { name: string; label: string };
  big: { name: string; label: string };
  unit: string;
  /** Thứ tự hỏi trong đề. */
  ask: "small-first" | "big-first";
  hint: string;
  /** Thay lời giải mặc định, ví dụ câu có chu vi. */
  explanation?: string;
};

/** Câu tìm hai số: con điền hai ô theo thứ tự đề hỏi. */
function pair(spec: FindPair): FillQuestion {
  const { small, big } = solve(spec.total, spec.diff);
  const items =
    spec.ask === "small-first"
      ? [
          [spec.small.label, small],
          [spec.big.label, big],
        ]
      : [
          [spec.big.label, big],
          [spec.small.label, small],
        ];
  const parts: FillQuestion["parts"] = [];
  items.forEach(([label, value], index) => {
    parts.push(index === 0 ? `${label}:` : `${spec.unit}. ${label}:`, { answer: value as number });
  });
  parts.push(spec.unit);
  return {
    id: spec.id,
    kind: "dien-so",
    prompt: spec.prompt,
    parts,
    hint: spec.hint,
    explanation: spec.explanation ?? explain(spec.total, spec.diff, spec.small.name, spec.big.name, spec.unit),
  };
}

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-1",
    kind: "dien-so",
    parts: ["35 − 5 =", { answer: 30 }],
    hint: "Lấy 35 bớt đi 5.",
    explanation: "35 − 5 = 30.",
  },
  {
    id: "kd-2",
    kind: "dien-so",
    parts: ["30 : 2 =", { answer: 15 }],
    hint: "Chia 30 thành hai phần bằng nhau. Nhẩm: 3 chục chia 2 là 15.",
    explanation: "30 : 2 = 15, vì 15 + 15 = 30.",
  },
  {
    id: "kd-3",
    kind: "dien-so",
    prompt: "Mai có 12 cái kẹo, Mi nhiều hơn Mai 3 cái kẹo. Mi có mấy cái kẹo?",
    parts: ["Mi có", { answer: 15 }, "cái kẹo"],
    hint: "Nhiều hơn thì ta cộng thêm.",
    explanation: "12 + 3 = 15. Mi có 15 cái kẹo.",
  },
];

export const quickChecks = {
  cachMot: {
    id: "thu-cach-1",
    kind: "dien-so",
    prompt: "Hai số có tổng 30, hiệu 4. Tìm số bé.",
    parts: ["Số bé = (30 − 4) : 2 =", { answer: 13 }],
    hint: "Trừ trước: 30 − 4. Rồi chia cho 2.",
    explanation: "30 − 4 = 26, rồi 26 : 2 = 13. Số bé là 13 (số lớn là 13 + 4 = 17).",
  },
  cachHai: {
    id: "thu-cach-2",
    kind: "dien-so",
    prompt: "Hai số có tổng 30, hiệu 4. Tìm số lớn.",
    parts: ["Số lớn = (30 + 4) : 2 =", { answer: 17 }],
    hint: "Cộng trước: 30 + 4. Rồi chia cho 2.",
    explanation: "30 + 4 = 34, rồi 34 : 2 = 17. Số lớn là 17 (số bé là 30 − 17 = 13).",
  },
  congThuc: {
    id: "thu-cong-thuc",
    kind: "dien-so",
    prompt: "Một sạp bán 70 quả gà và vịt, trong đó gà nhiều hơn vịt 10 quả. Hỏi có bao nhiêu quả vịt?",
    parts: ["Số quả vịt:", { answer: 30 }, "quả"],
    hint: "Vịt là số bé hay số lớn? Số bé = (Tổng − Hiệu) : 2.",
    explanation: "Vịt ít hơn nên là số bé: (70 − 10) : 2 = 30. Có 30 quả vịt (gà có 30 + 10 = 40 quả).",
  },
  chuVi: {
    id: "thu-chu-vi",
    kind: "dien-so",
    prompt: "Hình chữ nhật có chu vi 30 cm, chiều dài hơn chiều rộng 5 cm. Tìm chiều dài.",
    parts: ["Chiều dài:", { answer: 10 }, "cm"],
    hint: "Nửa chu vi là tổng của chiều dài và chiều rộng. Tính nửa chu vi trước.",
    explanation:
      "Nửa chu vi: 30 : 2 = 15 (cm), đó là tổng. Chiều dài là số lớn: (15 + 5) : 2 = 10 (cm). Chiều rộng 15 − 10 = 5 (cm).",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Tìm hai số khi biết tổng và hiệu",
    questions: [
      pair({
        id: "a-1",
        prompt: "Một sạp bán 60 quả cam và quýt, trong đó cam nhiều hơn quýt 8 quả. Hỏi sạp bán bao nhiêu quả cam, bao nhiêu quả quýt?",
        total: 60,
        diff: 8,
        small: { name: "quả quýt", label: "Quýt" },
        big: { name: "quả cam", label: "Cam" },
        unit: "quả",
        ask: "big-first",
        hint: "Tổng là 60, hiệu là 8. Cam nhiều hơn nên cam là số lớn.",
      }),
      pair({
        id: "a-2",
        prompt: "Lan hơn em 4 tuổi. Năm nay tổng số tuổi của hai chị em là 18 tuổi. Hỏi năm nay Lan mấy tuổi, em mấy tuổi?",
        total: 18,
        diff: 4,
        small: { name: "tuổi của em", label: "Em" },
        big: { name: "tuổi của Lan", label: "Lan" },
        unit: "tuổi",
        ask: "big-first",
        hint: "Vẽ sơ đồ hai đoạn: đoạn của Lan dài hơn đoạn của em 4 tuổi. Tổng 18.",
      }),
      {
        id: "a-3",
        kind: "trac-nghiem",
        prompt: "Hai số có tổng 30, hiệu 6. Số lớn là số nào?",
        options: ["12", "18", "24", "36"],
        answerIndex: 1,
        hint: "Số lớn = (Tổng + Hiệu) : 2.",
        explanation: "(30 + 6) : 2 = 36 : 2 = 18. Số bé là 30 − 18 = 12. Thử lại: 18 − 12 = 6.",
      },
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      pair({
        id: "b-1",
        prompt:
          "Một lớp học nhảy có 36 bạn tham gia, trong đó số bạn nữ ít hơn số bạn nam là 8 bạn. Hỏi lớp có bao nhiêu bạn nữ, bao nhiêu bạn nam?",
        total: 36,
        diff: 8,
        small: { name: "bạn nữ", label: "Nữ" },
        big: { name: "bạn nam", label: "Nam" },
        unit: "bạn",
        ask: "small-first",
        hint: "Nữ ít hơn nam, nên nữ là số bé. Tổng 36, hiệu 8.",
      }),
      pair({
        id: "b-2",
        prompt:
          "Khối lớp Bốn có 150 học sinh đi tham quan làng nghề, chia làm hai đợt. Đợt thứ nhất nhiều hơn đợt thứ hai 20 học sinh. Hỏi mỗi đợt có bao nhiêu học sinh?",
        total: 150,
        diff: 20,
        small: { name: "học sinh đợt thứ hai", label: "Đợt 2" },
        big: { name: "học sinh đợt thứ nhất", label: "Đợt 1" },
        unit: "học sinh",
        ask: "big-first",
        hint: "Tổng là 150, hiệu là 20. Đợt thứ nhất nhiều hơn nên là số lớn.",
      }),
      pair({
        id: "b-3",
        prompt: "Một hình chữ nhật có chu vi 36 cm, chiều dài hơn chiều rộng 6 cm. Tìm chiều dài và chiều rộng.",
        total: 18,
        diff: 6,
        small: { name: "chiều rộng", label: "Rộng" },
        big: { name: "chiều dài", label: "Dài" },
        unit: "cm",
        ask: "big-first",
        hint: "36 là chu vi, chưa phải tổng. Nửa chu vi là tổng của chiều dài và chiều rộng.",
        explanation: `Nửa chu vi là: 36 : 2 = 18 (cm). Đó là tổng của chiều dài và chiều rộng. ${explain(18, 6, "chiều rộng", "chiều dài", "cm")}`,
      }),
      pair({
        id: "b-4",
        prompt: "Hai số lẻ liên tiếp có tổng là 24. Tìm hai số lẻ liên tiếp đó.",
        total: 24,
        diff: 2,
        small: { name: "bé", label: "Số bé" },
        big: { name: "lớn", label: "Số lớn" },
        unit: "",
        ask: "small-first",
        hint: "Hai số lẻ liên tiếp hơn kém nhau mấy? Số đó chính là hiệu.",
        explanation: `Hai số lẻ liên tiếp hơn kém nhau 2, nên hiệu là 2. ${explain(24, 2, "bé", "lớn", "đơn vị")}`,
      }),
      {
        id: "b-5",
        kind: "noi-cap",
        prompt: "Nối mỗi đề bài với tổng và hiệu của nó.",
        pairs: [
          { left: "Hai lớp có 70 học sinh, lớp 4A nhiều hơn lớp 4B 6 bạn", right: "Tổng 70, hiệu 6" },
          { left: "Chu vi 40 cm, chiều dài hơn chiều rộng 4 cm", right: "Tổng 20, hiệu 4" },
          { left: "Hai số lẻ liên tiếp có tổng là 20", right: "Tổng 20, hiệu 2" },
          { left: "Hai bạn có 30 viên bi, An ít hơn Bình 4 viên", right: "Tổng 30, hiệu 4" },
        ],
        rightOrder: [1, 3, 0, 2],
        hint: "Chu vi thì lấy một nửa. Hai số lẻ liên tiếp thì hiệu là 2.",
        explanation:
          "Chu vi 40 cm thì nửa chu vi 20 cm là tổng. Hai số lẻ liên tiếp hơn kém nhau 2 nên hiệu là 2. Hai đề còn lại cho sẵn tổng và hiệu.",
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "tt-1",
        kind: "trac-nghiem",
        prompt: "Hai số có tổng 50, hiệu 10. Số lớn lớn hơn hay bé hơn 25 (một nửa của tổng)?",
        options: ["Lớn hơn 25", "Bé hơn 25", "Bằng 25"],
        answerIndex: 0,
        hint: "Nếu hai số bằng nhau thì mỗi số là 25. Số lớn phải nhỉnh hơn hay kém hơn?",
        explanation: "Hai số khác nhau, số lớn phải lớn hơn một nửa tổng, số bé nhỏ hơn một nửa tổng. Cụ thể số lớn là 30, số bé là 20.",
      },
      {
        id: "tt-2",
        kind: "dien-so",
        prompt: "Hai số có tổng 50, hiệu 10. Tìm số lớn.",
        parts: ["Số lớn:", { answer: 30 }],
        hint: "Số lớn = (Tổng + Hiệu) : 2. Kết quả phải lớn hơn 25.",
        explanation: "(50 + 10) : 2 = 30. Thử lại: số bé 50 − 30 = 20 và 30 − 20 = 10.",
      },
      {
        id: "tt-3",
        kind: "trac-nghiem",
        prompt: 'Tìm lỗi: "Tổng 60, hiệu 8. Ta có 60 − 8 = 52, vậy số bé là 52." Bạn đó sai ở đâu?',
        options: ["Quên chia 2: 52 là hai lần số bé", "52 đúng là số bé", "Phải cộng 60 + 8 chứ không được trừ"],
        answerIndex: 0,
        hint: "Bớt phần hơn đi thì còn hai phần bằng nhau. 52 là một phần hay cả hai phần?",
        explanation: "52 là hai lần số bé. Số bé là 52 : 2 = 26, số lớn là 26 + 8 = 34. Thử lại: 26 + 34 = 60.",
      },
      {
        id: "tt-4",
        kind: "dien-so",
        prompt: "Hai số có tổng 44, hiệu 10. Tìm hai số đó.",
        parts: ["Số lớn:", { answer: 27 }, ". Số bé:", { answer: 17 }],
        hint: "Chọn một cách: tìm số bé trước hoặc số lớn trước, rồi thử lại.",
        explanation: `${explain(44, 10, "bé", "lớn", "đơn vị")}`,
      },
      {
        id: "tt-5",
        kind: "trac-nghiem",
        prompt: "Vượt SGK: có hai số tự nhiên nào có tổng 15 và hiệu 4 không?",
        options: ["Có, đó là 5 và 10", "Có, đó là 9 và 6", "Không, vì 15 − 4 = 11 không chia hết cho 2"],
        answerIndex: 2,
        hint: "Tính (15 − 4) rồi chia 2. Kết quả có là số tự nhiên không?",
        explanation:
          "15 − 4 = 11, mà 11 : 2 không ra số tự nhiên. Tổng và hiệu phải cùng chẵn hoặc cùng lẻ. 5 + 10 = 15 nhưng 10 − 5 = 5; 9 + 6 = 15 nhưng 9 − 6 = 3.",
      },
    ],
  },
];
