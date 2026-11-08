# Brief — Bài 30. Thực hành và trải nghiệm vẽ hai đường thẳng song song

- SGK: Toán 4 KNTT, tập một, trang 101-104, Chủ đề 6 "Đường thẳng vuông góc. Đường thẳng song song".
- Route: `/kntt-4/bai-30`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn; chờ người dùng xem lại trên trình duyệt)

## Đánh giá

**Vị trí bài.** Bài thực hành thứ hai của Chủ đề 6. Bài trước là Bài 29 (hai đường thẳng song song) và Bài 28 (thực hành vẽ hai đường thẳng vuông góc, cùng kiểu bài). Bài sau là Bài 31 (hình bình hành, hình thoi): hai mảnh có bốn cạnh của bộ đồ chơi sẽ được gọi tên ở đó, nên bài này chưa dùng các tên ấy.

**Cấu trúc SGK.** Hai hoạt động dự án, không có Khám phá hay Luyện tập:

- Dự án "Bộ đồ chơi ghép hình" (tr. 101-103): 1a vẽ CD qua H song song AB bằng hai bước (MN vuông góc AB, rồi CD vuông góc MN); 1b tự vẽ AB và H rồi vẽ CD; 2 làm hình vuông ABCD thành 6 mảnh (4 bước); 3 ghép mảnh thành mèo, máy bay, lạc đà, cá.
- Dự án "Đường chạy" (tr. 103-104): 1 vẽ CD qua H song song AB (hai hình: AB thẳng đứng, AB nghiêng); 2 bản thiết kế đường chạy (5 bước: MN = 2 cm và trung điểm H; MP = 10 cm vuông góc MN; HK, NQ song song MP dài 10 cm; nối PQ; chú thích và đánh số); 3 ra sân thể dục.

**Mục tiêu**

1. Vẽ được đường thẳng đi qua một điểm ngoài đường thẳng cho trước và song song với đường thẳng đó bằng ê ke (hai lần vẽ vuông góc).
2. Nêu đúng hai bước và nói được vì sao CD song song AB (cùng vuông góc với MN).
3. Làm được khi đường thẳng nằm nghiêng.
4. Làm bộ đồ chơi ghép hình: tìm trung điểm trên giấy ô, vẽ PQ song song AM, đếm được các mảnh.
5. Nhận ra các cặp đoạn thẳng song song trong hình vuông đã chia mảnh.
6. Vẽ bản thiết kế đường chạy và tính được độ rộng mỗi đường chạy từ trung điểm H.

**Kiến thức cần có.** Hai đường thẳng song song không cắt nhau (Bài 29); vẽ đường thẳng vuông góc bằng ê ke (Bài 28); trung điểm (lớp 3); hình vuông, giấy ô vuông.

**Điểm mấu chốt**

