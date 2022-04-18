import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models/User.js'
import { Post } from '../models/Post.js'

export const register = async(req, res) => {
    const {username, email, password, password2} = req.body
    console.log(req.body)
    !req.body && res.status(400).json('there is no body')
    //TO DO - handle error
    if(!password === password2)
    {
        res.status(401).json("Les mots de passe ne correspondent pas")
    }

    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPass
        })

        const user = await newUser.save()
        console.log(user)
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

export const login = async(req, res) => {
    try{
        // User exist ?
        const user = await User.findOne({email:req.body.email })
        if(!user){
            return res.status(400).json("L'email ou le mot de passe est incorrect") //For security issue never reveal wich is wrong
        }   

        //Password is correct ?
        const validated = await bcrypt.compare(req.body.password, user.password)
        if(!validated) {
            return res.status(400).json("L'email ou le mot de passe est incorrect") // For security issue never reveal wich is wrong
        }
       

        // Create Jwt TODO Implement jwt
        if(user && validated) {
            const token = jwt.sign(
                {email: user.email, isAdmin:user.isAdmin},
                'Secret_password',
                { expiresIn: '24h' }
            )

            console.log(token)
            //TODO change for jwt
            res.status(200).json({user})
           
        }
    }
    catch(err){
        console.log(err)
        res.status(401).json(err)
    }
}

export const changeAccount = async(req,res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try{
            const updateUser = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                },{ new: true })
            const updatePost = await Post.updateMany({username : req.body.oldUsername},{"username": updateUser.username})
            res.status(200).json(updateUser)
            
        }
        catch(err){
            res.status(500).json(err)
        }
    }
    else {
        res.status(400).json("wong user")
    }
}
