import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Part, Question, WordQuestion } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { createElement } from "react";
import { SoDoBaDong } from "./_illustrations/so-do-ba-dong";

const n = formatNumber;

/** Một phép tính kèm giá trị. Đáp án lấy từ `value`, không gõ tay. */
export type Calc = { text: string; value: number };

export const add = (a: number, b: number): Calc => ({ text: `${n(a)} + ${n(b)}`, value: a + b });
export const sub = (a: number, b: number): Calc => ({ text: `${n(a)} − ${n(b)}`, value: a - b });
export const mul = (a: number, b: number): Calc => ({ text: `${n(a)} × ${n(b)}`, value: a * b });
export const div = (a: number, b: number): Calc => {
  if (a % b !== 0) throw new Error(`${a} : ${b} không chia hết`);
  return { text: `${n(a)} : ${n(b)}`, value: a / b };
};
/** Cộng nhiều số hạng liền nhau, như 60 + 80 + 70. */
export const total = (...terms: number[]): Calc => ({ text: terms.map(n).join(" + "), value: terms.reduce((sum, term) => sum + term, 0) });

export type Step = { label: string; calc: Calc; unit: string };

const step = (label: string, calc: Calc, unit: string): Step => ({ label, calc, unit });

const HINT_ORDER = "Đề cho gì, hỏi gì? Số nào phải tìm trước thì mới tìm được số sau? Mỗi bước tính viết một dòng.";

/**
 * Bài toán nhiều bước viết như bài giải trong SGK: mỗi dòng một câu lời giải, một phép tính, một đơn vị.
 * Lời giải được dựng từ cùng các phép tính, nên đáp án và lời giải không lệch nhau.
 */
function solution(id: string, prompt: string, steps: Step[], answer: string, hint: string, illustration?: WordQuestion["illustration"]): WordQuestion {
  return {
    id,
    kind: "loi-van",
    prompt,
    lines: steps.map(({ label, calc, unit }): Part[] => [`${label} ${calc.text} =`, { answer: calc.value }, `(${unit})`]),
    hint,
    explanation: `${steps.map(({ label, calc, unit }) => `${label} ${calc.text} = ${n(calc.value)} (${unit}).`).join(" ")} Đáp số: ${answer}.`,
    ...(illustration ? { illustration } : {}),
  };
}

function choice(id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: ChoiceQuestion["illustration"]): ChoiceQuestion {
  return { id, kind: "trac-nghiem", prompt, options, answerIndex, hint, explanation, ...(illustration ? { illustration } : {}) };
}

function fill(id: string, prompt: string | undefined, parts: Part[], hint: string, explanation: string): FillQuestion {
  return { id, kind: "dien-so", ...(prompt ? { prompt } : {}), parts, hint, explanation };
}

/** Số liệu của từng bài toán, để test tính lại độc lập. */
export const stories = {
  caySau: { one: 50, moreTwo: 15, lessThree: 8 },
  muaDo: { books: 4, bookPrice: 15000, pens: 3, penPrice: 6000 },
  tui: { oranges: 72, perOrange: 8, guavas: 35, perGuava: 5 },
  ga: { hoa: 1500, maiLess: 400, lanMore: 600 },
  dau: { all: 200, first: 35, third: 45 },
  quat: { tuesday: 18, wedMore: 7, thuMore: 12 },
  sodo: { apple: 15, pearMore: 8 },
  gao: { second: 20, fourthLess: 15 },
};

const { caySau, muaDo, tui, ga, dau, quat, sodo, gao } = stories;

const cay2 = add(caySau.one, caySau.moreTwo);
const cay3 = sub(cay2.value, caySau.lessThree);

const tienTruyen = mul(muaDo.books, muaDo.bookPrice);
const tienBut = mul(muaDo.pens, muaDo.penPrice);

const tuiCam = div(tui.oranges, tui.perOrange);
const tuiOi = div(tui.guavas, tui.perGuava);

const gaMai = sub(ga.hoa, ga.maiLess);
const gaLan = add(ga.hoa, ga.lanMore);

const dauHai = mul(dau.first, 2);
const dauDaBan = total(dau.first, dauHai.value, dau.third);

const quatBa = add(quat.tuesday, quat.wedMore);
const quatTu = add(quatBa.value, quat.thuMore);

const camQua = mul(sodo.apple, 2);
const leQua = add(camQua.value, sodo.pearMore);

