// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { DocSoLopTrieu } from "./_animations/doc-so-lop-trieu";
import { MotTi } from "./_animations/mot-ti";
import { BanTinh } from "./_illustrations/ban-tinh";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("bàn tính", () => {
  it("số hạt mỗi cột là chữ số, cột trống là 0", () => {
    const { container } = render(<BanTinh value={372100425} />);
    expect(container.querySelectorAll("[data-coin]")).toHaveLength(3 + 7 + 2 + 1 + 4 + 2 + 5);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3, 7, 2, 1, 0, 0, 4, 2, 5");
  });

  it("số ít chữ số thì các cột bên trái không có hạt", () => {
    const { container } = render(<BanTinh value={5060900} />);
    expect(container.querySelectorAll("[data-coin]")).toHaveLength(5 + 6 + 9);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("0, 0, 5, 0, 6, 0, 9, 0, 0");
  });
});

describe("đọc số theo lớp", () => {
  it("đi hết bốn bước, mỗi lớp được tô vàng rồi đọc, xem lại về bước đầu", async () => {
    const user = userEvent.setup();
    const { container } = render(<DocSoLopTrieu />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    expect(container.querySelectorAll('rect[fill="var(--sun)"]')).toHaveLength(0);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll('rect[fill="var(--sun)"]')).toHaveLength(3);
    expect(container.querySelector("[data-enter='1']")!.textContent).toContain("một trăm bốn mươi chín triệu");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelector("[data-enter='2']")!.textContent).toContain("năm trăm chín mươi bảy nghìn");
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelector("[data-enter='3']")!.textContent).toContain("tám trăm bảy mươi sáu");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("tám trăm bảy mươi sáu");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });
});

describe("một tỉ", () => {
  it("đi hết ba bước thì ra 1 000 000 000 có 10 chữ số", async () => {
    const user = userEvent.setup();
    const { container } = render(<MotTi />);
    expect(container.querySelectorAll("rect")).toHaveLength(9);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelectorAll("[data-enter='1'] rect")).toHaveLength(10);
    await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(container.querySelector("[data-enter='2']")!.textContent).toBe("Một tỉ");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("một tỉ");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-12" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu bàn tính hiện hình, đáp án sai được làm lại, đúng thì xong", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    const { container } = render(<QuestionBody question={question("bt-1")} solved={false} onSolved={onSolved} />);
    expect(container.querySelectorAll("[data-coin]").length).toBeGreaterThan(0);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("20853047");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(screen.getByLabelText("Điền số"));
    await user.keyboard("208 530 047");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
