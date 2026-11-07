// @vitest-environment jsdom
import { QuestionBody } from "@/components/exercises/question";
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuickCheck } from "@/components/exercises/quick-check";
import type { Question } from "@/components/exercises/types";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { MixedSplit } from "./_animations/mixed-split";
import { TileGrid } from "./_animations/tile-grid";
import { UnitLadder } from "./_animations/unit-ladder";
import { RaceGame } from "./_game/race-game";
import { exerciseGroups, quickChecks, warmUps } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const fill = quickChecks.dm2 as Question;

describe("điền số", () => {
  it("sai thì gợi ý, sai lần hai có lời giải, đúng thì báo lần thử", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={fill} solved={false} onSolved={onSolved} />);

    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByRole("status").textContent).toContain("điền số vào đủ");

    await user.type(screen.getByLabelText("Điền số"), "20");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByRole("status").textContent).toContain("1 dm² = 100 cm²");
    expect(screen.queryByRole("button", { name: "Xem lời giải" })).toBeNull();

    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByRole("button", { name: "Xem lời giải" })).toBeTruthy();

    await user.clear(screen.getByLabelText("Điền số"));
    await user.type(screen.getByLabelText("Điền số"), "200");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalledWith(false);
  });
});

describe("câu thử trong lý thuyết", () => {
  it("mặc định ghi Thử nhanh, có thể đổi tiêu đề", () => {
    const view = render(<QuickCheck question={quickChecks.dm2} />);
    expect(screen.getByText("Thử nhanh")).toBeTruthy();
    view.unmount();
    render(<QuickCheck title="Khởi động 1/5" question={warmUps[0]} />);
    expect(screen.getByText("Khởi động 1/5")).toBeTruthy();
    expect(screen.queryByText("Thử nhanh")).toBeNull();
  });

  it("khởi động không ghi vào tiến độ", async () => {
    const user = userEvent.setup();
    render(<QuickCheck title="Khởi động 1/5" question={warmUps[0]} />);
    await user.type(screen.getByLabelText("Điền số"), "700{Enter}");
    expect(screen.getByRole("status").textContent).toContain("Đúng rồi");
    expect(window.localStorage.getItem("math-learning:progress:v1")).toBeNull();
  });
});

describe("trắc nghiệm và nối cặp", () => {
  it("trắc nghiệm đúng ngay lần đầu", async () => {
    const onSolved = vi.fn();
    render(<QuestionBody question={quickChecks.m2} solved={false} onSolved={onSolved} />);
    await userEvent.click(screen.getByRole("button", { name: "100 dm²" }));
    expect(onSolved).toHaveBeenCalledWith(true);
  });

  it("nối sai không tính xong, nối đủ thì xong", async () => {
    const user = userEvent.setup();
    const question = exerciseGroups[1].questions[1];
    const onSolved = vi.fn();
    render(<QuestionBody question={question} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByRole("button", { name: "Cửa ra vào" }));
    await user.click(screen.getByRole("button", { name: "6 cm²" }));
    expect(screen.getByRole("status").textContent).toContain("Chưa đúng");
    for (const [left, right] of [["Cửa ra vào", "2 m²"], ["Màn hình điện thoại", "1 dm²"], ["Mặt cục tẩy", "6 cm²"]]) {
      await user.click(screen.getByRole("button", { name: left }));
      await user.click(screen.getByRole("button", { name: right }));
    }
    expect(onSolved).toHaveBeenCalledWith(false);
  });
});

describe("animation theo bước", () => {
  it.each([
    ["lát ô", <TileGrid key="a" whole="dm2" cell="cm2" wholeLabel="1 dm²" sideLabel="10 cm = 1 dm" captions={["a", "b", "c", "d"]} />, 4, 101],
    ["kính lúp", <TileGrid key="b" zoomIntro whole="cm2" cell="mm2" wholeLabel="1 cm²" sideLabel="10 mm = 1 cm" captions={["a", "b", "c", "d", "e"]} />, 5, 101],
  ])("%s đi hết các bước và đủ 100 ô", async (_name, element, steps, expectedRects) => {
    const user = userEvent.setup();
    const { container } = render(element);
    expect(screen.getByText("1/" + steps)).toBeTruthy();
    for (let i = 1; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByText(`${steps}/${steps}`)).toBeTruthy();
    // 100 ô + khung + lớp phủ cả hình
    expect(container.querySelectorAll("svg rect").length).toBe(expectedRects + 1);
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByText("1/" + steps)).toBeTruthy();
  });

  it("lát ô bắt đầu với đúng 1 ô", () => {
    const { container } = render(<TileGrid whole="dm2" cell="cm2" wholeLabel="1 dm²" sideLabel="s" captions={["a", "b", "c", "d"]} />);
    expect(container.querySelectorAll("svg rect").length).toBe(2);
  });

  it("thang đơn vị và tách số đo chạy hết bước", async () => {
    const user = userEvent.setup();
    render(<UnitLadder />);
    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getAllByText(": 100")).toHaveLength(3);
    cleanup();
    render(<MixedSplit />);
    for (let i = 0; i < 4; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByText("39")).toBeTruthy();
    expect(screen.getByText("300 + 9 = 309 dm²")).toBeTruthy();
  });
});

describe("tiến độ", () => {
  it("lưu localStorage, giữ sau khi mở lại, làm lại thì xóa", async () => {
    const user = userEvent.setup();
    const view = render(<ExerciseSet lessonSlug="bai-18" groups={exerciseGroups} />);
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    expect(screen.getByText(`0/${total}`)).toBeTruthy();

    const input = screen.getAllByLabelText("Điền số")[0];
    await user.type(input, "420{Enter}");
    expect(screen.getByText(`1/${total}`)).toBeTruthy();
    expect(window.localStorage.getItem("math-learning:progress:v1")).toContain("dm2-viet");

    view.unmount();
    render(<ExerciseSet lessonSlug="bai-18" groups={exerciseGroups} />);
    expect(screen.getByText(`1/${total}`)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Làm lại từ đầu" }));
    expect(screen.getByText(`0/${total}`)).toBeTruthy();
  });
});

describe("trò chơi", () => {
  it("gieo, đi, trả lời sai thì về chỗ cũ", async () => {
    const user = userEvent.setup();
    const random = vi.spyOn(Math, "random").mockReturnValue(0.2); // 2 chấm → ô 2 dm²
    render(<RaceGame lessonSlug="bai-18" />);
    await user.click(screen.getByRole("button", { name: "Chơi một mình" }));
    await user.click(screen.getByRole("button", { name: "Gieo xúc xắc" }));
    const input = await screen.findByLabelText("Điền số");
    await user.type(input, "20");
    await user.click(screen.getByRole("button", { name: "Trả lời" }));
    const back = await screen.findByRole("button", { name: "Về ô xuất phát" });
    expect(within(back.parentElement!).getByText(/Đáp án là 200/)).toBeTruthy();
    await user.click(back);
    expect(screen.getByRole("button", { name: "Gieo xúc xắc" })).toBeTruthy();
    random.mockRestore();
  });
});
