import type { ChoiceQuestion, ExerciseGroup, FillQuestion, MatchQuestion, Question } from "@/components/exercises/types";
import { BonDongHo } from "@/components/math/bon-dong-ho";
import { DongHo } from "@/components/math/dong-ho";
import { createElement } from "react";
import { sauGocHai, sauGocMot } from "./_illustrations/du-lieu";
import { BanhPizza, HaiCaiKeo, NhieuGoc } from "./_illustrations/goc";
import { BanhXe, HaiDuongNhen, QuatVaBieuDo, TamGiacAH } from "./_illustrations/hinh-khac";

/** Giờ của bốn đồng hồ A, B, C, D ở câu nối đồng hồ với loại góc. */
export const gioBonDongHo = [6, 2, 9, 4];
/** Hai đồng hồ ở câu "lúc 1 giờ và lúc 11 giờ". */
export const gioHaiDongHo = [1, 11];

const hinhMot = () => createElement(NhieuGoc, { angles: sauGocMot, label: "Sáu góc đỉnh O, B, C, E, D, A. Góc đỉnh E có hai cạnh nằm trên một đường thẳng" });
const hinhHai = () => createElement(NhieuGoc, { angles: sauGocHai, label: "Sáu góc đỉnh M, P, R, N, S, U. Góc đỉnh U có hai cạnh nằm trên một đường thẳng" });
const mot = (name: string) => createElement(NhieuGoc, { angles: [{ name, rot: 20, degrees: 125 }], label: `Góc đỉnh ${name}` });

