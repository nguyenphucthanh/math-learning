# Brief — Bài 43. Nhân với số có hai chữ số

- SGK: Toán 4 KNTT tập hai, trang 20-22, chủ đề Phép nhân và phép chia.
- Route: `/kntt-4/bai-43`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu; ảnh đầu vào ghi Bài 43 trong khi yêu cầu ghi "bài 42", Bài 42 đã làm trước đó, nên làm Bài 43).

## Đánh giá

- Vị trí: sau Bài 42 (tính chất phân phối, nền cho cách tách 12 = 10 + 2), Bài 41 (nhân với 10, 100) và Bài 38 (nhân với số có một chữ số). Bài sau: Bài 44 (chia cho số có hai chữ số).
- Cấu trúc SGK: Khám phá (34 × 12, hai cách: tách và đặt tính) → Hoạt động (3 bài) → Luyện tập (4 bài, tr.21) → Luyện tập (4 bài, tr.21-22).
- Mục tiêu:
  1. Giải thích 34 × 12 = 34 × 10 + 34 × 2.
  2. Đặt tính nhân với số có hai chữ số, viết tích riêng thứ hai lùi sang trái một cột.
  3. Nhân đúng khi có nhớ ở cả hai tích riêng.
  4. Nhân với số tròn chục: 24 × 30 = (24 × 3) × 10.
  5. Dùng S = a × b và giải bài toán hai bước nhân.
- Kiến thức cần có: Bài 38, Bài 41, Bài 42.
- Điểm mấu chốt: SGK giải thích "34 chục hay 340 đơn vị" chỉ trong phần Lưu ý; app đặt nó thành một chặng riêng. Bẫy: Luyện tập 4a (tích riêng thứ hai không lùi cột).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Tích riêng thứ hai thẳng cột | 27 × 11 = 54 (297) | Animation 2: ô trống nét đứt ở cột đơn vị; `thu-lui-cot`, `lt2-4a/b/c`, `sn-2` |
| Quên số nhớ | 134 × 32 | Animation 3 (134 × 32); từng tích riêng đọc như nhân một chữ số |
| Quên chữ số 0 khi nhân tròn chục | 130 × 20 = 260 (2 600) | Chặng 4; `lt1-2b`; `sn-1` (ước lượng) |
| Nhầm đơn vị của S | 720 cm | `lt1-3a/b` có sẵn đơn vị cm², m² |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Tách | Chính | 12 = 10 + 2 (chặng 1), (24 × 3) × 10 (chặng 4) |
| Kiểm tra đầu vào | Có | 3 câu khởi động: nhân một chữ số, nhân 10, phân phối |
| Câu tư duy | Có | Ước lượng, "86 là bao nhiêu đơn vị", tận cùng |
| Bốn kênh | Đủ | nói (lời đọc theo SGK), hình (animation), nhẩm (tròn chục), viết (vở ô li) |
| Đếm, So sánh | Không dùng | Bài không có quy luật theo bước hay quan hệ hơn/kém |

**Khởi động** (không tính tiến độ): `kd-mot-chu-so` 34 × 2 = **68**; `kd-nhan-10` 34 × 10 = **340**; `kd-phan-phoi` 340 + 68 = **408**.

**Vượt SGK:** `sn-3` (chữ số tận cùng 37 × 23 là **1**); `sn-1` (ước lượng 48 × 21 gần **1 000**). Lý do: bắt lỗi quên lùi cột.

## Phần Phụ huynh

Ý riêng: lỗi thẳng cột (27 × 11 = 54); hỏi con "27 này là 27 đơn vị hay 27 chục?"; hoạt động: 12 hộp sữa 34 000 đồng, diện tích bàn học 120 × 60; dấu hiệu: tự giải thích được vì sao lùi một cột. Đáp án SGK trong `Fold`.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Tách số 12 | 34 × 12 = 34 × 10 + 34 × 2 | không (dòng chữ như SGK) | 34 × 12 = 34 × 10 + 34 × 2 | `thu-tich-rieng` 45 × 13 = 585 |
| 2. Đặt tính | hai tích riêng, lùi một cột | `NhanHaiChuSo` 34 × 12, 4 bước | 68 là tích riêng thứ nhất, 34 là thứ hai | `thu-lui-cot` |
| 3. Có nhớ | mỗi tích riêng như nhân một chữ số | `NhanHaiChuSo` 134 × 32 | 134 × 32 = 268 + 4 020 = 4 288 | |
| 4. Số tròn chục | (24 × 3) × 10 | không | 24 × 30 = (24 × 3) × 10 | `thu-tron-chuc` 1 440 |

