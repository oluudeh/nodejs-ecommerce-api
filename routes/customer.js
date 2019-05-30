const customer = require('../controllers/customer')
const authenticate = require('../helpers/auth')


module.exports = (router) => {
    router.put('/customer', authenticate, customer.updateCustomer)
    router.get('/customer', authenticate, customer.getCustomer)
    router.post('/customers', customer.register)
    router.post('/customers/login', customer.apiLogin)
    router.post('/customers/facebook', customer.facebookLogin)
    router.put('/customers/address', authenticate, customer.updateAddress)
    router.put('/customers/creditCard', authenticate, customer.updateCreditCard)
}