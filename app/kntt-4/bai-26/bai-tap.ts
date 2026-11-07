import type { DatTinhQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { explainColumnSub } from "@/lib/column-sub";
import { createElement } from "react";
import { DatTinhDS } from "./_illustrations/dat-tinh-ds";
import { HoaDon, type Item } from "./_illustrations/hoa-don";
import { ODoSo, type OSoRow } from "./_illustrations/o-do-so";
import { SauThe } from "./_illustrations/sau-the";
import { SoDoDon } from "./_illustrations/so-do-don";

const n = formatNumber;

const ADD_HINT = "Cộng từ hàng đơn vị sang trái. Hàng nào cộng được từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng bên trái.";
const SUB_HINT =
  "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.";

function add(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) };
}

function sub(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) };
}

/** Số bé và số lớn từ tổng và hiệu. Tổng và hiệu phải cùng chẵn hoặc cùng lẻ. */
export function solve(total: number, diff: number) {
  const small = (total - diff) / 2;
  return { small, big: small + diff };
}

type FindPair = {
  id: string;
  prompt: string;
  total: number;
  diff: number;
  small: { name: string; label: string };
  big: { name: string; label: string };
  unit: string;
  /** Thứ tự hỏi trong đề. */
  ask: "small-first" | "big-first";
  hint: string;
  illustration?: FillQuestion["illustration"];
};

/** Câu tìm hai số: con điền hai ô theo thứ tự đề hỏi. Lời giải theo cách "tìm số bé trước". */
function pair(spec: FindPair): FillQuestion {
  const { small, big } = solve(spec.total, spec.diff);
  const { total, diff, unit } = spec;
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
    parts.push(index === 0 ? `${label}:` : `${unit}. ${label}:`, { answer: value as number });
  });
  parts.push(unit);
  return {
    id: spec.id,
    kind: "dien-so",
    prompt: spec.prompt,
    parts,
    hint: spec.hint,
    explanation:
      `Hai lần số ${spec.small.name} là: ${n(total)} − ${n(diff)} = ${n(total - diff)} (${unit}). ` +
      `Số ${spec.small.name} là: ${n(total - diff)} : 2 = ${n(small)} (${unit}). ` +
      `Số ${spec.big.name} là: ${n(small)} + ${n(diff)} = ${n(big)} (${unit}). ` +
      `Thử lại: ${n(small)} + ${n(big)} = ${n(total)} và ${n(big)} − ${n(small)} = ${n(diff)}.`,
    illustration: spec.illustration,
  };
}

/** Hai hoá đơn của nhóm "Cộng nhiều số". */
export const bills: Item[][] = [
  [
    { name: "Trứng gà", price: 18000 },
    { name: "Sữa tươi", price: 45000 },
    { name: "Gạo", price: 132000 },
  ],
  [
    { name: "Cà phê", price: 63500 },
    { name: "Kẹo", price: 29000 },
    { name: "Nồi cơm điện", price: 236500 },
  ],
];

/** Ô số: giá trị của bốn biểu thức, `pick` là vị trí chữ số nằm trong cột tô vàng. Cột đó đọc ra năm sinh. */
export const oSoRows: OSoRow[] = [
  { value: 499999999 + 500000001, pick: 0 },
  { value: 61407 - 61398, pick: 0 },
  { value: 45000000 + 3000000 - 17000000, pick: 1 },
  { value: 19837 + (815000 - 110000), pick: 3 },
];

/** Sáu thẻ số: số bắt đầu và số cần ghép. */
export const cardsStart = [3, 5, 9, 1, 4, 8];
export const cardsTarget = [1, 4, 9, 3, 8, 5];

