import { LessonLink } from "@/components/lesson/lesson-link";
import { kntt4Topics } from "@/lib/lessons";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Toán 4, tập một" };

export default function CoursePage() {
  return (
    <>
      <header className="bg-ink px-4 pt-4 pb-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-5xl leading-tight font-bold">Mục lục</h1>
          <p className="mt-1 text-lg font-semibold">Sách Kết nối tri thức, học kì 1</p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16">
        {kntt4Topics.map((topic) => (
          <section key={topic.number} className="mt-10">
            <h2 className="font-heading text-2xl leading-snug font-bold text-balance text-ink">
              Chủ đề {topic.number}. {topic.title}
            </h2>
            <ul className="mt-3 space-y-1.5">
              {topic.lessons.map((lesson) => (
                <li key={lesson.slug}>
                  {lesson.available ? (
                    <LessonLink lesson={lesson} href={`/kntt-4/${lesson.slug}`} />
                  ) : (
                    <p className="flex min-h-11 items-center rounded-xl bg-white/70 px-4 py-2 text-lg leading-snug text-muted-foreground">
                      Bài {lesson.number}. {lesson.title}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </>
  );
}
