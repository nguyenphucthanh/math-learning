"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { StepControls, useStepEntrance } from "@/components/lesson/step-player";
import { arrowHead, lineIntersection, pointAtX, type Point, type Seg } from "@/lib/hinh";
import { useRef, useState } from "react";
import { haiDoan } from "../_illustrations/hai-doan";

const p = (x: number, y: number): Point => ({ x, y });

export type Pair = "song-song" | "cat-nhau";

/** Cặp song song: cùng nghiêng, cách nhau 100 đơn vị. Cặp cắt nhau lấy từ hình `HaiDoan` của bài tập. */
export const pairs: Record<Pair, { ab: Seg; cd: Seg }> = {
  "song-song": { ab: [p(40, 60), p(150, 76.5)], cd: [p(40, 160), p(150, 176.5)] },
  "cat-nhau": haiDoan,
};

const LEFT = 10;
const RIGHT = 328;

/** Điểm cuối của phần kéo dài về bên phải: tại giao điểm (cặp cắt nhau) hoặc sát mép hình (cặp song song). */
export function rightEnds(pair: Pair) {
  const { ab, cd } = pairs[pair];
  const meet = lineIntersection(ab, cd);
  return pair === "cat-nhau" && meet ? { ab: meet, cd: meet, meet } : { ab: pointAtX(ab, RIGHT), cd: pointAtX(cd, RIGHT), meet: null };
}

const captions = (pair: Pair) => [
  "Cho hai đoạn thẳng AB và CD. Hai đoạn này chưa chạm nhau.",
  pair === "song-song" ? "Kéo dài AB và CD về cả hai phía thành hai đường thẳng. Con xem chúng có gặp nhau không." : "Kéo dài AB và CD thành hai đường thẳng. Bên phải, hai đường đang chụm lại gần nhau.",
  pair === "song-song"
    ? "Hai đường thẳng đi mãi mà không cắt nhau: AB và CD song song với nhau."
    : "Hai đường thẳng cắt nhau tại E. Vậy AB và CD không song song với nhau.",
];

/** Kéo dài hai đoạn thẳng: nếu không bao giờ cắt nhau thì song song, nếu cắt nhau thì không. */
export function HaiDuongKeoDai() {
  const [step, setStep] = useState(0);
  const [pair, setPair] = useState<Pair>("song-song");
  const scope = useRef<HTMLElement>(null);
  useStepEntrance(scope, step);

  const { ab, cd } = pairs[pair];
  const ends = rightEnds(pair);
  const left = (seg: Seg) => pointAtX(seg, LEFT);
  const choose = (next: Pair) => {
    setPair(next);
    setStep(0);
  };

  return (
    <figure ref={scope} className="my-6 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Chọn cặp đoạn thẳng">
        <ActionButton variant={pair === "song-song" ? "primary" : "soft"} aria-pressed={pair === "song-song"} onClick={() => choose("song-song")}>
          Cặp thứ nhất
        </ActionButton>
        <ActionButton variant={pair === "cat-nhau" ? "primary" : "soft"} aria-pressed={pair === "cat-nhau"} onClick={() => choose("cat-nhau")}>
          Cặp thứ hai
        </ActionButton>
      </div>
      <svg
        viewBox="0 0 340 230"
        role="img"
        aria-label={
          step === 0
            ? "Hai đoạn thẳng AB và CD chưa chạm nhau"
            : step === 1
              ? "Hai đoạn thẳng AB và CD được kéo dài bằng nét đứt"
              : pair === "song-song"
                ? "Hai đường thẳng AB và CD kéo dài mãi không cắt nhau"
                : "Hai đường thẳng AB và CD cắt nhau tại điểm E"
        }
        className="mt-3 block w-full"
        fontWeight={800}
      >
        {step >= 1 ? (
          <g data-enter={1} stroke="var(--unit-yen)" strokeWidth={3.5} strokeDasharray="9 7" strokeLinecap="round">
            {[
              [ab, ends.ab],
              [cd, ends.cd],
            ].map(([seg, end], index) => {
              const from = left(seg as Seg);
              return <line key={index} x1={from.x} y1={from.y} x2={(end as Point).x} y2={(end as Point).y} />;
            })}
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-enter={2}>
            {ends.meet ? (
              <>
                <circle cx={ends.meet.x} cy={ends.meet.y} r={6} fill="var(--oops)" />
                <text x={ends.meet.x + 4} y={ends.meet.y - 12} textAnchor="middle" fontSize={18} fill="var(--ink)">
                  E
                </text>
              </>
            ) : (
              [ab, cd].flatMap((seg, index) => [
                <polygon key={`l${index}`} points={arrowHead(left(seg), pointAtX(seg, LEFT + 40))} fill="var(--unit-yen)" />,
                <polygon key={`r${index}`} points={arrowHead(pointAtX(seg, RIGHT), pointAtX(seg, RIGHT - 40))} fill="var(--unit-yen)" />,
              ])
            )}
          </g>
        ) : null}
        {[ab, cd].map((seg, index) => (
          <line key={index} x1={seg[0].x} y1={seg[0].y} x2={seg[1].x} y2={seg[1].y} stroke="var(--ink)" strokeWidth={4.5} strokeLinecap="round" />
        ))}
        {[
          ["A", ab[0].x - 4, ab[0].y - 14],
          ["B", ab[1].x + 4, ab[1].y - 14],
          ["C", cd[0].x - 4, cd[0].y + 26],
          ["D", cd[1].x + 4, cd[1].y + 26],
        ].map(([name, x, y]) => (
          <text key={name as string} x={x as number} y={y as number} textAnchor="middle" fontSize={18} fill="var(--ink)">
            {name as string}
          </text>
        ))}
      </svg>
      <StepControls step={step} captions={captions(pair)} onChange={setStep} />
    </figure>
  );
}
