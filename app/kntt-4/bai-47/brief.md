# Brief — Bài 47. Bài toán liên quan đến rút về đơn vị

- SGK: Toán 4 KNTT tập hai, trang 31-32, chủ đề Phép nhân và phép chia.
- Route: `/kntt-4/bai-47`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 44 (chia cho số có hai chữ số) và Bài 46; nền là bảng nhân, bảng chia và chia đều. Bài sau: Bài 48.
- Cấu trúc SGK: Khám phá a (36 bánh / 6 hộp, chia rồi nhân) → Hoạt động 1-3 (tr.31) → Khám phá b (18 l / 6 can, chia rồi chia) → Hoạt động 1-2 → Luyện tập 1-2 (tr.32).
- Mục tiêu:
  1. Nêu bước 1: tìm giá trị một đơn vị bằng phép chia.
  2. Dạng 1: tìm tổng của nhiều đơn vị bằng phép nhân.
  3. Dạng 2: tìm số đơn vị bằng phép chia.
  4. Trình bày Tóm tắt, Bài giải, Đáp số; ghi đơn vị đúng ở từng phép tính.
  5. Dùng chu vi: tìm độ dài một que, nhân với số que.
- Kiến thức cần có: chia đều, bảng nhân chia, chu vi.
- Điểm mấu chốt: SGK không nói vì sao bước hai khác nhau; app thêm chặng 3 "nhân hay chia".
- **Chưa kiểm chứng ngoài ảnh:** số que Luyện tập 2 đếm từ ảnh: hình tam giác 3 que, hình chữ nhật 6 que (trên 2, dưới 2, hai bên mỗi bên 1), hình thang 7 que (trên 2, dưới 3, hai bên mỗi bên 1). Đề nghị ban đầu ghi hình thang 6 que, ảnh cho thấy 7; cần người dùng đối chiếu sách.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Chia thẳng | 12 : 6 = 2 can (4 can) | `sn-3`; animation dạng 2 cho thấy 3 l mỗi can |
| Bỏ bước một đơn vị | 36 × 4 (24) | Hai animation đều dừng ở "1 hộp / 1 can" |
| Nhầm phép bước hai | 6 : 4 thay vì 6 × 4 | Chặng 3, `thu-chon-phep`, `lt-3` |
| Sai đơn vị trung gian | 3 can thay vì 3 l | Ô lời văn ghi sẵn đơn vị |
| Đếm sai số que | hình thang 6 que | `lt-2` nêu số que trong đề |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| So sánh | Chính | 4 hộp < 6 hộp nên bánh ít hơn 36 (`sn-1`, `sn-2`) |
| Câu tư duy | Có | ước lượng và tìm lỗi sai (`sn-3`) |
| Kiểm tra đầu vào | Có | 3 câu chia, nhân |
| Bốn kênh | Đủ | nói (câu giải), hình (hộp và can), nhẩm, viết (Tóm tắt/Bài giải) |
| Đếm, Tách | Không dùng | Bài không có quy luật theo bước hay số lớn |

**Khởi động:** `kd-chia` 42 : 6 = **7**; `kd-nhan` 7 × 4 = **28**; `kd-chia-2` 24 : 3 = **8**.

**Vượt SGK:** chặng 3 (nhân hay chia) và nhóm Suy nghĩ thêm, vì lỗi nhầm bước hai là lỗi chính.

## Phần Phụ huynh

Ý riêng: bước 1 luôn là tìm một đơn vị; hỏi "6 là số gì?"; ôn bằng giá trứng, chia kẹo; đáp án SGK trong `Fold`.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Chia rồi nhân | 36 : 6 = 6; 6 × 4 = 24 | `RutVeNhan`, 3 bước (6 hộp, 1 hộp, 4 hộp) | chia tìm một hộp, nhân | `thu-dang-1` 7, 21 |
| 2. Chia rồi chia | 18 : 6 = 3; 12 : 3 = 4 | `RutVeChia`, 3 bước | chia, chia | `thu-dang-2` 6, 3 |
| 3. Nhân hay chia | hỏi tổng thì nhân, hỏi số đơn vị thì chia | không | (văn bản) | `thu-chon-phep` |

## Phần Bài tập

Đáp án tính lại bằng phép tính trong `bai-tap.test.ts`; số khác SGK.

| Nhóm | Câu (dạng) | Đáp án |
|---|---|---|
| Hoạt động | `hd-1` (loi-van) 24 kg/8 túi, 3 túi | 3, **9** |
| | `hd-2` 72 quả/6 khay, 4 khay | 12, **48** |
| | `hd-3` (dien-so) muối 3 kg 12 000 đồng | 4 000; **20 000** |
| | `hd-4` 4 thước 32 000, có 24 000 | 8 000; **3** |
| | `hd-5` 30 hộp/6 vỉ, 20 hộp | 5; **4** |
| Luyện tập | `lt-1` 8 kg giấy/2 cây, 20 kg | 4; **5** |
| | `lt-2` hình vuông chu vi 40 cm | 10; 30, 60, 70 cm (theo số que đếm) |
| | `lt-3` (trac-nghiem) bước hai | **15 : 3** |
| Suy nghĩ thêm | `sn-1`, `sn-2`, `sn-3` (trac-nghiem) | ít hơn 48; ít hơn 6 can; Sai |

## Tiêu chí duyệt nội dung

Thuật ngữ SGK: "rút về đơn vị", Tóm tắt, Bài giải, Đáp số. Số có nghìn tách NBSP. Không dạy tỉ lệ thuận hay sơ đồ đoạn thẳng.

## Câu hỏi cần chốt

1. Số que hình thang: 7 (đếm theo ảnh) hay 6 như đề ban đầu? Đề xuất 7, theo ảnh.
2. Giữ chặng 3 "nhân hay chia" (vượt SGK)? Đề xuất giữ vì là lỗi chính.
3. Bài tập dùng số khác SGK, đáp án SGK chỉ ở phần Phụ huynh? Đề xuất giữ như Bài 43.

## Phụ lục: đáp án SGK

Xem `phu-huynh.mdx`: tr.31: 24 bánh; 6 kg; 40 quả; muối 5 500 và 22 000 đồng. Tr.32: 4 can; 3 chiếc; 4 vỉ; 4 cây; chu vi 45, 90, 105 cm (mỗi que 15 cm).
