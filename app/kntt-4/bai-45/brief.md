# Brief — Bài 45. Thực hành và trải nghiệm: Ước lượng trong tính toán

- SGK: Toán 4 KNTT tập hai, trang 27-28, chủ đề Phép nhân và phép chia.
- Route: `/kntt-4/bai-45`
- Trạng thái: đã viết nội dung (viết một lượt theo yêu cầu, không chờ duyệt).

## Đánh giá

- Vị trí: sau Bài 44 (chia cho số có hai chữ số), Bài 43 (nhân với số có hai chữ số) và Bài 13 tập một (làm tròn). Bài sau: Bài 46 (số trung bình cộng).
- Cấu trúc SGK: Hoạt động 1 (ước lượng bằng làm tròn: 1 ví dụ mẫu + 4 phép tính) → Hoạt động 2 (Nam, Mai, a, b: đúng/sai bằng ước lượng) → Trò chơi "Đường đua" (10 tấm bìa). Không có Khám phá, Luyện tập. Đây là bài thực hành, không phải bài ôn tập chung.
- Mục tiêu:
  1. Ước lượng tổng, hiệu bằng cách làm tròn từng số rồi tính.
  2. Chọn hàng làm tròn theo câu hỏi "khoảng mấy nghìn, mấy chục nghìn".
  3. Biết làm tròn lên thì kết quả tính trên số tròn lớn hơn kết quả thật (tích, tổng), làm tròn xuống thì bé hơn, và dùng để kết luận lớn hơn/bé hơn.
  4. Dùng ước lượng phát hiện phép tính sai.
- Kiến thức cần có: làm tròn số (Bài 13 tập một), Bài 43, 44.
- Điểm mấu chốt: SGK không nói "chỉ kết luận khi cả hai số làm tròn cùng chiều"; app nói rõ. Bẫy: bài (b) 9 170 : 30 < 300 chỉ dùng được vì chỉ làm tròn số bị chia, còn số chia giữ nguyên. Bẫy khác: tất cả tấm bìa sai đều có chữ số tận cùng trùng với kết quả đúng nên cách "nhìn chữ số tận cùng" không phát hiện được.

## Lỗi con hay mắc

| Lỗi | Ví dụ sai (đúng) | Cách xử lý |
|---|---|---|
| Làm tròn sai hàng | Hỏi "mấy nghìn" mà làm tròn đến hàng trăm: 5 978 ≈ 6 000 (đúng), không phải 5 900 | Chặng 2; `hd1-e`; câu `thu-chon-hang` |
| Kết luận sai chiều | 39 × 19: làm tròn lên 800 rồi nói "lớn hơn 800" (đúng: bé hơn) | Animation `HinhBaoNgoai`; `hd2-a..d` |
| Coi ước lượng là chính xác | 5 978 + 2 967 "bằng 9 000" (thật 8 945) | KeyFact chặng 1; `sn-1` |
| Làm tròn khác chiều trong phép trừ rồi kết luận như cùng chiều | 8 920 − 1 170: 9 000 − 1 000 = 8 000, nói "thật lớn hơn 8 000" (thật 7 750) | `sn-2`; bìa 7 trong trò chơi |

## Tư duy

| Yếu tố | Mức độ | Phục vụ |
|---|---|---|
| So sánh | Chính | Lỗi kết luận sai chiều: "lớn hơn/bé hơn" so với số làm tròn |
| Kiểm tra đầu vào | Có | 3 câu khởi động làm tròn đến nghìn, chục nghìn |
| Bốn kênh | Có | Hình (hình bao ngoài 40 × 20), viết (làm tròn rồi tính), nói (trò chơi: nói vì sao), nhẩm (ước lượng trước khi đặt tính) |
| Câu tư duy | Có | Tìm lỗi sai (`sn-2`), "vì sao" (`sn-3`: chữ số tận cùng không đủ) |
| Đếm, Tách | Không dùng | Bài không có quy luật theo bước và không tính nhẩm số đo ghép |

Khởi động (Kiểm tra đầu vào):

| Id | Dạng | Câu | Đáp án |
|---|---|---|---|
| kd-nghin-1 | dien-so | 5 978 làm tròn đến hàng nghìn | **6 000** |
| kd-nghin-2 | dien-so | 2 467 làm tròn đến hàng nghìn | **2 000** |
| kd-chuc-nghin | dien-so | 49 870 làm tròn đến hàng chục nghìn | **50 000** |

Suy nghĩ thêm (`sn-1..3`): chỗ vượt SGK là `sn-1` (không coi ước lượng là kết quả) và `sn-3` (vì sao nhìn chữ số tận cùng không đủ); cả hai gắn với lỗi ở bảng trên.

## Phần Phụ huynh

6 mục theo mẫu. Riêng bài này: lỗi (làm tròn sai hàng, sai chiều, coi ước lượng là chính xác); hoạt động ôn (siêu thị 19 800 + 30 200, đố phép tính sai); dấu hiệu (nói được vì sao làm tròn lên thì thật bé hơn).

## Phần Lý thuyết

1. **Làm tròn rồi tính.** Animation `UocLuongTong` 3 bước (hai số; làm tròn; cộng ra 9 000). KeyFact: "khoảng", không phải "bằng". QuickCheck `tron`.
2. **Làm tròn đến hàng nào.** Chữ, không animation (hai ví dụ nghìn / chục nghìn). KeyFact. QuickCheck `hang`.
3. **Lớn hơn hay bé hơn.** Animation `HinhBaoNgoai` 3 bước (vườn A 39 × 19; hình 40 × 20 bao ngoài; 800 lớn hơn). Chữ cho mảnh vườn B. KeyFact: làm tròn lên → thật bé hơn; chỉ kết luận khi cùng chiều. QuickCheck `chieu`.

