# Brief — Bài 12. Các số trong phạm vi lớp triệu

- SGK: Toán 4 KNTT tập một, trang 41-44, chủ đề 3 (Số có nhiều chữ số).
- Route: `/kntt-4/bai-12`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên không dừng chờ duyệt).

## Đánh giá

**Vị trí bài.** Bài trước: Bài 11 (hàng và lớp: đơn vị, nghìn; chưa làm trong app). Bài sau: Bài 13 (làm tròn đến hàng trăm nghìn). Bài ôn lại nó: Bài 16, Bài 33, Bài 37.

**Cấu trúc SGK.** Khám phá (a: đọc số 149 597 876 qua bảng hàng và lớp; b: số liền sau 999 999 999 là 1 000 000 000, đọc là một tỉ) → Hoạt động 3 bài (đọc số dân; viết số thành tổng; chữ số gạch chân thuộc hàng nào, lớp nào) → Luyện tập tiết 1 (4 bài: Đ/S về hàng và lớp; điền bảng hàng và lớp; ghép mảnh giấy; ô chữ) → Luyện tập tiết 2 (4 bài: đọc số trên bàn tính; hàng và lớp của chữ số gạch chân; mật khẩu két sắt; ghép mảnh thành số chín chữ số).

**Mục tiêu.**

1. Nói được ba lớp của số có chín chữ số: lớp đơn vị, lớp nghìn, lớp triệu; mỗi lớp ba hàng.
2. Đọc và viết số có đến chín chữ số, kể cả khi có chữ số 0 ở giữa.
3. Nói được một chữ số thuộc hàng nào, lớp nào.
4. Viết số thành tổng các hàng.
5. Biết số liền sau của 999 999 999 là 1 000 000 000 (một tỉ), có 10 chữ số.
6. Đọc số trên bàn tính theo từng lớp.

**Kiến thức cần có.** Hàng và lớp đến lớp nghìn (Bài 11), số có sáu chữ số, số 1 000 000 (Bài 10), viết số thành tổng (Bài 1).

**Điểm mấu chốt.**

- SGK chỉ nêu bảng rồi đọc luôn, không nói quy tắc. Bài này đưa ra quy tắc "chia nhóm ba chữ số từ phải sang trái, đọc từng nhóm kèm tên lớp" trước khi đọc, và cho con thấy lớp triệu giống lớp nghìn về cách đọc.
- Chỗ dễ lẫn: chữ số 0 ở giữa (đọc "không trăm", "linh"), nhầm "chục triệu" với "triệu", nhầm lớp với hàng.
- Bẫy của SGK: Luyện tập 4 trang 44 (ghép mảnh) không nói rõ thứ tự mảnh, chỉ có hình khớp mảnh quyết định. Bài 3 trang 43 (mảnh giấy) có hai cách ghép, chỉ hình mép giấy phân biệt. App thêm điều kiện bằng lời để chỉ có một đáp án.
- Bàn tính trang 44: số hạt đọc từ hình, mỗi bàn tính có cột 0 hạt. Đáp án đọc từ ảnh nên xem lại trước khi cho Phụ huynh (xem Phụ lục).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Bỏ "không trăm" hoặc "linh" | 402 000 650 đọc "bốn trăm linh hai triệu sáu mươi lăm" (đúng: "…sáu trăm năm mươi") | Animation `DocSoLopTrieu`: đọc từng lớp, lớp nghìn 000 thì không đọc |
| Viết số sai số chữ số 0 | "bảy mươi lăm triệu tám nghìn ba trăm" viết 75 800 300 (đúng 75 008 300) | `QuickCheck` viết số từ lời; nhắc chia thành ba nhóm ba chữ số |
| Nhầm hàng chục triệu với lớp | chữ số 6 trong 164 280 937 ở "hàng triệu" (đúng: hàng chục triệu, lớp triệu) | `BangHangLop` tô vàng ô; câu trắc nghiệm `hl-4` |
| Nhầm "hàng" với "lớp" | "chữ số 3 thuộc lớp trăm nghìn" (đúng: hàng trăm nghìn, lớp nghìn) | `KeyFact` "hàng nằm trong lớp" |
| Quên rằng 999 999 999 + 1 có 10 chữ số | số liền sau là 100 000 000 (thiếu một chữ số 0) | Animation `MotTi`: thấy hàng mới xuất hiện bên trái |
| Bàn tính: cột trống bị bỏ | cột 0 hạt không viết chữ số 0 (3 hạt, 0 hạt, 2 hạt thành 32) | Câu bàn tính nhắc "cột không có hạt là chữ số 0" |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Dùng | Đếm hạt trên bàn tính, đếm 9 chữ số 0 trong một tỉ |
| Tách | Dùng | Tách số thành ba lớp để đọc; tách thành tổng |
| So sánh | Không dùng | Bài 14 mới dạy so sánh |
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: hàng của chữ số trong số sáu chữ số, viết tổng, số liền sau |
| Bốn kênh | Dùng | Nói (đọc to), hình (bảng, bàn tính), nhẩm (số liền sau), viết (viết tổng). Không thiếu kênh nào |
| Câu tư duy | Dùng một phần | Tìm lỗi sai (`st-1`) và gấp mấy lần (`st-2`, `st-4`), đặt trong "Suy nghĩ thêm" |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-hang` | trac-nghiem | Chữ số 8 trong 538 204 thuộc hàng nào | **Hàng nghìn** |
| `kd-tong` | dien-so | 40 000 + 3 000 + 200 + 5 = ? | **43 205** |
| `kd-lien-sau` | dien-so | Số liền sau của 99 999 | **100 000** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-doc` | trac-nghiem | Đọc 305 072 401 | **ba trăm linh năm triệu không trăm bảy mươi hai nghìn bốn trăm linh một** |
| `thu-hang-lop` | trac-nghiem | Chữ số 6 trong 164 280 937 | **Hàng chục triệu, lớp triệu** |
| `thu-tong` | dien-so | Viết 40 205 030 thành tổng | **40 000 000 + 200 000 + 5 000 + 30** |
| `thu-mot-ti` | dien-so | Số liền sau của 999 999 999 | **1 000 000 000** |

