import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { explainMass, massHint, type MassUnit } from "@/lib/mass-units";
import { explainTime, timeHint, type TimeUnit } from "@/lib/time-units";
import { createElement } from "react";
import { Banknotes } from "./_illustrations/banknotes";
import { FilterBottles } from "./_illustrations/filter-bottles";
import { LGarden } from "./_illustrations/l-garden";
import { PriceBoard, shopBoard, ticketBoard } from "./_illustrations/price-board";
import { ScaleRow } from "./_illustrations/scale-dial";

const money = formatNumber;

function massConv(id: string, source: string, to: MassUnit, answer: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    parts: [`${source} =`, { answer }, to],
    conversion: { source, to },
    hint: massHint(source, to),
    explanation: explainMass(source, to),
  };
}

function timeConv(id: string, source: string, to: TimeUnit, answer: number, prompt?: string): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt,
    parts: [`${source} =`, { answer }, to],
    conversion: { source, to },
    hint: timeHint(source, to),
    explanation: explainTime(source, to),
  };
}

/** Câu thử trong phần Nhắc lại nhanh, mỗi điểm một câu. Không tính vào tiến độ. */
export const quickChecks = {
  mass: massConv("qc-khoi-luong", "3 tạ", "yến", 30),
  area: {
    id: "qc-dien-tich",
    kind: "dien-so",
    prompt: "Một tấm bìa hình vuông có cạnh 5 cm.",
    parts: ["Diện tích tấm bìa là", { answer: 25 }, "cm²"],
    hint: "Diện tích hình vuông bằng cạnh nhân cạnh.",
    explanation: "5 × 5 = 25. Cạnh đo bằng cm nên diện tích là 25 cm².",
  },
  unit: {
    id: "qc-chon-don-vi",
    kind: "trac-nghiem",
    prompt: "Sân trường em có diện tích khoảng 2 000 …",
    options: ["mm²", "cm²", "dm²", "m²"],
    answerIndex: 3,
    hint: "Sân trường rất rộng. Đơn vị nào dùng để đo những mặt phẳng rộng?",
    explanation: "Sân trường rộng nên dùng mét vuông: 2 000 m². Các đơn vị còn lại chỉ hợp với vật nhỏ hơn nhiều.",
  },
  second: timeConv("qc-giay", "2 phút 5 giây", "giây", 125),
  century: {
    id: "qc-the-ki",
    kind: "trac-nghiem",
    prompt: "Năm 1000 thuộc thế kỉ nào?",
    options: ["Thế kỉ IX", "Thế kỉ X", "Thế kỉ XI"],
    answerIndex: 1,
    hint: "1000 là năm tròn trăm. Năm tròn trăm là năm đầu hay năm cuối của một thế kỉ?",
    explanation: "Thế kỉ X tính từ năm 901 đến năm 1000. Năm 1000 là năm cuối của thế kỉ X.",
  },
  money: {
    id: "qc-tien",
    kind: "dien-so",
    prompt: `Mai mua 2 cuốn vở, mỗi cuốn ${money(7000)} đồng, và đưa người bán tờ ${money(20000)} đồng. Tiền thừa là:`,
    parts: [{ answer: 6000 }, "đồng"],
    hint: "Tính tiền 2 cuốn vở trước, rồi lấy tiền đưa trừ đi.",
    explanation: `2 × ${money(7000)} = ${money(14000)}. ${money(20000)} − ${money(14000)} = ${money(6000)} đồng.`,
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "khoi-luong",
    title: "Khối lượng",
    unit: "ta",
    questions: [
      {
        id: "kl-1",
        kind: "trac-nghiem",
        prompt: "Bác An cân một bao gạo. Kim cân chỉ như hình. Bao gạo nặng:",
        illustration: createElement(ScaleRow, { readings: [40] }),
        options: ["4 tấn", "4 tạ", "4 yến", "2 yến"],
        answerIndex: 2,
        hint: "Mỗi vạch nhỏ là 5 kg. Kim cách nhãn 25 ba vạch. Đọc ra ki-lô-gam rồi đổi ra yến.",
        explanation: "Kim chỉ 40 kg. 1 yến = 10 kg nên 40 kg = 4 yến.",
      },
      {
        id: "kl-2a",
        kind: "dien-so",
        prompt: "Ba bao hạt được đặt lên ba cân. Cả ba bao nặng bao nhiêu ki-lô-gam?",
        illustration: createElement(ScaleRow, { readings: [30, 20, 45], captions: ["Bao 1", "Bao 2", "Bao 3"] }),
        parts: ["Tổng cân nặng:", { answer: 95 }, "kg"],
        hint: "Đọc kim từng cân: đếm vạch 5 kg từ nhãn gần nhất. Rồi cộng ba số lại.",
        explanation: "Ba cân chỉ 30 kg, 20 kg và 45 kg. 30 + 20 + 45 = 95 kg.",
      },
      {
        id: "kl-2b",
        kind: "trac-nghiem",
        prompt: "Ba bao hạt nặng 30 kg, 20 kg và 45 kg. Cả ba bao có đủ 1 tạ không?",
        options: ["Đủ 1 tạ, còn thừa 5 kg", "Không đủ 1 tạ, còn thiếu 5 kg", "Không đủ 1 tạ, còn thiếu 5 yến"],
        answerIndex: 1,
        hint: "1 tạ bằng bao nhiêu ki-lô-gam? So tổng cân nặng với số đó.",
        explanation: "1 tạ = 100 kg. Ba bao nặng 95 kg, mà 95 < 100 nên chưa đủ. Còn thiếu 100 − 95 = 5 kg.",
      },
      {
        id: "kl-3",
        kind: "noi-cap",
        prompt: "Ở vườn bách thú, nối cân nặng của mỗi con vật với số ki-lô-gam bằng nhau.",
        pairs: [
          { left: "Hà mã: 1 tấn 5 tạ", right: `${formatNumber(1500)} kg` },
          { left: "Sư tử: 2 tạ 5 yến", right: "250 kg" },
          { left: "Gấu: 1 tạ 5 yến", right: "150 kg" },
          { left: "Công: 3 yến 2 kg", right: "32 kg" },
        ],
        rightOrder: [1, 0, 3, 2],
        hint: "Đổi từng phần ra ki-lô-gam rồi cộng lại: 1 tạ = 100 kg, 1 yến = 10 kg.",
        explanation:
          "1 tấn 5 tạ = 1 000 + 500 = 1 500 kg. 2 tạ 5 yến = 200 + 50 = 250 kg. 1 tạ 5 yến = 100 + 50 = 150 kg. 3 yến 2 kg = 30 + 2 = 32 kg.",
      },
      {
        id: "kl-4",
        kind: "dien-so",
        prompt: "Một xe tải chở 1 tấn 2 tạ gạo và 8 tạ ngô. Xe chở tất cả:",
        parts: [{ answer: 2 }, "tấn"],
        hint: "Đổi 1 tấn 2 tạ ra tạ, cộng với 8 tạ, rồi đổi lại ra tấn.",
        explanation: "1 tấn 2 tạ = 12 tạ. 12 tạ + 8 tạ = 20 tạ. 20 tạ = 2 tấn.",
      },
    ],
  },
  {
    id: "dien-tich",
    title: "Diện tích",
    unit: "m2",
    questions: [
      {
        id: "dt-1",
        kind: "trac-nghiem",
        prompt: "Lớp em cần một tấm vải làm biển cổ động ngày hội. Em nên chọn tấm vải có diện tích khoảng:",
        options: ["2 mm²", "2 cm²", "2 m²", "2 dm²"],
        answerIndex: 2,
        hint: "Biển cổ động phải đủ to để cả lớp nhìn thấy. 1 m² là hình vuông có cạnh 1 m.",
        explanation:
          "Tấm vải 2 m² là tấm rộng khoảng 1 m, dài khoảng 2 m, hợp làm biển cổ động. 2 dm² chỉ là một miếng giấy nhỏ, còn 2 cm² và 2 mm² nhỏ hơn nữa.",
      },
      {
        id: "dt-2",
        kind: "trac-nghiem",
        prompt: "Hội trại cần chọn một trong ba mảnh đất để dựng lều. Mảnh đất nào có diện tích lớn nhất?",
        figure: {
          pixelsPerUnit: 13,
          shapes: [
            { label: "Mảnh A", width: 9, height: 6, widthLabel: "9 m", heightLabel: "6 m" },
            { label: "Mảnh B", width: 8, height: 7, widthLabel: "8 m", heightLabel: "7 m" },
            { label: "Mảnh C", width: 10, height: 5, widthLabel: "10 m", heightLabel: "5 m" },
          ],
        },
        options: ["Mảnh A", "Mảnh B", "Mảnh C"],
        answerIndex: 1,
        hint: "Tính diện tích từng mảnh: chiều dài × chiều rộng. Đừng chọn mảnh có cạnh dài nhất vội.",
        explanation:
          "A: 9 × 6 = 54 m². B: 8 × 7 = 56 m². C: 10 × 5 = 50 m². 56 lớn nhất nên chọn mảnh B. Cả ba mảnh đều có chiều dài cộng chiều rộng bằng 15 m, nhưng diện tích khác nhau.",
      },
      {
        id: "dt-3",
        kind: "trac-nghiem",
        prompt: "Khu vườn hoa hình chữ L có kích thước như hình. Diện tích khu vườn là:",
        illustration: createElement(LGarden),
        options: ["60 m²", "84 m²", "120 m²", "36 m²"],
        answerIndex: 1,
        hint: "Kẻ thêm một đường để chia hình chữ L thành hai hình chữ nhật. Tính từng hình rồi cộng lại.",
        explanation:
          "Cách 1: phần bên phải 6 × 10 = 60 m², phần dưới bên trái 6 × 4 = 24 m². 60 + 24 = 84 m². Cách 2: hình chữ nhật lớn 12 × 10 = 120 m², trừ phần thiếu 6 × 6 = 36 m². 120 − 36 = 84 m².",
      },
      {
        id: "dt-4",
        kind: "dien-so",
        prompt: "Một tấm bìa hình vuông có cạnh 4 dm.",
        parts: ["Diện tích tấm bìa là", { answer: 16 }, "dm² =", { answer: 1600 }, "cm²"],
        conversion: { source: "16 dm²", to: "cm²" },
        hint: "Diện tích hình vuông bằng cạnh nhân cạnh. Rồi đổi: 1 dm² = 100 cm².",
        explanation: "4 × 4 = 16. Cạnh đo bằng dm nên diện tích là 16 dm². 16 dm² = 16 × 100 = 1 600 cm².",
      },
    ],
  },
  {
    id: "thoi-gian",
    title: "Thời gian",
    unit: "second",
    questions: [
      {
        id: "tg-1",
        kind: "trac-nghiem",
        prompt: "Ba chai lọc nước cùng lọc 500 ml nước. Chai nào lọc xong nhanh nhất?",
        illustration: createElement(FilterBottles, {
          bottles: [
            { name: "Chai A", time: "170 giây" },
            { name: "Chai B", time: "2 phút 45 giây" },
            { name: "Chai C", time: "3 phút" },
          ],
        }),
        options: ["Chai A", "Chai B", "Chai C"],
        answerIndex: 1,
        hint: "Đổi hết ra giây rồi mới so sánh. 1 phút = 60 giây.",
        explanation: "A: 170 giây. B: 2 phút 45 giây = 120 + 45 = 165 giây. C: 3 phút = 180 giây. 165 < 170 < 180 nên chai B nhanh nhất.",
      },
      {
        id: "tg-2",
        kind: "dien-so",
        prompt: "Chai D lọc xong 500 ml nước hết 200 giây.",
        parts: ["200 giây =", { answer: 3 }, "phút", { answer: 20 }, "giây"],
        hint: "Trong 200 giây có mấy lần 60 giây? Phần còn lại là số giây.",
        explanation: "200 = 60 + 60 + 60 + 20, nên 200 giây = 3 phút 20 giây.",
      },
      {
        id: "tg-3",
        kind: "trac-nghiem",
        prompt: "Cây đa trong công viên được trồng vào năm 1905. Năm đó thuộc thế kỉ nào?",
        options: ["Thế kỉ XIX", "Thế kỉ XX", "Thế kỉ XXI"],
        answerIndex: 1,
        hint: "Thế kỉ XX tính từ năm 1901 đến năm 2000. Năm 1905 nằm trong đoạn nào?",
        explanation: "Năm 1905 nằm giữa năm 1901 và năm 2000, nên thuộc thế kỉ XX.",
      },
      timeConv("tg-4", "2 phút 15 giây", "giây", 135, "Một vòng tàu lượn chạy hết 2 phút 15 giây."),
    ],
  },
  {
    id: "tien",
    title: "Tiền",
    questions: [
      {
        id: "t-1",
        kind: "trac-nghiem",
        prompt: `Em mua ba bộ dây đèn giá ${money(62000)} đồng, ${money(75000)} đồng và ${money(63000)} đồng để trang trí trại. Em đưa tờ tiền nào thì vừa đủ trả cho người bán?`,
        illustration: createElement(Banknotes),
        options: [`Tờ ${money(100000)} đồng`, `Tờ ${money(200000)} đồng`, `Tờ ${money(500000)} đồng`],
        answerIndex: 1,
        hint: "Cộng giá ba bộ dây đèn trước. Vừa đủ là tờ tiền bằng đúng số tiền phải trả.",
        explanation: `${money(62000)} + ${money(75000)} + ${money(63000)} = ${money(200000)} đồng. Vừa đủ là tờ ${money(200000)} đồng.`,
      },
      {
        id: "t-2",
        kind: "dien-so",
        prompt: "Cả nhà An có 4 người cùng chơi Nhà gương. Cả nhà trả hết:",
        illustration: createElement(PriceBoard, ticketBoard),
        parts: [{ answer: 60000 }, "đồng"],
        hint: "Mỗi người một vé. Lấy giá một vé nhân với số người.",
        explanation: `4 × ${money(15000)} = ${money(60000)} đồng.`,
      },
      {
        id: "t-3",
        kind: "dien-so",
        prompt: "Cả nhà An có 4 người. Mỗi người chơi cả Đu quay đám mây và Câu cá. Cả nhà trả hết:",
        illustration: createElement(PriceBoard, ticketBoard),
        parts: [{ answer: 140000 }, "đồng"],
        hint: "Tính tiền một người chơi cả hai trò trước, rồi nhân với 4.",
        explanation: `Một người: ${money(25000)} + ${money(10000)} = ${money(35000)} đồng. Cả nhà: 4 × ${money(35000)} = ${money(140000)} đồng.`,
      },
      {
        id: "t-4",
        kind: "dien-so",
        prompt: "Mai mua 2 quyển vở và 1 cái bút chì. Mai phải trả:",
        illustration: createElement(PriceBoard, shopBoard),
        parts: [{ answer: 20000 }, "đồng"],
        hint: "Tính tiền 2 quyển vở trước, rồi cộng với tiền bút chì.",
        explanation: `2 × ${money(8000)} = ${money(16000)}. ${money(16000)} + ${money(4000)} = ${money(20000)} đồng.`,
      },
      {
        id: "t-5",
        kind: "trac-nghiem",
        prompt:
          "Nam mua 1 quyển vở, 1 cái bút chì và 1 cái thước kẻ. Nam đưa một tờ tiền có số tiền bằng hoặc hơn số tiền phải trả. Tờ tiền nhỏ nhất Nam có thể đưa là:",
        illustration: createElement(PriceBoard, shopBoard),
        options: [`Tờ ${money(10000)} đồng`, `Tờ ${money(20000)} đồng`, `Tờ ${money(50000)} đồng`, `Tờ ${money(100000)} đồng`],
        answerIndex: 1,
        hint: "Tính tổng số tiền phải trả, rồi chọn tờ nhỏ nhất mà không bị thiếu.",
        explanation: `${money(8000)} + ${money(4000)} + ${money(6000)} = ${money(18000)} đồng. Tờ ${money(10000)} đồng chưa đủ. Tờ ${money(20000)} đồng là tờ nhỏ nhất đủ trả.`,
      },
      {
        id: "t-6",
        kind: "dien-so",
        prompt: `Lan mua 1 hộp đựng bút và 1 quyển sách truyện, đưa người bán tờ ${money(200000)} đồng. Người bán trả lại Lan tiền thừa là:`,
        illustration: createElement(PriceBoard, shopBoard),
        parts: [{ answer: 83000 }, "đồng"],
        hint: "Tính số tiền hai món trước, rồi lấy tiền đưa trừ đi.",
        explanation: `${money(32000)} + ${money(85000)} = ${money(117000)} đồng. ${money(200000)} − ${money(117000)} = ${money(83000)} đồng.`,
      },
    ],
  },
  {
    id: "tu-duy",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "td-1",
        kind: "trac-nghiem",
        prompt: "Ước lượng: một con mèo nhà nặng khoảng 4 …",
        options: ["kg", "yến", "tạ", "tấn"],
        answerIndex: 0,
        hint: "Hình dung bế một con mèo. Nó nhẹ hơn hay nặng hơn một bạn học sinh?",
        explanation: "4 yến là 40 kg, nặng bằng cả một bạn học sinh. Con mèo chỉ nặng khoảng 4 kg.",
      },
      {
        id: "td-2",
        kind: "dien-so",
        prompt: "Một chai lọc hết 3 phút 40 giây để lọc 500 ml nước. Cũng chai đó lọc 1 lít nước, gấp đôi lượng nước, sẽ hết:",
        parts: [{ answer: 7 }, "phút", { answer: 20 }, "giây"],
        hint: "Đổi 3 phút 40 giây ra giây, nhân 2, rồi đổi lại ra phút và giây.",
        explanation: "3 phút 40 giây = 180 + 40 = 220 giây. 220 × 2 = 440 giây. 440 = 420 + 20 nên là 7 phút 20 giây.",
      },
      {
        id: "td-3",
        kind: "trac-nghiem",
        prompt: `An mua 3 quyển vở, mỗi quyển ${money(8000)} đồng, và đưa tờ ${money(50000)} đồng. An tính tiền thừa như sau: ${money(50000)} − ${money(8000)} = ${money(42000)} đồng. An sai ở đâu?`,
        options: [
          "An chưa nhân giá một quyển vở với 3 quyển",
          `An phải cộng ${money(50000)} với ${money(8000)}`,
          `Tờ ${money(50000)} đồng không đủ trả`,
          "An tính đúng rồi",
        ],
        answerIndex: 0,
        hint: "Đọc lại đề: An mua mấy quyển vở? An đã trừ tiền của mấy quyển?",
        explanation: `3 quyển vở: 3 × ${money(8000)} = ${money(24000)} đồng. Tiền thừa: ${money(50000)} − ${money(24000)} = ${money(26000)} đồng.`,
      },
      {
        id: "td-4",
        kind: "trac-nghiem",
        prompt: "Tấm vải thứ nhất hình chữ nhật, dài 3 m, rộng 2 m. Tấm vải thứ hai hình vuông, cạnh 25 dm. Tấm nào có diện tích lớn hơn?",
        options: ["Tấm thứ nhất", "Tấm thứ hai", "Hai tấm bằng nhau"],
        answerIndex: 1,
        hint: "Đổi về cùng một đơn vị rồi mới so sánh. 1 m² = 100 dm².",
        explanation: "Tấm thứ nhất: 3 × 2 = 6 m² = 600 dm². Tấm thứ hai: 25 × 25 = 625 dm². 625 > 600 nên tấm thứ hai lớn hơn.",
      },
    ],
  },
];
