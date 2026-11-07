// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { DatTinhDS } from "./_illustrations/dat-tinh-ds";
import { HoaDon } from "./_illustrations/hoa-don";
import { ODoSo } from "./_illustrations/o-do-so";
import { SauThe } from "./_illustrations/sau-the";
import { SoDoDon } from "./_illustrations/so-do-don";
import { bills, cardsStart, exerciseGroups, oSoRows } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("hình minh họa", () => {
  it("ô số: 25 ô, 4 ô tô vàng, mô tả đọc ra 1, 9, 1, 8", () => {
    const { container } = render(<ODoSo rows={oSoRows} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("1, 9, 1, 8");
    expect(container.querySelectorAll("rect")).toHaveLength(10 + 1 + 8 + 6);
    expect(container.querySelectorAll('rect[fill="var(--sun)"]')).toHaveLength(4);
  });

  it("sáu thẻ số", () => {
    const { container } = render(<SauThe digits={cardsStart} />);
    expect(container.querySelectorAll("rect")).toHaveLength(6);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("3, 5, 9, 1, 4, 8");
  });

  it("sơ đồ hai đoạn có tổng và hiệu", () => {
    render(<SoDoDon topName="Bao thứ nhất" bottomName="Bao thứ hai" diff={6} total={28} unit="kg" />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Sơ đồ: Bao thứ nhất dài hơn Bao thứ hai 6 kg, cả hai là 28 kg");
  });

  it("hoá đơn liệt kê món và để trống dòng tổng", () => {
    const { container } = render(<HoaDon items={bills[0]} />);
    expect(container.textContent).toContain("Trứng gà");
    expect(container.textContent).toContain("? đồng");
  });

  it("phép tính Đúng hay Sai hiện kết quả viết sẵn", () => {
    render(<DatTinhDS a={9472800} b={472800} result={9000000} op="-" />);
    expect(screen.getByRole("group").getAttribute("aria-label")!.replace(/\u00a0/g, " ")).toContain("9 000 000");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-26" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu Sai (ds-3): chọn Sai thì đúng, chọn Đúng thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("ds-3")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Đúng" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Sai" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("câu tìm năm sinh: gõ 1918 thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("o-nam")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("1918");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("quên chia 2 (th-3: 360 và 24, trả lời 336 và 24) thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("th-3")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    await user.click(inputs[0]);
    await user.keyboard("336");
    await user.click(inputs[1]);
    await user.keyboard("24");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });
});
