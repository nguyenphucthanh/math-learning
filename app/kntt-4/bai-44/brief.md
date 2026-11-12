# Brief — Bài 44. Chia cho số có hai chữ số

- SGK: Toán 4 KNTT tập hai, trang 23-26, chủ đề Phép nhân và phép chia.
- Route: `/kntt-4/bai-44`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không dừng chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 43 (nhân với số có hai chữ số, dùng để thử thương) và Bài 39 (chia cho số có một chữ số, nền của cách chia theo cột). Bài sau: Bài 45 (ước lượng trong tính toán).
- Cấu trúc SGK: Khám phá (216 : 12; 218 : 18 dư) → Hoạt động (3 bài: đặt tính, chia nhẩm bỏ cùng chữ số 0, bài toán 384 : 24) → Luyện tập (tr.25: đặt tính theo mẫu, có thương chứa 0; tr.26: so sánh biểu thức, sân bóng) → Luyện tập (4 bài).
- Mục tiêu:
  1. Đặt tính chia cho số có hai chữ số, đọc theo "chia, nhân, trừ, hạ".
  2. Ước lượng thương bằng cách làm tròn số chia, và chỉnh khi thương quá lớn hoặc quá bé.
  3. Chia có dư, số dư bé hơn số chia.
  4. Chia khi thương có chữ số 0.
  5. Chia nhẩm khi cùng có chữ số 0 ở cuối: 450 : 90, 45 000 : 900.
  6. Giải bài toán có lời văn dùng phép chia (diện tích, số hàng, số xe).
- Kiến thức cần có: Bài 39, Bài 43.
- Điểm mấu chốt: SGK không dạy ước lượng thương trong bài này; app đặt nó thành một chặng riêng vì đây là chỗ khó nhất (Bài 45 mới nói thêm về ước lượng). Bẫy của SGK: Luyện tập 1b thương có chữ số 0, SGK viết "Hạ 9; 9 chia 12 được 0" (không "được"-"hạ" hai chữ số).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Đoán thương quá lớn | 96 : 12 thử 9 → 108 > 96 (đúng 8) | Chặng 2, `UocLuongThuong` 96 : 12; `thu-uoc-luong`, `sn-2` |
| Đoán thương quá bé, số dư ≥ số chia | 218 : 18 = 11 dư 20 (đúng 12 dư 2) | `UocLuongThuong` 38 : 18; `sn-3`; KeyFact "số dư < số chia" |
| Quên viết 0 ở thương | 4 896 : 12 = 48 (đúng 408) | Chặng 4, `ChiaHaiChuSo` 4 896 : 12; `thu-thuong-0`, `sn-4` |
| Bỏ số 0 chỉ ở một số | 4 500 : 90 = 450 : 90 (đúng 450 : 9) | Chặng 5, `BoChuSo0`; `sn-5` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Có | 3 câu khởi động: chia một chữ số, nhân hai chữ số, số dư |
| Câu tư duy | Chính | Ước lượng, thử thương, tìm lỗi sai (`sn-1` đến `sn-5`) |
| Bốn kênh | Đủ | nói (lời đọc theo SGK), hình (animation), nhẩm (bỏ chữ số 0), viết (vở ô li) |
| Tách | Có | Chia nhẩm 45 000 : 900 = 450 : 9 |
| Đếm, So sánh | Không dùng | Bài không có quy luật theo bước hay quan hệ hơn/kém |

**Khởi động** (không tính tiến độ): `kd-chia-mot` 864 : 4 = **216**; `kd-nhan-hai` 6 × 18 = **108**; `kd-so-du` số dư có thể là **3**.

**Vượt SGK:** chặng 2 (ước lượng bằng làm tròn số chia) và `sn-1` đến `sn-3`. Lý do: bắt lỗi thương quá lớn hoặc quá bé, lỗi hay gặp nhất.

## Phần Phụ huynh

