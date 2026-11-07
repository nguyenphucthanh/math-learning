import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { createElement } from "react";
import { SumDiagram } from "./_illustrations/sum-diagram";

const n = formatNumber;

/**
 * Câu tính bằng cách thuận tiện: con điền kết quả. Lời giải ghi lại cách ghép cặp.
 * Đáp án được test tính lại từ biểu thức trong `parts[0]`.
 */
function tien(id: string, numbers: number[], answer: number, hint: string, explanation: string): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Tính bằng cách thuận tiện.",
    parts: [`${numbers.map(n).join(" + ")} =`, { answer }],
    hint,
    explanation,
  };
}

/** Câu đổi chỗ: `a + b = c` cho sẵn, điền `b + a`. */
function doiCho(id: string, a: number, b: number): FillQuestion {
  const sum = a + b;
  return {
    id,
    kind: "dien-so",
    parts: [`${n(a)} + ${n(b)} = ${n(sum)}; ${n(b)} + ${n(a)} =`, { answer: sum }],
    hint: "Hai tổng chỉ đổi chỗ các số hạng. Con xem lại tổng đã cho.",
    explanation: `Đổi chỗ các số hạng thì tổng không đổi: ${n(b)} + ${n(a)} = ${n(a)} + ${n(b)} = ${n(sum)}.`,
  };
}

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-1",
    kind: "dien-so",
    parts: ["47 +", { answer: 53 }, "= 100"],
    hint: "Nhẩm: 47 cần thêm bao nhiêu để đủ 50, rồi thêm bao nhiêu nữa để đủ 100?",
    explanation: "47 + 3 = 50, 50 + 50 = 100. Vậy 47 + 53 = 100.",
  },
  {
    id: "kd-2",
    kind: "dien-so",
    parts: ["250 + 750 =", { answer: 1000 }],
    hint: "Cộng hàng chục với hàng chục: 25 chục + 75 chục.",
    explanation: "25 chục + 75 chục = 100 chục, tức là 1 000.",
  },
  {
    id: "kd-3",
    kind: "dien-so",
    parts: [`${n(45000)} + ${n(75000)} =`, { answer: 120000 }],
    hint: "Cộng 45 nghìn với 75 nghìn.",
    explanation: `45 nghìn + 75 nghìn = 120 nghìn. Vậy ${n(45000)} + ${n(75000)} = ${n(120000)}.`,
  },
];

