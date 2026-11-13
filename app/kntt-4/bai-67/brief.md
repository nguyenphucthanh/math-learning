# Brief — Bài 67. Ôn tập số tự nhiên

- SGK: Toán 4 KNTT tập hai, trang 102-104, Chủ đề 13 "Ôn tập cuối năm" (bài ôn tập, không có Khám phá).
- Route: `/kntt-4/bai-67`
- Trạng thái: đã viết nội dung (brief và code làm trong một lượt, chưa qua bước duyệt riêng)

## Đánh giá

**Vị trí.** Bài đầu của chủ đề 13. Bài trước: Bài 66 (Luyện tập chung, phân số). Bài sau: Bài 68 (Ôn tập phép tính với số tự nhiên). Bài ôn lại nó: Bài 73 (Ôn tập chung).

**Cấu trúc SGK.** Luyện tập (5 bài, tr.102-103), Luyện tập (5 bài, tr.103-104). Dạng: viết/đọc số từ các hàng, viết thành tổng, số ?, giá trị chữ số, dãy số, Đ/S, chọn đáp án, làm tròn, suy luận từ dữ kiện, lập số từ thẻ.

**Bài nguồn (tập một, Chủ đề 1 và 3).**

| Bài | Tên |
|---|---|
| 3 | Số chẵn, số lẻ |
| 10 | Số có sáu chữ số. Số 1 000 000 |
| 11 | Hàng và lớp |
| 12 | Các số trong phạm vi lớp triệu |
| 13 | Làm tròn số đến hàng trăm nghìn |
| 14 | So sánh các số có nhiều chữ số |
| 15 | Làm quen với dãy số tự nhiên |

Kiến thức cần có chính là các bài trên. Bài 33 (Ôn tập các số đến lớp triệu) đã ôn một phần, nhưng bài này thêm dãy số, số chẵn/lẻ và bài toán suy luận.

**Điểm mấu chốt.**
- SGK không giải thích vì sao 0 là số tự nhiên bé nhất và vì sao không có số lớn nhất: bài tập Đ/S chỉ hỏi mà không dạy. Lý do ghi ở KeyFact "không có số lớn nhất": số nào cũng có số liền sau.
- Chữ số 0 ở giữa số (7 906 450, 6 040 805) là chỗ con hay sai khi đọc ("linh", "không trăm") và khi viết từ các hàng.
- Câu 4 tr.104 (bốn trường) cần suy luận nhiều dữ kiện. Bước chắc chắn nhất là số lớn nhất.
- Số chẵn bé nhất lập từ thẻ: bẫy là chữ số đầu khác 0 và chữ số cuối chẵn.
- Làm tròn: chỉ nhìn chữ số ngay bên phải hàng cần làm tròn.
- Lệch giữa đề bài giao và ảnh SGK: ảnh tr.102 cho hàng 2 là 2 trăm nghìn, 4 chục nghìn, 6 trăm, 3 chục, 8 đơn vị = **240 638** (không phải 246 038); hàng 4 là 5 triệu, 8 trăm nghìn, 3 chục nghìn, 9 trăm = **5 830 900** (không phải 5 803 900). Đáp án trong phần Phụ huynh theo ảnh.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Đọc thiếu "linh" / "không trăm" | 6 040 805: "sáu triệu bốn mươi nghìn..." (sáu triệu **không trăm** bốn mươi nghìn tám trăm **linh** năm) | Câu `doc-1` đến `doc-4`: lựa chọn nhiễu là đúng các cách đọc thiếu |
| Viết số bỏ hàng 0 | 5 triệu, 8 trăm nghìn, 3 chục nghìn và 9 trăm viết 58 399 (5 830 900) | Câu `viet-1` đến `viet-4`, giải thích liệt kê từng hàng |
| Ghi chữ số thay vì giá trị | Chữ số 6 trong 903 460 là 6 (60) | Câu `gia-tri-*`, hỏi "đứng ở hàng nào?" |
| Làm tròn nhìn sai chữ số | 2 718 450 làm tròn đến hàng nghìn được 2 719 000 (2 718 000) | Câu `tim-loi` (tìm lỗi sai) |
| Hai số chẵn liên tiếp hơn kém 1 | 74 500 và 74 501 (74 502) | Câu `hon-kem-chan`, `day-chan` |
| Tin rằng có số tự nhiên lớn nhất | 99 999 999 là số lớn nhất (S) | Câu `ds-c`, `ds-d` |
| Quên chữ số đầu khác 0 hoặc chữ số cuối chẵn | Số chẵn bé nhất từ 0, 3, 4, 7 là 0 347 hoặc 3 470 (3 074) | Câu `the-chan`, giải thích thử hai cách |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Các QuickCheck trong "Nhắc lại nhanh" thay Khởi động: mỗi chương một câu, sai thì có link về bài gốc |
| Đếm | Dùng nhẹ | Dãy số theo bước 1 và 2 (`day-*`, `hon-kem-*`) |
| Tách | Dùng | Viết thành tổng, giá trị của chữ số (`tong-*`, `thieu-*`, `gia-tri-*`) |
| So sánh | Dùng | Voi, xe đạp, xếp bốn trường, so sánh có tổng |
| Bốn kênh | Rà | Nói (đọc số), nhẩm (dãy số), viết (tổng). Thiếu hình: không thêm vì bài ôn, `BangHangLop` đã đủ cho kênh hình |
| Câu tư duy | Dùng | Tìm lỗi sai (`tim-loi`), "vì sao" (`vi-sao`), bốn trường (suy luận) |

