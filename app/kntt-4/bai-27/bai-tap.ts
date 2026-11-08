import type { ExerciseGroup, Question } from "@/components/exercises/types";
import { createElement } from "react";
import type { Point } from "./hinh";
import { CacGoc, type GocSpec } from "./_illustrations/cac-goc";
import { CapDuong } from "./_illustrations/cap-duong";
import { CoiXayGio } from "./_illustrations/coi-xay-gio";
import { DaGiac } from "./_illustrations/da-giac";
import { DuQuay } from "./_illustrations/du-quay";
import { GapGiay } from "./_illustrations/gap-giay";
import { OngNuoc } from "./_illustrations/ong-nuoc";

const p = (x: number, y: number): Point => ({ x, y });

/** Ba góc của câu khởi động: góc C là góc vuông, xoay nghiêng để con không đoán theo "ngang, dọc". */
export const warmUpAngles: GocSpec[] = [
  { name: "A", rotation: 0, degrees: 50 },
  { name: "B", rotation: 20, degrees: 130 },
  { name: "C", rotation: 330, degrees: 90 },
];

/** Ngũ giác ABCDE của câu hoạt động 2: chỉ góc B và góc C là góc vuông. */
export const pentagon = {
  names: ["A", "B", "C", "D", "E"],
  points: [p(30, 110), p(30, 30), p(120, 30), p(120, 90), p(70, 125)],
};

/** Tứ giác ABCD của bài luyện tập 2: góc B và góc C là góc vuông. */
export const trapezoid = {
  names: ["A", "B", "C", "D"],
  points: [p(130, 20), p(30, 20), p(30, 100), p(100, 100)],
};

/** Hình chữ nhật của câu "Suy nghĩ thêm": đếm cặp cạnh vuông góc. */
export const rectangle = {
  names: ["E", "F", "G", "H"],
  points: [p(40, 20), p(190, 20), p(190, 100), p(40, 100)],
};

/** Đu quay: ca-bin vàng ở vị trí thứ 3 (từ 0 là ca-bin đầu tiên lệch trái đỉnh). Các lựa chọn ghi theo số trên ca-bin. */
export const wheel = { yellowIndex: 2, options: [2, 3, 4, 6], answerCabin: 4 };

/** Các giờ ở câu đồng hồ, đo bằng giờ đúng. */
export const clockHours = [12, 4, 6, 9];

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-chu-nhat",
    kind: "dien-so",
    parts: ["Hình chữ nhật có", { answer: 4 }, "góc vuông."],
    hint: "Nhìn góc của một tờ giấy hình chữ nhật. Mỗi góc đều vuông như nhau.",
    explanation: "Hình chữ nhật có 4 góc, cả 4 góc đều là góc vuông.",
  },
  {
    id: "kd-goc",
    kind: "trac-nghiem",
    prompt: "Trong ba góc dưới đây, góc nào là góc vuông?",
    options: ["Góc A", "Góc B", "Góc C"],
    answerIndex: 2,
    illustration: createElement(CacGoc, { angles: warmUpAngles }),
    hint: "Góc vuông giống góc của tờ giấy hình chữ nhật. Dùng ê ke đặt vào từng góc xem có khít không.",
    explanation: "Góc C là góc vuông. Góc A hẹp hơn góc vuông, góc B rộng hơn góc vuông.",
  },
  {
    id: "kd-e-ke",
    kind: "trac-nghiem",
    prompt: "Dụng cụ nào dùng để kiểm tra góc vuông?",
    options: ["Ê ke", "Compa", "Cân đĩa", "Đồng hồ"],
    answerIndex: 0,
    hint: "Dụng cụ này có hình tam giác và có một góc vuông.",
    explanation: "Ê ke có một góc vuông, ta đặt ê ke vào góc cần kiểm tra để biết góc đó có vuông không.",
  },
];

