
async function dequeue(state,payload,blockInfo,context)
{
    const User = state.user;
    try
    {
        let user = User.find({
            userid : payload.data.player
        }).exec();

        if(user.length != 1)
        {
            return;
        }


        User.deleteOne({
           userid: payload.data.palyer
        });

    }
    catch(err)
    {
        console.error(err);
    }

}