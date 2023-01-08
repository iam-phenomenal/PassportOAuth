const router = require("express").Router()
const passport = require("passport")

router.get("/", passport.authenticate("google", {
    scope: ["profile", "email"]
}))

router.get("/redirect", passport.authenticate("google"), (req, res)=>{
    const user = req.user
    res.status(307).redirect(`/profile/`)
})


router.get("/failure", (req, res)=>{
    res.status(200).json("Yippie!")
})

module.exports = router