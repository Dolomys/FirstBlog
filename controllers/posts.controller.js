import { Post } from '../models/Post.js'

// Publish Post
export const addPost = async(req, res) => {
    const {title, desc, categories, isPublished} = req.body
    let photo
    const user = req.user?.username
    // Only admin can post
    if(user === "admin") {
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
               categories,
               isPublished,
               photo,
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
    else {
        res.status(401).json("You dont have the rights !")
    }
  
}

// Get All Post
export const getPosts = async(req,res) => {
   const posts = await Post.find()
   res.status(200).json(posts)
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
    let photo
    const user = req.user?.username
  
    if(req.file){
         photo = req.file.path.replace('public', '')
    }
    else {
         photo = "/images/bob.png"
    }
   
    try{
        const post = await Post.findById(req.params.id)
        !post && res.status("400").json("this post doesn't exist")
        if(post.user === user){
            try{
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    title,
                    desc,
                    categories,
                    isPublished,
                    photo,
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

// Delete Post
export const deletePost = async(req,res) => {
    
    const user = req.user?.username
  
    try{
        const post = await Post.findById(req.params.id)
        if(post.user === user){ 
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

