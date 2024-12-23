import jwt from "jsonwebtoken"

export const verToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}
