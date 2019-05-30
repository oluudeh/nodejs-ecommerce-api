const shipping = require('../controllers/shipping')

module.exports = (router) => {
    router.get('/shipping/regions', shipping.getRegions)
    router.get('/shipping/regions/:shipping_region_id', shipping.getShippings)
}