Câu "Suy nghĩ thêm" (nhóm cuối):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `le-lon` | dien-so | Số lẻ lớn nhất có bốn chữ số từ thẻ 0, 3, 4, 7 (**vượt SGK**: SGK chỉ hỏi số chẵn bé nhất; cùng ý, đổi chiều) | **7 403** |
| `tim-loi` | dien-so | Nam làm tròn 2 718 450 đến hàng nghìn được 2 719 000, kết quả đúng | **2 718 000** |
| `vi-sao` | trac-nghiem | Số liền sau của 49 999 và số liền trước của 50 001, số nào lớn hơn (**vượt SGK**, nhẹ) | **Hai số bằng nhau** |

## Phần Phụ huynh

1. Con học gì: ôn các số tự nhiên tập một. Nêu bài nên xem lại theo nhóm: đọc/viết/hàng/lớp (Bài 10, 11, 12), giá trị chữ số (Bài 11, 12), so sánh (Bài 14), làm tròn (Bài 13), dãy số (Bài 15), chẵn/lẻ (Bài 3).
2. Cần biết trước: Bài 3, 10-15.
3. Cách giải thích: thuật ngữ SGK; bài suy luận gạch từng dữ kiện, bắt đầu từ dữ kiện chắc nhất.
4. Lỗi hay gặp: bảng trên.
5. Hoạt động ôn: xem bảng giá, tờ rơi, số dân; đọc to, làm tròn, xếp thứ tự.
6. Dấu hiệu nắm bài: đọc đúng số có 0 ở giữa; nói được hàng và giá trị; hai số chẵn liên tiếp hơn kém 2; không có số lớn nhất.

## Phần Lý thuyết

"Nhắc lại nhanh", không animation. Mỗi điểm có `KeyFact` + một `QuickCheck` + `ReviewLink` về bài gốc.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| 3 hàng = 1 lớp; đọc từng lớp; chữ số 0 vẫn đọc | 11, 12 | `BangHangLop` (đã ở `components/math/`, không cần chuyển) + `KeyFact`; QuickCheck `doc` (số 3 050 204) |
| Giá trị chữ số = chữ số × hàng; viết thành tổng | 11, 12 | `KeyFact` với ví dụ 4 297 603; QuickCheck `giaTri` |
| So sánh: nhiều chữ số hơn thì lớn hơn, so từng hàng; vế tổng viết thành số | 14 | `KeyFact`; QuickCheck `soSanh` |
| Làm tròn: nhìn chữ số bên phải, từ 5 trở lên thì lên | 13 | `KeyFact`; QuickCheck `lamTron` (835 500 đến hàng nghìn) |
| Số tự nhiên bé nhất là 0; có số liền sau nên không có số lớn nhất; chẵn/lẻ liên tiếp hơn kém 2 | 15, 3 | `KeyFact`; QuickCheck `lienSau`, `honKem` |

Số 10 (số có sáu chữ số, số 1 000 000) không có điểm riêng vì đã gộp vào điểm 1 và dãy số.

## Phần Bài tập

Nhóm theo bài nguồn. Số đổi so với SGK, trừ voi và xe đạp (gắn với hình trong sách, ở đây viết thành lời, không có hình). Đáp án tính lại bằng code trong test.

