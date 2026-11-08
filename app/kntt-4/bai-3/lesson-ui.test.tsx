// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GhepCap } from "./_animations/ghep-cap";
import { PhoSoNha } from "./_animations/pho-so-nha";
import { TiaSoChanLe } from "./_animations/tia-so-chan-le";

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

describe("animation số chẵn, số lẻ", () => {
  it("ghép cặp: 3 bước, xem lại được", async () => {
    render(<GhepCap />);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa ghép cặp");
    const user = await clickThrough(2);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("số chẵn");
    expect(screen.getByText("13 : 2 = 6 dư 1: số lẻ", { selector: "text" })).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("chưa ghép cặp");
  });

  it("phố số nhà: 4 bước, cuối cùng nêu chữ số tận cùng", async () => {
    render(<PhoSoNha />);
    const user = await clickThrough(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("tận cùng");
    await user.click(screen.getByRole("button", { name: "Xem lại" }));
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("Hai dãy nhà");
  });

  it("tia số: 4 bước, có cung +2", async () => {
    render(<TiaSoChanLe />);
    await clickThrough(3);
    expect(screen.getByRole("img").getAttribute("aria-label")).toContain("hơn kém nhau 2");
    expect(screen.getAllByText("+2", { selector: "text" })).toHaveLength(6);
  });
});
