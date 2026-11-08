# Brief — Bài 29. Hai đường thẳng song song

- SGK: Toán 4 KNTT, tập một, trang 98-100, Chủ đề 6 "Đường thẳng vuông góc. Đường thẳng song song".
- Route: `/kntt-4/bai-29`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn; chờ người dùng xem lại trên trình duyệt)

## Đánh giá

**Vị trí bài.** Bài khái niệm thứ hai của Chủ đề 6. Bài trước là Bài 28 (thực hành vẽ vuông góc, dùng ê ke). Bài sau là Bài 30 (thực hành vẽ hai đường thẳng song song) rồi Bài 31 (hình bình hành, hình thoi, dùng cặp cạnh song song). Bài 27 (vuông góc) là bài dễ lẫn nhất với bài này.

**Cấu trúc SGK.** Khám phá (tr. 98) → Hoạt động (tr. 99, 3 bài) → Luyện tập (tr. 99-100, 5 bài):

- Khám phá: tranh đường tàu; kéo dài hai cạnh AB và DC của hình chữ nhật ABCD được hai đường thẳng song song; hai đường thẳng song song không bao giờ cắt nhau.
- Hoạt động: 1 nêu các cặp cạnh song song của hình chữ nhật ABCD và hình vuông MNPQ; 2 cạnh MN song song với những cạnh nào (ba hình chữ nhật ghép); 3 tìm hai đường song song trong tranh.
- Luyện tập: 1 tìm hình ảnh quanh em (đề mở); 2 Đ/S ba câu trên hình lưới ô vuông; 3 chữ xếp bằng que tính, chữ nào vừa song song vừa vuông góc; 4 bản đồ khu phố, nhà Mai ở đường song song với đường nhà Rô-bốt; 5 sáu hình, hình nào có cặp cạnh song song, hình nào có cặp cạnh vuông góc.

**Mục tiêu**

1. Nhận ra hai đường thẳng song song khi kéo dài hai cạnh đối diện của hình chữ nhật.
2. Nói đúng: hai đường thẳng song song không bao giờ cắt nhau.
3. Chỉ ra các cặp cạnh song song trong hình chữ nhật, hình vuông (kể cả khi hình nghiêng) và trong hình ghép từ các hình chữ nhật.
4. Phân biệt cặp cạnh song song với cặp cạnh vuông góc trong cùng một hình.
5. Biết hai đoạn thẳng không chạm nhau chưa chắc song song: phải xét hai đường thẳng.

**Kiến thức cần có.** Hình chữ nhật (cạnh đối bằng nhau, bốn góc vuông); đường thẳng kéo dài mãi; hai đường thẳng vuông góc (Bài 27).

**Điểm mấu chốt**

