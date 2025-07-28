import express from "express"
import { Task } from "../models/task.models.js"
import AuthCheck from "../middlewares/authCheck.js"
export const taskRoute = express.Router()


taskRoute.get("/:userId",AuthCheck, async(req,res) => {
    const tasks = await Task.find({userId:req.params.userId}, '_id name userId')
    res.json(tasks)
})

taskRoute.post("/",AuthCheck, async(req, res) => {
    const newTask = new Task({
        name: req.body.name,
        userId: req.body.userId
    })
    await newTask.save()
    res.send("Task Added")
})

taskRoute.delete("/:userId/:id",AuthCheck, async(req, res) => {
    const dt = await Task.findOneAndDelete({_id:req.params.id, userId:req.params.userId}).select("name")
    if (!dt)
        return res.status(404).send("No task with such id")
    res.send("Deleted Successfully. Task: " + dt);
})