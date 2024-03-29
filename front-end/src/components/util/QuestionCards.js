const QuestionCards = [
  // 二選一 (10题)
  // {
  //   id: 1,
  //   type: "binary",
  //   content: "卡門最近一次染的頭髮是什麼顏色？",
  //   options: ["(A) 金色", "(B) 灰色"],
  //   image: [],
  //   answer: 0
  // },
  {
    id: 2,
    type: "binary",
    content: "卡門第一次出國是去那裡？",
    options: ["(A) 日本", "(B) 澳洲"],
    image: ["/imgs/image2a.jpg", "/imgs/image2b.jpg"],
    answer: 1
  },
  // {
  //   id: 3,
  //   type: "binary",
  //   content: "卡門最喜歡的韓劇？",
  //   options: ["(A) 太陽的後裔", "(B) 鬼怪"],
  //   image: ["/imgs/image3a.jpg", "/imgs/image3b.jpg"],
  //   answer: 1
  // },
  {
    id: 4,
    type: "binary",
    content: "卡門最喜歡的汽車品牌？",
    options: ["(A) Mini Cooper", "(B) Volkswagen"],
    image: ["/imgs/image4a.jpg", "/imgs/image4b.jpg"],
    answer: 0
  },
  {
    id: 5,
    type: "binary",
    content: "卡門玩過哪個手遊？",
    options: ["(A) 傳說對決", "(B) 賽馬娘"],
    image: ["/imgs/image5a.jpg", "/imgs/image5b.jpg"],
    answer: 1
  },
  {
    id: 6,
    type: "binary",
    content: "卡門的慣用手？",
    options: ["(A) 右手", "(B) 左手"],
    image: ["/imgs/image6a.jpg", "/imgs/image6b.jpg"],
    answer: 0
  },
  {
    id: 7,
    type: "binary",
    content: "卡門是哪裡人？",
    options: ["(A) 香港", "(B) 澳門"],
    image: ["/imgs/image7a.jpg", "/imgs/image7b.jpg"],
    answer: 1
  },
  {
    id: 8,
    type: "binary",
    content: "卡門喜歡用哪種顏色的原子筆？",
    options: ["(A) 黑色", "(B) 藍色"],
    image: ["/imgs/image8a.jpg", "/imgs/image8b.jpg"],
    answer: 0
  },
  {
    id: 9,
    type: "binary",
    content: "卡門有沒有投過票？",
    options: ["(A) 有", "(B) 沒有"],
    image: ["/imgs/image9a.jpg", "/imgs/image9b.jpg"],
    answer: 1
  },
  {
    id: 10,
    type: "binary",
    content: "卡門洗澡先洗哪個部位？",
    options: ["(A) 頭", "(B) 臉"],
    image: [],
    answer: 0
  },
  // 選擇題 (15题)
  {
    id: 11,
    type: "binary",
    content: "卡門最喜歡的香菸品牌？*抽菸有害健康*",
    options: ["(A) Marlboro萬寶路", "(B) Bohem寶亨", "(C) Mevius七星", "(D) Raison鐵塔貓"],
    image: [
      "/imgs/image11a.jpg",
      "/imgs/image11b.jpg",
      "/imgs/image11c.jpg",
      "/imgs/image11d.jpg",
    ],
    answer: 0
  },
  {
    id: 12,
    type: "choice",
    content: "卡門最喜歡的女歌手？",
    options: ["(A) 丁噹", "(B) 田馥甄", "(C) 張惠妹", "(D) A-Lin"],
    image: [
      "/imgs/image12a.jpg",
      "/imgs/image12b.jpg",
      "/imgs/image12c.jpg",
      "/imgs/image12d.jpg",
    ],
    answer: 0
  },
  // {
  //   id: 13,
  //   type: "choice",
  //   content: "卡門沒有去過下列哪個國家？",
  //   options: ["(A) 捷克", "(B) 羅馬尼亞", "(C) 斯洛伐克", "(D) 匈牙利"],
  //   image: [],
  //   answer: 2
  // },
  {
    id: 14,
    type: "choice",
    content: "卡門姓什麼 (提示: Carmen Wooi) ?",
    options: ["(A) 溫", "(B) 王", "(C) 黃", "(D) 文"],
    image: [],
    answer: 2
  },
  {
    id: 15,
    type: "choice",
    content: "卡門最喜歡的手搖飲？",
    options: ["(A) 大苑子", "(B) 可不可", "(C) 清心", "(D) 麻古"],
    image: [
      "/imgs/image15a.jpg",
      "/imgs/image15b.jpg",
      "/imgs/image15c.jpg",
      "/imgs/image15d.jpg",
    ],
    answer: 1
  },
  // {
  //   id: 16,
  //   type: "choice",
  //   content: "卡門每個月平均花最少錢在？",
  //   options: ["(A) 酒", "(B) 貓咪", "(C) 菸", "(D) 衣服"],
  //   image: [
  //     "/imgs/image16a.jpg",
  //     "/imgs/image16b.jpg",
  //     "/imgs/image16c.jpg",
  //     "/imgs/image16d.jpg",
  //   ],
  //   answer: 3
  // },
  {
    id: 17,
    type: "choice",
    content: "卡門最喜歡的休閒活動？",
    options: ["(A) 睡覺", "(B) 看廢片", "(C) 打桌遊", "(D) 打麻將"],
    image: [],
    answer: 1
  },
  {
    id: 18,
    type: "choice",
    content: "卡門最喜歡的味道？",
    options: ["(A) 酸", "(B) 甜", "(C) 苦", "(D) 鹹"],
    image: [],
    answer: 3
  },
  {
    id: 19,
    type: "choice",
    content: "卡門最喜歡的容器？",
    options: ["(A) 杯子", "(B) 碗", "(C) 鍋子", "(D) 盤子"],
    image: [],
    answer: 0
  },
  {
    id: 20,
    type: "choice",
    content: "卡門最喜歡的美劇？",
    options: ["(A) CSI", "(B) Desperate housewives", "(C) House M.D.", "(D) How I met your mother"],
    image: [
      "/imgs/image20a.jpg",
      "/imgs/image20b.jpg",
      "/imgs/image20c.jpg",
      "/imgs/image20d.jpg",
    ],
    answer: 0
  },
  {
    id: 21,
    type: "choice",
    content: "卡門看的第一部台灣偶像劇？",
    options: ["(A) 公主小妹", "(B) 王子變青蛙", "(C) 流星花園", "(D) 終極一班"],
    image: [
      "/imgs/image21a.jpg",
      "/imgs/image21b.jpg",
      "/imgs/image21c.jpg",
      "/imgs/image21d.jpg",
    ],
    answer: 1
  },
  {
    id: 22,
    type: "choice",
    content: "卡門最喜歡自己臉上哪個部位？",
    options: ["(A) 鼻子", "(B) 眼睛", "(C) 眉毛", "(D) 嘴巴"],
    image: [],
    answer: 1
  },
  // {
  //   id: 23,
  //   type: "choice",
  //   content: "卡門最喜歡哪種家俱？",
  //   options: ["(A) 沙發", "(B) 電視", "(C) 門", "(D) 茶几"],
  //   image: [],
  //   answer: 2
  // },
  {
    id: 24,
    type: "choice",
    content: "卡門什麼時候最常自言自語？",
    options: ["(A) 工作", "(B) 滑手機", "(C) 洗澡", "(D) 騎車"],
    image: [],
    answer: 3
  },
  {
    id: 25,
    type: "choice",
    content: "卡門的口頭禪是？",
    options: ["(A) 想怎樣？就怎樣！", "(B) 到底什麼意思？", "(C) 好笑嗎？", "(D) 都該死"],
    image: [],
    answer: 1
  },
  {
    id: 26,
    type: "open",
    content: "卡門在什麼情況下會覺得很煩？",
    options: ["想睡睡不著", "遇到笨蛋", "騎車", "太吵", "對他說：你懂我意思嗎？"],
    image: [],
  },
  {
    id: 27,
    type: "open",
    content: "卡門火鍋會點甚麼？",
    options: ["牛肉", "茼蒿", "蟹肉棒", "芋頭", "金針菇"],
    image: [],
  },
  {
    id: 28,
    type: "open",
    content: "卡門來台灣之後第一次體驗的事？",
    options: ["洗衣服", "追垃圾車", "去夜店", "搭捷運", "逛夜市"],
    image: [],
  },
  {
    id: 29,
    type: "open",
    content: "卡門的擇偶條件？",
    options: ["戴眼鏡", "會音樂", "好脾氣", "會打籃球", "不笨"],
    image: [],
  },
  {
    id: 30,
    type: "open",
    content: "卡門喝醉會有的舉動？",
    options: ["一直講話", "催酒", "講英文", "哭", "唱歌"],
    image: [],
  },
];

export default QuestionCards;
