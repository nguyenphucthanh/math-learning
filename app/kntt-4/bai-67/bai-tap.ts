import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { docSo } from "@/lib/doc-so";
import { hangName } from "@/lib/hang-lop";
import { roundToPlace } from "@/lib/round-numbers";

const n = formatNumber;
const nb = (answer: number): Part => ({ answer });
const yesNo = ["Đúng", "Sai"];

/** Số liệu các câu (đổi so với SGK, trừ chỗ gắn với hình: con voi, xe đạp). Test tính lại đáp án bằng cách khác. */

/** Các số hạng khi viết số thành tổng, từ hàng cao xuống thấp, bỏ hàng có chữ số 0. Mỗi số hạng kèm vị trí hàng (0 là đơn vị). */
export function terms(value: number): { position: number; value: number }[] {
  const digits = String(value).split("");
  return digits.flatMap((digit, index) => {
    const position = digits.length - 1 - index;
    return digit === "0" ? [] : [{ position, value: Number(digit) * 10 ** position }];
  });
}

const PLACES = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn", "triệu", "chục triệu", "trăm triệu"];
/** "4 chục nghìn, 8 nghìn, 2 trăm và 6 đơn vị": số gồm những hàng nào (bỏ hàng có chữ số 0). */
export function compose(value: number): string {
  const list = terms(value).map(({ position, value: v }) => `${v / 10 ** position} ${PLACES[position]}`);
  const last = list.pop()!;
  return list.length === 0 ? last : `${list.join(", ")} và ${last}`;
}

