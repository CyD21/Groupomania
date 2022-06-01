const jwt = require('jsonwebtoken')

const JWT_KEY_SECRET = process.env.PRIVATE_KEY

module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
                userId: userData.id,
                isAdmin: userData.isAdmin
            },
            JWT_KEY_SECRET, {
                expiresIn: '1h'
            }
        )
    }
}