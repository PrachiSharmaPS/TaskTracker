const mongoose=require("mongoose")
const objectId= mongoose.Schema.Types.ObjectId

const taskSchema= new mongoose.Schema({
        userId: {
            type: objectId,
            ref : "taskUser",
            require:true,
        },
        taskName:{
            type: String,
            require:true
        },
   
             startDate : {type: Date,default:Date.now()},
            endDate: {type: Date,require:true},
    
            deletedAt:{type:Date},
        isDeleted:{type:Boolean,default:false}

},{timestamps:true})

module.exports=mongoose.model('task',taskSchema)