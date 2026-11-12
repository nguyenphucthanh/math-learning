export type Lesson = {
  number: number;
  slug: string;
  title: string;
  /** Starting page in the textbook. */
  page: number;
  /** True once the lesson's route exists. */
  available: boolean;
  /** Tập sách: 1 hoặc 2. Số bài nối tiếp giữa hai tập. */
  volume: 1 | 2;
};

export type Topic = {
  number: number;
  title: string;
  lessons: Lesson[];
};

function lesson(number: number, title: string, page: number, available = false, volume: 1 | 2 = 1): Lesson {
  return { number, slug: `bai-${number}`, title, page, available, volume };
}

/** Bài của tập hai; `page` là số trang trong tập hai. */
function lesson2(number: number, title: string, page: number, available = false): Lesson {
  return lesson(number, title, page, available, 2);
}

export type Course = {
  href: string;
  title: string;
  /** Dòng phụ: sách, bộ sách, học kì. */
  subtitle: string;
  description: string;
  available: boolean;
};

/** Các sách trên trang chủ. Thêm tập 2 hoặc Toán 5 bằng cách thêm một mục ở đây. */
export const courses: Course[] = [
  {
    href: "/kntt-4",
    title: "Toán 4, tập một",
    subtitle: "Kết nối tri thức với cuộc sống",
    description: "Học kì 1 · 7 chủ đề · 37 bài",
    available: true,
  },
  {
    href: "/kntt-4#tap-hai",
    title: "Toán 4, tập hai",
    subtitle: "Kết nối tri thức với cuộc sống",
    description: "Học kì 2 · 6 chủ đề · 36 bài",
    available: true,
  },
];

/** Toán 4 Kết nối tri thức, tập một (học kì 1). */
export const kntt4Topics: Topic[] = [
  {
    number: 1,
    title: "Ôn tập và bổ sung",
    lessons: [
      lesson(1, "Ôn tập các số đến 100 000", 6, true),
      lesson(2, "Ôn tập các phép tính trong phạm vi 100 000", 9, true),
      lesson(3, "Số chẵn, số lẻ", 12, true),
      lesson(4, "Biểu thức chứa chữ", 14, true),
      lesson(5, "Giải bài toán có ba bước tính", 19, true),
      lesson(6, "Luyện tập chung", 21, true),
    ],
  },
  {
    number: 2,
    title: "Góc và đơn vị đo góc",
    lessons: [
      lesson(7, "Đo góc, đơn vị đo góc", 23, true),
      lesson(8, "Góc nhọn, góc tù, góc bẹt", 26, true),
      lesson(9, "Luyện tập chung", 31, true),
    ],
  },
  {
    number: 3,
    title: "Số có nhiều chữ số",
    lessons: [
      lesson(10, "Số có sáu chữ số. Số 1 000 000", 33, true),
      lesson(11, "Hàng và lớp", 37, true),
      lesson(12, "Các số trong phạm vi lớp triệu", 41, true),
      lesson(13, "Làm tròn số đến hàng trăm nghìn", 45, true),
      lesson(14, "So sánh các số có nhiều chữ số", 47, true),
      lesson(15, "Làm quen với dãy số tự nhiên", 50, true),
      lesson(16, "Luyện tập chung", 52),
    ],
  },
  {
    number: 4,
    title: "Một số đơn vị đo đại lượng",
    lessons: [
      lesson(17, "Yến, tạ, tấn", 56, true),
      lesson(18, "Đề-xi-mét vuông, mét vuông, mi-li-mét vuông", 60, true),
      lesson(19, "Giây, thế kỉ", 66, true),
      lesson(20, "Thực hành và trải nghiệm sử dụng một số đơn vị đo đại lượng", 69, true),
      lesson(21, "Luyện tập chung", 73, true),
    ],
  },
  {
    number: 5,
    title: "Phép cộng và phép trừ",
    lessons: [
      lesson(22, "Phép cộng các số có nhiều chữ số", 76, true),
      lesson(23, "Phép trừ các số có nhiều chữ số", 79, true),
      lesson(24, "Tính chất giao hoán và kết hợp của phép cộng", 82, true),
      lesson(25, "Tìm hai số biết tổng và hiệu của hai số đó", 86, true),
      lesson(26, "Luyện tập chung", 88, true),
    ],
  },
  {
    number: 6,
    title: "Đường thẳng vuông góc. Đường thẳng song song",
    lessons: [
      lesson(27, "Hai đường thẳng vuông góc", 91, true),
      lesson(28, "Thực hành và trải nghiệm vẽ hai đường thẳng vuông góc", 94, true),
      lesson(29, "Hai đường thẳng song song", 98, true),
      lesson(30, "Thực hành và trải nghiệm vẽ hai đường thẳng song song", 101, true),
      lesson(31, "Hình bình hành, hình thoi", 105, true),
      lesson(32, "Luyện tập chung", 110, true),
    ],
  },
  {
    number: 7,
    title: "Ôn tập học kì 1",
    lessons: [
      lesson(33, "Ôn tập các số đến lớp triệu", 114, true),
      lesson(34, "Ôn tập phép cộng, phép trừ", 118, true),
      lesson(35, "Ôn tập hình học", 121, true),
      lesson(36, "Ôn tập đo lường", 125, true),
      lesson(37, "Ôn tập chung", 127, true),
    ],
  },
];

