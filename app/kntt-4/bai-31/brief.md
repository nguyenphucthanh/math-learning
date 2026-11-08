# Brief — Bài 31. Hình bình hành, hình thoi

- SGK: Toán 4 KNTT, tập một, trang 105-109, Chủ đề 6 "Đường thẳng vuông góc. Đường thẳng song song".
- Route: `/kntt-4/bai-31`
- Trạng thái: đã viết nội dung (người dùng yêu cầu viết brief và làm luôn, nên các quyết định ở "Câu hỏi cần chốt" đã chọn theo đề xuất; chờ người dùng xem lại trên trình duyệt)

## Đánh giá

**Vị trí bài.** Bài thứ năm của Chủ đề 6. Bài trước là Bài 30 (vẽ hai đường thẳng song song; hai mảnh có bốn cạnh của bộ đồ chơi ở đó được gọi tên ở bài này). Bài sau là Bài 32 (luyện tập chung của chủ đề). Bài ôn lại: Bài 29 (song song), Bài 27 (vuông góc, ê ke), Bài 35 (ôn tập hình học).

**Cấu trúc SGK.**

- Khám phá 1 (tr. 105): hình bình hành qua đuôi con gà xếp từ mảnh ghép; hình ABCD trên giấy ô; khung kiến thức.
- Hoạt động (tr. 106): bài 1 chọn hình bình hành trong 5 hình; bài 2 tìm đỉnh C bị che; bài 3 hai hình bình hành chung cạnh (EG = AB; cạnh song song với CD).
- Khám phá 2 (tr. 107): hình thoi qua kim nam châm; khung kiến thức. Hoạt động bài 1 chọn hình thoi trong 5 hình.
- Hoạt động (tr. 108): bài 2 dãy hình theo quy luật; bài 3 chọn bốn điểm tạo hình thoi.
- Luyện tập (tr. 108-109): bài 1 dùng ê ke kiểm tra hai đường chéo; bài 2a, 2b ghép miếng; bài 3 tìm hình thoi trong thực tế; bài 4 gấp giấy cắt hình thoi.

**Mục tiêu**

1. Nhận biết hình bình hành: hai cặp cạnh đối diện song song và bằng nhau.
2. Nhận biết hình thoi: hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.
3. Chọn đúng hình bình hành, hình thoi trong nhóm hình, kể cả hình nằm nghiêng.
4. Dùng tính chất cạnh đối diện bằng nhau để tìm độ dài cạnh, tìm cạnh song song (EG = AB, cạnh song song với CD).
5. Tìm đỉnh còn thiếu của hình bình hành, của hình thoi trên giấy ô.
6. Nêu điểm giống và khác nhau của hình bình hành và hình thoi.

**Kiến thức cần có.** Song song (Bài 29); hình chữ nhật có cạnh đối diện bằng nhau, hình vuông có bốn cạnh bằng nhau (lớp 3); dùng ê ke (Bài 27).

**Điểm mấu chốt**

