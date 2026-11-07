# Brief — Bài 20. Thực hành và trải nghiệm sử dụng một số đơn vị đo đại lượng

- SGK: Toán 4 KNTT tập một, trang 69–72, chủ đề 4 (Một số đơn vị đo đại lượng).
- Route: `/kntt-4/bai-20`
- Trạng thái: đã viết nội dung

## Đánh giá

**Vị trí.** Bài 19 (Giây, thế kỉ) đứng trước, bài 21 (Luyện tập chung) đứng sau. Bài 20 là bài trải nghiệm kiêm tổng hợp: gom lại bài 17, 18, 19 trong ba tình huống đời sống, thêm tiền Việt Nam (lớp 3, cộng trừ bài 2) và diện tích hình chữ nhật.

**Cấu trúc SGK.** Không có Khám phá/Luyện tập, chỉ có 3 "Hoạt động" (đánh số lại theo từng hoạt động):

| Hoạt động | Trang | Mục | Kiến thức |
|---|---|---|---|
| ① Chai lọc nước (triển lãm khoa học) | 69–70 | 1a đọc cân đồng hồ, 1b tổng cân nặng có đủ 1 tạ không, 2 diện tích tấm bìa vuông cạnh 3 dm, 3 so sánh thời gian lọc của 3 chai, 4 tự làm chai lọc ở nhà | bài 17, 18, 19 |
| ② Hội trại mùa Thu | 70–71 | 1a chọn số đo hợp lí cho tấm gỗ, 1b chọn hình chữ nhật có diện tích lớn nhất, 2 tổng tiền 3 bộ dây đèn rồi chọn tờ tiền vừa đủ, 3 đóng vai cửa hàng văn phòng phẩm (nhóm) | bài 18, tiền |
| ③ Đi công viên | 72 | 1 giá vé trò chơi, 2 cân nặng con vật, 3 diện tích vườn hoa hình chữ L, 4 năm thuộc thế kỉ nào | bài 17, 18, 19, tiền |

**Bài nguồn** (thay cho "mục tiêu"; "kiến thức cần có" cũng là các bài này):

1. Bài 17: đổi yến, tạ, tấn, ki-lô-gam; đọc cân.
2. Bài 18: dm², m², cm², mm²; diện tích hình vuông, hình chữ nhật; chọn đơn vị hợp lí.
3. Bài 19: giây, phút; thế kỉ và năm.
4. Bài 2 và lớp 3: cộng, trừ trong phạm vi 100 000; nhân số tròn nghìn với số có một chữ số; tờ tiền Việt Nam.

**Hoạt động cần vật thật và cách thay trong app** (theo yêu cầu: giữ chủ đề khối lượng, diện tích, thời gian, tiền; có hình minh họa):

| Mục SGK | Vì sao không làm được | Cách thay |
|---|---|---|
| ①.4 Làm chai lọc, lọc 100 ml, bấm giờ | Cần chai, cát, than, sỏi, đồng hồ | Chuyển sang `phu-huynh.mdx` (hoạt động ôn 10 phút, tùy chọn). Trong app: số liệu thời gian lọc giả lập (TG1, TG2, S2) kèm hình 3 chai |
| ②.3 Đóng vai cửa hàng bằng đồ vật và tiền thật | Cần nhóm người, đồ vật, tiền | Bảng giá vẽ SVG; câu mua 1–3 món, chọn tờ tiền, tính tiền thừa (T5–T7). Phụ huynh đóng vai người bán ở nhà |
| ③.1 và ③.2 "Em thích… nhất?" | Câu mở, đáp án tùy con | Đóng khung thành câu có đáp án: số người cố định (4 người), con vật cho sẵn |
| ①.1 Đọc cân đồng hồ | Làm được | Vẽ mặt cân SVG (`_illustrations/scale-dial.tsx`) |

**Điểm mấu chốt.**

