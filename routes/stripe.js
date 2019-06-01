const controller = require('../controllers/order')

module.exports = (router) => {

    router.post('/stripe/charge', controller.processPayment)
    router.post('/stripe/webhooks', controller.webhookCallback)
}