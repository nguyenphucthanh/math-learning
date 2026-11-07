import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tones = {
  m2: "bg-unit-m2-soft [--tone:var(--unit-m2)]",
  dm2: "bg-unit-dm2-soft [--tone:var(--unit-dm2)]",
  cm2: "bg-unit-cm2-soft [--tone:var(--unit-cm2)]",
  mm2: "bg-unit-mm2-soft [--tone:var(--unit-mm2)]",
};

/** Khối "Ghi nhớ": đơn vị, định nghĩa, viết tắt và đẳng thức chính. */
export function KeyFact({
  unit,
  equation,
  children,
}: {
  unit: keyof typeof tones;
  equation: string;
  children: ReactNode;
}) {
  return (
    <aside className={cn("my-6 rounded-3xl px-5 py-5 sm:px-7", tones[unit])}>
      <p className="font-heading text-3xl font-bold text-(--tone) sm:text-4xl">{equation}</p>
      <div className="mt-2 max-w-[60ch] text-lg leading-relaxed">{children}</div>
    </aside>
  );
}
