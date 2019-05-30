const db = require('../models')
const Order = db.sequelize.models.Order
const validator = require('../validations/order')

const OrderController = {
    async postOrder (req, res) {

        const { isValid, error } = validator.validateOrder(req.body)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            /*const data = {
                tax_id: req.body.tax_id,
                cart_id: req.body.cart_id,
                shipping_id: req.body.shipping_id,
                created_on: new Date()
            }
            const order = await Order.create(data)*/
            const order = await db.sequelize.query(
                "CALL shopping_cart_create_order ( :inCartId, :inCustomerId, :inShippingId, :inTaxId)",
                {
                    replacements: {
                        inCartId: req.body.cart_id,
                        inCustomerId: req.user.customer_id,
                        inShippingId: req.body.shipping_id,
                        inTaxId: req.body.tax_id
                    }
                } 
            )
            console.log(order)
            return res.send({ orderId: order.order_id })
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },

    async getOrder (req, res) {
        try {
            const order = await db.sequelize.query(
                "CALL orders_get_order_info ( :inOrderId )",
                {
                    replacements: { inOrderId: req.params.order_id }
                } 
            )

            return res.send(order)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async getCustomerOrders (req, res) {
        try {
            const orders = await db.sequelize.query(
                "CALL orders_get_by_customer_id ( :inCustomerId )",
                {
                    replacements: { inCustomerId: req.user.customer_id }
                } 
            )

            return res.send(orders)
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    async getShortDetail (req, res) {
        try {
            const orders = await db.sequelize.query(
                "CALL orders_get_order_short_details ( :inOrderId )",
                {
                    replacements: { inOrderId: req.params.order_id }
                } 
            )

            return res.send(orders)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}


module.exports = OrderController