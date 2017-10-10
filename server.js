const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

const Client = require('./src/js/client');
const Clients = require('./src/js/clients');
const Message = require('./src/js/message');
const History = require('./src/js/history');

app.use('/', express.static(path.join(__dirname, '/dist')));

const history = new History();
const clients = new Clients();

io.on('connection', (socket) => {
    clients.add(new Client(socket.id));
    io.send();
    io.to(socket.id).emit('msg history', history.messages);
    socket.on('disconnect', () => {
        clients.remove(socket.id);
        console.log('User diconnected');
    });

    socket.on('chat message', (msg) => {
        const newMessage = new Message(msg, clients.getName(socket.id));
        history.add(newMessage);
        io.emit('chat message', newMessage);
    });

    socket.on('set name', (name) => {
        clients.getUser(socket.id).setName(name);
    });
});

http.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
