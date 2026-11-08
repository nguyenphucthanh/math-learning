import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { convertArea, conversionHint, explainConversion, formatNumber, type AreaUnit } from "@/lib/area-units";
import { explainMass, massHint, toKg, type MassUnit } from "@/lib/mass-units";
import { explainTime, timeHint, type TimeUnit } from "@/lib/time-units";
import { createElement } from "react";
import { TamGiacABM } from "./_illustrations/tam-giac";

const n = formatNumber;
const AREA_UNITS: string[] = ["m²", "dm²", "cm²", "mm²"];
const MASS_UNITS: string[] = ["kg", "yến", "tạ", "tấn"];

/** Câu đổi đơn vị. Thư viện đơn vị được chọn theo đơn vị đích. */
function conv(id: string, source: string, to: AreaUnit | MassUnit | TimeUnit, answer: number): FillQuestion {
  const [hint, explanation] = AREA_UNITS.includes(to)
    ? [conversionHint(source, to as AreaUnit), explainConversion(source, to as AreaUnit)]
    : MASS_UNITS.includes(to)
      ? [massHint(source, to as MassUnit), explainMass(source, to as MassUnit)]
      : [timeHint(source, to as TimeUnit), explainTime(source, to as TimeUnit)];
  return { id, kind: "dien-so", parts: [`${source} =`, { answer }, to], conversion: { source, to }, hint, explanation };
}

/** Phép cộng, trừ, nhân, chia số đo cùng đơn vị. Đáp án tính từ hai số, không gõ tay. */
export function calc(id: string, a: number, op: "+" | "−" | "×" | ":", b: number, unit: string, hint: string): FillQuestion {
  const result = op === "+" ? a + b : op === "−" ? a - b : op === "×" ? a * b : a / b;
  const left = op === "×" || op === ":" ? `${n(a)} ${unit} ${op} ${b}` : `${n(a)} ${unit} ${op} ${n(b)} ${unit}`;
  return {
    id,
    kind: "dien-so",
    parts: [`${left} =`, { answer: result }, unit],
    hint,
    explanation: `${n(a)} ${op} ${n(b)} = ${n(result)}, nên ${left} = ${n(result)} ${unit}.`,
  };
}

const SIGNS = [">", "<", "="];
const signOf = (left: number, right: number) => (left > right ? ">" : left < right ? "<" : "=");

/** So sánh hai số đo: `lv` và `rv` là hai số đo đã đổi về cùng một đơn vị `unit`. */
export function cmp(id: string, left: string, right: string, lv: number, rv: number, unit: string, hint: string): ChoiceQuestion {
  return {
    id,
    kind: "trac-nghiem",
    prompt: `${left} ? ${right}`,
    options: SIGNS,
    answerIndex: SIGNS.indexOf(signOf(lv, rv)),
    hint,
    explanation: `Đổi về cùng đơn vị ${unit}: ${left} = ${n(lv)} ${unit}, ${right} = ${n(rv)} ${unit}. Vì ${n(lv)} ${signOf(lv, rv)} ${n(rv)} nên dấu cần điền là ${signOf(lv, rv)}.`,
  };
}

const cmpMass = (id: string, left: string, right: string, hint: string) => cmp(id, left, right, toKg(left), toKg(right), "kg", hint);
const cmpArea = (id: string, left: string, right: string, unit: AreaUnit, hint: string) =>
  cmp(id, left, right, convertArea(left, unit), convertArea(right, unit), unit, hint);

const SAME_UNIT_HINT = "Đổi cả hai số đo về cùng một đơn vị rồi mới so sánh.";

/** Bài toán con bê, con bò, con voi (SGK tr. 125 bài 4), đổi số liệu: tổng của bê và bò là 500 kg. */
export const animals = { be: toKg("1 tạ 30 kg"), bonHon: 240 };
export const beBo = { bo: animals.be + animals.bonHon, tong: animals.be + animals.be + animals.bonHon };

/** Bài toán mảnh đất (SGK tr. 126 bài 5), đổi số liệu. */
export const field = { dai: 18, hon: 7 };

