import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Scoreboard({ players, landStatus }) {
  // 团队颜色映射
  const teamColors = {
    'Team 1': 'rgba(255, 0, 0, 0.8)', 
    'Team 2': 'rgba(0, 255, 0, 0.8)',   
    'Team 3': 'rgba(0, 0, 255, 0.8)',
    'Team 4': 'rgba(255, 255, 0, 0.8)',
    'Team 5': 'rgba(128, 0, 128, 0.8)',  // 半透明的紫色
    'Team 6': 'rgba(255, 165, 0, 0.8)'   // 半透明的橙色
  };

  // 计算每个玩家在所有土地上 wine 的累加
  const calculateTotalWine = (playerId) => {
    return Object.values(landStatus).reduce((total, land) => {
      return land.owner === playerId ? total + land.wine : total;
    }, 0);
  };

  return (
    <div>
      <h2>Scoreboard</h2>
      {players.map((player) => (
        <Card
          key={player.id}
          sx={{
            marginBottom: 2,
            backgroundColor: teamColors[player.name],
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
