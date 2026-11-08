import { ActionButton } from "@/components/lesson/action-button";
import { formatNumber, parseAnswer } from "@/lib/area-units";
import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";
import { DatTinhForm } from "./dat-tinh-form";
import { Feedback } from "./feedback";
import { MatchBoard } from "./match-board";
import type { ChoiceQuestion, CompareQuestion, FillQuestion, MatchQuestion, Part, Question, ShapeFigure, Sign, WordQuestion } from "./types";

type QuestionProps<Q extends Question> = {
  question: Q;
  solved: boolean;
  onSolved: (firstTry: boolean) => void;
};

/** Các ô điền số nằm xen trong câu. Dùng chung cho điền số và bài có lời văn. */
function BlanksForm({
  lines,
  question,
  solved,
  onSolved,
}: {
  lines: Part[][];
  question: Question;
  solved: boolean;
  onSolved: (firstTry: boolean) => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean | undefined>>({});
  const [wrongCount, setWrongCount] = useState(0);
  const [notice, setNotice] = useState<string>();

  const blanks = lines.flatMap((line, lineIndex) =>
    line.flatMap((part, partIndex) =>
      typeof part === "string" ? [] : [{ key: `${lineIndex}-${partIndex}`, answer: part.answer }],
    ),
  );

  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (solved) return;
    if (blanks.some((blank) => parseAnswer(values[blank.key] ?? "") === null)) {
      setNotice("Con điền số vào đủ các ô rồi kiểm tra nhé.");
      return;
    }
    setNotice(undefined);
    const results = Object.fromEntries(
      blanks.map((blank) => [blank.key, parseAnswer(values[blank.key]) === blank.answer]),
    );
    setChecked(results);
    if (Object.values(results).every(Boolean)) onSolved(wrongCount === 0);
    else setWrongCount(wrongCount + 1);
  }

  return (
    <form onSubmit={submit}>
      <div className="space-y-3">
        {lines.map((line, lineIndex) => (
          <p key={lineIndex} className="flex flex-wrap items-center gap-x-2 gap-y-2 text-2xl leading-snug font-bold">
            {line.map((part, partIndex) => {
              if (typeof part === "string") return <span key={partIndex}>{part}</span>;
              const key = `${lineIndex}-${partIndex}`;
              const status = solved ? true : checked[key];
              return (
                <input
                  key={key}
                  aria-label="Điền số"
                  autoComplete="off"
                  inputMode="numeric"
                  disabled={solved}
                  value={solved ? (values[key] ?? (part.year ? String(part.answer) : formatNumber(part.answer))) : (values[key] ?? "")}
                  onChange={(event) => {
                    setValues({ ...values, [key]: event.target.value });
                    setChecked({ ...checked, [key]: undefined });
                  }}
                  style={{ width: `${Math.max(String(part.answer).length + 2, 4) + 1}ch` }}
                  className={cn(
                    "h-13 rounded-xl border-[3px] bg-white text-center text-2xl font-extrabold tabular-nums outline-none focus:border-ink disabled:opacity-100",
                    status === true && "border-good bg-good-soft text-good",
                    status === false && "border-oops bg-oops-soft text-oops",
                    status === undefined && "border-input",
                  )}
                />
              );
            })}
          </p>
        ))}
      </div>
      {solved ? null : (
        <ActionButton type="submit" className="mt-4 w-full sm:w-auto">
          Kiểm tra
        </ActionButton>
      )}
      <Feedback question={question} solved={solved} wrongCount={wrongCount} notice={notice} />
    </form>
  );
}

function Prompt({ children }: { children: ReactNode }) {
  return <p className="mb-3 max-w-[65ch] text-xl leading-relaxed font-semibold">{children}</p>;
}

function Fill({ question, solved, onSolved }: QuestionProps<FillQuestion>) {
  return (
    <>
      {question.prompt ? <Prompt>{question.prompt}</Prompt> : null}
      {question.illustration ? <div className="my-4">{question.illustration}</div> : null}
      <BlanksForm lines={[question.parts]} question={question} solved={solved} onSolved={onSolved} />
    </>
  );
}

function WordProblem({ question, solved, onSolved }: QuestionProps<WordQuestion>) {
  return (
    <>
      <Prompt>{question.prompt}</Prompt>
      {question.illustration ? <div className="my-4">{question.illustration}</div> : null}
      <BlanksForm lines={question.lines} question={question} solved={solved} onSolved={onSolved} />
    </>
  );
}

function Shape({ shape, pixelsPerUnit }: { shape: ShapeFigure; pixelsPerUnit: number }) {
  const width = shape.width * pixelsPerUnit;
  const height = shape.height * pixelsPerUnit;
  return (
    <figure className="flex flex-col items-start gap-1">
      <figcaption className="text-base font-bold">{shape.label}</figcaption>
      <div className="flex items-center gap-2">
        <div>
          <div
            role="img"
            aria-label={`${shape.label}: ${shape.widthLabel} và ${shape.heightLabel}`}
            className="rounded-[3px] bg-unit-dm2"
            style={{ width, height }}
          />
          <p className="mt-1 text-center text-base font-bold tabular-nums">{shape.widthLabel}</p>
        </div>
        <p className="-mt-7 text-base font-bold whitespace-nowrap tabular-nums">{shape.heightLabel}</p>
      </div>
    </figure>
  );
}

