import { Khung } from "@/components/math/khung";
import { lineThrough, polar, type Point, type Seg } from "@/lib/hinh";

const AB_CENTER: Point = { x: 170, y: 215 };
const AB_DEG = 20;
const FOOT = polar(AB_CENTER, 15, AB_DEG);
/** Điểm H nằm ngoài đường thẳng AB, cách AB 75 đơn vị. */
export const pointH: Point = polar(FOOT, 75, AB_DEG + 90);

export const VIEW = { width: 340, height: 290 };
export const lineAB: Seg = lineThrough(AB_CENTER, AB_DEG, 135);

export type Candidate = { label: string; seg: Seg };

const HALF = 100;
const make = (label: string, center: Point, deg: number): Candidate => ({ label, seg: lineThrough(center, deg, HALF) });

/** Đường 1: song song với AB nhưng không qua H. Đường 2: qua H và song song với AB. Đường 3: qua H nhưng cắt AB. */
export const candidates: Candidate[] = [
  make("1", polar(pointH, 45, AB_DEG + 90), AB_DEG),
  make("2", pointH, AB_DEG),
  make("3", pointH, AB_DEG + 40),
];

const f = (n: number) => Math.round(n * 10) / 10;

function Label({ at, from, text }: { at: Point; from: Point; text: string }) {
  const dx = at.x - from.x;
  const dy = at.y - from.y;
  const length = Math.hypot(dx, dy);
  return (
    <text x={f(at.x + (dx / length) * 14)} y={f(at.y + (dy / length) * 14 + 5)} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
      {text}
    </text>
  );
}

/** Điểm H ngoài đường thẳng AB và ba đường thẳng đánh số. Con chọn đường đi qua H và song song với AB. */
export function ChonSongSong() {
  return (
    <Khung maxWidth={380}>
      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="img" aria-label="Đường thẳng AB, điểm H ngoài đường thẳng AB và ba đường thẳng đánh số 1, 2, 3" className="block w-full">
        <line x1={lineAB[0].x} y1={lineAB[0].y} x2={lineAB[1].x} y2={lineAB[1].y} stroke="var(--ink)" strokeWidth={3.5} strokeLinecap="round" />
        {candidates.map((candidate) => (
          <g key={candidate.label}>
            <line x1={candidate.seg[0].x} y1={candidate.seg[0].y} x2={candidate.seg[1].x} y2={candidate.seg[1].y} stroke="var(--unit-ta)" strokeWidth={2.5} strokeLinecap="round" />
            <Label at={candidate.seg[1]} from={candidate.seg[0]} text={candidate.label} />
          </g>
        ))}
        <circle cx={pointH.x} cy={pointH.y} r={4.5} fill="var(--ink)" />
        <text x={f(pointH.x - 16)} y={f(pointH.y + 18)} textAnchor="middle" fontSize={16} fontWeight={800} fill="var(--ink)">
          H
        </text>
        <Label at={lineAB[0]} from={lineAB[1]} text="A" />
        <Label at={lineAB[1]} from={lineAB[0]} text="B" />
      </svg>
    </Khung>
  );
}
