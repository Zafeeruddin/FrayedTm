const express=require("express")
const authMiddleware = require("../middleware")
const jwt=require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const secretKey = require("../config")
const transferFunds = require("../transferFunds")
const { signupModel,bankACModel } = require("../db")



const accountRouter=express.Router()

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
    let token=req.headers.authorization;
    if(token){
        token=token.replace("Bearer ","")
    }
    const decodedToken=jwt.verify(token,secretKey)
    const userID=decodedToken.userID;

    const user=await bankACModel.findOne({userID:userID})
    if(!user || !decodedToken){
        res.json({
            "message":"no access"
        })
    }
    res.json({
        "balance":user.balance
    })
})

accountRouter.put("/transfer",authMiddleware,async (req,res)=>{

    let token=req.headers.authorization;
    token=token.replace("Bearer ","")
    const decodedToken=jwt.verify(token,secretKey)
    let fromAcId=decodedToken.userID;
    let {toAcId,balance}=req.body;

    console.log("to ac id",toAcId)
    const fromAcUser=await bankACModel.findOne({userID:fromAcId})
    const toAcUser=await bankACModel.findOne({userID:toAcId})

    fromAcId=fromAcUser._id
    toAcId=toAcUser._id

    const sender=await bankACModel.findOne({_id:fromAcId})
    const reciever=await bankACModel.findOne({_id:toAcId})
    
    const session=await mongoose.startSession()
    if(!reciever){
        res.json({
            "message":"invalid account"
        })
        return
    }
    if(sender.balance<balance){
        res.json({
            "message":"Insufficient funds"
        })
        return
    }

    try{
        session.startTransaction();
        transferFunds(sender,reciever,balance);
        await session.commitTransaction();
    }catch(err){
        await session.abortTransaction();
        console.error("Transaction aborted due to error", err)
    }finally{
        session.endSession()
    }
    res.json({
        "message":`transaction successfull`
    })
})

module.exports=accountRouter;