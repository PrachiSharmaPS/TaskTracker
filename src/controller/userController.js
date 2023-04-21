const userModel = require('../model/userModel')
const jwt=require("jsonwebtoken")
const aws = require("../aws")
const {valid,isValidPassword,isValidImage}=require("../middleware/validation")
const emailValidator = require('email-validator')
require('dotenv').config();

let regexValidation = new RegExp(/^[a-zA-Z]+([\s][a-zA-Z]+)*$/);
let regexValidNumber = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;



const createUser = async function (req, res){
try {
    let data = req.body
    const profileImage = req.files
    
    if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "plzz give some data" })

    const { title, name, phone, email, password} = data

    if (!valid(title)) {return res.status(400).send(({status:false,msg:"title is invalid"}));}
    if (title != "Mr" && title != "Miss" && title != "Mrs"){
        return res.status(400).send({ msg: "Please write title like Mr, Mrs, Miss" });
    }
    if (!regexValidation.test(name)) return res.status(400).send({ status: false, msg: "Please Enter Valid Name" })
    if (!regexValidNumber.test(phone)) return res.status(400).send({ status: false, msg: "Please Enter Valid Phone Number" })
    if (!emailValidator.validate(email)) return res.status(400).send({ status: false, msg: "Please Enter Valid email ID" })
    if (!isValidPassword(password)){return res.status(400).send({ status: false, msg: " need a strong password which have special char,num,alph" });}
    if (!isValidImage(profileImage[0].originalname)) { return res.status(400).send({ status: false, message: "Profile Image formate is not valid" }) }

    if (profileImage.length > 0) { var uploadedFileURL = await aws.uploadFile(profileImage[0]) }
    else { return res.status(400).send({ status: false, message: 'please provide profile image' }) }

    data.profile=uploadedFileURL
    const check= await userModel.findOne({phone:phone},{email:email},{isDeleted: false })
    if (check)return res.status(400).send({ status: false, msg: "Phone/email already exists" });

    const user= await userModel.create(data);return  res.status(201).send({ status: true,msg:"Succes", Data: user })
  }  catch(error) {res.status(500).send({ status: false, msg: error.message })}
}
// ---------------login----
const loginData = async function (req, res) {
    try {
      let userdata = req.body
      
      let {email,password}=userdata
      
      if (!emailValidator.validate(email)) return res.status(400).send({ status: false, msg: "Please Enter Valid email ID" })
      if (!isValidPassword(password)){return res.status(400).send({ status: false, msg: " Incorrect Password, It should be of 6-15 digits with atlest one special character, alphabet and number" });}
  
      let userInfo = await userModel.findOne({ email: email, password: password });
      if (!userInfo){
        return res.status(400).send({ Status: false, massage: "Plase Enter Valid UserName And Password" })}
  
      let userToken = jwt.sign({
        userId: userInfo._id.toString(),//ye thi dikaat U h hona smal tha
        iat: Date.now()
      },
      process.env.Secret,{expiresIn:"18000s"}
      )

      return res.status(200).send({Status: true, Msg: " Your JWT Token is successful generated",  MyToken: userToken })
    }
    catch (err) {
     return res.status(500).send({ status: false, errer: err })
    }
  }
//--------------------delete user-------------
const deleteUser= async function(req,res){
  try{
    const userId=req.params.userId

    const user=await userModel.findOneAndUpdate({ _id: userId, isDeleted: false },{isDeleted:true},{new:true})
    if(!user){ return res.status(404).send({status:true, msg:"Not found /deleted"})}

    return res.status(200).send({Status: true,data:user})
}
    catch (err) {
      return res.status(500).send({ status: false, errer: err })
     }
}


module.exports = { createUser,loginData,deleteUser};