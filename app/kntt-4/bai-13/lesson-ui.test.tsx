// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { QuestionBody } from "@/components/exercises/question";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { LamTronSo } from "./_animations/lam-tron-so";
import { TiaSoLamTron } from "./_animations/tia-so-lam-tron";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const question = (id: string) => exerciseGroups.flatMap((group) => group.questions).find((item) => item.id === id)!;
const next = () => screen.getByRole("button", { name: "Tiếp" });

describe("tia số làm tròn", () => {
  it("đi hết ba bước, xem lại về bước đầu", async () => {
    const user = userEvent.setup();
    const { container } = render(<TiaSoLamTron />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(next());
    expect(container.querySelectorAll("[data-enter='1']")).toHaveLength(1);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("gần");
    await user.click(next());
    const text = [...container.querySelectorAll("[data-enter='2']")].map((element) => element.textContent).join(" ");
    expect(text).toContain("làm tròn xuống");
    expect(text).toContain("làm tròn lên");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("2 700 000");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });
});

describe("quy tắc làm tròn từng bước", () => {
  it("2 712 615 đến hàng trăm nghìn: xuống, ra 2 700 000", async () => {
    const user = userEvent.setup();
    const { container } = render(<LamTronSo value={2712615} position={5} />);
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
    await user.click(next());
    expect(container.querySelector("[data-enter='1']")!.textContent).toContain("hàng trăm nghìn");
    await user.click(next());
    expect(container.querySelector("[data-enter='2']")!.textContent).toContain("1 < 5");
    await user.click(next());
    expect(container.querySelector("[data-enter='3']")!.textContent).toContain("Làm tròn xuống");
    expect(container.querySelector("[data-enter='3']")!.textContent).toContain("2 712 615 ≈ 2 700 000");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("2 700 000");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(container.querySelectorAll("[data-enter]")).toHaveLength(0);
  });

  it("1 960 000: làm tròn lên và nhớ sang hàng triệu", async () => {
    const user = userEvent.setup();
    const { container } = render(<LamTronSo value={1960000} position={5} />);
    for (let index = 0; index < 3; index += 1) await user.click(next());
    expect(container.querySelector("[data-enter='3']")!.textContent).toContain("Làm tròn lên");
    expect(container.querySelector("[data-enter='3']")!.textContent).toContain("2 000 000");
    expect(screen.getByText(/nhớ 1 sang hàng bên trái/)).toBeTruthy();
  });

  it("5 122 381 đến hàng chục nghìn: nhìn hàng nghìn", async () => {
    const user = userEvent.setup();
    render(<LamTronSo value={5122381} position={4} />);
    await user.click(next());
    await user.click(next());
    expect(screen.getByText(/hàng nghìn: đó là 2/)).toBeTruthy();
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-13" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
    }
  });

  it("câu làm tròn: sai được làm lại, đúng thì xong", async () => {
    const user = userEvent.setup();
    const onSolved = vi.fn();
    render(<QuestionBody question={question("tn-1")} solved={false} onSolved={onSolved} />);
    await user.click(screen.getByLabelText("Điền số"));
    await user.keyboard("21300000");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(screen.getByText(/Chưa đúng/)).toBeTruthy();
    expect(onSolved).not.toHaveBeenCalled();
    await user.clear(screen.getByLabelText("Điền số"));
    await user.keyboard("21 400 000");
    await user.click(screen.getByRole("button", { name: "Kiểm tra" }));
    expect(onSolved).toHaveBeenCalled();
  });
});
