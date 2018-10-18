shipGetter = (shipName) => {
    if(shipName === "carrier")
    {
        return {size : 5, shipChar : "1"};
    }
    else if(shipName === "battleship")
    {
        return {size : 4, shipChar : "2"};
    }
    else if(shipName === "submarine")
    {
        return {size : 3, shipChar : "3"};
    }
    else if(shipName === "cruiser")
    {
        return {size : 3, shipChar : "4"};
    }
    else if(shipName === "destroyer")
    {
        return {size : 2,shipChar : "5"};
    }
    else
    {
        return {};
    }
};

module.exports = shipGetter;