- Đọc kim cân: mặt cân chỉ ghi nhãn 25, 50, 75, 100 kg; kim thường nằm giữa hai nhãn. Con phải đếm vạch nhỏ (mỗi vạch 5 kg, suy từ ảnh) thay vì đọc nhãn gần nhất.
- Hình chữ L (③.3): SGK không giải thích, và bài 18 chưa có dạng này (đã kiểm `bai-18/bai-tap.ts`, `ly-thuyet.mdx`). Con phải tự chia thành 2 hình chữ nhật, hoặc lấy hình chữ nhật lớn trừ phần khuyết. Cần một ví dụ ngắn.
- ②.1b: ba mảnh đất đều có chiều dài + chiều rộng bằng nhau (12 m), diện tích khác nhau; mảnh có hai cạnh gần nhau nhất lớn nhất. Con hay chọn mảnh có cạnh dài nhất.
- ①.2: đề cho cạnh bằng dm nên đáp án chỉ cần "dm²"; bẫy là chọn 9 cm² hoặc 9 m².
- ①.3 so sánh thời gian có đơn vị khác nhau: phải đổi cùng đơn vị (giây) rồi mới so.
- ②.2 tổng đúng bằng 100 000 đồng; "vừa đủ" nghĩa là tờ tiền bằng tổng, không phải tờ nào cũng được.
- ③.2: nhãn "1 tấn 3 tạ" và "1 tấn 200 kg" nhìn giống nhau nhưng đơn vị phụ khác nhau (tạ và kg).
- Số liệu kim cân và nhãn con vật đọc từ ảnh chụp, cần đối chiếu (xem "Câu hỏi cần chốt").

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Đọc nhãn gần nhất thay vì đếm vạch | Kim ở giữa 25 và 50 đọc thành 25 (đúng: 40) | KL1, KL2: gợi ý "mỗi vạch nhỏ là 5 kg, đếm từ 25" |
| Đổi tạ, yến cộng nhầm | 1 tạ 5 yến = 105 kg (đúng: 150 kg) | KL3: hint "5 yến = 50 kg", giải thích tách từng phần |
| Viết sai đơn vị diện tích | Cạnh 4 dm, diện tích 16 dm hoặc 16 cm² (đúng: 16 dm²) | DT4: giải thích "dm × dm = dm²" |
| Hình chữ L: nhân hai số lớn nhất | 12 × 10 = 120 m² (đúng: 84 m²) | DT3: hint "chia thành 2 hình chữ nhật", giải thích kèm 2 cách |
| So hình chữ nhật bằng cạnh dài nhất | Chọn 10 m × 5 m = 50 m² (đúng: 8 m × 7 m = 56 m² lớn nhất) | DT2: giải thích tính cả 3 diện tích |
| Hiểu 1 phút = 100 giây | 200 giây = 2 phút (đúng: 3 phút 20 giây) | TG2: hint "1 phút = 60 giây, lấy 60 phút trừ dần" |
| So số khác đơn vị | 170 giây so với 3 phút thành 170 > 3 | TG1: hint "đổi hết ra giây" |
| Năm → thế kỉ: lấy hai chữ số đầu | Năm 1905 là thế kỉ XIX (đúng: XX) | TG3, QuickCheck "năm 1000" |
| Quên nhân số lượng | 3 quyển vở: 50 000 − 8 000 = 42 000 (đúng: 50 000 − 24 000 = 26 000) | S3 (tìm lỗi sai) |
| Trừ có nhớ sai khi tính tiền thừa | 200 000 − 117 000 = 93 000 (đúng: 83 000) | T7: giải thích tách 117 000 = 100 000 + 17 000 |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Tách | Chính | Đổi "1 tấn 5 tạ", "3 phút 20 giây"; hình chữ L tách 2 hình chữ nhật; 117 000 = 100 000 + 17 000 |
| So sánh | Chính | 3 chai (TG1), 3 mảnh đất (DT2), 2 tấm vải (S4) |
| Kiểm tra đầu vào | Chính | 6 QuickCheck đầu mỗi điểm nhắc lại, thay Khởi động |
| Bốn kênh | Rà | Hình: cân, chai, bảng giá, hình L. Nhẩm: tiền, giây. Viết: ô điền. Nói: thiếu trong app, bù ở phần Phụ huynh (đóng vai cửa hàng) |
| Đếm | Nhẹ | Đếm vạch 5 kg để đọc cân (KL1, KL2) |
| Câu tư duy | Chính | Ước lượng (DT1, S1), tìm lỗi sai (S3). Câu "vì sao" để ở phần giải thích, không thêm câu riêng |
| Không dùng | – | "Đếm" theo quy luật bước: bài ôn, không có đơn vị mới |

