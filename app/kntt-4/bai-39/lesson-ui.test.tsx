// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChiaDatTinh, chiaCaptions } from "./_animations/chia-dat-tinh";
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

describe("chia đặt tính", () => {
  it("125 730 : 5: đọc theo SGK, đi hết thì ra 25 146; xem lại được", async () => {
    render(<ChiaDatTinh a={125730} divisor={5} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa chia");
    const captions = chiaCaptions(125730, 5);
    expect(captions).toHaveLength(6);
    expect(captions[1]).toContain("12 chia 5 được 2, viết 2. 2 nhân 5 bằng 10; 12 trừ 10 bằng 2, viết 2.");
    expect(captions[2]).toContain("Hạ 5, được 25; 25 chia 5 được 5, viết 5.");
    expect(captions[3]).toContain("Hạ 7; 7 chia 5 được 1, viết 1.");
    const user = await clickThrough(5);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("25146");
    expect(["q-0", "q-1", "q-2", "q-3", "q-4"].map((id) => screen.getByTestId(id).textContent).join("")).toBe("25146");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa chia");
  });

  it("125 734 : 5: có dư 4", async () => {
    render(<ChiaDatTinh a={125734} divisor={5} />);
    await clickThrough(5);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("dư 4");
    expect(screen.getByTestId("rem-4").textContent).toBe("4");
    expect(chiaCaptions(125734, 5)[5]).toContain("(dư 4)");
  });

  it("36 054 : 6: thương có hai chữ số 0", async () => {
    render(<ChiaDatTinh a={36054} divisor={6} />);
    await clickThrough(chiaCaptions(36054, 6).length - 1);
    expect(["q-0", "q-1", "q-2", "q-3"].map((id) => screen.getByTestId(id).textContent).join("")).toBe("6009");
    expect(chiaCaptions(36054, 6)[3]).toContain("5 chia 6 được 0, viết 0");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, làm đúng thì tăng tiến độ", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-39" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    const inputs = screen.getAllByLabelText("Điền số");
    await user.type(inputs[0], "15745");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
