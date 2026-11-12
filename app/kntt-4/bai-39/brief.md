# Brief — Bài 39. Chia cho số có một chữ số

- SGK: Toán 4 KNTT, **tập hai**, trang 6-8, Chủ đề 8 "Phép nhân và phép chia".
- Route: `/kntt-4/bai-39`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, không dừng chờ duyệt)

## Đánh giá

**Vị trí bài.** Bài trước: Bài 38 (nhân với số có một chữ số). Bài sau: Bài 40 (tính chất giao hoán, kết hợp của phép nhân). Bài ôn lại nó: Bài 2 (chia trong phạm vi 100 000), Bài 25 (tổng và hiệu). Điểm mới: **số bị chia có sáu chữ số**, thương lên tới sáu chữ số, thương có chữ số 0.

**Cấu trúc SGK.** Khám phá (a: chia hết, b: có dư, cùng 125 73x : 5) → Hoạt động (3 bài) → Luyện tập (5 bài).
- Tr.6-7: Khám phá bằng bài toán kiến thợ khênh gạo. Robot đọc từng bước: "Hạ 5, được 25; 25 chia 5 được 5, viết 5".
- Tr.7: HĐ1 đặt tính 3 phép (một phép có dư). HĐ2 tìm lỗi trong hai phép chia của Nam. HĐ3 toán hai bước (trừ rồi chia).
- Tr.8: LT1 đặt tính 3 phép. LT2 tìm hai số biết tổng và hiệu. LT3 chia có dư (vỉ sữa). LT4 chọn đáp án (chia 5 phần rồi bớt một phần). LT5 chọn xe qua cầu 20 tấn.

**Mục tiêu**
1. Đặt tính và chia số có đến sáu chữ số cho số có một chữ số, hết hoặc có dư.
2. Viết 0 ở thương khi số vừa hạ xuống chưa chia được.
3. Số dư bé hơn số chia; thử lại bằng thương × số chia + số dư.
4. Tìm lỗi sai trong phép chia (thiếu chữ số 0, dừng sớm khi dư còn lớn).
5. Toán hai bước (trừ rồi chia), tổng và hiệu, bài toán dư (đóng thùng).

**Kiến thức cần có.** Bảng chia; chia trong phạm vi 100 000 (Bài 2); số sáu chữ số (Bài 10-12); tổng và hiệu (Bài 25).

**Điểm mấu chốt**
- Khám phá chỉ có một chuỗi số (125 730 / 125 734), không có chữ số 0 ở thương. Chỗ khó thật ở HĐ2: 135 612 : 6 thương 22 602 có 0, 32 024 : 7 cần chia tiếp khi dư 34.
- Cách viết SGK: dưới số bị chia chỉ viết số dư kèm chữ số vừa hạ (25, 07, 23, 30, 0), không viết tích riêng. Animation theo đúng kiểu này.
- Lời đọc SGK: "Hạ 7; 7 chia 5" khi số dư trước bằng 0; "Hạ 5, được 25" khi dư khác 0.
- LT5: đơn vị phép tính là ki-lô-gam, giới hạn là tấn. Đáp án SGK: xe C (19 650 kg < 20 000 kg).

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Thiếu 0 ở thương | 135 612 : 6 = 2 262 (đúng 22 602) | Animation mục 4 (36 054 : 6), câu `sn-1`, `hd-2b` |
| Dừng khi dư còn lớn | 32 024 : 7 = 457 (dư 34) (đúng 4 574 dư 6) | `KeyFact` "số dư bé hơn số chia", `hd-2a`, `sn-3` |
| Dư lớn hơn hoặc bằng số chia | chia cho 8 dư 8 | `sn-3` |
| Sai khi thử lại | quên cộng số dư | `KeyFact` thử lại, lời giải `explainColumnDiv` |
| Trừ rồi chia nhầm thứ tự | HĐ3: 255 000 : 3 trước khi trừ | `hd-3` chia hai dòng: trừ trước, chia sau |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng (3 câu) | Bảng chia, chia có dư, 0 ở thương |
| Tách | Không dùng | Chia theo cột là cách chính của SGK |
| So sánh | Dùng nhẹ | Số dư so với số chia (`sn-3`) |
| Bốn kênh | Dùng | Nói (lời đọc SGK), hình (`ChiaDatTinh`), nhẩm (ước lượng `sn-2`, thử lại), viết (đặt tính ra vở) |
| Câu tư duy | Dùng | Tìm lỗi (`sn-1`), ước lượng (`sn-2`), "vì sao" (`sn-3`) |
| Đếm | Không dùng | Không có quy luật theo bước |

