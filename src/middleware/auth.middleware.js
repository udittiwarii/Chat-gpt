const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                message: "user not found"
            })
        }

        req.user = user; // set the user to the req object

        next()
    } catch (err) {
        return res.status(500).json({
            message: "Authentication error"
        })
    }
}

module.exports = {
    authUser
}