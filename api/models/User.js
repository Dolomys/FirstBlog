import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        required: true,
        default: false
    },
    password:{
        type:String,
        required:true
    },
    profilPic:{
        type:String,
        default: "",
    }

},{timestamps:true})

export const User = mongoose.model("User", UserSchema)