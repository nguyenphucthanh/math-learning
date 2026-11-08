import { NenLuoi } from "@/components/math/dau";
import { Khung } from "@/components/math/khung";
import { CELL, COLS, ROWS, diem } from "./hinh-hoc";

const px = (cells: number) => cells * CELL;
const line = (a: keyof typeof diem, b: keyof typeof diem) => (
  <line key={a + b} x1={px(diem[a].x)} y1={px(diem[a].y)} x2={px(diem[b].x)} y2={px(diem[b].y)} stroke="var(--ink)" strokeWidth={3} strokeLinecap="round" />
);

/** Nhãn đặt lệch khỏi đỉnh để không đè lên nét vẽ: [dx, dy]. */
const LABELS: Record<keyof typeof diem, [number, number]> = {
  L: [-4, -9],
  D: [0, -9],
  K: [-12, 16],
  E: [-6, -9],
  G: [14, 18],
  I: [-4, 24],
  H: [4, 24],
};

/** Hình gồm các đoạn LD, DE, KE, KL, LI, KI, EH, DG, GH, IH trên lưới ô vuông. */
export function HinhThoiBinhHanh() {
  return (
    <Khung maxWidth={420}>
      <svg
        viewBox={`-12 -22 ${px(COLS) + 24} ${px(ROWS) + 52}`}
        role="img"
        aria-label="Hình vẽ trên lưới ô vuông có các điểm L, D, K, E, G, I, H. Các đoạn thẳng: LD, DE, KE, KL, LI, KI, EH, DG, GH, IH. LI đứng thẳng, KE nằm ngang cắt LI."
        className="block w-full"
        fontWeight={800}
      >
        <NenLuoi cols={COLS} rows={ROWS} cell={CELL} />
        {["LD", "DE", "KE", "KL", "LI", "KI", "EH", "DG", "GH", "IH"].map((name) => line(name[0] as keyof typeof diem, name[1] as keyof typeof diem))}
        {(Object.keys(diem) as (keyof typeof diem)[]).map((name) => (
          <text key={name} x={px(diem[name].x) + LABELS[name][0]} y={px(diem[name].y) + LABELS[name][1]} textAnchor="middle" fontSize={16} fill="var(--ink)">
            {name}
          </text>
        ))}
      </svg>
    </Khung>
  );
}