function Choice({ question, solved, onSolved }: QuestionProps<ChoiceQuestion>) {
  const [wrong, setWrong] = useState<number[]>([]);

  return (
    <>
      <Prompt>{question.prompt}</Prompt>
      {question.illustration ? <div className="my-4">{question.illustration}</div> : null}
      {question.figure ? (
        <div className="my-4 flex flex-wrap items-end gap-x-6 gap-y-4">
          {question.figure.shapes.map((shape) => (
            <Shape key={shape.label} shape={shape} pixelsPerUnit={question.figure!.pixelsPerUnit} />
          ))}
        </div>
      ) : null}
      <div className="grid gap-2">
        {question.options.map((option, index) => {
          const isAnswer = index === question.answerIndex;
          return (
            <button
              key={option}
              type="button"
              disabled={solved || wrong.includes(index)}
              onClick={() => {
                if (isAnswer) onSolved(wrong.length === 0);
                else setWrong([...wrong, index]);
              }}
              className={cn(
                "min-h-13 rounded-2xl border-[3px] bg-white px-4 py-2.5 text-left text-lg font-bold transition-colors",
                solved && isAnswer && "border-good bg-good-soft text-good",
                wrong.includes(index) && "border-oops/50 bg-oops-soft text-oops line-through",
                !(solved && isAnswer) && !wrong.includes(index) && "border-input hover:bg-secondary disabled:opacity-60",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      <Feedback question={question} solved={solved} wrongCount={wrong.length} />
    </>
  );
}

function Match({ question, solved, onSolved }: QuestionProps<MatchQuestion>) {
  const [wrongCount, setWrongCount] = useState(0);

  return (
    <>
      <Prompt>{question.prompt}</Prompt>
      {question.illustration ? <div className="my-4">{question.illustration}</div> : null}
      <p className="mb-3 text-base font-semibold text-muted-foreground">
        Kéo chấm tròn của ô bên trái sang ô phù hợp bên phải. Hoặc chạm ô bên trái, rồi chạm ô bên phải.
      </p>
      <MatchBoard
        pairs={question.pairs}
        rightOrder={question.rightOrder}
        solved={solved}
        wrongCount={wrongCount}
        onWrong={() => setWrongCount((count) => count + 1)}
        onSolved={onSolved}
      />
      <Feedback question={question} solved={solved} wrongCount={wrongCount} />
    </>
  );
}

const SIGNS: { sign: Sign; label: string }[] = [
  { sign: ">", label: "lớn hơn" },
  { sign: "<", label: "bé hơn" },
  { sign: "=", label: "bằng" },
];

function Compare({ question, solved, onSolved }: QuestionProps<CompareQuestion>) {
  const [choices, setChoices] = useState<(Sign | undefined)[]>([]);
  const [checked, setChecked] = useState<(boolean | undefined)[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [notice, setNotice] = useState<string>();

  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (solved) return;
    if (question.rows.some((_, index) => !choices[index])) {
      setNotice("Con chọn dấu cho đủ các hàng rồi kiểm tra nhé.");
      return;
    }
    setNotice(undefined);
    const results = question.rows.map((row, index) => choices[index] === row.answer);
    setChecked(results);
    if (results.every(Boolean)) onSolved(wrongCount === 0);
    else setWrongCount(wrongCount + 1);
  }

  return (
    <form onSubmit={submit}>
      {question.prompt ? <Prompt>{question.prompt}</Prompt> : null}
      {question.illustration ? <div className="my-4">{question.illustration}</div> : null}
      <div className="space-y-3">
        {question.rows.map((row, index) => {
          const shown = solved ? row.answer : choices[index];
          const status = solved ? true : checked[index];
          return (
            <div
              key={index}
              role="group"
              aria-label={`${row.left} so với ${row.right}`}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-2xl font-bold tabular-nums"
            >
              <span>{row.left}</span>
              <span className="flex gap-1.5">
                {SIGNS.map(({ sign, label }) => (
                  <button
                    key={sign}
                    type="button"
                    aria-label={label}
                    aria-pressed={shown === sign}
                    disabled={solved}
                    onClick={() => {
                      setChoices(Object.assign([], choices, { [index]: sign }));
                      setChecked(Object.assign([], checked, { [index]: undefined }));
                    }}
                    className={cn(
                      "size-13 rounded-xl border-[3px] bg-white text-2xl font-extrabold disabled:opacity-100",
                      shown !== sign && "border-input",
                      shown === sign && status === undefined && "border-ink bg-secondary",
                      shown === sign && status === true && "border-good bg-good-soft text-good",
                      shown === sign && status === false && "border-oops bg-oops-soft text-oops",
                    )}
                  >
                    {sign}
                  </button>
                ))}
              </span>
              <span>{row.right}</span>
            </div>
          );
        })}
      </div>
      {solved ? null : (
        <ActionButton type="submit" className="mt-4 w-full sm:w-auto">
          Kiểm tra
        </ActionButton>
      )}
      <Feedback question={question} solved={solved} wrongCount={wrongCount} notice={notice} />
    </form>
  );
}

export function QuestionBody({ question, solved, onSolved }: QuestionProps<Question>) {
  switch (question.kind) {
    case "dien-so":
      return <Fill question={question} solved={solved} onSolved={onSolved} />;
    case "loi-van":
      return <WordProblem question={question} solved={solved} onSolved={onSolved} />;
    case "trac-nghiem":
      return <Choice question={question} solved={solved} onSolved={onSolved} />;
    case "noi-cap":
      return <Match question={question} solved={solved} onSolved={onSolved} />;
    case "so-sanh":
      return <Compare question={question} solved={solved} onSolved={onSolved} />;
    case "dat-tinh":
      return <DatTinhForm question={question} solved={solved} onSolved={onSolved} />;
  }
}
