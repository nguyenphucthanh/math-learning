"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import { conversionHint, explainConversion, formatNumber, parseAnswer } from "@/lib/area-units";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, Flag, Trophy } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { raceCells, type RaceCell } from "../bai-tap";
import { boardPosition, gameReducer, initialGame, type GameAction, type GameState } from "./game-logic";

const FINISH = raceCells.length + 1;
const PLAYER_COLORS = ["var(--unit-mm2)", "var(--unit-dm2)"];
const PLAYER_NAMES = ["Người chơi 1", "Người chơi 2"];

function reducer(state: GameState, action: GameAction) {
  return gameReducer(state, action, raceCells);
}

/** Vị trí theo hai kiểu bàn cờ: điện thoại 4 cột, tablet 6 cột. */
function positionVars(index: number) {
  const phone = boardPosition(index, 4);
  const tablet = boardPosition(index, 6);
  return {
    "--c4": phone.column,
    "--r4": phone.row,
    "--c6": tablet.column,
    "--r6": tablet.row,
  } as React.CSSProperties;
}

function trackPoints(columns: number) {
  return Array.from({ length: FINISH + 1 }, (_, index) => {
    const { column, row } = boardPosition(index, columns);
    return `${column - 0.5},${row - 0.5}`;
  }).join(" ");
}

function CellFace({ cell }: { cell: RaceCell }) {
  if (cell.kind === "move") {
    const Icon = cell.steps > 0 ? ArrowUp : ArrowDown;
    return (
      <>
        <Icon aria-hidden className="size-5" />
        <span>
          {cell.steps > 0 ? "Tiến" : "Lùi"} {Math.abs(cell.steps)} ô
        </span>
      </>
    );
  }
  return (
    <>
      <span>{cell.source}</span>
      <span className="font-semibold">= ? {cell.to}</span>
    </>
  );
}

function Board({ positions, current }: { positions: number[]; current: number }) {
  return (
    <div className="relative grid auto-rows-fr grid-cols-4 gap-1.5 md:grid-cols-6">
      <svg aria-hidden viewBox="0 0 4 6" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full md:hidden">
        <polyline points={trackPoints(4)} fill="none" stroke="var(--sun)" strokeWidth={10} vectorEffect="non-scaling-stroke" />
      </svg>
      <svg aria-hidden viewBox="0 0 6 4" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full md:block">
        <polyline points={trackPoints(6)} fill="none" stroke="var(--sun)" strokeWidth={10} vectorEffect="non-scaling-stroke" />
      </svg>

      {Array.from({ length: FINISH + 1 }, (_, index) => {
        const cell = index >= 1 && index < FINISH ? raceCells[index - 1] : null;
        const isEnd = index === 0 || index === FINISH;
        return (
          <div
            key={index}
            style={positionVars(index)}
            className={cn(
              "relative z-10 flex min-h-[4.75rem] flex-col items-center justify-center rounded-2xl p-1 text-center text-sm leading-tight font-extrabold tabular-nums [grid-column:var(--c4)] [grid-row:var(--r4)] md:[grid-column:var(--c6)] md:[grid-row:var(--r6)] sm:text-base",
              isEnd && "bg-ink text-white",
              cell?.kind === "move" && "bg-sun text-foreground",
              cell?.kind === "question" && "bg-secondary text-ink",
            )}
          >
            {index === 0 ? "XUẤT PHÁT" : null}
            {index === FINISH ? (
              <>
                <Flag aria-hidden className="size-5" />
                ĐÍCH
              </>
            ) : null}
            {cell ? <CellFace cell={cell} /> : null}
          </div>
        );
      })}

      {positions.map((position, player) => (
        <span
          key={player}
          aria-hidden
          style={{ ...positionVars(position), background: PLAYER_COLORS[player] }}
          className={cn(
            "absolute z-20 size-8 rounded-full border-[3px] border-white shadow-[0_2px_6px_oklch(0.2_0.05_295/0.5)] transition-[left,top] duration-200 ease-out motion-reduce:transition-none",
            "left-[calc((var(--c4)-1)*25%+var(--shift))] top-[calc((var(--r4)-1)*16.666%+0.25rem)] md:left-[calc((var(--c6)-1)*16.666%+var(--shift))] md:top-[calc((var(--r6)-1)*25%+0.25rem)]",
            player === 0 ? "[--shift:0.25rem]" : "[--shift:2.25rem]",
            player === current && "ring-3 ring-foreground",
          )}
        />
      ))}
    </div>
  );
}

function Die({ value }: { value: number | null }) {
  const pips: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[28, 28], [72, 72]],
    3: [[28, 28], [50, 50], [72, 72]],
    4: [[28, 28], [72, 28], [28, 72], [72, 72]],
    5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
    6: [[28, 26], [72, 26], [28, 50], [72, 50], [28, 74], [72, 74]],
  };
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="size-16 shrink-0 animate-in spin-in-90 zoom-in-50 duration-300 motion-reduce:animate-none">
      <rect x={4} y={4} width={92} height={92} rx={20} fill="white" stroke="var(--ink)" strokeWidth={6} />
      {(pips[value ?? 5] ?? []).map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={8.5} fill="var(--ink)" />
      ))}
    </svg>
  );
}

