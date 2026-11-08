import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { docSo } from "@/lib/doc-so";
import { createElement } from "react";
import { BanTinh } from "./_illustrations/ban-tinh";

const n = formatNumber;

/** Các số hạng của một số khi viết thành tổng, từ hàng cao xuống thấp, bỏ hàng 0. */
export function expand(value: number): number[] {
  const digits = String(value).split("");
  return digits.flatMap((digit, index) => (digit === "0" ? [] : [Number(digit) * 10 ** (digits.length - 1 - index)]));
}

/** Câu viết số thành tổng: con điền từng số hạng. */
function expansion(id: string, value: number): FillQuestion {
  const terms = expand(value);
  const parts: FillQuestion["parts"] = [`${n(value)} =`];
  terms.forEach((term, index) => {
    if (index > 0) parts.push("+");
    parts.push({ answer: term });
  });
  return {
    id,
    kind: "dien-so",
    prompt: "Viết số thành tổng các hàng.",
    parts,
    hint: "Đọc từng chữ số từ trái sang phải và nói nó đứng ở hàng nào. Hàng có chữ số 0 thì bỏ qua.",
    explanation: `${n(value)} = ${terms.map(n).join(" + ")}.`,
  };
}

/** Câu đọc số: đáp án đúng là cách đọc của `docSo`, ba cách sai cho sẵn. */
function reading(id: string, value: number, wrong: (number | string)[], explanation: string): ChoiceQuestion {
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Số ${n(value)} đọc là:`,
    options: [docSo(value), ...wrong.map((item) => (typeof item === "number" ? docSo(item) : item))],
    answerIndex: 0,
    hint: "Chia số thành từng nhóm ba chữ số từ phải sang trái. Đọc từng nhóm, đọc xong nhóm thì đọc tên lớp.",
    explanation,
  };
}

const banTinh = (id: string, value: number): FillQuestion => ({
  id,
  kind: "dien-so",
  prompt: "Số nào được ghi trên bàn tính? Cột không có hạt là chữ số 0.",
  parts: ["Số là", { answer: value }],
  illustration: createElement(BanTinh, { value }),
  hint: "Đếm số hạt ở từng cột, từ trái sang phải, rồi viết chữ số. Cột không có hạt là chữ số 0.",
  explanation: `Số hạt từng cột từ trái sang phải là ${String(value).padStart(9, "0").split("").join(", ")}. Số là ${n(value)}.`,
});

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  {
    id: "kd-hang",
    kind: "trac-nghiem",
    prompt: `Trong số ${n(538204)}, chữ số 8 thuộc hàng nào?`,
    options: ["Hàng nghìn", "Hàng chục nghìn", "Hàng trăm", "Hàng chục"],
    answerIndex: 0,
    hint: "Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn.",
    explanation: "Từ phải sang trái là 4 (đơn vị), 0 (chục), 2 (trăm), 8 (nghìn). Chữ số 8 ở hàng nghìn.",
  },
  {
    id: "kd-tong",
    kind: "dien-so",
    prompt: "Tính.",
    parts: [`${n(40000)} + ${n(3000)} + 200 + 5 =`, { answer: 43205 }],
    hint: "Ghép từng hàng lại: bốn chục nghìn, ba nghìn, hai trăm, năm đơn vị.",
    explanation: `${n(40000)} + ${n(3000)} + 200 + 5 = ${n(43205)}.`,
  },
  {
    id: "kd-lien-sau",
    kind: "dien-so",
    prompt: `Số liền sau của ${n(99999)} là số nào?`,
    parts: ["Số liền sau là", { answer: 100000 }],
    hint: "Số liền sau hơn số đó 1 đơn vị.",
    explanation: `${n(99999)} + 1 = ${n(100000)}. Từ năm chữ số 9 thêm 1 thì thành số có sáu chữ số.`,
  },
];

export const quickChecks = {
  doc: reading(
    "thu-doc",
    305072401,
    [docSo(305072401).replace("không trăm ", ""), docSo(350072401), docSo(305720401)],
    "Lớp triệu là 305, lớp nghìn là 072, lớp đơn vị là 401. Lớp nghìn 072 đọc là không trăm bảy mươi hai nghìn.",
  ),
  hangLop: {
    id: "thu-hang-lop",
    kind: "trac-nghiem",
    prompt: `Trong số ${n(164280937)}, chữ số 6 thuộc hàng nào, lớp nào?`,
    options: ["Hàng chục triệu, lớp triệu", "Hàng triệu, lớp triệu", "Hàng chục nghìn, lớp nghìn", "Hàng trăm triệu, lớp triệu"],
    answerIndex: 0,
    hint: "Đếm từ trái sang phải: trăm triệu, chục triệu, triệu.",
    explanation: "Chữ số 1 ở hàng trăm triệu, chữ số 6 ở hàng chục triệu. Cả hai hàng đều thuộc lớp triệu.",
  },
  tong: expansion("thu-tong", 40205030),
  motTi: {
    id: "thu-mot-ti",
    kind: "dien-so",
    prompt: `Số liền sau của ${n(999999999)} là số nào?`,
    parts: ["Số liền sau là", { answer: 1000000000 }],
    hint: "Thêm 1 vào số lớn nhất có chín chữ số.",
    explanation: `${n(999999999)} + 1 = ${n(1000000000)}, đọc là một tỉ.`,
  },
} satisfies Record<string, Question>;

/** Điều kiện của câu mật khẩu: lớp nghìn không có chữ số 0, chữ số hàng chục triệu là số lẻ. */
export function matKhauHopLe(value: number): boolean {
  const text = String(value);
  if (text.length !== 9) return false;
  return !text.slice(3, 6).includes("0") && Number(text[1]) % 2 === 1;
}

const clueNumbers = [1000000000, 320000000, 2152000, 999999];
const clueRightOrder = [1, 2, 3, 0];

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "doc-so",
    title: "Đọc số, viết số",
    questions: [
      reading(
        "ds-1",
        78205109,
        [78250109, 78205190, 7820519],
        "Lớp triệu là 78, lớp nghìn là 205, lớp đơn vị là 109. Chữ số 0 ở hàng chục của lớp nghìn và lớp đơn vị cần đọc là linh.",
      ),
      reading(
        "ds-2",
        402000650,
        [402000065, 402650000, 42000650],
        "Lớp nghìn là 000 nên không đọc. Lớp đơn vị là 650, đọc là sáu trăm năm mươi.",
      ),
      {
        id: "ds-3",
        kind: "dien-so",
        prompt: `Viết số: ${docSo(75008300)}.`,
        parts: ["Số là", { answer: 75008300 }],
        hint: "Chia lời đọc thành ba lớp: triệu, nghìn, đơn vị. Mỗi lớp viết đủ ba chữ số (trừ lớp đầu).",
        explanation: `Lớp triệu 75, lớp nghìn 008 (không trăm linh tám), lớp đơn vị 300. Số là ${n(75008300)}.`,
      },
      {
        id: "ds-4",
        kind: "dien-so",
        prompt: "Số gồm 6 triệu, 4 trăm nghìn, 2 chục nghìn và 9 đơn vị.",
        parts: ["Số là", { answer: 6420009 }],
        hint: "Viết từng hàng: triệu, trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị. Hàng không nhắc tới là chữ số 0.",
        explanation: `6 triệu, 4 trăm nghìn, 2 chục nghìn, 0 nghìn, 0 trăm, 0 chục, 9 đơn vị: ${n(6420009)}.`,
      },
    ],
  },
  {
    id: "hang-lop",
    title: "Hàng và lớp",
    questions: [
      {
        id: "hl-1",
        kind: "trac-nghiem",
        prompt: `Số ${n(52316704)}. Câu nào đúng?`,
        options: [
          "Chữ số 5 thuộc lớp nghìn",
          "Chữ số 3 thuộc hàng trăm nghìn",
          "Chữ số 0 thuộc lớp nghìn",
          "Chữ số 6 thuộc hàng chục nghìn",
        ],
        answerIndex: 1,
        hint: "Chia số thành ba lớp: 52, 316, 704. Rồi xem chữ số đó nằm ở lớp nào, hàng nào.",
        explanation:
          "Lớp triệu là 52, lớp nghìn là 316, lớp đơn vị là 704. Chữ số 3 đứng đầu lớp nghìn nên ở hàng trăm nghìn. Chữ số 5 ở lớp triệu, chữ số 0 ở lớp đơn vị, chữ số 6 ở hàng nghìn.",
      },
      {
        id: "hl-2",
        kind: "dien-so",
        prompt: `Số ${n(603245187)}. Điền các chữ số vào từng lớp, từ trái sang phải.`,
        parts: ["Lớp triệu:", { answer: 6 }, { answer: 0 }, { answer: 3 }, "Lớp nghìn:", { answer: 2 }, { answer: 4 }, { answer: 5 }, "Lớp đơn vị:", { answer: 1 }, { answer: 8 }, { answer: 7 }],
        hint: "Chia số thành ba nhóm ba chữ số từ phải sang trái.",
        explanation: "603 245 187: lớp triệu 603, lớp nghìn 245, lớp đơn vị 187. Chữ số 0 vẫn là một ô của hàng chục triệu.",
      },
      {
        id: "hl-3",
        kind: "dien-so",
        prompt: "Số có lớp triệu là 910, lớp nghìn là 003, lớp đơn vị là 070. Viết số đó.",
        parts: ["Số là", { answer: 910003070 }],
        hint: "Viết ba lớp liền nhau, mỗi lớp đủ ba chữ số, giữ các chữ số 0.",
        explanation: `910 | 003 | 070, viết liền là ${n(910003070)}.`,
      },
      {
        id: "hl-4",
        kind: "trac-nghiem",
        prompt: `Trong số ${n(25349018)}, chữ số 4 thuộc hàng nào, lớp nào?`,
        options: ["Hàng chục nghìn, lớp nghìn", "Hàng nghìn, lớp nghìn", "Hàng chục nghìn, lớp đơn vị", "Hàng trăm nghìn, lớp nghìn"],
        answerIndex: 0,
        hint: "Chia lớp: 25, 349, 018. Chữ số 4 ở giữa lớp nghìn.",
        explanation: "Lớp nghìn là 349: 3 ở hàng trăm nghìn, 4 ở hàng chục nghìn, 9 ở hàng nghìn.",
      },
      {
        id: "hl-5",
        kind: "noi-cap",
        prompt: "Nối mỗi số với giá trị của chữ số 7 trong số đó.",
        pairs: [
          { left: n(70213000), right: n(70000000) },
          { left: n(4700810), right: n(700000) },
          { left: n(315072960), right: n(70000) },
          { left: n(826400007), right: "7" },
        ],
        rightOrder: [2, 3, 0, 1],
        hint: "Tìm chữ số 7 đứng ở hàng nào, rồi viết giá trị của hàng đó.",
        explanation: `7 trong ${n(70213000)} ở hàng chục triệu; trong ${n(4700810)} ở hàng trăm nghìn; trong ${n(315072960)} ở hàng chục nghìn; trong ${n(826400007)} ở hàng đơn vị.`,
      } satisfies MatchQuestion,
    ],
  },
  {
    id: "viet-tong",
    title: "Viết số thành tổng",
    questions: [
      expansion("vt-1", 36400502),
      expansion("vt-2", 270018004),
      expansion("vt-3", 4060090),
      {
        id: "vt-4",
        kind: "dien-so",
        prompt: "Điền số còn thiếu.",
        parts: [`${n(50000000)} + ${n(3000000)} +`, { answer: 200000 }, `+ 40 = ${n(53200040)}`],
        hint: "Xem số 53 200 040 còn thiếu hàng nào. Hàng trăm nghìn có chữ số 2.",
        explanation: `${n(53200040)} = ${n(50000000)} + ${n(3000000)} + ${n(200000)} + 40.`,
      },
    ],
  },
  {
    id: "ban-tinh",
    title: "Bàn tính",
    questions: [banTinh("bt-1", 208530047), banTinh("bt-2", 5060900), banTinh("bt-3", 71004320)],
  },
  {
    id: "mot-ti",
    title: "Một tỉ, số liền trước, số liền sau",
    questions: [
      {
        id: "ls-1",
        kind: "dien-so",
        prompt: `Số liền sau của ${n(99999999)} là số nào?`,
        parts: ["Số liền sau là", { answer: 100000000 }],
        hint: "Thêm 1. Tám chữ số 9 thêm 1 thì sao?",
        explanation: `${n(99999999)} + 1 = ${n(100000000)}, số có chín chữ số.`,
      },
      {
        id: "ls-2",
        kind: "dien-so",
        prompt: `Số liền trước của ${n(10000000)} là số nào?`,
        parts: ["Số liền trước là", { answer: 9999999 }],
        hint: "Bớt 1. Cẩn thận: số này có chữ số 0 ở nhiều hàng.",
        explanation: `${n(10000000)} − 1 = ${n(9999999)}. Số bé đi 1 đơn vị nên còn bảy chữ số.`,
      },
      {
        id: "ls-3",
        kind: "dien-so",
        prompt: `Số ${n(1000000000)} (một tỉ).`,
        parts: ["Có", { answer: 10 }, "chữ số, trong đó có", { answer: 9 }, "chữ số 0."],
        hint: "Đếm các chữ số, nhóm ba chữ số từ phải sang trái. Chữ số 1 đứng một mình ở đầu.",
        explanation: "1 000 000 000 gồm chữ số 1 và ba nhóm 000, tức là 1 + 9 = 10 chữ số, trong đó 9 chữ số 0.",
      },
      {
        id: "ls-4",
        kind: "dien-so",
        prompt: "Số lớn nhất có chín chữ số.",
        parts: ["Số đó là", { answer: 999999999 }],
        hint: "Chữ số lớn nhất là 9. Viết chín chữ số 9.",
        explanation: `Chín chữ số 9: ${n(999999999)}.`,
      },
      {
        id: "ls-5",
        kind: "dien-so",
        prompt: "Số bé nhất có chín chữ số.",
        parts: ["Số đó là", { answer: 100000000 }],
        hint: "Chữ số đầu tiên không thể là 0. Chọn chữ số bé nhất khác 0, các chữ số còn lại là 0.",
        explanation: `Chữ số đầu là 1, tám chữ số còn lại là 0: ${n(100000000)}.`,
      },
    ],
  },
  {
    id: "ghep-so",
    title: "Ghép số, mật khẩu",
    questions: [
      {
        id: "gs-1",
        kind: "dien-so",
        prompt: `Mi cắt hai tờ giấy ghi hai số thành 4 mảnh: 000, ${n(64128)}, ${n(92037)}, 514. Biết số bé hơn có tận cùng là 000.`,
        parts: ["Số bé hơn:", { answer: 64128000 }, "Số lớn hơn:", { answer: 92037514 }],
        hint: "Mảnh 000 là lớp đơn vị của một số, 514 là lớp đơn vị của số kia. Thử ghép rồi xem số nào bé hơn.",
        explanation: `${n(64128000)} và ${n(92037514)}. Nếu ghép cách khác thì được ${n(64128514)} và ${n(92037000)}, khi đó số có tận cùng 000 lại lớn hơn.`,
      },
      {
        id: "gs-2",
        kind: "trac-nghiem",
        prompt: "Mật khẩu của két là số có chín chữ số, lớp nghìn không có chữ số 0 và chữ số ở hàng chục triệu là số lẻ. Số nào là mật khẩu?",
        options: [n(312405678), n(253618940), n(764321105), n(1000000000)],
        answerIndex: 1,
        hint: "Với mỗi số, kiểm tra từng điều kiện: có chín chữ số không, lớp nghìn có 0 không, chữ số hàng chục triệu lẻ không.",
        explanation: `${n(253618940)}: lớp nghìn 618 không có 0, chữ số hàng chục triệu là 5 (số lẻ). ${n(312405678)} có 0 ở lớp nghìn (405); ${n(764321105)} có chữ số hàng chục triệu là 6 (số chẵn); ${n(1000000000)} có 10 chữ số.`,
      },
      {
        id: "gs-3",
        kind: "dien-so",
        prompt: "Rô-bốt có ba mảnh ghép 407, 096, 250. Ghép ba mảnh thành số có chín chữ số lớn nhất.",
        parts: ["Số lớn nhất:", { answer: 407250096 }],
        hint: "Số lớn nhất thì lớp triệu phải lớn nhất. Mảnh 096 bắt đầu bằng 0 nên không đứng đầu được.",
        explanation: `Lớp triệu lớn nhất là 407, rồi đến 250, cuối cùng 096: ${n(407250096)}.`,
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "st-1",
        kind: "trac-nghiem",
        prompt: `Nam viết số "${docSo(50002000)}" là ${n(50200000)}. Số đúng là số nào?`,
        options: [n(50002000), n(50020000), n(52000000), n(50200000)],
        answerIndex: 0,
        hint: "Lớp nghìn là 002 (không trăm linh hai). Chia số thành ba lớp rồi viết lại.",
        explanation: `Lớp triệu là 50, lớp nghìn là 002, lớp đơn vị là 000. Số đúng là ${n(50002000)}. Nam để số 2 ở hàng trăm nghìn, nên ${n(50200000)} đọc là năm mươi triệu hai trăm nghìn.`,
      },
      {
        id: "st-2",
        kind: "dien-so",
        prompt: `Thêm một chữ số 0 vào bên phải số ${n(8500000)}. Số mới gấp số cũ mấy lần?`,
        parts: ["Gấp", { answer: 10 }, "lần"],
        hint: "Viết số mới ra, rồi thử: mỗi chữ số dịch sang hàng cao hơn một hàng.",
        explanation: `Số mới là ${n(85000000)}. Mỗi chữ số dịch sang trái một hàng, giá trị gấp 10 lần: ${n(85000000)} = ${n(8500000)} × 10.`,
      },
      {
        id: "st-3",
        kind: "noi-cap",
        prompt: "Ô chữ số: nối mỗi manh mối với số đúng.",
        pairs: [
          { left: `Số liền sau của ${n(999999999)}`, right: n(clueNumbers[0]) },
          { left: "Ba trăm hai mươi triệu", right: n(clueNumbers[1]) },
          { left: `${n(2000000)} + ${n(100000)} + ${n(50000)} + ${n(2000)}`, right: n(clueNumbers[2]) },
          { left: `Số liền trước của ${n(1000000)}`, right: n(clueNumbers[3]) },
        ],
        rightOrder: clueRightOrder,
        hint: "Làm từng manh mối ra một số rồi tìm số đó ở cột bên phải.",
        explanation: `${n(999999999)} + 1 = ${n(1000000000)}; ba trăm hai mươi triệu là ${n(320000000)}; ${n(2000000)} + ${n(100000)} + ${n(50000)} + ${n(2000)} = ${n(2152000)}; ${n(1000000)} − 1 = ${n(999999)}.`,
      },
      {
        id: "st-4",
        kind: "dien-so",
        prompt: "Một tỉ gấp một triệu bao nhiêu lần?",
        parts: ["Gấp", { answer: 1000 }, "lần"],
        hint: `Một triệu là ${n(1000000)} (6 chữ số 0). Một tỉ là ${n(1000000000)} (9 chữ số 0). Hơn nhau mấy chữ số 0?`,
        explanation: `Một tỉ hơn một triệu 3 chữ số 0, mà mỗi chữ số 0 thêm vào làm số gấp 10 lần: 10 × 10 × 10 = 1 000. Vậy ${n(1000000000)} = ${n(1000000)} × 1 000.`,
      },
    ],
  },
];
