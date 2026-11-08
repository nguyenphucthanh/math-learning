# Brief — Bài 35. Ôn tập hình học

- SGK: Toán 4 KNTT tập một, trang 121–124, chủ đề 7 (Ôn tập học kì 1)
- Route: `/kntt-4/bai-35`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và code cùng lúc, nên các câu ở "Câu hỏi cần chốt" dùng đề xuất mặc định)

## Đánh giá

**Vị trí.** Bài ôn tập, thứ ba trong chủ đề Ôn tập học kì 1. Bài trước là Bài 34 (ôn phép cộng, phép trừ); bài sau là Bài 36 (ôn tập đo lường).

**Bài nguồn (thay cho "mục tiêu của bài").**
- Chủ đề 2: Bài 7 (đo góc, đơn vị đo góc), Bài 8 (góc nhọn, góc tù, góc bẹt), Bài 9 (luyện tập chung).
- Chủ đề 6: Bài 27, 28 (vuông góc), Bài 29, 30 (song song), Bài 31 (hình bình hành, hình thoi), Bài 32 (luyện tập chung).

Bài 7, 8, 9 chưa có trong app (`available: false`), nên phần Phụ huynh chỉ ghi số bài, không tạo liên kết.

**Cấu trúc SGK.** Ba tiết luyện tập và một trò chơi, tất cả đều là bài quan sát, đếm, đo và vẽ; không có bài tính toán.

| Trang | Bài | Dạng | Cách làm trong app |
|---|---|---|---|
| 121 | 1 | Chọn đồng hồ có hai kim tạo góc tù | `trac-nghiem` + 4 đồng hồ (`dong-ho-tu`), giờ đổi |
| 121 | 2 | Nêu tên góc nhọn, vuông, tù của một tứ giác | `dien-so` đếm góc + `trac-nghiem` "góc đỉnh nào tù" (`tg-dem`, `tg-goc-tu`) |
| 121 | 3 | Đo góc hình thang bằng thước đo, tìm cặp góc bằng nhau | `trac-nghiem` + `dien-so` có hình, ghi sẵn số đo góc Q (không có thước đo góc trong app) |
| 121 | 4 | Đếm góc nhọn, vuông, tù của hình ngôi nhà | `dien-so` với ngôi nhà vẽ lại: mái tam giác + thân hình vuông, mỗi hình đếm riêng |
| 122 | 1 | Cặp cạnh vuông góc, cặp cạnh cắt nhau không vuông góc ở tứ giác ABCD | `dien-so` + `trac-nghiem` |
| 122 | 2 | Vẽ hình chữ nhật, vẽ MN song song AD, kiểm tra MN vuông góc CD | Không vẽ được; thay bằng 2 câu có hình (`cn-song-song`, `cn-vuong-goc`) |
| 122 | 3 | Que tính xếp tam giác: bao nhiêu hình thoi, que đỏ song song que nào | 3 câu có hình que tính |
| 122 | 4 | Vẽ rồi tô màu dải ba hình thoi | Thay bằng câu đếm cạnh và cặp cạnh song song của hình thoi (`thoi-dai`) |
| 123 | 1 | Chọn hình bình hành; chọn hình vừa song song vừa vuông góc | 2 câu `trac-nghiem`, bốn hình mới |
| 123 | 2 | Cạnh của hình bình hành và hình thoi theo số đo cho trước | 2 câu `dien-so`, số liệu đổi |
| 123 | 3 | Vẽ góc nhọn, góc tù trên giấy ô | Thay bằng 1 câu phân loại hai góc vẽ trên giấy ô (`goc-luoi`) |
| 124 | Trò chơi | Lấy que tính từ hình 19 que | Trò chơi `_game/lay-que.tsx`, hai người chơi thay phiên trên một thiết bị |

