# Brief — Bài 18. Đề-xi-mét vuông, mét vuông, mi-li-mét vuông

- SGK Toán 4 KNTT, tập một, trang 60-65. Chủ đề 4: Một số đơn vị đo đại lượng.
- Route: `/kntt-4/bai-18`
- Trạng thái: **đã duyệt** cả nội dung gốc và mục "Tư duy"; đã viết nội dung

## Đánh giá

**Vị trí:** đứng sau Bài 17 (Yến, tạ, tấn), trước Bài 19 (Giây, thế kỉ) và Bài 20 (Thực hành, trải nghiệm đơn vị đo). Được ôn lại ở Bài 36 (Ôn tập đo lường).

**Mục tiêu.** Sau bài, con:

1. Biết dm², m², mm² là diện tích của hình vuông có cạnh 1 dm, 1 m, 1 mm.
2. Đọc và viết đúng số đo diện tích.
3. Đổi được: 1 dm² = 100 cm², 1 m² = 100 dm², 1 cm² = 100 mm², cả hai chiều và số đo ghép (như 3 m² 9 dm²).
4. Ước lượng được đơn vị phù hợp với đồ vật thật.
5. Giải được bài toán có lời văn cần đổi đơn vị diện tích.

**Kiến thức cần có:** cm² và diện tích hình vuông, hình chữ nhật (lớp 3); đổi đơn vị độ dài; nhân, chia với 100; đọc số có chữ "linh" và "không trăm".

**Điểm mấu chốt:** SGK nêu các đẳng thức nhưng không giải thích *vì sao là 100*. Đây là chỗ animation có giá trị nhất: cạnh gấp 10 lần thì cần 10 hàng, mỗi hàng 10 ô, thành 100 ô.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai | Cách xử lý |
|---|---|---|
| Lẫn với đổi độ dài (gấp 10) | 1 m² = 10 dm² | Animation lưới 10 × 10 |
| Ghép số khi đổi số đo ghép | 3 m² 9 dm² = 39 dm² (đúng: 309) | Animation tách hai phần rồi cộng |
| Lẫn cạnh và diện tích | Hình vuông cạnh 2 dm có diện tích 2 dm² (đúng: 4 dm²) | Câu so sánh diện tích có hình |
| Tính diện tích khi chưa cùng đơn vị | So sánh 4 dm² với 400 cm² mà không đổi | Giải thích bước đổi trong đáp án |
| Thiếu cảm nhận độ lớn | Nhãn vở 15 m² | Đồ vật mốc, thực hành với đồ thật |
| Đọc sai số có số 0 | 1 005: "một nghìn linh năm" | Câu đọc-viết với số có 0 |

## Tư duy

Thêm vào bài đã có, không đổi nội dung cũ.

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Thêm | Kiến thức cần có |
| Đếm | Thêm | Lỗi 39 thay vì 309; nhân, chia với 100 |
| Tách | Mở rộng | Mục tiêu 3: đổi số đo ghép |
| So sánh | Thêm | Lỗi 1 m² = 10 dm²; lỗi lẫn cạnh và diện tích |
| Bốn kênh | Bù kênh nói và nhẩm | Dấu hiệu "giải thích được", không chỉ đọc thuộc |
| Câu tư duy | Thêm | Lỗi ghép số; lỗi chưa cùng đơn vị |

**Không dùng:**

- Lộ trình cá nhân đầy đủ: app không có backend, và đã có phụ huynh theo sát.
- Đếm ngoài mục tiêu: chỉ đếm theo trăm vì bài này cần.
- Bài luyện tốc độ riêng: trò chơi Đường đua đã đủ luyện nhẩm.

