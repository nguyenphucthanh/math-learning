import type { ExerciseGroup, FillQuestion, Question } from "@/components/exercises/types";
import { angleBetweenHands, DongHo } from "@/components/math/dong-ho";
import { createElement } from "react";
import { GocGhiSo } from "./_illustrations/goc-ghi-so";
import { HaiGoc } from "./_illustrations/hai-goc";
import { ThuocDo, type Base } from "./_illustrations/thuoc-do";

/** Thước đo góc đặt sẵn: số đo, cạnh nằm trên đường kính ở bên nào, tên đỉnh và hai cạnh. */
export type ReadingSpec = { angle: number; base: Base; vertex?: string; arm?: string; baseName?: string };

export const readingSpecs = {
  "hd-1a": { angle: 50, base: "right", vertex: "O", arm: "A", baseName: "B" },
  "hd-1b": { angle: 130, base: "left", vertex: "O", arm: "C", baseName: "D" },
  "hd-1c": { angle: 90, base: "left", vertex: "O", arm: "E", baseName: "M" },
  "hd-1d": { angle: 180, base: "right", vertex: "O", arm: "N", baseName: "P" },
  "lt-2a": { angle: 70, base: "right", vertex: "B", arm: "A", baseName: "C" },
  "lt-2b": { angle: 50, base: "left", vertex: "C", arm: "A", baseName: "B" },
  "qc-do": { angle: 60, base: "right", vertex: "O", arm: "A", baseName: "B" },
  "qc-vong": { angle: 40, base: "left", vertex: "O", arm: "A", baseName: "B" },
  "sn-uoc-luong": { angle: 20, base: "right", vertex: "O", arm: "A", baseName: "B" },
  "sn-sach": { angle: 30, base: "right", vertex: "O", arm: "A", baseName: "B" },
} satisfies Record<string, ReadingSpec>;

type ReadingId = keyof typeof readingSpecs;

function ruler(id: ReadingId) {
  const spec: ReadingSpec = readingSpecs[id];
  return createElement(ThuocDo, {
    angle: spec.angle,
    base: spec.base,
    names: { vertex: spec.vertex ?? "O", arm: spec.arm ?? "A", base: spec.baseName ?? "B" },
  });
}

function angleName(id: ReadingId) {
  const spec: ReadingSpec = readingSpecs[id];
  const v = spec.vertex ?? "O";
  return `Góc đỉnh ${v}; cạnh ${v}${spec.arm ?? "A"}, ${v}${spec.baseName ?? "B"}`;
}

/** Câu đọc số đo trên thước đặt sẵn. */
function reading(id: ReadingId): FillQuestion {
  const spec: ReadingSpec = readingSpecs[id];
  const v = spec.vertex ?? "O";
  const baseName = spec.baseName ?? "B";
  const side = spec.base === "right" ? "bên phải" : "bên trái";
  const ring = spec.base === "right" ? "xanh" : "vàng";
  return {
    id,
    kind: "dien-so",
    prompt: "Quan sát thước đo góc rồi nêu số đo góc.",
    parts: [`${angleName(id)} bằng`, { answer: spec.angle }, "°"],
    illustration: ruler(id),
    hint: `Cạnh ${v}${baseName} nằm ${side} của thước, sát vạch 0 của vòng số ${ring}. Đọc số ở vòng ${ring}, chỗ cạnh còn lại đi qua.`,
    explanation: `Cạnh ${v}${baseName} nằm ${side}, nên ta đọc vòng số ${ring}. Cạnh còn lại đi qua vạch ${spec.angle}. Vậy số đo góc là ${spec.angle}°.`,
  };
}

/** Hình có ghi số đo góc ở đỉnh. Tọa độ tính theo trục y hướng lên rồi lật xuống cho SVG. */
const flip = (points: [number, number][], height: number) => points.map(([x, y]) => ({ x, y: Math.round((height - y) * 10) / 10 }));

/** Tam giác MNH: N = 50°, H = 90°. */
export const flagTriangle = {
  names: ["M", "N", "H"],
  points: flip([[100, 119.2], [0, 0], [100, 0]], 130),
  labels: [null, "50°", "90°"] as (string | null)[],
  angles: [null, 50, 90] as (number | null)[],
};

/** Tam giác BCD: C = 30°, D = 45°. */
export const riverTriangle = {
  names: ["B", "C", "D"],
  points: flip([[63.4, 36.6], [0, 0], [100, 0]], 60),
  labels: [null, "30°", "45°"] as (string | null)[],
  angles: [null, 30, 45] as (number | null)[],
};

/** Tứ giác ABCD: A = 90°, B = 70°, C = 90°, D = 110° (tổng 360°). */
export const quad = {
  names: ["A", "B", "C", "D"],
  points: flip([[0, 0], [0, 100], [120.4, 56.2], [100, 0]], 110),
  labels: ["90°", "70°", "90°", "110°"] as (string | null)[],
  angles: [90, 70, 90, 110] as (number | null)[],
};

/** Các giờ ở câu đồng hồ. */
export const clockHours = [1, 9, 8, 5];

