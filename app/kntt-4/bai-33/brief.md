# Brief — Bài 33. Ôn tập các số đến lớp triệu

- SGK: Toán 4 KNTT tập một, trang 114–117, chủ đề 7 (Ôn tập học kì 1). Chỉ có phần Luyện tập: 5 bài (trang 114–115), 4 bài (trang 115–117).
- Route: `/kntt-4/bai-33`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên chưa có bước duyệt riêng; các quyết định ở mục "Câu hỏi cần chốt" là đề xuất đã áp dụng)

## Đánh giá

**Vị trí bài.** Bài ôn đầu chủ đề 7, trước Bài 34 (cộng, trừ). Ôn lại toàn bộ chủ đề 3 "Số có nhiều chữ số" (Bài 10–16).

**Cấu trúc SGK.** Chỉ có Luyện tập, không có Khám phá. Trang 114: đọc số dân trên bản đồ. Trang 115: lớp và hàng, viết thành tổng, giá trị chữ số, Đố em, so sánh. Trang 116–117: bảng khách du lịch, làm tròn số học sinh, sắp xếp giá máy tính.

**Bài nguồn** (thay cho "mục tiêu"; cũng là kiến thức cần có):

| Bài | Nội dung | Dùng ở |
|---|---|---|
| 10 | Số có sáu chữ số, 1 000 000 | số liền sau, số nhiều chữ số |
| 11 | Hàng và lớp | SGK 114–115 (đọc số, lớp, giá trị chữ số) |
| 12 | Các số trong phạm vi lớp triệu | đọc, viết số, viết thành tổng |
| 13 | Làm tròn số | SGK 116–117 (Bài 3) |
| 14 | So sánh số nhiều chữ số | SGK 115 (Luyện tập 1), 116 (Bài 2), 117 (Bài 4) |
| 15, 16 | Dãy số tự nhiên, Luyện tập chung | không có câu riêng trong bài này, bỏ khỏi "Nhắc lại nhanh" |

**Điểm mấu chốt.**

- SGK chỉ cho đề, không nhắc lại quy tắc. Con phải tự nhớ: đọc từng lớp, so sánh từ trái sang phải, làm tròn nhìn chữ số bên phải.
- Bài 3 (trang 116) làm tròn bốn lần với bốn hàng khác nhau (trăm, trăm nghìn, nghìn, chục nghìn) trên cùng một số. Đây là chỗ dễ lẫn hàng nhất.
- Luyện tập 1b so sánh số với **tổng**: phải viết tổng thành số trước khi so (30 000 + 7 000 + 20 = 37 020 nên bằng nhau).
- Bài 4 (trang 117) là bài suy luận về thứ tự, không cần tính.
- Dữ kiện dân số, khách du lịch, học sinh là số liệu thật của SGK; trong app dùng số khác, không nêu như sự thật.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Bỏ "linh" hoặc "không trăm" khi đọc số có chữ số 0 | 1 296 906 đọc "chín trăm sáu nghìn" (đúng: chín trăm **linh** sáu); 8 053 663 bỏ "không trăm" | Bảng hàng và lớp: mỗi lớp luôn có 3 ô, ô 0 vẫn phải đọc. Câu `doc-1`, `doc-2` |
| Nhầm chữ số thuộc lớp nào | Chữ số 0 ở 906 là lớp nghìn, không phải lớp đơn vị | Bảng hàng và lớp có ba ô mỗi lớp. Câu `lop-1`, `lop-2` |
| Giá trị chữ số chỉ ghi chữ số | Chữ số 7 trong 4 297 603 có giá trị 7 000, không phải 7 | Đọc kèm hàng: "7 ở hàng nghìn". Câu `gt-1`, `gt-2` |
| Ô trống của tổng ghi 9 thay vì 90 | 3 000 000 + 700 000 + 5 000 + **90** = 3 705 090 | Nhìn lại hàng trống: hàng chục nên là 90. Câu `thieu-3` |
| So tổng mà không đổi ra số | 37 020 và 30 000 + 7 000 + 20 | Viết tổng thành số rồi so từ trái sang phải. Câu `ss-4` đến `ss-6` |
| So số nhiều chữ số hơn lại chọn số có chữ số đầu lớn | 87 925 và 410 006: chọn 87 925 vì 8 > 4 | Đếm số chữ số trước. Câu `ss-1` |
| Làm tròn nhìn sai chữ số | 5 372 649 đến hàng trăm: nhìn chữ số 6 mà không phải 4, hoặc làm tròn lên vì "có 649" | Chỉ nhìn chữ số **ngay bên phải** hàng cần làm tròn. Animation `LamTron`; câu `tron-1` |
| Quên số nhớ khi làm tròn lên | 7 249 618 đến hàng trăm nghìn: viết 7 250 000 thay vì 7 200 000, hoặc 3 962 đến hàng trăm viết 3 900 | Nhìn chữ số bên phải rồi mới tăng; câu `tim-loi` và `quickChecks.lamTron` |
| Đố em: thêm 3 thay vì 3 000 | Viết 3 vào trước số có ba chữ số: thêm 3 000 | Thử bằng số cụ thể: 245 → 3 245. Câu `do-em` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Đủ | 3 câu Khởi động chính là "Nhắc lại nhanh" (giá trị chữ số, so sánh, làm tròn); kết quả chỉ dùng tại chỗ |
| Tách | Đủ | Viết số thành tổng, giá trị chữ số (SGK Bài 3, 4) |
| So sánh | Đủ | So sánh nhiều chữ số, xếp thứ tự (SGK Luyện tập 1, Bài 2, 4) |
| Bốn kênh | Rà đủ | Nói: đọc số (`doc-1`, `doc-2`); hình: bảng hàng và lớp, animation làm tròn; nhẩm: so sánh, làm tròn; viết: tổng, giá trị |
| Câu tư duy | Vừa | `tim-loi` (tìm lỗi), `vi-sao` (vì sao), `do-em` |
| Đếm | Không dùng | Bài này không có quy luật theo bước; đếm lớp theo nhóm ba đã có trong bảng hàng và lớp |

