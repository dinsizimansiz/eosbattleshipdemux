const {inGame} = require("../../dbfunctions");
const {updateGame,getUser,getCoords,shipGetter,convertToIndex} = require("../../utils");

async function placeShip(state, payload, blockInfo, context)
{

    const games = state.games;
    const userid = payload.data.player;
    if(inGame(games,))

    var shipName = payload.data.shipname;
    var x = payload.data.x;
    var y = payload.data.y;
    var direction = payload.data.direction;

    try {
        var game = await games.findOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]});
        var user = getUser(game, userid);
        user.playerTable = _placeShip(user.playerTable, shipName, x, y, direction);
        game = updateGame(game,userid,user);
        await games.updateOne({_id : game._id},game);
    }
    catch(err)
    {
        console.error(err);
    }
}

_placeShip = (playerTable,shipName,x,y,direction) =>
{
    let {shipChar} = shipGetter(shipName);
    let coords = getCoords(shipName,x,y,direction);
    if(!coords)
    {
        return playerTable;
    }
    else
    {
        playerTable.forEach(function(item)
        {
            if(item === shipChar)
            {
                return playerTable;
            }
        });

        coords.forEach(function(item) {
           index = convertToIndex(item[0],item[1]);
           playerTable[index] = shipChar;
        });
        return playerTable;
    }

};

module.exports = placeShip;