# Brief — Bài 28. Thực hành và trải nghiệm vẽ hai đường thẳng vuông góc

- SGK: Toán 4 KNTT, tập một, trang 94-97, Chủ đề 6 "Đường thẳng vuông góc. Đường thẳng song song".
- Route: `/kntt-4/bai-28`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn; chờ người dùng xem lại trên trình duyệt)

## Đánh giá

**Vị trí bài.** Bài thực hành của Chủ đề 6. Bài trước là Bài 27 (hai đường thẳng vuông góc, nhận biết bằng ê ke). Bài sau là Bài 29 (hai đường thẳng song song), rồi Bài 30 (thực hành vẽ hai đường thẳng song song, có thể dùng lại cách đặt ê ke). Bài này dùng lại trung điểm (lớp 3) và đo độ dài.

**Cấu trúc SGK.** Hai hoạt động dự án, không có Khám phá hay Luyện tập:

- Dự án "Khung tranh kỉ niệm" (tr. 94-96): Hoạt động 1 vẽ bằng ê ke, hai ý (a: CD qua H vuông góc AB, H trên và H ngoài AB; b: HK qua M vuông góc CD, ba hình); Hoạt động 2 làm khung tranh bằng que gỗ (4 bước) rồi trang trí.
- Dự án "Xưởng làm diều" (tr. 96-97): Hoạt động 1 vẽ CD qua H vuông góc AB (hai hình); 2 vẽ bản thiết kế con diều (3 bước, AB = 20 cm, HC = 6 cm, HD = 18 cm); 3 làm diều thật (6 bước).

**Mục tiêu**

1. Vẽ được đường thẳng đi qua một điểm cho trước và vuông góc với một đường thẳng cho trước bằng ê ke, khi điểm nằm trên hoặc nằm ngoài đường thẳng.
2. Nêu đúng hai bước: một cạnh góc vuông của ê ke trùng với đường thẳng, cạnh góc vuông thứ hai gặp điểm.
3. Làm được khi đường thẳng nằm nghiêng.
4. Vẽ bản thiết kế con diều: đoạn thẳng AB, trung điểm H, CD đi qua H vuông góc với AB, nối bốn đỉnh.
5. Tính độ dài trên bản thiết kế (AH từ trung điểm, CD = HC + HD).
6. Biết hai thanh tre của khung tranh và con diều đặt trên hai đường thẳng vuông góc.

**Kiến thức cần có.** Hai đường thẳng vuông góc, bốn góc vuông chung đỉnh (Bài 27); ê ke và góc vuông; trung điểm (lớp 3); đo và vẽ đoạn thẳng bằng thước.

**Điểm mấu chốt**