/** Toán 4 Kết nối tri thức, tập hai (học kì 2). Số bài nối tiếp tập một. */
export const kntt4Tap2Topics: Topic[] = [
  {
    number: 8,
    title: "Phép nhân và phép chia",
    lessons: [
      lesson2(38, "Nhân với số có một chữ số", 4, true),
      lesson2(39, "Chia cho số có một chữ số", 6, true),
      lesson2(40, "Tính chất giao hoán và kết hợp của phép nhân", 9, true),
      lesson2(41, "Nhân, chia với 10, 100, 1 000,...", 14, true),
      lesson2(42, "Tính chất phân phối của phép nhân đối với phép cộng", 17, true),
      lesson2(43, "Nhân với số có hai chữ số", 20, true),
      lesson2(44, "Chia cho số có hai chữ số", 23),
      lesson2(45, "Thực hành và trải nghiệm ước lượng trong tính toán", 27),
      lesson2(46, "Tìm số trung bình cộng", 29),
      lesson2(47, "Bài toán liên quan đến rút về đơn vị", 31),
      lesson2(48, "Luyện tập chung", 33),
    ],
  },
  {
    number: 9,
    title: "Làm quen với yếu tố thống kê, xác suất",
    lessons: [
      lesson2(49, "Dãy số liệu thống kê", 36),
      lesson2(50, "Biểu đồ cột", 39),
      lesson2(51, "Số lần xuất hiện của một sự kiện", 43),
      lesson2(52, "Luyện tập chung", 47),
    ],
  },
  {
    number: 10,
    title: "Phân số",
    lessons: [
      lesson2(53, "Khái niệm phân số", 49),
      lesson2(54, "Phân số và phép chia số tự nhiên", 52),
      lesson2(55, "Tính chất cơ bản của phân số", 56),
      lesson2(56, "Rút gọn phân số", 59),
      lesson2(57, "Quy đồng mẫu số các phân số", 62),
      lesson2(58, "So sánh phân số", 64),
      lesson2(59, "Luyện tập chung", 69),
    ],
  },
  {
    number: 11,
    title: "Phép cộng, phép trừ phân số",
    lessons: [
      lesson2(60, "Phép cộng phân số", 74),
      lesson2(61, "Phép trừ phân số", 80),
      lesson2(62, "Luyện tập chung", 83),
    ],
  },
  {
    number: 12,
    title: "Phép nhân, phép chia phân số",
    lessons: [
      lesson2(63, "Phép nhân phân số", 86),
      lesson2(64, "Phép chia phân số", 91),
      lesson2(65, "Tìm phân số của một số", 95),
      lesson2(66, "Luyện tập chung", 98),
    ],
  },
  {
    number: 13,
    title: "Ôn tập cuối năm",
    lessons: [
      lesson2(67, "Ôn tập số tự nhiên", 102),
      lesson2(68, "Ôn tập phép tính với số tự nhiên", 105),
      lesson2(69, "Ôn tập phân số", 107),
      lesson2(70, "Ôn tập phép tính với phân số", 110),
      lesson2(71, "Ôn tập hình học và đo lường", 112),
      lesson2(72, "Ôn tập một số yếu tố thống kê và xác suất", 114),
      lesson2(73, "Ôn tập chung", 116),
    ],
  },
];

/** Tất cả bài, theo thứ tự sách (tập một rồi tập hai). */
export const allLessons: Lesson[] = [...kntt4Topics, ...kntt4Tap2Topics].flatMap((topic) => topic.lessons);

/** Bài có sẵn liền trước và liền sau, bỏ qua các bài chưa làm. */
export function lessonNeighbors(slug: string): { previous?: Lesson; next?: Lesson } {
  const available = allLessons.filter((item) => item.available);
  const index = available.findIndex((item) => item.slug === slug);
  return { previous: available[index - 1], next: index < 0 ? undefined : available[index + 1] };
}
