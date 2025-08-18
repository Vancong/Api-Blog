const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    bio:{
        type: String,
        default:"",
        maxlength:500
    }
},{
    timestamps: true
})

module.exports=mongoose.model("User",UserSchema)