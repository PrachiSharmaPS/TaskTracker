const taskModel=require("../model/taskModel")
const userModel=require("../model/userModel")

const nameregex = RegExp("[a-zA-Z0-9\s]");

const createTask=async function(req,res){
try{
    const data=req.body;

    if(Object.keys(data).length == 0){return res.status(400).send({status:false, message:"Please provide Data in request"})}

    const {userId,taskName,taskData,}=data
    
//------------checking all the mandatory fields-------

    if(!userId || !taskName ){
        return res.status(400).send({status:false, message:"Please provide all necessary book Details"})     }

    const validUser=await userModel.findOne({_id:userId})  
    if(!validUser){return res.status(404).send({status:false, message:"User not found"})}
   
    const taskDetail=await taskModel.create(data)
  
    return res.status(201).send({status:true, message:'Success', data:taskDetail})

}catch(err){
    return res.status(500).send({status:false, message:err.message})
}
}
//-------------get all task of given user-------------
const getTask = async function (req,res){

    try {

    const data = req.query//--------------------------------
        
    const tasks = await taskModel.find({$and:[data, { isDeleted: false }]})

    if (Object.keys(tasks).length == 0){return res.status(404).send({status:false ,msg: "No such task found"})}

    return res.status(200).send({status:true,msg:"Success",data:tasks})

    } catch (error) {
        
      return res.status(500).send({status:false,msg:error.message})
        
    }
}
//------------------------get by id 
const getTaskById = async function (req,res){

    try {

    const taskId = req.params.taskId
        
    const tasks = await taskModel.findOne({$and:[{_id:taskId}, { isDeleted: false }]})
        if(!tasks){return res.status(404).send({status:false ,msg: "No such task found"})}
   // if (Object.keys(tasks).length == 0){return res.status(404).send({status:false ,msg: "No such task found"})}

    return res.status(200).send({status:true,msg:"Success",data:tasks})

    } catch (error) {
        
      return res.status(500).send({status:false,msg:error.message})
        
    }
}



module.exports={createTask,getTask,getTaskById}