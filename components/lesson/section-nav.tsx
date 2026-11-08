"use client";

import { House } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const anchors = [
  { id: "phu-huynh", label: "Phụ huynh" },
  { id: "ly-thuyet", label: "Lý thuyết" },
  { id: "bai-tap", label: "Bài tập" },
];

/** Thanh mục lục dính: tô sáng phần đang nằm ở đầu màn hình khi cuộn. */
export function SectionNav({ coursePath }: { coursePath: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      const line = 120; // dưới thanh dính một chút
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const { id } of anchors) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= line) current = id;
      }
      if (atBottom) current = anchors[anchors.length - 1].id;
      setActive(current);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <nav aria-label="Các phần của bài" className="sticky top-0 z-20 bg-white/95 shadow-sm backdrop-blur-sm">
      <ul className="mx-auto flex max-w-3xl">
        <li>
          <Link
            href={coursePath}
            aria-label="Về danh sách bài"
            className="flex min-h-13 min-w-13 items-center justify-center px-3 text-ink hover:bg-secondary"
          >
            <House aria-hidden className="size-6" />
          </Link>
        </li>
        {anchors.map((anchor) => {
          const isActive = active === anchor.id;
          return (
            <li key={anchor.id} className="flex-1">
              <a
                href={`#${anchor.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex min-h-13 items-center justify-center border-b-4 px-2 text-center text-lg font-bold transition-colors motion-reduce:transition-none ${
                  isActive
                    ? "border-sun bg-secondary text-ink"
                    : "border-transparent text-ink/70 hover:bg-secondary"
                }`}
              >
                {anchor.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
