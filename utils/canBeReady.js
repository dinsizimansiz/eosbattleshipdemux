canBeReady = (playerTable) =>{

    var appearanceList = ["1","2","3","4","5"];
    var counter = 0;
    playerTable.forEach(function(item){
       if(appearanceList.includes(item))
           counter++;
    });

    return counter === 17;
};

module.exports = canBeReady;