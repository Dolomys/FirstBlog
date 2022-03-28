import jwt from 'jsonwebtoken'
import { User } from '../models/User.js';

// Redirect if not connected
export const isAuth = (req, res, next) => {

        const authHeader = req.header.authorization
         if(authHeader){
            const token = authHeader.split(" ")[1]
            jwt.verify(token, 'Secret_password', (err,decodedToken) => {
                if(err) {
                    return res.status(403).json("Token is not valid !")
                }   
                    req.user = decodedToken
                    next()
                
            });
        }
        else {
            res.redirect('/auth/login')
        }
}

// Redirect if is connected
export const alreadyConnected = (req, res, next) =>{
    const authHeader = req.header.authorization
    authHeader ? res.redirect('/') : next()
}

// check current user 
export const checkUser = (req, res, next) => {
    const authHeader = req.header.authorization
    if(authHeader){
       const token = authHeader.split(" ")[1]
        jwt.verify(token, 'Secret_password', async(err,decodedToken) => {
            if(err) {
                console.log(err.message)
                req.user = decodedToken
                next()
            } else {
                let user = await User.findById(decodedToken.user._id )
                req.user = user
                next()
            }
        });
    } else {
        res.user = null
        next()
    }
}


