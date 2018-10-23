const createGame = require("./createGame");
const destroyGame = require("./destroyGame");
const getReady = require("./getReady");
const getUnready = require("./getUnready");
const makeMove = require("./makeMove");
const placeShip = require("./placeShip");
const removeShip = require("./removeShip");
const winner = require("./winner");

module.exports = {
    createGame,
    getReady,
    getUnready,
    makeMove,
    placeShip,
    removeShip,
    destroyGame,
    winner
};
