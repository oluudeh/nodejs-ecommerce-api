const attribute = require('../controllers/attribute')

module.exports = (router) => {
    router.get('/attributes', attribute.getAttributes)
    router.get('/attributes/:attribute_id', attribute.getAttribute)
    router.get('/attributes/inProduct/:product_id', attribute.getInProductAttributes)
    router.get('/attributes/values/:attribute_id', attribute.getAttributeValues)
}