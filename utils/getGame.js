function getGame(Game,userid)
{
    let hostGame = Game.find({
        host : {userid : userid}
    }).exec()
    ;
    let challengerGame = Game.find({
        challenger : {userid : userid}
    }).exec();

    if(hostGame.length == 1)
    {
        return hostGame;
    }
    else if(challengerGame.length == 1)
    {
        return challengerGame;
    }
    else
    {
        return [];
    }
}

module.exports.getGame = getGame;