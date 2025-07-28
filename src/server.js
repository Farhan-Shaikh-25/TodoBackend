import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { taskRoute } from "./routes/task.route.js"
import { userRoute } from "./routes/user.route.js"
import ConnectDB from "./DB/index.js"

dotenv.config()

ConnectDB()

const app = express()

app.use(express.json())

const allowedOrigin = [
    "http://localhost:5173",
    "https://todoApp.netlify.app"
]
app.use(cors({
    origin: (origin, callback) => {
        if( !origin || allowedOrigin.includes(origin))
            callback(null,true)
        else callback( new Error("Not allowed") )
    },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}));


app.use("/tasks",taskRoute)
app.use("/users",userRoute)
app.use((req,res)=>{
    res.status(404).send("Route not Found")
})


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log("Server running")
})

