const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const connectedClients = {};

const wss = new WebSocket.Server({ server: http.createServer(app) }); 

wss.on('connection', (ws, req) => {
  const userId = req.url.split('/')[2];
  connectedClients[userId] = { ws, session: { } };

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { userId, sessionData } = data;


    connectedClients[userId].session = { ...connectedClients[userId].session, ...sessionData };


    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(JSON.stringify({ userId, sessionData }));
      }
    });
  });

  ws.on('close', () => {
    delete connectedClients[userId];
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});


const path = require('path'); 


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});