/** Bài 11, 12: viết số, đọc số. `wrong` là cách đọc sai hay gặp (sai "linh" / "không trăm", sai lớp). */
export const docSpecs = [
  { id: 1, value: 48206, wrong: ["bốn mươi tám nghìn hai trăm sáu", "bốn mươi tám nghìn hai mươi sáu", "bốn mươi tám nghìn không trăm hai mươi sáu"] },
  { id: 2, value: 507130, wrong: ["năm trăm bảy nghìn một trăm ba mươi", "năm trăm linh bảy nghìn một trăm linh ba", "năm mươi bảy nghìn một trăm ba mươi"] },
  { id: 3, value: 6040805, wrong: ["sáu triệu bốn mươi nghìn tám trăm linh năm", "sáu triệu bốn trăm nghìn tám trăm linh năm", "sáu triệu không trăm bốn mươi nghìn tám trăm năm mươi"] },
  { id: 4, value: 9300270, wrong: ["chín triệu ba trăm nghìn không trăm hai mươi bảy", "chín triệu ba mươi nghìn hai trăm bảy mươi", "chín triệu ba trăm nghìn hai trăm linh bảy"] },
];
export const lopSpec = { value: 5280396, position: 4 };
/** Viết thành tổng. */
export const tongValues = [7205, 61480, 804056, 2605390];
/** Số ?: số hạng ở hàng `hide` bị ẩn. */
export const thieuSpecs = [
  { value: 63405, hide: 0 },
  { value: 215760, hide: 3 },
  { value: 4820301, hide: 4 },
];
/** Giá trị của chữ số: mỗi chữ số chỉ xuất hiện một lần trong số. */
export const giaTriSpecs = [
  { value: 6295, a: 6, b: 9 },
  { value: 80693, a: 6, b: 9 },
  { value: 9506400, a: 6, b: 9 },
];
/** Bài 15, 3: dãy số, Đ/S. `truth` là điều mệnh đề nói có đúng không. */
export const dungSaiSpecs = [
  { id: "a", text: "Số tự nhiên bé nhất là 0.", truth: true, why: "Các số tự nhiên bắt đầu từ 0: 0, 1, 2, 3, ... Không có số tự nhiên nào bé hơn 0." },
  { id: "b", text: `Số liền sau của ${n(3999999)} là ${n(4000000)}.`, truth: true, why: `Số liền sau hơn số đó 1 đơn vị: ${n(3999999)} + 1 = ${n(4000000)}.` },
  { id: "c", text: `Số tự nhiên lớn nhất là ${n(99999999)}.`, truth: false, why: `Sai. ${n(99999999)} + 1 = ${n(100000000)} vẫn là số tự nhiên và lớn hơn. Cứ cộng thêm 1 mãi nên không có số lớn nhất.` },
  { id: "d", text: "Trong dãy số tự nhiên không có số lớn nhất.", truth: true, why: "Đúng. Số nào cũng có số liền sau lớn hơn nó 1 đơn vị, nên không có số lớn nhất." },
  { id: "e", text: `Số liền trước của ${n(1000)} là ${n(900)}.`, truth: false, why: `Sai. Số liền trước kém số đó 1 đơn vị: ${n(1000)} − 1 = 999.` },
  { id: "g", text: "Hai số chẵn liên tiếp hơn kém nhau 1 đơn vị.", truth: false, why: "Sai. Hai số chẵn liên tiếp, như 6 và 8, hơn kém nhau 2 đơn vị. Số ở giữa là số lẻ." },
];
export const honKemSpecs = [
  { id: "tu-nhien", label: "Hai số tự nhiên liên tiếp", step: 1, from: 8099 },
  { id: "chan", label: "Hai số chẵn liên tiếp", step: 2, from: 8100 },
  { id: "le", label: "Hai số lẻ liên tiếp", step: 2, from: 8101 },
];
/** Dãy bốn số: `hidden` là các vị trí (0-3) con phải tìm. */
export const dayKinds = {
  "tu-nhien": "tự nhiên",
  chan: "chẵn",
  le: "lẻ",
} as const;
export const daySpecs: { id: keyof typeof dayKinds; start: number; step: number; hidden: number[] }[] = [
  { id: "tu-nhien", start: 4999, step: 1, hidden: [1, 3] },
  { id: "le", start: 8995, step: 2, hidden: [2, 3] },
  { id: "chan", start: 59996, step: 2, hidden: [1, 3] },
];
/** Lập số từ các thẻ chữ số (mỗi thẻ dùng đúng một lần, số có bốn chữ số). */
export const theSpec = { cards: [0, 3, 4, 7] };
/** Bài 14: so sánh, xếp thứ tự. */
export const voiSpec = [
  { name: "A", kg: 2995 },
  { name: "B", kg: 4850 },
  { name: "C", kg: 4920 },
  { name: "D", kg: 3527 },
];
export const xeSpec = [
  { name: "A", price: 5350000 },
  { name: "B", price: 4900000 },
  { name: "C", price: 5700000 },
  { name: "D", price: 4550000 },
];
export const truongSpec = {
  names: ["Nguyễn Trãi", "Quang Trung", "Nguyễn Du", "Lê Lợi"],
  /** Danh sách số học sinh, chưa biết trường nào. */
  values: [4205, 3918, 3986, 4372],
};
export const sanhSpecs = [
  { id: "ss-1", left: `${n(40000)} + ${n(3000)} + 60`, right: n(43600) },
  { id: "ss-2", left: n(5300700), right: `${n(5000000)} + ${n(300000)} + 70` },
];
/** Bài 13: làm tròn. */
export const danSoSpec = { value: 3482596, places: [3, 4, 5] };
export const tronSpecs = [{ id: "tron-2", value: 749500, place: 3 }];
export const loiSpec = { value: 2718450, wrong: 2719000, place: 3 };

const sign = (a: number, b: number) => (a > b ? ">" : a < b ? "<" : "=");
const sumOf = (text: string) => text.split("+").reduce((total, term) => total + Number(term.replace(/\D/g, "")), 0);

function fill(id: string, prompt: string, parts: Part[], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", prompt, parts, hint, explanation };
}
function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation };
}
function words(id: string, prompt: string, lines: Part[][], hint: string, explanation: string): WordQuestion {
  return { id, kind: "loi-van", prompt, lines, hint, explanation };
}

const SIGNS = [">", "<", "="];
function compare(id: string, left: string, right: string, hint: string, explanation: string): ChoiceQuestion {
  return choice(id, `${left} ? ${right}`, SIGNS, SIGNS.indexOf(sign(sumOf(left), sumOf(right))), hint, explanation);
}

