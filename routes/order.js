const order = require('../controllers/order')
const auth = require('../helpers/auth')

module.exports = (router) => {
    router.post('/orders', auth, order.postOrder)
    router.get('/orders/inCustomer', auth, order.getCustomerOrders)
    router.get('/orders/:order_id', auth, order.getOrder)
    router.get('/orders/shortDetail/:order_id', auth, order.getShortDetail)
}