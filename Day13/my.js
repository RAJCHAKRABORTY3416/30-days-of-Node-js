const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get('/websocket', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function setupWebSocket() {
  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`Echo: ${message}`);
        }
      });
    });

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });
}
setupWebSocket();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
