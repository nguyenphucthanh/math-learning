import type { ExerciseGroup, Question } from "@/components/exercises/types";
import { createElement } from "react";
import { AoAnh } from "./_illustrations/ao-anh";
import { BonCachDan, type MiengDan } from "./_illustrations/chong-hinh";
import { DongHo } from "./_illustrations/dong-ho";
import { GapKhuc } from "./_illustrations/gap-khuc";
import { HinhDungSai } from "./_illustrations/hinh-dung-sai";
import { BangNguoiQue } from "./_illustrations/nguoi-que";
import { QueThoi } from "./_illustrations/que-thoi";
import { Thang } from "./_illustrations/thang";
import { VuongCheo } from "./_illustrations/vuong-cheo";

/** Bốn cách dán A, B, C, D: thứ tự dán từ miếng dán đầu tiên (dưới cùng) đến miếng dán cuối (trên cùng). */
export const cachDan: MiengDan[][] = [
  ["tron", "thoi", "tam-giac", "chu-nhat"],
  ["tam-giac", "thoi", "chu-nhat", "tron"],
  ["chu-nhat", "tam-giac", "thoi", "tron"],
  ["chu-nhat", "tron", "thoi", "tam-giac"],
];

/** Khởi động đầu bài: nhắc lại kiến thức của chủ đề 6, không tính vào tiến độ. */
export const warmUps: Question[] = [
  {
    id: "kd-vuong-goc",
    kind: "trac-nghiem",
    prompt: "Hai đường thẳng vuông góc với nhau cắt nhau tạo thành góc gì?",
    options: ["Góc vuông", "Góc nhọn", "Góc tù"],
    answerIndex: 0,
    hint: "Nhớ lại Bài 27: hai đường thẳng vuông góc làm thành bốn góc giống như góc của ê ke.",
    explanation: "Hai đường thẳng vuông góc với nhau cắt nhau tạo thành bốn góc vuông.",
  },
  {
    id: "kd-dung-cu",
    kind: "trac-nghiem",
    prompt: "Dụng cụ nào giúp em kiểm tra và vẽ góc vuông?",
    options: ["Ê ke", "Compa", "Cái cân"],
    answerIndex: 0,
    hint: "Nhớ lại Bài 28: dụng cụ có một góc vuông, hình tam giác.",
    explanation: "Ê ke có một góc vuông. Đặt cạnh ê ke lên đường thẳng để kiểm tra hoặc vẽ đường thẳng vuông góc.",
  },
  {
    id: "kd-hinh",
    kind: "dien-so",
    parts: ["Hình bình hành có", { answer: 2 }, "cặp cạnh đối diện song song."],
    hint: "Nhớ lại Bài 31: hình bình hành ABCD có AB song song DC và AD song song BC.",
    explanation: "Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.",
  },
];

export const quickChecks = {
  songSong: {
    id: "thu-song-song",
    kind: "trac-nghiem",
    prompt: "Hai đường thẳng song song có thể cắt nhau không?",
    options: ["Không, kéo dài mãi cũng không bao giờ cắt nhau", "Có, nếu kéo dài đủ xa", "Có, nếu hai đường dài bằng nhau"],
    answerIndex: 0,
    hint: "Nhớ hai thanh ray của đường tàu.",
    explanation: "Hai đường thẳng song song kéo dài mãi cũng không bao giờ cắt nhau.",
  },
  veQuaDiem: {
    id: "thu-ve-qua-diem",
    kind: "trac-nghiem",
    prompt: "Muốn vẽ đường thẳng đi qua H và vuông góc với AB, em đặt ê ke thế nào?",
    options: [
      "Một cạnh góc vuông trùng với AB, cạnh góc vuông kia đi qua H",
      "Cạnh dài nhất của ê ke trùng với AB",
      "Một cạnh góc vuông song song với AB, chạm vào H",
    ],
    answerIndex: 0,
    hint: "Góc vuông của ê ke phải nằm trên AB.",
    explanation: "Một cạnh góc vuông của ê ke nằm trên AB. Trượt ê ke dọc theo AB cho đến khi cạnh góc vuông kia chạm H, rồi vẽ theo cạnh đó.",
  },
  hinh: {
    id: "thu-hinh",
    kind: "trac-nghiem",
    prompt: "Hình có hai cặp cạnh đối diện song song và bằng nhau, hai cạnh kề nhau có thể khác nhau là hình nào?",
    options: ["Hình bình hành", "Hình thoi", "Hình vuông"],
    answerIndex: 0,
    hint: "Hình thoi thì cả bốn cạnh phải bằng nhau.",
    explanation: "Đó là hình bình hành. Hình thoi là hình bình hành đặc biệt, có cả bốn cạnh bằng nhau.",
  },
  catGhep: {
    id: "thu-cat-ghep",
    kind: "dien-so",
    parts: ["Hình chữ nhật có", { answer: 4 }, "góc vuông."],
    hint: "Nhớ lại hình chữ nhật ở lớp 3.",
    explanation: "Hình chữ nhật có bốn góc vuông, nên hình ghép được ở trên là hình chữ nhật.",
  },
} satisfies Record<string, Question>;

