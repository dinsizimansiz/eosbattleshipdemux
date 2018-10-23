const socketIO = require('socket.io');

let io = null;

const connect = (server) => {
    io = socketIO(server)
    io.settings = {};
};

const getSocket = () => io;



module.exports = {
    connect,
    getSocket
};