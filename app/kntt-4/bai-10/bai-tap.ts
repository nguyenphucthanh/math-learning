import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";

const HANG = ["hàng trăm nghìn", "hàng chục nghìn", "hàng nghìn", "hàng trăm", "hàng chục", "hàng đơn vị"];

/** Các chữ số của số có sáu chữ số, từ hàng trăm nghìn đến hàng đơn vị. */
export function digitsOf(value: number): number[] {
  return String(value).padStart(6, "0").split("").map(Number);
}

/** Câu điền chữ số ở từng hàng của một số có sáu chữ số. */
function fromNumber(id: string, value: number, text: string): FillQuestion {
  const digits = digitsOf(value);
  const parts: FillQuestion["parts"] = [`Số ${text} có`];
  digits.forEach((digit, index) => {
    parts.push(HANG[index], { answer: digit });
    if (index < 5) parts.push(",");
  });
  return {
    id,
    kind: "dien-so",
    parts,
    hint: "Đọc các chữ số của số từ trái sang phải, tương ứng từ hàng trăm nghìn đến hàng đơn vị.",
    explanation: `${text}: ${digits.map((digit, index) => `${digit} ${HANG[index].replace("hàng ", "")}`).join(", ")}.`,
  };
}

/** Khởi động đầu bài: nhớ lại số đến 100 000 (Bài 1), không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-viet",
    kind: "dien-so",
    prompt: "Viết số: 4 chục nghìn, 0 nghìn, 7 trăm, 0 chục và 5 đơn vị.",
    parts: ["Số đó là", { answer: 40705 }],
    hint: "Viết lần lượt chữ số của từng hàng. Hàng nào không có thì ghi 0.",
    explanation: "4, 0, 7, 0, 5 viết liền nhau là 40 705.",
  },
  {
    id: "kd-lien-sau",
    kind: "dien-so",
    parts: ["Số liền sau của 99 999 là", { answer: 100000 }],
    hint: "Số liền sau hơn số đã cho 1 đơn vị.",
    explanation: "99 999 thêm 1 là 100 000.",
  },
  {
    id: "kd-gia-tri",
    kind: "dien-so",
    parts: ["Chữ số 3 trong số 53 208 có giá trị là", { answer: 3000 }],
    hint: "Chữ số 3 đứng ở hàng nghìn.",
    explanation: "53 208 = 50 000 + 3 000 + 200 + 8. Chữ số 3 ở hàng nghìn nên có giá trị 3 000.",
  },
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  viet: {
    id: "thu-viet",
    kind: "dien-so",
    prompt: "Viết số: 5 trăm nghìn, 4 chục nghìn, 0 nghìn, 2 trăm, 1 chục và 9 đơn vị.",
    parts: ["Số đó là", { answer: 540219 }],
    hint: "Viết các chữ số 5, 4, 0, 2, 1, 9 liền nhau, theo thứ tự từ hàng trăm nghìn.",
    explanation: "5, 4, 0, 2, 1, 9 viết liền nhau là 540 219.",
  },
  doc: {
    id: "thu-doc",
    kind: "trac-nghiem",
    prompt: "Số 308 051 đọc là:",
    options: [
      "ba trăm linh tám nghìn không trăm năm mươi mốt",
      "ba trăm tám nghìn năm mươi mốt",
      "ba trăm linh tám nghìn năm trăm linh một",
      "ba trăm tám mươi nghìn không trăm năm mươi mốt",
    ],
    answerIndex: 0,
    hint: "Đọc 308, đọc “nghìn”, rồi đọc 051. Hàng trăm của phần sau là 0 nên đọc “không trăm”.",
    explanation: "308 đọc là ba trăm linh tám; 051 đọc là không trăm năm mươi mốt.",
  },
  dem: {
    id: "thu-dem",
    kind: "dien-so",
    prompt: "Đếm thêm 100 000: 700 000, 800 000, 900 000, …",
    parts: ["Số tiếp theo là", { answer: 1000000 }],
    hint: "900 000 thêm 100 000.",
    explanation: "900 000 + 100 000 = 1 000 000, đọc là một triệu.",
  },
  lienSau: {
    id: "thu-lien-sau",
    kind: "dien-so",
    parts: ["Số liền sau của 999 999 là", { answer: 1000000 }],
    hint: "Số liền sau hơn số đã cho 1 đơn vị.",
    explanation: "999 999 thêm 1 là 1 000 000.",
  },
  phanTich: {
    id: "thu-phan-tich",
    kind: "dien-so",
    parts: ["620 405 = 600 000 + 20 000 + 400 +", { answer: 5 }],
    hint: "Hàng nghìn là 0 nên không có số hạng nghìn. Hàng chục cũng là 0. Còn lại hàng đơn vị.",
    explanation: "620 405 = 600 000 + 20 000 + 400 + 5. Hàng nghìn và hàng chục là 0 nên bỏ qua.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Hoạt động",
    questions: [
      {
        id: "hd-1a",
        kind: "dien-so",
        prompt: "Hàng trăm nghìn là 7, chục nghìn là 4, nghìn là 0, trăm là 5, chục là 1, đơn vị là 8.",
        parts: ["Viết số:", { answer: 740518 }],
        hint: "Viết lần lượt các chữ số từ hàng trăm nghìn đến hàng đơn vị. Hàng nghìn là 0 nên cũng viết 0.",
        explanation: "7, 4, 0, 5, 1, 8 viết liền nhau là 740 518.",
      },
      fromNumber("hd-1b", 480206, "480 206"),
      {
        id: "hd-1c",
        kind: "dien-so",
        prompt: "Viết số: sáu trăm linh ba nghìn hai trăm mười lăm.",
        parts: ["Số đó là", { answer: 603215 }],
        hint: "Đọc đến “nghìn” là 603. Phần còn lại là 215.",
        explanation: "Sáu trăm linh ba nghìn là 603 nghìn; hai trăm mười lăm là 215. Số cần viết là 603 215.",
      },
      {
        id: "hd-1d",
        kind: "trac-nghiem",
        prompt: "Số 805 060 đọc là:",
        options: [
          "tám trăm linh năm nghìn không trăm sáu mươi",
          "tám trăm năm nghìn sáu mươi",
          "tám trăm linh năm nghìn sáu trăm",
          "tám trăm năm mươi nghìn không trăm sáu mươi",
        ],
        answerIndex: 0,
        hint: "Phần trước “nghìn” là 805, phần sau là 060. Hàng trăm của phần sau là 0.",
        explanation: "805 đọc là tám trăm linh năm; 060 đọc là không trăm sáu mươi. Cả số đọc là tám trăm linh năm nghìn không trăm sáu mươi.",
      },
      {
        id: "hd-2a",
        kind: "dien-so",
        prompt: "Mai có 2 tờ 100 000 đồng, 3 tờ 10 000 đồng, 4 tờ 1 000 đồng và 5 tờ 100 đồng.",
        parts: ["Mai có", { answer: 234500 }, "đồng."],
        hint: "Tính từng loại tờ: 2 tờ 100 000 đồng là 200 000 đồng, và cứ thế. Rồi cộng lại.",
        explanation: "200 000 + 30 000 + 4 000 + 500 = 234 500 (đồng).",
      },
      {
        id: "hd-2b",
        kind: "dien-so",
        prompt: "Nam có 3 tờ 100 000 đồng, 4 tờ 10 000 đồng và 2 tờ 100 đồng.",
        parts: ["Nam có", { answer: 340200 }, "đồng."],
        hint: "Nam không có tờ 1 000 đồng, nên hàng nghìn là 0.",
        explanation: "300 000 + 40 000 + 200 = 340 200 (đồng). Hàng nghìn và hàng chục đều là 0.",
      },
      {
        id: "hd-3",
        kind: "loi-van",
        prompt: "Một thư viện có 500 000 quyển sách. Mỗi năm thư viện mua thêm 27 000 quyển. (Số liệu giả định.)",
        lines: [
          ["Số sách ban đầu:", { answer: 500000 }, "quyển."],
          ["Số sách mua thêm mỗi năm:", { answer: 27000 }, "quyển."],
        ],
        hint: "Tìm số trong đoạn văn. Số nào nói về lúc ban đầu, số nào nói về mỗi năm?",
        explanation: "Ban đầu có 500 000 quyển. Mỗi năm mua thêm 27 000 quyển.",
      },
      {
        id: "hd-4a",
        kind: "dien-so",
        prompt: "Tia số: 100 000, 200 000, ①, ②, 500 000, ③. Điền số còn thiếu.",
        parts: ["① =", { answer: 300000 }, "; ② =", { answer: 400000 }, "; ③ =", { answer: 600000 }],
        hint: "Mỗi vạch hơn vạch trước 100 000.",
        explanation: "200 000 + 100 000 = 300 000; 300 000 + 100 000 = 400 000; 500 000 + 100 000 = 600 000.",
      },
      {
        id: "hd-4b",
        kind: "dien-so",
        prompt: "Tia số: 600 000, ①, 800 000, ②, 1 000 000. Điền số còn thiếu.",
        parts: ["① =", { answer: 700000 }, "; ② =", { answer: 900000 }],
        hint: "Mỗi vạch hơn vạch trước 100 000.",
        explanation: "600 000 + 100 000 = 700 000; 800 000 + 100 000 = 900 000. Vạch cuối là 1 000 000.",
      },
      {
        id: "hd-5",
        kind: "dien-so",
        prompt: "Viết số: sáu trăm linh ba nghìn bốn trăm linh chín; một triệu; tám trăm hai mươi ba nghìn không trăm mười bảy.",
        parts: [{ answer: 603409 }, ";", { answer: 1000000 }, ";", { answer: 823017 }],
        hint: "Viết từng số: phần trước “nghìn”, rồi phần sau “nghìn” gồm ba chữ số.",
        explanation: "603 409; 1 000 000; 823 017.",
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
        prompt: "Phân tích số 463 718.",
        parts: ["463 718 = 400 000 +", { answer: 60000 }, "+ 3 000 + 700 +", { answer: 10 }, "+ 8"],
        hint: "Chữ số 6 ở hàng chục nghìn, chữ số 1 ở hàng chục. Mỗi chữ số có giá trị theo hàng của nó.",
        explanation: "463 718 = 400 000 + 60 000 + 3 000 + 700 + 10 + 8.",
      },
      {
        id: "lt-1b",
        kind: "dien-so",
        parts: ["200 005 =", { answer: 200000 }, "+ 5"],
        hint: "Chỉ có hàng trăm nghìn và hàng đơn vị. Các hàng còn lại là 0.",
        explanation: "200 005 = 200 000 + 5.",
      },
      {
        id: "lt-1c",
        kind: "dien-so",
        parts: ["303 030 = 300 000 +", { answer: 3000 }, "+ 30"],
        hint: "Chữ số 3 thứ hai đứng ở hàng nghìn.",
        explanation: "303 030 = 300 000 + 3 000 + 30.",
      },
      {
        id: "lt-1d",
        kind: "dien-so",
        parts: ["480 000 = 400 000 +", { answer: 80000 }],
        hint: "Chữ số 8 ở hàng chục nghìn.",
        explanation: "480 000 = 400 000 + 80 000.",
      },
      {
        id: "lt-2",
        kind: "trac-nghiem",
        prompt: "Vòng quay may mắn có các số 1 000, 165 500, 250 000, 750 000, 900 000 và 1 000 000. Sự kiện nào có thể xảy ra khi quay?",
        options: ["Mũi tên chỉ vào số 750 000", "Mũi tên chỉ vào số 75 000", "Mũi tên chỉ vào số 705 000", "Mũi tên chỉ vào số 7 500 000"],
        answerIndex: 0,
        hint: "Tìm đúng số có trên vòng quay. Chú ý số chữ số của từng số.",
        explanation: "Trên vòng quay có số 750 000. Các số 75 000, 705 000 và 7 500 000 không ghi trên vòng quay.",
      },
      {
        id: "lt-3a",
        kind: "trac-nghiem",
        prompt: "Có sáu thẻ số 3, 0, 0, 4, 7, 5. Dùng cả sáu thẻ, số nào dưới đây là số chẵn?",
        options: ["300 475", "340 057", "704 053", "500 374"],
        answerIndex: 3,
        hint: "Số chẵn có chữ số tận cùng là 0, 2, 4, 6 hoặc 8. Nhìn chữ số hàng đơn vị.",
        explanation: "500 374 có chữ số tận cùng là 4 nên là số chẵn. Ba số còn lại tận cùng là 5, 7, 3 nên là số lẻ.",
      },
      {
        id: "lt-3b",
        kind: "dien-so",
        prompt: "Dùng cả sáu thẻ 3, 0, 0, 4, 7, 5, lập số lẻ bé nhất có sáu chữ số.",
        parts: ["Số đó là", { answer: 300457 }],
        hint: "Chữ số đầu không được là 0. Muốn số bé thì đặt chữ số nhỏ ở hàng cao. Hàng đơn vị phải là 3, 5 hoặc 7.",
        explanation: "Chữ số đầu là 3 (bé nhất khác 0), rồi hai chữ số 0, rồi 4, 5, 7 sao cho tận cùng là số lẻ: 300 457.",
      },
      {
        id: "lt-3c",
        kind: "dien-so",
        prompt: "Dùng cả sáu thẻ 3, 0, 0, 4, 7, 5, lập số chẵn lớn nhất có sáu chữ số.",
        parts: ["Số đó là", { answer: 754300 }],
        hint: "Hàng đơn vị phải là 0 hoặc 4. Đặt các chữ số lớn ở hàng cao. Thử cả hai cách chọn chữ số tận cùng rồi so sánh.",
        explanation: "Tận cùng là 0: 754 300. Tận cùng là 4: 753 004. Số 754 300 lớn hơn nên là đáp án.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-1",
        kind: "dien-so",
        prompt: "999 999 là số lớn nhất có sáu chữ số. Thêm 1 vào số đó.",
        parts: ["Được số", { answer: 1000000 }, "; số này có", { answer: 7 }, "chữ số."],
        hint: "Số liền sau của 999 999. Rồi đếm: một chữ số 1 và các chữ số 0.",
        explanation: "999 999 + 1 = 1 000 000. Số này có 1 chữ số 1 và 6 chữ số 0, tất cả 7 chữ số.",
      },
      {
        id: "sn-2",
        kind: "dien-so",
        prompt: "Nam viết “ba trăm nghìn bốn trăm” thành 3 400. Hãy viết lại cho đúng.",
        parts: ["Số đúng là", { answer: 300400 }],
        hint: "Ba trăm nghìn là 300 000. Hàng nghìn, chục nghìn không có thẻ thì ghi 0.",
        explanation: "300 000 + 400 = 300 400. Nam đã bỏ mất các chữ số 0 nên số chỉ có bốn chữ số.",
      },
      {
        id: "sn-3",
        kind: "dien-so",
        parts: ["1 000 000 gồm", { answer: 10 }, "thẻ 100 000."],
        hint: "Đếm thêm 100 000 từ 100 000 đến 1 000 000. Mỗi lần đếm là một thẻ.",
        explanation: "100 000, 200 000, …, 900 000, 1 000 000 là 10 lần đếm, nên 1 000 000 gồm 10 thẻ 100 000.",
      },
    ],
  },
];
