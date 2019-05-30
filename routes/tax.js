const tax = require('../controllers/tax')

module.exports = (router) => {
    router.get('/tax', tax.getTaxes)
    router.get('/tax/:tax_id', tax.getTax)
}