const mongoose=require("mongoose")
const { Schema } = require("zod")

mongoose.connect("mongodb+srv://mohammedxafeer:No9YrDQ5MqHNx10w@cluster0.ze6jwfk.mongodb.net/FrayedTm")

const bankAC=new mongoose.Schema({
    userID:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"signupModel",
            required:true
        }

    ],
    balance:{
        type:Number,
        required:true
    },
})

const bankACModel=mongoose.model("bankAccounts",bankAC)

const singup=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
        
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bank:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"bankACModel",
            required:true
        }
    ]
})



const signupModel=mongoose.model("userData",singup)

module.exports={
    signupModel,
    bankACModel
}