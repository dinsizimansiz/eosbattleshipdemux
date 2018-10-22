async function destroyGame(state,payload,blockInfo,context)
{
    var hostid = payload.data.host;
    var challengerid = payload.data.challenger;
    var games = state.games;
    try {
        await games.delete({
            host: {
                userid: hostid
            },
            challenger: {
                userid: challengerid
            }
        });
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = destroyGame;