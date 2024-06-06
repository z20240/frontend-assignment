const express = require('express');
const app = express();
const port = 3000;

// 使用 require 直接读取和解析 data.json 文件
const mockData = require('./data.json');

app.get('/monthly-report/:month', (req, res) => {
  const { month } = req.params;
  const { partner_codes, game_ids } = req.query;

  if (!month) {
    return res.status(400).json({ status: 'error', message: 'Month is required' });
  }

  const dataForMonth = mockData[month];

  if (!dataForMonth) {
    return res.status(404).json({ status: 'error', message: 'Data for the specified month not found' });
  }

  let filteredData = dataForMonth;

  if (partner_codes) {
    const partnerCodesArray = partner_codes.split(',');
    filteredData = filteredData.filter(item => partnerCodesArray.includes(item.PartnerCode));
  }

  if (game_ids) {
    const gameIdsArray = game_ids.split(',');
    filteredData = filteredData.filter(item => gameIdsArray.includes(item.GameID));
  }

  res.json({
    data: filteredData,
    status: 'ok'
  });
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