const gaoBa = mul(gao.second, 2);
const gaoTu = sub(gaoBa.value, gao.fourthLess);

const diagram = () => createElement(SoDoBaDong, { names: ["Táo", "Cam", "Lê"], first: `${sodo.apple} quả`, extra: `${sodo.pearMore} quả` });

/** Khởi động: kiểm tra đầu vào, chỉ dùng tại chỗ. */
export const warmUps: Question[] = [
  fill("kd-hon", "Hà có 45 viên bi. Nam có nhiều hơn Hà 15 viên bi.", ["Nam có", { answer: 45 + 15 }, "viên bi"], "Nhiều hơn thì cộng.", `45 + 15 = 60. Nam có 60 viên bi.`),
  fill("kd-nhan", undefined, [`6 × ${n(5000)} =`, { answer: 6 * 5000 }], "6 nghìn nhân 5 là mấy nghìn? Tính 6 × 5 rồi viết thêm ba chữ số 0.", `6 × 5 = 30, nên 6 × ${n(5000)} = ${n(30000)}.`),
  fill("kd-chia", "Chia 54 quả vào các túi, mỗi túi 6 quả.", ["Có", { answer: 54 / 6 }, "túi"], "Muốn biết có mấy túi, lấy số quả chia cho số quả ở mỗi túi.", "54 : 6 = 9. Có 9 túi."),
];

