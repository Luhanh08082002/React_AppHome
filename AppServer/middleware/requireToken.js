const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireToken = (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            return res.status(401).send({ error: "Bạn Cần Phải Đăng Nhập" })
        }
        const token = authorization.split(' ')[1]
        console.log('tokens:',token)
        if (!token){
            res.status(401).send({ error: "Bạn Cần Phải Đăng Nhập" })
        }
        jwt.verify(token, process.env.KEY_ACCESS_TOKEN, async (err, payload) => {
            console.log(err, payload)
            if (err) {
                return res.status(401).send({ error:"Phiên bản đăng nhập đã hết hạn vui lòng đăng nhập để tiếp tục" })
            }
            // const { payload } = payload;
            // const user = await User.findById(payload._id);
            // console.log(user)
            req.user = payload;
            next()
        })

    } catch (error) {
        res.json({ err: error.message })
    }
}
module.exports = {
    requireToken
}