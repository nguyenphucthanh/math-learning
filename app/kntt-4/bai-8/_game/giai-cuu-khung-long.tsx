"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { handAngles } from "@/components/math/dong-ho";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { buocTien, gioCacO, laODich, loaiGoc, loaiGocO, O_CUOI, oDen } from "./ban-co";

const PLAYER_COLORS = ["var(--unit-mm2)", "var(--unit-dm2)"];
const PLAYER_NAMES = ["Người chơi 1", "Người chơi 2"];

const f = (n: number) => Math.round(n * 10) / 10;

/** Đồng hồ nhỏ chỉ giờ đúng, đủ lớn để thấy hai kim; chỉ ghi số 12, 3, 6, 9. */
function DongHoNho({ hour }: { hour: number }) {
  const angles = handAngles(hour);
  const tip = (deg: number, r: number) => ({ x: f(30 + r * Math.sin((deg * Math.PI) / 180)), y: f(30 - r * Math.cos((deg * Math.PI) / 180)) });
  const h = tip(angles.hour, 14);
  const m = tip(angles.minute, 21);
  return (
    <svg viewBox="0 0 60 60" aria-hidden className="block size-full">
      <circle cx={30} cy={30} r={27} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
      {[0, 90, 180, 270].map((deg) => {
        const a = tip(deg, 22);
        const b = tip(deg, 26);
        return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--ink)" strokeWidth={2} />;
      })}
      <line x1={30} y1={30} x2={h.x} y2={h.y} stroke="var(--unit-ta)" strokeWidth={4.5} strokeLinecap="round" />
      <line x1={30} y1={30} x2={m.x} y2={m.y} stroke="var(--unit-second)" strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

type Pending = { dice: number; target: number };

/** Trò chơi Giải cứu khủng long (SGK tr. 29-30): gieo xúc xắc, tiến 1 hoặc 2 ô, nêu đúng loại góc của đồng hồ ở ô đến thì được ở lại. */
export function GiaiCuuKhungLong() {
  const [positions, setPositions] = useState<[number, number]>([0, 0]);
  const [turn, setTurn] = useState<0 | 1>(0);
  const [pending, setPending] = useState<Pending | null>(null);
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState<0 | 1 | null>(null);

  const roll = () => {
    const dice = 1 + Math.floor(Math.random() * 6);
    setPending({ dice, target: oDen(positions[turn], dice) });
    setMessage("");
  };

  const answer = (kind: string) => {
    if (!pending) return;
    const correct = loaiGocO(pending.target);
    const player = PLAYER_NAMES[turn];
    if (kind === correct) {
      const next: [number, number] = [...positions];
      next[turn] = pending.target;
      setPositions(next);
      if (laODich(pending.target)) {
        setWinner(turn);
        setMessage(`Đúng rồi, góc ${correct}! ${player} đã đến ô đích và giải cứu được khủng long.`);
      } else {
        setMessage(`Đúng rồi, đây là góc ${correct}! ${player} ở lại ô ${pending.target}.`);
      }
    } else {
      setMessage(`Chưa đúng. Hai kim ở ô ${pending.target} tạo thành góc ${correct}. ${player} quay về ô ${positions[turn] === 0 ? "xuất phát" : positions[turn]}.`);
    }
    setPending(null);
    if (!(kind === correct && laODich(pending.target))) setTurn(turn === 0 ? 1 : 0);
  };

  const reset = () => {
    setPositions([0, 0]);
    setTurn(0);
    setPending(null);
    setMessage("");
    setWinner(null);
  };

  const cells = Array.from({ length: O_CUOI + 1 }, (_, o) => o);

  return (
    <section className="mt-10" aria-labelledby="khung-long-title">
      <h3 id="khung-long-title" className="font-heading text-3xl font-bold text-ink">
        Trò chơi: Giải cứu khủng long
      </h3>
      <div className="mt-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
        <ul className="max-w-[60ch] list-disc space-y-1 pl-5 text-lg leading-relaxed">
          <li>Chơi theo cặp, con chơi với bố mẹ hoặc bạn. Hai người đều bắt đầu ở ô xuất phát.</li>
          <li>Đến lượt, người chơi gieo xúc xắc: mặt lẻ thì tiến 1 ô, mặt chẵn thì tiến 2 ô.</li>
          <li>Nhìn đồng hồ ở ô đến, nói hai kim tạo thành góc nhọn, góc vuông, góc tù hay góc bẹt. Đúng thì được ở lại ô đó, sai thì quay về ô cũ.</li>
          <li>Ai đến được một trong hai ô đích (màu xanh) trước thì thắng.</li>
        </ul>

        <ol className="mt-4 grid grid-cols-4 gap-2" aria-label="Bàn chơi gồm 17 ô, từ ô xuất phát đến hai ô đích">
          {cells.map((o) => {
            const here = positions.map((p, i) => (p === o ? i : -1)).filter((i) => i >= 0);
            const isTarget = pending?.target === o;
            return (
              <li
                key={o}
                aria-label={o === 0 ? "Ô xuất phát" : `Ô ${o}${laODich(o) ? " (đích)" : ""}: đồng hồ chỉ ${gioCacO[o - 1]} giờ`}
                className={cn(
                  "flex min-h-24 flex-col items-center rounded-2xl border-2 p-1",
                  o === 0 ? "bg-sun/30" : laODich(o) ? "bg-unit-dm2-soft" : "bg-unit-yen-soft",
                  isTarget ? "border-ink" : "border-transparent",
                )}
              >
                <span className="text-sm font-extrabold text-ink tabular-nums">{o === 0 ? "Xuất phát" : o}</span>
                {o === 0 ? <span aria-hidden className="mt-1 size-12 rounded-full bg-sun/60" /> : <span className="mt-0.5 size-12"><DongHoNho hour={gioCacO[o - 1]} /></span>}
                <span className="mt-0.5 flex min-h-3.5 gap-1" aria-hidden>
                  {here.map((i) => (
                    <span key={i} className="size-3.5 rounded-full" style={{ background: PLAYER_COLORS[i] }} />
                  ))}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-2 flex flex-wrap gap-x-4 text-base font-bold">
          {PLAYER_NAMES.map((name, i) => (
            <span key={name} className="flex items-center gap-1.5">
              <span aria-hidden className="size-3.5 rounded-full" style={{ background: PLAYER_COLORS[i] }} />
              {name}: {positions[i] === 0 ? "xuất phát" : `ô ${positions[i]}`}
            </span>
          ))}
        </p>

        <div className="mt-4" aria-live="polite">
          {winner !== null ? (
            <>
              <p className="text-xl font-extrabold text-ink">{message}</p>
              <ActionButton className="mt-3" onClick={reset}>
                Chơi ván mới
              </ActionButton>
            </>
          ) : pending ? (
            <>
              <p className="text-lg font-extrabold">
                {PLAYER_NAMES[turn]} gieo được mặt {pending.dice}, tiến {buocTien(pending.dice)} ô đến ô {pending.target}.
              </p>
              <p className="mt-1 text-lg font-semibold">Hai kim đồng hồ ở ô {pending.target} tạo thành góc gì?</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {loaiGoc.map((kind) => (
                  <ActionButton key={kind} variant="soft" onClick={() => answer(kind)}>
                    Góc {kind}
                  </ActionButton>
                ))}
              </div>
            </>
          ) : (
            <>
              {message ? <p className="mb-2 text-lg font-semibold">{message}</p> : null}
              <p className="flex items-center gap-2 text-lg font-extrabold">
                <span aria-hidden className="size-4 rounded-full" style={{ background: PLAYER_COLORS[turn] }} />
                Lượt của {PLAYER_NAMES[turn]}
              </p>
              <ActionButton className="mt-2" variant="sun" onClick={roll}>
                Gieo xúc xắc
              </ActionButton>
              {positions.some((p) => p > 0) || message ? (
                <ActionButton variant="soft" className="mt-2 ml-2" onClick={reset}>
                  Chơi lại từ đầu
                </ActionButton>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
