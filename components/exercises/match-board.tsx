"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import type { MatchQuestion } from "./types";

type Point = { x: number; y: number };
type Geometry = { left: Point[]; right: Point[] };
type Drag = { from: number; point: Point; over: number | null };

type MatchBoardProps = {
  pairs: MatchQuestion["pairs"];
  rightOrder: number[];
  solved: boolean;
  wrongCount: number;
  onWrong: () => void;
  onSolved: (firstTry: boolean) => void;
};

const tile = "min-h-14 rounded-2xl border-[3px] px-3 py-2 text-lg leading-snug font-bold transition-colors";
const done = "border-good bg-good-soft text-good";

function curve(from: Point, to: Point) {
  const dx = (to.x - from.x) / 2;
  return `M ${from.x} ${from.y} C ${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`;
}

/**
 * Bảng nối cặp. Hai cách làm, dùng chung một trạng thái:
 * - Kéo chấm bên phải ô trái sang ô phải (Pointer Events: chuột, cảm ứng, bút).
 * - Chạm ô trái rồi chạm ô phải (cách thay thế, cũng là cách dùng bàn phím và trình đọc màn hình).
 * Chỉ chấm kéo có `touch-action: none`; phần còn lại của ô vẫn cuộn trang được.
 */
export function MatchBoard({ pairs, rightOrder, solved, wrongCount, onWrong, onSolved }: MatchBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const handleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rightRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [flash, setFlash] = useState<{ from: number; to: number } | null>(null);

  const isMatched = (index: number) => solved || matched.includes(index);

  const measure = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const box = board.getBoundingClientRect();
    const left: Point[] = [];
    const right: Point[] = [];
    for (let index = 0; index < pairs.length; index++) {
      const handle = handleRefs.current[index];
      const target = rightRefs.current[index];
      if (!handle || !target) return;
      const h = handle.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      left.push({ x: h.left + h.width / 2 - box.left, y: h.top + h.height / 2 - box.top });
      right.push({ x: t.left - box.left, y: t.top + t.height / 2 - box.top });
    }
    setGeometry({ left, right });
  }, [pairs.length]);

  // Đo lại khi khung đổi kích thước: xoay tablet, nạp font, ô xuống dòng.
  useLayoutEffect(() => {
    measure();
    const board = boardRef.current;
    if (!board || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(board);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => () => clearTimeout(flashTimer.current), []);

  function resolve(from: number, to: number) {
    if (isMatched(to)) return;
    if (from === to) {
      const next = [...matched, to];
      setMatched(next);
      if (next.length === pairs.length) onSolved(wrongCount === 0);
    } else {
      onWrong();
      setFlash({ from, to });
      clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlash(null), 900);
    }
    setSelected(null);
  }

  function toPoint(event: PointerEvent): Point {
    const box = boardRef.current?.getBoundingClientRect();
    return { x: event.clientX - (box?.left ?? 0), y: event.clientY - (box?.top ?? 0) };
  }

  /** Ô phải dưới ngón tay. Dùng elementFromPoint vì sau khi bắt con trỏ, event.target luôn là chấm kéo. */
  function targetAt(event: PointerEvent): number | null {
    const element = document.elementFromPoint?.(event.clientX, event.clientY);
    const tile = element?.closest<HTMLElement>("[data-right]");
    if (!tile) return null;
    const index = Number(tile.dataset.right);
    return isMatched(index) ? null : index;
  }

  function startDrag(event: PointerEvent<HTMLSpanElement>, index: number) {
    if (isMatched(index) || event.button !== 0) return;
    try {
      event.currentTarget.setPointerCapture?.(event.pointerId);
    } catch {
      // Con trỏ giả lập hoặc đã hết hiệu lực: vẫn kéo được, chỉ không được bắt.
    }
    setSelected(null);
    setDrag({ from: index, point: toPoint(event), over: null });
  }

  function moveDrag(event: PointerEvent<HTMLSpanElement>, index: number) {
    if (drag?.from !== index) return;
    setDrag({ from: index, point: toPoint(event), over: targetAt(event) });
  }

  function endDrag(event: PointerEvent<HTMLSpanElement>, index: number) {
    if (drag?.from !== index) return;
    const to = targetAt(event);
    setDrag(null);
    if (to !== null) resolve(index, to);
  }

  const active = drag?.from ?? selected;

  return (
    <div ref={boardRef} className="relative">
      <div className="grid grid-cols-[3fr_2fr] gap-x-6 gap-y-2 sm:gap-x-10">
        <div className="grid content-start gap-2">
          {pairs.map((pair, index) => (
            <div key={pair.left} className="relative">
              <button
                type="button"
                aria-pressed={selected === index}
                disabled={isMatched(index)}
                onClick={() => setSelected(selected === index ? null : index)}
                className={cn(
                  tile,
                  "block h-full w-full pr-14 text-left",
                  isMatched(index)
                    ? done
                    : active === index
                      ? "border-ink bg-ink text-white"
                      : "border-input bg-white hover:bg-secondary",
                )}
              >
                {pair.left}
              </button>
              {/* Chấm kéo: vùng chạm 44px, chỉ dành cho con trỏ. Bàn phím và trình đọc màn hình dùng nút bên cạnh. */}
              <span
                ref={(element) => {
                  handleRefs.current[index] = element;
                }}
                aria-hidden
                data-handle={index}
                onPointerDown={(event) => startDrag(event, index)}
                onPointerMove={(event) => moveDrag(event, index)}
                onPointerUp={(event) => endDrag(event, index)}
                onPointerCancel={() => setDrag(null)}
                onLostPointerCapture={() => setDrag(null)}
                onContextMenu={(event) => event.preventDefault()}
                className={cn(
                  "absolute top-1/2 right-1 flex size-11 -translate-y-1/2 touch-none items-center justify-center select-none",
                  isMatched(index) ? "pointer-events-none" : "cursor-grab active:cursor-grabbing",
                )}
              >
                <span
                  className={cn(
                    "size-6 rounded-full border-[3px] border-white shadow-[0_0_0_2px_var(--ink)]",
                    isMatched(index) ? "bg-good shadow-[0_0_0_2px_var(--good)]" : active === index ? "bg-sun" : "bg-ink",
                  )}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="grid content-start gap-2">
          {rightOrder.map((index) => (
            <button
              key={pairs[index].right}
              ref={(element) => {
                rightRefs.current[index] = element;
              }}
              type="button"
              data-right={index}
              disabled={isMatched(index)}
              onClick={() => {
                if (active !== null) resolve(active, index);
              }}
              className={cn(
                tile,
                "text-center tabular-nums",
                isMatched(index)
                  ? done
                  : flash?.to === index
                    ? "border-oops bg-oops-soft text-oops"
                    : drag?.over === index
                      ? "border-ink bg-secondary"
                      : "border-input bg-white hover:bg-secondary",
              )}
            >
              {pairs[index].right}
            </button>
          ))}
        </div>
      </div>

      {geometry ? (
        <svg aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
          {pairs.map((_, index) =>
            isMatched(index) ? (
              <g key={index} stroke="var(--good)" fill="var(--good)">
                <path d={curve(geometry.left[index], geometry.right[index])} fill="none" strokeWidth={4} strokeLinecap="round" />
                <circle cx={geometry.right[index].x} cy={geometry.right[index].y} r={5} stroke="none" />
              </g>
            ) : null,
          )}
          {flash ? (
            <path
              d={curve(geometry.left[flash.from], geometry.right[flash.to])}
              fill="none"
              stroke="var(--oops)"
              strokeWidth={4}
              strokeLinecap="round"
              strokeDasharray="2 8"
            />
          ) : null}
          {drag ? (
            <g stroke="var(--ink)" fill="var(--ink)">
              <path d={curve(geometry.left[drag.from], drag.point)} fill="none" strokeWidth={4} strokeLinecap="round" />
              <circle cx={drag.point.x} cy={drag.point.y} r={9} stroke="none" />
            </g>
          ) : null}
        </svg>
      ) : null}
    </div>
  );
}
