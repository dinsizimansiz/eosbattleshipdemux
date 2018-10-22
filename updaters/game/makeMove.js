const {getOpponent,getUser,updateGame,isTurn,convertToIndex,inTable,gameFinished} = require("utils");
const {destroyGame} = require("dbfunctions");

async function makeMove(state,payload,blockInfo,context)
{

    var userid = payload.data.player;
    var x = payload.data.x;
    var y = payload.data.y;
    var games = state.games;
    try {
        var game = await games.findOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]});
        var user = getUser(game, userid);
        if (isTurn(game, user)) {
            let {playerTable} = getOpponent(game, userid);
            let res = _makeMove(user.enemyTable, playerTable, x, y);

            var moveMade = res.done;
            user.enemyTable = res.enemyTable;
        }

        if (moveMade) {
            game = updateGame(game, userid, user);
            game.round += 1;
            await games.updateOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]}, game);

        }
    }
    catch(err)
    {
        console.error(err);
    }
}

_makeMove = function(enemyTable,playerTable,x,y){

    if(enemyTable[convertToIndex(x,y)] !== "X" || !inTable(x,y))
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