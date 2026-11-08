import type { ExerciseGroup, Question } from "@/components/exercises/types";
import { DaGiac } from "@/components/math/da-giac";
import type { Point } from "@/lib/hinh";
import { createElement } from "react";
import { ChonDuong } from "./_illustrations/chon-duong";
import { Dieu } from "./_illustrations/dieu";
import { EKeDat } from "./_illustrations/e-ke-dat";

const p = (x: number, y: number): Point => ({ x, y });

/** Khung tranh làm từ 4 que gỗ: hình vuông, mỗi góc là chỗ hai que vuông góc. */
export const frame = {
  names: ["P", "Q", "R", "S"],
  points: [p(30, 20), p(130, 20), p(130, 120), p(30, 120)],
};

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-bon-goc",
    kind: "dien-so",
    parts: ["Hai đường thẳng vuông góc cắt nhau tạo thành", { answer: 4 }, "góc vuông có chung đỉnh."],
    hint: "Nhớ lại Bài 27: hai đường thẳng vuông góc cắt nhau tạo thành mấy góc vuông?",
    explanation: "Hai đường thẳng vuông góc tạo thành 4 góc vuông có chung đỉnh.",
  },
  {
    id: "kd-e-ke",
    kind: "dien-so",
    parts: ["Góc vuông của ê ke do", { answer: 2 }, "cạnh góc vuông tạo thành."],
    hint: "Mỗi góc do hai cạnh tạo nên. Nhìn vào góc vuông của ê ke xem có mấy cạnh gặp nhau ở đó.",
    explanation: "Góc vuông của ê ke do 2 cạnh góc vuông tạo thành. Ta đặt các cạnh này sát vào đường thẳng để vẽ hoặc kiểm tra.",
  },
  {
    id: "kd-trung-diem",
    kind: "dien-so",
    parts: ["H là trung điểm của đoạn thẳng AB dài 14 cm. Độ dài AH là", { answer: 7 }, "cm."],
    hint: "Trung điểm chia đoạn thẳng thành hai phần bằng nhau.",
    explanation: "H là trung điểm nên AH = HB. Hai đoạn bằng nhau, cộng lại được 14 cm, nên mỗi đoạn dài 14 : 2 = 7 cm.",
  },
];

export const quickChecks = {
  canhEKe: {
    id: "thu-canh-e-ke",
    kind: "trac-nghiem",
    prompt: "Muốn vẽ đường thẳng đi qua điểm H và vuông góc với AB, cạnh góc vuông thứ nhất của ê ke đặt như thế nào?",
    options: ["Trùng với đường thẳng AB", "Cắt đường thẳng AB", "Đi qua điểm H"],
    answerIndex: 0,
    hint: "Ta trượt ê ke dọc theo AB cho tới khi cạnh góc vuông thứ hai gặp H.",
    explanation: "Một cạnh góc vuông trùng với AB. Cạnh góc vuông thứ hai mới là cạnh đi qua H và được dùng để vạch đường thẳng.",
  },
  que: {
    id: "thu-que",
    kind: "trac-nghiem",
    prompt: "Que gỗ thứ nhất đặt dọc theo đường thẳng HK, và HK vuông góc với CD. Muốn hai que gỗ vuông góc với nhau, que thứ hai đặt dọc theo đường thẳng nào?",
    options: ["Đường thẳng HK", "Đường thẳng CD", "Đường thẳng nào cũng được"],
    answerIndex: 1,
    hint: "Hai que phải nằm trên hai đường thẳng vuông góc với nhau.",
    explanation: "HK vuông góc với CD, nên que thứ hai đặt dọc theo CD. Đặt cùng đường HK thì hai que chồng lên nhau, không tạo góc.",
  },
  dieu: {
    id: "thu-dieu",
    kind: "dien-so",
    parts: ["HC = 6 cm, HD = 18 cm. Thanh tre CD dài", { answer: 24 }, "cm."],
    hint: "H nằm giữa C và D. CD gồm đoạn HC và đoạn HD nối tiếp nhau.",
    explanation: "CD = HC + HD = 6 + 18 = 24 cm.",
  },
} satisfies Record<string, Question>;

