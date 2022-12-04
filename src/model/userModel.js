const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required: true
    },
    name: {
         type: String,
         required: true, 
         trim:true
        },

    phone: {
        type : String, 
        required: true, 
        unique: true 
        },

    email:  { 
        type : String,
         required:true,
         unique:true
        },
      
    password:{  
        type: String, 
        required: true,
     
        },
    task: {
        taskCount: {type: Number,default:0},
        pending : {type: Number,default:0},
        completed: {type: Number,default:0},

    },
    isDeleted:{type:Boolean,default:false}

}, { timestamps: true })



module.exports = mongoose.model('taskUser', userSchema)