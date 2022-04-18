import { Post } from '../models/Post.js'

// Publish Post
export const addPost = async(req, res) => {
    const {title, desc, cats, isPublished, photo } = req.body
    const username = req.body.username
    const categories = cats.map(e=>e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
    console.log(categories)
    // Only admin can post
    if(true) {
   
       try{
           const newPost = new Post({
               title,
               desc,
               categories,
               isPublished,
               photo,
               username
           })
   
           const post = await newPost.save()
           console.log(post)
           res.status(200).json(post)
       }
       catch(err){
           res.status(500).json(err)
       }
    }
    else {
        res.status(401).json("You dont have the rights !")
    }
  
}

// Get All Post
export const getPosts = async(req,res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    }
    catch(err){
        console.log(err)
        res.status(400).json('No post available')
    }
  
}

export const getPostsByCat = async(req,res) => {
    const { id } = req.params
    try{
        console.log(id)
        const posts = await Post.find({categories : id})
        res.status(200).json(posts)
    }
    catch(err){
        console.log(err)
        res.status(400).json('No post with this category')

    }
}

// Get Single Post
export const singlePost = async(req, res) => {
    try{
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
}

// Modify Post
export const changePost = async(req,res) => {
    const {title, desc, categories, isPublished} = req.body
    const username = req.body.username

    try{
        const post = await Post.findById(req.params.id)
        !post && res.status("400").json("this post doesn't exist")
        if(post.username === username){
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    title,
                    desc,
                    categories,
                    isPublished,
                    username
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

// Delete Post
export const deletePost = async(req,res) => {
    
    const username = req.body.username

  
    try{
        const post = await Post.findById(req.params.id)
        console.log(username)
        console.log(post)
        if(post.username === username){ 
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