- Khung kiến thức của SGK chỉ nói cạnh. SGK không nói gì về góc, đường chéo trong khung. Giữ nguyên.
- Hình thoi cũng có hai cặp cạnh đối diện song song, nên về toán nó là một trường hợp đặc biệt của hình bình hành. SGK không nêu điều này và phân loại hai hình riêng (dãy hình tr. 108 coi hình thoi và hình bình hành là hai loại khác nhau). Bài chỉ dùng hình bình hành "thường" (hai cạnh kề không bằng nhau) để không mâu thuẫn; chuyện "hình thoi cũng là hình bình hành" ghi trong khối Phụ huynh, không dạy cho con.
- Tương tự, hình vuông cũng là hình thoi. Hai hình ghép ở tr. 108, bài 2a có hình A là hình vuông; app không đề cập.
- Hai đường chéo của hình thoi vuông góc (tr. 108, luyện tập 1): SGK chỉ cho con tự dùng ê ke kiểm tra, không đưa vào khung. App cho thấy ở bước cuối animation, không đưa vào `KeyFact`.
- Bẫy trong SGK: hình B ở tr. 106 và hình B, D ở tr. 107 là hình gần giống hình cần chọn (hình thang chỉ một cặp cạnh song song; hình bình hành nhưng hai cạnh kề không bằng nhau). Câu hỏi giữ bẫy này, con phải so cạnh bằng cách đếm ô.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (kèm đúng) | Cách xử lý |
|---|---|---|
| Coi hình chỉ có một cặp cạnh song song là hình bình hành | Chọn cả hình B (hình thang) (đúng: A, C, E) | `bb-nhan-dang`: giải thích từng hình; animation `HinhBinhHanh` bước 1-2 hai cặp song song |
| Nhầm cạnh đối diện với cạnh kề | AB = 7 cm, BC = 4 cm thì DC = 4 cm (đúng: DC = 7 cm) | `thu-binh-hanh`, `sn-canh-binh-hanh`; hint "DC đối diện với AB" |
| Cho rằng hình bình hành có bốn cạnh bằng nhau | Gọi hình B, D tr. 107 là hình thoi (đúng: chỉ A, C) | `ht-nhan-dang` (đếm ô); `GiongKhac` bước 2; `sn-loi-sai` |
| Chỉ cần cạnh song song là gọi hình thoi | "Có hai cặp cạnh đối diện song song thì là hình thoi" (đúng: cần thêm bốn cạnh bằng nhau) | `sn-loi-sai` |
| Không nhận ra hình xoay nghiêng | Bỏ sót hình C (nằm đứng) ở `bb-nhan-dang` | `bb-nhan-dang` có hình nghiêng nhiều hướng; Phụ huynh: xoay giấy |
| Tìm đỉnh còn thiếu bằng mắt | Chọn điểm 1 hoặc 2 ở `bb-dinh-c` (đúng: điểm 3) | `bb-dinh-c` hint: DC dài bằng AB, đếm ô; `ht-bon-diem` |
| Không biết cạnh chung CD vừa thuộc ABCD vừa thuộc CDEG | EG khác AB (đúng: EG = DC = AB) | `bb-canh-bang`: giải thích hai bước AB = DC rồi DC = EG |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| Kiểm tra đầu vào | Dùng | 3 câu khởi động: song song (Bài 29), cạnh đối diện của hình chữ nhật, hình vuông có 4 cạnh (lớp 3) |
| So sánh | Dùng | `GiongKhac`, `thu-giong-khac`, `sn-giong`: so hình bình hành với hình thoi theo cạnh |
| Bốn kênh | Dùng | Nói (khung kiến thức, câu điền), hình (4 animation, giấy ô), nhẩm (cạnh đối diện bằng nhau), tay (gấp giấy, ê ke). Kênh "tay" bù ngoài app (Phụ huynh) |
| Câu tư duy | Dùng | Tìm lỗi sai (`sn-loi-sai`); "vì sao giống nhau" (`sn-giong`); dãy hình (`ht-day-hinh`, SGK) |
| Đếm | Dùng nhẹ | Đếm ô để so cạnh (`ht-nhan-dang`, `bb-dinh-c`) |
| Tách | Không dùng | Bài không có số lớn hay số đo ghép |

**Khởi động** (không lưu tiến độ)

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `kd-song-song` | `trac-nghiem` | Đặc điểm của hai đường thẳng song song | **Kéo dài mãi không bao giờ cắt nhau** |
| `kd-hinh-chu-nhat` | `dien-so` | Hình chữ nhật AB = 6, BC = 4; DC, AD | **6; 4** |
| `kd-hinh-vuong` | `dien-so` | Hình vuông có ... cạnh bằng nhau | **4** |

**Câu thử trong Lý thuyết**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `thu-binh-hanh` | `dien-so` | Hình bình hành ABCD AB = 9, AD = 5; DC, BC | **9; 5** |
| `thu-hinh-thoi` | `dien-so` | Hình thoi EFGH EF = 7; FG, GH, HE | **7; 7; 7** |
| `thu-giong-khac` | `trac-nghiem` | Hình nào có bốn cạnh bằng nhau | **Hình thoi** |
| `thu-gap-giay` | `trac-nghiem` | Bốn cạnh của hình thoi cắt từ giấy | **Bốn cạnh bằng nhau** |

