import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { conversionHint, explainConversion, type AreaUnit } from "@/lib/area-units";

function conv(id: string, source: string, to: AreaUnit, answer: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    parts: [`${source} =`, { answer }, to],
    conversion: { source, to },
    hint: conversionHint(source, to),
    explanation: explainConversion(source, to),
  };
}

export const quickChecks = {
  dm2: conv("thu-dm2", "2 dm²", "cm²", 200),
  m2: {
    id: "thu-m2",
    kind: "trac-nghiem",
    prompt: "1 m² bằng bao nhiêu đề-xi-mét vuông?",
    options: ["10 dm²", "100 dm²", "1 000 dm²"],
    answerIndex: 1,
    hint: "Hình vuông cạnh 1 m có 10 hàng, mỗi hàng 10 ô 1 dm².",
    explanation: "10 hàng, mỗi hàng 10 ô: 10 × 10 = 100 ô. Vậy 1 m² = 100 dm².",
  },
  mm2: conv("thu-mm2", "300 mm²", "cm²", 3),
  mixed: conv("thu-ghep", "2 m² 5 dm²", "dm²", 205),
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "dm2",
    title: "Đề-xi-mét vuông",
    unit: "dm2",
    questions: [
      {
        id: "dm2-viet",
        kind: "dien-so",
        prompt: "Viết số đo: Bốn trăm hai mươi đề-xi-mét vuông",
        parts: [{ answer: 420 }, "dm²"],
        hint: "Viết số bốn trăm hai mươi trước, rồi đến đơn vị.",
        explanation: "Bốn trăm hai mươi đề-xi-mét vuông viết là 420 dm².",
      },
      {
        id: "dm2-doc",
        kind: "trac-nghiem",
        prompt: "Số đo 2 008 dm² đọc là:",
        options: [
          "Hai nghìn linh tám đề-xi-mét vuông",
          "Hai nghìn không trăm linh tám đề-xi-mét vuông",
          "Hai trăm linh tám đề-xi-mét vuông",
          "Hai nghìn không trăm tám mươi đề-xi-mét vuông",
        ],
        answerIndex: 1,
        hint: "Hàng trăm của số này là 0, nên phải đọc “không trăm”.",
        explanation: "2 008 có 2 nghìn, 0 trăm, 0 chục, 8 đơn vị: hai nghìn không trăm linh tám.",
      },
      conv("dm2-1", "4 dm²", "cm²", 400),
      conv("dm2-2", "700 cm²", "dm²", 7),
      conv("dm2-3", "5 dm² 30 cm²", "cm²", 530),
      conv("dm2-4", "3 dm² 6 cm²", "cm²", 306),
      {
        id: "dm2-so-sanh",
        kind: "trac-nghiem",
        prompt: "Quan sát hình rồi chọn câu trả lời đúng.",
        figure: {
          pixelsPerUnit: 2,
          shapes: [
            { label: "Hình vuông", width: 30, height: 30, widthLabel: "3 dm", heightLabel: "3 dm" },
            { label: "Hình chữ nhật", width: 100, height: 10, widthLabel: "100 cm", heightLabel: "10 cm" },
          ],
        },
        options: [
          "Diện tích hình vuông lớn hơn diện tích hình chữ nhật.",
          "Diện tích hình vuông bằng diện tích hình chữ nhật.",
          "Diện tích hình vuông bé hơn diện tích hình chữ nhật.",
        ],
        answerIndex: 2,
        hint: "Đổi về cùng một đơn vị rồi tính diện tích từng hình. Đừng nhìn hình đoán nhé.",
        explanation: "Hình vuông: 3 dm = 30 cm, 30 × 30 = 900 cm². Hình chữ nhật: 100 × 10 = 1 000 cm². 900 cm² < 1 000 cm².",
      },
    ],
  },
  {
    id: "m2",
    title: "Mét vuông",
    unit: "m2",
    questions: [
      {
        id: "m2-doc",
        kind: "noi-cap",
        prompt: "Nối cách đọc với số đo.",
        pairs: [
          { left: "Năm mươi hai mét vuông", right: "52 m²" },
          { left: "Năm trăm hai mươi mét vuông", right: "520 m²" },
          { left: "Năm mươi hai đề-xi-mét vuông", right: "52 dm²" },
          { left: "Năm mươi hai xăng-ti-mét vuông", right: "52 cm²" },
        ],
        rightOrder: [2, 0, 3, 1],
        hint: "Xem kĩ cả số và đơn vị.",
        explanation: "Cùng số 52 nhưng khác đơn vị thì đọc khác nhau.",
      },
      {
        id: "m2-do-vat",
        kind: "noi-cap",
        prompt: "Nối mỗi đồ vật với diện tích phù hợp.",
        pairs: [
          { left: "Cửa ra vào", right: "2 m²" },
          { left: "Màn hình điện thoại", right: "1 dm²" },
          { left: "Mặt cục tẩy", right: "6 cm²" },
        ],
        rightOrder: [1, 2, 0],
        hint: "Đồ vật càng to thì đơn vị càng lớn: m² lớn hơn dm², dm² lớn hơn cm².",
        explanation: "Cửa ra vào rất rộng nên đo bằng m². Cục tẩy nhỏ nên đo bằng cm².",
      },
      conv("m2-1", "2 m²", "dm²", 200),
      conv("m2-2", "800 dm²", "m²", 8),
      conv("m2-3", "2 m² 40 dm²", "dm²", 240),
      conv("m2-4", "6 m² 7 dm²", "dm²", 607),
    ],
  },
  {
    id: "mm2",
    title: "Mi-li-mét vuông",
    unit: "mm2",
    questions: [
      {
        id: "mm2-viet",
        kind: "dien-so",
        prompt: "Viết số đo: Ba trăm linh sáu mi-li-mét vuông",
        parts: [{ answer: 306 }, "mm²"],
        hint: "“Linh sáu” nghĩa là hàng chục bằng 0.",
        explanation: "Ba trăm linh sáu mi-li-mét vuông viết là 306 mm².",
      },
      conv("mm2-1", "3 cm²", "mm²", 300),
      conv("mm2-2", "400 mm²", "cm²", 4),
      conv("mm2-3", "2 cm² 60 mm²", "mm²", 260),
      conv("mm2-4", "9 cm² 3 mm²", "mm²", 903),
      {
        id: "mm2-tem",
        kind: "trac-nghiem",
        prompt: "Diện tích một con tem thư khoảng:",
        options: ["6 mm²", "6 cm²", "6 dm²", "6 m²"],
        answerIndex: 1,
        hint: "Con tem to cỡ vài đầu ngón tay. 1 cm² cỡ móng tay út của con.",
        explanation: "Con tem cỡ vài đầu ngón tay nên khoảng 6 cm². 6 mm² thì chỉ bằng vài đầu bút chì, còn 6 dm² thì to hơn cả quyển vở.",
      },
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      {
        id: "lt-pin",
        kind: "trac-nghiem",
        prompt:
          "Bác Ba có 3 tấm pin mặt trời hình vuông cạnh 1 m. Bác ghép 3 tấm thành một hình chữ nhật có chiều dài 3 m. Diện tích tấm pin hình chữ nhật đó là:",
        options: ["300 m²", "300 dm²", "300 cm²", "300 mm²"],
        answerIndex: 1,
        hint: "Mỗi tấm có diện tích 1 m². Ba tấm là bao nhiêu mét vuông? Rồi đổi sang dm².",
        explanation: "3 tấm × 1 m² = 3 m². Đổi: 3 m² = 300 dm².",
      },
      {
        id: "lt-phong",
        kind: "trac-nghiem",
        prompt: "Trong ba căn phòng dưới đây, có hai phòng diện tích bằng nhau. Phòng nào có diện tích khác hai phòng còn lại?",
        figure: {
          pixelsPerUnit: 13,
          shapes: [
            { label: "Phòng A", width: 10, height: 4, widthLabel: "10 m", heightLabel: "4 m" },
            { label: "Phòng B", width: 8, height: 5, widthLabel: "8 m", heightLabel: "5 m" },
            { label: "Phòng C", width: 7, height: 6, widthLabel: "7 m", heightLabel: "6 m" },
          ],
        },
        options: ["Phòng A", "Phòng B", "Phòng C"],
        answerIndex: 2,
        hint: "Tính diện tích từng phòng: chiều dài × chiều rộng.",
        explanation: "Phòng A: 10 × 4 = 40 m². Phòng B: 8 × 5 = 40 m². Phòng C: 7 × 6 = 42 m². Phòng C khác hai phòng còn lại.",
      },
      {
        id: "lt-lat-san",
        kind: "loi-van",
        prompt:
          "Mặt sàn căn phòng của Lan có dạng hình vuông cạnh 2 m. Mẹ Lan định lát sàn bằng các tấm gỗ hình chữ nhật có chiều dài 4 dm và chiều rộng 1 dm. Hỏi cần bao nhiêu tấm gỗ để lát kín sàn?",
        lines: [
          ["Diện tích mặt sàn: 2 × 2 =", { answer: 4 }, "m²"],
          ["Đổi: 4 m² =", { answer: 400 }, "dm²"],
          ["Diện tích một tấm gỗ: 4 × 1 =", { answer: 4 }, "dm²"],
          ["Số tấm gỗ cần dùng: 400 : 4 =", { answer: 100 }, "tấm"],
        ],
        hint: "Sàn tính bằng m², tấm gỗ tính bằng dm². Phải đổi về cùng đơn vị rồi mới chia.",
        explanation: "Sàn 4 m² = 400 dm². Mỗi tấm 4 dm². 400 : 4 = 100 tấm gỗ.",
      },
    ],
  },
];

