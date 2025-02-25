const mongoose = require("mongoose");
//todo mentor id
const internSchema = new mongoose.Schema ({
    applicationId : {type : Number , required : true },
    name : {type : String , required : true , trim : true},
    identityNo : {type : Number , required : true , trim : true},
    school : {type : String , required : true , trim : true},
    department : {type : String , required : true},
    grade : {type : String , required : true},
    gpa_4 : {type : Number , required : true , trim : true},
    term : {type : String , required : true},
    city : {type : String , required : true},
    phoneNumber : {type : Number , required : true , trim : true},
    email : {type : String , required : true , trim : true},
    password : {type : String , required : false},
    mustChangePassword: {type: Boolean, default : true},
    faculty : {type : String , required : true},
    yoksisVerification : {type : String , required  : true},
    gpa_100 : {type : Number , required : true},
    transcriptLink : {type : String , required : true },
    hasInternshipExperience : {type : String , required : true},
    gender : {type : String , required : true},
    nationality : {type : String , required : true},
    address : {type : String , required : true},
    postCode : {type  : Number , required : false},
    district : {type : String , required : true}, 
    mentorId : {type : String},
    internshipPeriod : {type : String , trim : true}
} , {collection : "interns" , timestamps : true})

const intern = mongoose.model("interns" , internSchema)
module.exports = intern