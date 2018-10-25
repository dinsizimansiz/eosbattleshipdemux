const inBoard = require("./inBoard");
const shipGetter = require("./shipGetter");
getCoords = (shipName,x,y,direction) => {

    const ship = shipGetter(shipName);
    const isInBoard = inBoard(x,y);
    if(ship === {} || !isInBoard)
    {
        return [];
    }
    const shipSize = ship.size;
    let retArray = [];
    if(direction === "north" || direction === "n")
    {
        for(i = 0; i < shipSize;i++)
        {
            retArray.push([x,y-i]);
        }
    }
    else if(direction === "east" || direction === "e")
    {
        for(i = 0; i < shipSize;i++)
        {
            retArray.push([x+i,y]);
        }
    }
    else if(direction === "south" || direction === "s")
    {
        for(i = 0; i < shipSize;i++)
        {
            retArray.push([x,y+i]);
        }
    }
    else if(direction === "west" || direction === "w")
    {
        for(i = 0; i < shipSize;i++)
        {
            retArray.push([x-i,y]);
        }
    }
    else
    {
        return [];
    }
    retArray.forEach(function(item,_){
       if(!inBoard(item[0],item[1]))
       {
           return [];
       }
    });

    return retArray;

};


module.exports = getCoords;