const passport = require('passport')
const codes = require('../helpers/error_codes').auth


module.exports = async function authenticate (req, res, next) {
    return passport.authenticate('jwt', { session: false }, (error, user, info) => {
        //console.log('USER ', user)
        req.user = user
        if (!info && !error) return next()
        const err = {
            field: 'USER-KEY',
            status: 401
        }

        if (info.name === 'Error') {
            return res.status(401).send({
                ...codes.code_empty,
                ...err
            })
        } else  {
            return res.status(401).send({
                ...codes.access_denied,
                ...err
            })
        }
    })(req, res, next)
}