- Không có khái niệm mới, chỉ có kĩ năng vẽ. App không có ê ke và bút thật, nên phần "tay" chuyển sang Phụ huynh; trong app con xem cách đặt ê ke và chọn cách đặt đúng.
- Một tay vẽ ê ke dễ sai ở hai chỗ: đặt cạnh dài nhất lên đường thẳng (thay vì cạnh góc vuông), và để cạnh thứ hai không chạm điểm cần vẽ.
- Dễ chỉ vẽ được khi đường thẳng nằm ngang. SGK cố ý có hình nghiêng ở trang 95 và 96.
- SGK chỉ gọi "cạnh góc vuông", không dùng "cạnh huyền", nên app cũng không dùng.
- Khi H nằm trên AB, đỉnh góc vuông của ê ke đặt tại H; khi H nằm ngoài AB, ê ke trượt dọc AB cho tới khi cạnh thứ hai chạm H. SGK vẽ hai hình nhưng chỉ viết một câu cho cả hai.
- Phần trang trí khung tranh và làm diều là thủ công, không có đáp án; app chỉ nhắc ở Lý thuyết và Phụ huynh.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Đặt cạnh dài nhất của ê ke lên AB | Hình 3 của `ve-e-ke` (đúng: cạnh góc vuông trùng AB) | Câu `ve-e-ke`, `sn-nam`; Phụ huynh nhắc chỉ lại hai cạnh tạo góc vuông |
| Cạnh thứ hai không đi qua H | Hình 1 của `ve-e-ke`, đường 2 của `ve-chon-duong` | Animation `VeVuongGoc` bước 1; `ve-chon-duong` |
| Vẽ đường nghiêng qua H rồi coi là vuông góc | Đường 1 của `ve-chon-duong` (đúng: đường 3) | Dặn kiểm tra lại bằng ê ke ở chỗ hai đường cắt nhau (Phụ huynh) |
| Chỉ vẽ được khi AB nằm ngang | Cho rằng đường vuông góc là "thẳng đứng" (đúng: nghiêng theo AB) | `VeVuongGoc` tilt 20°; câu `ve-nghieng` |
| Nhầm vị trí đỉnh góc vuông khi H trên AB | Đặt đỉnh tại C hoặc D (đúng: tại điểm cần vẽ) | `ve-tren`; bấm "H nằm trên AB" trong `VeVuongGoc` |
| CD chỉ bằng HC hoặc HD | CD = 12 (đúng: 5 + 12 = 17) | `thu-dieu`, `dieu-cd`: hint "H nằm giữa C và D" |
| Nhầm hai thanh tre với đường viền diều | AC và CB là hai thanh tre (đúng: AB và CD) | `dieu-tre` |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: bốn góc vuông (Bài 27), góc của ê ke, trung điểm; bài dựa vào cả ba |
| Bốn kênh | Dùng | Nói (đọc hai bước, nối `ve-thu-tu`), hình (ba animation, hai hình chọn), nhẩm (AH, CD), viết/tay (vẽ thật với ê ke ở nhà, trong Phụ huynh). Kênh "tay" không làm được trong app nên được bù ngoài app |
| Câu tư duy | Dùng | Tìm lỗi sai (`sn-nam`, `kt-sai`), "chỉ vẽ được mấy đường" (`sn-mot-duong`, vượt SGK) |
| Tách | Dùng nhẹ | CD = HC + HD (ghép hai đoạn nối tiếp); không thêm câu tách số |
| Đếm | Dùng nhẹ | Đếm góc vuông có đỉnh H (`dieu-goc`), đếm chỗ ghép của khung (`kt-dem`) |
| So sánh | Không dùng | Bài thực hành, không có quan hệ "hơn/kém" hay "gấp" |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-bon-goc` | `dien-so` | Hai đường vuông góc tạo ... góc vuông chung đỉnh | **4** |
| `kd-e-ke` | `dien-so` | Góc vuông của ê ke do ... cạnh góc vuông tạo thành | **2** |
| `kd-trung-diem` | `dien-so` | H là trung điểm của AB dài 14 cm; AH = ... cm | **7** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-canh-e-ke` | `trac-nghiem` | Cạnh góc vuông thứ nhất của ê ke đặt thế nào | **Trùng với đường thẳng AB** |
| `thu-que` | `trac-nghiem` | Que thứ nhất dọc HK (HK vuông góc CD); que thứ hai dọc đường nào | **Đường thẳng CD** |
| `thu-dieu` | `dien-so` | HC = 6 cm, HD = 18 cm; CD = ... cm | **24** (6 + 18) |

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-nam` | `trac-nghiem` | Nam đặt cạnh dài nhất của ê ke trùng AB: đúng hay sai | **Nam sai** |

**Vượt SGK**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-mot-duong` | `trac-nghiem` | Qua H ngoài AB, vẽ được mấy đường vuông góc với AB | **1 đường thẳng** |

Lý do vượt SGK: nối với cách ê ke chỉ có một vị trí để cạnh thứ hai chạm H, để con hiểu vì sao "đi qua H" và "vuông góc" xác định đúng một đường. Không chứng minh; chỉ dùng thao tác ê ke trượt.

## Phần Phụ huynh