export const quickChecks = {
  giaoHoan: {
    id: "thu-giao-hoan",
    kind: "dien-so",
    parts: ["135 + 264 = 264 +", { answer: 135 }],
    hint: "Hai tổng chỉ khác nhau thứ tự. Số hạng nào còn thiếu?",
    explanation: "Đổi chỗ các số hạng thì tổng không đổi: 135 + 264 = 264 + 135.",
  },
  ketHop: {
    id: "thu-ket-hop",
    kind: "dien-so",
    parts: ["40 + (60 + 17) = (40 + 60) +", { answer: 17 }],
    hint: "Thứ tự ba số vẫn giữ nguyên: 40, 60, rồi 17. Chỉ đổi cặp nằm trong ngoặc.",
    explanation: "40 + (60 + 17) = (40 + 60) + 17. Cả hai đều bằng 117.",
  },
  thuanTien: {
    id: "thu-thuan-tien",
    kind: "dien-so",
    parts: ["64 + 187 + 36 = (64 + 36) + 187 =", { answer: 287 }],
    hint: "64 + 36 cộng ra số tròn nào?",
    explanation: "64 + 36 = 100, rồi 100 + 187 = 287.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "giao-hoan",
    title: "Tính chất giao hoán",
    questions: [
      doiCho("gh-1", 318, 245),
      doiCho("gh-2", 6305, 428),
      doiCho("gh-3", 91, 5872),
      {
        id: "gh-4",
        kind: "noi-cap",
        prompt: "Nối các thanh có độ dài bằng nhau. Các thanh ghép từ những đoạn có độ dài m, n, p.",
        pairs: [
          { left: "m + n", right: "n + m" },
          { left: "m + n + p", right: "p + m + n" },
          { left: "m + p", right: "p + m" },
        ],
        rightOrder: [1, 2, 0],
        hint: "Hai thanh bằng nhau khi ghép từ cùng các đoạn, chỉ xếp khác thứ tự.",
        explanation: "m + n = n + m, m + n + p = p + m + n và m + p = p + m: các đoạn giống nhau nên tổng độ dài bằng nhau.",
      },
    ],
  },
  {
    id: "ket-hop",
    title: "Tính chất kết hợp",
    questions: [
      {
        id: "kh-1",
        kind: "dien-so",
        prompt: `Tính giá trị của biểu thức (a + b) + c với a = ${n(3480)}, b = ${n(4573)} và c = 520.`,
        parts: ["(a + b) + c =", { answer: 8573 }],
        hint: "Tìm hai số trong ba số cộng ra số tròn nghìn. Cộng cặp đó trước.",
        explanation: `${n(3480)} + 520 = ${n(4000)}. Vậy (${n(3480)} + ${n(4573)}) + 520 = (${n(3480)} + 520) + ${n(4573)} = ${n(4000)} + ${n(4573)} = ${n(8573)}.`,
      },
      {
        id: "kh-2",
        kind: "dien-so",
        parts: [`${n(25000)} + (${n(45000)} + ${n(55000)}) =`, { answer: 125000 }],
        hint: "Tính trong ngoặc trước: 45 nghìn + 55 nghìn.",
        explanation: `${n(45000)} + ${n(55000)} = ${n(100000)}, rồi ${n(25000)} + ${n(100000)} = ${n(125000)}.`,
      },
    ],
  },
  {
    id: "thuan-tien",
    title: "Tính bằng cách thuận tiện",
    questions: [
      tien("tt-1", [40, 157, 60], 257, "Tìm hai số cộng ra số tròn trăm.", "40 + 157 + 60 = 40 + 60 + 157 = 100 + 157 = 257."),
      tien("tt-2", [80, 635, 20], 735, "Tìm hai số cộng ra số tròn trăm.", "80 + 635 + 20 = 80 + 20 + 635 = 100 + 635 = 735."),
      tien("tt-3", [35, 248, 65], 348, "Tìm hai số cộng ra số tròn trăm.", "35 + 248 + 65 = 35 + 65 + 248 = 100 + 248 = 348."),
      tien("tt-4", [325, 399, 275], 999, "Tìm hai số cộng ra số tròn trăm. Số còn lại cộng sau.", "325 + 399 + 275 = 325 + 275 + 399 = 600 + 399 = 999."),
      tien("tt-5", [56, 318, 4], 378, "56 cộng với số nào ra số tròn chục?", "56 + 318 + 4 = 56 + 4 + 318 = 60 + 318 = 378."),
      tien("tt-6", [45, 207, 55], 307, "Tìm hai số cộng ra 100.", "45 + 207 + 55 = 45 + 55 + 207 = 100 + 207 = 307."),
      tien("tt-7", [2, 98, 460], 560, "Tìm hai số cộng ra 100.", "2 + 98 + 460 = 100 + 460 = 560."),
      tien(
        "tt-8",
        [538, 190, 20, 12],
        760,
        "Có bốn số. Ghép thành hai cặp, mỗi cặp cộng ra số tròn chục hoặc tròn trăm.",
        "538 + 190 + 20 + 12 = (538 + 12) + (190 + 20) = 550 + 210 = 760.",
      ),
      tien("tt-9", [85, 46, 15], 146, "Tìm hai số cộng ra số tròn trăm.", "85 + 46 + 15 = 85 + 15 + 46 = 100 + 46 = 146."),
      tien(
        "tt-10",
        [13, 15, 17, 25],
        70,
        "Ghép thành hai cặp, mỗi cặp cộng ra số tròn chục.",
        "13 + 15 + 17 + 25 = (13 + 17) + (15 + 25) = 30 + 40 = 70.",
      ),
      tien(
        "tt-11",
        [483, 99, 117],
        699,
        "Tìm hai số cộng ra số tròn trăm. Số còn lại cộng sau.",
        "483 + 99 + 117 = 483 + 117 + 99 = 600 + 99 = 699.",
      ),
      tien(
        "tt-12",
        [70, 163, 30, 37],
        300,
        "Ghép thành hai cặp, mỗi cặp cộng ra số tròn trăm.",
        "70 + 163 + 30 + 37 = (70 + 30) + (163 + 37) = 100 + 200 = 300.",
      ),
    ],
  },
  {
    id: "dien-chu",
    title: "Điền số hoặc chữ",
    questions: [
      {
        id: "dc-1",
        kind: "dien-so",
        prompt: "Tìm số thích hợp.",
        parts: ["529 +", { answer: 384 }, "= 384 + 529"],
        hint: "Hai tổng có cùng các số hạng, chỉ đổi chỗ. Số hạng còn thiếu là số nào?",
        explanation: "Đổi chỗ các số hạng thì tổng không đổi: 529 + 384 = 384 + 529.",
      },
      {
        id: "dc-2",
        kind: "dien-so",
        prompt: "Tìm số thích hợp.",
        parts: [{ answer: 2318 }, `+ 407 = 407 + ${n(2318)}`],
        hint: "Hai tổng có cùng các số hạng, chỉ đổi chỗ. Số hạng còn thiếu là số nào?",
        explanation: `Đổi chỗ các số hạng thì tổng không đổi: ${n(2318)} + 407 = 407 + ${n(2318)}.`,
      },
      {
        id: "dc-3",
        kind: "trac-nghiem",
        prompt: "Chọn chữ hoặc số thích hợp thay cho ?  m + n + 36 = m + (? + 36)",
        options: ["m", "n", "36", "m + n"],
        answerIndex: 1,
        hint: "Thứ tự không đổi: m, n, rồi 36. Chỉ có hai số n và 36 được nhóm lại trong ngoặc.",
        explanation: "m + n + 36 = m + (n + 36). Ngoặc ôm n và 36, còn m đứng đầu như cũ.",
      },
      {
        id: "dc-4",
        kind: "dien-so",
        prompt: "Tìm số thích hợp.",
        parts: ["38 + z + 62 = (38 +", { answer: 62 }, ") + z"],
        hint: "Bên phải, z đã bị đưa ra cuối. Trong ngoặc có 38 cộng với số nào ra số tròn?",
        explanation: "38 + z + 62 = 38 + 62 + z = (38 + 62) + z. Ta đổi chỗ z và 62, rồi nhóm 38 với 62.",
      },
    ],
  },
  {
    id: "so-do",
    title: "Sơ đồ và bài toán",
    questions: [
      {
        id: "sd-1",
        kind: "trac-nghiem",
        prompt: "Sơ đồ có hai đoạn: đoạn a và đoạn b + 5. Biểu thức nào phù hợp với sơ đồ?",
        options: ["a + b + 5", "a + (b + 5)"],
        answerIndex: 1,
        hint: "Đoạn thứ hai là b + 5, được gộp thành một đoạn. Gộp thì viết trong ngoặc.",
        explanation: "Hai đoạn là a và (b + 5), nên biểu thức là a + (b + 5).",
        illustration: createElement(SumDiagram, { grouped: true }),
      },
      {
        id: "sd-2",
        kind: "trac-nghiem",
        prompt: "Sơ đồ có ba đoạn: a, b và 5. Biểu thức nào phù hợp với sơ đồ?",
        options: ["a + b + 5", "a + (b + 5)"],
        answerIndex: 0,
        hint: "Có ba đoạn riêng, không đoạn nào được gộp.",
        explanation: "Ba đoạn nối nhau a, b, 5, nên biểu thức là a + b + 5.",
        illustration: createElement(SumDiagram, { grouped: false }),
      },
      {
        id: "sd-3",
        kind: "dien-so",
        prompt: "Với a = 18 và b = 6, tính giá trị của biểu thức.",
        parts: ["a + b + 5 =", { answer: 29 }],
        hint: "Thay a = 18 và b = 6 rồi cộng từ trái sang phải.",
        explanation: "18 + 6 + 5 = 24 + 5 = 29.",
      },
      {
        id: "sd-4",
        kind: "dien-so",
        prompt: "Với a = 18 và b = 6, tính giá trị của biểu thức.",
        parts: ["a + (b + 5) =", { answer: 29 }],
        hint: "Tính trong ngoặc trước: b + 5. Rồi cộng với a.",
        explanation: "6 + 5 = 11, rồi 18 + 11 = 29. Hai biểu thức cùng bằng 29: ngoặc chỉ cách nhóm, không đổi giá trị.",
      },
      {
        id: "bt-1",
        kind: "loi-van",
        prompt:
          "Để đi từ nhà Mai đến nhà Lan, Mai đi qua một cổng làng và một cây đa. Từ nhà Mai đến cổng làng là 245 m, từ cổng làng đến cây đa là 130 m, từ cây đa đến nhà Lan là 155 m. Hỏi quãng đường Mai cần đi dài bao nhiêu mét?",
        lines: [["245 + 130 + 155 =", { answer: 530 }, "(m)"]],
        hint: "Tìm hai số cộng ra số tròn trăm: 245 + 155.",
        explanation: "245 + 130 + 155 = 245 + 155 + 130 = 400 + 130 = 530. Mai đi 530 m.",
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "nghi-1",
        kind: "dien-so",
        parts: ["480 + 275 + 20 = 500 +", { answer: 275 }],
        hint: "480 + 20 bằng bao nhiêu? Vậy phần còn lại là số nào?",
        explanation: "480 + 20 = 500, nên 480 + 275 + 20 = 480 + 20 + 275 = 500 + 275.",
      },
      {
        id: "nghi-2",
        kind: "trac-nghiem",
        prompt: "Nam viết: 36 + 49 + 64 = 36 + 64 = 100 + 49 = 149. Nam sai ở đâu?",
        options: [
          "Kết quả 149 sai",
          "Viết 36 + 49 + 64 = 36 + 64 là sai vì mất số 49, phải viết 36 + 64 + 49",
          "Nam không sai",
        ],
        answerIndex: 1,
        hint: "Đọc từng dấu =. Hai vế của dấu = đầu tiên có cùng các số không?",
        explanation:
          "Kết quả 149 đúng, nhưng dấu = đầu tiên sai: vế phải mất số 49. Phải viết 36 + 49 + 64 = 36 + 64 + 49 = 100 + 49 = 149.",
      },
      {
        id: "nghi-3",
        kind: "trac-nghiem",
        prompt: "Mi nói: đổi chỗ được thì 9 − 4 = 4 − 9. Mi nói đúng không?",
        options: [
          "Đúng, phép trừ cũng đổi chỗ được",
          "Sai, 9 − 4 = 5 còn 4 − 9 không trừ được",
          "Sai, vì 4 − 9 = 5",
        ],
        answerIndex: 1,
        hint: "Tính 9 − 4. Rồi thử lấy 9 viên kẹo ra khỏi 4 viên kẹo xem có được không.",
        explanation:
          "Tính chất giao hoán chỉ dùng cho phép cộng. 9 − 4 = 5, còn 4 − 9 không trừ được (4 viên kẹo không đủ để lấy đi 9 viên).",
      },
    ],
  },
];