Hình rộng nhất ở 340px viewBox, chữ từ 14 trở lên.

## Phần Bài tập

- **Hoạt động 1** (6 câu): `hd1-a..d` `dien-so` ước lượng (6 240 + 2 790 ≈ **9 000**; 8 070 − 3 960 ≈ **4 000**; 29 870 + 40 120 ≈ **70 000**; 80 340 − 39 650 ≈ **40 000**); `hd1-e` `trac-nghiem` chọn hàng (**Hàng chục nghìn**); `hd1-f` `loi-van` (**8 000**).
- **Hoạt động 2** (4 câu, `trac-nghiem` Đúng/Sai): 38 × 19 > 800 **Sai** (722); 61 × 42 > 2 400 **Đúng** (2 562); 7 960 : 40 < 200 **Đúng** (199); vườn 2 040 m², dài 40 m, rộng bé hơn 50 m **Sai** (51).
- **Suy nghĩ thêm** (3 câu, `trac-nghiem`): `sn-1` **Không, số thật gần 9 000**; `sn-2` **Sai** (7 750 < 8 000); `sn-3` **Không, phải ước lượng**.
- **Trò chơi Đường đua** (1 người chơi): xem dưới.

### Mười tấm bìa (tính lại bằng máy, kiểm bởi `bai-tap.test.ts`)

Đúng: 15 × 4 = 60; 7 900 − 2 000 = 5 900; 20 × 5 = 100; 8 000 : 2 = 4 000. Sai: 6 bìa.

| Bìa | Đúng là | Cách ước lượng phát hiện |
|---|---|---|
| 3 970 + 4 980 = 9 850 | 8 950 | Làm tròn lên cả hai: 4 000 + 5 000 = 9 000; thật < 9 000 < 9 850 |
| 821 : 39 = 19 | 21 (dư 2) | 39 × 19 < 40 × 20 = 800 < 821, nên thương > 19 |
| 5 120 + 3 010 = 7 130 | 8 130 | Làm tròn xuống cả hai: 8 000; thật > 8 000 > 7 130 |
| 51 × 103 = 4 973 | 5 253 | Làm tròn xuống: 50 × 100 = 5 000; thật > 5 000 > 4 973 |
| 8 920 − 1 170 = 8 750 | 7 750 | 9 000 − 1 000 = 8 000 (bị trừ lên, số trừ xuống); thật < 8 000 < 8 750 |
| 4 980 + 2 970 = 8 350 | 7 950 | Làm tròn lên cả hai: 8 000; thật < 8 000 < 8 350 |

Nhận xét: không bìa sai nào bị lộ bởi chữ số tận cùng (kể cả 39 × 19 tận cùng 1 như 821), nên chỉ ước lượng phát hiện được; có test khẳng định điều này. Bìa 821 : 39 là phép chia có dư, ước lượng chỉ chứng minh thương "không thể là 19".

Luật (app): 10 bìa xáo ngẫu nhiên mỗi ván; mỗi lượt chọn Đúng/Sai; chọn chính xác thì ngựa tiến 1 ô, đường đua 6 ô; về đích trước khi hết bìa thì thắng; hết bìa chưa tới đích thì "chơi ván mới". Sau mỗi lượt hiện lời ước lượng và kết quả đúng. Nút ≥ 44px, không phụ thuộc hover, ngựa dịch chuyển bằng `transition-transform motion-reduce:transition-none`. Thắng ghi `markGameWon`.

## Kỹ thuật

- Tái dùng `roundToPlace` trong `lib/round-numbers.ts` (không viết lại làm tròn).
- Trò chơi và logic ở `_game/` (`duong-dua.ts` thuần để test, `tro-choi.tsx` client).
- `lib/lessons.ts`: đặt `available` của Bài 45 thành `true`.

## Tiêu chí duyệt nội dung

- Dùng "làm tròn", "khoảng", "ước lượng"; không viết "bằng" cho kết quả ước lượng; số lớn tách lớp bằng NBSP.
- Phép chia 821 : 39 ghi thương 21 dư 2 như SGK lớp 4, không dạy số thập phân.
- Không dạy quy tắc tổng quát cho phép chia khi làm tròn số chia.

## Câu hỏi cần chốt

1. Trò chơi một người có thể thua khi hết bìa chưa tới đích. Đề xuất giữ (6 ô trên 10 bìa, cần chọn đúng ít nhất 6 lần), vì có ý nghĩa thắng/thua như trò chơi SGK mà con vẫn thắng được dễ dàng.
2. Hoạt động 2 (b) 9 170 : 30: đề xuất giải thích bằng làm tròn xuống 9 000 chỉ ở phần đáp án phụ huynh, không thêm vào Lý thuyết, để bài không quá dài.
3. Bìa 821 : 39 = 19 có sai không? Sai (thương 21, dư 2). Đề xuất giữ là sai, vì phép chia có dư của lớp 4.

## Phụ lục: đáp án SGK

- Hoạt động 1: 5 978 + 2 967 ≈ 9 000; 7 960 + 1 980 ≈ 10 000; 5 985 − 3 897 ≈ 2 000; 19 870 + 30 480 ≈ 50 000; 50 217 − 21 052 ≈ 30 000.
- Hoạt động 2: Nam sai (39 × 19 < 800); Mai sai (rộng B không thể bé hơn 20 m; thật 21 m); a) 89 × 26 > 2 700 **sai** (2 314); b) 9 170 : 30 < 300 **sai** (305).
- Trò chơi: xem bảng mười tấm bìa.