**Khởi động.** Bỏ phần Khởi động (`warmUps` để trống hoặc không khai báo). Thay bằng 6 câu Nhắc lại nhanh, mỗi câu đứng cuối một điểm. Kết quả chỉ dùng tại chỗ.

**Nhắc lại nhanh (QuickCheck)**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| qc-khoi-luong | dien-so (conv) | 3 tạ = ? yến | **30** |
| qc-dien-tich | dien-so | Tấm bìa vuông cạnh 5 cm, diện tích ? cm² | **25** |
| qc-chon-don-vi | trac-nghiem | Sân trường diện tích khoảng 2 000 …: mm², cm², dm², m² | **m²** |
| qc-giay | dien-so (conv) | 2 phút 5 giây = ? giây | **125** |
| qc-the-ki | trac-nghiem | Năm 1000 thuộc thế kỉ: IX, X, XI | **X** (901–1000) |
| qc-tien | dien-so | Mua 2 cuốn vở 7 000 đồng một cuốn, đưa tờ 20 000 đồng. Tiền thừa ? đồng | **6 000** (20 000 − 14 000) |

**Suy nghĩ thêm** (vượt SGK, ghi rõ vì SGK trang này không có dạng câu tư duy; kiến thức vẫn trong bài 17–19)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| S1 | trac-nghiem | Ước lượng: một con mèo nhà nặng khoảng 4 …: kg, yến, tạ, tấn | **4 kg** |
| S2 | dien-so | Một chai lọc 500 ml hết 3 phút 40 giây. Lọc 1 lít (gấp đôi) bằng chai đó hết ? phút ? giây | **7 phút 20 giây** (220 × 2 = 440 giây). Vượt nhẹ: nhân số đo thời gian; con đổi hết ra giây rồi đổi ngược lại |
| S3 | trac-nghiem | An mua 3 vở, 8 000 đồng/vở, đưa 50 000 đồng, tính tiền thừa 50 000 − 8 000 = 42 000. An sai ở đâu? | **Chưa nhân giá 1 vở với số quyển** (đúng: 26 000) |
| S4 | trac-nghiem | Tấm vải hình chữ nhật 3 m × 2 m và tấm vải vuông cạnh 25 dm. Tấm nào lớn hơn? | **Tấm vuông** (6 m² = 600 dm² < 625 dm²) |

## Phần Phụ huynh

Chỉ ghi ý riêng bài này; khung 6 mục theo mẫu. Mục 1 đổi thành "Nên xem lại bài nào" (bài tổng hợp).

1. **Xem lại bài nào.** Sai nhóm Khối lượng → bài 17; Diện tích → bài 18; Thời gian → bài 19; Tiền → bài 2 và kiến thức lớp 3.
2. **Con cần biết trước.** Cộng, trừ có nhớ đến 200 000; nhân số tròn nghìn với số có một chữ số; diện tích hình chữ nhật.
3. **Cách giải thích.** Hình chữ L: SGK không giải thích. Dùng giấy ô li vẽ, kẻ một đường chia thành 2 hình chữ nhật rồi cộng. Tiền: dùng đúng từ "tiền thừa", "vừa đủ" như SGK.
4. **Lỗi hay gặp.** Chỉ 3 lỗi chính: đọc kim cân (đếm vạch), hình chữ L (quên phần khuyết), đổi đơn vị trước khi so sánh.
5. **Hoạt động ôn 10 phút.** (a) Chơi cửa hàng: dán giá lên 4–5 món trong nhà, phụ huynh mua, con tính tiền và trả tiền thừa. (b) Làm chai lọc nước như SGK ①.4, bấm giờ lọc 100 ml, ghi "x phút y giây" rồi đổi ra giây; người lớn đục lỗ nắp chai. (c) Cân vài món bằng cân nhà rồi đọc kim.
6. **Dấu hiệu đã nắm.** Đọc kim cân đúng khi kim giữa hai nhãn; tự chia được hình chữ L; không so số khác đơn vị khi chưa đổi; tính tiền thừa không cần gợi ý.