**Điểm mấu chốt.**
- Chỗ SGK không giải thích: bài 4 tr. 121 đếm góc "trong hình" nhưng các đường mái kéo dài qua đỉnh hình vuông, nên một số góc bị chia nhỏ hoặc gộp. Trong app dựng lại ngôi nhà thành hai hình riêng (tam giác và hình vuông) để đáp án chỉ có một cách đếm.
- Dễ lẫn với bài vừa học: đồng hồ lúc 5 giờ (150°) và 8 giờ (120°) là góc tù, con thường nhầm với góc bẹt hoặc góc nhọn vì kim "xa nhau".
- Bẫy: bài 3 tr. 122 hỏi "bao nhiêu hình thoi", con hay đếm thiếu cặp tam giác ở giữa hoặc đếm cả hình lớn. Hình que tính chỉ có 4 tam giác nhỏ nên chỉ có 3 hình thoi ghép từ hai tam giác.
- Trò chơi tr. 124 không nói người nào thắng. Có 19 que: ván ngắn nhất cần lấy 6 que (6 que nghiêng đầu tiên, chạy brute force qua mọi tập que). Hình ghép nhiều ô (ví dụ hai que nghiêng ở hai đầu cùng các cạnh ngang) vẫn là hình bình hành.
- Dữ kiện SGK chưa đối chiếu: đáp án các bài tr. 121–124 trong phụ lục đọc từ hình sách, chưa đối chiếu sách giáo viên.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Nhầm góc tù với góc nhọn | Cho rằng lúc 5 giờ hai kim tạo góc nhọn. Đúng: 150°, lớn hơn 90°, là góc tù | Câu `dong-ho-tu`, `goc-luoi`; lời giải nói rõ so với ê ke; KeyFact bốn loại góc |
| Coi góc nào nhỏ hơn góc bẹt cũng là góc nhọn | "Nhỏ hơn 180° thì nhọn." Đúng: góc tù và góc vuông cũng nhỏ hơn 180° | Câu `sn-loi-sai` (tìm lỗi sai) |
| Đếm góc trong hình ghép bị sót hoặc lặp | Ngôi nhà: đếm hai góc ở đáy mái làm 4 | Câu `nha-goc`: lời giải đếm riêng mái và thân; phần Phụ huynh bảo con chấm vào từng đỉnh |
| Cho rằng hai đoạn song song phải bằng nhau | "MN song song AD nên bằng AD." Đúng: song song chỉ nói về hướng | Câu `cn-song-song`; KeyFact "Song song không nói gì về độ dài" |
| Không xét đường thẳng chứa đoạn | "MN không song song AD vì khác độ dài" | Lời giải `cn-song-song` nói về hướng nằm ngang |
| Cho rằng hình thoi không phải hình bình hành | "Hình thoi có 4 cạnh bằng nhau nên không phải hình bình hành" | Câu `sn-thoi-bbh` |
| Nhầm hình bình hành với hình thoi khi ghi cạnh | Hình bình hành có AB = 7, AD = 4: ghi BC = 7 | Câu `canh-bbh`, `canh-thoi` (cạnh đối diện bằng nhau; hình thoi cả bốn cạnh) |
| Đếm hình thoi thiếu hoặc thừa | Đếm 4 hoặc 2 hình | Câu `que-thoi-dem`; lời giải liệt kê ba cặp tam giác |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | Ba câu Khởi động: góc bẹt 180°, góc tù, hình thoi có 4 cạnh bằng nhau |
| Bốn kênh (nói, hình, nhẩm, viết) | Dùng, thiên về hình | Gần như mọi câu có hình; kênh "nói" qua `sn-loi-sai`; kênh "viết" thiếu vì app không có ô vẽ, bù bằng hoạt động ôn trong phần Phụ huynh; kênh "nhẩm" qua đồng hồ và số đo góc |
| Câu tư duy | Dùng | `sn-loi-sai` (tìm lỗi), `sn-thoi-bbh` (vì sao), trò chơi lấy que (suy nghĩ chiến thuật) |
| Đếm | Dùng | `tg-dem`, `nha-goc`, `que-thoi-dem`, `que-do-nhieu` |
| Tách | Không dùng | Bài không có số lớn hay phép tính |
| So sánh | Không dùng | Chỉ so góc với 90°, không cần mô hình riêng |

