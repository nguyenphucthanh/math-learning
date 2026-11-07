import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Mỗi mảng có một phần tử cho mỗi cột, từ cột bên trái (hàng cao nhất) sang hàng đơn vị. */
type DatTinhProps = {
  /** Số ô nhớ phía trên, mỗi ô ứng với một cột. Bỏ qua thì không có hàng ô nhớ. */
  carry?: ReactNode[];
  top: ReactNode[];
  bottom: ReactNode[];
  result: ReactNode[];
  /** Mô tả cho trình đọc màn hình, ví dụ "Phép cộng 5 128 + 3 641". */
  label: string;
  /** Dấu phép tính ở hàng thứ hai. Mặc định là cộng. */
  sign?: "+" | "−";
};

/** Ô cao 44px để chạm được; chiều rộng co lại khi màn hình hẹp (tối đa 44px), để 6 chữ số vẫn vừa điện thoại 390px. */
const CELL = "flex h-11 w-full items-center justify-center font-heading text-3xl font-bold tabular-nums";

/** Phép cộng hoặc trừ đặt tính theo cột, thẳng hàng từ phải, có khe nhỏ giữa các lớp. */
export function DatTinh({ carry, top, bottom, result, label, sign = "+" }: DatTinhProps) {
  const columns = top.length;
  const tracks = ["minmax(0,1fr)"];
  const gaps: boolean[] = [];
  for (let index = 0; index < columns; index++) {
    const position = columns - 1 - index;
    const gap = index > 0 && position % 3 === 2;
    gaps.push(gap);
    if (gap) tracks.push("0.5rem");
    tracks.push("minmax(0,1fr)");
  }

  function row(cells: ReactNode[], lead: ReactNode, cellClass: string) {
    return (
      <>
        <span className={cn(CELL, "text-ink")}>{lead}</span>
        {cells.map((cell, index) => (
          <Fragment key={index} gap={gaps[index]}>
            <span className={cellClass}>{cell}</span>
          </Fragment>
        ))}
      </>
    );
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="grid w-full items-center justify-items-center gap-y-1"
      style={{ gridTemplateColumns: tracks.join(" "), maxWidth: `${columns * 2.75 + 2.75 + (gaps.filter(Boolean).length) * 0.5}rem` }}
    >
      {carry ? row(carry, null, "flex h-8 w-full items-center justify-center") : null}
      {row(top, null, CELL)}
      {row(bottom, sign, CELL)}
      <span aria-hidden className="col-span-full h-[3px] w-full rounded-full bg-ink" />
      {row(result, null, CELL)}
    </div>
  );
}

function Fragment({ gap, children }: { gap: boolean; children: ReactNode }) {
  return (
    <>
      {gap ? <span aria-hidden /> : null}
      {children}
    </>
  );
}
