const {AbstractActionHandler} = require("demux");
const io = require("./utils/io");
const {MongoClient} = require("mongodb");

class ActionHandler extends AbstractActionHandler
{
    constructor(updaters,effects) {


        super(updaters,effects);
        this.client = MongoClient("mongodb://localhost:27017").connect()

    }

    async handleWithState(handle)
    {
        const context = {socket : io.getSocket()};
        const state = {
            client : this.client
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
            this.client.then((mongoClient) =>{
                let blockState = mongoClient.db("battleship").collection("blockState");
                blockState.update({}, {
                    blockNumber : blockInfo.blockNumber,
                    blockHash : blockInfo.blockHash,
                    isReplay
                },{upsert:true});
            });


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
            var indexState ;

            this.client.then((mongoClient) => {
               mongoClient.db("battleship").collection("blockState").findOne({}).then();
            });

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

