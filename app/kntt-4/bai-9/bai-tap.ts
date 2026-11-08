import type { ChoiceQuestion, ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { angleBetweenHands, DongHo } from "@/components/math/dong-ho";
import { GocGhiSo } from "@/components/math/goc-ghi-so";
import { ThuocDo, type Base } from "@/components/math/thuoc-do";
import { angleKind, type AngleKind, type Point } from "@/lib/hinh";
import { createElement } from "react";
import { ChonHinh } from "./_illustrations/chon-hinh";
import { TamGiacDiem } from "./_illustrations/tam-giac-diem";

/** Thước đo góc đặt sẵn: số đo, cạnh nằm trên đường kính ở bên nào, tên đỉnh và hai cạnh. */
export type ReadingSpec = { angle: number; base: Base; vertex: string; arm: string; baseName: string };

export const readingSpecs = {
  "do-1": { angle: 80, base: "right", vertex: "K", arm: "G", baseName: "P" },
  "do-2": { angle: 110, base: "left", vertex: "E", arm: "C", baseName: "D" },
  "do-3": { angle: 160, base: "right", vertex: "O", arm: "A", baseName: "B" },
  "do-4": { angle: 180, base: "right", vertex: "I", arm: "M", baseName: "N" },
  "qc-do": { angle: 70, base: "right", vertex: "O", arm: "A", baseName: "B" },
  "qc-vong": { angle: 120, base: "left", vertex: "O", arm: "A", baseName: "B" },
  "sn-loi": { angle: 70, base: "left", vertex: "O", arm: "A", baseName: "B" },
} satisfies Record<string, ReadingSpec>;

type ReadingId = keyof typeof readingSpecs;

const names = (spec: ReadingSpec) => ({ vertex: spec.vertex, arm: spec.arm, base: spec.baseName });

function angleName(spec: ReadingSpec) {
  return `Góc đỉnh ${spec.vertex}; cạnh ${spec.vertex}${spec.arm}, ${spec.vertex}${spec.baseName}`;
}

/** Câu đọc số đo trên thước đặt sẵn. */
function reading(id: ReadingId): FillQuestion {
  const spec: ReadingSpec = readingSpecs[id];
  const side = spec.base === "right" ? "bên phải" : "bên trái";
  const ring = spec.base === "right" ? "xanh" : "vàng";
  return {
    id,
    kind: "dien-so",
    prompt: "Quan sát thước đo góc rồi nêu số đo góc.",
    parts: [`${angleName(spec)} bằng`, { answer: spec.angle }, "°"],
    illustration: createElement(ThuocDo, { angle: spec.angle, base: spec.base, names: names(spec) }),
    hint: `Cạnh ${spec.vertex}${spec.baseName} nằm ${side} của thước, sát vạch 0 của vòng số ${ring}. Đọc số ở vòng ${ring}, chỗ cạnh còn lại đi qua.`,
    explanation: `Cạnh ${spec.vertex}${spec.baseName} nằm ${side}, nên ta đọc vòng số ${ring}. Cạnh còn lại đi qua vạch ${spec.angle}. Vậy số đo góc là ${spec.angle}°.`,
  };
}

export const kindOptions = ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"] as const;
const kindOf: Record<AngleKind, number> = { nhọn: 0, vuông: 1, tù: 2, bẹt: 3 };
const kindName = (kind: AngleKind) => kindOptions[kindOf[kind]].toLowerCase();

/** Câu phân loại góc theo số đo cho trước. */
function classify(id: string, vertex: string, degrees: number, hint: string): ChoiceQuestion {
  const kind = angleKind(degrees);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Góc đỉnh ${vertex} có số đo ${degrees}°. Đó là góc gì?`,
    options: [...kindOptions],
    answerIndex: kindOf[kind],
    hint,
    explanation: `Góc ${degrees}° là ${kindName(kind)}. ${
      kind === "nhọn" ? "Nhọn là bé hơn 90°." : kind === "vuông" ? "Vuông là bằng 90°." : kind === "tù" ? "Tù là lớn hơn 90° và bé hơn 180°." : "Bẹt là bằng 180°."
    }`,
  };
}

/** Hình thang vuông SGLD: S = 90°, G = 110°, L = 70°, D = 90° (tổng 360°). Tọa độ y hướng xuống. */
export const trapezoid = {
  names: ["S", "G", "L", "D"],
  points: [
    { x: 0, y: 0 },
    { x: 90, y: 0 },
    { x: 119.1, y: 80 },
    { x: 0, y: 80 },
  ] as Point[],
  angles: [90, 110, 70, 90],
  labels: ["90°", "110°", "70°", "90°"],
};

const trapezoidFigure = () => createElement(GocGhiSo, { points: trapezoid.points, names: trapezoid.names, labels: trapezoid.labels, label: "Hình SGLD, góc đỉnh S ghi 90°, đỉnh G ghi 110°, đỉnh L ghi 70°, đỉnh D ghi 90°" });

/** Các giờ ở câu đồng hồ. */
export const clockHours = [3, 6, 11, 8];

function clock(id: string, hour: number): ChoiceQuestion {
  const degrees = angleBetweenHands(hour);
  const kind = angleKind(degrees);
  return {
    id,
    kind: "trac-nghiem",
    prompt: `Đồng hồ chỉ ${hour} giờ. Góc tạo bởi hai kim đồng hồ là góc gì?`,
    options: [...kindOptions],
    answerIndex: kindOf[kind],
    illustration: createElement(DongHo, { hour }),
    hint: "Kim phút chỉ số 12. Đếm xem kim giờ cách số 12 bao nhiêu khoảng, mỗi khoảng giữa hai số liền nhau là 30°, rồi so với 90° và 180°.",
    explanation: `Kim giờ cách số 12 là ${degrees / 30} khoảng, góc bằng ${degrees}°. Đó là ${kindName(kind)}.`,
  };
}

const yesNo = ["Đúng", "Sai"];

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-vuong",
    kind: "trac-nghiem",
    prompt: "Góc vuông bằng bao nhiêu độ?",
    options: ["45°", "90°", "180°"],
    answerIndex: 1,
    hint: "Nghĩ tới góc của một tờ giấy hình chữ nhật hoặc góc ê ke.",
    explanation: "Góc vuông bằng 90°.",
  },
  {
    id: "kd-tu",
    kind: "trac-nghiem",
    prompt: "Góc lớn hơn góc vuông và bé hơn góc bẹt là góc gì?",
    options: ["Góc nhọn", "Góc tù", "Góc bẹt"],
    answerIndex: 1,
    hint: "Góc nhọn bé hơn góc vuông. Góc bẹt có hai cạnh thẳng hàng.",
    explanation: "Góc lớn hơn 90° và bé hơn 180° là góc tù.",
  },
  {
    id: "kd-bet",
    kind: "dien-so",
    parts: ["Góc bẹt bằng", { answer: 180 }, "°"],
    hint: "Góc bẹt có hai cạnh thẳng hàng về hai phía. Trên thước đo góc, đó là số lớn nhất.",
    explanation: "Góc bẹt bằng 180°.",
  },
];

export const quickChecks = {
  doc: reading("qc-do"),
  vong: reading("qc-vong"),
  loai: classify("qc-loai", "O", 150, "So 150 với 90 và 180."),
  eke: {
    id: "qc-eke",
    kind: "trac-nghiem",
    prompt: "Đặt ê ke vào một góc, hai cạnh của góc vừa khít hai cạnh của ê ke ở góc vuông. Đó là góc gì?",
    options: [...kindOptions],
    answerIndex: 1,
    hint: "Ê ke có một góc vuông.",
    explanation: "Hai cạnh vừa khít với góc vuông của ê ke thì đó là góc vuông.",
  },
} satisfies Record<string, Question>;

/** Hình Rô-bốt cần vẽ: MON = 40°, NOP = 90°, nên MOP = 130°. */
export const chonHinhAngles = { MON: 40, NOP: 90, MOP: 130 };

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "do-goc",
    title: "Đo góc",
    questions: [reading("do-1"), reading("do-2"), reading("do-3"), reading("do-4")],
  },
  {
    id: "loai-goc",
    title: "Nhọn, vuông, tù, bẹt",
    questions: [
      classify("lg-1", "M", 35, "So 35 với 90."),
      classify("lg-2", "N", 90, "Góc có số đo bằng một góc ở ê ke."),
      classify("lg-3", "P", 125, "So 125 với 90 và 180."),
      classify("lg-4", "Q", 180, "Hai cạnh của góc thẳng hàng về hai phía."),
      {
        id: "lg-5",
        kind: "trac-nghiem",
        prompt: "Số đo nào là số đo của một góc tù?",
        options: ["80°", "90°", "110°", "180°"],
        answerIndex: 2,
        hint: "Góc tù lớn hơn 90° và bé hơn 180°.",
        explanation: "110° lớn hơn 90° và bé hơn 180° nên là góc tù. 80° là góc nhọn, 90° là góc vuông, 180° là góc bẹt.",
      },
      {
        id: "lg-6",
        kind: "trac-nghiem",
        prompt: "Đường nét đứt tạo với cạnh OB một góc vuông. Góc đỉnh O; cạnh OA, OB là góc gì?",
        options: ["Góc nhọn", "Góc vuông", "Góc tù"],
        answerIndex: 2,
        illustration: createElement(ThuocDo, { angle: 130, base: "right", showScale: false, rightLine: true, names: { vertex: "O", arm: "A", base: "B" } }),
        hint: "Cạnh OA đã đi qua đường nét đứt chưa? Nếu đã qua, góc lớn hơn góc vuông.",
        explanation: "Cạnh OA nằm quá đường nét đứt, nên góc lớn hơn góc vuông và bé hơn góc bẹt. Đó là góc tù.",
      },
    ],
  },
  {
    id: "goc-trong-hinh",
    title: "Góc trong hình",
    questions: [
      {
        id: "gh-1",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh G; cạnh GS, GL là góc gì?",
        options: ["Góc nhọn", "Góc vuông", "Góc tù"],
        answerIndex: 2,
        illustration: trapezoidFigure(),
        hint: "Tìm đỉnh G trên hình, đọc số ghi ở đó rồi so với 90°.",
        explanation: "Số ghi ở đỉnh G là 110°. 110° lớn hơn 90° và bé hơn 180° nên đó là góc tù.",
      },
      {
        id: "gh-2",
        kind: "loi-van",
        prompt: "Đếm các góc của hình SGLD.",
        lines: [
          ["Hình có", { answer: 2 }, "góc vuông."],
          ["Hình có", { answer: 1 }, "góc nhọn."],
          ["Hình có", { answer: 1 }, "góc tù."],
        ],
        illustration: trapezoidFigure(),
        hint: "Đọc số ghi ở từng đỉnh S, G, L, D rồi gọi tên từng góc.",
        explanation: "S và D là 90°, nên 2 góc vuông. L là 70° nhỏ hơn 90°, nên 1 góc nhọn. G là 110° lớn hơn 90°, nên 1 góc tù.",
      },
    ],
  },
  {
    id: "chon-hinh",
    title: "Chọn hình đúng",
    questions: [
      {
        id: "ch-1",
        kind: "trac-nghiem",
        prompt: "Rô-bốt vẽ góc đỉnh O; cạnh OM, ON có số đo 40° và góc đỉnh O; cạnh ON, OP có số đo 90° để tạo thành góc đỉnh O; cạnh OM, OP. Hình nào là hình Rô-bốt đã vẽ?",
        options: ["Hình A", "Hình B", "Hình C"],
        answerIndex: 1,
        illustration: createElement(ChonHinh),
        hint: "Tìm hình mà cạnh ON và OP tạo góc vuông, còn OM chỉ lệch khỏi ON một góc nhỏ (40°).",
        explanation: "Hình B có ON vuông góc với OP, và OM chỉ lệch khỏi ON một góc nhỏ, 40°. Hình A có OM, ON cũng vuông góc (90°, không phải 40°). Ở hình C, ON và OP không vuông góc.",
      },
      {
        id: "ch-2",
        kind: "dien-so",
        prompt: "Trong hình B, hai góc 40° và 90° nằm cạnh nhau, cùng đỉnh O.",
        parts: ["Góc đỉnh O; cạnh OM, OP bằng", { answer: 130 }, "°"],
        illustration: createElement(ChonHinh, { only: "B" }),
        hint: "Góc MOP gồm góc MON và góc NOP ghép lại.",
        explanation: "Góc MOP gồm góc MON (40°) và góc NOP (90°). 40 + 90 = 130. Vậy góc MOP bằng 130°.",
      },
    ],
  },
  {
    id: "doi-song",
    title: "Góc trên mặt đồng hồ",
    questions: [clock("dh-1", clockHours[0]), clock("dh-2", clockHours[1]), clock("dh-3", clockHours[2]), clock("dh-4", clockHours[3])],
  },
  {
    id: "dung-sai",
    title: "Đúng hay sai?",
    questions: [
      {
        id: "ds-1",
        kind: "trac-nghiem",
        prompt: "Trong hình SGLD có góc nhọn, góc tù, góc vuông.",
        options: yesNo,
        answerIndex: 0,
        illustration: trapezoidFigure(),
        hint: "Đọc số ghi ở từng đỉnh: có số nào bé hơn 90, bằng 90, lớn hơn 90?",
        explanation: "Có góc nhọn (L = 70°), góc vuông (S, D = 90°) và góc tù (G = 110°). Câu này đúng.",
      },
      {
        id: "ds-2",
        kind: "trac-nghiem",
        prompt: "Trong hình SGLD có góc bẹt.",
        options: yesNo,
        answerIndex: 1,
        illustration: trapezoidFigure(),
        hint: "Góc bẹt bằng 180°. Có đỉnh nào ghi 180° không?",
        explanation: "Các góc của hình là 90°, 110°, 70°, 90°, không góc nào bằng 180°. Câu này sai.",
      },
      {
        id: "ds-3",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh D; cạnh DB, DC là góc bẹt.",
        options: yesNo,
        answerIndex: 0,
        illustration: createElement(TamGiacDiem),
        hint: "B, D, C có nằm trên một đường thẳng không?",
        explanation: "D nằm giữa B và C, nên hai cạnh DB, DC thẳng hàng về hai phía. Đó là góc bẹt. Câu này đúng.",
      },
      {
        id: "ds-4",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh D; cạnh DB, DA là góc tù.",
        options: yesNo,
        answerIndex: 1,
        illustration: createElement(TamGiacDiem),
        hint: "Nhìn cạnh DA nghiêng so với DB: mở hẹp hay mở rộng hơn góc vuông?",
        explanation: "Góc đỉnh D; cạnh DB, DA bé hơn góc vuông, nên là góc nhọn, không phải góc tù. Câu này sai.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-uoc-luong",
        kind: "trac-nghiem",
        prompt: "Ước lượng bằng mắt: góc đỉnh O; cạnh OA, OB gần số đo nào nhất?",
        options: ["20°", "50°", "120°"],
        answerIndex: 1,
        illustration: createElement(ThuocDo, { angle: 50, base: "right", showScale: false, rightLine: true }),
        hint: "Góc bé hơn góc vuông (đường nét đứt). Nó lớn hơn hay bé hơn một nửa góc vuông?",
        explanation: "Góc này bé hơn góc vuông nhưng lớn hơn một nửa góc vuông (45°). Vậy số gần nhất là 50°. 120° là góc tù, còn 20° nhỏ hơn nhiều.",
      },
      {
        id: "sn-loi",
        kind: "trac-nghiem",
        prompt: "An nhìn hình và nói: “Góc đỉnh O; cạnh OA, OB bằng 110°.” An nói đúng không?",
        options: ["An đúng, góc bằng 110°", "An sai, góc bằng 70°", "An sai, góc bằng 20°"],
        answerIndex: 1,
        illustration: createElement(ThuocDo, { angle: 70, base: "left", names: { vertex: "O", arm: "A", base: "B" } }),
        hint: "Cạnh OB nằm bên nào của thước? Nó sát vạch 0 ở vòng số nào?",
        explanation: "Cạnh OB nằm bên trái, sát vạch 0 của vòng số vàng, nên đọc vòng vàng: 70°. An đã đọc nhầm vòng số xanh (110). Góc này bé hơn góc vuông, nên không thể là 110°.",
      },
      {
        id: "sn-bet",
        kind: "dien-so",
        prompt: "Đặt hai góc vuông sát nhau, chung đỉnh và chung một cạnh, để hai cạnh ngoài thẳng hàng.",
        parts: ["Hai góc vuông ghép lại thành một góc bẹt, bằng", { answer: 180 }, "°"],
        hint: "Mỗi góc vuông bằng 90°. Cộng hai số đo lại.",
        explanation: "90 + 90 = 180. Hai góc vuông ghép lại thành góc bẹt, bằng 180°.",
      },
    ],
  },
];
