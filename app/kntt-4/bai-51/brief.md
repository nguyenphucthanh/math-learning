# Brief — Bài 51. Số lần xuất hiện của một sự kiện

- SGK: Toán 4 KNTT tập hai, trang 43-46, chủ đề 9 (Làm quen với yếu tố thống kê, xác suất).
- Route: `/kntt-4/bai-51`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 49 (dãy số liệu), Bài 50 (biểu đồ cột); bài sau là Bài 52 (luyện tập chung).
- Cấu trúc SGK: Khám phá (vòng quay 2 màu, quay 20 lần, bảng kiểm đếm 9 và 11) → Hoạt động 1 (hộp bóng, 10 lần), Hoạt động 2 (đua thỏ Chẵn/Lẻ) → Luyện tập 1 (đọc kiểm đếm xúc xắc), 2 (túi bút, lấy 2 bút, 20 lần), 3 (đua rùa đánh số 2-12). Phần lớn là thực hành thật, kết quả mỗi nhóm khác nhau.
- Mục tiêu:
  1. Nêu được các sự kiện có thể xảy ra trong một lần thực hiện.
  2. Ghi và đọc bảng kiểm đếm (nhóm 5), nói số lần xuất hiện.
  3. Kiểm tra tổng số lần các sự kiện bằng số lần thực hiện.
  4. So sánh: nhiều lần hơn, ít lần hơn, hơn bao nhiêu lần.
- Kiến thức cần có: đếm nhóm 5, cộng trừ trong phạm vi 100, số chẵn lẻ, đọc dãy số liệu và biểu đồ (Bài 49, 50).
- Điểm mấu chốt: bài chỉ làm quen, **không** dạy xác suất, tỉ lệ, "khả năng", "chắc chắn/không thể". Kết quả thực hành ngẫu nhiên nên app không khẳng định thỏ hay rùa nào "luôn" thắng. Bẫy của SGK: câu Luyện tập 2 chỉ có 2 sự kiện (không có 2 bút vàng vì túi chỉ có 1 bút vàng).
- Số liệu Luyện tập 1 (mặt 5 chấm = 7 lần, đáp án D, tổng 23 lần gieo) **đọc từ ảnh, cần đối chiếu sách**. App không dùng số này; chỉ ghi trong đáp án Phụ huynh.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Đếm nhóm 5 thành 4 hoặc thành 1 | Hàng 1 nhóm + 3 nét đọc là 4 (đúng 8) | Khởi động 1-3, `thu-doc`, `db-1`, `sn-4`; animation `GhiKiemDem` |
| Nhầm số lần với số sự kiện | "Có 11 sự kiện" (đúng: 2 sự kiện, 11 lần) | `thu-su-kien`, `sn-3` |
| Kết luận theo ý đoán, không nhìn bảng | "Vàng nhiều hơn" khi chưa quay | `sn-1`; KeyFact chặng 3 |
| Thiếu một sự kiện có thể xảy ra | Chỉ nêu "lấy 2 bút xanh" | `sk-1`, `sk-2`, `sk-3` |
| Tổng các lần không bằng số lần thực hiện | 9 + 8 = 17 mà đã quay 20 lần | `kq-2`, `db-4`, `sn-2` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Đếm | Chính | Nhóm 5, đếm bằng 5, 10, 15; lỗi đếm nhóm 5 |
| So sánh | Chính | Nhiều lần hơn, hơn mấy lần; animation ghép cặp `SoSanhLan` |
| Kiểm tra đầu vào | Nhẹ | 3 câu khởi động: đọc nét kiểm đếm |
| Bốn kênh | Đủ | Nói (kể sự kiện, đọc số lần), hình (vòng quay, nét kiểm đếm, chấm ghép cặp), nhẩm (5 + 4), viết (điền bảng từ dãy kết quả) |
| Câu tư duy | Có | Nhóm "Suy nghĩ thêm": tìm lỗi đếm, tổng không khớp, vì sao phải nhìn bảng; dự đoán rồi kiểm tra bằng trò chơi |
| Tách | Không dùng | Số bé, nhóm 5 là đủ |

Khởi động: `kd-1` (8 nét), `kd-2` (13 nét), `kd-3` (3 × 5 + 2 = 17).
Thử nhanh: `thu-su-kien` (2 sự kiện), `thu-doc` (14 lần), `thu-so-sanh` (hơn 3 lần).
Suy nghĩ thêm: `sn-1` (nhìn bảng), `sn-2` (9 + 8 ≠ 20), `sn-3` (số lần ≠ số sự kiện), `sn-4` (tìm lỗi đếm). Không có câu vượt SGK.

## Phần Phụ huynh

Theo mẫu 6 mục. Riêng: hoạt động ôn 10 phút dùng vật thật (hộp bóng/cục tẩy, hai xúc xắc, túi bút) thay cho phần thực hành của SGK; đáp án SGK trong Fold, các câu thực hành ghi “kết quả mỗi lần mỗi khác, kiểm tra tổng bằng số lần thực hiện”.

## Phần Lý thuyết

