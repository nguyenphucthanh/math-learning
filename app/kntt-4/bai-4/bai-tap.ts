import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { createElement } from "react";
import { QuangDuong } from "./_illustrations/quang-duong";

export type Vars = Record<string, number>;

/**
 * Tính biểu thức có chữ: ngoặc làm trước; nhân, chia trước cộng, trừ; cùng cấp thì từ trái sang phải.
 * Chữ cái được thay bằng giá trị trong `vars`.
 */
export function evalExpr(text: string, vars: Vars = {}): number {
  const tokens = text.match(/\d+|[a-z]|[+\-−×:()]/g) ?? [];
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

/** Thay chữ bằng số: "35 + 5 × a" với a = 6 thành "35 + 5 × 6". */
export function substitute(text: string, vars: Vars): string {
  return text.replace(/[a-z]/g, (letter) => String(vars[letter]));
}

const describeVars = (vars: Vars) =>
  Object.entries(vars)
    .map(([letter, value]) => `${letter} = ${value}`)
    .join(", ");

/** Lời giải một lần thay số: "Với a = 6: 35 + 5 × 6 = 65." */
function explainOnce(text: string, vars: Vars): string {
  return `Với ${describeVars(vars)}: ${text.replace(/[a-z]/g, (l) => String(vars[l]))} = ${evalExpr(text, vars)}.`;
}

const ORDER_HINT = "Có dấu ngoặc thì tính trong ngoặc trước. Nhân, chia làm trước cộng, trừ. Thay chữ bằng số rồi mới tính.";
const FORMULA_HINT = "Thay chữ trong công thức bằng số đo rồi tính.";

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}

function fill(id: string, prompt: string, parts: FillQuestion["parts"], hint: string, explanation: string, illustration?: FillQuestion["illustration"]): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation, ...(illustration ? { illustration } : {}) };
}

/** Câu tính giá trị: đáp án lấy từ `evalExpr`, không gõ tay. */
function value(id: string, expression: string, vars: Vars, hint = ORDER_HINT): FillQuestion {
  return fill(
    id,
    "Tính giá trị của biểu thức.",
    [`${expression} với ${describeVars(vars)} =`, { answer: evalExpr(expression, vars) }],
    hint,
    explainOnce(expression, vars),
  );
}

/** Khởi động đầu bài: thứ tự phép tính, chu vi hình vuông, ngoặc với phép trừ. Không tính vào tiến độ. */
export const warmUps: Question[] = [
  fill(
    "kd-thu-tu",
    "Tính giá trị của hai biểu thức.",
    ["8 + 3 × 2 =", { answer: evalExpr("8 + 3 × 2") }, "; (8 + 3) × 2 =", { answer: evalExpr("(8 + 3) × 2") }],
    "Nhân làm trước cộng. Có dấu ngoặc thì tính trong ngoặc trước.",
    "8 + 3 × 2 = 8 + 6 = 14 (nhân trước). (8 + 3) × 2 = 11 × 2 = 22 (ngoặc trước).",
  ),
  fill(
    "kd-chu-vi",
    "Hình vuông có cạnh dài 5 cm. Tính chu vi.",
    ["Chu vi:", { answer: 5 * 4 }, "cm"],
    "Chu vi hình vuông là tổng bốn cạnh bằng nhau.",
    "5 × 4 = 20. Chu vi hình vuông là 20 cm.",
  ),
  fill(
    "kd-ngoac-tru",
    "Tính giá trị của hai biểu thức.",
    ["20 − (7 + 3) =", { answer: evalExpr("20 − (7 + 3)") }, "; 20 − 7 + 3 =", { answer: evalExpr("20 − 7 + 3") }],
    "Cái thứ nhất tính trong ngoặc trước. Cái thứ hai chỉ có cộng, trừ: tính từ trái sang phải.",
    "20 − (7 + 3) = 20 − 10 = 10. 20 − 7 + 3 = 13 + 3 = 16. Ngoặc làm kết quả khác nhau.",
  ),
];

