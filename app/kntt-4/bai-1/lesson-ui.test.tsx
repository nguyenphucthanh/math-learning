// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { BangHang, placeValues } from "./_animations/bang-hang";
import { LamTron } from "./_animations/lam-tron";
import { SoSanh } from "./_animations/so-sanh";
import { TiaSo } from "./_animations/tia-so";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;

async function clickThrough(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("bảng hàng", () => {
  it("giá trị từng hàng, bỏ hàng 0 trong tổng", () => {
    expect(placeValues(36515)).toEqual([30000, 6000, 500, 10, 5]);
    expect(placeValues(20809)).toEqual([20000, 0, 800, 0, 9]);
  });

  it("đi hết các bước thì thấy chữ số, giá trị và cách đọc; xem lại được", async () => {
    render(<BangHang value={20809} reading="hai mươi nghìn tám trăm linh chín" />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa có chữ số nào");
    const user = await clickThrough(3);
    const label = screen.getByRole("img").getAttribute("aria-label")!;
    expect(label).toContain("2, 0, 8, 0, 9");
    expect(screen.getByText(/hai mươi nghìn tám trăm linh chín/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Chưa có chữ số nào");
  });
});

describe("tia số", () => {
  it("đi hết các bước, tia số bước 10 000 hiện ở bước cuối", async () => {
    render(<TiaSo />);
    expect(screen.queryByText("+10 000")).toBeNull();
    await clickThrough(2);
    expect(screen.getAllByText("+10 000").length).toBe(5);
    expect(screen.getByText(/mỗi vạch thêm 10 000/)).toBeTruthy();
  });
});

describe("so sánh", () => {
  it("đi hết các bước thì kết luận 52 361 > 52 348", async () => {
    render(<SoSanh />);
    expect(screen.queryByText(/52.361 > 52.348/)).toBeNull();
    await clickThrough(2);
    expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(/lớn hơn 52\s348/);
  });
});

describe("làm tròn", () => {
  it("đi hết các bước thì làm tròn được 16 000", async () => {
    render(<LamTron />);
    await clickThrough(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toMatch(/Làm tròn được 16\s000/);
  });
});

describe("câu so sánh", () => {
  it("thiếu dấu thì nhắc, chọn sai thì báo, chọn đúng hết thì xong", async () => {
    const user = userEvent.setup();
    let solved = false;
    const { rerender } = render(<QuestionBody question={question("ss-1")} solved={false} onSolved={() => (solved = true)} />);
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/chọn dấu cho đủ/)).toBeTruthy();

    const groups = screen.getAllByRole("group");
    const rows = (question("ss-1") as Extract<ReturnType<typeof question>, { kind: "so-sanh" }>).rows;
    expect(groups.length).toBe(rows.length);
    const names = { ">": "lớn hơn", "<": "bé hơn", "=": "bằng" } as const;

    for (const [index, row] of rows.entries()) {
      const wrong = row.answer === ">" ? "<" : ">";
      await user.click(within(groups[index]).getByRole("button", { name: names[index === 0 ? wrong : row.answer] }));
    }
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(solved).toBe(false);
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();

    await user.click(within(groups[0]).getByRole("button", { name: names[rows[0].answer] }));
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(solved).toBe(true);
    rerender(<QuestionBody question={question("ss-1")} solved onSolved={() => {}} />);
    expect(within(screen.getAllByRole("group")[0]).getByRole("button", { name: "bé hơn" }).getAttribute("aria-pressed")).toBe("true");
  });
});

describe("ô điền số", () => {
  it("khi đã giải, số hiện tách lớp", () => {
    render(<QuestionBody question={question("ts-5")} solved onSolved={() => {}} />);
    const values = screen.getAllByLabelText("Điền số").map((input) => (input as HTMLInputElement).value);
    expect(values).toEqual(["99 998", "100 000"]);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, làm đúng thì tăng tiến độ", async () => {
    const user = userEvent.setup();
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-1" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const title of ["Đọc và viết số", "Phân tích số thành tổng", "Tia số, số liền trước và liền sau", "So sánh và làm tròn", "Suy nghĩ thêm"]) {
      expect(screen.getByRole("heading", { name: title })).toBeTruthy();
    }
    const inputs = screen.getAllByLabelText("Điền số");
    for (const [index, digit] of ["5", "2", "0", "7", "6"].entries()) await user.type(inputs[index], digit);
    await user.click(screen.getAllByRole("button", { name: "Kiểm tra" })[0]);
    expect(screen.getByText(`${1}/${total}`)).toBeTruthy();
  });
});
