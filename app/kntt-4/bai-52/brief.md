# Brief — Bài 52. Luyện tập chung

- SGK: Toán 4 KNTT tập hai, trang 47-48, Chủ đề 9 (Làm quen với yếu tố thống kê, xác suất).
- Route: `/kntt-4/bai-52`
- Trạng thái: đã viết nội dung (người dùng cho phép làm một lượt, không dừng duyệt).

## Đánh giá

- **Vị trí:** bài cuối Chủ đề 9. Bài trước: 51 (số lần xuất hiện của một sự kiện). Bài sau: 53 (chủ đề tiếp theo). Bài ôn lại nó: không có.
- **Bài nguồn:** Bài 49 (dãy số liệu), Bài 50 (biểu đồ cột), Bài 51 (kiểm đếm, số lần xuất hiện); trung bình cộng từ Bài 46.
- **Cấu trúc SGK:** Luyện tập chung 4 bài: 1 trắc nghiệm, 2 biểu đồ cột (3 câu), 3 dãy số liệu (2 câu), 4 thực hành 4 hộp (3 câu).
- **Kiến thức cần có:** các bài nguồn trên.
- **Điểm mấu chốt:** “nhiều hơn 100 000” không gồm 100 000 (bẫy của bài 1); biểu đồ vạch chia 3 có hai cột nằm giữa các vạch; “ai” hỏi tên, “bao nhiêu” hỏi số; bài 4 là thực hành thật, số liệu mỗi nhóm khác nhau.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Chia trung bình cho số khác số số hạng | (4 + 6 + 8) : 2 = 9 (18 : 3 = 6) | `sn-1`, `ds-3`, `kh-3`: hỏi “dãy có mấy số?” trước |
| Đọc nhầm vạch chia 3 | Đọc mỗi vạch là 1 (0, 3, 6, 9) | `thu-dinh-cot`, `bd-1`, `sn-2` |
| Đếm cả giá trị bằng 100 000 vào “nhiều hơn” | 3 ngày (đúng 2 ngày) | `ds-1`, `thu-hon`, `kh-4` |
| Cộng sót số trong dãy | Cộng 9 số thay vì 10 | `ds-3`, `kh-2`: gạch từng số |
| Đọc đỉnh cột lệch một vạch | Cột giữa 6 và 9 đọc 9 | `thu-dinh-cot`, `bd-1`, `sn-2` |
| Nhầm “nhiều nhất” (giá trị) với “bạn nào” (tên) | Trả lời 12 (đúng Linh) | `bd-2`, `kh-1`, `sn-3` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Đủ | Phần Nhắc lại nhanh là chính các câu thử, thay khởi động |
| Bốn kênh | Vừa | Hình (biểu đồ, kiểm đếm), viết (điền số), nói (Phụ huynh hỏi “dãy có mấy số?”) |
| Câu tư duy | Vừa | Nhóm Suy nghĩ thêm: tìm lỗi trung bình, vì sao chọn đáp án, tổng các lần |
| So sánh | Nhẹ | Hiệu hai cột, hai sự kiện |
| Không dùng | | Đếm, Tách: bài không có quy luật theo bước hay số lớn cần tách |

Suy nghĩ thêm:

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| sn-1 | trac-nghiem | Tìm lỗi: (4 + 6 + 8) : 2 = 9 | Chia cho 3: 18 : 3 = 6 |
| sn-2 | trac-nghiem | Cột giữa vạch 6 và 9 | **7** |
| sn-3 | trac-nghiem | “Bạn nào nhiều nhất” trả lời “12” | Sai, phải trả lời tên |
| sn-4 | dien-so | Trung bình 3 số là 6, tổng? | **18** (vượt SGK nhẹ: đảo phép trung bình, vì Bài 46 đã có) |
| sn-5 | trac-nghiem | Ghi 4 + 5 khi chọn 10 lần | Chưa hợp lí, 4 + 5 = 9 |

