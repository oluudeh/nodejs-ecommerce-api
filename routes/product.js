const product = require('../controllers/product')
const authenticate = require('../helpers/auth')
const cache = require('apicache').middleware

module.exports = (router) => {
    router.get('/products', cache('1 hour'), product.getProducts)
    router.get('/products/search', cache('1 hour'), product.productSearch)
    router.get('/products/:product_id', cache('1 hour'), product.getProduct)
    router.get('/products/inCategory/:category_id', cache('1 hour'), product.getCategoryProducts)
    router.get('/products/inDepartment/:department_id', cache('1 hour'), product.getDeptProducts)
    router.get('/products/:product_id/details', cache('1 hour'), product.getProductDetails)
    router.get('/products/:product_id/locations', cache('1 hour'), product.getProductLocations)
    router.get('/products/:product_id/reviews', cache('1 hour'), product.getProductReviews)
    router.post('/products/:product_id/reviews', authenticate, product.postProductReview)
}