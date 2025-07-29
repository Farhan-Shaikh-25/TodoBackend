import express from "express"
import { User } from "../models/user.models.js"
import bcrypt from "bcrypt"
import AuthCheck from "../middlewares/authCheck.js"
export const userRoute = express.Router() 

userRoute.post("/signup/",async (req,res)=>{
    const userExists = await User.findOne(
        {userName: req.body.userName}
    )
    let resp = ""
    if(!userExists) {
        const newUser = new User({userName:req.body.userName, userPass: req.body.userPass})
        await newUser.save()
        resp = "user created"
    }
    else resp = "user already exists!"
    res.json({"message": resp})
})

userRoute.post("/login/", async(req, res) => {
    const userExists = await User.findOne(
        {userName: req.body.userName}
    )
    let accessToken = await userExists.createAccessToken()
    let refreshToken = await userExists.createRefreshToken()
    userExists.refreshToken = refreshToken
    await userExists.save()
    if (userExists && bcrypt.compare(req.body.userPass,userExists.userPass)) {
        res.json({"accessToken": accessToken,
                  "refreshToken": refreshToken,
                  "message":"valid " + userExists._id
        })
    }
    else res.json({"message":"user does not exists or password is invalid!"})
    
})

userRoute.get("/:userId",AuthCheck,async(req,res)=>{
    const user = await User.findOne({_id : req.params.userId}).select("userName")
    res.json({"userName":user.userName})
})






