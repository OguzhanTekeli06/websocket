const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema ({
    internId : {type : String , required : true , trim : true},
    start : {type : Date , required : true , trim : true},
    end : {type : Date , required : true , trim : true},
    status : {type : String , required : true , trim : true},
} , {collection : "leaves" , timestamps : true})

const leave = mongoose.model("leaves" , leaveSchema)
module.exports = leave