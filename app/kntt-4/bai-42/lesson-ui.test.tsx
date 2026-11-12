// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { NhanVoiHieu, nhanVoiHieuCaptions } from "./_animations/nhan-voi-hieu";
import { NhanVoiTong, nhanVoiTongCaptions } from "./_animations/nhan-voi-tong";
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
  it("nhân với tổng: đi hết 4 bước, xem lại được", async () => {
    render(<NhanVoiTong />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa nhóm");
    const user = await clickThrough(nhanVoiTongCaptions.length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("15 × (3 + 2) = 15 × 3 + 15 × 2");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa nhóm");
  });

  it("nhân với hiệu: đi hết 4 bước, xem lại được", async () => {
    render(<NhanVoiHieu />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa bớt");
    const user = await clickThrough(nhanVoiHieuCaptions.length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("4 × (6 − 2) = 4 × 6 − 4 × 2");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa bớt");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, hiện đủ tiêu đề", async () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-42" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