Ý riêng: lỗi thương quá lớn, quá bé (số dư ≥ số chia), quên 0 ở thương, xoá 0 một số; hoạt động: chia kẹo 250 : 12, xếp ghế 360 : 15, đố nhẩm 480 : 60; dấu hiệu: tự ước lượng rồi thử. Đáp án SGK trong `Fold`.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Chia, nhân, trừ, hạ | 216 : 12 = 18 | `ChiaHaiChuSo` 216 : 12, 3 bước | bốn việc mỗi bước | |
| 2. Ước lượng thương | làm tròn số chia, thử, chỉnh | `UocLuongThuong` 96 : 12 (quá lớn) và 38 : 18 (quá bé) | số dư < số chia | `thu-uoc-luong` |
| 3. Phép chia có dư | 218 : 18 = 12 (dư 2) | `ChiaHaiChuSo` 218 : 18 | số dư < số chia | `thu-du` |
| 4. Thương có chữ số 0 | viết 0 khi chưa chia được | `ChiaHaiChuSo` 4 896 : 12 | 4 896 : 12 = 408 | `thu-thuong-0` |
| 5. Chia nhẩm | cùng xoá chữ số 0 ở cả hai số | `BoChuSo0` 450 : 90; 45 000 : 900 | 45 000 : 900 = 450 : 9 | `thu-nham` |

## Phần Bài tập

Đáp án tính lại bằng phép chia trong `bai-tap.test.ts`.

| Nhóm | Câu (dạng) | Đáp án |
|---|---|---|
| Hoạt động | hd-1a/b/c/d (`dien-so`) 336 : 14, 340 : 14, 1 628 : 37, 1 631 : 42 | **24; 24 dư 4; 44; 38 dư 35** |
| | hd-2a/b (`dien-so`) chia nhẩm | **8; 7; 9** / **40; 274; 14** |
| | hd-3 (`loi-van`) 432 ghế, 18 ghế mỗi dãy | **24 dãy** |
| Luyện tập 1 | lt1-1a đến f (`dien-so`) 3 354 : 43, 3 375 : 45, 31 680 : 44, 6 036 : 12, 2 530 : 23, 4 140 : 23 | **78; 75; 720; 503; 110; 180** |
| | lt1-2a/b so sánh biểu thức | **6, 6, 6** / **120, 120, 120** |
| | lt1-3 (`loi-van`) sân bóng 5 040 m², rộng 56 m | **dài 90 m; chu vi 292 m** |
| Luyện tập | lt-1a/b/c bảng thừa số | **2 520; 39; 100** |
| | lt-2a/b bảng số bị chia, số dư | **79 dư 31; 46 dư 54** |
| | lt-3 (`trac-nghiem`) 24 hàng × 15 người, xếp 20 người/hàng | **18 hàng** |
| | lt-4 (`loi-van`) 2 000 nan hoa, 32 nan mỗi bánh | **64 nan/xe; 31 xe, thừa 16** |
| Suy nghĩ thêm | sn-1 đến sn-5 | **60; 6; 12 (dư 2); 503; Sai** |

## Kỹ thuật

`lib/column-div.ts`: bỏ giới hạn số chia một chữ số (thuật toán vốn đã tổng quát). Ba animation riêng trong `_animations/`. `lib/lessons.ts`: `available: true` cho Bài 44.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "số bị chia", "số chia", "thương", "số dư", "chia, nhân, trừ, hạ", "đặt tính rồi tính".
- Số tách lớp bằng NBSP. Không dạy chia cho số ba chữ số.

## Câu hỏi cần chốt

1. **Chặng ước lượng thương vượt SGK.** Đề xuất: giữ, vì con rất hay đoán sai thương.
2. **Chưa có ô nhập từng bước chia.** Đề xuất: giữ `dien-so` (con làm ra vở), như Bài 39.
3. **Bảng ở Luyện tập tr.26 viết thành câu `dien-so` riêng, không dùng bảng.** Đề xuất: giữ, tránh dạng mới.

## Phụ lục: đáp án SGK

- Tr.23-24: 216 : 12 = 18; 218 : 18 = 12 (dư 2).
- Tr.24 HĐ1: 322 : 14 = 23; 325 : 14 = 23 (dư 3); 1 554 : 37 = 42; 1 557 : 42 = 37 (dư 3).
- Tr.24-25 HĐ2: 5; 8; 4; 50; 209; 12. HĐ3: 384 : 24 = 16 dãy.
- Tr.25 LT1: 37; 35; 760; 408; 107; 105.
- Tr.26: a) 6, 6, 6; b) 96, 96, 96; chiều dài 105 m, chu vi 346 m; bảng 1: 3 870 : 86 = 45 (tích), 126 × 18 = 2 268, 1 998 : 37 = 54, 7 000 : 56 = 125; bảng 2: 2 920 : 62 = 47 (dư 6); 28 × 15 = 420, 420 : 20 = 21 hàng (C); 36 × 2 = 72, 2 115 : 72 = 29 (dư 27).
