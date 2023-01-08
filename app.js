require("dotenv").config()

const express = require("express")
const googleRoute = require("./routes/googleRoute")
const profileRoute = require("./routes/userProfile")
const passport = require("passport")
const passportSetup = require("./passportSetup")
const mongoose = require("mongoose")
const session = require("express-session")
const { urlencoded } = require("express")

const app = express()

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true})
const db = mongoose.connection

db.on("error", (error)=>{
    console.error(error)
})
db.once("open", ()=> console.log("Connected to database"))

app.use(urlencoded({extended: true}))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true
  }))

app.use(passport.initialize())
app.use(passport.session())

app.use("/google", googleRoute)
app.use("/profile", profileRoute)
app.use("/", (req, res)=>{
    res.status(200).json("Home")
})

app.listen(process.env.PORT, ()=>{
    console.log("Server running")
})