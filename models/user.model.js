const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    username:{type:String},
    avatar:{type:String},
    email:{type:String},
    password:{type:String}

})

const userModel=mongoose.model("User",userSchema);

module.exports={userModel}