require("dotenv")
const jwt = require("jsonwebtoken")
const User = require("./model/User")

const signToken = (user)=>{
    const accessToken = jwt.sign({
        id: user.id,
    }, process.env.SESSION_KEY, {expiresIn: "1h"})
    return accessToken
}

const tokenResult =async (req, res, next)=>{
    const authHeader =await req.headers.authorization
    if(authHeader){
        const _token = authHeader.split(" ")[1]
        jwt.verify(_token, process.env.SESSION_KEY, (err, user)=>{
            if(err) return res.status(403).json("Invalid Token")
            req.user = user
            next()
        })
    }else{
        return res.status(403).json("Not authenticated")
    }
}


const tokenAuthentication = (req, res, next)=>{
    tokenResult(req, res, ()=>{
        if(req.user.id === req.params.id){
            next()
        }
        else return res.status(403).json("Permission denied")
    })
}


module.exports = {signToken, tokenAuthentication}