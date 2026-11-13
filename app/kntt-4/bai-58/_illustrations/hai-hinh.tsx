import { HinhPhanSo, type HinhPhanSoProps } from "@/components/math/phan-so";

/** Hai hình như nhau cạnh nhau, để so sánh phần tô màu. Dùng lại HinhPhanSo của các bài phân số. */
export function HaiHinh({ a, b }: { a: HinhPhanSoProps; b: HinhPhanSoProps }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <HinhPhanSo {...a} />
      <HinhPhanSo {...b} />
    </div>
  );
}
