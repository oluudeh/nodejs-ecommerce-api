const category = require('../controllers/category')
const cache = require('apicache').middleware

module.exports = (router) => {
    router.get('/categories', cache('1 hour'), category.getCategories)
    router.get('/categories/:category_id', cache('1 hour'),  category.getCategory)
    router.get('/categories/inProduct/:product_id', cache('1 hour'),  category.getInProductCategories)
    router.get('/categories/inDepartment/:department_id', cache('1 hour'),  category.getInDeptCategories)
}