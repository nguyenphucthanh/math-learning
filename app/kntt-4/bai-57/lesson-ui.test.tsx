// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { QuyDong, quyDongCaptions } from "./_animations/quy-dong";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const next = (user: ReturnType<typeof userEvent.setup>) => user.click(screen.getByRole("button", { name: "Tiếp" }));

describe("animation quy đồng", () => {
  it("bấm hết các bước, xem lại được", async () => {
    const { container } = render(<QuyDong />);
    const user = userEvent.setup();
    expect(quyDongCaptions).toHaveLength(4);
    await next(user);
    expect(screen.getByLabelText("2 trên 8")).toBeTruthy();
    await next(user);
    expect(container.textContent).toContain("(1 × 2)/(4 × 2)");
    await next(user);
    expect(container.textContent).toContain("2/4 ✗");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.textContent).not.toContain("(1 × 2)/(4 × 2)");
    expect(screen.getByLabelText("1 trên 4")).toBeTruthy();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-57" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
