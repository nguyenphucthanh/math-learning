import { ActionButton } from "@/components/lesson/action-button";
import { formatNumber, parseAnswer } from "@/lib/area-units";
import { cn } from "@/lib/utils";
import { CircleCheck, Lightbulb } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { ChoiceQuestion, FillQuestion, MatchQuestion, Part, Question, ShapeFigure, WordQuestion } from "./types";

type QuestionProps<Q extends Question> = {
  question: Q;
  solved: boolean;
  onSolved: (firstTry: boolean) => void;
};

/** Phản hồi sau khi làm: đúng thì giải thích, sai thì gợi ý, sai lần nữa có thể xem lời giải. */
function Feedback({
  question,
  solved,
  wrongCount,
  notice,
}: {
  question: Question;
  solved: boolean;
  wrongCount: number;
  notice?: string;
}) {
  const [revealed, setRevealed] = useState(false);

  if (solved) {
    return (
      <div role="status" className="mt-4 flex gap-3 rounded-2xl bg-good-soft p-4 text-lg leading-relaxed">
        <CircleCheck aria-hidden className="mt-1 size-6 shrink-0 text-good" />
        <p>
          <strong className="font-extrabold text-good">Đúng rồi!</strong> {question.explanation}
        </p>
      </div>
    );
  }
  if (notice) {
    return (
      <p role="status" className="mt-4 rounded-2xl bg-secondary p-4 text-lg font-semibold">
        {notice}
      </p>
    );
  }
  if (wrongCount === 0) return null;

  return (
    <div role="status" className="mt-4 rounded-2xl bg-oops-soft p-4 text-lg leading-relaxed">
      <p className="flex gap-3">
        <Lightbulb aria-hidden className="mt-1 size-6 shrink-0 text-oops" />
        <span>
          <strong className="font-extrabold text-oops">Chưa đúng, con thử lại nhé.</strong> {question.hint}
        </span>
      </p>
      {wrongCount >= 2 ? (
        revealed ? (
          <p className="mt-3 font-semibold">{question.explanation}</p>
        ) : (
          <ActionButton variant="soft" className="mt-3 bg-white" onClick={() => setRevealed(true)}>
            Xem lời giải
          </ActionButton>
        )
      ) : null}
    </div>
  );
}

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
                  value={solved ? (values[key] ?? formatNumber(part.answer)) : (values[key] ?? "")}
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
      <BlanksForm lines={[question.parts]} question={question} solved={solved} onSolved={onSolved} />
    </>
  );
}

function WordProblem({ question, solved, onSolved }: QuestionProps<WordQuestion>) {
  return (
    <>
      <Prompt>{question.prompt}</Prompt>
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
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrongCount, setWrongCount] = useState(0);
  const isMatched = (index: number) => solved || matched.includes(index);

  function chooseRight(index: number) {
    if (selected === null) return;
    if (index === selected) {
      const next = [...matched, index];
      setMatched(next);
      if (next.length === question.pairs.length) onSolved(wrongCount === 0);
    } else {
      setWrongCount(wrongCount + 1);
    }
    setSelected(null);
  }

  const tile = "min-h-14 rounded-2xl border-[3px] px-3 py-2 text-left text-lg leading-snug font-bold transition-colors";
  const done = "border-good bg-good-soft text-good";

  return (
    <>
      <Prompt>{question.prompt}</Prompt>
      <p className="mb-3 text-base font-semibold text-muted-foreground">Chạm một ô bên trái, rồi chạm ô phù hợp bên phải.</p>
      <div className="grid grid-cols-[3fr_2fr] gap-2 sm:gap-3">
        <div className="grid content-start gap-2">
          {question.pairs.map((pair, index) => (
            <button
              key={pair.left}
              type="button"
              aria-pressed={selected === index}
              disabled={isMatched(index)}
              onClick={() => setSelected(selected === index ? null : index)}
              className={cn(
                tile,
                isMatched(index)
                  ? done
                  : selected === index
                    ? "border-ink bg-ink text-white"
                    : "border-input bg-white hover:bg-secondary",
              )}
            >
              {pair.left}
            </button>
          ))}
        </div>
        <div className="grid content-start gap-2">
          {question.rightOrder.map((index) => (
            <button
              key={question.pairs[index].right}
              type="button"
              disabled={isMatched(index)}
              onClick={() => chooseRight(index)}
              className={cn(tile, "text-center tabular-nums", isMatched(index) ? done : "border-input bg-white hover:bg-secondary")}
            >
              {question.pairs[index].right}
            </button>
          ))}
        </div>
      </div>
      <Feedback question={question} solved={solved} wrongCount={wrongCount} />
    </>
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
  }
}
