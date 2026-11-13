import { HinhPhanSo, type HinhPhanSoProps } from "@/components/math/phan-so";

/** Nhiều hình có nhãn A, B, C... để chọn hình tô đúng phân số. Dùng lại HinhPhanSo. */
export function NhomHinh({ items }: { items: { label: string; props: HinhPhanSoProps }[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(({ label, props }) => (
        <div key={label} className="flex items-center gap-2">
          <span className="font-heading text-xl font-extrabold text-ink">{label}.</span>
          <div className="min-w-0 flex-1">
            <HinhPhanSo {...props} />
          </div>
        </div>
      ))}
    </div>
  );
}
