import io from 'socket.io-client';

const socket = io();

// Parse
const parseMessage = (message) => {
    // If the first char is a / then check to see if it is a valid option
    if (message.slice(0, 1) === '/') {
        // go from the start of the string to the first space
        const arg = message.slice(0, message.indexOf(' '));

        switch (arg) {
            case '/name': {
                console.log('Change name');
                //Set the name to whatever comes after the option
                socket.emit('set name', message.slice(message.indexOf(' ') + 1, message.length));
                break;
            }
            default:
                console.log('Invalid argument');
                break;
        }
    } else {
        socket.emit('chat message', message);
    }
};

// Change name

module.exports = {
    socket,
    parseMessage
};
