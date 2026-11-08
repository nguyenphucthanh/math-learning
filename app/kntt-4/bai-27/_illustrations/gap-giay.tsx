import { Khung } from "@/components/math/khung";

/** Tờ giấy có đường thẳng AB, không có ê ke. */
export function GapGiay() {
  return (
    <Khung maxWidth={340}>
      <svg viewBox="0 0 320 190" role="img" aria-label="Tờ giấy màu vàng có đường thẳng AB vẽ dọc, hai điểm A và B trên đường thẳng" className="block w-full" fontWeight={800}>
        <rect x={50} y={10} width={220} height={170} rx={6} fill="var(--sun)" fillOpacity={0.55} stroke="var(--ink)" strokeWidth={2} />
        <line x1={160} y1={22} x2={160} y2={168} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
        <circle cx={160} cy={50} r={4} fill="var(--ink)" />
        <circle cx={160} cy={138} r={4} fill="var(--ink)" />
        <text x={176} y={56} fontSize={18} fill="var(--ink)">
          A
        </text>
        <text x={176} y={144} fontSize={18} fill="var(--ink)">
          B
        </text>
      </svg>
    </Khung>
  );
}
