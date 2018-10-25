const {getUser,updateGame} = require("../../utils");

async function getUnready(state,payload,blockInfo,context)
{
    var userid = payload.data.player;
    var client = state.client;
    try {
        client.then((mongoClient) =>{

            let games = mongoClient.db("battleship").collection("games");
            games.findOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]}).then((game) =>{
                if(game.started)
                {
                    return;
                }
                var user = getUser(game,userid);
                user.ready = false;
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

module.exports = getUnready;