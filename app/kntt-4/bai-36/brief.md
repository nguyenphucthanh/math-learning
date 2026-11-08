# Brief — Bài 36. Ôn tập đo lường

- SGK: Toán 4 KNTT tập một, trang 125–126, chủ đề 7 (Ôn tập học kì 1)
- Route: `/kntt-4/bai-36`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và code cùng lúc, nên các câu ở "Câu hỏi cần chốt" dùng đề xuất mặc định)

## Đánh giá

**Vị trí.** Bài ôn tập, thứ tư trong chủ đề Ôn tập học kì 1. Bài trước là Bài 35 (ôn hình học); bài sau là Bài 37 (ôn tập chung).

**Bài nguồn (thay cho "mục tiêu của bài").**
- Chủ đề 4: Bài 17 (yến, tạ, tấn), Bài 18 (dm², m², mm²), Bài 19 (giây, thế kỉ), Bài 20 và 21 (thực hành, luyện tập chung).
- Chủ đề 2 và 6: góc nhọn, góc tù, góc bẹt (Bài 7, 8; chưa có trong app, nên chỉ ghi số bài); Bài 35 (ôn hình học).
- Diện tích hình chữ nhật (lớp 3, dùng lại ở Bài 18, 20).

**Cấu trúc SGK.** Hai trang, chỉ có phần Luyện tập (4 bài ở tr. 125, 5 bài ở tr. 126).

| Trang | Bài | Dạng | Cách làm trong app |
|---|---|---|---|
| 125 | 1 | Đổi khối lượng (a: đẳng thức nền; b: số đo ghép) | 6 câu `conv`, đổi số liệu |
| 125 | 2 | Cộng, trừ, nhân, chia số đo | 4 câu `calc` |
| 125 | 3 | So sánh số đo ghép (có g) | 3 câu `trac-nghiem` |
| 125 | 4 | Con bê, bò, voi: tổng, gấp đôi, đổi ra tấn | `loi-van` 5 dòng (`kl-bt`) |
| 126 | 1 | Đổi diện tích, thời gian | 8 câu diện tích, 4 câu thời gian |
| 126 | 2 | Cộng, trừ, nhân, chia diện tích | 4 câu `calc` |
| 126 | 3 | So sánh diện tích ghép | 3 câu `trac-nghiem` |
| 126 | 4 | Đo góc và cạnh trên hình tam giác ABC có M | Không có thước đo trong app; thay bằng 3 câu phân loại góc và 1 câu tính BC, có hình (`gc-b`, `gc-amb`, `gc-amc`, `gc-bc`). Đo thật xếp vào hoạt động ôn của Phụ huynh |
| 126 | 5 | Diện tích mảnh đất khi biết chiều dài và phần hơn | `loi-van` 2 dòng (`bt-manh-dat`) |

