import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { conversionHint, explainConversion, formatNumber, type AreaUnit } from "@/lib/area-units";
import { explainMass, massHint, type MassUnit } from "@/lib/mass-units";
import { explainTime, timeHint, type TimeUnit } from "@/lib/time-units";
import { createElement } from "react";
import { CircuitBoard } from "./_illustrations/circuit-board";
import { FieldParts } from "./_illustrations/field-parts";

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

/** Câu thử trong phần Nhắc lại nhanh, mỗi điểm một câu. Không tính vào tiến độ. */
export const quickChecks = {
  mass: conv("qc-khoi-luong", "3 tạ", "yến", 30),
  area: conv("qc-dien-tich", "4 m²", "dm²", 400),
  compound: conv("qc-so-do-ghep", "2 phút 15 giây", "giây", 135),
  unit: {
    id: "qc-chon-don-vi",
    kind: "trac-nghiem",
    prompt: "Nền phòng học của em có diện tích khoảng 48 …",
    options: ["mm²", "cm²", "m²"],
    answerIndex: 2,
    hint: "Phòng học rất rộng. Đơn vị nào dùng để đo những mặt phẳng rộng?",
    explanation: "Phòng học rộng nên dùng mét vuông: 48 m². Hai đơn vị còn lại chỉ hợp với vật nhỏ hơn nhiều.",
  },
  shape: {
    id: "qc-hinh-ghep",
    kind: "dien-so",
    prompt: "Một tấm bìa hình chữ nhật dài 6 cm, rộng 4 cm. Cắt đi một ô vuông cạnh 1 cm ở góc.",
    parts: ["Diện tích còn lại là", { answer: 23 }, "cm²"],
    hint: "Tính diện tích cả tấm bìa trước, rồi bớt phần đã cắt.",
    explanation: "6 × 4 = 24 cm². Ô vuông cạnh 1 cm có diện tích 1 × 1 = 1 cm². 24 − 1 = 23 cm².",
  },
  century: {
    id: "qc-the-ki",
    kind: "trac-nghiem",
    prompt: "Năm 1950 thuộc thế kỉ nào?",
    options: ["Thế kỉ XIX", "Thế kỉ XX", "Thế kỉ XXI"],
    answerIndex: 1,
    hint: "Thế kỉ XX tính từ năm 1901 đến năm 2000. Năm 1950 nằm trong đoạn nào?",
    explanation: "Năm 1950 nằm giữa năm 1901 và năm 2000, nên thuộc thế kỉ XX.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "dien-tich",
    title: "Diện tích",
    unit: "m2",
    questions: [
      conv("dt-1", "6 m²", "dm²", 600),
      conv("dt-2", "900 dm²", "m²", 9),
      conv("dt-3", "5 dm²", "cm²", 500),
      conv("dt-4", "700 cm²", "dm²", 7),
      conv("dt-5", "4 cm²", "mm²", 400),
      conv("dt-6", "800 mm²", "cm²", 8),
      {
        id: "dt-7",
        kind: "dien-so",
        prompt: "Bảng mạch hình chữ nhật dài 12 cm, rộng 6 cm, bị khuyết hai ô vuông cạnh 1 cm như hình.",
        illustration: createElement(CircuitBoard, { width: 12, height: 6 }),
        parts: ["Diện tích bảng mạch là", { answer: 70 }, "cm²"],
        hint: "Tính diện tích cả hình chữ nhật trước, rồi bớt phần khuyết. Nhớ là có hai ô khuyết.",
        explanation:
          "Cách 1: 12 × 6 = 72 cm². Mỗi ô khuyết là 1 × 1 = 1 cm², hai ô là 2 cm². 72 − 2 = 70 cm². Cách 2: chia theo cột: 9 × 6 = 54, 1 × 5 = 5, 1 × 5 = 5, 1 × 6 = 6. 54 + 5 + 5 + 6 = 70 cm².",
      },
      {
        id: "dt-8",
        kind: "noi-cap",
        prompt: "Nối mỗi vật với diện tích hợp lí của nó.",
        pairs: [
          { left: "Nền lớp học", right: "48 m²" },
          { left: "Mặt bàn học sinh (6 dm × 12 dm)", right: "72 dm²" },
          { left: "Con tem thư", right: "6 cm²" },
        ],
        rightOrder: [1, 2, 0],
        hint: "Vật càng to thì dùng đơn vị càng lớn. Với mặt bàn, hãy nhân hai cạnh.",
        explanation:
          "Nền lớp học rộng nên đo bằng m²: khoảng 48 m². Mặt bàn: 6 × 12 = 72 dm². Con tem nhỏ nên đo bằng cm²: khoảng 6 cm². Số đo của nền lớp và con tem là xấp xỉ.",
      },
    ],
  },
  {
    id: "khoi-luong",
    title: "Khối lượng",
    unit: "ta",
    questions: [
      conv("kl-1", "6 yến 4 kg", "kg", 64),
      conv("kl-2", "3 yến 8 kg", "kg", 38),
      conv("kl-3", "5 tạ 20 kg", "kg", 520),
      conv("kl-4", "4 tạ 6 yến", "yến", 46),
      conv("kl-5", "6 tấn", "yến", 600),
      conv("kl-6", "2 tấn 45 kg", "kg", 2045),
      {
        id: "kl-7",
        kind: "noi-cap",
        prompt: "Nối mỗi vật với cân nặng hợp lí của nó.",
        pairs: [
          { left: "Bao xi măng", right: "5 yến" },
          { left: "Con bò", right: "3 tạ" },
          { left: "Con voi", right: "4 tấn" },
          { left: "Quả trứng gà", right: "60 g" },
        ],
        rightOrder: [1, 0, 3, 2],
        hint: "Hình dung vật thật rồi chọn. Quả trứng rất nhẹ, con voi rất nặng.",
        explanation:
          "Bao xi măng nặng khoảng 50 kg, tức 5 yến. Con bò nặng khoảng 3 tạ. Con voi nặng vài tấn. Quả trứng gà chỉ nặng khoảng 60 g. Các cân nặng này là xấp xỉ.",
      },
    ],
  },
  {
    id: "thoi-gian",
    title: "Thời gian",
    unit: "second",
    questions: [
      conv("tg-1", "4 thế kỉ", "năm", 400),
      conv("tg-2", "700 năm", "thế kỉ", 7),
      conv("tg-3", "3 phút", "giây", 180),
      conv("tg-4", "420 giây", "phút", 7),
      {
        id: "tg-5",
        kind: "dien-so",
        prompt: "Mai bơi một vòng hồ hết 1 phút 45 giây. Bơi đúng hai vòng như thế thì hết:",
        parts: [{ answer: 210 }, "giây"],
        hint: "Đổi 1 phút 45 giây ra giây trước, rồi mới nhân với 2.",
        explanation: "1 phút 45 giây = 60 + 45 = 105 giây. Hai vòng: 2 × 105 = 210 giây.",
      },
      {
        id: "tg-6a",
        kind: "dien-so",
        prompt: "Một ngôi trường được xây vào năm 1895. Kỉ niệm 300 năm xây trường sẽ vào năm:",
        parts: ["Năm", { answer: 2195, year: true }],
        hint: "Cộng thêm 300 năm vào năm xây trường.",
        explanation: "1895 + 300 = 2195.",
      },
      {
        id: "tg-6b",
        kind: "trac-nghiem",
        prompt: "Năm 2195 thuộc thế kỉ nào?",
        options: ["Thế kỉ XXI", "Thế kỉ XXII", "Thế kỉ XXIII"],
        answerIndex: 1,
        hint: "Thế kỉ XXII tính từ năm 2101 đến năm 2200. Năm 2195 nằm trong đoạn nào?",
        explanation: "Năm 2195 nằm giữa năm 2101 và năm 2200, nên thuộc thế kỉ XXII.",
      },
    ],
  },
  {
    id: "bai-toan",
    title: "Bài toán đời sống",
    questions: [
      {
        id: "bt-1",
        kind: "dien-so",
        prompt: `Thửa ruộng của bác Sáu có diện tích ${formatNumber(5000)} m², chia thành năm phần đều nhau như hình. Cứ mỗi ${formatNumber(1000)} m², bác thu được khoảng 6 tạ thóc.`,
        illustration: createElement(FieldParts, { total: 5000, parts: 5 }),
        parts: ["a) Mỗi phần có diện tích", { answer: 1000 }, "m². b) Cả thửa ruộng thu được", { answer: 30 }, "tạ thóc."],
        hint: "a) Chia diện tích cả thửa ruộng cho số phần. b) Mỗi phần có mấy lần 1 000 m²? Mỗi phần thu được mấy tạ?",
        explanation: `a) ${formatNumber(5000)} : 5 = ${formatNumber(1000)} m². b) Mỗi phần đúng ${formatNumber(1000)} m² nên thu 6 tạ. Có 5 phần: 5 × 6 = 30 tạ.`,
      },
    ],
  },
  {
    id: "tu-duy",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-1",
        kind: "trac-nghiem",
        prompt: "Lan viết 1 tấn 89 kg = 189 kg. Lan đã sai. Cách sửa đúng là:",
        options: [
          "1 tấn = 100 kg, nên 189 kg là đúng",
          `1 tấn = ${formatNumber(1000)} kg, nên ${formatNumber(1000)} + 89 = ${formatNumber(1089)} kg`,
          "1 tấn = 10 kg, nên 10 + 89 = 99 kg",
        ],
        answerIndex: 1,
        hint: "1 tấn bằng bao nhiêu ki-lô-gam? Đổi từng phần rồi cộng, đừng viết hai số dính vào nhau.",
        explanation: `1 tấn = ${formatNumber(1000)} kg. ${formatNumber(1000)} + 89 = ${formatNumber(1089)} kg. Số 89 kg chỉ có hai chữ số, nhưng trong ${formatNumber(1089)} nó phải chiếm ba chữ số (089), nên không thể viết dính thành 189.`,
      },
      {
        id: "sn-2",
        kind: "trac-nghiem",
        prompt: "Đổi 800 dm² sang m². Số đo mới to hơn hay bé đi, vì sao?",
        options: [
          "Số đo to hơn, vì m² nhỏ hơn dm²",
          "Số đo bé đi, vì m² lớn hơn dm² nên cần ít m² hơn",
          "Số đo không đổi",
        ],
        answerIndex: 1,
        hint: "Đơn vị mới to hơn hay nhỏ hơn đơn vị cũ? Đo cùng một mặt phẳng bằng đơn vị to hơn thì cần nhiều hay ít hơn?",
        explanation: "1 m² = 100 dm² nên m² lớn hơn dm². Đo bằng đơn vị lớn hơn thì số đo bé đi: 800 dm² = 8 m².",
      },
      {
        id: "sn-3",
        kind: "dien-so",
        prompt: "Nam chạy mỗi vòng sân hết 2 phút 30 giây. Chạy 3 vòng như thế thì hết:",
        parts: [{ answer: 450 }, "giây"],
        hint: "Đổi 2 phút 30 giây ra giây trước, rồi nhân với 3.",
        explanation: "2 phút 30 giây = 120 + 30 = 150 giây. 3 × 150 = 450 giây.",
      },
      {
        id: "sn-4",
        kind: "dien-so",
        prompt: `Một thửa ruộng có diện tích ${formatNumber(6000)} m². Cứ mỗi ${formatNumber(1000)} m² thu được 7 tạ thóc.`,
        parts: ["Cả thửa ruộng thu được", { answer: 42 }, "tạ thóc, tức", { answer: 4200 }, "kg."],
        hint: `Có mấy phần ${formatNumber(1000)} m² trong ${formatNumber(6000)} m²? Mỗi phần thu 7 tạ. Rồi đổi tạ ra ki-lô-gam.`,
        explanation: `${formatNumber(6000)} : ${formatNumber(1000)} = 6 phần. 6 × 7 = 42 tạ. 1 tạ = 100 kg nên 42 tạ = 42 × 100 = ${formatNumber(4200)} kg.`,
      },
    ],
  },
];
