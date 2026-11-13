# Brief — Bài 56. Rút gọn phân số

- SGK: Toán 4 KNTT tập hai, trang 59-61, chủ đề 10 (Phân số).
- Route: `/kntt-4/bai-56`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 55 (tính chất cơ bản: chia cả tử số và mẫu số cho cùng một số). Bài sau: Bài 57 (quy đồng mẫu số), nơi con dùng lại phân số tối giản.
- Cấu trúc SGK: Khám phá (20/35 = 4/7, khái niệm rút gọn, lưu ý tối giản) → Hoạt động 1 (a: nhận ra tối giản, b: rút gọn theo mẫu), 2 (nối bông hoa với lọ hoa) → Luyện tập 1 (số ?, rút gọn 3 phân số), 2 (trắc nghiệm 48/60), 3 (rút gọn tích), 4 (bài toán chia cà rốt).
- Mục tiêu:
  1. Nêu rút gọn là tìm phân số bằng phân số đã cho nhưng tử số và mẫu số bé hơn.
  2. Rút gọn bằng cách chia cả tử số và mẫu số cho cùng một số tự nhiên lớn hơn 1.
  3. Nhận ra phân số tối giản (tử số và mẫu số không cùng chia hết cho số tự nhiên nào lớn hơn 1).
  4. Rút gọn đến phân số tối giản, biết khi nào dừng.
  5. Rút gọn phân số có tử số và mẫu số là tích bằng cách cùng bỏ thừa số giống nhau.
- Kiến thức cần có: tính chất cơ bản của phân số (Bài 55), bảng chia, dấu hiệu chia hết.
- Điểm mấu chốt: SGK chỉ nói “rút gọn đến phân số tối giản”, không dạy tìm ước chung lớn nhất; app để con chia nhiều bước. Bẫy trắc nghiệm Luyện tập 2: 24/30 và 12/15 bằng 48/60 nhưng chưa tối giản. Bài 3 SGK là rút gọn **tích**, chỉ làm với phép nhân. “Gạch số” ở phép cộng/trừ không dạy; app chỉ nêu một câu cảnh báo (vượt SGK, `sn-4`).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Dừng khi chưa tối giản | 48/60 = 24/30 (đúng 4/5) | Animation `ToiGian` bước 2-3, `thu-dung`, `sn-1`, `tn-1`, `tn-2` |
| Chia cho hai số khác nhau | (48 : 2)/(60 : 3) | KeyFact “cùng một số” từ Bài 55, các câu `mb-*` giữ nguyên số chia |
| Cho rằng tử số 1 chưa tối giản; 7/14 ra 0/2 | 1/9 tối giản; 7/14 = 1/2 | `sn-2`, `sn-3` |
| Bỏ số giống nhau ở phép cộng | (2 + 5)/(2 + 7) = 5/7 (đúng 7/9) | KeyFact mục 4, `sn-4` |
| Chọn phân số bằng nhưng chưa tối giản | chọn 24/30 | `tn-1`, `tn-2` có phương án bẫy |
| Nhầm khi bỏ thừa số trong tích | bỏ cả số không đối xứng | `ti-1`, `ti-2`, `thu-tich` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Bốn kênh | Dùng | Nói (“còn chia được không?”), viết (20/35 = (20 : 5)/(35 : 5)), nhẩm (dấu hiệu chia hết); thiếu kênh hình nên dùng sơ đồ bước chia |
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: nhân, chia cả tử mẫu (Bài 55), số chung của 15 và 25 |
| Câu tư duy | Dùng (vượt SGK) | `sn-1` đến `sn-4`: dừng chưa, tử số 1, tử số 7/14, bỏ số ở phép cộng |
| Đếm, Tách, So sánh | Không dùng | Bài không có quy luật đếm, số lớn hay quan hệ hơn/kém |

Khởi động: `kd-bai55` (dien-so, 4/6), `kd-chia` (dien-so, 3/5), `kd-chung` (trac-nghiem, 5).

## Phần Phụ huynh

