// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { BotPhanHon } from "./_animations/bot-phan-hon";
import { ChuVi } from "./_animations/chu-vi";
import { ThemPhanKem } from "./_animations/them-phan-kem";
import { SoLeLienTiep } from "./_illustrations/so-le";
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
const text = (element: Element) => element.textContent!.replace(/ /g, " ");

async function playAll(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("cách 1: bớt phần hơn", () => {
  it("đi hết 4 bước: 25 − 5 = 20, 20 : 2 = 10, Mi 15, rồi xem lại", async () => {
    const { container } = render(<BotPhanHon />);
    expect(label()).toContain("tổng 25");
    const user = userEvent.setup();
    const next = () => user.click(screen.getByRole("button", { name: "Tiếp" }));

    await next();
    expect(text(container)).toContain("25 − 5 = 20");
    await next();
    expect(text(container)).toContain("20 : 2 = 10");
    expect(label()).toContain("mỗi đoạn 10");
    await next();
    expect(label()).toContain("Mi 15 cái kẹo, Mai 10 cái kẹo");
    expect(text(container)).toContain("10 + 5 = 15");

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("tổng 25");
  });
});

describe("cách 2: thêm phần kém", () => {
  it("đi hết 4 bước: 25 + 5 = 30, 30 : 2 = 15, Mai 10, rồi xem lại", async () => {
    const { container } = render(<ThemPhanKem />);
    const user = userEvent.setup();
    const next = () => user.click(screen.getByRole("button", { name: "Tiếp" }));

    await next();
    expect(text(container)).toContain("25 + 5 = 30");
    expect(label()).toContain("tổng 30");
    await next();
    expect(text(container)).toContain("30 : 2 = 15");
    await next();
    expect(text(container)).toContain("25 − 15 = 10");
    expect(label()).toContain("Mi 15 cái kẹo, Mai 10 cái kẹo");

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("tổng 25");
  });
});

describe("chu vi và nửa chu vi", () => {
  it("đi hết 3 bước, ra tổng 12 và hiệu 4", async () => {
    const { container } = render(<ChuVi />);
    expect(label()).toContain("chu vi 24 cm");
    expect(container.textContent).not.toContain("24 : 2");
    const user = await playAll(2);
    expect(label()).toBe("Tổng 12 cm, hiệu 4 cm");
    expect(container.textContent).toContain("Tổng 12 cm, hiệu 4 cm");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("chu vi 24 cm");
  });
});

describe("số lẻ liên tiếp", () => {
  it("hình có mô tả và các số 5, 7, 9, 11", () => {
    const { container } = render(<SoLeLienTiep />);
    expect(label()).toContain("5, 7, 9, 11");
    expect(container.querySelectorAll("circle")).toHaveLength(4);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-25" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("làm đúng câu hai ô (a-1: 34 và 26) thì tăng tiến độ và lưu lại", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-25" groups={exerciseGroups} />);
    const inputs = screen.getAllByLabelText("Điền số");
    await user.click(inputs[0]);
    await user.keyboard("34");
    await user.click(inputs[1]);
    await user.keyboard("26");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
    expect(window.localStorage.getItem("math-learning:progress:v1")).toContain("a-1");
  });

  it("quên chia 2 thì được gợi ý và làm lại, không tính là đã làm", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("a-1")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    await user.click(inputs[0]);
    await user.keyboard("52");
    await user.click(inputs[1]);
    await user.keyboard("8");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
  });
});
