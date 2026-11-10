import { lessonNeighbors, type Lesson } from "@/lib/lessons";
import { ArrowLeft, ArrowRight, Pencil } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { DraftPaper } from "./draft-paper";
import { Fold } from "./fold";
import { SectionNav } from "./section-nav";

/** Khung chung của mọi bài: nhãn vở → Phụ huynh (thu gọn) → Lý thuyết → Bài tập. */
export function LessonPage({
  lesson,
  coursePath,
  parentSummary,
  parent,
  theory,
  exercises,
}: {
  lesson: Lesson;
  coursePath: string;
  parentSummary: string;
  parent: ReactNode;
  theory: ReactNode;
  exercises: ReactNode;
}) {
  const { previous, next } = lessonNeighbors(lesson.slug);

  return (
    <>
      <header className="bg-ink px-4 pt-6 pb-10 sm:pt-10 sm:pb-14">
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-white px-6 py-6 sm:px-10 sm:py-8">
          <p className="flex items-center gap-2 text-lg font-bold text-ink">
            <Pencil aria-hidden className="size-5" />
            Bài {lesson.number}
          </p>
          <h1 className="mt-1 font-heading text-4xl leading-[1.1] font-bold text-balance text-ink sm:text-5xl">
            {lesson.title}
          </h1>
          <div className="mt-4 border-t-2 border-dotted border-input pt-3 text-base text-muted-foreground">
            Sách Kết nối tri thức, trang {lesson.page}
          </div>
        </div>
      </header>

      <SectionNav coursePath={coursePath} />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16">
        <section id="phu-huynh" className="pt-8">
          <Fold title="Dành cho phụ huynh" summary={parentSummary}>
            {parent}
          </Fold>
        </section>

        <section id="ly-thuyet" className="pt-12">
          <h2 className="mb-6 font-heading text-4xl font-bold text-ink sm:text-5xl">Lý thuyết</h2>
          {theory}
        </section>

        <section id="bai-tap" className="pt-16">
          <h2 className="mb-6 font-heading text-4xl font-bold text-ink sm:text-5xl">Bài tập</h2>
          {exercises}
        </section>

        <nav aria-label="Chuyển bài" className="mt-16 flex flex-wrap justify-between gap-3 text-lg font-bold text-ink">
          <Link
            href={previous ? `${coursePath}/${previous.slug}` : coursePath}
            className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-secondary px-5 hover:bg-secondary/70"
          >
            <ArrowLeft aria-hidden className="size-5" />
            {previous ? `Bài ${previous.number}` : "Mục lục"}
          </Link>
          {next ? (
            <Link
              href={`${coursePath}/${next.slug}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-secondary px-5 hover:bg-secondary/70"
            >
              Bài {next.number}
              <ArrowRight aria-hidden className="size-5" />
            </Link>
          ) : null}
        </nav>
      </main>

      <DraftPaper />
    </>
  );
}
