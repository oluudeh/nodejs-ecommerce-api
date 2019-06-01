const validator = require('validator')
const helper = require('../helpers/validators')
const codes = require('../helpers/error_codes').cart

const CartValidator = {

    addToCart (data) {
        if (!data.cart_id || validator.isEmpty(data.cart_id)) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Cart ID'),
                field: 'cart_id'
            })
        }

        if (!data.product_id || validator.isEmpty(String(data.product_id))) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Product ID'),
                field: 'product_id'
            })
        }

        if (!validator.isInt(String(data.product_id))) {
            return helper.error({
                code: codes.field_not_number.code,
                message: codes.field_required.message('Product ID'),
                field: 'product_id'
            })
        }

        if (!data.attributes || validator.isEmpty(data.attributes)) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Attributes'),
                field: 'attributes'
            })
        }

        return helper.success()
    },

    updateItem (data) {

        if (!data.quantity || validator.isEmpty(String(data.quantity))) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Quantity'),
                field: 'quantity'
            })
        }

        if (!validator.isInt(String(data.quantity))) {
            return helper.error({
                code: codes.field_not_number.code,
                message: codes.field_required.message('Quantity'),
                field: 'quantity'
            })
        }

        return helper.success()
    }

}

module.exports = CartValidator