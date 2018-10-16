function getUser(game , userid)
{
    if(game.challenger.userid === userid)
    {
        return game.challenger;
    }
    else
    {
        return game.host;
    }

}


module.exports.getUser = getUser;