const {canBeReady} = require("../../utils");

async function getReady(state,payload,blockInfo,context)
{
    var userid = payload.data.player;
    var games = state.games;
    try {
        var game = await games.findOne({$or: [{"host.userid": userid}, {"challenger.userid": userid}]});
        var user = getUser(game, userid);
        if (canBeReady(game, user)) {
            user.ready = true;
        }
        game = updateGame(game,userid,user);
        await games.updateOne({$or: [{"host.userid": userid}, {"challenger.userid": userid}]},game);
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = getReady;