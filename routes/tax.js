const tax = require('../controllers/tax')
const cache = require('apicache').middleware

module.exports = (router) => {
    router.get('/tax', cache('1 hour'), tax.getTaxes)
    router.get('/tax/:tax_id', cache('1 hour'), tax.getTax)
}