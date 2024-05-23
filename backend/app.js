// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketIo = require('socket.io');
const { authenticateToken } = require('./auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(bodyParser.json());

const statusRoutes = require('./routes/status');
const logsRoutes = require('./routes/logs');
const historicalRoutes = require('./routes/historical');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes);
app.use('/api/status', authenticateToken, statusRoutes);
app.use('/api/logs', authenticateToken, logsRoutes);
app.use('/api/historical', authenticateToken, historicalRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    // Simulate real-time updates
    setInterval(() => {
        const randomBatteryLevel = Math.floor(Math.random() * 100);
        const randomStatus = ['idle', 'active', 'charging'][Math.floor(Math.random() * 3)];
        socket.emit('statusUpdate', { batteryLevel: randomBatteryLevel, status: randomStatus });
    }, 5000);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