Mục "Đáp án bài trong sách" dùng `<Fold>` theo phụ lục.

## Phần Lý thuyết

"Nhắc lại nhanh": không dạy lại, không bắt buộc animation. Chương 4 có 5 điểm, tiền thuộc chương 1 nên tính riêng.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| 1 tấn = 10 tạ, 1 tạ = 10 yến, 1 yến = 10 kg; đọc cân | 17 | `KeyFact` (unit `ta`) + ví dụ đọc 1 mặt cân; QuickCheck `qc-khoi-luong` |
| 1 m² = 100 dm², 1 dm² = 100 cm²; hình vuông cạnh a: a × a, đơn vị thêm ² | 18 | `KeyFact` (unit `dm2`) + ví dụ hình chữ L tĩnh (2 hình chữ nhật cộng lại); QuickCheck `qc-dien-tich` |
| Chọn đơn vị theo vật quen thuộc | 17, 18 | Ví dụ ngắn dùng đúng mốc bài 18 đã dạy, không thêm mốc mới; QuickCheck `qc-chon-don-vi` |
| 1 phút = 60 giây; đổi "phút giây" ra giây | 19 | `KeyFact` (unit `second`) + ví dụ 3 phút 20 giây = 200 giây; QuickCheck `qc-giay` |
| 1 thế kỉ = 100 năm; năm tận cùng 00 thuộc thế kỉ trước | 19 | `KeyFact` (unit `century`) + ví dụ năm 1000; QuickCheck `qc-the-ki` |
| Tổng tiền, tiền thừa = tiền đưa − tiền phải trả | 2, lớp 3 | `KeyFact` không unit + ví dụ ngắn; QuickCheck `qc-tien` |

Mỗi điểm kèm một dòng liên kết về bài gốc (dùng `next/link` thường; `LessonLink` là dòng mục lục có tiến độ, không dùng ở đây). Hình bố cục 390px: ví dụ hình chữ L rộng tối đa 320, chữ ≥ 14.

## Phần Bài tập

Nhóm theo đại lượng (không theo 3 hoạt động SGK) để mỗi nhóm có một màu đơn vị; cảnh SGK (hội trại, công viên, vườn bách thú) giữ trong đề. Số liệu đã đổi, đáp án tính lại.

**Nhóm Khối lượng** (bài 17, màu `ta`)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| KL1 | trac-nghiem (cân 100 kg, kim 40 kg) | Bao gạo nặng: 4 tấn, 4 tạ, 4 yến, 2 yến | **4 yến** |
| KL2a | dien-so (3 cân: 30, 20, 45 kg) | Tổng 3 bao nặng ? kg | **95** |
| KL2b | trac-nghiem | Có đủ 1 tạ không? Đủ, thừa 5 kg / không đủ, thiếu 5 kg / không đủ, thiếu 5 yến | **Không đủ, thiếu 5 kg** |
| KL3 | noi-cap | Vườn bách thú: hà mã 1 tấn 5 tạ, sư tử 2 tạ 5 yến, gấu 1 tạ 5 yến, công 3 yến 2 kg ↔ 1 500, 250, 150, 32 kg | **1 500; 250; 150; 32** |
| KL4 | dien-so | Xe chở 1 tấn 2 tạ gạo và 8 tạ ngô, tổng ? tấn | **2** |

**Nhóm Diện tích** (bài 18, màu `m2`)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| DT1 | trac-nghiem | Tấm vải làm biển cổ động có diện tích khoảng: 2 mm², 2 cm², 2 m², 2 dm² | **2 m²** |
| DT2 | trac-nghiem + hình 3 mảnh đất | A 9 m × 6 m, B 8 m × 7 m, C 10 m × 5 m. Mảnh nào lớn nhất | **B** (54; 56; 50 m²) |
| DT3 | trac-nghiem + hình chữ L | Vườn hoa chữ L: cột cao 10 m rộng 6 m, khối dưới cao 4 m rộng thêm 6 m. Diện tích: 60, 84, 120, 36 m² | **84 m²** (6×10 + 6×4; hoặc 12×10 − 6×6) |
| DT4 | dien-so (conv ô sau) | Tấm bìa vuông cạnh 4 dm: ? dm² = ? cm² | **16; 1 600** |

