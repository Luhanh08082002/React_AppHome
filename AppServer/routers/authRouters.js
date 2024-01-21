const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const User = mongoose.model('User');
const bcrypt = require('bcrypt')

const {getUser, loginUser, signupUser, authentoken,refreschToken ,logoutUser} = require('../controllers/UserControlleer')
const {requireToken} = require('../middleware/requireToken')

router.post('/login', loginUser)
router.post('/signup', signupUser)
router.get('/users', requireToken,getUser)
router.post('/refreschToken',refreschToken)
router.post('/logout', logoutUser)

router.get('/', requireToken,(req,res)=>{
    res.send({status:true,reqsss:req.user})
})

module.exports = router