1. **Con học gì**: dùng ê ke vẽ đường thẳng qua một điểm và vuông góc với một đường thẳng; làm khung tranh, thiết kế và làm con diều.
2. **Cần biết trước**: bốn góc vuông chung đỉnh (Bài 27), góc vuông của ê ke, trung điểm.
3. **Cách giải thích**: hai bước của SGK (đặt ê ke, vạch theo cạnh thứ hai); nghiêng thì xoay ê ke theo; số liệu con diều của SGK (AH = 10 cm, CD = 24 cm); chưa dùng ký hiệu ⊥ và chưa nói song song.
4. **Lỗi**: cạnh dài nhất; cạnh thứ hai không qua H; chỉ vẽ khi AB ngang; ê ke xê dịch khi vạch; nhầm HC, HD với CD.
5. **Hoạt động**: vẽ AB nghiêng và H ngoài bằng ê ke thật; khung tranh bằng que kem; thiết kế rồi làm diều với số đo mới.
6. **Dấu hiệu nắm bài**: đặt ê ke đúng cả hai trường hợp và cả khi nghiêng; vẽ được bản thiết kế con diều; nói được vì sao hai thanh tre vuông góc.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1 | Dùng ê ke vẽ đường thẳng qua H vuông góc với AB | `VeVuongGoc`: 4 bước (AB và H; ê ke; vạch CD; bốn dấu góc vuông); con chọn H trên hoặc ngoài AB; hình nghiêng 20° | "Vẽ đường thẳng CD đi qua H và vuông góc với AB" | `canhEKe` |
| 2 | Khung tranh bằng que gỗ: mỗi chỗ ghép là hai que vuông góc | `KhungTranh`: 4 bước (que dọc HK; que dọc CD; hai que nữa; dấu góc và dây buộc) | "Que gỗ nằm trên hai đường thẳng vuông góc" | `que` |
| 3 | Thiết kế con diều: AB, trung điểm H, CD qua H vuông góc | `ThietKeDieu`: 4 bước (AB = 20 cm và H; CD với HC = 6, HD = 18; nối bốn đỉnh; hai thanh tre AB, CD) | "AB vuông góc với CD tại H" | `dieu` |
| 4 | Làm con diều thật (6 bước của SGK) | Không có, chỉ danh sách 6 bước | Không | Không |

Số liệu của `ThietKeDieu` giữ như SGK (20, 6, 18) vì đây là phần giảng bài; bài tập đổi số (16, 5, 12).

Bố cục 390px: viewBox 340x250 (260x260 cho khung tranh), chữ từ 15, nút 48px; hai nút chọn vị trí H xuống dòng khi hẹp.

## Phần Bài tập

SGK không có bài luyện tập, chỉ có hoạt động thực hành. Bài tập trong app chia theo hai dự án và dựa vào việc nhận ra đúng cách vẽ, vì app không có ê ke và bút thật. Số liệu đổi khác SGK.

**Vẽ hai đường thẳng vuông góc** (SGK tr. 94-95 và 96)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `ve-thu-tu` | `noi-cap` | Nối Bước 1, Bước 2, Kết quả với việc cần làm | 1: đặt ê ke; 2: vạch theo cạnh thứ hai; kết quả: CD qua H, vuông góc AB |
| `ve-e-ke` | `trac-nghiem` (có hình) | Ba hình đặt ê ke, hình nào đúng | **Hình 2** |
| `ve-chon-duong` | `trac-nghiem` (có hình) | Đường nào qua H và vuông góc AB (H ngoài, AB nghiêng 20°) | **Đường 3** |
| `ve-tren` | `trac-nghiem` | M trên CD: đỉnh góc vuông ê ke đặt ở đâu | **Tại điểm M** |
| `ve-nghieng` | `trac-nghiem` | CD nghiêng, M ngoài CD: cách làm | **Một cạnh góc vuông trùng CD, trượt tới khi cạnh thứ hai gặp M** |

**Khung tranh kỉ niệm** (SGK tr. 95)

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `kt-dem` | `dien-so` (có hình) | Khung PQRS gồm 4 que: số chỗ hai que vuông góc | **4** |
| `kt-sai` | `trac-nghiem` | Hai que cắt nhau hơi nghiêng: kiểm tra bằng gì | **Đặt ê ke vào chỗ hai que gặp nhau** |

**Xưởng làm diều** (SGK tr. 96-97), AB = 16 cm, HC = 5 cm, HD = 12 cm

| Id | Dạng | Nội dung | Đáp án |
|---|---|---|---|
| `dieu-thu-tu` | `noi-cap` | Nối Bước 1, 2, 3 với việc vẽ bản thiết kế | 1: vẽ AB = 16 cm và H; 2: vẽ CD với HC = 5, HD = 12; 3: nối A-C, C-B, B-D, D-A |
| `dieu-ah` | `dien-so` (có hình) | AB = 16 cm, H trung điểm; AH | **8** cm (16 : 2) |
| `dieu-cd` | `dien-so` (có hình) | HC = 5 cm, HD = 12 cm; CD | **17** cm (5 + 12) |
| `dieu-goc` | `dien-so` (có hình) | Số góc vuông có đỉnh H | **4** |
| `dieu-tre` | `trac-nghiem` (có hình) | Hai thanh tre ứng với đoạn nào | **AB và CD** |

