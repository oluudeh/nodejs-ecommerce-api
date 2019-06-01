const shipping = require('../controllers/shipping')
const cache = require('apicache').middleware

module.exports = (router) => {
    router.get('/shipping/regions', cache('1 hour'), shipping.getRegions)
    router.get('/shipping/regions/:shipping_region_id', cache('1 hour'), shipping.getShippings)
}