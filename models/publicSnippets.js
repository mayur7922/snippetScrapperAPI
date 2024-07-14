const mongoose = require("mongoose");

const snippetSchema = mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    category:{
        type:String,
        required:true
    },
    keyword:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("PublicSnippet", snippetSchema);