import { formatNumber } from "@/lib/area-units";

export type PriceRow = { name: string; price: number; per: string };

/** Bảng giá của cửa hàng hoặc quầy vé. Hình tĩnh, giá viết tách lớp bằng NBSP. */
export function PriceBoard({ title, rows }: { title: string; rows: PriceRow[] }) {
  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border-4 border-ink bg-white p-4">
      <p className="mb-2 text-center font-heading text-xl font-bold text-ink">{title}</p>
      <table className="w-full text-lg">
        <caption className="sr-only">{title}</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t-2 border-dashed border-input">
              <th scope="row" className="py-2 pr-2 text-left font-bold">
                {row.name}
              </th>
              <td className="py-2 text-right font-bold whitespace-nowrap tabular-nums">
                {formatNumber(row.price)} đồng/{row.per}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const shopBoard = {
  title: "Cửa hàng văn phòng phẩm",
  rows: [
    { name: "Vở", price: 8000, per: "quyển" },
    { name: "Bút chì", price: 4000, per: "cái" },
    { name: "Thước kẻ", price: 6000, per: "cái" },
    { name: "Hộp đựng bút", price: 32000, per: "cái" },
    { name: "Bộ ê ke", price: 15000, per: "bộ" },
    { name: "Sách truyện", price: 85000, per: "quyển" },
  ],
} satisfies { title: string; rows: PriceRow[] };

export const ticketBoard = {
  title: "Giá vé một lượt chơi",
  rows: [
    { name: "Đu quay đám mây", price: 25000, per: "lượt" },
    { name: "Câu cá", price: 10000, per: "lượt" },
    { name: "Nhà gương", price: 15000, per: "lượt" },
    { name: "Tàu lượn", price: 30000, per: "lượt" },
  ],
} satisfies { title: string; rows: PriceRow[] };
