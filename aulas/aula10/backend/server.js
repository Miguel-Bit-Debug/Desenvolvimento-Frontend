const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 8050
const connectionString = "mongodb+srv://admin:admin123@appdatabase.ry0gm2w.mongodb.net/"


mongoose.connect(connectionString, {
    dbName: "DevsSupermarket"
}).then(() => {
    console.log("MongoDB UP!")
    console.log(`Listening on http://localhost:${port}`)
    app.listen()
}).catch((error) => {
    console.log(error)
})
