import { formatNumber } from "@/lib/area-units";

/** Thửa ruộng hình chữ nhật chia thành `parts` phần đều nhau. Chỉ ghi diện tích cả thửa, để con tự tính từng phần. */
export function FieldParts({ total, parts }: { total: number; parts: number }) {
  const left = 10;
  const width = 300;
  const top = 34;
  const height = 70;
  const partWidth = width / parts;

  return (
    <svg
      viewBox="0 0 320 124"
      role="img"
      aria-label={`Thửa ruộng hình chữ nhật có diện tích ${formatNumber(total)} mét vuông, chia thành ${parts} phần đều nhau.`}
      className="mx-auto block w-full max-w-md"
    >
      <text x={left + width / 2} y={22} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--foreground)">
        Cả thửa ruộng: {formatNumber(total)} m²
      </text>
      {Array.from({ length: parts }, (_, index) => (
        <rect
          key={index}
          data-testid="field-part"
          x={left + index * partWidth}
          y={top}
          width={partWidth}
          height={height}
          fill="var(--unit-m2-soft)"
          stroke="var(--unit-m2)"
          strokeWidth={3}
        />
      ))}
      <text x={left + width / 2} y={top + height + 18} textAnchor="middle" fontSize={14} fontWeight={800} fill="var(--foreground)">
        {parts} phần đều nhau
      </text>
    </svg>
  );
}
