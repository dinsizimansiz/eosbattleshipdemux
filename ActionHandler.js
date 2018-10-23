const {AbstractActionHandler} = require("demux");
const io = require("./utils/io");
const {MongoClient} = require("mongodb");

class ActionHandler extends AbstractActionHandler
{
    constructor(updaters,effects) {


        super(updaters,effects);
        MongoClient("mongodb://localhost:27017").connect().then((mongoClient) => {
            let _db = mongoClient.db("battleship");
            this.games = _db.collection("games");
            this.blockState = _db.collection("blockState");
        });

    }

    async handleWithState(handle)
    {
        const context = {socket : io.getSocket()};
        const state = {
            block : this.blockState,
            games : this.games,
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

    async updateIndexState(state,block,isReplay,context)
    {
        const {blockInfo} = block;
        try
        {
            await this.blockState.update({}, {
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
            const indexState = this.blockState.findOne({});
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

