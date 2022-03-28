import jwt from 'jsonwebtoken'

import { Post } from '../models/Post.js'
import { User } from "../models/User.js";




const isUser = async(req) => {
    const authHeader = req.header.authorization
    if(authHeader){
        const token = authHeader.split(" ")[1]

        jwt.verify(token, 'Secret_password', async(err,decodedToken) => {
            if(err) {
                console.log(err.message)  
                return 0
            } else {
                let user = await User.findOne({email:decodedToken.user.email })
                return user.email
            }
        });
    } else {
       res.status(401).json('You are not allowed to modify this')
       return 0
    }
}


export const addPost = async(req, res) => {
    const {title, desc} = req.body
    console.log(req.body)
    let photo
    // const user = await isUser(req)
    const user = "celeste"
    if(req.file){
         photo = req.file.path.replace('public', '')
    }
    else {
         photo = "/images/bob.png"
    }

    try{
        const newPost = new Post({
            title,
            desc,
            photo: photo,
            user
        })

        const post = await newPost.save()
        console.log(post)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const getPosts = async(req,res) => {
   const posts = await Post.find()
   res.status(200).json(posts)
}

export const singlePost = async(req, res) => {
    try{
    const { id } = req.params;
    const post = await Post.findById(id);
    // const { name, age, description, image, user, photo } = kitten;
    res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const changePost = async(req,res) => {
    const {name, age, description} = req.body
    let photo
    const user = await isUser(req)
    if(req.file){
         photo = req.file.path.replace('public', '')
    }
    else {
         photo = "/images/bob.png"
    }
   
    try{
        const post = await Post.findById(req.params.id)
        !post && res.status("400").json("this post doesnt exist")
        if(post.user === user){
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    name,
                    age,
                    photo,
                    description,
                    user
                },{new: true})
                res.status(200).json(updatePost)
            }
            catch(err){
                res.status(500).json(err)
            }
        }else {
            res.status(401).json("You can update only your post !")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}


// TO DO - handle kitten delete :,(
export const deletePost = async(req,res) => {
    const user = isUser()
    try{
        const post = await Post.findById(req.params.id)
        if(post.username === user){ 
            try{
                await post.delete()
                res.status(200).json("post has been deleted")
            }
            catch(err){
                res.status(500).json(err)
            }
        }else {
            res.status(401).json("You can delete only your post !")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

