const validator = require('validator')
const { product, cart } = require('../helpers/error_codes')
const helper = require('../helpers/validators')
const db = require('../models')
const Cart = db.sequelize.models.ShoppingCart

const OrderValidator = {
    async validateOrder (data) {

        if (!data.cart_id || validator.isEmpty(data.cart_id)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Cart ID'),
                field: 'cart_id'
            })
        }

        const __cart = await Cart.findOne({
            where: { cart_id: data.cart_id }
        })

        if (!__cart) {
            return helper.error({
                ...cart.cart_not_exit,
                field: 'cart_id'
            })
        }

        if (!data.tax_id || validator.isEmpty(data.tax_id)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Tax ID'),
                field: 'tax_id'
            })
        }

        if (!data.shipping_id || validator.isEmpty(data.shipping_id)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Shipping ID'),
                field: 'shipping_id'
            })
        }

        if (!validator.isInt(data.tax_id)) { 
            return helper.error({
                code: product.field_not_number.code,
                message: product.field_not_number.message('Tax ID'),
                field: 'tax_id'
            })
        }

        if (!validator.isInt(data.shipping_id)) { 
            return helper.error({
                code: product.field_not_number.code,
                message: product.field_not_number.message('Shipping ID'),
                field: 'shipping_id'
            })
        }

        return helper.success()
    },

    validatePayment (data) {

        if (!data.stripeToken || validator.isEmpty(data.stripeToken)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Stripe Token'),
                field: 'stripeToken'
            })
        }

        if (!data.description || validator.isEmpty(data.description)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Description'),
                field: 'description'
            })
        }

        if (!data.order_id || validator.isEmpty(data.order_id)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Order ID'),
                field: 'order_id'
            })
        }

        if (!data.amount || validator.isEmpty(data.amount)) {
            return helper.error({
                code: product.field_required.code,
                message: product.field_required.message('Amount'),
                field: 'amount'
            })
        }

        if (!validator.isInt(data.order_id)) { 
            return helper.error({
                code: product.field_not_number.code,
                message: product.field_not_number.message('Order ID'),
                field: 'order_id'
            })
        }

        if (!validator.isInt(data.amount)) { 
            return helper.error({
                code: product.field_not_number.code,
                message: product.field_not_number.message('Amount'),
                field: 'amount'
            })
        }

        return helper.success()

    }
}

module.exports = OrderValidator