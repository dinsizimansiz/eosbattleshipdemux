const {AbstractActionHandler} = require("demux");
const {MongoClient} = require("mongodb");
const io = require("../utils/io");

class ActionHandler extends AbstractActionHandler
{
    constructor(updaters,effecters,uri) {


        super(updaters,effecters);
        var mongoClient = new MongoClient(uri);
        this.battleship = mongoClient.db("battleship");
        this.battleship.createCollection("games" );
        this.battleship.createCollection("block");
        this.battleship.createCollection("users");
        process.on("SIGINT" , () => {
            this.client.close();
            this.client.db("battleship").dropDatabase();
        })
    }

    async handleWithState(handle)
    {
        const context = {socket : io.getSocket()};
        const state = {client : this.client};
        try
        {
            await handle(state,context);
        }
        catch(err)
        {
            console.error(err);
        }
    }

    async updateIndexState(state,block,isReplay)
    {
        const {blockInfo} = block;
        try
        {
            this.battleship.collection("block").update({}, {
                blockNumber : blockInfo.blockNumber,
                blockHash : blockInfo.blockHash,
                isReplay
            },{upsert:true});
        }
        catch(err)
        {
            console.error(err);
        }
    }

    async loadIndexState()
    {
        try
        {
            let blockHash;
            let blockNumber;
            const indexState = this.battleship.collection("block").findOne({});
            if (indexState)
            {
                ({blockHash, blockNumber} = indexState);
            }
            if(blockNumber && blockHash)
            {
                return {blockNumber,blockHash};
            }

            return {blockNumber : 0, blockHash : ""};

        }
        catch(err)
        {
            console.error(err);
        }
    }

}

module.exports = ActionHandler;

