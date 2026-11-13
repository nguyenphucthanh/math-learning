// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChiaBanh, chiaBanhCaptions } from "./_animations/chia-banh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("animation chia bánh", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<ChiaBanh />);
    const user = userEvent.setup();
    expect(chiaBanhCaptions).toHaveLength(4);
    const circles = () => container.querySelectorAll("svg[role=img] circle").length;
    expect(circles()).toBe(12);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("svg[role=img] rect")).toHaveLength(3);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(circles()).toBe(20);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.textContent).toContain("12 : 3 × 2 = 4 × 2 = 8");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(circles()).toBe(12);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-65" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