/** Dãy số: các vị trí `hidden` thành ô trống. */
function sequence(start: number, step: number, hidden: number[]): Part[] {
  const parts: Part[] = [];
  let text = "";
  for (let i = 0; i < 4; i++) {
    const value = start + step * i;
    text += i > 0 ? "; " : "";
    if (hidden.includes(i)) {
      parts.push(text, nb(value));
      text = "";
    } else text += n(value);
  }
  if (text) parts.push(text);
  return parts;
}

/** Số tự nhiên chẵn bé nhất / lẻ lớn nhất có bốn chữ số từ các thẻ: thử mọi cách xếp. */
export function arrangements(cards: number[]): number[] {
  const out: number[] = [];
  const go = (used: number[], digits: number[]) => {
    if (digits.length === cards.length) {
      if (digits[0] !== 0) out.push(Number(digits.join("")));
      return;
    }
    cards.forEach((card, i) => {
      if (!used.includes(i)) go([...used, i], [...digits, card]);
    });
  };
  go([], []);
  return out;
}
const smallestEven = (cards: number[]) => Math.min(...arrangements(cards).filter((x) => x % 2 === 0));
const largestOdd = (cards: number[]) => Math.max(...arrangements(cards).filter((x) => x % 2 === 1));

/** Chia bốn trường: Nguyễn Trãi nhiều nhất, Quang Trung hơn Nguyễn Du, Lê Lợi là số lẻ. Trả về số theo thứ tự `names`. */
export function assignSchools(values: number[]): number[][] {
  const perms = (list: number[]): number[][] =>
    list.length < 2 ? [list] : list.flatMap((x, i) => perms([...list.slice(0, i), ...list.slice(i + 1)]).map((p) => [x, ...p]));
  const most = Math.max(...values);
  return perms(values).filter(([nt, qt, nd, ll]) => nt === most && qt > nd && ll % 2 === 1);
}
const [school] = assignSchools(truongSpec.values);
const sortedSchools = [...school].sort((a, b) => a - b);

/** Câu thử trong phần Nhắc lại nhanh, cũng là kiểm tra đầu vào. Không tính vào tiến độ. */
export const quickChecks = {
  doc: choice(
    "thu-doc",
    `Số ${n(3050204)} đọc là:`,
    [docSo(3050204), "ba triệu năm mươi nghìn hai trăm linh bốn", "ba triệu không trăm năm mươi nghìn hai trăm bốn mươi", "ba triệu năm trăm nghìn hai trăm linh bốn"],
    0,
    "Chia số thành ba lớp: triệu 3, nghìn 050, đơn vị 204. Đọc từng lớp.",
    "Lớp nghìn là 050, đọc là không trăm năm mươi nghìn. Lớp đơn vị là 204, đọc là hai trăm linh bốn.",
  ),
  giaTri: fill("thu-gia-tri", `Trong số ${n(1593407)}, chữ số 5 có giá trị là bao nhiêu?`, ["Giá trị của chữ số 5 là", nb(500000)], "Đếm từ hàng đơn vị sang trái: chữ số 5 đứng ở hàng nào?", `Chữ số 5 ở hàng trăm nghìn nên có giá trị ${n(500000)}.`),
  soSanh: compare(
    "thu-so-sanh",
    n(905612),
    n(905162),
    "Hai số cùng sáu chữ số. So từng hàng từ trái sang phải.",
    `Ba hàng đầu giống nhau. Hàng trăm: 6 > 1 nên ${n(905612)} > ${n(905162)}.`,
  ),
  lamTron: fill(
    "thu-lam-tron",
    `Làm tròn ${n(835500)} đến hàng nghìn.`,
    [`${n(835500)} ≈`, nb(roundToPlace(835500, 3))],
    "Nhìn chữ số hàng trăm, ngay bên phải hàng nghìn. Từ 5 trở lên thì làm tròn lên.",
    `Hàng trăm là 5, từ 5 trở lên nên chữ số hàng nghìn tăng 1: 5 thành 6. ${n(835500)} ≈ ${n(836000)}.`,
  ),
  lienSau: fill("thu-lien-sau", `Số liền sau của ${n(999999)} là số nào?`, [nb(1000000)], "Số liền sau hơn số đó 1 đơn vị.", `${n(999999)} + 1 = ${n(1000000)}.`),
  honKem: fill("thu-hon-kem", "Hai số lẻ liên tiếp, như 7 và 9, hơn kém nhau mấy đơn vị?", ["Hơn kém nhau", nb(2), "đơn vị"], "Giữa 7 và 9 có số 8. 8 là số chẵn hay lẻ?", "Số lẻ và số chẵn xen kẽ nhau, nên hai số lẻ liên tiếp hơn kém nhau 2 đơn vị."),
};

