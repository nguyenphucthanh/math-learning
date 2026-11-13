// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { BangKiemDem, tallySplit } from "@/components/math/kiem-dem";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GhiKiemDem, ghiKiemDemCaptions } from "./_animations/ghi-kiem-dem";
import { SoSanhLan, soSanhCaptions } from "./_animations/so-sanh-lan";
import { DuaTho } from "./_game/tro-choi";
import { VongQuay } from "./_illustrations/vong-quay";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("BangKiemDem", () => {
  it("vẽ đúng số nét: 9 và 11, mỗi nhóm 5 có 1 nét chéo", () => {
    const { container } = render(
      <BangKiemDem
        rows={[
          { label: "Đỏ", count: 9 },
          { label: "Vàng", count: 11 },
        ]}
      />,
    );
    const strokes = container.querySelectorAll("line[stroke-linecap]");
    expect(strokes).toHaveLength(9 + 11);
    expect([...strokes].filter((l) => l.getAttribute("x1") !== l.getAttribute("x2"))).toHaveLength(1 + 2);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Vàng: 11 nét");
    expect(tallySplit(9)).toEqual({ groups: 1, rest: 4 });
    expect(tallySplit(11)).toEqual({ groups: 2, rest: 1 });
  });
});

describe("animation", () => {
  it("vòng quay có 2 màu", () => {
    render(<VongQuay />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("2 phần màu đỏ và 2 phần màu vàng");
  });

  it("ghi kiểm đếm: bấm hết các bước, ra 9 và 11, xem lại được", async () => {
    const user = userEvent.setup();
    const { container } = render(<GhiKiemDem />);
    const labels = () => [...container.querySelectorAll("svg[role=img]")].map((s) => s.getAttribute("aria-label"));
    expect(labels()[0]).toContain("Đã quay 0 lần");
    for (let i = 1; i < ghiKiemDemCaptions.length; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(labels()[0]).toContain("Đã quay 20 lần: 9 lần đỏ, 11 lần vàng");
    expect(labels()[1]).toContain("Phần màu vàng: 11 nét");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(labels()[0]).toContain("Đã quay 0 lần");
  });

  it("so sánh số lần: 3 bước, còn 2 chấm vàng", async () => {
    const user = userEvent.setup();
    render(<SoSanhLan />);
    for (let i = 1; i < soSanhCaptions.length; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("nhiều lần hơn đỏ 2 lần");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("9 chấm");
  });
});

describe("bộ bài tập", () => {
  it("hiện đủ nhóm, bắt đầu từ 0 câu", () => {
    const total = exerciseGroups.flatMap((g) => g.questions).length;
    render(<ExerciseSet lessonSlug="bai-51" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});

describe("trò chơi Đua thỏ", () => {
  it("chưa gieo thì chưa có kết quả; gieo bằng rng tiêm vào thì ghi kiểm đếm", async () => {
    const user = userEvent.setup();
    const values = [0.5, 0.2, 0, 0.5, 0.9, 0.9];
    let i = 0;
    render(<DuaTho rng={() => values[i++ % values.length]} />);
    expect(screen.getByText("Chưa gieo lần nào.")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Gieo" }));
    expect(screen.getByText("4 × 2 = 8")).toBeTruthy();
    expect(screen.getByText(/Thỏ Chẵn tiến 1 ô. Đã gieo 1 lần/)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Gieo" }));
    expect(screen.getByText("1 × 4 = 4")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Chơi ván mới" }));
    expect(screen.getByText("Chưa gieo lần nào.")).toBeTruthy();
  });

  it("thỏ đến đích thì khóa nút Gieo", async () => {
    const user = userEvent.setup();
    render(<DuaTho rng={() => 0.5} />);
    for (let n = 0; n < 6; n += 1) await user.click(screen.getByRole("button", { name: "Gieo" }));
    expect(screen.getByText(/Thỏ Chẵn đến đích trước/)).toBeTruthy();
    expect((screen.getByRole("button", { name: "Gieo" }) as HTMLButtonElement).disabled).toBe(true);
  });
});
