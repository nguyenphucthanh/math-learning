/** Phân số viết dọc, dùng trong văn bản (Server Component). */
export function Frac({ t, m }: { t: number; m: number }) {
  return (
    <span className="mx-0.5 inline-flex flex-col items-center align-middle text-[0.8em] leading-tight font-bold">
      <span className="border-b-2 border-current px-1">{t}</span>
      <span className="px-1">{m}</span>
    </span>
  );
}
