// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GiaoHoan, giaoHoanCaptions } from "./_animations/giao-hoan";
import { KetHop, ketHopCaptions } from "./_animations/ket-hop";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

async function clickThrough(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("animation", () => {
  it("giao hoán: đi hết 4 bước, xem lại được", async () => {
    render(<GiaoHoan />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa đếm");
    const user = await clickThrough(giaoHoanCaptions.length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3 × 4 = 4 × 3");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa đếm");
  });

  it("kết hợp: đi hết 4 bước, xem lại được", async () => {
    render(<KetHop />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa nhóm");
    const user = await clickThrough(ketHopCaptions.length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("(3 × 2) × 4 = 3 × (2 × 4)");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa nhóm");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, làm đúng thì tăng tiến độ", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-40" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    const inputs = screen.getAllByLabelText("Điền số");
    await user.type(inputs[0], "7");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
