const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route =require('../src/routes')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


mongoose.connect("mongodb+srv://root:1234@suyashshendre.wfinbwt.mongodb.net/group68Database?retryWrites=true&w=majority")
.then(() => console.log("mongoDb is conected ..."))
.catch(err => console.log(err.message))


app.use('/' , route)


app.listen(process.env.PORT || 3000 , function(){
    console.log("express is running on server",process.env.PORT || 3000)
})