export type RaceCell =
  | { kind: "question"; source: string; to: AreaUnit; answer: number }
  | { kind: "move"; steps: number };

/** Đường đua số đo: 22 ô theo đúng thứ tự trong SGK trang 65. */
export const raceCells: RaceCell[] = [
  { kind: "question", source: "1 m²", to: "dm²", answer: 100 },
  { kind: "question", source: "2 dm²", to: "cm²", answer: 200 },
  { kind: "question", source: "5 cm²", to: "mm²", answer: 500 },
  { kind: "move", steps: 1 },
  { kind: "question", source: "1 m² 3 dm²", to: "dm²", answer: 103 },
  { kind: "move", steps: -3 },
  { kind: "question", source: "4 dm²", to: "cm²", answer: 400 },
  { kind: "question", source: "6 cm²", to: "mm²", answer: 600 },
  { kind: "question", source: "7 m²", to: "cm²", answer: 70000 },
  { kind: "question", source: "1 dm²", to: "cm²", answer: 100 },
  { kind: "move", steps: -2 },
  { kind: "move", steps: 2 },
  { kind: "question", source: "4 m²", to: "dm²", answer: 400 },
  { kind: "question", source: "100 cm²", to: "dm²", answer: 1 },
  { kind: "move", steps: 1 },
  { kind: "question", source: "8 m²", to: "dm²", answer: 800 },
  { kind: "move", steps: 3 },
  { kind: "move", steps: -2 },
  { kind: "question", source: "100 mm²", to: "cm²", answer: 1 },
  { kind: "question", source: "3 dm²", to: "cm²", answer: 300 },
  { kind: "question", source: "1 m² 15 dm²", to: "dm²", answer: 115 },
  { kind: "question", source: "4 cm²", to: "mm²", answer: 400 },
];
