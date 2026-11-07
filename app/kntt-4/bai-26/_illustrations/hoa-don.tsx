import { formatNumber } from "@/lib/area-units";

export type Item = { name: string; price: number };

/** Hoá đơn siêu thị: các món và giá, dòng tổng để trống cho con tính. */
export function HoaDon({ items }: { items: Item[] }) {
  return (
    <figure
      className="mx-auto my-4 max-w-xs rounded-md border-2 border-dashed border-ink/40 bg-white px-5 py-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)]"
      aria-label={`Hoá đơn có ${items.length} món: ${items.map((item) => `${item.name} ${formatNumber(item.price)} đồng`).join(", ")}`}
    >
      <p className="text-center font-heading text-xl font-bold text-ink">HOÁ ĐƠN</p>
      <p className="mb-3 text-center text-sm font-bold text-foreground/70">Siêu thị Tương Lai</p>
      <ul className="space-y-1 border-y-2 border-dashed border-ink/30 py-3">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between gap-4 text-base font-bold tabular-nums text-foreground">
            <span>{item.name}</span>
            <span>{formatNumber(item.price)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex justify-between text-base font-bold text-ink">
        <span>Tổng</span>
        <span>? đồng</span>
      </p>
    </figure>
  );
}
