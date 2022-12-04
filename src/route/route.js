const express=require("express")
const router=express.Router()

const { createUser,loginData} = require("../controller/userController")
const {createTask,getTask,getTaskById} = require("../controller/taskController")

router.post("/user",createUser)
router.post("/login",loginData)
router.post("/task",createTask)

router.get("/tasks",getTask)
router.get("/tasks/:taskId",getTaskById)





router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports=router