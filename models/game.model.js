const mongoose = require("mongoose");
const {Schema} = mongoose;
const {User} = require("../user.model.js");
let Game = null;

try{
    const GameSchema = new Schema({
        gameid : String,
        host : {type:Schema.Types.ObjectId, ref:"User"},
        challenger : {type:Schema.Types.ObjectId, ref:"User"},
        started : Boolean,
        round : Integer
    });

    Game = mongoose.model("Game",GameSchema);
}catch(e)
{
    Game = mongoose.model("Game");
}

module.exports = Game;