**Điểm mấu chốt.**
- Chỗ SGK không giải thích: bài 1b tr. 126 chuyển 5 m² thẳng sang cm² (50 000), nhảy hai bậc mà không nhắc con đi qua dm². Câu `dt-6` (4 m² = 40 000 cm²) ép con nhớ 1 m² = 10 000 cm².
- Dễ lẫn với bài vừa học: khối lượng nhảy 10, diện tích nhảy 100.
- Bẫy trong bài SGK: bài 3 tr. 125 có phép so sánh đầu bài là dấu `=` (3 kg 250 g = 3 250 g), con hay đoán `>` vì "3 kg 250 g" trông có nhiều chữ số hơn. Bài 5 tr. 126 cho "chiều dài hơn chiều rộng 6 m", con hay nhân thẳng 15 × 6. Bài 4 tr. 125: kết quả 1 000 kg phải đổi ra tấn.
- Dữ kiện chưa đối chiếu: đáp án bài 4 tr. 126 (số đo góc, số đo cạnh) cần thước thật; trong app chỉ dựng lại hình cùng loại góc.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhầm bước nhảy | 3 m² = 30 dm² (đúng 300 dm²) | Câu `sn-1`, KeyFact "mỗi bậc gấp 100" |
| Viết dính số đo ghép | 1 tấn 7 tạ = 17 tạ là đúng, nhưng 2 phút 20 giây = 220 giây sai (đúng 140) | Câu `kl-5`, `kl-6`, `dt-7`, `tg-1`: đổi từng phần rồi cộng |
| So theo chữ số đầu | 3 tấn 4 tạ < 3 350 kg (đúng `>`: 3 400 > 3 350) | KeyFact "đổi về cùng đơn vị rồi mới so", câu `kl-11` đến `dt-15` |
| Quên đổi đơn vị cuối bài | Con voi 1 000 kg, đề hỏi mấy tấn | Dòng cuối `kl-bt` buộc điền số tấn |
| Nhân sai cạnh chữ nhật | 18 × 7 thay vì 18 × 11 | Dòng 1 `bt-manh-dat` buộc tìm chiều rộng trước |
| Nhầm góc tù với góc nhọn | Góc AMC gọi là nhọn | `gc-amc` gợi ý hai góc ghép thành góc bẹt |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Sáu câu thử ở "Nhắc lại nhanh" thay Khởi động; kết quả không lưu |
| Tách | Dùng nhẹ | Số đo ghép: đổi từng phần rồi cộng (`kl-5`, `dt-7`, `tg-1`) |
| So sánh | Dùng | Nhóm câu `>`, `<`, `=` ở cả hai trang |
| Bốn kênh | Rà | Nói và viết đã có; hình có ở `gc-*` và KeyFact; nhẩm có ở `kl-7` đến `dt-12`. Không thêm kênh |
| Câu tư duy | Dùng | Nhóm "Suy nghĩ thêm": tìm lỗi sai (`sn-1`), nhiều bước có đổi đơn vị (`sn-2`), hình vuông cạnh 10 cm (`sn-3`) |
| Đếm | Không dùng | Bài ôn, không có quy luật theo bước mới |

