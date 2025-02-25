const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema ({
    name : {type : String , required : true , trim : true},
    start : {type : Date , required : true , trim : true},
    end : {type : Date , required : true , trim : true}
} , {collection : "internships" , timestamps : true})

const internship = mongoose.model("internships" , internshipSchema)
module.exports = internship