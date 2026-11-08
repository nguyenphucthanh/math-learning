import type { ChoiceQuestion, DatTinhQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainColumnAdd } from "@/lib/column-add";
import { explainColumnDiv } from "@/lib/column-div";
import { explainColumnMul } from "@/lib/column-mul";
import { explainColumnSub } from "@/lib/column-sub";

const n = formatNumber;

export type Vars = Record<string, number>;

/**
 * Tính giá trị biểu thức có số, chữ, + − × : và ngoặc.
 * Ngoặc làm trước; nhân, chia trước cộng, trừ; cùng cấp thì từ trái sang phải. Chữ được thay bằng giá trị trong `vars`.
 */
export function evalExpr(text: string, vars: Vars = {}): number {
  const tokens = text.replace(/(?<=\d)[\s ](?=\d)/g, "").match(/\d+|[a-z]|[+\-−×:()]/g) ?? [];
  let at = 0;
  const factor = (): number => {
    const token = tokens[at++];
    if (token === "(") {
      const value = expr();
      at++;
      return value;
    }
    if (/^[a-z]$/.test(token)) {
      if (!(token in vars)) throw new Error(`Chưa có giá trị của ${token}`);
      return vars[token];
    }
    return Number(token);
  };
  const term = (): number => {
    let value = factor();
    while (tokens[at] === "×" || tokens[at] === ":") {
      const op = tokens[at++];
      const right = factor();
      value = op === ":" ? value / right : value * right;
    }
    return value;
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

/** Làm tròn đến hàng `unit` (10, 1 000, 10 000...): chữ số bên phải từ 5 trở lên thì làm tròn lên. */
export function roundTo(value: number, unit: number): number {
  return Math.round(value / unit) * unit;
}

const isOdd = (value: number) => value % 2 === 1;

type Calc = { text: string; value: number };
const calc = (text: string): Calc => ({ text, value: evalExpr(text) });

type Step = { label: string; calc: Calc; unit: string };
const step = (label: string, text: string, unit: string): Step => ({ label, calc: calc(text), unit });

const ADD_HINT = "Cộng từ hàng đơn vị sang trái. Hàng nào cộng được từ 10 trở lên thì viết chữ số đơn vị và nhớ 1 sang hàng bên trái.";
const SUB_HINT =
  "Trừ từ hàng đơn vị sang trái. Hàng nào không trừ được thì lấy 10 trừ, viết kết quả và nhớ 1; hàng bên trái trừ 1 rồi mới trừ số trừ.";
const MUL_HINT = "Nhân từng chữ số với số nhân, từ hàng đơn vị sang trái. Viết chữ số đơn vị của tích, nhớ phần chục sang hàng bên trái.";
const DIV_HINT = "Chia từ hàng cao nhất. Mỗi lần: chia, nhân, trừ, rồi hạ chữ số tiếp theo. Chưa chia được thì viết 0 ở thương. Số dư bé hơn số chia.";
const ORDER_HINT = "Có dấu ngoặc thì tính trong ngoặc trước. Nhân, chia làm trước cộng, trừ. Cùng cấp thì tính từ trái sang phải.";

function addQ(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", a, b, hint: ADD_HINT, explanation: explainColumnAdd(a, b) };
}

function subQ(id: string, a: number, b: number): DatTinhQuestion {
  return { id, kind: "dat-tinh", op: "-", a, b, hint: SUB_HINT, explanation: explainColumnSub(a, b) };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function fill(id: string, prompt: string | undefined, parts: Part[], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", ...(prompt ? { prompt } : {}), parts, hint, explanation };
}

/** Bài toán viết thành các dòng bài giải; đáp án và lời giải đều lấy từ cùng các phép tính. */
function solution(id: string, prompt: string, steps: Step[], answer: string, hint: string): WordQuestion {
  return {
    id,
    kind: "loi-van",
    prompt,
    lines: steps.map(({ label, calc: c, unit }): Part[] => [`${label} ${c.text} =`, { answer: c.value }, `(${unit})`]),
    hint,
    explanation: `${steps.map(({ label, calc: c, unit }) => `${label} ${c.text} = ${n(c.value)} (${unit}).`).join(" ")} Đáp số: ${answer}.`,
  };
}

/** Giá trị của biểu thức có chữ, đáp án từ `evalExpr`. */
function withLetters(id: string, text: string, vars: Vars): FillQuestion {
  const given = Object.entries(vars)
    .map(([letter, value]) => `${letter} = ${n(value)}`)
    .join(", ");
  const replaced = text.replace(/[a-z]/g, (letter) => n(vars[letter]));
  return fill(
    id,
    "Tính giá trị của biểu thức.",
    [`${text} với ${given} =`, { answer: evalExpr(text, vars) }],
    "Thay chữ bằng số rồi tính. Nhân, chia làm trước cộng, trừ.",
    `Với ${given}: ${replaced} = ${n(evalExpr(text, vars))}.`,
  );
}

function expression(id: string, text: string, hint = ORDER_HINT): FillQuestion {
  return fill(id, "Tính giá trị của biểu thức.", [`${text} =`, { answer: evalExpr(text) }], hint, `${text} = ${n(evalExpr(text))}.`);
}

/** Bốn số của bài 1, trang 21 (đổi số liệu). */
export const numbers = [72058, 70986, 72305, 69871];
const sorted = [...numbers].sort((a, b) => a - b);
const smallest = sorted[0];
const biggest = sorted[sorted.length - 1];

const pairs: [number, number][] = [
  [0, 1],
  [2, 3],
  [1, 2],
  [0, 3],
];
const pairIndex = pairs.findIndex(([a, b]) => isOdd(numbers[a]) && isOdd(numbers[b]));

/** Ba bạn tiết kiệm, mỗi bạn một biểu thức. */
export const savings = [
  { name: "Hà", text: "60 000 + 5 000 × 7" },
  { name: "Mai", text: "30 000 + 20 000 × 3" },
  { name: "Nam", text: "6 000 × 8 + 40 000" },
];
const savingValues = savings.map((item) => evalExpr(item.text));
const richest = savingValues.indexOf(Math.max(...savingValues));

/** Hai phép chia đặt tính: một chia hết, một có dư. */
export const divisions = { exact: { a: 31248, d: 6 }, remainder: { a: 64573, d: 9 } };
const rem = divisions.remainder;

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  choice(
    "kd-chan-le",
    "Số nào dưới đây là số chẵn?",
    [n(4713), n(4802), n(4731)],
    1,
    "Nhìn chữ số tận cùng. Chẵn là 0, 2, 4, 6, 8.",
    `${n(4802)} có chữ số tận cùng là 2 nên là số chẵn. ${n(4713)} và ${n(4731)} tận cùng là 3 và 1 nên là số lẻ.`,
  ),
  fill(
    "kd-lam-tron",
    undefined,
    [`Làm tròn ${n(7346)} đến hàng chục: `, { answer: roundTo(7346, 10) }],
    "Nhìn chữ số hàng đơn vị. Từ 5 trở lên thì làm tròn lên.",
    `Hàng đơn vị là 6, lớn hơn 5, nên làm tròn lên: ${n(7346)} ≈ ${n(7350)}.`,
  ),
  expression("kd-thu-tu", "12 + 4 × 5", "Nhân trước, cộng sau."),
];

export const quickChecks = {
  chanLe: fill(
    "thu-chan-le",
    undefined,
    ["Số lẻ bé nhất có ba chữ số là", { answer: 101 }],
    "Số bé nhất có ba chữ số là 100. 100 là số chẵn hay lẻ?",
    "100 là số chẵn. Số liền sau 100 là 101, tận cùng là 1 nên là số lẻ. Vậy 101 là số lẻ bé nhất có ba chữ số.",
  ),
  lamTron: fill(
    "thu-lam-tron",
    undefined,
    [`Làm tròn ${n(48261)} đến hàng chục nghìn: `, { answer: roundTo(48261, 10000) }],
    "Nhìn chữ số ở hàng nghìn, là chữ số ngay bên phải hàng chục nghìn.",
    `Hàng chục nghìn là 4, chữ số hàng nghìn là 8, lớn hơn 5 nên làm tròn lên: ${n(48261)} ≈ ${n(50000)}.`,
  ),
  thuLai: fill(
    "thu-thu-lai",
    "Phép chia 38 : 5 = 7 (dư 3).",
    ["Thử lại: 7 × 5 + 3 =", { answer: 7 * 5 + 3 }],
    "Thương nhân số chia, rồi cộng số dư.",
    "7 × 5 = 35, 35 + 3 = 38. Đúng bằng số bị chia, nên phép chia đúng.",
  ),
  thuTu: expression("thu-thu-tu", "80 − 6 × 5", "Nhân trước, trừ sau."),
  tienThoi: solution(
    "thu-tien-thoi",
    "Mai mua 3 gói kẹo, mỗi gói 4 000 đồng, và đưa cô bán hàng tờ 20 000 đồng. Hỏi cô bán hàng phải trả lại Mai bao nhiêu tiền?",
    [step("Tiền mua kẹo:", `3 × ${n(4000)}`, "đồng"), step("Tiền trả lại:", `${n(20000)} − ${n(12000)}`, "đồng")],
    `${n(8000)} đồng`,
    "Tìm số tiền mua kẹo trước, rồi lấy số tiền đưa trừ đi.",
  ),
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "so-100000",
    title: "Các số đến 100 000 (Bài 1, Bài 3)",
    questions: [
      choice(
        "so-chan-le",
        `Cho các số: ${numbers.map(n).join("; ")}. Hai số nào là số lẻ?`,
        pairs.map(([a, b]) => `${n(numbers[a])} và ${n(numbers[b])}`),
        pairIndex,
        "Nhìn chữ số tận cùng của từng số. Lẻ là 1, 3, 5, 7, 9.",
        `${n(72058)} và ${n(70986)} tận cùng là 8 và 6 nên là số chẵn. ${n(72305)} tận cùng là 5 và ${n(69871)} tận cùng là 1 nên là hai số lẻ.`,
      ),
      fill(
        "so-sap-xep",
        `Viết các số ${numbers.map(n).join("; ")} theo thứ tự từ bé đến lớn.`,
        [{ answer: sorted[0] }, "<", { answer: sorted[1] }, "<", { answer: sorted[2] }, "<", { answer: sorted[3] }],
        "So sánh từ hàng cao nhất. Số có chữ số hàng chục nghìn bé hơn thì bé hơn; bằng nhau thì xét hàng nghìn.",
        `Hàng chục nghìn: 6 < 7. Vậy ${n(69871)} bé nhất. Ba số còn lại cùng 7 chục nghìn, xét hàng nghìn: 0 < 2 và hai số kia cùng 2 nghìn; xét hàng trăm: 0 < 3. Thứ tự: ${sorted.map(n).join(" < ")}.`,
      ),
      fill(
        "so-tron-chuc",
        "Làm tròn số bé nhất trong các số trên đến hàng chục.",
        [`${n(smallest)} ≈`, { answer: roundTo(smallest, 10) }],
        "Số bé nhất là số nào? Nhìn chữ số hàng đơn vị: từ 5 trở lên thì làm tròn lên.",
        `Số bé nhất là ${n(smallest)}. Hàng đơn vị là 1, bé hơn 5, nên giữ nguyên chữ số hàng chục: ${n(smallest)} ≈ ${n(roundTo(smallest, 10))}.`,
      ),
      fill(
        "so-tron-chuc-nghin",
        "Làm tròn số lớn nhất trong các số trên đến hàng chục nghìn.",
        [`${n(biggest)} ≈`, { answer: roundTo(biggest, 10000) }],
        "Số lớn nhất là số nào? Nhìn chữ số hàng nghìn, ngay bên phải hàng chục nghìn.",
        `Số lớn nhất là ${n(biggest)}. Hàng chục nghìn là 7, chữ số hàng nghìn là 2, bé hơn 5, nên giữ nguyên: ${n(biggest)} ≈ ${n(roundTo(biggest, 10000))}.`,
      ),
      fill(
        "so-nha",
        "Bác Lan nói: “Số nhà bác là số chẵn lớn nhất có ba chữ số.” Em hãy tìm số nhà của bác Lan.",
        ["Số nhà của bác Lan là", { answer: 998 }],
        "Số lớn nhất có ba chữ số là 999. Số đó chẵn hay lẻ?",
        "999 là số lớn nhất có ba chữ số nhưng là số lẻ. Số chẵn liền trước là 998. Vậy số nhà của bác Lan là 998.",
      ),
    ],
  },
  {
    id: "bon-phep-tinh",
    title: "Bốn phép tính (Bài 2)",
    questions: [
      subQ("dt-tru", 82416, 6275),
      addQ("dt-cong", 45387, 38624),
      {
        id: "dt-nhan",
        kind: "loi-van",
        prompt: "Đặt tính rồi tính và thử lại. Con làm ra vở ô li, rồi điền kết quả.",
        lines: [[`${n(7506)} × 8 =`, { answer: 7506 * 8 }], [`Thử lại: ${n(7506 * 8)} : 8 =`, { answer: 7506 }]],
        hint: MUL_HINT,
        explanation: `${explainColumnMul(7506, 8)} Thử lại: lấy tích chia cho một thừa số thì được thừa số kia, ${n(7506 * 8)} : 8 = ${n(7506)}.`,
      },
      {
        id: "dt-chia-du",
        kind: "loi-van",
        prompt: "Đặt tính rồi tính và thử lại. Con làm ra vở ô li, rồi điền kết quả.",
        lines: [
          [`${n(rem.a)} : ${rem.d} =`, { answer: Math.floor(rem.a / rem.d) }, "dư", { answer: rem.a % rem.d }],
          [`Thử lại: ${n(Math.floor(rem.a / rem.d))} × ${rem.d} + ${rem.a % rem.d} =`, { answer: rem.a }],
        ],
        hint: DIV_HINT,
        explanation: explainColumnDiv(rem.a, rem.d),
      },
      fill(
        "dt-chia-het",
        "Đặt tính rồi tính. Con làm ra vở ô li, rồi điền kết quả.",
        [`${n(divisions.exact.a)} : ${divisions.exact.d} =`, { answer: divisions.exact.a / divisions.exact.d }],
        DIV_HINT,
        explainColumnDiv(divisions.exact.a, divisions.exact.d),
      ),
    ],
  },
  {
    id: "bieu-thuc",
    title: "Biểu thức (Bài 2, Bài 4)",
    questions: [
      withLetters("bt-chu-1", "m + n − 280", { m: 674, n: 395 }),
      withLetters("bt-chu-2", `c + m × n`, { c: 1450, m: 205, n: 4 }),
      expression("bt-ngoac", `(${n(14720)} − ${n(6335)}) × 7`),
      expression("bt-ba-so", `${n(36285)} + ${n(7940)} + ${n(2060)}`, "Hai số nào cộng với nhau ra số tròn nghìn?"),
      {
        id: "bt-tiet-kiem",
        kind: "loi-van",
        prompt: "Giá trị của mỗi biểu thức dưới đây là số tiền tiết kiệm (đồng) của mỗi bạn. Tính số tiền của từng bạn.",
        lines: savings.map((item): Part[] => [`${item.name}: ${item.text} =`, { answer: evalExpr(item.text) }, "(đồng)"]),
        hint: "Mỗi biểu thức có cả nhân và cộng. Nhân trước, cộng sau.",
        explanation: savings.map((item) => `${item.name}: ${item.text} = ${n(evalExpr(item.text))} (đồng).`).join(" "),
      },
      choice(
        "bt-tiet-kiem-chon",
        `Hà: ${savings[0].text}; Mai: ${savings[1].text}; Nam: ${savings[2].text} (đồng). Bạn nào có nhiều tiền tiết kiệm nhất?`,
        savings.map((item) => item.name),
        richest,
        "Tính giá trị từng biểu thức rồi so sánh ba số.",
        `${savings.map((item) => `${item.name} có ${n(evalExpr(item.text))} đồng`).join("; ")}. Hà có nhiều nhất.`,
      ),
    ],
  },
  {
    id: "giai-toan",
    title: "Giải toán (Bài 5)",
    questions: [
      solution(
        "gt-khan-gia",
        `Một trận đấu bóng đá có ${n(41528)} khán giả vào sân xem trực tiếp, trong đó có ${n(12365)} khán giả nữ. Hỏi số khán giả nam nhiều hơn số khán giả nữ bao nhiêu người?`,
        [step("Số khán giả nam:", `${n(41528)} − ${n(12365)}`, "người"), step("Số khán giả nam nhiều hơn số khán giả nữ:", `${n(29163)} − ${n(12365)}`, "người")],
        `${n(16798)} người`,
        "Biết tổng số khán giả và số khán giả nữ thì tìm được số khán giả nam trước. Rồi lấy nam trừ nữ.",
      ),
      solution(
        "gt-tra-lai",
        `Hà mua 1 cái thước giá ${n(7500)} đồng và 4 quyển vở, mỗi quyển giá ${n(6500)} đồng. Hà đưa cô bán hàng tờ ${n(50000)} đồng. Hỏi cô bán hàng phải trả lại Hà bao nhiêu tiền?`,
        [
          step("Tiền mua 4 quyển vở:", `4 × ${n(6500)}`, "đồng"),
          step("Tiền mua cả thước và vở:", `${n(7500)} + ${n(26000)}`, "đồng"),
          step("Tiền cô bán hàng trả lại:", `${n(50000)} − ${n(33500)}`, "đồng"),
        ],
        `${n(16500)} đồng`,
        "Tìm tiền mua vở trước, rồi tiền cả hai món, cuối cùng lấy số tiền đưa trừ đi.",
      ),
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      choice(
        "st-thu-tu",
        `Nam tính ${n(15000)} + ${n(5000)} × 4 = ${n(80000)}. Nam sai ở đâu?`,
        ["Nam cộng trước, nhân sau; phải nhân 5 000 × 4 trước", "Nam nhân sai 5 000 × 4", "Nam viết thiếu một chữ số 0", "Nam không sai"],
        0,
        "Biểu thức không có ngoặc, có cả cộng và nhân. Phép nào làm trước?",
        `${n(5000)} × 4 = ${n(20000)}, rồi ${n(15000)} + ${n(20000)} = ${n(35000)}. Nam đã làm (${n(15000)} + ${n(5000)}) × 4 = ${n(80000)}, như thể có dấu ngoặc.`,
      ),
      choice(
        "st-uoc-luong",
        `Không đặt tính, làm tròn đến hàng chục nghìn để ước lượng: ${n(38912)} + ${n(41087)} gần với số nào nhất?`,
        [n(70000), n(80000), n(90000), n(100000)],
        1,
        "Làm tròn từng số đến hàng chục nghìn rồi cộng hai số tròn.",
        `${n(38912)} ≈ ${n(40000)} và ${n(41087)} ≈ ${n(40000)}. ${n(40000)} + ${n(40000)} = ${n(80000)}. Tổng đúng là ${n(38912 + 41087)}, rất gần ${n(80000)}. Ước lượng giúp phát hiện khi con viết lệch hàng.`,
      ),
      choice(
        "st-du",
        "Chia một số cho 6 thì số dư không thể là số nào dưới đây?",
        ["1", "3", "5", "6"],
        3,
        "Số dư luôn bé hơn số chia.",
        "Số chia là 6 nên số dư chỉ có thể là 0, 1, 2, 3, 4, 5. Số dư 6 là chưa chia hết: còn chia thêm được một lần nữa.",
      ),
    ],
  },
];
