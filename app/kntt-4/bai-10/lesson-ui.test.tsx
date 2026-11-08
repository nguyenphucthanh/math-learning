// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { BangHangSau, sixDigits } from "./_animations/bang-hang-sau";
import { LienSauTrieu } from "./_animations/lien-sau-trieu";
import { TramNghin } from "./_animations/tram-nghin";
import { exerciseGroups } from "./bai-tap";

beforeAll(() => {
  window.matchMedia = ((query: string) => ({ matches: true, media: query, addEventListener() {}, removeEventListener() {} })) as unknown as typeof window.matchMedia;
});

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

const label = () => (screen.getByRole("img").getAttribute("aria-label") ?? "").replace(/\u00a0/g, " ");

async function clickThrough(steps: number) {
  const user = userEvent.setup();
  for (let i = 0; i < steps; i += 1) await user.click(screen.getByRole("button", { name: "Tiếp" }));
  return user;
}

describe("bảng hàng sáu chữ số", () => {
  it("tách đủ sáu chữ số, giữ chữ số 0", () => {
    expect(sixDigits(226372)).toEqual([2, 2, 6, 3, 7, 2]);
    expect(sixDigits(300475)).toEqual([3, 0, 0, 4, 7, 5]);
  });

  it("đi hết các bước thì thấy số thẻ, chữ số và cách đọc; xem lại được", async () => {
    render(<BangHangSau value={300475} reading="ba trăm nghìn bốn trăm bảy mươi lăm" />);
    expect(label()).toContain("Chưa có thẻ nào");
    const user = await clickThrough(3);
    expect(label()).toContain("3, 0, 0, 4, 7, 5");
    expect(screen.getByText(/ba trăm nghìn bốn trăm bảy mươi lăm/, { selector: "p" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("Chưa có thẻ nào");
  });
});

describe("đếm thêm 100 000", () => {
  it("đi hết các bước thì vạch cuối là 1 000 000", async () => {
    render(<TramNghin />);
    expect(label()).toContain("0 đến 500 000");
    await clickThrough(2);
    expect(label()).toContain("1 000 000");
    expect(screen.getByText(/Mười lần/)).toBeTruthy();
  });
});

describe("liền sau của 999 999", () => {
  it("đi hết các bước thì ra 1 000 000 có 7 chữ số", async () => {
    render(<LienSauTrieu />);
    expect(label()).toContain("Vạch cuối chưa ghi số");
    await clickThrough(3);
    const text = label();
    expect(text).toContain("một triệu");
    expect(text).toContain("7 chữ số");
  });
});

describe("bộ bài tập", () => {
  it("hiển thị được cả ba nhóm", () => {
    render(<ExerciseSet lessonSlug="bai-10" groups={exerciseGroups} />);
    for (const group of exerciseGroups) expect(screen.getByText(group.title)).toBeTruthy();
  });
});
