function inGame(gamesCollection, userid)
{
    var game = gamesCollection.findOne({$or : [{host : {userid : userid}},{challenger : {userid : userid}}]});

    if(game)
    {
        return true;
    }
    else
    {
        return false;
    }

}

module.exports.inGame = inGame;