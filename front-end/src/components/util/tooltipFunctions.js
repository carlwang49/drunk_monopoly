// Function to get tooltip content for a land
export const getTooltipContent = (landKey, landStatus) => {
    const [q, r] = landKey.split(',').map(value => parseInt(value, 10));
    const land = landStatus[landKey];
  
    // 檢查是否為特殊點，如果是，顯示 "shot" 和座標位置
    if (
      (q === 1 && r === -6) ||
      (q === -5 && r === -1) ||
      (q === -6 && r === 5) ||
      (q === -1 && r === 6) ||
      (q === 5 && r === 1) ||
      (q === 6 && r === -5)
    ) {
      return `Shot, Coordinates: q=${q}, r=${r}`;
    } else if (
      (q === 6 && r === -6) ||
      (q === 3 && r === -6) ||
      (q === -6 && r === 1) ||
      (q === -6 && r === 6) ||
      (q === -3 && r === 6) ||
      (q === 6 && r === 0)
    ) {
      return `Chance, Coordinates: q=${q}, r=${r}`;
    } else if (
      (q === 4 && r === -6) ||
      (q === -3 && r === 3) ||
      (q === -6 && r === 3) ||
      (q === -4 && r === 6) ||
      (q === 3 && r === 3) ||
      (q === 6 && r === -3)||
      (q === -3 && r === -3)
    ) {
      return `destiny, Coordinates: q=${q}, r=${r}`; 
    } else if (q === 0 && r === -6) {
      return `Jail, Coordinates: q=${q}, r=${r}`; 
    }
  
    // 如果不是特殊點，繼續判斷 land 是否存在
    if (!land) {
      return `Unclaimed Land, Coordinates: q=${q}, r=${r}`;
    }
  
    return `Team: ${land.owner}, Wine: ${land.wine}, Coordinates: q=${q}, r=${r}`;
  };