const docGroup: Question[] = [
  ...docSpecs.map(({ id, value }) =>
    fill(`viet-${id}`, `Viết số gồm: ${compose(value)}.`, [nb(value)], "Hàng nào không được nhắc tới thì chữ số ở hàng đó là 0. Viết từ hàng cao đến hàng thấp.", `${compose(value)}: ${terms(value).map((t) => n(t.value)).join(" + ")} = ${n(value)}.`),
  ),
  ...docSpecs.map(({ id, value, wrong }) =>
    choice(
      `doc-${id}`,
      `Số ${n(value)} đọc là:`,
      [docSo(value), ...wrong],
      0,
      "Chia số thành từng lớp ba chữ số, đọc từng lớp kèm tên lớp. Chữ số 0 vẫn phải đọc.",
      `${n(value)} đọc là ${docSo(value)}.`,
    ),
  ),
  choice(
    "lop-1",
    `Trong số ${n(lopSpec.value)}, chữ số 8 thuộc hàng nào, lớp nào?`,
    ["Hàng chục nghìn, lớp nghìn", "Hàng nghìn, lớp nghìn", "Hàng trăm nghìn, lớp nghìn", "Hàng chục nghìn, lớp triệu"],
    0,
    "Đếm từ hàng đơn vị sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.",
    `Từ phải sang trái: 6 đơn vị, 9 chục, 3 trăm, 0 nghìn, 8 chục nghìn. Chữ số 8 ở ${hangName(lopSpec.position)}, thuộc lớp nghìn.`,
  ),
];

const tongGroup: Question[] = [
  ...tongValues.map((value) => {
    const list = terms(value);
    const parts: Part[] = [`${n(value)} =`];
    list.forEach((t, index) => {
      if (index > 0) parts.push("+");
      parts.push(nb(t.value));
    });
    return fill(`tong-${value}`, `Viết số thành tổng (theo mẫu ${n(6945)} = ${n(6000)} + 900 + 40 + 5).`, parts, "Đọc từng chữ số từ trái sang phải, nói nó đứng ở hàng nào. Hàng có chữ số 0 thì bỏ qua.", `${n(value)} = ${list.map((t) => n(t.value)).join(" + ")}.`);
  }),
  ...thieuSpecs.map(({ value, hide }) => {
    const list = terms(value);
    const parts: Part[] = [];
    let text = "";
    list.forEach((t, index) => {
      if (t.position === hide) {
        parts.push(text, nb(t.value));
        text = "";
      } else text += `${n(t.value)}`;
      if (index < list.length - 1) text += " + ";
    });
    parts.push(`${text} = ${n(value)}`);
    const hidden = list.find((t) => t.position === hide)!;
    return fill(`thieu-${value}`, "Số ?", parts, `Số hạng thiếu ở ${hangName(hide)}. Chữ số ở hàng đó của ${n(value)} là mấy?`, `Chữ số ở ${hangName(hide)} của ${n(value)} là ${hidden.value / 10 ** hide}, nên số cần điền là ${n(hidden.value)}.`);
  }),
  ...giaTriSpecs.map(({ value, a, b }) => {
    const at = (digit: number) => digit * 10 ** (String(value).length - 1 - String(value).indexOf(String(digit)));
    return fill(
      `gia-tri-${value}`,
      `Trong số ${n(value)}:`,
      [`Giá trị của chữ số ${a} là`, nb(at(a)), `. Giá trị của chữ số ${b} là`, nb(at(b))],
      "Chữ số đó đứng ở hàng nào? Giá trị bằng chữ số nhân với giá trị của hàng.",
      `Chữ số ${a} ở ${hangName(String(value).length - 1 - String(value).indexOf(String(a)))}: ${n(at(a))}. Chữ số ${b} ở ${hangName(String(value).length - 1 - String(value).indexOf(String(b)))}: ${n(at(b))}.`,
    );
  }),
];

