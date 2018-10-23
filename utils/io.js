const socketIO = require('socket.io');

let io = null;

const connect = (server) => {
    io = socketIO(server)
    io.settings = {};
};

const getSocket = () => io;

const set = (attribute,value) => {
    io.settings[attribute] = value;
};

const get = (attribute) => {
    return io.settings[attribute];
};

const on = (eventName,callback) => {
    io.on(eventName,callback);
};

module.exports = {
    connect,
    getSocket,
    set,
    get,
    on
};