import type { ExerciseGroup, Question } from "@/components/exercises/types";
import { createElement } from "react";
import { ChonSongSong } from "./_illustrations/chon-song-song";
import { DuongChay } from "./_illustrations/duong-chay";
import { HinhVuong } from "./_illustrations/hinh-vuong";

/** Hình vuông ở bài tập: cạnh 12 ô vuông (SGK dùng 8 ô). */
export const squareSide = 12;

/** Đường chạy ở bài tập: MN = 4 cm, MP = HK = NQ = 12 cm (SGK dùng 2 cm và 10 cm). */
export const track = { mn: 4, mp: 12 };

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-song-song",
    kind: "trac-nghiem",
    prompt: "Hai đường thẳng song song có đặc điểm nào?",
    options: ["Kéo dài mãi cũng không bao giờ cắt nhau", "Cắt nhau tạo thành bốn góc vuông", "Cắt nhau tại một điểm"],
    answerIndex: 0,
    hint: "Nhớ lại hai thanh ray của đường tàu ở Bài 29.",
    explanation: "Hai đường thẳng song song kéo dài mãi cũng không bao giờ cắt nhau, như hai thanh ray của đường tàu.",
  },
  {
    id: "kd-e-ke",
    kind: "trac-nghiem",
    prompt: "Vẽ đường thẳng đi qua điểm H và vuông góc với đường thẳng AB. Ta đặt ê ke thế nào?",
    options: [
      "Một cạnh góc vuông trùng với AB, cạnh góc vuông thứ hai gặp H",
      "Cạnh dài nhất của ê ke trùng với AB",
      "Đặt ê ke tùy ý, miễn gần điểm H",
    ],
    answerIndex: 0,
    hint: "Nhớ lại Bài 28: hai cạnh nào của ê ke tạo nên góc vuông?",
    explanation: "Một cạnh góc vuông trùng với AB, cạnh góc vuông thứ hai gặp H, rồi vạch theo cạnh góc vuông thứ hai.",
  },
  {
    id: "kd-trung-diem",
    kind: "dien-so",
    parts: ["H là trung điểm của đoạn thẳng MN dài 8 cm. Độ dài MH là", { answer: 4 }, "cm."],
    hint: "Trung điểm chia đoạn thẳng thành hai phần bằng nhau.",
    explanation: "H là trung điểm nên MH = HN. Hai đoạn bằng nhau, cộng lại được 8 cm, nên mỗi đoạn dài 8 : 2 = 4 cm.",
  },
];

