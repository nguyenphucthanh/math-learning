# Brief — Bài 37. Ôn tập chung

- SGK: Toán 4 KNTT, tập một, tr. 127–130, chủ đề 7 "Ôn tập học kì 1".
- Route: `/kntt-4/bai-37`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, không dừng chờ duyệt)

## Đánh giá

**Vị trí.** Bài cuối của học kì 1, sau Bài 33 (số đến lớp triệu), 34 (cộng, trừ), 35 (hình học), 36 (đo lường). Bài này gom các ý còn lại của cả kì.

**Cấu trúc SGK.** Chỉ có phần Luyện tập, 2 trang bài tập liền nhau: tr. 127–128 (5 bài + 2 bài), tr. 129–130 (2 bài + 3 bài kèm bảng thống kê, băng giấy, hình lưới).

**Bài nguồn (thay cho mục tiêu):** Bài 11, 12 (hàng, lớp, đọc số), 14 (so sánh), 17, 18, 20 (khối lượng, diện tích), 22, 23, 34 (cộng, trừ), 25 (tổng và hiệu), 3 (số chẵn, lẻ), 27, 29, 31, 35 (vuông góc, song song, hình thoi, hình bình hành), cùng nhân, chia số có nhiều chữ số với số có một chữ số, biểu thức, chu vi hình chữ nhật (ôn từ lớp 3).

**Điểm mấu chốt.**
- Nhân, chia chưa có dạng đặt tính theo cột trong app: câu đặt tính nhân/chia dùng `dien-so`, con đặt tính trên giấy rồi điền kết quả. Cộng, trừ dùng `dat-tinh` có sẵn.
- Bảng thống kê tr. 129 có ô trống nghĩa là 0 (tổng cột khớp khi cộng: 65, 62, 56). Đã đối chiếu.
- Hình tr. 130 đọc trên lưới 20×8: các điểm nằm đúng giao điểm lưới (xem `_illustrations/hinh-hoc.ts`). Băng giấy tr. 129 có 3 ô "?" ở băng bên phải (999, 1000, ?, ?, ?), tổng 6 ô, nên đáp án B (2 số chẵn: 14 và 1 002). Hai phần này đọc từ hình, người dùng nên đối chiếu lại.
- Bài 2 tr. 128: hình dạng ba hình khác nhau chỉ để đánh lạc hướng; chỉ cần đổi số đo.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Quên chữ số 0 khi đọc số | 3 040 502 đọc "ba triệu bốn trăm nghìn…" (ba triệu không trăm bốn mươi nghìn…) | `sn-3`, bảng hàng và lớp ở `sl-viet-*` |
| Nhầm giá trị với chữ số | giá trị chữ số 8 trong 12 805 là 8 (800) | `sl-gia-tri`, `sl-hang-*` |
| Trừ có chữ số 0 ở giữa | 6 004 − 2 587 sai ở hàng chục, trăm | `qc-cat-tru`, `pt-3`, `pt-4` kèm giải thích theo cột |
| Biểu thức làm từ trái sang phải | 35 000 + 8 025 × 4 = 172 100 (67 100) | `sn-1` tìm lỗi sai, `pt-bt-2` |
| Nhầm bước nhảy đơn vị | 1 m² = 10 dm² (100 dm²) | KeyFact "mỗi bậc gấp 10 / 100", `dl-1`, `dl-3` |
| So sánh số đo chưa đổi cùng đơn vị | 4 tấn 500 kg > 9 000 kg vì 4 < 9 | `dl-3` … `dl-6`, hint đổi cùng đơn vị |
| Bài tổng hiệu quên trừ hiệu | số bé = 840 : 2 | `bt-cay`, `bt-muoi` có dòng (tổng − hiệu) : 2 |
| Quên trừ cửa khi tính hàng rào | hàng rào = chu vi | `bt-vuon` |
| Hình thoi chỉ nhìn "nghiêng" | KEHI là hình thoi | `hh-3`: so KE = 7 ô với EH = 5 ô |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Chính | Phần "Nhắc lại nhanh": mỗi điểm một câu `QuickCheck`, sai thì có `ReviewLink` về bài gốc |
| Bốn kênh (nói, hình, nhẩm, viết) | Vừa | Hình: bảng hàng và lớp, băng giấy, lưới ô vuông. Viết: đặt tính. Nhẩm: `qc-bieu-thuc`, ước lượng `sn-2`. Nói: phụ huynh hỏi "vì sao" |
| Câu tư duy | Nhẹ | Tìm lỗi sai `sn-1`, đọc sai `sn-3`, ước lượng `sn-2` |
| Tách | Nhẹ | Số đo ghép ở `dl-*` |
| Không dùng: Đếm, So sánh ("hơn/kém", "gấp") | — | Bài ôn không dạy quy luật mới; "hơn" đã nằm sẵn trong bài toán tổng hiệu |