const dsFigure = (a: number, b: number, result: number, op: "+" | "-") => createElement(DatTinhDS, { a, b, result, op });
const billFigure = (index: number) => createElement(HoaDon, { items: bills[index] });
const diagram = () => createElement(SoDoDon, { topName: "Bao thứ nhất", bottomName: "Bao thứ hai", diff: 6, total: 28, unit: "kg" });

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-cong",
    kind: "dien-so",
    parts: [`${n(38407)} + ${n(5693)} =`, { answer: 44100 }],
    hint: "Đặt tính, các chữ số cùng hàng thẳng cột, cộng từ hàng đơn vị. Nhớ số nhớ.",
    explanation: `${n(38407)} + ${n(5693)} = ${n(44100)}. Hàng đơn vị: 7 + 3 = 10, viết 0 nhớ 1. Hàng chục: 0 + 9 + 1 = 10, viết 0 nhớ 1. Hàng trăm: 4 + 6 + 1 = 11, viết 1 nhớ 1. Hàng nghìn: 8 + 5 + 1 = 14, viết 4 nhớ 1. Hàng chục nghìn: 3 + 1 = 4.`,
  },
  {
    id: "kd-nham",
    kind: "dien-so",
    parts: [`${n(3000000)} + ${n(400000)} − ${n(100000)} =`, { answer: 3300000 }],
    hint: "Tính từ trái sang phải. 30 trăm nghìn cộng 4 trăm nghìn, rồi bớt 1 trăm nghìn.",
    explanation: `${n(3000000)} + ${n(400000)} = ${n(3400000)}; ${n(3400000)} − ${n(100000)} = ${n(3300000)}.`,
  },
  {
    id: "kd-tong-hieu",
    kind: "dien-so",
    prompt: "Hai số có tổng 20, hiệu 6. Tìm số lớn.",
    parts: ["Số lớn =", { answer: 13 }],
    hint: "Số lớn = (Tổng + Hiệu) : 2.",
    explanation: "(20 + 6) : 2 = 13. Số bé là 20 − 13 = 7. Thử lại: 13 − 7 = 6.",
  },
];