function QuestionPanel({ cell, onAnswer }: { cell: Extract<RaceCell, { kind: "question" }>; onAnswer: (correct: boolean) => void }) {
  const [value, setValue] = useState("");
  const needsTwoSteps = cell.source === "7 m²";

  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    const parsed = parseAnswer(value);
    if (parsed !== null) onAnswer(parsed === cell.answer);
  }

  return (
    <form onSubmit={submit}>
      <p className="flex flex-wrap items-center gap-2 text-2xl font-bold">
        <span>{cell.source} =</span>
        <input
          aria-label="Điền số"
          autoFocus
          autoComplete="off"
          inputMode="numeric"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="h-13 w-32 rounded-xl border-[3px] border-input bg-white text-center text-2xl font-extrabold tabular-nums outline-none focus:border-ink"
        />
        <span>{cell.to}</span>
      </p>
      <p className="mt-2 text-lg leading-relaxed">
        {needsTwoSteps ? "Gợi ý: đổi qua dm² trước, 7 m² = 700 dm²." : conversionHint(cell.source, cell.to)}
      </p>
      <ActionButton type="submit" className="mt-3" disabled={parseAnswer(value) === null}>
        Trả lời
      </ActionButton>
    </form>
  );
}

export function RaceGame({ lessonSlug }: { lessonSlug: string }) {
  const [state, dispatch] = useReducer(reducer, initialGame);
  const { progress, markGameWon } = useLessonProgress(lessonSlug);

  useEffect(() => {
    if (state.phase !== "moving") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => dispatch({ type: "tick" }), reduced ? 0 : 280);
    return () => window.clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (state.phase === "won") markGameWon();
  }, [state.phase, markGameWon]);

  const position = state.positions[state.current] ?? 0;
  const cell = position >= 1 && position < FINISH ? raceCells[position - 1] : undefined;
  const playerName = state.positions.length > 1 ? PLAYER_NAMES[state.current] : "Con";

  return (
    <section className="mt-10">
      <h3 className="font-heading text-3xl font-bold text-ink">Đường đua số đo</h3>

      {state.phase === "setup" ? (
        <div className="mt-4 rounded-3xl bg-white p-5 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6">
          <ul className="max-w-[60ch] list-disc space-y-1 pl-5 text-lg leading-relaxed">
            <li>Gieo xúc xắc rồi đi đúng số ô.</li>
            <li>Đến ô đổi đơn vị thì điền số. Đúng thì đứng yên, sai thì về chỗ đứng trước lượt đó.</li>
            <li>Đến ô Tiến hoặc Lùi thì đi theo hướng dẫn.</li>
            <li>Ai về đích trước là thắng.</li>
          </ul>
          {progress.gameWon ? <p className="mt-3 text-lg font-bold text-good">Con đã về đích ít nhất một lần rồi đấy!</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <ActionButton onClick={() => dispatch({ type: "start", players: 1 })}>Chơi một mình</ActionButton>
            <ActionButton variant="sun" onClick={() => dispatch({ type: "start", players: 2 })}>
              Chơi hai người
            </ActionButton>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <Board positions={state.positions} current={state.current} />

          <div className="mt-4 rounded-3xl bg-white p-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:p-6" aria-live="polite">
            {state.phase === "won" ? (
              <div className="flex items-center gap-4">
                <Trophy aria-hidden className="size-14 shrink-0 text-unit-cm2" />
                <div>
                  <p className="font-heading text-3xl font-bold text-ink">{playerName} về đích rồi!</p>
                  <ActionButton className="mt-3" onClick={() => dispatch({ type: "reset" })}>
                    Chơi ván mới
                  </ActionButton>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-4">
                  {state.dice ? <Die key={state.rollCount} value={state.dice} /> : null}
                  <div>
                    <p className="flex items-center gap-2 text-lg font-extrabold">
                      <span aria-hidden className="size-4 rounded-full" style={{ background: PLAYER_COLORS[state.current] }} />
                      Lượt của {playerName}
                    </p>
                    {state.phase === "roll" ? (
                      <ActionButton className="mt-2" onClick={() => dispatch({ type: "roll", value: 1 + Math.floor(Math.random() * 6) })}>
                        Gieo xúc xắc
                      </ActionButton>
                    ) : null}
                    {state.phase === "moving" ? <p className="mt-1 text-lg font-semibold">Được {state.dice} chấm, đang đi…</p> : null}
                  </div>
                </div>

                {state.phase === "question" && cell?.kind === "question" ? (
                  <div className="mt-4">
                    <QuestionPanel key={state.rollCount} cell={cell} onAnswer={(correct) => dispatch({ type: "answer", correct })} />
                  </div>
                ) : null}

                {(state.phase === "right" || state.phase === "wrong") && cell?.kind === "question" ? (
                  <div className={cn("mt-4 rounded-2xl p-4 text-lg leading-relaxed", state.phase === "right" ? "bg-good-soft" : "bg-oops-soft")}>
                    <p>
                      <strong className={cn("font-extrabold", state.phase === "right" ? "text-good" : "text-oops")}>
                        {state.phase === "right" ? "Đúng rồi!" : `Chưa đúng. Đáp án là ${formatNumber(cell.answer)}.`}
                      </strong>{" "}
                      {explainConversion(cell.source, cell.to)}
                    </p>
                    <ActionButton className="mt-3" onClick={() => dispatch({ type: "next-turn" })}>
                      {state.phase === "wrong"
                        ? state.turnStart === 0
                          ? "Về ô xuất phát"
                          : `Về ô số ${state.turnStart}`
                        : state.positions.length > 1
                          ? "Đến lượt người kia"
                          : "Gieo tiếp"}
                    </ActionButton>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