- SGK định nghĩa bằng thao tác: kéo dài hai cạnh đối của hình chữ nhật. Không dùng khoảng cách, không dùng ký hiệu; app cũng không dùng ký hiệu cho song song, không nói "cách đều".
- Chỗ SGK không giải thích: vì sao "không cắt nhau" đủ để gọi là song song, và làm sao biết hai đoạn thẳng không chạm nhau có song song không. App thêm hoạt động kéo dài để con thấy một cặp cắt nhau ở xa.
- Dễ lẫn với Bài 27: cạnh liền nhau của hình chữ nhật vuông góc, cạnh đối diện song song.
- Hình ở SGK lưới ô vuông (bài 2) và hình nghiêng buộc con nhìn hướng, không đoán theo "ngang".
- Bài 3 và bài 4 (tr. 99-100) dựa vào tranh in; bài tập trong app dùng hình vẽ riêng có số liệu tính lại được.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Hai đoạn thẳng không chạm nhau là song song | AB và CD ở `sn-doan` (đúng: kéo dài thì cắt nhau) | Animation `HaiDuongKeoDai` cặp thứ hai; `sn-doan` |
| Chỉ nhận ra song song khi nằm ngang | Hình vuông KLMN nghiêng, nói "không có cặp song song" (đúng: 2 cặp) | `hd-1b` nghiêng 25°; lưới `lt-2a`; Phụ huynh |
| Nhầm cạnh liền nhau với cạnh song song | EF và FG song song (đúng: vuông góc) | `CapCanhSongSong` bước 3; `hd-1a` |
| Quên một cặp | Hình chữ nhật chỉ có 1 cặp | `thu-hai-cap`, `hd-1b`: gợi ý ghép cạnh đối diện |
| Nhầm song song với vuông góc | Thanh dọc và bậc thang song song (đúng: vuông góc) | `hd-3`, `lt-5`, `lt-3` |
| Nghĩ hình nào có cạnh nằm ngang là có cặp song song | Hình 4 ở `lt-5` (tam giác) | `lt-5` giải thích từng hình |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: cạnh liền nhau của hình chữ nhật vuông góc (Bài 27), cạnh đối bằng nhau, đường thẳng là đoạn thẳng kéo dài |
| Bốn kênh | Dùng | Nói (câu "Hai đường thẳng song song không bao giờ cắt nhau"), hình (ba animation, bảy hình bài tập), nhẩm (đếm cặp cạnh), viết/tay (kẻ hình chữ nhật, kéo dài bằng thước ở nhà, trong Phụ huynh) |
| Câu tư duy | Dùng | Tìm lỗi sai (`sn-doan`); lục giác đều (`sn-luc-giac`, vượt SGK) |
| Đếm | Dùng nhẹ | Đếm cặp cạnh song song (`thu-hai-cap`, `hd-1b`, `sn-luc-giac`) |
| Tách | Không dùng | Bài hình, không có số lớn hay số đo ghép |
| So sánh | Không dùng | Không có quan hệ "hơn/kém" hay "gấp" |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-lien-nhau` | `trac-nghiem` | Kéo dài hai cạnh liền nhau AB, AD của hình chữ nhật ABCD | **Vuông góc với nhau** |
| `kd-doi` | `dien-so` | AB = 7 cm; cạnh đối diện DC | **7** cm |
| `kd-duong-thang` | `trac-nghiem` | Đường thẳng khác đoạn thẳng ở điểm nào | **Kéo dài mãi về hai phía** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-song-song` | `trac-nghiem` | Kéo dài AB và DC của hình chữ nhật ABCD | **Song song với nhau** |
| `thu-khong-cat` | `trac-nghiem` | Hai đường thẳng song song có bao giờ cắt nhau không | **Không bao giờ cắt nhau** |
| `thu-hai-cap` | `dien-so` | Hình chữ nhật có ... cặp cạnh song song | **2** |

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-doan` | `trac-nghiem` (có hình) | Mai nói hai đoạn thẳng không chạm nhau thì song song: đúng hay sai | **Mai sai** (kéo dài thì cắt nhau) |

**Vượt SGK**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-luc-giac` | `dien-so` (có hình) | Lục giác đều ABCDEF có bao nhiêu cặp cạnh song song | **3** (AB-DE, BC-EF, CD-FA) |

Lý do vượt SGK: lục giác chỉ xuất hiện ở bài 5 (hình 5) để nhận ra "có cặp song song"; việc đếm cả ba cặp củng cố "mỗi cạnh có một cạnh đối diện". Không cần thêm khái niệm.

## Phần Phụ huynh

