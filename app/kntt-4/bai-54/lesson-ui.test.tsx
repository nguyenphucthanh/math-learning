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
  it.each([3, 5])("%i cái bánh: bấm hết các bước, xem lại được", async (cakes) => {
    const { container } = render(<ChiaBanh cakes={cakes} />);
    const user = userEvent.setup();
    expect(chiaBanhCaptions(cakes)).toHaveLength(4);
    expect(container.querySelectorAll("svg[role=img] path")).toHaveLength(0);
    for (let i = 0; i < 3; i++) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("svg[role=img] path")).toHaveLength(cakes * 4);
    expect(container.textContent).toContain(`${cakes} : 4 = ${cakes}/4`);
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("svg[role=img] path")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-54" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