/** Khởi động đầu bài: nhớ lại kiến thức cũ, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-dinh",
    kind: "trac-nghiem",
    prompt: "Góc đỉnh O; cạnh OA, OB. Đỉnh của góc là điểm nào?",
    options: ["Điểm O", "Điểm A", "Điểm B"],
    answerIndex: 0,
    hint: "Trong tên góc, đỉnh được đọc đầu tiên: góc đỉnh …",
    explanation: "Góc đỉnh O; cạnh OA, OB có đỉnh là điểm O. Hai cạnh là OA và OB.",
  },
  {
    id: "kd-vuong",
    kind: "dien-so",
    parts: ["Hình chữ nhật có", { answer: 4 }, "góc vuông."],
    hint: "Nhìn góc của một tờ giấy hình chữ nhật. Mỗi góc đều vuông như nhau.",
    explanation: "Hình chữ nhật có 4 góc, cả 4 góc đều là góc vuông.",
  },
  {
    id: "kd-dong-ho",
    kind: "trac-nghiem",
    prompt: "Lúc 3 giờ đúng, kim phút chỉ số mấy?",
    options: ["Số 3", "Số 6", "Số 12"],
    answerIndex: 2,
    hint: "Đúng giờ thì kim phút chưa đi qua phút nào, nó nằm ở chỗ bắt đầu của một vòng.",
    explanation: "Đúng giờ thì kim phút chỉ số 12. Kim giờ mới chỉ số 3.",
  },
];

export const quickChecks = {
  canhDai: {
    id: "qc-canh-dai",
    kind: "trac-nghiem",
    prompt: "Góc đỉnh O có hai cạnh dài, góc đỉnh P có hai cạnh ngắn hơn. Góc nào lớn hơn?",
    options: ["Góc đỉnh O", "Góc đỉnh P", "Hai góc bằng nhau"],
    answerIndex: 1,
    illustration: createElement(HaiGoc),
    hint: "Góc lớn hay bé là do hai cạnh mở rộng nhiều hay ít, không phải do cạnh dài hay ngắn. Nhìn xem cạnh nào mở rộng hơn.",
    explanation: "Góc đỉnh O bằng 30°, góc đỉnh P bằng 50°. Hai cạnh của góc P mở rộng hơn, dù các cạnh ngắn hơn. Muốn biết chắc, ta đo bằng thước đo góc.",
  },
  kyHieu: {
    id: "qc-ky-hieu",
    kind: "trac-nghiem",
    prompt: "Bảy mươi độ viết là:",
    options: ["70°", "70", "7°"],
    answerIndex: 0,
    hint: "Đọc “bảy mươi” là số 70. Đơn vị độ có kí hiệu nhỏ ở trên cao bên phải số.",
    explanation: "Bảy mươi độ viết là 70°. Kí hiệu ° cho biết đơn vị là độ.",
  },
  doc: reading("qc-do"),
  vong: reading("qc-vong"),
  vuong: {
    id: "qc-vuong",
    kind: "trac-nghiem",
    prompt: "Góc vuông bằng bao nhiêu độ?",
    options: ["45°", "90°", "180°"],
    answerIndex: 1,
    hint: "Trong hình thước đo góc, đường nằm thẳng đứng ở giữa nửa hình tròn đi qua số nào?",
    explanation: "Góc vuông bằng 90°. Hai cạnh thẳng hàng về hai phía thì bằng 180°.",
  },
} satisfies Record<string, Question>;

function clock(id: string, hour: number): FillQuestion {
  return {
    id,
    kind: "dien-so",
    prompt: `Đồng hồ chỉ ${hour} giờ. Nêu số đo góc tạo bởi hai kim đồng hồ.`,
    parts: ["Góc tạo bởi hai kim bằng", { answer: angleBetweenHands(hour) }, "°"],
    illustration: createElement(DongHo, { hour }),
    hint: "Kim phút chỉ số 12. Đếm xem kim giờ cách số 12 bao nhiêu khoảng, mỗi khoảng giữa hai số liền nhau là 30°.",
    explanation: `Kim phút chỉ số 12, kim giờ chỉ số ${hour}. Đi đường ngắn nhất từ số 12 đến số ${hour} qua ${hour <= 6 ? hour : 12 - hour} khoảng, mỗi khoảng 30°. Vậy góc bằng ${angleBetweenHands(hour)}°.`,
  };
}

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "hoat-dong",
    title: "Hoạt động: đọc số đo góc",
    questions: [
      reading("hd-1a"),
      reading("hd-1b"),
      reading("hd-1c"),
      reading("hd-1d"),
      {
        id: "hd-2a",
        kind: "loi-van",
        prompt: "Quan sát hình rồi nêu số đo các góc sau.",
        lines: [
          ["Góc đỉnh N; cạnh NM, NH bằng", { answer: 50 }, "°"],
          ["Góc đỉnh H; cạnh HM, HN bằng", { answer: 90 }, "°"],
        ],
        illustration: createElement(GocGhiSo, { points: flagTriangle.points, names: flagTriangle.names, labels: flagTriangle.labels, label: "Tam giác MNH, góc đỉnh N ghi 50°, góc đỉnh H ghi 90°" }),
        hint: "Tìm đỉnh N trên hình, rồi đọc số ghi ở đỉnh đó. Làm tương tự với đỉnh H.",
        explanation: "Số ghi ở đỉnh N là 50°, số ghi ở đỉnh H là 90° (góc vuông).",
      },
      {
        id: "hd-2b",
        kind: "loi-van",
        prompt: "Quan sát hình rồi nêu số đo các góc sau.",
        lines: [
          ["Góc đỉnh C; cạnh CB, CD bằng", { answer: 30 }, "°"],
          ["Góc đỉnh D; cạnh DB, DC bằng", { answer: 45 }, "°"],
        ],
        illustration: createElement(GocGhiSo, { points: riverTriangle.points, names: riverTriangle.names, labels: riverTriangle.labels, label: "Tam giác BCD, góc đỉnh C ghi 30°, góc đỉnh D ghi 45°" }),
        hint: "Mỗi số ghi gần một đỉnh. Tìm đỉnh C rồi đỉnh D.",
        explanation: "Số ghi ở đỉnh C là 30°, số ghi ở đỉnh D là 45°.",
      },
    ],
  },
  {
    id: "luyen-tap",
    title: "Luyện tập",
    questions: [
      {
        id: "lt-1",
        kind: "loi-van",
        prompt: "Nêu số đo các góc của hình ABCD. Góc đỉnh A; cạnh AB, AD bằng 90° là mẫu.",
        lines: [
          ["Góc đỉnh B; cạnh BA, BC bằng", { answer: 70 }, "°"],
          ["Góc đỉnh C; cạnh CB, CD bằng", { answer: 90 }, "°"],
          ["Góc đỉnh D; cạnh DA, DC bằng", { answer: 110 }, "°"],
        ],
        illustration: createElement(GocGhiSo, { points: quad.points, names: quad.names, labels: quad.labels, label: "Tứ giác ABCD, góc đỉnh A ghi 90°, đỉnh B ghi 70°, đỉnh C ghi 90°, đỉnh D ghi 110°" }),
        hint: "Với mỗi góc, tìm đỉnh của nó trên hình rồi đọc số ghi ở đó.",
        explanation: "Đọc số ghi ở từng đỉnh: B là 70°, C là 90° (góc vuông), D là 110°.",
      },
      reading("lt-2a"),
      reading("lt-2b"),
      clock("lt-3a", clockHours[0]),
      clock("lt-3b", clockHours[1]),
      clock("lt-3c", clockHours[2]),
      clock("lt-3d", clockHours[3]),
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-uoc-luong",
        kind: "trac-nghiem",
        prompt: "Góc đỉnh O trong hình rõ ràng bé hơn góc vuông. Số đo của nó là 20° hay 160°?",
        options: ["20°", "160°"],
        answerIndex: 0,
        illustration: ruler("sn-uoc-luong"),
        hint: "Góc vuông bằng 90°. Góc bé hơn góc vuông thì số đo bé hơn 90.",
        explanation: "Cạnh OB nằm bên phải nên đọc vòng số xanh: cạnh OA đi qua 20. Góc bé hơn góc vuông nên số đo bé hơn 90°, đó là 20°. Số 160 ở vòng vàng chỉ để đọc khi cạnh gốc nằm bên trái.",
      },
      {
        id: "sn-sach",
        kind: "trac-nghiem",
        prompt: "Mai nhìn hình và nói: “Góc đỉnh O; cạnh OA, OB bằng 150°.” Mai nói đúng không?",
        options: ["Mai đúng, góc bằng 150°", "Mai sai, góc bằng 30°", "Mai sai, góc bằng 60°"],
        answerIndex: 1,
        illustration: ruler("sn-sach"),
        hint: "Cạnh OB nằm bên nào của thước? Nó sát vạch 0 ở vòng số nào?",
        explanation: "Cạnh OB nằm bên phải, sát vạch 0 của vòng số xanh, nên đọc vòng xanh: 30°. Mai đã đọc nhầm vòng số vàng (150). Góc này cũng bé hơn góc vuông.",
      },
      {
        id: "sn-dong-ho",
        kind: "trac-nghiem",
        prompt: "Lúc 4 giờ đúng, hai kim đồng hồ tạo góc 120°. Còn lúc nào hai kim cũng tạo góc 120°?",
        options: ["2 giờ", "8 giờ", "10 giờ"],
        answerIndex: 1,
        illustration: createElement(DongHo, { hour: 4 }),
        hint: "Lúc 4 giờ, kim giờ cách số 12 bốn khoảng về bên phải. Tìm giờ mà kim giờ cách số 12 bốn khoảng về bên trái.",
        explanation: "Lúc 8 giờ, kim giờ cách số 12 bốn khoảng về bên trái, giống lúc 4 giờ nhưng đối xứng. Vậy góc vẫn là 120°. Lúc 2 giờ và 10 giờ chỉ là 60°.",
      },
    ],
  },
];
