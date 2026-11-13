// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { NhatKy, nhatKyCaptions } from "./_animations/nhat-ky";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("nhật ký quãng đường", () => {
  it("7 bước: ghi 5 ngày, dãy số liệu, đọc số thứ n; xem lại được", async () => {
    render(<NhatKy />);
    const user = userEvent.setup();
    expect(nhatKyCaptions([1, 2, 2, 2, 3])).toHaveLength(7);
    expect(screen.getAllByTestId(/^cot-/)).toHaveLength(1);
    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getAllByTestId(/^cot-/)).toHaveLength(5);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByTestId("day-so").textContent).toBe("1, 2, 2, 2, 3");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByText("nhiều nhất 3 km, ít nhất 1 km")).toBeTruthy();
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("số thứ n");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getAllByTestId(/^cot-/)).toHaveLength(1);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-49" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
