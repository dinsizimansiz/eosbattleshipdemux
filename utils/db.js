var {MongoClient} = require("mongodb");


const URL = "mongodb://localhost:27017";


get = async () => {
    var games , blockState;
    MongoClient(URL).connect().then((client) => {
       let _db = client.db("battleship");
       games = _db.collection("games");
       blockState = _db.getCollection("blockState");
       return {games,blockState};
    });


};

module.exports = get;