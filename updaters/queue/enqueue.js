import {createGame,inGame} from "dbfunctions";

async function enqueue(state,payload,blockInfo,context)
{
    const queue = state.queue;
    const games = state.games;
    try
    {
        const userid = payload.data.player;
        let player = queue.findOne({userid : userid});
        var hostid;
        var challengerid;

        if(!player && inGame(games,userid)) {

            await queue.insertOne({userid: userid});

            await queue.find({}).toArray(function (err, docs) {



                if (docs.length === 2) {
                    hostid = docs[0].userid;
                    challengerid = docs[1].userid;
                }

            });

            await queue.remove({$or :[{userid : hostid},{userid:challengerid}]});


        }

    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = enqueue;