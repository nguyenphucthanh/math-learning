# Brief — Bài 42. Tính chất phân phối của phép nhân đối với phép cộng

- SGK: Toán 4 KNTT, **tập hai**, trang 17-19, Chủ đề 8 "Phép nhân và phép chia".
- Route: `/kntt-4/bai-42`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, không dừng chờ duyệt)

## Đánh giá

**Vị trí bài.** Bài trước: Bài 41 (nhân, chia với 10, 100, 1 000). Bài sau: Bài 43 (nhân với số có hai chữ số, dùng ngay 23 × 14 = 23 × 10 + 23 × 4). Bài ôn lại nó: Bài 38 (nhân với số có một chữ số), Bài 40 (đổi chỗ thừa số, nhóm thừa số).

**Cấu trúc SGK.** Khám phá (1 mục) → Hoạt động (3 bài) → Luyện tập (4 bài, phép cộng) → Luyện tập thứ hai (4 bài, phép trừ).
- Tr.17: bài toán đội đồng diễn 3 hàng áo đỏ + 2 hàng áo vàng, mỗi hàng 15 người; hai cách ra 75; hai khung ghi nhớ a × (b + c) và (a + b) × c. HĐ1 tính bằng hai cách (mẫu 26 × (5 + 4)).
- Tr.18: HĐ2 bốn biểu thức m, n, p, tìm hai biểu thức bằng nhau; HĐ3 bài toán lớp học vẽ. LT1 tính bằng hai cách (mẫu 34 × 8 + 34 × 2); LT2 tính thuận tiện; LT3 ba tích.
- Tr.19: LT4 chuyển hàng cứu trợ. LT thứ hai: Bài 1 so sánh a × (b − c) với a × b − a × c; Bài 2 bảng a, b, c rồi dấu `>`, `<`, `=`; Bài 3 tính thuận tiện; Bài 4 bán vải hoa.

**Mục tiêu**
1. Nhân một số với một tổng (và một tổng với một số) bằng hai cách, và biết hai kết quả bằng nhau.
2. Viết được a × (b + c) = a × b + a × c và (a + b) × c = a × c + b × c.
3. Đọc ngược đẳng thức để tính thuận tiện: a × b + a × c = a × (b + c).
4. Mở rộng cho phép trừ: a × (b − c) = a × b − a × c.
5. Giải toán có lời văn bằng cách nhân với tổng hoặc hiệu.

**Kiến thức cần có.** Nhân với số có một chữ số; giao hoán, kết hợp; nhân với 10, 100; thứ tự trong ngoặc.

**Điểm mấu chốt**
- SGK chỉ cho một ví dụ hình (đội đồng diễn) và hai công thức. App giữ đúng ví dụ này, dùng chấm tròn theo hàng.
- Phép trừ chỉ xuất hiện ở bài Luyện tập, không có khung ghi nhớ riêng. App thêm một KeyFact và animation ngắn cho phép trừ (không vượt SGK, vì bài tập của sách dùng tới).
- Khó nhất là bước đảo chiều (tính thuận tiện): con phải nhìn ra thừa số chung, kể cả khi nó đứng sau (27 × 6 + 73 × 6).
- Bẫy: con nhầm với kết hợp và viết 5 × (2 × 3) = 5 × 2 × 5 × 3.
- SGK dùng số hạng nhỏ trong ngoặc (3 + 2); các ô LT có bẫy "đẹp": tổng ra 10 (8 + 2, 6 + 4) hoặc 100 (27 + 73).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Chỉ nhân với số hạng đầu | 4 × (3 + 5) = 4 × 3 + 5 = 17 (đúng 4 × 3 + 4 × 5 = 32) | `sn-1`; animation 1 bước 2 tô từng màu |
| Nhầm với kết hợp | 5 × (2 × 3) = 5 × 2 × 5 × 3 = 150 (đúng 30) | `sn-4`, mục Phụ huynh |
| Không thấy thừa số chung | 27 × 6 + 73 × 6, chỉ tính từng tích | `lt-2c` (thừa số chung đứng sau), gợi ý "đổi chỗ" |
| Quên trừ cả hai tích | 48 × 9 − 48 × 8 = 48 × 9 − 8 | `lt-8a`, `lt-8b`, animation 2 |
| Tính hết từng tích lớn | 135 × 6 + 135 × 2 tính 810 + 270 | `lt-1a`, `lt-1b` so Cách 2 với Cách 1 |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Tách | Chính | Mục tiêu 3 (tách 12 = 10 + 2, 99 = 100 − 1) trong `sn-2`, `sn-3` |
| So sánh | Vừa | Hai cách ra cùng kết quả; `hd-2b`, `lt-7` so sánh biểu thức |
| Kiểm tra đầu vào | Có | 3 câu khởi động (bảng nhân, nhân số tròn, ngoặc) |
| Bốn kênh | Đủ | Hình (animation), nói (KeyFact), nhẩm (`sn-2`), viết (đẳng thức) |
| Câu tư duy | Có | `sn-1`, `sn-4` tìm lỗi sai |
| Không dùng: Đếm | — | Bài không có quy luật theo bước |