/** Câu thử trong phần Lý thuyết, không tính vào tiến độ. */
export const quickChecks = {
  viet: {
    id: "thu-viet",
    kind: "trac-nghiem",
    prompt: "Nam gấp 5 cái thuyền. Mai gấp a cái thuyền. Hai bạn gấp được tất cả bao nhiêu cái thuyền?",
    options: ["5 + a", "5 − a", "5 × a", "a"],
    answerIndex: 0,
    hint: "Hai bạn gấp chung thì ta gộp lại, dùng phép tính nào?",
    explanation: "Gộp số thuyền của hai bạn là phép cộng: 5 + a. Nếu a = 3 thì hai bạn gấp 5 + 3 = 8 cái.",
  },
  thay: value("thu-thay", "50 − b", { b: 20 }, "Thay chữ b bằng 20 rồi tính 50 − 20."),
  chuVi: fill(
    "thu-chu-vi",
    "Chu vi P của hình vuông có cạnh a được tính theo công thức P = a × 4. Tính chu vi hình vuông với a = 8 cm.",
    ["P = 8 × 4 =", { answer: evalExpr("a × 4", { a: 8 }) }, "cm"],
    FORMULA_HINT,
    "Thay a = 8: P = 8 × 4 = 32. Chu vi là 32 cm.",
  ),
  thuTu: value("thu-thu-tu", "20 + 4 × a", { a: 3 }, "Thay a = 3 được 20 + 4 × 3. Nhân trước rồi mới cộng."),
} satisfies Record<string, Question>;

const hoatDongQuestions: Question[] = [
  choice(
    "hd-1",
    "Biểu thức nào là biểu thức chứa chữ?",
    ["12 + 5", "b × 7", "9 − 4 = 5", "(6 + 3) : 3"],
    1,
    "Biểu thức chứa chữ có một chữ thay cho số.",
    "b × 7 có chữ b thay cho số, nên là biểu thức chứa chữ. 12 + 5 và (6 + 3) : 3 chỉ có số. 9 − 4 = 5 là một phép tính có kết quả, không phải biểu thức chứa chữ.",
  ),
  fill(
    "hd-2",
    "Tính giá trị của biểu thức.",
    ["144 : m với m = 6:", { answer: evalExpr("144 : m", { m: 6 }) }, "; (b + 5) × 4 với b = 13:", { answer: evalExpr("(b + 5) × 4", { b: 13 }) }],
    ORDER_HINT,
    `${explainOnce("144 : m", { m: 6 })} ${explainOnce("(b + 5) × 4", { b: 13 })} Trong ngoặc làm trước: 13 + 5 = 18, rồi 18 × 4 = 72.`,
  ),
  fill(
    "hd-3",
    "Chu vi P của hình vuông có độ dài cạnh a được tính theo công thức P = a × 4. Tính chu vi hình vuông với a = 7 cm; a = 12 cm.",
    ["a = 7 cm: P =", { answer: evalExpr("a × 4", { a: 7 }) }, "cm; a = 12 cm: P =", { answer: evalExpr("a × 4", { a: 12 }) }, "cm"],
    FORMULA_HINT,
    "Với a = 7: P = 7 × 4 = 28. Với a = 12: P = 12 × 4 = 48.",
  ),
  (() => {
    const as = [2, 5, 7, 6];
    const rights = as.map((a) => String(evalExpr("30 + 4 × a", { a })));
    return {
      id: "hd-4",
      kind: "noi-cap",
      prompt: "Nối mỗi giá trị của a với giá trị của biểu thức 30 + 4 × a.",
      pairs: as.map((a, index) => ({ left: `a = ${a}`, right: rights[index] })),
      rightOrder: [1, 0, 3, 2],
      hint: "Thay a bằng số rồi tính: nhân 4 × a trước, cộng 30 sau.",
      explanation: as.map((a) => explainOnce("30 + 4 × a", { a })).join(" "),
    } satisfies MatchQuestion;
  })(),
];

