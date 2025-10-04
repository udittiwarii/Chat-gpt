const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// for the register user 
async function registerUser(req, res) {
    const { fullname: { firstname, lastname }, email, password } = req.body

    const isuser = await userModel.findOne({
        email
    })

    if (isuser) {
        return res.status(400).json({
            message: 'email exist alredy'
        })
    }

    const hashpassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        fullname: {
            firstname, lastname
        },
        email,
        password: hashpassword
    })

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token)

    res.status(201).json({
        message: 'user created successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    })

}

// for the login user
async function loginUser(req, res) {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: 'Invalid email'
        })
    }

    const ispassword = await bcrypt.compare(password, user.password)

    if (!ispassword) {
        return res.status(400).json({
            message: 'Invalid password'
        })
    }
    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET)
    res.cookie('token', token)

    res.status(201).json({
        message: 'user login successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }
    })
}


module.exports = {
    registerUser,
    loginUser
}