// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChiaDoan, chiaDoanCaptions } from "./_animations/chia-doan";
import { SoDoChuoi } from "./_illustrations/hinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("hình minh họa", () => {
  it("sơ đồ chuỗi có đủ ô, ô sau là dấu hỏi", () => {
    const { container } = render(<SoDoChuoi start={[2, 3]} steps={[{ op: "×", f: [5, 7] }, { op: ":", f: [5, 7] }]} />);
    expect(container.querySelectorAll("rect")).toHaveLength(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("nhân 5/7");
    expect(container.textContent).toContain(": 5/7");
    expect(container.textContent?.match(/\?/g)).toHaveLength(2);
  });
});

describe("animation chia đoạn", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<ChiaDoan />);
    const user = userEvent.setup();
    const next = () => user.click(screen.getByRole("button", { name: "Tiếp" }));
    const rects = () => container.querySelectorAll("rect").length;
    expect(chiaDoanCaptions).toHaveLength(4);
    expect(rects()).toBe(2);
    await next();
    expect(rects()).toBe(1 + 8);
    await next();
    expect(rects()).toBe(1 + 12);
    await next();
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3/2 × 8/1 = 12");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(rects()).toBe(2);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-64" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