/** Câu thử trong phần Nhắc lại nhanh, mỗi điểm một câu. Không tính vào tiến độ. */
export const quickChecks = {
  mass: conv("qc-khoi-luong", "2 tấn", "tạ", 20),
  area: conv("qc-dien-tich", "2 m²", "dm²", 200),
  compare: cmpMass("qc-so-sanh", "2 tạ 50 kg", "205 kg", "Đổi cả hai về ki-lô-gam. 1 tạ = 100 kg."),
  time: conv("qc-thoi-gian", "2 phút", "giây", 120),
  angle: {
    id: "qc-goc",
    kind: "trac-nghiem",
    prompt: "Góc lớn hơn góc vuông nhưng nhỏ hơn góc bẹt là góc gì?",
    options: ["Góc nhọn", "Góc tù", "Góc bẹt"],
    answerIndex: 1,
    hint: "Góc nhọn bé hơn góc vuông. Góc bẹt là một đường thẳng.",
    explanation: "Góc vuông là 90°, góc bẹt là 180°. Góc nằm giữa hai góc đó là góc tù.",
  },
  rectangle: {
    id: "qc-chu-nhat",
    kind: "dien-so",
    prompt: "Một hình chữ nhật dài 9 cm, rộng 5 cm.",
    parts: ["Diện tích là", { answer: 9 * 5 }, "cm²"],
    hint: "Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.",
    explanation: "9 × 5 = 45 cm².",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "khoi-luong",
    title: "Khối lượng (trang 125)",
    unit: "ta",
    questions: [
      conv("kl-1", "3 yến", "kg", 30),
      conv("kl-2", "700 kg", "tạ", 7),
      conv("kl-3", "5 tấn", "tạ", 50),
      conv("kl-4", "8 tấn", "kg", 8000),
      conv("kl-5", "6 tạ 40 kg", "kg", 640),
      conv("kl-6", "2 tấn 5 tạ", "tạ", 25),
      calc("kl-7", 6, "+", 9, "yến", "Cộng hai số đo cùng đơn vị: cộng hai số rồi giữ nguyên đơn vị."),
      calc("kl-8", 52, "−", 38, "tấn", "Trừ hai số đo cùng đơn vị: trừ hai số rồi giữ nguyên đơn vị."),
      calc("kl-9", 4, "×", 6, "tạ", "Nhân số đo với một số: nhân số đứng trước, giữ nguyên đơn vị."),
      calc("kl-10", 28, ":", 4, "tạ", "Chia số đo cho một số: chia số đứng trước, giữ nguyên đơn vị."),
      cmpMass("kl-11", "7 tạ 3 yến", "735 kg", SAME_UNIT_HINT),
      cmpMass("kl-12", "3 tấn 4 tạ", "3 350 kg", SAME_UNIT_HINT),
      cmp("kl-13", "4 kg 300 g", "4 300 g", 4 * 1000 + 300, 4300, "g", "1 kg = 1 000 g. Đổi cả hai về gam."),
      {
        id: "kl-bt",
        kind: "loi-van",
        prompt: `Con bê cân nặng 1 tạ 30 kg. Con bò nặng hơn con bê là ${animals.bonHon} kg. Hỏi con bò và con bê nặng tất cả bao nhiêu ki-lô-gam? Một con voi nặng gấp đôi tổng số cân nặng của con bò và con bê. Hỏi con voi cân nặng mấy tấn?`,
        lines: [
          [`Con bê: 1 tạ 30 kg =`, { answer: animals.be }, "(kg)"],
          [`Con bò: ${animals.be} + ${animals.bonHon} =`, { answer: beBo.bo }, "(kg)"],
          [`Cả bê và bò: ${animals.be} + ${beBo.bo} =`, { answer: beBo.tong }, "(kg)"],
          [`Con voi: ${beBo.tong} × 2 =`, { answer: beBo.tong * 2 }, "(kg)"],
          [`Đổi: ${n(beBo.tong * 2)} kg =`, { answer: beBo.tong * 2 / 1000 }, "(tấn)"],
        ],
        hint: "Đổi cân nặng con bê ra ki-lô-gam trước. Con bò = con bê + phần nặng hơn. Con voi gấp đôi tổng, rồi đổi ki-lô-gam ra tấn (1 tấn = 1 000 kg).",
        explanation: `1 tạ 30 kg = 130 kg. Con bò nặng 130 + ${animals.bonHon} = ${beBo.bo} kg. Cả hai nặng 130 + ${beBo.bo} = ${beBo.tong} kg. Con voi nặng ${beBo.tong} × 2 = ${n(beBo.tong * 2)} kg = 1 tấn.`,
      },
    ],
  },
  {
    id: "dien-tich",
    title: "Diện tích (trang 126)",
    unit: "m2",
    questions: [
      conv("dt-1", "7 cm²", "mm²", 700),
      conv("dt-2", "900 mm²", "cm²", 9),
      conv("dt-3", "3 dm²", "cm²", 300),
      conv("dt-4", "600 cm²", "dm²", 6),
      conv("dt-5", "9 m²", "dm²", 900),
      conv("dt-6", "4 m²", "cm²", 40000),
      conv("dt-7", "2 dm² 8 cm²", "cm²", 208),
      conv("dt-8", "3 m² 7 dm²", "dm²", 307),
      calc("dt-9", 40, "+", 25, "mm²", "Cộng hai số đo cùng đơn vị: cộng hai số rồi giữ nguyên đơn vị."),
      calc("dt-10", 82, "−", 49, "cm²", "Trừ hai số đo cùng đơn vị: trừ hai số rồi giữ nguyên đơn vị."),
      calc("dt-11", 7, "×", 5, "m²", "Nhân số đo với một số: nhân số đứng trước, giữ nguyên đơn vị."),
      calc("dt-12", 48, ":", 6, "dm²", "Chia số đo cho một số: chia số đứng trước, giữ nguyên đơn vị."),
      cmpArea("dt-13", "3 cm² 20 mm²", "320 mm²", "mm²", SAME_UNIT_HINT),
      cmpArea("dt-14", "5 dm² 20 cm²", "6 dm²", "cm²", SAME_UNIT_HINT),
      cmpArea("dt-15", "7 dm² 5 cm²", "700 cm²", "cm²", SAME_UNIT_HINT),
    ],
  },
  {
    id: "thoi-gian",
    title: "Thời gian (trang 126)",
    unit: "second",
    questions: [
      conv("tg-1", "2 phút 20 giây", "giây", 140),
      conv("tg-2", "180 giây", "phút", 3),
      conv("tg-3", "5 thế kỉ", "năm", 500),
      conv("tg-4", "300 năm", "thế kỉ", 3),
    ],
  },
  {
    id: "goc-canh",
    title: "Góc và cạnh (trang 126)",
    questions: [
      {
        id: "gc-b",
        kind: "trac-nghiem",
        prompt: "Nhìn hình, góc đỉnh B (hai cạnh BA và BC) là góc gì?",
        options: ["Góc nhọn", "Góc vuông", "Góc tù"],
        answerIndex: 0,
        hint: "So góc với góc vuông của ê ke. Góc nhỏ hơn góc vuông là góc nhọn.",
        explanation: "Góc đỉnh B nhỏ hơn góc vuông, nên là góc nhọn. Đo bằng thước đo góc được khoảng 60°.",
        illustration: createElement(TamGiacABM),
      },
      {
        id: "gc-amb",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh M, hai cạnh MA và MB, là góc gì?",
        options: ["Góc nhọn", "Góc vuông", "Góc tù"],
        answerIndex: 0,
        hint: "So góc AMB với góc vuông của ê ke.",
        explanation: "Góc đỉnh M, cạnh MA và MB, nhỏ hơn góc vuông, nên là góc nhọn (khoảng 74°).",
        illustration: createElement(TamGiacABM),
      },
      {
        id: "gc-amc",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh M, hai cạnh MA và MC, là góc gì?",
        options: ["Góc nhọn", "Góc vuông", "Góc tù"],
        answerIndex: 2,
        hint: "Hai góc AMB và AMC ghép lại thành góc bẹt. Góc AMB nhọn thì góc AMC thế nào?",
        explanation: "Góc đỉnh M, cạnh MA và MC, lớn hơn góc vuông nhưng nhỏ hơn góc bẹt, nên là góc tù (khoảng 106°).",
        illustration: createElement(TamGiacABM),
      },
      {
        id: "gc-bc",
        kind: "dien-so",
        prompt: "M nằm trên cạnh BC. BM dài 3 cm, MC dài 5 cm.",
        parts: ["Cạnh BC dài", { answer: 3 + 5 }, "cm"],
        hint: "BC gồm hai đoạn BM và MC nối liền nhau. Cộng độ dài hai đoạn.",
        explanation: "BC = BM + MC = 3 + 5 = 8 cm.",
        illustration: createElement(TamGiacABM),
      },
    ],
  },
  {
    id: "bai-toan",
    title: "Giải toán (trang 126)",
    questions: [
      {
        id: "bt-manh-dat",
        kind: "loi-van",
        prompt: `Mảnh đất trồng rau hình chữ nhật có chiều dài ${field.dai} m, chiều dài hơn chiều rộng ${field.hon} m. Tính diện tích của mảnh đất đó.`,
        lines: [
          [`Chiều rộng: ${field.dai} − ${field.hon} =`, { answer: field.dai - field.hon }, "(m)"],
          [`Diện tích: ${field.dai} × ${field.dai - field.hon} =`, { answer: field.dai * (field.dai - field.hon) }, "(m²)"],
        ],
        hint: "Tìm chiều rộng trước: chiều dài trừ phần hơn. Rồi nhân chiều dài với chiều rộng.",
        explanation: `Chiều rộng là ${field.dai} − ${field.hon} = ${field.dai - field.hon} m. Diện tích là ${field.dai} × ${field.dai - field.hon} = ${field.dai * (field.dai - field.hon)} m².`,
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-1",
        kind: "trac-nghiem",
        prompt: "Lan viết 3 m² = 30 dm². Lan đã sai. Cách sửa đúng là:",
        options: [
          "1 m² = 10 dm², nên 3 m² = 30 dm² là đúng",
          `1 m² = 100 dm², nên 3 m² = 300 dm²`,
          `1 m² = ${n(1000)} dm², nên 3 m² = ${n(3000)} dm²`,
        ],
        answerIndex: 1,
        hint: "Một mét vuông là hình vuông chia thành 10 hàng, mỗi hàng 10 ô đề-xi-mét vuông. Có bao nhiêu ô tất cả?",
        explanation: "10 × 10 = 100 ô, nên 1 m² = 100 dm² và 3 m² = 300 dm². Đơn vị diện tích nhảy 100, không nhảy 10 như khối lượng.",
      },
      {
        id: "sn-2",
        kind: "dien-so",
        prompt: "Một xe chở 4 tạ gạo mỗi chuyến. Xe chở 5 chuyến như thế.",
        parts: ["Tất cả chở được", { answer: 4 * 5 }, "tạ, tức là", { answer: (4 * 5) / 10 }, "tấn."],
        hint: "Nhân số tạ của mỗi chuyến với số chuyến, rồi đổi tạ ra tấn: 1 tấn = 10 tạ.",
        explanation: "4 × 5 = 20 tạ. 1 tấn = 10 tạ nên 20 tạ = 20 : 10 = 2 tấn.",
      },
      {
        id: "sn-3",
        kind: "dien-so",
        prompt: "Một tấm bìa hình vuông cạnh 10 cm.",
        parts: ["Diện tích là", { answer: 10 * 10 }, "cm², tức là", { answer: (10 * 10) / 100 }, "dm²."],
        hint: "Diện tích hình vuông bằng cạnh nhân cạnh. Rồi đổi: 1 dm² = 100 cm².",
        explanation: "10 × 10 = 100 cm². Vì 1 dm² = 100 cm² nên 100 cm² = 1 dm². Hình vuông cạnh 10 cm cũng là hình vuông cạnh 1 dm.",
      },
    ],
  },
];
