# Brief — Bài 34. Ôn tập phép cộng, phép trừ

- SGK: Toán 4 KNTT tập một, trang 118–120, chủ đề 7 (Ôn tập học kì 1). Chỉ có phần Luyện tập: 4 bài (trang 118), 4 bài (trang 119), 4 bài (trang 120).
- Route: `/kntt-4/bai-34`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên chưa có bước duyệt riêng; các quyết định ở mục "Câu hỏi cần chốt" là đề xuất đã áp dụng)

## Đánh giá

**Vị trí bài.** Bài ôn thứ hai của chủ đề 7, sau Bài 33 (số đến lớp triệu), trước Bài 35 (hình học). Ôn lại chủ đề 5 "Phép cộng và phép trừ" (Bài 22–26).

**Cấu trúc SGK.** Chỉ có Luyện tập, không có Khám phá. Trang 118: tính nhẩm, đặt tính, so sánh giá trị biểu thức, bài toán ba món đồ. Trang 119: tính nhẩm số triệu, đặt tính 6 chữ số, mua đồ (trả lại tiền, chọn ba món), tính thuận tiện. Trang 120: đặt tính, Đúng hay Sai, tổng–hiệu (đường sắt), so sánh hai biểu thức.

**Bài nguồn** (thay cho "mục tiêu"; cũng là kiến thức cần có):

| Bài | Nội dung | Dùng ở |
|---|---|---|
| 22 | Cộng các số nhiều chữ số | đặt tính cộng (118 B2, 119 B2, 120 B1) |
| 23 | Trừ các số nhiều chữ số | đặt tính trừ |
| 24 | Giao hoán, kết hợp | tính thuận tiện (119 B4) |
| 25 | Tổng và hiệu | 120 B3, 118 B4 |
| 26 | Luyện tập chung | mua đồ, trả lại tiền |
| 14 | So sánh số | so sánh biểu thức (118 B3, 120 B4) |

**Điểm mấu chốt.**

- SGK chỉ cho đề, không nhắc lại quy tắc. Con phải nhớ: biểu thức không ngoặc tính từ trái sang phải, ngoặc làm trước; đặt tính thẳng cột.
- Biểu thức có ngoặc ở cả hai bài so sánh (118 B3 câu B, 120 B4 câu a). Dễ nhầm ngoặc với dấu trừ liền sau.
- 118 B4 và 120 B3 đều có dạng "tổng và hiệu" nhưng 118 B4 là ba số, không phải hai: tìm số nhỏ nhất (đôi tất) bằng phép trừ trước, rồi mới tính tiếp.
- 119 B3b: chỉ một cách chọn ba món đủ 200 000 đồng; phải cộng cả bốn cách. Trong app đổi giá nhưng vẫn giữ đúng một cách đủ tiền.
- Dữ kiện đường sắt Hà Nội – Đà Nẵng là số liệu thật của SGK; trong app dùng chuyến xe khác, không nêu như sự thật.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Làm sai thứ tự phép tính | 150 000 − 70 000 + 40 000 làm thành 150 000 − 110 000 = 40 000 (đúng 120 000) | KeyFact "từ trái sang phải, ngoặc làm trước". Câu `st-tim-loi` |
| Lệch hàng khi đặt tính | 172 640 − 94 785 viết 94 785 dịch sang trái | Hình `DatTinh` có cột thẳng hàng; câu `dt-2` đến `dt-6` |
| Quên nhớ khi trừ | 50 003 − 4 728 ra 46 285 (đúng 45 275) | Khởi động `kd-tru`; lời giải `explainColumnSub` từng cột |
| Đổi chỗ mà bỏ dấu trừ | 38 450 + 6 700 − 1 450 thành 38 450 + 1 450 − 6 700 | KeyFact "dấu trừ đi cùng số sau nó"; câu `tt-3` |
| Quên chia 2 khi tìm hai số | 684 − 126 = 558 rồi cho 558 là một đoạn | Lời giải 3 bước; câu `bt-tong-hieu` có sơ đồ |
| Gán nhầm đoạn dài hơn | "A–B dài hơn B–C" nhưng điền ngược | Sơ đồ `SoDoDon`: đoạn trên dài hơn đoạn dưới |
| So biểu thức mà chưa tính vế | 168 900 − (250 900 − 90 050) và 9 000 − 2 500 + 1 000 chọn theo chữ số đầu | KeyFact "tính từng vế rồi mới so"; câu `ss-1` đến `ss-3` |
| Câu Đúng hay Sai: tin kết quả đã viết | 70 000 + 50 000 = 100 000 chọn Đúng | Tính lại rồi đối chiếu; câu `ds-1`, `ds-3`, `thu-dung-sai` |
| Chọn món chưa cộng đủ ba giá | chọn A vì có hộp xếp hình đắt nhất | Cộng đủ bốn cách; câu `bt-du-tien` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Đủ | 3 câu Khởi động chính là "Nhắc lại nhanh": nhẩm, đặt tính trừ, tổng–hiệu; kết quả chỉ dùng tại chỗ |
| Tách | Đủ | Nhẩm số tròn theo "mấy chục nghìn, mấy trăm nghìn, mấy triệu"; ghép cặp ra số tròn khi thuận tiện |
| So sánh | Đủ | So giá trị hai biểu thức, lớn nhất/bé nhất; "nhiều hơn" trong đề tổng–hiệu |
| Bốn kênh | Rà đủ | Nói: giải thích bước; hình: `DatTinh`, `SoDoDon`; nhẩm: `nham-*`; viết: đặt tính, lời văn |
| Câu tư duy | Vừa | `st-tim-loi` (tìm lỗi), `st-uoc-luong` (ước lượng), `thu-dung-sai`/`ds-*` (kiểm tra) |
| Đếm | Không dùng | Bài không có quy luật theo bước |

