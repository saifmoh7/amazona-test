const jwt = require("jsonwebtoken")


const generateTokon = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somthingsecret',
        {
            expiresIn: '30d'
        }
    )
}

module.exports = generateTokon;