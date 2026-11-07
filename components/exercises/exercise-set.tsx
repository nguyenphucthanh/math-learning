"use client";

import { ActionButton } from "@/components/lesson/action-button";
import { useLessonProgress } from "@/hooks/use-lesson-progress";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { QuestionBody } from "./question";
import type { ExerciseGroup } from "./types";

const headingTones = {
  m2: "text-unit-m2",
  dm2: "text-unit-dm2",
  cm2: "text-unit-cm2",
  mm2: "text-unit-mm2",
};

export function ExerciseSet({ lessonSlug, groups }: { lessonSlug: string; groups: ExerciseGroup[] }) {
  const { progress, markSolved, reset } = useLessonProgress(lessonSlug);
  const [round, setRound] = useState(0);

  const allQuestions = groups.flatMap((group) => group.questions);
  const total = allQuestions.length;
  const solved = Object.keys(progress.solved).length;
  const firstTry = Object.values(progress.solved).filter((entry) => entry.firstTry).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-secondary p-4 sm:px-6">
        <p aria-live="polite" className="text-lg font-bold">
          Đã làm <span className="tabular-nums">{solved}/{total}</span> câu
          {firstTry > 0 ? (
            <>
              {" · "}
              <span className="tabular-nums">{firstTry}</span> câu đúng ngay lần đầu
            </>
          ) : null}
        </p>
        {solved > 0 ? (
          <ActionButton
            variant="soft"
            className="bg-white"
            onClick={() => {
              reset();
              setRound(round + 1);
            }}
          >
            <RotateCcw aria-hidden />
            Làm lại từ đầu
          </ActionButton>
        ) : null}
      </div>

      {groups.map((group) => (
        <section key={group.id} className="mt-10">
          <h3 className={cn("font-heading text-3xl font-bold text-ink", group.unit && headingTones[group.unit])}>
            {group.title}
          </h3>
          <ol className="mt-4 divide-y-2 divide-dotted divide-input rounded-3xl bg-white px-4 shadow-[0_2px_16px_oklch(0.38_0.17_295/0.12)] sm:px-6">
            {group.questions.map((question) => {
              const questionNumber = allQuestions.indexOf(question) + 1;
              return (
                <li key={`${question.id}-${round}`} className="flex gap-3 py-6">
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink font-heading text-lg font-bold text-white tabular-nums"
                  >
                    {questionNumber}
                  </span>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <QuestionBody
                      question={question}
                      solved={question.id in progress.solved}
                      onSolved={(isFirstTry) => markSolved(question.id, isFirstTry, total)}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}
