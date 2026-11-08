import type { ExerciseGroup, Question } from "@/components/exercises/types";
import { DaGiac } from "@/components/math/da-giac";
import { polar, type Point } from "@/lib/hinh";
import { createElement } from "react";
import { BonHinh } from "./_illustrations/bon-hinh";
import { ChiaHinh } from "./_illustrations/chia-hinh";
import { DuongPho } from "./_illustrations/duong-pho";
import { HaiDoan } from "./_illustrations/hai-doan";
import { LuoiHinhThang } from "./_illustrations/luoi";
import { QueTinh } from "./_illustrations/que-tinh";
import { ThangTre } from "./_illustrations/thang-tre";

const p = (x: number, y: number): Point => ({ x, y });

/** Hình chữ nhật EFGH của câu hoạt động 1a. */
export const rectangle = { names: ["E", "F", "G", "H"], points: [p(30, 25), p(190, 25), p(190, 100), p(30, 100)] };

/** Hình vuông KLMN nghiêng 25 độ, để con không đoán theo "ngang, dọc" (câu hoạt động 1b). */
const squareCenter = p(100, 90);
export const square = {
  names: ["K", "L", "M", "N"],
  points: [65, 155, 245, 335].map((deg) => polar(squareCenter, 55, deg)),
};

/** Lục giác đều ABCDEF của câu "Suy nghĩ thêm" (vượt SGK). */
export const hexagon = {
  names: ["A", "B", "C", "D", "E", "F"],
  points: [0, 60, 120, 180, 240, 300].map((deg) => polar(p(100, 90), 60, deg)),
};

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-lien-nhau",
    kind: "trac-nghiem",
    prompt: "Kéo dài hai cạnh liền nhau AB và AD của hình chữ nhật ABCD, ta được hai đường thẳng như thế nào?",
    options: ["Vuông góc với nhau", "Trùng nhau", "Cắt nhau nhưng không vuông góc"],
    answerIndex: 0,
    hint: "Góc A của hình chữ nhật là góc gì?",
    explanation: "Góc A là góc vuông, nên hai đường thẳng AB và AD vuông góc với nhau (Bài 27).",
  },
  {
    id: "kd-doi",
    kind: "dien-so",
    prompt: "Hình chữ nhật ABCD có AB = 7 cm.",
    parts: ["Cạnh đối diện DC dài", { answer: 7 }, "cm."],
    hint: "Hình chữ nhật có hai cạnh đối diện bằng nhau.",
    explanation: "Hai cạnh đối diện của hình chữ nhật bằng nhau, nên DC = AB = 7 cm.",
  },
  {
    id: "kd-duong-thang",
    kind: "trac-nghiem",
    prompt: "Đường thẳng khác đoạn thẳng ở điểm nào?",
    options: ["Đường thẳng kéo dài mãi về hai phía", "Đường thẳng ngắn hơn", "Đường thẳng luôn nằm ngang"],
    answerIndex: 0,
    hint: "Đoạn thẳng có hai đầu. Đường thẳng thì sao?",
    explanation: "Đoạn thẳng có hai đầu. Kéo dài đoạn thẳng về hai phía mãi mãi, ta được đường thẳng.",
  },
];

