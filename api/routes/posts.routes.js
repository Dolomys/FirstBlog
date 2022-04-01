import Router from 'express';

import { addPost, changePost, deletePost, getPosts, singlePost } from '../controllers/posts.controller.js';
import { checkUser } from '../middlewares/isAuth.js';

const router = Router()

// Add post
router.post("/add", addPost)
// Modify post
router.put("/:id",checkUser, changePost)
// get all posts
router.get("/", getPosts)
// Get single post
router.get("/:id", singlePost)
// Delete single post
router.delete('/:id', deletePost)

export default router