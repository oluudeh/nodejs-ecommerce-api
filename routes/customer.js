const customer = require('../controllers/customer')
const passport = require('passport')
const codes = require('../helpers/error_codes').auth


async function authenticate (req, res, next) {
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

module.exports = (router) => {
    router.put('/customer', authenticate, customer.updateCustomer)
    router.get('/customer', authenticate, customer.getCustomer)
    router.post('/customers', customer.register)
    router.post('/customers/login', customer.apiLogin)
    router.post('/customers/facebook', customer.facebookLogin)
    router.put('/customers/address', passport.authenticate('jwt', { session: false }), customer.updateAddress)
    router.put('/customers/creditCard', passport.authenticate('jwt', { session: false }), customer.updateCreditCard)
}