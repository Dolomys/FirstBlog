import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
    },
    user:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:false,
    },

},{timestamps:true})
 
export const Post = mongoose.model("Post", PostSchema)