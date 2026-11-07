"use client";

import { useLessonProgress } from "@/hooks/use-lesson-progress";
import type { Lesson } from "@/lib/lessons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/** Một dòng trong mục lục, hiện tiến độ đã lưu của bài. */
export function LessonLink({ lesson, href }: { lesson: Lesson; href: string }) {
  const { progress } = useLessonProgress(lesson.slug);
  const solved = Object.keys(progress.solved).length;

  return (
    <Link href={href} className="flex min-h-16 items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-white hover:bg-ink/90">
      <span className="min-w-0 flex-1">
        <span className="block text-lg leading-snug font-bold">
          Bài {lesson.number}. {lesson.title}
        </span>
        {solved > 0 ? (
          <span className="mt-0.5 block text-base font-semibold tabular-nums">
            Đã làm {solved}/{progress.total} câu
          </span>
        ) : null}
      </span>
      <ChevronRight aria-hidden className="size-6 shrink-0" />
    </Link>
  );
}
