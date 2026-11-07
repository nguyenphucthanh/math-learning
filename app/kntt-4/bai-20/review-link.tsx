import Link from "next/link";
import type { ReactNode } from "react";

/** Dòng liên kết về bài gốc trong phần Nhắc lại nhanh. */
export function ReviewLink({ slug, children }: { slug: string; children: ReactNode }) {
  return (
    <p className="my-3">
      <Link
        href={`/kntt-4/${slug}`}
        className="inline-flex min-h-11 items-center text-lg font-bold text-ink underline underline-offset-4"
      >
        {children}
      </Link>
    </p>
  );
}