**Khởi động** (đầu `ly-thuyet.mdx`, không tính tiến độ). Mỗi câu có gợi ý nhắc lại kiến thức cũ, chưa có bài trước để liên kết tới. Không hỏi về đơn vị diện tích ở đây, vì con chưa vào phần lý thuyết đo diện tích.

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-nhan` | `dien-so` | 7 × 100 | 700 |
| `kd-chia` | `dien-so` | 600 : 100 | 6 |
| `kd-do-dai` | `dien-so` | 1 m = ? dm | 10 |
| `kd-doc` | `trac-nghiem` | 306 đọc là | Ba trăm linh sáu |
| `kd-dem` | `dien-so` | 200, 300, ?, 500 | 400 |

**Trong Lý thuyết** (sau `MixedSplit`, trước câu thử số đo ghép):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `dem-309` | `dien-so` | 3 m² 9 dm²: đếm 100, 200, 300 rồi đếm tiếp 9 dm²: 301, 302, …, ? | 309 |

**Nhóm bài tập mới "Suy nghĩ thêm"** (sau nhóm Luyện tập, trước trò chơi):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `td-tach-nguoc` | `dien-so` | 306 dm² = ? m² ? dm² | 3; 6 |
| `td-gap` | `dien-so` | 1 m² gấp 1 dm² bao nhiêu lần | 100 |
| `td-hon` | `dien-so` | 1 000 cm² hơn 900 cm² bao nhiêu xăng-ti-mét vuông | 100 |
| `td-canh` | `dien-so` | Hình vuông cạnh 2 dm xếp được bao nhiêu ô 1 dm² | 4 |
| `td-loi-an` | `trac-nghiem` | Bạn An viết 3 m² 9 dm² = 39 dm². An sai ở đâu? | An ghép hai số, chưa đổi 3 m² thành 300 dm² |
| `td-loi-minh` | `trac-nghiem` | Sàn rộng 4 m², tấm gỗ rộng 4 dm². Bạn Minh tính 4 : 4 = 1 tấm. Vì sao không hợp lý? | Một tấm nhỏ không lát kín được sàn; phải đổi 4 m² = 400 dm² rồi mới chia |

**Có thể vượt SGK:** `td-tach-nguoc` và `td-gap`. Người dùng đã duyệt giữ; chưa đối chiếu với trang 60-65.

**Phụ huynh** (thêm vào mẫu có sẵn):

- Mục "Cách giải thích": hỏi "Nói cho bố mẹ nghe: vì sao 1 m² = 100 dm²?", không chấm điểm.
- Mục "Lỗi con hay gặp": với lỗi 39, đếm 100, 200, 300, rồi 301 đến 309.

**Kỹ thuật:**

- Không thêm dạng bài. `QuickCheck` cần thêm prop `title` tùy chọn, mặc định vẫn là "Thử nhanh", để khối đầu bài ghi "Khởi động".
- Test tính lại đáp án: `td-tach-nguoc` có hai ô trống nên `conversion` không diễn đạt được, cần assert riêng. Các câu không đổi đơn vị cũng assert riêng.
- Nhóm mới làm tăng tổng số câu của bài, cần kiểm tra lại điểm và tiến độ đã lưu.

## Phần Phụ huynh

Theo mẫu trong `AGENTS.md`. Các ý riêng của bài:

- **Giải thích:** "Mét vuông không phải là mét. Nó là một ô vuông." Đổi độ dài gấp 10, còn đổi diện tích kề nhau gấp 100.
- **Mốc độ lớn để so sánh (ước chừng):** 1 mm² cỡ một đầu bút chì nhọn, 1 cm² cỡ móng tay út của con, 1 dm² cỡ lòng bàn tay người lớn, 1 m² phải tự dán băng dính trên sàn mới thấy.
- **Hoạt động 10 phút:** cắt hình vuông giấy 1 dm², dán băng dính thành 1 m² trên sàn, rồi hỏi con cần bao nhiêu tờ giấy để phủ kín, và đoán đồ vật trong nhà rộng khoảng bao nhiêu.
- **Đáp án SGK:** toàn bộ đáp án trang 60-65, để trong khối thu gọn (xem cuối file).

## Phần Lý thuyết

Bốn chặng, mỗi chặng kết thúc bằng một câu thử nhanh:

| Chặng | Nội dung | Animation (mức 2: GSAP + SVG, bấm từng bước) |
|---|---|---|
| 1. dm² | Mở đầu bằng lát nền nhà đồ chơi, như SGK | **Lát ô:** 1 ô 1 cm² → 1 hàng 10 ô → 10 hàng → thu lại thành 1 dm² |
| 2. m² | Khi nền nhà quá rộng để đo bằng dm² | **Lát ô** dùng lại, cấp m²/dm². Thêm "cạnh 1 m, ô cạnh 1 dm" |
| 3. mm² | Cánh cửa tí hon, vật rất nhỏ | **Kính lúp:** phóng to 1 cm² thành lưới 100 mm² |
| 4. Tổng hợp | Thang đơn vị và số đo ghép | **Thang đơn vị:** m² → dm² → cm² → mm², mỗi bậc ×100. **Tách số đo ghép:** 3 m² 9 dm² = 300 dm² + 9 dm² = 309 dm² |

Tổng cộng 3 component: lưới lát ô (dùng cho chặng 1, 2, 3 và có thể tái sử dụng), thang đơn vị, tách số đo ghép. Không cần Manim.

## Phần Bài tập

Giữ nguyên dạng và độ khó của SGK, đổi số liệu để con không làm lại y hệt bài ở lớp (xem câu hỏi 1). Hình vẽ tự làm bằng SVG.

**Nhóm 1 — dm²**
- `dien-so`: đọc-viết: "Bốn trăm hai mươi đề-xi-mét vuông" → 420 dm²; 2 008 dm² → "Hai nghìn không trăm linh tám đề-xi-mét vuông" (dạng chọn cách đọc).
- `dien-so`: 4 dm² = 400 cm²; 700 cm² = 7 dm²; 5 dm² 30 cm² = 530 cm²; 3 dm² 6 cm² = 306 cm².
- `trac-nghiem` có hình: hình vuông cạnh 3 dm (900 cm²) và hình chữ nhật 100 cm × 10 cm (1 000 cm²) → diện tích hình vuông bé hơn.

**Nhóm 2 — m²**
- `noi-cap`: nối cách đọc với 52 m², 52 dm², 52 cm², 520 m².
- `noi-cap`: nối đồ vật với số đo: cửa ra vào 2 m², màn hình điện thoại 1 dm², cục tẩy 6 cm².
- `dien-so`: 2 m² = 200 dm²; 800 dm² = 8 m²; 2 m² 40 dm² = 240 dm²; 6 m² 7 dm² = 607 dm².

**Nhóm 3 — mm²**
- `dien-so`: đọc-viết: "Ba trăm linh sáu mi-li-mét vuông" → 306 mm².
- `dien-so`: 3 cm² = 300 mm²; 400 mm² = 4 cm²; 2 cm² 60 mm² = 260 mm²; 9 cm² 3 mm² = 903 mm².
- `trac-nghiem`: "Diện tích một con tem thư khoảng": 6 mm², **6 cm²**, 6 dm², 6 m².

**Nhóm 4 — Luyện tập**
- `trac-nghiem`: ghép 3 tấm pin mặt trời hình vuông cạnh 1 m thành hình chữ nhật dài 3 m → diện tích **300 dm²** (lựa chọn: 300 m², 300 dm², 300 cm², 300 mm²).
- `trac-nghiem` có hình: 3 phòng có kích thước 4 m × 10 m (40 m²), 5 m × 8 m (40 m²), 6 m × 7 m (42 m²); hai phòng có diện tích bằng nhau, tìm phòng còn lại → phòng 6 m × 7 m.
- `loi-van`: sàn hình vuông cạnh 2 m, lát tấm gỗ 4 dm × 1 dm → 2 m × 2 m = 4 m² = 400 dm²; 4 × 1 = 4 dm²; 400 : 4 = **100 tấm**.

**Nhóm 5 — Trò chơi `custom`: Đường đua số đo**

Giữ 22 ô và thứ tự đường đi của SGK, tự vẽ bàn cờ mới. Xúc xắc ảo, 1-2 người chơi chung một máy, nhập đáp án bằng bàn phím số.

| Ô | Nội dung | Đáp án | | Ô | Nội dung | Đáp án |
|---|---|---|---|---|---|---|
| 1 | 1 m² = ? dm² | 100 | | 12 | Tiến 2 ô | → ô 14 |
| 2 | 2 dm² = ? cm² | 200 | | 13 | 4 m² = ? dm² | 400 |
| 3 | 5 cm² = ? mm² | 500 | | 14 | 100 cm² = ? dm² | 1 |
| 4 | Tiến 1 ô | → ô 5 | | 15 | Tiến 1 ô | → ô 16 |
| 5 | 1 m² 3 dm² = ? dm² | 103 | | 16 | 8 m² = ? dm² | 800 |
| 6 | Lùi 3 ô | → ô 3 | | 17 | Tiến 3 ô | → ô 20 |
| 7 | 4 dm² = ? cm² | 400 | | 18 | Lùi 2 ô | → ô 16 |
| 8 | 6 cm² = ? mm² | 600 | | 19 | 100 mm² = ? cm² | 1 |
| 9 | 7 m² = ? cm² | 70 000 | | 20 | 3 dm² = ? cm² | 300 |
| 10 | 1 dm² = ? cm² | 100 | | 21 | 1 m² 15 dm² = ? dm² | 115 |
| 11 | Lùi 2 ô | → ô 9 | | 22 | 4 cm² = ? mm² | 400 |

## Tiêu chí duyệt nội dung

- Thuật ngữ khớp SGK: đề-xi-mét vuông, mét vuông, mi-li-mét vuông, xăng-ti-mét vuông; dùng "bé hơn" thay "nhỏ hơn" trong so sánh.
- Viết số có khoảng trắng phân lớp như SGK: 1 005, 70 000.
- Dùng ký tự mũ thật (dm²), hiển thị rõ ở 390px.

## Câu hỏi cần chốt

1. **Bài tập dùng số mới hay số y hệt SGK?** Đề xuất: số mới cho nhóm 1-4 để con luyện thật, đáp án SGK để riêng cho phụ huynh, trò chơi giữ nguyên.
2. **Luật khi trả lời sai trong trò chơi?** SGK: quay về ô xuất phát. Đề xuất: xem giải thích rồi về ô đứng trước lượt đó, vì về hẳn đầu dễ làm con nản.
3. **Ô 9 (7 m² = ? cm²)?** Phải đổi hai bậc, trong khi bài chỉ dạy các bậc kề nhau. Đề xuất: giữ nguyên, thêm gợi ý "đổi qua dm² trước: 7 m² = 700 dm²".

## Phụ lục: đáp án SGK (cho khối Phụ huynh)

**Trang 60-61 (dm²)**
- HĐ1: 340 dm²; Một nghìn không trăm linh năm đề-xi-mét vuông; 5 000 dm².
- HĐ2: a) 300; 3. b) 600; 6; 650.
- HĐ3: **B**. Hình vuông: 2 dm × 2 dm = 4 dm² = 400 cm². Hình chữ nhật: 80 cm × 5 cm = 400 cm².

**Trang 62 (m²)**
- HĐ1: Bốn mươi ba mét vuông – 43 m²; Hai trăm sáu mươi mét vuông – 260 m²; Bốn mươi ba đề-xi-mét vuông – 43 dm²; Bốn mươi ba xăng-ti-mét vuông – 43 cm².
- HĐ2: Mặt bàn 1 m²; Cục tẩy 6 cm²; Bìa sách 3 dm².
- HĐ3: a) 100; 500; 5. b) 150; 420; 309.

**Trang 63 (mm²)**
- HĐ1: 204 mm²; Hai nghìn không trăm bốn mươi mi-li-mét vuông; 10 000 mm².
- HĐ2: a) 100; 200; 2. b) 130; 805; 714.
- HĐ3: **B** (15 cm²).

**Trang 64 (Luyện tập)**
- Bài 1: **B**. 2 tấm × 1 m² = 2 m² = 200 dm².
- Bài 2: **A**. A: 5 × 7 = 35 m²; B: 6 × 6 = 36 m²; C: 4 × 9 = 36 m². B và C bằng nhau nên là nhà Mai và Việt; phòng nhà Nam là A.
- Bài 3: **180 tấm**. Sàn: 3 × 3 = 9 m² = 900 dm². Tấm gỗ: 5 × 1 = 5 dm². 900 : 5 = 180.
