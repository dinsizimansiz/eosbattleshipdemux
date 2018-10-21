
async function getUnready(state,payload,blockInfo,context)
{
    var userid = payload.data.player;
    var games = state.games;
    try {
        var game = await games.findOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]})
        var user = getUser(game,userid);
        user.ready = false;
        game = updateGame(game,userid,user);
        await games.updateOne({$or: [{host: {userid: userid}}, {challenger: {userid: userid}}]},game);
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = getUnready;