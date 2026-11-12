// @vitest-environment jsdom
import { ExerciseSet } from "@/components/exercises/exercise-set";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { BoChuSo0, chiaNham } from "./_animations/bo-chu-so-0";
import { ChiaHaiChuSo, chiaHaiCaptions } from "./_animations/chia-hai-chu-so";
import { judge, UocLuongThuong } from "./_animations/uoc-luong-thuong";
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

describe("chia cho số có hai chữ số", () => {
  it("216 : 12: đọc theo SGK, ra 18; xem lại được", async () => {
    render(<ChiaHaiChuSo a={216} divisor={12} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa chia");
    const captions = chiaHaiCaptions(216, 12);
    expect(captions).toHaveLength(3);
    expect(captions[1]).toContain("21 chia 12 được 1, viết 1. 1 nhân 2 bằng 2, viết 2. 1 nhân 1 bằng 1, viết 1. 21 trừ 12 bằng 9, viết 9.");
    expect(captions[2]).toContain("Hạ 6, được 96; 96 chia 12 được 8, viết 8. 8 nhân 2 bằng 16, viết 6 nhớ 1. 8 nhân 1 bằng 8, thêm 1 bằng 9, viết 9. 96 trừ 96 bằng 0, viết 0.");
    const user = await clickThrough(2);
    expect(["q-0", "q-1"].map((id) => screen.getByTestId(id).textContent).join("")).toBe("18");
    expect(screen.getByTestId("prod-1").textContent).toBe("96");
    expect(screen.getByTestId("rem-1").textContent).toBe("0");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("18");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa chia");
  });

  it("218 : 18: dư 2", async () => {
    render(<ChiaHaiChuSo a={218} divisor={18} />);
    await clickThrough(2);
    expect(screen.getByTestId("rem-1").textContent).toBe("2");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("dư 2");
  });

  it("4 896 : 12: thương có chữ số 0, ra 408", async () => {
    render(<ChiaHaiChuSo a={4896} divisor={12} />);
    expect(chiaHaiCaptions(4896, 12)[2]).toBe("Hạ 9; 9 chia 12 được 0, viết 0.");
    await clickThrough(3);
    expect(["q-0", "q-1", "q-2"].map((id) => screen.getByTestId(id).textContent).join("")).toBe("408");
  });
});

describe("ước lượng thương", () => {
  it("judge: quá lớn, quá bé, vừa", () => {
    expect(judge(96, 12, 9)).toBe("lon");
    expect(judge(96, 12, 8)).toBe("vua");
    expect(judge(38, 18, 1)).toBe("nho");
    expect(judge(38, 18, 2)).toBe("vua");
  });

  it("96 : 12: thử 9 rồi 8, hiện từng dòng", async () => {
    render(<UocLuongThuong current={96} divisor={12} tries={[9, 8]} />);
    expect(screen.getByTestId("try-0").className).toContain("invisible");
    await clickThrough(3);
    expect(screen.getByTestId("try-0").className).not.toContain("invisible");
    expect(screen.getByTestId("try-1").className).not.toContain("invisible");
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("vừa đúng");
  });
});

describe("chia nhẩm bỏ chữ số 0", () => {
  it("chiaNham: 45 000 : 900 = 450 : 9; không xoá quá số chữ số 0", () => {
    expect(chiaNham(45000, 900, 2)).toEqual({ a: 450, b: 9, quotient: 50 });
    expect(() => chiaNham(450, 90, 2)).toThrow();
  });

  it("bấm hết 2 bước", async () => {
    render(<BoChuSo0 a={450} b={90} zeros={1} />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa xoá");
    await clickThrough(2);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("= 5");
  });
});

describe("bộ bài tập", () => {
  it("đủ các nhóm, bắt đầu từ 0 câu, hiện đủ tiêu đề", () => {
    const total = exerciseGroups.flatMap((group) => group.questions).length;
    render(<ExerciseSet lessonSlug="bai-44" groups={exerciseGroups} />);
    expect(screen.getByText(`${0}/${total}`)).toBeTruthy();
    for (const group of exerciseGroups) expect(screen.getByRole("heading", { name: group.title })).toBeTruthy();
  });
});
