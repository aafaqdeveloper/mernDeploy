const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const protect = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            res.status(401)
            throw new Error("Not authorized, please login")
        }

        // Verify Token
        const verified = jwt.verify(token, 'ndure12345')
        // Get user id from token
        const user = await User.findById(verified.id).select("-password")

        if (!user) {
            res.status(401)
            throw new Error("User not found")
        }

        req.user = user
        next()
    }
    catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login")
    }
})

const isAdmin = asyncHandler (async (req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            res.status(401)
            throw new Error("Not authorized, please login")
        }

        // Verify Token
        const verified = jwt.verify(token, 'ndure12345')
        // Get user id from token
        const user = await User.findById(verified.id).select("-password")

        if (!user) {
            res.status(401)
            throw new Error("User not found")
        }

        if (user.role !== 1) {
            res.status(401)
            throw new Error("Unauthorized access")
        }
        else {
            next()
        }
    }
    catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login")
    }
})

module.exports = {
    protect,
    isAdmin
}