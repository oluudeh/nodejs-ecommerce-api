const validator = require('validator')
const codes = require('../helpers/error_codes').product
const helper = require('../helpers/validators')

const OrderValidator = {
    validateOrder (data) {

        if (!data.cart_id || validator.isEmpty(data.cart_id)) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Cart ID'),
                field: 'cart_id'
            })
        }

        if (!data.tax_id || validator.isEmpty(data.tax_id)) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Tax ID'),
                field: 'tax_id'
            })
        }

        if (!data.shipping_id || validator.isEmpty(data.shipping_id)) {
            return helper.error({
                code: codes.field_required.code,
                message: codes.field_required.message('Shipping ID'),
                field: 'shipping_id'
            })
        }

        if (!validator.isInt(data.tax_id)) { 
            return helper.error({
                code: codes.field_not_number.code,
                message: codes.field_not_number.message('Tax ID'),
                field: 'tax_id'
            })
        }

        if (!validator.isInt(data.shipping_id)) { 
            return helper.error({
                code: codes.field_not_number.code,
                message: codes.field_not_number.message('Shipping ID'),
                field: 'shipping_id'
            })
        }

        return helper.success()
    }
}

module.exports = OrderValidator