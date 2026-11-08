// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { ChuThayCho } from "./_animations/chu-thay-cho";
import { CongThucChuVi } from "./_animations/cong-thuc-chu-vi";
import { ThayChu } from "./_animations/thay-chu";
import { ThuTuTinh } from "./_animations/thu-tu-tinh";

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

const label = () => screen.getByRole("img").getAttribute("aria-label");

describe("animation biểu thức chứa chữ", () => {
  it("chữ thay cho số: 4 bước, xem lại được", async () => {
    render(<ChuThayCho />);
    expect(label()).toContain("chưa biết");
    await clickThrough(1);
    expect(label()).toContain("2 + a");
    await clickThrough(1);
    expect(label()).toContain("6 thuyền");
    const user = await clickThrough(1);
    expect(label()).toContain("14 thuyền");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("chưa biết");
  });

  it("thay chữ: 4 bước, tính ra 25 rồi 30", async () => {
    render(<ThayChu />);
    await clickThrough(2);
    expect(label()).toContain("= 25");
    const user = await clickThrough(1);
    expect(label()).toContain("= 30");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("chứa chữ b");
  });

  it("công thức chu vi: a = 5 rồi a = 9", async () => {
    render(<CongThucChuVi />);
    await clickThrough(2);
    expect(label()).toContain("20 cm");
    const user = await clickThrough(1);
    expect(label()).toContain("36 cm");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("cạnh dài a");
  });

  it("thứ tự tính: nhân trước, cộng sau, ra 65", async () => {
    render(<ThuTuTinh />);
    await clickThrough(2);
    expect(label()).toContain("Nhân trước");
    const user = await clickThrough(1);
    expect(label()).toContain("= 65");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(label()).toContain("35 + 5 × a");
  });
});
