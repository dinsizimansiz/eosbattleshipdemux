const game = require("./game");

var contractName = "battleship";

module.exports = [
    {
        actionType : `${contractName}::creategame`,
        updater : game.createGame
    },
    {
        actionType : `${contractName}::destroygame`,
        updater : game.destroyGame
    },
    {
        actionType : `${contractName}::getready`,
        updater : game.getReady
    },
    {
        actionType : `${contractName}::getunready`,
        updater : game.getUnready
    },
    {
        actionType : `${contractName}::makemove`,
        updater : game.makeMove
    },
    {
        actionType : `${contractName}::placeship`,
        updater : game.placeShip
    },
    {
        actionType : `${contractName}::removeship`,
        updater : game.removeShip
    },
    {
        actionType : `${contractName}::winner`,
        updater : game.winner
    }
];