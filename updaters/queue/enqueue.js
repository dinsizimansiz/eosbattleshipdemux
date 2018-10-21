import {createGame,inGame} from "dbfunctions";

async function enqueue(state,payload,blockInfo,context)
{
    const queue = state.queue;
    const games = state.games;
    try
    {
        const userid = payload.data.player;
        let player = queue.findOne({userid : userid});

        if(!player && inGame(games,userid)) {

            await queue.insertOne({userid: userid});
            var players = await queue.find({}).toArray();
            await queue.remove({$or :[{userid : players[0]},{userid:players[1]}]});
        }
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = enqueue;