export const quickChecks = {
  tru: {
    id: "thu-tru",
    kind: "dien-so",
    parts: [`${n(70000)} − ${n(4215)} =`, { answer: 65785 }],
    hint: "Đặt tính rồi trừ từ phải sang trái, hoặc bớt 4 000 trước rồi bớt 215.",
    explanation: `${n(70000)} − ${n(4000)} = ${n(66000)}; ${n(66000)} − 215 = ${n(65785)}.`,
  },
  thuanTien: {
    id: "thu-thuan-tien",
    kind: "dien-so",
    parts: [`${n(4600)} + ${n(15800)} + 400 =`, { answer: 20800 }],
    hint: "Hai số nào cộng với nhau ra số tròn nghìn?",
    explanation: `(${n(4600)} + 400) + ${n(15800)} = ${n(5000)} + ${n(15800)} = ${n(20800)}.`,
  },
  thuLai: {
    id: "thu-thu-lai",
    kind: "trac-nghiem",
    prompt: `Biết ${n(96271)} − ${n(83738)} = ${n(12533)}. Phép cộng nào cho kết quả ${n(96271)}?`,
    options: [`${n(83738)} + ${n(12533)}`, `${n(96271)} + ${n(12533)}`, `${n(83738)} + ${n(96271)}`],
    answerIndex: 0,
    hint: "Số bị trừ bằng số trừ cộng hiệu.",
    explanation: `${n(83738)} + ${n(12533)} = ${n(96271)}: số trừ cộng hiệu thì ra số bị trừ.`,
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "cong-tru",
    title: "Tính nhẩm, đặt tính (Bài 22, 23)",
    questions: [
      {
        id: "nham-1",
        kind: "dien-so",
        prompt: "Tính nhẩm.",
        parts: [`${n(2000000)} + ${n(500000)} − ${n(300000)} =`, { answer: 2200000 }],
        hint: "Tính từ trái sang phải. 20 trăm nghìn cộng 5 trăm nghìn, rồi bớt 3 trăm nghìn.",
        explanation: `${n(2000000)} + ${n(500000)} = ${n(2500000)}; ${n(2500000)} − ${n(300000)} = ${n(2200000)}.`,
      },
      {
        id: "nham-2",
        kind: "dien-so",
        prompt: "Tính nhẩm.",
        parts: [`${n(300000)} + ${n(200000)} − ${n(40000)} =`, { answer: 460000 }],
        hint: "3 trăm nghìn cộng 2 trăm nghìn là mấy trăm nghìn? Rồi bớt 4 chục nghìn.",
        explanation: `${n(300000)} + ${n(200000)} = ${n(500000)}; ${n(500000)} − ${n(40000)} = ${n(460000)}.`,
      },
      {
        id: "nham-3",
        kind: "dien-so",
        prompt: "Tính nhẩm.",
        parts: [`${n(30000000)} + (${n(5000)} + ${n(300000)}) =`, { answer: 30305000 }],
        hint: "Làm trong ngoặc trước.",
        explanation: `Trong ngoặc: ${n(5000)} + ${n(300000)} = ${n(305000)}. Rồi ${n(30000000)} + ${n(305000)} = ${n(30305000)}.`,
      },
      {
        id: "nham-4",
        kind: "dien-so",
        prompt: "Tính nhẩm.",
        parts: [`${n(2000000)} + (${n(80000)} − ${n(50000)}) =`, { answer: 2030000 }],
        hint: "Làm trong ngoặc trước: 8 chục nghìn trừ 5 chục nghìn.",
        explanation: `Trong ngoặc: ${n(80000)} − ${n(50000)} = ${n(30000)}. Rồi ${n(2000000)} + ${n(30000)} = ${n(2030000)}.`,
      },
      {
        id: "ds-1",
        kind: "trac-nghiem",
        prompt: "Phép tính dưới đây đúng hay sai?",
        options: ["Đúng", "Sai"],
        answerIndex: 1,
        hint: "Cộng 300 000 thì chữ số ở hàng triệu và hàng chục triệu có đổi không? Nhìn xem chữ số nào đổi.",
        explanation: `${n(417250360)} + ${n(300000)} = ${n(417550360)}. Số 300 000 chỉ làm hàng trăm nghìn tăng từ 2 lên 5, nên chữ số 4 ở hàng trăm triệu vẫn đứng yên. Kết quả ${n(717250360)} sai.`,
        illustration: dsFigure(417250360, 300000, 717250360, "+"),
      },
      {
        id: "ds-2",
        kind: "trac-nghiem",
        prompt: "Phép tính dưới đây đúng hay sai?",
        options: ["Đúng", "Sai"],
        answerIndex: 0,
        hint: "Hai số có cùng phần 472 800 ở cuối. Bớt phần giống nhau thì còn gì?",
        explanation: `${n(9472800)} − ${n(472800)} = ${n(9000000)}. Bớt 472 800 khỏi số có 472 800 ở cuối thì còn đúng 9 triệu. Phép tính đúng.`,
        illustration: dsFigure(9472800, 472800, 9000000, "-"),
      },
      {
        id: "ds-3",
        kind: "trac-nghiem",
        prompt: "Phép tính dưới đây đúng hay sai?",
        options: ["Đúng", "Sai"],
        answerIndex: 1,
        hint: "Đây là phép trừ. Hiệu có thể lớn hơn số bị trừ không?",
        explanation: `${n(4215000)} − ${n(308000)} = ${n(3907000)}. Hiệu phải bé hơn số bị trừ ${n(4215000)}, mà ${n(4523000)} lớn hơn, nên không thể đúng. ${n(4523000)} là kết quả của phép cộng.`,
        illustration: dsFigure(4215000, 308000, 4523000, "-"),
      },
      {
        id: "ds-4",
        kind: "trac-nghiem",
        prompt: "Phép tính dưới đây đúng hay sai?",
        options: ["Đúng", "Sai"],
        answerIndex: 0,
        hint: "Cộng từng hàng, chú ý số nhớ ở hàng trăm và hàng nghìn.",
        explanation: `735 + 561 = 1 296, viết 296 nhớ 1. Rồi 614 + 208 + 1 = 823. Hàng chục triệu và triệu giữ nguyên 52. Kết quả ${n(52823296)}, phép tính đúng.`,
        illustration: dsFigure(52614735, 208561, 52823296, "+"),
      },
      add("dt-1", 64825, 27396),
      sub("dt-2", 92221, 64825),
      add("dt-3", 215684, 806359),
      sub("dt-4", 1022043, 806359),
    ],
  },
  {
    id: "thuan-tien",
    title: "Cộng nhiều số, tính thuận tiện (Bài 24)",
    questions: [
      {
        id: "tt-1",
        kind: "dien-so",
        prompt: "Tính bằng cách thuận tiện.",
        parts: [`${n(52614)} + ${n(2785)} − 614 =`, { answer: 54785 }],
        hint: "Dấu trừ đi cùng số đứng sau nó. Số nào trừ được với 52 614 cho ra số tròn?",
        explanation: `${n(52614)} + ${n(2785)} − 614 = (${n(52614)} − 614) + ${n(2785)} = ${n(52000)} + ${n(2785)} = ${n(54785)}.`,
      },
      {
        id: "tt-2",
        kind: "dien-so",
        prompt: "Tính bằng cách thuận tiện.",
        parts: [`${n(94300)} + ${n(1700)} − ${n(4300)} =`, { answer: 91700 }],
        hint: "Dấu trừ đi cùng số đứng sau nó. Ghép 94 300 với 4 300.",
        explanation: `${n(94300)} + ${n(1700)} − ${n(4300)} = (${n(94300)} − ${n(4300)}) + ${n(1700)} = ${n(90000)} + ${n(1700)} = ${n(91700)}.`,
      },
      {
        id: "tt-3",
        kind: "dien-so",
        prompt: "Tính bằng cách thuận tiện.",
        parts: [`${n(41375)} + ${n(12408)} + ${n(2625)} =`, { answer: 56408 }],
        hint: "Hai số nào cộng ra số tròn nghìn? Nhìn ba chữ số cuối.",
        explanation: `${n(41375)} + ${n(12408)} + ${n(2625)} = (${n(41375)} + ${n(2625)}) + ${n(12408)} = ${n(44000)} + ${n(12408)} = ${n(56408)}.`,
      },
      {
        id: "hd-1",
        kind: "dien-so",
        prompt: "Tính giá trị của hoá đơn dưới đây.",
        parts: ["Tổng:", { answer: 195000 }, "đồng"],
        hint: "Hai món nào cộng ra số tròn trăm nghìn?",
        explanation: `${n(18000)} + ${n(132000)} = ${n(150000)}; ${n(150000)} + ${n(45000)} = ${n(195000)}. Hoá đơn là ${n(195000)} đồng.`,
        illustration: billFigure(0),
      },
      {
        id: "hd-2",
        kind: "dien-so",
        prompt: "Tính giá trị của hoá đơn dưới đây.",
        parts: ["Tổng:", { answer: 329000 }, "đồng"],
        hint: "Hai món nào có phần lẻ 500 ghép lại thành số tròn?",
        explanation: `${n(63500)} + ${n(236500)} = ${n(300000)}; ${n(300000)} + ${n(29000)} = ${n(329000)}. Hoá đơn là ${n(329000)} đồng.`,
        illustration: billFigure(1),
      },
      {
        id: "qy-1",
        kind: "dien-so",
        prompt: `Một quỹ khuyến học, ngày thứ nhất nhận được ${n(36400000)} đồng, ngày thứ hai nhận được ${n(52750000)} đồng, ngày thứ ba nhận được ${n(61600000)} đồng. Hỏi cả ba ngày quỹ nhận được bao nhiêu tiền?`,
        parts: ["Cả ba ngày:", { answer: 150750000 }, "đồng"],
        hint: "Cộng ba số. Ghép hai số có tổng tròn trước.",
        explanation: `${n(36400000)} + ${n(61600000)} = ${n(98000000)}; ${n(98000000)} + ${n(52750000)} = ${n(150750000)}. Cả ba ngày quỹ nhận ${n(150750000)} đồng.`,
      },
      {
        id: "o-1",
        kind: "dien-so",
        prompt:
          "Giải ô số để biết năm sinh của nhà toán học Lê Văn Thiêm, tiến sĩ toán học đầu tiên của Việt Nam. Hàng 1: tính giá trị biểu thức.",
        parts: [`${n(499999999)} + ${n(500000001)} =`, { answer: 1000000000 }],
        hint: "Cộng hai số. Số này có 10 chữ số: một chữ số 1 và chín chữ số 0.",
        explanation: `${n(499999999)} + ${n(500000001)} = ${n(1000000000)}. Số này có 10 chữ số, vừa đủ 10 ô của hàng 1.`,
      },
      {
        id: "o-2",
        kind: "dien-so",
        prompt: "Hàng 2.",
        parts: [`${n(61407)} − ${n(61398)} =`, { answer: 9 }],
        hint: "Hai số rất gần nhau. 61 407 hơn 61 398 bao nhiêu?",
        explanation: `${n(61407)} − ${n(61398)} = 9. Hàng 2 chỉ có một ô.`,
      },
      {
        id: "o-3",
        kind: "dien-so",
        prompt: "Hàng 3.",
        parts: [`${n(45000000)} + ${n(3000000)} − ${n(17000000)} =`, { answer: 31000000 }],
        hint: "Tính từ trái sang phải. 45 triệu cộng 3 triệu rồi bớt 17 triệu.",
        explanation: `${n(45000000)} + ${n(3000000)} = ${n(48000000)}; ${n(48000000)} − ${n(17000000)} = ${n(31000000)}.`,
      },
      {
        id: "o-4",
        kind: "dien-so",
        prompt: "Hàng 4.",
        parts: [`${n(19837)} + (${n(815000)} − ${n(110000)}) =`, { answer: 724837 }],
        hint: "Làm trong ngoặc trước.",
        explanation: `Trong ngoặc: ${n(815000)} − ${n(110000)} = ${n(705000)}. Rồi ${n(19837)} + ${n(705000)} = ${n(724837)}.`,
      },
      {
        id: "o-nam",
        kind: "dien-so",
        prompt: "Điền giá trị bốn biểu thức vào ô chữ, mỗi chữ số một ô. Đọc các chữ số trong cột tô vàng, từ trên xuống, để biết năm sinh của ông.",
        parts: ["Năm sinh:", { answer: 1918, year: true }],
        hint: "Mỗi hàng có một ô tô vàng. Đọc chữ số trong các ô đó từ hàng 1 xuống hàng 4.",
        explanation: `Hàng 1 là chữ số 1 (của ${n(1000000000)}), hàng 2 là chữ số 9, hàng 3 là chữ số 1 (của ${n(31000000)}), hàng 4 là chữ số 8 (của ${n(724837)}). Đọc được 1918: nhà toán học Lê Văn Thiêm sinh năm 1918.`,
        illustration: createElement(ODoSo, { rows: oSoRows }),
      },
    ],
  },
  {
    id: "tong-hieu",
    title: "Tìm hai số khi biết tổng và hiệu (Bài 25)",
    questions: [
      pair({
        id: "th-1",
        prompt: `An và Bình cùng tiết kiệm được ${n(120000)} đồng. An tiết kiệm nhiều hơn Bình ${n(20000)} đồng. Hỏi mỗi bạn tiết kiệm được bao nhiêu tiền?`,
        total: 120000,
        diff: 20000,
        small: { name: "tiền của Bình", label: "Bình" },
        big: { name: "tiền của An", label: "An" },
        unit: "đồng",
        ask: "big-first",
        hint: "Tổng là bao nhiêu? Hiệu là bao nhiêu? Ai nhiều hơn thì có số lớn.",
      }),
      pair({
        id: "th-2",
        prompt: "Lan và Hà cùng gấp được 168 con hạc giấy. Lan gấp nhiều hơn Hà 14 con hạc giấy. Hỏi mỗi bạn gấp được bao nhiêu con hạc giấy?",
        total: 168,
        diff: 14,
        small: { name: "con hạc của Hà", label: "Hà" },
        big: { name: "con hạc của Lan", label: "Lan" },
        unit: "con",
        ask: "big-first",
        hint: "Tổng 168, hiệu 14. Số bé = (Tổng − Hiệu) : 2.",
      }),
      pair({
        id: "th-3",
        prompt: "Lớp 4A và lớp 4B trồng được tất cả 360 cây. Lớp 4A trồng ít hơn lớp 4B 24 cây. Hỏi mỗi lớp trồng được bao nhiêu cây?",
        total: 360,
        diff: 24,
        small: { name: "cây của lớp 4A", label: "Lớp 4A" },
        big: { name: "cây của lớp 4B", label: "Lớp 4B" },
        unit: "cây",
        ask: "small-first",
        hint: "Lớp nào ít hơn thì có số bé. Đề hỏi lớp 4A trước.",
      }),
      {
        id: "th-4a",
        kind: "trac-nghiem",
        prompt: "Em hãy chọn đề toán đúng với sơ đồ dưới đây.",
        options: [
          "Bao gạo thứ nhất nặng 28 kg, bao thứ hai nhẹ hơn 6 kg.",
          "Hai bao gạo nặng 28 kg, bao thứ nhất nặng hơn bao thứ hai 6 kg.",
          "Hai bao gạo nặng 28 kg, bao thứ nhất nhẹ hơn bao thứ hai 6 kg.",
        ],
        answerIndex: 1,
        hint: "Ngoặc bên phải chỉ cả hai bao. Đoạn nào dài hơn thì nặng hơn.",
        explanation: "Ngoặc 28 kg ôm cả hai đoạn nên 28 kg là tổng của hai bao. Đoạn trên dài hơn đoạn dưới 6 kg nên bao thứ nhất nặng hơn bao thứ hai 6 kg.",
        illustration: diagram(),
      },
      pair({
        id: "th-4b",
        prompt: "Giải bài toán theo sơ đồ: hai bao gạo nặng 28 kg, bao thứ nhất nặng hơn bao thứ hai 6 kg.",
        total: 28,
        diff: 6,
        small: { name: "bao thứ hai", label: "Bao thứ hai" },
        big: { name: "bao thứ nhất", label: "Bao thứ nhất" },
        unit: "kg",
        ask: "big-first",
        hint: "Bao nào nặng hơn thì có số lớn. Số bé = (Tổng − Hiệu) : 2.",
        illustration: diagram(),
      }),
    ],
  },
  {
    id: "do-em",
    title: "Đố em",
    questions: [
      {
        id: "do-the",
        kind: "dien-so",
        prompt: `Số ${n(359148)} được ghép từ 6 thẻ số như hình dưới đây. Mỗi lượt di chuyển, Nam chỉ có thể đổi chỗ hai tấm thẻ cho nhau. Hỏi Nam cần ít nhất mấy lượt di chuyển để được số ${n(149385)}?`,
        parts: ["Ít nhất", { answer: 3 }, "lượt"],
        hint: "Tấm thẻ nào đã đứng đúng chỗ? Mỗi lượt đổi đưa được nhiều nhất hai thẻ về đúng chỗ.",
        explanation: `Đổi 3 và 1: ${n(159348)}. Đổi 5 và 4: ${n(149358)}. Đổi 5 và 8: ${n(149385)}. Chỉ có thẻ 9 đứng đúng chỗ, còn 5 thẻ sai chỗ. Mỗi lượt đưa tối đa hai thẻ về đúng chỗ nên cần ít nhất 3 lượt.`,
        illustration: createElement(SauThe, { digits: cardsStart }),
      },
      {
        id: "do-cong",
        kind: "dien-so",
        prompt: `Đặt một dấu cộng vào giữa các chữ số để được phép tính đúng: 6 3 4 7 2 8 5 9 = ${n(9206)}.`,
        parts: [{ answer: 6347 }, "+", { answer: 2859 }, `= ${n(9206)}`],
        hint: "Kết quả có 4 chữ số, nên hai số hạng không thể quá dài. Thử tách 4 chữ số và 4 chữ số.",
        explanation: `${n(6347)} + ${n(2859)} = ${n(9206)}. Các cách tách khác cho tổng quá lớn hoặc quá bé, ví dụ ${n(63472)} + ${n(859)} = ${n(64331)}.`,
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "st-tim-loi-dau",
        kind: "trac-nghiem",
        prompt: `Nam tính: ${n(6000000)} + ${n(400000)} − ${n(50000)} = ${n(6450000)}. Nam sai ở đâu?`,
        options: ["Nam cộng 50 000 thay vì trừ 50 000", "Nam cộng 400 000 sai", "Nam viết thiếu một số 0", "Nam không sai"],
        answerIndex: 0,
        hint: "Tính lại từng bước. 6 000 000 + 400 000 là bao nhiêu? Rồi sao nữa?",
        explanation: `${n(6000000)} + ${n(400000)} = ${n(6400000)}. Rồi ${n(6400000)} − ${n(50000)} = ${n(6350000)}. Nam lấy ${n(6400000)} + ${n(50000)} = ${n(6450000)}, tức là cộng thay vì trừ.`,
      },
      {
        id: "st-tim-loi-chia",
        kind: "trac-nghiem",
        prompt: "Hai số có tổng 150, hiệu 30. Lan tìm ra hai số là 120 và 150. Lan sai ở bước nào?",
        options: ["Cộng sai 120 + 30", "Quên chia cho 2 sau khi lấy 150 − 30", "Nhầm tổng với hiệu", "Lan không sai"],
        answerIndex: 1,
        hint: "Thử lại: hai số của Lan cộng lại có bằng 150 không?",
        explanation:
          "150 − 30 = 120 là hai lần số bé. Phải chia 2: 120 : 2 = 60. Số lớn là 60 + 30 = 90. Thử lại: 60 + 90 = 150 và 90 − 60 = 30. Hai số của Lan cộng lại là 270, không bằng 150.",
      },
      {
        id: "st-lien-sau",
        kind: "dien-so",
        prompt: "Số lớn nhất có 8 chữ số là 99 999 999. Cộng thêm 1 thì được số nào? Số đó có 9 chữ số.",
        parts: [`${n(99999999)} + 1 =`, { answer: 100000000 }],
        hint: "Chữ số 9 cộng 1 thì viết 0 và nhớ 1, lần lượt qua mọi hàng.",
        explanation: `${n(99999999)} + 1 = ${n(100000000)}: một chữ số 1 và tám chữ số 0, tất cả 9 chữ số.`,
      },
    ],
  },
];
