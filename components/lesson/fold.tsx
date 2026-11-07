import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** Khối thu gọn mặc định, dùng cho phần phụ huynh và đáp án. */
export function Fold({ title, summary, children }: { title: string; summary?: string; children: ReactNode }) {
  return (
    <details className="rounded-3xl bg-secondary">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-3xl px-5 py-3 sm:px-7">
        <span>
          <span className="block font-heading text-xl font-bold text-ink">{title}</span>
          {summary ? <span className="block text-base text-muted-foreground">{summary}</span> : null}
        </span>
        {/* Chỉ xoay theo đúng khối chứa nó, kể cả khi hai khối lồng nhau. */}
        <ChevronDown
          aria-hidden
          className="size-6 shrink-0 text-ink transition-transform [details[open]>summary>&]:rotate-180"
        />
      </summary>
      <div className="px-5 pb-6 sm:px-7 [&_details]:bg-white">{children}</div>
    </details>
  );
}