/** Bản thiết kế con diều ở bài tập: AB = 16 cm, HC = 5 cm, HD = 12 cm. */
export const kite = { ab: 16, hc: 5, hd: 12 };

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "ve-vuong-goc",
    title: "Vẽ hai đường thẳng vuông góc",
    questions: [
      {
        id: "ve-thu-tu",
        kind: "noi-cap",
        prompt: "Vẽ đường thẳng CD đi qua điểm H và vuông góc với đường thẳng AB. Nối mỗi bước với đúng việc phải làm.",
        pairs: [
          { left: "Bước 1", right: "Đặt một cạnh góc vuông của ê ke trùng với AB, cạnh góc vuông thứ hai gặp điểm H" },
          { left: "Bước 2", right: "Vạch một đường thẳng theo cạnh góc vuông thứ hai của ê ke" },
          { left: "Kết quả", right: "Đường thẳng CD đi qua H và vuông góc với AB" },
        ],
        rightOrder: [1, 2, 0],
        hint: "Con đặt ê ke trước, vạch đường sau. Cuối cùng mới có đường thẳng CD.",
        explanation: "Bước 1 đặt ê ke: một cạnh góc vuông trùng AB, cạnh kia gặp H. Bước 2 vạch đường thẳng theo cạnh góc vuông thứ hai. Ta được CD đi qua H, vuông góc với AB.",
      },
      {
        id: "ve-e-ke",
        kind: "trac-nghiem",
        prompt: "Hình nào đặt ê ke đúng để vẽ đường thẳng đi qua H và vuông góc với AB?",
        options: ["Hình 1", "Hình 2", "Hình 3"],
        answerIndex: 1,
        illustration: createElement(EKeDat),
        hint: "Một cạnh góc vuông của ê ke phải nằm sát AB. Cạnh góc vuông kia phải đi qua H.",
        explanation: "Hình 2: cạnh góc vuông thứ nhất trùng AB, cạnh góc vuông thứ hai đi qua H. Hình 1: cạnh góc vuông thứ hai không đi qua H. Hình 3: cạnh dài nhất của ê ke nằm trên AB, không phải cạnh góc vuông.",
      },
      {
        id: "ve-chon-duong",
        kind: "trac-nghiem",
        prompt: "Trong hình, đường thẳng nào đi qua điểm H và vuông góc với đường thẳng AB?",
        options: ["Đường 1", "Đường 2", "Đường 3"],
        answerIndex: 2,
        illustration: createElement(ChonDuong),
        hint: "Chọn đường đi qua H trước, rồi dùng ê ke kiểm tra xem đường đó có vuông góc với AB không.",
        explanation: "Đường 3 đi qua H và vuông góc với AB. Đường 1 đi qua H nhưng nghiêng, không vuông góc. Đường 2 vuông góc với AB nhưng không đi qua H.",
      },
      {
        id: "ve-tren",
        kind: "trac-nghiem",
        prompt: "Điểm M nằm trên đường thẳng CD. Vẽ đường thẳng HK đi qua M và vuông góc với CD. Đỉnh góc vuông của ê ke đặt ở đâu?",
        options: ["Tại điểm C", "Tại điểm M", "Tại điểm D"],
        answerIndex: 1,
        hint: "Nhớ lại hình khi H nằm trên AB: cạnh góc vuông thứ hai phải đi qua điểm cần vẽ.",
        explanation: "Cạnh góc vuông thứ hai của ê ke phải đi qua M. Khi M nằm trên CD, ta đặt đỉnh góc vuông tại M, một cạnh sát CD, rồi vạch theo cạnh còn lại.",
      },
      {
        id: "ve-nghieng",
        kind: "trac-nghiem",
        prompt: "Đường thẳng CD nằm nghiêng trên tờ giấy, điểm M nằm ngoài CD. Muốn vẽ đường thẳng HK đi qua M và vuông góc với CD, ta làm thế nào?",
        options: [
          "Vẽ đường thẳng đứng đi qua M",
          "Đặt một cạnh góc vuông của ê ke trùng với CD, trượt ê ke tới khi cạnh góc vuông thứ hai gặp M, rồi vạch đường thẳng",
          "Đặt cạnh dài nhất của ê ke trùng với CD",
        ],
        answerIndex: 1,
        hint: "CD nghiêng thì hai đường thẳng vuông góc cũng nghiêng. Cách đặt ê ke vẫn giống khi CD nằm ngang.",
        explanation: "Cách vẽ không đổi, chỉ cần ê ke nghiêng theo CD. Đường thẳng đứng chỉ vuông góc với đường nằm ngang, còn cạnh dài nhất của ê ke không phải cạnh góc vuông.",
      },
    ],
  },
  {
    id: "khung-tranh",
    title: "Khung tranh kỉ niệm",
    questions: [
      {
        id: "kt-dem",
        kind: "dien-so",
        prompt: "Khung tranh PQRS làm từ 4 que gỗ. Ở mỗi góc của khung, hai que gỗ vuông góc với nhau.",
        parts: ["Khung tranh có", { answer: 4 }, "chỗ hai que gỗ vuông góc với nhau."],
        illustration: createElement(DaGiac, { points: frame.points, names: frame.names, marks: true, label: "Khung tranh PQRS có bốn góc vuông" }),
        hint: "Đếm các góc của khung. Mỗi góc là một chỗ hai que gặp nhau.",
        explanation: "Khung có 4 góc, mỗi góc là một góc vuông. Vậy có 4 chỗ hai que gỗ vuông góc: PQ và QR, QR và RS, RS và SP, SP và PQ.",
      },
      {
        id: "kt-sai",
        kind: "trac-nghiem",
        prompt: "Mai ghép hai que gỗ cắt nhau nhưng hơi nghiêng, rồi nói: “Hai que này vuông góc với nhau.” Mai nên làm gì để kiểm tra?",
        options: ["Nhìn bằng mắt là đủ", "Đặt ê ke vào chỗ hai que gặp nhau", "Đo chiều dài hai que"],
        answerIndex: 1,
        hint: "Muốn biết hai đường có tạo góc vuông không, ta cần dụng cụ nào?",
        explanation: "Đặt ê ke vào chỗ hai que gặp nhau. Nếu hai cạnh góc vuông của ê ke cùng khít với hai que thì chúng vuông góc. Nhìn bằng mắt dễ nhầm, nhất là khi que nghiêng.",
      },
    ],
  },
  {
    id: "xuong-dieu",
    title: "Xưởng làm diều",
    questions: [
      {
        id: "dieu-thu-tu",
        kind: "noi-cap",
        prompt: "Vẽ bản thiết kế con diều trên giấy. Nối mỗi bước với đúng việc phải làm.",
        pairs: [
          { left: "Bước 1", right: "Vẽ đoạn thẳng AB dài 16 cm, vẽ trung điểm H của AB" },
          { left: "Bước 2", right: "Vẽ đoạn thẳng CD đi qua H và vuông góc với AB: HC = 5 cm, HD = 12 cm" },
          { left: "Bước 3", right: "Nối A với C, C với B, B với D, D với A" },
        ],
        rightOrder: [2, 0, 1],
        hint: "Vẽ AB và điểm H trước, rồi vẽ CD qua H, cuối cùng nối các đầu đoạn thẳng.",
        explanation: "Bước 1 vẽ AB và trung điểm H. Bước 2 vẽ CD qua H, vuông góc với AB. Bước 3 nối A, C, B, D để được con diều.",
      },
      {
        id: "dieu-ah",
        kind: "dien-so",
        prompt: `Đoạn thẳng AB dài ${kite.ab} cm, H là trung điểm của AB.`,
        parts: ["AH =", { answer: kite.ab / 2 }, "cm."],
        illustration: createElement(Dieu),
        hint: "H là trung điểm nên AH bằng HB. Chia AB làm hai phần bằng nhau.",
        explanation: `AB = ${kite.ab} cm, H là trung điểm nên AH = HB = ${kite.ab} : 2 = ${kite.ab / 2} cm.`,
      },
      {
        id: "dieu-cd",
        kind: "dien-so",
        prompt: `Trong bản thiết kế, HC = ${kite.hc} cm và HD = ${kite.hd} cm.`,
        parts: ["Đoạn thẳng CD dài", { answer: kite.hc + kite.hd }, "cm."],
        illustration: createElement(Dieu),
        hint: "H nằm giữa C và D. CD gồm đoạn HC và đoạn HD nối tiếp nhau.",
        explanation: `CD = HC + HD = ${kite.hc} + ${kite.hd} = ${kite.hc + kite.hd} cm.`,
      },
      {
        id: "dieu-goc",
        kind: "dien-so",
        prompt: "Đoạn thẳng CD đi qua H và vuông góc với AB. Hỏi trong hình có bao nhiêu góc vuông có đỉnh H?",
        parts: [{ answer: 4 }, "góc vuông"],
        illustration: createElement(Dieu),
        hint: "Hai đường thẳng vuông góc cắt nhau tạo thành mấy góc vuông chung đỉnh? Đọc tên từng góc: AHC, CHB, BHD, DHA.",
        explanation: "AB và CD vuông góc với nhau tại H nên tạo thành 4 góc vuông có chung đỉnh H: góc AHC, CHB, BHD và DHA.",
      },
      {
        id: "dieu-tre",
        kind: "trac-nghiem",
        prompt: "Con diều làm bằng hai thanh tre đặt vuông góc với nhau. Trong bản thiết kế ACBD, hai thanh tre ứng với hai đoạn thẳng nào?",
        options: ["AC và CB", "AB và CD", "AD và DB"],
        answerIndex: 1,
        illustration: createElement(Dieu),
        hint: "Tìm hai đoạn thẳng vuông góc với nhau tại H.",
        explanation: "AB và CD vuông góc với nhau tại H, nên hai thanh tre ứng với AB và CD. Các đoạn AC, CB, BD, DA là đường viền của con diều.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-nam",
        kind: "trac-nghiem",
        prompt: "Nam đặt cạnh dài nhất của ê ke trùng với đường thẳng AB rồi vạch theo một cạnh còn lại, nói rằng đã vẽ được đường thẳng vuông góc với AB. Nam đúng hay sai?",
        options: ["Nam đúng", "Nam sai: phải đặt một cạnh góc vuông của ê ke trùng với AB"],
        answerIndex: 1,
        hint: "Góc vuông của ê ke do hai cạnh nào tạo nên?",
        explanation: "Góc vuông do hai cạnh góc vuông tạo nên. Phải đặt một cạnh góc vuông trùng với AB, rồi vạch theo cạnh góc vuông còn lại thì mới được đường thẳng vuông góc với AB.",
      },
      {
        id: "sn-mot-duong",
        kind: "trac-nghiem",
        prompt: "Thử thách (ngoài sách): Cho đường thẳng AB và điểm H nằm ngoài AB. Qua H, vẽ được mấy đường thẳng vuông góc với AB?",
        options: ["1 đường thẳng", "2 đường thẳng", "Rất nhiều đường thẳng"],
        answerIndex: 0,
        hint: "Giữ một cạnh góc vuông của ê ke trên AB rồi trượt ê ke. Có mấy vị trí để cạnh góc vuông kia đi đúng qua H?",
        explanation: "Chỉ có 1 vị trí của ê ke làm cạnh góc vuông thứ hai đi qua H, nên chỉ vẽ được 1 đường thẳng đi qua H và vuông góc với AB.",
      },
    ],
  },
];
