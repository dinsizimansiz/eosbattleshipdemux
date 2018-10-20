const inGame = require("./inGame");

async function destroyGame(gamesCollection,hostid,challengerid)
{
    await gamesCollection.delete({
        host:{
            userid : hostid
        },
        challenger : {
            userid : challengerid
        }
    });
}

module.exports = destroyGame;