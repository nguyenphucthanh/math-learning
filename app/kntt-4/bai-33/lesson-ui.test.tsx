// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { LamTron } from "./_animations/lam-tron";
import { BangHangLop } from "./_illustrations/bang-hang-lop";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("bảng hàng và lớp", () => {
  it("9 ô chữ số, mô tả đọc ra từng lớp", () => {
    const { container } = render(<BangHangLop value={380506142} />);
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("lớp triệu 3, 8, 0");
    expect(label).toContain("lớp nghìn 5, 0, 6");
    expect(label).toContain("lớp đơn vị 1, 4, 2");
    expect(container.querySelectorAll("rect[stroke]")).toHaveLength(9);
  });

  it("số ít chữ số thì ô bên trái để trống, ô được tô vàng đúng vị trí", () => {
    const { container } = render(<BangHangLop value={4297603} mark={[3]} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("lớp triệu 4");
    expect(container.querySelectorAll('rect[fill="var(--sun)"]')).toHaveLength(1);
  });
});

describe("làm tròn", () => {
  it("đi hết bốn bước thì ra 6 500 000, xem lại về bước đầu", async () => {
    const user = userEvent.setup();
    const { container } = render(<LamTron />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("[data-enter='1']")).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("[data-enter='2']")).toHaveLength(1);
    expect(screen.getByText(/8 là từ 5 trở lên/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("[data-enter='3'] rect")).toHaveLength(7);
    expect(container.querySelector("[data-enter='3']")!.textContent).toBe("6500000");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("6 500 000");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-33" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu so sánh ss-4: chọn > thì được làm lại, chọn = thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("ss-4")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: ">" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "=" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("câu Đố em: gõ 3 thì được làm lại, gõ 3 000 thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("do-em")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("3");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(screen.getByLabelText("Điền số"));
    await user.keyboard("3 000");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
