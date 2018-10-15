const mongoose = require("mongoose");
const {Schema} = mongoose;

let User = null;

try
{
    const UserSchema = new Schema({
        userid : String,
        ready : {type : String, default : false},
        playertable : [String],
        enemytable : [String],

    });
    User = mongoose.model("User",UserSchema);
}catch(err)
{
    User = mongoose.model("User");
}

module.exports = User;
