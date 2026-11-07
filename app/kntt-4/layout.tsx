import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function CourseLayout({ children }: LayoutProps<"/kntt-4">) {
  return (
    <>
      <div className="bg-ink px-4 pt-3">
        <Link
          href="/kntt-4"
          className="mx-auto flex min-h-11 max-w-3xl items-center gap-2 text-lg font-bold text-white underline-offset-4 hover:underline"
        >
          <BookOpen aria-hidden className="size-5" />
          Toán 4, tập một
        </Link>
      </div>
      {children}
    </>
  );
}
