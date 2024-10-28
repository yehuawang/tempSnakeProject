import jwt from "jsonwebtoken"

export const protectRoute = (req, res, next) => {
    const token = req.header('auth-token')

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied, no valid token found"
        })
    }

    try {
        const plainUser = jwt.verify(token, process.env.JWT_SECRET)
        console.log("verifying token with .env SECRET")
        req.user = plainUser
        next()
    } catch (e) {
        console.error(e)
        res.status(401).json({
            success: false,
            message: "Access denied, invalid token"
        })
    }
}
