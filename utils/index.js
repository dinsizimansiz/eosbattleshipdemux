const getCoords = require("./getCoords");
const getUser = require("./getUser");
const updateGame = require("./updateGame");
const inBoard = require("./inBoard");
const shipGetter = require("./shipGetter");
const convertToIndex = require("./convertToIndex");
const getOpponent = require("./getOpponent");
const isTurn = require("./isTurn");
const canBeReady = require("./canBeReady");
const {emptyEnemyTable,emptyPlayerTable} = require("emptyTables");
const gameFinished = require("./gameFinished");


module.exports = {
    getCoords,
    getUser,
    updateGame,
    inBoard,
    canBeReady,
    isTurn,
    getOpponent,
    shipGetter,
    convertToIndex,
    emptyPlayerTable,
    emptyEnemyTable,
    gameFinished
};