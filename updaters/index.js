const game = require("./game");

var contractName = "battleship";

module.exports = [
    {
        actionType : "${contractName}::creategame",
        updater : game.createGame
    },
    {
        actionType : "${contractName}::destroygame",
        updater : game.destroyGame
    },
    {
        actionType : "${contractName}::getready",
        updater : game.getReady
    },
    {
        actionType : "${contractName}::getUnready",
        updater : game.getUnready
    },
    {
        actionType : "${contractName}::makeMove",
        updater : game.makeMove
    },
    {
        actionType : "${contractName}::placeShip",
        updater : game.placeShip
    },
    {
        actionType : "${contractName}::removeShip",
        updater : game.removeShip
    },
    {
        actionType : "${contractName}::winner",
        updater : game.winner
    }
];