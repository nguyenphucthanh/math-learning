export type Lesson = {
  number: number;
  slug: string;
  title: string;
  /** Starting page in the textbook. */
  page: number;
  /** True once the lesson's route exists. */
  available: boolean;
};

export type Topic = {
  number: number;
  title: string;
  lessons: Lesson[];
};

function lesson(number: number, title: string, page: number, available = false): Lesson {
  return { number, slug: `bai-${number}`, title, page, available };
}

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
      lesson(8, "Góc nhọn, góc tù, góc bẹt", 26),
      lesson(9, "Luyện tập chung", 31),
    ],
  },
  {
    number: 3,
    title: "Số có nhiều chữ số",
    lessons: [
      lesson(10, "Số có sáu chữ số. Số 1 000 000", 33),
      lesson(11, "Hàng và lớp", 37),
      lesson(12, "Các số trong phạm vi lớp triệu", 41),
      lesson(13, "Làm tròn số đến hàng trăm nghìn", 45),
      lesson(14, "So sánh các số có nhiều chữ số", 47),
      lesson(15, "Làm quen với dãy số tự nhiên", 50),
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

/** Bài có sẵn liền trước và liền sau, bỏ qua các bài chưa làm. */
export function lessonNeighbors(slug: string): { previous?: Lesson; next?: Lesson } {
  const available = kntt4Topics.flatMap((topic) => topic.lessons).filter((item) => item.available);
  const index = available.findIndex((item) => item.slug === slug);
  return { previous: available[index - 1], next: index < 0 ? undefined : available[index + 1] };
}
