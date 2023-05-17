const express = require('express');
const http = require('http');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(cors());
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const userNameArray = []; // Tablica użytkowników

let clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      userNameArray.push(parsedMessage);
    } catch (error) {
      console.log('Error parsing data: ', error);
    }
    clients.forEach((client) => {      
      if (client.readyState === WebSocket.OPEN) {
        const response = JSON.stringify({users: userNameArray});
        client.send(response);
      }      
    });
  });

  ws.on('close', () => {
    clients.delete(ws);
  });
});


const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});