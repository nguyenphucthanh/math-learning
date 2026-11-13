// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { TamBia } from "./_illustrations/hinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("hình minh họa", () => {
  it("tấm bìa có một hình chữ nhật và ghi diện tích, chiều rộng", () => {
    const { container } = render(<TamBia area="9/20" width="3/5" />);
    expect(container.querySelectorAll("rect")).toHaveLength(1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("9/20");
    expect(container.textContent).toContain("3/5 m");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((g) => g.questions).length;
    render(<ExerciseSet lessonSlug="bai-70" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