export const quickChecks = {
  chuNhat: {
    id: "thu-chu-nhat",
    kind: "trac-nghiem",
    prompt: "Kéo dài hai cạnh AB và AD của hình chữ nhật ABCD, ta được hai đường thẳng như thế nào?",
    options: ["Vuông góc với nhau", "Trùng nhau", "Cắt nhau nhưng không vuông góc"],
    answerIndex: 0,
    hint: "Hình chữ nhật có góc A là góc gì?",
    explanation: "Góc A của hình chữ nhật là góc vuông, nên hai đường thẳng AB và AD vuông góc với nhau.",
  },
  bonGoc: {
    id: "thu-bon-goc",
    kind: "dien-so",
    parts: ["Hai đường thẳng vuông góc cắt nhau tại O tạo thành", { answer: 4 }, "góc vuông có chung đỉnh O."],
    hint: "Hai đường thẳng cắt nhau chia mặt phẳng thành 4 góc. Ở đây cả 4 góc đều vuông.",
    explanation: "Hai đường thẳng vuông góc tạo thành 4 góc vuông có chung đỉnh O.",
  },
  khong: {
    id: "thu-khong",
    kind: "trac-nghiem",
    prompt: "Hai đường thẳng PQ và RS cắt nhau tại O. Chúng có vuông góc với nhau không?",
    options: ["Có, vuông góc", "Không, chỉ cắt nhau"],
    answerIndex: 1,
    illustration: createElement(CapDuong, { rotation: 10, angle: 120 }),
    hint: "Đặt ê ke vào O, một cạnh góc vuông sát PQ. Cạnh góc vuông còn lại có sát RS không?",
    explanation: "Cạnh góc vuông của ê ke không sát đường thẳng RS, nên hai đường thẳng này cắt nhau nhưng không vuông góc.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Hoạt động",
    questions: [
      {
        id: "hd-1a",
        kind: "trac-nghiem",
        prompt: "Dùng ê ke kiểm tra: hai đường thẳng PQ và RS có vuông góc với nhau không?",
        options: ["Có", "Không"],
        answerIndex: 1,
        illustration: createElement(CapDuong, { rotation: 15, angle: 65 }),
        hint: "Đặt đỉnh góc vuông của ê ke vào O, một cạnh sát PQ. Xem cạnh còn lại có sát RS không.",
        explanation: "Cạnh còn lại của ê ke không sát RS, nên PQ và RS cắt nhau nhưng không vuông góc.",
      },
      {
        id: "hd-1b",
        kind: "trac-nghiem",
        prompt: "Dùng ê ke kiểm tra: hai đường thẳng EG và HK có vuông góc với nhau không?",
        options: ["Có", "Không"],
        answerIndex: 0,
        illustration: createElement(CapDuong, { rotation: 20, angle: 90, names: ["E", "G", "H", "K"] }),
        hint: "Hình nghiêng, con đừng đoán theo ngang hay dọc. Đặt ê ke vào để kiểm tra.",
        explanation: "Hai cạnh góc vuông của ê ke cùng sát hai đường thẳng, nên EG và HK vuông góc với nhau.",
      },
      {
        id: "hd-2",
        kind: "trac-nghiem",
        prompt: "Hình ngũ giác ABCDE có góc B và góc C là góc vuông, các góc còn lại không vuông. Những cặp đoạn thẳng nào vuông góc với nhau?",
        options: ["BC và CD; CD và DE", "AB và BC; BC và CD", "AB và BC; AB và AE", "CD và DE; DE và EA"],
        answerIndex: 1,
        illustration: createElement(DaGiac, { points: pentagon.points, names: pentagon.names, label: "Ngũ giác ABCDE" }),
        hint: "Hai đoạn thẳng vuông góc khi chúng tạo thành góc vuông. Góc B do AB và BC tạo ra, góc C do BC và CD tạo ra.",
        explanation: "Góc B vuông nên AB vuông góc với BC. Góc C vuông nên BC vuông góc với CD. Các góc A, D, E không vuông.",
      },
      {
        id: "hd-3",
        kind: "trac-nghiem",
        prompt: "Trong bức tranh cối xay gió, cặp nào là hình ảnh của hai đường thẳng vuông góc?",
        options: ["Thanh cánh quạt AC và thanh cánh quạt BD", "Thanh cánh quạt AC và mặt đất", "Hai cạnh bên của tháp"],
        answerIndex: 0,
        illustration: createElement(CoiXayGio),
        hint: "Tìm hai thanh cắt nhau và tạo thành bốn góc giống nhau, như hình chữ thập.",
        explanation: "Hai thanh cánh quạt AC và BD cắt nhau và tạo thành bốn góc vuông. Thanh AC nghiêng so với mặt đất, hai cạnh bên của tháp không tạo thành góc vuông.",
      },
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      {
        id: "lt-1",
        kind: "trac-nghiem",
        prompt: "Hình ảnh nào dưới đây cho thấy hai đường thẳng vuông góc?",
        options: ["Hai cạnh liền nhau của mặt bàn hình chữ nhật", "Hai kim đồng hồ lúc 1 giờ", "Cái thang nghiêng dựa vào tường và bức tường"],
        answerIndex: 0,
        hint: "Nhớ lại hình chữ nhật: hai cạnh liền nhau tạo thành góc gì?",
        explanation: "Mặt bàn hình chữ nhật có bốn góc vuông, nên hai cạnh liền nhau vuông góc với nhau. Lúc 1 giờ hai kim tạo góc hẹp, cái thang dựa nghiêng vào tường cũng không tạo góc vuông.",
      },
      {
        id: "lt-2a",
        kind: "noi-cap",
        prompt: "Tứ giác ABCD có góc B và góc C là góc vuông (như dấu trong hình). Nối mỗi cặp cạnh với đúng mô tả.",
        pairs: [
          { left: "AB và BC", right: "Vuông góc, cắt nhau tại B" },
          { left: "BC và CD", right: "Vuông góc, cắt nhau tại C" },
          { left: "CD và DA", right: "Cắt nhau tại D, không vuông góc" },
        ],
        rightOrder: [1, 2, 0],
        illustration: createElement(DaGiac, { points: trapezoid.points, names: trapezoid.names, marks: true, label: "Tứ giác ABCD có góc B và góc C là góc vuông" }),
        hint: "Góc có dấu vuông là góc vuông. Hai cạnh tạo nên góc đó vuông góc với nhau.",
        explanation: "Góc B vuông: AB vuông góc BC. Góc C vuông: BC vuông góc CD. Góc D không vuông nên CD và DA chỉ cắt nhau.",
      },
      {
        id: "lt-2b",
        kind: "dien-so",
        prompt: "Cũng trong tứ giác ABCD ở trên, có bao nhiêu cặp cạnh liền nhau cắt nhau mà không vuông góc?",
        parts: [{ answer: 2 }, "cặp"],
        illustration: createElement(DaGiac, { points: trapezoid.points, names: trapezoid.names, marks: true, label: "Tứ giác ABCD có góc B và góc C là góc vuông" }),
        hint: "Có bốn cặp cạnh liền nhau: AB và BC, BC và CD, CD và DA, DA và AB. Bỏ đi những cặp vuông góc.",
        explanation: "Hai cặp vuông góc là AB và BC, BC và CD. Còn lại CD và DA, DA và AB cắt nhau mà không vuông góc: 2 cặp.",
      },
      {
        id: "lt-3",
        kind: "trac-nghiem",
        prompt: "Có ba ống nước M, N, P. Cần nối sao cho ống M vuông góc với ống N, ống N vuông góc với ống P. Phương án nào phù hợp?",
        options: ["Phương án A", "Phương án B", "Phương án C"],
        answerIndex: 1,
        illustration: createElement(OngNuoc),
        hint: "Xét từng chỗ nối. Hai ống nối thành một đường thẳng thì không vuông góc. Hai ống nối nghiêng cũng không.",
        explanation: "Phương án B: M ngang, N dọc, P ngang, chỗ nối nào cũng là góc vuông. Phương án A: M và N nối thành một đường thẳng. Phương án C: ống P nghiêng nên không vuông góc với N.",
      },
      {
        id: "lt-4",
        kind: "trac-nghiem",
        prompt: "Không có ê ke, làm thế nào để tìm được đường thẳng vuông góc với đường thẳng AB trên tờ giấy?",
        options: [
          "Gấp tờ giấy sao cho nếp gấp trùng với đường thẳng AB",
          "Gấp tờ giấy sao cho hai phần của đường thẳng AB chồng khít lên nhau, nếp gấp là đường thẳng cần tìm",
          "Gấp tờ giấy làm đôi theo cách nào cũng được",
        ],
        answerIndex: 1,
        illustration: createElement(GapGiay),
        hint: "Nếp gấp tạo ra góc vuông khi hai phần của đường thẳng AB trùng khít nhau sau khi gấp.",
        explanation: "Gấp sao cho hai phần của AB chồng khít lên nhau thì nếp gấp vuông góc với AB. Gấp trùng với AB thì nếp gấp chính là AB.",
      },
      {
        id: "lt-5",
        kind: "trac-nghiem",
        prompt: "Nam đặt cục tẩy vào ca-bin màu vàng. Thanh nan hoa nối với ca-bin đựng gọt bút chì phải vuông góc với thanh nan hoa nối với ca-bin màu vàng. Nam có thể đặt gọt bút chì ở ca-bin nào?",
        options: ["Ca-bin 2", "Ca-bin 3", "Ca-bin 4", "Ca-bin 6"],
        answerIndex: 2,
        illustration: createElement(DuQuay, { yellowIndex: wheel.yellowIndex }),
        hint: "Hai thanh nan hoa vuông góc thì tạo thành góc vuông ở tâm. Ca-bin nằm ở đầu thanh nan hoa nào cách thanh vàng đúng một phần tư vòng tròn?",
        explanation: "Ca-bin 4 cách ca-bin vàng đúng một phần tư vòng, nên hai nan hoa vuông góc. Ca-bin 1 cũng được. Ca-bin 2 và 3 lệch một nửa góc vuông, còn ca-bin 6 nằm đối diện, cùng một đường thẳng với ca-bin vàng.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-mai",
        kind: "trac-nghiem",
        prompt: "Mai nói: “Hai đường thẳng cắt nhau thì luôn vuông góc với nhau.” Nhìn hình, Mai nói đúng hay sai?",
        options: ["Mai đúng", "Mai sai: hai đường thẳng này cắt nhau mà không vuông góc"],
        answerIndex: 1,
        illustration: createElement(CapDuong, { rotation: 30, angle: 55 }),
        hint: "Hai đường thẳng trong hình có cắt nhau không? Chúng có tạo ra góc vuông không?",
        explanation: "Hai đường thẳng cắt nhau tạo ra bốn góc. Chỉ khi bốn góc đều vuông thì hai đường mới vuông góc. Ở hình này góc không vuông.",
      },
      {
        id: "sn-dem",
        kind: "dien-so",
        prompt: "Hình chữ nhật EFGH có bao nhiêu cặp cạnh vuông góc với nhau?",
        parts: [{ answer: 4 }, "cặp"],
        illustration: createElement(DaGiac, { points: rectangle.points, names: rectangle.names, label: "Hình chữ nhật EFGH" }),
        hint: "Đếm theo từng đỉnh: mỗi đỉnh có một cặp cạnh tạo thành góc vuông. Hình có mấy đỉnh?",
        explanation: "Mỗi đỉnh có một cặp cạnh vuông góc: EF và FG, FG và GH, GH và HE, HE và EF. Vậy có 4 cặp.",
      },
      {
        id: "sn-dong-ho",
        kind: "trac-nghiem",
        prompt: "Thử thách (ngoài sách): Lúc 3 giờ đúng, kim giờ và kim phút vuông góc với nhau. Lúc nào dưới đây cũng như vậy?",
        options: ["12 giờ", "4 giờ", "6 giờ", "9 giờ"],
        answerIndex: 3,
        hint: "Kim phút chỉ số 12. Kim giờ cần chỉ số nào để hai kim tạo thành góc vuông? Nhớ 3 giờ thì kim giờ chỉ số 3.",
        explanation: "Lúc 9 giờ kim giờ chỉ số 9, kim phút chỉ số 12, tạo thành một góc vuông. Lúc 12 giờ hai kim trùng nhau, lúc 6 giờ hai kim thành một đường thẳng, lúc 4 giờ góc rộng hơn góc vuông.",
      },
    ],
  },
];
