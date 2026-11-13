# Brief — Bài 63. Phép nhân phân số

- SGK: Toán 4 KNTT tập hai, trang 86-90, Chủ đề 12 "Phép nhân, phép chia phân số".
- Route: `/kntt-4/bai-63`
- Trạng thái: đã viết nội dung (brief viết cùng lượt với code, chưa qua bước duyệt riêng; xem "Câu hỏi cần chốt").

## Đánh giá

- Vị trí: bài mở đầu Chủ đề 12. Bài trước là Bài 62 (luyện tập chung chủ đề 11); bài sau là Bài 64 (phép chia phân số). Bài 66 ôn lại.
- Cấu trúc SGK: Khám phá (nhân hai phân số qua diện tích 4/5 × 2/3) → Hoạt động (3 bài) → Luyện tập (2 bài, nhân với số tự nhiên) → Luyện tập trang 88 (2 bài) → Luyện tập trang 88-89 (5 bài) → Luyện tập trang 90 (5 bài).
- Mục tiêu:
  1. Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số.
  2. Rút gọn từng phân số trước khi nhân, hoặc rút gọn kết quả.
  3. Nhân phân số với số tự nhiên và số tự nhiên với phân số (viết số tự nhiên thành phân số mẫu số 1), gồm nhân với 1 và với 0.
  4. Dùng giao hoán, kết hợp, nhân một tổng với một số để so sánh biểu thức và tính thuận tiện.
  5. Giải bài toán chu vi, diện tích và lời văn có phép nhân phân số; kết quả lớn hơn 1 giữ dạng phân số.
- Kiến thức cần có: Bài 53-54 (phân số, số tự nhiên là phân số), Bài 56 (rút gọn), Bài 60 (cộng phân số, để không lẫn quy tắc), diện tích hình chữ nhật.
- Điểm mấu chốt: SGK giải thích quy tắc bằng hình, nên animation đi theo hình. Phép nhân khác phép cộng ở chỗ mẫu số cũng nhân. Bài 5 trang 89 (tre) là Đ/S: a) đúng, b) sai (C dài 4/3 m, đọc từ hình: đốt dưới của C cao bằng B). Bài 5 trang 90 là hình hình học khó, không suy ra chắc chắn từ ảnh nên không đưa vào bài tập.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Giữ nguyên mẫu số như phép cộng | 2/5 × 3/5 = 6/5 (6/25) | KeyFact "khác phép cộng"; QuickCheck `nham` |
| Nhân số tự nhiên vào cả tử và mẫu | 2/5 × 3 = 6/15 (6/5) | KeyFact số tự nhiên (3 = 3/1); QuickCheck `stnSai` |
| Nhân chéo, cộng tử cộng mẫu | 3/5 × 2/3 = 9/10 (2/5); 1/2 × 1/3 = 2/5 (1/6) | sn-1, sn-2 |
| Quên rút gọn kết quả | 6/20 (3/10) | QuickCheck `rutgon`; dòng "rút gọn được" trong nr-1, nr-2, n-7, n-8 |
| Đổi kết quả lớn hơn 1 thành hỗn số | 6/5 = 1 1/5 (chưa học) | Câu nói rõ trong Lý thuyết |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Khởi động nhắc rút gọn (Bài 56), 3 = 3/1, diện tích hình chữ nhật |
| Bốn kênh | Dùng | Hình (15 ô, tô hàng và cột), nói (câu quy tắc), viết (phép tính), nhẩm (nhân với 0 và 1) |
| Câu tư duy | Dùng | Tìm lỗi (sn-1, sn-2), ước lượng "bé hơn 4/5" (sn-4), Đ/S tre đọc từ hình |
| So sánh | Dùng nhẹ | So sánh biểu thức, tính hai vế bằng code, không chỉ dựa vào tính chất |
| Tách | Dùng nhẹ | Tính thuận tiện: tách tổng trong ngoặc |
| Đếm | Không dùng | Bài không có quy luật theo bước |

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-rut | dien-so | Rút gọn 10/15 | **2/3** |
| kd-mot | dien-so | 3 = ?/1 | **3** |
| kd-dt | trac-nghiem | Diện tích 4 m × 3 m | **12 m²** |
| sn-1 | trac-nghiem | Hà nhân chéo | **nhân chéo** (đúng 2/5) |
| sn-2 | trac-nghiem | Nam cộng tử cộng mẫu | **phải nhân** (đúng 1/6) |
| sn-3 (ss-2) | so-sanh | Vượt SGK: 3 hàng không đều là "=" | **<, >, <** |
| sn-4 | trac-nghiem | Vượt SGK: 4/5 × 2/3 so với 4/5 | **bé hơn** |

## Phần Phụ huynh

6 mục theo mẫu. Ý riêng: lỗi giữ mẫu số và 6/15; hoạt động tấm giấy 5 hàng × 3 cột; 3 bạn uống 1/4 lít nước cam. Đáp án SGK trang 86-90 trong khối thu gọn; bài 5 trang 90 ghi "chưa có đáp án".

## Phần Lý thuyết

