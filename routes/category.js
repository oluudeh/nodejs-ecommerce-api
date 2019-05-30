const category = require('../controllers/category')

module.exports = (router) => {
    router.get('/categories', category.getCategories)
    router.get('/categories/:category_id', category.getCategory)
    router.get('/categories/inProduct/:product_id', category.getInProductCategories)
    router.get('/categories/inDepartment/:department_id', category.getInDeptCategories)
}