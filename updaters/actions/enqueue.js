const {emptyEnemyTable} = require("utils/initalizers");
const {emptyPlayerTable} = require("utils/initalizers");


async function enqueue(state ,payload,blockInfo,context)
{
    const User = state.user;
    const Game = state.game;
    try
    {
        let user = Queue.find({
            userid : payload.data.player
        }).exec();

        let hostGame = Game.find({
            host : {userid : payload.data.player }
        }).exec();

        let challengerGame = Game.find({
            challenger : {userid : payload.data.player}
        }).exec();




        if(user.length != 0 || hostGame.length || challengerGame.length)
        {
            return;
        }


        user = new User({

            userid : payload.data.player,
            ready : false,
            playertable : emptyPlayerTable,
            enemytable : emptyEnemyTable
        });

        await user.save();
    }
    catch(err)
    {
        console.error(err);
    }
}