**Nhóm Thời gian** (bài 19, màu `second`)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| TG1 | trac-nghiem + hình 3 chai | A 170 giây, B 2 phút 45 giây, C 3 phút. Chai nào lọc nhanh nhất | **B** (170; 165; 180 giây) |
| TG2 | dien-so | Chai D lọc hết 200 giây = ? phút ? giây (assert bằng phép chia, không dùng `conversion`) | **3; 20** |
| TG3 | trac-nghiem | Cây đa trồng năm 1905 thuộc thế kỉ: XIX, XX, XXI | **XX** |
| TG4 | dien-so (conv) | Tàu lượn chạy 1 vòng 2 phút 15 giây = ? giây | **135** |

**Nhóm Tiền** (bài 2 và lớp 3, không màu đơn vị)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| T1 | trac-nghiem (hình 3 tờ tiền) | Mua 3 bộ dây đèn 62 000, 75 000, 63 000 đồng. Tờ nào vừa đủ: 100 000, 200 000, 500 000 | **200 000** (tổng 200 000) |
| T2 | dien-so + bảng giá vé | Nhà 4 người cùng chơi Nhà gương 15 000 đồng/lượt, trả ? đồng | **60 000** |
| T3 | dien-so | Nhà 4 người, mỗi người chơi Đu quay 25 000 và Câu cá 10 000, trả ? đồng | **140 000** (4 × 35 000) |
| T5 | dien-so + bảng giá | 2 vở (8 000 đồng/quyển) và 1 bút chì (4 000 đồng): ? đồng | **20 000** |
| T6 | trac-nghiem | Vở, bút chì, thước kẻ (6 000): 18 000 đồng. Tờ ít nhất đủ trả: 10 000, 20 000, 50 000, 100 000 | **20 000** |
| T7 | dien-so | Hộp bút 32 000 và sách 85 000 đồng, đưa 200 000, tiền thừa ? | **83 000** |

(T4 bỏ: trùng T7.) Bảng giá và vé dùng chung `PriceBoard`.

**Nhóm Suy nghĩ thêm** (vượt SGK): S1–S4 ở trên, `unit` không đặt.

## Kỹ thuật

- `lib/lessons.ts`: đặt `available: true` cho bài 20.
- Không thêm token màu: nhóm Tiền không có màu đơn vị (tiền không phải đơn vị đo mới, và các hue gần `--good` 160, `--oops` 35 đã tránh). Khối lượng dùng `ta`, diện tích `m2`, thời gian `second`.
- Hình mới trong `_illustrations/` (Server Component): `scale-dial.tsx` (mặt cân, nhận số kg, vạch 5 kg, nhãn 25/50/75/100); `l-garden.tsx` (hình chữ L có nhãn cạnh); `filter-bottles.tsx` (3 chai kèm thời gian); `price-board.tsx` (bảng giá nhận danh sách món); `banknotes.tsx` (3 tờ tiền vẽ đơn giản: mệnh giá to, màu riêng, không chân dung, không phải ảnh tiền thật).
- DT2 dùng `figure` của `trac-nghiem` nếu hỗ trợ đủ 3 hình và nhãn cạnh; không được thì viết `illustration` riêng.
- `bai-tap.ts` cần `conv` cho qc-khoi-luong, qc-giay, TG4, DT4 (ô sau). Câu còn lại assert bằng phép tính. Không dùng thư viện đơn vị mới.
- Tái dùng `MassLadder`/`UnitLadder` từ bài 17, 18: không. Muốn dùng phải chuyển lên `components/` theo quy tắc chung; đề xuất để KeyFact + QuickCheck là đủ.
- Không trò chơi (`_game/`).
- `KeyFact` cho `unit` tùy chọn (nền trung tính) để dùng ở điểm Tiền. Id câu tiền trong code là `t-1` đến `t-6` (bỏ T4 và đánh số lại).
- Test: không trùng id; `conv` tính lại; kim cân KL1/KL2 trong `ScaleDial` đúng vạch; tổng tiền, tiền thừa, diện tích L, thời gian tính lại bằng phép tính.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "tiền thừa", "vừa đủ", "yến, tạ, tấn", "dm²", "thế kỉ", "phút, giây".
- Số lượng dùng NBSP tách lớp ("100 000 đồng"); năm viết liền ("1905").
- Không dạy: công thức chu vi; cách đổi đơn vị ngoài thang SGK; nhân, chia số đo thời gian ngoài S2 (đã ghi vượt SGK); đơn vị ml, lít ngoài ngữ cảnh S2.
- Không dùng ảnh SGK, ảnh tiền thật, chân dung.
- Tên đồ vật cửa hàng chỉ dùng loại có trong SGK (vở, bút chì, thước, hộp đựng bút, sách, ê ke).

