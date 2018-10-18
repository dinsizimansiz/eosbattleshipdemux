inBoard = (x,y) => {
    if(x >= 0 && x < 10)
    {
        if(y >= 0 && y < 10)
        {
            return true;
        }
    }
    return false;
};


module.exports = inBoard;