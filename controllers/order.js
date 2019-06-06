const db = require('../models')
const Order = db.sequelize.models.Order
const validator = require('../validations/order')
const helper = require('../helpers/order')
const stripe = require('stripe')
require('dotenv').config()

/**
 * Handles orders API requests
 */
const OrderController = {

    /**
     * Creates an order
     * @param {*} req 
     * @param {*} res 
     */
    async postOrder (req, res) {

        //Validate incoming data
        const { isValid, error } = await validator.validateOrder(req.body)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const orderId = await db.sequelize.query(
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

            //Send a confirmation email notification
            helper.sendMail(req.user.email, 'new_order')

            return res.send(orderId[0])
        } catch (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    },


    /**
     * Fetches details of a specific order
     * @param {*} req 
     * @param {*} res 
     */
    async getOrder (req, res) {
        try {
            const order = await db.sequelize.query(
                "CALL orders_get_order_info ( :inOrderId )",
                {
                    replacements: { inOrderId: req.params.order_id }
                } 
            )

            return res.send(order[0])
        } catch (err) {
            return res.status(500).send(err)
        }
    },

    /**
     * Fetches orders of the logged in customer
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Fetches short details of a specific order
     * @param {*} req 
     * @param {*} res 
     */
    async getShortDetail (req, res) {
        try {
            const orders = await db.sequelize.query(
                "CALL orders_get_order_short_details ( :inOrderId )",
                {
                    replacements: { inOrderId: req.params.order_id }
                } 
            )

            return res.send(orders[0])
        } catch (err) {
            return res.status(500).send(err)
        }
    },


    /**
     * Handles payment processing, customer notification and order update
     * @param {*} req 
     * @param {*} res 
     */
    async processPayment (req, res) {
        const { isValid, error } = validator.validatePayment(req.body)
        if (!isValid) {
            return res.status(400).send(error)
        }

        try {
            const result = await db.sequelize.query(`
                SELECT c.email
                FROM customer c, orders o
                WHERE c.customer_id = o.customer_id AND o.order_id = :orderId
                LIMIT 1
            `, {
                replacements: { orderId: req.body.order_id }
            })

            console.log('Result ', result)
            const email = result[0][0].email

            const stripeHandle = stripe(process.env.STRIPE_SEC_KEY)

            const charge = await stripeHandle.charges.create({
                amount: parseFloat(req.body.amount) * 100,
                source: req.body.stripeToken,
                receipt_email: email,
                description: req.body.description,
                currency: req.body.currency || 'usd',
                metadata: {
                    order_id: req.body.order_id
                }
            })
            
            if (!charge.paid || !charge.status === 'succeeded') {
                return res.status(400).send({error: 'Could not process payment'})
            }

            helper.updateOrderStatus(req.body.order_id, 5)
            helper.sendMail(email, 'payment_received')
            
            return res.send(charge)
        } catch (err) {
            console.log(err)
            return res.status(400).send(err)
        }
    },

    async webhookCallback (req, res) {
        //Since we are processing payment upfront, I am not sure we still need this
    }
}


module.exports = OrderController