const jwt=require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
//----------------
const authenticate = function (req, res, next) {
    try {

        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(400).send({ status: false, message: "no token found" })
        }
        jwt.verify(token, "task-managere", function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            }
            req.decodedToken = decodedToken
        
            next();
        })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
//------------------validation---
const objId=function(req,res){
    const taskId = req.params.taskId
    const userId = req.params.userId
    if(!isValidObjectId(taskId)){ return res.status(400).send({status:false,msg:"invalid task id"})}
    if(!isValidObjectId(userId)){ return res.status(400).send({status:false,msg:"invalid user id"})}
}

//----------------------------
const authorization = async function (req, res, next) {
    try {
        let check = req.params.taskId
      
        if (check) {
            if(!check){
                return res.status(400).send({status:false,message:"plese enter bookId"})
             }
             if(!isValidObjectId(check)){ 
                 return res.status(400).send({status : false, message : " it's not a valid book Id"})
            }
            let checkUserId = await bookModel.findOne({ _id: check }).select({ userId: 1, _id: 0 })
            if(!checkUserId){
                return res.status(400).send({status:false,message:"Book not Found"})
            }
            let userId = checkUserId.userId
            let id = req.decodedToken.userId
            if (id != userId) return res.status(403).send({ status: false, message: "You are not authorised to perform this task" })
        }
        else {
            check = req.params.userId
            if(!check){return res.status(400).send({ status : false, msg : "Please enter the user Id"})}
            if(!isValidObjectId(check)){ return res.status(400).send({status : false, message : " it's not a valid user Id"})}
            let id = req.decodedToken.userId
            console.log(check)

            if (id != check) return res.status(403).send({ status: false, message: 'You are not authorised to perform this task 🤖' })
        }
        next();
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ msg: error.message })
    }
}
module.exports={authenticate,authorization,objId}