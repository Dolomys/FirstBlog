import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors';
import multer from 'multer';

import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'



const app = express();
const port = 3000;

// Initialize all dependecies
// Stop MongoDb from putting collection name to pluralize ( mouse != mice )
mongoose.pluralize(null);
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

// Connect to DB
mongoose
.connect(process.env.MONGO_URL)
.then(console.log("connected to MongoDB"))
.catch(err=>console.log(err))

// Initialize Multer for image storing
const storage = multer.diskStorage({
  destination:(req,file,callback) => {
      callback(null,"images")
  },filename:(req,file,callback)=>{
      callback(null,"hello.jpg")
  }
})

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded")
})

// Routes
app.use("/api/auth", authRoutes)
// app.use("/api/users", userRoute)
app.use("/api/posts", postsRoutes)
// app.use("/api/category", categoryRoute)







app.get('*', (req, res) => {
    res.status(404).json('Erreur 404 ou page non trouvé')
  })

app.listen(port, () => {
    console.log(`Nodejs Project app listening on port ${port}`)
  })
  