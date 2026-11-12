"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import { cn } from "@/lib/utils";
import { Flag, Trophy } from "lucide-react";
import { useEffect, useReducer } from "react";
import { cardText, cards, exactText, gameReducer, initialGame, isRight, shuffle, TRACK } from "./duong-dua";

function Track({ position }: { position: number }) {
  return (
    <div className="grid grid-cols-7 gap-1.5" role="img" aria-label={`Ngựa đang ở ô ${position} trên ${TRACK}`}>
      {Array.from({ length: TRACK + 1 }, (_, index) => (
        <div
          key={index}
          className={cn(
            "relative flex min-h-14 items-center justify-center rounded-xl text-sm font-extrabold sm:text-base",
            index === 0 || index === TRACK ? "bg-ink text-white" : "bg-secondary text-ink",
          )}
        >
          {index === TRACK ? <Flag aria-hidden className="size-5" /> : index === 0 ? "Đi" : index}
          {index === position ? (
            <span aria-hidden className="absolute size-7 rounded-full border-[3px] border-white bg-unit-mm2 shadow-[0_2px_6px_oklch(0.2_0.05_295/0.5)] transition-transform motion-reduce:transition-none" />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** Trò chơi "Đường đua" (SGK trang 28) cho một người chơi: chọn Đúng hay Sai bằng ước lượng. */
export function DuongDua({ lessonSlug }: { lessonSlug: string }) {
  const [state, dispatch] = useReducer(gameReducer, initialGame);
  const { progress, markGameWon } = useLessonProgress(lessonSlug);

  useEffect(() => {
    if (state.phase === "won") markGameWon();
  }, [state.phase, markGameWon]);

  const card = state.deck[state.index];
  const start = () => dispatch({ type: "start", deck: shuffle(cards) });

  return (
    <section className="mt-10">
      <h3 className="font-heading text-3xl font-bold text-ink">Đường đua ước lượng</h3>

      {state.phase === "setup" ? (
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
          <ul className="max-w-[60ch] list-disc space-y-1 pl-5 text-lg leading-relaxed">
            <li>Mỗi lượt có một tấm bìa ghi sẵn một phép tính.</li>
            <li>Con ước lượng rồi chọn Đúng hay Sai. Đừng đặt tính vội.</li>
            <li>Chọn chính xác thì ngựa tiến một ô, chọn nhầm thì đứng yên.</li>
            <li>Ngựa về đích trước khi hết {cards.length} tấm bìa là thắng.</li>
          </ul>
          {progress.gameWon ? <p className="mt-3 text-lg font-bold text-good">Con đã về đích ít nhất một lần rồi đấy!</p> : null}
          <ActionButton className="mt-4" onClick={start}>
            Bắt đầu
          </ActionButton>
        </div>
      ) : (
        <div className="mt-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6" aria-live="polite">
          <Track position={state.position} />

          {state.phase === "won" || state.phase === "lost" ? (
            <div className="mt-4 flex items-center gap-4">
              <Trophy aria-hidden className="size-14 shrink-0 text-unit-cm2" />
              <div>
                <p className="font-heading text-3xl font-bold text-ink">
                  {state.phase === "won" ? "Ngựa về đích rồi!" : `Hết bìa, ngựa mới tới ô ${state.position}.`}
                </p>
                <ActionButton className="mt-3" onClick={start}>
                  Chơi ván mới
                </ActionButton>
              </div>
            </div>
          ) : (
            <>
              <p className="mt-4 text-base font-bold text-muted-foreground">
                Tấm bìa {state.index + 1}/{state.deck.length}
              </p>
              <p className="mt-1 text-3xl font-extrabold tabular-nums text-ink sm:text-4xl">{cardText(card)}</p>

              {state.phase === "ask" ? (
                <div className="mt-4 flex gap-3">
                  <ActionButton className="flex-1" onClick={() => dispatch({ type: "answer", says: "dung" })}>
                    Đúng
                  </ActionButton>
                  <ActionButton variant="sun" className="flex-1" onClick={() => dispatch({ type: "answer", says: "sai" })}>
                    Sai
                  </ActionButton>
                </div>
              ) : (
                <div className={cn("mt-4 rounded-2xl p-4 text-lg leading-relaxed", state.moved ? "bg-good-soft" : "bg-oops-soft")}>
                  <p>
                    <strong className={cn("font-extrabold", state.moved ? "text-good" : "text-oops")}>
                      {state.moved ? "Chọn đúng, ngựa tiến một ô." : "Chưa đúng, ngựa đứng yên."}
                    </strong>{" "}
                    Phép tính trên bìa {isRight(card) ? "đúng" : `sai, kết quả đúng là ${exactText(card)}`}. {card.estimate}
                  </p>
                  <ActionButton className="mt-3" onClick={() => dispatch({ type: "next" })}>
                    {state.position >= TRACK ? "Về đích" : "Tấm bìa tiếp"}
                  </ActionButton>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
