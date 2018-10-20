function getOpponent(game , userid)
{
    if(game.challenger.userid === userid)
    {
        return game.host;
    }
    else
    {
        return game.challenger;
    }

}


module.exports = getOpponent;