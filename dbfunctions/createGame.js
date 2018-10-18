var {emptyEnemyTable,emptyPlayerTable} = require("./emptyTables");
const {inGame} = require("./inGame");

async function createGame(gamesCollection,hostid , challengerid)
{
    if(!inGame(hostid) || inGame(challengerid))
    {
        return ;
    }
    else
    {
        await gamesCollection.insertOne({
            host : {
                userid : hostid,
                playerTable : emptyPlayerTable,
                enemyTable : emptyEnemyTable,
                ready : false
            },
            challenger : {
                userid : hostid,
                playerTable : emptyPlayerTable,
                enemyTable : emptyEnemyTable,
                ready : false
            },
            round : 0,
            started : 0
        });
    }

}

module.exports.createGame = createGame;