| Nhóm | Câu | Dạng | Đáp án |
|---|---|---|---|
| Đọc số, viết số, hàng và lớp (Bài 10-12) | `viet-1..4`: viết số từ các hàng (48 206; 507 130; 6 040 805; 9 300 270) | dien-so | **48 206; 507 130; 6 040 805; 9 300 270** |
| | `doc-1..4`: chọn cách đọc đúng, lựa chọn nhiễu thiếu "linh", "không trăm" | trac-nghiem | docSo của từng số |
| | `lop-1`: chữ số 8 của 5 280 396 ở hàng, lớp nào | trac-nghiem | **hàng chục nghìn, lớp nghìn** |
| Viết thành tổng, giá trị chữ số (Bài 11-12) | `tong-*` (7 205; 61 480; 804 056; 2 605 390) | dien-so | các số hạng, bỏ hàng 0 |
| | `thieu-*`: số ? (63 405; 215 760; 4 820 301) | dien-so | **5; 5 000; 20 000** |
| | `gia-tri-*`: giá trị chữ số 6 và 9 (6 295; 80 693; 9 506 400) | dien-so | **6 000, 90; 600, 90; 6 000, 9 000 000** |
| Dãy số, chẵn, lẻ (Bài 3, 15) | `ds-a..g`: 6 mệnh đề Đ/S | trac-nghiem | **Đ, Đ, S, Đ, S, S** |
| | `hon-kem-*` | dien-so | **1; 2; 2** |
| | `day-*`: 4 999 ? 5 001 ?; 8 995 8 997 ? ?; 59 996 ? 60 000 ? | dien-so | **5 000, 5 002; 8 999, 9 001; 59 998, 60 002** |
| | `the-chan`: số chẵn bé nhất từ 0, 3, 4, 7 | dien-so | **3 074** |
| So sánh, xếp thứ tự (Bài 14) | `voi`, `xe` | trac-nghiem | **voi C; xe D** |
| | `truong-1`, `truong-2`: bốn trường với 4 205; 3 918; 3 986; 4 372 | dien-so | **Nguyễn Trãi 4 372, Quang Trung 3 986, Nguyễn Du 3 918, Lê Lợi 4 205**; xếp **3 918 < 3 986 < 4 205 < 4 372** |
| | `ss-1`, `ss-2`: so sánh có tổng | trac-nghiem | **<; >** |
| Làm tròn (Bài 13) | `tron-dan-so`: 3 482 596 đến hàng nghìn, chục nghìn, trăm nghìn | loi-van | **3 483 000; 3 480 000; 3 500 000** |
| | `tron-2` (749 500 đến hàng nghìn) | dien-so | **750 000** |
| | `tron-doc`: số nào làm tròn đến hàng chục nghìn được 3 480 000 | trac-nghiem | **3 476 001** |
| Suy nghĩ thêm | `le-lon`, `tim-loi`, `vi-sao` (bảng ở mục Tư duy) | | |

**Lập luận bốn trường (SGK).** Số: 2 065; 1 892; 2 131; 1 868. Nguyễn Trãi nhiều nhất nên là 2 131. Còn 2 065; 1 892; 1 868, chỉ 2 065 là số lẻ nên Lê Lợi có 2 065. Quang Trung hơn Nguyễn Du: 1 892 > 1 868. Test duyệt mọi hoán vị, chỉ có đúng một cách chia, với cả số SGK và số trong app.

**Làm tròn dân số SGK (tr.104).** 96 208 984: hàng nghìn 96 209 000 (hàng trăm là 9); chục nghìn 96 210 000 (hàng nghìn là 8); trăm nghìn 96 200 000 (hàng chục nghìn là 0). Số dân là dữ kiện ngoài toán, **chưa đối chiếu nguồn Tổng cục Thống kê**; bài tập trong app dùng số khác.

## Kỹ thuật

Không có thứ mới. Dùng lại `roundToPlace` (`lib/round-numbers.ts`), `docSo` (`lib/doc-so.ts`), `hangName` (`lib/hang-lop.ts`), `BangHangLop` (`components/math/`). Đặt `available` của Bài 67 thành `true` trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: hàng, lớp, giá trị của chữ số, số liền trước, số liền sau, làm tròn.
- Số lượng ghi có dấu cách tách lớp (NBSP).
- Chữ số 0 vẫn đọc: "không trăm", "linh".
- Không dạy quy tắc tắt nào ngoài SGK (như "thêm 0 thì nhân 10").

## Câu hỏi cần chốt

1. Voi và xe đạp viết thành lời, không có hình. Đề xuất giữ vì SGK chỉ dùng hình để cho số liệu; hình voi thật không thêm ý toán.
2. Đáp án hàng 2 và 4 của bảng viết số theo ảnh SGK (240 638; 5 830 900), lệch với số được giao lúc đầu. Đề xuất theo ảnh.
3. Hai câu "Suy nghĩ thêm" (`le-lon`, `vi-sao`) vượt SGK nhẹ, đề xuất giữ để con luyện suy luận.

## Phụ lục: đáp án SGK

Có trong `phu-huynh.mdx`, mục "Đáp án bài trong sách" (tr.102-104), tính lại: 240 638; 7 906 450; 5 830 900; tổng; số ? 6, 4 000, 900; dãy hơn kém 1, 2, 2; giá trị chữ số; dãy số 1 000, 1 002 / 2 991, 2 993 / 74 502, 74 506; Đ, Đ, S, Đ; voi C; xe D; dân số 96 209 000, 96 210 000, 96 200 000; bốn trường; 1 032.
