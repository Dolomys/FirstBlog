import Router from 'express';

import { addComment, addPost, changePost, deletePost, getPosts, getPostsByCat, singlePost } from '../controllers/posts.controller.js';
import { checkUser } from '../middlewares/isAuth.js';

const router = Router()

// Add post
router.post("/add", addPost)
// Modify post
router.put("/:id",checkUser, changePost)

// get all posts
router.get("/cat/", getPosts)

//Filter by cats
router.get("/cat/:id", getPostsByCat)

// Get single post
router.get("/:id", singlePost)
// Delete single post
router.delete('/:id', deletePost)

//Add comment 
router.put("/comment/:id", addComment)

export default router