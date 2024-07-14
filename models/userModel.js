const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "username is mandatory"]
    },
    password : {
        type : String,
        required : [true, "password is mandatory"]
    }
});

module.exports = mongoose.model("User", userSchema);