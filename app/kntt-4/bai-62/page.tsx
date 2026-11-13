import { ExerciseSet } from "@/components/exercises/exercise-set";
import { LessonPage } from "@/components/lesson/lesson-page";
import { allLessons } from "@/lib/lessons";
import type { Metadata } from "next";
import { exerciseGroups } from "./bai-tap";
import LyThuyet from "./ly-thuyet.mdx";
import PhuHuynh from "./phu-huynh.mdx";

const lesson = allLessons.find((item) => item.slug === "bai-62")!;

export const metadata: Metadata = {
  title: `Bài ${lesson.number}. ${lesson.title}`,
};

export default function Page() {
  return (
    <LessonPage
      lesson={lesson}
      coursePath="/kntt-4"
      parentSummary="Đọc khoảng 3 phút. Nên xem lại bài nào, hoạt động ôn ở nhà và đáp án sách."
      parent={<PhuHuynh />}
      theory={<LyThuyet />}
      exercises={<ExerciseSet lessonSlug={lesson.slug} groups={exerciseGroups} />}
    />
  );
}