**Khởi động** (bảng Id | Dạng | Câu | Đáp án)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-gia-tri` | `dien-so` | Giá trị chữ số 4 trong 3 407 215 | **400 000** |
| `kd-so-sanh` | `trac-nghiem` | Số nào lớn hơn: 98 765 hay 100 234 | **100 234** |
| `kd-lam-tron` | `dien-so` | Làm tròn 4 628 đến hàng trăm | **4 600** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `hangLop` | `trac-nghiem` | Chữ số 9 trong 4 197 305 thuộc hàng, lớp nào | **hàng chục nghìn, lớp nghìn** |
| `doc` | `trac-nghiem` | Đọc 2 050 300 | **hai triệu không trăm năm mươi nghìn ba trăm** |
| `soSanh` | `trac-nghiem` | 480 270 ? 480 720 | **<** |
| `lamTron` | `dien-so` | Làm tròn 3 962 đến hàng trăm | **4 000** |

**Suy nghĩ thêm** gồm `do-em`, `gan-gia`, `tim-loi`, `vi-sao` (xem Phần Bài tập). `do-em` và `gan-gia` bám SGK (Đố em; trang 117 Bài 4). **Vượt SGK:** `tim-loi` và `vi-sao`, để con tự kiểm tra bằng lý do thay vì chỉ ra đáp án.

## Phần Phụ huynh

Theo mẫu 6 mục, chỉ ghi ý riêng:

- Con học gì: ôn cả chủ đề 3. Nếu con sai nhóm nào thì xem lại bài nào (Bài 11, 12 cho đọc và giá trị; Bài 13 làm tròn; Bài 14 so sánh).
- Lỗi: bỏ "linh", giá trị chữ số, so tổng, làm tròn nhìn sai chữ số.
- Hoạt động: đọc số trên biển giá, hóa đơn; làm tròn giá tiền khi đi chợ; đố nhau "số này lớn hơn số kia vì sao".
- Dấu hiệu: con nói được "nhìn chữ số bên phải" khi làm tròn; viết được tổng không sót hàng 0.
- Đáp án SGK trong khối `Fold`.

## Phần Lý thuyết

Là "Nhắc lại nhanh", chỉ một chương (chủ đề 3), 5 điểm.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Hàng và lớp: mỗi lớp 3 hàng; 3 lớp triệu, nghìn, đơn vị | 11 | Hình bảng hàng và lớp `BangHangLop` (tĩnh) + `KeyFact` + `QuickCheck` `hangLop` |
| Đọc số: đọc từng lớp từ trái sang phải rồi đọc tên lớp; chữ số 0 vẫn đọc | 12 | Ví dụ 380 506 142 + `KeyFact` + `QuickCheck` `doc` |
| Giá trị của chữ số, viết số thành tổng | 11, 12 | Ví dụ 4 297 603 + `KeyFact` |
| So sánh: nhiều chữ số hơn thì lớn hơn; bằng số chữ số thì so từ trái sang phải; tổng đổi ra số rồi mới so | 14 | `KeyFact` + `QuickCheck` `soSanh` |
| Làm tròn: nhìn chữ số bên phải, từ 5 trở lên thì lên | 13 | Animation `LamTron` 4 bước (6 482 931 đến hàng trăm nghìn) + `KeyFact` + `QuickCheck` `lamTron` |

Bố cục 390px: `BangHangLop` viewBox 440 rộng, 3 lớp, mỗi lớp 3 cột; chữ từ 14 trở lên. `LamTron` viewBox 340 rộng, 7 ô.

## Phần Bài tập

Nhóm theo bài nguồn, giữ dạng của SGK, đổi số liệu. Đáp án in đậm.

**Đọc số, hàng và lớp (Bài 11, 12)** — SGK trang 114, 115 Bài 2

- `doc-1` `trac-nghiem`: đọc 7 060 215 → **bảy triệu không trăm sáu mươi nghìn hai trăm mười lăm**
- `doc-2` `trac-nghiem`: đọc 640 205 718 → **sáu trăm bốn mươi triệu hai trăm linh năm nghìn bảy trăm mười tám**
- `lop-1` `dien-so`: 864 530 297, lớp triệu **864**, lớp nghìn **530**, lớp đơn vị **297**
- `lop-2` `trac-nghiem`: chữ số 7 trong 3 070 650 → **hàng chục nghìn, lớp nghìn**

**Viết thành tổng, giá trị chữ số (Bài 11, 12)** — SGK trang 115 Bài 3, 4

- `tong-1` `dien-so`: 72 053 = **70 000** + **2 000** + **50** + **3**
- `tong-2` `dien-so`: 3 140 206 = **3 000 000** + **100 000** + **40 000** + **200** + **6**
- `thieu-1` `dien-so`: 40 000 + 8 000 + 500 + 30 + ? = 48 537 → **7**
- `thieu-2` `dien-so`: 600 000 + 5 000 + ? + 60 + 1 = 605 261 → **200**
- `thieu-3` `dien-so`: 2 000 000 + 900 000 + 40 000 + ? = 2 940 080 → **80**
- `gt-1` `dien-so`: 2 835 714, chữ số 5 → **5 000**, chữ số 8 → **800 000**
- `gt-2` `dien-so`: 640 295, chữ số 4 → **40 000**, chữ số 9 → **90**

**So sánh (Bài 14)** — SGK trang 115 Luyện tập 1, trang 116 Bài 2

- `ss-1` 87 925 ? 410 006 → **<**
- `ss-2` 702 318 ? 698 999 → **>**
- `ss-3` 3 906 214 ? 3 960 214 → **<**
- `ss-4` 60 000 + 5 000 + 30 ? 65 030 → **=**
- `ss-5` 410 070 ? 400 000 + 10 000 + 700 → **<** (410 700)
- `ss-6` 7 300 900 ? 7 000 000 + 300 000 + 90 → **>** (7 300 090)
- `ss-7` `trac-nghiem`: sách của bốn trường 318 400; 76 900; 402 650; 129 500, trường nhiều nhất → **Trường C**
- `ss-8` `dien-so`: xếp từ bé đến lớn → **76 900; 129 500; 318 400; 402 650**
- `ss-9` `trac-nghiem`: Trường D ít hơn những trường nào → **Trường A và Trường C**

Tất cả là `trac-nghiem` với lựa chọn `>`, `<`, `=` (đã có trong bộ dạng hiện có, không thêm dạng mới).

**Làm tròn (Bài 13)** — SGK trang 116, 117 Bài 3

- `tron-1` `trac-nghiem`: 5 372 649 làm tròn đến hàng trăm → **5 372 600**
- `tron-2` `noi-cap`: 5 372 649 khoảng 5 400 000 / 5 373 000 / 5 370 000 nối với **hàng trăm nghìn / hàng nghìn / hàng chục nghìn**
- `tron-3` `dien-so`: 3 468 215 đến hàng chục nghìn → **3 470 000**
- `tron-4` `dien-so`: 906 480 đến hàng trăm nghìn → **900 000**

**Suy nghĩ thêm**

- `do-em` `dien-so`: viết thêm chữ số 3 vào trước số có ba chữ số, số mới lớn hơn **3 000** đơn vị (SGK dùng chữ số 2)
- `gan-gia` `dien-so`: giá 9 800 000; 10 600 000; 11 300 000; 12 400 000. C thấp nhất, B thấp hơn D nhưng cao hơn A → A **10 600 000**, B **11 300 000**, C **9 800 000**, D **12 400 000**
- `tim-loi` `dien-so` *(vượt SGK)*: Mi làm tròn 7 249 618 đến hàng trăm nghìn được 7 250 000, kết quả đúng **7 200 000**
- `vi-sao` `trac-nghiem` *(vượt SGK)*: 603 450 và 599 990, số nào lớn hơn vì sao → **603 450 lớn hơn, vì hàng trăm nghìn: 6 > 5**

## Kỹ thuật

- Không cần thư viện đơn vị mới, không thêm dạng bài, không thêm màu.
- Thêm `BangHangLop` trong `_illustrations/` và `LamTron` trong `_animations/` của bài. Dùng từ 2 bài trở lên thì chuyển lên `components/math/`.
- `lib/lessons.ts`: đặt `available` của Bài 33 thành `true`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: **hàng**, **lớp**, **lớp triệu**, **lớp nghìn**, **lớp đơn vị**, **giá trị của chữ số**, **làm tròn**, **số tự nhiên**. Dùng "linh" khi đọc số có 0 ở hàng chục.
- Số có nhiều chữ số viết tách lớp bằng NBSP; năm không tách.
- Không dạy: làm tròn tới hàng khác ngoài trăm, nghìn, chục nghìn, trăm nghìn; không giới thiệu quy ước "làm tròn lên khi bằng 5" ngoài "từ 5 trở lên".

## Câu hỏi cần chốt

1. Có làm animation cho "Nhắc lại nhanh" không? Đề xuất: **chỉ làm tròn** (ý dễ nhầm nhất, ghi ở Bài 3 SGK); các ý còn lại dùng hình tĩnh. Lý do: bài ôn không bắt buộc animation.
2. Bảng hàng và lớp: dùng bảng tĩnh? Đề xuất: **tĩnh**, vì con đã học ở Bài 11 và chỉ cần nhìn lại.
3. Số liệu bài tập: đổi hết so với SGK? Đề xuất: **đổi**, và không dùng số liệu thật về dân số hay khách du lịch (tránh nêu sai sự thật).
4. Hai câu vượt SGK (`tim-loi`, `vi-sao`)? Đề xuất: **giữ**, đặt cuối nhóm "Suy nghĩ thêm".

## Phụ lục: đáp án SGK

**Trang 114**

- Bài 1 (đọc số dân): Hà Giang 854 679: tám trăm năm mươi tư nghìn sáu trăm bảy mươi chín. Hà Nội 8 053 663: tám triệu không trăm năm mươi ba nghìn sáu trăm sáu mươi ba. Quảng Trị 632 375: sáu trăm ba mươi hai nghìn ba trăm bảy mươi lăm. Lâm Đồng 1 296 906: một triệu hai trăm chín mươi sáu nghìn chín trăm linh sáu. TP. Hồ Chí Minh 8 993 082: tám triệu chín trăm chín mươi ba nghìn không trăm tám mươi hai. Cà Mau 1 194 476: một triệu một trăm chín mươi tư nghìn bốn trăm bảy mươi sáu. (Số dân lấy từ hình trong sách, chưa đối chiếu nguồn.)

**Trang 115**

- Bài 2 (517 906 384): a) lớp triệu: 5, 1, 7. b) lớp nghìn: 9, 0, 6. c) lớp đơn vị: 3, 8, 4. d) năm trăm mười bảy triệu chín trăm linh sáu nghìn ba trăm tám mươi tư.
- Bài 3: a) 45 703 = 40 000 + 5 000 + 700 + 3; 608 292 = 600 000 + 8 000 + 200 + 90 + 2; 815 036 = 800 000 + 10 000 + 5 000 + 30 + 6; 5 240 601 = 5 000 000 + 200 000 + 40 000 + 600 + 1. b) **7**; **100**; **90**.
- Bài 4: 46 875: chữ số 4 là **40 000**, chữ số 7 là **70**. 703 410: **400**; **700 000**. 4 297 603: **4 000 000**; **7 000**.
- Bài 5 (Đố em): **2 000** đơn vị.
- Luyện tập 1: a) 98 979 **<** 701 352; 651 410 **>** 639 837; 4 785 696 **<** 5 460 315. b) 37 020 **=** 37 020; 200 895 **<** 200 905; 8 100 300 **>** 7 900 000.

**Trang 116–117**

- Bài 2: a) nhiều nhất Ma-lai-xi-a (606 200), ít nhất Lào (98 500). b) Cam-pu-chia (227 900) ít hơn Thái Lan (509 800) và Ma-lai-xi-a (606 200).
- Bài 3: a) làm tròn 8 891 344 đến hàng trăm được 8 891 300, bạn **Việt** nói đúng. b) 8 900 000: hàng trăm nghìn; 8 891 000: hàng nghìn; 8 890 000: hàng chục nghìn.
- Bài 4: C thấp nhất, A < B < D, nên C **17 800 000** đồng, A **18 700 000** đồng, B **21 900 000** đồng, D **22 300 000** đồng.