- Không có khái niệm mới, chỉ có kĩ năng vẽ. App không có ê ke và bút thật, nên phần "tay" chuyển sang Phụ huynh; trong app con xem cách đặt ê ke và chọn cách đúng.
- Bước 2 dễ nhầm: vẽ vuông góc với AB (thay vì MN) thì ra chính đường MN. Đây là lỗi chính của bài.
- SGK chỉ dạy cách hai lần vuông góc; không dạy cách trượt ê ke và thước. App theo SGK.
- Hình vuông cắt 6 mảnh có hai mảnh bốn cạnh. SGK không gọi tên; app gọi là "mảnh có bốn cạnh" và để Bài 31 gọi tên.
- Các số đo trên giấy (2 cm, 10 cm) chỉ là bản thiết kế; ra sân thể dục dùng số đo thật, SGK không cho. App chỉ nêu các bước và dùng ví dụ trong Phụ huynh, không khẳng định tỉ lệ.
- Phần thủ công (cắt, tô màu, ghép con vật, ra sân) không có đáp án; app chỉ nhắc ở Lý thuyết và Phụ huynh.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Ở bước 2 vẽ vuông góc với AB | CD trùng MN (đúng: vuông góc với MN) | `sn-nam`, `thu-buoc-2`; animation `VeSongSong` bước 2 |
| Chỉ vẽ được khi AB nằm ngang | Cho rằng CD luôn nằm ngang (đúng: nghiêng giống AB) | Nút "AB nằm nghiêng" trong `VeSongSong`; `ss-nghieng` |
| Chọn đường song song nhưng không qua H, hoặc qua H nhưng cắt AB | Đường 1 và đường 3 của `ss-chon-duong` (đúng: đường 2) | `ss-chon-duong`: giải thích từng đường |
| Nhầm PQ với đoạn nghiêng | Chọn MN hoặc AC (đúng: ON) | `gh-pq`, `gh-mn`; hint: tìm đoạn cùng hướng |
| Đếm sai số mảnh | Coi 6 mảnh đều là tam giác (đúng: 4 tam giác, 2 mảnh bốn cạnh) | `gh-manh` đếm cạnh từng mảnh màu |
| Quên chia đôi để tìm độ rộng đường chạy | MH = 4 cm (đúng: 4 : 2 = 2 cm) | `dc-mh`, `thu-lan` |
| Nhầm vạch xuất phát và vạch đích | Chọn MN hoặc HK là vạch đích (đúng: PQ) | `dc-dich` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: song song không cắt nhau (Bài 29), đặt ê ke (Bài 28), trung điểm |
| Bốn kênh | Dùng | Nói (hai bước, câu nối), hình (ba animation, chọn đường), nhẩm (AM, MH, HK), viết/tay (vẽ thật, cắt giấy, ra sân, trong Phụ huynh). Kênh "tay" không làm được trong app nên bù ngoài app |
| Câu tư duy | Dùng | Tìm lỗi sai (`sn-nam`); "chỉ vẽ được mấy đường" (`sn-mot-duong`, vượt SGK) |
| Tách | Dùng nhẹ | Chia đôi để tìm trung điểm (AM, MH) |
| Đếm | Dùng nhẹ | Đếm mảnh tam giác và mảnh bốn cạnh (`gh-manh`) |
| So sánh | Không dùng | Bài thực hành, không có quan hệ "hơn/kém" hay "gấp" |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-song-song` | `trac-nghiem` | Đặc điểm của hai đường thẳng song song | **Kéo dài mãi không bao giờ cắt nhau** |
| `kd-e-ke` | `trac-nghiem` | Cách đặt ê ke để vẽ đường qua H vuông góc AB | **Một cạnh góc vuông trùng AB, cạnh kia gặp H** |
| `kd-trung-diem` | `dien-so` | H là trung điểm MN dài 8 cm; MH = ... cm | **4** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-buoc-2` | `trac-nghiem` | Bước 2 vẽ CD thế nào | **Qua H, vuông góc với MN** |
| `thu-trung-diem` | `dien-so` | Hình vuông cạnh 8 ô, M trung điểm AB; AM = ... ô | **4** |
| `thu-lan` | `dien-so` | MN = 2 cm, H trung điểm; MH = ... cm | **1** |

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-nam` | `trac-nghiem` | Nam vẽ CD qua H vuông góc với AB (không phải MN): đúng hay sai | **Nam sai** |

**Vượt SGK**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-mot-duong` | `trac-nghiem` | Qua H ngoài AB, vẽ được mấy đường song song với AB | **1 đường thẳng** |

Lý do vượt SGK: nối với hai bước vẽ (qua H chỉ có một đường vuông góc với AB, và một đường vuông góc với MN) để con hiểu vì sao "đi qua H" và "song song" xác định đúng một đường. Không chứng minh; chỉ dùng thao tác ê ke.

## Phần Phụ huynh