**Suy nghĩ thêm:** `sn-nam`, `sn-mot-duong` (vượt SGK) như bảng trên.

Đáp án đều được test tính lại từ tọa độ hình vẽ: `ve-e-ke` kiểm tra cạnh góc vuông của ê ke có trùng AB và cạnh còn lại có đi qua H không; `ve-chon-duong` kiểm tra từng đường có qua H và vuông góc AB không; các câu con diều tính từ `dieuGeometry` (trung điểm, độ dài, bốn góc vuông). Không so với số gõ tay.

## Kỹ thuật

- Chuyển lên dùng chung vì Bài 28-32 cùng dùng: `hinh.ts` → `lib/hinh.ts` (thêm `distanceToLine`, `passesThrough`); `khung.tsx` (`Khung`, `RightMark`) và `da-giac.tsx` (`DaGiac`, `isRightAt`) → `components/math/`. Bài 27 chỉ đổi đường dẫn import.
- `_illustrations/`: `EKeDat`, `ChonDuong`, `Dieu` (kèm `dieuGeometry`). `_animations/`: `VeVuongGoc`, `KhungTranh`, `ThietKeDieu`.
- Không thêm token màu hay `unit` mới; `KeyFact` không truyền `unit`.
- Không thêm dạng bài tập mới: không có tương tác vẽ trong app. Nếu sau này muốn con vẽ bằng ngón tay hoặc kéo ê ke, đó là dạng mới và cần brief riêng.
- Đặt `available: true` cho Bài 28 trong `lib/lessons.ts` (đã làm).

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "hai đường thẳng vuông góc", "cạnh góc vuông", "ê ke", "trung điểm", "bản thiết kế".
- Không dùng "cạnh huyền", ký hiệu ⊥, từ "song song" (Bài 29); test kiểm tra ba điều này.
- Hình có tên điểm dùng chữ in hoa; "AB và CD", "góc vuông có đỉnh H".
- Độ dài viết "20 cm", có khoảng cách giữa số và đơn vị.
- Không sao chép đề hay hình SGK; số liệu bài tập đổi khác sách.

## Câu hỏi cần chốt

1. **Bài tập chỉ nhận ra cách đặt ê ke, không vẽ trong app.** Đề xuất: giữ như vậy; vẽ thật làm ở Phụ huynh. Dạng bài vẽ bằng ngón tay chưa có và tốn nhiều công, chưa đáng cho một bài thực hành.
2. **Phần làm diều (6 bước thủ công) chỉ là danh sách chữ, không animation.** Đề xuất: giữ; đây là thủ công, không có ý toán mới. Nếu muốn có hình, cần SVG riêng.
3. **`sn-mot-duong` vượt SGK.** Đề xuất: giữ như câu thử thách. Nếu không muốn, bỏ id này khỏi `bai-tap.ts` và test.
4. **Số liệu con diều.** Lý thuyết giữ số SGK (20, 6, 18) để đối chiếu sách; bài tập dùng 16, 5, 12. Đề xuất: giữ.

## Phụ lục: đáp án SGK

Bài này không có bài tập với đáp án cố định.

- **Trang 94-95, hoạt động 1:** vẽ CD qua H vuông góc AB (H trên AB và H ngoài AB), HK qua M vuông góc CD (CD ngang, nghiêng, thẳng đứng): đặt một cạnh góc vuông của ê ke trùng đường thẳng, cạnh thứ hai gặp điểm, vạch theo cạnh thứ hai.
- **Trang 95, hoạt động 2:** khung tranh 4 que gỗ, 4 chỗ ghép vuông góc.
- **Trang 96, bài 1:** vẽ CD qua H vuông góc AB ở hai hình (H ngoài AB; AB nằm ngang và AB nằm nghiêng).
- **Trang 96, bài 2:** AB = 20 cm, H là trung điểm nên AH = HB = 10 cm; HC = 6 cm, HD = 18 cm nên CD = 6 + 18 = 24 cm; nối AC, CB, BD, DA (tính lại từ đề, không lấy trí nhớ).
- **Trang 97, bài 3:** làm diều với 2 thanh tre vuông góc, 6 bước ghi trong phần Lý thuyết.
