const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors);
const server = http.createServer(app);

const chatRoomServers = new Map();

function createChatRoomServer() {
  const chatRoomWss = new WebSocket.Server({ noServer: true });
  const clients = new Set();

  chatRoomWss.on('connection', (ws) => {
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

  return chatRoomWss;
}

app.use(express.json());

app.get('/chat-rooms', (req, res) => {
  const chatRooms = Array.from(chatRoomServers, ([name]) => ({ name }));
  res.status(200).json(chatRooms);
});

app.post('/create-chat-room', (req, res) => {
  const { name, password } = req.body;

  if (chatRoomServers.has(name)) {
    res.status(400).json({ message: 'Chat room already exists' });
    return;
  }

  const chatRoomWss = createChatRoomServer();
  chatRoomServers.set(name, {wss: chatRoomWss, password});

  res.status(200).json({name});
});

server.on('upgrade', (request, socket, head) => {
  const { name, password } = request.body;
  const chatRoom = chatRoomServers.get(name);
  const chatRoomWss = chatRoom.wss;
  const chatRoomPassword = chatRoom.password;

  if (chatRoomWss && password === chatRoomPassword) {
    chatRoomWss.handleUpgrade(request, socket, head, (ws) => {
      chatRoomWss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
