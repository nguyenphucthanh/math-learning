import type { ReactNode } from "react";

/** Khung trắng chung cho hình minh họa trong bài tập. */
export function Khung({ children, maxWidth = 420 }: { children: ReactNode; maxWidth?: number }) {
  return (
    <figure
      className="mx-auto rounded-3xl bg-white p-3 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-4"
      style={{ maxWidth }}
    >
      {children}
    </figure>
  );
}

export function RightMark({ at, toward1, toward2, size = 12 }: { at: { x: number; y: number }; toward1: { x: number; y: number }; toward2: { x: number; y: number }; size?: number }) {
  const unit = (p: { x: number; y: number }) => {
    const length = Math.hypot(p.x - at.x, p.y - at.y);
    return { x: (p.x - at.x) / length, y: (p.y - at.y) / length };
  };
  const u = unit(toward1);
  const v = unit(toward2);
  const f = (n: number) => Math.round(n * 10) / 10;
  const a = { x: f(at.x + u.x * size), y: f(at.y + u.y * size) };
  const c = { x: f(at.x + v.x * size), y: f(at.y + v.y * size) };
  const b = { x: f(a.x + v.x * size), y: f(a.y + v.y * size) };
  return <path d={`M ${a.x} ${a.y} L ${b.x} ${b.y} L ${c.x} ${c.y}`} fill="none" stroke="var(--unit-ta)" strokeWidth={2.5} />;
}
