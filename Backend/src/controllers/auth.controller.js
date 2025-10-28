const userModel = require('../model/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerUser(req, res) {
    try {
        const { email, fullname: { firstname, lastname }, password } = req.body;

        const existingUser = await userModel.findOne({
            email
        })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashpassword = await bcrypt.hash(password, 10);



        const newUser = await userModel.create({
            email,
            fullname: {
                firstname,
                lastname

            },
            password: hashpassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        res.cookie("token", token)

        return res.status(201).json({
            message: "User registerd successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error registering user"
        })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        const ispassword = await bcrypt.compare(password, user.password)

        if (!ispassword) {
            return res.status(400).json({
                message: "Invalid Password"
            })
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.cookie('token', token)


        return res.status(200).json({
            message: "user logged in successfully",
            user: {
                id: user._id,
                email: user.email,
                fullname: user.fullname
            }
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error logging in user"
        })
    }

}


module.exports = {
    registerUser,
    loginUser
}