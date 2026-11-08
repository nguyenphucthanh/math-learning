// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ChiaDatTinh, chiaCaptions } from "./_animations/chia-dat-tinh";
import { NhanDatTinh, nhanCaptions } from "./_animations/nhan-dat-tinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

async function clickThrough(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("nhân đặt tính", () => {
  it("2 807 × 6: đi hết các bước thì ra 16 842, có số nhớ; xem lại được", async () => {
    render(<NhanDatTinh a={2807} b={6} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa nhân");
    const steps = nhanCaptions(2807, 6).length;
    expect(steps).toBe(6);
    const user = await clickThrough(steps - 1);
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("16842");
    expect(screen.getByTestId("write-0").textContent).toBe("2");
    expect(screen.getByTestId("write-4").textContent).toBe("1");
    expect(screen.getByText(/16.842/, { selector: "text" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa nhân");
  });
});

describe("chia đặt tính", () => {
  it("8 305 : 4: đi hết các bước thì thương 2 076, dư 1; xem lại được", async () => {
    render(<ChiaDatTinh a={8305} divisor={4} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa chia");
    const steps = chiaCaptions(8305, 4).length;
    expect(steps).toBe(6);
    const user = await clickThrough(steps - 1);
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("thương đến lúc này là 2076, dư 1");
    expect(screen.getByText(/Thử lại/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa chia");
  });

  it("thương có chữ số 0 ở giữa vẫn đi hết các bước", async () => {
    render(<ChiaDatTinh a={72056} divisor={8} />);
    await clickThrough(chiaCaptions(72056, 8).length - 1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("9007");
  });
});

describe("bài toán có sơ đồ", () => {
  it("câu giảm đi 3 lần có sơ đồ, chia 3 là đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("bt-do-choi")} solved={false} onSolved={onSolved} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3 phần bằng nhau");
    const input = screen.getByLabelText("Điền số");
    await user.type(input, "14760");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(input);
    await user.type(input, "4920");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, làm đúng thì tăng tiến độ", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-2" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
    const inputs = screen.getAllByLabelText("Điền số");
    await user.type(inputs[0], "13000");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