export const quickChecks = {
  buoc2: {
    id: "thu-buoc-2",
    kind: "trac-nghiem",
    prompt: "Vẽ CD đi qua H và song song với AB. Sau khi vẽ MN đi qua H và vuông góc với AB, ở bước 2 ta vẽ CD thế nào?",
    options: ["CD đi qua H và vuông góc với MN", "CD đi qua H và cắt MN tạo góc nhọn", "CD đi qua H và trùng với MN"],
    answerIndex: 0,
    hint: "Bước 2 dùng ê ke một lần nữa, lần này đặt cạnh góc vuông trùng với MN.",
    explanation: "CD đi qua H và vuông góc với MN. AB và CD cùng vuông góc với MN nên CD song song với AB.",
  },
  trungDiem: {
    id: "thu-trung-diem",
    kind: "dien-so",
    prompt: "Hình vuông ABCD có cạnh 8 ô vuông. M là trung điểm của AB.",
    parts: ["AM =", { answer: 4 }, "ô vuông."],
    hint: "M là trung điểm nên chia AB thành hai phần bằng nhau.",
    explanation: "AB = 8 ô, M là trung điểm nên AM = 8 : 2 = 4 ô.",
  },
  lan: {
    id: "thu-lan",
    kind: "dien-so",
    prompt: "Vạch xuất phát MN dài 2 cm, H là trung điểm của MN.",
    parts: ["MH =", { answer: 1 }, "cm."],
    hint: "Chia MN thành hai phần bằng nhau.",
    explanation: "MN = 2 cm, H là trung điểm nên MH = HN = 2 : 2 = 1 cm. Mỗi đường chạy rộng 1 cm trên bản thiết kế.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "ve-song-song",
    title: "Vẽ hai đường thẳng song song",
    questions: [
      {
        id: "ss-thu-tu",
        kind: "noi-cap",
        prompt: "Vẽ đường thẳng CD đi qua điểm H và song song với đường thẳng AB. Nối mỗi bước với đúng việc phải làm.",
        pairs: [
          { left: "Bước 1", right: "Vẽ đường thẳng MN đi qua H và vuông góc với AB" },
          { left: "Bước 2", right: "Vẽ đường thẳng CD đi qua H và vuông góc với MN" },
          { left: "Kết quả", right: "CD đi qua H và song song với AB" },
        ],
        rightOrder: [1, 2, 0],
        hint: "Vẽ MN trước, rồi mới vẽ CD. Cuối cùng ta có CD song song với AB.",
        explanation: "Bước 1 vẽ MN qua H, vuông góc với AB. Bước 2 vẽ CD qua H, vuông góc với MN. Ta được CD đi qua H và song song với AB.",
      },
      {
        id: "ss-chon-duong",
        kind: "trac-nghiem",
        prompt: "Trong hình, đường thẳng nào đi qua điểm H và song song với đường thẳng AB?",
        options: ["Đường 1", "Đường 2", "Đường 3"],
        answerIndex: 1,
        illustration: createElement(ChonSongSong),
        hint: "Chọn các đường đi qua H trước, rồi xem đường nào không cắt AB khi kéo dài.",
        explanation: "Đường 2 đi qua H và song song với AB. Đường 1 song song với AB nhưng không đi qua H. Đường 3 đi qua H nhưng cắt AB.",
      },
      {
        id: "ss-nghieng",
        kind: "trac-nghiem",
        prompt: "Đường thẳng AB nằm nghiêng trên tờ giấy, điểm H nằm ngoài AB. Đường thẳng CD đi qua H và song song với AB phải nằm thế nào?",
        options: ["Nằm ngang cho dễ nhìn", "Nằm nghiêng giống AB", "Nằm thẳng đứng"],
        answerIndex: 1,
        hint: "Hai đường thẳng song song không cắt nhau, nên chúng cùng hướng.",
        explanation: "CD song song với AB nên CD nghiêng giống AB. Cách vẽ không đổi: vẽ MN vuông góc với AB, rồi vẽ CD vuông góc với MN, ê ke nghiêng theo AB.",
      },
    ],
  },
  {
    id: "ghep-hinh",
    title: "Bộ đồ chơi ghép hình",
    questions: [
      {
        id: "gh-thu-tu",
        kind: "noi-cap",
        prompt: "Làm bộ đồ chơi ghép hình từ hình vuông ABCD. Nối mỗi bước với đúng việc phải làm.",
        pairs: [
          { left: "Bước 1", right: "Vẽ hình vuông ABCD trên giấy kẻ ô vuông, vẽ đường chéo AC" },
          { left: "Bước 2", right: "Xác định trung điểm M, N, O, P rồi vẽ DO, ON, MN" },
          { left: "Bước 3", right: "Vẽ PQ song song với AM, điểm Q ở trên MN" },
          { left: "Bước 4", right: "Cắt hình vuông thành 6 phần và tô mỗi phần một màu" },
        ],
        rightOrder: [2, 3, 1, 0],
        hint: "Vẽ hình vuông trước, cắt và tô màu sau cùng.",
        explanation: "Bước 1 vẽ hình vuông và AC. Bước 2 xác định các trung điểm và vẽ DO, ON, MN. Bước 3 vẽ PQ song song với AM. Bước 4 cắt thành 6 phần và tô màu.",
      },
      {
        id: "gh-am",
        kind: "dien-so",
        prompt: `Hình vuông ABCD có cạnh ${squareSide} ô vuông. M là trung điểm của AB.`,
        parts: ["AM =", { answer: squareSide / 2 }, "ô vuông."],
        illustration: createElement(HinhVuong, { n: squareSide }),
        hint: "M là trung điểm nên chia AB thành hai phần bằng nhau.",
        explanation: `AB = ${squareSide} ô, M là trung điểm nên AM = ${squareSide} : 2 = ${squareSide / 2} ô.`,
      },
      {
        id: "gh-pq",
        kind: "trac-nghiem",
        prompt: "Trong hình, đoạn thẳng nào song song với đoạn thẳng PQ?",
        options: ["Đoạn thẳng AC", "Đoạn thẳng MN", "Đoạn thẳng ON"],
        answerIndex: 2,
        illustration: createElement(HinhVuong, { n: squareSide }),
        hint: "PQ nằm ngang. Tìm đoạn thẳng cũng nằm ngang, cùng hướng với PQ.",
        explanation: "ON nằm ngang giống PQ nên ON song song với PQ. AC và MN đều nằm nghiêng, cắt PQ.",
      },
      {
        id: "gh-mn",
        kind: "trac-nghiem",
        prompt: "Trong hình, đoạn thẳng MN song song với đoạn thẳng nào?",
        options: ["Đoạn thẳng DO", "Đoạn thẳng ON", "Đoạn thẳng AC"],
        answerIndex: 2,
        illustration: createElement(HinhVuong, { n: squareSide }),
        hint: "MN nghiêng như thế nào? Tìm đoạn thẳng nghiêng cùng hướng với MN.",
        explanation: "MN và AC cùng nghiêng một hướng, nên MN song song với AC. DO nghiêng theo hướng khác, ON nằm ngang.",
      },
      {
        id: "gh-manh",
        kind: "dien-so",
        prompt: "Sau khi cắt hình vuông ABCD theo các đoạn thẳng AC, DO, MN, ON, PQ ta được 6 mảnh.",
        parts: ["Có", { answer: 4 }, "mảnh hình tam giác và", { answer: 2 }, "mảnh có bốn cạnh."],
        illustration: createElement(HinhVuong, { n: squareSide }),
        hint: "Đếm số cạnh của từng mảnh màu: mảnh nào có 3 cạnh, mảnh nào có 4 cạnh.",
        explanation: "Có 4 mảnh hình tam giác (cam, vàng, tím, xanh) và 2 mảnh có bốn cạnh (đỏ, xanh lá). 4 + 2 = 6 mảnh.",
      },
    ],
  },
  {
    id: "duong-chay",
    title: "Thiết kế đường chạy",
    questions: [
      {
        id: "dc-thu-tu",
        kind: "noi-cap",
        prompt: `Vẽ bản thiết kế đường chạy cho 2 người. Nối mỗi bước với đúng việc phải làm.`,
        pairs: [
          { left: "Bước 1", right: `Vẽ vạch xuất phát MN dài ${track.mn} cm, vẽ trung điểm H của MN` },
          { left: "Bước 2", right: `Vẽ MP vuông góc với MN: MP = ${track.mp} cm` },
          { left: "Bước 3", right: `Vẽ HK, NQ song song với MP: HK = NQ = ${track.mp} cm` },
          { left: "Bước 4", right: "Nối P với Q để được vạch đích" },
        ],
        rightOrder: [2, 3, 1, 0],
        hint: "Vẽ vạch xuất phát MN trước, vẽ vạch đích PQ sau cùng.",
        explanation: "Bước 1 vẽ MN và trung điểm H. Bước 2 vẽ MP vuông góc với MN. Bước 3 vẽ HK và NQ song song với MP. Bước 4 nối P với Q được vạch đích.",
      },
      {
        id: "dc-mh",
        kind: "dien-so",
        prompt: `Vạch xuất phát MN dài ${track.mn} cm, H là trung điểm của MN.`,
        parts: ["MH =", { answer: track.mn / 2 }, "cm."],
        illustration: createElement(DuongChay),
        hint: "H là trung điểm nên chia MN thành hai phần bằng nhau.",
        explanation: `MN = ${track.mn} cm, H là trung điểm nên MH = HN = ${track.mn} : 2 = ${track.mn / 2} cm. Mỗi đường chạy rộng ${track.mn / 2} cm trên bản thiết kế.`,
      },
      {
        id: "dc-hk",
        kind: "dien-so",
        prompt: `Trên bản thiết kế, MP = ${track.mp} cm. Các đoạn thẳng HK và NQ song song với MP, dài bằng MP.`,
        parts: ["HK =", { answer: track.mp }, "cm và NQ =", { answer: track.mp }, "cm."],
        illustration: createElement(DuongChay),
        hint: "Đường chạy dài bằng nhau nên HK, NQ và MP dài bằng nhau.",
        explanation: `Hai đường chạy HK và NQ song song với MP và dài bằng MP, nên HK = NQ = ${track.mp} cm.`,
      },
      {
        id: "dc-quan-he",
        kind: "trac-nghiem",
        prompt: "Ba đoạn thẳng MP, HK, NQ trong bản thiết kế có quan hệ gì với nhau?",
        options: ["Song song với nhau", "Cắt nhau tại một điểm", "Vuông góc với nhau"],
        answerIndex: 0,
        illustration: createElement(DuongChay),
        hint: "Nhìn hình: ba đoạn thẳng này có cắt nhau không?",
        explanation: "MP, HK và NQ đều vuông góc với MN và nằm cùng hướng, kéo dài mãi cũng không cắt nhau, nên chúng song song với nhau.",
      },
      {
        id: "dc-dich",
        kind: "trac-nghiem",
        prompt: "Trong bản thiết kế đường chạy, vạch đích là đoạn thẳng nào?",
        options: ["Đoạn thẳng MN", "Đoạn thẳng PQ", "Đoạn thẳng HK"],
        answerIndex: 1,
        illustration: createElement(DuongChay),
        hint: "Vạch xuất phát là MN. Vạch đích nằm ở đầu bên kia của đường chạy.",
        explanation: "Nối P với Q ta được vạch đích. MN là vạch xuất phát, còn HK là đường chia hai đường chạy.",
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
        prompt: "Nam vẽ đường thẳng MN đi qua H và vuông góc với AB. Rồi Nam lại vẽ CD đi qua H và vuông góc với AB (không phải với MN). Nam nói đã vẽ được CD song song với AB. Nam đúng hay sai?",
        options: ["Nam đúng", "Nam sai: CD phải vuông góc với MN"],
        answerIndex: 1,
        hint: "Qua H chỉ có một đường vuông góc với AB. Đường đó là đường nào?",
        explanation: "Qua H chỉ vẽ được một đường vuông góc với AB, nên CD trùng với MN, không song song với AB. Bước 2 phải vẽ CD vuông góc với MN.",
      },
      {
        id: "sn-mot-duong",
        kind: "trac-nghiem",
        prompt: "Thử thách (ngoài sách): Cho đường thẳng AB và điểm H nằm ngoài AB. Qua H, vẽ được mấy đường thẳng song song với AB?",
        options: ["1 đường thẳng", "2 đường thẳng", "Rất nhiều đường thẳng"],
        answerIndex: 0,
        hint: "Nhớ lại cách vẽ: MN qua H vuông góc với AB chỉ có một đường, rồi CD qua H vuông góc với MN cũng chỉ có một đường.",
        explanation: "Qua H chỉ có một đường vuông góc với AB (là MN), và qua H chỉ có một đường vuông góc với MN (là CD). Vì vậy chỉ vẽ được 1 đường thẳng đi qua H và song song với AB.",
      },
    ],
  },
];