**Suy nghĩ thêm.**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-1` | `trac-nghiem` | Lan viết 3 m² = 30 dm², sửa thế nào | **1 m² = 100 dm², nên 3 m² = 300 dm²** |
| `sn-2` | `dien-so` | Xe chở 4 tạ mỗi chuyến, 5 chuyến | **20** tạ, **2** tấn |
| `sn-3` | `dien-so` | Tấm bìa vuông cạnh 10 cm | **100** cm², **1** dm² |

**Vượt SGK:** `sn-3` (liên hệ hình vuông cạnh 1 dm với 100 cm²) và gợi ý "AMB và AMC ghép thành góc bẹt" ở `gc-amc`. SGK Bài 8 chỉ nói góc bẹt; giữ vì giúp con kiểm tra lại loại góc, không đưa vào Lý thuyết.

## Phần Phụ huynh

1. Con học gì: ôn khối lượng, diện tích, thời gian, góc, diện tích chữ nhật; bảng "sai nhóm nào xem lại bài nào" (Bài 17–21, 35).
2. Con cần biết gì trước: Bài 17–21 và Bài 35; nhân chia nhẩm với 10, 100.
3. Cách giải thích: khối lượng nhảy 10, diện tích nhảy 100 (hình lưới 10 × 10); đổi từng phần của số đo ghép; so sánh sau khi đổi cùng đơn vị.
4. Lỗi hay gặp: sáu gạch đầu dòng như bảng trên.
5. Hoạt động ôn: cân đồ trong nhà, đo mặt bàn ra cm² rồi dm², đo góc và cạnh thật của hình tam giác ở tr. 126, con kể lại "vì sao 1 m² không bằng 10 dm²".
6. Dấu hiệu nắm bài: đổi không nhìn bảng, tự giải thích bước nhảy 10 và 100, làm được bài chữ nhật hai bước có đổi đơn vị.

Đáp án SGK nằm trong khối thu gọn riêng (xem Phụ lục).

## Phần Lý thuyết

"Nhắc lại nhanh". Không có animation vì SGK chỉ yêu cầu luyện tập; dùng KeyFact và câu thử, mỗi điểm có `ReviewLink` về bài gốc.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Khối lượng mỗi bậc gấp 10 | Bài 17 | `KeyFact unit="ta"` + `qc-khoi-luong` |
| Diện tích mỗi bậc gấp 100 | Bài 18 | `KeyFact unit="m2"` + `qc-dien-tich` |
| So sánh số đo ghép: đổi về cùng đơn vị | Bài 20, 21 | `KeyFact` + `qc-so-sanh` |
| Thời gian: phút, giây, thế kỉ | Bài 19 | `KeyFact unit="second"` + `qc-thoi-gian` |
| Các loại góc | Bài 7, 8 (chưa có trong app) | Một đoạn văn + `qc-goc`, không có liên kết |
| Diện tích chữ nhật, tìm chiều rộng từ phần hơn | Lớp 3, Bài 20 | `KeyFact` + `qc-chu-nhat` |

**Bố cục 390px:** không có hình rộng; hình tam giác ở bài tập có `viewBox` 300 × 164, chữ từ 14 trở lên.

## Phần Bài tập

Nhóm theo nội dung, giữ dạng và độ khó SGK, đổi số liệu. 41 câu, sáu nhóm.

**Khối lượng (tr. 125).**
- `kl-1` đến `kl-6` (`dien-so`, đổi đơn vị): 3 yến = **30** kg; 700 kg = **7** tạ; 5 tấn = **50** tạ; 8 tấn = **8 000** kg; 6 tạ 40 kg = **640** kg; 2 tấn 5 tạ = **25** tạ
- `kl-7` đến `kl-10` (`dien-so`): 6 + 9 = **15** yến; 52 − 38 = **14** tấn; 4 × 6 = **24** tạ; 28 : 4 = **7** tạ
- `kl-11` đến `kl-13` (`trac-nghiem`): 7 tạ 3 yến (730 kg) so 735 kg: **<**; 3 tấn 4 tạ (3 400 kg) so 3 350 kg: **>**; 4 kg 300 g so 4 300 g: **=**
- `kl-bt` (`loi-van`): bê 1 tạ 30 kg = **130** kg; bò 130 + 240 = **370** kg; cả hai **500** kg; voi **1 000** kg = **1** tấn

**Diện tích (tr. 126).**
- `dt-1` đến `dt-8`: 7 cm² = **700** mm²; 900 mm² = **9** cm²; 3 dm² = **300** cm²; 600 cm² = **6** dm²; 9 m² = **900** dm²; 4 m² = **40 000** cm²; 2 dm² 8 cm² = **208** cm²; 3 m² 7 dm² = **307** dm²
- `dt-9` đến `dt-12`: 40 + 25 = **65** mm²; 82 − 49 = **33** cm²; 7 × 5 = **35** m²; 48 : 6 = **8** dm²
- `dt-13` đến `dt-15`: 3 cm² 20 mm² (320 mm²) so 320 mm²: **=**; 5 dm² 20 cm² (520 cm²) so 6 dm² (600 cm²): **<**; 7 dm² 5 cm² (705 cm²) so 700 cm²: **>**

**Thời gian.** `tg-1` 2 phút 20 giây = **140** giây; `tg-2` 180 giây = **3** phút; `tg-3` 5 thế kỉ = **500** năm; `tg-4` 300 năm = **3** thế kỉ

**Góc và cạnh (tr. 126 bài 4).** Hình `TamGiacABM`: `gc-b` góc đỉnh B **nhọn** (≈ 60°); `gc-amb` **nhọn** (≈ 74°); `gc-amc` **tù** (≈ 106°); `gc-bc` BM = 3 cm, MC = 5 cm nên BC = **8** cm

**Giải toán (tr. 126 bài 5).** `bt-manh-dat`: chiều dài 18 m, hơn chiều rộng 7 m: rộng **11** m; diện tích **198** m²

**Suy nghĩ thêm:** `sn-1`, `sn-2`, `sn-3` (bảng ở mục Tư duy).

## Kỹ thuật

- Không thêm thư viện, dạng bài hay màu mới. Dùng `lib/mass-units.ts`, `lib/area-units.ts`, `lib/time-units.ts`, `lib/hinh.ts` (`angleAt`, `angleKind`, `lengthOf`).
- Helper `calc` (cộng, trừ, nhân, chia số đo) và `cmp` (so sánh số đo, trả về dấu từ hai số đã đổi) viết trong `bai-tap.ts`; test tính lại bằng thư viện đơn vị, không so với số gõ tay.
- Hình `TamGiacABM` trong `_illustrations/tam-giac.tsx` (Server Component); toạ độ trong `hinh-hoc.ts` để test tính lại loại góc và độ dài (1 cm = 30 px).
- Đặt `available: true` cho Bài 36 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "yến, tạ, tấn", "đề-xi-mét vuông", "mét vuông", "mi-li-mét vuông", "thế kỉ", "góc nhọn", "góc tù", "góc bẹt". Số lượng tách lớp bằng khoảng trắng không ngắt (NBSP) như 40 000.
- Không dạy: đơn vị gam ngoài câu so sánh `kl-13`, ki-lô-mét vuông, tính chu vi.
- Câu `kl-13` dùng gam vì SGK bài 3 tr. 125 có 3 kg 250 g so với 3 250 g; app chưa có thư viện gam nên số liệu được đổi tay trong câu, test vẫn tính lại.

## Câu hỏi cần chốt

1. **Bài 4 tr. 126 (đo góc, đo cạnh bằng thước).** Đề xuất: đổi thành câu phân loại góc và tính BC có hình, phần đo thật đưa vào hoạt động ôn của Phụ huynh. Lý do: app không có thước đo, và thêm dạng bài mới chỉ khi có bài cần.
2. **Câu so sánh có đơn vị gam.** Đề xuất: giữ một câu (`kl-13`) cho khớp SGK, không viết thư viện gam. Lý do: chỉ một câu dùng, thư viện mới chưa đáng.
3. **Khởi động.** Đề xuất: bỏ Khởi động, dùng sáu câu "Nhắc lại nhanh" làm kiểm tra đầu vào (đúng quy tắc bài ôn tập).
4. **Đáp án bài 4 tr. 126.** Đề xuất: ghi "đối chiếu số đo với sách" trong khối đáp án; chỉ ghi loại góc đọc từ hình. Lý do: không đo được từ PDF.

## Phụ lục: đáp án SGK

Tính lại từ đề; riêng bài 4 tr. 126 đọc loại góc từ hình sách, **chưa đối chiếu sách giáo viên**.

**Trang 125**
- Bài 1: a) 1 yến = **10** kg; 1 tạ = **10** yến = **100** kg; 1 tấn = **10** tạ = **1 000** kg; 10 kg = **1** yến; 100 kg = **1** tạ; 1 000 kg = **1** tấn. b) 2 tạ = **200** kg; 4 tấn = **40** tạ = **4 000** kg; 3 tạ 60 kg = **360** kg; 1 tấn 7 tạ = **17** tạ.
- Bài 2: 5 + 7 = **12** yến; 43 − 25 = **18** tấn; 3 × 5 = **15** tạ; 15 : 3 = **5** tạ; 15 : 5 = **3** tạ.
- Bài 3: **=** (3 250 g); **>** (540 kg so với 538 kg); **<** (2 200 kg so với 2 220 kg).
- Bài 4: bê 1 tạ 40 kg = 140 kg; bò 140 + 220 = 360 kg; cả hai **500** kg; voi 500 × 2 = 1 000 kg = **1 tấn**.

**Trang 126**
- Bài 1: a) 1 cm² = **100** mm²; 1 dm² = **100** cm²; 1 m² = **100** dm²; 100 mm² = **1** cm²; 100 cm² = **1** dm²; 1 m² = **10 000** cm². b) 2 cm² = **200** mm²; 4 dm² = **400** cm²; 3 m² = **300** dm² = **30 000** cm²; 5 m² = **50 000** cm²; 1 dm² 6 cm² = **106** cm²; 1 m² 5 dm² = **105** dm². c) 1 phút = **60** giây; 1 phút 30 giây = **90** giây; 1 thế kỉ = **100** năm; 100 năm = **1** thế kỉ.
- Bài 2: 20 + 30 = **50** mm²; 36 − 17 = **19** cm²; 6 × 4 = **24** m²; 30 : 5 = **6** dm².
- Bài 3: 2 cm² 50 mm² = 250 mm²: **=**; 3 dm² 90 cm² = 390 cm² < 400 cm²: **<**; 2 m² 5 dm² = 205 dm² < 250 dm²: **<**.
- Bài 4: góc đỉnh B và góc đỉnh M (AMB) là góc nhọn; góc AMC là góc tù. Số đo cụ thể (và độ dài BA, BM, MA, MC) đo trực tiếp trên hình sách, chưa đối chiếu.
- Bài 5: rộng 15 − 6 = 9 m; diện tích 15 × 9 = **135** m².
