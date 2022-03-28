import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required: true,
        default: "user"
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