updateGame = (game, userid, newUser) => {
  if(userid === game.challenger.userid)
  {
      game.challenger = newUser;
  }
  else if(userid === game.host.userid )
  {
      game.host = newUser;
  }
  return game;
};

module.exports = updateGame;