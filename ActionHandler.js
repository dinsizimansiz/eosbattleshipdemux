const {AbstractActionHandler} = require("demux");
const io = require("./utils/io");

class ActionHandler extends AbstractActionHandler
{
    async constructor(updaters,effects,dbConnection) {


        super(updaters,effects);
        this.battleship = dbConnection;
        await this.battleship.createCollection("games" );
        await this.battleship.createCollection("blockState");
        await this.battleship.createCollection("queue");
        await this.battleship.createCollection("availableGameKey");


        process.on("SIGINT" , () => {
            this.battleship.dropDatabase();
        });
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

