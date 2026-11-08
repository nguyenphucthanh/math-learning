import { courses } from "@/lib/lessons";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center bg-ink px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-heading text-6xl leading-none font-bold text-balance sm:text-7xl">Học toán cùng con</h1>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {courses
            .filter((course) => course.available)
            .map((course) => (
              <li key={course.href}>
                <Link
                  href={course.href}
                  className="group flex h-full min-h-32 items-center gap-4 rounded-3xl bg-white p-5 text-ink shadow-[0_2px_16px_oklch(0_0_0/0.2)] transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
                >
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-sun text-foreground">
                    <BookOpen aria-hidden className="size-7" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-heading text-2xl leading-tight font-bold">{course.title}</span>
                    <span className="mt-1 block text-base font-bold">{course.subtitle}</span>
                    <span className="mt-1 block text-base text-muted-foreground">{course.description}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
