import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'



const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize all dependecies
// Stop MongoDb from putting collection name to pluralize ( mouse != mice )
mongoose.pluralize(null);
dotenv.config();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use('/public/images', express.static(path.join(__dirname, "/public/images")))

// Connect to DB
mongoose
.connect(process.env.MONGO_URL)
.then(console.log("connected to MongoDB"))
.catch(err=>console.log(err))

// Initialize Multer for image storing
const storage = multer.diskStorage({
  destination:(req,file,callback) => {
      callback(null,"public/images")
  },filename:(req,file,callback)=>{
      callback(null,req.body.name)
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
  