**Khởi động**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-bang-nhan | dien-so | 8 × 7; 15 × 4 | **56; 60** |
| kd-nhan-tron | dien-so | 20 × 3; 45 × 2 | **60; 90** |
| kd-ngoac | dien-so | (4 + 6) × 3; 3 × (9 − 4) | **30; 15** |

**Vượt SGK.** `sn-2` (25 × 12 = 25 × (10 + 2)) và `sn-3` (99 × 7 = (100 − 1) × 7): nhẩm bằng cách tách số, chuẩn bị cho Bài 43. Chỉ nằm trong nhóm "Suy nghĩ thêm".

## Phần Phụ huynh

1. Con học gì: hai công thức phân phối, dùng để nhẩm và tính thuận tiện; thêm phép trừ.
2. Cần biết trước: Bài 38, 40, 41; trong ngoặc tính trước.
3. Cách giải thích: đội đồng diễn; "chia" số ngoài ngoặc cho từng số hạng; hình 4 hàng 6 chấm cho phép trừ.
4. Lỗi hay gặp: năm lỗi trong bảng trên.
5. Hoạt động ôn: 6 gói bánh, mỗi gói 3 bánh quy + 2 bánh mềm; đố 17 × 8 + 17 × 2; tách 25 × 12.
6. Dấu hiệu nắm bài: tính hai cách, nhận ra thừa số chung, không bỏ sót số hạng, phân biệt với kết hợp.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Nhân một số với một tổng | Đếm theo tổng số hàng hay theo màu áo đều ra 75 | `NhanVoiTong`: 4 bước, 5 hàng × 15 chấm (3 đỏ, 2 vàng) | a × (b + c) = a × b + a × c | 5 × (3 + 4) = 5 × 3 + 5 × ? |
| 2. Nhân một tổng với một số | Số ngoài ngoặc đứng sau, cách làm vẫn vậy | không (ví dụ ngắn 2 + 3) | (a + b) × c = a × c + b × c | (2 + 6) × 7 = 2 × 7 + ? × 7 |
| 3. Tính thuận tiện | Đọc đẳng thức từ phải sang trái | không | 34 × 8 + 34 × 2 = 34 × 10 = 340 | 38 × 6 + 38 × 4 |
| 4. Nhân với một hiệu | Bớt 2 cột khỏi 6 cột | `NhanVoiHieu`: 4 bước, 4 hàng × 6 chấm | a × (b − c) = a × b − a × c | 6 × (5 − 2) = 6 × 5 − 6 × ? |

Bố cục 390px: hình chấm dùng viewBox 340, chấm bán kính 7 (đội) và 13 (hiệu); chữ cỡ 18 trở lên.

## Phần Bài tập

Đổi số liệu so với sách, giữ dạng. Đáp án in đậm đều đã tính lại và có test.

**Hoạt động (trang 17 và 18), 7 câu**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| hd-1a | loi-van | 52 × (3 + 4) hai cách | **7; 364; 156 + 208 = 364** |
| hd-1b | loi-van | (14 + 26) × 6 hai cách | **40; 240; 84 + 156 = 240** |
| hd-1c | loi-van | 35 × (6 + 2) hai cách | **8; 280; 210 + 70 = 280** |
| hd-1d | loi-van | (18 + 13) × 5 hai cách | **31; 155; 90 + 65 = 155** |
| hd-2a | dien-so | m = 3, n = 6, p = 4: bốn biểu thức | **30; 36; 30; 36** |
| hd-2b | trac-nghiem | hai biểu thức bằng nhau | **m × (n + p) và m × n + m × p** |
| hd-3 | loi-van | (3 + 4) lớp × 15 bạn | **7; 105; 45 + 60 = 105** |