**Vượt SGK** (nhóm Suy nghĩ thêm): `st-2` thêm 0 vào bên phải 8 500 000 thì gấp **10** lần; `st-4` một tỉ gấp một triệu **1 000** lần. Lý do: hiểu mỗi hàng gấp hàng bên phải 10 lần, là nền cho nhân với 10, 100, 1 000 sau này.

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng của bài: lỗi hay gặp là bỏ "linh", "không trăm"; nhầm hàng và lớp; bàn tính có cột trống. Hoạt động ôn: đọc to số điện thoại, số dân, giá nhà trong tờ rơi hoặc bản tin, chia nhóm ba chữ số rồi đọc. Dấu hiệu: con tự chia lớp bằng tay trước khi đọc, nói được "một tỉ có chín chữ số 0".

## Phần Lý thuyết

Chặng theo thứ tự cụ thể → hình ảnh → ký hiệu.

1. **Bảng hàng và lớp (cụ thể → hình).** Bảng `BangHangLop` số 149 597 876. `KeyFact`: ba lớp, mỗi lớp ba hàng. `QuickCheck` `thu-hang-lop`.
2. **Đọc số (hình → ký hiệu).** Animation `DocSoLopTrieu`, 4 bước: số chia ba lớp; đọc lớp triệu; đọc lớp nghìn; đọc lớp đơn vị. `KeyFact`: đọc từng lớp, trái sang phải; 0 vẫn đọc. `QuickCheck` `thu-doc`.
3. **Viết số thành tổng.** Ví dụ 109 140 903 (có hai chữ số 0). `KeyFact`: hàng có chữ số 0 bỏ qua. `QuickCheck` `thu-tong`.
4. **Bàn tính.** Hình `BanTinh` số 372 100 425 (có cột trống). `KeyFact`: số hạt mỗi cột là chữ số; cột không có hạt là 0.
5. **Một tỉ.** Animation `MotTi`, 3 bước: 999 999 999; thêm 1; 1 000 000 000 đọc là một tỉ. `KeyFact`: một tỉ có 10 chữ số, 9 chữ số 0. `QuickCheck` `thu-mot-ti`.

Bố cục 390px: `DocSoLopTrieu` viewBox 340 rộng, 9 ô rộng 34; `MotTi` viewBox 340, 10 ô rộng 28; `BanTinh` viewBox 360, chữ từ 14 trở lên.

## Phần Bài tập

Nhóm theo phần SGK, đổi số liệu. Đáp án in đậm.

**Đọc số, viết số (Hoạt động 1)**

