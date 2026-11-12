// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ThemSoKhong, themSoKhongCaptions } from "./_animations/them-so-0";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("animation", () => {
  it("thêm số 0: đi hết các bước, xem lại được", async () => {
    const user = userEvent.setup();
    render(<ThemSoKhong />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Số 36");
    for (let i = 0; i < themSoKhongCaptions.length - 1; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("36 000 : 1 000 = 36");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Số 36");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, làm đúng thì tăng tiến độ", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-41" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    const inputs = screen.getAllByLabelText("Điền số");
    await user.type(inputs[0], "230");
    await user.type(inputs[1], "241700");
    await user.type(inputs[2], "4805000");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
