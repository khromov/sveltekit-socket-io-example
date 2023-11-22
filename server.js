import { handler } from './build/handler.js';
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const io = new Server();

io.on('connection', (socket) => {
    console.log('a user connected');
    /* If you uncomment this clients will be able to send messages directly */
    /*
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    */
});



const app = express();
const httpServer = http.createServer(app);
io.attach(httpServer);

app.use((req, res, next) => {
    req.locals = {
        io
    }
    next();
})

app.use(handler);

httpServer.listen(3000, () => {
    console.log('listening on port 3000');
});
