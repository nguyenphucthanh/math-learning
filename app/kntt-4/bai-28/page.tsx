import { ExerciseSet } from "@/components/exercises/exercise-set";
import { LessonPage } from "@/components/lesson/lesson-page";
import { kntt4Topics } from "@/lib/lessons";
import type { Metadata } from "next";
import { exerciseGroups } from "./bai-tap";
import LyThuyet from "./ly-thuyet.mdx";
import PhuHuynh from "./phu-huynh.mdx";

const lesson = kntt4Topics.flatMap((topic) => topic.lessons).find((item) => item.slug === "bai-28")!;

export const metadata: Metadata = {
  title: `Bài ${lesson.number}. ${lesson.title}`,
};

export default function Page() {
  return (
    <LessonPage
      lesson={lesson}
      coursePath="/kntt-4"
      parentSummary="Đọc khoảng 3 phút. Có cách giải thích, lỗi hay gặp và đáp án sách."
      parent={<PhuHuynh />}
      theory={<LyThuyet />}
      exercises={<ExerciseSet lessonSlug={lesson.slug} groups={exerciseGroups} />}
    />
  );
}