**Suy nghĩ thêm**

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `sn-loi-sai` | `trac-nghiem` | Mai nói "hai cặp cạnh đối diện song song thì là hình thoi": đúng hay sai | **Sai: hình bình hành cũng có mà bốn cạnh không bằng nhau** |
| `sn-canh-binh-hanh` | `dien-so` | Hình bình hành ABCD AB = 7, BC = 4; DC, AD | **7; 4** |
| `sn-canh-hinh-thoi` | `dien-so` | Hình thoi MNPQ MN = 6; NP, PQ, QM | **6; 6; 6** |
| `sn-giong` | `trac-nghiem` | Hình thoi và hình bình hành giống nhau ở đâu | **Đều có hai cặp cạnh đối diện song song** |

Không có câu vượt SGK.

## Phần Phụ huynh

1. **Con học gì**: nhận biết hình bình hành và hình thoi qua cạnh; dùng ê ke thấy đường chéo hình thoi vuông góc; gấp giấy cắt hình thoi.
2. **Cần biết trước**: song song (Bài 29), cạnh đối diện của hình chữ nhật, hình vuông (lớp 3), ê ke.
3. **Cách giải thích**: đúng lời khung của SGK; "hình thoi có thêm điều: bốn cạnh bằng nhau"; đường chéo chỉ là quan sát bằng ê ke. Nếu con hỏi "hình thoi có phải hình bình hành" thì trả lời là con nói có lí, nhưng bài này phân loại theo tên SGK.
4. **Lỗi**: hình thang nhầm hình bình hành; cạnh đối diện với cạnh kề; cho hình bình hành bốn cạnh bằng nhau; không nhận ra hình xoay nghiêng; đếm ô sai.
5. **Hoạt động**: tìm hình quanh nhà (lát nền, cổng xếp, giá treo); gấp giấy cắt hình thoi; vẽ trên giấy ô rồi đổi chéo kiểm tra.
6. **Dấu hiệu nắm bài**: nói đúng khung của hai hình; chọn đúng hình trong nhóm, kể cả khi xoay; biết cạnh đối diện bằng nhau, cạnh kề thì không.

## Phần Lý thuyết

| Chặng | Một ý | Animation | KeyFact | QuickCheck |
|---|---|---|---|---|
| 1. Hình bình hành | Hai cặp cạnh đối diện song song và bằng nhau | `HinhBinhHanh`, 4 bước: hình trên giấy ô; AB // DC; AD // BC; ký hiệu bằng nhau | `AB // DC, AD // BC, AB = DC, AD = BC` | `thu-binh-hanh` |
| 2. Hình thoi | Hai cặp cạnh đối diện song song, bốn cạnh bằng nhau | `HinhThoi`, 4 bước: hình; hai cặp song song; bốn cạnh bằng nhau; hai đường chéo và ê ke | `AB // DC, AD // BC, AB = BC = CD = DA` | `thu-hinh-thoi` |
| 3. Giống và khác | Cùng có hai cặp cạnh đối diện song song; chỉ hình thoi có bốn cạnh bằng nhau | `GiongKhac`, 3 bước, hai hình cạnh nhau | không có | `thu-giong-khac` |
| 4. Gấp giấy | Gấp đôi hai lần, cắt một đường, mở ra được hình thoi | `GapGiay`, 5 bước, vẽ tờ giấy mở phẳng | không có | `thu-gap-giay` |

Hình rộng 340 trong `viewBox`, co theo màn hình; chữ từ 15 trở lên. Hình bình hành và hình thoi dùng nền giấy ô như SGK.

## Phần Bài tập

Tiết "Hình bình hành" (tr. 105-106), giữ dạng SGK, đổi số liệu và hình.

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `bb-nhan-dang` | `trac-nghiem` | Hình nào là hình bình hành (5 hình A-E) | **A, C và E** |
| `bb-dinh-c` | `trac-nghiem` | Đỉnh C trong 3 điểm đánh số | **Điểm 3** (C = B + D − A) |
| `bb-canh-bang` | `dien-so` | ABCD, CDEG hình bình hành, AB = 6 dm; EG | **6** |
| `bb-song-song-cd` | `trac-nghiem` | Cạnh song song với CD | **AB và EG** |