**Luyện tập: phép cộng (trang 18), 7 câu**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| lt-1a | loi-van | 73 × 3 + 73 × 6 hai cách | **219 + 438 = 657; 9; 657** |
| lt-1b | loi-van | 125 × 4 + 125 × 2 hai cách | **500 + 250 = 750; 6; 750** |
| lt-2a | dien-so | 58 × 7 + 58 × 3 | **10; 580** |
| lt-2b | dien-so | 24 × 8 + 24 × 2 | **10; 240** |
| lt-2c | dien-so | 34 × 4 + 66 × 4 | **100; 400** |
| lt-3 | dien-so | 241 × 3 + 241 × 5 + 241 × 2 | **10; 2 410** |
| lt-4 | loi-van | 3 chuyến × 42 và 3 chuyến × 58 thùng | **100; 300** |

**Luyện tập: phép trừ (trang 19), 9 câu**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| lt-5a | dien-so | 31 × (8 − 5) và 31 × 8 − 31 × 5 | **93; 93** |
| lt-5b | dien-so | (9 − 4) × 7 và 9 × 7 − 4 × 7 | **35; 35** |
| lt-6a | dien-so | a = 6, b = 9, c = 4 | **30; 30** |
| lt-6b | dien-so | a = 12, b = 10, c = 3 | **84; 84** |
| lt-6c | dien-so | a = 15, b = 8, c = 5 | **45; 45** |
| lt-7 | trac-nghiem | `>`, `<`, `=` | **=** |
| lt-8a | dien-so | 57 × 9 − 57 × 8 | **1; 57** |
| lt-8b | dien-so | 129 × 7 − 129 × 2 | **5; 645** |
| lt-9 | loi-van | 8 tấm × 25 m, bán 3 tấm | **5; 125** |

**Suy nghĩ thêm (4 câu)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | Tìm lỗi: 4 × (3 + 5) = 4 × 3 + 5 | **Phải nhân 4 với cả 5: 32** |
| sn-2 | dien-so | 25 × 12 = 25 × (10 + 2) (vượt SGK) | **250; 50; 300** |
| sn-3 | dien-so | 99 × 7 = (100 − 1) × 7 (vượt SGK) | **700; 7; 693** |
| sn-4 | trac-nghiem | Tìm lỗi: 5 × (2 × 3) = 5 × 2 × 5 × 3 | **Sai: 30 và 150** |

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "tính chất phân phối của phép nhân đối với phép cộng", "tổng", "số hạng", "hiệu", "số bị trừ", "số trừ", "thừa số".
- Số lớn có NBSP (2 410, 1 080). Dấu nhân ×, dấu trừ −.
- Không dạy: nhân với số có hai chữ số (Bài 43), đặt thừa số chung phức tạp, phân phối của phép chia.

## Câu hỏi cần chốt

1. **Giữ KeyFact và animation riêng cho phép trừ?** Đề xuất: giữ, vì sách có đủ 4 bài tập trừ mà không có khung ghi nhớ.
2. **`sn-2`, `sn-3` (tách số) để ở "Suy nghĩ thêm"?** Đề xuất: giữ ở đó, không tính vào điều bắt buộc; là bước đệm cho Bài 43.
3. **Đổi số liệu mọi bài?** Đề xuất: đổi, đáp án sách để ở khối Phụ huynh.

## Phụ lục: đáp án SGK

Đã tính lại, nằm trong khối "Xem đáp án" của `phu-huynh.mdx`.

- Tr.17: 15 × (3 + 2) = 75; HĐ1 a) 344, b) 252.
- Tr.18: HĐ2 (m = 4, n = 5, p = 3) 32, 27, 32, 27; HĐ3 60. LT1 549, 1 080; LT2 670, 450, 600; LT3 3 210.
- Tr.19: LT4 300. Bài 1 a) 69 = 69, b) 45 = 45. Bài 2 hàng 2: 32, 32; hàng 3: 70, 70; dấu `=`. Bài 3 a) 48, b) 780. Bài 4 144 m.
