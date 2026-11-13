# Brief — Bài 49. Dãy số liệu thống kê

- SGK: Toán 4 KNTT tập hai, trang 36-38, chủ đề 9 (Làm quen với yếu tố thống kê, xác suất).
- Route: `/kntt-4/bai-49`
- Trạng thái: đã viết nội dung (duyệt theo ủy quyền một lượt)

## Đánh giá

- Vị trí: bài đầu chủ đề 9; trước là Bài 48 (luyện tập chung chủ đề 8), sau là Bài 50 (biểu đồ cột). Ôn lại Bài 46 (trung bình cộng).
- Cấu trúc SGK: Khám phá (tr.36, dãy 1, 2, 2, 2, 3) → Hoạt động (tr.37, 3 bài) → Luyện tập (tr.38, 3 bài; bài 3 là khảo sát thực tế).
- Mục tiêu: (1) nêu dãy số liệu có bao nhiêu số, kể cả số lặp; (2) đọc số thứ n; (3) tìm nhiều nhất, ít nhất; (4) đếm số lớn hơn x hoặc trong khoảng; (5) sắp xếp bé đến lớn, lớn đến bé không sót; (6) tính trung bình.
- Kiến thức cần có: so sánh số, trung bình cộng (Bài 46).
- Điểm mấu chốt: SGK không giải thích "dãy có mấy số" khi có số lặp; "số thứ n" khác "giá trị n"; "lớn hơn" khác "từ trở lên"; Luyện tập 3 cần số liệu thật nên chuyển sang Phụ huynh. Không dạy mốt, trung vị, biểu đồ.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhầm số thứ n với giá trị | Số thứ ba của 4, 9, 6 là 3 (đúng 6) | Animation bước 7 ghi "thứ 1..5"; QuickCheck thu-thu-n |
| Đếm giá trị khác nhau | 1, 2, 2, 2, 3 có 3 số (đúng 5) | Bước 6 "kể cả số giống nhau"; thu-dem; sn-1 |
| Sắp xếp sót số lặp | 8, 3, 5, 3, 9 viết 3, 5, 8, 9 (đúng 3, 3, 5, 8, 9) | KeyFact đếm lại; hd-2; sn-2 |
| "Nhiều hơn 5" thành "từ 5 trở lên" | 2, 5, 5, 7, 9: 4 số (đúng 2) | thu-nhieu-hon; hd-1c; sn-4 |
| Chia trung bình sai | 24 : 3 thay vì 24 : 4 | lt-2; sn-3 |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Chính | Số các số, số thứ n |
| So sánh | Vừa | Nhiều nhất, ít nhất, lớn hơn |
| Kiểm tra đầu vào | Nhẹ | 3 khởi động: lớn nhất, bé nhất, trung bình |
| Bốn kênh | Có | Hình (cột), nói (đọc dãy), nhẩm, viết |
| Câu tư duy | Có | Nhóm Suy nghĩ thêm: tìm lỗi sai |
| Không dùng: Tách | | Không có số lớn |

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-lon-nhat | dien-so | lớn nhất của 7, 12, 9 | **12** |
| kd-be-nhat | dien-so | bé nhất của 15, 8, 11 | **8** |
| kd-trung-binh | dien-so | TB của 2, 4, 6 | 12; **4** |
| thu-dem | trac-nghiem | số số của 2, 2, 5, 5, 5 | **5** |
| thu-thu-n | trac-nghiem | số thứ ba của 4, 9, 6, 7 | **6** |
| thu-nhieu-hon | dien-so | số lớn hơn 5 trong 3, 5, 6, 8, 5 | **2** |
| sn-1 | dien-so | 4, 4, 7, 4, 7, 7: số số, giá trị khác nhau | **6**, **2** |
| sn-2 | trac-nghiem | tìm lỗi sắp xếp | Thiếu một số 3 |
| sn-3 | dien-so | tìm lỗi chia cho 3 | **4**, **6** |
| sn-4 | trac-nghiem | "lớn hơn 5" và "từ 5 trở lên" | Lan đúng (vượt SGK, nhẹ) |

## Phần Phụ huynh

