const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    employeeId : {type : String , trim : true},
    name : {type : String , trim : true},
    email : {type : String , required : true , trim : true},
    password : {type : String , required : true},
    mustChangePassword: {type : Boolean, default : true},
    phoneNumber : {type : Number , trim : true},
    department : {type : String , trim : true},
    title : {type : String , trim : true},
    role : {type : String, enum : ["Admin","BSYM","İK","Mentör"], required : true}
} , {collection : "users" , timestamps : true})

const user = mongoose.model("users" , userSchema)
module.exports= user