**Khởi động:** `kd-bang-chia` (56 : 7 = 8; 42 : 6 = 7), `kd-chia-du` (38 : 5 = 7 dư 3), `kd-chia-0` (7 280 : 8 = 910).
**Câu thử:** `thu-chia-deu` (84 000 : 3 = 28 000), `thu-du` (94 817 : 4 = 23 704 dư 1), `thu-chu-so-khong` (48 072 : 8 = 6 009).
**Vượt SGK:** `sn-2` (ước lượng thương), để bắt thương thiếu chữ số.

## Phần Phụ huynh

Ý riêng: lỗi (thiếu 0, dừng sớm, dư ≥ số chia); ôn 10 phút (chia 360 000 đồng cho 6 tuần, đố số dư chia cho 7); dấu hiệu (tự thử lại bằng phép nhân). Đáp án tr.6-8 trong `Fold`.

## Phần Lý thuyết

| Chặng | Một ý | Animation | `KeyFact` | `QuickCheck` |
|---|---|---|---|---|
| 1. Vì sao chia? | Chia đều thành nhóm bằng nhau | không | 125 730 : 5 | `thu-chia-deu` |
| 2. Hạ từng chữ số | Chia từ hàng cao nhất | `ChiaDatTinh` 125 730 : 5 (6 bước) | = 25 146; thử bằng nhân | |
| 3. Có dư | Dư bé hơn số chia | `ChiaDatTinh` 125 734 : 5 | = 25 146 (dư 4) | `thu-du` |
| 4. Viết 0 | Chưa chia được thì viết 0 | `ChiaDatTinh` 36 054 : 6 | viết 0 ở thương | `thu-chu-so-khong` |

Bố cục 390px: viewBox 360, ô chữ số 30, ô thương 24; vừa số sáu chữ số.

## Phần Bài tập

Số liệu đổi so với SGK. Đáp án tính lại bằng phép chia trong `bai-tap.test.ts`.

| Nhóm | Câu |
|---|---|
| Hoạt động (tr.7) | `hd-1a/b/c`: 47 235 : 3 = **15 745**; 538 412 : 4 = **134 603**; 693 508 : 7 = **99 072 (dư 4)**. `hd-2a/b/c` Đ/S: 28 035 : 6 = 467 (dư 33) **Sai** (4 672 dư 3); 124 806 : 6 = 2 134 **Sai** (20 801); 90 546 : 9 = 10 060 (dư 6) **Đúng**. `hd-3`: 300 000 − 45 000 = 255 000; 255 000 : 3 = **85 000** |
| Luyện tập (tr.8) | `lt-1a/b/c`: 586 240 : 8 = **73 280**; 761 904 : 6 = **126 984**; 412 905 : 6 = **68 817 (dư 3)**. `lt-2`: tổng 52 600, hiệu 6 800 → **29 700 và 22 900**. `lt-3`: 513 428 : 6 = **85 571 thùng, dư 2**. `lt-4`: 360 000 − 60 000 = **300 000 đồng**. `lt-5`: cầu 15 tấn, xe C (14 070 kg) |
| Suy nghĩ thêm | `sn-1` (thiếu 0, 6 009), `sn-2` (68 000, vượt SGK), `sn-3` (dư không thể là 8) |

## Kỹ thuật

- Component mới `ChiaDatTinh` trong `bai-39/_animations/`, dùng `columnDiv` có sẵn trong `lib/column-div.ts`. Chuyển lên `components/math/` khi bài khác dùng.
- Không thêm dạng bài tập mới. Đặt `available: true` cho Bài 39 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "chia cho số có một chữ số", "hạ", "viết 0", "dư". Chưa dùng "số bị chia", "thương" ngoài mức cần gọi tên kết quả.
- Số tách lớp bằng NBSP: 125 730.
- Không dạy: chia cho số có hai chữ số, chia nhẩm cho 10, 100.

## Câu hỏi cần chốt

1. **`ChiaDatTinh` đặt trong bài hay `components/`?** Đề xuất: trong bài, chuyển khi Bài sau cần.
2. **Đặt tính chia có ô nhập từng chữ số không?** Đề xuất: chưa, con làm ra vở và điền kết quả như Bài 38.

## Phụ lục: đáp án SGK

Đã tính lại bằng phép chia (xem `phu-huynh.mdx`, mục "Đáp án bài trong sách").

- Khám phá: 125 730 : 5 = 25 146; 125 734 : 5 = 25 146 (dư 4).
- HĐ1: 12 765; 182 329; 145 484 (dư 1). HĐ2: Nam sai cả hai: 4 574 (dư 6); 22 602. HĐ3: 45 000 đồng.
- LT1: 97 865; 90 471 (dư 1); 118 055 (dư 6). LT2: 19 500 và 15 000. LT3: 204 908 vỉ, thừa 3 hộp. LT4: B. LT5: C.
