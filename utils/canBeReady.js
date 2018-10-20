canBeReady = (playerTable) =>{

    _remove = function(arr,item){

        return arr.filter(function(ele){
            return ele !== item;
        });

    };

    let includedList = ["1","2","3","4","5"];
    playerTable.forEach(function(item){
       if(includedList.includes(item))
       {
           includedList = _remove(includedList,item);
       }
    });

    return includedList.length === 0;
};

module.exports = canBeReady;