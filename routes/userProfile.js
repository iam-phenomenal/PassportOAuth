const router = require("express").Router()

router.get("/",  (req, res)=>{
    const user = req.user
    res.status(200).json(`User: ${user.username}`)
})

router.get("/logout", (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return next(err)
    })
    req.logout((err)=>{
        if(err){
            return next(err)
        }else{
            res.redirect("/")
        }
    })
})

module.exports = router