**Khởi động**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-nham` | `dien-so` | 400 000 + 300 000 − 200 000 | **500 000** |
| `kd-tru` | `dien-so` | 50 003 − 4 728 | **45 275** |
| `kd-tong-hieu` | `dien-so` | Tổng 90, hiệu 20, tìm số lớn | **55** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `nham` | `dien-so` | 12 000 000 − 5 000 000 + 4 000 000 | **11 000 000** |
| `tru` | `dien-so` | 60 000 − 3 475 | **56 525** |
| `thuanTien` | `dien-so` | 7 400 + 3 600 + 5 250 | **16 250** |
| `tongHieu` | `dien-so` | Tổng 18, hiệu 4 | số bé **7**, số lớn **11** |
| `dungSai` | `trac-nghiem` | 300 000 + 400 000 − 500 000 = 400 000 | **Sai** (đúng 200 000) |

**Suy nghĩ thêm**: `st-tim-loi` và `st-uoc-luong`, đều **vượt SGK** để con tự kiểm tra: tìm lỗi thứ tự phép tính, và ước lượng bằng làm tròn (Bài 13) để phát hiện lệch hàng.

## Phần Phụ huynh

Theo mẫu 6 mục, chỉ ghi ý riêng:

- Con học gì: ôn cả chủ đề 5. Nếu sai nhóm nào thì xem lại bài nào (Bài 22 cộng, 23 trừ, 24 thuận tiện, 25–26 tổng–hiệu, 14 so sánh).
- Lỗi: thứ tự phép tính, lệch hàng, quên nhớ khi trừ, bỏ dấu trừ khi đổi chỗ, quên chia 2.
- Hoạt động: đi chợ, cộng giá ghép cặp, hỏi "200 000 đồng có đủ không, còn thừa bao nhiêu", đố tổng–hiệu về giá hai món.
- Dấu hiệu: con tự nói "từ trái sang phải" hoặc "trong ngoặc trước"; con kiểm tra phép tính bằng cách tính lại.
- Đáp án SGK trong khối `Fold`.

## Phần Lý thuyết

Là "Nhắc lại nhanh", chỉ một chương (chủ đề 5), 5 điểm, không có animation.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Nhẩm số tròn, từ trái sang phải, ngoặc trước | 22, 23 | Ví dụ "12 triệu − 5 triệu + 4 triệu" + `KeyFact` + `QuickCheck` `nham` |
| Đặt tính cộng, trừ thẳng cột | 22, 23 | Hình `DatTinh` (172 640 − 94 785, có số nhớ) + `KeyFact` + `QuickCheck` `tru` |
| Tính thuận tiện: ghép số tròn, dấu trừ đi cùng số sau | 24 | `KeyFact` + `QuickCheck` `thuanTien` |
| Tìm hai số biết tổng và hiệu | 25 | `KeyFact` công thức + `QuickCheck` `tongHieu` |
| So sánh, kiểm tra Đúng hay Sai: tính từng vế rồi mới so | 14, 26 | `KeyFact` + `QuickCheck` `dungSai` |

Bố cục 390px: `DatTinh` 6 cột, ô co lại theo màn hình (đã dùng ở Bài 22–26).

## Phần Bài tập

Nhóm theo dạng và trang SGK, giữ dạng của SGK, đổi số liệu. Đáp án in đậm.

**Tính nhẩm (trang 118, 119)**: `nham-1` 80 000 + 50 000 = **130 000**; `nham-2` 170 000 − 90 000 = **80 000**; `nham-3` 600 000 + 800 000 = **1 400 000**; `nham-4` 90 000 + 60 000 − 70 000 = **80 000**; `nham-5` 9 000 000 + 5 000 000 = **14 000 000**; `nham-6` 140 000 000 − 60 000 000 + 50 000 000 = **130 000 000**. Tất cả `dien-so`.

**Đặt tính (trang 118–120)**, `dat-tinh`: `dt-1` 8 745 + 7 390 = **16 135**; `dt-2` 17 306 − 6 482 = **10 824**; `dt-3` 63 418 + 58 927 = **122 345**; `dt-4` 172 640 − 94 785 = **77 855**; `dt-5` 384 619 + 257 784 = **642 403**; `dt-6` 703 258 − 48 391 = **654 867**.

**Đúng hay Sai (trang 120)**, `trac-nghiem` Đúng/Sai: `ds-1` 70 000 + 50 000 = 100 000 → **Sai** (120 000); `ds-2` 160 000 − 40 000 = 120 000 → **Đúng**; `ds-3` 600 000 + 400 000 − 300 000 = 800 000 → **Sai** (700 000); `ds-4` 8 000 000 + 5 000 000 − 3 000 000 = 10 000 000 → **Đúng**.

**So sánh biểu thức (trang 118, 120)**, `trac-nghiem`:

- `lon-nhat`, `be-nhat`: A = 80 000 + 40 000 + 6 321 = 126 321; B = 452 689 − (300 000 − 50 000) = 202 689; C = 367 400 + 300 000 − 450 000 = 217 400; D = 320 000 − 120 000 + 5 860 = 205 860. Lớn nhất **C**, bé nhất **A**.
- `ss-1` 168 900 − (250 900 − 90 050) = 8 050 và 9 000 − 2 500 + 1 000 = 7 500 → **>**.
- `ss-2` 21 480 + 40 300 − 1 480 = 60 300 và 30 250 + 28 135 + 7 450 = 65 835 → **<**.
- `ss-3` 56 800 + 4 200 − 6 800 = 54 200 và 50 000 + 4 200 = 54 200 → **=**.

**Tính thuận tiện (trang 119)**, `dien-so`: `tt-1` 24 580 + 7 210 + 3 420 + 1 790 = **37 000**; `tt-2` 15 260 + 9 340 + 4 740 + 2 660 = **32 000**; `tt-3` 38 450 + 6 700 − 1 450 = **43 700**.

**Giải toán (trang 118–120)**, `loi-van`:

- `bt-quan-ao`: ba món 285 000, áo khoác + giày 270 000, giày hơn tất 95 000 → tất **15 000**, giày **110 000**, áo khoác **160 000** (đồng).
- `bt-tra-lai`: dép 80 000 + xếp hình 130 000 = 210 000; trả lại 250 000 − 210 000 = **40 000** đồng.
- `bt-du-tien` `trac-nghiem`: giá mũ 45 000, dép 80 000, xếp hình 130 000, gấu bông 60 000; tờ 200 000 đồng. Bốn cách: 255 000; 185 000; 235 000; 270 000 → **cách B (mũ, dép, gấu bông)**.
- `bt-tong-hieu` (có `SoDoDon`): chuyến xe dài 684 km, đoạn A–B hơn đoạn B–C 126 km → (684 − 126) = 558; B–C **279** km; A–B **405** km.
- `bt-hai-thang`: tháng Một 245 600 chai, tháng Hai nhiều hơn 38 750 → tháng Hai **284 350**; cả hai tháng **529 950** chai.

**Suy nghĩ thêm** *(vượt SGK)*: `st-tim-loi` 150 000 − 70 000 + 40 000 = **120 000** (Bình ra 40 000 vì tính ngoặc ngầm); `st-uoc-luong` 498 702 + 301 540 ≈ **800 000** (đúng 800 242).

## Kỹ thuật

- Không cần thư viện đơn vị mới, không thêm dạng bài, không thêm màu.
- Chuyển `SoDoDon` từ `app/kntt-4/bai-26/_illustrations/` lên `components/math/so-do-don.tsx` vì dùng từ 2 bài (Bài 26 và Bài 34); cập nhật import trong Bài 26.
- `bai-tap.ts` có `evalExpr` (cộng, trừ, ngoặc) để đáp án các câu nhẩm, so sánh, Đúng hay Sai tính từ biểu thức chứ không gõ tay; test tính lại độc lập bằng phép tính JS.
- `lib/lessons.ts`: đặt `available` của Bài 34 thành `true`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: **đặt tính**, **số hạng**, **tổng**, **hiệu**, **giá trị của biểu thức**, **tính chất giao hoán**, **tính chất kết hợp**, **số bé**, **số lớn**.
- Số nhiều chữ số viết tách lớp bằng NBSP.
- Không dạy: cách khác ngoài phương pháp tổng–hiệu của SGK (như đại số); không nêu quy tắc ngoặc phức tạp ngoài trong ngoặc trước.

## Câu hỏi cần chốt

1. Có làm animation cho "Nhắc lại nhanh" không? Đề xuất: **không**. Lý do: bài ôn không bắt buộc, đặt tính đã có hình `DatTinh` tĩnh.
2. Dùng chung `SoDoDon` với Bài 26? Đề xuất: **chuyển lên `components/math/`**, theo quy tắc dùng từ 2 bài.
3. Số liệu bài tập: đổi hết so với SGK? Đề xuất: **đổi**, và không dùng số liệu thật về đường sắt (tránh nêu sai sự thật).
4. Hai câu vượt SGK (`st-tim-loi`, `st-uoc-luong`)? Đề xuất: **giữ**, đặt cuối nhóm "Suy nghĩ thêm".

## Phụ lục: đáp án SGK

**Trang 118**

- Bài 1: a) 130 000; 70 000; 1 200 000. b) 60 000; 120 000; 600 000.
- Bài 2: 15 948; 130 743; 9 475; 77 945.
- Bài 3: A = 125 473; B = 227 568; C = 156 250; D = 124 975. Lớn nhất **B**, bé nhất **D**.
- Bài 4: đôi tất **8 000** đồng; đôi giày **115 000** đồng; bộ quần áo đồng phục **191 000** đồng.

**Trang 119**

- Bài 1: a) 12 000 000; 6 000 000; 110 000 000; 60 000 000. b) 8 000 000; 120 000 000.
- Bài 2: 456 234; 643 941; 245 697; 329 381.
- Bài 3: a) **5 000** đồng. b) **B** (mũ 50 000 + dép 70 000 + gấu bông 65 000 = 185 000 đồng; các cách khác 245 000, 240 000, 260 000 đồng).
- Bài 4: (16 370 + 2 530) + (6 090 + 4 010) = **29 000**.

**Trang 120**

- Bài 1: 278 090; 999 861; 559 222; 50 545.
- Bài 2: a) **S** (120 000). b) **S** (150 000). c) **Đ**.
- Bài 3: Đồng Hới – Đà Nẵng **269** km; Hà Nội – Đồng Hới **522** km.
- Bài 4: a) 15 050 **<** 15 500. b) 52 300 **>** 46 927.
