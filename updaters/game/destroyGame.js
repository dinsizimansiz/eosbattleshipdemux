var adapter = require("../../utils/adapter");

async function destroyGame(state,payload,blockInfo,context)
{
    var hostid = payload.data.host;
    var challengerid = payload.data.challenger;
    var client = state.client;

    let keys = Object.keys(adapter.usedAccounts);
    let values = Object.values(adapter.usedAccounts);

    for(var i = 0 ; i < Object.keys; i++){
        try {
            if (values[i].accountName === hostid || values[i].accountName === challengerid) {
                let value = values[i];
                let key = keys[i];
                delete adapter.usedAccounts[key];
                adapter.freeAccounts.push(value);
            }
        }
        catch(_)
        {
        }
    }


    try {
        client.then((mongoClient) =>{
           mongoClient.db("battleship").collection("games").delete({"host.userid":hostid,"challenger.userid":challengerid});
        });
    }
    catch(err)
    {
        console.error(err);
    }
}

module.exports = destroyGame;