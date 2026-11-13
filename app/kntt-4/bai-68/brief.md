# Brief — Bài 68. Ôn tập phép tính với số tự nhiên

- SGK: Toán 4 KNTT tập hai, trang 105-106, Chủ đề 13 (Ôn tập cuối năm). Chỉ có phần Luyện tập: 5 bài (tr.105), 5 bài (tr.106).
- Route: `/kntt-4/bai-68`
- Trạng thái: đã viết nội dung (người dùng cho làm một lượt, không dừng duyệt).

## Đánh giá

- **Vị trí:** bài trước 67 (ôn tập số tự nhiên), bài sau 69 (ôn tập phân số).
- **Bài nguồn:** Bài 22, 23 (cộng, trừ; ôn lại ở Bài 2, 34), Bài 24 (giao hoán, kết hợp của phép cộng), Bài 25 (tổng và hiệu), Bài 38, 43 (nhân), Bài 39, 44 (chia), Bài 40, 42 (giao hoán, kết hợp, phân phối của phép nhân), Bài 5 và 46, 47 (biểu thức, trung bình cộng).
- **Cấu trúc SGK:** tr.105: đặt tính 6 phép, tìm số (tính chất phép cộng), tổng–hiệu, trung bình cộng, tính thuận tiện. tr.106: đặt tính 4 phép, tìm số (giao hoán, kết hợp nhân, phân phối), giá trị biểu thức, tiền xăng, tính thuận tiện.
- **Điểm mấu chốt:** tr.105 bài 5 có số 9 543 đứng ngoài cặp tròn (kết quả không bằng 0); tr.106 bài 3 thứ tự ngoặc, chia, trừ; bài 4 cần đổi 300 km ra số lần 100 km.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Quên nhớ, mượn | 6 358 + 947 = 6 305 (7 305) | `ct-1a`..`ct-1e`, hint nêu nhớ/mượn |
| Tích riêng thứ hai thẳng cột | 306 × 24 = 1 836 (7 344) | `thu-lui-cot`, `sn-3` |
| Số dư ≥ số chia | 7 546 : 24 = 314 dư 10 (dư < 24) | `thu-du`, test số dư < số chia |
| Làm cộng trước nhân | 7 246 + 215 × 36 | `thu-thu-tu`, `bt-1a`, `bt-2` |
| Quên chia 2 trong tổng–hiệu | Xe thứ nhất 52 000 l (26 000 l) | `thu-tong-hieu`, `bt-lv-1` |
| Đếm thiếu số toa khi tính trung bình | chia cho 2 nhóm (chia 12 toa) | `bt-lv-2` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Đủ | Nhắc lại nhanh là chính các câu thử, thay khởi động |
| Tách | Vừa | Tính thuận tiện: ghép số tròn (`tc-2a`..`tc-2c`) |
| Bốn kênh | Vừa | Viết (đặt tính ra vở), nhẩm (thuận tiện), nói (giải thích lỗi `sn-3`) |
| Câu tư duy | Vượt SGK | `sn-1`, `sn-2` ước lượng; `sn-3` tìm lỗi trong đặt tính |
| Đếm, So sánh | Không dùng | Bài ôn không có quy luật theo bước hay quan hệ hơn/kém |

Vượt SGK: nhóm "Suy nghĩ thêm" (3 câu), vì lỗi hay mắc ở nhân, chia là sai thứ tự cột và số chữ số của kết quả.

## Phần Phụ huynh

Theo mẫu bài ôn: mục 1 gồm bảng "sai nhóm nào, xem lại bài nào"; nhắc cho con đặt tính ra vở ô li vì app chỉ nhập kết quả phép nhân, chia; có đáp án SGK tr.105-106.

## Phần Lý thuyết (Nhắc lại nhanh)

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Nhớ, mượn khi cộng, trừ; thử lại phép trừ | 22, 23 | `KeyFact` + `thu-cong`, `thu-tru` |
| Số lớn, số bé từ tổng và hiệu | 25 | `KeyFact` + `thu-tong-hieu` |
| Tích riêng thứ hai lùi một cột | 38, 43 | `KeyFact` + `thu-lui-cot` |
| Số dư bé hơn số chia, thử lại | 39, 44 | `KeyFact` + `thu-du` |
| Giao hoán, kết hợp, phân phối; thuận tiện | 24, 40, 42 | `KeyFact` + `thu-giao-hoan`, `thu-thuan-tien`, `thu-phan-phoi` |
| Thứ tự phép tính trong biểu thức | 5, 46 | `KeyFact` + `thu-thu-tu` |

Không có animation.

## Phần Bài tập

Nhóm theo bài nguồn. Đáp án tính lại trong test; đặt tính cộng/trừ dùng dạng `dat-tinh`; nhân, chia không có renderer cột nên dùng `dien-so` (con đặt tính ra vở rồi điền kết quả).

- **Cộng, trừ (Bài 22, 23):** 5 câu `dat-tinh`: 6 358 + 947; 48 635 + 9 372; 71 204 − 45 688; 1 530 200 − 718 450; 574 306 + 428 795.
- **Nhân, chia (Bài 38-44):** 6 câu `dien-so`: 917 × 6; 408 × 35; 2 765 × 48; 7 546 : 24 (dư 10); 354 126 : 42 (dư 24); 96 048 : 6.
- **Tính chất (Bài 24, 40, 42):** 5 câu tìm số `?` (đổi số so với SGK) + 3 câu thuận tiện: 7 350 + 6 428 + 2 650 − 6 400; 2 804 × 25 × 4; 356 × 38 + 356 × 62.
- **Biểu thức:** 7 246 + 215 × 36; 5 138 − (8 465 − 4 565) : 15; `trac-nghiem` 120 − 8 × 6 + 4.
- **Lời văn:** tổng–hiệu hai xe bồn (47 000 l, hơn 5 000 l); trung bình toa tàu (7 × 16 400 và 5 × 14 600); tiền xăng 400 km, 7 l/100 km, 24 000 đồng/l.
- **Suy nghĩ thêm (vượt SGK):** `sn-1`, `sn-2` ước lượng; `sn-3` tìm lỗi đặt tính.

## Kỹ thuật

Không cần thứ mới. Đặt `available` của Bài 68 thành `true` trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

Dùng thuật ngữ SGK (số hạng, tích riêng, số dư...). Số lượng tách lớp bằng NBSP, "đồng" viết sau số. Không dạy ước lượng sâu (chỉ ở "Suy nghĩ thêm").

## Câu hỏi cần chốt

1. Nhân, chia dùng `dien-so` thay vì renderer đặt tính cột: đề xuất giữ, vì Bài 48 làm như vậy và không cần dạng mới.
2. Tính thuận tiện của SGK tr.105 bài 5 có kết quả 9 543 chứ không bằng 0: giữ dạng a + b + c − d với cặp tròn, đổi số.

## Phụ lục: đáp án SGK

Xem khối "Đáp án bài trong sách" trong `phu-huynh.mdx` (tính lại bằng code: 8 962 : 28 = 320 dư 2; 231 438 : 34 = 6 807 chia hết).
