// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { ReviewLink } from "@/components/lesson/review-link";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { TamGiacABM } from "./_illustrations/tam-giac";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("hình minh họa", () => {
  it("tam giác ABC có mô tả và ghi BM, MC", () => {
    render(<TamGiacABM />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("BM dài 3 cm, MC dài 5 cm");
    expect(screen.getByText("3 cm")).toBeTruthy();
    expect(screen.getByText("5 cm")).toBeTruthy();
  });
});

describe("liên kết về bài gốc", () => {
  it("ReviewLink trỏ đúng bài", () => {
    render(<ReviewLink slug="bai-17">Xem lại Bài 17. Yến, tạ, tấn</ReviewLink>);
    expect(screen.getByRole("link", { name: /Bài 17/ }).getAttribute("href")).toBe("/kntt-4/bai-17");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm và hiện tiến độ", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-36" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });

  it("câu so sánh: chọn sai thì làm lại, chọn đúng thì xong", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("kl-12")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "<" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: ">" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("câu góc hiện hình tam giác", () => {
    render(<QuestionBody question={question("gc-amc")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Tam giác ABC");
  });

  it("bài toán voi: viết 500 thay vì 1 000 ở dòng cuối thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("kl-bt")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    for (const [index, value] of ["130", "370", "500", "1000", "500"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });
});