export const quickChecks = {
  baDoi: solution(
    "thu-ba-doi",
    "Đội Một trồng 50 cây. Đội Hai trồng hơn đội Một 10 cây. Đội Ba trồng ít hơn đội Hai 5 cây. Hỏi đội Ba trồng bao nhiêu cây?",
    [step("Đội Hai:", add(50, 10), "cây"), step("Đội Ba:", sub(60, 5), "cây")],
    "55 cây",
    "Đội Ba ít hơn đội nào? Tìm số cây của đội đó trước.",
  ),
  vietBai: solution(
    "thu-viet-bai",
    "Vườn có 30 bông hồng. Số bông cúc nhiều hơn số bông hồng 10 bông. Số bông lan ít hơn số bông cúc 5 bông. Hỏi vườn có tất cả bao nhiêu bông hoa?",
    [step("Số bông cúc:", add(30, 10), "bông"), step("Số bông lan:", sub(40, 5), "bông"), step("Cả ba loại:", total(30, 40, 35), "bông")],
    "105 bông",
    HINT_ORDER,
  ),
  conLai: solution(
    "thu-con-lai",
    "Một bao gạo có 100 kg. Lần đầu lấy ra 20 kg, lần thứ hai lấy ra gấp đôi lần đầu. Hỏi trong bao còn lại bao nhiêu ki-lô-gam gạo?",
    [step("Lần thứ hai:", mul(20, 2), "kg"), step("Đã lấy ra:", add(20, 40), "kg"), step("Còn lại:", sub(100, 60), "kg")],
    "40 kg",
    "Tìm số ki-lô-gam lấy ra lần hai, rồi cả hai lần, rồi mới trừ.",
  ),
  buocCuoi: choice(
    "thu-buoc-cuoi",
    "Đề hỏi: “Số túi cam nhiều hơn số túi ổi mấy túi?”. Khi đã biết số túi cam và số túi ổi, bước cuối là gì?",
    ["Cộng hai số", "Lấy số lớn trừ số bé", "Nhân hai số"],
    1,
    "“Nhiều hơn mấy” là hỏi hai số hơn kém nhau bao nhiêu.",
    "Hỏi “nhiều hơn mấy” thì lấy số lớn trừ số bé. Hỏi “tất cả” thì cộng. Hỏi “còn lại” thì trừ.",
  ),
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "kham-pha-hoat-dong",
    title: "Khám phá và hoạt động (trang 19, 20)",
    questions: [
      solution(
        "hd-trong-cay",
        `Tổ Một trồng được ${caySau.one} cây, tổ Hai trồng nhiều hơn tổ Một ${caySau.moreTwo} cây, tổ Ba trồng ít hơn tổ Hai ${caySau.lessThree} cây. Hỏi cả ba tổ trồng được bao nhiêu cây?`,
        [step("Số cây tổ Hai:", cay2, "cây"), step("Số cây tổ Ba:", cay3, "cây"), step("Số cây cả ba tổ:", total(caySau.one, cay2.value, cay3.value), "cây")],
        "172 cây",
        "Tổ Ba ít hơn tổ nào? Tìm số cây của tổ Hai trước, rồi tổ Ba, cuối cùng mới cộng cả ba.",
      ),
      solution(
        "hd-mua-do",
        `Lan mua ${muaDo.books} quyển truyện, mỗi quyển giá ${n(muaDo.bookPrice)} đồng, và ${muaDo.pens} cái bút, mỗi cái giá ${n(muaDo.penPrice)} đồng. Hỏi Lan phải trả cô bán hàng tất cả bao nhiêu tiền?`,
        [step("Tiền mua truyện:", tienTruyen, "đồng"), step("Tiền mua bút:", tienBut, "đồng"), step("Tiền phải trả:", add(tienTruyen.value, tienBut.value), "đồng")],
        `${n(78000)} đồng`,
        "Tính tiền mua truyện và tiền mua bút trước. Mỗi loại: số cái nhân với giá một cái. Rồi cộng hai số tiền.",
      ),
      solution(
        "hd-tui",
        `Chia ${tui.oranges} quả cam vào các túi, mỗi túi ${tui.perOrange} quả, và chia ${tui.guavas} quả ổi vào các túi, mỗi túi ${tui.perGuava} quả. Hỏi số túi cam hay số túi ổi nhiều hơn, và nhiều hơn mấy túi?`,
        [step("Số túi cam:", tuiCam, "túi"), step("Số túi ổi:", tuiOi, "túi"), step("Số túi cam nhiều hơn số túi ổi:", sub(tuiCam.value, tuiOi.value), "túi")],
        "số túi cam nhiều hơn, nhiều hơn 2 túi",
        "Chia số quả cho số quả ở mỗi túi để biết số túi. Rồi lấy số lớn trừ số bé.",
      ),
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập (trang 20)",
    questions: [
      solution(
        "lt-ga",
        `Đàn gà nhà bác Hoa có ${n(ga.hoa)} con. Đàn gà nhà bác Mai có ít hơn đàn gà nhà bác Hoa ${ga.maiLess} con. Đàn gà nhà bác Lan có nhiều hơn đàn gà nhà bác Hoa ${ga.lanMore} con. Hỏi đàn gà của ba bác có tất cả bao nhiêu con?`,
        [step("Số gà nhà bác Mai:", gaMai, "con"), step("Số gà nhà bác Lan:", gaLan, "con"), step("Số gà của ba bác:", total(ga.hoa, gaMai.value, gaLan.value), "con")],
        `${n(4700)} con`,
        "Cả hai bác so với bác Hoa. Ít hơn thì trừ, nhiều hơn thì cộng.",
      ),
      solution(
        "lt-dau",
        `Một thùng dầu có ${dau.all} l. Lần đầu bán được ${dau.first} l, lần thứ hai bán được gấp đôi số lít ở lần đầu, lần thứ ba bán được ${dau.third} l. Hỏi trong thùng còn lại bao nhiêu lít dầu?`,
        [step("Lần thứ hai bán được:", dauHai, "l"), step("Cả ba lần bán được:", dauDaBan, "l"), step("Trong thùng còn lại:", sub(dau.all, dauDaBan.value), "l")],
        "50 l",
        "Tìm lần thứ hai (gấp đôi), rồi cả ba lần bán, rồi lấy cả thùng trừ đi.",
      ),
      solution(
        "lt-quat",
        `Một cửa hàng ngày thứ Hai bán được ${quat.tuesday} chiếc quạt, ngày thứ Ba bán được nhiều hơn ngày thứ Hai ${quat.wedMore} chiếc quạt, ngày thứ Tư bán được nhiều hơn ngày thứ Ba ${quat.thuMore} chiếc quạt. Hỏi cả ba ngày, cửa hàng đó bán được bao nhiêu chiếc quạt?`,
        [step("Ngày thứ Ba:", quatBa, "chiếc"), step("Ngày thứ Tư:", quatTu, "chiếc"), step("Cả ba ngày:", total(quat.tuesday, quatBa.value, quatTu.value), "chiếc")],
        "80 chiếc quạt",
        "Ngày thứ Tư hơn ngày thứ Ba, nên tìm ngày thứ Ba trước.",
      ),
      choice(
        "lt-de-chon",
        "Em hãy chọn đề toán đúng với sơ đồ dưới đây.",
        [
          `Cửa hàng có ${sodo.apple} quả táo, số cam nhiều hơn số táo ${sodo.apple} quả, số lê nhiều hơn số cam ${sodo.pearMore} quả. Hỏi cả ba loại có bao nhiêu quả?`,
          `Cửa hàng có ${sodo.apple} quả táo, số cam gấp đôi số táo, số lê nhiều hơn số cam ${sodo.pearMore} quả. Hỏi cả ba loại có bao nhiêu quả?`,
          `Cửa hàng có ${sodo.apple} quả táo, số cam gấp đôi số táo, số lê ít hơn số cam ${sodo.pearMore} quả. Hỏi cả ba loại có bao nhiêu quả?`,
        ],
        1,
        "Đoạn Cam dài bằng mấy đoạn Táo? Đoạn Lê dài hơn hay ngắn hơn đoạn Cam?",
        "Đoạn Cam dài bằng hai đoạn Táo, nên số cam gấp đôi số táo. Đoạn Lê dài hơn đoạn Cam một khúc 8 quả, nên số lê nhiều hơn số cam 8 quả. Ngoặc hỏi cả ba loại.",
        diagram(),
      ),
      solution(
        "lt-de-giai",
        `Giải bài toán theo sơ đồ: cửa hàng có ${sodo.apple} quả táo, số cam gấp đôi số táo, số lê nhiều hơn số cam ${sodo.pearMore} quả. Hỏi cả ba loại có bao nhiêu quả?`,
        [step("Số quả cam:", camQua, "quả"), step("Số quả lê:", leQua, "quả"), step("Cả ba loại:", total(sodo.apple, camQua.value, leQua.value), "quả")],
        "83 quả",
        "Cam gấp đôi táo thì nhân 2. Lê nhiều hơn cam thì cộng.",
        diagram(),
      ),
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      choice(
        "st-tim-loi",
        "Tổ Một có 40 bạn. Tổ Hai nhiều hơn tổ Một 6 bạn. Tổ Ba ít hơn tổ Hai 4 bạn. Nam tính số bạn tổ Ba là 40 − 4 = 36. Nam sai ở đâu?",
        ["Nam lấy 40 − 4, nhưng tổ Ba ít hơn tổ Hai, phải lấy số bạn tổ Hai trừ 4", "Nam tính 40 − 4 sai, kết quả phải là 35", "Tổ Ba phải nhiều hơn tổ Hai", "Nam không sai"],
        0,
        "Tổ Ba ít hơn tổ nào? Nam đã lấy số bạn của tổ đó chưa?",
        "Tổ Hai có 40 + 6 = 46 bạn. Tổ Ba ít hơn tổ Hai 4 bạn nên có 46 − 4 = 42 bạn. Nam đã trừ vào số bạn của tổ Một, không phải tổ Hai.",
      ),
      fill(
        "st-tim-truoc",
        `Ngày thứ Hai cửa hàng bán ${gao.second} kg gạo, ngày thứ Ba bán gấp đôi ngày thứ Hai, ngày thứ Tư bán ít hơn ngày thứ Ba ${gao.fourthLess} kg. Muốn biết ngày thứ Tư bán bao nhiêu ki-lô-gam, em phải tìm ngày thứ Ba trước.`,
        ["Ngày thứ Ba:", { answer: gaoBa.value }, "kg. Ngày thứ Tư:", { answer: gaoTu.value }, "kg"],
        "Ngày thứ Tư ít hơn ngày nào? Tìm số ki-lô-gam của ngày đó trước.",
        `Ngày thứ Ba: ${gaoBa.text} = ${gaoBa.value} (kg). Ngày thứ Tư: ${gaoTu.text} = ${gaoTu.value} (kg). Số cần biết ở bước sau luôn dựa vào số của bước trước.`,
      ),
      choice(
        "st-hop-ly",
        "Thùng có 200 l dầu. An tính ba lần bán xong thì trong thùng còn lại 250 l. Kết quả của An có hợp lí không?",
        ["Hợp lí", "Không hợp lí, vì số lít còn lại không thể nhiều hơn số lít lúc đầu", "Không hợp lí, vì 250 là số chẵn"],
        1,
        "Bán đi thì thùng nhiều lên hay ít đi?",
        "Mỗi lần bán, dầu trong thùng ít đi. Vậy số lít còn lại phải bé hơn 200 l. 250 l lớn hơn 200 l nên An đã tính sai. Con nên ước lượng như vậy để kiểm tra đáp số.",
      ),
    ],
  },
];
