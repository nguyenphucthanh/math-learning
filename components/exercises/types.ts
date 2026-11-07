import type { AreaUnit } from "@/lib/area-units";
import type { MassUnit } from "@/lib/mass-units";
import type { TimeUnit } from "@/lib/time-units";
import type { ReactNode } from "react";

export type Blank = {
  answer: number;
  /** Năm viết liền như SGK (1698), không tách lớp như số lượng (2 400). */
  year?: boolean;
};
export type Part = string | Blank;

export type ShapeFigure = {
  label: string;
  /** Kích thước thật, dùng để vẽ đúng tỉ lệ. */
  width: number;
  height: number;
  widthLabel: string;
  heightLabel: string;
};

type QuestionBase = {
  id: string;
  hint: string;
  explanation: string;
};

export type FillQuestion = QuestionBase & {
  kind: "dien-so";
  prompt?: string;
  parts: Part[];
  /** Có với câu đổi đơn vị, để test kiểm tra lại đáp án. */
  conversion?: { source: string; to: AreaUnit | TimeUnit | MassUnit };
  /** Hình minh họa riêng của bài (SVG), hiện dưới đề. */
  illustration?: ReactNode;
};

export type ChoiceQuestion = QuestionBase & {
  kind: "trac-nghiem";
  prompt: string;
  options: string[];
  answerIndex: number;
  figure?: { pixelsPerUnit: number; shapes: ShapeFigure[] };
  /** Hình minh họa riêng của bài (SVG), hiện dưới đề. */
  illustration?: ReactNode;
};

export type MatchQuestion = QuestionBase & {
  kind: "noi-cap";
  prompt: string;
  pairs: { left: string; right: string }[];
  /** Thứ tự hiển thị cột phải, viết cố định để server và client giống nhau. */
  rightOrder: number[];
};

export type WordQuestion = QuestionBase & {
  kind: "loi-van";
  prompt: string;
  lines: Part[][];
};

export type Question = FillQuestion | ChoiceQuestion | MatchQuestion | WordQuestion;

export type ExerciseGroup = {
  id: string;
  title: string;
  unit?: "m2" | "dm2" | "cm2" | "mm2" | "second" | "century" | "yen" | "ta" | "tan";
  questions: Question[];
};
