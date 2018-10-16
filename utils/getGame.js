function getGame(db, userid)
{
    var hostGame = db.collection("games").findOne({host: {userid: userid}});
    var challengerGame = db.collection("games").findOne({challenger:{userid:userid}});

    if(hostGame)
    {
        return hostGame;
    }
    else if(challengerGame)
    {
        return challengerGame;
    }
    else
    {
        return null;
    }

}

module.exports.getGame = getGame;