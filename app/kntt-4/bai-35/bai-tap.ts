import type { ChoiceQuestion, ExerciseGroup, Question } from "@/components/exercises/types";
import { DaGiac } from "@/components/math/da-giac";
import { DongHo } from "@/components/math/dong-ho";
import { createElement } from "react";
import { BonDongHo } from "./_illustrations/bon-dong-ho";
import { BinhHanhCanh, BonHinh, ChuNhatMN, DaGiacGoc, DaiHinhThoi, HaiGocLuoi, NhaMaiTu, ThoiCanh } from "./_illustrations/hinh";
import { dieu, hinhChonBinhHanh, hinhChonSongVuong, hinhThang, tuGiac } from "./_illustrations/hinh-hoc";
import { QueTamGiac } from "./_illustrations/que-tam-giac";

/** Số giờ của bốn đồng hồ A, B, C, D ở câu "góc tù". */
export const gioDongHo = [2, 5, 9, 6];

const tuGiacHinh = () => createElement(DaGiac, { points: tuGiac.points, names: tuGiac.names, label: "Tứ giác EFGH" });
const thangHinh = () =>
  createElement(DaGiacGoc, { points: hinhThang.points, names: hinhThang.names, angleLabels: { 3: "45°" }, label: "Hình thang cân MNPQ, góc đỉnh Q đo được 45 độ" });
const dieuHinh = () => createElement(DaGiac, { points: dieu.points, names: dieu.names, marks: true, label: "Tứ giác ABCD có góc đỉnh A và góc đỉnh C là góc vuông" });
const queHinh = () => createElement(QueTamGiac);
const dungSai = (id: string, prompt: string, answer: boolean, hint: string, explanation: string): ChoiceQuestion => ({
  id,
  kind: "trac-nghiem",
  prompt,
  options: ["Đúng", "Sai"],
  answerIndex: answer ? 0 : 1,
  hint,
  explanation,
});

