import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from '../DatabaseModel/UserModel.js';






const protectUser = AsyncHandler(async (req, res, next) => {

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {

            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            if (!req.user.isAdmin) {

                next()
            } else {
                res.status(401)
                throw new Error('Not Authorized token failed')
            }


        } catch (error) {

            res.status(401)
            throw new Error('Not Authorized token failed')

        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Not authorized no token")
    }

})






const admin = AsyncHandler(async (req, res, next) => {

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.admin = await User.findById(decoded.id).select('-password')
            if (req.admin.isAdmin) {

                next()
            }
            else {
                res.status(401)
                throw new Error('Not Authorized token failed')
            }
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("Not Authorised ")
    }
})

export { protectUser, admin }