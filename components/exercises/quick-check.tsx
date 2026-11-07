"use client";

import { useState } from "react";
import { QuestionBody } from "./question";
import type { Question } from "./types";

/** Câu thử nhanh trong phần lý thuyết, không tính vào tiến độ. */
export function QuickCheck({ question }: { question: Question }) {
  const [solved, setSolved] = useState(false);
  return (
    <div className="my-6 rounded-3xl bg-sun/30 p-4 sm:p-6">
      <p className="mb-2 font-heading text-xl font-bold">Thử nhanh</p>
      <QuestionBody question={question} solved={solved} onSolved={() => setSolved(true)} />
    </div>
  );
}
