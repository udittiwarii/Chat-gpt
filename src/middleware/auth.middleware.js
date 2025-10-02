const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')



async function authMiddleware(req, res, next) {

    const { token } = req.cookies;

    if (!token) {
        return res.status(400).json({
            message: "token not found"
        })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)// decode the code 

        const user = await userModel.findById(decoded.id)// find the user using id from database

        req.body = user;

        next()

    } catch (err) {
        res.status(400).json({
            message: 'unauthrized '
        })
        console.log('error : ', err)
    }
}


module.exports = authMiddleware;