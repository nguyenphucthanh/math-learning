// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { GroupBars } from "./_animations/group-bars";
import { PairUp } from "./_animations/pair-up";
import { SwapBars } from "./_animations/swap-bars";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;
const label = () => screen.getByRole("img").getAttribute("aria-label")!;
const text = (element: Element) => element.textContent!.replace(/\u00a0/g, " ");

async function playAll(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("hai thanh đổi chỗ", () => {
  it("đi hết các bước, hiện a + b = b + a, rồi xem lại được", async () => {
    render(<SwapBars />);
    expect(label()).toContain("Hai thanh nối nhau");
    const user = await playAll(3);
    expect(label()).toContain("cùng dài bằng nhau");
    expect(screen.getByText("a + b = b + a")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("Hai thanh nối nhau");
  });
});

describe("hai cách nhóm ba số", () => {
  it("đi hết các bước: ngoặc ôm hai cặp khác nhau, cùng 145 000", async () => {
    const { container } = render(<GroupBars />);
    const user = userEvent.setup();
    const next = () => user.click(screen.getByRole("button", { name: "Tiếp" }));

    await next();
    expect(label()).toContain("hai thanh đầu");
    expect(text(container)).toContain("120 000");
    await next();
    expect(label()).toContain("hai thanh sau");
    expect(text(container)).toContain("100 000");
    await next();
    expect(label()).toContain("145 000");
    expect(text(container)).toContain("(a + b) + c = a + (b + c)");

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toBe("Ba thanh a, b, c");
  });
});

describe("ghép cặp tròn", () => {
  it("mỗi dòng đủ ba số, kết quả 189 hiện ở bước cuối", async () => {
    const { container } = render(<PairUp />);
    expect(container.textContent).not.toContain("189");
    const user = await playAll(4);
    expect(label()).toBe("bằng 189");
    expect(container.textContent).toContain("189");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toBe("30 + 89 + 70");
  });
});

describe("hình sơ đồ trong câu hỏi", () => {
  it("sơ đồ hai đoạn và ba đoạn có mô tả đúng", () => {
    render(<QuestionBody question={question("sd-1")} solved={false} onSolved={() => {}} />);
    expect(label()).toContain("hai đoạn");
    cleanup();
    render(<QuestionBody question={question("sd-2")} solved={false} onSolved={() => {}} />);
    expect(label()).toContain("ba đoạn");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-24" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("làm đúng một câu thì tăng tiến độ và lưu lại", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-24" groups={exerciseGroups} />);
    const input = screen.getAllByLabelText("Điền số")[0];
    await user.click(input);
    await user.keyboard("563");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
    expect(window.localStorage.getItem("math-learning:progress:v1")).toContain("gh-1");
  });

  it("trả lời sai thì được gợi ý và làm lại, không tính là đã làm", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("gh-1")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("999");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();

    await user.clear(screen.getByLabelText("Điền số"));
    await user.keyboard("563");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(false);
  });
});