## Phần Phụ huynh

Theo mẫu bài luyện tập chung: thay “Con học gì” bằng bài nên xem lại (49/46, 50, 51). Hoạt động ôn: thực hành 4 hộp (1 kẹo, 3 tẩy) bằng vật thật 10 lần, kiểm đếm rồi cộng; khảo sát nhỏ trong nhà và vẽ biểu đồ cột. Đáp án SGK trong Fold.

## Phần Lý thuyết

Nhắc lại nhanh, không viết animation mới.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Dãy có bao nhiêu số, lớn nhất, nhỏ nhất | 49 | `KeyFact` + `QuickCheck` `thu-day` |
| Trung bình = tổng : số số hạng | 46, 49 | `KeyFact` + `thu-trung-binh` |
| “Nhiều hơn” không gồm số bằng | 49 | `KeyFact` + `thu-hon` |
| Đọc đỉnh cột, cột giữa hai vạch; “bạn nào” là tên | 50 | `KeyFact` + `thu-dinh-cot` (hình `BieuDoCot`) |
| Kiểm đếm nhóm 5 | 51 | `thu-kiem-dem` (hình `BangKiemDem`) |
| Tổng các lần = số lần thực hiện; so sánh số lần | 51 | `KeyFact` + `thu-tong-lan` |

## Phần Bài tập

Số liệu đã đổi so với SGK; mọi đáp án tính lại trong `bai-tap.test.ts`.

- **Dãy số liệu (49):** `ds-1` trắc nghiệm (nhiều hơn 120 000: **2 ngày**); `ds-2` dien-so (**8** số, lớn nhất **12**, nhỏ nhất **3**); `ds-3` dien-so (tổng **90**, trung bình **9**); `ds-4` trắc nghiệm (số thứ năm **7**).
- **Biểu đồ cột (50):** vạch chia 3. `bd-1` Nga **5**; `bd-2` **Linh**; `bd-3` **Minh**; `bd-4` Hà hơn Nga **3**; `bd-5` hoàn thành cột Nga **5**.
- **Số lần xuất hiện (51):** `sk-1` hai sự kiện; `sk-2` kiểm đếm bánh **3**, gôm **7**, tổng **10**; `sk-3` gôm nhiều hơn; `sk-4` hơn **4** lần.
- **Kết hợp:** biểu đồ số sách (vạch chia 2). `kh-1` **Lan**; `kh-2` tổng **30**; `kh-3` trung bình **6**; `kh-4` hơn trung bình **2 bạn** (Mai đúng 6, không tính).
- **Suy nghĩ thêm:** như bảng Tư duy.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: dãy số liệu, biểu đồ cột, số trung bình cộng, bảng kiểm đếm, sự kiện, số lần xuất hiện.
- Số tiền có NBSP (dùng `formatNumber`).
- Không dạy: xác suất bằng phân số, “khả năng”; chỉ nói “nhiều lần hơn, ít lần hơn”.

## Câu hỏi cần chốt

1. Bài 4 SGK là thực hành thật; app chỉ có câu kiểm đếm mẫu (`sk-2`). Đề xuất: giữ thực hành ở Phụ huynh (vật thật), không làm trò chơi.
2. `sn-4` (tổng từ trung bình) vượt SGK nhẹ. Đề xuất giữ vì Bài 46 đã dạy trung bình.

## Phụ lục: đáp án SGK

- Bài 1: 180 000 và 125 000, **2 ngày**, B (100 000 không tính).
- Bài 2: a) Mai (9), Việt (3). b) 7 + 6 + 3 + 6 + 9 + 5 = **36**. c) 36 : 6 = **6**. Số cột 7 (Lan) và 5 (Lâm) đọc từ ảnh, chưa đối chiếu sách gốc.
- Bài 3: a) **12**. b) 70 : 10 = **7**.
- Bài 4: thực hành; tổng hai số lần bằng 10.
