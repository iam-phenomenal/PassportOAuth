require("dotenv").config()
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("./model/User")

passport.use(new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/google/redirect",
        passReqToCallback : true
    }, (request, accessToken, refreshToken, profile, done)=>{
        User.findOne({googleID: profile.id}).then((user)=>{
            if(user){
                done(null, user)
            }else{
                new User({
                    username: profile.displayName,
                    googleID: profile.id,
                    email: profile._json.email,
                    profileIMG: profile._json.picture 
                }).save().then((newUser)=>{
                    done(null, newUser)
                })
            }
        })
    })
)

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(i=(id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user)
    })
})

/**
const checkOrSaveUser = async(loginType, profile)=>{
    const user = await User.findOne({googleID: profile.id})
    if(user){
        return true
    }else{
        const newUser = new User({
            username: profile.displayName,
            googleID: profile.id,
            email: profile._json.email,
            profileIMG: profile._json.picture 
        })
        try{
            const savedUser = newUSer.save()
            return true
        }catch(err){
            return false
        }
    }
}
*/