const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const jwt = require('jsonwebtoken');
const cors = require('cors');
app.use(cors());

require('dotenv').config()
require('./models/User')

const authRouters = require('./routers/authRouters')
const roomRouters = require('./routers/roomRouters')
const { request } = require('express')

app.use(bodyParser.json())
app.use(authRouters)
app.use(roomRouters)


app.get('/', (req, res) => {
    res.send("email của bạn là", req)
})


mongoose.connect('mongodb://127.0.0.1/AppRoomRental');


const User = mongoose.model('User');

// API endpoint GET để lấy dữ liệu từ MongoDB
// app.get('/users', authentoken, async (req, res) => {
//     const users = await User.find({}).select([
//         "username",
//         "email",
//         "password",
//         "__v"
//     ]);
//     res.json({ status: true, data: users })
// })



app.listen(process.env.POST, () => {
    console.log("server running " + process.env.POST)
})

