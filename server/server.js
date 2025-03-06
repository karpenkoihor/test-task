const path = require('path');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

function generateRandomOdds() {
  return [
    {
      id: 100010,
      odds: parseFloat((Math.random() * 3 + 1).toFixed(2)),
      description: 'Atlanta Hawks',
    },
    {
      id: 100020,
      odds: parseFloat((Math.random() * 3 + 1).toFixed(2)),
      description: 'Southampton',
    },
  ];
}

function broadcastOdds() {
  const oddsArray = generateRandomOdds();
  const message = JSON.stringify(oddsArray);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client is connected');
  ws.send(JSON.stringify(generateRandomOdds()));
});

setInterval(broadcastOdds, 10000);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP & WS server is running on port ${PORT}`);
});
