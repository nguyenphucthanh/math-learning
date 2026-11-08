// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { SoDoBaDoi } from "./_animations/so-do-ba-doi";
import { ThungDau } from "./_animations/thung-dau";
import { SoDoBaDong } from "./_illustrations/so-do-ba-dong";
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

const label = () => screen.getByRole("img").getAttribute("aria-label");
const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("animation bài toán ba bước", () => {
  it("sơ đồ ba đội: 6 bước, ra 80, 70, 210, xem lại được", async () => {
    render(<SoDoBaDoi />);
    expect(label()).toContain("60 cây");
    await clickThrough(2);
    expect(label()).toContain("ít hơn đội Hai 10 cây");
    await clickThrough(1);
    expect(label()).toContain("= 80");
    await clickThrough(1);
    expect(label()).toContain("= 70");
    const user = await clickThrough(1);
    expect(label()).toContain("= 210");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("Đội Một trồng 60 cây");
  });

  it("thùng dầu: 6 bước, ra 60, 130, 20", async () => {
    render(<ThungDau />);
    expect(label()).toContain("150 l");
    await clickThrough(2);
    expect(label()).toContain("60 l");
    await clickThrough(2);
    expect(label()).toContain("= 130");
    const user = await clickThrough(1);
    expect(label()).toContain("= 20");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("150 l");
  });
});

describe("hình minh họa", () => {
  it("sơ đồ ba đoạn có ba nhãn và ba đoạn", () => {
    const { container } = render(<SoDoBaDong names={["Táo", "Cam", "Lê"]} first="15 quả" extra="8 quả" />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("gấp đôi");
    expect(container.textContent).toContain("Táo:");
    expect(container.textContent).toContain("Lê:");
    expect(container.querySelectorAll("rect")).toHaveLength(4);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-5" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("bài ba bước: so nhầm với đội Một (60 − 10) thì được làm lại", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("hd-trong-cay")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    expect(inputs).toHaveLength(3);
    for (const [index, value] of ["65", "42", "157"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });

  it("bài ba bước: điền đúng ba dòng thì qua", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("lt-dau")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    for (const [index, value] of ["70", "150", "50"].entries()) {
      await user.click(inputs[index]);
      await user.keyboard(value);
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
