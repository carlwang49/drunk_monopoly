// FateCards.js
const FateCards = [
    // 卡門叫你喝你就喝
    { id: 1, type: "commandDrink", content: "卡門叫你喝你就喝", times: 5 },
    // 指定隊伍喝三杯
    { id: 2, type: "teamDrink", content: "指定隊伍喝三杯", times: 3 },
    // 兩杯豁免權
    { id: 3, type: "immunity", content: "兩杯豁免權", times: 3 },
    // 強奪土地
    { id: 4, type: "landGrab", content: "強奪土地", times: 3 },
    // 全部人喝一杯
    { id: 5, type: "everyoneDrink", content: "全部人喝一杯", times: 3 },
    // 全面漲價
    { id: 6, type: "priceHike", content: "全面漲價", times: 2 },
    // 窮人稅
    { id: 7, type: "poorTax", content: "窮人稅", times: 6 }
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
  