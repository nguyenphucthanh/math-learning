import { DatTinh } from "@/components/math/dat-tinh";
import { formatNumber } from "@/lib/area-units";

type Props = {
  a: number;
  b: number;
  /** Kết quả đã viết sẵn trong sách, có thể sai. */
  result: number;
  op: "+" | "-";
};

/** Chữ số của một số, căn phải theo `columns` cột; ô thừa bên trái để trống. */
function cells(value: number, columns: number) {
  const digits = String(value).split("");
  return [...Array<string>(columns - digits.length).fill(""), ...digits];
}

/** Phép tính đã đặt sẵn kèm kết quả, để con xem Đúng hay Sai. */
export function DatTinhDS({ a, b, result, op }: Props) {
  const columns = Math.max(String(a).length, String(b).length, String(result).length);
  const sign = op === "+" ? "+" : "−";
  return (
    <figure className="my-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <DatTinh
        top={cells(a, columns)}
        bottom={cells(b, columns)}
        result={cells(result, columns)}
        sign={sign}
        label={`Phép tính ${formatNumber(a)} ${sign} ${formatNumber(b)} đã viết kết quả ${formatNumber(result)}`}
      />
    </figure>
  );
}