| Chặng | Ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Nhân hai phân số | Diện tích 4/5 × 2/3 trong 1 m² | `DienTich`, 5 bước: chia 15 ô, tô 4 hàng, tô 2 cột, đếm 8 ô, viết phép tính | 4/5 × 2/3 = (4 × 2)/(5 × 3) = 8/15 | `nhan`, `nham` |
| 2. Rút gọn khi tính | Rút gọn trước hoặc sau | Không | 6/20 = 3/10 | `rutgon` |
| 3. Số tự nhiên | 3 = 3/1; ×1, ×0 | Không (đủ bằng KeyFact và ví dụ) | 2/5 × 3 = (2 × 3)/(5 × 1) = 6/5 | `stn`, `stnSai`, `khong` |
| 4. Tính chất | Giao hoán, kết hợp, nhân một tổng | Không | (a + b) × c = a × c + b × c | `doiCho` |

Hình `DienTich` rộng viewBox 340, đã bố trí theo 390px. Không làm animation thứ hai cho số tự nhiên: ý đủ rõ bằng quy tắc 3 = 3/1.

## Phần Bài tập

Số liệu đổi so với SGK, trừ bài tre (gắn với hình). Dạng `loi-van` (hai ô tử và mẫu), `so-sanh`, `trac-nghiem`. Đáp án tính lại trong `bai-tap.test.ts`.

- Tiết 1, nhân hai phân số: h1-1..3 (**6/35**, **7/36**, **1/40**); h2-1..3 rút gọn trước (**14/15**, **11/24**, **1/12**); nr-1, nr-2 nhân xong rồi rút gọn (**1/6**, **1/4**); nhom diện tích tấm nhôm (**5/14** m²).
- Tiết 2, số tự nhiên: n-1 5/7 × 4 (**20/7**); n-2 ×1 (**3/8**); n-3 ×0 (**0**); n-4 4 × 3/7 (**12/7**); n-5 1 × (**5/6**); n-6 0 × (**0**); n-7 6 × 5/8 (**15/4**); n-8 9 × 4/15 (**12/5**).
- Tiết 3, tính chất: ss-1 so sánh (**=, =, =**, như SGK); b-1 nhân ba thừa số (**15/7**); ng-1 (1/2 + 1/4) × 4/9 (**1/3**); tt-1 (**4/13**); tt-2 (**5/11**).
- Tiết 4, lời văn và hình học: vuong chu vi (**16/9** dm); tau (**30** km); be (**26** m); lon (**30** kg); xe (**45/4**, **135/4** m²); hiep (**3** cái bánh); tre-a **Đúng**, tre-b **Sai** (C dài 4/3 m).
- Suy nghĩ thêm (vượt SGK): sn-1, sn-2, sn-3 so sánh có >, <, sn-4 ước lượng.

## Kỹ thuật

- Không cần thư viện đơn vị mới. `ketQua` trong `bai-tap.ts` sinh dòng "rút gọn được" và dùng một ô khi kết quả là số tự nhiên (như 0, 30).
- `evalExpr` tính hai vế biểu thức cho dạng `so-sanh`; test dùng bộ tính độc lập.
- `_illustrations/tre.tsx` vẽ đúng tỉ lệ 1 : 2/3 : 4/3.
- Đặt `available: true` cho Bài 63 trong `lib/lessons.ts` (đã làm).

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "tử số", "mẫu số", "rút gọn", "chiều dài", "chiều rộng", "chu vi", "diện tích".
- Số tự nhiên viết thành phân số mẫu số 1 như mẫu SGK.
- Phân số viết a/b, kết quả lớn hơn 1 giữ phân số, không dạy hỗn số, không dạy "nhân chéo".

## Câu hỏi cần chốt

1. **Bài 5 trang 90 (diện tích phần xanh):** hình hai hình vuông cạnh 8/5 dm và hai tam giác ABC, CDE bằng diện tích nhau. Chưa đọc chắc được từ ảnh nên bỏ khỏi bài tập, để trống đáp án ở phụ huynh. Gợi ý chưa kiểm chứng: có thể bằng 2 × (8/5)² = 128/25 dm². Đề xuất: đối chiếu sách giáo viên rồi mới thêm.
2. **Bài 5 trang 89 (tre):** đọc từ hình thì A = 1 m (3 đốt), B = 2 đốt của A = 2/3 m (đúng), C có đốt dưới cao bằng B nên C = 4/3 m (b sai, SGK ghi 3/2). Đề xuất: giữ đáp án a) Đúng, b) Sai. Xin xác nhận.
3. **Số liệu bài tính thuận tiện, tàu vũ trụ:** đã đổi số, kết quả chọn để rút gọn được (tàu: 8 vòng × 15/4 km = 30 km). Đề xuất: giữ.
4. **Câu vượt SGK:** sn-3 (so sánh có hàng không bằng nhau) và sn-4 (ước lượng). Đề xuất: giữ vì phục vụ lỗi "mọi vế đều bằng nhau" và hiểu quy tắc.

## Phụ lục: đáp án SGK

Xem khối "Đáp án bài trong sách" trong `phu-huynh.mdx` (trang 86-90, đã tính lại; trang 90 bài 5 chưa có).
