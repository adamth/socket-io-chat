const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Client = require('./src/js/client');
const Clients = require('./src/js/clients');
const Message = require('./src/js/message');

app.use('/', express.static(__dirname + '/dist'));

let msgHistory = [];
const clients = new Clients();
const addMsg = (msg) => {
    // If the message history is greater than 100 messages, start dropping old messages
    if (msgHistory.length > 100) {
        msgHistory = msgHistory.slice(1, msgHistory.length + 1);
        msgHistory.push(msg);
    } else {
    // Otherwise just add the new message
        msgHistory.push(msg);
    }
}; 

io.on('connection', (socket) => {
    clients.add(new Client(socket.id));
    io.send();
    io.to(socket.id).emit('msg history', msgHistory);
    socket.on('disconnect', () => {
        clients.remove(socket.id);
        console.log('User diconnected');
    });

    socket.on('chat message', (msg) => {
        const newMessage = new Message(msg, clients.getName(socket.id))
        addMsg(newMessage);
        io.emit('chat message', newMessage);
    });

    socket.on('set name', (name) => {
        clients.getUser(socket.id).setName(name);
    });
});

http.listen(3000, () => {
    console.log('Server is up on port 3000.');
});
