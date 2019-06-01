const db = require('../models')
const ShoppingCart = db.sequelize.models.ShoppingCart
const randomstring = require('randomstring')
const validator = require('../validations/cart')

/**
 * Handles shopping cart API requests
 */
const CartController = {

    /**
     * Generates a unique cart ID
     * @param {*} req 
     * @param {*} res 
     */
    generateId (req, res) {
        const id = randomstring.generate(11, { capitalization: 'lowercase' })
        return res.status(200).send({
            cart_id: id
        })
    },

    /**
     * Adds a product to a specified cart
     */
    async addToCart (req, res) {
        const { isValid, error } = validator.addToCart(req.body)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            await db.sequelize.query(
                "CALL shopping_cart_add_product ( :inCartId, :inProductId, :inAttributes )",
                {
                    replacements: { 
                        inCartId:  req.body.cart_id,
                        inProductId: req.body.product_id,
                        inAttributes: req.body.attributes
                    }
                } 
            )

            const items = await db.sequelize.query(
                "CALL shopping_cart_get_products ( :inCartId )",
                {
                    replacements: { inCartId: req.body.cart_id }
                }
            )

            return res.send(items)
        } catch (err) {
            return res.status(500).send(err)
        }        
    },


    /**
     * Fetches products in a specified cart
     * @param {*} req 
     * @param {*} res 
     */
    async getCartProducts (req, res) {

        try {
            const items = await db.sequelize.query(
                "CALL shopping_cart_get_products ( :inCartId )",
                {
                    replacements: { inCartId: req.params.cart_id }
                }
            )

            return res.send(items)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Updates details of an item in a cart.
     * @param {*} req 
     * @param {*} res 
     */
    async updateCart (req, res) {
        try {
            const items = await db.sequelize.query(
                "CALL shopping_cart_update ( :inItemId, :inQuantity )",
                {
                    replacements: { 
                        inItemId: req.params.item_id,
                        inQuantity: req.body.quantity
                    }
                }
            )

            return res.send(items)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Removes all products from a cart
     * @param {*} req 
     * @param {*} res 
     */
    async clearCart (req, res) {
        try {
            await db.sequelize.query(
                "CALL shopping_cart_empty ( :inCartId )",
                {
                    replacements: { inCartId: req.params.cart_id }
                }
            )

            return res.send([])
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Moves an item from buy later list to cart
     * @param {*} req 
     * @param {*} res 
     */
    async moveToCart (req, res) {
        try {
            await db.sequelize.query(
                "CALL shopping_cart_move_product_to_cart ( :inItemId )",
                {
                    replacements: { inItemId: req.params.item_id }
                }
            )

            return res.send()
        } catch (err) {
            return res.status(500).send(err)
        }
    },


    /**
     * Gets the total cost of items in a cart
     * @param {*} req 
     * @param {*} res 
     */
    async getCartTotal (req, res) {
        try {
            const total = await db.sequelize.query(
                "CALL shopping_cart_get_total_amount ( :inCartId )",
                {
                    replacements: { inCartId: req.params.cart_id }
                }
            )

            return res.send(total[0])
        } catch (err) {
            return res.status(500).send(err)
        }
    },


    /**
     * Moves an item to buy later iist
     * @param {*} req 
     * @param {*} res 
     */
    async saveForLater (req, res) {
        try {
            await db.sequelize.query(
                "CALL shopping_cart_save_product_for_later ( :inItemId )",
                {
                    replacements: { inItemId: req.params.item_id }
                }
            )

            return res.send()
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches list of items marked for later purchases
     * @param {*} req 
     * @param {*} res 
     */
    async getSavedItems (req, res) {
        try {
            const items = await db.sequelize.query(
                "CALL shopping_cart_get_saved_products ( :inCartId )",
                {
                    replacements: { inCartId: req.params.cart_id }
                }
            )

            return res.send(items)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Removes an item from the cart
     * @param {*} req 
     * @param {*} res 
     */
    async removeFromCart (req, res) {
        try {
            await db.sequelize.query(
                "CALL shopping_cart_remove_product ( :inItemId )",
                {
                    replacements: { inItemId: req.params.item_id }
                }
            )

            return res.send()
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}

module.exports = CartController