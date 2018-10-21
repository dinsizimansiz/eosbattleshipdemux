var {MongoClient} = require("mongodb");


var connection = null;
const URL = process.env.MONGODB_URL;

get = () => {
    if(!connection)
    {
        var mongoClient = MongoClient(URL);
        connection =  mongoClient.db("battleship");

    }
    return connection;
};

module.exports = get;