- `ds-1` `trac-nghiem`: đọc 78 205 109 → **bảy mươi tám triệu hai trăm linh năm nghìn một trăm linh chín**
- `ds-2` `trac-nghiem`: đọc 402 000 650 → **bốn trăm linh hai triệu sáu trăm năm mươi**
- `ds-3` `dien-so`: viết "bảy mươi lăm triệu không trăm linh tám nghìn ba trăm" → **75 008 300**
- `ds-4` `dien-so`: 6 triệu, 4 trăm nghìn, 2 chục nghìn, 9 đơn vị → **6 420 009**

**Hàng và lớp (Hoạt động 3, Luyện tập tiết 1 bài 1, 2)**

- `hl-1` `trac-nghiem` (thay Đ/S): số 52 316 704, câu đúng → **chữ số 3 thuộc hàng trăm nghìn**
- `hl-2` `dien-so`: 603 245 187 vào từng lớp → **6, 0, 3 | 2, 4, 5 | 1, 8, 7**
- `hl-3` `dien-so`: lớp triệu 910, lớp nghìn 003, lớp đơn vị 070 → **910 003 070**
- `hl-4` `trac-nghiem`: chữ số 4 trong 25 349 018 → **hàng chục nghìn, lớp nghìn**
- `hl-5` `noi-cap`: giá trị chữ số 7 trong 70 213 000, 4 700 810, 315 072 960, 826 400 007 → **70 000 000, 700 000, 70 000, 7**

**Viết thành tổng (Hoạt động 2)**

- `vt-1` 36 400 502 = **30 000 000 + 6 000 000 + 400 000 + 500 + 2**
- `vt-2` 270 018 004 = **200 000 000 + 70 000 000 + 10 000 + 8 000 + 4**
- `vt-3` 4 060 090 = **4 000 000 + 60 000 + 90**
- `vt-4` `dien-so`: 50 000 000 + 3 000 000 + ? + 40 = 53 200 040 → **200 000**

**Bàn tính (Luyện tập tiết 2 bài 1)** — `dien-so`, hình `BanTinh`

- `bt-1` → **208 530 047**
- `bt-2` → **5 060 900**
- `bt-3` → **71 004 320**

**Một tỉ, số liền trước, số liền sau (Khám phá b, Luyện tập tiết 1 bài 4)**

- `ls-1` số liền sau của 99 999 999 → **100 000 000**
- `ls-2` số liền trước của 10 000 000 → **9 999 999**
- `ls-3` 1 000 000 000 có **10** chữ số, trong đó **9** chữ số 0
- `ls-4` số lớn nhất có chín chữ số → **999 999 999**
- `ls-5` số bé nhất có chín chữ số → **100 000 000**

**Ghép số, mật khẩu (Luyện tập tiết 1 bài 3, tiết 2 bài 3, 4)**

- `gs-1` `dien-so`: mảnh 000, 64 128, 92 037, 514; biết số bé hơn tận cùng 000 → **64 128 000** và **92 037 514** (thêm điều kiện để chỉ có một đáp án)
- `gs-2` `trac-nghiem`: số chín chữ số, lớp nghìn không có chữ số 0, chữ số hàng chục triệu là số lẻ → **253 618 940**
- `gs-3` `dien-so`: mảnh 407, 096, 250, ghép số chín chữ số lớn nhất → **407 250 096** (SGK không nói rõ ghép số nào, nên chọn "lớn nhất")

**Suy nghĩ thêm**

- `st-1` `trac-nghiem` (tìm lỗi): Nam viết "năm mươi triệu không trăm linh hai nghìn" là 50 200 000 → đúng **50 002 000**
- `st-2` `dien-so` *(vượt SGK)*: thêm chữ số 0 bên phải 8 500 000, số mới gấp **10** lần
- `st-3` `noi-cap` (ô chữ): nối manh mối với số → **số liền sau 999 999 999 → 1 000 000 000; ba trăm hai mươi triệu → 320 000 000; 2 000 000 + 100 000 + 50 000 + 2 000 → 2 152 000; số liền trước 1 000 000 → 999 999**
- `st-4` `dien-so` *(vượt SGK)*: một tỉ gấp một triệu **1 000** lần

## Kỹ thuật

