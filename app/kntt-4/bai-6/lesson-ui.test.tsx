// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-6" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("làm tròn đến hàng chục nghìn: 72 305 ≈ 70 000 thì đúng", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("so-tron-chuc-nghin")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("70 000");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("chia có dư: quên số dư thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dt-chia-du")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    expect(inputs).toHaveLength(3);
    for (const [index, value] of ["7174", "0", "64573"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });

  it("chia có dư: điền đủ ba ô thì qua", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("dt-chia-du")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    for (const [index, value] of ["7174", "7", "64573"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });

  it("tìm lỗi thứ tự phép tính: chọn đúng lỗi thì qua", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("st-thu-tu")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Nam không sai" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /nhân 5 000 × 4 trước/ }));
    expect(onSolved).toHaveBeenCalled();
  });
});