/** Khởi động đầu bài: nhắc lại góc và hình thoi, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-bet",
    kind: "dien-so",
    parts: ["Góc bẹt bằng", { answer: 180 }, "độ."],
    hint: "Nhớ lại Bài 8: hai cạnh của góc bẹt nằm trên một đường thẳng.",
    explanation: "Góc bẹt bằng 180°, gấp đôi góc vuông (90°).",
  },
  {
    id: "kd-tu",
    kind: "trac-nghiem",
    prompt: "Góc lớn hơn góc vuông và nhỏ hơn góc bẹt là góc gì?",
    options: ["Góc nhọn", "Góc tù", "Góc bẹt"],
    answerIndex: 1,
    hint: "Góc vuông là 90°, góc bẹt là 180°. Góc ở giữa hai số đó là góc nào?",
    explanation: "Góc lớn hơn 90° và nhỏ hơn 180° là góc tù.",
  },
  {
    id: "kd-thoi",
    kind: "dien-so",
    parts: ["Hình thoi có", { answer: 4 }, "cạnh bằng nhau."],
    hint: "Nhớ lại Bài 31: hình thoi có hai cặp cạnh đối diện song song.",
    explanation: "Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.",
  },
];

export const quickChecks = {
  goc: {
    id: "thu-goc",
    kind: "trac-nghiem",
    prompt: "Lúc 8 giờ, hai kim đồng hồ tạo thành góc gì?",
    options: ["Góc nhọn", "Góc vuông", "Góc tù"],
    answerIndex: 2,
    illustration: createElement(DongHo, { hour: 8 }),
    hint: "Mỗi số giờ cách nhau 30°. Từ số 12 đến số 8 là bao nhiêu độ?",
    explanation: "Từ số 12 đến số 8 là 8 × 30° = 240°, nên góc nhỏ giữa hai kim là 360° − 240° = 120°. Góc 120° lớn hơn 90°, nhỏ hơn 180°, nên là góc tù.",
  },
  vuongGoc: {
    id: "thu-vuong-goc",
    kind: "dien-so",
    parts: ["Hai đường thẳng vuông góc với nhau cắt nhau tạo thành", { answer: 4 }, "góc vuông."],
    hint: "Hai đường thẳng cắt nhau chia mặt phẳng thành bốn góc.",
    explanation: "Hai đường thẳng vuông góc cắt nhau tạo thành bốn góc vuông.",
  },
  songSong: {
    id: "thu-song-song",
    kind: "trac-nghiem",
    prompt: "Hai đường thẳng song song có thể cắt nhau không?",
    options: ["Không, kéo dài mãi cũng không bao giờ cắt nhau", "Có, nếu kéo dài đủ xa", "Có, nếu hai đường dài bằng nhau"],
    answerIndex: 0,
    hint: "Nhớ hai thanh ray của đường tàu.",
    explanation: "Hai đường thẳng song song kéo dài mãi cũng không bao giờ cắt nhau.",
  },
  hinh: {
    id: "thu-hinh",
    kind: "trac-nghiem",
    prompt: "Hình nào có hai cặp cạnh đối diện song song và cả bốn cạnh bằng nhau?",
    options: ["Hình bình hành", "Hình thoi", "Hình thang"],
    answerIndex: 1,
    hint: "Hình bình hành chỉ cần các cạnh đối diện bằng nhau.",
    explanation: "Hình thoi có hai cặp cạnh đối diện song song và cả bốn cạnh bằng nhau.",
  },
} satisfies Record<string, Question>;

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "goc",
    title: "Góc (Bài 7, 8, 9)",
    questions: [
      {
        id: "dong-ho-tu",
        kind: "trac-nghiem",
        prompt: "Hai kim của đồng hồ nào dưới đây tạo thành góc tù?",
        options: ["Đồng hồ A", "Đồng hồ B", "Đồng hồ C", "Đồng hồ D"],
        answerIndex: 1,
        illustration: createElement(BonDongHo, { hours: gioDongHo }),
        hint: "Góc tù lớn hơn góc vuông (3 giờ hoặc 9 giờ) và nhỏ hơn góc bẹt (6 giờ).",
        explanation:
          "Đồng hồ B chỉ 5 giờ: hai kim tạo góc 150°, lớn hơn góc vuông, nhỏ hơn góc bẹt nên là góc tù. Đồng hồ A (2 giờ) tạo góc nhọn, đồng hồ C (9 giờ) tạo góc vuông, đồng hồ D (6 giờ) tạo góc bẹt.",
      },
      {
        id: "tg-dem",
        kind: "dien-so",
        prompt: "Đếm các góc của tứ giác EFGH.",
        parts: ["Tứ giác có", { answer: 2 }, "góc nhọn,", { answer: 1 }, "góc vuông,", { answer: 1 }, "góc tù."],
        illustration: tuGiacHinh(),
        hint: "Đặt ê ke vào từng đỉnh. Góc nào khít với góc ê ke là góc vuông; nhỏ hơn là góc nhọn; lớn hơn là góc tù.",
        explanation: "Góc đỉnh H vuông. Góc đỉnh E và góc đỉnh F nhỏ hơn góc vuông, là góc nhọn. Góc đỉnh G lớn hơn góc vuông, là góc tù. Vậy: 2 góc nhọn, 1 góc vuông, 1 góc tù.",
      },
      {
        id: "tg-goc-tu",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh nào của tứ giác EFGH là góc tù?",
        options: ["Góc đỉnh E", "Góc đỉnh F", "Góc đỉnh G", "Góc đỉnh H"],
        answerIndex: 2,
        illustration: tuGiacHinh(),
        hint: "Góc tù mở rộng hơn góc ê ke.",
        explanation: "Góc đỉnh G mở rộng hơn góc vuông, nhưng chưa thẳng như góc bẹt, nên là góc tù.",
      },
      {
        id: "thang-cap-bang",
        kind: "trac-nghiem",
        prompt: "Cặp góc nào của hình thang MNPQ có số đo bằng nhau?",
        options: ["Góc đỉnh M và góc đỉnh N", "Góc đỉnh M và góc đỉnh Q", "Góc đỉnh N và góc đỉnh Q", "Góc đỉnh M và góc đỉnh P"],
        answerIndex: 0,
        illustration: thangHinh(),
        hint: "Hình thang này giống nhau hai bên, như khi gấp đôi. Góc M ở bên trái đối xứng với góc nào bên phải?",
        explanation: "Gấp đôi hình thang theo đường thẳng đứng, góc M trùng với góc N, góc Q trùng với góc P. Vậy góc M bằng góc N (cùng là góc tù 135°). Em có thể dùng thước đo góc để kiểm tra.",
      },
      {
        id: "thang-goc-p",
        kind: "dien-so",
        prompt: "Hình thang MNPQ có góc đỉnh Q đo được 45°.",
        parts: ["Góc đỉnh P cũng đo được", { answer: 45 }, "độ."],
        illustration: thangHinh(),
        hint: "Góc Q và góc P là một cặp góc bằng nhau của hình thang.",
        explanation: "Góc đỉnh P bằng góc đỉnh Q nên cũng là 45°.",
      },
      {
        id: "nha-goc",
        kind: "dien-so",
        prompt: "Ngôi nhà gồm một hình tam giác (mái) và một hình vuông (thân). Đếm góc của từng hình, mỗi góc đếm một lần.",
        parts: ["Hình có", { answer: 2 }, "góc nhọn,", { answer: 4 }, "góc vuông,", { answer: 1 }, "góc tù."],
        illustration: createElement(NhaMaiTu),
        hint: "Hình vuông có mấy góc vuông? Tam giác mái có hai góc ở đáy nhọn và một góc ở đỉnh mở rộng.",
        explanation: "Hình vuông có 4 góc vuông. Tam giác mái có hai góc ở đáy là góc nhọn và một góc ở đỉnh là góc tù. Vậy: 2 góc nhọn, 4 góc vuông, 1 góc tù.",
      },
      {
        id: "goc-luoi",
        kind: "trac-nghiem",
        prompt: "Hình bên có hai góc. Góc nào là góc tù?",
        options: ["Góc đỉnh O", "Góc đỉnh P"],
        answerIndex: 1,
        illustration: createElement(HaiGocLuoi),
        hint: "Góc đỉnh O mở ít hơn hay nhiều hơn góc vuông? Hai cạnh của góc vuông đi 4 ô sang phải và 4 ô lên.",
        explanation: "Góc đỉnh O có một cạnh nằm ngang và cạnh kia đi lên nghiêng về bên phải, nên mở hẹp hơn góc vuông: góc nhọn. Góc đỉnh P có cạnh kia nghiêng về bên trái, mở rộng hơn góc vuông: góc tù.",
      },
    ],
  },
  {
    id: "song-song-vuong-goc",
    title: "Vuông góc, song song (Bài 27–30)",
    questions: [
      {
        id: "dieu-dem",
        kind: "dien-so",
        prompt: "Tứ giác ABCD có góc đỉnh A và góc đỉnh C là góc vuông. Chỉ xét các cặp cạnh liền nhau, cắt nhau tại một đỉnh.",
        parts: ["Có", { answer: 2 }, "cặp cạnh vuông góc với nhau và", { answer: 2 }, "cặp cạnh cắt nhau mà không vuông góc."],
        illustration: dieuHinh(),
        hint: "Mỗi đỉnh của tứ giác có một cặp cạnh gặp nhau. Đỉnh nào có góc vuông thì cặp cạnh đó vuông góc.",
        explanation: "Tứ giác có 4 đỉnh nên có 4 cặp cạnh liền nhau. Tại A và C góc vuông, nên AB vuông góc AD và CB vuông góc CD: 2 cặp. Tại B và D góc không vuông, nên AB và BC, CD và DA cắt nhau mà không vuông góc: 2 cặp.",
      },
      {
        id: "dieu-vg",
        kind: "trac-nghiem",
        prompt: "Trong tứ giác ABCD, cặp cạnh nào vuông góc với nhau?",
        options: ["AB và AD", "AB và BC", "CD và DA", "BC và AD"],
        answerIndex: 0,
        illustration: dieuHinh(),
        hint: "Tìm đỉnh có dấu góc vuông, rồi xem hai cạnh nào gặp nhau ở đỉnh đó.",
        explanation: "Góc đỉnh A là góc vuông, mà A là chỗ hai cạnh AB và AD gặp nhau. Vậy AB vuông góc với AD. Ba cặp còn lại không tạo thành góc vuông.",
      },
      {
        id: "cn-song-song",
        kind: "trac-nghiem",
        prompt: "Đoạn thẳng MN (M trên cạnh AB, N trên cạnh CD) song song với cạnh nào của hình chữ nhật ABCD?",
        options: ["AB", "AD", "CD"],
        answerIndex: 1,
        illustration: createElement(ChuNhatMN),
        hint: "MN nằm ngang. Cạnh nào cũng nằm ngang?",
        explanation: "MN và AD cùng nằm ngang, kéo dài mãi không cắt nhau, nên MN song song với AD. AB và CD thẳng đứng, cắt MN.",
      },
      dungSai(
        "cn-vuong-goc",
        "Đúng hay sai? Đoạn thẳng MN vuông góc với cạnh CD.",
        true,
        "Đặt ê ke vào chỗ N: một cạnh ê ke theo CD, cạnh kia theo NM.",
        "MN nằm ngang, CD thẳng đứng. Hai đường này cắt nhau tạo góc vuông, nên MN vuông góc với CD.",
      ),
      {
        id: "que-thoi-dem",
        kind: "trac-nghiem",
        prompt: "Hình bên xếp từ các que tính. Trong hình có bao nhiêu hình thoi?",
        options: ["1", "2", "3", "4"],
        answerIndex: 2,
        illustration: queHinh(),
        hint: "Hình thoi gồm hai hình tam giác nhỏ ghép lại và có bốn cạnh bằng nhau. Tam giác nhỏ ở giữa ghép được với mấy tam giác khác?",
        explanation: "Hình có 4 tam giác nhỏ. Tam giác ở giữa chung một que với tam giác trên, tam giác trái và tam giác phải. Mỗi cặp ghép thành một hình thoi, vậy có 3 hình thoi.",
      },
      {
        id: "que-do-song-song",
        kind: "trac-nghiem",
        prompt: "Que tính màu đỏ được xếp song song với que tính màu nào dưới đây?",
        options: ["Màu nâu", "Màu xanh", "Màu tím", "Màu da cam"],
        answerIndex: 1,
        illustration: queHinh(),
        hint: "Que đỏ nằm ngang. Tìm que cũng nằm ngang.",
        explanation: "Que đỏ và que xanh cùng nằm ngang, kéo dài mãi không cắt nhau, nên song song. Que nâu, que tím và que da cam đều nghiêng.",
      },
      {
        id: "que-do-nhieu",
        kind: "dien-so",
        prompt: "Không kể que đỏ:",
        parts: ["Có", { answer: 2 }, "que tính khác song song với que đỏ."],
        illustration: queHinh(),
        hint: "Đếm các que nằm ngang trong hình, trừ que đỏ.",
        explanation: "Ngoài que đỏ, còn que xanh và một que đen ở đáy cũng nằm ngang. Vậy có 2 que khác song song với que đỏ.",
      },
    ],
  },
  {
    id: "binh-hanh-thoi",
    title: "Hình bình hành, hình thoi (Bài 31)",
    questions: [
      {
        id: "bbh-chon",
        kind: "trac-nghiem",
        prompt: "Hình nào dưới đây là hình bình hành?",
        options: ["Hình A", "Hình B", "Hình C", "Hình D"],
        answerIndex: 2,
        illustration: createElement(BonHinh, {
          shapes: hinhChonBinhHanh,
          color: "var(--unit-dm2-soft)",
          label: "Bốn hình A, B, C, D: hình thang cân, hình thang vuông, hình bình hành, hình thang cân úp ngược",
        }),
        hint: "Hình bình hành có hai cặp cạnh đối diện song song.",
        explanation: "Hình C có cạnh trên song song cạnh dưới và hai cạnh bên cũng song song. Hình A và D chỉ có một cặp cạnh song song; hình B có hai cạnh bên song song nhưng cạnh trên không song song cạnh dưới.",
      },
      {
        id: "ss-vg-chon",
        kind: "trac-nghiem",
        prompt: "Hình nào dưới đây vừa có cặp cạnh song song, vừa có cặp cạnh vuông góc?",
        options: ["Hình A", "Hình B", "Hình C", "Hình D"],
        answerIndex: 3,
        illustration: createElement(BonHinh, {
          shapes: hinhChonSongVuong,
          color: "var(--unit-mm2-soft)",
          label: "Bốn hình A, B, C, D: hình bình hành, hình thang cân, tứ giác thường, hình thang vuông",
        }),
        hint: "Dùng ê ke tìm góc vuông, rồi tìm cặp cạnh không bao giờ cắt nhau.",
        explanation: "Hình D có hai cạnh bên thẳng đứng song song và có góc vuông ở hai đỉnh dưới. Hình A và B có cạnh song song nhưng không có góc vuông; hình C không có cặp cạnh song song hay vuông góc nào.",
      },
      {
        id: "canh-bbh",
        kind: "dien-so",
        prompt: "Cho hình bình hành ABCD có AB = 7 cm, AD = 4 cm.",
        parts: ["BC =", { answer: 4 }, "cm; DC =", { answer: 7 }, "cm."],
        illustration: createElement(BinhHanhCanh),
        hint: "Hình bình hành có các cạnh đối diện bằng nhau. BC đối diện với cạnh nào?",
        explanation: "BC đối diện AD nên BC = 4 cm. DC đối diện AB nên DC = 7 cm.",
      },
      {
        id: "canh-thoi",
        kind: "dien-so",
        prompt: "Cho hình thoi MNPQ có NM = 6 cm.",
        parts: ["NP =", { answer: 6 }, "cm; PQ =", { answer: 6 }, "cm; QM =", { answer: 6 }, "cm."],
        illustration: createElement(ThoiCanh),
        hint: "Hình thoi có bốn cạnh bằng nhau.",
        explanation: "Hình thoi có bốn cạnh bằng nhau, nên NP = PQ = QM = NM = 6 cm.",
      },
      {
        id: "thoi-dai",
        kind: "dien-so",
        prompt: "Dải hình dưới đây gồm ba hình thoi nối liền nhau.",
        parts: ["Mỗi hình thoi có", { answer: 4 }, "cạnh bằng nhau và", { answer: 2 }, "cặp cạnh đối diện song song."],
        illustration: createElement(DaiHinhThoi),
        hint: "Nhìn một hình thoi: có mấy cạnh? Các cạnh đối diện thì sao?",
        explanation: "Mỗi hình thoi có 4 cạnh bằng nhau. Cạnh trên bên trái song song cạnh dưới bên phải, cạnh trên bên phải song song cạnh dưới bên trái: 2 cặp cạnh đối diện song song.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      dungSai(
        "sn-loi-sai",
        "Bình nói: “Góc nào nhỏ hơn góc bẹt thì là góc nhọn.” Bình nói đúng hay sai?",
        false,
        "Góc tù có nhỏ hơn góc bẹt không? Góc vuông thì sao?",
        "Bình sai. Góc tù (như 130°) và góc vuông (90°) đều nhỏ hơn góc bẹt (180°) nhưng không phải góc nhọn. Góc nhọn phải nhỏ hơn góc vuông.",
      ),
      {
        id: "sn-thoi-bbh",
        kind: "trac-nghiem",
        prompt: "Hình thoi có phải là hình bình hành không?",
        options: [
          "Có, vì hình thoi cũng có hai cặp cạnh đối diện song song",
          "Không, vì hình thoi có bốn cạnh bằng nhau",
          "Không, vì hình thoi không có cạnh song song",
        ],
        answerIndex: 0,
        hint: "Hình bình hành cần gì? Hình thoi có đủ điều đó không?",
        explanation: "Hình thoi có hai cặp cạnh đối diện song song, nên cũng là hình bình hành. Hình thoi còn có thêm điều kiện đặc biệt: bốn cạnh bằng nhau.",
      },
    ],
  },
];
