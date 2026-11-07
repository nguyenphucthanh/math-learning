// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { MassLadder } from "./_animations/mass-ladder";
import { MassSplit } from "./_animations/mass-split";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

describe("thang đơn vị", () => {
  it("đi hết các bước rồi xem lại được", async () => {
    const user = userEvent.setup();
    render(<MassLadder />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Thang đơn vị khối lượng, đã hiện kg");

    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("kg, yến, tạ, tấn");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("1 tấn = 1 000 kg");
    expect(screen.getByText("1 tạ = 100 kg")).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toBe("Thang đơn vị khối lượng, đã hiện kg");
  });
});

describe("tách số đo", () => {
  it("đi đến bước cuối thì có kết quả và gạch bỏ 405", async () => {
    const user = userEvent.setup();
    render(<MassSplit />);
    expect(screen.queryByText("40 + 5 = 45 kg")).toBeNull();
    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByText("40 + 5 = 45 kg")).toBeTruthy();
    expect(screen.getByText("405 kg")).toBeTruthy();
  });
});

describe("hình minh họa trong câu hỏi", () => {
  it("câu voi qua cầu hiện hình sơ đồ cầu", () => {
    render(<QuestionBody question={question("cau-voi")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Voi con nặng 3 tạ");
  });

  it("câu thuyền hiện hình ba người", () => {
    render(<QuestionBody question={question("nc-tong")} solved={false} onSolved={() => {}} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("44 kg, 48 kg và 55 kg");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, làm đúng thì tăng tiến độ và lưu lại", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-17" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Yến, tạ, tấn", "Số đo có hai đơn vị", "Tính và bài toán", "Suy nghĩ thêm", "Nâng cao: thuyền chở ba người"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }

    await user.type(screen.getAllByLabelText("Điền số")[0], "30");
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
