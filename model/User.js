const mongoose = require('mongoose')
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var validatePhone = function(phone){
    re = /^[0-9]{10}/
    return re.test(phone)             
}
const UserSchema = new mongoose.Schema({
    user_name: {     
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        validate:[validateEmail,"Please enter a valid email address"],
        // validate: validateEmail,
        required: [true]
    },
    phone:{
        type: String,
        // validate: validatePhone,
        validate:[validatePhone,"Please enter a valid phone number"],
        required: [true]
    },
    role:{
        type:String,
        enum:["admin","app_user"],
        default:"app_user"
    },
    date:{
        type:String,
    }

}, { timestamps: true })
module.exports = mongoose.model('User', UserSchema)
