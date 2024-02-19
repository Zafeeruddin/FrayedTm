const express=require("express")
const { userSignin, userSignup } = require("../types")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const authMiddleware=require("../middleware")
const saltRounds=10
const secretKey = require("../config")
const { signupModel,bankACModel } = require("../db")

const cors=require("cors")


const userRouter=express.Router()
userRouter.use(cors())

const checkEmail=async (req,res,next)=>{
    const email=req.body.email
    const exisitingEmail=await signupModel.findOne({email:email})
    if(exisitingEmail){
        res.status(411).json({
            "message":`email already taken`
        })
        return 
    }
    next();

}
userRouter.post("/signup",checkEmail, async (req,res)=>{
    const {firstName,lastName,email,passwordOne,passWordTwo}=req.body
    console.log(req.body)
    if(passWordTwo!=passwordOne){
        console.log("inciirect ps")
        res.status(400).json({"message":"Passwords do not match"})
        return
    }

    const signinData=userSignup.safeParse({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:passWordTwo
    })
    if(!signinData.success){
        res.status(400).json(signinData.error.errors)
        return
    }

    
    const hash=bcrypt.hashSync(passWordTwo,saltRounds)

    console.log(hash)
    const putSiginData=new signupModel({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hash
    })
    const user=await putSiginData.save()
    const initialBalance=Math.floor(Math.random()*10000)
    const bankAc=new bankACModel({
        userID:user._id,
        balance:initialBalance
    })
    await bankAc.save()
    console.log("safely parsed")

    res.json({
        "user":putSiginData,
        "message":"User created successfully"
    })
    
    
})

userRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body
    console.log(req.body)
    const [getUser]=await signupModel.find({email:email})
    console.log(getUser)
    if(!getUser){
        res.status(411).json({"message":"email doesn't exists, create new"})
        return 
    }
    console.log(getUser.password)
    const comparePass=bcrypt.compareSync(password,getUser.password)
    if(!comparePass){
        res.status(404).json({
            "message":"Incorrect Credentials"
        })
        return 
    }

    var token=jwt.sign({userID:getUser.id},secretKey)
    req.headers.authorization="Bearer " + token
    console.log(getUser.firstName)
    res.status(200).json({
        "message":"User Signed",
        "token":token,
        "username":getUser.firstName,
        "id":getUser.id
    })
    
})

userRouter.put("/updateUser", authMiddleware,async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;
        console.log(req.userId + "in user.js")
        // Find the user by their ID (assuming req.userId contains the user's ID)
        const [updatedUser] = await signupModel.find({_id:req.userId});
        // Check if the user exists

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user information
        updatedUser.firstName = firstName;
        updatedUser.lastName = lastName;

        // Hash and update password if provided
        if (password) {
            const hash = bcrypt.hashSync(password, saltRounds);
            updatedUser.password = hash;
        }

        // Save the updated user
        await updatedUser.save();

        // Send the updated user details in the response
        res.status(200).json({
            password: updatedUser.password,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName
        });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

userRouter.get("/bulk",authMiddleware,async (req,res)=>{
    const filter=req.query.filter || ""
    const users = await signupModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user:users.map(user=>({
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

module.exports = userRouter;
