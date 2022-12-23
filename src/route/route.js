const express=require("express")
const router=express.Router()

const { createUser,loginData,deleteUser} = require("../controller/userController")
const {createTask,getTask,getTaskById,updateTask,deleteTask} = require("../controller/taskController")
const {authenticate,authorization,objId}= require("../middleware/myMiddleware")


router.post("/user",createUser)
router.post("/login",loginData)
router.post("/task",createTask)

router.get("/tasks",authenticate,getTask)
router.get("/tasks/:taskId",authenticate,objId,getTaskById)

router.put("/tasks/:taskId",authenticate,objId,authorization,updateTask)
router.delete("/tasks/:taskId",authenticate,objId,authorization,deleteTask)
router.delete("/user/:userId",authenticate,objId,authorization,deleteUser)





router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports=router