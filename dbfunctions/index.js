const {getUser} = require("../utils/getUser");
const {inGame} = require("./inGame");
const {createGame} = require("./createGame");




module.exports = {
    getUserId: getUser,
    inGame,
    createGame,
    destroyGame
};