import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

export const register = async(req, res) => {
    const {username, email, password, password2} = req.body
    console.log(req.body)
    !req.body && res.status(400).json('NO BODY')
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
        !user && res.status(400).json("L'email ou le mot de passe est incorrect")  //For security issue never reveal wich is wrong

        //Password is correct ?
        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json("L'email ou le mot de passe est incorrect") // For security issue never reveal wich is wrong

        // Create Jwt
        if(user && validated) {
            const token = jwt.sign(
                {user},
                'Secret_password',
                { expiresIn: '24h' }
            )

            console.log(token)
            res.status(200).json({token, user: user.email})
           
        }
    }
    catch(err){
        res.status(500).json(err)
    }
}

export const logout = (req, res) => {
    res.status(200).json({token, user:null})
}