**Câu tư duy (nhóm "Suy nghĩ thêm")**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-1` | trac-nghiem | Tìm lỗi: 35 000 + 8 025 × 4 = 43 025 × 4 | Phải nhân trước rồi cộng |
| `sn-2` | trac-nghiem | Ước lượng 48 960 + 31 080 | 80 000 |
| `sn-3` | trac-nghiem | Nam đọc sai 3 040 502 | ba triệu không trăm bốn mươi nghìn năm trăm linh hai |

Vượt SGK: `sn-2` (ước lượng bằng làm tròn đến hàng nghìn). Làm tròn đã học ở Bài 13 nhưng SGK không gọi là ước lượng. Ghi rõ để người dùng quyết định giữ hay bỏ.

## Phần Phụ huynh

6 mục theo mẫu bài ôn: mục 1 liệt kê bài nên xem lại theo từng nhóm sai; lỗi hay gặp ở bảng trên; hoạt động ôn: đọc số quanh nhà, cân và đo, vẽ hình thoi trên giấy ô li, con kể lại; đáp án sách tr. 127–130 trong `Fold`.

## Phần Lý thuyết

"Nhắc lại nhanh", không animation. 7 điểm.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Hàng, lớp, đọc số (kể cả chữ số 0) | 11, 12 | `KeyFact` + 2 `QuickCheck` |
| So sánh số | 14 | `KeyFact` + `QuickCheck` |
| Cộng, trừ có nhớ | 22, 23 | `KeyFact` + `QuickCheck` đặt tính (có chữ số 0) |
| Thứ tự phép tính | lớp 3 | `KeyFact` + `QuickCheck` |
| Đổi khối lượng, diện tích, số đo ghép | 17, 18, 20 | 2 `KeyFact` + 2 `QuickCheck` |
| Hình thoi, hình bình hành, vuông góc | 27, 29, 31 | `KeyFact` + `QuickCheck` |
| Tổng và hiệu, chu vi hình chữ nhật | 25 | `KeyFact` + 2 `QuickCheck` |

## Phần Bài tập

Nhóm theo chủ đề, giữ dạng và độ khó SGK, đổi số liệu. Đáp án đều tính lại trong `bai-tap.test.ts`.

| Nhóm | Câu | Dạng | Đáp án |
|---|---|---|---|
| Số đến lớp triệu (tr. 127) | `sl-viet-1..3` viết số từ bảng hàng | `dien-so` | **4 352 781**, **2 090 506**, **183 047** |
| | `sl-doc-1..2` đọc số | `trac-nghiem` | đọc từng lớp (`lib/doc-so.ts`) |
| | `sl-hang-1..3` chữ số 7 ở hàng, lớp nào | `trac-nghiem` | hàng nghìn; hàng triệu; hàng trăm |
| | `sl-gia-tri` giá trị chữ số 8 trong 5 số | `loi-van` | **800; 80 000; 8 000; 8 000 000; 80** |
| | `sl-xep-1..2` sắp xếp | `dien-so` | **3 417 < 3 741 < 4 173 < 4 371**; **31 205 > 30 512 > 13 250 > 9 999** |
| Cộng, trừ, nhân, chia (tr. 127, 128, 130) | `pt-1..4` | `dat-tinh` | **8 533; 91 110; 4 655; 24 476** |
| | `pt-5..8` | `dien-so` | **93 735; 28 328; 7 383; 1 532** |
| | `pt-bt-1..2` biểu thức | `dien-so` | **216 057; 67 100** |
| Đo lường (tr. 128, 130) | `dl-1` diện tích lớn nhất | `trac-nghiem` | A (1 000 900 mm²) |
| | `dl-2` ô tô chở nhẹ nhất | `trac-nghiem` | C (2 790 kg) |
| | `dl-3..6` so sánh | `trac-nghiem` | **>; <; =; <** |
| Số chẵn, số lẻ (tr. 129) | `sc-1` đếm số chẵn ở ô "?" | `trac-nghiem` | **3 số chẵn** |
| | `sc-2` điền ba số | `dien-so` | **799, 800, 801** |
| Bảng thống kê (tr. 129) | `tk-1` tổng mỗi loại | `dien-so` | **47, 48, 43** |
| | `tk-2` môn nhiều HCV nhất | `trac-nghiem` | **Bơi** |
| | `tk-3` tổng huy chương Điền kinh | `dien-so` | **46** |
| Hình học (tr. 130) | `hh-1..4` Đúng/Sai | `trac-nghiem` | **Đúng, Đúng, Sai, Sai** |
| | `hh-5` đoạn vuông góc với LI | `trac-nghiem` | **LD** |
| | `hh-6` đếm đoạn vuông góc với LI | `dien-so` | **3** (LD, KE, IH) |
| Giải toán (tr. 127–130) | `bt-vuon` chu vi trừ cửa | `loi-van` | **90; 240; 235 m** |
| | `bt-lop` chia đều | `loi-van` | **30; 12; 18** |
| | `bt-muoi` tổng hiệu có đổi tấn | `loi-van` | **60; 27; 33 tạ** |
| | `bt-cay` tổng hiệu | `loi-van` | **390; 450** |
| Suy nghĩ thêm | `sn-1..3` | `trac-nghiem` | xem mục Tư duy |

## Kỹ thuật

- `lib/doc-so.ts` (+ test): đọc số tự nhiên theo SGK, dùng để test đáp án các câu đọc số.
- `BangHangLop` chuyển từ `bai-33/_illustrations/` lên `components/math/bang-hang-lop.tsx` vì Bài 37 dùng lại.
- Hình riêng của bài: `_illustrations/hinh-thoi.tsx` (lưới ô vuông), `bang-giay.tsx`, `bang-thong-ke.tsx`; toạ độ và số liệu nằm ở `hinh-hoc.ts`, `thong-ke.ts` để test tính lại.
- Không thêm dạng bài tập mới. Không cần màu đơn vị mới.
- `lib/lessons.ts`: đặt `available: true` cho Bài 37.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "lớp nghìn", "lớp triệu", "hình thoi", "hình bình hành", "vuông góc", "song song", "yến, tạ, tấn".
- Số có hơn 4 chữ số viết có khoảng cách lớp (NBSP); năm không dùng trong bài này.
- Cách đọc: "tư", "mốt", "lăm", "linh", "không trăm" theo SGK.
- Không dạy: đặt tính nhân, chia theo cột trong app (chỉ ghi kết quả); không dạy cách khác với SGK.

## Câu hỏi cần chốt

1. **Đáp án các câu đọc từ hình (băng giấy, lưới ô vuông)** — đề xuất: đã dùng đáp án B (2 số chẵn) và các câu Đúng/Sai (Đ, Đ, S, Đ); người dùng đối chiếu hình sách. Lý do: PDF chỉ là ảnh.
2. **Nhân, chia dùng `dien-so`** — đề xuất giữ vậy. Lý do: dạng đặt tính nhân, chia chưa có; thêm dạng mới chỉ khi có bài cần.
3. **Giữ `sn-2` (ước lượng)** — đề xuất giữ, nhẹ và hữu ích để tự kiểm tra kết quả.

## Phụ lục: đáp án SGK

Xem `phu-huynh.mdx`, mục "Đáp án bài trong sách". Đáp án đã tính lại:

- Tr. 127: 1 621 494; 2 760 053; 381 005. Chữ số 7: hàng đơn vị lớp đơn vị; hàng chục nghìn lớp nghìn; hàng trăm lớp đơn vị; hàng triệu lớp triệu. Giá trị chữ số 6: 600; 60 000; 60; 6 000 000; 6 000. Sắp xếp: 5 216; 5 612; 6 251; 6 521 và 21 025; 20 152; 12 509; 9 999. 6 593; 88 132; 4 826; 27 487. Hàng rào 266 m.
- Tr. 128: 92 608; 18 213; 4 837; 1 302. Hình B; ô tô B.
- Tr. 129: 12 học sinh; HCV, HCB, HCĐ: 65, 62, 56, môn Bơi nhiều HCV nhất; xe 23 tạ và 27 tạ; đáp án B.
- Tr. 130: >; =; >; =. 326 065; 80 090. Đ, Đ, S, Đ; vuông góc với LI: LD, KE, IH. 360 cây chuối, 400 cây ổi.
