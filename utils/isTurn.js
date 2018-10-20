function isTurn(game,user)
{
    if(game.host.userid === user.userid && game.round % 2)
    {
        return true;
    }
    else return game.challenger.userid === user.userid && game.round % 2 === 0;
}

module.exports = isTurn;