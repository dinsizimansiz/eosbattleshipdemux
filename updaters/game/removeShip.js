const {getUser,shipGetter,updateGame} = require("../../utils");

async function removeShip(state, payload, blockInfo, context)
{
    var userid = payload.data.player;
    var shipName = payload.data.shipname;
    var client = state.client;

    try
    {
        client.then((mongoClient) => {

            let games = mongoClient.db("battleship").collection("games");

            games.findOne({$or: [{"host.userid":  userid}, {"challenger.userid" :userid}]}).then((game) => {
                let user = getUser(game, userid);
                user.playerTable = _removeShip(user.playerTable, shipName);
                game = updateGame(game,userid,user);
                games.updateOne({$or: [{"host.userid": userid}, {"challenger.userid": userid}]},{$set:game});
            });
        });
    }


    catch(err)
    {
        console.error(err);
    }
}


_removeShip = function(playerTable, shipName) {

    let {shipChar} = shipGetter(shipName);
    playerTable.forEach(function(item,index,arr) {
        if(item === shipChar)
        {
            arr[index] = "0";
        }
    });
    return playerTable;
};


module.exports = removeShip;