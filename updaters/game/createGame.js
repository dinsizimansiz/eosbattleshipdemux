const {emptyEnemyTable,emptyPlayerTable} = require("../../utils");
async function createGame(state,payload,blockInfo,context)
{
    try {
        state.client.then((mongoClient) => {
            let _db = mongoClient.db("battleship");
            let hostid = payload.data.host;
            let challengerid = payload.data.challenger;

            let game = {
                started: false,
                round: 0,
                host: {
                    userid: hostid,
                    ready: false,
                    playerTable: emptyPlayerTable,
                    enemyTable: emptyPlayerTable
                },
                challenger: {
                    userid: challengerid,
                    ready: false,
                    playerTable: emptyPlayerTable,
                    enemyTable: emptyEnemyTable
                }
            };
            _db.collection("games").insertOne(game);
        });
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = createGame;