**Khởi động (kiểm tra đầu vào).**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-bet` | `dien-so` | Góc bẹt bằng ... độ | **180** |
| `kd-tu` | `trac-nghiem` | Góc lớn hơn góc vuông, nhỏ hơn góc bẹt là góc gì? | **Góc tù** |
| `kd-thoi` | `dien-so` | Hình thoi có ... cạnh bằng nhau | **4** |

**Câu thử trong Lý thuyết.**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-goc` | `trac-nghiem` | Lúc 8 giờ hai kim đồng hồ tạo góc gì? | **Góc tù** (120°) |
| `thu-vuong-goc` | `dien-so` | Hai đường thẳng vuông góc cắt nhau tạo ... góc vuông | **4** |
| `thu-song-song` | `trac-nghiem` | Hai đường thẳng song song có thể cắt nhau không? | **Không, kéo dài mãi cũng không cắt nhau** |
| `thu-hinh` | `trac-nghiem` | Hình có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau | **Hình thoi** |

**Suy nghĩ thêm.**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-loi-sai` | `trac-nghiem` | Bình nói: "Góc nhỏ hơn góc bẹt thì là góc nhọn." Đúng hay sai? | **Sai** |
| `sn-thoi-bbh` | `trac-nghiem` | Hình thoi có phải hình bình hành không? | **Có**, hình thoi cũng có hai cặp cạnh đối diện song song |

**Vượt SGK:** `sn-thoi-bbh`. SGK Bài 31 mô tả hình thoi có hai cặp cạnh đối diện song song nhưng không gọi hình thoi là hình bình hành. Giữ vì giúp con hiểu hình thoi có đủ điều kiện của hình bình hành, nhưng không đưa vào Lý thuyết.

## Phần Phụ huynh

Chỉ ghi ý riêng của bài, theo mẫu 6 mục:

1. Con học gì: ôn góc, vuông góc, song song, hình bình hành, hình thoi. Có bảng "nếu con sai nhóm nào, xem lại bài nào" (Bài 7–9, 27–32).
2. Con cần biết gì trước: Bài 7–9, 27–32. Ba câu Khởi động kiểm tra nhanh.
3. Cách giải thích: phân loại góc bằng ê ke; đồng hồ cách nhau 30° mỗi số giờ; "song song là không bao giờ cắt nhau"; hình thoi có bốn cạnh bằng nhau.
4. Lỗi hay gặp: bảng ở trên, rút gọn thành 6 gạch đầu dòng.
5. Hoạt động ôn 10 phút: tìm các loại góc quanh nhà, chơi Lấy que tính bằng que thật hoặc trên app.
6. Dấu hiệu nắm bài: con tự dùng ê ke; đọc được loại góc khi xem giờ; nói được hình thoi và hình bình hành khác nhau thế nào.

Đáp án SGK nằm trong khối thu gọn riêng (xem Phụ lục).

## Phần Lý thuyết

"Nhắc lại nhanh". Hai chương lớn (chủ đề 2 và chủ đề 6), bốn điểm. Không có animation vì SGK không yêu cầu vẽ hoặc ghép; dùng hình tĩnh.

| Điểm cần nhắc | Bài gốc | Cách nhắc |
|---|---|---|
| Các loại góc: nhọn, vuông, tù, bẹt | Bài 7, 8 | Hình `BonGoc` (bốn góc 40°, 90°, 130°, 180°) + `KeyFact` + câu thử `thu-goc` (đồng hồ 8 giờ) |
| Hai đường thẳng vuông góc | Bài 27, 28 | `KeyFact` + câu thử `thu-vuong-goc` |
| Hai đường thẳng song song | Bài 29, 30 | `KeyFact` + câu thử `thu-song-song` |
| Hình bình hành, hình thoi | Bài 31 | Hình `DaiHinhThoi` + `KeyFact` + câu thử `thu-hinh` |

**Bố cục 390px:** mọi hình có `viewBox` tối đa 440 và `w-full`; chữ trong hình từ 14 trở lên.

## Phần Bài tập

Nhóm theo bài nguồn, giữ dạng và độ khó SGK, đổi số liệu và hình. 21 câu, bốn nhóm, thêm một trò chơi.

**Nhóm 1. Góc** (Bài 7, 8, 9; SGK tr. 121 bài 1–4, tr. 123 bài 3)
- `dong-ho-tu` (`trac-nghiem`): đồng hồ A 2 giờ, B 5 giờ, C 9 giờ, D 6 giờ; góc tù: **B**
- `tg-dem` (`dien-so`): tứ giác EFGH: **2** nhọn, **1** vuông, **1** tù
- `tg-goc-tu` (`trac-nghiem`): góc tù ở đỉnh: **G**
- `thang-cap-bang` (`trac-nghiem`): cặp góc bằng nhau của hình thang MNPQ: **M và N**
- `thang-goc-p` (`dien-so`): góc Q = 45°, góc P = **45**
- `nha-goc` (`dien-so`): ngôi nhà: **2** nhọn, **4** vuông, **1** tù
- `goc-luoi` (`trac-nghiem`): hai góc trên giấy ô, góc tù là: **góc đỉnh P**

**Nhóm 2. Vuông góc, song song** (Bài 27–30; SGK tr. 122 bài 1, 2, 3)
- `dieu-dem` (`dien-so`): tứ giác ABCD có góc A, C vuông: **2** cặp cạnh liền nhau vuông góc, **2** cặp không vuông góc
- `dieu-vg` (`trac-nghiem`): cặp cạnh vuông góc: **AB và AD**
- `cn-song-song` (`trac-nghiem`): MN song song với: **AD**
- `cn-vuong-goc` (Đ/S): MN vuông góc với CD: **Đúng**
- `que-thoi-dem` (`trac-nghiem`): số hình thoi trong hình que tính: **3**
- `que-do-song-song` (`trac-nghiem`): que đỏ song song với que màu: **xanh**
- `que-do-nhieu` (`dien-so`): ngoài que đỏ còn **2** que song song với nó

**Nhóm 3. Hình bình hành, hình thoi** (Bài 31; SGK tr. 122 bài 4, tr. 123 bài 1, 2)
- `bbh-chon` (`trac-nghiem`): hình bình hành: **hình C**
- `ss-vg-chon` (`trac-nghiem`): vừa song song vừa vuông góc: **hình D** (hình thang vuông)
- `canh-bbh` (`dien-so`): AB = 7 cm, AD = 4 cm thì BC = **4**, DC = **7**
- `canh-thoi` (`dien-so`): NM = 6 cm thì NP = PQ = QM = **6**
- `thoi-dai` (`dien-so`): mỗi hình thoi có **4** cạnh bằng nhau, **2** cặp cạnh đối diện song song

**Nhóm 4. Suy nghĩ thêm**: `sn-loi-sai`, `sn-thoi-bbh` (bảng ở mục Tư duy).

**Trò chơi Lấy que tính** (SGK tr. 124), nằm dưới bộ bài tập, không tính điểm:
- Hình 19 que: 6 que cạnh trên, 6 que cạnh dưới, 7 que nghiêng, mỗi que chạm để lấy ra.
- Hai người chơi thay phiên trên một thiết bị. Kết thúc khi không còn nhóm ô liền nhau nào còn đủ cạnh trên, cạnh dưới và hai que nghiêng ở hai đầu (tức hết hình thoi và hình bình hành). App báo người vừa lấy que cuối, còn thắng hay thua do hai người thỏa thuận vì SGK không nói.
- Có nút "Chơi ván mới" và "Chơi lại từ đầu".

## Kỹ thuật

- Chuyển `dong-ho.tsx` từ `bai-32/_illustrations/` lên `components/math/dong-ho.tsx` vì Bài 35 dùng lại (đúng quy tắc "từ 2 bài trở lên"). Đổi import trong 3 file của Bài 32.
- Thêm vào `lib/hinh.ts`: `angleAt`, `angleKind`, `polygonAngleKind` (tính góc từ tọa độ để test mọi câu về loại góc).
- Hình mới trong `_illustrations/` (Server Component): `hinh.tsx` (nhiều hình nhỏ), `que-tam-giac.tsx`; `BonDongHo` nằm ở `components/math/bon-dong-ho.tsx` (dùng chung với Bài 8); toạ độ gom ở `hinh-hoc.ts` để test tính lại.
- Trò chơi trong `_game/`: `que.ts` (logic `hasShape`), `lay-que.tsx` (giao diện, `"use client"`).
- Không thêm dạng bài tập mới, không thêm màu đơn vị mới.
- Đặt `available: true` cho Bài 35 trong `lib/lessons.ts`.
- Test: mọi đáp án về góc, cạnh song song/vuông góc, hình bình hành/hình thoi và số hình thoi trong hình que tính được tính lại từ toạ độ; logic trò chơi test bằng duyệt mọi cách lấy que (số que tối thiểu để hết hình là 6).

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: "góc nhọn", "góc vuông", "góc tù", "góc bẹt", "hai đường thẳng vuông góc", "hai đường thẳng song song", "hình bình hành", "hình thoi", "ê ke", "que tính". Số đo góc viết bằng ký hiệu độ (45°).
- Không dạy: công thức tổng bốn góc của tứ giác, tính chất đường chéo hình thoi, đo góc chính xác bằng thước đo (chỉ nhắc trong phần Phụ huynh).
- Không vẽ ra đáp án trước: hình ở câu `dieu-dem` có dấu góc vuông vì đề đã cho biết A và C vuông; các hình còn lại không có dấu góc vuông hay dấu song song.

## Câu hỏi cần chốt

1. **Bài 4 tr. 121 (đếm góc ngôi nhà).** Đề xuất: dựng lại ngôi nhà gồm tam giác mái và hình vuông, mỗi hình đếm góc riêng (2 nhọn, 4 vuông, 1 tù). Lý do: hình sách có đường mái kéo dài nên số góc có thể đếm khác nhau, mà sai toán là lỗi nặng nhất.
2. **Bài 2, 3, 4 các trang 122, 123 (vẽ hình).** Đề xuất: đổi thành câu hỏi có hình, phần vẽ ghi trong hoạt động ôn của Phụ huynh. Lý do: app không có ô vẽ và AGENTS.md chỉ cho thêm dạng bài khi có bài cần.
3. **Trò chơi Lấy que tính (tr. 124).** Đề xuất: làm trò chơi tương tác hai người chơi trên một thiết bị, không tính điểm, không có người thắng cố định. Lý do: SGK không nêu luật thắng, và trò chơi hợp với việc phụ huynh học cùng con.
4. **Đáp án sách ở bài 4 tr. 121.** Đề xuất: ghi "chưa đối chiếu được" trong phần Phụ huynh. Lý do: không đọc chắc các đường nghiêng của hình ngôi nhà trong PDF.

## Phụ lục: đáp án SGK

Đáp án các bài tr. 121–124 đọc từ hình sách, **chưa đối chiếu sách giáo viên**. Phụ huynh đối chiếu lại bằng ê ke và thước.

**Trang 121**
- Bài 1: đồng hồ **B** (8 giờ, 120°). A (1 giờ) nhọn, C (3 giờ) vuông, D (6 giờ) bẹt.
- Bài 2: góc vuông ở **E**; góc tù ở **K**; góc nhọn ở **G** và **H** (đọc từ hình, K ≈ 125°, G ≈ 77°, H ≈ 67°).
- Bài 3: a) đo từng góc MNPQ bằng thước đo góc. b) góc M bằng góc N; góc Q bằng góc P.
- Bài 4: chưa đối chiếu (xem "Câu hỏi cần chốt" câu 1).

**Trang 122**
- Bài 1: a) AB vuông góc AD; CB vuông góc CD. b) AB và BC; AD và DC.
- Bài 2: vẽ trên giấy ô, kiểm tra bằng ê ke: MN vuông góc CD.
- Bài 3: a) **C** (3 hình thoi). b) **B** (que màu xanh).
- Bài 4: vẽ ba hình thoi nối liền nhau trên giấy ô.

**Trang 123**
- Bài 1: a) **B**. b) **C**.
- Bài 2: a) BC = **3** cm; DC = **5** cm. b) NP = PQ = QM = **4** cm.
- Bài 3: vẽ trên giấy ô theo mẫu.

**Trang 124 (Trò chơi)**
- Xếp 19 que tính thành sáu hình nối liền nhau, chơi theo cặp, kết thúc khi các que còn lại không tạo thành hình thoi hoặc hình bình hành.