/** Khởi động đầu bài: nhớ lại góc vuông, ê ke và cách gọi tên góc, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-vuong",
    kind: "dien-so",
    parts: ["Góc vuông bằng", { answer: 90 }, "độ."],
    hint: "Nhớ lại Bài 7: ê ke có một góc vuông. Số đo góc vuông là bao nhiêu độ?",
    explanation: "Góc vuông bằng 90°.",
  },
  {
    id: "kd-dinh",
    kind: "trac-nghiem",
    prompt: "Góc đỉnh O; cạnh OA, OB. Đỉnh của góc là điểm nào?",
    options: ["Điểm O", "Điểm A", "Điểm B"],
    answerIndex: 0,
    hint: "Đỉnh là điểm chung của hai cạnh. Hai cạnh OA và OB cùng có điểm nào?",
    explanation: "Hai cạnh OA và OB cùng có điểm O, nên O là đỉnh của góc.",
  },
  {
    id: "kd-eke",
    kind: "trac-nghiem",
    prompt: "Đặt ê ke vào đỉnh một góc, hai cạnh của góc khít với hai cạnh của ê ke. Đó là góc gì?",
    options: ["Góc nhọn", "Góc vuông", "Góc tù"],
    answerIndex: 1,
    hint: "Ê ke có một góc dùng để kiểm tra góc nào?",
    explanation: "Ê ke dùng để kiểm tra góc vuông. Hai cạnh khít với ê ke thì đó là góc vuông.",
  },
];

export const quickChecks = {
  loai: {
    id: "thu-loai",
    kind: "trac-nghiem",
    prompt: "Góc đỉnh M lớn hơn góc vuông và bé hơn góc bẹt. Đó là góc gì?",
    options: ["Góc nhọn", "Góc tù", "Góc bẹt"],
    answerIndex: 1,
    illustration: mot("M"),
    hint: "Góc bé hơn góc vuông là góc nhọn. Góc lớn hơn góc vuông thì sao?",
    explanation: "Góc lớn hơn góc vuông và bé hơn góc bẹt là góc tù.",
  },
  bet: {
    id: "thu-bet",
    kind: "dien-so",
    parts: ["Một góc bẹt bằng", { answer: 2 }, "góc vuông."],
    hint: "Đặt hai ê ke cạnh nhau như hình trên. Hai góc vuông ghép lại thành góc gì?",
    explanation: "Hai góc vuông ghép lại có hai cạnh nằm trên một đường thẳng, đó là góc bẹt. Vậy góc bẹt bằng hai góc vuông.",
  },
  dongHo: {
    id: "thu-dong-ho",
    kind: "trac-nghiem",
    prompt: "Lúc 5 giờ, kim giờ và kim phút tạo thành góc gì?",
    options: ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
    answerIndex: 2,
    illustration: createElement(DongHo, { hour: 5 }),
    hint: "Lúc 3 giờ là góc vuông, lúc 6 giờ là góc bẹt. Lúc 5 giờ ở giữa hai lúc đó.",
    explanation: "Lúc 5 giờ góc giữa hai kim lớn hơn góc vuông (lúc 3 giờ) và bé hơn góc bẹt (lúc 6 giờ), nên là góc tù.",
  },
} satisfies Record<string, Question>;

const chon = (id: string, prompt: string, options: string[], answerIndex: number, hint: string, explanation: string, illustration?: FillQuestion["illustration"]): ChoiceQuestion => ({
  id,
  kind: "trac-nghiem",
  prompt,
  options,
  answerIndex,
  hint,
  explanation,
  illustration,
});

const noiLoaiGoc = (id: string, prompt: string, trai: string[], phai: string[], rightOrder: number[], hint: string, explanation: string, illustration: MatchQuestion["illustration"]): MatchQuestion => ({
  id,
  kind: "noi-cap",
  prompt,
  pairs: trai.map((left, index) => ({ left, right: phai[index] })),
  rightOrder,
  hint,
  explanation,
  illustration,
});

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Hoạt động: góc nhọn, góc tù, góc bẹt",
    questions: [
      {
        id: "goc-dem-mot",
        kind: "dien-so",
        prompt: "Đếm các góc trong hình dưới đây.",
        parts: ["Có", { answer: 3 }, "góc nhọn,", { answer: 1 }, "góc vuông,", { answer: 1 }, "góc tù,", { answer: 1 }, "góc bẹt."],
        illustration: hinhMot(),
        hint: "Đặt ê ke vào từng đỉnh. Góc nào khít với ê ke là góc vuông; hẹp hơn là góc nhọn; rộng hơn là góc tù. Góc có hai cạnh thẳng hàng là góc bẹt.",
        explanation: "Góc đỉnh O, D, A hẹp hơn góc vuông: 3 góc nhọn. Góc đỉnh C khít với ê ke: 1 góc vuông. Góc đỉnh B rộng hơn góc vuông: 1 góc tù. Góc đỉnh E có hai cạnh thẳng hàng: 1 góc bẹt.",
      },
      chon(
        "goc-tu-mot",
        "Trong hình sáu góc ở câu trên, góc đỉnh nào là góc tù?",
        ["Góc đỉnh O", "Góc đỉnh B", "Góc đỉnh C", "Góc đỉnh E"],
        1,
        "Góc tù lớn hơn góc vuông nhưng chưa thẳng hàng như góc bẹt.",
        "Góc đỉnh B rộng hơn góc vuông và hai cạnh chưa thẳng hàng, nên là góc tù. Góc đỉnh O hẹp (góc nhọn), góc đỉnh C là góc vuông, góc đỉnh E là góc bẹt.",
        hinhMot(),
      ),
      chon(
        "keo-tu",
        "Hình cái kéo nào có hai lưỡi kéo tạo thành góc tù?",
        ["Kéo xanh", "Kéo đỏ"],
        1,
        "Nhìn hai lưỡi kéo như hai cạnh của góc. Kéo nào mở rộng hơn góc vuông?",
        "Hai lưỡi của kéo đỏ mở rộng hơn góc vuông, tạo thành góc tù. Hai lưỡi của kéo xanh khép hẹp, tạo thành góc nhọn.",
        createElement(HaiCaiKeo),
      ),
      chon(
        "keo-nhon",
        "Hình cái kéo nào có hai lưỡi kéo tạo thành góc nhọn?",
        ["Kéo xanh", "Kéo đỏ"],
        0,
        "Góc nhọn bé hơn góc vuông, nên hai lưỡi kéo mở hẹp.",
        "Hai lưỡi của kéo xanh mở hẹp hơn góc vuông, tạo thành góc nhọn.",
        createElement(HaiCaiKeo),
      ),
      chon(
        "pizza",
        "An chọn một trong ba miếng bánh. Miếng An chọn không phải là miếng bé nhất, và góc đỉnh O ở miếng đó không là góc bẹt. An đã chọn miếng nào?",
        ["Miếng 1", "Miếng 2", "Miếng 3"],
        1,
        "Tìm miếng có góc đỉnh O là góc bẹt, rồi tìm miếng bé nhất, và loại cả hai.",
        "Miếng 3 có góc đỉnh O là góc bẹt (C, O, B thẳng hàng), loại. Miếng 1 có góc đỉnh O bé hơn góc vuông, là miếng bé nhất, loại. Còn lại miếng 2, góc đỉnh O là góc tù.",
        createElement(BanhPizza),
      ),
    ],
  },
  {
    id: "luyen-tap-goc",
    title: "Luyện tập 1: xếp loại góc",
    questions: [
      chon(
        "goc-chon-tu",
        "Những góc nào dưới đây là góc tù?",
        ["Góc đỉnh M và góc đỉnh S", "Góc đỉnh P và góc đỉnh R", "Góc đỉnh N và góc đỉnh U", "Góc đỉnh S và góc đỉnh R"],
        0,
        "Góc tù rộng hơn góc vuông. Dùng ê ke thử từng góc.",
        "Góc đỉnh M và góc đỉnh S đều rộng hơn góc vuông và chưa thẳng hàng: góc tù. Góc đỉnh P và R là góc nhọn, N là góc vuông, U là góc bẹt.",
        hinhHai(),
      ),
      noiLoaiGoc(
        "goc-noi",
        "Nối mỗi góc với loại góc của nó.",
        ["Góc đỉnh N", "Góc đỉnh U", "Góc đỉnh P", "Góc đỉnh S"],
        ["Góc vuông", "Góc bẹt", "Góc nhọn", "Góc tù"],
        [1, 0, 3, 2],
        "Góc đỉnh N khít với ê ke. Góc đỉnh U có hai cạnh thẳng hàng. Góc đỉnh P hẹp hơn ê ke, góc đỉnh S rộng hơn ê ke.",
        "Góc đỉnh N là góc vuông, góc đỉnh U là góc bẹt, góc đỉnh P là góc nhọn, góc đỉnh S là góc tù.",
        hinhHai(),
      ),
    ],
  },
  {
    id: "luyen-tap-dong-ho",
    title: "Luyện tập 2: con nhện, đồng hồ, bánh xe",
    questions: [
      chon(
        "nhen",
        "Con nhện bò theo một trong hai đường đi để về tổ. Đường đi nào có ít nhất một góc tù?",
        ["Đường đỏ", "Đường xanh"],
        1,
        "Nhìn từng chỗ gấp khúc. Chỗ nào mở rộng hơn góc vuông thì đó là góc tù.",
        "Đường xanh có một chỗ gấp khúc mở rộng hơn góc vuông, đó là góc tù. Đường đỏ chỉ có các chỗ gấp là góc vuông và góc nhọn.",
        createElement(HaiDuongNhen),
      ),
      noiLoaiGoc(
        "dong-ho-noi",
        "Nối mỗi đồng hồ với loại góc mà kim giờ và kim phút tạo thành.",
        ["Đồng hồ A", "Đồng hồ B", "Đồng hồ C", "Đồng hồ D"],
        ["Góc bẹt", "Góc nhọn", "Góc vuông", "Góc tù"],
        [1, 0, 3, 2],
        "Nhớ lại: 3 giờ hoặc 9 giờ là góc vuông, 6 giờ là góc bẹt. Gần số 12 hơn thì hẹp, gần số 6 hơn thì rộng.",
        "Đồng hồ A (6 giờ): hai kim thẳng hàng, góc bẹt. Đồng hồ B (2 giờ): góc nhọn. Đồng hồ C (9 giờ): góc vuông. Đồng hồ D (4 giờ): góc tù.",
        createElement(BonDongHo, { hours: gioBonDongHo }),
      ),
      chon(
        "dong-ho-vuong",
        "Lúc 9 giờ, hai kim đồng hồ tạo thành góc vuông. Trong các lúc dưới đây, lúc nào hai kim cũng tạo thành góc vuông?",
        ["3 giờ", "4 giờ", "7 giờ", "10 giờ"],
        0,
        "Góc vuông ở bên trái đồng hồ (9 giờ) thì cũng có góc vuông ở bên phải đồng hồ.",
        "Lúc 3 giờ, kim phút chỉ số 12 và kim giờ chỉ số 3, hai kim tạo góc vuông. Lúc 4 giờ là góc tù, lúc 7 giờ là góc tù, lúc 10 giờ là góc nhọn.",
        createElement(DongHo, { hour: 9 }),
      ),
      chon(
        "banh-xe",
        "Con mọt gỗ đang gặm một trong hai nan xe màu đỏ. Biết nan đó và một nan xe màu xanh tạo thành một góc tù. Con mọt gặm nan nào?",
        ["Nan A", "Nan B"],
        1,
        "Thử từng nan đỏ với hai nan xanh. Nan nào tạo với một nan xanh góc rộng hơn góc vuông?",
        "Nan A với hai nan xanh tạo góc nhọn và góc vuông. Nan B với nan xanh chỉ lên trên tạo góc tù. Vậy mọt gặm nan B.",
        createElement(BanhXe),
      ),
    ],
  },
  {
    id: "luyen-tap-quat",
    title: "Luyện tập 3: chiếc quạt, hình tam giác",
    questions: [
      chon(
        "quat",
        "Mỗi chiếc quạt xòe ra tạo thành một góc. Bạn Nga đếm số góc nhọn, góc vuông, góc tù, góc bẹt rồi vẽ biểu đồ. Bạn ấy bị nhầm một cột. Đó là cột nào?",
        ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
        1,
        "Đếm tổng số chiếc quạt và so với tổng số chấm. Rồi đếm lại từng loại.",
        "Có 9 chiếc quạt: 3 góc nhọn, 1 góc vuông, 3 góc tù, 2 góc bẹt. Biểu đồ vẽ 2 chấm ở cột góc vuông, nhưng chỉ có 1 chiếc quạt là góc vuông.",
        createElement(QuatVaBieuDo),
      ),
      {
        id: "tam-giac",
        kind: "dien-so",
        parts: ["Hình bên có", { answer: 4 }, "góc nhọn,", { answer: 2 }, "góc vuông,", { answer: 1 }, "góc tù."],
        illustration: createElement(TamGiacAH),
        hint: "Dùng ê ke kiểm tra. Đếm các góc đỉnh A (có ba góc), đỉnh B, đỉnh C và đỉnh H. Đỉnh H có hai góc vuông.",
        explanation:
          "Góc nhọn: góc đỉnh B, góc đỉnh C, góc BAH, góc HAC (4 góc). Góc vuông: góc AHB, góc AHC (2 góc). Góc tù: góc BAC (1 góc). Điểm H nằm trên cạnh BC nên không đếm góc bẹt.",
      },
    ],
  },
  {
    id: "suy-nghi-them",
    title: "Suy nghĩ thêm",
    questions: [
      chon(
        "sn-loi-sai",
        "Nam nói: “Góc nào bé hơn góc bẹt cũng là góc nhọn.” Nam nói thế nào?",
        ["Đúng", "Sai, vì góc vuông và góc tù cũng bé hơn góc bẹt", "Sai, vì góc bẹt cũng là góc nhọn"],
        1,
        "Góc vuông có bé hơn góc bẹt không? Góc vuông có phải góc nhọn không?",
        "Góc vuông bằng một nửa góc bẹt, góc tù cũng bé hơn góc bẹt, nhưng chúng không phải góc nhọn. Góc nhọn phải bé hơn góc vuông.",
      ),
      chon(
        "sn-mot-va-muoi-mot",
        "Lúc 1 giờ và lúc 11 giờ, kim giờ và kim phút của đồng hồ tạo thành hai góc. Hai góc đó thế nào?",
        ["Cùng là góc nhọn", "Một góc nhọn, một góc tù", "Cùng là góc tù"],
        0,
        "Lúc 1 giờ kim giờ chỉ số 1, lúc 11 giờ kim giờ chỉ số 11. Số 1 và số 11 cách số 12 như thế nào?",
        "Số 1 và số 11 cùng cách số 12 một khoảng, nằm hai bên số 12. Nên hai góc giống nhau, cùng bé hơn góc vuông: cùng là góc nhọn.",
        createElement(BonDongHo, { hours: gioHaiDongHo }),
      ),
      chon(
        "sn-mot-loai",
        "Có góc nào vừa là góc nhọn, vừa là góc tù không?",
        ["Không, mỗi góc chỉ thuộc một loại", "Có, góc bé hơn góc bẹt", "Có, góc lớn hơn góc nhọn"],
        0,
        "Góc nhọn bé hơn góc vuông. Góc tù lớn hơn góc vuông. Một góc có thể vừa bé hơn vừa lớn hơn góc vuông không?",
        "Góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông. Không góc nào vừa bé hơn vừa lớn hơn góc vuông, nên mỗi góc chỉ thuộc một loại.",
      ),
    ],
  },
];
