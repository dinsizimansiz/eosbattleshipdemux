function gameFinished(enemyTable)
{
    let shipChars = ["1","2","3","4","5"];
    var counter = 0;
    enemyTable.forEach(function(item){
        if(shipChars.includes(item))
        {
            counter++;
        }
    });
    return counter === 17;
}

module.exports = gameFinished;