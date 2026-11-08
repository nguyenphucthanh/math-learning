import { monThi } from "./thong-ke";

const cell = (value: number | null) => (value === null ? <span className="sr-only">không có</span> : value);

/** Bảng huy chương theo môn. Hàng "Tổng" không có: con tự cộng. */
export function BangThongKe() {
  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)]">
      <table className="w-full border-collapse text-center text-lg font-semibold tabular-nums">
        <caption className="bg-ink px-3 py-2 text-base font-bold text-white">Số huy chương của một đoàn thể thao (ô trống là không có)</caption>
        <thead>
          <tr className="bg-sun/40">
            <th className="border border-ink/30 px-2 py-2 text-left">Môn</th>
            <th className="border border-ink/30 px-2 py-2">HCV</th>
            <th className="border border-ink/30 px-2 py-2">HCB</th>
            <th className="border border-ink/30 px-2 py-2">HCĐ</th>
          </tr>
        </thead>
        <tbody>
          {monThi.map((item) => (
            <tr key={item.mon}>
              <th scope="row" className="border border-ink/30 px-2 py-2 text-left font-semibold">
                {item.mon}
              </th>
              <td className="border border-ink/30 px-2 py-2">{cell(item.vang)}</td>
              <td className="border border-ink/30 px-2 py-2">{cell(item.bac)}</td>
              <td className="border border-ink/30 px-2 py-2">{cell(item.dong)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-base">HCV: huy chương vàng. HCB: huy chương bạc. HCĐ: huy chương đồng.</p>
    </div>
  );
}