type DungSai = { id: string; prompt: string; answer: boolean; hint: string; explanation: string };

/** Câu Đúng hay Sai về hình trên lưới (đáp án 0 là Đúng, 1 là Sai). */
function dungSai(spec: DungSai): Question {
  return {
    id: spec.id,
    kind: "trac-nghiem",
    prompt: spec.prompt,
    options: ["Đúng", "Sai"],
    answerIndex: spec.answer ? 0 : 1,
    illustration: createElement(HinhDungSai),
    hint: spec.hint,
    explanation: spec.explanation,
  };
}

export const exerciseGroups: ExerciseGroup[] = [
  {
    id: "song-song-vuong-goc",
    title: "Song song và vuông góc",
    questions: [
      {
        id: "gk-song-song",
        kind: "trac-nghiem",
        prompt: "Trong đường gấp khúc ABCDEGHK, hai đoạn thẳng nào song song với nhau?",
        options: ["AB và EG", "BC và HK", "CD và DE", "DE và HK"],
        answerIndex: 1,
        illustration: createElement(GapKhuc),
        hint: "Đếm ô: đi từ đầu này đến đầu kia của mỗi đoạn thẳng, sang phải mấy ô và lên hay xuống mấy ô? Hai đoạn song song thì đi cùng kiểu.",
        explanation: "BC, EG và HK đều đi sang phải 2 ô rồi lên 1 ô, nên chúng song song với nhau. Trong bốn cặp, chỉ có BC và HK song song. Ba cặp còn lại đi theo những kiểu khác nhau (ví dụ AB đi xuống 4 ô khi sang phải 2 ô, còn EG đi lên 1 ô).",
      },
      {
        id: "gk-vuong-goc",
        kind: "trac-nghiem",
        prompt: "Trong đường gấp khúc ABCDEGHK, hai đoạn thẳng nào vuông góc với nhau?",
        options: ["AB và BC", "BC và CD", "DE và EG", "GH và HK"],
        answerIndex: 0,
        illustration: createElement(GapKhuc),
        hint: "Đặt đỉnh góc vuông của ê ke vào chỗ hai đoạn thẳng gặp nhau, xem hai cạnh ê ke có trùng với hai đoạn thẳng không.",
        explanation: "Tại B, hai đoạn AB và BC vừa khít với hai cạnh góc vuông của ê ke, nên AB vuông góc với BC. Ở các cặp còn lại, góc tại C, tại E và tại H không vuông.",
      },
      dungSai({
        id: "ds-song-song",
        prompt: "Đúng hay sai? Đoạn thẳng EP song song với đoạn thẳng DC.",
        answer: true,
        hint: "E và P nằm trên đường thẳng nào? Đường thẳng đó đi cùng hướng với DC không?",
        explanation: "E và P nằm trên đoạn thẳng AB. AB và DC cùng nằm ngang, kéo dài mãi không cắt nhau. Vậy EP song song với DC. Đoạn thẳng ngắn hơn cũng được, vì nó nằm trên đường thẳng AB.",
      }),
      dungSai({
        id: "ds-ae-gh",
        prompt: "Đúng hay sai? Đoạn thẳng AE song song với đoạn thẳng GH.",
        answer: false,
        hint: "AE nằm ngang hay thẳng đứng? GH thì sao?",
        explanation: "AE nằm trên AB, nằm ngang. GH đi thẳng lên từ H, vuông góc với AB. Vậy AE và GH vuông góc với nhau, không song song.",
      }),
      dungSai({
        id: "ds-vuong-goc-sai",
        prompt: "Đúng hay sai? Đoạn thẳng NM vuông góc với đoạn thẳng NP.",
        answer: false,
        hint: "Đặt đỉnh góc vuông của ê ke vào điểm N. Cạnh NP có trùng với cạnh ê ke không?",
        explanation: "NM vuông góc với AB tại M. Nhưng NP nghiêng sang bên, nên góc tại N giữa NM và NP không phải góc vuông. Vậy NM không vuông góc với NP.",
      }),
      dungSai({
        id: "ds-gh-ab",
        prompt: "Đúng hay sai? Đoạn thẳng GH vuông góc với đoạn thẳng AB.",
        answer: true,
        hint: "GH có đi thẳng xuống AB không? Dùng ê ke đặt vào điểm H.",
        explanation: "GH đi thẳng xuống từ G và gặp AB tại H, tạo thành góc vuông. Vậy GH vuông góc với AB.",
      }),
      dungSai({
        id: "ds-gh-nm",
        prompt: "Đúng hay sai? Đoạn thẳng GH song song với đoạn thẳng NM.",
        answer: true,
        hint: "Cả hai đoạn đi thẳng lên hay có đoạn nào nghiêng? Chúng cách nhau mấy ô ở trên và ở dưới?",
        explanation: "GH và NM đều thẳng đứng, cách nhau 1 ô ở mọi chỗ, kéo dài mãi không cắt nhau. Vậy GH song song với NM.",
      }),
      {
        id: "thang",
        kind: "trac-nghiem",
        prompt: "Hai bậc thang a và b là hai đoạn thẳng song song. Em dự đoán xem chúng có cùng độ dài không, rồi dùng thước kiểm tra lại.",
        options: ["Không, bậc b (phía dưới) dài hơn bậc a", "Có, vì chúng song song", "Không, bậc a (phía trên) dài hơn bậc b"],
        answerIndex: 0,
        illustration: createElement(Thang),
        hint: "Nhìn hai thanh bên của cái thang: chúng xa nhau hơn ở trên hay ở dưới? Đo bằng thước hai bậc a và b.",
        explanation: "Hai thanh bên xa nhau dần khi đi xuống, nên bậc b ở phía dưới dài hơn bậc a. Hai đoạn thẳng song song không nhất thiết bằng nhau.",
      },
      {
        id: "ao-anh",
        kind: "trac-nghiem",
        prompt: "Hai đường màu đỏ trong hình có phải là hai đường thẳng song song hay không?",
        options: ["Có, hai đường màu đỏ song song với nhau", "Không, hai đường màu đỏ cong ra ở giữa"],
        answerIndex: 0,
        illustration: createElement(AoAnh),
        hint: "Đặt thước kẻ dọc theo một đường đỏ: đường đó có cong không? Thử đo khoảng cách giữa hai đường đỏ ở giữa và ở hai đầu.",
        explanation: "Hai đường đỏ đều là đường thẳng nằm ngang, khoảng cách giữa chúng không đổi. Các đường đen ở sau làm mắt nhìn tưởng chúng cong. Vì vậy hai đường đỏ song song với nhau.",
      },
    ],
  },
  {
    id: "hinh-cat-ghep",
    title: "Hình bình hành, hình thoi và cắt ghép",
    questions: [
      {
        id: "que-thoi-1",
        kind: "trac-nghiem",
        prompt: "Xếp một hình thoi bằng các que tính cùng độ dài. Cần ít nhất mấy que tính?",
        options: ["3 que", "4 que", "5 que", "6 que"],
        answerIndex: 1,
        hint: "Hình thoi có bốn cạnh bằng nhau. Mỗi cạnh là một que.",
        explanation: "Hình thoi có bốn cạnh bằng nhau, mỗi cạnh dùng một que tính, nên cần 4 que.",
      },
      {
        id: "que-thoi-2",
        kind: "trac-nghiem",
        prompt: "Xếp hai hình thoi chung một cạnh bằng các que tính cùng độ dài (như hình). Cần ít nhất mấy que tính?",
        options: ["6 que", "7 que", "8 que", "9 que"],
        answerIndex: 1,
        illustration: createElement(QueThoi),
        hint: "Hình thoi thứ hai dùng lại một que của hình thoi thứ nhất.",
        explanation: "Hình thoi thứ nhất cần 4 que. Hình thoi thứ hai dùng lại que chung, chỉ cần thêm 3 que. Tất cả là 4 + 3 = 7 que.",
      },
      {
        id: "que-thoi-3",
        kind: "dien-so",
        prompt: "Xếp ba hình thoi rời nhau, mỗi hình thoi dùng 4 que tính.",
        parts: ["Cần tất cả", { answer: 12 }, "que tính."],
        hint: "Mỗi hình thoi dùng 4 que, có 3 hình thoi.",
        explanation: "Mỗi hình thoi 4 que, ba hình thoi là 4 × 3 = 12 que.",
      },
      {
        id: "vuong-cheo",
        kind: "trac-nghiem",
        prompt: "Cắt hình vuông ABCD theo đường chéo AC (như hình). Em được hai hình gì?",
        options: ["Hai hình tam giác bằng nhau", "Hai hình chữ nhật bằng nhau", "Hai hình bình hành bằng nhau"],
        answerIndex: 0,
        illustration: createElement(VuongCheo),
        hint: "Đường chéo AC đi từ góc A đến góc C. Hai phần hai bên đường chéo có mấy cạnh?",
        explanation: "Mỗi phần có ba cạnh nên là hình tam giác, và hai phần giống hệt nhau. Con cắt giấy rồi thử ghép hai hình này: ghép được hình bình hành hoặc một hình tam giác lớn hơn.",
      },
    ],
  },
  {
    id: "quan-sat-suy-luan",
    title: "Quan sát và suy luận",
    questions: [
      {
        id: "xep-lop",
        kind: "trac-nghiem",
        prompt:
          "Mi có 4 miếng dán: hình tròn, hình thoi, hình tam giác, hình chữ nhật. Mi dán hình thoi sau khi dán hình chữ nhật và trước khi dán hình tam giác. Hình nào dưới đây là sản phẩm của Mi?",
        options: ["Hình A", "Hình B", "Hình C", "Hình D"],
        answerIndex: 3,
        illustration: createElement(BonCachDan, { options: cachDan }),
        hint: "Miếng dán sau thì nằm trên miếng dán trước. Nhìn chỗ hình thoi chồng với hình chữ nhật, và chỗ hình thoi chồng với hình tam giác.",
        explanation: "Hình thoi dán sau hình chữ nhật nên nằm trên hình chữ nhật. Hình thoi dán trước hình tam giác nên nằm dưới hình tam giác. Chỉ hình D đúng ở cả hai chỗ.",
      },
      {
        id: "nguoi-que",
        kind: "trac-nghiem",
        prompt: "Tìm hình thích hợp để đặt vào ô có dấu \"?\".",
        options: ["Hình A", "Hình B", "Hình C", "Hình D"],
        answerIndex: 2,
        illustration: createElement(BangNguoiQue),
        hint: "Nhìn hàng cuối và cột cuối: đã có những kiểu đầu nào, những kiểu thân nào? Hình còn thiếu là hình chưa xuất hiện ở hàng và cột đó.",
        explanation: "Ở hàng cuối đã có đầu hình bình hành, đầu hình tròn, thân tay chữ T và thân chân hình bàn. Còn thiếu đầu hình thoi và thân chân chữ V. Cột cuối cũng thiếu đúng hai thứ đó. Hình C có đầu hình thoi và chân chữ V.",
      },
      {
        id: "dong-ho-vuong",
        kind: "dien-so",
        prompt: "Lúc 3 giờ, kim giờ và kim phút của đồng hồ vuông góc với nhau. Hãy tìm một giờ khác (từ 1 giờ đến 12 giờ) mà hai kim cũng vuông góc với nhau.",
        parts: ["Lúc", { answer: 9 }, "giờ, hai kim vuông góc với nhau."],
        illustration: createElement(DongHo, { hour: 3 }),
        hint: "Lúc giờ tròn, kim phút chỉ số 12. Kim giờ chỉ số mấy thì cách số 12 ba số, nhưng ở phía bên kia?",
        explanation: "Lúc 9 giờ, kim phút chỉ số 12 và kim giờ chỉ số 9. Từ số 9 đến số 12 là 3 số, một phần tư vòng, nên hai kim tạo góc vuông.",
      },
      {
        id: "dong-ho-bet",
        kind: "trac-nghiem",
        prompt: "Lúc 6 giờ, kim giờ và kim phút của đồng hồ tạo thành góc gì?",
        options: ["Góc vuông", "Góc bẹt", "Góc nhọn"],
        answerIndex: 1,
        illustration: createElement(DongHo, { hour: 6 }),
        hint: "Kim phút chỉ số 12, kim giờ chỉ số 6. Hai kim có nằm trên cùng một đường thẳng không?",
        explanation: "Lúc 6 giờ, hai kim nằm trên cùng một đường thẳng, về hai phía của tâm đồng hồ. Đó là góc bẹt.",
      },
    ],
  },
  {
    id: "suy-nghi",
    title: "Suy nghĩ thêm",
    questions: [
      {
        id: "sn-loi-sai",
        kind: "trac-nghiem",
        prompt: "Mai nói: \"Hai đoạn thẳng song song thì dài bằng nhau.\" Mai nói đúng hay sai?",
        options: [
          "Sai, như hai bậc thang song song nhưng bậc dưới dài hơn bậc trên",
          "Đúng, vì song song thì dài bằng nhau",
          "Sai, vì hai đoạn thẳng song song thì cắt nhau",
        ],
        answerIndex: 0,
        hint: "Nhớ cái thang ở bài trước: hai bậc có song song không? Có bằng nhau không?",
        explanation: "Song song chỉ nói hai đường thẳng không bao giờ cắt nhau, không nói gì về độ dài. Hai bậc thang song song nhưng không bằng nhau.",
      },
      {
        id: "sn-do-mat",
        kind: "trac-nghiem",
        prompt: "Vì sao khi kiểm tra hai đường thẳng có song song hay vuông góc, em nên dùng thước và ê ke?",
        options: ["Vì mắt nhìn có thể bị đánh lừa, như ở hình hai đường đỏ", "Vì hai đường thẳng song song luôn dài bằng nhau", "Vì ê ke dùng để vẽ đường cong"],
        answerIndex: 0,
        hint: "Nhớ hình hai đường đỏ: nhìn thì cong, kiểm tra lại thì thế nào?",
        explanation: "Hình ảo ảnh cho thấy mắt có thể nhìn nhầm. Dùng thước và ê ke thì cho kết quả chắc chắn.",
      },
      {
        id: "sn-duy-nhat",
        kind: "dien-so",
        prompt: "Cho đường thẳng AB và điểm H nằm ngoài AB. Dùng ê ke vẽ đường thẳng đi qua H và vuông góc với AB.",
        parts: ["Em vẽ được", { answer: 1 }, "đường thẳng như vậy."],
        hint: "Thử vẽ lần thứ hai. Đường mới có trùng với đường cũ không?",
        explanation: "Qua H chỉ có một đường thẳng vuông góc với AB. Vẽ lần nữa thì được đúng đường cũ.",
      },
    ],
  },
];
