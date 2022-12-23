//---------------write validator for object id
const valid = function (data){
    if(typeof(data)===undefined || typeof(data)===null) { return false}
    if(typeof (data) ==="string" && data.trim().length>0) {return true}
}

const validName = function (name) {
    const nameRegex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
    return nameRegex.test(name)
}
const validPhone = function (mobile) {
    const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/
    return mobileRegex.test(mobile)
}

 
const isValidPassword = function (password) {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/
    return passwordRegex.test(password)
}

const isValidImage = function (value) {
    let imageRegex =/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i
  
    if (imageRegex.test(value)) {
      return true
    }
  }

 
module.exports={valid,validName,validPhone,isValidPassword,isValidImage}
