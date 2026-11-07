import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainMass, massHint, type MassUnit } from "@/lib/mass-units";
import { createElement } from "react";
import { BridgeCrossing } from "./_illustrations/bridge-crossing";
import { RiverBoat } from "./_illustrations/river-boat";

function conv(id: string, source: string, to: MassUnit, answer: number, prompt?: string): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: [`${source} =`, { answer }, to],
    conversion: { source, to },
    hint: massHint(source, to),
    explanation: explainMass(source, to),
  };
}

/** Phép tính với số đo cùng đơn vị. Đáp án được test tính lại từ `a`, `op`, `b`. */
function calc(id: string, a: number, op: "+" | "−" | "×" | ":", b: number, unit: MassUnit, answer: number, hint: string): FillQuestion {
  const left =
    op === "×" || op === ":"
      ? `${formatNumber(a)} ${unit} ${op} ${formatNumber(b)}`
      : `${formatNumber(a)} ${unit} ${op} ${formatNumber(b)} ${unit}`;
  return {
    id,
    kind: "dien-so",
    parts: [`${left} =`, { answer }, unit],
    hint,
    explanation: `${left} = ${formatNumber(answer)} ${unit}.`,
  };
}

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-nhan10",
    kind: "dien-so",
    parts: ["7 × 10 =", { answer: 70 }],
    hint: "Viết thêm một chữ số 0 vào bên phải số 7.",
    explanation: "7 × 10 = 70.",
  },
  {
    id: "kd-nhan100",
    kind: "dien-so",
    parts: ["6 × 100 =", { answer: 600 }],
    hint: "Viết thêm hai chữ số 0 vào bên phải số 6.",
    explanation: "6 × 100 = 600.",
  },
  {
    id: "kd-nhan1000",
    kind: "dien-so",
    parts: ["4 × 1 000 =", { answer: 4000 }],
    hint: "Viết thêm ba chữ số 0 vào bên phải số 4.",
    explanation: "4 × 1 000 = 4 000.",
  },
  {
    id: "kd-chia",
    kind: "dien-so",
    parts: ["800 : 10 =", { answer: 80 }],
    hint: "Bớt một chữ số 0 ở bên phải số 800.",
    explanation: "800 : 10 = 80.",
  },
  {
    id: "kd-gam",
    kind: "dien-so",
    parts: ["1 kg =", { answer: 1000 }, "g"],
    hint: "Con đã học: ki-lô-gam và gam ở lớp 3.",
    explanation: "1 kg = 1 000 g.",
  },
  {
    id: "kd-lam-tron",
    kind: "dien-so",
    prompt: "Làm tròn số 117 đến hàng chục.",
    parts: [{ answer: 120 }],
    hint: "Nhìn chữ số hàng đơn vị là 7. Từ 5 trở lên thì làm tròn lên.",
    explanation: "117 gần 120 hơn gần 110, nên làm tròn thành 120.",
  },
];