- Thêm `BanTinh` trong `_illustrations/` (Server Component), `DocSoLopTrieu` và `MotTi` trong `_animations/`. Dùng lại `BangHangLop` trong `components/math/` và `docSo` trong `lib/doc-so.ts`.
- Không thêm dạng bài, đơn vị, màu.
- `lib/lessons.ts`: đặt `available` của Bài 12 thành `true`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: **hàng**, **lớp**, **lớp triệu**, **lớp nghìn**, **lớp đơn vị**, **chục triệu**, **trăm triệu**, **một tỉ**. Dùng "linh" khi đọc số có 0 ở hàng chục.
- Số viết tách lớp bằng NBSP.
- Không dạy: lớp tỉ, đọc số trên một tỉ, so sánh, làm tròn.

## Câu hỏi cần chốt

1. Đ/S của SGK dùng `trac-nghiem` "câu nào đúng"? Đề xuất: **có**, vì chưa có dạng `dung-sai` và chưa bài nào cần.
2. Có thêm điều kiện cho bài ghép mảnh giấy? Đề xuất: **có**, để đáp án duy nhất (SGK chỉ phân biệt bằng hình mép giấy).
3. Bàn tính dùng số hạt riêng, không chép lại hình SGK? Đề xuất: **dùng số riêng**, tránh phải đọc đáp án từ ảnh mờ.
4. Có giữ hai câu vượt SGK `st-2`, `st-4`? Đề xuất: **giữ**, đặt cuối nhóm.

## Phụ lục: đáp án SGK

**Trang 41-42**

- Khám phá a: 149 597 876 gồm 1 trăm triệu, 4 chục triệu, 9 triệu, 5 trăm nghìn, 9 chục nghìn, 7 nghìn, 8 trăm, 7 chục, 6 đơn vị; đọc là một trăm bốn mươi chín triệu năm trăm chín mươi bảy nghìn tám trăm bảy mươi sáu. Khám phá b: số liền sau 999 999 999 là 1 000 000 000, đọc là một tỉ.
- Hoạt động 1: 126 476 461 một trăm hai mươi sáu triệu bốn trăm bảy mươi sáu nghìn bốn trăm sáu mươi mốt; 97 338 579 chín mươi bảy triệu ba trăm ba mươi tám nghìn năm trăm bảy mươi chín; 273 523 615 hai trăm bảy mươi ba triệu năm trăm hai mươi ba nghìn sáu trăm mười lăm. (Số dân lấy từ hình trong sách, chưa đối chiếu nguồn.)
- Hoạt động 2: 109 140 903 = 100 000 000 + 9 000 000 + 100 000 + 40 000 + 900 + 3; 3 045 302 = 3 000 000 + 40 000 + 5 000 + 300 + 2.
- Hoạt động 3 (chữ số gạch chân đọc từ hình): 63 782 910: chữ số 8, hàng chục nghìn, lớp nghìn; 839 000 038: chữ số 3, hàng chục triệu, lớp triệu; 9 300 037: chữ số 3, hàng chục, lớp đơn vị; 239 111 003: chữ số 2, hàng trăm triệu, lớp triệu.
- Luyện tập 1: a) Đ b) S (chữ số 0 ở hàng trăm nghìn) c) Đ d) S (chữ số 3 thuộc lớp đơn vị).

**Trang 43**

- Bài 2: 200 198 261; 1 999 371 (lớp triệu: 1, lớp nghìn: 9, 9, 9, lớp đơn vị: 3, 7, 1); 28 111 031 (2, 8 | 1, 1, 1 | 0, 3, 1); 714 000 106.
- Bài 3: 17 483 000 và 75 175 226 (theo hình mép giấy; cách ghép còn lại 17 483 226 và 75 175 000).
- Bài 4: CỔ LOA (980 000 000 là C; 1 000 000 000 là Ổ; 2 152 000 là L; 999 999 là O; 968 000 000 là A).

**Trang 44**

- Bài 1 (bàn tính đọc từ ảnh, nên kiểm tra lại): 372 100 425; 46 014 951; 1 000 431; 302 444 203.
- Bài 2 (chữ số gạch chân đọc từ hình): 13 341 411: chữ số 4, hàng trăm, lớp đơn vị; 324 294 185: chữ số 3, hàng trăm triệu, lớp triệu; 2 000 001: hàng chục, lớp đơn vị; 540 231 007: chữ số 2, hàng trăm nghìn, lớp nghìn.
- Bài 3: **D** 537 991 833.
- Bài 4: thứ tự mảnh theo hình khớp; nếu ghép 304 102 028 thì lớp triệu là 304, lớp nghìn 102, lớp đơn vị 028.
