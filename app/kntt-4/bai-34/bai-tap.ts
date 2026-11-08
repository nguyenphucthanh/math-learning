import type { ChoiceQuestion, DatTinhQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { SoDoDon } from "@/components/math/so-do-don";
import { formatNumber } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { explainColumnSub } from "@/lib/column-sub";
import { createElement } from "react";

const n = formatNumber;

/** Tính giá trị biểu thức chỉ có số, dấu +, −, - và ngoặc (tính từ trái sang phải, ngoặc trước). */
export function evalExpr(text: string): number {
  const tokens = text.replace(/[\s ]+(?=\d)/g, "").match(/\d+|[+\-−()]/g) ?? [];
  let at = 0;
  const term = (): number => {
    const token = tokens[at++];
    if (token === "(") {
      const value = expr();
      at++;
      return value;
    }
    return Number(token);
  };
  const expr = (): number => {
    let value = term();
    while (tokens[at] === "+" || tokens[at] === "−" || tokens[at] === "-") {
      const op = tokens[at++];
      const right = term();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  };
  return expr();
}

/** Số bé và số lớn từ tổng và hiệu. Tổng và hiệu phải cùng chẵn hoặc cùng lẻ. */
export function solve(total: number, diff: number) {
  const small = (total - diff) / 2;
  return { small, big: small + diff };
}

const ADD_HINT = "Cộng từ hàng đơn vị sang trái. Hàng nào cộng được từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng bên trái.";
const SUB_HINT =
  "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.";

function add(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) };
}

function sub(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) };
}

/** Tính nhẩm: đáp án tính từ biểu thức, không gõ tay. */
function mental(id: string, text: string, hint: string, explanation: string): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: "Tính nhẩm.",
    parts: [`${text} =`, { answer: evalExpr(text) }],
    hint,
    explanation,
  };
}

const SIGNS = [">", "<", "="];
const signOf = (left: number, right: number) => (left > right ? ">" : left < right ? "<" : "=");

/** Câu so sánh hai biểu thức: tính từng vế rồi so. */
function compare(id: string, left: string, right: string, hint: string): ChoiceQuestion {
  const l = evalExpr(left);
  const r = evalExpr(right);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `${left} ? ${right}`,
    options: SIGNS,
    answerIndex: SIGNS.indexOf(signOf(l, r)),
    hint,
    explanation: `Vế trái: ${left} = ${n(l)}. Vế phải: ${right} = ${n(r)}. Vì ${n(l)} ${signOf(l, r)} ${n(r)} nên dấu cần điền là ${signOf(l, r)}.`,
  };
}

/** Câu Đúng hay Sai: đề viết sẵn kết quả, đáp án suy ra từ biểu thức. */
function claim(id: string, text: string, shown: number, hint: string): ChoiceQuestion {
  const real = evalExpr(text);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `${text} = ${n(shown)}. Phép tính này đúng hay sai?`,
    options: ["Đúng", "Sai"],
    answerIndex: real === shown ? 0 : 1,
    hint,
    explanation:
      real === shown
        ? `${text} = ${n(real)}, đúng bằng kết quả đã viết nên phép tính đúng.`
        : `${text} = ${n(real)}, không phải ${n(shown)} nên phép tính sai.`,
  };
}

/** Các biểu thức của câu "lớn nhất, bé nhất" (SGK trang 118 Bài 3). */
export const letters = ["A", "B", "C", "D"] as const;
export const expressions = [
  `${n(80000)} + ${n(40000)} + ${n(6321)}`,
  `${n(452689)} − (${n(300000)} − ${n(50000)})`,
  `${n(367400)} + ${n(300000)} − ${n(450000)}`,
  `${n(320000)} − ${n(120000)} + ${n(5860)}`,
];

