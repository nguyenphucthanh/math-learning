"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { BangKiemDem } from "@/components/math/kiem-dem";
import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";
import { useState } from "react";
import { addRoll, product, rabbitOf, rollTwo, tally, TRACK, winner, type Rabbit, type Roll } from "./dua-tho";

const names: Record<Rabbit, string> = { chan: "Thỏ Chẵn", le: "Thỏ Lẻ" };

function Lane({ name, steps, color }: { name: string; steps: number; color: string }) {
  return (
    <div>
      <p className="text-base font-extrabold" style={{ color }}>
        {name}: ô {steps}/{TRACK}
      </p>
      <div className="mt-1 grid grid-cols-7 gap-1" role="img" aria-label={`${name} đang ở ô ${steps} trên ${TRACK}`}>
        {Array.from({ length: TRACK + 1 }, (_, index) => (
          <div key={index} className={cn("relative flex min-h-11 items-center justify-center rounded-lg text-sm font-extrabold", index === 0 || index === TRACK ? "bg-ink text-white" : "bg-secondary text-ink")}>
            {index === TRACK ? <Flag aria-hidden className="size-4" /> : index === 0 ? "Đi" : index}
            {index === steps ? <span aria-hidden className="absolute size-6 rounded-full border-[3px] border-white shadow-[0_2px_6px_oklch(0.2_0.05_295/0.5)] motion-reduce:transition-none" style={{ background: color }} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Trò chơi "Đua thỏ" (SGK trang 44): gieo hai xúc xắc, tích chẵn thì thỏ Chẵn tiến, tích lẻ thì thỏ Lẻ tiến.
 * Chỉ gieo khi con bấm nên ngẫu nhiên không chạy lúc render. `rng` truyền vào để test. Không lưu tiến độ.
 */
export function DuaTho({ rng = Math.random }: { rng?: () => number }) {
  const [rolls, setRolls] = useState<Roll[]>([]);
  const { chan, le } = tally(rolls);
  const last = rolls[rolls.length - 1];
  const won = winner(rolls);

  return (
    <section className="mt-10">
      <h3 className="font-heading text-3xl font-bold text-ink">Đua thỏ Chẵn – Lẻ</h3>
      <div className="mt-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
        <ul className="max-w-[60ch] list-disc space-y-1 pl-5 text-lg leading-relaxed">
          <li>Bấm “Gieo” để gieo hai xúc xắc, rồi nhân hai số chấm.</li>
          <li>Tích là số chẵn thì thỏ Chẵn tiến 1 ô. Tích là số lẻ thì thỏ Lẻ tiến 1 ô.</li>
          <li>Thỏ nào đến đích trước? Nhìn bảng kiểm đếm để biết mỗi sự kiện xuất hiện mấy lần.</li>
        </ul>

        <div className="mt-4 grid gap-3">
          <Lane name={names.chan} steps={chan} color="var(--unit-ta)" />
          <Lane name={names.le} steps={le} color="var(--unit-second)" />
        </div>

        <div className="mt-4 min-h-24 rounded-2xl bg-secondary p-4" aria-live="polite">
          {last ? (
            <>
              <p className="text-2xl font-extrabold text-ink tabular-nums">
                {last[0]} × {last[1]} = {product(last)}
              </p>
              <p className="mt-1 text-lg font-semibold">
                {product(last)} là số {rabbitOf(last) === "chan" ? "chẵn" : "lẻ"}: {names[rabbitOf(last)]} tiến 1 ô. Đã gieo {rolls.length} lần.
              </p>
            </>
          ) : (
            <p className="text-lg font-semibold">Chưa gieo lần nào.</p>
          )}
        </div>

        <div className="mt-4">
          <BangKiemDem
            maxCount={12}
            rows={[
              { label: "Tích chẵn", count: chan, color: "var(--unit-ta)" },
              { label: "Tích lẻ", count: le, color: "var(--unit-second)" },
            ]}
          />
        </div>

        {won ? (
          <p className="mt-4 text-lg leading-relaxed font-bold text-good">
            {names[won]} đến đích trước! Tích chẵn xuất hiện {chan} lần, tích lẻ xuất hiện {le} lần. Con chơi ván mới, bảng kiểm đếm có giống không?
          </p>
        ) : null}

        <div className="mt-4 flex gap-3">
          <ActionButton className="flex-1" disabled={won !== null} onClick={() => setRolls((current) => addRoll(current, rollTwo(rng)))}>
            Gieo
          </ActionButton>
          <ActionButton variant="soft" disabled={rolls.length === 0} onClick={() => setRolls([])}>
            Chơi ván mới
          </ActionButton>
        </div>
      </div>
    </section>
  );
}