Theo mẫu 6 mục. Lỗi: dừng sớm, chia hai số khác nhau, tử số 1, bỏ số ở phép cộng. Ôn: chia kẹo, “dừng đúng lúc”. Dấu hiệu: rút gọn 48/60 đến 4/5 và biết khi nào dừng. Đáp án SGK ở phụ lục, trong khối thu gọn.

## Phần Lý thuyết

1. Rút gọn (20/35): animation `RutGon` 4 bước (hiện 20/35, nhận xét chia hết cho 5, chia, kết quả 4/7). `KeyFact` rút gọn. `QuickCheck` `thu-rut-gon`.
2. Tối giản: không animation. `KeyFact` định nghĩa. `QuickCheck` `thu-toi-gian`.
3. Đến tối giản: animation `ToiGian` 4 bước (48/60 → 24/30 → 12/15 → 4/5). `KeyFact`. `QuickCheck` `thu-dung`.
4. Rút gọn tích: `KeyFact` (kèm cảnh báo phép cộng). `QuickCheck` `thu-tich`.

Hình phân số xếp chồng dùng `Ps` và `Eq` trong `components/math/phan-so-svg.tsx` (chuyển từ bài 55 lên vì dùng từ 2 bài). Viewbox 340 rộng, chữ 22, đọc được ở 390px.

## Phần Bài tập

| Nhóm | Câu | Dạng | Đáp án |
|---|---|---|---|
| Phân số tối giản (HĐ 1a) | `tg-1..6`: 3/8, 14/35, 7/19, 1/12, 12/18, 9/16 | trac-nghiem | **tối giản, chưa, tối giản, tối giản, chưa, tối giản** |
| Rút gọn theo mẫu (HĐ 1b, 2) | `mb-1..3`: 14/35, 12/18, 21/28 | dien-so | **2/5, 2/3, 3/4** |
| | `hl-1`: 6/9, 15/20, 10/25, 14/16 | noi-cap | **2/3, 3/4, 2/5, 7/8** |
| Rút gọn đến tối giản (LT 1, 2) | `so-1`: 20/30 = 10/? = ?/3 | dien-so | **15, 2** |
| | `rg-1..3`: 18/48, 60/100, 30/125 | dien-so | **3/8, 3/5, 6/25** |
| | `tn-1`: 36/60; `tn-2`: 48/72 | trac-nghiem | **3/5; 2/3** |
| Rút gọn tích (LT 3) | `ti-1`: (8 × 13 × 17)/(17 × 15 × 13); `ti-2`: (23 × 6 × 29)/(6 × 29 × 31) | dien-so | **8/15; 23/31** |
| Bài toán (LT 4) | `bt-1`: 6/9, 4/6, 3/8 | trac-nghiem | **An và Bình** |
| Suy nghĩ thêm (vượt SGK) | `sn-1..4` | trac-nghiem, dien-so | **chưa; có; 1/2; sai** |

Đáp án được test tính lại bằng gcd.

## Kỹ thuật

Đặt `available` của Bài 56 thành `true` trong `lib/lessons.ts`. Chuyển `Ps`/`Eq` lên `components/math/phan-so-svg.tsx`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: rút gọn phân số, phân số tối giản, “rút gọn đến phân số tối giản”.
- Phân số viết a/b (hiển thị dạng xếp chồng); số lớn dùng NBSP.
- Không dạy: ước chung lớn nhất, quy đồng, so sánh, cộng trừ phân số.

## Câu hỏi cần chốt

1. Có giữ `sn-4` (bỏ số ở phép cộng, vượt SGK)? Đề xuất: giữ, vì lỗi rất hay gặp.
2. Chưa có hình minh họa tối giản bằng băng ô. Đề xuất: không thêm; bài dạy thao tác chia, không cần hình.

## Phụ lục: đáp án SGK

Xem khối “Đáp án bài trong sách” trong `phu-huynh.mdx`. Đã tính lại: 1a tối giản 2/3, 5/17, 1/10; 1b 3/7, 2/3, 1/2; bài 2: 2/3, 5/6, 3/5, 1/4; LT1 9 và 2, 1/4, 4/5, 3/5; LT2 D; LT3 12/17, 31/37; LT4 thỏ xám và thỏ trắng.
