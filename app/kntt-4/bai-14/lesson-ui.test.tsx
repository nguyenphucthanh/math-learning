// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { SoSanhSo } from "./_animations/so-sanh-so";
import { XepThe } from "./_animations/xep-the";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;
/** Số trong app tách lớp bằng NBSP; test so với dấu cách thường. */
const plain = (value: string | null) => (value ?? "").replace(/\u00a0/g, " ");
const next = () => screen.getByRole("button", { name: "Tiếp" });

describe("so sánh hai số khác số chữ số", () => {
  it("đi hết ba bước: đếm chữ số rồi kết luận, xem lại về bước đầu", async () => {
    const user = userEvent.setup();
    const { container } = render(<SoSanhSo a={278992000} b={278999} />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(next());
    expect(plain(container.querySelector("[data-enter='1']")!.textContent)).toContain("9 chữ số > 6 chữ số");
    await user.click(next());
    expect(plain(container.querySelector("[data-enter='2']")!.textContent)).toContain("278 992 000 > 278 999");
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toContain("nhiều chữ số hơn thì lớn hơn");
    expect(screen.queryByRole("button", { name: "Tiếp" })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });
});

describe("so sánh hai số cùng số chữ số", () => {
  it("230 000 000 và 108 000 000: dừng ở hàng trăm triệu", async () => {
    const user = userEvent.setup();
    const { container } = render(<SoSanhSo a={230000000} b={108000000} />);
    await user.click(next());
    expect(plain(container.querySelector("[data-enter='1']")!.textContent)).toContain("Cùng 9 chữ số");
    await user.click(next());
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toContain("hàng trăm triệu: 2 > 1");
    expect([...container.querySelectorAll("[data-enter='2']")].map((element) => element.textContent)).toEqual([">"]);
    await user.click(next());
    expect(plain(container.querySelector("[data-enter='3']")!.textContent)).toContain("230 000 000 > 108 000 000");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });

  it("37 338 449 và 37 839 449: hai hàng đầu bằng nhau rồi dừng ở hàng trăm nghìn", async () => {
    const user = userEvent.setup();
    const { container } = render(<SoSanhSo a={37338449} b={37839449} />);
    await user.click(next());
    await user.click(next());
    expect([...container.querySelectorAll("[data-enter='2']")].map((element) => element.textContent)).toEqual(["=", "=", "<"]);
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toContain("hàng trăm nghìn: 3 < 8");
    await user.click(next());
    expect(plain(container.querySelector("[data-enter='3']")!.textContent)).toContain("37 338 449 < 37 839 449");
  });
});

describe("xếp thẻ lập số", () => {
  it("3 bước: sáu thẻ, số lớn nhất, số bé nhất", async () => {
    const user = userEvent.setup();
    const { container } = render(<XepThe cards={[3, 0, 5, 0, 8, 2]} />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(next());
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toBe("Số lớn nhất là 853 200");
    await user.click(next());
    expect(plain(screen.getByRole("img").getAttribute("aria-label"))).toContain("200 358");
    expect(plain(container.querySelector("[data-enter='2']")!.textContent)).toContain("200358");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-14" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu điền số: sai được làm lại, đúng thì xong", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("st-1")} solved={false} onSolved={onSolved} />);
    const inputs = screen.getAllByLabelText("Điền số");
    await user.click(inputs[0]);
    await user.keyboard("10000000");
    await user.click(inputs[1]);
    await user.keyboard("99999999");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(screen.getAllByLabelText("Điền số")[0]);
    await user.keyboard("100 000 000");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
