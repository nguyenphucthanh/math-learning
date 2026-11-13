// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { DienTich, dienTichCaptions } from "./_animations/dien-tich";
import { Tre } from "./_illustrations/tre";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("animation nhân hai phân số", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<DienTich />);
    const user = userEvent.setup();
    const text = () => container.textContent ?? "";
    expect(dienTichCaptions).toHaveLength(5);
    expect(text()).toContain("15 ô");
    await next(user);
    expect(container.querySelector("svg")?.getAttribute("aria-label")).toContain("4 hàng");
    await next(user);
    await next(user);
    expect(container.querySelectorAll("text[data-enter='3']")).toHaveLength(8);
    await next(user);
    expect(text()).toContain("4 × 2");
    expect(text()).toContain("5 × 3");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(text()).not.toContain("4 × 2");
  });
});

describe("hình ba đoạn tre", () => {
  it("có mô tả cho trình đọc màn hình", () => {
    render(<Tre />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("A dài 1 m");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-63" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
