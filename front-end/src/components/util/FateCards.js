// FateCards.js
const FateCards = [
    // 卡門叫你喝你就喝
    { id: 1, type: "commandDrink", content: "卡門叫你喝你就喝 !!", description: "卡門指定一個人喝 2 杯", times: 5 },
    // 指定隊伍喝三杯
    { id: 2, type: "teamDrink", content: "請指定某一個隊伍喝 3 杯", description: "", times: 3 },
    // 兩杯豁免權
    { id: 3, type: "immunity", content: "恭喜各位～獲得 2 杯豁免權 !!", description: "請主持人發放豁免卡 2 張", times: 3 },
    // 強奪土地
    { id: 4, type: "landGrab", content: "強奪土地", description: "請指定搶某一隊伍的土地", times: 3 },
    // 全部人喝一杯
    { id: 5, type: "everyoneDrink", content: "全部人喝 1 杯 ><", times: 3 },
    // 全面漲價
    { id: 6, type: "priceHike", content: "恭喜各位，您的土地全面漲價 !!", description: "自己土地的過路費全部加 1 杯", times: 2 },
    // 窮人稅
    { id: 7, type: "poorTax", content: "可憐啊～給窮人課點稅～", description: "請主持人計算積分最少的隊伍喝 3 杯", times: 6 }
  ];
  
  const generateFateCards = () => {
    let cards = [];
    FateCards.forEach(card => {
      for (let i = 0; i < card.times; i++) {
        cards.push({ ...card, id: `${card.id}-${i}` });
      }
    });
    return cards;
  };
  
  export default generateFateCards();
  