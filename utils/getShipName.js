getShipName = (cellChar) => {
    if(cellChar === "1")
    {
      return "carrier";
    }
    else if(cellChar === "2")
    {
      return "battleship";
    }
    else if(cellChar === "3")
    {
      return "submarine";
    }
    else if(cellChar === "4")
    {
      return "cruiser";
    }
    else if(cellChar === "5")
    {
        return "destroyer";
    }
};

module.exports = getShipName;