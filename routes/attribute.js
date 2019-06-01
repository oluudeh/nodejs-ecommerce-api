const attribute = require('../controllers/attribute')
const cache = require('apicache').middleware

module.exports = (router) => {
    router.get('/attributes', cache('1 hour'), attribute.getAttributes)
    router.get('/attributes/:attribute_id', cache('1 hour'),  attribute.getAttribute)
    router.get('/attributes/inProduct/:product_id', cache('1 hour'),  attribute.getInProductAttributes)
    router.get('/attributes/values/:attribute_id', cache('1 hour'),  attribute.getAttributeValues)
}