export const quickChecks = {
  songSong: {
    id: "thu-song-song",
    kind: "trac-nghiem",
    prompt: "Kéo dài hai cạnh đối diện AB và DC của hình chữ nhật ABCD, ta được hai đường thẳng như thế nào?",
    options: ["Song song với nhau", "Vuông góc với nhau", "Cắt nhau nhưng không vuông góc"],
    answerIndex: 0,
    hint: "AB và DC nằm đối diện nhau, giống hai thanh ray của đường tàu.",
    explanation: "Kéo dài hai cạnh đối diện AB và DC của hình chữ nhật, ta được hai đường thẳng song song với nhau.",
  },
  khongCat: {
    id: "thu-khong-cat",
    kind: "trac-nghiem",
    prompt: "Hai đường thẳng song song có bao giờ cắt nhau không?",
    options: ["Không bao giờ cắt nhau", "Cắt nhau ở rất xa", "Có lúc cắt nhau"],
    answerIndex: 0,
    hint: "Nhớ hai thanh ray của đường tàu: kéo dài mãi cũng không gặp nhau.",
    explanation: "Hai đường thẳng song song không bao giờ cắt nhau, dù kéo dài mãi về hai phía.",
  },
  haiCap: {
    id: "thu-hai-cap",
    kind: "dien-so",
    parts: ["Hình chữ nhật có", { answer: 2 }, "cặp cạnh song song."],
    hint: "Hình chữ nhật có 4 cạnh. Cạnh đối diện nhau thì song song. Ghép 4 cạnh thành từng cặp đối diện.",
    explanation: "Hình chữ nhật ABCD có hai cặp cạnh song song: AB và DC; AD và BC.",
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
        prompt: "Hình chữ nhật EFGH có EF và HG là một cặp cạnh song song. Cặp cạnh song song còn lại là:",
        options: ["EH và FG", "EF và FG", "EH và HG", "EG và FH"],
        answerIndex: 0,
        illustration: createElement(DaGiac, { points: rectangle.points, names: rectangle.names, label: "Hình chữ nhật EFGH" }),
        hint: "Cặp cạnh song song là hai cạnh đối diện nhau. EF đối diện HG, còn hai cạnh kia thì sao?",
        explanation: "Hình chữ nhật có hai cặp cạnh đối diện song song: EF và HG; EH và FG.",
      },
      {
        id: "hd-1b",
        kind: "dien-so",
        parts: ["Hình vuông KLMN có", { answer: 2 }, "cặp cạnh song song."],
        illustration: createElement(DaGiac, { points: square.points, names: square.names, label: "Hình vuông KLMN đặt nghiêng" }),
        hint: "Hình vuông cũng là hình chữ nhật. Hình này nghiêng, nhưng cạnh đối diện vẫn song song. Ghép 4 cạnh thành từng cặp đối diện.",
        explanation: "Hình vuông KLMN có hai cặp cạnh song song: KL và MN; LM và NK. Hình nghiêng thì các cặp cạnh song song vẫn như vậy.",
      },
      {
        id: "hd-2",
        kind: "trac-nghiem",
        prompt: "Trong hình, các tứ giác PEFS, EQRF, PQRS đều là hình chữ nhật. Đoạn thẳng EF song song với những cạnh nào?",
        options: ["PS và QR", "PQ và SR", "PS và SR", "PQ và QR"],
        answerIndex: 0,
        illustration: createElement(ChiaHinh),
        hint: "EF là cạnh của hình chữ nhật PEFS. Tìm cạnh đối diện EF trong hình đó, rồi làm tương tự với hình chữ nhật EQRF.",
        explanation: "Trong hình chữ nhật PEFS, cạnh đối diện EF là PS. Trong hình chữ nhật EQRF, cạnh đối diện EF là QR. Vậy EF song song với PS và QR.",
      },
      {
        id: "hd-3",
        kind: "trac-nghiem",
        prompt: "Trong hình cái thang, cặp thanh nào KHÔNG song song với nhau?",
        options: ["Hai thanh dọc hai bên thang", "Hai bậc thang liền nhau", "Một thanh dọc và một bậc thang"],
        answerIndex: 2,
        illustration: createElement(ThangTre),
        hint: "Hai thanh song song thì cùng hướng. Thanh dọc và bậc thang có cùng hướng không?",
        explanation: "Hai thanh dọc song song với nhau, ba bậc thang cũng song song với nhau. Thanh dọc và bậc thang cắt nhau tạo góc vuông, nên không song song.",
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
        prompt: "Hình ảnh nào dưới đây cho thấy hai đường thẳng song song?",
        options: ["Hai thanh ray của đường tàu hỏa", "Hai kim đồng hồ lúc 3 giờ", "Hai chân của chiếc com-pa đang mở"],
        answerIndex: 0,
        hint: "Hai đường thẳng song song không bao giờ gặp nhau, dù kéo dài.",
        explanation: "Hai thanh ray kéo dài mãi cũng không bao giờ gặp nhau. Lúc 3 giờ hai kim đồng hồ tạo góc vuông, hai chân com-pa thì tách ra từ một điểm.",
      },
      {
        id: "lt-2a",
        kind: "noi-cap",
        prompt: "Hình ABCD vẽ trên lưới ô vuông. Nối mỗi cặp đoạn thẳng với đúng mô tả.",
        pairs: [
          { left: "AB và DC", right: "Song song" },
          { left: "AD và AB", right: "Vuông góc" },
          { left: "BC và AB", right: "Cắt nhau, không vuông góc" },
        ],
        rightOrder: [1, 2, 0],
        illustration: createElement(LuoiHinhThang),
        hint: "Dựa vào ô vuông: đoạn nằm ngang so với đoạn thẳng đứng, đoạn nghiêng so với đoạn nằm ngang.",
        explanation: "AB và DC cùng nằm ngang nên song song. AD thẳng đứng, AB nằm ngang nên vuông góc. BC nghiêng nên cắt AB mà không vuông góc.",
      },
      {
        id: "lt-2b",
        kind: "trac-nghiem",
        prompt: "Trong hình ABCD ở trên, hai đoạn thẳng AD và BC có song song với nhau không?",
        options: ["Có", "Không"],
        answerIndex: 1,
        illustration: createElement(LuoiHinhThang),
        hint: "AD thẳng đứng. BC có thẳng đứng không?",
        explanation: "AD thẳng đứng còn BC nghiêng, nên kéo dài chúng sẽ cắt nhau. AD và BC không song song.",
      },
      {
        id: "lt-3",
        kind: "trac-nghiem",
        prompt: "Việt dùng que tính xếp bốn chữ cái như hình. Chữ cái nào vừa có các que xếp song song vừa có các que xếp vuông góc?",
        options: ["Chữ Z", "Chữ L", "Chữ H", "Chữ V"],
        answerIndex: 2,
        illustration: createElement(QueTinh),
        hint: "Với mỗi chữ, tìm hai que song song và hai que vuông góc. Chữ nào có cả hai?",
        explanation: "Chữ H có hai que dọc song song và que ngang vuông góc với chúng. Chữ Z chỉ có que song song, chữ L chỉ có que vuông góc, chữ V không có cặp nào.",
      },
      {
        id: "lt-4",
        kind: "trac-nghiem",
        prompt: "Nhà của Rô-bốt (màu vàng) nằm trên đường R. Nhà của Mai nằm trên một đường song song với đường R. Nhà nào là nhà của Mai?",
        options: ["Nhà A", "Nhà B", "Nhà C", "Nhà D"],
        answerIndex: 0,
        illustration: createElement(DuongPho),
        hint: "Tìm con đường cùng hướng với đường R, kéo dài hai đường không bao giờ gặp nhau.",
        explanation: "Đường nhà A cùng hướng với đường R nên song song với đường R. Đường nhà B vuông góc với R, đường nhà C và D cắt đường R.",
      },
      {
        id: "lt-5",
        kind: "noi-cap",
        prompt: "Nối mỗi hình với đúng mô tả.",
        pairs: [
          { left: "Hình 1", right: "Có cặp cạnh song song và có cặp cạnh vuông góc" },
          { left: "Hình 2", right: "Chỉ có cặp cạnh song song" },
          { left: "Hình 3", right: "Chỉ có cặp cạnh vuông góc" },
          { left: "Hình 4", right: "Không có cặp cạnh song song, không có cặp cạnh vuông góc" },
        ],
        rightOrder: [1, 2, 3, 0],
        illustration: createElement(BonHinh),
        hint: "Với từng hình, tìm cặp cạnh đối diện nhau không bao giờ gặp (song song) và cặp cạnh tạo góc vuông (vuông góc).",
        explanation:
          "Hình 1 là hình chữ nhật: cạnh đối song song, cạnh liền nhau vuông góc. Hình 2 là hình thang cân: hai đáy song song, không có góc vuông. Hình 3 là tam giác có một góc vuông, không có cạnh song song. Hình 4 không có cặp nào.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-doan",
        kind: "trac-nghiem",
        prompt: "Mai nói: “Hai đoạn thẳng không chạm nhau thì song song với nhau.” Nhìn hình, Mai nói đúng hay sai?",
        options: ["Mai đúng", "Mai sai: kéo dài hai đoạn thẳng này thì chúng cắt nhau"],
        answerIndex: 1,
        illustration: createElement(HaiDoan),
        hint: "Kéo dài AB và CD về bên phải. Chúng đang lại gần nhau hay xa nhau?",
        explanation: "Bên phải, AB và CD chụm lại gần nhau. Kéo dài đủ xa thì chúng cắt nhau, nên không song song. Muốn biết song song hay không, phải xét hai đường thẳng, không chỉ hai đoạn thẳng.",
      },
      {
        id: "sn-luc-giac",
        kind: "dien-so",
        prompt: "Thử thách (ngoài sách): Hình lục giác đều ABCDEF có tất cả bao nhiêu cặp cạnh song song?",
        parts: [{ answer: 3 }, "cặp"],
        illustration: createElement(DaGiac, { points: hexagon.points, names: hexagon.names, label: "Hình lục giác đều ABCDEF" }),
        hint: "Hình có 6 cạnh. Mỗi cạnh có một cạnh đối diện song song với nó. Ghép 6 cạnh thành từng cặp.",
        explanation: "Ba cặp cạnh song song: AB và DE; BC và EF; CD và FA. Lục giác đều có 6 cạnh, ghép thành 3 cặp đối diện.",
      },
    ],
  },
];
