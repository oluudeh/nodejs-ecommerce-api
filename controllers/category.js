const db = require('../models')
const Category = db.sequelize.models.Category
const validator = require('../validations/category')


/**
 * Handles categories API requests
 */
const CategoryController = {

    /**
     * Fetches a paginated list of categories
     * Accepts request queries (page, limit and order)
     * Queries are used to filter the returned list
     * @param {*} req 
     * @param {*} res 
     */
    async getCategories(req, res) {

        const { isValid, error } = validator.validateFilter(req.query)
        if (!isValid) {
            return res.json(error)
        }

        try {
            const page = req.query.page || 1
            const limit = parseInt(req.query.limit) || 20
            const offset = (page * limit) - limit
            const orderBy = req.query.order || 'category_id'
            const categories = await Category.findAndCountAll({ offset: offset, limit: limit, order: [[orderBy]] })
            //const categories = await Category.findAll({ offset: offset, limit: itemsPerPage })
            return res.status(200).send(categories)
        } catch(e) {
            console.log('getCategories ', e)
            return res.status(400).send(e)
        }
    },

    /**
     * Fetches details of a specific category
     * @param {*} req 
     * @param {*} res 
     */
    async getCategory(req, res) {
        try {
            const category = await Category.findOne({
                where: { category_id: req.params.category_id }
            })
            return res.send(category)
        } catch(e) {
            console.log('getCategories ', e)
            return res.status(400).send(e)
        }
    },

    /**
     * Fetches categories of a specific product
     * @param {*} req 
     * @param {*} res 
     */
    async getInProductCategories (req, res) {
        try {
            const categories = await db.sequelize.query(
                "CALL catalog_get_categories_for_product (:inProductId)", 
                {
                    replacements: { inProductId: req.params.product_id }
                })
            return res.send(categories)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches categories based on departments
     * @param {*} req 
     * @param {*} res 
     */
    async getInDeptCategories (req, res) {
        try {
            const categories = await Category.findAll({
                where: { department_id: req.params.department_id }
            })            
            return res.send(categories)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }

}

module.exports = CategoryController