const dayGroup: Question[] = [
  ...dungSaiSpecs.map((s) => choice(`ds-${s.id}`, `${s.text} Đúng hay sai?`, yesNo, s.truth ? 0 : 1, "Thử với vài số cụ thể: số liền sau, số liền trước, số lớn hơn nữa.", s.why)),
  ...honKemSpecs.map((s) =>
    fill(
      `hon-kem-${s.id}`,
      `${s.label}, như ${n(s.from)} và ${n(s.from + s.step)}, hơn kém nhau mấy đơn vị?`,
      ["Hơn kém nhau", nb(s.step), "đơn vị"],
      s.step === 1 ? "Hai số liên tiếp là số liền trước và số liền sau." : "Giữa hai số này còn một số nằm giữa. Đó là số chẵn hay số lẻ?",
      `${n(s.from + s.step)} − ${n(s.from)} = ${s.step}. ${s.step === 1 ? "Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị." : "Chẵn và lẻ xen kẽ nhau nên hai số cùng chẵn (hoặc cùng lẻ) liên tiếp hơn kém nhau 2 đơn vị."}`,
    ),
  ),
  ...daySpecs.map((s) => {
    const all = [0, 1, 2, 3].map((i) => n(s.start + s.step * i)).join("; ");
    return fill(
      `day-${s.id}`,
      `Tìm số thích hợp để được bốn số ${dayKinds[s.id]} liên tiếp.`,
      sequence(s.start, s.step, s.hidden),
      s.step === 1 ? "Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị." : `Hai số ${dayKinds[s.id]} liên tiếp hơn kém nhau 2 đơn vị.`,
      `Mỗi số hơn số đứng trước ${s.step} đơn vị. Dãy số: ${all}.`,
    );
  }),
  fill(
    "the-chan",
    `Từ bốn thẻ số ${theSpec.cards.join(", ")} lập được số chẵn bé nhất có bốn chữ số.`,
    ["Số chẵn bé nhất là", nb(smallestEven(theSpec.cards))],
    "Số chẵn tận cùng bằng 0, 2, 4, 6 hoặc 8. Chữ số đầu tiên phải khác 0. Chọn chữ số bé nhất cho hàng cao nhất.",
    `Chữ số hàng nghìn bé nhất mà khác 0 là 3. Hàng đơn vị phải chẵn: 0 hoặc 4. Thử ${n(3470)} và ${n(3074)}: ${n(3074)} bé hơn. Vậy số chẵn bé nhất là ${n(3074)}.`,
  ),
];

