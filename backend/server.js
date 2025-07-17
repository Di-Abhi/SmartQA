require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');            // Add http server
const { Server } = require('socket.io'); // Add socket.io server

const roomRoutes = require('./src/routes/roomRoutes');

const app = express();

// Create HTTP server from Express app
const server = http.createServer(app);

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Make io accessible in routes/controllers via app.set
app.set('io', io);

// Middlewares
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log('Failed to connect to MongoDB: ', error));

app.use('/room', roomRoutes);

// Socket.IO connection events
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('join-room', (roomCode) => {
    socket.join(roomCode);
    console.log(`Socket ${socket.id} joined room ${roomCode}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// Start the server using `server`, not `app`
const PORT = process.env.PORT || 5000;
server.listen(PORT, (error) => {
  if (error) {
    console.log('Server not starting due to: ', error);
  } else {
    console.log(`Server running at port ${PORT}`);
  }
});
