"use client";

import { useCallback, useSyncExternalStore } from "react";

export type LessonProgress = {
  solved: Record<string, { firstTry: boolean }>;
  /** Tổng số câu của bài, để trang mục lục hiện được tiến độ. */
  total: number;
  gameWon: boolean;
};

type ProgressStore = Record<string, LessonProgress>;

const STORAGE_KEY = "math-learning:progress:v1";
const EMPTY_STORE: ProgressStore = {};
export const EMPTY_LESSON: LessonProgress = { solved: {}, total: 0, gameWon: false };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Đọc dữ liệu đã lưu, bỏ qua mọi phần bị hỏng thay vì làm hỏng app. */
export function parseProgress(raw: string | null): ProgressStore {
  if (!raw) return {};
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!isRecord(parsed)) return {};

  const store: ProgressStore = {};
  for (const [slug, lesson] of Object.entries(parsed)) {
    if (!isRecord(lesson) || !isRecord(lesson.solved)) continue;
    const solved: LessonProgress["solved"] = {};
    for (const [id, entry] of Object.entries(lesson.solved)) {
      if (isRecord(entry) && typeof entry.firstTry === "boolean") solved[id] = { firstTry: entry.firstTry };
    }
    store[slug] = {
      solved,
      total: typeof lesson.total === "number" ? lesson.total : 0,
      gameWon: lesson.gameWon === true,
    };
  }
  return store;
}

let cache: ProgressStore | null = null;
const listeners = new Set<() => void>();

function read(): ProgressStore {
  if (cache) return cache;
  try {
    cache = parseProgress(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    cache = {};
  }
  return cache;
}

function write(store: ProgressStore) {
  cache = store;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Không lưu được thì vẫn giữ trong bộ nhớ, app chạy tiếp bình thường.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cache = null;
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useLessonProgress(lessonSlug: string) {
  const store = useSyncExternalStore(subscribe, read, () => EMPTY_STORE);
  const progress = store[lessonSlug] ?? EMPTY_LESSON;

  const update = useCallback(
    (change: (lesson: LessonProgress) => LessonProgress) => {
      const current = read();
      write({ ...current, [lessonSlug]: change(current[lessonSlug] ?? EMPTY_LESSON) });
    },
    [lessonSlug],
  );

  const markSolved = useCallback(
    (questionId: string, firstTry: boolean, total: number) =>
      update((lesson) => ({
        ...lesson,
        total,
        solved: { ...lesson.solved, [questionId]: { firstTry } },
      })),
    [update],
  );

  const markGameWon = useCallback(() => update((lesson) => ({ ...lesson, gameWon: true })), [update]);

  const reset = useCallback(() => update((lesson) => ({ ...EMPTY_LESSON, total: lesson.total })), [update]);

  return { progress, markSolved, markGameWon, reset };
}
