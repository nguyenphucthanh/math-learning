import { DongHo } from "@/components/math/dong-ho";

/** Bốn đồng hồ A, B, C, D, mỗi đồng hồ chỉ một số giờ đúng. */
export function BonDongHo({ hours }: { hours: number[] }) {
  return (
    <div className="mx-auto grid max-w-[480px] grid-cols-2 gap-3">
      {hours.map((hour, index) => (
        <div key={index}>
          <p className="mb-1 text-lg font-extrabold text-unit-ta">{["A.", "B.", "C.", "D."][index]}</p>
          <DongHo hour={hour} />
        </div>
      ))}
    </div>
  );
}
