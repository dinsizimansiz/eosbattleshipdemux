const {AbstractActionHandler} = require("demux");
const {MongoClient} = require("mongodb");
const io = require("./utils/io");

class ActionHandler extends AbstractActionHandler
{
    async constructor(updaters,effects,uri) {


        super(updaters,effects);
        var mongoClient = new MongoClient(uri);

        this.battleship = mongoClient.db("battleship");
        this.battleship.createCollection("games" );
        this.battleship.createCollection("blockState");
        this.battleship.createCollection("queue");
        this.battleship.createCollection("availableGameKey");
        await this.battleship.collection("availableGameKey").update({},
            {
               availableGameKey: 0
            },{upsert:true});

        process.on("SIGINT" , () => {
            this.client.close();
            this.client.db("battleship").dropDatabase();
        })
    }

    async handleWithState(handle)
    {
        const context = {socket : io.getSocket()};
        const state = {
            queue : this.battleship.collection("queue"),
            block : this.battleship.collection("blockState"),
            games : this.battleship.collection("games"),
            availableGameKey : this.battleship.collection("availableGameKey")
        };

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
            await this.battleship.collection("blockState").update({}, {
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
            const indexState = await this.battleship.collection("blockState").findOne({});
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