Tiết "Hình thoi" (tr. 107-109).

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| `ht-nhan-dang` | `trac-nghiem` | Hình nào là hình thoi (5 hình A-E) | **A và C** |
| `ht-day-hinh` | `trac-nghiem` | Dãy hình lặp nhóm ba, dấu "?" là hình thứ 8 | **Hình bình hành** |
| `ht-bon-diem` | `trac-nghiem` | Bốn điểm tạo hình thoi: M, N, P và S, Q hoặc R | **M, N, P, Q** |
| `ht-duong-cheo` | `trac-nghiem` | Hai đường chéo có vuông góc không | **Vuông góc** |
| `ht-ghep-hai-mieng` | `trac-nghiem` | Hai miếng tam giác vuông cân không ghép được hình nào | **Hình D** |

Nhóm cuối "Suy nghĩ thêm": `sn-loi-sai`, `sn-canh-binh-hanh`, `sn-canh-hinh-thoi`, `sn-giong`.

Không có trong app, kèm lý do:

- Luyện tập 2b (ghép 4 miếng thành hình vuông, bình hành, hình thoi): cần dạng kéo thả ghép mảnh, app chưa có dạng này. Chuyển sang đáp án và hoạt động ngoài app.
- Luyện tập 3 (tìm hình thoi thực tế) và 4 (gấp giấy): thao tác tay ngoài app. Gấp giấy có animation `GapGiay` ở Lý thuyết.

## Kỹ thuật

- Thêm vào `lib/hinh.ts`: `lengthOf`, `isParallelogram`, `isRhombus`, `fourthVertex`, `polygonArea` (dùng trong test để tính lại đáp án).
- `_animations/dau.tsx`: dấu song song (mũi tên), dấu bằng nhau (gạch) và nền lưới dùng chung bốn animation và các hình minh họa của bài. Chưa chuyển lên `components/` vì mới dùng trong một bài.
- Đặt `available: true` cho Bài 31 trong `lib/lessons.ts`.

## Tiêu chí duyệt nội dung

- Thuật ngữ SGK: hình bình hành, hình thoi, cạnh đối diện, song song, đường chéo, ê ke.
- Khung kiến thức giữ đúng lời: hình bình hành "có hai cặp cạnh đối diện song song và bằng nhau"; hình thoi "có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau".
- Số đo: dm và cm viết liền sau số.
- Không dạy: hình thoi là hình bình hành đặc biệt, hình vuông là hình thoi, chu vi, diện tích, tính chất góc đối của hình bình hành.

## Câu hỏi cần chốt

1. Luyện tập 2b (ghép 4 miếng) có làm dạng kéo thả không? Đề xuất: không, để Phụ huynh ghép bằng giấy. Lý do: dạng mới chỉ thêm khi có bài cần, và bài này đã đủ hình ảnh.
2. Có nói "hình thoi cũng là hình bình hành" cho con không? Đề xuất: không, chỉ ghi trong Phụ huynh. Lý do: SGK phân loại riêng, và con học cách phân biệt trước.
3. Hai đường chéo vuông góc có đưa vào khung ghi nhớ không? Đề xuất: không, chỉ làm quan sát ở bước cuối animation. Lý do: SGK không đưa vào khung.

## Phụ lục: đáp án SGK

Đáp án tính từ hình in (đo trên ô vuông), chưa đối chiếu sách giáo viên.

- Tr. 106, HĐ1: hình bình hành là A, C, E (B hình thang, D không có cặp cạnh song song).
- Tr. 106, HĐ2: C = B + D − A, trùng vị trí con gà.
- Tr. 106, HĐ3: a) EG = AB = 3 dm; b) AB và EG.
- Tr. 107, HĐ1: hình thoi là A và C (B, D hình bình hành hai cạnh kề không bằng nhau; E có hai cặp cạnh kề bằng nhau, không có cạnh song song).
- Tr. 108, HĐ2: hình thoi (dãy xanh, cam, xanh, cam, ?, cam).
- Tr. 108, HĐ3: B. Bốn điểm M, N, P, R (điểm đối diện N, cách đều M và P).
- Tr. 108, LT1: vuông góc.
- Tr. 108, LT2a: D. Hai miếng tam giác vuông cân ghép được hình vuông A, hình tam giác B, hình bình hành C; hình thoi D không ghép được.
- Tr. 109, LT2b: A hình vuông, B hình bình hành, C hình thoi (ghép bằng giấy).
- Tr. 109, LT3, LT4: hoạt động mở.
