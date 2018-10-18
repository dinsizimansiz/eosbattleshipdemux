import {createGame,inGame} from "dbfunctions";

async function enqueue(state,payload,blockInfo,context)
{
    const queue = state.queue;
    const games = state.games;
    try
    {
        const userid = payload.data.player;
        let player = queue.findOne({userid : userid});

        if(inGame(games,userid))
        {
            return;
        }

        if(!player) {
            await queue.insertOne({userid: userid});

            await queue.find({}).toArray(function (err, docs) {

                var hostid;
                var challengerid;

                if (docs.length === 2) {
                    hostid = docs[0].userid;
                    challengerid = docs[1].userid;
                }

            });

            await queue.remove({$or :[{userid : hostid},{userid:challengerid}]});

            let games = state.games;

            await createGame(games , hostid, challengerid);
        }

    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = enqueue;