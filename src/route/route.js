const express=require("express")
const router=express.Router()

const { createUser,loginData,deleteUser} = require("../controller/userController")
const {createTask,getTask,getTaskById,updateTask,deleteTask} = require("../controller/taskController")
const {authenticate,authorization,isValidId}= require("../middleware/myMiddleware")




router.post("/user",createUser)
router.post("/login",loginData)
router.post("/task",createTask)

router.get("/tasks",authenticate,getTask)
router.get("/taskId/:taskId",authenticate,isValidId,getTaskById)

router.put("/tasks/:taskId",authenticate,isValidId,authorization,updateTask)
router.delete("/tasks/:taskId",authenticate,isValidId,authorization,deleteTask)
router.delete("/user/:userId",authenticate,isValidId,authorization,deleteUser)





router.all("/*",function(req,res){
    res.status(404).send({msg:"invalid http request"})
})

module.exports=router