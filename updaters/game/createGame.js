const {emptyEnemyTable,emptyPlayerTable} = require("../../utils");
async function createGame(state,payload,blockInfo,context)
{
    var hostid = payload.data.host;
    var challengerid = payload.data.challenger;
    var games = state.games;
    try
    {
        game = {
            started : false,
            round : 0,
            host : {
                userid : hostid,
                ready : false,
                playerTable : emptyPlayerTable,
                enemyTable : emptyPlayerTable
            },
            challenger : {
                userid : challengerid,
                ready : false,
                playerTable : emptyPlayerTable,
                enemyTable : emptyEnemyTable
            }
        };
        await games.insertOne(game);
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = createGame;