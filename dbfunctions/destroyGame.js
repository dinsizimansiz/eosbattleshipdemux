const {inGame} = require("./inGame");

function destroyGame(gamesCollection,hostid,challengerid)
{
    gamesCollection.delete({
        host:{
            userid : hostid
        },
        challenger : {
            userid : challengerid
        }
    });
}

module.exports.destroyGame = destroyGame;