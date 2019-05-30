const product = require('../controllers/product')
const authenticate = require('../helpers/auth')

module.exports = (router) => {
    router.get('/products', product.getProducts)
    router.get('/products/search', product.productSearch)
    router.get('/products/:product_id', product.getProduct)
    router.get('/products/inCategory/:category_id', product.getCategoryProducts)
    router.get('/products/inDepartment/:department_id', product.getDeptProducts)
    router.get('/products/:product_id/details', product.getProductDetails)
    router.get('/products/:product_id/locations', product.getProductLocations)
    router.get('/products/:product_id/reviews', product.getProductReviews)
    router.post('/products/:product_id/reviews', authenticate, product.postProductReview)
}