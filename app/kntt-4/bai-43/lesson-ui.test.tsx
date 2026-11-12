// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { NhanHaiChuSo, nhanHaiCaptions } from "./_animations/nhan-hai-chu-so";
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

describe("nhân với số có hai chữ số", () => {
  it("34 × 12: 4 bước, ra 408, xem lại được", async () => {
    render(<NhanHaiChuSo a={34} b={12} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa nhân");
    const captions = nhanHaiCaptions(34, 12);
    expect(captions).toHaveLength(4);
    expect(captions[1]).toContain("2 nhân 4 bằng 8, viết 8; 2 nhân 3 bằng 6, viết 6");
    const user = await clickThrough(3);
    expect(screen.getByTestId("r-0").textContent).toBe("8");
    expect(screen.getByTestId("r-1").textContent).toBe("0");
    expect(screen.getByTestId("r-2").textContent).toBe("4");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("kết quả 408");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa nhân");
  });

  it("134 × 32: có nhớ, ra 4 288", async () => {
    render(<NhanHaiChuSo a={134} b={32} />);
    await clickThrough(3);
    const digits = [0, 1, 2, 3].map((i) => screen.getByTestId(`r-${i}`).textContent).reverse().join("");
    expect(digits).toBe("4288");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, hiện đủ tiêu đề", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-43" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
