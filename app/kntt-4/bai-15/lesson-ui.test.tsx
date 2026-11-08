// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { DayTuNhien } from "./_animations/day-tu-nhien";
import { QuyLuatDay } from "./_animations/quy-luat-day";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

/** Số trong app tách lớp bằng NBSP; test so với dấu cách thường. */
const plain = (value: string | null) => (value ?? "").replace(/ /g, " ");
const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;
const next = () => screen.getByRole("button", { name: "Tiếp" });

describe("dãy số tự nhiên trên tia số", () => {
  it("đi hết bốn bước: số 0, liền trước và liền sau, không có số lớn nhất; xem lại về bước đầu", async () => {
    const user = userEvent.setup();
    const { container } = render(<DayTuNhien />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(next());
    expect(container.querySelector("[data-enter='1']")!.textContent).toContain("0: số bé nhất");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bé nhất");
    await user.click(next());
    const text = container.querySelector("[data-enter='2']")!.textContent!;
    expect(text).toContain("liền trước");
    expect(text).toContain("liền sau");
    expect(text).toContain("hơn kém nhau 2 đơn vị");
    await user.click(next());
    expect(container.querySelector("[data-enter='3']")!.textContent).toContain("Không có số tự nhiên lớn nhất");
    expect(screen.queryByRole("button", { name: "Tiếp" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });

  it("quay lại bước trước", async () => {
    const user = userEvent.setup();
    render(<DayTuNhien />);
    await user.click(next());
    await user.click(next());
    await user.click(screen.getByRole("button", { name: "Quay lại bước trước" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("bé nhất");
  });
});

describe("dãy số có quy luật", () => {
  it("5, 10, 15, 20: hiện bước nhảy +5 rồi ba số còn thiếu", async () => {
    const user = userEvent.setup();
    const { container } = render(<QuyLuatDay terms={[5, 10, 15, 20, 25, 30, 35]} given={4} />);
    expect(container.textContent).toContain("?");
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(next());
    expect(container.querySelectorAll("[data-enter='1']")).toHaveLength(3);
    expect(plain(container.querySelector("[data-enter='1']")!.textContent)).toContain("+5");
    await user.click(next());
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toBe("Dãy số đầy đủ: 5, 10, 15, 20, 25, 30, 35");
    expect(container.querySelectorAll("[data-enter='2']")).toHaveLength(3);
    expect(container.textContent).not.toContain("?");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    expect(container.textContent).toContain("?");
  });

  it("2 021, 2 022, 2 023: bước nhảy +1", async () => {
    const user = userEvent.setup();
    const { container } = render(<QuyLuatDay terms={[2021, 2022, 2023, 2024, 2025, 2026]} given={3} />);
    await user.click(next());
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toContain("hơn kém nhau 1 đơn vị");
    await user.click(next());
    expect(plain(container.textContent)).toContain("2 026");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-15" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu Đúng/Sai: chọn sai thì đáp án đó bị khóa và được chọn lại, chọn đúng thì xong", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dt-1")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Đúng" }));
    expect(onSolved).not.toHaveBeenCalled();
    expect((screen.getByRole("button", { name: "Đúng" }) as HTMLButtonElement).disabled).toBe(true);
    await user.click(screen.getByRole("button", { name: "Sai" }));
    expect(onSolved).toHaveBeenCalledWith(false);
  });

  it("câu điền dãy số: điền đúng cả ba ô", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("lt-3")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    expect(inputs).toHaveLength(12);
    const answers = ["2024", "2025", "2026", "15", "18", "21", "50", "60", "70", "15", "17", "19"];
    for (const [index, answer] of answers.entries()) {
      await user.click(inputs[index]);
      await user.keyboard(answer);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