## Câu hỏi cần chốt

1. **Kim cân (SGK trang 69)?** Tôi đọc từ ảnh: cát mịn 50 kg (5 yến, đáp án C), than 65 kg, sỏi 25 kg, cát hạt lớn 15 kg, tổng 105 kg, có đủ 1 tạ. Hai kim giữa vạch (than, cát hạt lớn) chưa chắc. Đề xuất: anh đối chiếu đáp án sách; app dùng số của tôi (đã đổi nên không phụ thuộc), chỉ phụ lục Phụ huynh cần đúng.
2. **Nhóm bài tập theo đại lượng hay theo 3 hoạt động SGK?** Đề xuất theo đại lượng (4 nhóm + Suy nghĩ thêm), vì AGENTS yêu cầu nhóm theo chủ đề và mỗi nhóm có màu đơn vị; cảnh SGK giữ trong đề.
3. **Hình chữ L?** SGK không dạy. Đề xuất: một ví dụ ngắn trong điểm "diện tích" của Nhắc lại nhanh (tĩnh, không animation) cộng hint/explanation của DT3, chưa thêm điểm thứ 6 cho chương.
4. **Phần "làm tại nhà" (chai lọc) và "cửa hàng nhóm"?** Đề xuất chuyển sang hoạt động ôn của phần Phụ huynh, không dựng trò chơi: tiền không phải đơn vị mới, câu gõ số là đủ, bundle nhẹ hơn.

## Phụ lục: đáp án SGK

| Trang | Mục | Đáp án |
|---|---|---|
| 69 | ①.1a | **C. 5 yến** (kim cát mịn chỉ 50 kg) |
| 69 | ①.1b | Than 65 + sỏi 25 + cát hạt lớn 15 = 105 kg ≥ 100 kg: **có đủ 1 tạ** (số kim đọc từ ảnh, cần đối chiếu) |
| 69 | ①.2 | **C. 9 dm²** (3 × 3 = 9, đơn vị dm) |
| 69 | ①.3 | A = 250 giây, B = 240 giây, C = 230 giây: **chai C** nhanh nhất |
| 70 | ①.4 | Thực hành tại nhà, không có đáp án số |
| 70 | ②.1a | **C. 40 dm²** (hợp lí nhất cho biển tên lớp; 4 m² quá lớn, 40 cm² quá nhỏ) |
| 70 | ②.1b | A 7 × 5 = 35 m², B 6 × 6 = 36 m², C 8 × 4 = 32 m²: **B** |
| 70 | ②.2 | 30 000 + 34 000 + 36 000 = 100 000 đồng: **A. tờ 100 000 đồng** |
| 71 | ②.3 | Hoạt động nhóm, không có đáp án cố định (tổng tiền, tiền thừa tùy đồ chọn) |
| 72 | ③.1 | Tùy trò chọn; ví dụ cả nhà 4 người chơi Tàu lượn: 4 × 20 000 = 80 000 đồng |
| 72 | ③.2 | Theo vị trí nhãn trong ảnh: tê giác 1 tấn 3 tạ = 1 300 kg; hổ 4 tạ = 400 kg; báo 6 yến = 60 kg; công 6 kg; hươu cao cổ 1 tấn 200 kg = 1 200 kg (ghép nhãn với con vật cần đối chiếu) |
| 72 | ③.3 | **D. 192 m²** (16 × 16 − 8 × 8 = 192, hoặc 8 × 16 + 8 × 8 = 192) |
| 72 | ③.4 | 1864 thuộc **thế kỉ XIX** (1801–1900) |
