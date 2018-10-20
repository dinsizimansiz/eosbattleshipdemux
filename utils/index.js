const getCoords = require("./getCoords");
const getUser = require("./getUser");
const updateGame = require("./updateGame");
const inBoard = require("./inBoard");
const shipGetter = require("./shipGetter");
const convertToIndex = require("./convertToIndex");
const getOpponent = require("./getOpponent");
const isTurn = require("./isTurn");



module.exports = {
    getCoords,
    getUser,
    updateGame,
    inBoard,
    isTurn,
    getOpponent,
    shipGetter,
    convertToIndex
};