| Chặng | Ý | Hình | KeyFact | Thử nhanh |
|---|---|---|---|---|
| 1. Sự kiện | Mỗi chuyện có thể xảy ra là một sự kiện | `VongQuay` tĩnh (4 múi đỏ-vàng, mũi tên) | 2 sự kiện: đỏ, vàng | `suKien` |
| 2. Bảng kiểm đếm | Ghi nét theo nhóm 5, đọc số lần, 9 = 5 + 4, 11 = 5 + 5 + 1 | `GhiKiemDem`: 6 bước (0, 5, 10, 15, 20 lần, rồi tách nhóm) | Nhóm 5 nét; tổng các lần bằng số lần quay | `doc` |
| 3. So sánh | Nhiều lần hơn, hơn 11 − 9 = 2 lần | `SoSanhLan`: 3 bước ghép cặp | Nhìn bảng, không đoán | `soSanh` |

Bố cục 390px: SVG co theo chiều rộng, nhãn tối thiểu 16px.

## Phần Bài tập

Số liệu đổi so với SGK. Đáp án tính lại bằng test.

- Đọc bảng kiểm đếm (Khám phá, Luyện tập 1): `db-1` (trắc nghiệm, mặt 5 chấm: **8 lần**), `db-2` (dien-so, tổng **28**), `db-3` (trắc nghiệm, ít nhất: **mặt 6 chấm**), `db-4` (dien-so, **8**, **2**, tổng **10**).
- Sự kiện có thể xảy ra: `sk-1` (trắc nghiệm), `sk-2` (trắc nghiệm, lấy 2 bút), `sk-3` (dien-so, **3**).
- Hoàn thành bảng kiểm đếm: `kq-1` (dãy 20 lần, **16** xanh và **4** vàng), `kq-2` (tổng **20**), `kq-3` (trắc nghiệm, **bóng xanh**), `kq-4` (hơn **12** lần), `kq-5` (dãy xúc xắc 12 lần, mặt 5: **4**, mặt 6: **2**).
- So sánh số lần: `ss-1` (đỏ), `ss-2` (hơn **5** lần), `ss-3` (tổng **25**), `ss-4` (xanh).
- Suy nghĩ thêm: `sn-1` đến `sn-4`.

Các hoạt động thực hành thật của SGK (Hoạt động 1b/c, 2; Luyện tập 2b/c, 3) không chấm điểm: đưa vào Phụ huynh (vật thật) và trò chơi `_game/`.

## Kỹ thuật

- Component dùng chung mới: `components/math/kiem-dem.tsx` (`BangKiemDem`, Server Component thuần SVG: nét kiểm đếm theo nhóm 5, mỗi hàng một sự kiện, tối đa 6 nhóm mỗi hàng). Dùng ở lý thuyết, illustration bài tập và các bài sau. Bài 50 chưa có component tương tự.
- Trò chơi `_game/`: `dua-tho.ts` (logic thuần, `rng` tiêm vào), `tro-choi.tsx` (client, bấm “Gieo”, ngẫu nhiên chỉ sau khi bấm nên không lệch hydration, không lưu tiến độ, không animation riêng nên không phải xử lý `prefers-reduced-motion`). Chọn đua thỏ vì luật gọn hơn đua rùa 11 con. Trò chơi chỉ cho con quan sát bảng kiểm đếm, không khẳng định thỏ nào “luôn” thắng.
- `lib/lessons.ts`: đặt `available` của Bài 51 thành `true`.

## Tiêu chí duyệt nội dung

- Dùng đúng: “sự kiện”, “có thể xảy ra”, “bảng kiểm đếm”, “số lần xuất hiện”, “nhiều lần hơn / ít lần hơn”.
- Không dạy: phân số/tỉ lệ, “khả năng”, “chắc chắn”, “không thể”, tổ hợp. Kiến thức ngoài SGK (3 cặp bút, tổng 7 có nhiều cách nhất khi gieo hai xúc xắc) cố ý không đưa vào để không dẫn sang xác suất.

## Câu hỏi cần chốt

1. Đối chiếu số kiểm đếm ở Luyện tập 1 (mặt 5 chấm = 7 lần, tổng 23) với sách. Đề xuất: sửa Fold Phụ huynh nếu khác.
2. Đua thỏ là trò chơi duy nhất; Luyện tập 3 (rùa) chỉ ở Phụ huynh. Đề xuất: giữ vậy, vì cùng kỹ năng ghi kiểm đếm.
3. Có thêm gợi ý vượt SGK (cách thử thật nhiều lần thì cặp bút khác màu hay xuất hiện hơn) không? Đề xuất: không, để dành bài sau.

## Phụ lục: đáp án SGK

- Khám phá: đỏ 9 = 5 + 4, vàng 11 = 5 + 5 + 1, 9 + 11 = 20.
- Hoạt động 1a: lấy được bóng xanh; lấy được bóng vàng. b, c: thực hành.
- Luyện tập 1: D (7 lần) (đọc từ ảnh, cần đối chiếu sách).
- Luyện tập 2a: lấy được 1 bút vàng và 1 bút xanh; lấy được 2 bút xanh. b, c, Luyện tập 3, Hoạt động 2: thực hành, kết quả mỗi lần mỗi khác.