1. **Con học gì**: hai đường thẳng song song; cặp cạnh song song trong hình chữ nhật, hình vuông.
2. **Cần biết trước**: hình chữ nhật, đường thẳng, vuông góc (Bài 27).
3. **Cách giải thích**: hai ý của SGK (kéo dài hai cạnh đối; không bao giờ cắt nhau); chưa dùng ký hiệu; mẹo hai thanh ray.
4. **Lỗi**: đoạn không chạm là song song; chỉ nhận ra khi nằm ngang; nhầm cạnh liền nhau; quên cặp; nhầm với vuông góc.
5. **Hoạt động**: tìm đường song song quanh nhà; hai chiếc đũa nghiêng dần; vẽ hình chữ nhật, tô hai cặp cạnh bằng hai màu.
6. **Dấu hiệu nắm bài**: nói được "không bao giờ cắt nhau"; chỉ đúng hai cặp kể cả hình nghiêng; phân biệt đối diện với liền nhau.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1 | Kéo dài hai cạnh đối của hình chữ nhật được hai đường thẳng song song | `KeoDaiSongSong`: 4 bước (hình chữ nhật ABCD; kéo dài AB; kéo dài DC; mũi tên hai đầu) | "Hai đường thẳng song song" | `songSong` |
| 2 | Song song thì không bao giờ cắt nhau; đoạn chưa chạm chưa chắc song song | `HaiDuongKeoDai`: 3 bước (hai đoạn; kéo dài nét đứt; kết luận); con chọn cặp thứ nhất (song song) hoặc cặp thứ hai (cắt nhau tại E) | "Hai đường thẳng song song không bao giờ cắt nhau" | `khongCat` |
| 3 | Hình chữ nhật có hai cặp cạnh song song; cạnh liền nhau vuông góc | `CapCanhSongSong`: 4 bước (hình; tô AB-DC; tô AD-BC; dấu góc vuông ở A) | "Cạnh đối song song, cạnh liền nhau vuông góc" | `haiCap` |

Bố cục 390px: viewBox 360x220 (340x230 cho `HaiDuongKeoDai`), chữ từ 18, nút chọn cặp xuống dòng khi hẹp.

## Phần Bài tập

Nhóm theo Hoạt động và Luyện tập của SGK, giữ dạng và độ khó, đổi hình và số liệu. Bài 3 (tr. 99) và bài 1 (tr. 99) của SGK là đề mở nên chuyển thành câu chọn có hình riêng.

**Hoạt động** (SGK tr. 99)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `hd-1a` | `trac-nghiem` (có hình) | Hình chữ nhật EFGH, EF và HG song song; cặp còn lại | **EH và FG** |
| `hd-1b` | `dien-so` (có hình) | Số cặp cạnh song song của hình vuông KLMN nghiêng | **2** |
| `hd-2` | `trac-nghiem` (có hình) | PQRS chia bởi EF; EF song song với cạnh nào | **PS và QR** |
| `hd-3` | `trac-nghiem` (có hình) | Cái thang: cặp nào không song song | **Một thanh dọc và một bậc thang** |

**Luyện tập** (SGK tr. 99-100)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `lt-1` | `trac-nghiem` | Hình ảnh nào có hai đường song song | **Hai thanh ray** |
| `lt-2a` | `noi-cap` (có hình lưới) | AB-DC, AD-AB, BC-AB nối với Song song / Vuông góc / Cắt nhau không vuông góc | **Song song; Vuông góc; Cắt nhau, không vuông góc** |
| `lt-2b` | `trac-nghiem` (có hình lưới) | AD và BC có song song không | **Không** |
| `lt-3` | `trac-nghiem` (có hình) | Chữ Z, L, H, V bằng que tính: chữ vừa song song vừa vuông góc | **Chữ H** |
| `lt-4` | `trac-nghiem` (có hình) | Khu phố: nhà Mai ở đường song song đường Rô-bốt | **Nhà A** |
| `lt-5` | `noi-cap` (có hình) | Bốn hình nối với mô tả song song / vuông góc | **1: cả hai; 2: chỉ song song; 3: chỉ vuông góc; 4: không có** |

**Suy nghĩ thêm:** `sn-doan`, `sn-luc-giac` (vượt SGK) như bảng trên.