const luyenTap1Questions: Question[] = [
  (() => {
    const sizes: [number, number][] = [
      [18, 9],
      [30, 14],
      [42, 25],
    ];
    const answers = sizes.map(([a, b]) => evalExpr("(a + b) × 2", { a, b }));
    return fill(
      "lt1-1",
      "Chu vi P của hình chữ nhật có chiều dài a, chiều rộng b (cùng đơn vị đo) được tính theo công thức P = (a + b) × 2. Tính chu vi hình chữ nhật theo kích thước sau.",
      sizes.flatMap(([a, b], index) => [`${index === 0 ? "" : "; "}dài ${a} cm, rộng ${b} cm: P =`, { answer: answers[index] }]),
      "Cộng chiều dài với chiều rộng trong ngoặc trước, rồi nhân với 2.",
      sizes.map(([a, b]) => explainOnce("(a + b) × 2", { a, b })).join(" "),
    );
  })(),
  fill(
    "lt1-2",
    "Tính giá trị của biểu thức.",
    [
      "a + b × 2 với a = 9, b = 3:",
      { answer: evalExpr("a + b × 2", { a: 9, b: 3 }) },
      "; (a + b) : 2 với a = 18, b = 22:",
      { answer: evalExpr("(a + b) : 2", { a: 18, b: 22 }) },
    ],
    ORDER_HINT,
    `${explainOnce("a + b × 2", { a: 9, b: 3 })} Nhân trước: 3 × 2 = 6, rồi 9 + 6 = 15. ${explainOnce("(a + b) : 2", { a: 18, b: 22 })} Ngoặc trước: 18 + 22 = 40, rồi 40 : 2 = 20.`,
  ),
  (() => {
    const cases: Vars[] = [
      { m: 5, n: 6 },
      { m: 7, n: 9 },
    ];
    return fill(
      "lt1-3",
      "Quãng đường ABCD gồm ba đoạn: AB dài m km, BC dài 8 km, CD dài n km. Tính độ dài quãng đường ABCD.",
      cases.flatMap((vars, index) => [`${index === 0 ? "" : "; "}m = ${vars.m} km, n = ${vars.n} km: dài`, { answer: evalExpr("m + 8 + n", vars) }, "km"]),
      "Độ dài cả quãng đường là tổng ba đoạn: m + 8 + n.",
      cases.map((vars) => explainOnce("m + 8 + n", vars)).join(" "),
      createElement(QuangDuong, { middle: "8 km" }),
    );
  })(),
  (() => {
    const ms = [1, 2, 3];
    return fill(
      "lt1-4a",
      "Tính giá trị của biểu thức 18 : (4 − m) với m = 1; m = 2; m = 3.",
      ms.flatMap((m, index) => [`${index === 0 ? "" : "; "}m = ${m}:`, { answer: evalExpr("18 : (4 − m)", { m }) }]),
      "Tính trong ngoặc trước: 4 − m. Rồi lấy 18 chia cho kết quả.",
      ms.map((m) => explainOnce("18 : (4 − m)", { m })).join(" "),
    );
  })(),
  choice(
    "lt1-4b",
    "Trong ba giá trị vừa tìm ở câu trước, với m bằng bao nhiêu thì 18 : (4 − m) có giá trị lớn nhất?",
    ["m = 1", "m = 2", "m = 3"],
    2,
    "So sánh ba giá trị: 6, 9 và 18.",
    "Ba giá trị là 6, 9, 18. Lớn nhất là 18, ứng với m = 3.",
  ),
];

const luyenTap2Questions: Question[] = [
  (() => {
    const cases: [Vars, string][] = [
      [{ a: 48, b: 65, c: 77 }, "cm"],
      [{ a: 40, b: 53, c: 69 }, "dm"],
    ];
    return fill(
      "lt2-1",
      "Chu vi P của hình tam giác có độ dài ba cạnh lần lượt là a, b, c (cùng đơn vị đo) được tính theo công thức P = a + b + c. Tính chu vi hình tam giác.",
      cases.flatMap(([vars, unit], index) => [`${index === 0 ? "" : "; "}a = ${vars.a}, b = ${vars.b}, c = ${vars.c} (${unit}): P =`, { answer: evalExpr("a + b + c", vars) }, unit]),
      "Cộng độ dài ba cạnh: a + b + c.",
      cases.map(([vars]) => explainOnce("a + b + c", vars)).join(" "),
    );
  })(),
  (() => {
    const vars = { m: 8, n: 5, p: 3 };
    const forms = ["m − (n − p)", "m × (n − p)", "m × n − m × p", "m − n + p"];
    return fill(
      "lt2-2",
      "Với m = 8, n = 5, p = 3, tính giá trị của bốn biểu thức: (A) m − (n − p); (B) m × (n − p); (C) m × n − m × p; (D) m − n + p.",
      forms.flatMap((form, index) => [`${"ABCD"[index]} =`, { answer: evalExpr(form, vars) }, ...(index < 3 ? [";"] : [])]),
      "Thay số rồi tính từng biểu thức. Ngoặc làm trước, nhân làm trước trừ.",
      forms.map((form, index) => `${"ABCD"[index]}: ${substitute(form, vars)} = ${evalExpr(form, vars)}.`).join(" "),
    );
  })(),
  choice(
    "lt2-3",
    "Với m = 8, n = 5, p = 3, hai biểu thức nào cùng có giá trị 16?",
    ["A và D", "B và C", "A và B", "C và D"],
    1,
    "Nhìn lại bốn giá trị vừa tính, tìm hai biểu thức cùng bằng 16.",
    "B = 16 và C = 16. A và D cùng bằng 6. Vậy có hai cặp bằng nhau: A và D, B và C.",
  ),
];

