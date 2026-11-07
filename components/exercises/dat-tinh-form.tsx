"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { DatTinh } from "@/components/math/dat-tinh";
import { formatNumber } from "@/lib/area-units";
import { PLACE_NAMES } from "@/lib/column-add";
import { cn } from "@/lib/utils";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Feedback } from "./feedback";
import type { DatTinhQuestion } from "./types";

type Row = "a" | "b" | "sum";
type Blank = { key: string; row: Row; position: number; answer: number };

/** Tổng hoặc hiệu của câu đặt tính. */
export function resultOf(question: DatTinhQuestion): number {
  return question.op === "-" ? question.a - question.b : question.a + question.b;
}

function rowName(row: Row, question: DatTinhQuestion): string {
  if (row === "sum") return question.op === "-" ? "hiệu" : "tổng";
  return row === "a" ? "số thứ nhất" : "số thứ hai";
}

function digitAt(value: number, position: number): number | null {
  const text = String(value);
  return position < text.length ? Number(text[text.length - 1 - position]) : null;
}

/** Cột nào cần ô trống, theo thứ tự tính: hàng đơn vị trước, trong một hàng thì từ trên xuống. */
export function blanksOf(question: DatTinhQuestion): Blank[] {
  const { a, b, hide } = question;
  const sum = resultOf(question);
  const wanted: { row: Row; position: number }[] = hide
    ? [
        ...(hide.a ?? []).map((position) => ({ row: "a" as const, position })),
        ...(hide.b ?? []).map((position) => ({ row: "b" as const, position })),
        ...(hide.sum ?? []).map((position) => ({ row: "sum" as const, position })),
      ]
    : Array.from({ length: String(sum).length }, (_, position) => ({ row: "sum" as const, position }));
  const order: Row[] = ["a", "b", "sum"];
  return wanted
    .map(({ row, position }) => ({
      key: `${row}-${position}`,
      row,
      position,
      answer: digitAt({ a, b, sum }[row], position)!,
    }))
    .sort((x, y) => x.position - y.position || order.indexOf(x.row) - order.indexOf(y.row));
}

export function defaultPrompt(question: DatTinhQuestion): string {
  return question.prompt ?? `Đặt tính rồi tính: ${formatNumber(question.a)} ${question.op === "-" ? "−" : "+"} ${formatNumber(question.b)}`;
}

export function DatTinhForm({
  question,
  solved,
  onSolved,
}: {
  question: DatTinhQuestion;
  solved: boolean;
  onSolved: (firstTry: boolean) => void;
}) {
  const { a, b } = question;
  const minus = question.op === "-";
  const sum = resultOf(question);
  const size = String(sum).length;
  const blanks = blanksOf(question);
  const [values, setValues] = useState<Record<string, string>>({});
  const [carries, setCarries] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean | undefined>>({});
  const [wrongCount, setWrongCount] = useState(0);
  const [notice, setNotice] = useState<string>();
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});
  const showCarry = !question.hide;

  function focusAt(index: number) {
    const target = blanks[index];
    if (target) inputs.current[target.key]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key === "Backspace" && !event.currentTarget.value) focusAt(index - 1);
  }

  function setDigit(blank: Blank, index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setValues({ ...values, [blank.key]: digit });
    setChecked({ ...checked, [blank.key]: undefined });
    if (digit) focusAt(index + 1);
  }

  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (solved) return;
    if (blanks.some((blank) => !values[blank.key])) {
      setNotice(question.hide ? "Con điền đủ các ô trống rồi kiểm tra nhé." : `Con điền đủ các chữ số của ${minus ? "hiệu" : "tổng"} rồi kiểm tra nhé.`);
      return;
    }
    setNotice(undefined);
    const results = Object.fromEntries(blanks.map((blank) => [blank.key, Number(values[blank.key]) === blank.answer]));
    setChecked(results);
    if (Object.values(results).every(Boolean)) onSolved(wrongCount === 0);
    else setWrongCount(wrongCount + 1);
  }

  function cell(row: Row, position: number): ReactNode {
    const value = { a, b, sum }[row];
    const digit = digitAt(value, position);
    const blankIndex = blanks.findIndex((blank) => blank.row === row && blank.position === position);
    if (blankIndex === -1) return digit === null ? null : <span>{digit}</span>;
    const blank = blanks[blankIndex];
    const status = solved ? true : checked[blank.key];
    return (
      <input
        ref={(element) => {
          inputs.current[blank.key] = element;
        }}
        aria-label={`Chữ số hàng ${PLACE_NAMES[position]} của ${rowName(row, question)}`}
        autoComplete="off"
        inputMode="numeric"
        maxLength={2}
        disabled={solved}
        value={solved ? String(blank.answer) : (values[blank.key] ?? "")}
        onChange={(event) => setDigit(blank, blankIndex, event.target.value)}
        onKeyDown={(event) => onKeyDown(event, blankIndex)}
        onFocus={(event) => event.currentTarget.select()}
        className={cn(
          "h-11 w-full min-w-0 rounded-xl border-[3px] bg-white text-center font-heading text-3xl font-bold tabular-nums outline-none focus:border-ink disabled:opacity-100",
          status === true && "border-good bg-good-soft text-good",
          status === false && "border-oops bg-oops-soft text-oops",
          status === undefined && "border-input",
        )}
      />
    );
  }

  const positions = Array.from({ length: size }, (_, index) => size - 1 - index);

  return (
    <form onSubmit={submit}>
      <p className="mb-3 max-w-[65ch] text-xl leading-relaxed font-semibold">{defaultPrompt(question)}</p>
      <div className="py-1">
        <DatTinh
          sign={minus ? "−" : "+"}
          label={`Phép ${minus ? "trừ" : "cộng"} ${formatNumber(a)} ${minus ? "−" : "+"} ${formatNumber(b)}`}
          carry={
            showCarry
              ? positions.map((position) =>
                  position === 0 ? null : (
                    <input
                      key={position}
                      aria-label={`Số nhớ sang hàng ${PLACE_NAMES[position]} (không bắt buộc)`}
                      autoComplete="off"
                      inputMode="numeric"
                      maxLength={2}
                      disabled={solved}
                      value={carries[position] ?? ""}
                      onChange={(event) => setCarries({ ...carries, [position]: event.target.value.replace(/\D/g, "").slice(-1) })}
                      className="h-8 w-full max-w-9 min-w-0 rounded-lg border-2 border-dotted border-input bg-white text-center text-lg font-bold text-ink tabular-nums outline-none focus:border-ink disabled:opacity-60"
                    />
                  ),
                )
              : undefined
          }
          top={positions.map((position) => cell("a", position))}
          bottom={positions.map((position) => cell("b", position))}
          result={positions.map((position) => cell("sum", position))}
        />
      </div>
      {showCarry && !solved ? (
        <p className="mt-2 text-base font-semibold text-muted-foreground">
          Ô nhỏ phía trên để con ghi số nhớ, không bắt buộc.
        </p>
      ) : null}
      {solved ? null : (
        <ActionButton type="submit" className="mt-4 w-full sm:w-auto">
          Kiểm tra
        </ActionButton>
      )}
      <Feedback question={question} solved={solved} wrongCount={wrongCount} notice={notice} />
    </form>
  );
}