## Phần Bài tập

Đáp án tính lại bằng phép nhân trong `bai-tap.test.ts`.

| Nhóm | Câu (dạng) | Đáp án |
|---|---|---|
| Hoạt động | hd-1a/b/c (`dien-so`) 65 × 28, 152 × 34, 3 014 × 27 | **1 820; 5 168; 81 378** |
| | hd-2 (`noi-cap`) 26 × 15, 35 × 12, 48 × 11 | **390; 420; 528** |
| | hd-3 (`loi-van`) 16 bao × 45 kg | **720 kg** |
| Luyện tập 1 | lt1-1a/b/c 360 × 15, 58 × 37, 72 × 45 | **5 400; 2 146; 3 240** |
| | lt1-2a/2b (tròn chục) | **1 400; 1 920; 4 920** / **3 000; 26 600; 120 000** |
| | lt1-3a/b S = 40 × 26 cm, 35 × 24 m | **1 040 cm²; 840 m²** |
| | lt1-4 15 kg xoài 35 000, 20 kg cam 24 000 | **525 000 + 480 000 = 1 005 000 đồng** |
| Luyện tập 2 | lt2-1a/b/c 45 × 36, 73 × 18, 506 × 27 | **1 620; 1 314; 13 662** |
| | lt2-1d 54 × 11 − 275 | **594; 319** |
| | lt2-2 chọn phép đúng | **35 × 12 = 420** |
| | lt2-3 hộp kẹo 16 × 24 và 25 × 15 | **384; 375; hơn 9** |
| | lt2-4a/b (Đ, S) lùi cột / thẳng cột | **Đúng / Sai** |
| | lt2-4c số × 12, thẳng cột ra 48 | **16** |
| Suy nghĩ thêm | sn-1, sn-2, sn-3 | **1 000; 860 đơn vị; 1** |

## Kỹ thuật

Không đổi thư viện hay kiểu. Animation riêng `_animations/nhan-hai-chu-so.tsx`, dùng `column-layout`, `columnMul`. Lời đọc đổi thứ tự thành "2 nhân 4" như SGK. `lib/lessons.ts`: `available: true` cho Bài 43.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "tích riêng thứ nhất/thứ hai", "lùi sang trái một cột", "đặt tính rồi tính", "diện tích S".
- Số tách lớp bằng NBSP. Không dạy nhân ba chữ số, chia.

## Câu hỏi cần chốt

1. **Ảnh là Bài 43 còn yêu cầu ghi 42.** Đề xuất: làm Bài 43 (Bài 42 đã commit). 
2. **Chưa có ô nhập từng chữ số cho phép nhân.** Đề xuất: giữ `dien-so` (con làm ra vở), như Bài 38.
3. **Câu `sn-3` (tận cùng) vượt SGK.** Đề xuất: giữ ở "Suy nghĩ thêm".

## Phụ lục: đáp án SGK

- Tr.20: 34 × 12 = 408.
- Tr.21 HĐ: 87 × 23 = 2 001; 134 × 32 = 4 288; 2 021 × 36 = 72 756; 24 × 16 = 384, 45 × 13 = 585, 36 × 14 = 504; 18 × 35 = 630 kg.
- Tr.21 LT1: 270 × 63 = 17 010; 49 × 25 = 1 225; 66 × 58 = 3 828; a) 720, 1 440, 4 320, 4 450; b) 2 600, 31 500, 115 000, 510 000; S = 720 cm², 450 m².
- Tr.22: 12 × 30 000 + 20 × 25 000 = 860 000 đồng; 1 598, 1 178, 14 450; 62 × 11 = 682, 682 − 253 = 429; 48 × 12 = 576, 72 × 60 = 4 320; 450 − 440 = 10 cái; 27 × 11 = 297 (Đ), 54 (S); số đó là 18.
