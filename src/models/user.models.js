    import mongoose from "mongoose"
    import bcrypt from "bcrypt"
    import jwt from "jsonwebtoken"
    import dotenv from "dotenv"
    dotenv.config()
    const userSchema = new mongoose.Schema({
        userName: {
            required : true,
            type : String,
            unique : true,
        },
        userPass: {
            required :true,
            type : String,
        },
        refreshToken: {
            type: String,
            unique: true
        }
    },{timestamps: true})

    userSchema.pre("save",async function(next){
        if(!this.isModified("userPass")) return next()
        this.userPass= await bcrypt.hash(this.userPass,10)
        next()
    })

    userSchema.methods.createAccessToken = async function () {
        return jwt.sign({
            id: this._id,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
        )
    }

    userSchema.methods.createRefreshToken = async function () {
        return jwt.sign({
            id: this._id,
            userName: this.userName,
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
        )
    }
    export const User = mongoose.model("User",userSchema)

