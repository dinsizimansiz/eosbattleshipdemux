const {canBeReady,getUser,updateGame} = require("../../utils");

async function getReady(state,payload,blockInfo,context)
{
    var userid = payload.data.player;
    var client = state.client;
    try {
        client.then((mongoClient) => {

            let games = mongoClient.db("battleship").collection("games");
            games.findOne({$or: [{"host.userid" :userid}, {"challenger.userid": userid}]}).then((game) => {
                if(game.started)
                {
                    return;
                }
                let user = getUser(game, userid);
                if (canBeReady(game, user))
                {
                    user.ready = true;
                }
                game = updateGame(game,userid,user);
                if(game.host.ready && game.challenger.ready)
                {
                    game.started = true;
                }
                games.updateOne({$or: [{"host.userid": userid}, {"challenger.userid": userid}]}, {$set:game});
            });



        });
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = getReady;