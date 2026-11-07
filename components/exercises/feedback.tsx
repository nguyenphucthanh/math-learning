import { ActionButton } from "@/components/lesson/action-button";
import { CircleCheck, Lightbulb } from "lucide-react";
import { useState } from "react";
import type { Question } from "./types";

/** Phản hồi sau khi làm: đúng thì giải thích, sai thì gợi ý, sai lần nữa có thể xem lời giải. */
export function Feedback({
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
