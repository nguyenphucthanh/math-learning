import { LessonLink } from "@/components/lesson/lesson-link";
import { kntt4Tap2Topics, kntt4Topics, type Topic } from "@/lib/lessons";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Toán 4" };

export default function CoursePage() {
  return (
    <>
      <header className="bg-ink px-4 pt-4 pb-10 text-white">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-heading text-5xl leading-tight font-bold">Mục lục</h1>
          <p className="mt-1 text-lg font-semibold">Sách Kết nối tri thức</p>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16">
        <Volume id="tap-mot" title="Tập một" subtitle="Học kì 1" topics={kntt4Topics} />
        <Volume id="tap-hai" title="Tập hai" subtitle="Học kì 2" topics={kntt4Tap2Topics} />
      </main>
    </>
  );
}

function Volume({ id, title, subtitle, topics }: { id: string; title: string; subtitle: string; topics: Topic[] }) {
  return (
    <section id={id} className="mt-12 scroll-mt-4">
      <h2 className="font-heading text-4xl leading-tight font-bold text-ink">
        {title} <span className="text-xl font-semibold text-muted-foreground">{subtitle}</span>
      </h2>
      {topics.map((topic) => (
        <section key={topic.number} className="mt-8">
          <h3 className="font-heading text-2xl leading-snug font-bold text-balance text-ink">
            Chủ đề {topic.number}. {topic.title}
          </h3>
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
    </section>
  );
}
