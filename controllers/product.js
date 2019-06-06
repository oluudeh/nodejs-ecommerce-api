const db = require('../models')
const Product = db.sequelize.models.Product
const Review = db.sequelize.models.Review
const validator = require('../validations/product')


/**
 * handles products API requests
 */
const ProductController = {

    /**
     * Fetches list of products based of filter queries.
     * Queries can be any combination of page, limit and description_length
     * @param {*} req 
     * @param {*} res 
     */
    async getProducts (req, res) {
        const { isValid, error } = validator.validateFilter(req.query)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const page = req.query.page || 1
            const limit = parseInt(req.query.limit) || 20
            const offset = (page * limit) - limit
            const desc_length = parseInt(req.query.description_length) || 200

            const count = await Product.count()

            const products = await db.sequelize.query(
                `CALL catalog_get_products_on_catalog2 (
                    :inShortProductDescriptionLength, 
                    :inProductsPerPage, 
                    :inStartItem)
                `, 
                {
                    replacements: { 
                        inShortProductDescriptionLength: desc_length,
                        inProductsPerPage: limit,
                        inStartItem: offset
                    }
                })
            return res.send({
                count: count,
                rows: products
            })
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetched details of a specific product
     * @param {*} req 
     * @param {*} res 
     */
    async getProduct (req, res) {
        try {
            const product = await Product.findOne({
                where: { product_id: req.params.product_id }
            })

            return res.status(200).send(product)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Handles product search
     * @param {*} req 
     * @param {*} res 
     */
    async productSearch (req, res) {
        const { isValid, error } = validator.validateSearch(req.query)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const query = req.query.query_string
            const allWords = req.query.all_words || 'on'
            const page = req.query.page || 1
            const limit = parseInt(req.query.limit) || 20
            const offset = (page * limit) - limit
            const descLength = parseInt(req.query.description_length) || 200

            const count = await db.sequelize.query(
                `CALL catalog_count_search_result (
                    :inSearchString,
                    :inAllWords)
                `, 
                {
                    replacements: { 
                        inSearchString: query,
                        inAllWords: allWords
                    }
                })

            const products = await db.sequelize.query(
                `CALL catalog_search (
                    :inSearchString,
                    :inAllWords,
                    :inShortProductDescriptionLength, 
                    :inProductsPerPage, 
                    :inStartItem)
                `, 
                {
                    replacements: { 
                        inSearchString: query,
                        inAllWords: allWords,
                        inShortProductDescriptionLength: descLength,
                        inProductsPerPage: limit,
                        inStartItem: offset
                    }
                })

            return res.send({
                count: count[0]['count(*)'],
                rows: products
            })
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches a list of products based on a specific category
     * @param {*} req 
     * @param {*} res 
     */
    async getCategoryProducts (req, res) {
        const { isValid, error } = validator.validateFilter(req.query)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const page = req.query.page || 1
            const limit = parseInt(req.query.limit) || 20
            const offset = (page * limit) - limit
            const desc_length = parseInt(req.query.description_length) || 200

            const products = await db.sequelize.query(
                `CALL catalog_get_products_in_category (
                    :inCategoryId,
                    :inShortProductDescriptionLength, 
                    :inProductsPerPage, 
                    :inStartItem)
                `, 
                {
                    replacements: { 
                        inCategoryId: req.params.category_id,
                        inShortProductDescriptionLength: desc_length,
                        inProductsPerPage: limit,
                        inStartItem: offset
                    }
                })
            return res.send(products)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


    /**
     * Fetches a list of products based on a specific department
     * @param {*} req 
     * @param {*} res 
     */    
    async getDeptProducts (req, res) {
        const { isValid, error } = validator.validateFilter(req.query)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const page = req.query.page || 1
            const limit = parseInt(req.query.limit) || 20
            const offset = (page * limit) - limit
            const desc_length = parseInt(req.query.description_length) || 200

            const products = await db.sequelize.query(
                `CALL catalog_get_products_on_department (
                    :inDepartmentId,
                    :inShortProductDescriptionLength, 
                    :inProductsPerPage, 
                    :inStartItem)
                `, 
                {
                    replacements: { 
                        inDepartmentId: req.params.department_id,
                        inShortProductDescriptionLength: desc_length,
                        inProductsPerPage: limit,
                        inStartItem: offset
                    }
                })
            return res.send(products)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches details of a specific product
     * @param {*} req 
     * @param {*} res 
     */
    async getProductDetails (req, res) {
        try {
            const product = await Product.findOne({
                where: { product_id: req.params.product_id },
                attributes: ['product_id', 'name', 'description', 'price', 'discounted_price', 'image', 'image_2']
            })

            return res.send(product)
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches product locations
     * @param {*} req 
     * @param {*} res 
     */
    async getProductLocations (req, res) {

        try {
            const products = await db.sequelize.query(
                `CALL catalog_get_product_locations ( :inProductId )`, 
                {
                    replacements: { inProductId: req.params.product_id }
                })
            return res.send(products)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches reviews of a specific product
     * @param {*} req 
     * @param {*} res 
     */
    async getProductReviews (req, res) {

        try {
            const products = await db.sequelize.query(
                `CALL catalog_get_product_reviews ( :inProductId )`, 
                {
                    replacements: { inProductId: req.params.product_id }
                })
            return res.send(products)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    /**
     * Creates a new product review
     * @param {*} req 
     * @param {*} res 
     */
    async postProductReview (req, res) {
        const { isValid, error } = validator.validateReview(req.body)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const products = await db.sequelize.query(
                `CALL catalog_create_product_review ( 
                    :inCustomerId,
                    :inProductId,
                    :inReview,
                    :inRating
                    )`, 
                {
                    replacements: { 
                        inCustomerId: req.user.customer_id,
                        inProductId: req.params.product_id,
                        inReview: req.body.review,
                        inRating: req.body.rating 
                    }
                })
            return res.send(products)
        } catch(err) {
            console.log(err)
            return res.status(500).send(err)
        }
    }
}

module.exports = ProductController