export const quickChecks = {
  tanTay: conv("dem-tan-tay", "190 tấn", "kg", 190000, "Cá voi xanh nặng tới 190 tấn. Con đổi sang ki-lô-gam nhé."),
  tach45: {
    id: "tach-45",
    kind: "dien-so",
    prompt: "4 yến 5 kg: 4 yến là 40 kg, cộng thêm 5 kg thì được bao nhiêu ki-lô-gam?",
    parts: ["4 yến 5 kg =", { answer: 45 }, "kg"],
    conversion: { source: "4 yến 5 kg", to: "kg" },
    hint: "Lấy 40 cộng 5.",
    explanation: "4 yến = 40 kg. 40 + 5 = 45 kg. Không được viết liền 4 và 5.",
  },
  tach6040: {
    id: "tach-6040",
    kind: "dien-so",
    prompt: "6 tấn 40 kg: 6 tấn là 6 000 kg, cộng thêm 40 kg thì được bao nhiêu ki-lô-gam?",
    parts: ["6 tấn 40 kg =", { answer: 6040 }, "kg"],
    conversion: { source: "6 tấn 40 kg", to: "kg" },
    hint: "Lấy 6 000 cộng 40.",
    explanation: "6 tấn = 6 000 kg. 6 000 + 40 = 6 040 kg.",
  },
  thang30: conv("thang-30", "3 tấn", "tạ", 30),
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "yen-ta-tan",
    title: "Yến, tạ, tấn",
    questions: [
      conv("yen-1", "3 yến", "kg", 30),
      conv("yen-2", "5 tạ", "kg", 500),
      conv("yen-3", "4 tấn", "kg", 4000),
      conv("yen-4", "60 kg", "yến", 6),
      conv("yen-5", "700 kg", "tạ", 7),
      conv("yen-6", "9 000 kg", "tấn", 9),
      conv("yen-7", "6 tạ", "yến", 60),
      conv("yen-8", "8 tấn", "tạ", 80),
      conv("yen-9", "50 yến", "tạ", 5),
      conv("yen-10", "20 tạ", "tấn", 2),
      conv("yen-11", "3 tấn", "yến", 300),
      {
        id: "yen-chon",
        kind: "noi-cap",
        prompt: "Chọn số đo thích hợp cho mỗi con vật, đồ vật.",
        pairs: [
          { left: "Một con gà", right: "2 kg" },
          { left: "Một bao xi măng", right: "5 yến" },
          { left: "Một con lợn lớn", right: "1 tạ" },
          { left: "Xe tải chở được nhiều nhất", right: "5 tấn" },
        ],
        rightOrder: [1, 0, 3, 2],
        hint: "Hình dung vật nhẹ hay nặng, rồi chọn đơn vị phù hợp: kg cho vật nhẹ, tấn cho vật rất nặng.",
        explanation: "Con gà nặng vài ki-lô-gam. Bao xi măng 5 yến là 50 kg. Con lợn lớn khoảng 1 tạ, tức 100 kg. Xe tải chở hàng nghìn ki-lô-gam, tính bằng tấn.",
      },
    ],
  },
  {
    id: "so-do-ghep",
    title: "Số đo có hai đơn vị",
    questions: [
      conv("ghep-1", "6 yến 3 kg", "kg", 63),
      conv("ghep-2", "2 tạ 7 kg", "kg", 207),
      conv("ghep-3", "3 tấn 90 kg", "kg", 3090),
      conv("ghep-4", "5 tạ 4 yến", "yến", 54),
      conv("ghep-5", "7 tấn 3 tạ", "tạ", 73),
      conv("ghep-6", "2 tấn 30 yến", "yến", 230),
      {
        id: "ghep-cua",
        kind: "trac-nghiem",
        prompt:
          "Rô-bốt chọn một trong ba ô cửa. Sau mỗi ô cửa là một trong ba con vật: con dê trắng nặng 7 yến, con dê đen nặng 40 kg, con bò nặng 3 tạ. Câu nào đúng?",
        options: [
          "Phía sau cánh cửa Rô-bốt chọn chắc chắn có con bò nặng 30 kg",
          "Phía sau cánh cửa Rô-bốt chọn có thể có con dê đen nặng 4 tạ",
          "Phía sau cánh cửa Rô-bốt chọn có thể có con dê trắng nặng 70 kg",
        ],
        answerIndex: 2,
        hint: "Đổi cân nặng của từng con vật sang ki-lô-gam rồi so với từng câu.",
        explanation: "Dê trắng 7 yến = 70 kg. Dê đen nặng 40 kg. Bò 3 tạ = 300 kg. Chỉ câu nói dê trắng nặng 70 kg là đúng.",
      },
    ],
  },
  {
    id: "tinh-toan",
    title: "Tính và bài toán",
    questions: [
      calc("tinh-1", 82, "−", 35, "tấn", 47, "Con tính 82 − 35 như với số bình thường, rồi viết đơn vị tấn."),
      calc("tinh-2", 24, "+", 58, "tạ", 82, "Cộng hai số 24 và 58, đơn vị vẫn là tạ."),
      calc("tinh-3", 15, "×", 6, "yến", 90, "Tính 15 × 6, đơn vị vẫn là yến."),
      calc("tinh-4", 126, ":", 3, "tấn", 42, "Chia 126 cho 3, đơn vị vẫn là tấn."),
      calc("tinh-5", 214, "+", 86, "tấn", 300, "Cộng 214 và 86, đơn vị vẫn là tấn."),
      calc("tinh-6", 430, "−", 245, "yến", 185, "Trừ 430 cho 245, đơn vị vẫn là yến."),
      calc("tinh-7", 30, "×", 4, "tấn", 120, "Tính 3 × 4 trước, rồi viết thêm một chữ số 0."),
      calc("tinh-8", 3600, ":", 9, "tạ", 400, "Tính 36 : 9 trước, rồi viết thêm hai chữ số 0."),
      {
        id: "so-sanh-sap",
        kind: "trac-nghiem",
        prompt: "Sắp xếp các khối lượng sau theo thứ tự từ nhẹ đến nặng: 2 tạ, 150 kg, 1 tấn, 30 yến.",
        options: [
          "150 kg, 2 tạ, 30 yến, 1 tấn",
          "1 tấn, 30 yến, 2 tạ, 150 kg",
          "2 tạ, 150 kg, 1 tấn, 30 yến",
          "150 kg, 30 yến, 2 tạ, 1 tấn",
        ],
        answerIndex: 0,
        hint: "Đổi tất cả sang ki-lô-gam rồi so sánh.",
        explanation: "2 tạ = 200 kg. 30 yến = 300 kg. 1 tấn = 1 000 kg. Từ nhẹ đến nặng: 150 kg, 200 kg, 300 kg, 1 000 kg.",
      },
      {
        id: "xe-chay",
        kind: "loi-van",
        prompt: "Một chiếc xe chở được nhiều nhất 6 tạ. Trên xe đã có 200 kg gạo. Người ta xếp thêm 80 thùng, mỗi thùng nặng 4 kg. Tính tổng khối lượng trên xe.",
        lines: [
          ["6 tạ =", { answer: 600 }, "kg"],
          ["80 thùng nặng: 80 × 4 =", { answer: 320 }, "kg"],
          ["Tổng khối lượng: 200 + 320 =", { answer: 520 }, "kg"],
        ],
        hint: "Đổi 6 tạ sang ki-lô-gam. Tính 80 thùng nặng bao nhiêu. Cuối cùng cộng với 200 kg gạo.",
        explanation: "6 tạ = 600 kg. 80 × 4 = 320 kg. 200 + 320 = 520 kg.",
      },
      {
        id: "xe-duoc",
        kind: "trac-nghiem",
        prompt: "Xe chở được nhiều nhất 6 tạ. Xe có chở được 520 kg không?",
        options: ["Chở được, vì 520 kg nhỏ hơn 600 kg", "Không chở được, vì 520 lớn hơn 6"],
        answerIndex: 0,
        hint: "Đổi 6 tạ sang ki-lô-gam rồi so sánh với 520 kg.",
        explanation: "6 tạ = 600 kg và 520 kg nhỏ hơn 600 kg, nên xe chở được. Không so 520 với 6, vì hai số khác đơn vị.",
      },
      {
        id: "tong-can",
        kind: "loi-van",
        prompt: "Tổng cân nặng của bố, mẹ và con là 2 tạ. Tổng cân nặng của bố và mẹ là 150 kg. Con nặng bao nhiêu ki-lô-gam?",
        lines: [
          ["2 tạ =", { answer: 200 }, "kg"],
          ["Cân nặng của con: 200 − 150 =", { answer: 50 }, "kg"],
        ],
        hint: "Đổi 2 tạ sang ki-lô-gam, rồi lấy tổng của cả ba người trừ đi cân nặng của bố và mẹ.",
        explanation: "2 tạ = 200 kg. Con nặng 200 − 150 = 50 kg.",
      },
      {
        id: "cau-voi",
        kind: "trac-nghiem",
        prompt:
          "Voi con nặng 3 tạ cần sang bờ bên kia. Voi không được đi qua cầu ghi số đo bé hơn cân nặng của nó. Voi phải đi qua những cầu nào, theo thứ tự từ bờ dưới lên bờ trên?",
        illustration: createElement(BridgeCrossing),
        options: [
          "28 yến → 1 tấn → 35 yến",
          "3 tạ 20 kg → 1 tấn → 35 yến",
          "3 tạ 20 kg → 1 tấn → 25 yến",
          "2 tạ → 1 tấn → 35 yến",
        ],
        answerIndex: 1,
        hint: "Đổi số đo trên từng cầu sang ki-lô-gam. Cầu nào có số đo bé hơn 300 kg thì voi không đi qua được.",
        explanation:
          "Voi nặng 300 kg. 28 yến = 280 kg, 2 tạ = 200 kg và 25 yến = 250 kg đều bé hơn 300 kg. Chỉ còn cầu 3 tạ 20 kg (320 kg), cầu 1 tấn và cầu 35 yến (350 kg).",
      },
    ],
  },
  {
    id: "tu-duy",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "td-gap-yen",
        kind: "dien-so",
        parts: ["1 yến gấp 1 kg", { answer: 10 }, "lần"],
        hint: "1 yến bằng bao nhiêu ki-lô-gam?",
        explanation: "1 yến = 10 kg, nên 1 yến gấp 1 kg 10 lần.",
      },
      {
        id: "td-gap-tan-yen",
        kind: "dien-so",
        parts: ["1 tấn gấp 1 yến", { answer: 100 }, "lần"],
        hint: "1 tấn bằng bao nhiêu yến?",
        explanation: "1 tấn = 10 tạ và 1 tạ = 10 yến, nên 1 tấn = 100 yến. Đi hai bậc thì gấp 10 × 10 = 100 lần.",
      },
      {
        id: "td-gap-190",
        kind: "dien-so",
        prompt: "Cá voi xanh nặng 190 tấn. Con ơi, 190 tấn gấp 190 kg bao nhiêu lần?",
        parts: [{ answer: 1000 }, "lần"],
        hint: "1 tấn bằng bao nhiêu ki-lô-gam?",
        explanation: "1 tấn = 1 000 kg, nên 190 tấn = 190 000 kg và gấp 190 kg 1 000 lần.",
      },
      {
        id: "td-loi-405",
        kind: "trac-nghiem",
        prompt: "Bạn Nam viết: 4 yến 5 kg = 405 kg. Nam sai ở đâu?",
        options: [
          "4 yến là 40 kg, không phải 400 kg; 40 + 5 = 45 kg",
          "Nam phải viết 4 yến 5 kg = 9 kg",
          "Nam không sai",
        ],
        answerIndex: 0,
        hint: "Đổi 4 yến sang ki-lô-gam trước. 1 yến là bao nhiêu ki-lô-gam?",
        explanation: "1 yến = 10 kg nên 4 yến = 40 kg. 40 + 5 = 45 kg, không phải 405 kg.",
      },
      {
        id: "td-loi-505",
        kind: "trac-nghiem",
        prompt: "Bạn Mai viết: 5 tạ 5 kg = 55 kg. Mai sai ở đâu?",
        options: [
          "5 tạ là 500 kg, không phải 50 kg; 500 + 5 = 505 kg",
          "5 tạ là 5 000 kg nên phải viết 5 005 kg",
          "Mai không sai",
        ],
        answerIndex: 0,
        hint: "1 tạ là bao nhiêu ki-lô-gam? Đổi 5 tạ trước.",
        explanation: "1 tạ = 100 kg nên 5 tạ = 500 kg. 500 + 5 = 505 kg.",
      },
      {
        id: "td-loi-so-sanh",
        kind: "trac-nghiem",
        prompt: "Bạn Lan nói: “30 tạ nặng hơn 3 tấn vì 30 lớn hơn 3.” Vì sao Lan chưa đúng?",
        options: [
          "3 tấn = 30 tạ nên hai khối lượng bằng nhau; phải đổi cùng đơn vị rồi mới so",
          "3 tấn nặng hơn 30 tạ vì tấn là đơn vị lớn",
          "Lan đúng",
        ],
        answerIndex: 0,
        hint: "Đổi 3 tấn sang tạ, hoặc đổi cả hai sang ki-lô-gam.",
        explanation: "1 tấn = 10 tạ nên 3 tấn = 30 tạ. Hai khối lượng bằng nhau. Chỉ so sánh số khi hai số đo cùng đơn vị.",
      },
    ],
  },
  {
    id: "nang-cao",
    title: "Nâng cao: thuyền chở ba người",
    questions: [
      {
        id: "nc-tong",
        kind: "dien-so",
        prompt:
          "Một chiếc thuyền chở được nhiều nhất 1 tạ, và phải có người chèo. Ba người cần sang sông, nặng 44 kg, 48 kg và 55 kg. Tổng cân nặng của ba người là bao nhiêu?",
        illustration: createElement(RiverBoat),
        parts: ["44 + 48 + 55 =", { answer: 147 }, "kg"],
        hint: "Cộng cân nặng của cả ba người.",
        explanation: "44 + 48 + 55 = 147 kg. 1 tạ = 100 kg và 147 kg lớn hơn 100 kg, nên ba người không thể đi cùng một chuyến.",
      },
      {
        id: "nc-cap",
        kind: "trac-nghiem",
        prompt: "Thuyền chở được nhiều nhất 1 tạ (100 kg). Hai người nào không thể đi cùng một chuyến?",
        options: ["44 kg và 48 kg", "44 kg và 55 kg", "48 kg và 55 kg"],
        answerIndex: 2,
        hint: "Cộng cân nặng từng cặp người rồi so với 100 kg.",
        explanation: "44 + 48 = 92 kg. 44 + 55 = 99 kg. 48 + 55 = 103 kg, lớn hơn 100 kg nên hai người này không đi cùng nhau.",
      },
      {
        id: "nc-chuyen",
        kind: "trac-nghiem",
        prompt: "Cách chia chuyến nào giúp cả ba người sang sông an toàn?",
        illustration: createElement(RiverBoat),
        options: [
          "48 kg và 55 kg sang; 48 kg về; 48 kg và 44 kg sang",
          "44 kg và 48 kg sang; 44 kg về; 44 kg và 55 kg sang",
          "44 kg và 48 kg sang; 48 kg về; 48 kg và 55 kg sang",
          "44 kg và 48 kg sang; 44 kg về; 44 kg sang",
        ],
        answerIndex: 1,
        hint: "Mỗi chuyến phải không quá 100 kg, và sau chuyến đầu phải có một người chèo thuyền quay về.",
        explanation:
          "Chuyến 1: 44 kg và 48 kg (92 kg). Chuyến 2: 44 kg chèo về. Chuyến 3: 44 kg và 55 kg (99 kg). Hai cách đầu và thứ ba có chuyến 103 kg, quá 1 tạ. Cách cuối bỏ lại người nặng 55 kg.",
      },
      {
        id: "nc-so-chuyen",
        kind: "dien-so",
        prompt: "Tính cả chuyến chèo thuyền quay về, ít nhất cần mấy chuyến để cả ba người sang sông?",
        parts: [{ answer: 3 }, "chuyến"],
        hint: "Một chuyến không đủ vì 147 kg lớn hơn 100 kg. Hai chuyến thì thuyền ở lại bờ cũ.",
        explanation: "Chuyến sang, chuyến về, rồi chuyến sang nữa: 3 chuyến.",
      },
    ],
  },
];
