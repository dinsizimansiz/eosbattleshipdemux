function createGame(state,payload,blockInfo,context)
{
    let host = payload.data.host;
    let challenger = payload.data.challenger;
    context.socket.emit("createGame",{host,challenger});
}

module.exports = createGame;