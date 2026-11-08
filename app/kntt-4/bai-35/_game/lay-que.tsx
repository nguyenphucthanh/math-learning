"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { hasShape, STICK_COUNT, sticks, VIEW } from "./que";

const PLAYER_COLORS = ["var(--unit-mm2)", "var(--unit-dm2)"];
const PLAYER_NAMES = ["Người chơi 1", "Người chơi 2"];

const stickName = (role: string, index: number) =>
  role === "tren" ? `cạnh trên của hình ${index + 1}` : role === "duoi" ? `cạnh dưới của hình ${index + 1}` : `que nghiêng số ${index + 1}`;

/** Trò chơi Lấy que tính (SGK tr. 124): hai người luân phiên lấy một que; kết thúc khi các que còn lại không tạo thành hình thoi hay hình bình hành. */
export function LayQue() {
  const [removed, setRemoved] = useState<number[]>([]);
  const taken = new Set(removed);
  const over = !hasShape(taken);
  const current = removed.length % 2;
  const last = removed.length % 2 === 0 ? 1 : 0;

  const take = (id: number) => {
    if (over || taken.has(id)) return;
    setRemoved([...removed, id]);
  };

  return (
    <section className="mt-10" aria-labelledby="lay-que-title">
      <h3 id="lay-que-title" className="font-heading text-3xl font-bold text-ink">
        Trò chơi: Lấy que tính
      </h3>
      <div className="mt-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
        <ul className="max-w-[60ch] list-disc space-y-1 pl-5 text-lg leading-relaxed">
          <li>Chơi theo cặp, con chơi với bố mẹ hoặc bạn. Hình xếp từ {STICK_COUNT} que tính.</li>
          <li>Đến lượt, người chơi chạm vào một que để lấy ra.</li>
          <li>Trò chơi kết thúc khi các que còn lại không tạo thành hình thoi hoặc hình bình hành.</li>
          <li>Hai người tự thỏa thuận: ai lấy que làm hết hình thì thắng hay thua?</li>
        </ul>

        <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="group" aria-label="Hình xếp từ 19 que tính" className="mx-auto mt-4 block w-full max-w-[420px]">
          {sticks.map((stick) => {
            const gone = taken.has(stick.id);
            const [a, b] = stick.seg;
            return (
              <g
                key={stick.id}
                role="button"
                tabIndex={gone || over ? -1 : 0}
                aria-label={`Lấy que ${stickName(stick.role, stick.index)}`}
                aria-disabled={gone || over}
                onClick={() => take(stick.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    take(stick.id);
                  }
                }}
                className={cn("outline-none focus-visible:[&>.stick]:stroke-[var(--sun)]", gone || over ? "cursor-default" : "cursor-pointer")}
              >
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="transparent" strokeWidth={42} strokeLinecap="round" />
                <line
                  className="stick"
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={gone ? "var(--input)" : "var(--ink)"}
                  strokeWidth={gone ? 2.5 : 7}
                  strokeDasharray={gone ? "3 6" : undefined}
                  strokeLinecap="round"
                />
              </g>
            );
          })}
        </svg>

        <div className="mt-3" aria-live="polite">
          <p className="text-lg font-semibold">
            Đã lấy {removed.length} que, còn {STICK_COUNT - removed.length} que.
          </p>
          {over ? (
            <>
              <p className="mt-2 text-xl font-extrabold text-ink">
                Hết hình thoi và hình bình hành rồi! {PLAYER_NAMES[last]} là người vừa lấy que cuối cùng.
              </p>
              <ActionButton className="mt-3" onClick={() => setRemoved([])}>
                Chơi ván mới
              </ActionButton>
            </>
          ) : (
            <p className="mt-1 flex items-center gap-2 text-lg font-extrabold">
              <span aria-hidden className="size-4 rounded-full" style={{ background: PLAYER_COLORS[current] }} />
              Lượt của {PLAYER_NAMES[current]}
            </p>
          )}
          {!over && removed.length > 0 ? (
            <ActionButton variant="soft" className="mt-2" onClick={() => setRemoved([])}>
              Chơi lại từ đầu
            </ActionButton>
          ) : null}
        </div>
      </div>
    </section>
  );
}