const extremum = (id: string, word: "lớn nhất" | "bé nhất"): ChoiceQuestion => {
  const values = expressions.map(evalExpr);
  const target = word === "lớn nhất" ? Math.max(...values) : Math.min(...values);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Biểu thức nào dưới đây có giá trị ${word}?`,
    options: expressions.map((text, index) => `${letters[index]}. ${text}`),
    answerIndex: values.indexOf(target),
    hint: "Tính giá trị từng biểu thức, nhớ làm trong ngoặc trước, rồi so sánh bốn số.",
    explanation: `${letters.map((letter, index) => `${letter} = ${n(values[index])}`).join("; ")}. Giá trị ${word} là ${n(target)}, của biểu thức ${letters[values.indexOf(target)]}.`,
  };
};

/** Giá các món đồ (đồng) của câu mua đồ. */
export const prices = { mu: 45000, dep: 80000, xepHinh: 130000, gauBong: 60000 };

const combos: { label: string; items: (keyof typeof prices)[] }[] = [
  { label: "Cái mũ, đôi dép, hộp đồ chơi xếp hình", items: ["mu", "dep", "xepHinh"] },
  { label: "Cái mũ, đôi dép, gấu bông", items: ["mu", "dep", "gauBong"] },
  { label: "Cái mũ, hộp đồ chơi xếp hình, gấu bông", items: ["mu", "xepHinh", "gauBong"] },
  { label: "Đôi dép, hộp đồ chơi xếp hình, gấu bông", items: ["dep", "xepHinh", "gauBong"] },
];
export const comboCost = (index: number) => combos[index].items.reduce((sum, item) => sum + prices[item], 0);
export const budget = 200000;

const priceLine = `cái mũ ${n(prices.mu)} đồng, đôi dép ${n(prices.dep)} đồng, hộp đồ chơi xếp hình ${n(prices.xepHinh)} đồng, gấu bông ${n(prices.gauBong)} đồng`;

const trip = { total: 684, diff: 126 };
const tripFigure = () => createElement(SoDoDon, { topName: "Đoạn A – B", bottomName: "Đoạn B – C", diff: trip.diff, total: trip.total, unit: "km" });

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-nham",
    kind: "dien-so",
    parts: [`${n(400000)} + ${n(300000)} − ${n(200000)} =`, { answer: evalExpr(`${n(400000)} + ${n(300000)} − ${n(200000)}`) }],
    hint: "Tính từ trái sang phải. 4 trăm nghìn cộng 3 trăm nghìn, rồi bớt 2 trăm nghìn.",
    explanation: `${n(400000)} + ${n(300000)} = ${n(700000)}; ${n(700000)} − ${n(200000)} = ${n(500000)}.`,
  },
  {
    id: "kd-tru",
    kind: "dien-so",
    parts: [`${n(50003)} − ${n(4728)} =`, { answer: 50003 - 4728 }],
    hint: "Đặt tính thẳng cột, trừ từ hàng đơn vị. Hàng nào không trừ được thì mượn 1 ở hàng bên trái.",
    explanation: `${n(50003)} − ${n(4728)} = ${n(45275)}. Có thể nhẩm: ${n(50003)} − ${n(4000)} = ${n(46003)}, rồi ${n(46003)} − 728 = ${n(45275)}.`,
  },
  {
    id: "kd-tong-hieu",
    kind: "dien-so",
    prompt: "Hai số có tổng 90, hiệu 20. Tìm số lớn.",
    parts: ["Số lớn =", { answer: solve(90, 20).big }],
    hint: "Số lớn = (Tổng + Hiệu) : 2.",
    explanation: "(90 + 20) : 2 = 55. Số bé là 90 − 55 = 35. Thử lại: 55 − 35 = 20.",
  },
];

export const quickChecks = {
  nham: {
    id: "thu-nham",
    kind: "dien-so",
    parts: [`${n(12000000)} − ${n(5000000)} + ${n(4000000)} =`, { answer: evalExpr(`${n(12000000)} − ${n(5000000)} + ${n(4000000)}`) }],
    hint: "Coi 12 triệu là 12 \"đơn vị triệu\". Tính từ trái sang phải: 12 − 5 + 4.",
    explanation: `${n(12000000)} − ${n(5000000)} = ${n(7000000)}; ${n(7000000)} + ${n(4000000)} = ${n(11000000)}.`,
  },
  tru: {
    id: "thu-tru",
    kind: "dien-so",
    parts: [`${n(60000)} − ${n(3475)} =`, { answer: 60000 - 3475 }],
    hint: "Đặt tính rồi trừ từ phải sang trái, hoặc bớt 3 000 trước rồi bớt 475.",
    explanation: `${n(60000)} − ${n(3000)} = ${n(57000)}; ${n(57000)} − 475 = ${n(56525)}.`,
  },
  thuanTien: {
    id: "thu-thuan-tien",
    kind: "dien-so",
    parts: [`${n(7400)} + ${n(3600)} + ${n(5250)} =`, { answer: 7400 + 3600 + 5250 }],
    hint: "Hai số nào cộng với nhau ra số tròn nghìn?",
    explanation: `(${n(7400)} + ${n(3600)}) + ${n(5250)} = ${n(11000)} + ${n(5250)} = ${n(16250)}.`,
  },
  tongHieu: {
    id: "thu-tong-hieu",
    kind: "dien-so",
    prompt: "Hai số có tổng 18, hiệu 4.",
    parts: ["Số bé:", { answer: solve(18, 4).small }, ". Số lớn:", { answer: solve(18, 4).big }],
    hint: "Số bé = (Tổng − Hiệu) : 2. Số lớn = số bé + hiệu.",
    explanation: "(18 − 4) : 2 = 7. Số lớn là 7 + 4 = 11. Thử lại: 7 + 11 = 18 và 11 − 7 = 4.",
  },
  dungSai: claim("thu-dung-sai", `${n(300000)} + ${n(400000)} − ${n(500000)}`, 400000, "Tính từ trái sang phải rồi so với kết quả đã viết."),
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "tinh-nham",
    title: "Tính nhẩm (trang 118, 119)",
    questions: [
      mental("nham-1", `${n(80000)} + ${n(50000)}`, "8 chục nghìn cộng 5 chục nghìn là mấy chục nghìn?", `${n(80000)} + ${n(50000)} = ${n(130000)}.`),
      mental("nham-2", `${n(170000)} − ${n(90000)}`, "17 chục nghìn trừ 9 chục nghìn.", `${n(170000)} − ${n(90000)} = ${n(80000)}.`),
      mental("nham-3", `${n(600000)} + ${n(800000)}`, "6 trăm nghìn cộng 8 trăm nghìn là 14 trăm nghìn. 14 trăm nghìn viết thế nào?", `${n(600000)} + ${n(800000)} = ${n(1400000)}.`),
      mental(
        "nham-4",
        `${n(90000)} + ${n(60000)} − ${n(70000)}`,
        "Tính từ trái sang phải. 9 chục nghìn cộng 6 chục nghìn, rồi bớt 7 chục nghìn.",
        `${n(90000)} + ${n(60000)} = ${n(150000)}; ${n(150000)} − ${n(70000)} = ${n(80000)}.`,
      ),
      mental("nham-5", `${n(9000000)} + ${n(5000000)}`, "9 triệu cộng 5 triệu là 14 triệu.", `${n(9000000)} + ${n(5000000)} = ${n(14000000)}.`),
      mental(
        "nham-6",
        `${n(140000000)} − ${n(60000000)} + ${n(50000000)}`,
        "Coi các số là 14 chục triệu, 6 chục triệu, 5 chục triệu. Tính từ trái sang phải.",
        `${n(140000000)} − ${n(60000000)} = ${n(80000000)}; ${n(80000000)} + ${n(50000000)} = ${n(130000000)}.`,
      ),
    ],
  },
  {
    id: "dat-tinh",
    title: "Đặt tính rồi tính (trang 118, 119, 120)",
    questions: [
      add("dt-1", 8745, 7390),
      sub("dt-2", 17306, 6482),
      add("dt-3", 63418, 58927),
      sub("dt-4", 172640, 94785),
      add("dt-5", 384619, 257784),
      sub("dt-6", 703258, 48391),
    ],
  },
  {
    id: "dung-sai",
    title: "Đúng hay Sai (trang 120)",
    questions: [
      claim("ds-1", `${n(70000)} + ${n(50000)}`, 100000, "Tính 7 chục nghìn cộng 5 chục nghìn."),
      claim("ds-2", `${n(160000)} − ${n(40000)}`, 120000, "Tính 16 chục nghìn trừ 4 chục nghìn."),
      claim("ds-3", `${n(600000)} + ${n(400000)} − ${n(300000)}`, 800000, "Tính từ trái sang phải. 6 trăm nghìn cộng 4 trăm nghìn là bao nhiêu?"),
      claim("ds-4", `${n(8000000)} + ${n(5000000)} − ${n(3000000)}`, 10000000, "Tính từ trái sang phải: 8 triệu cộng 5 triệu, rồi bớt 3 triệu."),
    ],
  },
  {
    id: "so-sanh",
    title: "So sánh giá trị biểu thức (trang 118, 120)",
    questions: [
      extremum("lon-nhat", "lớn nhất"),
      extremum("be-nhat", "bé nhất"),
      compare(
        "ss-1",
        `${n(168900)} − (${n(250900)} − ${n(90050)})`,
        `${n(9000)} − ${n(2500)} + ${n(1000)}`,
        "Tính từng vế. Vế trái: làm trong ngoặc trước. Vế phải: tính từ trái sang phải.",
      ),
      compare(
        "ss-2",
        `${n(21480)} + ${n(40300)} − ${n(1480)}`,
        `${n(30250)} + ${n(28135)} + ${n(7450)}`,
        "Tính từng vế. Vế trái: ghép 21 480 với 1 480 cho dễ.",
      ),
      compare(
        "ss-3",
        `${n(56800)} + ${n(4200)} − ${n(6800)}`,
        `${n(50000)} + ${n(4200)}`,
        "Tính từng vế. Vế trái: 56 800 và 6 800 có chung phần nào?",
      ),
    ],
  },
  {
    id: "thuan-tien",
    title: "Tính bằng cách thuận tiện (trang 119)",
    questions: [
      {
        id: "tt-1",
        kind: "dien-so",
        prompt: "Tính bằng cách thuận tiện.",
        parts: [`${n(24580)} + ${n(7210)} + ${n(3420)} + ${n(1790)} =`, { answer: 24580 + 7210 + 3420 + 1790 }],
        hint: "Ghép từng cặp cộng ra số tròn nghìn. Nhìn ba chữ số cuối của mỗi số.",
        explanation: `(${n(24580)} + ${n(3420)}) + (${n(7210)} + ${n(1790)}) = ${n(28000)} + ${n(9000)} = ${n(37000)}.`,
      },
      {
        id: "tt-2",
        kind: "dien-so",
        prompt: "Tính bằng cách thuận tiện.",
        parts: [`${n(15260)} + ${n(9340)} + ${n(4740)} + ${n(2660)} =`, { answer: 15260 + 9340 + 4740 + 2660 }],
        hint: "Hai số nào cộng với nhau ra số tròn nghìn?",
        explanation: `(${n(15260)} + ${n(4740)}) + (${n(9340)} + ${n(2660)}) = ${n(20000)} + ${n(12000)} = ${n(32000)}.`,
      },
      {
        id: "tt-3",
        kind: "dien-so",
        prompt: "Tính bằng cách thuận tiện.",
        parts: [`${n(38450)} + ${n(6700)} − ${n(1450)} =`, { answer: 38450 + 6700 - 1450 }],
        hint: "Dấu trừ đi cùng số đứng sau nó. Ghép 38 450 với 1 450.",
        explanation: `${n(38450)} + ${n(6700)} − ${n(1450)} = (${n(38450)} − ${n(1450)}) + ${n(6700)} = ${n(37000)} + ${n(6700)} = ${n(43700)}.`,
      },
    ],
  },
  {
    id: "bai-toan",
    title: "Giải toán (trang 118, 119, 120)",
    questions: [
      {
        id: "bt-quan-ao",
        kind: "loi-van",
        prompt: `Mẹ mua cho Lan một chiếc áo khoác, một đôi giày và một đôi tất hết tất cả ${n(285000)} đồng. Trong đó, tổng số tiền của chiếc áo khoác và đôi giày là ${n(270000)} đồng. Tính giá tiền của mỗi loại, biết rằng giá tiền của đôi giày nhiều hơn giá tiền của đôi tất là ${n(95000)} đồng.`,
        lines: [
          [`Giá đôi tất: ${n(285000)} − ${n(270000)} =`, { answer: 285000 - 270000 }, "(đồng)"],
          [`Giá đôi giày: ${n(15000)} + ${n(95000)} =`, { answer: 15000 + 95000 }, "(đồng)"],
          [`Giá chiếc áo khoác: ${n(270000)} − ${n(110000)} =`, { answer: 270000 - 110000 }, "(đồng)"],
        ],
        hint: "Muốn biết giá đôi tất, lấy tiền cả ba món trừ tiền của áo khoác và giày. Biết giá tất thì tính giá giày, rồi giá áo.",
        explanation: `Giá đôi tất là ${n(285000)} − ${n(270000)} = ${n(15000)} đồng. Giá đôi giày là ${n(15000)} + ${n(95000)} = ${n(110000)} đồng. Giá chiếc áo khoác là ${n(270000)} − ${n(110000)} = ${n(160000)} đồng.`,
      },
      {
        id: "bt-tra-lai",
        kind: "loi-van",
        prompt: `Giá cái mũ là ${n(prices.mu)} đồng, đôi dép ${n(prices.dep)} đồng, hộp đồ chơi xếp hình ${n(prices.xepHinh)} đồng, gấu bông ${n(prices.gauBong)} đồng. Mai mua một đôi dép và một hộp đồ chơi xếp hình, Mai đưa cô bán hàng tờ ${n(250000)} đồng. Hỏi cô bán hàng trả lại Mai bao nhiêu tiền?`,
        lines: [
          [`Tiền hai món: ${n(prices.dep)} + ${n(prices.xepHinh)} =`, { answer: prices.dep + prices.xepHinh }, "(đồng)"],
          [`Tiền trả lại: ${n(250000)} − ${n(210000)} =`, { answer: 250000 - (prices.dep + prices.xepHinh) }, "(đồng)"],
        ],
        hint: "Tính tổng tiền hai món trước, rồi lấy 250 000 đồng trừ đi tổng đó.",
        explanation: `Hai món có giá ${n(prices.dep)} + ${n(prices.xepHinh)} = ${n(210000)} đồng. Cô bán hàng trả lại ${n(250000)} − ${n(210000)} = ${n(40000)} đồng.`,
      },
      {
        id: "bt-du-tien",
        kind: "trac-nghiem",
        prompt: `Giá: ${priceLine}. Với tờ tiền ${n(budget)} đồng, Mai đủ tiền mua được ba món đồ nào dưới đây?`,
        options: combos.map((combo) => combo.label),
        answerIndex: combos.findIndex((_, index) => comboCost(index) <= budget),
        hint: "Cộng giá ba món của từng cách chọn rồi so với 200 000 đồng. Đủ tiền khi tổng không lớn hơn 200 000.",
        explanation: `Cách A: ${n(comboCost(0))} đồng. Cách B: ${n(comboCost(1))} đồng. Cách C: ${n(comboCost(2))} đồng. Cách D: ${n(comboCost(3))} đồng. Chỉ cách B có tổng không lớn hơn ${n(budget)} đồng.`,
      },
      {
        id: "bt-tong-hieu",
        kind: "loi-van",
        prompt: `Chuyến xe đi từ A qua B đến C dài ${trip.total} km. Đoạn đường từ A đến B dài hơn đoạn đường từ B đến C ${trip.diff} km. Tính độ dài mỗi đoạn đường.`,
        lines: [
          [`Hai lần đoạn B – C: ${trip.total} − ${trip.diff} =`, { answer: trip.total - trip.diff }, "(km)"],
          [`Đoạn B – C: ${n(558)} : 2 =`, { answer: solve(trip.total, trip.diff).small }, "(km)"],
          [`Đoạn A – B: ${n(279)} + ${trip.diff} =`, { answer: solve(trip.total, trip.diff).big }, "(km)"],
        ],
        hint: "Đây là bài tìm hai số biết tổng và hiệu. Số bé = (Tổng − Hiệu) : 2. Đoạn nào dài hơn thì là số lớn.",
        explanation: `Hai lần đoạn B – C là ${trip.total} − ${trip.diff} = 558 km. Đoạn B – C dài 558 : 2 = 279 km. Đoạn A – B dài 279 + ${trip.diff} = 405 km. Thử lại: 279 + 405 = ${trip.total} và 405 − 279 = ${trip.diff}.`,
        illustration: tripFigure(),
      },
      {
        id: "bt-hai-thang",
        kind: "loi-van",
        prompt: `Tháng Một nhà máy sản xuất được ${n(245600)} chai nước. Tháng Hai sản xuất nhiều hơn tháng Một ${n(38750)} chai. Hỏi cả hai tháng nhà máy sản xuất được bao nhiêu chai nước?`,
        lines: [
          [`Tháng Hai: ${n(245600)} + ${n(38750)} =`, { answer: 245600 + 38750 }, "(chai)"],
          [`Cả hai tháng: ${n(245600)} + ${n(284350)} =`, { answer: 245600 + 245600 + 38750 }, "(chai)"],
        ],
        hint: "Tính số chai tháng Hai trước, rồi cộng với tháng Một.",
        explanation: `Tháng Hai sản xuất ${n(245600)} + ${n(38750)} = ${n(284350)} chai. Cả hai tháng là ${n(245600)} + ${n(284350)} = ${n(529950)} chai.`,
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "st-tim-loi",
        kind: "dien-so",
        prompt: `Bình tính ${n(150000)} − ${n(70000)} + ${n(40000)} và được ${n(40000)}, vì Bình cộng ${n(70000)} với ${n(40000)} trước rồi mới trừ. Kết quả đúng là bao nhiêu?`,
        parts: ["Kết quả đúng:", { answer: evalExpr(`${n(150000)} − ${n(70000)} + ${n(40000)}`) }],
        hint: "Biểu thức không có ngoặc thì tính từ trái sang phải. Phép tính nào đứng đầu tiên?",
        explanation: `Tính từ trái sang phải: ${n(150000)} − ${n(70000)} = ${n(80000)}; ${n(80000)} + ${n(40000)} = ${n(120000)}. Bình đã làm như có ngoặc ${n(150000)} − (${n(70000)} + ${n(40000)}) = ${n(40000)}.`,
      },
      {
        id: "st-uoc-luong",
        kind: "trac-nghiem",
        prompt: `Không đặt tính, em hãy làm tròn đến hàng trăm nghìn để ước lượng: ${n(498702)} + ${n(301540)} gần với số nào nhất?`,
        options: [n(700000), n(800000), n(900000), n(1000000)],
        answerIndex: 1,
        hint: "Làm tròn từng số đến hàng trăm nghìn rồi cộng hai số tròn.",
        explanation: `${n(498702)} ≈ ${n(500000)} và ${n(301540)} ≈ ${n(300000)}. ${n(500000)} + ${n(300000)} = ${n(800000)}. Kết quả đặt tính là ${n(498702 + 301540)}, rất gần ${n(800000)}. Ước lượng giúp phát hiện lúc con viết lệch một hàng.`,
      },
    ],
  },
];
