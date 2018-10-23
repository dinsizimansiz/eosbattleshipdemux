function destroyGame(state,payload,blockInfo,context) {
    var host = payload.data.host;
    var challenger = payload.data.challenger;
    context.socket.emit("destroyGame",{host,challenger});

}

module.exports = destroyGame;