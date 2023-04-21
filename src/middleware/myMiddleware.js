const jwt=require("jsonwebtoken")
const taskModel=require("../model/taskModel")
const { isValidObjectId } = require("mongoose")
//----------------
const authenticate = function (req, res, next) {
    try {

        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({ status: false, message: "no token found" })
        }
        jwt.verify(token, "task-manager", function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            }
            req.decodedToken = decodedToken
        console.log(decodedToken)
            next();
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//------------------validation---
const isValidId=function(req,res,next){
    const taskId = req.params.taskId
    const userId = req.params.userId
   if(taskId) if(!isValidObjectId(taskId)){ return res.status(400).send({status:false,msg:"invalid task id"})}
   if(userId)if(!isValidObjectId(userId)){ return res.status(400).send({status:false,msg:"invalid user id"})}
   next()
}

//----------------------------
const authorization = async function (req, res, next) {
    try {
        let taskId = req.params.taskId
        
      
        if (taskId) {
            
            let checkUserId = await taskModel.findOne({ _id: taskId }).select({ userId: 1, _id: 0 })
            if(!checkUserId){
                return res.status(400).send({status:false,message:"task not found"})
            }
            let userId = checkUserId.userId
            let id = req.decodedToken.userId
            if (id != userId) return res.status(403).send({ status: false, message: "You are not authorised to perform this task" })
        }
        else {
            let userId = req.params.userId
           
            let id = req.decodedToken.userId
            if (id != userId) return res.status(403).send({ status: false, message: 'You are not authorised to perform this task 🤖' })
        }
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}
module.exports={authenticate,authorization,isValidId}