import { Khung } from "@/components/math/khung";
import { PX_PER_CM, tamGiac } from "./hinh-hoc";

const { A, B, M, C } = tamGiac;

/** Tam giác ABC có điểm M trên cạnh BC. Chỉ ghi độ dài BM và MC; con tự nhận ra loại góc. */
export function TamGiacABM() {
  const cm = (a: number, b: number) => Math.round((b - a) / PX_PER_CM);
  return (
    <Khung maxWidth={340}>
      <svg
        viewBox="-30 -8 300 164"
        role="img"
        aria-label={`Tam giác ABC, điểm M nằm trên cạnh BC. BM dài ${cm(B.x, M.x)} cm, MC dài ${cm(M.x, C.x)} cm. Nối A với M.`}
        className="block w-full"
        fontWeight={800}
      >
        <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="var(--unit-yen-soft)" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
        <line x1={A.x} y1={A.y} x2={M.x} y2={M.y} stroke="var(--ink)" strokeWidth={3} />
        {[
          ["A", A.x, A.y - 8],
          ["B", B.x - 14, B.y + 6],
          ["M", M.x, M.y + 24],
          ["C", C.x + 14, C.y + 6],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={16} fill="var(--ink)">
            {name}
          </text>
        ))}
        <text x={(B.x + M.x) / 2} y={B.y + 24} textAnchor="middle" fontSize={14} fill="var(--unit-ta)">
          {cm(B.x, M.x)} cm
        </text>
        <text x={(M.x + C.x) / 2} y={C.y + 24} textAnchor="middle" fontSize={14} fill="var(--unit-ta)">
          {cm(M.x, C.x)} cm
        </text>
      </svg>
    </Khung>
  );
}