const nameAnswers: Part[] = [];
truongSpec.names.forEach((name, index) => {
  nameAnswers.push(`${index > 0 ? ". " : ""}${name}:`, nb(school[index]));
});
const soSanhGroup: Question[] = [
  choice(
    "voi",
    `Bốn con voi nặng: A ${n(voiSpec[0].kg)} kg, B ${n(voiSpec[1].kg)} kg, C ${n(voiSpec[2].kg)} kg, D ${n(voiSpec[3].kg)} kg. Con voi nào nặng nhất?`,
    voiSpec.map((v) => `Voi ${v.name}`),
    voiSpec.findIndex((v) => v.kg === Math.max(...voiSpec.map((x) => x.kg))),
    "Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so hàng nghìn, rồi hàng trăm.",
    `Voi A ${n(2995)} kg và D ${n(3527)} kg có hàng nghìn là 2 và 3, bé hơn. B ${n(4850)} kg và C ${n(4920)} kg cùng hàng nghìn là 4, hàng trăm 8 < 9. Vậy voi C nặng nhất.`,
  ),
  choice(
    "xe",
    `Bốn xe đạp có giá: A ${n(xeSpec[0].price)} đồng, B ${n(xeSpec[1].price)} đồng, C ${n(xeSpec[2].price)} đồng, D ${n(xeSpec[3].price)} đồng. Xe nào có giá thấp nhất?`,
    xeSpec.map((x) => `Xe ${x.name}`),
    xeSpec.findIndex((x) => x.price === Math.min(...xeSpec.map((y) => y.price))),
    "Cả bốn số đều có bảy chữ số. So hàng triệu, rồi hàng trăm nghìn.",
    `Hàng triệu đều là 4 hoặc 5. Hai xe có hàng triệu 4 là B (${n(4900000)}) và D (${n(4550000)}). Hàng trăm nghìn: 5 < 9 nên xe D thấp nhất.`,
  ),
  fill(
    "truong-1",
    `Bốn trường tiểu học có ${truongSpec.values.map(n).join("; ")} học sinh. Trường Nguyễn Trãi có nhiều học sinh nhất, Quang Trung nhiều hơn Nguyễn Du, và số học sinh của Lê Lợi là số lẻ. Mỗi trường có bao nhiêu học sinh?`,
    nameAnswers,
    "Nguyễn Trãi nhiều nhất nên chọn số lớn nhất. Trong các số còn lại, số nào lẻ?",
    `Nguyễn Trãi nhiều nhất: ${n(school[0])}. Ba số còn lại ${n(school[1])}; ${n(school[2])}; ${n(school[3])}, chỉ ${n(school[3])} là số lẻ nên Lê Lợi có ${n(school[3])}. Quang Trung hơn Nguyễn Du: ${n(school[1])} > ${n(school[2])}.`,
  ),
  fill(
    "truong-2",
    "Viết số học sinh của bốn trường theo thứ tự từ bé đến lớn.",
    [nb(sortedSchools[0]), "<", nb(sortedSchools[1]), "<", nb(sortedSchools[2]), "<", nb(sortedSchools[3])],
    "Tìm số bé nhất trước. Cùng bốn chữ số thì so hàng nghìn, rồi hàng trăm.",
    `${sortedSchools.map(n).join(" < ")}.`,
  ),
  ...sanhSpecs.map((s) =>
    compare(s.id, s.left, s.right, "Vế có phép cộng thì viết thành một số trước khi so.", `${s.left.includes("+") ? `${s.left} = ${n(sumOf(s.left))}` : `${s.right} = ${n(sumOf(s.right))}`}. Hai số so sánh được dấu ${sign(sumOf(s.left), sumOf(s.right))}.`),
  ),
];

const tronGroup: Question[] = [
  words(
    "tron-dan-so",
    `Một tỉnh có ${n(danSoSpec.value)} người. Làm tròn số dân của tỉnh đó:`,
    [
      ["đến hàng nghìn, có khoảng", nb(roundToPlace(danSoSpec.value, 3)), "người."],
      ["đến hàng chục nghìn, có khoảng", nb(roundToPlace(danSoSpec.value, 4)), "người."],
      ["đến hàng trăm nghìn, có khoảng", nb(roundToPlace(danSoSpec.value, 5)), "người."],
    ],
    "Mỗi lần chỉ nhìn chữ số ngay bên phải hàng cần làm tròn, rồi so với 5.",
    `Hàng trăm là 5, từ 5 trở lên: ${n(3483000)}. Hàng nghìn là 2, bé hơn 5: ${n(3480000)}. Hàng chục nghìn là 8, từ 5 trở lên: ${n(3500000)}.`,
  ),
  ...tronSpecs.map((s) =>
    fill(`${s.id}`, `Làm tròn ${n(s.value)} đến hàng nghìn.`, [`${n(s.value)} ≈`, nb(roundToPlace(s.value, s.place))], "Nhìn chữ số hàng trăm, ngay bên phải hàng nghìn.", `Hàng trăm là 5, từ 5 trở lên nên 9 nghìn tăng thêm 1 nghìn thành 10 nghìn: ${n(s.value)} ≈ ${n(750000)}.`),
  ),
  choice(
    "tron-doc",
    `Một số được làm tròn đến hàng chục nghìn thì được ${n(3480000)}. Số nào dưới đây có thể là số ban đầu?`,
    [n(3485000), n(3474999), n(3476001), n(3489500)],
    2,
    `Làm tròn đến hàng chục nghìn thì số ban đầu thuộc khoảng từ ${n(3475000)} đến ${n(3484999)}.`,
    `Số ban đầu phải từ ${n(3475000)} đến ${n(3484999)}. ${n(3476001)} có hàng nghìn là 6 nên làm tròn lên ${n(3480000)}. ${n(3485000)} và ${n(3489500)} có hàng nghìn là 5 và 9, làm tròn lên ${n(3490000)}. ${n(3474999)} có hàng nghìn là 4, làm tròn xuống ${n(3470000)}.`,
  ),
];

