import { describe, expect, it } from "vitest";
import { docSo } from "./doc-so";

describe("docSo", () => {
  it("khớp các ví dụ của SGK", () => {
    expect(docSo(3274685)).toBe("ba triệu hai trăm bảy mươi tư nghìn sáu trăm tám mươi lăm");
    expect(docSo(7060215)).toBe("bảy triệu không trăm sáu mươi nghìn hai trăm mười lăm");
    expect(docSo(640205718)).toBe("sáu trăm bốn mươi triệu hai trăm linh năm nghìn bảy trăm mười tám");
    expect(docSo(2050300)).toBe("hai triệu không trăm năm mươi nghìn ba trăm");
  });

  it("chữ số 0 ở giữa và các âm đặc biệt", () => {
    expect(docSo(1000000)).toBe("một triệu");
    expect(docSo(381005)).toBe("ba trăm tám mươi mốt nghìn không trăm linh năm");
    expect(docSo(1621494)).toBe("một triệu sáu trăm hai mươi mốt nghìn bốn trăm chín mươi tư");
    expect(docSo(2760053)).toBe("hai triệu bảy trăm sáu mươi nghìn không trăm năm mươi ba");
    expect(docSo(15)).toBe("mười lăm");
    expect(docSo(105)).toBe("một trăm linh năm");
  });
});
