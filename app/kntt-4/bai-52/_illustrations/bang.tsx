import { BangKiemDem, type KiemDemRow } from "@/components/math/kiem-dem";

/** Khung trắng bọc bảng kiểm đếm cho câu bài tập. */
export function BangKiemDemHinh({ rows }: { rows: KiemDemRow[] }) {
  return (
    <div className="mx-auto max-w-sm">
      <BangKiemDem rows={rows} />
    </div>
  );
}