const suyNghiGroup: Question[] = [
  fill(
    "le-lon",
    `Vượt SGK. Từ bốn thẻ số ${theSpec.cards.join(", ")}, lập được số lẻ lớn nhất có bốn chữ số là số nào?`,
    ["Số lẻ lớn nhất là", nb(largestOdd(theSpec.cards))],
    "Số lẻ tận cùng bằng 1, 3, 5, 7 hoặc 9. Muốn số lớn thì chữ số lớn nhất đứng hàng cao nhất, nhưng hàng đơn vị phải lẻ.",
    `Hàng đơn vị là 3 hoặc 7. Nếu 7 ở hàng đơn vị thì số lớn nhất là ${n(4307)}. Nếu 3 ở hàng đơn vị thì hàng nghìn là 7: ${n(7403)}. ${n(7403)} lớn hơn nên đó là đáp án.`,
  ),
  fill(
    "tim-loi",
    `Nam làm tròn ${n(loiSpec.value)} đến hàng nghìn và được ${n(loiSpec.wrong)}. Nam sai rồi. Kết quả đúng là bao nhiêu?`,
    [`${n(loiSpec.value)} ≈`, nb(roundToPlace(loiSpec.value, loiSpec.place))],
    "Chỉ nhìn chữ số ngay bên phải hàng nghìn.",
    `Hàng trăm là 4, bé hơn 5 nên giữ nguyên hàng nghìn: ${n(2718000)}. Nam đã nhìn chữ số hàng chục là 5 nên làm tròn lên, nhưng chữ số cần nhìn là hàng trăm.`,
  ),
  choice(
    "vi-sao",
    `Số liền sau của ${n(49999)} và số liền trước của ${n(50001)}, số nào lớn hơn?`,
    [`Số liền sau của ${n(49999)} lớn hơn`, `Số liền trước của ${n(50001)} lớn hơn`, "Hai số bằng nhau"],
    2,
    "Tính từng số: liền sau thì cộng 1, liền trước thì trừ 1.",
    `${n(49999)} + 1 = ${n(50000)} và ${n(50001)} − 1 = ${n(50000)}. Hai số bằng nhau.`,
  ),
];

export const exerciseGroups: ExerciseGroup[] = [
  { id: "doc-viet", title: "Đọc số, viết số, hàng và lớp (Bài 10, 11, 12)", questions: docGroup },
  { id: "viet-tong", title: "Viết thành tổng, giá trị của chữ số (Bài 11, 12)", questions: tongGroup },
  { id: "day-so", title: "Dãy số tự nhiên, số chẵn, số lẻ (Bài 3, 15)", questions: dayGroup },
  { id: "so-sanh", title: "So sánh và xếp thứ tự (Bài 14)", questions: soSanhGroup },
  { id: "lam-tron", title: "Làm tròn số (Bài 13)", questions: tronGroup },
  { id: "suy-nghi-them", title: "Suy nghĩ thêm", questions: suyNghiGroup },
];
