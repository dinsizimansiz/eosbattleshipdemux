const {getUser,shipGetter,updateGame} = require("utils");

async function removeShip(state, payload, blockInfo, context)
{
    var userid = payload.data.player;
    var shipName = payload.data.shipname;
    var games = state.games;

    try
    {
        var game;
        var user;
        var game = await games.findOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]});
        user = getUser(game, userid);
        user.playerTable = _removeShip(user.playerTable, shipName);
        game = updateGame(game,userid,user);
        await games.updateOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]},game);
    }


    catch(err)
    {
        console.error(err);
    }
}


_removeShip = function(playerTable, shipName) {

    var {shipChar} = shipGetter(shipName);
    playerTable.forEach(function(item,index,arr) {
        if(item === shipChar)
        {
            arr[index] = "0";
        }
    });
    return playerTable;
};


module.exports = removeShip;