Theo mẫu 6 mục. Lỗi: 5 lỗi ở bảng trên. Hoạt động ôn: khảo sát giờ ngủ (Luyện tập 3 SGK) làm tại nhà, không chấm điểm. Dấu hiệu: đếm đủ số lặp, phân biệt "số thứ ba" với "số 3".

## Phần Lý thuyết

| Chặng | Ý | Animation, KeyFact, QuickCheck |
|---|---|---|
| 1. Ghi mỗi ngày | Cột quãng đường theo thứ → dãy số liệu | `NhatKy`, 7 bước (5 ngày, dãy, số thứ n kèm nhiều nhất, ít nhất); KeyFact "1, 2, 2, 2, 3" |
| 2. Đếm số | Kể cả số lặp | QuickCheck thu-dem |
| 3. Số thứ n | Vị trí, không phải giá trị | KeyFact; thu-thu-n |
| 4. Nhiều nhất, ít nhất, nhiều hơn | Cột T6 cao nhất; trung bình 2 km | thu-nhieu-hon |
| 5. Sắp xếp | Số số không đổi | KeyFact; không có animation thứ hai (chữ đủ rõ) |

Hình rộng 340, 5 cột rộng 40, vừa ở 390px.

## Phần Bài tập

Số liệu đổi so với SGK.

- Hoạt động (tr.37): **hd-1** dien-so, dãy 3, 8, 5, 1, 6: thứ ba **5**, nhiều nhất **8**, lớn hơn 4 là **3** số. **hd-2** dien-so, 7, 2, 9, 2, 5, 9: bé đến lớn **2, 2, 5, 7, 9, 9**; lớn đến bé **9, 9, 7, 5, 2, 2**. **hd-3a** dien-so, 5, 3, 4, 3, 5, 4, 3: **7** số, đầu **5**, nhiều nhất **5**, ít nhất **3**. **hd-3b** trac-nghiem: tên Khuyên (6 chữ cái) **không có**.
- Luyện tập (tr.38): **lt-1a** dien-so, 3, 4, 6, 7, 9, 12: **6** ngày, ít nhất **3** quả, ngày thứ **1**. **lt-1c** trac-nghiem: **Tăng**. **lt-2** loi-van, 15, 25, 45, 20, 30: **5** người, tổng **135**, trung bình **27** phút. **lt-3** dien-so, giờ ngủ 9, 7, 10, 8, 11, 9, 6, 10: **8** bạn, ít nhất **6** giờ, đủ giờ (9 đến 12) **5** bạn.
- Suy nghĩ thêm: sn-1 đến sn-4 (bảng Tư duy).

## Tiêu chí duyệt nội dung

Dùng "dãy số liệu", "số thứ nhất, thứ hai", "nhiều nhất, ít nhất", "trung bình". Không dạy mốt, trung vị, biểu đồ. Số có 4 chữ số trở lên dùng NBSP (bài này không có).

## Câu hỏi cần chốt

1. Luyện tập 3 (khảo sát giờ ngủ) đặt ở Phụ huynh, không chấm điểm. Đề xuất: giữ, vì cần số liệu thật của con. Có thể bỏ lt-3 mẫu nếu muốn.
2. Một animation (NhatKy) thay vì hai. Đề xuất: giữ, sắp xếp dạy bằng chữ và KeyFact.
3. sn-4 ("lớn hơn" và "từ trở lên") hơi vượt SGK (SGK chỉ hỏi "nhiều hơn 5"). Đề xuất: giữ vì là lỗi hay mắc.
4. Tên Khuyên (6 chữ cái, K-h-u-y-ê-n) thay Nguyệt. Chưa đối chiếu cách SGK đếm chữ cái với "kh", "ng" (ở đây đếm từng chữ cái).

## Phụ lục: đáp án SGK

Ghi trong `phu-huynh.mdx`, mục "Đáp án bài trong sách". Tính lại: Hoạt động 1: 4, 7, 2 bạn. Hoạt động 2: 1, 4, 5, 8, 13 và 13, 8, 5, 4, 1. Hoạt động 3: 8, 4, 5, 2; Nguyệt 6 chữ cái nên không có. Luyện tập 1: 8 ngày, 2 quả, tăng. Luyện tập 2: 5 người, 150 : 5 = 30. Luyện tập 3 mẫu: 7 bạn, 7 giờ, 4 bạn.