/** Nối biểu thức (ô trên bàn cờ) với giá trị; giá trị tính từ biểu thức. */
function matchCells(id: string, cells: { text: string; vars?: Vars; label?: string }[], rightOrder: number[]): MatchQuestion {
  const results = cells.map((cell) => String(evalExpr(cell.text, cell.vars ?? {})));
  return {
    id,
    kind: "noi-cap",
    prompt: "Nối mỗi biểu thức với quả bưởi ghi giá trị của nó.",
    pairs: cells.map((cell, index) => ({ left: cell.label ?? cell.text, right: results[index] })),
    rightOrder,
    hint: ORDER_HINT,
    explanation: cells.map((cell, index) => `${cell.label ?? cell.text} = ${results[index]}.`).join(" "),
  };
}

const haiBuoiQuestions: Question[] = [
  matchCells(
    "hb-1",
    [
      { text: "3 × (8 − 3)" },
      { text: "a × 4", vars: { a: 6 }, label: "a × 4 (a = 6)" },
      { text: "50 − (25 − 7)" },
      { text: "a + b", vars: { a: 9, b: 7 }, label: "a + b (a = 9, b = 7)" },
      { text: "36 − (9 + 5)" },
    ],
    [2, 3, 4, 0, 1],
  ),
  matchCells(
    "hb-2",
    [
      { text: "24 : (7 − 3)" },
      { text: "a × a", vars: { a: 6 }, label: "a × a (a = 6)" },
      { text: "5 + 4 × 3" },
      { text: "(m − 2) × 8", vars: { m: 9 }, label: "(m − 2) × 8 (m = 9)" },
      { text: "a + b + c", vars: { a: 12, b: 4, c: 9 }, label: "a + b + c (a = 12, b = 4, c = 9)" },
    ],
    [1, 2, 3, 4, 0],
  ),
];

const suyNghiQuestions: Question[] = [
  choice(
    "sn-1",
    "An tính giá trị của 20 + 5 × a với a = 2 như sau: 20 + 5 × 2 = 25 × 2 = 50. An sai ở đâu?",
    ["Phải nhân trước: 5 × 2 = 10, rồi 20 + 10 = 30", "Phải thay a = 5", "Không sai, 50 là đúng"],
    0,
    "Biểu thức có cả cộng và nhân. Phép nào làm trước?",
    "Nhân làm trước cộng. 5 × 2 = 10, rồi 20 + 10 = 30. An đã cộng 20 + 5 trước nên ra 50, là sai.",
  ),
  choice(
    "sn-2",
    "Khi a càng lớn (a không vượt quá 40) thì giá trị của biểu thức 40 − a thế nào?",
    ["Càng bé", "Càng lớn", "Không đổi"],
    0,
    "Thử a = 10, a = 20, a = 30 rồi so sánh các giá trị.",
    "40 − 10 = 30; 40 − 20 = 20; 40 − 30 = 10. a càng lớn thì lấy đi càng nhiều, nên giá trị càng bé.",
  ),
  choice(
    "sn-3",
    "Mỗi hộp có 8 cái bút. Có a hộp như vậy. Biểu thức nào chỉ số bút ở tất cả các hộp?",
    ["a × 8", "a + 8", "a − 8", "8 : a"],
    0,
    "Có a hộp, mỗi hộp 8 cái bút. Phép tính nào cho tất cả?",
    `Mỗi hộp 8 cái, có a hộp nên số bút là a × 8. Ví dụ a = 5 thì có ${evalExpr("a × 8", { a: 5 })} cái bút.`,
  ),
  (() => {
    const vars = { a: 8, b: 2 };
    return fill(
      "sn-4",
      "Hai biểu thức nhìn giống nhau nhưng khác ngoặc. Tính với a = 8, b = 2.",
      ["(a + b) × 2 =", { answer: evalExpr("(a + b) × 2", vars) }, "; a + b × 2 =", { answer: evalExpr("a + b × 2", vars) }],
      ORDER_HINT,
      "(a + b) × 2 = (8 + 2) × 2 = 10 × 2 = 20 (ngoặc trước). a + b × 2 = 8 + 2 × 2 = 8 + 4 = 12 (nhân trước). Có ngoặc hay không, giá trị khác nhau.",
    );
  })(),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "hoat-dong", title: "Khám phá và hoạt động (trang 14, 15)", questions: hoatDongQuestions },
  { id: "luyen-tap-1", title: "Luyện tập 1 (trang 16, 17)", questions: luyenTap1Questions },
  { id: "luyen-tap-2", title: "Luyện tập 2 (trang 17)", questions: luyenTap2Questions },
  { id: "hai-buoi", title: "Trò chơi Hái bưởi (trang 18)", questions: haiBuoiQuestions },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiQuestions },
];
