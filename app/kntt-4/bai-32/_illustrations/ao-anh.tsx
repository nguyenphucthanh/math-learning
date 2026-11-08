import { Khung } from "@/components/math/khung";
import type { Seg } from "@/lib/hinh";

const f = (n: number) => Math.round(n * 10) / 10;

const CENTER = { x: 170, y: 110 };
const RADIUS = 106;

/** Hai đường đỏ nằm ngang, cách tâm 40 đơn vị mỗi phía. Cả hai thẳng và song song. */
export const duongDo: [Seg, Seg] = [
  [{ x: 20, y: 70 }, { x: 320, y: 70 }],
  [{ x: 20, y: 150 }, { x: 320, y: 150 }],
];

/** 30 đường thẳng qua tâm, mỗi đường cách nhau 6 độ: mắt thấy hai đường đỏ như cong ra ngoài. */
const nan = Array.from({ length: 30 }, (_, k) => {
  const rad = (k * 6 * Math.PI) / 180;
  return { x1: f(CENTER.x - RADIUS * Math.cos(rad)), y1: f(CENTER.y - RADIUS * Math.sin(rad)), x2: f(CENTER.x + RADIUS * Math.cos(rad)), y2: f(CENTER.y + RADIUS * Math.sin(rad)) };
});

/** Ảo ảnh thị giác: hai đường màu đỏ trông như cong nhưng thật ra song song. */
export function AoAnh() {
  return (
    <Khung maxWidth={380}>
      <svg viewBox="0 0 340 220" role="img" aria-label="Nhiều đường thẳng tỏa ra từ một điểm ở giữa, và hai đường thẳng nằm ngang màu đỏ vắt qua hình" className="block w-full">
        <g stroke="var(--ink)" strokeWidth={1}>
          {nan.map((line, index) => (
            <line key={index} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
          ))}
        </g>
        {duongDo.map((seg, index) => (
          <line key={index} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="oklch(0.58 0.23 27)" strokeWidth={4} strokeLinecap="round" />
        ))}
      </svg>
    </Khung>
  );
}
