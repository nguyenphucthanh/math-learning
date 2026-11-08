import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { formatNumber } from "@/lib/area-units";
import { docSo } from "@/lib/doc-so";
import { hangName, lopName, positionOfIndex, positionValue } from "@/lib/hang-lop";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const place = (position: number) => `${capitalize(hangName(position))}, ${lopName(position)}`;

/** Chữ số `digit` chỉ xuất hiện một lần trong `value`; trả về vị trí của nó (0 là hàng đơn vị). */
export function positionOfDigit(value: number, digit: number): number {
  const text = String(value);
  const index = text.indexOf(String(digit));
  if (index < 0 || index !== text.lastIndexOf(String(digit))) throw new Error(`Chữ số ${digit} không duy nhất trong ${value}`);
  return positionOfIndex(value, index);
}

/** Câu hỏi hàng nào, lớp nào. Ba lựa chọn là ba hàng liền nhau, bắt đầu từ hàng `from`. */
export function viTri(id: string, value: number, digit: number, from: number): ChoiceQuestion {
  const position = positionOfDigit(value, digit);
  const positions = [from, from + 1, from + 2];
  if (!positions.includes(position)) throw new Error(`${id}: hàng ${position} không nằm trong các lựa chọn`);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Chữ số ${digit} trong số ${formatNumber(value)} ở hàng nào, lớp nào?`,
    options: positions.map(place),
    answerIndex: positions.indexOf(position),
    hint: "Đếm các hàng từ phải sang trái, bắt đầu từ hàng đơn vị. Cứ ba hàng liền nhau hợp thành một lớp.",
    explanation: `Chữ số ${digit} ở ${hangName(position)}, thuộc ${lopName(position)}.`,
  };
}

/** Giá trị theo vị trí của chữ số `digit` trong `value`. */
export function giaTri(id: string, value: number, digit: number): FillQuestion {
  const position = positionOfDigit(value, digit);
  const result = positionValue(digit, position);
  return {
    id,
    kind: "dien-so",
    parts: [`Trong số ${formatNumber(value)}, chữ số ${digit} có giá trị là`, { answer: result }],
    hint: `Tìm xem chữ số ${digit} ở hàng nào. Nó đứng ở hàng nào thì có giá trị bằng ${digit} của hàng đó.`,
    explanation: `Chữ số ${digit} ở ${hangName(position)}, nên có giá trị là ${formatNumber(result)}.`,
  };
}

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-hang",
    kind: "trac-nghiem",
    prompt: "Trong số 45 302, chữ số 3 ở hàng nào?",
    options: ["Hàng đơn vị", "Hàng chục", "Hàng trăm"],
    answerIndex: 2,
    hint: "Đọc các hàng từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn.",
    explanation: "Từ phải sang trái: 2 là đơn vị, 0 là chục, 3 là trăm. Chữ số 3 ở hàng trăm.",
  },
  {
    id: "kd-nghin",
    kind: "dien-so",
    parts: ["10 trăm =", { answer: 1 }, "nghìn"],
    hint: "Mười trăm là 1 000. Nhớ lại: 10 đơn vị ở một hàng thì bằng 1 đơn vị ở hàng liền trước nó.",
    explanation: "10 trăm = 1 000 = 1 nghìn.",
  },
  {
    id: "kd-chuc-nghin",
    kind: "dien-so",
    parts: ["10 nghìn =", { answer: 1 }, "chục nghìn"],
    hint: "Mười nghìn là 10 000.",
    explanation: "10 nghìn = 10 000 = 1 chục nghìn.",
  },
  {
    id: "kd-doc",
    kind: "trac-nghiem",
    prompt: "Số 72 058 đọc là:",
    options: [docSo(72508), docSo(72058), docSo(70258)],
    answerIndex: 1,
    hint: "Đọc theo từng phần: 72 nghìn, rồi 058.",
    explanation: `72 058 đọc là: ${docSo(72058)}.`,
  },
  {
    id: "kd-viet",
    kind: "dien-so",
    prompt: "Ba trăm hai mươi nghìn viết là:",
    parts: [{ answer: 320000 }],
    hint: "Ba trăm hai mươi là 320. Sau đó đọc tiếp chữ nghìn và viết thêm ba chữ số 0.",
    explanation: "320 nghìn viết là 320 000.",
  },
];

export const quickChecks = {
  lop: {
    id: "thu-lop",
    kind: "trac-nghiem",
    prompt: "Chữ số 4 trong số 514 293 thuộc lớp nào?",
    options: ["Lớp đơn vị", "Lớp nghìn", "Lớp triệu"],
    answerIndex: 1,
    hint: "Chia số 514 293 thành hai nhóm ba chữ số. Chữ số 4 nằm ở nhóm nào?",
    explanation: "514 là lớp nghìn, 293 là lớp đơn vị. Chữ số 4 nằm trong 514 nên thuộc lớp nghìn.",
  },
  hang: viTri("thu-hang", 639051, 9, 1),
  giaTri: giaTri("thu-gia-tri", 639051, 9),
  mot_tram_trieu: {
    id: "thu-tram-trieu",
    kind: "dien-so",
    prompt: "Một trăm triệu viết là:",
    parts: [{ answer: 100000000 }],
    hint: "Một triệu là 1 000 000. Mười triệu thì thêm một chữ số 0, một trăm triệu thì thêm nữa.",
    explanation: "1 000 000, 10 000 000, 100 000 000. Một trăm triệu có 8 chữ số 0.",
  },
  lopTrieu: {
    id: "thu-lop-trieu",
    kind: "trac-nghiem",
    prompt: "Chữ số 3 trong số 531 000 000 thuộc lớp nào?",
    options: ["Lớp đơn vị", "Lớp nghìn", "Lớp triệu"],
    answerIndex: 2,
    hint: "Số 531 000 000 chia thành ba lớp. 531 là nhóm đầu bên trái.",
    explanation: "531 000 000 gồm lớp triệu 531, lớp nghìn 000 và lớp đơn vị 000. Chữ số 3 thuộc lớp triệu.",
  },
} satisfies Record<string, Question>;

const priceNote = "Một bông hoa giá 1 000 đồng, một hộp quà giá 100 000 đồng, một lon nước giá 10 000 đồng.";

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hang-lop",
    title: "Hàng và lớp",
    questions: [
      {
        id: "hl-1",
        kind: "dien-so",
        prompt: "Hoàn thành bảng cho số 628 407.",
        parts: [
          "Hàng trăm nghìn:", { answer: 6 },
          "chục nghìn:", { answer: 2 },
          "nghìn:", { answer: 8 },
          "trăm:", { answer: 4 },
          "chục:", { answer: 0 },
          "đơn vị:", { answer: 7 },
        ],
        hint: "Viết các chữ số của 628 407 từ trái sang phải, rồi ghép với các hàng: trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị.",
        explanation: "628 407 có lớp nghìn là 6, 2, 8 và lớp đơn vị là 4, 0, 7.",
      },
      {
        id: "hl-2",
        kind: "dien-so",
        prompt: "Viết số có lớp nghìn gồm các chữ số 4, 0, 5 và lớp đơn vị gồm các chữ số 7, 0, 0 (theo thứ tự từ trái sang phải).",
        parts: [{ answer: 405700 }],
        hint: "Viết lớp nghìn trước, rồi viết lớp đơn vị ngay sau nó.",
        explanation: "Lớp nghìn là 405, lớp đơn vị là 700. Số đó là 405 700.",
      },
      {
        id: "hl-3",
        kind: "dien-so",
        prompt: "Số 7 040.",
        parts: [
          "Chữ số hàng nghìn là", { answer: 7 },
          ", hàng trăm là", { answer: 0 },
          ", hàng chục là", { answer: 4 },
          ", hàng đơn vị là", { answer: 0 },
        ],
        hint: "Số 7 040 có bốn chữ số. Đọc từ trái sang phải là các hàng nghìn, trăm, chục, đơn vị.",
        explanation: "Hàng trăm không có gì nên là chữ số 0. Hàng đơn vị cũng là chữ số 0.",
      },
      {
        id: "hl-4",
        kind: "dien-so",
        prompt: "Viết số có lớp nghìn gồm các chữ số 3, 0, 8 và lớp đơn vị gồm các chữ số 0, 5, 0.",
        parts: [{ answer: 308050 }],
        hint: "Viết lớp nghìn trước, rồi viết lớp đơn vị. Đừng bỏ quên các chữ số 0.",
        explanation: "Lớp nghìn là 308, lớp đơn vị là 050. Số đó là 308 050.",
      },
    ],
  },
  {
    id: "doc-vi-tri",
    title: "Chữ số này ở hàng nào, lớp nào?",
    questions: [
      viTri("dv-1", 245361, 3, 1),
      viTri("dv-2", 130872, 3, 2),
      viTri("dv-3", 703458, 3, 3),
      viTri("dv-4", 580276, 8, 3),
      {
        id: "dv-doc",
        kind: "trac-nghiem",
        prompt: "Số 407 215 đọc là:",
        options: [docSo(470215), docSo(407251), docSo(407215)],
        answerIndex: 2,
        hint: "Đọc từng lớp từ trái sang phải. Lớp nghìn là 407, lớp đơn vị là 215.",
        explanation: `407 215 đọc là: ${docSo(407215)}.`,
      },
    ],
  },
  {
    id: "gia-tri",
    title: "Giá trị của chữ số",
    questions: [
      giaTri("gt-1", 481536, 8),
      giaTri("gt-2", 906214, 9),
      giaTri("gt-3", 735062, 6),
      giaTri("gt-4", 520837, 7),
    ],
  },
  {
    id: "lop-trieu",
    title: "Lớp triệu",
    questions: [
      {
        id: "lt-doc",
        kind: "trac-nghiem",
        prompt: "Một chiếc tủ lạnh giá 12 000 000 đồng. Giá tiền đọc là:",
        options: [`${docSo(120000000)} đồng`, `${docSo(12000000)} đồng`, `${docSo(1200000)} đồng`],
        answerIndex: 1,
        hint: "Đếm các chữ số 0 ở cuối. Sáu chữ số 0 là một triệu. Phần còn lại là 12.",
        explanation: `12 000 000 có 12 ở hàng chục triệu và hàng triệu, nên đọc là ${docSo(12000000)}.`,
      },
      {
        id: "lt-viet-1",
        kind: "dien-so",
        prompt: "Hai mươi triệu viết là:",
        parts: [{ answer: 20000000 }],
        hint: "Hai mươi triệu là 2 chục triệu. Chữ số 2 ở hàng chục triệu.",
        explanation: "20 triệu = 20 000 000. Sau chữ số 2 và 0 là sáu chữ số 0 của lớp nghìn và lớp đơn vị.",
      },
      {
        id: "lt-viet-2",
        kind: "dien-so",
        prompt: "Bảy trăm triệu viết là:",
        parts: [{ answer: 700000000 }],
        hint: "Bảy trăm triệu là 7 trăm triệu, chữ số 7 ở hàng trăm triệu.",
        explanation: "700 triệu = 700 000 000. Số có chín chữ số.",
      },
      {
        id: "lt-viet-3",
        kind: "dien-so",
        prompt: "Tám trăm sáu mươi triệu viết là:",
        parts: [{ answer: 860000000 }],
        hint: "Viết phần lớp triệu 860 trước, rồi viết thêm hai lớp còn lại đều là 000.",
        explanation: "Lớp triệu là 860, lớp nghìn và lớp đơn vị đều là 000. Số đó là 860 000 000.",
      },
      {
        id: "lt-dem-1",
        kind: "dien-so",
        prompt: "Đếm thêm 1 triệu, điền số còn thiếu.",
        parts: ["2 000 000, 3 000 000,", { answer: 4000000 }, ", 5 000 000,", { answer: 6000000 }, ", 7 000 000"],
        hint: "Mỗi lần đếm, số tăng thêm 1 000 000.",
        explanation: "3 000 000 thêm 1 000 000 là 4 000 000. 5 000 000 thêm 1 000 000 là 6 000 000.",
      },
      {
        id: "lt-dem-2",
        kind: "dien-so",
        prompt: "Đếm thêm 10 triệu, điền số còn thiếu.",
        parts: ["780 000 000,", { answer: 790000000 }, ", 800 000 000,", { answer: 810000000 }, ", 820 000 000"],
        hint: "Mỗi lần đếm, số tăng thêm 10 000 000, tức là hàng chục triệu tăng thêm 1.",
        explanation: "780 triệu thêm 10 triệu là 790 triệu. 800 triệu thêm 10 triệu là 810 triệu.",
      },
      viTri("lt-vt-1", 250000000, 5, 5),
      viTri("lt-vt-2", 316000000, 3, 6),
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      viTri("l1-a", 18273, 8, 2),
      viTri("l1-b", 480612, 8, 3),
      viTri("l1-c", 700800, 8, 0),
      {
        id: "l-dieu-kien",
        kind: "trac-nghiem",
        prompt: "Số nào dưới đây thoả mãn các điều kiện: gồm các chữ số khác nhau; không chứa chữ số 0 ở lớp đơn vị; chứa chữ số 6 ở lớp nghìn?",
        options: ["630 241", "563 092", "266 540", "425 316"],
        answerIndex: 0,
        hint: "Kiểm tra từng số theo từng điều kiện. Số nào trượt một điều kiện thì loại ngay.",
        explanation: "563 092 có chữ số 0 ở lớp đơn vị. 266 540 có hai chữ số 6 và có chữ số 0 ở lớp đơn vị. 425 316 có chữ số 6 ở lớp đơn vị. 630 241 thoả mãn cả ba điều kiện.",
      },
      {
        id: "l-gio-1",
        kind: "dien-so",
        prompt: `${priceNote} Giỏ 1 có 3 hộp quà, 2 lon nước và 5 bông hoa. Giỏ 1 có giá bao nhiêu đồng?`,
        parts: [{ answer: 325000 }, "đồng"],
        hint: "Tính giá từng loại: 3 hộp quà là 3 × 100 000. Rồi cộng ba giá tiền lại.",
        explanation: "3 hộp quà là 300 000, 2 lon nước là 20 000, 5 bông hoa là 5 000. Cộng lại được 325 000. Mỗi chữ số cho biết có bao nhiêu hộp quà, lon nước, bông hoa.",
      },
      {
        id: "l-gio-2",
        kind: "dien-so",
        prompt: `${priceNote} Giỏ 2 có 6 hộp quà và 4 bông hoa. Giỏ 2 có giá bao nhiêu đồng?`,
        parts: [{ answer: 604000 }, "đồng"],
        hint: "6 hộp quà là 6 × 100 000. Giỏ này không có lon nước.",
        explanation: "6 hộp quà là 600 000, 4 bông hoa là 4 000. Cộng lại được 604 000. Không có lon nước nên hàng chục nghìn là chữ số 0.",
      },
      {
        id: "l-gio-3",
        kind: "dien-so",
        prompt: `${priceNote} Giỏ 3 có 12 lon nước và 3 bông hoa. Giỏ 3 có giá bao nhiêu đồng?`,
        parts: [{ answer: 123000 }, "đồng"],
        hint: "12 lon nước là 12 × 10 000. Cộng thêm tiền ba bông hoa.",
        explanation: "12 lon nước là 120 000, 3 bông hoa là 3 000. Cộng lại được 123 000.",
      },
      {
        id: "l-can",
        kind: "dien-so",
        prompt: "Số ?",
        parts: ["Bảy triệu =", { answer: 7000000 }, "; Tám mươi triệu =", { answer: 80000000 }, "; Bốn trăm triệu =", { answer: 400000000 }],
        hint: "Viết phần đứng trước chữ triệu, rồi viết thêm sáu chữ số 0 của lớp nghìn và lớp đơn vị.",
        explanation: "7 triệu = 7 000 000. 80 triệu = 80 000 000. 400 triệu = 400 000 000.",
      },
      {
        id: "l-chan",
        kind: "dien-so",
        prompt: "Hãy lập một số chẵn có sáu chữ số, biết lớp nghìn gồm các chữ số 0, 4, 0 và lớp đơn vị gồm các chữ số 6, 1, 1.",
        parts: [{ answer: 400116 }],
        hint: "Chữ số đầu tiên của số có sáu chữ số không thể là 0. Số chẵn thì chữ số hàng đơn vị là chữ số chẵn.",
        explanation: "Lớp nghìn phải là 400 vì chữ số đầu không là 0. Số chẵn nên hàng đơn vị là 6, lớp đơn vị là 116. Số đó là 400 116.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-1",
        kind: "trac-nghiem",
        prompt: "Nam nói: “Chữ số 5 trong 450 321 và chữ số 5 trong 305 421 có giá trị như nhau vì đều là chữ số 5.” Nam nói đúng hay sai?",
        options: [
          "Đúng, vì đều là chữ số 5",
          "Sai, vì hai chữ số 5 đứng ở hai hàng khác nhau",
          "Sai, vì hai số này khác nhau nên chữ số cũng khác nhau",
        ],
        answerIndex: 1,
        hint: "Tìm hàng của chữ số 5 ở mỗi số, rồi tính giá trị.",
        explanation: "Trong 450 321, chữ số 5 ở hàng chục nghìn, giá trị 50 000. Trong 305 421, chữ số 5 ở hàng nghìn, giá trị 5 000. Cùng chữ số nhưng khác hàng thì khác giá trị.",
      },
      {
        id: "sn-2",
        kind: "dien-so",
        prompt: "Số một trăm triệu có bao nhiêu chữ số 0?",
        parts: [{ answer: 8 }, "chữ số 0"],
        hint: "Viết 100 000 000 ra và đếm các chữ số 0.",
        explanation: "100 000 000 có chữ số 1 và 8 chữ số 0.",
      },
      {
        id: "sn-3",
        kind: "dien-so",
        prompt: "Một triệu là 1 000 000. Con hãy đổi.",
        parts: ["1 triệu =", { answer: 10 }, "trăm nghìn; 1 triệu =", { answer: 1000 }, "nghìn"],
        hint: "Cứ 10 đơn vị ở một hàng thì bằng 1 đơn vị ở hàng liền trước nó. Từ hàng triệu đếm lùi về hàng trăm nghìn và về hàng nghìn.",
        explanation: "10 trăm nghìn = 1 triệu. 1 000 nghìn = 1 triệu, vì 1 000 × 1 000 = 1 000 000.",
      },
      {
        id: "sn-4",
        kind: "trac-nghiem",
        prompt: "An viết “sáu triệu hai trăm nghìn” là 6 020 000. Con tìm lỗi sai của An.",
        options: ["An viết đúng", "Sai, số đúng là 6 200 000", "Sai, số đúng là 62 000 000"],
        answerIndex: 1,
        hint: "Sáu triệu thì chữ số 6 ở hàng triệu. Hai trăm nghìn thì chữ số 2 ở hàng nào?",
        explanation: "Hai trăm nghìn là 2 chữ số ở hàng trăm nghìn, nên số đúng là 6 200 000. An đã đặt chữ số 2 ở hàng chục nghìn.",
      },
    ],
  },
];