1. **Con học gì**: dùng ê ke vẽ đường thẳng qua một điểm và song song với đường thẳng cho trước; làm bộ đồ chơi ghép hình; thiết kế đường chạy.
2. **Cần biết trước**: song song không cắt nhau (Bài 29), vẽ vuông góc bằng ê ke (Bài 28), trung điểm.
3. **Cách giải thích**: hai bước của SGK; "AB và CD cùng vuông góc với MN nên song song"; số liệu của SGK (MN = 2 cm, MP = 10 cm; hình vuông 6 mảnh).
4. **Lỗi**: bước 2 vuông góc với AB; chỉ vẽ khi AB ngang; vẽ bằng mắt; ê ke xê dịch; PQ lệch dòng kẻ ô.
5. **Hoạt động**: vẽ AB nghiêng và H ngoài bằng ê ke thật; làm bộ ghép hình trên giấy ô rồi ghép con vật; vạch đường chạy cho 2 người ngoài sân.
6. **Dấu hiệu nắm bài**: nói được hai bước kể cả khi AB nghiêng; biết bước 2 vuông góc với MN; vẽ được bản thiết kế đường chạy; nhận ra cặp song song trong hình vuông chia mảnh.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1 | Hai lần vẽ vuông góc cho hai đường song song | `VeSongSong`: 4 bước (AB và H; ê ke vẽ MN; ê ke vẽ CD; dấu song song); nút AB nằm ngang / nghiêng 20° | "Vẽ đường thẳng CD đi qua H và song song với AB" | `buoc2` |
| 2 | Hình vuông chia 6 mảnh | `GhepHinh`: 4 bước của SGK trên giấy ô 8x8 (AC; M, N, O, P, DO, ON, MN; PQ; tô 6 mảnh) | "PQ song song với AM" | `trungDiem` |
| 3 | Bản thiết kế đường chạy cho 2 người | `ThietKeDuongChay`: 5 bước của SGK (MN và H; MP; HK, NQ; PQ; chú thích) | "MP, HK, NQ song song với nhau" | `lan` |
| 4 | Chuyển từ giấy ra sân (4 bước) | Không có, chỉ danh sách | Không | Không |

Số liệu Lý thuyết giữ như SGK (MN = 2, MP = 10; hình vuông 8 ô); bài tập đổi số (MN = 4, MP = 12; hình vuông 12 ô để mọi điểm nằm đúng góc ô).

Bố cục 390px: viewBox 340x250 (hình ê ke), 340x330 (hình vuông), 340x150 (đường chạy); chữ từ 15, nút 48px; hai nút chọn AB xuống dòng khi hẹp.

## Phần Bài tập

SGK không có bài luyện tập, chỉ có hoạt động thực hành. Bài tập trong app chia theo hai dự án và dựa vào việc nhận ra đúng cách vẽ, vì app không có ê ke và bút thật. Số liệu đổi khác SGK.

**Vẽ hai đường thẳng song song** (SGK tr. 101, 103)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `ss-thu-tu` | `noi-cap` | Nối Bước 1, Bước 2, Kết quả với việc cần làm | 1: MN qua H vuông góc AB; 2: CD qua H vuông góc MN; kết quả: CD song song AB |
| `ss-chon-duong` | `trac-nghiem` (có hình) | Đường nào qua H và song song AB (H ngoài, AB nghiêng 20°) | **Đường 2** |
| `ss-nghieng` | `trac-nghiem` | AB nghiêng, CD song song AB phải nằm thế nào | **Nghiêng giống AB** |

**Bộ đồ chơi ghép hình** (SGK tr. 102-103), hình vuông ABCD cạnh 12 ô

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `gh-thu-tu` | `noi-cap` | Nối Bước 1-4 với việc làm | theo SGK |
| `gh-am` | `dien-so` (có hình) | M trung điểm AB; AM | **6** ô (12 : 2) |
| `gh-pq` | `trac-nghiem` (có hình) | Đoạn nào song song PQ | **ON** |
| `gh-mn` | `trac-nghiem` (có hình) | MN song song đoạn nào | **AC** |
| `gh-manh` | `dien-so` (có hình) | Số mảnh tam giác, số mảnh bốn cạnh | **4** và **2** |

**Thiết kế đường chạy** (SGK tr. 103-104), MN = 4 cm, MP = 12 cm

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `dc-thu-tu` | `noi-cap` | Nối Bước 1-4 với việc làm | theo SGK |
| `dc-mh` | `dien-so` (có hình) | H trung điểm MN; MH | **2** cm (4 : 2) |
| `dc-hk` | `dien-so` (có hình) | HK = NQ = MP | **12** cm và **12** cm |
| `dc-quan-he` | `trac-nghiem` (có hình) | Quan hệ giữa MP, HK, NQ | **Song song với nhau** |
| `dc-dich` | `trac-nghiem` (có hình) | Vạch đích là đoạn nào | **PQ** |

