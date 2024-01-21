const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
let refechTokens = [];
const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.json({ message: 'Email Người Dùng  không Tồn tại ', status: false });
    } else if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.json({ message: "Lỗi máy chủ nội bộ", status: 500 })
            }
            if (!result) {
                return res.json({ message: 'PassWord Không Hợp Lệ !', status: false });
            }
            const payload = {
                user: user.username,
                email: user.email,
                _id: user._id
            }
            const access_token = jwt.sign(payload, process.env.KEY_ACCESS_TOKEN, { expiresIn: '30s' })
            const refresh_token = jwt.sign(payload, process.env.KEY_REFRESH_TOKEN)
            refechTokens.push(refresh_token)
            res.json({ access_token,refresh_token, status: true,payload, message: 'Đăng Nhập Thành Công' })
        })
    }
    else {
        res.json({ message: 'Login Error' })
    }
}
const signupUser = async (req, res) => {
    const { username, email, password } = req.body
    // console.log(userName,email,password)
    try {
        const checkName = await User.findOne({ username: username })
        const checkEmail = await User.findOne({ email: email })
        if (checkName) {
            return res.json({ checkName: "Tên Người Dùng Đã Tồn Tại", status: false })
        }
        if (checkEmail) {
            return res.json({ checkEmail: "Email Người Dùng Đã Tồn Tại", status: false })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        await User.create({ username, email, password: hashPassword })

        res.json({ status: true })
    } catch (error) {
        res.status(422).send(error.message)
    }

}

const logoutUser = (req, res) => {
    const refreshToken = req.body.token;
    console.log('logouur:', refreshToken)
    console.log('layramang:', refechTokens)

    refechTokens = refechTokens.filter((refToken) =>{
        if(refToken !== refechTokens){
            return false
        }
    })
    res.json({msg:'Đăng Xuất thành công' , status:true})

}

const getUser = async (req, res) => {
    const user = req.user    
    return res.json({ status: true, users:user })
}

const refreschToken = (req, res, next) => {
    console.log('mang refechTokens:',refechTokens)
    const refreshToken = req.body.token;
    if (!refechTokens.includes(refreshToken)) {
        return res.status(403).send({error:"Bạn Cần Phải Đăng Nhập "});
    }
    if (refreshToken) {
        jwt.verify(refreshToken, process.env.KEY_REFRESH_TOKEN, (err, data) => {
            console.log(err, data)

            const access_token = jwt.sign(
                { username: data },
                process.env.KEY_ACCESS_TOKEN,
                { expiresIn: '30s' }
            );
            console.log('access_token :', access_token)
            res.json({ access_token })
        })
    } else {
        res.sendStatus(401);
    }
}

module.exports = {
    loginUser, signupUser, getUser, logoutUser,refreschToken
}