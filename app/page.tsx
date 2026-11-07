import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center bg-ink px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="font-heading text-6xl leading-none font-bold text-balance sm:text-7xl">Học toán cùng con</h1>
        <Link
          href="/kntt-4"
          className="mt-8 inline-flex min-h-14 items-center gap-3 rounded-2xl bg-sun px-6 text-xl font-bold text-foreground hover:brightness-95"
        >
          Toán 4, tập một
          <ArrowRight aria-hidden className="size-6" />
        </Link>
      </div>
    </main>
  );
}
