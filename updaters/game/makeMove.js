const {getOpponent,getUser,updateGame,isTurn,convertToIndex,inBoard} = require("../../utils");

async function makeMove(state,payload,blockInfo,context)
{

    var userid = payload.data.player;
    var x = payload.data.x;
    var y = payload.data.y;
    var client = state.client;
    try {
        client.then((mongoClient) => {

            let games = mongoClient.db("battleship").collection("games");
            games.findOne({$or: [{"host.userid" :userid}, {"challenger.userid": userid}]}).then((game) => {
                let user = getUser(game, userid);
                if (isTurn(game, user)) {
                    let {playerTable} = getOpponent(game, userid);
                    let res = _makeMove(user.enemyTable, playerTable, x, y);

                    let moveMade = res.done;
                    user.enemyTable = res.enemyTable;
                    if (moveMade) {
                        game = updateGame(game, userid, user);
                        game.round += 1;
                        games.updateOne({$or: [{"host.userid": userid}, {"challenger.userid": userid}]}, {$set:game});
                    }
                }
            });


        });
    }
    catch(err)
    {
        console.error(err);
    }
}

_makeMove = function(enemyTable,playerTable,x,y){

    if(enemyTable[convertToIndex(x,y)] !== "X" || !inBoard(x,y))
    {
        return {done:false,enemyTable:enemyTable};
    }
    else
    {
        enemyTable[index] = playerTable[index];
        return {done:true,enemyTable:enemyTable};
    }
};

module.exports = makeMove;