**Suy nghĩ thêm:** `sn-nam`, `sn-mot-duong` (vượt SGK) như bảng trên.

Đáp án đều được test tính lại từ tọa độ hình vẽ: `ss-chon-duong` kiểm tra từng đường có qua H và song song AB không; các câu về hình vuông tính từ `hinhVuongGeometry` (trung điểm, song song, đếm mảnh, tổng diện tích sáu mảnh bằng hình vuông); các câu đường chạy tính từ `duongChayGeometry`. Không so với số gõ tay.

## Kỹ thuật

- `_illustrations/`: `ChonSongSong`, `HinhVuong` (kèm `hinhVuongGeometry`), `DuongChay` (kèm `duongChayGeometry`). `_animations/`: `VeSongSong`, `GhepHinh`, `ThietKeDuongChay`.
- Dùng lại từ Bài 28: `lib/hinh.ts` (`isParallel`, `isPerpendicular`, `passesThrough`), `Khung`, `RightMark`. Không có thay đổi nào ở `components/` hay `lib/`.
- Không thêm token màu hay `unit` mới; sáu mảnh dùng các token đơn vị sẵn có chỉ để tô màu. `KeyFact` không truyền `unit`.
- Không thêm dạng bài tập mới. Con vẽ bằng ngón tay vẫn là dạng mới, cần brief riêng.
- Đặt `available: true` cho Bài 30 trong `lib/lessons.ts` (đã làm).

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "đường thẳng song song", "vuông góc", "ê ke", "trung điểm", "bản thiết kế", "vạch xuất phát", "vạch đích".
- Không dùng "hình bình hành", "hình thoi" (Bài 31), "cạnh huyền", ký hiệu ⊥; test kiểm tra.
- Hình có tên điểm dùng chữ in hoa; "AB và CD", "ô vuông".
- Độ dài viết "10 cm", có khoảng cách giữa số và đơn vị.
- Không sao chép đề hay hình SGK; số liệu bài tập đổi khác sách.

## Câu hỏi cần chốt

1. **Bài tập chỉ nhận ra cách vẽ, không vẽ trong app.** Đề xuất: giữ như vậy, vẽ thật làm ở Phụ huynh, giống Bài 28.
2. **Hai mảnh bốn cạnh chưa gọi tên.** Đề xuất: giữ "mảnh có bốn cạnh"; tên "hình bình hành" để Bài 31.
3. **`sn-mot-duong` vượt SGK.** Đề xuất: giữ như câu thử thách. Nếu không muốn, bỏ id này khỏi `bai-tap.ts` và test.
4. **Ra sân thể dục chỉ là danh sách bước, không có tỉ lệ số đo thật.** Đề xuất: giữ; SGK không cho số đo thật, app không tự thêm.

## Phụ lục: đáp án SGK

Bài này không có bài tập với đáp án cố định.

- **Trang 101-102, hoạt động 1:** vẽ CD qua H song song AB bằng hai bước: MN qua H vuông góc AB, rồi CD qua H vuông góc MN. Cách làm giống nhau khi AB thẳng đứng, nằm ngang hay nghiêng.
- **Trang 102, hoạt động 2:** M, N, O, P là trung điểm của AB, BC, AC, AO; vẽ DO, ON, MN, rồi PQ song song AM với Q trên MN. Cắt theo AC, DO, MN, ON, PQ được 6 mảnh (4 tam giác, 2 mảnh bốn cạnh; tính lại từ tọa độ trong test).
- **Trang 103, hoạt động 3:** ghép 6 mảnh thành mèo, máy bay, lạc đà, cá.
- **Trang 103-104, bài 2:** MN = 2 cm, H là trung điểm nên MH = HN = 1 cm; MP = 10 cm; HK = NQ = 10 cm; nối PQ được vạch đích; đường chạy dành cho 2 người.
- **Trang 104, bài 3:** chuyển bản thiết kế ra sân thể dục (thủ công).
