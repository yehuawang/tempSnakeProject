import jwt from "jsonwebtoken"

export const genToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: "100d"
    })
}
