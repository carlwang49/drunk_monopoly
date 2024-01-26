import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Scoreboard({ players, landStatus, currentTurn }) {
  // 团队颜色映射
  const teamColors = {
    1: 'rgba(255, 0, 0, ', // 红色
    2: 'rgba(0, 255, 0, ', // 绿色
    3: 'rgba(0, 0, 255, ', // 蓝色
    4: 'rgba(255, 255, 0, ', // 黄色
    5: 'rgba(128, 0, 128, ', // 紫色
    6: 'rgba(255, 165, 0, ' // 橙色
  };


  // 计算每个玩家在所有土地上 wine 的累加
  const calculateTotalWine = (playerId) => {
    return Object.values(landStatus).reduce((total, land) => {
      return land.owner === playerId ? total + land.wine : total;
    }, 0);
  };

  const getCardBackgroundColor = (playerId) => {
    const isActivePlayer = players[currentTurn] && players[currentTurn].id === playerId;
    const opacity = isActivePlayer ? 1 : 0.2;
    const colorBase = teamColors[playerId] || 'rgba(0,0,0,'; // 默认黑色
    return `${colorBase}${opacity})`;
  };
  

  return (
    <div>
      <h2>Scoreboard</h2>
      {players.map((player) => (
        <Card
          key={player.id}
          sx={{
            marginBottom: 2,
            backgroundColor: getCardBackgroundColor(player.id),
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: 'Comic Sans MS, cursive' }}>
              {player.name}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Total Shot: {calculateTotalWine(player.id)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Scoreboard;
