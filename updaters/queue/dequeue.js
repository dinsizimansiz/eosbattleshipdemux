async function dequeue(state,payload,blockInfo,context)
{
    const queue = state.queue;
    const userid = payload.data.player;
    try
    {
        await queue.remove({userid:userid});
    }
    catch(err)
    {
        console.error(err);
    }

}

module.exports = dequeue;