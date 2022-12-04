const express=require("express")
const router=express.Router()

const { createUser,loginData} = require("../controller/userController")
const {createTask,getTask,getTaskById,updateTask,deleteTask} = require("../controller/taskController")

router.post("/user",createUser)
router.post("/login",loginData)
router.post("/task",createTask)

router.get("/tasks",getTask)
router.get("/tasks/:taskId",getTaskById)

router.put("/tasks/:taskId",updateTask)
router.delete("/tasks/:taskId",deleteTask)





router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports=router