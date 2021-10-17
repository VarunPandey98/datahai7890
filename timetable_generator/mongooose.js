const mongoose = require("mongoose");

const post_schema = new mongoose.Schema({
    email:{
        type:String,
       
    },
    password:{
        type:String,
       
    },
    confirmPassword:{
        type:String,
       
    },
    date:{
        type: Date,
        default: Date.now
    }

})
 module.exports = new mongoose.model("teacherData",post_schema)

