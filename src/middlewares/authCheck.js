import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default function AuthCheck(req,res,next){
    const token =req.headers['authorization']
    try {
        if(token?.startsWith("Bearer ")){
        const isValid= jwt.verify(token.split(" ")[1], process.env.ACCESS_TOKEN_KEY)
        if(!isValid)
            return res.status(403).send("Invalid token")
        return next()
        }
        else res.status(403).send("No token")
    } catch (error) {
        res.status(403).send("Token is malformed")
    }
    
}