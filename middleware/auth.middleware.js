const jwp = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'No authorization' })
        }

        const decoded = jwp.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({ message: 'No authorization' })
    }
}