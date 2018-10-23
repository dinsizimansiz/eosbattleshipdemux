const createGame = require("createGame");
const destroyGame = require("destroyGame");

var contractName = "battleship";


module.exports = [
    {
        actionType : "${contractName}::creategame",
        effect : createGame
    },
    {
        actionType : "${contractName}::destroygame",
        effect : destroyGame
    }
];