Đáp án đều được test tính lại từ tọa độ hình vẽ bằng `isParallel`, `isPerpendicular`, `lineIntersection`, `parallelEdgePairs`, `perpendicularEdgePairs`: số cặp cạnh của hình vuông và lục giác; mỗi cặp ở `lt-2a`; chữ cái nào có que song song hoặc vuông góc; đường nào trên bản đồ song song với đường Rô-bốt; mô tả từng hình ở `lt-5`; hai đoạn ở `sn-doan` cắt nhau khi kéo dài. Không so với số gõ tay.

## Kỹ thuật

- `lib/hinh.ts` thêm: `isParallel` (cùng hướng, không trùng), `lineIntersection`, `parallelEdgePairs`, `pointAtX`, `arrowHead`.
- `_illustrations/`: `HinhLuoi` (lưới ô vuông), `QueTinh`, `DuongPho`, `HaiDoan`, `BonHinh`, `ChiaHinh`, `ThangTre`. `_animations/`: `KeoDaiSongSong`, `HaiDuongKeoDai`, `CapCanhSongSong`.
- Không thêm token màu hay `unit` mới; `KeyFact` không truyền `unit`. Không thêm dạng bài tập mới.
- Đặt `available: true` cho Bài 29 trong `lib/lessons.ts` (đã làm).

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "hai đường thẳng song song", "cặp cạnh song song", "cạnh đối diện", "kéo dài".
- Không dùng ký hiệu cho song song, "cạnh huyền", "hình bình hành", "hình thoi" (Bài 31); test kiểm tra các điều này.
- Không dạy "khoảng cách giữa hai đường song song", "cách đều".
- Hình có tên điểm dùng chữ in hoa; "AB và DC", "cặp cạnh song song".
- Không sao chép đề hay hình SGK; hình và tên điểm trong bài tập đổi khác sách.

## Câu hỏi cần chốt

1. **Các đề mở của SGK (hoạt động 3, luyện tập 1) chuyển thành câu chọn.** Đề xuất: giữ; app không có cách chấm đề mở. Phụ huynh đưa gợi ý tìm quanh nhà.
2. **`sn-luc-giac` vượt SGK.** Đề xuất: giữ như câu thử thách. Nếu không muốn, bỏ id này khỏi `bai-tap.ts` và test.
3. **Hoạt động kéo dài (cặp thứ hai cắt nhau tại E).** SGK không có. Đề xuất: giữ vì nó xử lý lỗi hay gặp nhất (đoạn không chạm là song song). Nếu muốn bám sát SGK hơn, bỏ chặng 2 và `sn-doan`.
4. **Đáp án SGK của bài 3, 4, 5 (tr. 100).** Chưa đối chiếu chắc được từ ảnh in. Đề xuất: người dùng đối chiếu với sách trước khi dùng khối đáp án của Phụ huynh.

## Phụ lục: đáp án SGK

Bài tập trong app dùng số liệu khác sách. Đáp án dưới đây tính lại từ đề; phần đọc từ hình in được ghi rõ.

- **Trang 98, Khám phá:** kéo dài AB và DC của hình chữ nhật ABCD được hai đường thẳng song song; hai đường thẳng song song không bao giờ cắt nhau.
- **Trang 99, hoạt động 1:** a) AB và DC; AD và BC. b) MN và QP; MQ và NP.
- **Trang 99, hoạt động 2:** MN song song với AD và BC.
- **Trang 99, hoạt động 3 và luyện tập 1:** đề mở.
- **Trang 99, luyện tập 2 (đọc từ hình lưới in):** a) Đ. b) S. c) Đ.
- **Trang 100, luyện tập 3 (đọc từ hình in):** chữ E (các que ngang song song, vuông góc với que dọc). Chữ I trong hình in chưa đối chiếu chắc được số que.
- **Trang 100, luyện tập 4:** chưa ghi đáp án, dựa vào hình in.
- **Trang 100, luyện tập 5 (đọc từ hình in):** a) hình 1, 2, 5, 6. b) hình 1, 4, 6.
