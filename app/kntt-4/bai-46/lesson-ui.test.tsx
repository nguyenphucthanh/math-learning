// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { SanDeu, sanDeuCaptions } from "./_animations/san-deu";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("san đều", () => {
  it("10 và 50: 4 bước, các cột bằng 30, xem lại được", async () => {
    render(<SanDeu values={[10, 50]} />);
    const user = userEvent.setup();
    expect(sanDeuCaptions([10, 50])).toHaveLength(4);
    expect(screen.getByTestId("v-0").textContent).toBe("10");
    expect(screen.getByTestId("v-1").textContent).toBe("50");
    for (let i = 0; i < 3; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByTestId("v-0").textContent).toBe("30");
    expect(screen.getByTestId("v-1").textContent).toBe("30");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("số trung bình cộng là 30");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByTestId("v-1").textContent).toBe("50");
  });

  it("13, 14, 18: ra 15", async () => {
    render(<SanDeu values={[13, 14, 18]} />);
    const user = userEvent.setup();
    for (let i = 0; i < 3; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect([0, 1, 2].map((i) => screen.getByTestId(`v-${i}`).textContent)).toEqual(["15", "15", "15"]);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-46" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
